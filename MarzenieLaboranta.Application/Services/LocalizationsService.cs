using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.Repositories;
using MarzenieLaboranta.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public class LocalizationsService : ILocalizationsService
    {
        private readonly ILocalizationsRepository _localizationsRepository;

        public LocalizationsService(ILocalizationsRepository localizationsRepository)
        {
            _localizationsRepository = localizationsRepository;
        }

        public async Task<long> AddLocalization(AddLocalizationCommand command)
        {
            var localization = new Localization(command.Name);
            return await _localizationsRepository.AddLocalizations(localization);
        }

        public async Task DeleteLocalization(long id)
        {
            var localization = await _localizationsRepository.GetLocalization(id);
            if (localization is null)
            {
                throw new Exception("Localization does not exist");
            }

            await _localizationsRepository.DeleteLocalizations(localization);
        }
    }
}
