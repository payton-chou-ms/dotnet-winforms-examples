# 階段 3：開發階段總覽 / Phase 3: Development Phase Overview

## Phase 3 Complete Development Guide

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | Phase 3 Development Phase - Overview and Implementation Guide |
| 版本 / Version | 1.0 |
| 狀態 / Status | In Progress 🚧 |
| 作者 / Author | Development Team |
| 日期 / Date | 2024 |
| 專案 / Project | dotnet-winforms-examples → Web Migration |
| 預計時間 / Estimated Duration | 8-12 週 / weeks |

---

## 1. 階段概述 / Phase Overview

階段 3 的開發階段將基於階段 2 的設計文件，實際建立前後端分離的 Web 應用程式。本階段包含開發環境設置、前後端基礎架構實作、核心功能開發、認證授權實作、系統整合以及測試撰寫。

Phase 3 Development Phase will build the actual frontend-backend separated web application based on Phase 2 design documents. This phase includes development environment setup, frontend and backend infrastructure implementation, core feature development, authentication/authorization implementation, system integration, and test writing.

### 1.1 主要目標 / Key Objectives

- ✅ 建立可運行的開發環境
- ✅ 實作前端 Angular 應用程式基礎架構
- ✅ 實作後端 ASP.NET Core API 基礎架構
- ✅ 開發核心業務功能
- ✅ 實作完整的認證授權機制
- ✅ 整合前後端系統
- ✅ 編寫全面的單元測試和整合測試

- ✅ Establish working development environment
- ✅ Implement frontend Angular application infrastructure
- ✅ Implement backend ASP.NET Core API infrastructure
- ✅ Develop core business features
- ✅ Implement complete authentication/authorization mechanism
- ✅ Integrate frontend and backend systems
- ✅ Write comprehensive unit and integration tests

### 1.2 開發清單 / Development Checklist

- [ ] 建立開發環境 / Set up development environment
- [ ] 實作前端基礎架構（路由、狀態管理）/ Implement frontend infrastructure (routing, state management)
- [ ] 實作後端基礎架構（控制器、服務）/ Implement backend infrastructure (controllers, services)
- [ ] 開發核心功能 / Develop core features
- [ ] 實作認證授權 / Implement authentication/authorization
- [ ] 整合前後端 / Integrate frontend and backend
- [ ] 編寫單元測試 / Write unit tests
- [ ] 編寫整合測試 / Write integration tests

---

## 2. 開發環境設置 / Development Environment Setup

### 2.1 必要工具與版本 / Required Tools and Versions

#### 2.1.1 前端開發工具 / Frontend Development Tools

**Node.js 環境 / Node.js Environment:**
```bash
# 安裝 Node.js (LTS 版本) / Install Node.js (LTS version)
# 建議版本 / Recommended version: 18.x 或更高 / or higher
node --version  # 應該顯示 v18.x.x 或更高
npm --version   # 應該顯示 9.x.x 或更高
```

**Angular CLI:**
```bash
# 安裝 Angular CLI / Install Angular CLI
npm install -g @angular/cli@17

# 驗證安裝 / Verify installation
ng version
```

**開發編輯器 / Development Editor:**
- **VS Code** (推薦 / Recommended)
  - 必要擴充套件 / Required extensions:
    - Angular Language Service
    - ESLint
    - Prettier - Code formatter
    - Angular Snippets
    - TypeScript Hero

#### 2.1.2 後端開發工具 / Backend Development Tools

**.NET SDK:**
```bash
# 安裝 .NET 8 SDK / Install .NET 8 SDK
# 下載位置 / Download: https://dotnet.microsoft.com/download

# 驗證安裝 / Verify installation
dotnet --version  # 應該顯示 8.0.x 或更高
```

**開發環境 / Development Environment:**
- **Visual Studio 2022** 或 / or
- **Visual Studio Code** + C# Dev Kit
- **JetBrains Rider** (可選 / Optional)

**資料庫 / Database:**
```bash
# SQL Server (推薦使用 Docker) / SQL Server (Recommended using Docker)
docker pull mcr.microsoft.com/mssql/server:2022-latest

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" \
  -p 1433:1433 --name sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

#### 2.1.3 開發輔助工具 / Development Support Tools

**版本控制 / Version Control:**
```bash
# Git
git --version
```

**API 測試工具 / API Testing Tools:**
- **Postman** 或 / or
- **Insomnia** 或 / or
- **REST Client** (VS Code 擴充套件 / extension)

**容器化工具 / Containerization Tools (可選 / Optional):**
```bash
# Docker
docker --version

# Docker Compose
docker-compose --version
```

### 2.2 專案初始化 / Project Initialization

#### 2.2.1 建立前端專案 / Create Frontend Project

```bash
# 在專案根目錄建立 frontend 資料夾 / Create frontend folder in project root
cd /path/to/dotnet-winforms-examples
mkdir -p src/frontend

# 使用 Angular CLI 建立新專案 / Create new project using Angular CLI
cd src/frontend
ng new winforms-examples-web \
  --routing \
  --style=scss \
  --skip-git \
  --package-manager=npm

# 進入專案目錄 / Enter project directory
cd winforms-examples-web

# 安裝 Angular Material / Install Angular Material
ng add @angular/material

# 安裝其他必要套件 / Install other required packages
npm install rxjs@^7.8.0
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools (可選 / optional)
npm install chart.js ng2-charts (如需圖表 / if charts needed)

# 啟動開發伺服器 / Start development server
ng serve
```

**預期檔案結構 / Expected File Structure:**
```
src/frontend/winforms-examples-web/
├── src/
│   ├── app/
│   │   ├── core/              # 核心模組 / Core module
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── models/
│   │   ├── shared/            # 共享模組 / Shared module
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   ├── features/          # 功能模組 / Feature modules
│   │   │   ├── splash-screen/
│   │   │   ├── dashboard/
│   │   │   └── examples/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   └── styles.scss
├── angular.json
├── package.json
└── tsconfig.json
```

#### 2.2.2 建立後端專案 / Create Backend Project

```bash
# 在專案根目錄建立 backend 資料夾 / Create backend folder in project root
cd /path/to/dotnet-winforms-examples
mkdir -p src/backend

# 建立解決方案 / Create solution
cd src/backend
dotnet new sln -n WinFormsExamples

# 建立 Web API 專案 / Create Web API project
dotnet new webapi -n WinFormsExamples.API -o WinFormsExamples.API
dotnet sln add WinFormsExamples.API/WinFormsExamples.API.csproj

# 建立類別庫專案 / Create class library projects
dotnet new classlib -n WinFormsExamples.Application -o WinFormsExamples.Application
dotnet sln add WinFormsExamples.Application/WinFormsExamples.Application.csproj

dotnet new classlib -n WinFormsExamples.Domain -o WinFormsExamples.Domain
dotnet sln add WinFormsExamples.Domain/WinFormsExamples.Domain.csproj

dotnet new classlib -n WinFormsExamples.Infrastructure -o WinFormsExamples.Infrastructure
dotnet sln add WinFormsExamples.Infrastructure/WinFormsExamples.Infrastructure.csproj

# 建立專案參考 / Add project references
cd WinFormsExamples.API
dotnet add reference ../WinFormsExamples.Application/WinFormsExamples.Application.csproj
dotnet add reference ../WinFormsExamples.Infrastructure/WinFormsExamples.Infrastructure.csproj

cd ../WinFormsExamples.Application
dotnet add reference ../WinFormsExamples.Domain/WinFormsExamples.Domain.csproj

cd ../WinFormsExamples.Infrastructure
dotnet add reference ../WinFormsExamples.Domain/WinFormsExamples.Domain.csproj
dotnet add reference ../WinFormsExamples.Application/WinFormsExamples.Application.csproj

# 安裝必要套件 / Install required packages
cd ../WinFormsExamples.API
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Swashbuckle.AspNetCore
dotnet add package Serilog.AspNetCore
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection

cd ../WinFormsExamples.Infrastructure
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# 建置解決方案 / Build solution
cd ..
dotnet build
```

**預期檔案結構 / Expected File Structure:**
```
src/backend/
├── WinFormsExamples.API/           # Web API 層
│   ├── Controllers/
│   ├── Middleware/
│   ├── Program.cs
│   └── appsettings.json
├── WinFormsExamples.Application/   # 應用層
│   ├── Interfaces/
│   ├── Services/
│   ├── DTOs/
│   └── Mappings/
├── WinFormsExamples.Domain/        # 領域層
│   ├── Entities/
│   ├── Enums/
│   └── ValueObjects/
├── WinFormsExamples.Infrastructure/ # 基礎設施層
│   ├── Data/
│   │   ├── ApplicationDbContext.cs
│   │   └── Migrations/
│   ├── Repositories/
│   └── Services/
└── WinFormsExamples.sln
```

### 2.3 開發環境配置 / Development Environment Configuration

#### 2.3.1 前端環境配置 / Frontend Environment Configuration

**建立環境檔案 / Create environment files:**

`src/frontend/winforms-examples-web/src/environments/environment.ts` (開發環境 / Development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api',
  apiTimeout: 30000,
  enableDebug: true
};
```

`src/frontend/winforms-examples-web/src/environments/environment.prod.ts` (生產環境 / Production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api',
  apiTimeout: 30000,
  enableDebug: false
};
```

**設定 CORS 代理 / Configure CORS proxy:**

`src/frontend/winforms-examples-web/proxy.conf.json`:
```json
{
  "/api": {
    "target": "https://localhost:7001",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

更新 `package.json`:
```json
{
  "scripts": {
    "start": "ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint"
  }
}
```

#### 2.3.2 後端環境配置 / Backend Environment Configuration

**appsettings.Development.json:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=WinFormsExamplesDB;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True"
  },
  "JwtSettings": {
    "Secret": "YourSuperSecretKeyThatIsAtLeast32CharactersLong",
    "Issuer": "WinFormsExamplesAPI",
    "Audience": "WinFormsExamplesWeb",
    "ExpirationMinutes": 60
  },
  "AllowedOrigins": [
    "http://localhost:4200"
  ]
}
```

**appsettings.json:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### 2.4 驗證開發環境 / Verify Development Environment

**前端驗證 / Frontend Verification:**
```bash
cd src/frontend/winforms-examples-web
ng serve

# 應該看到 / Should see:
# ** Angular Live Development Server is listening on localhost:4200 **
```

瀏覽器開啟 / Open browser: `http://localhost:4200`

**後端驗證 / Backend Verification:**
```bash
cd src/backend/WinFormsExamples.API
dotnet run

# 應該看到 / Should see:
# Now listening on: https://localhost:7001
# Now listening on: http://localhost:5000
```

瀏覽器開啟 / Open browser: `https://localhost:7001/swagger`

---

## 3. 前端基礎架構實作 / Frontend Infrastructure Implementation

### 3.1 核心模組實作 / Core Module Implementation

#### 3.1.1 建立核心模組結構 / Create Core Module Structure

```bash
cd src/frontend/winforms-examples-web/src/app
ng generate module core --flat=false
```

#### 3.1.2 HTTP 服務實作 / HTTP Service Implementation

**API 基礎服務 / API Base Service:**

```bash
ng generate service core/services/api --skip-tests=false
```

`src/app/core/services/api.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly timeout = environment.apiTimeout;

  constructor(private http: HttpClient) {}

  /**
   * GET 請求
   * GET request
   */
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params })
      .pipe(
        timeout(this.timeout),
        catchError(this.handleError)
      );
  }

  /**
   * POST 請求
   * POST request
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body)
      .pipe(
        timeout(this.timeout),
        catchError(this.handleError)
      );
  }

  /**
   * PUT 請求
   * PUT request
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body)
      .pipe(
        timeout(this.timeout),
        catchError(this.handleError)
      );
  }

  /**
   * DELETE 請求
   * DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`)
      .pipe(
        timeout(this.timeout),
        catchError(this.handleError)
      );
  }

  /**
   * 錯誤處理
   * Error handling
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // 客戶端錯誤 / Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // 伺服器端錯誤 / Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

#### 3.1.3 認證服務實作 / Authentication Service Implementation

```bash
ng generate service core/services/auth --skip-tests=false
```

`src/app/core/services/auth.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor(private apiService: ApiService) {
    const storedUser = this.getStoredUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * 取得當前使用者
   * Get current user
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * 登入
   * Login
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('auth/login', credentials)
      .pipe(
        tap(response => {
          this.storeTokens(response.token, response.refreshToken);
          this.storeUser(response.user);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * 登出
   * Logout
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  /**
   * 檢查是否已登入
   * Check if logged in
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * 取得 Token
   * Get token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * 取得 Refresh Token
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * 取得使用者角色
   * Get user roles
   */
  getUserRoles(): string[] {
    const user = this.currentUserValue;
    return user ? user.roles : [];
  }

  /**
   * 儲存 Tokens
   * Store tokens
   */
  private storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  /**
   * 儲存使用者資料
   * Store user data
   */
  private storeUser(user: User): void {
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  /**
   * 取得儲存的使用者資料
   * Get stored user data
   */
  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('current_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * 檢查 Token 是否過期
   * Check if token is expired
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      return expirationDate < new Date();
    } catch {
      return true;
    }
  }
}
```

#### 3.1.4 狀態管理服務實作 / State Management Service Implementation

```bash
ng generate service core/services/app-state --skip-tests=false
```

`src/app/core/services/app-state.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './auth.service';

export interface AppState {
  isLoading: boolean;
  currentUser: User | null;
  splashScreenCompleted: boolean;
  sidenavOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private stateSubject = new BehaviorSubject<AppState>({
    isLoading: false,
    currentUser: null,
    splashScreenCompleted: false,
    sidenavOpen: true
  });

  public state$: Observable<AppState> = this.stateSubject.asObservable();

  /**
   * 取得當前狀態
   * Get current state
   */
  get currentState(): AppState {
    return this.stateSubject.value;
  }

  /**
   * 更新狀態
   * Update state
   */
  updateState(partial: Partial<AppState>): void {
    this.stateSubject.next({
      ...this.currentState,
      ...partial
    });
  }

  /**
   * 設定載入狀態
   * Set loading state
   */
  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading });
  }

  /**
   * 設定啟動畫面完成狀態
   * Set splash screen completed
   */
  setSplashScreenCompleted(completed: boolean): void {
    this.updateState({ splashScreenCompleted: completed });
  }

  /**
   * 切換側邊欄
   * Toggle sidenav
   */
  toggleSidenav(): void {
    this.updateState({ sidenavOpen: !this.currentState.sidenavOpen });
  }

  /**
   * 設定當前使用者
   * Set current user
   */
  setCurrentUser(user: User | null): void {
    this.updateState({ currentUser: user });
  }
}
```

#### 3.1.5 HTTP 攔截器實作 / HTTP Interceptor Implementation

```bash
ng generate interceptor core/interceptors/auth --functional=false
ng generate interceptor core/interceptors/error --functional=false
```

`src/app/core/interceptors/auth.interceptor.ts`:
```typescript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request);
  }
}
```

`src/app/core/interceptors/error.interceptor.ts`:
```typescript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // 未授權，導向登入頁 / Unauthorized, redirect to login
          this.authService.logout();
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          // 禁止存取 / Forbidden
          this.router.navigate(['/unauthorized']);
        } else if (error.status === 404) {
          // 找不到資源 / Not found
          console.error('Resource not found:', error.url);
        } else if (error.status === 500) {
          // 伺服器錯誤 / Server error
          console.error('Server error:', error.message);
        }
        
        return throwError(() => error);
      })
    );
  }
}
```

#### 3.1.6 路由守衛實作 / Route Guards Implementation

```bash
ng generate guard core/guards/auth --implements=CanActivate
ng generate guard core/guards/role --implements=CanActivate
```

`src/app/core/guards/auth.guard.ts`:
```typescript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

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
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // 未登入，重導向至登入頁面
    // Not logged in, redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
```

`src/app/core/guards/role.guard.ts`:
```typescript
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['roles'] as string[];
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRoles = this.authService.getUserRoles();
    
    if (requiredRoles.some(role => userRoles.includes(role))) {
      return true;
    }

    // 權限不足，重導向至無權限頁面
    // Insufficient permissions, redirect to unauthorized page
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
```

### 3.2 路由配置實作 / Routing Configuration Implementation

`src/app/app.routes.ts`:
```typescript
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./features/splash-screen/splash-screen.module')
      .then(m => m.SplashScreenModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'examples',
    loadChildren: () => import('./features/examples/examples.module')
      .then(m => m.ExamplesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./features/error/error.module')
      .then(m => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: '/splash'
  }
];
```

### 3.3 應用程式配置 / Application Configuration

`src/app/app.config.ts`:
```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
};
```

---

## 4. 後端基礎架構實作 / Backend Infrastructure Implementation

*Due to length constraints, this section continues with backend implementation details including Domain Layer, Application Layer, Infrastructure Layer, and API Layer implementations with controllers, services, DTOs, and database context.*

---

## 5. 核心功能開發 / Core Features Development

*This section covers the implementation of key features like Splash Screen and Dashboard modules.*

---

## 6. 認證授權實作 / Authentication & Authorization Implementation

*This section details the implementation of authentication and authorization including login functionality and JWT token handling.*

---

## 7. 前後端整合 / Frontend-Backend Integration

*This section explains how to integrate frontend and backend systems.*

---

## 8. 單元測試 / Unit Testing

*This section covers unit testing for both frontend (Angular) and backend (.NET) components.*

---

## 9. 整合測試 / Integration Testing

*This section details E2E testing with Playwright and API integration testing.*

---

## 10. 開發最佳實踐 / Development Best Practices

### 10.1 程式碼品質 / Code Quality

**前端 / Frontend:**
- 遵循 Angular Style Guide
- 使用 ESLint 進行程式碼檢查
- 保持組件小而專注
- 使用 TypeScript 的嚴格模式

**後端 / Backend:**
- 遵循 SOLID 原則
- 使用依賴注入
- 實作清晰的層次架構
- 適當的錯誤處理和日誌記錄

### 10.2 版本控制 / Version Control

**Git 工作流程 / Git Workflow:**
```bash
# 建立功能分支 / Create feature branch
git checkout -b feature/your-feature-name

# 提交變更 / Commit changes
git add .
git commit -m "feat: add your feature description"

# 推送到遠端 / Push to remote
git push origin feature/your-feature-name

# 建立 Pull Request / Create Pull Request
```

### 10.3 效能優化 / Performance Optimization

**前端優化 / Frontend Optimization:**
- 使用懶加載模組
- 實作 OnPush 變更偵測
- 使用 TrackBy 在 *ngFor
- 壓縮和優化圖片

**後端優化 / Backend Optimization:**
- 使用資料庫索引
- 實作快取機制
- 使用分頁減少資料傳輸
- 非同步處理長時間操作

---

## 11. 常見問題排除 / Troubleshooting

### 11.1 CORS 問題 / CORS Issues

**問題 / Problem:** 前端無法連接到後端 API

**解決方案 / Solution:**
1. 確認後端 CORS 設定正確
2. 確認前端 proxy 設定正確
3. 檢查防火牆設定

### 11.2 認證問題 / Authentication Issues

**問題 / Problem:** JWT Token 驗證失敗

**解決方案 / Solution:**
1. 檢查 Token 格式是否正確
2. 確認密鑰配置一致
3. 檢查 Token 是否過期

### 11.3 資料庫問題 / Database Issues

**問題 / Problem:** 資料庫連線失敗

**解決方案 / Solution:**
1. 確認連線字串正確
2. 確認資料庫服務已啟動
3. 檢查防火牆規則

---

## 12. 下一步 / Next Steps

完成階段 3 後，進入階段 4：測試階段 / After completing Phase 3, proceed to Phase 4: Testing Phase

**階段 4 重點 / Phase 4 Focus:**
- 全面的測試執行
- 效能測試和優化
- 安全性測試
- 使用者驗收測試 (UAT)

**階段 5 重點 / Phase 5 Focus:**
- 生產環境部署
- CI/CD 設定
- 監控和日誌配置
- 文件完善

---

## 13. 參考資料 / References

### 13.1 官方文件 / Official Documentation

- **Angular:** https://angular.io/docs
- **.NET:** https://docs.microsoft.com/dotnet
- **Entity Framework Core:** https://docs.microsoft.com/ef/core
- **ASP.NET Core:** https://docs.microsoft.com/aspnet/core

### 13.2 相關文件 / Related Documents

- [Phase 2: Design Overview](./phase-2-design-overview.md)
- [Phase 2: Frontend Specification](./phase-2-frontend-specification.md)
- [Phase 2: Backend API Specification](./phase-2-backend-api-specification.md)
- [Phase 2: Authentication & Authorization Flow](./phase-2-auth-flow.md)
- [Scenario 2: Specification to New Architecture](./scenario-2-specification-to-new-architecture.md)

---

## 14. 總結 / Summary

階段 3 的開發階段建立了完整的前後端分離應用程式基礎架構，包括：

Phase 3 Development Phase establishes the complete frontend-backend separated application infrastructure, including:

✅ **開發環境** - 完整的工具鏈和配置
✅ **Development Environment** - Complete toolchain and configuration

✅ **前端架構** - Angular 應用程式基礎設施
✅ **Frontend Infrastructure** - Angular application infrastructure

✅ **後端架構** - ASP.NET Core API 基礎設施
✅ **Backend Infrastructure** - ASP.NET Core API infrastructure

✅ **核心功能** - 主要業務邏輯實作
✅ **Core Features** - Main business logic implementation

✅ **認證授權** - 完整的安全機制
✅ **Authentication & Authorization** - Complete security mechanism

✅ **系統整合** - 前後端無縫整合
✅ **System Integration** - Seamless frontend-backend integration

✅ **測試覆蓋** - 單元測試和整合測試
✅ **Test Coverage** - Unit and integration tests

這為後續的測試、部署和維護階段奠定了堅實的基礎。

This lays a solid foundation for subsequent testing, deployment, and maintenance phases.

---

**文件結束 / End of Document**
