using MediatR;
using TaskFlow.Application.Features.Tasks.DTOs;

namespace TaskFlow.Application.Features.Tasks.Queries;

public record GetTasksQuery(Guid TeamId) : IRequest<List<TaskDto>>;