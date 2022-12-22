using System.ComponentModel.DataAnnotations;

namespace USSC.Entities;

public class BaseEntity : IEntity
{
    public Guid Id { get; set; }
}