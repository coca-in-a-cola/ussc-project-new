using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace USSC.Entities;

public class DirectionsEntity : BaseEntity
{
    public string? Directions { get; set; }
    public string? Path { get; set; }
    public List<PracticesEntity> Practices { get; set; } = new();
    public List<TestCaseEntity> TestCase { get; set; }
    public List<RequestEntity> Request { get; set; }
}