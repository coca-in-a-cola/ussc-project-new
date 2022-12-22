using USSC.Entities;

namespace USSC.Services;

public interface IProfileRepository : IEfRepository<ProfileEntity>
{
    // Task<Guid> Add(ProfileEntity entity);
    ProfileEntity GetByUserId(Guid userId);
}