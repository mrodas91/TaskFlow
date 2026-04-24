using Microsoft.EntityFrameworkCore;
using TaskFlow.Domain.Models;
using TaskItem = TaskFlow.Domain.Models.TaskItem;

namespace TaskFlow.Infrastructure.Data;

public class TaskFlowDbContext : DbContext
{
    public DbSet<Team> Teams { get; set; } = null!;
    public DbSet<TaskItem> Tasks { get; set; } = null!;

    public TaskFlowDbContext(DbContextOptions<TaskFlowDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar Team
        modelBuilder.Entity<Team>()
            .HasKey(t => t.Id);
        modelBuilder.Entity<Team>()
            .Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(200);

        // Configurar Task
        modelBuilder.Entity<TaskItem>()
            .HasKey(t => t.Id);
        modelBuilder.Entity<TaskItem>()
            .Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(300);
        modelBuilder.Entity<TaskItem>()
            .Property(t => t.Description)
            .HasMaxLength(2000);

        // Relación Team -> Tasks
        modelBuilder.Entity<TaskItem>()
            .HasOne(t => t.Team)
            .WithMany(team => team.Tasks)
            .HasForeignKey(t => t.TeamId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}