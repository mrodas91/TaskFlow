using TaskFlow.Application.Interface;
using TaskFlow.Domain.Models;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.Infrastructure.Repositories;

public class TeamRepository : ITeamRepository
{
    private readonly TaskFlowDbContext _context;

    public TeamRepository(TaskFlowDbContext context) => _context = context;

    public async Task AddAsync(Team team) =>
        await _context.Teams.AddAsync(team);
    
    public async Task SaveChangesAsync() => 
        await _context.SaveChangesAsync();
}