using MediatR;
using TaskFlow.Domain.Entities;
using TaskFlow.Application.Interfaces.Repositories;

namespace TaskFlow.Application.Features.Tasks.Commands;

public class CreateTaskHandler : IRequestHandler<CreateTaskCommand, Guid>
{
    private readonly ITaskRepository _repo;

    public CreateTaskHandler(ITaskRepository taskRepository)
    {
        _repo = taskRepository;
    }

    public async Task<Guid> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            TeamId = request.TeamId,
            Status = TaskFlow.Domain.Enums.TaskStatus.Pending
        };

        await _repo.AddAsync(task, cancellationToken);

        return task.Id;
    }
}