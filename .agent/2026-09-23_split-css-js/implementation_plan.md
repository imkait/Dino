# Implementation Plan：拆分 CSS 與 JavaScript

## Scope
將 `index.html` 內嵌的 CSS 與 JavaScript 分離成獨立檔案，保留目前遊戲外觀、操作與功能。

## Approach
- 建立 `styles.css`，移入現有 `<style>` 內容。
- 建立 `game.js`，移入現有 `<script>` 內容。
- 修改 `index.html`，改用 `<link rel="stylesheet" href="styles.css">` 與 `<script src="game.js"></script>`。
- 保留相對路徑，讓直接以瀏覽器開啟 `index.html` 仍可運作。

## Files to modify
- `index.html`
- `styles.css`
- `game.js`

## Risks
- 外部檔案路徑錯誤會導致樣式或遊戲邏輯未載入。
- 需以瀏覽器驗證 CSS、JavaScript、PNG 素材與 Canvas 都能正常載入。

---
狀態：已完成
