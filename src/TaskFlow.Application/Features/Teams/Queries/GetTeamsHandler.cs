using MediatR;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Application.Features.Teams.DTOs;

namespace TaskFlow.Application.Features.Teams.Queries;

public class GetTeamsHandler : IRequestHandler<GetTeamsQuery, List<TeamDto>>
{
    private readonly ITeamRepository _repository;

    public GetTeamsHandler(ITeamRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<TeamDto>> Handle(GetTeamsQuery request, CancellationToken cancellationToken)
    {
        var teams = await _repository.GetAllAsync(cancellationToken);

        return teams.Select(t => new TeamDto(t.Id, t.Name)).ToList();
    }
}