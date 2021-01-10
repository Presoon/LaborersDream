using MarzenieLaboranta.Api.Roles;
using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocalizationsController : ControllerBase
    {
        private readonly ILocalizationsService _localizationsService;

        public LocalizationsController(ILocalizationsService localizationsService)
        {
            _localizationsService = localizationsService;
        }

        [Authorize(Roles = SystemRoles.Admin)]
        [HttpPost("add")]
        public async Task<IActionResult> AddLocalization(AddLocalizationCommand command)
        {
            await _localizationsService.AddLocalization(command);
            return Ok();
        }
    }
}
