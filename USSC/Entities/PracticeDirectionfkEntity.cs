// using System.ComponentModel.DataAnnotations.Schema;
// using USSC.Dto;
//
// namespace USSC.Entities;
//
//
// public class PracticeDirectionfkEntity
// {
//     [ForeignKey("PracticesId")]
//     public PracticesEntity Practices { get; set; }
//     public Guid PracticesId { get; set; }
//     
//     [ForeignKey("DirectionsId")]
//     public DirectionsEntity Directions { get; set; }
//     public Guid DirectionsId { get; set; }
// }