using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Data;

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

    public async Task<List<TaskItem>> GetByTeamIdAsync(Guid teamId, CancellationToken cancellationToken)
    {
        return await _context.Tasks.Where(t => t.TeamId == teamId).ToListAsync(cancellationToken);
    }
}