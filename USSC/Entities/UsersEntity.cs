using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using USSC.Dto;


namespace USSC.Entities;

public class UsersEntity : BaseEntity
{
    
    public string Email { get; set; }
    public string Password { get; set; }
    public string RefreshToken { get; set; }
    public string Role { get; set; }
    public List<RequestEntity> Request { get; set; } 
    public List<TestCaseEntity> TestCase { get; set; }
    public List<ProfileEntity> Profile { get; set; }
}