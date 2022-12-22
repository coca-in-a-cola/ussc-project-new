namespace USSC.Entities;

public class ApplicationEntity: BaseEntity
{ 
     public string? University { get; set; }
     public string? Faculty { get; set; }
     public string? Speciality { get; set; }
     public int? Course { get; set; }
     public string? Phone { get; set; }
     //public string? Telegram { get; set; }
     public List<UsersEntity>? Users { get; set; }= new();

}