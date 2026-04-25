using MediatR;

namespace TaskFlow.Application.Features.Tasks.Commands;

public record CreateTaskCommand(string Title, string Description, Guid TeamId) : IRequest<Guid>;