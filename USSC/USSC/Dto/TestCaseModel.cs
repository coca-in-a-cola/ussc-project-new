using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace USSC.Dto;

public class TestCaseModel
{
    [Key]
    [JsonIgnore]
    public Guid Id { get; set; }
    [JsonIgnore]
    public string? Comment { get; set; }
    [JsonIgnore]
    [Required]
    public bool? Allow { get; set; }
    public string? Path { get; set; }
    [JsonIgnore]
    public UserModel? Users { get; set; }
    public Guid UserId { get; set; }
    [JsonIgnore]
    public DirectionsModel? Directions { get; set; } = new();
    public DateTime? DateTime { get; set; }
    public Guid DirectionId { get; set; }
}