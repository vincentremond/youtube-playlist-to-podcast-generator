using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using MakeRss.JsonEntities;

namespace MakeRss
{
    internal static class Deserializer
    {
        internal static async Task<FeedInfo> ReadFeedInfoAsync(string playlistId) =>
            await GetAsync<FeedInfo>(FileLocator.FeedInfo(playlistId));

        internal static async Task<VideoInfo> ReadVideoInfo(string playlistId, string videoId) =>
            await GetAsync<VideoInfo>(FileLocator.VideoInfo(playlistId, videoId));

        private static async Task<T> GetAsync<T>(string filePath)
        {
            var contents = await File.ReadAllTextAsync(filePath);
            return JsonSerializer.Deserialize<T>(contents);
        }
    }
}