using System.Xml.Serialization;

#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [XmlRoot(ElementName = "enclosure")]
    public class Enclosure
    {
        [XmlAttribute(AttributeName = "url")] public string Url { get; set; }
        [XmlAttribute(AttributeName = "length")] public long Length { get; set; }
        [XmlAttribute(AttributeName = "type")] public string Type { get; set; }
    }
}