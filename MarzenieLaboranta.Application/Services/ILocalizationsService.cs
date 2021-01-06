using MarzenieLaboranta.Application.Commands;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public interface ILocalizationsService
    {
        Task<long> AddLocalization(AddLocalizationCommand command);
        Task DeleteLocalization(long id);
    }
}
