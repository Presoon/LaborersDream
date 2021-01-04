using MarzenieLaboranta.Application.Repositories;
using MarzenieLaboranta.Domain.Entities;
using MarzenieLaboranta.Infrastructure.DataBase;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Infrastructre.Repositories
{
    public class ResourcesRepository : IResourcesRepository
    {
        private readonly InventarContext _context;
        public ResourcesRepository(InventarContext context)
        {
            _context = context;
        }

        public async Task<long> AddResource(Resource resource)
        {
            _context.Add(resource);
            await _context.SaveChangesAsync();
            return resource.Id;
        }

        public async Task DeleteResource(Resource resource)
        {
            _context.Resources.Remove(resource);

            await _context.SaveChangesAsync();
        }

        public async Task<Resource> GetResource(long id)
        {
            var resource = await _context.Resources.FindAsync(id);
            return resource;
        }

        public async Task<List<Resource>> GetResources()
        {
            var resources = await _context.Resources.Include(r=>r.Localization).Include(r=>r.FailureReports).ToListAsync();
            return resources;
        }

        public async Task<Resource> GetResourceBySerialNumber(Guid seriesNumber)
        {
            var resourceSerialNumber = await _context.Resources.FirstOrDefaultAsync(s=>s.SeriesNumber== seriesNumber);
            return resourceSerialNumber;
        }

        public async Task UpdateResource(Resource resource)
        {
            _context.Resources.Update(resource);
            await _context.SaveChangesAsync();
        }
    }
}
