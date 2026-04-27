namespace TaskFlow.Application.Features.Tasks.DTOs;

public record TaskDto(Guid Id, string Title, string Description, string Status, Guid TeamId);