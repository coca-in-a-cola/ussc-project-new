using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Serilog;
using Serilog.Context;
using USSC.Dto;
using USSC.Entities;

namespace USSC.Services;

public class ApplicationService : IApplicationService
{
    private readonly IApplicationRepository _applicationRepository;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly ILogger<ApplicationService> _logger;

    public ApplicationService(IApplicationRepository applicationRepository, IConfiguration configuration,
        IMapper mapper, ILogger<ApplicationService> logger)
    {
        _applicationRepository = applicationRepository;
        _configuration = configuration;
        _mapper = mapper;
        _logger = logger;
    }

    public Task<Guid> Add(RequestModel model)
    {
        var application = _mapper.Map<RequestEntity>(model);
        return _applicationRepository.Add(application);
    }

    public async Task<SuccessResponse> ProcessRequest(RequestModel model)
    {
        var request = _applicationRepository.GetByUserAndDirectionId(model.UserId, model.DirectionId);
        if (request is null)
            return null;
        if (request.Allow == null)
        {
            request.Allow = model.Allow;
            var id = await _applicationRepository.Update(request);
            LogContext.PushProperty("Source", "ApplicationService");
            _logger.LogInformation("No application with this data");
            return new SuccessResponse(request.Id == id);
        }

        return new SuccessResponse(false);
    }

    public List<RequestEntity> GetByUserId(Guid userId)
    {
        var request = _applicationRepository.GetByUserId(userId);
        request.ForEach(r => r.Users.RefreshToken = "0");
        return request;
    }

    public IEnumerable<RequestEntity> GetAll() => _applicationRepository.GetAll();

    public RequestEntity GetById(Guid id) => _applicationRepository.GetById(id);

    public async Task<SuccessResponse> Delete(Guid userId, Guid directionId)
    {
        try
        {
            var request = _applicationRepository.GetByUserAndDirectionId(userId, directionId);
            var response = _applicationRepository.Delete(request);
            return new SuccessResponse(true);
        }
        catch
        {
            return new SuccessResponse(false);
        }
    }
}

