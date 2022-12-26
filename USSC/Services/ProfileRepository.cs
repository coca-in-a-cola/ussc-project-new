using USSC.Entities;

namespace USSC.Services;

public class ProfileRepository : IProfileRepository
{
    private readonly DataContext _context;

    public ProfileRepository(DataContext context)
    {
        _context = context;
    }
    public List<ProfileEntity> GetAll() => _context.Set<ProfileEntity>().ToList();

    public ProfileEntity GetById(Guid id) => _context.Set<ProfileEntity>().FirstOrDefault(x => x.Id == id);

    public ProfileEntity GetByUserId(Guid userId)
    {
        return _context.Set<ProfileEntity>().FirstOrDefault(x => x.UserId == userId);
    }

    public async Task<Guid> Add(ProfileEntity entity)
    {
        var result = await _context.Set<ProfileEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity.Id;
    }

    public async Task<Guid> Update(ProfileEntity entity)
    {
        _context.Profile.Update(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    public Task Delete(ProfileEntity entity)
    {
        throw new NotImplementedException();
    }

    public Task<Guid> UpdateRefreshToken(UsersEntity usersEntity, string refreshToken)
    {
        throw new NotImplementedException();
    }
}