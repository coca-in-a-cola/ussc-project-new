using Microsoft.EntityFrameworkCore;
using USSC.Dto;
using USSC.Entities;
namespace USSC.Services;

public class ApplicationRepository : IApplicationRepository
{
    private readonly DataContext _context;

    public ApplicationRepository(DataContext context)
    {
        _context = context;
    }

    public List<RequestEntity> GetAll()
    {
        return _context.Set<RequestEntity>().ToList();
    }

    public RequestEntity GetById(Guid id)
    {
       return _context.Set<RequestEntity>().FirstOrDefault(x => x.Id == id);
    }

    public async Task<Guid> Add(RequestEntity entity)
    {
        var result = await _context.Set<RequestEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity.Id;
    }

    public async Task<Guid> Update(RequestEntity entity)
    {
        _context.Request.Update(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    public Task Delete(RequestEntity entity)
    {
        throw new NotImplementedException();
    }

    public RequestEntity GetByUserAndDirectionId(Guid userId, Guid directionId)
    {
        var testCase = _context.Set<RequestEntity>().FirstOrDefault(x =>
            x.UserId == userId && x.DirectionId == directionId);
        return testCase;
    }

    public List<RequestEntity> GetByUserId(Guid userId)
    {
        var response = _context
            .Set<RequestEntity>()
            .Where(x => x.UserId == userId)
            .Include(r => r.Directions)
            .Include(r => r.Users.Profile)
            .ToList();
        return response;
    }
}