using MediatR;

namespace TaskFlow.Application.Features.Tasks.Commands;

public record DeleteTaskCommand(Guid TaskId) : IRequest;