using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public interface IResourcesService
    {
        Task<long> AddResource(AddResourceCommand command);
        Task DeleteResource(long id);
        Task UpdateResource(UpdateResourceCommand command);
        Task ScrappResource(long resourceId);
        Task<List<ResourceDTO>> GetResources();
        Task<ResourceSerialNumberDTO> GetResourceBySerialNumber(Guid seriesNumber);
    }
}
