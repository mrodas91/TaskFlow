using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.Infrastructure.Repositories;

public class TeamRepository : ITeamRepository
{
    private readonly TaskFlowDbContext _context;

    public TeamRepository(TaskFlowDbContext context) => _context = context;

    public async Task AddAsync(Team team, CancellationToken cancellationToken)
    {
        await _context.Teams.AddAsync(team, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<List<Team>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _context.Teams.ToListAsync(cancellationToken);
    }
}