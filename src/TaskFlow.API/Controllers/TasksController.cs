using MediatR;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.Features.Tasks.Queries;
using TaskFlow.Application.Features.Tasks.Commands;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly IMediator _mediator;

    public TasksController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskCommand command)
    {
        var result = await _mediator.Send(command);

        return Ok(result);
    }

    [HttpGet("{teamId}")]
    public async Task<IActionResult> GetTasks(Guid teamId)
    {
        var result = await _mediator.Send(new GetTasksQuery(teamId));
        return Ok(result);
    }

    [HttpPatch]
    public async Task<IActionResult> ChangeStatus([FromBody] ChangeStatusCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    }


    [HttpDelete("{taskId}")]
    public async Task<IActionResult> DeleteTask(Guid taskId)
    {
        await _mediator.Send(new DeleteTaskCommand(taskId));
        return NoContent();
    }
}