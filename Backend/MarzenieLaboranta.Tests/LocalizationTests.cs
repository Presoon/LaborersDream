using MarzenieLaboranta.Domain.Entities;
using Shouldly;
using Xunit;

namespace MarzenieLaboranta.Tests
{
    public class LocalizationTests
    {
        [Fact]
        public void GivenCorrectData_WhenCreatingNewLocalization_ThenLocalizationIsCreated()
        {
            // given
            var name = "New localization";

            //when
            var localization = new Localization(name);

            //then
            localization.Name.ShouldBe(name);
        }
    }
}
