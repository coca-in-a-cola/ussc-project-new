using Microsoft.EntityFrameworkCore;
using USSC.Entities;

namespace USSC.Services;

public class DirectionRepository : IDirectionRepository
{
    private readonly DataContext _context;

    public DirectionRepository(DataContext context)
    {
        _context = context;
    }

    public List<DirectionsEntity> GetAll() => _context
        .Set<DirectionsEntity>()
        .Include(d => d.TestCase)
        .Include(d => d.Request)
        .ToList();

    public DirectionsEntity GetById(Guid id)
    {
        return _context.Directions.FirstOrDefault(d => d.Id == id);
    }

    public async Task<Guid> Add(DirectionsEntity entity)
    {
        var result = await _context.Set<DirectionsEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity.Id;
    }

    public async Task<Guid> Update(DirectionsEntity entity)
    {
        _context.Directions.Update(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    public async Task Delete(DirectionsEntity entity)
    {
        var result = _context.Directions.Remove(entity);
        await _context.SaveChangesAsync();
    }
}