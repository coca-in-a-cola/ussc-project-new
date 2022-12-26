using System.ComponentModel.DataAnnotations;

namespace USSC.Dto;

public class AuthenticateRequest
{
    //[Required]
    public string Email { get; set; }
    //[Required]
    public string Password { get; set; }
}