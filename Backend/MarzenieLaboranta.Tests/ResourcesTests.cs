using MarzenieLaboranta.Domain.Entities;
using MarzenieLaboranta.Domain.Enums;
using Shouldly;
using System;
using Xunit;

namespace MarzenieLaboranta.Tests
{
    public class ResourcesTests
    {
        [Fact]
        public void GivenCorrectData_WhenCreatingNewResource_ThenResourceIsCreated()
        {
            // given
            var specification = "srebrny dlugopis";
            var instalationKey = "fa691e81-30abfb779988b";
            var seriesNumber = Guid.NewGuid();
            var dateOfPurchase = DateTime.Now;
            var localizationId = 1;
            var userId = 123;
            var type = ResourceTypeEnum.Hardware;

            //when
            var resource = new Resource(specification, seriesNumber, instalationKey, dateOfPurchase, localizationId, userId, type);

            //then
            resource.Specification.ShouldBe(specification);
            resource.InstalationKey.ShouldBe(instalationKey);
            resource.SeriesNumber.ShouldBe(seriesNumber);
            resource.DateOfPurchase.ShouldBe(dateOfPurchase);
            resource.LocalizationId.ShouldBe(localizationId);
            resource.UserId.ShouldBe(userId);
            resource.Type.ShouldBe(type);
        }
    }
}
