using System;
using System.Text.Json.Serialization;

namespace MakeRss.JsonEntities
{
    [Serializable]
    internal class Thumbnail
    {
        [JsonPropertyName("id")] public string Id { get; set; }
        [JsonPropertyName("url")] public string Url { get; set; }
    }
}