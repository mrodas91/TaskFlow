using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.Features.Teams.Commands;
using TaskFlow.Application.Interfaces.Repositories;
using TaskFlow.Infrastructure.Data;
using TaskFlow.Infrastructure.Repositories;

//var builder = WebApplicationBuilder.CreateBuilder(args);
var builder = WebApplication.CreateBuilder(args);

// Registrar DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<TaskFlowDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<ITeamRepository, TeamRepository>();

// Registrar MediatR
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblies(typeof(CreateTeamCommand).Assembly));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
