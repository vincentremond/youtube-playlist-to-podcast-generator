using System.Xml.Serialization;
#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [XmlRoot(ElementName = "category", Namespace = Namespaces.AppleItunes)]
    public class Category
    {
        [XmlAttribute(AttributeName = "text")] public string Text { get; set; }

        [XmlElement(ElementName = "category", Namespace = Namespaces.AppleItunes)] public Category InnerCategory { get; set; }
    }
}