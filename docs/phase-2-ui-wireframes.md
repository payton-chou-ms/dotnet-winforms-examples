# 階段 2：UI 線框圖 / Phase 2: UI Wireframes

## UI Wireframes and Design Specifications

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | Phase 2 UI Wireframes - Design Specifications |
| 版本 / Version | 1.0 |
| 狀態 / Status | Design Phase |
| 作者 / Author | Migration Design Team |
| 日期 / Date | 2024 |
| 專案 / Project | dotnet-winforms-examples → Web Migration |

---

## 1. 概述 / Overview

### 1.1 目的 / Purpose

本文件提供 WinForms 應用程式遷移到 Web 的 UI 線框圖和設計規格，包含頁面布局、組件結構、互動流程和響應式設計。

This document provides UI wireframes and design specifications for migrating the WinForms application to web, including page layouts, component structures, interaction flows, and responsive design.

### 1.2 設計原則 / Design Principles

1. **簡潔明瞭 (Simplicity)** - 簡化用戶介面，降低學習成本
2. **一致性 (Consistency)** - 保持設計風格和互動模式的一致性
3. **響應式 (Responsive)** - 適配不同裝置和螢幕尺寸
4. **無障礙 (Accessibility)** - 符合 WCAG 2.1 AA 標準
5. **效能優先 (Performance)** - 優化載入時間和互動體驗

---

## 2. 啟動畫面 (Splash Screen) / Splash Screen

### 2.1 桌面版線框圖 / Desktop Wireframe

```
┌──────────────────────────────────────────────────────────────┐
│                                                        [✕]    │
│                                                                │
│                                                                │
│                                                                │
│                     ┌────────────────────┐                    │
│                     │                    │                    │
│                     │   Animated Logo    │                    │
│                     │   (GIF/Animation)  │                    │
│                     │                    │                    │
│                     └────────────────────┘                    │
│                                                                │
│                                                                │
│                     ════════════════════                       │
│                     Progress Bar: 45%                          │
│                                                                │
│                                                                │
│                                                                │
│                                                                │
└──────────────────────────────────────────────────────────────┘

寬度 / Width: 600px - 800px
高度 / Height: 400px - 600px
背景 / Background: 漸層色 (#667eea → #764ba2)
```

### 2.2 行動版線框圖 / Mobile Wireframe

```
┌────────────────────┐
│              [✕]   │
│                    │
│                    │
│  ┌──────────────┐  │
│  │              │  │
│  │   Animated   │  │
│  │     Logo     │  │
│  │              │  │
│  └──────────────┘  │
│                    │
│                    │
│  ══════════════    │
│  Progress: 45%     │
│                    │
│                    │
│                    │
│                    │
└────────────────────┘

寬度 / Width: 100%
高度 / Height: 100vh
```

### 2.3 組件說明 / Component Description

#### 2.3.1 Logo 動畫區域 / Logo Animation Area

- **尺寸 / Size:**
  - 桌面版 / Desktop: 300px × 300px
  - 平板 / Tablet: 250px × 250px
  - 行動版 / Mobile: 200px × 200px

- **動畫效果 / Animation Effects:**
  - 淡入效果 (Fade in): 0.5s ease-in
  - GIF 循環播放 / GIF loop playback
  - 柔和陰影 / Soft shadow: `0 4px 20px rgba(0, 0, 0, 0.2)`

#### 2.3.2 進度條 / Progress Bar

- **尺寸 / Size:**
  - 桌面版 / Desktop: 300px 寬 / width
  - 行動版 / Mobile: 80% 螢幕寬度 / screen width

- **樣式 / Style:**
  - 高度 / Height: 4px
  - 圓角 / Border radius: 4px
  - 主色 / Primary color: #667eea
  - 背景色 / Background: rgba(255, 255, 255, 0.3)

- **進度文字 / Progress Text:**
  - 位置 / Position: 進度條上方右側 / Above progress bar, right aligned
  - 字體 / Font: 14px, Medium
  - 顏色 / Color: #FFFFFF

#### 2.3.3 關閉按鈕 / Close Button

- **位置 / Position:** 右上角 / Top-right corner (16px margin)
- **尺寸 / Size:** 40px × 40px
- **圖示 / Icon:** Material Icons "close"
- **顏色 / Color:** #FFFFFF with 70% opacity
- **Hover 效果 / Hover effect:** 100% opacity

### 2.4 互動流程 / Interaction Flow

```
載入頁面 (Page Load)
    ↓
顯示啟動畫面 (Show Splash Screen)
    ↓
開始計時器 (Start Timer: 0-10 seconds)
    ↓
更新進度條 (Update Progress Bar: 0-100%)
    ↓
10 秒後自動導航 (Auto Navigate after 10s)
    OR
使用者點擊關閉按鈕 (User Click Close)
    ↓
導航至主控面板 (Navigate to Dashboard)
```

---

## 3. 主控面板 (Dashboard) / Dashboard

### 3.1 桌面版線框圖 / Desktop Wireframe

```
┌────────────────────────────────────────────────────────────────┐
│  ☰ Logo            Home   Examples   About        [👤] [🔔]   │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│                  WinForms Examples Gallery                       │
│                    Modernized Web Version                        │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │  [🎬]       │  │  [🎨]       │  │  [🎮]       │           │
│  │             │  │             │  │             │           │
│  │  Animated   │  │  Custom     │  │  Collision  │           │
│  │  Effects    │  │  Controls   │  │  Detection  │           │
│  │             │  │             │  │             │           │
│  │  動畫效果   │  │  自訂控制項 │  │  碰撞偵測   │           │
│  │             │  │             │  │             │           │
│  │  [View →]   │  │  [View →]   │  │  [View →]   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │  [✨]       │  │  [🖼️]       │  │  [📐]       │           │
│  │             │  │             │  │             │           │
│  │  Fade       │  │  Navigation │  │  Rounded    │           │
│  │  Effects    │  │  Bar        │  │  Corners    │           │
│  │             │  │             │  │             │           │
│  │  淡入淡出   │  │  導航列     │  │  圓角面板   │           │
│  │             │  │             │  │             │           │
│  │  [View →]   │  │  [View →]   │  │  [View →]   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│           © 2024 WinForms Examples | Privacy | Terms           │
└────────────────────────────────────────────────────────────────┘
```

### 3.2 行動版線框圖 / Mobile Wireframe

```
┌──────────────────────┐
│  ☰  Logo      [👤]   │
├──────────────────────┤
│                      │
│  WinForms Examples   │
│   Gallery            │
│                      │
├──────────────────────┤
│                      │
│  ┌────────────────┐  │
│  │  [🎬]         │  │
│  │               │  │
│  │  Animated     │  │
│  │  Effects      │  │
│  │  動畫效果     │  │
│  │  [View →]     │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │  [🎨]         │  │
│  │               │  │
│  │  Custom       │  │
│  │  Controls     │  │
│  │  自訂控制項   │  │
│  │  [View →]     │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │  [🎮]         │  │
│  │               │  │
│  │  Collision    │  │
│  │  Detection    │  │
│  │  碰撞偵測     │  │
│  │  [View →]     │  │
│  └────────────────┘  │
│                      │
│       ⋮              │
│                      │
└──────────────────────┘
```

### 3.3 組件說明 / Component Description

#### 3.3.1 頂部導航列 / Top Navigation Bar

- **高度 / Height:** 64px
- **背景色 / Background:** #FFFFFF
- **陰影 / Shadow:** `0 2px 4px rgba(0, 0, 0, 0.1)`

**組件 / Components:**
- Logo (左側 / Left): 40px × 40px
- 導航選單 / Navigation Menu (中央 / Center):
  - Home, Examples, About
  - 字體 / Font: 16px, Medium
  - 間距 / Spacing: 24px
- 使用者圖示 / User Icon (右側 / Right):
  - 尺寸 / Size: 40px × 40px
  - 圓形頭像 / Circular avatar

#### 3.3.2 頁面標題區 / Page Header Section

- **高度 / Height:** 200px
- **背景 / Background:** 線性漸層 / Linear gradient (#667eea → #764ba2)
- **文字顏色 / Text color:** #FFFFFF

**內容 / Content:**
- 主標題 / Main Title: "WinForms Examples Gallery"
  - 字體 / Font: 32px, Bold
- 副標題 / Subtitle: "Modernized Web Version"
  - 字體 / Font: 18px, Regular

#### 3.3.3 範例卡片 / Example Cards

- **尺寸 / Size:**
  - 桌面版 / Desktop: 280px × 320px
  - 平板 / Tablet: 240px × 280px
  - 行動版 / Mobile: 100% 寬 × 280px 高

- **佈局 / Layout:**
  - Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
  - Gap: 24px

- **樣式 / Style:**
  - 背景色 / Background: #FFFFFF
  - 圓角 / Border radius: 12px
  - 陰影 / Shadow: `0 2px 8px rgba(0, 0, 0, 0.1)`
  - Hover 陰影 / Hover shadow: `0 4px 16px rgba(0, 0, 0, 0.15)`

**卡片內容 / Card Content:**
```
┌────────────────┐
│  [圖示 64×64]  │  ← 圖示區 / Icon area
├────────────────┤
│  Title         │  ← 標題 / Title (18px Bold)
│                │
│  中文標題      │  ← 副標題 / Subtitle (14px Regular)
│                │
│  Description   │  ← 說明 / Description (14px)
│  動畫效果範例  │
│                │
│  [View →]      │  ← 動作按鈕 / Action button
└────────────────┘
```

#### 3.3.4 底部資訊區 / Footer Section

- **高度 / Height:** 80px
- **背景色 / Background:** #F5F5F5
- **文字顏色 / Text color:** #757575
- **字體 / Font:** 14px, Regular

---

## 4. 範例詳情頁 / Example Details Page

### 4.1 桌面版線框圖 / Desktop Wireframe

```
┌────────────────────────────────────────────────────────────────┐
│  ☰ Logo            Home   Examples   About        [👤] [🔔]   │
├────────────────────────────────────────────────────────────────┤
│  ← Back to Examples                                             │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────┐  ┌────────────────────────────┐ │
│  │                          │  │  Animated Logo             │ │
│  │                          │  │  動畫標誌                  │ │
│  │      Live Demo           │  ├────────────────────────────┤ │
│  │      實時示範            │  │                            │ │
│  │                          │  │  Description:              │ │
│  │                          │  │  Splash screen with        │ │
│  │   [▶️ Play Demo]         │  │  animated logo...          │ │
│  │                          │  │                            │ │
│  │                          │  │  Features:                 │ │
│  └──────────────────────────┘  │  • Animated GIF support   │ │
│                                 │  • Auto-close timer       │ │
│                                 │  • Progress bar           │ │
│                                 │  • Manual close option    │ │
│                                 │                            │ │
│                                 │  Technologies:             │ │
│                                 │  Angular | RxJS | Material │ │
│                                 │                            │ │
│                                 │  Difficulty: Beginner      │ │
│                                 │                            │ │
│                                 │  [📝 View Code]            │ │
│                                 │  [⭐ Favorite]             │ │
│                                 └────────────────────────────┘ │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│  Implementation Guide                                            │
│                                                                  │
│  Step 1: Setup                                                   │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ npm install @angular/animations                            ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Step 2: Component                                               │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ // Code example...                                         ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### 4.2 組件說明 / Component Description

#### 4.2.1 麵包屑導航 / Breadcrumb Navigation

```
Home > Examples > Animated Effects > Animated Logo
```

- **字體 / Font:** 14px, Regular
- **顏色 / Color:** #757575
- **分隔符 / Separator:** ">" or "/"
- **當前頁 / Current page:** #212121, Bold

#### 4.2.2 示範區域 / Demo Area

- **尺寸 / Size:** 600px × 400px (desktop)
- **背景 / Background:** #F5F5F5
- **邊框 / Border:** 1px solid #E0E0E0
- **圓角 / Border radius:** 8px

#### 4.2.3 資訊側邊欄 / Information Sidebar

- **寬度 / Width:** 350px (desktop), 100% (mobile)
- **背景 / Background:** #FFFFFF
- **陰影 / Shadow:** `0 2px 8px rgba(0, 0, 0, 0.1)`

---

## 5. 使用者認證頁面 / Authentication Pages

### 5.1 登入頁面線框圖 / Login Page Wireframe

```
┌────────────────────────────────────────┐
│                                        │
│                                        │
│            ┌──────────┐                │
│            │   Logo   │                │
│            └──────────┘                │
│                                        │
│           Welcome Back                 │
│         歡迎回來                       │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ 📧 Email                         │ │
│  │ ────────────────────────────     │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ 🔒 Password                      │ │
│  │ ────────────────────────────────  │ │
│  └──────────────────────────────────┘ │
│                                        │
│  □ Remember me    Forgot password?    │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │         [Login / 登入]           │ │
│  └──────────────────────────────────┘ │
│                                        │
│       Don't have an account?           │
│              Sign up                   │
│                                        │
└────────────────────────────────────────┘
```

### 5.2 註冊頁面線框圖 / Registration Page Wireframe

```
┌────────────────────────────────────────┐
│                                        │
│            ┌──────────┐                │
│            │   Logo   │                │
│            └──────────┘                │
│                                        │
│          Create Account                │
│          建立帳號                      │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ 👤 Name                          │ │
│  │ ────────────────────────────     │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ 📧 Email                         │ │
│  │ ────────────────────────────────  │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ 🔒 Password                      │ │
│  │ ────────────────────────────────  │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ 🔒 Confirm Password              │ │
│  │ ────────────────────────────────  │ │
│  └──────────────────────────────────┘ │
│                                        │
│  □ I agree to Terms & Conditions      │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │       [Sign Up / 註冊]           │ │
│  └──────────────────────────────────┘ │
│                                        │
│      Already have an account?          │
│              Login                     │
│                                        │
└────────────────────────────────────────┘
```

---

## 6. 響應式設計規範 / Responsive Design Specifications

### 6.1 斷點定義 / Breakpoint Definitions

| 裝置類型 / Device | 斷點 / Breakpoint | 佈局 / Layout |
|------------------|-------------------|--------------|
| 手機 / Mobile | < 576px | 單欄 / 1 column |
| 平板 / Tablet | 576px - 768px | 雙欄 / 2 columns |
| 桌機 / Desktop | 768px - 992px | 三欄 / 3 columns |
| 大螢幕 / Wide | > 992px | 四欄 / 4 columns |

### 6.2 響應式調整 / Responsive Adjustments

#### 手機版 (Mobile)
- 導航選單折疊成漢堡選單 / Navigation collapses to hamburger menu
- 卡片全寬顯示 / Cards display full width
- 字體縮小 10-20% / Font size reduced by 10-20%
- 間距縮小 / Reduced spacing

#### 平板版 (Tablet)
- 兩欄網格佈局 / Two-column grid layout
- 適度縮小卡片 / Moderately sized cards
- 保持大部分桌面功能 / Maintains most desktop features

#### 桌機版 (Desktop)
- 完整功能顯示 / Full feature display
- 三欄網格佈局 / Three-column grid layout
- 懸停效果 / Hover effects enabled

---

## 7. 互動狀態 / Interaction States

### 7.1 按鈕狀態 / Button States

| 狀態 / State | 樣式 / Style |
|-------------|-------------|
| Normal | Background: #667eea, Color: #FFFFFF |
| Hover | Background: #5568d3, Transform: scale(1.02) |
| Active | Background: #4451b8, Transform: scale(0.98) |
| Disabled | Background: #E0E0E0, Color: #BDBDBD, Cursor: not-allowed |
| Loading | Show spinner, Disabled state |

### 7.2 輸入框狀態 / Input Field States

| 狀態 / State | 樣式 / Style |
|-------------|-------------|
| Normal | Border: 1px solid #E0E0E0 |
| Focus | Border: 2px solid #667eea, Shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) |
| Error | Border: 2px solid #F44336, Icon: ⚠️ |
| Success | Border: 2px solid #4CAF50, Icon: ✓ |
| Disabled | Background: #F5F5F5, Color: #BDBDBD |

### 7.3 卡片互動 / Card Interactions

- **Hover 效果 / Hover Effect:**
  - 陰影增強 / Shadow enhancement: `0 4px 16px rgba(0, 0, 0, 0.15)`
  - 微上移 / Slight lift: `translateY(-4px)`
  - 過渡 / Transition: 0.3s ease

- **點擊效果 / Click Effect:**
  - 輕微縮放 / Slight scale: `scale(0.98)`
  - 過渡 / Transition: 0.1s ease

---

## 8. 載入與空狀態 / Loading and Empty States

### 8.1 載入狀態 / Loading State

```
┌────────────────────────┐
│                        │
│         ⏳             │
│      Loading...        │
│      載入中...         │
│                        │
│    ●●●○○ (spinner)     │
│                        │
└────────────────────────┘
```

### 8.2 空狀態 / Empty State

```
┌────────────────────────┐
│                        │
│         📭             │
│   No Examples Found    │
│   尚無範例             │
│                        │
│  Try a different       │
│  category              │
│                        │
└────────────────────────┘
```

### 8.3 錯誤狀態 / Error State

```
┌────────────────────────┐
│                        │
│         ⚠️             │
│   Something Went       │
│   Wrong                │
│   發生錯誤             │
│                        │
│   [Retry / 重試]       │
│                        │
└────────────────────────┘
```

---

## 9. 無障礙設計 / Accessibility Design

### 9.1 ARIA 標籤 / ARIA Labels

- 所有互動元素包含 `aria-label`
- 表單欄位包含 `aria-describedby`
- 狀態變更包含 `aria-live` 區域
- 模態對話框包含 `role="dialog"`

### 9.2 鍵盤導航 / Keyboard Navigation

- Tab 鍵導航順序合理 / Logical tab order
- Enter/Space 鍵觸發動作 / Enter/Space trigger actions
- Escape 鍵關閉對話框 / Escape closes dialogs
- Arrow 鍵導航選單 / Arrow keys navigate menus

### 9.3 顏色對比 / Color Contrast

- 文字對比度 ≥ 4.5:1 (正常文字)
- 文字對比度 ≥ 3:1 (大文字)
- 符合 WCAG 2.1 AA 標準

---

## 10. 動畫與轉場 / Animations and Transitions

### 10.1 頁面轉場 / Page Transitions

- 淡入 / Fade in: 0.3s ease-out
- 滑入 / Slide in: 0.4s cubic-bezier(0.4, 0, 0.2, 1)

### 10.2 微互動 / Micro-interactions

- 按鈕點擊 / Button click: Ripple effect
- 卡片懸停 / Card hover: Lift + shadow
- 表單驗證 / Form validation: Shake animation on error

### 10.3 載入動畫 / Loading Animations

- Spinner: 旋轉動畫 / Rotate animation
- Skeleton screen: 漸變動畫 / Gradient animation
- Progress bar: 平滑進度 / Smooth progression

---

## 11. 設計資源 / Design Assets

### 11.1 圖示庫 / Icon Library

- Material Icons
- Font Awesome (備選 / Alternative)

### 11.2 字體 / Fonts

- 英文 / English: Roboto
- 中文 / Chinese: Noto Sans TC
- 程式碼 / Code: Roboto Mono

### 11.3 色彩系統 / Color System

```
Primary Colors:
- #667eea (Indigo)
- #764ba2 (Purple)

Secondary Colors:
- #f093fb (Pink)
- #4facfe (Blue)

Neutral Colors:
- #212121 (Dark)
- #757575 (Gray)
- #FFFFFF (White)
- #F5F5F5 (Background)

Status Colors:
- #4CAF50 (Success / Green)
- #FFC107 (Warning / Amber)
- #F44336 (Error / Red)
- #2196F3 (Info / Blue)
```

---

## 12. 設計交付清單 / Design Deliverables Checklist

- [ ] 所有主要頁面線框圖完成
- [ ] 響應式設計規範明確
- [ ] 組件規格詳細定義
- [ ] 互動狀態完整描述
- [ ] 無障礙設計要求明確
- [ ] 動畫效果規範清楚
- [ ] 色彩系統一致性
- [ ] 字體使用規範
- [ ] 圖示使用一致
- [ ] 空狀態和錯誤處理設計
- [ ] 載入狀態設計
- [ ] 設計資源準備完整

---

## 13. 參考資料 / References

- [Material Design Guidelines](https://material.io/design)
- [Angular Material Components](https://material.angular.io/components)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Responsive Design Patterns](https://responsivedesign.is/patterns/)

---

**文件版本歷史 / Document Version History**

| 版本 / Version | 日期 / Date | 變更說明 / Changes |
|---------------|-------------|-------------------|
| 1.0 | 2024 | 初始版本 / Initial version |
