using MediatR;
using TaskFlow.Application.Commands;
using TaskFlow.Application.Interface;
using TaskFlow.Domain.Models;

namespace TaskFlow.Application.Handlers;

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

        await _repo.AddAsync(team);
        await _repo.SaveChangesAsync();

        return team.Id;
    }
}