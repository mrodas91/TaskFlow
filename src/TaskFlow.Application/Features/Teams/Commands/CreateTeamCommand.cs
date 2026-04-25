using MediatR;

namespace TaskFlow.Application.Features.Teams.Commands;

public record CreateTeamCommand(string Name) : IRequest<Guid>;