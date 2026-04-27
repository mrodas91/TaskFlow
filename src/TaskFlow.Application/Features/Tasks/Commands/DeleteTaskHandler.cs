using MediatR;
using TaskFlow.Domain.Entities;
using TaskFlow.Application.Interfaces.Repositories;

namespace TaskFlow.Application.Features.Tasks.Commands;

public class DeleteTaskHandler : IRequestHandler<DeleteTaskCommand>
{
    private readonly ITaskRepository _repo;

    public DeleteTaskHandler(ITaskRepository taskRepository)
    {
        _repo = taskRepository;
    }

    public async Task Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
    {
        await _repo.DeleteAsync(request.TaskId, cancellationToken);
    }
}