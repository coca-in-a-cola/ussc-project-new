using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public interface IPracticeService : IService<PracticesEntity>
{
    Task<Guid> UpdateAsync(PracticesModel model);
    
    Task<Guid> AddAsync(PracticesModel model);
    public Task<SuccessResponse> Delete(Guid id);
}
