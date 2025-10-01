# 階段 2：後端 API 規格文件 / Phase 2: Backend API Specification Document

## Backend API Specification - ASP.NET Core Web API

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | Phase 2 Backend API Specification - ASP.NET Core Migration |
| 版本 / Version | 1.0 |
| 狀態 / Status | Design Phase |
| 作者 / Author | Migration Design Team |
| 日期 / Date | 2024 |
| 專案 / Project | dotnet-winforms-examples → Web API Migration |

---

## 1. 概述 / Overview

### 1.1 目的 / Purpose

本文件定義 WinForms 應用程式後端服務的 RESTful API 規格，包含 API 架構、端點定義、資料模型、認證授權、錯誤處理等完整後端技術規格。

This document defines the RESTful API specifications for the backend services of the WinForms application migration, including API architecture, endpoint definitions, data models, authentication/authorization, error handling, and complete backend technical specifications.

### 1.2 技術棧 / Technology Stack

| 技術 / Technology | 版本 / Version | 用途 / Purpose |
|------------------|----------------|----------------|
| .NET | 8.0+ | 應用程式框架 / App Framework |
| ASP.NET Core | 8.0+ | Web API 框架 / Web API Framework |
| Entity Framework Core | 8.0+ | ORM / ORM |
| SQL Server | 2019+ | 資料庫 / Database |
| Swashbuckle | 6.5+ | API 文件 / API Documentation |
| JWT Bearer | Latest | 身份驗證 / Authentication |
| Serilog | 3.x+ | 日誌記錄 / Logging |

---

## 2. API 架構 / API Architecture

### 2.1 整體架構 / Overall Architecture

```
Solution/
├── src/
│   ├── WinFormsExamples.API/           # Web API 專案 / Web API Project
│   │   ├── Controllers/                # API 控制器 / Controllers
│   │   │   ├── ConfigurationController.cs
│   │   │   ├── ExamplesController.cs
│   │   │   └── AuthController.cs
│   │   ├── Middleware/                 # 中介軟體 / Middleware
│   │   │   ├── ExceptionHandlingMiddleware.cs
│   │   │   └── RequestLoggingMiddleware.cs
│   │   ├── Program.cs                  # 應用程式入口 / Entry Point
│   │   └── appsettings.json            # 配置文件 / Configuration
│   │
│   ├── WinFormsExamples.Application/   # 應用層 / Application Layer
│   │   ├── Services/                   # 應用服務 / Services
│   │   │   ├── ConfigurationService.cs
│   │   │   ├── ExampleService.cs
│   │   │   └── AuthService.cs
│   │   ├── DTOs/                       # 資料傳輸物件 / DTOs
│   │   │   ├── ConfigurationDto.cs
│   │   │   ├── ExampleDto.cs
│   │   │   └── AuthDto.cs
│   │   └── Interfaces/                 # 服務介面 / Interfaces
│   │       └── IConfigurationService.cs
│   │
│   ├── WinFormsExamples.Domain/        # 領域層 / Domain Layer
│   │   ├── Entities/                   # 領域實體 / Entities
│   │   │   ├── Configuration.cs
│   │   │   ├── Example.cs
│   │   │   └── User.cs
│   │   ├── Enums/                      # 列舉 / Enums
│   │   └── ValueObjects/               # 值物件 / Value Objects
│   │
│   └── WinFormsExamples.Infrastructure/ # 基礎設施層 / Infrastructure
│       ├── Data/                       # 資料存取 / Data Access
│       │   ├── ApplicationDbContext.cs
│       │   └── Repositories/
│       ├── Identity/                   # 身份管理 / Identity
│       └── Services/                   # 基礎服務 / Services
│
└── tests/                              # 測試專案 / Test Projects
    ├── WinFormsExamples.API.Tests/
    ├── WinFormsExamples.Application.Tests/
    └── WinFormsExamples.Integration.Tests/
```

### 2.2 Clean Architecture 分層 / Clean Architecture Layers

```
┌─────────────────────────────────────────┐
│         API Layer (Controllers)         │
│  - HTTP 請求處理 / HTTP Request Handling │
│  - 路由定義 / Route Definitions          │
│  - 輸入驗證 / Input Validation          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Application Layer (Services)       │
│  - 業務邏輯 / Business Logic             │
│  - DTO 轉換 / DTO Transformation        │
│  - Use Cases                            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        Domain Layer (Entities)          │
│  - 領域實體 / Domain Entities            │
│  - 業務規則 / Business Rules            │
│  - 領域事件 / Domain Events             │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│   Infrastructure Layer (Data Access)    │
│  - 資料庫存取 / Database Access          │
│  - 外部服務 / External Services         │
│  - 檔案系統 / File System               │
└─────────────────────────────────────────┘
```

---

## 3. API 端點規格 / API Endpoint Specifications

### 3.1 配置管理 API / Configuration API

#### 3.1.1 取得啟動畫面配置 / Get Splash Screen Configuration

**端點 / Endpoint:** `GET /api/configuration/splash-screen`

**描述 / Description:** 取得啟動畫面的配置資訊，包含標誌 URL、顯示時間等。

**請求 / Request:**
```http
GET /api/configuration/splash-screen HTTP/1.1
Host: api.example.com
Accept: application/json
```

**回應 / Response:**
```json
{
  "logoUrl": "https://cdn.example.com/logo.gif",
  "displayDuration": 10,
  "redirectUrl": "/dashboard",
  "allowManualClose": true,
  "showProgressBar": true
}
```

**狀態碼 / Status Codes:**
- `200 OK` - 成功取得配置
- `404 Not Found` - 配置不存在
- `500 Internal Server Error` - 伺服器錯誤

#### 3.1.2 更新啟動畫面配置 / Update Splash Screen Configuration

**端點 / Endpoint:** `PUT /api/configuration/splash-screen`

**描述 / Description:** 更新啟動畫面的配置資訊。

**請求 / Request:**
```http
PUT /api/configuration/splash-screen HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "logoUrl": "https://cdn.example.com/logo.gif",
  "displayDuration": 10,
  "redirectUrl": "/dashboard",
  "allowManualClose": true,
  "showProgressBar": true
}
```

**回應 / Response:**
```json
{
  "success": true,
  "message": "Configuration updated successfully"
}
```

**狀態碼 / Status Codes:**
- `200 OK` - 成功更新
- `400 Bad Request` - 請求資料無效
- `401 Unauthorized` - 未授權
- `403 Forbidden` - 權限不足

### 3.2 範例管理 API / Examples API

#### 3.2.1 取得所有範例 / Get All Examples

**端點 / Endpoint:** `GET /api/examples`

**描述 / Description:** 取得所有範例的清單。

**查詢參數 / Query Parameters:**
- `category` (optional): 範例分類
- `pageNumber` (optional, default: 1): 頁碼
- `pageSize` (optional, default: 10): 每頁數量

**請求 / Request:**
```http
GET /api/examples?category=animations&pageNumber=1&pageSize=10 HTTP/1.1
Host: api.example.com
Accept: application/json
```

**回應 / Response:**
```json
{
  "items": [
    {
      "id": 1,
      "title": "Animated Logo",
      "description": "Splash screen with animated logo",
      "category": "animations",
      "thumbnailUrl": "https://cdn.example.com/thumbnails/animated-logo.jpg",
      "demoUrl": "/examples/animated-logo",
      "sourceCodeUrl": "https://github.com/example/animated-logo"
    },
    {
      "id": 2,
      "title": "Fade Effects",
      "description": "Fade in and fade out animations",
      "category": "animations",
      "thumbnailUrl": "https://cdn.example.com/thumbnails/fade-effects.jpg",
      "demoUrl": "/examples/fade-effects",
      "sourceCodeUrl": "https://github.com/example/fade-effects"
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 2,
  "totalPages": 1
}
```

#### 3.2.2 取得單一範例 / Get Example by ID

**端點 / Endpoint:** `GET /api/examples/{id}`

**描述 / Description:** 根據 ID 取得特定範例的詳細資訊。

**請求 / Request:**
```http
GET /api/examples/1 HTTP/1.1
Host: api.example.com
Accept: application/json
```

**回應 / Response:**
```json
{
  "id": 1,
  "title": "Animated Logo",
  "description": "Splash screen with animated logo",
  "category": "animations",
  "thumbnailUrl": "https://cdn.example.com/thumbnails/animated-logo.jpg",
  "demoUrl": "/examples/animated-logo",
  "sourceCodeUrl": "https://github.com/example/animated-logo",
  "details": {
    "features": [
      "Animated GIF support",
      "Auto-close timer",
      "Progress bar",
      "Manual close option"
    ],
    "technologies": ["Angular", "RxJS", "Angular Material"],
    "difficulty": "Beginner"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

#### 3.2.3 建立新範例 / Create New Example

**端點 / Endpoint:** `POST /api/examples`

**描述 / Description:** 建立新的範例。

**請求 / Request:**
```http
POST /api/examples HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "New Example",
  "description": "Description of the example",
  "category": "custom-controls",
  "thumbnailUrl": "https://cdn.example.com/thumbnails/new-example.jpg",
  "demoUrl": "/examples/new-example",
  "sourceCodeUrl": "https://github.com/example/new-example"
}
```

**回應 / Response:**
```json
{
  "id": 3,
  "title": "New Example",
  "message": "Example created successfully"
}
```

### 3.3 認證授權 API / Authentication API

#### 3.3.1 使用者登入 / User Login

**端點 / Endpoint:** `POST /api/auth/login`

**描述 / Description:** 使用者登入並取得 JWT Token。

**請求 / Request:**
```http
POST /api/auth/login HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**回應 / Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 3600,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["User"]
  }
}
```

#### 3.3.2 使用者註冊 / User Registration

**端點 / Endpoint:** `POST /api/auth/register`

**描述 / Description:** 註冊新使用者。

**請求 / Request:**
```http
POST /api/auth/register HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "name": "Jane Doe"
}
```

**回應 / Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 2
}
```

#### 3.3.3 刷新 Token / Refresh Token

**端點 / Endpoint:** `POST /api/auth/refresh`

**描述 / Description:** 使用 refresh token 取得新的 access token。

**請求 / Request:**
```http
POST /api/auth/refresh HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

**回應 / Response:**
```json
{
  "token": "new_access_token_here",
  "refreshToken": "new_refresh_token_here",
  "expiresIn": 3600
}
```

---

## 4. 資料模型 / Data Models

### 4.1 領域實體 / Domain Entities

#### 4.1.1 Configuration Entity

```csharp
namespace WinFormsExamples.Domain.Entities;

public class Configuration
{
    public int Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class SplashScreenConfiguration : Configuration
{
    public string LogoUrl { get; set; } = string.Empty;
    public int DisplayDuration { get; set; } // seconds
    public string RedirectUrl { get; set; } = string.Empty;
    public bool AllowManualClose { get; set; }
    public bool ShowProgressBar { get; set; }
}
```

#### 4.1.2 Example Entity

```csharp
namespace WinFormsExamples.Domain.Entities;

public class Example
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string DemoUrl { get; set; } = string.Empty;
    public string? SourceCodeUrl { get; set; }
    public ExampleDetails Details { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;
}

public class ExampleDetails
{
    public List<string> Features { get; set; } = new();
    public List<string> Technologies { get; set; } = new();
    public string Difficulty { get; set; } = "Beginner"; // Beginner, Intermediate, Advanced
}
```

#### 4.1.3 User Entity

```csharp
namespace WinFormsExamples.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = new();
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;
}
```

### 4.2 資料傳輸物件 (DTOs) / Data Transfer Objects

#### 4.2.1 Configuration DTOs

```csharp
namespace WinFormsExamples.Application.DTOs;

public record SplashScreenConfigurationDto(
    string LogoUrl,
    int DisplayDuration,
    string RedirectUrl,
    bool AllowManualClose,
    bool ShowProgressBar
);

public record UpdateSplashScreenConfigurationDto(
    string LogoUrl,
    int DisplayDuration,
    string RedirectUrl,
    bool AllowManualClose,
    bool ShowProgressBar
);
```

#### 4.2.2 Example DTOs

```csharp
namespace WinFormsExamples.Application.DTOs;

public record ExampleDto(
    int Id,
    string Title,
    string Description,
    string Category,
    string ThumbnailUrl,
    string DemoUrl,
    string? SourceCodeUrl,
    ExampleDetailsDto Details,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);

public record ExampleDetailsDto(
    List<string> Features,
    List<string> Technologies,
    string Difficulty
);

public record CreateExampleDto(
    string Title,
    string Description,
    string Category,
    string ThumbnailUrl,
    string DemoUrl,
    string? SourceCodeUrl
);

public record UpdateExampleDto(
    string Title,
    string Description,
    string Category,
    string ThumbnailUrl,
    string DemoUrl,
    string? SourceCodeUrl
);

public record PaginatedResultDto<T>(
    List<T> Items,
    int PageNumber,
    int PageSize,
    int TotalCount,
    int TotalPages
);
```

#### 4.2.3 Authentication DTOs

```csharp
namespace WinFormsExamples.Application.DTOs;

public record LoginRequestDto(
    string Email,
    string Password
);

public record LoginResponseDto(
    string Token,
    string RefreshToken,
    int ExpiresIn,
    UserDto User
);

public record RegisterRequestDto(
    string Email,
    string Password,
    string Name
);

public record UserDto(
    int Id,
    string Email,
    string Name,
    List<string> Roles
);

public record RefreshTokenRequestDto(
    string RefreshToken
);

public record RefreshTokenResponseDto(
    string Token,
    string RefreshToken,
    int ExpiresIn
);
```

---

## 5. 控制器實作範例 / Controller Implementation Examples

### 5.1 ConfigurationController

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WinFormsExamples.Application.Interfaces;
using WinFormsExamples.Application.DTOs;

namespace WinFormsExamples.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ConfigurationController : ControllerBase
{
    private readonly IConfigurationService _configurationService;
    private readonly ILogger<ConfigurationController> _logger;

    public ConfigurationController(
        IConfigurationService configurationService,
        ILogger<ConfigurationController> logger)
    {
        _configurationService = configurationService;
        _logger = logger;
    }

    /// <summary>
    /// 取得啟動畫面配置
    /// Get splash screen configuration
    /// </summary>
    [HttpGet("splash-screen")]
    [ProducesResponseType(typeof(SplashScreenConfigurationDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SplashScreenConfigurationDto>> GetSplashScreenConfig()
    {
        try
        {
            var config = await _configurationService.GetSplashScreenConfigurationAsync();
            
            if (config == null)
            {
                return NotFound(new { message = "Configuration not found" });
            }

            return Ok(config);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting splash screen configuration");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    /// <summary>
    /// 更新啟動畫面配置
    /// Update splash screen configuration
    /// </summary>
    [HttpPut("splash-screen")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult> UpdateSplashScreenConfig(
        [FromBody] UpdateSplashScreenConfigurationDto dto)
    {
        try
        {
            await _configurationService.UpdateSplashScreenConfigurationAsync(dto);
            return Ok(new { success = true, message = "Configuration updated successfully" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating splash screen configuration");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }
}
```

### 5.2 ExamplesController

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WinFormsExamples.Application.Interfaces;
using WinFormsExamples.Application.DTOs;

namespace WinFormsExamples.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ExamplesController : ControllerBase
{
    private readonly IExampleService _exampleService;
    private readonly ILogger<ExamplesController> _logger;

    public ExamplesController(
        IExampleService exampleService,
        ILogger<ExamplesController> logger)
    {
        _exampleService = exampleService;
        _logger = logger;
    }

    /// <summary>
    /// 取得所有範例
    /// Get all examples
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResultDto<ExampleDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PaginatedResultDto<ExampleDto>>> GetExamples(
        [FromQuery] string? category = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var examples = await _exampleService.GetExamplesAsync(
                category, pageNumber, pageSize);
            return Ok(examples);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting examples");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    /// <summary>
    /// 根據 ID 取得範例
    /// Get example by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ExampleDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ExampleDto>> GetExample(int id)
    {
        try
        {
            var example = await _exampleService.GetExampleByIdAsync(id);
            
            if (example == null)
            {
                return NotFound(new { message = $"Example with ID {id} not found" });
            }

            return Ok(example);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting example {Id}", id);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    /// <summary>
    /// 建立新範例
    /// Create new example
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> CreateExample([FromBody] CreateExampleDto dto)
    {
        try
        {
            var id = await _exampleService.CreateExampleAsync(dto);
            return CreatedAtAction(
                nameof(GetExample),
                new { id },
                new { id, message = "Example created successfully" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating example");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }
}
```

---

## 6. 驗證與錯誤處理 / Validation and Error Handling

### 6.1 輸入驗證 / Input Validation

```csharp
using System.ComponentModel.DataAnnotations;

namespace WinFormsExamples.Application.DTOs;

public record CreateExampleDto
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(100, ErrorMessage = "Title must be less than 100 characters")]
    public string Title { get; init; } = string.Empty;

    [Required(ErrorMessage = "Description is required")]
    [StringLength(500, ErrorMessage = "Description must be less than 500 characters")]
    public string Description { get; init; } = string.Empty;

    [Required(ErrorMessage = "Category is required")]
    public string Category { get; init; } = string.Empty;

    [Required(ErrorMessage = "Thumbnail URL is required")]
    [Url(ErrorMessage = "Invalid URL format")]
    public string ThumbnailUrl { get; init; } = string.Empty;

    [Required(ErrorMessage = "Demo URL is required")]
    public string DemoUrl { get; init; } = string.Empty;

    [Url(ErrorMessage = "Invalid URL format")]
    public string? SourceCodeUrl { get; init; }
}
```

### 6.2 全域錯誤處理中介軟體 / Global Error Handling Middleware

```csharp
namespace WinFormsExamples.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = exception switch
        {
            ArgumentException => StatusCodes.Status400BadRequest,
            UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
            KeyNotFoundException => StatusCodes.Status404NotFound,
            _ => StatusCodes.Status500InternalServerError
        };

        var response = new
        {
            statusCode = context.Response.StatusCode,
            message = exception.Message,
            detail = context.Response.StatusCode == 500 
                ? "An internal server error occurred" 
                : exception.Message
        };

        return context.Response.WriteAsJsonAsync(response);
    }
}
```

### 6.3 標準錯誤回應格式 / Standard Error Response Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "Title": ["Title is required"],
    "Email": ["Invalid email format"]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/examples"
}
```

---

## 7. 認證與授權 / Authentication and Authorization

### 7.1 JWT 配置 / JWT Configuration

```csharp
// Program.cs
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// JWT 認證配置 / JWT Authentication Configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

// 授權政策 / Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
    options.AddPolicy("UserOrAdmin", policy => 
        policy.RequireRole("User", "Admin"));
});
```

### 7.2 JWT Token 生成服務 / JWT Token Generation Service

```csharp
namespace WinFormsExamples.Application.Services;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    ClaimsPrincipal? ValidateToken(string token);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateAccessToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(
            securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.Name)
        };

        // 加入角色 claims / Add role claims
        foreach (var role in user.Roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);
        
        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"],
                ValidateLifetime = false // Don't validate lifetime for refresh
            }, out _);

            return principal;
        }
        catch
        {
            return null;
        }
    }
}
```

---

## 8. 資料庫存取 / Database Access

### 8.1 DbContext 配置 / DbContext Configuration

```csharp
using Microsoft.EntityFrameworkCore;
using WinFormsExamples.Domain.Entities;

namespace WinFormsExamples.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Configuration> Configurations { get; set; }
    public DbSet<Example> Examples { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuration entity
        modelBuilder.Entity<Configuration>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Key).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Value).IsRequired();
            entity.HasIndex(e => e.Key).IsUnique();
        });

        // Example entity
        modelBuilder.Entity<Example>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            entity.OwnsOne(e => e.Details);
            entity.HasIndex(e => e.Category);
        });

        // User entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(256);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.PasswordHash).IsRequired();
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // Seed data
        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Example>().HasData(
            new Example
            {
                Id = 1,
                Title = "Animated Logo",
                Description = "Splash screen with animated logo",
                Category = "animations",
                ThumbnailUrl = "https://cdn.example.com/thumbnails/animated-logo.jpg",
                DemoUrl = "/examples/animated-logo",
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            }
        );
    }
}
```

---

## 9. API 文件與 Swagger 配置 / API Documentation and Swagger Configuration

### 9.1 Swagger 配置 / Swagger Configuration

```csharp
// Program.cs
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Swagger/OpenAPI 配置 / Swagger/OpenAPI Configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "WinForms Examples API",
        Version = "v1",
        Description = "API for WinForms Examples Web Application",
        Contact = new OpenApiContact
        {
            Name = "Development Team",
            Email = "dev@example.com"
        }
    });

    // JWT 認證配置 / JWT Authentication Configuration
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    // 包含 XML 註解 / Include XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

// 啟用 Swagger UI / Enable Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "WinForms Examples API v1");
        options.RoutePrefix = "swagger";
    });
}
```

---

## 10. CORS 配置 / CORS Configuration

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// CORS 配置 / CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",  // Angular dev server
                "https://example.com"     // Production domain
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();

// 使用 CORS / Use CORS
app.UseCors("AllowAngularApp");
```

---

## 11. 日誌記錄 / Logging

### 11.1 Serilog 配置 / Serilog Configuration

```csharp
// Program.cs
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Serilog 配置 / Serilog Configuration
builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .Enrich.FromLogContext()
        .Enrich.WithMachineName()
        .Enrich.WithEnvironmentName()
        .WriteTo.Console()
        .WriteTo.File(
            path: "logs/api-.log",
            rollingInterval: RollingInterval.Day,
            outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}"
        );
});
```

---

## 12. 效能與快取 / Performance and Caching

### 12.1 回應快取 / Response Caching

```csharp
// Program.cs
builder.Services.AddResponseCaching();
builder.Services.AddMemoryCache();

var app = builder.Build();
app.UseResponseCaching();
```

### 12.2 控制器中使用快取 / Using Cache in Controllers

```csharp
[HttpGet]
[ResponseCache(Duration = 60, VaryByQueryKeys = new[] { "category" })]
public async Task<ActionResult<PaginatedResultDto<ExampleDto>>> GetExamples(
    [FromQuery] string? category = null)
{
    // Method implementation
}
```

---

## 13. 健康檢查 / Health Checks

```csharp
// Program.cs
builder.Services.AddHealthChecks()
    .AddDbContextCheck<ApplicationDbContext>()
    .AddUrlGroup(new Uri("https://cdn.example.com/health"), "CDN");

var app = builder.Build();

app.MapHealthChecks("/health");
```

---

## 14. 速率限制 / Rate Limiting

```csharp
// Program.cs
using AspNetCoreRateLimit;

builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options =>
{
    options.GeneralRules = new List<RateLimitRule>
    {
        new()
        {
            Endpoint = "*",
            Period = "1m",
            Limit = 60
        }
    };
});
```

---

## 15. 測試策略 / Testing Strategy

### 15.1 單元測試 / Unit Testing

```csharp
using Xunit;
using Moq;

namespace WinFormsExamples.Application.Tests;

public class ConfigurationServiceTests
{
    [Fact]
    public async Task GetSplashScreenConfiguration_ReturnsConfiguration()
    {
        // Arrange
        var mockRepo = new Mock<IConfigurationRepository>();
        mockRepo.Setup(r => r.GetSplashScreenConfigAsync())
            .ReturnsAsync(new SplashScreenConfiguration
            {
                LogoUrl = "https://example.com/logo.gif",
                DisplayDuration = 10
            });

        var service = new ConfigurationService(mockRepo.Object);

        // Act
        var result = await service.GetSplashScreenConfigurationAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal("https://example.com/logo.gif", result.LogoUrl);
        Assert.Equal(10, result.DisplayDuration);
    }
}
```

### 15.2 整合測試 / Integration Testing

```csharp
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace WinFormsExamples.Integration.Tests;

public class ConfigurationControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ConfigurationControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetSplashScreenConfig_ReturnsOk()
    {
        // Act
        var response = await _client.GetAsync("/api/configuration/splash-screen");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
    }
}
```

---

## 16. 部署配置 / Deployment Configuration

### 16.1 appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=WinFormsExamplesDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "your-secret-key-at-least-32-characters-long",
    "Issuer": "WinFormsExamplesAPI",
    "Audience": "WinFormsExamplesApp",
    "ExpiryInHours": 1
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:4200"]
  }
}
```

### 16.2 appsettings.Production.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-server;Database=WinFormsExamplesDb;User Id=api_user;Password=secure_password;Encrypt=true"
  },
  "Jwt": {
    "Key": "${JWT_SECRET_KEY}",
    "Issuer": "WinFormsExamplesAPI",
    "Audience": "WinFormsExamplesApp",
    "ExpiryInHours": 1
  },
  "Cors": {
    "AllowedOrigins": ["https://example.com"]
  }
}
```

---

## 17. 驗證檢查清單 / Validation Checklist

- [ ] API 架構符合 Clean Architecture 原則
- [ ] 所有端點都有適當的文件註解
- [ ] 輸入驗證正確實作
- [ ] 錯誤處理完整且一致
- [ ] JWT 認證正確配置
- [ ] 授權政策適當設定
- [ ] CORS 配置正確
- [ ] Swagger 文件完整且可存取
- [ ] 日誌記錄適當配置
- [ ] 資料庫連線正確配置
- [ ] 效能優化措施已實作
- [ ] 健康檢查端點可用
- [ ] 單元測試覆蓋率 > 80%
- [ ] 整合測試涵蓋主要場景
- [ ] API 版本控制策略明確

---

## 18. 參考資料 / References

- [ASP.NET Core 官方文件](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core 文件](https://docs.microsoft.com/ef/core)
- [OpenAPI Specification](https://swagger.io/specification/)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [RESTful API Design Guidelines](https://restfulapi.net/)

---

**文件版本歷史 / Document Version History**

| 版本 / Version | 日期 / Date | 變更說明 / Changes |
|---------------|-------------|-------------------|
| 1.0 | 2024 | 初始版本 / Initial version |
