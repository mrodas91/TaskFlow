using MediatR;
using TaskFlow.Domain.Entities;
using TaskFlow.Application.Interfaces.Repositories;

namespace TaskFlow.Application.Features.Teams.Commands;

public class CreateTeamHandler : IRequestHandler<CreateTeamCommand, Guid>
{
    private readonly ITeamRepository _repo;

    public CreateTeamHandler(ITeamRepository teamRepository)
    {
        _repo = teamRepository;
    }

    public async Task<Guid> Handle(CreateTeamCommand request, CancellationToken cancellationToken)
    {
        var team = new Team
        {
            Id = Guid.NewGuid(),
            Name = request.Name
        };

        await _repo.AddAsync(team, cancellationToken);

        return team.Id;
    }
}