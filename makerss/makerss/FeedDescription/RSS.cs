using System.Xml.Serialization;
#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [XmlRoot(ElementName = "rss")]
    public class Rss
    {
        [XmlAttribute(AttributeName = "version")] public string Version { get; set; } = "2.0";
        [XmlElement(ElementName = "channel")] public Channel Channel { get; set; }
    }
}