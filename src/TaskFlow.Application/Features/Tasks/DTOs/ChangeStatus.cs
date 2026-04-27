namespace TaskFlow.Application.Features.Tasks.DTOs;
public record ChangeStatusCommandDto(Guid TaskId, TaskStatus NewStatus);