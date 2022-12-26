using Microsoft.EntityFrameworkCore;
using USSC.Entities;

namespace USSC.Services;

//create baseEntity and DataContext

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }

    public List<UsersEntity> GetAll()
    {
        return _context
            .Set<UsersEntity>()
            .Include(u => u.Profile)
            .Include(u => u.Request)
            .Include(u => u.TestCase)
            .ToList();
    }

    public UsersEntity GetById(Guid id)
    {
        var result = _context.Set<UsersEntity>().FirstOrDefault(x => x.Id == id);

        if (result == null)
        {
            //todo: need to add logger
            return null;
        }

        return result;
    }

    public async Task<Guid> Add(UsersEntity entity)
    {
        var result = await _context.Set<UsersEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity.Id;
    }

    public async Task<Guid> Update(UsersEntity entity)
    {
        var result = _context.Set<UsersEntity>().FirstOrDefault(x => x.Id == entity.Id);
        await _context.SaveChangesAsync();
        return result.Id;
    }

    public async Task Delete(UsersEntity entity)
    {
        var result = _context.Set<UsersEntity>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<Guid> UpdateRefreshToken(UsersEntity entity, string refreshToken)
    {
        var result = _context.Set<UsersEntity>().FirstOrDefault(x => x.Id == entity.Id);
        _context.Users.Update(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    public async Task<UsersEntity> GetByUserEmail(string userEmail)
    {
        var user = await _context.Set<UsersEntity>().FirstOrDefaultAsync(x => x.Email == userEmail);
        if (user == null)
            return null;
        return user;
    }
}