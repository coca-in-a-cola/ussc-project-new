using USSC.Entities;

namespace USSC;

public static class SeedData
{
    // users hardcoded for simplicity, store in a db with hashed passwords in production applications
    public static List<UsersEntity> Users = new List<UsersEntity>
    {
        new UsersEntity()
        {
            Id = Guid.Empty, 
            Email = "test@mail.ru", 
            Password = "test"
        }
    };
}