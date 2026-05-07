using MediatR;

namespace TaskFlow.Application.Features.Users.Commands;

public record CreateUserCommand(string Name) : IRequest<Guid>;