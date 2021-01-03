using System;
using System.Collections.Generic;
using System.Text;

namespace MarzenieLaboranta.Application.Commands
{
    public class AddFailureCommand
    {
        public string FailureDescription { get; set; }
        public long ReporterId { get; set; }
    }
}
