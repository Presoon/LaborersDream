using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public interface ILocalizationsService
    {
        Task<long> AddLocalization(AddLocalizationCommand command);
        Task DeleteLocalization(long id);
        Task<List<LocalizationDTO>> GetLocalizations();
    }
}
