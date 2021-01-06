using MarzenieLaboranta.Domain.Enums;
using System;

namespace MarzenieLaboranta.Application.Commands
{
   public class AddResourceCommand
    {
        public string Specification { get; set; }                    
        public string InstalationKey { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public long LocalizationId { get; set; }
        public long? UserId { get; set; }
        public ResourceTypeEnum Type { get; set; }
    }
}
