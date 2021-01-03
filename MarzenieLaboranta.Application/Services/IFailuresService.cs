using MarzenieLaboranta.Application.Commands;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public interface IFailuresService
    {
        Task<long> AddFailureReport(AddFailureCommand command);
        Task DeleteFailureReport(long id);
        Task UpdateFailureReport(UpdateFailureCommand command);
    }
}
