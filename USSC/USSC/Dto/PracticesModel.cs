using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace USSC.Dto;

public class PracticesModel
{
    [JsonIgnore]
    public Guid Id { get; set; }
    public string Descriptions { get; set; }
    public string Info { get; set; }
    public string Name { get; set; }
    public List<DirectionsModel>? Directions { get; set; } = new();
    public DateTime? StartPractices { get; set; }
    public DateTime? EndPractices { get; set; }
}