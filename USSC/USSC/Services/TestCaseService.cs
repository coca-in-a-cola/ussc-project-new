using USSC.Entities;
using AutoMapper;
using USSC.Dto;

namespace USSC.Services;

public class TestCaseService : ITestCaseService
{
    private readonly ITestCaseRepository _testcaseRepository;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;

    public TestCaseService(ITestCaseRepository testcaseRepository, IConfiguration configuration, IMapper mapper)
    {
        _testcaseRepository = testcaseRepository;
        _configuration = configuration;
        _mapper = mapper;
    }

    public IEnumerable<TestCaseEntity> GetAll() => _testcaseRepository.GetAll();

    public TestCaseEntity GetById(Guid id) => _testcaseRepository.GetById(id);

    public async Task<SuccessResponse> ReviewTestCaseAsync(ReviewedTestCase reviewedTestCase)
    {
        try
        {
            var testCaseEntity = _testcaseRepository.GetByUserId(reviewedTestCase.UserId, reviewedTestCase.DirectionId);
            foreach (var field in reviewedTestCase.GetType().GetProperties())
            {
                var prop = testCaseEntity.GetType().GetProperty(field.Name);
                prop?.SetValue(testCaseEntity, field.GetValue(reviewedTestCase));
            }
            await _testcaseRepository.Update(testCaseEntity);

            return  new SuccessResponse(true);
        }
        catch
        {
            return new SuccessResponse(false);
        }
        
    }

    public Task<Guid> Upload(TestCaseModel testCaseModelmodel)
    {
        var entity = _mapper.Map<TestCaseEntity>(testCaseModelmodel);
        entity.Directions = null;
        return _testcaseRepository.Add(entity);
    }

    public string DownLoad(Guid userId, Guid directionId)
    {
        var testCase = _testcaseRepository.GetByUserId(userId, directionId);
        return testCase != null ? testCase.Path : null;
    }

    public string? GetPath(Guid userId, Guid directionId)
    {
        return _testcaseRepository.GetPath(userId, directionId);
    }
}