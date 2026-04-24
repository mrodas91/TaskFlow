using MediatR;

namespace TaskFlow.Application.Commands;

public record CreateTeamCommand(string Name) : IRequest<Guid>;