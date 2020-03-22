using System;
using System.Xml;
using System.Xml.Serialization;

#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [Serializable]
    [XmlRoot(ElementName = "item")]
    public class Item
    {
        // [XmlAnyElement("ItemComment")] public XmlComment ItemComment
        // {
        //     get => new XmlDocument().CreateComment(Title);
        //     set => throw new NotImplementedException();
        // }

        [XmlElement(ElementName = "title")] public string Title { get; set; }
        [XmlElement(ElementName = "link")] public string Link { get; set; }
        [XmlElement(ElementName = "description")] public string Description { get; set; }
        [XmlElement(ElementName = "author")] public string Author { get; set; }
        [XmlElement(ElementName = "category")] public string Category { get; set; }
        [XmlElement(ElementName = "enclosure")] public Enclosure Enclosure { get; set; }
        [XmlElement(ElementName = "guid")] public Guid Guid { get; set; }
        [XmlIgnore] public DateTimeOffset PubDate { get; set; }

        [XmlElement(ElementName = "pubDate")] public string PubDateString
        {
            get => PubDate.ToString("R");
            set => throw new NotImplementedException();
        }

        [XmlElement(ElementName = "title", Namespace = Namespaces.AppleItunes)] public string TitleItunes
        {
            get => Title;
            set => Title = value;
        }

        [XmlElement(ElementName = "author", Namespace = Namespaces.AppleItunes)] public string AuthorItunes { get; set; }
        [XmlElement(ElementName = "explicit", Namespace = Namespaces.AppleItunes)] public string Explicit { get; set; }
        [XmlElement(ElementName = "keywords", Namespace = Namespaces.AppleItunes)] public string Keywords { get; set; }

        [XmlElement(ElementName = "subtitle", Namespace = Namespaces.AppleItunes)] public string Subtitle
        {
            get => Title;
            set => Title = value;
        }

        [XmlElement(ElementName = "summary", Namespace = Namespaces.AppleItunes)] public string Summary
        {
            get => Description;
            set => Description = value;
        }

        [XmlElement(ElementName = "duration", Namespace = Namespaces.AppleItunes)] public string Duration { get; set; }
        [XmlElement(ElementName = "block", Namespace = Namespaces.GooglePlayPodcasts)] public string Block { get; set; }
    }
}