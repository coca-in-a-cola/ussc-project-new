using System.Text.Json.Serialization;

namespace USSC.Dto;

public class RequestModel
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public bool? Allow { get; set; }
    [JsonIgnore] public DirectionsModel? Directions { get; set; }
    public Guid DirectionId { get; set; }
    [JsonIgnore] public UserModel? Users { get; set; }
    public Guid UserId { get; set; }
    public DateTime? DateTime { get; set; }
}