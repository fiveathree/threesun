# 五行石室 threesun

水晶手鏈同擺件網店示範，中英雙語。用家輸入一次出生資料，就可以睇以下推算，每個結果都配返適合嘅水晶：

- 命理：八字五行、紫微斗數（十四主星、六吉、四化）、生命靈數、姓名學（康熙筆劃五格）
- 星象：星盤（太陽、月亮、上升同五大行星）、生肖太歲（2026 丙午）
- 占卜：塔羅（1909 年 Rider 原版牌圖）、金錢卦（易經六十四卦）、求籤（擲筊確認）
- 風水：八宅本命卦、農民曆宜忌擇日、今日運勢、九宮擺位加 2026 流年飛星
- 相學：五行手相面相（問卷形式）

貨品、價錢同批次資料全部係示範例子。

## 檔案

- `index.html`：頁面結構
- `css/style.css`：樣式
- `js/data.js`：貨品、翻譯、星座、塔羅、飛星（改貨品同文字改呢度）
- `js/data2.js`：紫微、生命靈數、姓名學、易經、籤詩、八宅、農民曆翻譯、手相面相
- `js/strokes.js`：康熙字典筆劃表
- `js/app.js`：計算同畫面邏輯
- `js/vendor/`：第三方庫
- `img/tarot/`：22 張大阿爾克那牌圖

純靜態網站，可以直接放上 Cloudflare Pages 或 GitHub Pages。

## 第三方資料同授權

- [lunar-javascript](https://github.com/6tail/lunar-javascript)：農曆、節氣、八字、宜忌。MIT License，Copyright (c) 2018 6tail
- [Astronomy Engine](https://github.com/cosinekitty/astronomy)：行星位置。MIT License，Copyright (c) 2019-2025 Don Cross
- [kangxi-strokecount](https://github.com/breezyreeds/kangxi-strokecount)：康熙字典筆劃。MIT License，Copyright (c) 2017-2018 Kawai Lo
- 塔羅牌圖：Pamela Colman Smith 繪，1909 年 Rider 版（公有領域）；原裝牌掃描由 Steve P.（steve-p.org）修復
- 籤詩、塔羅牌義、卦義同其他解說文字為本站原創
