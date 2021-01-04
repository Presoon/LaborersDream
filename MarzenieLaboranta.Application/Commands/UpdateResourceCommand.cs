using MarzenieLaboranta.Domain.Enums;
using System;

namespace MarzenieLaboranta.Application.Commands
{
    public class UpdateResourceCommand
    {
        public long Id { get; set; }
        public string Specification { get; set; }
        public Guid SeriesNumber { get; set; }
        public string InstalationKey { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public long LocalizationId { get; set; }
        public long? UserId { get; set; }
        public DateTime? DateOfScrapping { get; set; }
        public ResourceTypeEnum Type { get; set; }
    }
}
