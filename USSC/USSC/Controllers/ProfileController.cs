using Microsoft.AspNetCore.Mvc;
using Serilog.Context;
using USSC.Dto;
using USSC.Entities;
using USSC.Helpers;
using USSC.Services;

namespace USSC.Controllers;

[ApiController]
[Route("profile")]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;
    private readonly IUserService _userService;
    private readonly ILogger<ProfileController> _logger;

    public ProfileController(IProfileService profileService, IUserService userService, ILogger<ProfileController> logger)
    {
        LogContext.PushProperty("Source", "ProfileController");
        _profileService = profileService;
        _logger = logger;
        _userService = userService;
    }
    
    [HttpGet("getByUserId")]
    public IActionResult GetProfileInfo(Guid userId)
    {
        var profile = _profileService.GetByUserId(userId);
        if (profile == null)
            return NoContent();
        // Вытаскивает все поля юзера, в том числе пароль, требует фикса!!!
        profile.Users = null;
        return Ok(profile);
    }

    [HttpPost("fill")]
    public async Task<IActionResult> FillProfileInfo(ProfileModel profileModel)
    {
        // profileModel.UserId = Guid.Parse(HttpContext.Items["Users"].ToString());
        var user = _userService.GetById(profileModel.UserId);
        if (user is null)
        {
            _logger.LogInformation("Incorrect user Id or user does not exist");
            return NoContent();
        }
        var result = await _profileService.Add(profileModel);
        return Ok(new SuccessResponse(true));
        
    }

    // [Authorize]
    [HttpPut("update")]
    public IActionResult UpdateProfileInfo(ProfileModel profileModel)
    {
        try
        {
            var id = _profileService.Update(profileModel);
            return Ok(new SuccessResponse(profileModel.Id == id.Result));
        }
        catch
        {
            _logger.LogInformation("Failed update user profile");
            return BadRequest(new {Message = "Не удалось обновить профиль", StatusCode=StatusCode(400)});
        }
    }
}