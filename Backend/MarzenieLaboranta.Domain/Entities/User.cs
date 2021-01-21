using MarzenieLaboranta.Domain.Enums;

namespace MarzenieLaboranta.Domain.Entities
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public RoleEnum Role { get; set; }

        public User(string name, string surname, string login, string password, RoleEnum role)
        {
            Name = name;
            Surname = surname;
            Login = login;
            Password = password;
            Role = role;
        }
    }
}
