using System.ComponentModel.DataAnnotations.Schema;

namespace USSC.Dto;

[Table("PracticeDirectionfk")]
public class PracticeDirectionfkModel
{
    public DirectionsModel Directions { get; set; }
    public Guid DirectionId { get; set; }
    public PracticesModel Practices { get; set; }
    public Guid PracticesId { get; set; }
}