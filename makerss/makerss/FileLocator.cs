namespace MakeRss
{
    internal class FileLocator
    {
        public static string FeedInfo(string playlistId)
            => $@"data\{playlistId}\playlist.json";

        public static string XmlFeed(string playlistId)
            => $@"data\{playlistId}\feed.xml";

        public static string VideoInfo(string playlistId, string videoId)
            => $@"data\{playlistId}\{videoId}\audio.info.json";

        public static string VideoFile(string playlistId, string videoId)
            => $@"data\{playlistId}\{videoId}\audio.mp3";
    }
}