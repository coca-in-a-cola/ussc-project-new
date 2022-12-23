using Microsoft.AspNetCore.Mvc;
using Serilog.Context;
using USSC.Dto;
using USSC.Helpers;
using USSC.Services;

namespace USSC.Controllers;

[ApiController]
[Route("application")]
public class ApplicationController : ControllerBase
{
    private readonly IApplicationService _applicationService;
    private readonly ILogger<EmailSender> _loggerEmail;
    private readonly ILogger<ApplicationController> _logger;

    public ApplicationController(IApplicationService applicationService, ILogger<EmailSender> loggerEmail, ILogger<ApplicationController> logger)
    {
        LogContext.PushProperty("Source", "ApplicationController");
        _applicationService = applicationService;
        _loggerEmail = loggerEmail;
        _logger = logger;
    }

    /// <summary>
    /// Отправка заявки на определенную позицию в направлении
    /// </summary>
    /// <param name="model">Модель заявки</param>
    /// <returns></returns>
    [HttpPost("send")]
    public async Task<IActionResult> SendApplication(RequestModel model)
    {
        // var model = new RequestModel()
        // {
        //     Allow = true,
        //     DirectionId = Guid.Parse("23f10d61-a1c9-4de8-880d-dbe754b7e863"),
        // };
        var result = await _applicationService.Add(model);
        return Ok(new SuccessResponse(result != default));
    }
    
    /// <summary>
    /// Получение всех заявок, путь для администратора
    /// </summary>
    /// <returns></returns>
    // [Authorize(Roles = "Admin")]
    // [Authorize]
    [HttpGet("getAll")]
    public IActionResult GetAll()
    {
        var requests = _applicationService.GetAll().Where(x => x.Allow == null);
        if (requests.Any())
            return Ok(requests);
        return NoContent();
    }

    /// <summary>
    /// Одобрение заявки администратором
    /// </summary>
    /// <param name="requestModel"></param>
    /// <returns></returns>
    [HttpPut("approve")]
    public async Task<IActionResult> ProcessApplication(RequestModel requestModel)
    {
        var response = await _applicationService.ProcessRequest(requestModel);
        if (response is null)
        {
            _logger.LogInformation("No data with this information");
            return NoContent();
        }
            
        var emailSender = new EmailSender(_loggerEmail);
        emailSender.SendEmail("Ваша заявка проверена", "kostya.golunov2015@yandex.ru");
        return Ok(response);
    }

    /// <summary>
    /// Все заявки пользователя
    /// </summary>
    /// <param name="userId">Айди пользователя</param>
    /// <returns></returns>
    [HttpGet("getByUserId")]
    public IActionResult GetByUserId(Guid userId)
    {
        var response = _applicationService.GetByUserId(userId);
        if (response.Count == 0)
        {
            _logger.LogInformation("No request for this user or user does not exist");
            return NoContent();
        }
        return Ok(response);
    }
    
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteUser(Guid userId, Guid directionId)
    {
        var response = await _applicationService.Delete(userId, directionId);
        if (response.Success)
            return Ok();
        return NoContent();
    }
}
