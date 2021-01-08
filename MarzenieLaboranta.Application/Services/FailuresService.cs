using MarzenieLaboranta.Application.Commands;
using MarzenieLaboranta.Application.Repositories;
using MarzenieLaboranta.Domain.Entities;
using MarzenieLaboranta.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MarzenieLaboranta.Application.Services
{
    public class FailuresService : IFailuresService
    {
        private readonly IFailuresRepository _failuresRepository;
       
        public FailuresService(IFailuresRepository failuresRepository)
        {
            _failuresRepository = failuresRepository;
        }

        public async Task<long> AddFailureReport(AddFailureCommand command)
        {
            var failureReport = new FailureReport(command.FailureDescription, command.ReporterId, DateTime.Now, RepairStatusEnum.Waiting);

            return await _failuresRepository.AddFailuresReport(failureReport);
        }

        public async Task DeleteFailureReport(long id)
        {
            var failureReport = await _failuresRepository.GetFailuresReport(id);
            if (failureReport is null)
            {
                throw new Exception("FailureReport does not exist");
            }

            await _failuresRepository.DeleteFailuresReport(failureReport);
        }

        public async Task UpdateFailureReport(UpdateFailureCommand command)
        {
            var failureReport = await _failuresRepository.GetFailuresReport(command.Id);
            if (failureReport is null)
            {
                throw new Exception("FailureReport does not exist");
            }
            failureReport.RepairmanId = command.RepairmanId;
            failureReport.RepairStatus = command.RepairStatus;

            await _failuresRepository.UpdateFailureReport(failureReport);
        }
    }
}
