using MarzenieLaboranta.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MarzenieLaboranta.Application.DTOs
{
    public class UserDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public RoleEnum Role { get; set; }

        public UserDTO(long id, string name, string surname, string login, RoleEnum role)
        {
            Id = id;
            Name = name;
            Surname = surname;
            Login = login;
            Role = role;
        }
    }
}
