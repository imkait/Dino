# Dino 跑酷遊戲（專案藍圖 / AGENTS.md）

> 本檔為跨 Agent 通用的專案說明書。任何 Agent 開工前都應先讀本檔與 `handoff.md`。

## 專案簡介
製作一個可在瀏覽器遊玩的恐龍躲避障礙網頁遊戲，玩家控制恐龍持續前進並閃避障礙物。

## 技術棧與版本
- HTML5
- CSS3
- JavaScript
- Canvas API
- 支援最新版 Chrome、Edge、Safari 與 Firefox；不固定框架版本

## 常用指令

## 三層邊界
- **永遠要做**：維持遊戲可直接在瀏覽器啟動；保留基本操作與碰撞判定；每個階段都能測試。
- **要先問我**：大幅修改玩法；加入外部素材或套件；部署到公開網站；刪除或覆蓋既有資料。
- **絕對不要做**：建立後端與資料庫；收集個人資料；自動發布到公開網站；刪除使用者檔案；擅自加入大量外部依賴。

## 目標與路線圖
- [x] 階段一：遊戲企劃與最小可玩原型
- [x] 階段二：核心遊戲系統
- [ ] 階段三：美術、音效與遊戲體驗
- [ ] 階段四：測試與最佳化

### 本次已完成
- 新增道具系統：護盾與雙倍分數。
- 補足碰撞判定與狀態回饋。
- 增加道具繪製與效果視覺化。

## 資料夾結構
```text
Dino/
├── AGENTS.md
├── handoff.md
├── GAME_PLAN.md
├── index.html
├── styles.css
├── game.js
├── assets/
│   ├── dino-run-1.png
│   ├── dino-run-2.png
│   ├── dino-jump.png
│   └── dino-hit.png
├── CHANGELOG.md
├── docs/
│   └── decisions.md
└── .agent/
    └── _templates/
        ├── implementation_plan.md
        └── walkthrough.md
```

## Session 開始時必讀
每次開始新任務前，依序讀取：
1. `handoff.md`
2. `CHANGELOG.md`
3. `docs/decisions.md`
4. `.agent/` 底下最近 2-3 個任務資料夾（若任務與過去決策相關）

純文字修改、小型單檔調整可略過此步驟。

## 任務文件工作流程
預期修改 3 個以上檔案、涉及架構變更，或使用者要求先規劃時，先在 `.agent/<YYYY-MM-DD>_<task-slug>/` 建立 `implementation_plan.md`，等待使用者審核後再執行。任務完成後，在同一資料夾寫 `walkthrough.md`。

## 收工紀律
收工時更新本檔路線圖、重寫 `handoff.md`、在 `CHANGELOG.md` 補充摘要，並記錄必要的架構決策。

## 工作約定
- 任何 Agent、任何電腦：開工先讀 `handoff.md`，收工必更新 `handoff.md`。
- 修改共用檔案前先讀最新內容，避免覆蓋其他 Agent 的變更。
- 所有回應與文件使用繁體中文。
- 修改前先確認計畫，優先保留原有資料結構。
- 專案目前以 OneDrive 雲端硬碟同步，之後可視需要搭配 Git commit。
