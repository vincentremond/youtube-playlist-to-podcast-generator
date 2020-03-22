using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Serialization;
using MakeRss.FeedDescription;
using MakeRss.JsonEntities;
using Guid = MakeRss.FeedDescription.Guid;

namespace MakeRss
{
    class Program
    {
        static async Task Main(string playlistId)
        {
            //GenerateSampleData();
            Environment.CurrentDirectory = @"C:\Users\vince\Downloads\WL-Listen";
            playlistId = "PLr2bpJwdJdMhtv0CV8QjP6AU7DAX0PpNw";

            var feedInfo = await Deserializer.ReadFeedInfoAsync(playlistId);

            var logoUrl = UrlLocator.Hosting("youtube-logo.png");
            var description = $"Podcast feed for Youtube playlist \"{feedInfo.Title}\" from user {feedInfo.Uploader}.";
            var feed = new Rss
            {
                Channel = new Channel
                {
                    Title = feedInfo.Title,
                    Link = feedInfo.WebpageUrl,
                    Description = description,
                    Language = Constants.DefaultLanguage,
                    Copyright = feedInfo.Uploader,
                    LastBuildDate = DateTimeOffset.Now.ToString("R"),
                    Generator = feedInfo.Uploader,
                    Image = new Image
                    {
                        Url = logoUrl,
                        Title = feedInfo.Title,
                        Link = feedInfo.WebpageUrl,
                    },
                    Author = feedInfo.Uploader,
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
                        Email = $"{feedInfo.UploaderId}@youtube.com",
                        Name = feedInfo.Uploader,
                    },
                    Subtitle = feedInfo.Title,
                    Summary = description,
                }
            };

            feed.Channel.Items = await GetFeedItemsAsync(feedInfo)
                .OrderByDescending(i => i.PubDate)
                .ThenByDescending(i => i.Title)
                .ToListAsync();

            RemoveExtraFiles();

            WriteXmlFeed(feed, FileLocator.XmlFeed(playlistId));
        }

        private static void RemoveExtraFiles()
        {
            // TODO VRM
        }

        private static async IAsyncEnumerable<Item> GetFeedItemsAsync(FeedInfo feedInfo)
        {
            foreach (var item in feedInfo.Entries)
            {
                var videoInfo = await Deserializer.ReadVideoInfo(feedInfo.Id, item.Id);


                yield return new Item
                {
                    Title = videoInfo.Title,
                    Link = UrlLocator.Youtube(videoInfo.Id),
                    Description = HtmlEncode(videoInfo.Description),
                    Author = $"{videoInfo.ChannelId}@youtube.com",
                    Category = "Leisure Games",
                    Enclosure = new Enclosure
                    {
                        Url = UrlLocator.Hosting(videoInfo.PlaylistId, videoInfo.Id, "audio.mp3"),
                        Length = GetFileLenth(videoInfo.PlaylistId, videoInfo.Id),
                        Type = "audio/mpeg",
                    },
                    Guid = new Guid
                    {
                        IsPermalink = false,
                        Text = videoInfo.Id,
                    },
                    PubDate = UpdaloadDateToDateTimeOffset(videoInfo.UploadDate),
                    Explicit = "yes",
                    AuthorItunes = videoInfo.UploaderId,
                    Keywords = $"youtube,{videoInfo.UploaderId}",
                    Duration = TimeSpan.FromSeconds(videoInfo.Duration).ToString("c"),
                };
            }
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

        private static DateTimeOffset UpdaloadDateToDateTimeOffset(string videoInfoUploadDate)
        {
            var match = Regex.Match(videoInfoUploadDate, @"^(?<Year>\d{4})(?<Month>\d{4})(?<Day>\d{2})$");
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