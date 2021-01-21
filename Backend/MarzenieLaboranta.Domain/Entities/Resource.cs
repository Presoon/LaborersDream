using MarzenieLaboranta.Domain.Enums;
using System;
using System.Collections.Generic;

namespace MarzenieLaboranta.Domain.Entities
{
    public class Resource
    {
        public long Id { get; set; }
        public string Specification { get; set; }
        public Guid SeriesNumber { get; set; }                       // pole pod kod kreskowy i QR
        public string InstalationKey { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public Localization Localization { get; set; }
        public long LocalizationId { get; set; }
        public long? UserId { get; set; }
        public DateTime? DateOfScrapping { get; set; }
        public ResourceTypeEnum Type { get; set; }
        public List<FailureReport> FailureReports { get; set; }
        public void Scrap()
        {
            if(DateOfScrapping!=null)
            {
                throw new Exception("Resource is already scrapped");
            }

            DateOfScrapping = DateTime.Now;
        }

        public Resource(string specification, Guid seriesNumber, string instalationKey, DateTime dateOfPurchase, long localizationId, long? userId, ResourceTypeEnum type)
        {
            Specification = specification;
            SeriesNumber = seriesNumber;
            InstalationKey = instalationKey;
            DateOfPurchase = dateOfPurchase;
            LocalizationId = localizationId;
            UserId = userId;
            Type = type;
        }
    }
}
