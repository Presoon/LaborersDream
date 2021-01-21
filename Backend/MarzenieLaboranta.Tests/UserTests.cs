using MarzenieLaboranta.Domain.Entities;
using MarzenieLaboranta.Domain.Enums;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace MarzenieLaboranta.Tests
{
    public class UserTests
    {
        [Fact]
        public void GivenCorrectData_WhenCreatingNewUser_ThenUserIsCreated()
        {
            var user = new User("Anna", "Wanna", "AniWan", "AnnWanna1!", RoleEnum.Admin);

            user.Name.ShouldBe("Anna");
            user.Surname.ShouldBe("Wanna");
            user.Login.ShouldBe("AniWan");
            user.Password.ShouldBe("AnnWanna1!");
            user.Role.ShouldBe(RoleEnum.Admin);
        }
    }
}
