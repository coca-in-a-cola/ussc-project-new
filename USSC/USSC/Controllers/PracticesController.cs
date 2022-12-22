using Microsoft.AspNetCore.Mvc;
 using USSC.Dto;
 using USSC.Helpers;
 using USSC.Services;

 namespace USSC.Controllers;
 
 [ApiController]
 [Route("practices")]
 public class PracticesController : ControllerBase 
  {
     private readonly IPracticeService _practiceService;
     public PracticesController(IPracticeService practiceService)
     {
         _practiceService = practiceService;
     }
     
     // [Authorize(Roles = "Admin")]
     [HttpGet("get")]
     public IActionResult GetPractices() 
    {
         // возвращает поля практики name, description, info, id
         var practices = _practiceService.GetAll();
         if (practices.Any())
             return Ok(practices);
         return NoContent();
    }

     // [Authorize(Roles = "Admin")]
     [HttpPut("update")]
     public async Task<IActionResult> UpdatePractices(PracticesModel practicesModel)
     {
         var id = await _practiceService.UpdateAsync(practicesModel);
         return Ok(new SuccessResponse(true));
     }

     // [Authorize(Roles = "Admin")]
     [HttpPost("create")]
     public async Task<IActionResult> CreatePractices(PracticesModel practicesModel)
     {
         var response = await _practiceService.AddAsync(practicesModel); 
         return Ok(response);
     }

     [HttpDelete("delete")]
     public async Task<IActionResult> DeletePractices(Guid practicesId)
     {
         var response = await _practiceService.Delete(practicesId);
         if (response.Success)
             return Ok();
         return NotFound();
     }
 }