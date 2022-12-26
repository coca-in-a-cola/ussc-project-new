using System.Security.AccessControl;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using USSC.Dto;
using USSC.Helpers;
using USSC.Services;


namespace USSC.Controllers;

[ApiController]
[Route("testcase")]
public class TestCaseController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITestCaseService _testCaseService;
    private readonly IDirectionService _directionService;
    private readonly ILogger<TestCaseController> _logger;
    public TestCaseController(ITestCaseService testCaseService, IUserService userService, IDirectionService directionService, ILogger<TestCaseController> logger)
    {
        _testCaseService = testCaseService;
        _userService = userService;
        _directionService = directionService;
        _logger = logger;
    }
    
    [HttpGet("download")]
    public FileStreamResult DownloadFile(Guid directionId)
    {
        // var path = $"G:\\USSC project\\USSC-project\\USSC\\USSC\\Files\\{namePractices}.zip";
        var path = $".\\Files\\{directionId}.zip";
        var fileType="application/octet-stream";
        var fileStream = new FileStream(path, FileMode.Open);
        var fileName = $"{directionId}.zip";
        return File(fileStream, fileType, fileName);
    }

    /// <summary>
    /// Требуется добавить юзера, чтобы создавать папку отдельно для каждого юзера, или называть файл id юзера
    /// также добавить [Authorize]
    /// Еще возможно сделать обработку сценария, когда файл с таким именем уже есть на сервере
    /// придумать уникальное название файла для каждой практики и каждого юзера
    /// </summary>
    [HttpPost("upload")]
    public void UploadFile(IFormFile file, Guid userId, Guid directionId)
    {
        var user = _userService.GetById(userId);
        if (user is null)
        {
            _logger.LogInformation("Incorrect user Id or user does not exist");
            HttpContext.Response.StatusCode = 204;
            return;
        }
        var model = new TestCaseModel();
        model.UserId = userId;
        model.DirectionId = directionId;
        var response = HttpContext.Response;
        var name = file.FileName.Split("."); 
        if (name.Length != 2 || name[1] != "zip") 
        {
            // throw new Exception("Invalid format file");
            response.WriteAsync("Invalid format file or file name");
            return;
        }
        // здесь вместо file.FileName должно быть {user.Id}.zip 
        var uploadPath = $".\\Uploads\\{model.UserId.ToString()}_{directionId}.zip";
        
        // var uploadPath = $"G:\\USSC project\\USSC-project\\USSC\\USSC\\Upload\\{file.FileName}";
        model.Path = uploadPath;
        using (var fileStream = new FileStream(uploadPath, FileMode.Create))
        {
            file.CopyToAsync(fileStream);
        }
        
        var response2 = _testCaseService.Upload(model);

        // await response.WriteAsync("Файлы успешно загружены");
    }

    // [HttpPost("addTest")]
    // public IActionResult AddTestCase(/*AddedTestCase testCase*/ TestCaseModel model)
    // {
    //     //var user = _userService.GetById(model.UserId);
    //     //var response = _testCaseService.Upload(user, model.DirectionId, model.Path);
    //     // model.Users.Email = "string";
    //     // model.Users.Password = "string";
    //     // model.Users.RefreshToken = "1";
    //     // model.Users.Role = "User";
    //     var response = _testCaseService.Upload(model);
    //     return Ok(new SuccessResponse(true));
    // }
    
    // [Authorize(Roles="Admin")]
    [HttpGet("getAll")]
     public IActionResult GetAll()
     {
         var testCases = _testCaseService.GetAll();
         return Ok(testCases);
     }

     // [Authorize(Roles = "Admin")]
     [HttpGet("getUserSolution")]
     public FileStreamResult GetUserSolution(Guid userId, Guid directionId)
     {
         var path = _testCaseService.GetPath(userId, directionId);
         /*if (path.IsNullOrEmpty())
         {
             _logger.LogInformation("No solution for this user and this direction");
             HttpContext.Response.StatusCode = 204;
             return BadRequest();
         }*/
         // var path = $".\\Uploads\\{userId}_{directionId}.zip";
         var fileType="application/octet-stream";
         var fileStream = new FileStream(path, FileMode.Open);
         var fileName = $"Solution.zip";
         return File(fileStream, fileType, fileName);
     }
     
     // [Authorize(Roles = "Admin")]
     // [HttpGet("downloadPractices")]
     // public FileStreamResult DownLoadPractice(Guid userId, Guid directionId)
     // {
     //     // try
     //     // {
     //         var testCasePath = _testCaseService.DownLoad(userId, directionId);            
     //         var fileType="application/octet-stream";
     //         var fileStream = new FileStream(testCasePath, FileMode.Open);
     //         var fileName = $"{userId}.zip";
     //         return File(fileStream, fileType, fileName);
     //         // return Ok(testCasePath);
     //     // }
     //     // catch
     //     // {
     //     //     return BadRequest(new { Message = "Пользователь не предоставил решения" });
     //     // }
     // }

     /// <summary>
     /// проверка практики куратором
     /// </summary>
     [HttpPost("review")]
     public IActionResult ReviewPractice(ReviewedTestCase reviewTestcase)
     {
         var response = _testCaseService.ReviewTestCaseAsync(reviewTestcase);
         if (response.Result.Success)
             return Ok(response.Result);
         else
             return BadRequest(response.Result); //здесь тоже логика с racticeService
     }
}