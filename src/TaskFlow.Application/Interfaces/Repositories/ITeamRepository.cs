using TaskFlow.Domain.Entities;

namespace TaskFlow.Application.Interfaces.Repositories;

public interface ITeamRepository
{
    Task AddAsync(Team team, CancellationToken cancellationToken);
    Task<List<Team>> GetAllAsync(CancellationToken cancellationToken);
}