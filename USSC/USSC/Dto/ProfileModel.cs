using System.Text.Json.Serialization;

namespace USSC.Dto;

public class ProfileModel
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? Patronymic { get; set; }
    [JsonIgnore]
    public UserModel? Users { get; set; }
    public Guid UserId { get; set; }
    public string? University { get; set; }
    public string? Faculty { get; set; }
    public string? Speciality { get; set; }
    public int? Course { get; set; }
    public string? Phone { get; set; }
    public string? Telegram { get; set; }
    public string? WorkExperience  { get; set; }
    [JsonIgnore]
    public string? FullName { get; set; }
}
