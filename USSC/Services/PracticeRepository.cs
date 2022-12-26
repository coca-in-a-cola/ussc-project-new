using Microsoft.EntityFrameworkCore;
using USSC.Entities;

namespace USSC.Services;

public class PracticeRepository : IPracticeRepository
{
    private readonly DataContext _context;

    public PracticeRepository(DataContext context)
    {
        _context = context;
    }

    public List<PracticesEntity> GetAll() => _context.Set<PracticesEntity>().Include(p => p.Directions).ToList();

    public PracticesEntity GetById(Guid id) => _context.Set<PracticesEntity>().FirstOrDefault(x => x.Id == id);

    public async Task<Guid> Add(PracticesEntity entity)
    {
        var result = await _context.Set<PracticesEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity.Id;
    }

    public async Task<Guid> Update(PracticesEntity entity)
    {
        _context.Practices.Update(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    public async Task Delete(PracticesEntity entity)
    {
        var result = _context.Set<PracticesEntity>().Remove(entity);
        await _context.SaveChangesAsync();
    }
}