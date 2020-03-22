using System.Xml.Serialization;
#pragma warning disable 1591

namespace MakeRss.FeedDescription
{
    [XmlRoot(ElementName = "owner", Namespace = Namespaces.AppleItunes)]
    public class Owner
    {
        [XmlElement(ElementName = "email", Namespace = Namespaces.AppleItunes)]
        public string Email { get; set; }

        [XmlElement(ElementName = "name", Namespace = Namespaces.AppleItunes)]
        public string Name { get; set; }
    }
}