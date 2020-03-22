using System;
using System.Text.Json.Serialization;

namespace MakeRss.JsonEntities
{
    [Serializable]
    internal class PlaylistInfo
    {
        [JsonPropertyName("id")] public string Id { get; set; }
        [JsonPropertyName("title")] public string Title { get; set; }
        [JsonPropertyName("webpage_url")] public string WebpageUrl { get; set; }
        [JsonPropertyName("uploader")] public string Uploader { get; set; }
        [JsonPropertyName("uploader_id")] public string UploaderId { get; set; }
        [JsonPropertyName("entries")] public Entry[] Entries { get; set; }
    }
}