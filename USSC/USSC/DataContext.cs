using Microsoft.EntityFrameworkCore;
using USSC.Entities;
using System.Threading.Tasks;
using USSC.Dto;

namespace USSC;

public class DataContext : DbContext
{
    public DbSet<UsersEntity> Users { get; set; }
    public DbSet<DirectionsEntity> Directions { get; set; }
    public DbSet<PracticesEntity> Practices { get; set; }
    public DbSet<TestCaseEntity> TestCase { get; set; }
    public DbSet<RequestEntity> Request { get; set; }
    public DbSet<ProfileEntity> Profile { get; set; }

    public DataContext(DbContextOptions<DataContext> options): base(options)
    {
    }
        
    public async Task<int> SaveChangesAsync()
    {
        return await base.SaveChangesAsync();
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UsersEntity>()
            .HasIndex(e => e.Email)
            .IsUnique();
        modelBuilder.Entity<DirectionsEntity>()
            .HasIndex(e => e.Path)
            .IsUnique();
        modelBuilder.Entity<TestCaseEntity>()
            .HasIndex(e => e.Path)
            .IsUnique();
        modelBuilder.Entity<ProfileEntity>()
            .HasIndex(e => e.UserId)
            .IsUnique();
    }
}