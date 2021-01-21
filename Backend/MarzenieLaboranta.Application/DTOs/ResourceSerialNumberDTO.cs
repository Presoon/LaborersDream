using System;
namespace MarzenieLaboranta.Application.DTOs
{
    public class ResourceSerialNumberDTO
    {
        public Guid SeriesNumber { get; set; }
        public long Id { get; set; }
        public string Specification { get; set; }
    }
}
