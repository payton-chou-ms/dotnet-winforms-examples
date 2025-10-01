# AnimatedLogoForm 功能規格文件

## Functional Specification Document: AnimatedLogoForm

---

## 文件資訊 / Document Information

| 項目 / Item | 內容 / Content |
|------------|----------------|
| 文件名稱 / Document Name | AnimatedLogoForm 功能規格 / AnimatedLogoForm Functional Specification |
| 版本 / Version | 1.0 |
| 狀態 / Status | Draft |
| 作者 / Author | Reverse Engineering Team |
| 日期 / Date | 2024 |
| 來源 / Source | AnimatedLogoForm.cs (Legacy Code Analysis) |

---

## 1. 概述 / Overview

### 1.1 目的 / Purpose

AnimatedLogoForm 是一個啟動畫面視窗，用於在應用程式啟動時顯示品牌標誌動畫。此視窗提供友好的載入體驗，同時允許使用者在必要時移動視窗位置。

AnimatedLogoForm is a splash screen window designed to display an animated brand logo during application startup. This window provides a friendly loading experience while allowing users to reposition the window if necessary.

### 1.2 範圍 / Scope

本規格涵蓋 AnimatedLogoForm 的所有功能，包括：
- 動畫圖像播放
- 自動關閉機制
- 視窗拖曳功能

This specification covers all functionality of AnimatedLogoForm, including:
- Animated image playback
- Auto-close mechanism
- Window dragging functionality

### 1.3 目標使用者 / Target Users

- 終端使用者：看到啟動動畫
- 開發人員：整合此元件到應用程式
- 設計師：定制動畫內容

- End users: View startup animation
- Developers: Integrate this component into applications
- Designers: Customize animation content

---

## 2. 系統架構 / System Architecture

### 2.1 組件概述 / Component Overview

```
AnimatedLogoForm (Form)
    │
    ├── pictureBox1 (PictureBox)
    │   └── [GIF 動畫圖像 / GIF Animation Image]
    │
    ├── Timer (1ms 間隔 / 1ms interval)
    │   ├── 幀更新 / Frame Updates
    │   └── 時間檢查 / Time Checking
    │
    ├── Stopwatch
    │   └── 經過時間追蹤 / Elapsed Time Tracking
    │
    └── 滑鼠事件處理器 / Mouse Event Handlers
        ├── MouseDown
        ├── MouseMove
        └── MouseUp
```

### 2.2 技術棧 / Technology Stack

- **框架 / Framework:** .NET Windows Forms
- **語言 / Language:** C# 
- **版本 / Version:** .NET 7.0 Windows
- **主要命名空間 / Key Namespaces:**
  - System.Windows.Forms
  - System.Drawing.Imaging
  - System.Diagnostics

---

## 3. 功能需求 / Functional Requirements

### FR-1: 動畫圖像播放

**需求 ID / Requirement ID:** FR-ANI-001  
**優先級 / Priority:** ★★★ High  
**類別 / Category:** 核心功能 / Core Feature

#### 需求描述 / Requirement Description

系統應能夠播放多幀動畫圖像（如 GIF），並在視窗顯示期間持續循環播放。

The system shall be able to play multi-frame animated images (such as GIF) and continuously loop during window display.

#### 詳細規格 / Detailed Specification

**輸入 / Input:**
- 多幀圖像檔案（GIF 格式或其他支援多幀的格式）
- 圖像應預先載入至 pictureBox1 控制項

**處理邏輯 / Processing Logic:**
1. 在表單初始化時：
   - 從圖像中提取幀維度資訊
   - 取得總幀數
   - 初始化當前幀索引為 -1
2. 啟動一個計時器，間隔為 1 毫秒
3. 每次計時器觸發時呼叫 NextFrame() 方法
4. NextFrame() 方法：
   - 遞增當前幀索引
   - 如果索引超出範圍（>= frameCount 或 < 0），重置為 0
   - 使用 SelectActiveFrame() 顯示當前幀

**輸出 / Output:**
- 螢幕上顯示的連續動畫效果

**接受標準 / Acceptance Criteria:**
- AC1: 動畫應立即開始播放，無延遲
- AC2: 動畫應流暢循環，無明顯停頓
- AC3: 幀切換應使用圖像的原生幀序列
- AC4: 動畫播放不應影響 UI 響應性

**程式碼對應 / Code Mapping:**
```csharp
// 初始化 / Initialization
dimension = new FrameDimension(pictureBox1.Image.FrameDimensionsList[0]);
frameCount = pictureBox1.Image.GetFrameCount(dimension);

// 幀切換邏輯 / Frame switching logic
public void NextFrame()
{
    currentFrame += 1;
    if (currentFrame >= frameCount || currentFrame < 0)
    {
        currentFrame = 0;
    }
    pictureBox1.Image.SelectActiveFrame(dimension, currentFrame);
}
```

---

### FR-2: 自動關閉功能

**需求 ID / Requirement ID:** FR-ANI-002  
**優先級 / Priority:** ★★★ High  
**類別 / Category:** 核心功能 / Core Feature

#### 需求描述 / Requirement Description

視窗應在顯示 10 秒後自動關閉，無需使用者干預。

The window shall automatically close after 10 seconds of display without user intervention.

#### 詳細規格 / Detailed Specification

**輸入 / Input:**
- 時間參數：10 秒（硬編碼）

**處理邏輯 / Processing Logic:**
1. 在表單初始化時啟動 Stopwatch
2. 在計時器的 Tick 事件中：
   - 檢查經過的時間
   - 如果 stopWatch.Elapsed > TimeSpan.FromSeconds(10)：
     - 停用計時器
     - 呼叫 Close() 方法關閉表單

**輸出 / Output:**
- 表單關閉
- 釋放相關資源

**接受標準 / Acceptance Criteria:**
- AC1: 視窗應在 10.0 ± 0.1 秒後關閉
- AC2: 關閉應優雅進行，不顯示任何錯誤訊息
- AC3: 計時應從視窗顯示時開始
- AC4: 關閉後應正確釋放所有資源（計時器、圖像等）

**程式碼對應 / Code Mapping:**
```csharp
stopWatch = Stopwatch.StartNew();
timer.Tick += (_, _) =>
{
    NextFrame();
    if (stopWatch.Elapsed > TimeSpan.FromSeconds(10))
    {
        timer.Enabled = false;
        Close();
    }
};
```

**邊緣案例 / Edge Cases:**
- 如果使用者在 10 秒內手動關閉視窗，應正常關閉
- 如果系統時鐘被修改，計時器仍應基於 Stopwatch 的相對時間

---

### FR-3: 視窗拖曳功能

**需求 ID / Requirement ID:** FR-ANI-003  
**優先級 / Priority:** ★★☆ Medium  
**類別 / Category:** 使用者體驗 / User Experience

#### 需求描述 / Requirement Description

使用者應能夠通過按住滑鼠左鍵並拖曳來移動視窗到螢幕上的任何位置。

Users shall be able to move the window to any position on the screen by holding the left mouse button and dragging.

#### 詳細規格 / Detailed Specification

**輸入 / Input:**
- 滑鼠事件：MouseDown, MouseMove, MouseUp

**處理邏輯 / Processing Logic:**

**MouseDown 事件:**
1. 檢查視窗狀態是否為 Normal（非最大化、非最小化）
2. 如果是，則：
   - 設定 Moving 標誌為 true
   - 捕獲滑鼠（設定 Capture = true）
   - 記錄滑鼠相對於控制項的初始位置

**MouseMove 事件:**
1. 檢查視窗狀態是否為 Normal
2. 如果是且 Moving 為 true：
   - 計算滑鼠移動的偏移量
   - 更新視窗的 Left 和 Top 位置
3. 如果視窗狀態不是 Normal：
   - 重置 Moving 標誌
   - 釋放滑鼠捕獲

**MouseUp 事件:**
1. 檢查視窗狀態是否為 Normal
2. 如果是：
   - 設定 Moving 標誌為 false
   - 釋放滑鼠捕獲

**輸出 / Output:**
- 視窗位置改變
- 視窗平滑移動到新位置

**接受標準 / Acceptance Criteria:**
- AC1: 拖曳應在正常視窗狀態下可用
- AC2: 視窗應流暢跟隨滑鼠移動，無延遲
- AC3: 拖曳時動畫應繼續播放
- AC4: 釋放滑鼠後，視窗應停留在新位置
- AC5: 最大化或最小化狀態下無法拖曳

**程式碼對應 / Code Mapping:**
```csharp
bool Moving;
(int X, int Y) MovingMouseOrigin;

private void Move_MouseDown(object sender, MouseEventArgs e)
{
    if (WindowState is FormWindowState.Normal)
    {
        Moving = true;
        ((Control)sender).Capture = true;
        MovingMouseOrigin = (e.X, e.Y);
    }
}

private void Move_MouseMove(object sender, MouseEventArgs e)
{
    if (WindowState is FormWindowState.Normal)
    {
        if (Moving)
        {
            Left += e.X - MovingMouseOrigin.X;
            Top += e.Y - MovingMouseOrigin.Y;
        }
    }
    else
    {
        Moving = false;
        ((Control)sender).Capture = false;
    }
}

private void Move_MouseUp(object sender, MouseEventArgs e)
{
    if (WindowState is FormWindowState.Normal)
    {
        Moving = false;
        ((Control)sender).Capture = false;
    }
}
```

**使用案例 / Use Case:**

```
使用案例 UC-003: 拖曳啟動畫面
參與者：終端使用者
前置條件：視窗已顯示且處於正常狀態
主要流程：
1. 使用者在視窗任意位置按下滑鼠左鍵
2. 使用者移動滑鼠
3. 視窗跟隨滑鼠移動
4. 使用者釋放滑鼠左鍵
5. 視窗停留在新位置
後置條件：視窗位於使用者選擇的位置
```

---

## 4. 非功能性需求 / Non-Functional Requirements

### NFR-1: 效能 / Performance

**需求 ID:** NFR-ANI-001

**規格 / Specifications:**

| 指標 / Metric | 要求 / Requirement | 測量方法 / Measurement |
|--------------|-------------------|----------------------|
| 計時器間隔 / Timer Interval | 1 毫秒 | 程式碼檢查 |
| 啟動時間 / Startup Time | < 100 毫秒 | 從 constructor 到第一幀顯示 |
| 幀率 / Frame Rate | 取決於圖像 | 使用圖像的原生幀率 |
| 記憶體使用 / Memory Usage | < 50 MB | 視窗顯示期間 |
| CPU 使用率 / CPU Usage | < 5% | 正常運作時 |

**驗證方法 / Verification Methods:**
- 使用 Performance Monitor 監測 CPU 和記憶體
- 使用 Stopwatch 測量啟動時間
- 視覺檢查動畫流暢度

---

### NFR-2: 可用性 / Usability

**需求 ID:** NFR-ANI-002

**規格 / Specifications:**
- 視窗應在螢幕中央顯示（預設行為）
- 動畫應清晰可見
- 拖曳功能應直觀，無需說明
- 視窗關閉應無閃爍或錯誤訊息

**可及性 / Accessibility:**
- 視窗應尊重系統的高對比度設定
- 動畫不應包含快速閃爍（避免光敏性癲癇風險）

---

### NFR-3: 可維護性 / Maintainability

**需求 ID:** NFR-ANI-003

**規格 / Specifications:**
- 程式碼應遵循 C# 命名慣例
- 使用 #region 組織相關功能
- 公開方法應有 XML 文件註解（目前缺失）
- 魔術數字應提取為常數

**改進建議 / Improvement Suggestions:**
```csharp
// 建議將硬編碼值提取為常數
private const int TIMER_INTERVAL_MS = 1;
private const int AUTO_CLOSE_SECONDS = 10;
```

---

### NFR-4: 相容性 / Compatibility

**需求 ID:** NFR-ANI-004

**規格 / Specifications:**
- 目標平台：Windows 10/11
- .NET 版本：.NET 7.0 或更高
- 螢幕解析度：支援 1024x768 到 4K
- 多顯示器：視窗應可在所有顯示器上顯示和移動

---

## 5. 資料模型 / Data Model

### 5.1 狀態變數 / State Variables

| 變數名稱 / Variable | 類型 / Type | 用途 / Purpose | 初始值 / Initial Value |
|---------------------|------------|---------------|----------------------|
| dimension | FrameDimension | 圖像幀維度資訊 | 從圖像取得 |
| frameCount | int | 總幀數 | 從圖像取得 |
| currentFrame | int | 當前顯示的幀索引 | -1 |
| stopWatch | Stopwatch | 經過時間追蹤 | 已啟動 |
| Moving | bool | 是否正在拖曳視窗 | false |
| MovingMouseOrigin | (int, int) | 拖曳開始時的滑鼠位置 | (0, 0) |

### 5.2 狀態轉換 / State Transitions

```
初始狀態 (Initial State)
    ↓
顯示並播放動畫 (Displaying & Animating)
    ↓ (時間 > 10秒 / Time > 10s)
關閉中 (Closing)
    ↓
已關閉 (Closed)
```

**拖曳狀態轉換 / Drag State Transitions:**
```
未拖曳 (Not Moving)
    ↓ (MouseDown + WindowState == Normal)
拖曳中 (Moving)
    ↓ (MouseUp 或 WindowState != Normal)
未拖曳 (Not Moving)
```

---

## 6. 使用者介面規格 / User Interface Specification

### 6.1 視窗屬性 / Window Properties

預期的視窗屬性（從 Designer 檔案推斷）：

| 屬性 / Property | 預期值 / Expected Value | 說明 / Description |
|-----------------|------------------------|-------------------|
| FormBorderStyle | None 或 FixedSingle | 可能無邊框或固定邊框 |
| StartPosition | CenterScreen | 螢幕中央顯示 |
| ShowInTaskbar | False | 不顯示在工作列 |
| TopMost | True（可能） | 置頂顯示 |
| BackColor | 透明或白色 | 取決於設計 |

### 6.2 控制項配置 / Control Layout

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│          pictureBox1            │
│      [動畫標誌圖像]              │
│      [Animated Logo]            │
│                                 │
│                                 │
└─────────────────────────────────┘
```

**pictureBox1 規格:**
- Dock: Fill（可能）
- SizeMode: 適當的模式（如 CenterImage 或 Zoom）
- 圖像格式：GIF 或其他多幀格式

---

## 7. 約束與限制 / Constraints & Limitations

### 7.1 技術約束 / Technical Constraints

1. **圖像格式限制**
   - 必須使用支援多幀的圖像格式
   - GIF 是主要支援的格式
   - 圖像必須預先載入（無動態載入功能）

2. **計時限制**
   - 關閉時間硬編碼為 10 秒（不可配置）
   - 計時器間隔固定為 1ms（不可調整）

3. **平台限制**
   - 僅支援 Windows 平台
   - 需要 .NET 7.0 或更高版本
   - 需要視窗化環境（不支援無頭模式）

### 7.2 設計限制 / Design Limitations

1. **拖曳限制**
   - 僅在 Normal 視窗狀態下可用
   - 無法拖曳最大化或最小化的視窗

2. **配置限制**
   - 無配置檔案支援
   - 所有參數硬編碼
   - 無法在運行時更改行為

3. **國際化限制**
   - 無文字內容（純視覺）
   - 無多語言支援需求

---

## 8. 測試規格 / Testing Specification

### 8.1 功能測試 / Functional Tests

#### 測試案例 TC-001：動畫播放
**前置條件：** 有效的 GIF 圖像已載入至 pictureBox1

| 步驟 | 操作 | 預期結果 |
|-----|------|---------|
| 1 | 啟動應用程式 | 視窗顯示 |
| 2 | 觀察動畫 | 動畫立即開始播放 |
| 3 | 持續觀察 5 秒 | 動畫循環播放，無停頓 |
| 4 | 檢查幀順序 | 幀按正確順序顯示 |

**測試資料：**
- test-logo.gif（10 幀，100x100 像素）

---

#### 測試案例 TC-002：自動關閉
**前置條件：** 視窗已顯示

| 步驟 | 操作 | 預期結果 |
|-----|------|---------|
| 1 | 啟動應用程式並記錄時間 | 視窗顯示 |
| 2 | 等待並觀察 | 持續顯示動畫 |
| 3 | 在 10 秒時檢查 | 視窗關閉（誤差 ±0.1 秒） |
| 4 | 檢查 Task Manager | 無殘留程序 |

**通過標準：**
- 關閉時間：9.9 - 10.1 秒
- 無錯誤訊息
- 資源完全釋放

---

#### 測試案例 TC-003：視窗拖曳
**前置條件：** 視窗已顯示於螢幕中央

| 步驟 | 操作 | 預期結果 |
|-----|------|---------|
| 1 | 在視窗上按下滑鼠左鍵 | 滑鼠被捕獲 |
| 2 | 移動滑鼠 100 像素向右 | 視窗跟隨移動 |
| 3 | 釋放滑鼠 | 視窗停留在新位置 |
| 4 | 驗證動畫 | 動畫持續播放 |

---

#### 測試案例 TC-004：拖曳狀態限制
**前置條件：** 視窗已顯示

| 步驟 | 操作 | 預期結果 |
|-----|------|---------|
| 1 | （假設視窗可最大化）最大化視窗 | 視窗最大化 |
| 2 | 嘗試拖曳視窗 | 視窗不移動 |
| 3 | 還原視窗為正常大小 | 視窗還原 |
| 4 | 再次嘗試拖曳 | 視窗可拖曳 |

---

### 8.2 非功能性測試 / Non-Functional Tests

#### 測試案例 TC-005：效能測試
**目標：** 驗證資源使用合理

| 指標 | 測量工具 | 目標值 | 實際值 |
|-----|---------|--------|--------|
| 啟動時間 | Stopwatch | < 100ms | ___ |
| CPU 使用率 | Task Manager | < 5% | ___ |
| 記憶體使用 | Task Manager | < 50MB | ___ |
| 動畫流暢度 | 視覺檢查 | 無卡頓 | ___ |

---

#### 測試案例 TC-006：多顯示器測試
**前置條件：** 系統連接多個顯示器

| 步驟 | 操作 | 預期結果 |
|-----|------|---------|
| 1 | 在主顯示器啟動應用程式 | 視窗顯示於主顯示器中央 |
| 2 | 拖曳視窗到第二顯示器 | 視窗移動到第二顯示器 |
| 3 | 觀察動畫 | 動畫正常顯示 |
| 4 | 等待自動關閉 | 10 秒後正常關閉 |

---

### 8.3 邊緣案例測試 / Edge Case Tests

#### 測試案例 TC-007：無效圖像
**目標：** 驗證錯誤處理

| 場景 | 預期行為 |
|-----|---------|
| 圖像為空 | 應顯示錯誤或使用預設圖像 |
| 圖像僅有單幀 | 應顯示靜態圖像，不崩潰 |
| 圖像檔案損壞 | 應優雅處理，顯示錯誤訊息 |

**注意：** 目前程式碼可能未處理這些情況，應記錄為改進項目。

---

#### 測試案例 TC-008：極端拖曳
**目標：** 驗證邊界條件

| 場景 | 預期行為 |
|-----|---------|
| 拖曳到螢幕外 | 視窗部分可見，或被系統限制 |
| 快速拖曳 | 視窗跟隨，無延遲或錯位 |
| 拖曳期間視窗關閉 | 正常關閉，無錯誤 |

---

## 9. 已知問題與改進建議 / Known Issues & Improvement Suggestions

### 9.1 已知限制 / Known Limitations

1. **硬編碼值**
   - 問題：10 秒和 1ms 等值硬編碼
   - 影響：難以配置和調整
   - 建議：提取為常數或配置參數

2. **錯誤處理不足**
   - 問題：無圖像驗證
   - 影響：可能導致運行時錯誤
   - 建議：添加圖像驗證和錯誤處理

3. **無文件註解**
   - 問題：公開方法缺少 XML 註解
   - 影響：降低程式碼可讀性
   - 建議：添加完整的 XML 文件註解

### 9.2 潛在改進 / Potential Enhancements

1. **配置支援**
   ```csharp
   public AnimatedLogoForm(AnimationConfig config)
   {
       // 支援自定義關閉時間、計時器間隔等
   }
   ```

2. **進度指示器**
   - 添加進度條顯示剩餘時間
   - 提供視覺反饋

3. **可取消功能**
   - 允許使用者點擊關閉按鈕
   - ESC 鍵快速關閉

4. **動畫完成回呼**
   ```csharp
   public event EventHandler AnimationCompleted;
   ```

5. **資源管理改進**
   - 實作 IDisposable
   - 確保資源正確釋放

---

## 10. 需求追溯矩陣 / Requirements Traceability Matrix

| 需求 ID | 需求名稱 | 程式碼位置 | 測試案例 | 狀態 |
|--------|---------|-----------|---------|------|
| FR-ANI-001 | 動畫播放 | NextFrame(), Constructor | TC-001 | ✓ 已實作 |
| FR-ANI-002 | 自動關閉 | Constructor (Timer.Tick) | TC-002 | ✓ 已實作 |
| FR-ANI-003 | 視窗拖曳 | Move_MouseDown/Move/Up | TC-003, TC-004 | ✓ 已實作 |
| NFR-ANI-001 | 效能 | 整體 | TC-005 | ⚠ 需驗證 |
| NFR-ANI-002 | 可用性 | 整體 | 手動測試 | ⚠ 需驗證 |
| NFR-ANI-003 | 可維護性 | 程式碼風格 | 程式碼審查 | ⚠ 需改進 |
| NFR-ANI-004 | 相容性 | 框架依賴 | TC-006 | ⚠ 需驗證 |

---

## 11. 變更歷史 / Change History

| 版本 | 日期 | 作者 | 變更說明 |
|-----|------|------|---------|
| 1.0 | 2024 | Reverse Engineering Team | 初始版本，從程式碼分析產生 |

---

## 12. 附錄 / Appendices

### 附錄 A：術語表 / Glossary

| 術語 / Term | 定義 / Definition |
|------------|------------------|
| GIF | Graphics Interchange Format，支援動畫的圖像格式 |
| Splash Screen | 啟動畫面，應用程式啟動時短暫顯示的視窗 |
| Frame | 幀，動畫中的單一圖像 |
| Stopwatch | 高精度計時器，用於測量時間間隔 |
| Capture | 滑鼠捕獲，鎖定滑鼠輸入到特定控制項 |

### 附錄 B：參考程式碼 / Reference Code

完整程式碼位置：`dotnet-winforms-examples/AnimatedLogoForm.cs`

相關檔案：
- `AnimatedLogoForm.Designer.cs` - UI 設計
- `AnimatedLogoForm.resx` - 資源檔案

---

## 審查與批准 / Review & Approval

| 角色 / Role | 姓名 / Name | 簽名 / Signature | 日期 / Date |
|------------|------------|-----------------|------------|
| 分析師 / Analyst | ___________ | ___________ | _________ |
| 技術負責人 / Tech Lead | ___________ | ___________ | _________ |
| 產品負責人 / Product Owner | ___________ | ___________ | _________ |

---

**文件結束 / End of Document**
