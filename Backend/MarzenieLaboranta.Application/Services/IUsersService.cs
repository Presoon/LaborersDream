using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public interface IUsersService
    {
        Task<long> AddUser(AddUserCommand command);
        Task DeleteUser(long id);
        Task UpdateUser(UpdateUserCommand command);
        Task<AuthenticatedUserDTO> Authenticate(string username, string password);
        Task<List<UserDTO>> GetAllUsers();
    }
}
