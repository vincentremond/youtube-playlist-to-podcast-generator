using System;
using System.Text.Json.Serialization;

namespace MakeRss.JsonEntities
{
    [Serializable]
    internal class Entry
    {
        [JsonPropertyName("id")] public string Id { get; set; }
        [JsonPropertyName("title")] public string Title { get; set; }
    }
}