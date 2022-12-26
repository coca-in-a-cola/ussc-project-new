using USSC.Entities;

namespace USSC.Services;

public interface IUserRepository : IEfRepository<UsersEntity>
{
    Task<Guid> UpdateRefreshToken(UsersEntity usersEntity, string refreshToken);
    Task<UsersEntity> GetByUserEmail(string userEmail);
}