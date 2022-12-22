using System.ComponentModel.DataAnnotations.Schema;

namespace USSC.Entities;

public class ProfileEntity : BaseEntity
{
    public string FirstName { get; set; }
    public string SecondName { get; set; }
    public string Patronymic { get; set; }
    [ForeignKey("UserId")]
    public UsersEntity Users { get; set; }
    public Guid UserId { get; set; }
    public string University { get; set; }
    public string Faculty { get; set; }
    public string Speciality { get; set; }
    public int Course { get; set; }
    public string Phone { get; set; }
    public string Telegram { get; set; }
    public string WorkExperience  { get; set; }
    
}