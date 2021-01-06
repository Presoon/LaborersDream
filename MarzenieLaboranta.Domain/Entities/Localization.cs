using System.Collections.Generic;

namespace MarzenieLaboranta.Domain.Entities
{
    public class Localization
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Resource> Resources { get; set; }

        public Localization(string name)
        {
            Name = name;
        }
    }
}
