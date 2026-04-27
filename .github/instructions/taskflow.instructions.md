---
name: taskflow-instructions
description: "Use when: working on TaskFlow project development. Enforces clean architecture CQRS patterns, C# coding conventions, React/Vite frontend conventions, feature-based structure, EF Core best practices, and quality standards."
applyTo: "src/**/*.{cs,js,jsx}"
---

# TaskFlow Development Instructions

This document ensures consistent, maintainable development across TaskFlow's layered clean architecture with CQRS pattern. All code changes should adhere to these guidelines.

---

## 1. ARCHITECTURE & PATTERNS

### Core Principle: Clean Architecture + CQRS

TaskFlow uses **layered clean architecture** with **CQRS (Command Query Responsibility Segregation)**:

```
API (Controllers) ↓
Application (Commands/Queries + Handlers) ↓
Domain (Entities, Enums) ↓
Infrastructure (Repositories, DbContext)
```

**Dependency Rule**: Code can only depend inward. Never reference application/infrastructure in domain; never reference API in other layers.

### CQRS Pattern Enforcement

- **State Changes**: Use `Command` classes (immutable `record` types)
- **Read Operations**: Use `Query` classes (immutable `record` types)
- **Exactly One Handler Per Command/Query**: Implement `IRequestHandler<TCommand, TResponse>`
- **No Business Logic in Controllers**: Inject `IMediator` and delegate all logic to handlers

**Example**:
```csharp
// Commands always return Unit or a DTO, never void
public record CreateTeamCommand(string Name) : IRequest<TeamDto>;

// Handlers contain all business logic
public class CreateTeamHandler : IRequestHandler<CreateTeamCommand, TeamDto>
{
    public async Task<TeamDto> Handle(CreateTeamCommand request, CancellationToken ct)
    {
        // Validation, repository calls, mapping
    }
}
```

### Dependency Injection Pattern

- Register all services in `Program.cs` using `.AddScoped<T>()` for repositories and handlers
- Avoid service locator pattern; inject via constructor
- Use interfaces (`IRepository`) to enable testing and swappable implementations

---

## 2. C# CODING STYLE

### Naming Conventions

| Element | Pattern | Example |
|---------|---------|---------|
| **Classes/Records** | PascalCase | `CreateTeamCommand`, `TeamDto`, `Team` |
| **Properties** | PascalCase | `Id`, `Name`, `Status` |
| **Methods** | PascalCase with async suffix | `Handle()`, `GetTeamsAsync()`, `CreateAsync()` |
| **Parameters** | camelCase | `teamId`, `createRequest` |
| **Private fields** | `_camelCase` | `_repository`, `_logger` |
| **Constants** | UPPER_SNAKE_CASE | `DEFAULT_PAGE_SIZE` |
| **Commands/Queries** | Suffix with `Command`/`Query` | `CreateTeamCommand`, `GetTeamsQuery` |
| **Handlers** | `[Request]Handler` | `CreateTeamHandler`, `GetTeamsHandler` |
| **DTOs** | Suffix with `Dto` | `TeamDto`, `TaskItemDto` |

### Immutability & Record Types

- **Commands/Queries**: Always use `record` (immutable, lightweight)
- **DTOs**: Always use `record` for data transfer
- **Properties**: Use `{ get; set; }` or `{ get; init; }` (no raw fields)

```csharp
public record CreateTeamCommand(string Name) : IRequest<TeamDto>;

public record TeamDto(Guid Id, string Name, DateTime CreatedAt);
```

### Nullable Reference Types

- Enabled project-wide (`<Nullable>enable</Nullable>`)
- Always annotate: clearly mark nullable vs. non-nullable references
- Prefer non-null parameters; use `string?` explicitly when nullable

```csharp
public async Task<Team?> GetTeamByIdAsync(Guid teamId, CancellationToken ct)
// ✓ Returns TeamDto or null
// ✗ Avoid Optional<T> patterns; use C# nullable types

public class TeamDto
{
    public string Name { get; set; } = default!;  // never null
    public string? Description { get; init; }      // nullable
}
```

### Async/Await Best Practices

- All I/O operations (database, HTTP) must be async
- Always include `CancellationToken` parameter
- Use `async Task<T>` for handlers; never `async void`
- Method names end with `Async` suffix

```csharp
public async Task<TeamDto> Handle(GetTeamQuery request, CancellationToken ct)
{
    return await _repository.GetTeamAsync(request.TeamId, ct);
}
```

---

## 3. PROJECT STRUCTURE

### Feature-Based Organization

Organize features by domain concept, not technical layer. Each feature contains its own Commands, Queries, and DTOs:

```
TaskFlow.Application/
├── Features/
│   ├── Teams/
│   │   ├── Commands/
│   │   │   ├── CreateTeamCommand.cs
│   │   │   └── CreateTeamHandler.cs
│   │   ├── Queries/
│   │   │   ├── GetTeamsQuery.cs
│   │   │   ├── GetTeamByIdQuery.cs
│   │   │   └── GetTeamsHandler.cs
│   │   └── DTOs/
│   │       └── TeamDto.cs
│   ├── Tasks/
│   │   ├── Commands/...
│   │   ├── Queries/...
│   │   └── DTOs/...
```

**Rules**:
- Each command/query lives in its own file
- Handlers live adjacent to their request types
- DTOs grouped at feature level
- No cross-feature dependencies; use shared domain entities

### Layer Responsibilities

| Layer | Responsibility | Key Constraints |
|-------|-----------------|-----------------|
| **TaskFlow.API** | HTTP routing, deserialization, status codes | No business logic; only call `IMediator` |
| **TaskFlow.Application** | CQRS handlers, orchestration, DTOs | No database calls directly; use repositories |
| **TaskFlow.Domain** | Entities, enums, constraints | No dependencies on other layers |
| **TaskFlow.Infrastructure** | Repositories, DbContext, migrations | Only layer that touches SQL Server |

---

## TaskFlow.Web Frontend

TaskFlow.Web is a React 18 + Vite frontend. Keep UI logic separate from API access, prefer functional components and hooks, and organize pages, components, and services clearly.

### Frontend Structure

- `src/pages/` contains top-level route pages
- `src/components/` contains reusable UI components
- `src/services/` contains API service modules and fetch logic
- `src/assets/` contains static media
- `src/App.jsx` wires routing and global layout

### React + Vite Conventions

- Use **functional components** exclusively
- Use `useEffect` + `useState` for data loading and local state
- Keep components focused: presentational components should receive props, pages should handle data fetching
- Use `const` for component declarations and functions
- Prefer clear prop names and destructuring
- Use `React Router v6` patterns with `Routes` and `Route`

### API Services

- Encapsulate HTTP calls in `src/services/*Service.js`
- Keep fetch details out of components
- Use `async/await`, centralized base URLs, and error handling in service functions
- Return plain JSON objects and map them to component props in pages

```js
export async function getTeams() {
  const response = await fetch('/api/teams');
  if (!response.ok) throw new Error('Unable to load teams');
  return await response.json();
}
```

### UI and Styling

- Keep styling in `src/App.css` and `src/index.css` unless a component needs narrow scoped styles
- Prefer semantic HTML: buttons, forms, headings, lists
- Keep markup accessible: use `alt`, `aria-*`, and meaningful text labels
- Use layout components like `Navbar`, `TeamCard`, `TaskCard` for reuse

### Frontend Quality Standards

- Validate user input in the page before sending requests
- Show loading and error states in UI
- Keep component props minimal and explicit
- Avoid inline fetch calls in JSX
- Follow consistent component/file naming: `PascalCase.jsx` for components and pages

---

## 4. DATABASE & EF CORE

### Entity Design

- **Key**: Always use `Guid` with `.HasDefaultValueSql("NEWID()")`
- **Properties**: Define in domain entities with public getters
- **Constraints**: Enforce in `OnModelCreating` via fluent API, not data annotations

```csharp
// Domain entity (TaskFlow.Domain)
public class Team
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public ICollection<Task> Tasks { get; set; } = new List<Task>();
}
```

### Fluent API Configuration Pattern

Define all EF configuration in `TaskFlowDbContext.OnModelCreating()`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Team>(entity =>
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Id).HasDefaultValueSql("NEWID()");
        entity.Property(e => e.Name).HasMaxLength(200).IsRequired();
    });

    modelBuilder.Entity<Task>(entity =>
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Title).HasMaxLength(300).IsRequired();
        entity.Property(e => e.Description).HasMaxLength(2000);
        
        // Foreign key with cascade delete
        entity.HasOne(e => e.Team)
            .WithMany(t => t.Tasks)
            .HasForeignKey(e => e.TeamId)
            .OnDelete(DeleteBehavior.Cascade);
    });
}
```

### Migrations

- Run migrations with timestamps: `dotnet ef migrations add InitialCreate`
- Never manually edit migration files
- Test migrations locally before committing
- Use descriptive names reflecting the schema change

### Repository Pattern

- Define interfaces in `TaskFlow.Application/Interfaces/Repositories/`
- Implement in `TaskFlow.Infrastructure/Repositories/`
- Inject via DI; never create repository instances directly
- Use `IAsyncEnumerable<T>` for streaming large result sets

```csharp
// Interface (Application layer)
public interface ITeamRepository
{
    Task<Team?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<List<Team>> GetAllAsync(CancellationToken ct);
    Task AddAsync(Team team, CancellationToken ct);
}

// Implementation (Infrastructure layer)
public class TeamRepository : ITeamRepository
{
    private readonly TaskFlowDbContext _context;
    
    public async Task<Team?> GetByIdAsync(Guid id, CancellationToken ct)
    {
        return await _context.Teams.FirstOrDefaultAsync(t => t.Id == id, ct);
    }
}
```

---

## 5. QUALITY STANDARDS

### Input Validation

- Validate all command inputs in handlers **before** database operations
- Use FluentValidation for complex rules (future implementation)
- Fail fast with meaningful error messages

```csharp
public async Task<TeamDto> Handle(CreateTeamCommand request, CancellationToken ct)
{
    if (string.IsNullOrWhiteSpace(request.Name))
        throw new ArgumentException("Team name cannot be empty");
        
    // Proceed with domain operations
}
```

### Error Handling

- Create custom exceptions in `TaskFlow.Domain` for business rule violations
- Handle known exceptions in controllers, return appropriate HTTP status codes
- Log unexpected errors for debugging

```csharp
// In controller
try
{
    var result = await _mediator.Send(command, ct);
    return CreatedAtAction(nameof(GetTeam), new { id = result.Id }, result);
}
catch (ArgumentException ex)
{
    return BadRequest(new { error = ex.Message });
}
```

### Testing Requirements (Future)

- Unit test all command/query handlers
- Test repository implementations with in-memory EF Core
- Aim for >80% code coverage on business logic
- Test file naming: `[FeatureName][Operation]Tests.cs`

### Code Review Checklist

Before submitting, verify:
- ✓ Command/query uses `record` type
- ✓ Handler contains all business logic (not controller)
- ✓ Async operations include `CancellationToken`
- ✓ DTOs map only necessary properties
- ✓ No cross-layer references violate dependency rule
- ✓ Repository calls limited to handlers
- ✓ Nullable reference types properly annotated
- ✓ Feature folder organized correctly
- ✓ No hardcoded SQL; use EF Core LINQ

---

## 6. COMMON PATTERNS & EXAMPLES

### Adding a New Feature

1. Create feature folder under `Features/`
2. Add `[Feature]Command.cs` and `[Feature]Handler.cs` in Commands/
3. Add `[Feature]Dto.cs` in DTOs/
4. Register handler in `Program.cs`: `services.AddMediatR(typeof(Program))`
5. Map Dto in handler using LINQ or AutoMapper
6. Add repository method if needed
7. Add controller action calling `_mediator.Send()`

### Querying Multiple Entities

Use queries for read operations:

```csharp
public record GetTeamsQuery(int PageNumber = 1, int PageSize = 10) : IRequest<List<TeamDto>>;

public class GetTeamsHandler : IRequestHandler<GetTeamsQuery, List<TeamDto>>
{
    public async Task<List<TeamDto>> Handle(GetTeamsQuery request, CancellationToken ct)
    {
        var teams = await _repository.GetAllAsync(ct);
        return teams
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(t => new TeamDto(t.Id, t.Name, t.CreatedAt))
            .ToList();
    }
}
```

### Modifying Entities

Commands always represent intent to change state:

```csharp
public record UpdateTeamCommand(Guid Id, string NewName) : IRequest<TeamDto>;

public class UpdateTeamHandler : IRequestHandler<UpdateTeamCommand, TeamDto>
{
    public async Task<TeamDto> Handle(UpdateTeamCommand request, CancellationToken ct)
    {
        var team = await _repository.GetByIdAsync(request.Id, ct);
        if (team == null)
            throw new KeyNotFoundException($"Team {request.Id} not found");
            
        team.Name = request.NewName;
        await _repository.UpdateAsync(team, ct);
        
        return new TeamDto(team.Id, team.Name, team.CreatedAt);
    }
}
```

---

## 7. TOOLS & BUILD COMMANDS

```bash
# Build project
dotnet build

# Run migrations
dotnet ef migrations add [MigrationName] --project TaskFlow.Infrastructure
dotnet ef database update --project TaskFlow.Infrastructure

# Run tests (when implemented)
dotnet test

# Run API server
dotnet run --project TaskFlow.API

# Run frontend
npm install --prefix src/TaskFlow.Web
npm run dev --prefix src/TaskFlow.Web
# Build frontend
npm run build --prefix src/TaskFlow.Web
```

Connection string: `Server=localhost;Database=TaskFlowDb;User Id=sa;Password=Passw0rd!`

---

## Quick Reference

| Scenario | Pattern |
|----------|---------|
| Add new endpoint | Create Command/Query → Handler → Controller action |
| Modify database schema | Add migration, update OnModelCreating |
| Add business logic | Implement in Handler, inject repository if needed |
| Handle errors | Custom exception in Domain, catch in Controller |
| Add validation | Validate in Handler before repository call |
| Query related data | Include via EF Core `.Include()`, map in handler |
| Add frontend page | Create page in `src/TaskFlow.Web/src/pages`, route it in `App.jsx`, use service module for API calls |

