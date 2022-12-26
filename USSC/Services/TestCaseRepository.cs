using Microsoft.EntityFrameworkCore;
using USSC.Entities;
namespace USSC.Services;


public class TestCaseRepository: ITestCaseRepository
{
    private readonly DataContext _context;

    public TestCaseRepository(DataContext context)
    {
        _context = context;
    }
    
    public List<TestCaseEntity> GetAll() => _context
        .Set<TestCaseEntity>()
        .ToList();

    public TestCaseEntity GetById(Guid id) => _context.Set<TestCaseEntity>().FirstOrDefault(x => x.Id == id);
    
    public async Task<Guid> Add(TestCaseEntity entity)
    {
        var result = await _context.Set<TestCaseEntity>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity.Id;
    }

    public async Task<Guid> Update(TestCaseEntity entity)
    {
        _context.TestCase.Update(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    public Task Delete(TestCaseEntity entity)
    {
        throw new NotImplementedException();
    }

    public TestCaseEntity GetByUserId(Guid userId, Guid directionId)
    {
        var testCase = _context.Set<TestCaseEntity>().FirstOrDefault(x =>
            x.UserId == userId && x.DirectionId == directionId);
        return testCase;
    }

    public string? GetPath(Guid userId, Guid directionId)
    {
        var response = _context.Set<TestCaseEntity>().FirstOrDefault(x =>
            x.UserId == userId && x.DirectionId == directionId);
        if (response is null)
            return null;
        return response.Path;
    }
}