using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public interface IApplicationRepository : IEfRepository<RequestEntity>
{
    public RequestEntity GetByUserAndDirectionId(Guid userId, Guid directionId);
    public List<RequestEntity> GetByUserId(Guid userId);
}