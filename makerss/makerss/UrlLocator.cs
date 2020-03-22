namespace MakeRss
{
    internal class UrlLocator
    {
        public static string Hosting(string hostingBaseUrl, params string[] segments)
            => hostingBaseUrl + string.Join("/", segments);

        public static string Youtube(string id)
            => $"https://www.youtube.com/watch?v={id}";
    }
}