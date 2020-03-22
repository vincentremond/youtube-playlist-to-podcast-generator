namespace MakeRss
{
    internal class UrlLocator
    {
        public static string Hosting(params string[] segments) => "https://pas-bien.net/wl-listen/" + string.Join("/", segments);
        public static string Youtube(string id) => $"https://www.youtube.com/watch?v={id}";
    }
}