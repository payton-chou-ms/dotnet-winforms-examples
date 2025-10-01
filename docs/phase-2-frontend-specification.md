# 階段 2：前端規格文件 / Phase 2: Frontend Specification Document

## Frontend Specification - Angular Web Application

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | Phase 2 Frontend Specification - Angular Migration |
| 版本 / Version | 1.0 |
| 狀態 / Status | Design Phase |
| 作者 / Author | Migration Design Team |
| 日期 / Date | 2024 |
| 專案 / Project | dotnet-winforms-examples → Web Migration |

---

## 1. 概述 / Overview

### 1.1 目的 / Purpose

本文件定義 WinForms 應用程式遷移到 Angular Web 應用程式的前端規格，包含組件架構、路由設計、狀態管理、UI 規格等完整前端技術規格。

This document defines the frontend specifications for migrating the WinForms application to an Angular web application, including component architecture, routing design, state management, UI specifications, and complete frontend technical specifications.

### 1.2 技術棧 / Technology Stack

| 技術 / Technology | 版本 / Version | 用途 / Purpose |
|------------------|----------------|----------------|
| Angular | 17.x+ | SPA 框架 / SPA Framework |
| TypeScript | 5.x+ | 開發語言 / Development Language |
| RxJS | 7.x+ | 響應式程式設計 / Reactive Programming |
| Angular Material | 17.x+ | UI 組件庫 / UI Component Library |
| SCSS | Latest | 樣式設計 / Styling |
| Angular Router | 17.x+ | 路由管理 / Routing Management |
| HttpClient | 17.x+ | HTTP 通訊 / HTTP Communication |

---

## 2. 應用程式架構 / Application Architecture

### 2.1 整體架構 / Overall Architecture

```
src/
├── app/
│   ├── core/                    # 核心模組 / Core Module
│   │   ├── services/           # 核心服務 / Core Services
│   │   │   ├── auth.service.ts
│   │   │   ├── api.service.ts
│   │   │   └── config.service.ts
│   │   ├── guards/             # 路由守衛 / Route Guards
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/       # HTTP 攔截器 / Interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── models/             # 核心模型 / Core Models
│   │       └── user.model.ts
│   │
│   ├── shared/                  # 共享模組 / Shared Module
│   │   ├── components/         # 共享組件 / Shared Components
│   │   │   ├── loading-spinner/
│   │   │   └── error-message/
│   │   ├── directives/         # 共享指令 / Shared Directives
│   │   └── pipes/              # 共享管道 / Shared Pipes
│   │
│   ├── features/                # 功能模組 / Feature Modules
│   │   ├── splash-screen/      # 啟動畫面 / Splash Screen
│   │   │   ├── components/
│   │   │   │   └── splash-screen.component.ts
│   │   │   └── splash-screen.module.ts
│   │   ├── dashboard/          # 主控面板 / Dashboard
│   │   │   ├── components/
│   │   │   └── dashboard.module.ts
│   │   └── examples/           # 範例展示 / Examples
│   │       ├── animated-effects/
│   │       ├── custom-controls/
│   │       └── examples.module.ts
│   │
│   ├── app.component.ts         # 根組件 / Root Component
│   ├── app.config.ts            # 應用配置 / App Config
│   └── app.routes.ts            # 路由配置 / Route Config
│
├── assets/                      # 靜態資源 / Static Assets
│   ├── images/
│   │   └── animated-logo.gif
│   ├── styles/
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   └── i18n/                    # 國際化 / Internationalization
│       ├── en.json
│       └── zh-TW.json
│
└── environments/                # 環境配置 / Environment Config
    ├── environment.ts
    └── environment.prod.ts
```

### 2.2 架構原則 / Architecture Principles

1. **模組化設計 (Modular Design)**
   - 核心模組：單例服務，應用級功能
   - 共享模組：可重用組件、指令、管道
   - 功能模組：業務功能封裝，支援懶加載

2. **單一職責 (Single Responsibility)**
   - 每個組件專注單一功能
   - 服務層分離業務邏輯
   - 智能組件與展示組件分離

3. **依賴注入 (Dependency Injection)**
   - 使用 Angular DI 系統
   - 服務層統一管理
   - 便於測試和維護

---

## 3. 組件規格 / Component Specifications

### 3.1 啟動畫面組件 / Splash Screen Component

#### 3.1.1 組件定義 / Component Definition

**路徑 / Path:** `src/app/features/splash-screen/components/splash-screen.component.ts`

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  standalone: false
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  // 進度百分比 / Progress percentage
  progress = 0;
  
  // RxJS 訂閱 / RxJS Subscription
  private subscription?: Subscription;
  
  // 是否正在拖曳 / Is dragging
  private isDragging = false;
  
  // 拖曳起始位置 / Drag start position
  private dragStartX = 0;
  private dragStartY = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 10 秒計時器，每 100ms 更新一次進度
    // 10-second timer, update progress every 100ms
    this.subscription = timer(0, 100).pipe(
      takeWhile(() => this.progress < 100)
    ).subscribe(tick => {
      this.progress = Math.min((tick / 100) * 100, 100);
      
      // 10 秒後導航到主控面板
      // Navigate to dashboard after 10 seconds
      if (this.progress >= 100) {
        this.navigateToDashboard();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * 導航到主控面板
   * Navigate to dashboard
   */
  private navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * 手動關閉啟動畫面
   * Manually close splash screen
   */
  close(): void {
    this.subscription?.unsubscribe();
    this.navigateToDashboard();
  }
}
```

#### 3.1.2 模板規格 / Template Specification

**路徑 / Path:** `src/app/features/splash-screen/components/splash-screen.component.html`

```html
<div class="splash-container">
  <!-- 動畫標誌 / Animated Logo -->
  <div class="logo-wrapper">
    <img 
      src="assets/images/animated-logo.gif" 
      alt="Company Logo" 
      class="animated-logo">
  </div>

  <!-- 進度條 / Progress Bar -->
  <div class="progress-container">
    <mat-progress-bar 
      mode="determinate" 
      [value]="progress"
      color="primary">
    </mat-progress-bar>
    <span class="progress-text">{{ progress | number:'1.0-0' }}%</span>
  </div>

  <!-- 關閉按鈕（可選）/ Close Button (Optional) -->
  <button 
    mat-icon-button 
    class="close-button"
    (click)="close()"
    aria-label="Close splash screen">
    <mat-icon>close</mat-icon>
  </button>
</div>
```

#### 3.1.3 樣式規格 / Style Specification

**路徑 / Path:** `src/app/features/splash-screen/components/splash-screen.component.scss`

```scss
.splash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 9999;

  .logo-wrapper {
    margin-bottom: 2rem;
    animation: fadeIn 0.5s ease-in;

    .animated-logo {
      width: 300px;
      height: auto;
      max-width: 80vw;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
  }

  .progress-container {
    width: 300px;
    max-width: 80vw;
    position: relative;

    mat-progress-bar {
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-text {
      position: absolute;
      top: -25px;
      right: 0;
      color: white;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    color: white;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 3.2 主控面板組件 / Dashboard Component

#### 3.2.1 組件定義 / Component Definition

**路徑 / Path:** `src/app/features/dashboard/components/dashboard.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  // 範例卡片資料 / Example cards data
  exampleCards = [
    {
      title: 'Animated Effects',
      description: '動畫效果範例 / Animation effect examples',
      icon: 'animation',
      route: '/examples/animated-effects'
    },
    {
      title: 'Custom Controls',
      description: '自訂控制項範例 / Custom control examples',
      icon: 'widgets',
      route: '/examples/custom-controls'
    },
    {
      title: 'Collision Detection',
      description: '碰撞偵測範例 / Collision detection examples',
      icon: 'sports_esports',
      route: '/examples/collision-detection'
    },
    {
      title: 'Fade In/Out',
      description: '淡入淡出效果 / Fade in/out effects',
      icon: 'gradient',
      route: '/examples/fade-effects'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // 初始化邏輯
    // Initialization logic
  }

  /**
   * 導航到範例頁面
   * Navigate to example page
   */
  navigateToExample(route: string): void {
    this.router.navigate([route]);
  }
}
```

#### 3.2.2 模板規格 / Template Specification

```html
<div class="dashboard-container">
  <!-- 標題區 / Header Section -->
  <header class="dashboard-header">
    <h1>WinForms Examples Gallery</h1>
    <p class="subtitle">Modernized Web Version</p>
  </header>

  <!-- 範例卡片網格 / Example Cards Grid -->
  <div class="examples-grid">
    <mat-card 
      *ngFor="let card of exampleCards" 
      class="example-card"
      (click)="navigateToExample(card.route)">
      <mat-card-header>
        <mat-icon mat-card-avatar>{{ card.icon }}</mat-icon>
        <mat-card-title>{{ card.title }}</mat-card-title>
        <mat-card-subtitle>{{ card.description }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions>
        <button mat-button color="primary">
          View Example
          <mat-icon>arrow_forward</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  </div>
</div>
```

---

## 4. 路由配置 / Routing Configuration

### 4.1 路由結構 / Route Structure

**路徑 / Path:** `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

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
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [AuthGuard] // 可選：需要認證 / Optional: Requires auth
  },
  {
    path: 'examples',
    loadChildren: () => import('./features/examples/examples.module')
      .then(m => m.ExamplesModule)
  },
  {
    path: '**',
    redirectTo: '/splash'
  }
];
```

### 4.2 路由導航流程 / Route Navigation Flow

```
應用啟動 (App Start)
    ↓
啟動畫面 (/splash)
    ↓ (10 秒自動或手動關閉)
主控面板 (/dashboard)
    ↓ (選擇範例)
範例頁面 (/examples/*)
    ↓ (返回)
主控面板 (/dashboard)
```

---

## 5. 狀態管理 / State Management

### 5.1 服務層狀態管理 / Service-based State Management

基於 RxJS BehaviorSubject 的簡單狀態管理：

```typescript
// src/app/core/services/app-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppState {
  isLoading: boolean;
  currentUser: User | null;
  splashScreenCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private stateSubject = new BehaviorSubject<AppState>({
    isLoading: false,
    currentUser: null,
    splashScreenCompleted: false
  });

  public state$: Observable<AppState> = this.stateSubject.asObservable();

  get currentState(): AppState {
    return this.stateSubject.value;
  }

  updateState(partial: Partial<AppState>): void {
    this.stateSubject.next({
      ...this.currentState,
      ...partial
    });
  }

  setSplashScreenCompleted(completed: boolean): void {
    this.updateState({ splashScreenCompleted: completed });
  }
}
```

---

## 6. HTTP 通訊 / HTTP Communication

### 6.1 API 服務 / API Service

```typescript
// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * GET 請求
   * GET request
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
  }

  /**
   * POST 請求
   * POST request
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * PUT 請求
   * PUT request
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * DELETE 請求
   * DELETE request
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}
```

### 6.2 HTTP 攔截器 / HTTP Interceptors

```typescript
// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    
    return next.handle(req);
  }
}
```

---

## 7. 樣式與主題 / Styling and Theming

### 7.1 全域樣式變數 / Global Style Variables

**路徑 / Path:** `src/assets/styles/_variables.scss`

```scss
// 顏色變數 / Color Variables
$primary-color: #667eea;
$secondary-color: #764ba2;
$accent-color: #f093fb;
$warn-color: #f44336;
$background-color: #f5f5f5;
$text-primary: #212121;
$text-secondary: #757575;

// 間距變數 / Spacing Variables
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// 斷點變數 / Breakpoint Variables
$breakpoint-mobile: 576px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 992px;
$breakpoint-wide: 1200px;

// 字體變數 / Font Variables
$font-family: 'Roboto', 'Noto Sans TC', sans-serif;
$font-size-base: 16px;
$font-size-sm: 14px;
$font-size-lg: 18px;
$font-size-xl: 24px;

// 陰影變數 / Shadow Variables
$shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
$shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
```

### 7.2 Material 主題配置 / Material Theme Configuration

```scss
// src/styles.scss
@use '@angular/material' as mat;

@include mat.core();

// 定義主題色板 / Define theme palettes
$primary-palette: mat.define-palette(mat.$indigo-palette);
$accent-palette: mat.define-palette(mat.$pink-palette);
$warn-palette: mat.define-palette(mat.$red-palette);

// 建立主題 / Create theme
$theme: mat.define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
    warn: $warn-palette,
  )
));

// 套用主題 / Apply theme
@include mat.all-component-themes($theme);
```

---

## 8. 響應式設計 / Responsive Design

### 8.1 響應式斷點 / Responsive Breakpoints

| 斷點 / Breakpoint | 寬度 / Width | 裝置 / Device |
|------------------|-------------|---------------|
| Mobile | < 576px | 手機 / Mobile phones |
| Tablet | 576px - 768px | 平板 / Tablets |
| Desktop | 768px - 992px | 桌機 / Desktops |
| Wide | > 992px | 大螢幕 / Large screens |

### 8.2 響應式網格 / Responsive Grid

```scss
.examples-grid {
  display: grid;
  gap: $spacing-lg;
  padding: $spacing-lg;
  
  // 手機：1 列 / Mobile: 1 column
  grid-template-columns: 1fr;
  
  // 平板：2 列 / Tablet: 2 columns
  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // 桌機：3 列 / Desktop: 3 columns
  @media (min-width: $breakpoint-desktop) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  // 大螢幕：4 列 / Wide: 4 columns
  @media (min-width: $breakpoint-wide) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 9. 效能優化 / Performance Optimization

### 9.1 懶加載策略 / Lazy Loading Strategy

- 使用 Angular 路由懶加載功能模組
- 減少初始載入時間
- 按需加載組件

### 9.2 變更偵測優化 / Change Detection Optimization

```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush // 使用 OnPush 策略
})
export class ExampleComponent {
  // Component code
}
```

### 9.3 圖片優化 / Image Optimization

- 使用適當的圖片格式（WebP, AVIF）
- 實施延遲載入 (Lazy Loading)
- 使用 CDN 分發靜態資源

---

## 10. 國際化 (i18n) / Internationalization

### 10.1 語言支援 / Language Support

- 英文 (English)
- 繁體中文 (Traditional Chinese)

### 10.2 翻譯配置 / Translation Configuration

```typescript
// src/app/core/services/i18n.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
```

---

## 11. 測試策略 / Testing Strategy

### 11.1 單元測試 / Unit Testing

- 使用 Jasmine + Karma
- 測試組件邏輯
- 測試服務功能
- 目標覆蓋率：> 80%

### 11.2 E2E 測試 / E2E Testing

- 使用 Playwright 或 Cypress
- 測試關鍵用戶流程
- 自動化測試場景

---

## 12. 瀏覽器支援 / Browser Support

| 瀏覽器 / Browser | 最低版本 / Min Version |
|-----------------|----------------------|
| Chrome | 最新 2 版本 / Latest 2 |
| Firefox | 最新 2 版本 / Latest 2 |
| Safari | 最新 2 版本 / Latest 2 |
| Edge | 最新 2 版本 / Latest 2 |

---

## 13. 開發工具與環境 / Development Tools

### 13.1 必要工具 / Required Tools

- Node.js 18.x+
- npm 9.x+ 或 yarn 1.22.x+
- Angular CLI 17.x+
- VS Code (推薦 / Recommended)

### 13.2 VS Code 擴充功能 / VS Code Extensions

- Angular Language Service
- ESLint
- Prettier
- Angular Snippets
- Material Icon Theme

---

## 14. 部署配置 / Deployment Configuration

### 14.1 建置設定 / Build Configuration

```json
// angular.json (部分)
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
        }
      ]
    }
  }
}
```

### 14.2 環境變數 / Environment Variables

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com',
  enableDebug: false,
  version: '1.0.0'
};
```

---

## 15. 驗證檢查清單 / Validation Checklist

- [ ] 組件結構符合架構設計
- [ ] 路由配置正確且可導航
- [ ] 樣式符合設計規範
- [ ] 響應式設計在各裝置正常運作
- [ ] HTTP 通訊正確配置
- [ ] 狀態管理運作正常
- [ ] 效能指標符合要求
- [ ] 瀏覽器相容性測試通過
- [ ] 國際化功能正常
- [ ] 單元測試覆蓋率達標
- [ ] E2E 測試場景完整
- [ ] 文件完整且最新

---

## 16. 參考資料 / References

- [Angular 官方文件](https://angular.io/docs)
- [Angular Material 文件](https://material.angular.io/)
- [RxJS 文件](https://rxjs.dev/)
- [TypeScript 文件](https://www.typescriptlang.org/docs/)
- [WCAG 無障礙指南](https://www.w3.org/WAI/WCAG21/quickref/)

---

**文件版本歷史 / Document Version History**

| 版本 / Version | 日期 / Date | 變更說明 / Changes |
|---------------|-------------|-------------------|
| 1.0 | 2024 | 初始版本 / Initial version |
