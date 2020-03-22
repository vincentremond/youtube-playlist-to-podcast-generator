using System.Xml.Serialization;
#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [XmlRoot(ElementName = "guid")]
    public class Guid
    {
        [XmlAttribute(AttributeName = "isPermalink")]
        public bool IsPermalink { get; set; }

        [XmlText]
        public string Text { get; set; }
    }
}