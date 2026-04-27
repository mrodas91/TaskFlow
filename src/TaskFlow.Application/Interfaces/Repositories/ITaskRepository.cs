using TaskFlow.Domain.Entities;
using TaskStatus = TaskFlow.Domain.Enums.TaskStatus;

namespace TaskFlow.Application.Interfaces.Repositories;

public interface ITaskRepository
{
    Task AddAsync(TaskItem task, CancellationToken cancellationToken);
    Task<List<TaskItem>> GetByTeamIdAsync(Guid teamId, CancellationToken cancellationToken);
    Task ChangeStatusAsync(Guid taskId, TaskStatus NewStatus, CancellationToken cancellationToken);
    Task DeleteAsync(Guid taskId, CancellationToken cancellationToken);
}