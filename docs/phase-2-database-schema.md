# 階段 2：資料庫結構設計 / Phase 2: Database Schema Design

## Database Schema Design Document

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | Phase 2 Database Schema Design |
| 版本 / Version | 1.0 |
| 狀態 / Status | Design Phase |
| 作者 / Author | Migration Design Team |
| 日期 / Date | 2024 |
| 資料庫 / Database | SQL Server / PostgreSQL |
| 專案 / Project | dotnet-winforms-examples → Web Migration |

---

## 1. 概述 / Overview

### 1.1 目的 / Purpose

本文件定義 WinForms 應用程式遷移到 Web 架構所需的資料庫結構，包含所有資料表、關聯、索引、約束條件等完整資料庫設計。

This document defines the database schema required for migrating the WinForms application to web architecture, including all tables, relationships, indexes, constraints, and complete database design.

### 1.2 資料庫技術 / Database Technology

| 項目 / Item | 技術 / Technology | 版本 / Version |
|------------|------------------|----------------|
| 主要資料庫 / Primary Database | SQL Server | 2019+ |
| 備選資料庫 / Alternative | PostgreSQL | 14+ |
| ORM 工具 / ORM Tool | Entity Framework Core | 8.0+ |
| 遷移工具 / Migration Tool | EF Core Migrations | 8.0+ |

---

## 2. 資料庫架構概覽 / Database Architecture Overview

### 2.1 資料庫結構圖 / Database Structure Diagram

```
WinFormsExamplesDb
├── dbo Schema
│   ├── Users                    # 使用者資料表
│   ├── RefreshTokens            # 更新令牌資料表
│   ├── Configurations           # 配置資料表
│   ├── Examples                 # 範例資料表
│   ├── ExampleCategories        # 範例分類資料表
│   ├── ExampleTags              # 範例標籤資料表
│   ├── ExampleTagRelations      # 範例標籤關聯表
│   ├── UserFavorites            # 使用者收藏資料表
│   └── AuditLogs                # 稽核日誌資料表
│
└── audit Schema                  # 稽核架構
    └── ChangeHistory            # 變更歷史資料表
```

### 2.2 實體關係圖 / Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────────┐
│    Users     │────1:N──│  RefreshTokens   │
└──────────────┘         └──────────────────┘
       │
       │1:N
       │
┌──────────────┐         ┌──────────────────┐
│UserFavorites │────N:1──│    Examples      │
└──────────────┘         └──────────────────┘
                                 │
                                 │N:1
                                 │
                         ┌──────────────────┐
                         │ExampleCategories │
                         └──────────────────┘
                                 │
                         ┌───────┴───────┐
                         │               │
                         │N:M            │N:M
                         │               │
                  ┌──────────────┐ ┌────────────┐
                  │ExampleTags   │─│ExampleTag  │
                  │              │ │Relations   │
                  └──────────────┘ └────────────┘
```

---

## 3. 資料表定義 / Table Definitions

### 3.1 Users (使用者資料表)

**用途 / Purpose:** 儲存系統使用者資訊

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| Id | INT | NO | 主鍵，自動遞增 / Primary key, auto-increment |
| Email | NVARCHAR(256) | NO | 電子郵件 (唯一) / Email (unique) |
| Name | NVARCHAR(100) | NO | 使用者名稱 / User name |
| PasswordHash | NVARCHAR(256) | NO | 密碼雜湊 / Password hash |
| Roles | NVARCHAR(500) | NO | 角色清單 (JSON) / Roles list (JSON) |
| IsActive | BIT | NO | 是否啟用 / Is active |
| EmailConfirmed | BIT | NO | 電子郵件已確認 / Email confirmed |
| PhoneNumber | NVARCHAR(20) | YES | 電話號碼 / Phone number |
| TwoFactorEnabled | BIT | NO | 雙因素驗證啟用 / Two-factor enabled |
| LockoutEnd | DATETIME2 | YES | 鎖定結束時間 / Lockout end time |
| AccessFailedCount | INT | NO | 登入失敗次數 / Access failed count |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |
| UpdatedAt | DATETIME2 | YES | 更新時間 / Updated timestamp |
| LastLoginAt | DATETIME2 | YES | 最後登入時間 / Last login timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(256) NOT NULL UNIQUE,
    Name NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(256) NOT NULL,
    Roles NVARCHAR(500) NOT NULL DEFAULT '["User"]',
    IsActive BIT NOT NULL DEFAULT 1,
    EmailConfirmed BIT NOT NULL DEFAULT 0,
    PhoneNumber NVARCHAR(20) NULL,
    TwoFactorEnabled BIT NOT NULL DEFAULT 0,
    LockoutEnd DATETIME2 NULL,
    AccessFailedCount INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NULL,
    LastLoginAt DATETIME2 NULL,
    
    CONSTRAINT CK_Users_Email CHECK (Email LIKE '%@%'),
    INDEX IX_Users_Email (Email),
    INDEX IX_Users_IsActive (IsActive)
);
```

**索引 / Indexes:**
- `IX_Users_Email` - 電子郵件索引 (用於登入查詢)
- `IX_Users_IsActive` - 啟用狀態索引

---

### 3.2 RefreshTokens (更新令牌資料表)

**用途 / Purpose:** 儲存 JWT 更新令牌

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| Id | INT | NO | 主鍵，自動遞增 / Primary key |
| UserId | INT | NO | 使用者 ID / User ID (FK) |
| Token | NVARCHAR(500) | NO | 更新令牌 / Refresh token |
| ExpiresAt | DATETIME2 | NO | 過期時間 / Expiration time |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |
| RevokedAt | DATETIME2 | YES | 撤銷時間 / Revoked timestamp |
| IsRevoked | BIT | NO | 是否已撤銷 / Is revoked |
| CreatedByIp | NVARCHAR(50) | YES | 建立來源 IP / Created by IP |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE RefreshTokens (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Token NVARCHAR(500) NOT NULL UNIQUE,
    ExpiresAt DATETIME2 NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    RevokedAt DATETIME2 NULL,
    IsRevoked BIT NOT NULL DEFAULT 0,
    CreatedByIp NVARCHAR(50) NULL,
    
    CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) 
        REFERENCES Users(Id) ON DELETE CASCADE,
    INDEX IX_RefreshTokens_Token (Token),
    INDEX IX_RefreshTokens_UserId (UserId),
    INDEX IX_RefreshTokens_ExpiresAt (ExpiresAt)
);
```

---

### 3.3 Configurations (配置資料表)

**用途 / Purpose:** 儲存應用程式配置資訊

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| Id | INT | NO | 主鍵，自動遞增 / Primary key |
| ConfigKey | NVARCHAR(100) | NO | 配置鍵 (唯一) / Config key (unique) |
| ConfigValue | NVARCHAR(MAX) | NO | 配置值 (JSON) / Config value (JSON) |
| Description | NVARCHAR(500) | YES | 說明 / Description |
| ConfigType | NVARCHAR(50) | NO | 配置類型 / Config type |
| IsActive | BIT | NO | 是否啟用 / Is active |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |
| UpdatedAt | DATETIME2 | YES | 更新時間 / Updated timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE Configurations (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ConfigKey NVARCHAR(100) NOT NULL UNIQUE,
    ConfigValue NVARCHAR(MAX) NOT NULL,
    Description NVARCHAR(500) NULL,
    ConfigType NVARCHAR(50) NOT NULL DEFAULT 'General',
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NULL,
    
    INDEX IX_Configurations_ConfigKey (ConfigKey),
    INDEX IX_Configurations_ConfigType (ConfigType)
);
```

**範例資料 / Sample Data:**

```sql
INSERT INTO Configurations (ConfigKey, ConfigValue, Description, ConfigType)
VALUES 
    ('SplashScreen', 
     '{"logoUrl":"https://cdn.example.com/logo.gif","displayDuration":10,"redirectUrl":"/dashboard","allowManualClose":true,"showProgressBar":true}',
     'Splash screen configuration',
     'UI'),
    ('Authentication',
     '{"jwtExpiryMinutes":60,"refreshTokenExpiryDays":7,"requireEmailConfirmation":false}',
     'Authentication settings',
     'Security');
```

---

### 3.4 ExampleCategories (範例分類資料表)

**用途 / Purpose:** 儲存範例分類資訊

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| Id | INT | NO | 主鍵，自動遞增 / Primary key |
| Name | NVARCHAR(100) | NO | 分類名稱 (唯一) / Category name (unique) |
| DisplayName | NVARCHAR(100) | NO | 顯示名稱 / Display name |
| Description | NVARCHAR(500) | YES | 說明 / Description |
| Icon | NVARCHAR(50) | YES | 圖示名稱 / Icon name |
| SortOrder | INT | NO | 排序順序 / Sort order |
| IsActive | BIT | NO | 是否啟用 / Is active |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE ExampleCategories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    DisplayName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NULL,
    Icon NVARCHAR(50) NULL,
    SortOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    INDEX IX_ExampleCategories_Name (Name),
    INDEX IX_ExampleCategories_SortOrder (SortOrder)
);
```

**範例資料 / Sample Data:**

```sql
INSERT INTO ExampleCategories (Name, DisplayName, Description, Icon, SortOrder)
VALUES 
    ('animations', 'Animated Effects', '動畫效果範例 / Animation effect examples', 'animation', 1),
    ('custom-controls', 'Custom Controls', '自訂控制項範例 / Custom control examples', 'widgets', 2),
    ('collision-detection', 'Collision Detection', '碰撞偵測範例 / Collision detection examples', 'sports_esports', 3),
    ('fade-effects', 'Fade Effects', '淡入淡出效果 / Fade in/out effects', 'gradient', 4);
```

---

### 3.5 Examples (範例資料表)

**用途 / Purpose:** 儲存範例內容資訊

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| Id | INT | NO | 主鍵，自動遞增 / Primary key |
| Title | NVARCHAR(100) | NO | 標題 / Title |
| Description | NVARCHAR(500) | NO | 說明 / Description |
| CategoryId | INT | NO | 分類 ID / Category ID (FK) |
| ThumbnailUrl | NVARCHAR(500) | NO | 縮圖 URL / Thumbnail URL |
| DemoUrl | NVARCHAR(500) | NO | 示範 URL / Demo URL |
| SourceCodeUrl | NVARCHAR(500) | YES | 原始碼 URL / Source code URL |
| Features | NVARCHAR(MAX) | YES | 功能清單 (JSON) / Features list (JSON) |
| Technologies | NVARCHAR(MAX) | YES | 技術清單 (JSON) / Technologies list (JSON) |
| Difficulty | NVARCHAR(20) | NO | 難度 / Difficulty |
| ViewCount | INT | NO | 觀看次數 / View count |
| LikeCount | INT | NO | 按讚次數 / Like count |
| IsActive | BIT | NO | 是否啟用 / Is active |
| IsFeatured | BIT | NO | 是否精選 / Is featured |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |
| UpdatedAt | DATETIME2 | YES | 更新時間 / Updated timestamp |
| PublishedAt | DATETIME2 | YES | 發布時間 / Published timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE Examples (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NOT NULL,
    CategoryId INT NOT NULL,
    ThumbnailUrl NVARCHAR(500) NOT NULL,
    DemoUrl NVARCHAR(500) NOT NULL,
    SourceCodeUrl NVARCHAR(500) NULL,
    Features NVARCHAR(MAX) NULL,
    Technologies NVARCHAR(MAX) NULL,
    Difficulty NVARCHAR(20) NOT NULL DEFAULT 'Beginner',
    ViewCount INT NOT NULL DEFAULT 0,
    LikeCount INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,
    IsFeatured BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NULL,
    PublishedAt DATETIME2 NULL,
    
    CONSTRAINT FK_Examples_ExampleCategories FOREIGN KEY (CategoryId) 
        REFERENCES ExampleCategories(Id),
    CONSTRAINT CK_Examples_Difficulty CHECK (Difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    INDEX IX_Examples_CategoryId (CategoryId),
    INDEX IX_Examples_IsActive (IsActive),
    INDEX IX_Examples_IsFeatured (IsFeatured),
    INDEX IX_Examples_PublishedAt (PublishedAt DESC)
);
```

**範例資料 / Sample Data:**

```sql
INSERT INTO Examples (Title, Description, CategoryId, ThumbnailUrl, DemoUrl, Features, Technologies, Difficulty, IsFeatured, PublishedAt)
VALUES 
    ('Animated Logo', 
     'Splash screen with animated logo',
     1,
     'https://cdn.example.com/thumbnails/animated-logo.jpg',
     '/examples/animated-logo',
     '["Animated GIF support","Auto-close timer","Progress bar","Manual close option"]',
     '["Angular","RxJS","Angular Material"]',
     'Beginner',
     1,
     GETUTCDATE());
```

---

### 3.6 ExampleTags (範例標籤資料表)

**用途 / Purpose:** 儲存標籤資訊

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| Id | INT | NO | 主鍵，自動遞增 / Primary key |
| Name | NVARCHAR(50) | NO | 標籤名稱 (唯一) / Tag name (unique) |
| DisplayName | NVARCHAR(50) | NO | 顯示名稱 / Display name |
| Color | NVARCHAR(20) | YES | 顏色 / Color |
| UsageCount | INT | NO | 使用次數 / Usage count |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE ExampleTags (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL UNIQUE,
    DisplayName NVARCHAR(50) NOT NULL,
    Color NVARCHAR(20) NULL,
    UsageCount INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    INDEX IX_ExampleTags_Name (Name)
);
```

---

### 3.7 ExampleTagRelations (範例標籤關聯表)

**用途 / Purpose:** 儲存範例與標籤的多對多關聯

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| ExampleId | INT | NO | 範例 ID / Example ID (FK) |
| TagId | INT | NO | 標籤 ID / Tag ID (FK) |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE ExampleTagRelations (
    ExampleId INT NOT NULL,
    TagId INT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    PRIMARY KEY (ExampleId, TagId),
    CONSTRAINT FK_ExampleTagRelations_Examples FOREIGN KEY (ExampleId) 
        REFERENCES Examples(Id) ON DELETE CASCADE,
    CONSTRAINT FK_ExampleTagRelations_ExampleTags FOREIGN KEY (TagId) 
        REFERENCES ExampleTags(Id) ON DELETE CASCADE,
    INDEX IX_ExampleTagRelations_TagId (TagId)
);
```

---

### 3.8 UserFavorites (使用者收藏資料表)

**用途 / Purpose:** 儲存使用者收藏的範例

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| UserId | INT | NO | 使用者 ID / User ID (FK) |
| ExampleId | INT | NO | 範例 ID / Example ID (FK) |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE UserFavorites (
    UserId INT NOT NULL,
    ExampleId INT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    PRIMARY KEY (UserId, ExampleId),
    CONSTRAINT FK_UserFavorites_Users FOREIGN KEY (UserId) 
        REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_UserFavorites_Examples FOREIGN KEY (ExampleId) 
        REFERENCES Examples(Id) ON DELETE CASCADE,
    INDEX IX_UserFavorites_ExampleId (ExampleId)
);
```

---

### 3.9 AuditLogs (稽核日誌資料表)

**用途 / Purpose:** 儲存系統操作稽核日誌

**欄位定義 / Column Definitions:**

| 欄位名稱 / Column | 資料型別 / Data Type | 允許 NULL / Nullable | 說明 / Description |
|------------------|---------------------|---------------------|-------------------|
| Id | BIGINT | NO | 主鍵，自動遞增 / Primary key |
| UserId | INT | YES | 使用者 ID / User ID (FK) |
| Action | NVARCHAR(100) | NO | 操作動作 / Action |
| EntityType | NVARCHAR(100) | NO | 實體類型 / Entity type |
| EntityId | INT | YES | 實體 ID / Entity ID |
| OldValues | NVARCHAR(MAX) | YES | 舊值 (JSON) / Old values (JSON) |
| NewValues | NVARCHAR(MAX) | YES | 新值 (JSON) / New values (JSON) |
| IpAddress | NVARCHAR(50) | YES | IP 位址 / IP address |
| UserAgent | NVARCHAR(500) | YES | 使用者代理 / User agent |
| CreatedAt | DATETIME2 | NO | 建立時間 / Created timestamp |

**SQL 建表語句 / SQL Create Table Statement:**

```sql
CREATE TABLE AuditLogs (
    Id BIGINT PRIMARY KEY IDENTITY(1,1),
    UserId INT NULL,
    Action NVARCHAR(100) NOT NULL,
    EntityType NVARCHAR(100) NOT NULL,
    EntityId INT NULL,
    OldValues NVARCHAR(MAX) NULL,
    NewValues NVARCHAR(MAX) NULL,
    IpAddress NVARCHAR(50) NULL,
    UserAgent NVARCHAR(500) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT FK_AuditLogs_Users FOREIGN KEY (UserId) 
        REFERENCES Users(Id) ON DELETE SET NULL,
    INDEX IX_AuditLogs_UserId (UserId),
    INDEX IX_AuditLogs_EntityType_EntityId (EntityType, EntityId),
    INDEX IX_AuditLogs_CreatedAt (CreatedAt DESC)
);
```

---

## 4. 資料庫視圖 / Database Views

### 4.1 vw_ExamplesSummary (範例摘要視圖)

**用途 / Purpose:** 提供範例的完整摘要資訊

```sql
CREATE VIEW vw_ExamplesSummary AS
SELECT 
    e.Id,
    e.Title,
    e.Description,
    c.Name AS CategoryName,
    c.DisplayName AS CategoryDisplayName,
    e.Difficulty,
    e.ViewCount,
    e.LikeCount,
    e.IsFeatured,
    e.PublishedAt,
    (SELECT COUNT(*) FROM UserFavorites WHERE ExampleId = e.Id) AS FavoriteCount,
    (
        SELECT STRING_AGG(t.DisplayName, ', ')
        FROM ExampleTagRelations etr
        JOIN ExampleTags t ON etr.TagId = t.Id
        WHERE etr.ExampleId = e.Id
    ) AS Tags
FROM Examples e
JOIN ExampleCategories c ON e.CategoryId = c.Id
WHERE e.IsActive = 1;
```

---

## 5. 儲存程序 / Stored Procedures

### 5.1 sp_IncrementExampleViewCount (增加範例觀看次數)

```sql
CREATE PROCEDURE sp_IncrementExampleViewCount
    @ExampleId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Examples
    SET ViewCount = ViewCount + 1,
        UpdatedAt = GETUTCDATE()
    WHERE Id = @ExampleId;
    
    SELECT ViewCount
    FROM Examples
    WHERE Id = @ExampleId;
END;
```

### 5.2 sp_GetPopularExamples (取得熱門範例)

```sql
CREATE PROCEDURE sp_GetPopularExamples
    @TopN INT = 10,
    @CategoryId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT TOP (@TopN)
        e.Id,
        e.Title,
        e.Description,
        c.DisplayName AS CategoryName,
        e.ViewCount,
        e.LikeCount,
        e.ThumbnailUrl
    FROM Examples e
    JOIN ExampleCategories c ON e.CategoryId = c.Id
    WHERE e.IsActive = 1
        AND (@CategoryId IS NULL OR e.CategoryId = @CategoryId)
    ORDER BY 
        e.ViewCount DESC,
        e.LikeCount DESC,
        e.PublishedAt DESC;
END;
```

---

## 6. 觸發器 / Triggers

### 6.1 trg_Examples_UpdateTimestamp (更新時間戳記觸發器)

```sql
CREATE TRIGGER trg_Examples_UpdateTimestamp
ON Examples
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Examples
    SET UpdatedAt = GETUTCDATE()
    FROM Examples e
    INNER JOIN inserted i ON e.Id = i.Id;
END;
```

### 6.2 trg_AuditLogs_Examples (範例變更稽核觸發器)

```sql
CREATE TRIGGER trg_AuditLogs_Examples
ON Examples
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Insert audit log for updates
    IF EXISTS (SELECT * FROM inserted)
    BEGIN
        INSERT INTO AuditLogs (Action, EntityType, EntityId, OldValues, NewValues)
        SELECT 
            'UPDATE',
            'Example',
            d.Id,
            (SELECT * FROM deleted d WHERE d.Id = i.Id FOR JSON PATH),
            (SELECT * FROM inserted i WHERE i.Id = d.Id FOR JSON PATH)
        FROM deleted d
        INNER JOIN inserted i ON d.Id = i.Id;
    END
    
    -- Insert audit log for deletes
    IF NOT EXISTS (SELECT * FROM inserted)
    BEGIN
        INSERT INTO AuditLogs (Action, EntityType, EntityId, OldValues)
        SELECT 
            'DELETE',
            'Example',
            d.Id,
            (SELECT * FROM deleted d FOR JSON PATH)
        FROM deleted d;
    END
END;
```

---

## 7. 索引策略 / Index Strategy

### 7.1 效能索引 / Performance Indexes

```sql
-- 使用者登入查詢優化
CREATE INDEX IX_Users_Email_PasswordHash 
ON Users(Email, PasswordHash) 
INCLUDE (Id, Name, Roles);

-- 範例列表查詢優化
CREATE INDEX IX_Examples_CategoryId_IsActive_PublishedAt 
ON Examples(CategoryId, IsActive, PublishedAt DESC)
INCLUDE (Title, Description, ThumbnailUrl, Difficulty);

-- 範例搜尋優化 (全文檢索)
CREATE FULLTEXT INDEX ON Examples(Title, Description)
KEY INDEX PK_Examples;

-- 稽核日誌查詢優化
CREATE INDEX IX_AuditLogs_CreatedAt_EntityType 
ON AuditLogs(CreatedAt DESC, EntityType)
INCLUDE (UserId, Action, EntityId);
```

---

## 8. 資料遷移腳本 / Data Migration Scripts

### 8.1 初始資料種子 / Initial Data Seeding

```sql
-- 插入預設分類
INSERT INTO ExampleCategories (Name, DisplayName, Description, Icon, SortOrder)
VALUES 
    ('animations', 'Animated Effects', '動畫效果範例', 'animation', 1),
    ('custom-controls', 'Custom Controls', '自訂控制項範例', 'widgets', 2),
    ('collision-detection', 'Collision Detection', '碰撞偵測範例', 'sports_esports', 3),
    ('fade-effects', 'Fade Effects', '淡入淡出效果', 'gradient', 4);

-- 插入預設標籤
INSERT INTO ExampleTags (Name, DisplayName, Color)
VALUES 
    ('angular', 'Angular', '#DD0031'),
    ('typescript', 'TypeScript', '#3178C6'),
    ('material', 'Material Design', '#FF6F00'),
    ('rxjs', 'RxJS', '#B7178C'),
    ('animations', 'Animations', '#4CAF50');

-- 插入預設管理員使用者
INSERT INTO Users (Email, Name, PasswordHash, Roles, IsActive, EmailConfirmed)
VALUES 
    ('admin@example.com', 
     'Administrator', 
     '$2a$11$abcdefghijklmnopqrstuvwxyz', -- Hashed password
     '["Admin","User"]',
     1,
     1);

-- 插入預設配置
INSERT INTO Configurations (ConfigKey, ConfigValue, Description, ConfigType)
VALUES 
    ('SplashScreen', 
     '{"logoUrl":"https://cdn.example.com/logo.gif","displayDuration":10,"redirectUrl":"/dashboard","allowManualClose":true,"showProgressBar":true}',
     'Splash screen configuration',
     'UI'),
    ('Authentication',
     '{"jwtExpiryMinutes":60,"refreshTokenExpiryDays":7,"requireEmailConfirmation":false}',
     'Authentication settings',
     'Security'),
    ('Features',
     '{"enableUserRegistration":true,"enableSocialLogin":false,"enableComments":false}',
     'Feature toggles',
     'General');
```

---

## 9. 資料庫維護 / Database Maintenance

### 9.1 清理過期 Refresh Tokens

```sql
CREATE PROCEDURE sp_CleanupExpiredTokens
AS
BEGIN
    DELETE FROM RefreshTokens
    WHERE ExpiresAt < GETUTCDATE()
        AND IsRevoked = 0;
    
    SELECT @@ROWCOUNT AS DeletedCount;
END;
```

### 9.2 壓縮舊稽核日誌

```sql
CREATE PROCEDURE sp_ArchiveOldAuditLogs
    @DaysToKeep INT = 90
AS
BEGIN
    -- 刪除 90 天前的稽核日誌
    DELETE FROM AuditLogs
    WHERE CreatedAt < DATEADD(DAY, -@DaysToKeep, GETUTCDATE());
    
    SELECT @@ROWCOUNT AS ArchivedCount;
END;
```

---

## 10. 備份與還原策略 / Backup and Restore Strategy

### 10.1 備份計畫 / Backup Plan

```sql
-- 完整備份 (每日)
BACKUP DATABASE WinFormsExamplesDb
TO DISK = 'C:\Backups\WinFormsExamplesDb_Full.bak'
WITH FORMAT, NAME = 'Full Backup';

-- 差異備份 (每 6 小時)
BACKUP DATABASE WinFormsExamplesDb
TO DISK = 'C:\Backups\WinFormsExamplesDb_Diff.bak'
WITH DIFFERENTIAL, NAME = 'Differential Backup';

-- 交易日誌備份 (每小時)
BACKUP LOG WinFormsExamplesDb
TO DISK = 'C:\Backups\WinFormsExamplesDb_Log.trn'
WITH NAME = 'Transaction Log Backup';
```

---

## 11. 效能調校建議 / Performance Tuning Recommendations

### 11.1 查詢優化

1. **使用適當的索引**
   - 為常用查詢條件建立索引
   - 避免過度索引（增加寫入成本）

2. **避免 N+1 查詢問題**
   - 使用 JOIN 而非多次查詢
   - 使用 Entity Framework Include() 進行預先載入

3. **分頁實作**
   - 使用 OFFSET-FETCH 進行分頁
   - 避免載入大量資料

```sql
-- 分頁查詢範例
SELECT *
FROM Examples
WHERE IsActive = 1
ORDER BY PublishedAt DESC
OFFSET @PageSize * (@PageNumber - 1) ROWS
FETCH NEXT @PageSize ROWS ONLY;
```

### 11.2 資料庫設定

```sql
-- 設定資料庫恢復模式為簡單模式（開發環境）
ALTER DATABASE WinFormsExamplesDb
SET RECOVERY SIMPLE;

-- 啟用查詢存放區（效能監控）
ALTER DATABASE WinFormsExamplesDb
SET QUERY_STORE = ON;

-- 設定最大平行度
ALTER DATABASE SCOPED CONFIGURATION
SET MAXDOP = 4;
```

---

## 12. 安全性考量 / Security Considerations

### 12.1 加密敏感資料

```sql
-- 啟用透明資料加密 (TDE)
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'SecurePassword123!';

CREATE CERTIFICATE TDECert WITH SUBJECT = 'TDE Certificate';

USE WinFormsExamplesDb;
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE TDECert;

ALTER DATABASE WinFormsExamplesDb
SET ENCRYPTION ON;
```

### 12.2 最小權限原則

```sql
-- 建立應用程式使用者（唯讀）
CREATE USER AppReadUser WITHOUT LOGIN;
GRANT SELECT ON SCHEMA::dbo TO AppReadUser;

-- 建立應用程式使用者（讀寫）
CREATE USER AppWriteUser WITHOUT LOGIN;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::dbo TO AppWriteUser;

-- 建立管理員使用者
CREATE USER AppAdminUser WITHOUT LOGIN;
GRANT CONTROL ON SCHEMA::dbo TO AppAdminUser;
```

---

## 13. 資料字典 / Data Dictionary

| 資料表 / Table | 用途 / Purpose | 記錄數預估 / Est. Rows |
|---------------|---------------|----------------------|
| Users | 使用者管理 | 1,000 - 10,000 |
| RefreshTokens | Token 管理 | 5,000 - 50,000 |
| Configurations | 系統配置 | < 100 |
| ExampleCategories | 分類管理 | < 50 |
| Examples | 範例內容 | 100 - 1,000 |
| ExampleTags | 標籤管理 | 50 - 200 |
| ExampleTagRelations | 標籤關聯 | 200 - 2,000 |
| UserFavorites | 使用者收藏 | 1,000 - 100,000 |
| AuditLogs | 稽核日誌 | 10,000 - 1,000,000 |

---

## 14. Entity Framework Core 配置 / EF Core Configuration

### 14.1 DbContext 配置範例

```csharp
public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Configuration> Configurations { get; set; }
    public DbSet<ExampleCategory> ExampleCategories { get; set; }
    public DbSet<Example> Examples { get; set; }
    public DbSet<ExampleTag> ExampleTags { get; set; }
    public DbSet<UserFavorite> UserFavorites { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
```

### 14.2 初始遷移建立

```bash
# 建立初始遷移
dotnet ef migrations add InitialCreate

# 套用遷移到資料庫
dotnet ef database update

# 產生 SQL 腳本
dotnet ef migrations script -o migrations.sql
```

---

## 15. 驗證檢查清單 / Validation Checklist

- [ ] 所有資料表都有主鍵
- [ ] 外鍵關聯正確設定
- [ ] 索引策略適當配置
- [ ] 資料類型選擇恰當
- [ ] 欄位長度限制合理
- [ ] 預設值正確設定
- [ ] 約束條件完整
- [ ] 觸發器邏輯正確
- [ ] 視圖定義清晰
- [ ] 儲存程序經過測試
- [ ] 備份策略已規劃
- [ ] 安全性措施已實作
- [ ] 效能調校已完成
- [ ] 資料遷移腳本可執行
- [ ] 文件完整且最新

---

## 16. 參考資料 / References

- [SQL Server 官方文件](https://docs.microsoft.com/sql/sql-server/)
- [Entity Framework Core 文件](https://docs.microsoft.com/ef/core/)
- [PostgreSQL 官方文件](https://www.postgresql.org/docs/)
- [資料庫設計最佳實踐](https://www.sqlshack.com/database-design-best-practices/)

---

**文件版本歷史 / Document Version History**

| 版本 / Version | 日期 / Date | 變更說明 / Changes |
|---------------|-------------|-------------------|
| 1.0 | 2024 | 初始版本 / Initial version |
