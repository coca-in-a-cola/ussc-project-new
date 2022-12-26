using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Serilog.Context;
using USSC.Dto;
using USSC.Helpers;
using USSC.Services;

namespace USSC.Controllers;

[ApiController]
[Route("user")]
// [EnableCors]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(IUserService userService, ILogger<UsersController> logger)
    {
        LogContext.PushProperty("Source", "UserController");
        _userService = userService;
        _logger = logger;
    }

    /// <summary>
    /// Вход в аккаунт
    /// </summary>
    /// <param name="model">Модель для входа в аккаунт (Почта, пароль)</param>
    /// <returns></returns>
    [HttpPost("signin")]
    // [EnableCors]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);

        if (response == null)
        {
            _logger.LogInformation("Problem in authenticate");
            return BadRequest(new { message = "Username or password is incorrect" });
        }

        return Ok(response);
    }
    
    [HttpPut("create")]
    public IActionResult Create(string userEmail)
    {   
        var response = _userService.CreateAdmin(userEmail);

        if (response == null)
        {
            _logger.LogInformation("Problem in create");
            return BadRequest(new {message = "Didn't create"});
        }
        return Ok(response);
    }
    
    /// <summary>
    /// Регистрация пользователя
    /// </summary>
    /// <param name="userModel">Основная модель данных для пользователя</param>
    /// <returns></returns>
    [HttpPost("register")]
    // [EnableCors]
    public async Task<IActionResult> Register(UserModel userModel)
    {
        var response = await _userService.Register(userModel);

        if (response == null)
        {
            _logger.LogInformation("Problem in register");
            return BadRequest(new {message = "Didn't register!"});
        }

        return Ok(response);
    }

    /// <summary>
    /// Возвращает всех пользователей, которые зарегистрированы
    /// </summary>
    /// <returns></returns>
    // [Authorize(Roles="Admin")]
    [HttpGet("getAll")]
    // [EnableCors]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        if (users.Count() == 0)
        {
            _logger.LogInformation("No users");
            return NoContent();
        }
        
        return Ok(users);
    }

    // Если все хорошо, возвращает ФИО, возможно надо перенести в profile
    // [Authorize]
    [HttpGet]
    public ActionResult CheckToken()
    {
        return NoContent();
    }

    /// <summary>
    /// Создает новый рефреш и аксес токены и отдает их, рефреш токен сохраняется в бд
    /// </summary>
    /// <param name="userId">Идентификатор пользователя, Guid</param>
    /// <param name="refreshToken">Старый рефреш токен пользователя</param>
    /// <returns></returns>
    // [Authorize]
    [HttpPut("refresh")]
    public IActionResult UpdateRefreshToken(Guid userId, string refreshToken)
    {
        var user = _userService.GetById(userId);
        if (user is null)
        {
            _logger.LogInformation("Incorrect user Id or user does not exist");
            return NoContent();
        }

        if (user.RefreshToken != refreshToken)
        {
            _logger.LogError($"Bad token: {refreshToken}");
            return BadRequest(new { message = "Token not valid" });
        }
            
        var response = _userService.UpdateTokens(user, refreshToken);
        return Ok(response);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteUser(string email)
    {
        var response = await _userService.Delete(email);
        if (response.Success)
            return Ok();
        return NoContent();
    }
}
