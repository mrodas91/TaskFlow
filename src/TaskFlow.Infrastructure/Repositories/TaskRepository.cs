using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Data;
using TaskStatus = TaskFlow.Domain.Enums.TaskStatus;

namespace TaskFlow.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly TaskFlowDbContext _context;

    public TaskRepository(TaskFlowDbContext context) => _context = context;

    public async Task AddAsync(TaskItem task, CancellationToken cancellationToken)
    {
        await _context.Tasks.AddAsync(task, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task ChangeStatusAsync(Guid taskId, TaskStatus newStatus, CancellationToken cancellationToken)
    {
        await _context.Tasks.Where(t => t.Id == taskId)
            .ExecuteUpdateAsync(setters => setters
                .SetProperty(t => t.Status, newStatus));
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid taskId, CancellationToken cancellationToken)
    {
        await _context.Tasks.Where(t => t.Id == taskId)
            .ExecuteDeleteAsync(cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<List<TaskItem>> GetByTeamIdAsync(Guid teamId, CancellationToken cancellationToken)
    {
        return await _context.Tasks.Where(t => t.TeamId == teamId).ToListAsync(cancellationToken);
    }
}