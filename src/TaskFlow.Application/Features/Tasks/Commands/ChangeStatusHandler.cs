using MediatR;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.Features.Tasks.Commands;

public class ChangeStatusHandler : IRequestHandler<ChangeStatusCommand>
{
    private readonly ITaskRepository _repo;

    public ChangeStatusHandler(ITaskRepository taskRepository) => _repo = taskRepository;

    public async Task Handle(ChangeStatusCommand request, CancellationToken cancellationToken)
    {
        await _repo.ChangeStatusAsync(request.taskId, request.newTaskStatus, cancellationToken);
    }
}