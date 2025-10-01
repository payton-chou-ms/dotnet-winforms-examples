# 階段 2：認證授權流程設計 / Phase 2: Authentication & Authorization Flow Design

## Authentication & Authorization Flow Specification

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | Phase 2 Authentication & Authorization Flow |
| 版本 / Version | 1.0 |
| 狀態 / Status | Design Phase |
| 作者 / Author | Migration Design Team |
| 日期 / Date | 2024 |
| 專案 / Project | dotnet-winforms-examples → Web Migration |

---

## 1. 概述 / Overview

### 1.1 目的 / Purpose

本文件定義 WinForms 應用程式遷移到 Web 的認證授權流程，包含 JWT Token 機制、使用者認證流程、角色權限管理、安全性最佳實踐等完整規格。

This document defines the authentication and authorization flow for migrating the WinForms application to web, including JWT token mechanism, user authentication flow, role-based access control, security best practices, and complete specifications.

### 1.2 認證機制 / Authentication Mechanism

- **技術 / Technology:** JWT (JSON Web Token)
- **協定 / Protocol:** OAuth 2.0 / OpenID Connect (可選 / Optional)
- **Token 類型 / Token Types:**
  - Access Token: 短期有效 (1 小時)
  - Refresh Token: 長期有效 (7 天)

### 1.3 授權模型 / Authorization Model

- **模型 / Model:** RBAC (Role-Based Access Control)
- **角色 / Roles:**
  - Admin: 管理員 (完整權限)
  - User: 一般使用者 (基本權限)
  - Guest: 訪客 (唯讀權限)

---

## 2. JWT Token 架構 / JWT Token Architecture

### 2.1 Access Token 結構 / Access Token Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["User"],
    "iat": 1642492800,
    "exp": 1642496400,
    "iss": "WinFormsExamplesAPI",
    "aud": "WinFormsExamplesApp"
  },
  "signature": "HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret)"
}
```

**Claims 說明 / Claims Description:**

| Claim | 說明 / Description | 範例 / Example |
|-------|-------------------|----------------|
| sub | 使用者 ID / User ID | "1" |
| email | 電子郵件 / Email | "user@example.com" |
| name | 使用者名稱 / User name | "John Doe" |
| roles | 角色清單 / Roles list | ["User", "Admin"] |
| iat | 發行時間 / Issued at | 1642492800 |
| exp | 過期時間 / Expiration | 1642496400 |
| iss | 發行者 / Issuer | "WinFormsExamplesAPI" |
| aud | 受眾 / Audience | "WinFormsExamplesApp" |

### 2.2 Refresh Token 結構 / Refresh Token Structure

```json
{
  "token": "base64_encoded_random_string",
  "userId": 1,
  "expiresAt": "2024-01-22T00:00:00Z",
  "isRevoked": false,
  "createdByIp": "192.168.1.1"
}
```

---

## 3. 使用者註冊流程 / User Registration Flow

### 3.1 流程圖 / Flow Diagram

```
使用者 (User)              前端 (Frontend)           後端 API (Backend API)        資料庫 (Database)
    |                           |                           |                           |
    |--[填寫註冊表單]----------->|                           |                           |
    |                           |                           |                           |
    |                           |--[驗證輸入]                |                           |
    |                           |                           |                           |
    |                           |--[POST /api/auth/register]->|                         |
    |                           |                           |                           |
    |                           |                           |--[驗證資料]                |
    |                           |                           |                           |
    |                           |                           |--[檢查 Email 是否存在]---->|
    |                           |                           |                           |
    |                           |                           |<--[返回檢查結果]----------|
    |                           |                           |                           |
    |                           |                           |--[Hash 密碼]              |
    |                           |                           |                           |
    |                           |                           |--[建立使用者]------------>|
    |                           |                           |                           |
    |                           |                           |<--[返回使用者 ID]---------|
    |                           |                           |                           |
    |                           |                           |--[發送確認郵件]            |
    |                           |                           |                           |
    |                           |<--[200 OK: 註冊成功]-------|                           |
    |                           |                           |                           |
    |<--[顯示成功訊息]----------|                           |                           |
    |                           |                           |                           |
    |<--[重導向至登入頁面]------|                           |                           |
```

### 3.2 詳細步驟 / Detailed Steps

#### 3.2.1 前端驗證 / Frontend Validation

```typescript
// 註冊表單驗證 / Registration form validation
const registerForm = this.formBuilder.group({
  email: ['', [
    Validators.required,
    Validators.email
  ]],
  name: ['', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100)
  ]],
  password: ['', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  ]],
  confirmPassword: ['', Validators.required]
}, {
  validators: this.passwordMatchValidator
});
```

**驗證規則 / Validation Rules:**

| 欄位 / Field | 規則 / Rules |
|-------------|-------------|
| Email | 必填、有效的電子郵件格式 |
| Name | 必填、2-100 字元 |
| Password | 必填、最少 8 字元、包含大小寫字母和數字 |
| Confirm Password | 必填、與密碼相符 |

#### 3.2.2 後端處理 / Backend Processing

```csharp
[HttpPost("register")]
public async Task<ActionResult> Register([FromBody] RegisterRequestDto request)
{
    // 1. 驗證輸入 / Validate input
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    // 2. 檢查電子郵件是否已存在 / Check if email exists
    if (await _userService.EmailExistsAsync(request.Email))
        return Conflict(new { message = "Email already exists" });

    // 3. Hash 密碼 / Hash password
    var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

    // 4. 建立使用者 / Create user
    var user = new User
    {
        Email = request.Email,
        Name = request.Name,
        PasswordHash = passwordHash,
        Roles = new List<string> { "User" },
        CreatedAt = DateTime.UtcNow,
        IsActive = true
    };

    var userId = await _userService.CreateUserAsync(user);

    // 5. 發送確認郵件 (可選) / Send confirmation email (optional)
    await _emailService.SendConfirmationEmailAsync(user.Email);

    // 6. 記錄稽核日誌 / Log audit
    await _auditService.LogAsync("UserRegistered", userId);

    return CreatedAtAction(
        nameof(GetCurrentUser),
        new { success = true, message = "User registered successfully", userId });
}
```

### 3.3 安全考量 / Security Considerations

- ✓ 密碼雜湊使用 BCrypt (成本因子 ≥ 11)
- ✓ 防止電子郵件列舉攻擊 (統一回應訊息)
- ✓ 實作速率限制 (防止暴力註冊)
- ✓ 驗證電子郵件所有權 (可選)
- ✓ CAPTCHA 防護 (防止機器人)

---

## 4. 使用者登入流程 / User Login Flow

### 4.1 流程圖 / Flow Diagram

```
使用者 (User)              前端 (Frontend)           後端 API (Backend API)        資料庫 (Database)
    |                           |                           |                           |
    |--[輸入帳號密碼]---------->|                           |                           |
    |                           |                           |                           |
    |                           |--[POST /api/auth/login]-->|                           |
    |                           |   { email, password }     |                           |
    |                           |                           |                           |
    |                           |                           |--[查詢使用者]------------>|
    |                           |                           |                           |
    |                           |                           |<--[返回使用者資料]--------|
    |                           |                           |                           |
    |                           |                           |--[驗證密碼]                |
    |                           |                           |                           |
    |                           |                           |--[生成 Access Token]      |
    |                           |                           |                           |
    |                           |                           |--[生成 Refresh Token]     |
    |                           |                           |                           |
    |                           |                           |--[儲存 Refresh Token]---->|
    |                           |                           |                           |
    |                           |                           |--[更新最後登入時間]------>|
    |                           |                           |                           |
    |                           |<--[200 OK: 返回 Tokens]---|                           |
    |                           |   { token, refreshToken } |                           |
    |                           |                           |                           |
    |--[儲存 Tokens]------------|                           |                           |
    |                           |--[存入 localStorage]       |                           |
    |                           |                           |                           |
    |<--[重導向至主控面板]------|                           |                           |
```

### 4.2 詳細步驟 / Detailed Steps

#### 4.2.1 前端實作 / Frontend Implementation

```typescript
// 登入服務 / Login service
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * 使用者登入
   * User login
   */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', { email, password })
      .pipe(
        tap(response => {
          // 儲存 tokens / Store tokens
          this.storeTokens(response.token, response.refreshToken);
          
          // 導航至主控面板 / Navigate to dashboard
          this.router.navigate(['/dashboard']);
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * 儲存 tokens
   * Store tokens
   */
  private storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  /**
   * 取得 access token
   * Get access token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * 檢查是否已登入
   * Check if authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // 檢查 token 是否過期 / Check if token is expired
    const payload = this.decodeToken(token);
    return payload.exp * 1000 > Date.now();
  }

  /**
   * 解碼 JWT token
   * Decode JWT token
   */
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
```

#### 4.2.2 後端實作 / Backend Implementation

```csharp
[HttpPost("login")]
public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto request)
{
    // 1. 查詢使用者 / Find user
    var user = await _userService.GetUserByEmailAsync(request.Email);
    if (user == null || !user.IsActive)
        return Unauthorized(new { message = "Invalid email or password" });

    // 2. 驗證密碼 / Verify password
    if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
    {
        // 增加登入失敗次數 / Increment failed login count
        await _userService.IncrementAccessFailedCountAsync(user.Id);
        return Unauthorized(new { message = "Invalid email or password" });
    }

    // 3. 檢查帳號是否被鎖定 / Check if account is locked
    if (user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTime.UtcNow)
        return Unauthorized(new { message = "Account is locked" });

    // 4. 生成 Access Token / Generate access token
    var token = _tokenService.GenerateAccessToken(user);

    // 5. 生成 Refresh Token / Generate refresh token
    var refreshToken = _tokenService.GenerateRefreshToken();
    
    // 6. 儲存 Refresh Token / Store refresh token
    await _refreshTokenService.SaveRefreshTokenAsync(new RefreshToken
    {
        UserId = user.Id,
        Token = refreshToken,
        ExpiresAt = DateTime.UtcNow.AddDays(7),
        CreatedByIp = HttpContext.Connection.RemoteIpAddress?.ToString()
    });

    // 7. 更新最後登入時間 / Update last login time
    await _userService.UpdateLastLoginAsync(user.Id);

    // 8. 重設登入失敗次數 / Reset failed login count
    await _userService.ResetAccessFailedCountAsync(user.Id);

    // 9. 記錄稽核日誌 / Log audit
    await _auditService.LogAsync("UserLogin", user.Id);

    // 10. 返回回應 / Return response
    return Ok(new LoginResponseDto
    {
        Token = token,
        RefreshToken = refreshToken,
        ExpiresIn = 3600, // 1 hour
        User = new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Roles = user.Roles
        }
    });
}
```

### 4.3 安全考量 / Security Considerations

- ✓ 使用 HTTPS 傳輸所有敏感資料
- ✓ 實作登入失敗次數限制 (5 次後鎖定)
- ✓ 實作帳號鎖定機制 (鎖定 30 分鐘)
- ✓ 記錄登入嘗試（成功和失敗）
- ✓ 防止時序攻擊 (constant-time comparison)
- ✓ 實作速率限制 (防止暴力破解)
- ✓ Token 儲存在 localStorage（或 httpOnly cookie 更安全）

---

## 5. Token 刷新流程 / Token Refresh Flow

### 5.1 流程圖 / Flow Diagram

```
前端 (Frontend)           後端 API (Backend API)        資料庫 (Database)
    |                           |                           |
    |--[Access Token 即將過期]  |                           |
    |                           |                           |
    |--[POST /api/auth/refresh]->|                          |
    |   { refreshToken }        |                           |
    |                           |                           |
    |                           |--[驗證 Refresh Token]---->|
    |                           |                           |
    |                           |<--[返回 Token 資料]-------|
    |                           |                           |
    |                           |--[檢查是否過期/撤銷]       |
    |                           |                           |
    |                           |--[生成新 Access Token]    |
    |                           |                           |
    |                           |--[生成新 Refresh Token]   |
    |                           |                           |
    |                           |--[撤銷舊 Refresh Token]-->|
    |                           |                           |
    |                           |--[儲存新 Refresh Token]-->|
    |                           |                           |
    |<--[200 OK: 返回新 Tokens]|                           |
    |   { token, refreshToken } |                           |
    |                           |                           |
    |--[更新儲存的 Tokens]      |                           |
```

### 5.2 自動刷新機制 / Automatic Refresh Mechanism

```typescript
// HTTP 攔截器 / HTTP Interceptor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. 加入 Authorization header
    if (this.authService.getToken()) {
      req = this.addToken(req, this.authService.getToken()!);
    }

    return next.handle(req).pipe(
      catchError(error => {
        // 2. 如果收到 401，嘗試刷新 token
        if (error.status === 401 && !req.url.includes('/auth/')) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token);
          return next.handle(this.addToken(request, token.token));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
}
```

---

## 6. 使用者登出流程 / User Logout Flow

### 6.1 流程圖 / Flow Diagram

```
使用者 (User)              前端 (Frontend)           後端 API (Backend API)        資料庫 (Database)
    |                           |                           |                           |
    |--[點擊登出]-------------->|                           |                           |
    |                           |                           |                           |
    |                           |--[POST /api/auth/logout]->|                           |
    |                           |   Authorization: Bearer   |                           |
    |                           |                           |                           |
    |                           |                           |--[撤銷 Refresh Token]---->|
    |                           |                           |                           |
    |                           |                           |--[記錄登出事件]---------->|
    |                           |                           |                           |
    |                           |<--[200 OK: 登出成功]------|                           |
    |                           |                           |                           |
    |                           |--[清除 localStorage]       |                           |
    |                           |                           |                           |
    |<--[重導向至登入頁面]------|                           |                           |
```

### 6.2 前端實作 / Frontend Implementation

```typescript
/**
 * 使用者登出
 * User logout
 */
logout(): Observable<void> {
  return this.http.post<void>('/api/auth/logout', {})
    .pipe(
      finalize(() => {
        // 清除 tokens / Clear tokens
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        
        // 導航至登入頁面 / Navigate to login page
        this.router.navigate(['/login']);
      })
    );
}
```

---

## 7. 角色權限管理 / Role-Based Access Control

### 7.1 角色定義 / Role Definitions

| 角色 / Role | 權限 / Permissions | 說明 / Description |
|------------|-------------------|-------------------|
| Admin | 所有權限 / All permissions | 管理員，可執行所有操作 |
| User | 讀取、建立、更新自己的資源 | 一般使用者，有基本權限 |
| Guest | 僅讀取公開資源 | 訪客，僅能查看公開內容 |

### 7.2 權限矩陣 / Permission Matrix

| 資源 / Resource | Admin | User | Guest |
|----------------|-------|------|-------|
| 查看公開範例 / View public examples | ✓ | ✓ | ✓ |
| 查看私人範例 / View private examples | ✓ | ✓ | ✗ |
| 建立範例 / Create examples | ✓ | ✗ | ✗ |
| 更新範例 / Update examples | ✓ | ✗ | ✗ |
| 刪除範例 / Delete examples | ✓ | ✗ | ✗ |
| 管理使用者 / Manage users | ✓ | ✗ | ✗ |
| 查看統計資料 / View statistics | ✓ | ✓ | ✗ |
| 修改設定 / Modify settings | ✓ | ✗ | ✗ |

### 7.3 前端路由守衛 / Frontend Route Guards

```typescript
// 認證守衛 / Auth Guard
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // 未登入，重導向至登入頁面
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}

// 角色守衛 / Role Guard
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const userRoles = this.authService.getUserRoles();

    if (requiredRoles.some(role => userRoles.includes(role))) {
      return true;
    }

    // 權限不足，重導向至無權限頁面
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
```

**路由配置範例 / Route Configuration Example:**

```typescript
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  }
];
```

### 7.4 後端授權 / Backend Authorization

```csharp
// 使用 Authorize 屬性 / Using Authorize attribute
[Authorize] // 需要認證 / Requires authentication
public class ExamplesController : ControllerBase
{
    [HttpGet]
    [AllowAnonymous] // 允許匿名存取 / Allow anonymous access
    public async Task<ActionResult> GetPublicExamples()
    {
        // Implementation
    }

    [HttpPost]
    [Authorize(Roles = "Admin")] // 需要 Admin 角色 / Requires Admin role
    public async Task<ActionResult> CreateExample([FromBody] CreateExampleDto dto)
    {
        // Implementation
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")] // 使用授權政策 / Using authorization policy
    public async Task<ActionResult> DeleteExample(int id)
    {
        // Implementation
    }
}

// 授權政策配置 / Authorization policy configuration
services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
    
    options.AddPolicy("UserOrAdmin", policy => 
        policy.RequireRole("User", "Admin"));
    
    options.AddPolicy("CanManageExamples", policy =>
        policy.RequireClaim("Permission", "ManageExamples"));
});
```

---

## 8. 安全性最佳實踐 / Security Best Practices

### 8.1 Token 安全 / Token Security

1. **Token 存儲 / Token Storage**
   - ✓ Access Token 存儲在 memory 或 localStorage
   - ✓ Refresh Token 存儲在 httpOnly cookie (更安全)
   - ✗ 避免存儲在 sessionStorage (XSS 風險)

2. **Token 生命週期 / Token Lifecycle**
   - Access Token: 短期有效 (1 小時)
   - Refresh Token: 長期有效 (7 天)
   - 實作 Token 撤銷機制

3. **Token 傳輸 / Token Transmission**
   - 僅透過 HTTPS 傳輸
   - 使用 Authorization: Bearer header

### 8.2 密碼安全 / Password Security

1. **密碼要求 / Password Requirements**
   - 最少 8 字元
   - 包含大寫字母
   - 包含小寫字母
   - 包含數字
   - 包含特殊字元 (建議)

2. **密碼雜湊 / Password Hashing**
   ```csharp
   // 使用 BCrypt (成本因子 11)
   var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, 11);
   
   // 驗證密碼
   var isValid = BCrypt.Net.BCrypt.Verify(password, hashedPassword);
   ```

3. **密碼重設 / Password Reset**
   - 使用一次性 token
   - Token 有效期 1 小時
   - 發送重設連結至註冊電子郵件

### 8.3 防止常見攻擊 / Prevent Common Attacks

#### 8.3.1 XSS (Cross-Site Scripting)

- ✓ Angular 自動跳脫 (auto-escaping)
- ✓ 使用 DomSanitizer 清理不受信任的內容
- ✓ 設定 Content-Security-Policy header

```typescript
// 清理 HTML 內容 / Sanitize HTML content
constructor(private sanitizer: DomSanitizer) {}

getSafeHtml(html: string): SafeHtml {
  return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
}
```

#### 8.3.2 CSRF (Cross-Site Request Forgery)

- ✓ 使用 CSRF tokens
- ✓ 驗證 Origin 和 Referer headers
- ✓ SameSite cookie 屬性

```csharp
// ASP.NET Core 中啟用 CSRF 防護
services.AddAntiforgery(options =>
{
    options.HeaderName = "X-CSRF-TOKEN";
    options.Cookie.SameSite = SameSiteMode.Strict;
});
```

#### 8.3.3 SQL Injection

- ✓ 使用參數化查詢
- ✓ 使用 ORM (Entity Framework Core)
- ✓ 驗證和清理輸入

```csharp
// 正確：使用參數化查詢 / Correct: Use parameterized queries
var user = await _context.Users
    .Where(u => u.Email == email)
    .FirstOrDefaultAsync();

// 錯誤：字串串接 / Wrong: String concatenation
// var query = $"SELECT * FROM Users WHERE Email = '{email}'";
```

#### 8.3.4 Brute Force Attacks

- ✓ 實作速率限制
- ✓ 帳號鎖定機制
- ✓ CAPTCHA 防護

```csharp
// 速率限制配置 / Rate limiting configuration
services.Configure<IpRateLimitOptions>(options =>
{
    options.GeneralRules = new List<RateLimitRule>
    {
        new RateLimitRule
        {
            Endpoint = "POST:/api/auth/login",
            Period = "1m",
            Limit = 5 // 每分鐘最多 5 次嘗試
        }
    };
});
```

### 8.4 HTTPS 和 TLS / HTTPS and TLS

- ✓ 強制使用 HTTPS
- ✓ 使用 TLS 1.2 或更高版本
- ✓ HSTS (HTTP Strict Transport Security) header

```csharp
// 強制 HTTPS / Force HTTPS
app.UseHttpsRedirection();

// 設定 HSTS / Configure HSTS
app.UseHsts();

// HSTS header 配置
services.AddHsts(options =>
{
    options.MaxAge = TimeSpan.FromDays(365);
    options.IncludeSubDomains = true;
    options.Preload = true;
});
```

### 8.5 安全標頭 / Security Headers

```csharp
// 設定安全標頭 / Configure security headers
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Add("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
    
    await next();
});
```

---

## 9. 雙因素驗證 (2FA) / Two-Factor Authentication

### 9.1 流程概述 / Flow Overview

```
使用者登入 (User Login)
    ↓
驗證帳號密碼 (Verify Credentials)
    ↓
檢查是否啟用 2FA (Check if 2FA Enabled)
    ↓
發送 OTP 至手機/Email (Send OTP)
    ↓
使用者輸入 OTP (User Enters OTP)
    ↓
驗證 OTP (Verify OTP)
    ↓
發放 Token (Issue Token)
```

### 9.2 TOTP (Time-based OTP) 實作 / TOTP Implementation

```csharp
// 生成 2FA 密鑰 / Generate 2FA secret
public async Task<string> GenerateTwoFactorSecretAsync(int userId)
{
    var secret = KeyGeneration.GenerateRandomKey(20);
    var base32Secret = Base32Encoding.ToString(secret);
    
    // 儲存密鑰 / Store secret
    await _userService.SetTwoFactorSecretAsync(userId, base32Secret);
    
    return base32Secret;
}

// 驗證 TOTP 碼 / Verify TOTP code
public bool VerifyTwoFactorCode(string secret, string code)
{
    var otp = new Totp(Base32Encoding.ToBytes(secret));
    return otp.VerifyTotp(code, out _, new VerificationWindow(2, 2));
}

// 生成 QR 碼 URL / Generate QR code URL
public string GetQrCodeUrl(string email, string secret)
{
    return $"otpauth://totp/WinFormsExamples:{email}?secret={secret}&issuer=WinFormsExamples";
}
```

---

## 10. 稽核與監控 / Auditing and Monitoring

### 10.1 稽核日誌 / Audit Logging

記錄以下事件 / Log the following events:

- 使用者註冊 / User registration
- 使用者登入（成功和失敗）/ User login (success and failure)
- 使用者登出 / User logout
- 密碼變更 / Password change
- 權限變更 / Permission change
- Token 刷新 / Token refresh
- 敏感操作（建立、更新、刪除）/ Sensitive operations (create, update, delete)

```csharp
// 稽核日誌服務 / Audit logging service
public async Task LogAsync(string action, int? userId = null, object? data = null)
{
    var auditLog = new AuditLog
    {
        UserId = userId,
        Action = action,
        EntityType = data?.GetType().Name,
        NewValues = JsonSerializer.Serialize(data),
        IpAddress = _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.ToString(),
        UserAgent = _httpContextAccessor.HttpContext?.Request.Headers["User-Agent"].ToString(),
        CreatedAt = DateTime.UtcNow
    };

    _context.AuditLogs.Add(auditLog);
    await _context.SaveChangesAsync();
}
```

### 10.2 監控指標 / Monitoring Metrics

- 登入成功率 / Login success rate
- 登入失敗次數 / Login failure count
- Token 刷新頻率 / Token refresh frequency
- 平均回應時間 / Average response time
- 異常活動偵測 / Anomaly detection

---

## 11. 驗證檢查清單 / Validation Checklist

- [ ] JWT Token 正確實作
- [ ] 密碼雜湊使用 BCrypt
- [ ] HTTPS 強制啟用
- [ ] CORS 正確配置
- [ ] 速率限制已實作
- [ ] 帳號鎖定機制已實作
- [ ] CSRF 防護已啟用
- [ ] XSS 防護已實作
- [ ] SQL Injection 防護已實作
- [ ] 安全標頭已配置
- [ ] 角色權限控制正確實作
- [ ] Token 刷新機制正常運作
- [ ] 稽核日誌完整記錄
- [ ] 雙因素驗證（可選）已實作
- [ ] 密碼重設流程安全
- [ ] 文件完整且最新

---

## 12. 參考資料 / References

- [JWT Best Current Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [ASP.NET Core Security](https://docs.microsoft.com/aspnet/core/security/)
- [Angular Security Guide](https://angular.io/guide/security)

---

**文件版本歷史 / Document Version History**

| 版本 / Version | 日期 / Date | 變更說明 / Changes |
|---------------|-------------|-------------------|
| 1.0 | 2024 | 初始版本 / Initial version |
