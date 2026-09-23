# Walkthrough：拆分 CSS 與 JavaScript

## Summary
將 `index.html` 內嵌的 CSS 與 JavaScript 拆分為獨立檔案，保留遊戲功能與直接開啟 HTML 的使用方式。

## Files changed
- `index.html`：引用 `styles.css` 與 `game.js`。
- `styles.css`：保存原本的頁面樣式與 RWD 規則。
- `game.js`：保存 Canvas 遊戲邏輯、圖片載入、碰撞與操作。
- `AGENTS.md`、`handoff.md`、`CHANGELOG.md`：更新結構與交接紀錄。

## Verification
- `game.js` JavaScript 語法解析通過。
- VS Code 檢查 `index.html`、`styles.css`、`game.js` 均無錯誤。
- 瀏覽器確認 `styles.css` 成功載入、`game.js` 成功執行、Canvas 可見，按空白鍵可進入「奔跑中」。

## Follow-ups
- 之後修改樣式請編輯 `styles.css`。
- 之後修改遊戲邏輯請編輯 `game.js`。
