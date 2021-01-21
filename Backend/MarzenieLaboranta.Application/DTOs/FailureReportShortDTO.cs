using MarzenieLaboranta.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MarzenieLaboranta.Application.DTOs
{
    public class FailureReportShortDTO
    {
        public long Id { get; set; }
        public string FailureDescription { get; set; }
        public DateTime DateOfReporting { get; set; }
        public RepairStatusEnum RepairStatus { get; set; }

        public FailureReportShortDTO(long id, string failureDescription, DateTime dateOfReporting, RepairStatusEnum repairStatus)
        {
            Id = id;
            FailureDescription = failureDescription;
            DateOfReporting = dateOfReporting;
            RepairStatus = repairStatus;
        }
    }
}
