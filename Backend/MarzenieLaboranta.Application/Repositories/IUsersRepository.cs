using MarzenieLaboranta.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Repositories
{
    public interface IUsersRepository
    {
        Task<long> AddUser(User user);
        Task DeleteUser(User user);
        Task UpdateUser(User user);
        Task<User> GetUser(long id);
        Task<User> FindUserForAuthentication(string login, string password);
        Task<List<User>> GetUsers();
    }
}
