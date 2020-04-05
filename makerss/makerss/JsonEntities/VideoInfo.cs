using System;
using System.Text.Json.Serialization;

namespace MakeRss.JsonEntities
{
    [Serializable]
    internal class VideoInfo
    {
        [JsonPropertyName("id")] public string Id { get; set; }
        [JsonPropertyName("title")] public string Title { get; set; }
        [JsonPropertyName("description")] public string Description { get; set; }
        [JsonPropertyName("channel_id")] public string ChannelId { get; set; }
        [JsonPropertyName("playlist_id")] public string PlaylistId { get; set; }
        [JsonPropertyName("uploader")] public string Uploader { get; set; }
        [JsonPropertyName("uploader_id")] public string UploaderId { get; set; }
        [JsonPropertyName("duration")] public int Duration { get; set; }
        [JsonPropertyName("upload_date")] public string UploadDate { get; set; }
        [JsonPropertyName("uploader_url")] public string UploaderUrl { get; set; }
        [JsonPropertyName("webpage_url")] public string WebpageUrl { get; set; }
        [JsonPropertyName("channel_url")] public string ChannelUrl { get; set; }
        [JsonPropertyName("tags")] public string[] Tags { get; set; }
        [JsonPropertyName("thumbnails")] public Thumbnail[] Thumbnails { get; set; }
    }
}