using MediatR;
using TaskFlow.Application.Features.Teams.DTOs;

namespace TaskFlow.Application.Features.Teams.Queries;

public record GetTeamsQuery : IRequest<List<TeamDto>>;