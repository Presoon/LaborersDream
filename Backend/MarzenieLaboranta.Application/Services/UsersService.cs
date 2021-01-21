using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.DTOs;
using MarzenieLaboranta.Application.Helpers;
using MarzenieLaboranta.Application.Repositories;
using MarzenieLaboranta.Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly AppSettings _appSettings;

        public UsersService(IUsersRepository usersRepository,
            IOptions<AppSettings> appSettings)
        {
            _usersRepository = usersRepository;
            _appSettings = appSettings.Value;
        }
        public async Task<long> AddUser(AddUserCommand command)
        {
            var user = new User(command.Name, command.Surname, command.Login, command.Password, command.Role);

            return await _usersRepository.AddUser(user);
        }

        public async Task<AuthenticatedUserDTO> Authenticate(string login, string password)
        {
            var user = await _usersRepository.FindUserForAuthentication(login, password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role.ToString())          //dzięki temu, że dałam tutaj tą role możemy autoryzować po tym kto strzela(w sensie czy admin czy laborant czy..)
                }),
                Expires = DateTime.UtcNow.AddHours(5),            //data wygaśnięcia tokenu, ustawiłam na 5h
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var authenticatedUser = new AuthenticatedUserDTO(user.Id, user.Name, user.Surname, user.Login, user.Role, tokenString);

            return authenticatedUser;
        }

        public async Task DeleteUser(long id)
        {
            var user = await _usersRepository.GetUser(id);
            if (user is null)
            {
                throw new Exception("User does not exist");
            }

            await _usersRepository.DeleteUser(user);
        }

        public async Task<List<UserDTO>> GetAllUsers()
        {
            var users = await _usersRepository.GetUsers();
            return users.Select(u => new UserDTO(u.Id, u.Name, u.Surname, u.Login, u.Role)).ToList();
        }

        public async Task UpdateUser(UpdateUserCommand command)
        {
            var user = await _usersRepository.GetUser(command.Id);
            if (user is null)
            {
                throw new Exception("User does not exist");
            }

            user.Name = command.Name;
            user.Surname = command.Surname;
            user.Role = command.Role;
            await _usersRepository.UpdateUser(user);
        }
    }
}
