using MarzenieLaboranta.Domain.Enums;

namespace MarzenieLaboranta.Application.Commands
{
    public class UpdateUserCommand
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public RoleEnum Role { get; set; }
    }
}
