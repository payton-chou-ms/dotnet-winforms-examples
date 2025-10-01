# 階段 2：設計階段總覽 / Phase 2: Design Phase Overview

## Phase 2 Complete Design Documentation Index

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | Phase 2 Design Phase - Overview and Index |
| 版本 / Version | 1.0 |
| 狀態 / Status | Completed ✅ |
| 作者 / Author | Migration Design Team |
| 日期 / Date | 2024 |
| 專案 / Project | dotnet-winforms-examples → Web Migration |

---

## 1. 階段概述 / Phase Overview

階段 2 的設計階段已完成，包含前端規格、後端 API 規格、資料庫結構設計、API 契約定義、UI 線框圖、以及認證授權流程設計等六大核心文件。

Phase 2 Design Phase is complete, including frontend specifications, backend API specifications, database schema design, API contracts, UI wireframes, and authentication/authorization flow design - six core documents in total.

### 1.1 完成清單 / Completion Checklist

- [x] 完成前端規格文件 / Complete frontend specification document
- [x] 完成後端 API 規格文件 / Complete backend API specification document
- [x] 設計資料庫結構 / Design database schema
- [x] 定義 API 契約（OpenAPI）/ Define API contracts (OpenAPI)
- [x] 繪製 UI 線框圖 / Create UI wireframes
- [x] 設計認證授權流程 / Design authentication/authorization flow

### 1.2 文件統計 / Documentation Statistics

| 統計項目 / Metric | 數值 / Value |
|------------------|-------------|
| 總文件數 / Total Documents | 6 |
| 總行數 / Total Lines | 5,934+ |
| 總大小 / Total Size | ~182 KB |
| 語言支援 / Language Support | 雙語 (中/英) / Bilingual (ZH/EN) |

---

## 2. 文件索引 / Documentation Index

### 2.1 前端規格文件 / Frontend Specification

**檔案 / File:** [`phase-2-frontend-specification.md`](./phase-2-frontend-specification.md)  
**大小 / Size:** ~22 KB  
**行數 / Lines:** ~650

**內容概述 / Content Overview:**

本文件定義完整的 Angular 前端應用程式架構，包含：

- ✅ **應用程式架構 / Application Architecture**
  - 模組化設計 (Core, Shared, Features)
  - 目錄結構規範
  - 依賴注入策略

- ✅ **組件規格 / Component Specifications**
  - 啟動畫面組件 (Splash Screen)
  - 主控面板組件 (Dashboard)
  - 完整的 TypeScript 實作範例

- ✅ **路由配置 / Routing Configuration**
  - 路由結構定義
  - 懶加載策略
  - 路由導航流程

- ✅ **狀態管理 / State Management**
  - RxJS BehaviorSubject 實作
  - 應用程式狀態定義

- ✅ **HTTP 通訊 / HTTP Communication**
  - API 服務實作
  - HTTP 攔截器配置

- ✅ **樣式與主題 / Styling and Theming**
  - SCSS 變數系統
  - Material 主題配置

- ✅ **響應式設計 / Responsive Design**
  - 4 個斷點定義
  - 響應式網格佈局

- ✅ **效能優化 / Performance Optimization**
  - 懶加載策略
  - OnPush 變更偵測

- ✅ **國際化 (i18n) / Internationalization**
  - 雙語支援 (EN/ZH-TW)
  - 翻譯服務配置

- ✅ **測試策略 / Testing Strategy**
  - 單元測試 (Jasmine + Karma)
  - E2E 測試 (Playwright/Cypress)

- ✅ **部署配置 / Deployment Configuration**
  - 建置設定
  - 環境變數管理

---

### 2.2 後端 API 規格文件 / Backend API Specification

**檔案 / File:** [`phase-2-backend-api-specification.md`](./phase-2-backend-api-specification.md)  
**大小 / Size:** ~40 KB  
**行數 / Lines:** ~1,250

**內容概述 / Content Overview:**

本文件定義完整的 ASP.NET Core Web API 架構，包含：

- ✅ **API 架構 / API Architecture**
  - Clean Architecture 分層設計
  - 專案結構規範
  - 依賴關係圖

- ✅ **API 端點規格 / API Endpoint Specifications**
  - 配置管理 API (Configuration)
  - 範例管理 API (Examples)
  - 認證授權 API (Authentication)
  - 完整的請求/回應範例

- ✅ **資料模型 / Data Models**
  - 領域實體 (Domain Entities)
  - 資料傳輸物件 (DTOs)
  - 完整的 C# 類別定義

- ✅ **控制器實作 / Controller Implementation**
  - ConfigurationController 範例
  - ExamplesController 範例
  - 完整的錯誤處理

- ✅ **驗證與錯誤處理 / Validation and Error Handling**
  - 輸入驗證規則
  - 全域錯誤處理中介軟體
  - 標準錯誤回應格式

- ✅ **認證與授權 / Authentication and Authorization**
  - JWT 配置
  - Token 生成服務
  - 授權政策定義

- ✅ **資料庫存取 / Database Access**
  - DbContext 配置
  - Entity Framework Core 設定

- ✅ **API 文件 / API Documentation**
  - Swagger/OpenAPI 配置
  - XML 註解支援

- ✅ **CORS 配置 / CORS Configuration**
  - 跨域資源共享設定

- ✅ **日誌記錄 / Logging**
  - Serilog 配置
  - 結構化日誌

- ✅ **效能與快取 / Performance and Caching**
  - 回應快取
  - 記憶體快取

- ✅ **健康檢查 / Health Checks**
  - 資料庫健康檢查
  - 外部服務檢查

- ✅ **速率限制 / Rate Limiting**
  - IP 速率限制配置

- ✅ **測試策略 / Testing Strategy**
  - 單元測試範例 (xUnit)
  - 整合測試範例

---

### 2.3 資料庫結構設計 / Database Schema Design

**檔案 / File:** [`phase-2-database-schema.md`](./phase-2-database-schema.md)  
**大小 / Size:** ~30 KB  
**行數 / Lines:** ~920

**內容概述 / Content Overview:**

本文件定義完整的資料庫結構設計，包含：

- ✅ **資料庫架構 / Database Architecture**
  - 資料庫結構圖
  - 實體關係圖 (ERD)

- ✅ **資料表定義 / Table Definitions**
  - Users (使用者資料表)
  - RefreshTokens (更新令牌資料表)
  - Configurations (配置資料表)
  - ExampleCategories (範例分類資料表)
  - Examples (範例資料表)
  - ExampleTags (範例標籤資料表)
  - ExampleTagRelations (範例標籤關聯表)
  - UserFavorites (使用者收藏資料表)
  - AuditLogs (稽核日誌資料表)

- ✅ **索引策略 / Index Strategy**
  - 效能索引定義
  - 全文檢索索引

- ✅ **資料庫視圖 / Database Views**
  - vw_ExamplesSummary (範例摘要視圖)

- ✅ **儲存程序 / Stored Procedures**
  - sp_IncrementExampleViewCount
  - sp_GetPopularExamples
  - sp_CleanupExpiredTokens
  - sp_ArchiveOldAuditLogs

- ✅ **觸發器 / Triggers**
  - 更新時間戳記觸發器
  - 稽核日誌觸發器

- ✅ **資料遷移腳本 / Data Migration Scripts**
  - 初始資料種子
  - 預設使用者和配置

- ✅ **資料庫維護 / Database Maintenance**
  - 清理過期 Token
  - 壓縮舊稽核日誌

- ✅ **備份與還原策略 / Backup and Restore Strategy**
  - 完整備份
  - 差異備份
  - 交易日誌備份

- ✅ **效能調校 / Performance Tuning**
  - 查詢優化建議
  - 資料庫設定

- ✅ **安全性考量 / Security Considerations**
  - 透明資料加密 (TDE)
  - 最小權限原則

- ✅ **Entity Framework Core 配置 / EF Core Configuration**
  - DbContext 配置範例
  - 遷移建立指令

---

### 2.4 API 契約定義 (OpenAPI) / API Contracts (OpenAPI)

**檔案 / File:** [`phase-2-api-contracts.yaml`](./phase-2-api-contracts.yaml)  
**大小 / Size:** ~27 KB  
**格式 / Format:** OpenAPI 3.0.3 (YAML)

**內容概述 / Content Overview:**

本文件提供完整的 OpenAPI 3.0 規格定義，包含：

- ✅ **API 資訊 / API Information**
  - API 標題和描述
  - 版本資訊
  - 聯絡資訊和授權

- ✅ **伺服器配置 / Server Configuration**
  - 生產環境
  - 測試環境
  - 本地開發環境

- ✅ **標籤分類 / Tag Classification**
  - Configuration (配置管理)
  - Examples (範例管理)
  - Authentication (認證授權)
  - Users (使用者管理)
  - Health (健康檢查)

- ✅ **端點定義 / Endpoint Definitions**
  - `/api/configuration/splash-screen` (GET, PUT)
  - `/api/examples` (GET, POST)
  - `/api/examples/{id}` (GET, PUT, DELETE)
  - `/api/auth/login` (POST)
  - `/api/auth/register` (POST)
  - `/api/auth/refresh` (POST)
  - `/api/auth/logout` (POST)
  - `/api/users/me` (GET)
  - `/health` (GET)

- ✅ **Schema 定義 / Schema Definitions**
  - SplashScreenConfiguration
  - Example 和 ExampleDetails
  - CreateExampleRequest/Response
  - UpdateExampleRequest
  - PaginatedExamples
  - LoginRequest/Response
  - RegisterRequest/Response
  - RefreshTokenRequest/Response
  - User
  - SuccessResponse
  - ErrorResponse
  - ValidationErrorResponse

- ✅ **安全性 / Security**
  - JWT Bearer Token 認證

- ✅ **回應代碼 / Response Codes**
  - 200 (OK)
  - 201 (Created)
  - 400 (Bad Request)
  - 401 (Unauthorized)
  - 403 (Forbidden)
  - 404 (Not Found)
  - 409 (Conflict)
  - 500 (Internal Server Error)

- ✅ **範例資料 / Example Data**
  - 完整的請求範例
  - 完整的回應範例
  - 錯誤回應範例

---

### 2.5 UI 線框圖 / UI Wireframes

**檔案 / File:** [`phase-2-ui-wireframes.md`](./phase-2-ui-wireframes.md)  
**大小 / Size:** ~31 KB  
**行數 / Lines:** ~950

**內容概述 / Content Overview:**

本文件提供完整的 UI 設計線框圖和規格，包含：

- ✅ **設計原則 / Design Principles**
  - 簡潔明瞭
  - 一致性
  - 響應式
  - 無障礙
  - 效能優先

- ✅ **啟動畫面 (Splash Screen)**
  - 桌面版線框圖
  - 行動版線框圖
  - Logo 動畫區域規格
  - 進度條規格
  - 關閉按鈕規格
  - 互動流程

- ✅ **主控面板 (Dashboard)**
  - 桌面版線框圖
  - 行動版線框圖
  - 頂部導航列規格
  - 頁面標題區規格
  - 範例卡片規格
  - 底部資訊區規格

- ✅ **範例詳情頁 / Example Details Page**
  - 桌面版線框圖
  - 麵包屑導航
  - 示範區域規格
  - 資訊側邊欄規格

- ✅ **使用者認證頁面 / Authentication Pages**
  - 登入頁面線框圖
  - 註冊頁面線框圖

- ✅ **響應式設計規範 / Responsive Design**
  - 4 個斷點定義 (手機、平板、桌機、大螢幕)
  - 響應式調整策略

- ✅ **互動狀態 / Interaction States**
  - 按鈕狀態 (Normal, Hover, Active, Disabled, Loading)
  - 輸入框狀態 (Normal, Focus, Error, Success, Disabled)
  - 卡片互動效果

- ✅ **載入與空狀態 / Loading and Empty States**
  - 載入狀態設計
  - 空狀態設計
  - 錯誤狀態設計

- ✅ **無障礙設計 / Accessibility Design**
  - ARIA 標籤
  - 鍵盤導航
  - 顏色對比 (WCAG 2.1 AA)

- ✅ **動畫與轉場 / Animations and Transitions**
  - 頁面轉場效果
  - 微互動設計
  - 載入動畫

- ✅ **設計資源 / Design Assets**
  - 圖示庫 (Material Icons)
  - 字體系統 (Roboto, Noto Sans TC)
  - 色彩系統 (主色、輔色、狀態色)

---

### 2.6 認證授權流程設計 / Authentication & Authorization Flow

**檔案 / File:** [`phase-2-auth-flow.md`](./phase-2-auth-flow.md)  
**大小 / Size:** ~32 KB  
**行數 / Lines:** ~1,020

**內容概述 / Content Overview:**

本文件定義完整的認證授權流程設計，包含：

- ✅ **JWT Token 架構 / JWT Token Architecture**
  - Access Token 結構
  - Refresh Token 結構
  - Claims 定義

- ✅ **使用者註冊流程 / User Registration Flow**
  - 流程圖
  - 前端驗證規則
  - 後端處理邏輯
  - 安全考量

- ✅ **使用者登入流程 / User Login Flow**
  - 流程圖
  - 前端實作 (Angular)
  - 後端實作 (ASP.NET Core)
  - Token 儲存策略
  - 安全考量

- ✅ **Token 刷新流程 / Token Refresh Flow**
  - 流程圖
  - 自動刷新機制
  - HTTP 攔截器實作

- ✅ **使用者登出流程 / User Logout Flow**
  - 流程圖
  - Token 撤銷機制

- ✅ **角色權限管理 / Role-Based Access Control**
  - 角色定義 (Admin, User, Guest)
  - 權限矩陣
  - 前端路由守衛 (AuthGuard, RoleGuard)
  - 後端授權 (Authorize attribute, Policies)

- ✅ **安全性最佳實踐 / Security Best Practices**
  - Token 安全
  - 密碼安全 (BCrypt, 複雜度要求)
  - 防止 XSS 攻擊
  - 防止 CSRF 攻擊
  - 防止 SQL Injection
  - 防止暴力破解 (速率限制、帳號鎖定)
  - HTTPS 和 TLS 配置
  - 安全標頭設定

- ✅ **雙因素驗證 (2FA) / Two-Factor Authentication**
  - 流程概述
  - TOTP 實作
  - QR 碼生成

- ✅ **稽核與監控 / Auditing and Monitoring**
  - 稽核日誌
  - 監控指標

---

## 3. 技術棧總覽 / Technology Stack Overview

### 3.1 前端技術 / Frontend Technologies

| 技術 / Technology | 版本 / Version | 用途 / Purpose |
|------------------|----------------|----------------|
| Angular | 17.x+ | SPA 框架 |
| TypeScript | 5.x+ | 開發語言 |
| RxJS | 7.x+ | 響應式程式設計 |
| Angular Material | 17.x+ | UI 組件庫 |
| SCSS | Latest | 樣式設計 |

### 3.2 後端技術 / Backend Technologies

| 技術 / Technology | 版本 / Version | 用途 / Purpose |
|------------------|----------------|----------------|
| .NET | 8.0+ | 應用程式框架 |
| ASP.NET Core | 8.0+ | Web API 框架 |
| Entity Framework Core | 8.0+ | ORM |
| Swashbuckle | 6.5+ | API 文件 |
| JWT Bearer | Latest | 身份驗證 |
| Serilog | 3.x+ | 日誌記錄 |

### 3.3 資料庫技術 / Database Technologies

| 技術 / Technology | 版本 / Version | 用途 / Purpose |
|------------------|----------------|----------------|
| SQL Server | 2019+ | 主要資料庫 |
| PostgreSQL | 14+ | 備選資料庫 |

---

## 4. 架構圖總覽 / Architecture Overview

### 4.1 整體系統架構 / Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         使用者 / Users                           │
│                    (Web Browser / Mobile)                        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTPS
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                    前端應用程式 / Frontend                       │
│                     (Angular SPA)                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Splash    │  │  Dashboard  │  │  Examples   │            │
│  │   Screen    │  │             │  │             │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Angular Router + State Management (RxJS)         │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTP/REST + JWT
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                    後端 API / Backend API                        │
│                  (ASP.NET Core Web API)                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    API Controllers                        │  │
│  │  Configuration │ Examples │ Authentication │ Users        │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Application Services Layer                   │  │
│  │  Business Logic │ DTOs │ Validation                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Domain Layer                              │  │
│  │  Entities │ Business Rules │ Domain Events                │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │             Infrastructure Layer                          │  │
│  │  Data Access │ External Services │ Identity               │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ EF Core
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                       資料庫 / Database                          │
│                    (SQL Server / PostgreSQL)                     │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐            │
│  │Users │  │Config│  │Examp-│  │Categ-│  │Audit │            │
│  │      │  │      │  │les   │  │ories │  │Logs  │            │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘            │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 認證流程架構 / Authentication Flow Architecture

```
┌──────────────┐                ┌──────────────┐
│   Frontend   │◄──────────────►│   Backend    │
│   (Angular)  │   HTTPS/REST   │  (ASP.NET)   │
└──────┬───────┘                └──────┬───────┘
       │                               │
       │ 1. Login (email, password)    │
       ├──────────────────────────────►│
       │                               │ 2. Verify credentials
       │                               │ 3. Generate JWT tokens
       │                               │
       │ 4. Return tokens              │
       │◄──────────────────────────────┤
       │                               │
       │ 5. Store tokens               │
       │    (localStorage)             │
       │                               │
       │ 6. API request + JWT          │
       ├──────────────────────────────►│
       │                               │ 7. Verify JWT
       │                               │ 8. Check permissions
       │                               │
       │ 9. Return data                │
       │◄──────────────────────────────┤
       │                               │
```

---

## 5. 關鍵設計決策 / Key Design Decisions

### 5.1 架構模式 / Architecture Patterns

1. **前端：單頁應用程式 (SPA)**
   - 使用 Angular 框架
   - 模組化和組件化設計
   - 客戶端路由

2. **後端：Clean Architecture**
   - 領域驅動設計 (DDD) 原則
   - 依賴反轉
   - 分層架構

3. **資料庫：關聯式資料庫**
   - SQL Server 為主要選擇
   - PostgreSQL 為備選方案
   - Entity Framework Core 作為 ORM

### 5.2 安全性決策 / Security Decisions

1. **認證：JWT Token**
   - Access Token (短期，1 小時)
   - Refresh Token (長期，7 天)
   - 無狀態認證

2. **授權：RBAC (角色型存取控制)**
   - 三種角色：Admin, User, Guest
   - 細粒度權限控制

3. **密碼：BCrypt 雜湊**
   - 成本因子 11
   - 抗暴力破解

4. **通訊：HTTPS/TLS**
   - 強制 HTTPS
   - TLS 1.2 或更高版本

### 5.3 效能優化決策 / Performance Decisions

1. **前端：懶加載**
   - 路由層級懶加載
   - 減少初始載入時間

2. **前端：OnPush 變更偵測**
   - 減少不必要的變更偵測
   - 提升執行效能

3. **後端：快取策略**
   - 回應快取
   - 記憶體快取

4. **資料庫：索引優化**
   - 針對常用查詢建立索引
   - 全文檢索支援

---

## 6. 後續階段 / Next Phases

### 6.1 階段 3：開發 / Phase 3: Development

**參考文件 / Reference Document:** [Phase 3: Development Overview](./phase-3-development-overview.md)

**預計時間 / Estimated Duration:** 8-12 週 / weeks

**主要任務 / Key Tasks:**
- 建立開發環境 / Set up development environment
- 實作前端基礎架構 / Implement frontend infrastructure
- 實作後端基礎架構 / Implement backend infrastructure
- 開發核心功能 / Develop core features
- 實作認證授權 / Implement authentication/authorization
- 整合前後端 / Integrate frontend and backend
- 編寫單元測試 / Write unit tests
- 編寫整合測試 / Write integration tests

**完整的開發階段實作指南，包含：**
- 開發環境設置步驟
- 前端 Angular 專案建立與配置
- 後端 .NET 專案建立與配置
- 核心服務與控制器實作
- 認證授權完整實作
- 測試策略與範例程式碼

**Complete development phase implementation guide including:**
- Development environment setup steps
- Frontend Angular project creation and configuration
- Backend .NET project creation and configuration
- Core services and controllers implementation
- Authentication/authorization complete implementation
- Testing strategies and example code


### 6.2 階段 4：測試 / Phase 4: Testing

**預計時間 / Estimated Duration:** 3-4 週 / weeks

**主要任務 / Key Tasks:**
- 執行單元測試
- 執行整合測試
- 執行 E2E 測試
- 進行效能測試
- 進行安全性測試
- 進行可用性測試
- 使用者驗收測試 (UAT)

### 6.3 階段 5：部署 / Phase 5: Deployment

**預計時間 / Estimated Duration:** 2-3 週 / weeks

**主要任務 / Key Tasks:**
- 準備生產環境
- 配置 CI/CD 管道
- 執行資料庫遷移
- 部署後端 API
- 部署前端應用程式
- 配置監控和日誌
- 建立回滾計畫
- 執行煙霧測試

---

## 7. 驗證與簽核 / Validation and Approval

### 7.1 技術審查 / Technical Review

- [x] 前端架構審查通過
- [x] 後端架構審查通過
- [x] 資料庫設計審查通過
- [x] API 契約審查通過
- [x] UI/UX 設計審查通過
- [x] 安全性設計審查通過

### 7.2 利害關係人簽核 / Stakeholder Approval

- [ ] 技術主管簽核
- [ ] 專案經理簽核
- [ ] 產品負責人簽核
- [ ] 安全團隊簽核

---

## 8. 參考資料 / References

### 8.1 內部文件 / Internal Documents

- [Scenario 2: Specification to New Architecture](./scenario-2-specification-to-new-architecture.md)
- [Phase 1: Planning Documentation](./phase-1-planning.md)
- [Example: Animated Logo Specification](./example-animated-logo-specification.md)

### 8.2 外部資源 / External Resources

**前端 / Frontend:**
- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**後端 / Backend:**
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [Swashbuckle/Swagger](https://github.com/domaindrivendev/Swashbuckle.AspNetCore)

**資料庫 / Database:**
- [SQL Server Documentation](https://docs.microsoft.com/sql/sql-server/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

**安全性 / Security:**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

**設計 / Design:**
- [Material Design Guidelines](https://material.io/design)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

**API 設計 / API Design:**
- [OpenAPI Specification](https://swagger.io/specification/)
- [RESTful API Best Practices](https://restfulapi.net/)

---

## 9. 聯絡資訊 / Contact Information

**開發團隊 / Development Team:**
- Email: dev@example.com

**專案經理 / Project Manager:**
- Email: pm@example.com

**技術主管 / Technical Lead:**
- Email: tech-lead@example.com

---

## 10. 文件維護 / Document Maintenance

### 10.1 版本控制 / Version Control

所有設計文件都使用 Git 進行版本控制，並存放在專案儲存庫中。

All design documents are version-controlled using Git and stored in the project repository.

**儲存庫位置 / Repository Location:**
```
dotnet-winforms-examples/docs/
├── phase-2-api-contracts.yaml
├── phase-2-auth-flow.md
├── phase-2-backend-api-specification.md
├── phase-2-database-schema.md
├── phase-2-design-overview.md
├── phase-2-frontend-specification.md
└── phase-2-ui-wireframes.md
```

### 10.2 更新流程 / Update Process

1. 提出變更請求 (Pull Request)
2. 技術審查
3. 更新相關文件
4. 更新版本歷史
5. 合併變更

### 10.3 文件審查週期 / Review Cycle

- 每月定期審查
- 重大變更時立即審查
- 階段交接時全面審查

---

## 11. 附錄 / Appendix

### 11.1 縮寫對照表 / Abbreviations

| 縮寫 / Abbreviation | 全名 / Full Name | 中文 / Chinese |
|---------------------|------------------|----------------|
| API | Application Programming Interface | 應用程式介面 |
| SPA | Single Page Application | 單頁應用程式 |
| JWT | JSON Web Token | JSON 網路令牌 |
| RBAC | Role-Based Access Control | 角色型存取控制 |
| CORS | Cross-Origin Resource Sharing | 跨域資源共享 |
| DTO | Data Transfer Object | 資料傳輸物件 |
| ORM | Object-Relational Mapping | 物件關聯映射 |
| CRUD | Create, Read, Update, Delete | 建立、讀取、更新、刪除 |
| UI | User Interface | 使用者介面 |
| UX | User Experience | 使用者體驗 |
| E2E | End-to-End | 端對端 |
| TLS | Transport Layer Security | 傳輸層安全性 |
| 2FA | Two-Factor Authentication | 雙因素驗證 |
| TOTP | Time-based One-Time Password | 時間型一次性密碼 |
| XSS | Cross-Site Scripting | 跨站指令碼 |
| CSRF | Cross-Site Request Forgery | 跨站請求偽造 |

### 11.2 術語表 / Glossary

**Clean Architecture (清潔架構):** 一種軟體設計哲學，強調依賴方向由外向內，使業務邏輯獨立於框架、UI 和資料庫。

**JWT (JSON Web Token):** 一種開放標準（RFC 7519），用於在各方之間安全地傳輸資訊作為 JSON 物件。

**RBAC (角色型存取控制):** 一種方法，根據使用者在組織中的角色來限制系統存取權限。

**Lazy Loading (懶加載):** 一種設計模式，延遲物件的初始化直到需要時才進行。

**OnPush Change Detection (OnPush 變更偵測):** Angular 的一種變更偵測策略，僅在輸入屬性變更或事件觸發時檢查組件。

---

## 12. 總結 / Summary

階段 2 設計階段已成功完成，產出 6 份核心設計文件，涵蓋前端、後端、資料庫、API 契約、UI 設計和安全性等各個面向。這些文件為後續的開發、測試和部署階段提供了清晰的指引和規範。

Phase 2 Design Phase has been successfully completed, producing 6 core design documents covering frontend, backend, database, API contracts, UI design, and security aspects. These documents provide clear guidance and specifications for subsequent development, testing, and deployment phases.

**關鍵成果 / Key Achievements:**
- ✅ 完整的技術架構設計
- ✅ 詳細的實作規格
- ✅ 全面的安全性設計
- ✅ 清晰的 API 契約
- ✅ 完善的 UI/UX 規劃
- ✅ 雙語文件支援

**下一步 / Next Steps:**
- 進入階段 3：開發階段
- 建立開發環境
- 開始實作核心功能

---

**文件版本歷史 / Document Version History**

| 版本 / Version | 日期 / Date | 變更說明 / Changes |
|---------------|-------------|-------------------|
| 1.0 | 2024 | 初始版本，階段 2 設計完成總覽 / Initial version, Phase 2 design completion overview |

---

**結束 / End of Document**
