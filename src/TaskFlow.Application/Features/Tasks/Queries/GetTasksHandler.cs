using MediatR;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Features.Tasks.DTOs;

namespace TaskFlow.Application.Features.Tasks.Queries;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, List<TaskDto>>
{
    private readonly ITaskRepository _repository;

    public GetTasksHandler(ITaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<TaskDto>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
    {
        var tasks = await _repository.GetByTeamIdAsync(request.TeamId, cancellationToken);

        return tasks.Select(t => new TaskDto(t.Id, t.Title, t.Description, t.Status.ToString(), t.TeamId)).ToList();
    }
}