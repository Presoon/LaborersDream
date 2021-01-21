using System;
using System.Collections.Generic;
using System.Text;
using MarzenieLaboranta.Domain.Enums;

namespace MarzenieLaboranta.Application.Commands
{
    public class UpdateFailureCommand
    {
        public long Id { get; set; }
        public long RepairmanId { get; set; }
        public RepairStatusEnum RepairStatus { get; set; }

    }
}
