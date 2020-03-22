using System.Collections.Generic;
using System.Xml.Serialization;
#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [XmlRoot(ElementName = "channel")]
    public class Channel
    {
        [XmlElement(ElementName = "title")] public string Title { get; set; }
        [XmlElement(ElementName = "link")] public string Link { get; set; }
        [XmlElement(ElementName = "description")] public string Description { get; set; }
        [XmlElement(ElementName = "language")] public string Language { get; set; }
        [XmlElement(ElementName = "copyright")] public string Copyright { get; set; }
        [XmlElement(ElementName = "lastBuildDate")] public string LastBuildDate { get; set; }
        [XmlElement(ElementName = "generator")] public string Generator { get; set; }
        [XmlElement(ElementName = "image")] public Image Image { get; set; }
        [XmlElement(ElementName = "author", Namespace = Namespaces.AppleItunes)] public string Author { get; set; }
        [XmlElement(ElementName = "category", Namespace = Namespaces.AppleItunes)] public Category Category { get; set; }

        [XmlElement(ElementName = "explicit", Namespace = Namespaces.AppleItunes)] public string Explicit { get; set; }
        [XmlElement(ElementName = "image", Namespace = Namespaces.AppleItunes)] public ImageHref ImageItunes { get; set; }
        [XmlElement(ElementName = "owner", Namespace = Namespaces.AppleItunes)] public Owner Owner { get; set; }
        [XmlElement(ElementName = "subtitle", Namespace = Namespaces.AppleItunes)] public string Subtitle { get; set; }
        [XmlElement(ElementName = "summary", Namespace = Namespaces.AppleItunes)] public string Summary { get; set; }
        [XmlElement(ElementName = "item")] public List<Item> Items { get; set; }
    }
}