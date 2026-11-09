# 五行石室 threesun — 交接筆記

呢份係畀接手嘅 Claude（Claude Code）睇嘅工作筆記。開工前先讀晒。

## 項目係咩

水晶手鏈同擺件網店嘅**示範網站**，中英雙語。用家輸入一次出生資料，網站提供十幾種命理、占卜、風水推算，**每個結果最尾都配返適合嘅水晶**，撳落去開貨品「身分頁」（將來每件貨會有 QR 卡連去呢頁）。

- 擁有人有水晶、真鑽、假鑽、玻璃首飾貨源，呢個網站係測試「網站 add value 令人更願意買」嘅構思。
- 貨品、價錢、產地、批次全部係**示範例子**，正式上線前要換成真貨資料同相片。
- Repo：`fiveathree/threesun`，branch `main`。純靜態網站，冇 build step，冇後端。
- 打算放上 Cloudflare Pages（未設定）。

## 同擁有人合作要知

- 擁有人**唔係技術人員**。教佢做任何設定（Cloudflare、GitHub Pages 等）要由頭一步一步講，唔好假設佢記得之前做過。
- 介面上嘅按鈕、選單名要寫**而家實際嘅名**，寫錯或者過時佢會好煩。
- 用**廣東話**同佢傾。網站中文介面亦用廣東話口語（「撳」、「睇」、「唔知道」），繁體字。
- 佢鍾意直接叫你「全做，做完直接 push」。做完要 commit 同 push 上 `main`。

## 檔案結構

```
index.html            頁面骨架（全部文字由 JS 填入，見 data-t 屬性）
css/style.css         全部樣式；顏色用 :root token，有 light/dark 兩套
js/vendor/lunar.js    lunar-javascript（農曆、節氣、八字、宜忌）MIT
js/vendor/astronomy.min.js  Astronomy Engine（行星位置）MIT
js/strokes.js         康熙字典筆劃表（U+4E00–U+9FFF，每字一個 char，值 = charCode - 48）MIT
js/data.js            貨品 PRODUCTS、介面文字 T、五行 EL_INFO、星座 ZODIAC、塔羅 TAROT、
                      2026 太歲、九宮 CELLS、流年飛星 STARS
js/data2.js           T2 文字、出生地 PLACES、紫微、生命靈數、姓名學、八宅 KUA、
                      易經 TRIGRAMS/KW/HEX、籤詩 QIAN、手相面相、農民曆簡轉繁同英譯
js/oracles.js         有動畫嘅占卜：金錢卦、梅花易數、蓍草占、龜甲占、求籤、數花瓣
js/blood.js           48型人格（BLOOD48、T4、paneBlood），同埋共用 ⓘ 彈窗 infoTip() / wireTips()
js/more.js            T5：誕生石、配對合盤、九星氣學、二十八宿、瑪雅曆、小六壬、盧恩符文、蛇夫座 ophFact()
js/shushu.js          T6：奇門遁甲、大六壬、七政四餘、印度占星；skyAt() 計行星黃經同上升
js/persona.js         T7：16型性格、九型人格、能量類型（人類圖概念）
js/app.js             主程式：計算、各分頁 pane（包括玄空飛星九宮）、商店、貨品頁、啟動
img/tarot/00–21.jpg   22 張大阿爾克那（1909 Rider 原版掃描，公有領域）
favicon.svg / favicon-32.png / apple-touch-icon.png
tests/smoke.js        無頭測試
```

**Script 載入次序有關係**（見 `index.html` 底部）：vendor → strokes → data → data2 → oracles → blood → more → shushu → persona → app。
- `blood.js`、`more.js`、`shushu.js`、`persona.js` 同 `oracles.js` 一樣：頂層將 `T4`–`T7` 併入 `T2`（`tabs` 同 `groups` 係合併，唔係覆蓋），再將分頁加入 `ORACLE_PANES` / `ORACLE_WIRE`，所以一定要喺 oracles 之後、app 之前載入。後面嘅檔案會用前面嘅嘢（例如 `shushu.js` 用 `more.js` 嘅 `lunarOf`、`KE`）。
- **ⓘ 說明**：長說明唔好直接放頁面，用 `infoTip(標籤, 文字)` 放喺標題旁邊；`renderPane()` 尾會自動 `wireTips(pane)`。彈窗按文字大小、唔使 scroll、會自動貼返入畫面。
- 喺 OneDrive 資料夾**唔好用 `git stash`**：OneDrive 鎖住檔案會令 stash pop 只還原一半。
- `oracles.js` 喺 `app.js` 之前載入，佢喺頂層將 `T3` 併入 `T2`；佢嘅函數用 `app.js` 嘅 helper（`t`、`block`、`recList`…），但只喺函數入面用，所以冇問題。
- `app.js` 第一行將 `T2` 併入 `T`。
- 所有 script 都係 classic script，頂層 `const`/`let` 共用同一個全域範圍：**新變數唔可以同其他檔案撞名**，否則成個頁面 SyntaxError。

## 點樣運作

- **語言**：`T.zh` / `T.en`，用 `t('key')` 攞。有啲係函數（例如 `t('verdict')(...)`）。加新文字要中英兩邊都加。`#en` hash 打開英文版；揀過嘅語言存 `localStorage`（`wx-lang`）。
- **分頁**：`GROUPS`（app.js）定義七大類同細項：
  - 命理 `bazi ziwei life name nine stone`
  - 星象 `astro sx xiu qizheng vedic maya`
  - 性格・配對 `blood mbti ennea hd match`
  - 占卜 `tarot rune iching meihua yarrow turtle qian petal`
  - 術數 `qimen liuren xlr`
  - 風水 `kua xuankong almanac today`
  - 相學 `palm`
- **加新分頁**：寫 `paneXxx()` 回傳 HTML string → 加入 `renderPane()` 嘅 `P` map（或者 `oracles.js` 嘅 `ORACLE_PANES`）→ 要綁事件就加 `ORACLE_WIRE[key] = pane => {...}` → `T.zh.tabs` / `T.en.tabs` 加名 → 加入 `GROUPS`。
- 每次 render 都係成個 pane `innerHTML` 重寫，事件喺 `renderPane()` 尾重新綁。動畫做法：喺現有 DOM 做完動畫，再更新 state 同 `renderPane()` 出靜態結果。
- **配水晶**：`recList([產品id...])`；`recsOfEl(五行, n)` 攞某五行嘅貨。每個結果都應該以 `recList` 收尾。
- **五行顏色**：外層加 class `el-木` 等，入面用 `var(--c)` / `var(--cb)`。`block(el, html)` 會包好。
- `pickEl` = 八字最弱五行，好多地方用嚟推介。

## 推算方法同已核對嘅嘢

- **八字**：用 lunar-javascript `getEightChar()`（節氣按天文計）。冇時間就時柱顯示未知。舊嘅簡化版 `baziSimple()` 只係 fallback。
- **紫微斗數**（`ziwei()`）：自己寫嘅安星法，唔係用 iztro。已用 1986-03-15 10:00（巳時）核對：命宮戊戌、木三局、紫微貪狼在卯、天府在丑、丙年四化（天同祿、天機權、文昌科、廉貞忌），同傳統排法一致。有十四主星、文昌文曲左輔右弼魁鉞、祿存羊陀、天馬、生年四化。**未做**：星曜亮度、大限流年、火星鈴星、地空地劫。閏月下半月當下個月；23:00 後當翌日。
- **星盤**：Astronomy Engine 計行星黃經；上升星座自己用 RAMC 公式計（`paneAstro`）。出生地時區用標準時間，未處理台港 1979 年前嘅夏令時間（頁面有註明）。
- **生命靈數**：生日數字加總，台灣常用九宮格連線同空缺數。
- **姓名學**：康熙筆劃五格（天人地外總）、81 數理吉凶表、三才。數字字（一至十）按數值計。
- **八宅本命卦**：按立春年同性別；公式喺 `kuaOf()`，已用 1986 男 = 坤 2、女 = 坎 1、2000 男 = 離 9、女 = 乾 6 核對。九宮擺位亦顯示本命卦吉凶。
- **農民曆**：lunar-javascript 嘅宜忌（簡體）經 `toTrad()` 轉繁體；英文翻譯喺 `YIJI_EN`，冇翻譯就顯示中文。
- **九星氣學**（`nine`）：本命星 = 立春年，`mod(1 - (年 - 2026) - 1, 9) + 1`（2026 一白、1986 五黃）；月命星按月支同本命星組別（1/4/7 寅月起八白、3/6/9 起五黃、2/5/8 起二黑）逆行。已同 lunar.js `getYearNineStar()` / `getMonthNineStar()` 核對。2026 運勢按本命星今年飛到邊宮（`CELLS[].fs`），**每年立春要同飛星一齊更新**。
- **二十八宿**（`xiu`）：lunar.js `getXiu()` 等（簡體，經 `toTrad()`），即值日星宿，唔係日本宿曜 27 宿。
- **瑪雅曆**（`maya`）：13 月亮曆（Dreamspell）計法，2 月 29 日唔計；基準 2013-07-26 = Kin 164，已核對 2012-12-21 = Kin 207。
- **小六壬**（`xlr`）：大安起農曆月，再起日、時（子 = 1）。1986-03-15 巳時（農曆二月初六）= 空亡。
- **配對合盤**（`match`）：星座元素、生肖（六合三合相沖相害）、日主五行生剋三項平均。
- **蛇夫座**：`sign13()` 用國際天文聯會星座邊界日期，喺星盤分頁顯示做一個 fact。
- **奇門遁甲**（`qimen`）：時家、轉盤、拆補法。節氣用 `getPrevJieQi(false)`（精確時間），符頭地支子午卯酉上元、寅申巳亥中元、辰戌丑未下元。已人手核對 1986-03-15 10:00：驚蟄中元陽遁 7 局、甲寅旬癸儀、值符天沖移到東南、值使傷門移到西北。
- **大六壬**（`liuren`）：月將按中氣（雨水後亥將）、四課、三傳。簡化：涉害只按孟仲季、冇十二天將、別責八專當普通課。1986-03-15 巳時：返吟、比用、初傳午。
- **七政四餘**（`qizheng`）：宮用回歸黃道十二宮（中氣分宮），宿用漢代古度由角宿一（J2000 黃經 203.84°）推，屬近似。羅睺 = 北交點，計都 = 南交點，月孛 = 平遠地點，紫氣未列。命宮要出生時間。
- **印度占星**（`vedic`）：Lahiri 歲差 `23.857 + 0.013969 × (年 - 2000)`，月宿 27 分、每宿 4 pada，Vimshottari 大運。
- **16型性格 / 九型人格**：本站自寫問卷，答案存 `localStorage`（`wx-16`、`wx-ennea`）。唔好用「MBTI」做分頁名，亦唔好用 16Personalities 嘅類型名。
- **能量類型**（`hd`）：人類圖概念。13 個天體（日、地、月、南北交點、水至冥王星）喺出生時同太陽倒退 88° 時（`SearchSunLongitude`）嘅位置對應 64 閘門（閘門 41 由黃經 302° 起，`HD_WHEEL`），36 條通道決定中心定義，再判斷類型、權威、人生角色。交點用平交點，未同官方軟件核對。唔好用「Human Design」做分頁名。
- **48型人格**（星象分頁 `blood`）：12 星座 × 4 血型。星座用 `sunSign()`，血型喺分頁入面揀（存 `localStorage` `wx-blood`），下面有 48 格一覽可以撳去睇其他類型。類型名同解說全部本站原創；血型性格冇科學根據，說明放喺 ⓘ 彈窗（hover 或撳開，唔使 scroll，會自動貼返入畫面）。配水晶 = 星座 `rec` + `BLOOD_INFO[血型].rec`。
- **玄空飛星**（風水分頁 `xuankong`，`paneXuankong()`）：九宮格（南方喺上）。每格顯示方位五行（後天八卦）、2026 流年飛星同化解建議、用家八宅本命卦嘅吉凶。撳格用 `showCell()` 原地更新；`renderLuoshu()` / `showCell()` 喺分頁唔喺畫面時會直接 return。八字分頁嘅「睇擺位」掣同頂部導覽「玄空飛星」都用 `openXuankong(cell)` 打開。
- **2026 流年飛星**：一白入中，五黃在南、二黑在西北（`CELLS[].fs`，飛星內容喺 `STARS`）。**每年立春要更新**，同 `TAISUI_2026`、`sxYear`、`fsTitle`、`fsNote` 文字一齊改。
- **蓍草占**：完整大衍之數 49 根、十八變。3000 次模擬嘅比例接近傳統 1:5:7:3。
- **梅花易數**：農曆年支 + 月 + 日 → 上卦；再加時支 → 下卦；總數除 6 → 動爻。有本卦、互卦、變卦同體用生剋。

## 版權同原創內容（重要）

- 塔羅牌圖：**只可以用 1909 原版**（Pamela Colman Smith，公有領域）。**唔好用 U.S. Games 1971 年重新上色版**（角落有「©1971 U.S. Games」，仍有版權）。而家嘅掃描來自 steve-p.org 修復嘅原裝 Pam-A 牌。「Rider-Waite」喺部分地方係商標，唔好用嚟做產品名。
- 籤詩、塔羅牌義、卦義、所有解說文字都係**本站原創**。唔好抄廟宇籤文、塔羅書或者網上解卦文字。
- 水晶寓意要寫「傳統說法」、「寓意」，**唔好寫保證效果**（招財、治病），台灣廣告法有規管。
- 第三方庫出處寫喺 `README.md`，加新庫要更新。

## 測試

```
node tests/smoke.js
```

用假 DOM 喺 Node 跑晒每個分頁（中英兩邊），再試冇出生時間嘅情況。佢**唔會**測動畫同 canvas（龜甲），呢啲要喺真瀏覽器睇。改完任何 JS 都要跑一次。

## 未做 / 下一步

- 動畫（銅錢、籤筒、筊杯、蓍草、龜甲、花瓣）未喺真瀏覽器同手機測過。
- 每件貨嘅專屬網址（例如 `#CR-B01`）同 QR 卡，未做。
- 後台畀擁有人自己加貨、上載相片，未做。
- 部署去 Cloudflare Pages，未做（教佢設定時要一步步講）。
- 紫微：亮度、大限、更多輔星。
- 舊版本仲有一份單一檔案版本喺 Claude 嘅示範頁（artifact），之後以 repo 為準。

## Commit

Commit 訊息用英文，簡單講改咗咩。Commit 尾要加：

```
Co-Authored-By: Claude <noreply@anthropic.com>
```
