using Microsoft.AspNetCore.Mvc;
using USSC.Entities;
using USSC.Dto;
namespace USSC.Services;

public interface IApplicationService : IService<RequestEntity>
{
    Task<Guid> Add(RequestModel model);

    Task<SuccessResponse> ProcessRequest(RequestModel model);
    public List<RequestEntity> GetByUserId(Guid userId);
}