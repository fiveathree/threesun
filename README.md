# 五行石室 threesun

水晶手鏈同擺件網店示範，中英雙語。用家輸入一次出生資料，就可以睇以下推算，每個結果都配返適合嘅水晶：

- 命理：八字五行、紫微斗數（十四主星、六吉、四化）、生命靈數、姓名學（康熙筆劃五格）、九星氣學、誕生石
- 星象：星盤（太陽、月亮、上升同五大行星，加蛇夫座 13 星座）、生肖太歲（2026 丙午）、二十八宿、七政四餘、印度占星（月宿同大運）、瑪雅曆（13 月亮曆）
- 性格・配對：48型人格（12 星座 × 4 血型）、16型性格（問卷）、九型人格（問卷）、能量類型（人類圖概念）、配對合盤
- 占卜：塔羅（1909 年 Rider 原版牌圖）、盧恩符文、金錢卦（擲銅錢動畫）、易經梅花易數（時間起卦，本卦互卦變卦、體用生剋）、蓍草占（大衍之數十八變動畫）、龜甲占（灼龜裂紋動畫）、求籤（搖籤筒同擲筊動畫）、數花瓣
- 術數：奇門遁甲（時家轉盤）、大六壬（簡化）、小六壬
- 風水：八宅本命卦、玄空飛星（九宮擺位加 2026 流年飛星）、農民曆宜忌擇日、今日運勢
- 相學：五行手相面相（問卷形式）

每種學說嘅結果都會換算成一個五行，水晶用同一條規則配：結果五行嘅手鏈同擺件，加一條補八字最弱五行嘅手鏈。「五行總覽」將所有學說嘅五行加埋，畀一個總結。

貨品、價錢同批次資料全部係示範例子。

## 檔案

- `index.html`：頁面結構
- `css/style.css`：樣式
- `js/data.js`：貨品、翻譯、星座、塔羅、飛星（改貨品同文字改呢度）
- `js/data2.js`：紫微、生命靈數、姓名學、易經、籤詩、八宅、農民曆翻譯、手相面相
- `js/strokes.js`：康熙字典筆劃表
- `js/oracles.js`：有動畫嘅占卜（銅錢、梅花、蓍草、龜甲、求籤、花瓣）
- `js/blood.js`：48型人格（星座 × 血型），同埋所有分頁共用嘅 ⓘ 說明彈窗
- `js/more.js`：誕生石、配對合盤、九星氣學、二十八宿、瑪雅曆、小六壬、盧恩符文、蛇夫座
- `js/shushu.js`：奇門遁甲、大六壬、七政四餘、印度占星
- `js/persona.js`：16型性格、九型人格、能量類型
- `js/app.js`：計算同畫面邏輯
- `js/vendor/`：第三方庫
- `img/tarot/`：22 張大阿爾克那牌圖
- `tests/smoke.js`：測試，喺 repo 根目錄行 `node tests/smoke.js`
- `CLAUDE.md`：交接筆記（Claude Code 會自動讀）

純靜態網站，可以直接放上 Cloudflare Pages 或 GitHub Pages。

## 第三方資料同授權

- [lunar-javascript](https://github.com/6tail/lunar-javascript)：農曆、節氣、八字、宜忌。MIT License，Copyright (c) 2018 6tail
- [Astronomy Engine](https://github.com/cosinekitty/astronomy)：行星位置。MIT License，Copyright (c) 2019-2025 Don Cross
- [kangxi-strokecount](https://github.com/breezyreeds/kangxi-strokecount)：康熙字典筆劃。MIT License，Copyright (c) 2017-2018 Kawai Lo
- 塔羅牌圖：Pamela Colman Smith 繪，1909 年 Rider 版（公有領域）；原裝牌掃描由 Steve P.（steve-p.org）修復
- 籤詩、塔羅牌義、卦義、符文解釋、各種性格類型名同其他解說文字為本站原創
- 16型性格唔係官方 MBTI® 測驗；能量類型只係借用人類圖（Human Design）概念嘅簡化計算，非官方
