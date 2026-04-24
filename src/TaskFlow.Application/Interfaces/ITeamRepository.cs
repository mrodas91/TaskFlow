using TaskFlow.Domain.Models;

namespace TaskFlow.Application.Interface;

public interface ITeamRepository
{
    Task AddAsync(Team team);
    Task SaveChangesAsync();
}