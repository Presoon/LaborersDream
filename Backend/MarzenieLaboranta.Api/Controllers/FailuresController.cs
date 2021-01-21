using MarzenieLaboranta.Api.Roles;
using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.DTOs;
using MarzenieLaboranta.Application.Services;
using MarzenieLaboranta.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FailuresController : ControllerBase
    {
        private readonly IFailuresService _failuresService;
        public FailuresController(IFailuresService failuresService)
        {
            _failuresService = failuresService;
        }

        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddFailureReport(AddFailureCommand command)
        {
            await _failuresService.AddFailureReport(command);
            return Ok();
        }

        [Authorize]
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(long id, UpdateFailureStatusCommand command)
        {
            command.Id = id;
            await _failuresService.UpdateStatus(command);
            return Ok();
        }

        [Authorize]
        [HttpDelete("delete/{id}")]
        public async Task DeleteFailureReport(long id)
        {
            await _failuresService.DeleteFailureReport(id);

        }
        [Authorize]
        [HttpGet("all-waiting")]
        public async Task<List<FailureReport>> GetFailuresReportShort()
        {
            return await _failuresService.GetFailuresReportShort();
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<List<FailureReport>> GetAllFailuresReportShort()
        {
            return await _failuresService.GetAllFailuresReportShort();
        }


    }
}
