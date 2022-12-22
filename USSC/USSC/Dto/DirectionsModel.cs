using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using USSC.Entities;

namespace USSC.Dto;

public class DirectionsModel
{
    public Guid Id { get; set; }
    public string? Directions { get; set; }
    public string? Path { get; set; }
    [JsonIgnore]
    public List<TestCaseModel>? TestCase { get; set; } = new();
    [JsonIgnore]
    public List<PracticesModel>? Practices { get; set; } = new();
    [JsonIgnore]
    public List<RequestModel>? Request { get; set; } = new();
}