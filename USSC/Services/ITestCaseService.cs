using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public interface ITestCaseService: IService<TestCaseEntity>
{
    public Task<SuccessResponse> ReviewTestCaseAsync(ReviewedTestCase reviewedTestCase);
    public Task<Guid> Upload(TestCaseModel testCaseModel);
    public string DownLoad(Guid userId, Guid directionId);
    public string GetPath(Guid userId, Guid directionId);

}