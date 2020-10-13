using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Serialization;
using MakeRss.FeedDescription;
using MakeRss.Helpers;
using MakeRss.JsonEntities;
using Guid = MakeRss.FeedDescription.Guid;

namespace MakeRss
{
    internal class Program
    {
        private static async Task Main(string playlistId, string hostingBaseUrl)
        {
            if (string.IsNullOrEmpty(playlistId))
            {
                Environment.CurrentDirectory = @"C:\Users\vince\Downloads\WL-Listen";
                playlistId = "PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw";
            }

            var playlistInfo = await Deserializer.ReadPlaylistInfoAsync(playlistId);

            var logoUrl = UrlLocator.Hosting(hostingBaseUrl, "youtube-logo.png");
            var description = $"Podcast feed for Youtube playlist \"{playlistInfo.Title}\" from user {playlistInfo.Uploader}.";
            var feed = new Rss
            {
                Channel = new Channel
                {
                    Title = playlistInfo.Title,
                    Link = playlistInfo.WebpageUrl,
                    Description = description,
                    Language = Constants.DefaultLanguage,
                    Copyright = playlistInfo.Uploader,
                    LastBuildDate = DateTimeOffset.Now.ToString("R"),
                    Generator = playlistInfo.Uploader,
                    Image = new Image
                    {
                        Url = logoUrl,
                        Title = playlistInfo.Title,
                        Link = playlistInfo.WebpageUrl,
                    },
                    Author = playlistInfo.Uploader,
                    Category = new Category
                    {
                        Text = "Society & Culture",
                        InnerCategory = new Category
                        {
                            Text = "Documentary"
                        }
                    },
                    Explicit = "yes",
                    ImageItunes = new ImageHref
                    {
                        Href =
                            logoUrl,
                    },
                    Owner = new Owner
                    {
                        Email = $"{playlistInfo.UploaderId}@youtube.com",
                        Name = playlistInfo.Uploader,
                    },
                    Subtitle = playlistInfo.Title,
                    Summary = description,
                }
            };

            feed.Channel.Items = await GetFeedItemsAsync(playlistInfo, hostingBaseUrl)
                .OrderByDescending(i => i.PubDate)
                .ThenByDescending(i => i.Title)
                .ToListAsync();

            RemoveExtraFiles(playlistInfo);

            WriteXmlFeed(feed, FileLocator.XmlFeed(playlistId));
        }

        private static void RemoveExtraFiles(PlaylistInfo playlistInfo)
        {
            var directory = FileLocator.PlaylistDirectory(playlistInfo.Id);
            var directoryInfo = new DirectoryInfo(directory);
            var subDirectories = directoryInfo.GetDirectories();

            var orphans = subDirectories
                .WhereNotIn(playlistInfo.Entries, s => s.Name, e => e.Id)
                .ToList();

            foreach (var orphan in orphans)
            {
                Console.WriteLine($"Removing old files : {orphan.FullName}");
                orphan.Delete(true);
            }
        }

        private static async IAsyncEnumerable<Item> GetFeedItemsAsync(PlaylistInfo playlistInfo, string hostingBaseUrl)
        {
            foreach (var item in playlistInfo.Entries)
            {
                var videoInfo = await Deserializer.ReadVideoInfo(playlistInfo.Id, item.Id);
                if (videoInfo == null)
                {
                    await Console.Error.WriteLineAsync($"Error: file info not found  for Id {item.Id} ({item.Title})");
                    continue;
                }
                
                await DownloadImageCover(videoInfo);

                if (!await CheckSanity(playlistInfo.Id, item.Id))
                {
                    continue;
                }
                
                yield return new Item
                {
                    Title = $"{videoInfo.Title} ⚡ {videoInfo.Uploader}",
                    Link = UrlLocator.Youtube(videoInfo.Id),
                    Description = GenerateDescription(videoInfo),
                    Author = $"{videoInfo.ChannelId}@youtube.com",
                    Category = "Leisure Games",
                    Enclosure = new Enclosure
                    {
                        Url = UrlLocator.Hosting(hostingBaseUrl, videoInfo.PlaylistId, videoInfo.Id, "audio.mp3"),
                        Length = GetFileLenth(videoInfo.PlaylistId, videoInfo.Id),
                        Type = "audio/mpeg",
                    },
                    Guid = new Guid
                    {
                        IsPermalink = true,
                        Text = videoInfo.WebpageUrl,
                    },
                    PubDate = UploadDateToDateTimeOffset(videoInfo.UploadDate),
                    Explicit = "yes",
                    AuthorItunes = videoInfo.UploaderId,
                    Keywords = string.Join(",", GetTags(videoInfo)),
                    Duration = TimeSpan.FromSeconds(videoInfo.Duration).ToString("c"),
                    Image = new ImageHref
                    {
                        Href = UrlLocator.Hosting(hostingBaseUrl, videoInfo.PlaylistId, videoInfo.Id, "audio.jpg"),
                    },
                };
            }
        }

        private static async Task<bool> CheckSanity(string playlistId, string videoId)
        {
            var videoInfo = FileLocator.VideoInfo(playlistId, videoId);
            var videoCover = FileLocator.VideoCover(playlistId, videoId);
            var videoFile = FileLocator.VideoFile(playlistId, videoId);
            if(File.Exists(videoInfo)
                && File.Exists(videoCover)
                && File.Exists(videoFile))
            {
                return true;
            }

            var folder = FileLocator.VideoFolder(playlistId, videoId);
            Directory.Delete(folder, recursive: true);

            await RemoveDownloadedStatusAsync(playlistId, videoId);
           
           return false;
        }

        private static async Task RemoveDownloadedStatusAsync(string playlistId, string videoId)
        {
            var downloaded = FileLocator.PlaylistDownloadedFiles(playlistId);
            var contents = await File.ReadAllLinesAsync(downloaded, Encoding.UTF8);
            var excludeContent = $"youtube {videoId}";
            var newContents = contents
                .Where(line => line != excludeContent)
                .ToArray();

            File.WriteAllLines(downloaded, newContents, Encoding.UTF8);
        }

        private static async Task DownloadImageCover(VideoInfo videoInfo)
        {
            var path = FileLocator.VideoCover(videoInfo.PlaylistId, videoInfo.Id);
            if (!File.Exists(path))
            {
                var wc = new WebClient();
                var thumbnail = videoInfo.Thumbnails.FirstOrDefault();
                if (thumbnail == null)
                {
                    throw new Exception($"No thumbnail found for video {videoInfo.Id} / {videoInfo.Title}");
                }

                var videoUri = new Uri(thumbnail.Url);
                await wc.DownloadFileTaskAsync(videoUri, path);
            }
        }

        private static IEnumerable<string> GetTags(VideoInfo videoInfo)
        {
            yield return "youtube";
            yield return videoInfo.UploaderId;
            if(videoInfo.Tags != null)
            {
                foreach (var tag in videoInfo.Tags)
                {
                    yield return tag;
                }
            }
        }

        private static string GenerateDescription(VideoInfo videoInfo)
        {
            var before =
                    $"📺 <b><a href=\"{videoInfo.WebpageUrl}\">{videoInfo.Title}</a></b>"
                    + $"<br />"
                    + $"💁 <a href=\"{videoInfo.UploaderUrl}\">{videoInfo.Uploader}</a>"
                    + $"<br />" +
                    $"−−−−−−"
                    + $"<br />"
                    + $"<br />"
                ;
            return before + HtmlEncode(videoInfo.Description);
        }

        private static string HtmlEncode(string description)
        {
            var encoded = HttpUtility.HtmlEncode(description);
            return Regex.Replace(encoded, @"\r\n|\r|\n", "<br />\n");
        }

        private static long GetFileLenth(string playlistId, string videoId)
        {
            var file = FileLocator.VideoFile(playlistId, videoId);
            return new FileInfo(file).Length;
        }

        private static DateTimeOffset UploadDateToDateTimeOffset(string uploadDate)
        {
            var match = Regex.Match(uploadDate, @"^(?<Year>\d{4})(?<Month>\d{2})(?<Day>\d{2})$");
            if (!match.Success)
            {
                return DateTimeOffset.Now;
            }

            var y = int.Parse(match.Groups["Year"].Value);
            var m = int.Parse(match.Groups["Month"].Value);
            var d = int.Parse(match.Groups["Day"].Value);

            return new DateTimeOffset(y, m, d, 0, 0, 0, TimeSpan.Zero);
        }

        private static void WriteXmlFeed(Rss feed, string outputFile)
        {
            var ns = new XmlSerializerNamespaces();
            ns.Add("itunes", Namespaces.AppleItunes);
            ns.Add("googleplay", Namespaces.GooglePlayPodcasts);

            using var sr = new StreamWriter(outputFile);
            var ser = new XmlSerializer(typeof(Rss));
            ser.Serialize(sr, feed, ns);
        }
    }
}