using MarzenieLaboranta.Domain.Enums;

namespace MarzenieLaboranta.Application.Commands
{
    public class UpdateFailureStatusCommand
    {
        public long Id { get; set; }
        public RepairStatusEnum RepairStatus { get; set; }
    }
}
