using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace USSC.Entities;

public class TestCaseEntity : BaseEntity
{
    public string? Comment { get; set; }
    public bool? Allow { get; set; }
    public string? Path { get; set; }
    public Guid UserId { get; set; }
    [ForeignKey(("UserId"))] 
    public UsersEntity Users { get; set; }

    [ForeignKey("DirectionId")] 
    public DirectionsEntity Directions { get; set; }
    public Guid DirectionId { get; set; }
    public DateTime? DateTime { get; set; }
}