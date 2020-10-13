namespace MakeRss
{
    internal class FileLocator
    {
        public static string PlaylistDirectory(string playlistId)
            => $@"data\{playlistId}\";

        public static string PlaylistDownloadedFiles(string playlistId)
            => $@"data\{playlistId}\downloaded.txt";

        public static string PlaylistInfo(string playlistId)
            => $@"data\{playlistId}\playlist.json";

        public static string XmlFeed(string playlistId)
            => $@"data\{playlistId}\feed.xml";

        public static string VideoInfo(string playlistId, string videoId)
            => $@"data\{playlistId}\{videoId}\audio.info.json";

        public static string VideoFile(string playlistId, string videoId)
            => $@"data\{playlistId}\{videoId}\audio.mp3";

        public static string VideoCover(string playlistId, string videoId)
            => $@"data\{playlistId}\{videoId}\audio.jpg";
        
        public static string VideoFolder(string playlistId, string videoId)
            => $@"data\{playlistId}\{videoId}\";
    }
}