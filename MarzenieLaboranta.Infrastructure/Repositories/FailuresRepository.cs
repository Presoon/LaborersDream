using MarzenieLaboranta.Application.Repositories;
using MarzenieLaboranta.Domain.Entities;
using MarzenieLaboranta.Infrastructure.DataBase;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Infrastructure.Repositories.cs
{
    public class FailuresRepository : IFailuresRepository
    {
        private readonly InventarContext _context;
        public FailuresRepository(InventarContext context)
        {
            _context = context;
        }
        public async Task<long> AddFailuresReport(FailureReport failureReport)
        {
            _context.Add(failureReport);
            await _context.SaveChangesAsync();
            return failureReport.Id;
        }

        public async Task DeleteFailuresReport(FailureReport failureReport)
        {
            _context.FailureReports.Remove(failureReport);
            await _context.SaveChangesAsync();
        }

        public async Task<FailureReport> GetFailuresReport(long id)
        {
            var failureReport = await _context.FailureReports.FindAsync(id);
            return failureReport;
        }

        public async Task UpdateFailureReport(FailureReport failureReport)
        {
            _context.FailureReports.Update(failureReport);
            await _context.SaveChangesAsync();
        }
    }
}
