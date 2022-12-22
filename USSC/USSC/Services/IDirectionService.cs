using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public interface IDirectionService 
{
    Task<Guid> Add(DirectionsModel userModel);
    public DirectionsEntity GetById(Guid id);
    Task<Guid> UpdateAsync(DirectionsModel model);
    public Task<SuccessResponse> Delete(Guid id);
}