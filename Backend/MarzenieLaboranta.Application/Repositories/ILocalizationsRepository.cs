using MarzenieLaboranta.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Repositories
{
    public interface ILocalizationsRepository
    {
        Task<long> AddLocalizations(Localization localization);
        Task DeleteLocalizations(Localization localization);
        Task<Localization> GetLocalization(long id);
        Task<List<Localization>> GetLocalizations();
    }
}
