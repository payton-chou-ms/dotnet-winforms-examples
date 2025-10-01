using Microsoft.EntityFrameworkCore;
using WinFormsExamples.Application.Interfaces;
using WinFormsExamples.Application.Services;
using WinFormsExamples.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "WinForms Examples API",
        Version = "v1",
        Description = "API for WinForms Examples Web Application"
    });
});

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
              {
                  // Allow localhost for local development
                  if (origin.StartsWith("http://localhost:") || origin.StartsWith("https://localhost:"))
                      return true;
                  
                  // Allow GitHub Codespaces URLs
                  if (origin.Contains("app.github.dev") || origin.Contains("preview.app.github.dev"))
                      return true;
                  
                  return false;
              })
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Database context (using in-memory for now)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("WinFormsExamplesDb"));

// Application services
builder.Services.AddScoped<IExampleService, ExampleService>();
builder.Services.AddScoped<IConfigurationService, ConfigurationService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "WinForms Examples API v1");
    });
}

// Comment out HTTPS redirection for development to avoid issues
// app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
