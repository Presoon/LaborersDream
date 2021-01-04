using MarzenieLaboranta.Api.Roles;
using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.DTOs;
using MarzenieLaboranta.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResourcesController : ControllerBase
    {
        private readonly IResourcesService _resourceService;
        public ResourcesController(IResourcesService resourceService)
        {
            _resourceService = resourceService;
        }

        [Authorize(Roles = SystemRoles.Admin)]
        [HttpPost("add")]
        public async Task<IActionResult> AddResource(AddResourceCommand command)
        {
            await _resourceService.AddResource(command);

            return Ok();
        }

        [Authorize(Roles = SystemRoles.Admin)]
        [HttpDelete("delete/{id}")]
        public async Task DeleteResource(long id)
        {
            await _resourceService.DeleteResource(id);

        }

        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateResource(long id, UpdateResourceCommand command)
        {
            command.Id = id;
            await _resourceService.UpdateResource(command);
            return Ok();
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<List<ResourceDTO>> GetResources()
        {
            var resources = await _resourceService.GetResources();
            return resources;
        }
        [AllowAnonymous]
        [HttpGet("qrdata/{serialNumber}")]
        public async Task<ResourceSerialNumberDTO> GetResourceBySerialNumber(Guid serialNumber)
        {
            var resource = await _resourceService.GetResourceBySerialNumber(serialNumber);
            return resource;
        }

    }
}
