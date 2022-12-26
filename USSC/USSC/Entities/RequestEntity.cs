using System.ComponentModel.DataAnnotations.Schema;

namespace USSC.Entities;

public class RequestEntity : BaseEntity
{
    // public Guid Id { get; set; }
    public bool? Allow { get; set; }
    [ForeignKey("DirectionId")] public DirectionsEntity? Directions { get; set; }
    public Guid DirectionId { get; set; }
    [ForeignKey("UserId")] public UsersEntity? Users { get; set; }
    public Guid UserId { get; set; }
    public DateTime? DateTime { get; set; }
}