using MarzenieLaboranta.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Repositories
{
    public interface IResourcesRepository
    {
        Task<long> AddResource(Resource resource);
        Task DeleteResource(Resource resource);
        Task<Resource> GetResource(long id);
        Task UpdateResource(Resource resource);
        Task<List<Resource>> GetResources();
        Task<Resource> GetResourceBySerialNumber(Guid seriesNumber);
    }
}
