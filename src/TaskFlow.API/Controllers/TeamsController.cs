using MediatR;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.Features.Teams.Queries;
using TaskFlow.Application.Features.Teams.Commands;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TeamsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTeam([FromBody] CreateTeamCommand command)
    {
        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetTeams()
    {        
        var result = await _mediator.Send(new GetTeamsQuery());
        return Ok(result);
    }
}