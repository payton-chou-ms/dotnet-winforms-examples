# WinForms Examples Web - Phase 3 Implementation

This directory contains the Phase 3 implementation of the WinForms Examples Web application, featuring a modern frontend-backend separated architecture.

## Project Structure

```
src/
├── backend/                          # .NET 9 Web API
│   ├── WinFormsExamples.API/        # API Controllers and Entry Point
│   ├── WinFormsExamples.Application/ # Business Logic and Services
│   ├── WinFormsExamples.Domain/     # Domain Entities and Models
│   └── WinFormsExamples.Infrastructure/ # Data Access and Infrastructure
└── frontend/
    └── winforms-examples-web/       # Angular 17 Application
        ├── src/app/core/            # Core Services and Models
        ├── src/app/features/        # Feature Components
        └── src/app/shared/          # Shared Components
```

## Prerequisites

### Backend
- .NET 9 SDK
- Visual Studio 2022, VS Code, or JetBrains Rider

### Frontend
- Node.js 18+ and npm 9+
- Angular CLI 17

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd src/backend
   ```

2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```

3. Build the solution:
   ```bash
   dotnet build
   ```

4. Run the API:
   ```bash
   cd WinFormsExamples.API
   dotnet run
   ```

The API will be available at:
- HTTPS: `https://localhost:7001`
- HTTP: `http://localhost:5001`
- Swagger UI: `https://localhost:7001/swagger`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd src/frontend/winforms-examples-web
   ```

2. Install npm packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   ng serve
   ```

The application will be available at `http://localhost:4200`

### Running Both Together

1. Open two terminal windows

2. In terminal 1 (Backend):
   ```bash
   cd src/backend/WinFormsExamples.API
   dotnet run
   ```

3. In terminal 2 (Frontend):
   ```bash
   cd src/frontend/winforms-examples-web
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Features Implemented

### Backend API

#### Configuration API
- `GET /api/configuration/splash-screen` - Get splash screen configuration

#### Examples API
- `GET /api/examples` - Get paginated list of examples
  - Query parameters: `pageNumber`, `pageSize`, `category`
- `GET /api/examples/{id}` - Get example by ID
- `GET /api/examples/categories` - Get all categories

### Frontend Components

1. **Splash Screen** (`/`)
   - Animated logo display
   - Progress bar with 10-second timer
   - Auto-navigation to dashboard
   - Loads configuration from API

2. **Dashboard** (`/dashboard`)
   - Welcome message
   - Feature highlights
   - Navigation to examples

3. **Examples** (`/examples`)
   - Grid view of all examples
   - Technology tags
   - Difficulty level indicators
   - View count display
   - Category filtering (coming soon)

## Technology Stack

### Backend
- .NET 9 Web API
- Entity Framework Core (InMemory Database)
- Swashbuckle (Swagger/OpenAPI)
- AutoMapper
- Serilog
- Clean Architecture pattern

### Frontend
- Angular 17 (Standalone Components)
- Angular Material
- RxJS
- TypeScript
- SCSS

## Architecture

### Backend Architecture (Clean Architecture)

```
┌─────────────────────────────────────────┐
│            API Layer                    │
│  (Controllers, Middleware)              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        Application Layer                │
│  (Services, DTOs, Interfaces)           │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Domain Layer                    │
│  (Entities, Enums, Value Objects)       │
└─────────────────────────────────────────┘
                    ↑
┌─────────────────────────────────────────┐
│      Infrastructure Layer               │
│  (DbContext, Repositories)              │
└─────────────────────────────────────────┘
```

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│       Feature Components                │
│  (Splash, Dashboard, Examples)          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Core Services                   │
│  (API Service, Models)                  │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Backend API                     │
│  (REST Endpoints)                       │
└─────────────────────────────────────────┘
```

## API Documentation

Once the backend is running, you can access the Swagger UI at:
`https://localhost:7001/swagger`

This provides interactive API documentation where you can test all endpoints.

## Development Notes

### Database
Currently using Entity Framework Core InMemory database for simplicity. To use a real database:

1. Update `Program.cs` in `WinFormsExamples.API`:
   ```csharp
   builder.Services.AddDbContext<ApplicationDbContext>(options =>
       options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
   ```

2. Add connection string to `appsettings.json`:
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=WinFormsExamples;..."
   }
   ```

3. Run migrations:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

### CORS Configuration
The backend is configured to accept requests from `http://localhost:4200` and `https://localhost:4200`. Update the CORS policy in `Program.cs` if you need to support different origins.

### Sample Data
Sample data is populated in the `ExampleService` constructor. Replace this with database seeding or actual data sources in production.

## Next Steps

Optional enhancements:
- [ ] Implement authentication and authorization
- [ ] Add search and filtering functionality
- [ ] Implement favorites feature
- [ ] Add detailed example view page
- [ ] Add code syntax highlighting
- [ ] Implement user profiles
- [ ] Add unit and integration tests
- [ ] Implement CI/CD pipeline
- [ ] Add Docker support

## Troubleshooting

### Backend Issues

**Port already in use:**
- Update `launchSettings.json` to use different ports

**CORS errors:**
- Verify the CORS policy includes your frontend URL
- Check that the frontend is using the correct API URL

### Frontend Issues

**Cannot connect to API:**
- Verify the API is running
- Check the API URL in `api.service.ts`
- Ensure CORS is properly configured

**Build errors:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## License

MIT License - See LICENSE file for details
