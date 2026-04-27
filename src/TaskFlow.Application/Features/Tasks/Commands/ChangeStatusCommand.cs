using MediatR;
using TaskStatus = TaskFlow.Domain.Enums.TaskStatus;

namespace TaskFlow.Application.Features.Tasks.Commands;

public record ChangeStatusCommand(Guid taskId, TaskStatus newTaskStatus) : IRequest;