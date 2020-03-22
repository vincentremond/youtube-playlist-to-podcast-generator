using System.Xml.Serialization;

#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [XmlRoot(ElementName = "image", Namespace = Namespaces.AppleItunes)]
    public class ImageHref
    {
        [XmlAttribute(AttributeName = "href")] public string Href { get; set; }
    }
}