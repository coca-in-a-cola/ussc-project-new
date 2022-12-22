using Microsoft.AspNetCore.Mvc;
using USSC.Dto;
using USSC.Services;

namespace USSC.Controllers;

[ApiController]
[Route("direction")]
public class DirectionController : ControllerBase
{
    private readonly IDirectionService _directionService;

    public DirectionController(IDirectionService directionService)
    {
        _directionService = directionService;
    }
    
    // почему-то работает только без асинхронности, надо разобраться
    [HttpPut("addFile")]
    public void AddFile(IFormFile file, Guid directionId)
    { 
        var uploadPath = $".\\Files\\{directionId}.zip";
        var directionsEntity = _directionService.GetById(directionId);
        if (directionsEntity is null)
        {
            HttpContext.Response.StatusCode = 204;
            return;
        }
        var model = new DirectionsModel()
        {
            Id = directionId,
            Directions = directionsEntity.Directions,
            Path = uploadPath
        };
        // var directionsModel = new DirectionsModel
        // {
        //     Path = $".\\Files\\{direction}.zip"
        // };
        var response = HttpContext.Response;
        var name = file.FileName.Split("."); 
        if (name.Length != 2 || name[1] != "zip") 
        {
            // throw new Exception("Invalid format file");
            response.WriteAsync("Invalid format file or file name");
            return;
        }
        
        using (var fileStream = new FileStream(uploadPath, FileMode.Create))
        {
            file.CopyTo(fileStream);
        }

        // response.WriteAsync("Файлы успешно загружены");
        // var result =  _directionService.Add(directionsModel);
        var result = _directionService.UpdateAsync(model);
    }
    
    [HttpPut("update")]
    public async Task<IActionResult> UpdateDirection(DirectionsModel directionsModel)
    {
        var id = await _directionService.UpdateAsync(directionsModel);
        return Ok(new SuccessResponse(directionsModel.Id == id));
    }
    
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteDirection(Guid directionId)
    {
        var response = await _directionService.Delete(directionId);
        if (response.Success)
            return Ok();
        return NotFound();
    }
}