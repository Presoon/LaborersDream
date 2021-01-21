using MarzenieLaboranta.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MarzenieLaboranta.Domain.Entities
{
    public class FailureReport
    {
        public long Id { get; set; }
        public string FailureDescription { get; set; }
        public long ReporterId { get; set; }
        public long ResourceId { get; set; }
        public long RepairmanId { get; set; }
        public DateTime DateOfReporting { get; set; }
        public RepairStatusEnum RepairStatus { get; set; }
        public Resource Resource { get; set; }

        public FailureReport(string failureDescription, long resourceId, long reporterId, DateTime dateOfReporting, RepairStatusEnum repairStatus)
        {
            FailureDescription = failureDescription;
            ResourceId = resourceId;
            ReporterId = reporterId;
            DateOfReporting = dateOfReporting;
            RepairStatus = repairStatus;
        }

        public FailureReport()
        {

        }
        
    }
}
