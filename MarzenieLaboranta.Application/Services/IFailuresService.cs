using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public interface IFailuresService
    {
        Task<long> AddFailureReport(AddFailureCommand command);
        Task DeleteFailureReport(long id);
        Task UpdateFailureReport(UpdateFailureCommand command);
        Task<List<FailureReportShortDTO>> GetFailuresReportShort();
        Task<List<FailureReportShortDTO>> GetAllFailuresReportShort();
        Task UpdateStatus(UpdateFailureStatusCommand command);
    }
}
