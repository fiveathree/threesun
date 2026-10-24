/* 五行石室 — data. Edit products, meanings and translations here. */

const ST = '甲乙丙丁戊己庚辛壬癸', BR = '子丑寅卯辰巳午未申酉戌亥';
const ST_PY = ['Jia','Yi','Bing','Ding','Wu','Ji','Geng','Xin','Ren','Gui'];
const BR_PY = ['Zi','Chou','Yin','Mao','Chen','Si','Wu','Wei','Shen','You','Xu','Hai'];
const ANI_ZH = '鼠牛虎兔龍蛇馬羊猴雞狗豬';
const ANI_EN = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
const ST_EL = '木木火火土土金金水水', BR_EL = '水土木木土火火土金金土水';
const ELS = ['木','火','土','金','水'];
const EL_EN = {木:'Wood',火:'Fire',土:'Earth',金:'Metal',水:'Water'};
const GEN = {木:'火',火:'土',土:'金',金:'水',水:'木'};   // 生
const CTRL = {木:'土',土:'水',水:'火',火:'金',金:'木'};  // 剋

const T = {
 zh:{
  brand:'五行石室',brandSub:'水晶・命理・占卜',navBazi:'占卜神算',navShop:'選購',navPlace:'玄空飛星',demo:'示範網站・貨品及價錢為例子',
  heroTitle:'八字、星座、塔羅，<br>算完揀返你嘅石',
  heroText:'輸入一次出生資料，右邊五個工具都會用到。每個結果最後都會配返適合你嘅水晶。',
  fDate:'出生日期（西曆）',fHour:'出生時間',fName:'稱呼（可留空）',fNamePh:'例如：小美',fGo:'開始推算',hourUnknown:'唔知道',
  heroFine:'已填入示範生日。節氣以常用日期估算，生日接近節氣交界可能有一日誤差。所有結果屬傳統文化同娛樂參考，唔代表任何保證。',
  tabs:{bazi:'八字五行',zodiac:'星座',sx:'生肖太歲',tarot:'塔羅',today:'今日運勢'},
  shopTitle:'選購',shopText:'每件貨附 QR 卡，掃描即開返呢件貨嘅身分頁：五行、擺位、保養同批次。',
  all:'全部',bracelet:'手鏈',ornament:'擺件',elAll:'五行不限',
  placeTitle:'擺件擺邊個方位',placeText:'玄空飛星派：撳九宮格任何一格，睇嗰個方位屬咩五行（後天八卦）、2026 年飛星落喺邊，同埋係咪你本命卦嘅吉方。',
  compass:'依傳統羅盤畫法，南方喺上。用手機指南針企喺屋中間對方位。',
  foot1:'水晶、八字、星座、生肖同塔羅內容屬傳統文化同娛樂參考，唔係醫療、投資或財運保證。',
  foot2:'示範網站：貨品、價錢、批次資料均為例子，正式上線前需換成實際貨源資料。',
  foot3:'塔羅牌圖：Pamela Colman Smith 繪，1909 年 Rider 版（公有領域）；原版掃描修復：Steve P.（steve-p.org）。',
  pillars:['年柱','月柱','日柱','時柱'],unknown:'未知',
  empty:'呢個組合暫時冇貨，試下揀第二個五行。',fits:'適合你嘅八字',
  batch:'批次 2026-10（示範）',elOf:e=>`五行屬${e}`,
  dl:{mat:'物料',origin:'產地',size:'尺寸',meaning:'寓意',wear:'佩戴',place:'擺位',dir:'適合方位',care:'保養'},
  careB:'用軟布抹乾淨，避免香水同化學品。每隔一兩年換彈力繩。',careD:'用軟布抹乾淨，避免香水同化學品。定期抹塵。',
  ask:'複製查詢訊息',copied:'已複製，可貼去 LINE 或 IG 私訊',close:'關閉',
  askMsg:(n,c,p)=>`你好，我想查詢「${n}」（編號 ${c}），${p}，請問仲有冇貨？`,
  ppFine:'此頁即貨品 QR 卡打開嘅身分頁。寓意屬傳統文化說法，唔代表任何保證。',
  verdict:(who,dm,dmEl,total,missing,weak,info)=>`
   <p>${who?who+'嘅':''}日主係 <strong>${dm}${dmEl}</strong>，八個字之中共數到 ${total} 個五行。${missing.length?`八字缺 <strong>${missing.join('、')}</strong>。`:'五行齊全。'}</p>
   <p>最弱係 <strong>${weak.join('、')}</strong>，傳統建議用 <strong>${info.color}</strong> 水晶補足，寓意${info.meaning}。擺件可放 <strong>${info.dir}</strong> 方。</p>`,
  seePicks:e=>`睇屬${e}嘅水晶`,seePlace:'睇擺位',
  recsFor:'配搭水晶',
  zLead:(n,s)=>`${n?n+'係':'你係'}<span class="big">${s}</span>`,
  zFacts:{range:'日期',el:'象',ruler:'性格關鍵字'},
  zNote:'星座以太陽星座計，生日喺星座交界日子嘅朋友可能屬隔籬星座。',
  sxLead:(n,a)=>`${n?n+'屬':'你屬'}<span class="big">${a}</span>`,
  sxYear:'2026 丙午馬年（2026年2月4日至2027年2月3日）',
  sxFacts:{rel:'2026 同太歲',ally:'三合貴人',pair:'六合貴人'},
  sxRel:{zhi:'值太歲（本命年）',chong:'沖太歲',hai:'害太歲',po:'破太歲',sanhe:'三合，有助力',liuhe:'六合，有助力',none:'無直接沖合'},
  sxAdvice:{bad:'傳統建議今年行事低調啲，配戴黑曜石或白水晶護身，擺件可擺大門附近。',good:'今年有太歲助力，可以主動爭取機會，配黃水晶或鈦晶寓意聚財。',none:'今年同太歲無直接關係，按八字最弱嘅五行揀水晶就得。'},
  tQ:'心中問題（可留空）',tQPh:'例如：今年應唔應該轉工？',tDraw:'洗牌抽三張',tPos:['過去','現在','未來'],up:'正位',rev:'逆位',
  tHint:'集中諗住你嘅問題再抽。已經幫你抽咗一次示範。',
  tSum:(q)=>q?`關於「${q}」：`:'',
  todayLead:d=>`今日 ${d}`,todayDay:p=>`日柱 ${p}`,
  todayRows:['整體','事業','感情','財運'],
  todayRel:{sheng:'今日五行生你，有人撐、易遇貴人，適合求助同開新嘢。',bi:'今日五行同你一樣，精神足，適合同朋友合作，小心固執。',xie:'今日你生出去，付出多、表達力好，記得留返精力畀自己。',cai:'今日你剋今日五行，利求財同推進計劃，執行力強。',ke:'今日五行剋你，壓力較大，凡事慢半拍、多啲耐性。'},
  todayFacts:{color:'幸運色',num:'幸運數字',dir:'吉方'},
  todayNote:'今日運勢由你嘅日主同今日日柱五行推算，再加隨機成份，純屬娛樂，每日更新。',
  cellLabel:e=>`屬${e}`,cellTitle:(d,e)=>`${d}方・屬${e}`,
  pdl:{color:'適合顏色',meaning:'寓意',items:'本店擺件',star:'2026 飛星',cure:'傳統建議'},none:'暫時冇，可查詢訂貨',
  cellFit:'呢個方位屬你八字最弱嘅五行，最適合擺水晶補足。',
  fsTitle:'2026 流年飛星：一白入中',fsNote:'飛星每年立春轉換，以下適用於 2026年2月4日至2027年2月3日。',
  elName:e=>e, sep:'、'
 },
 en:{
  brand:'Five Elements Stone Room',brandSub:'Crystals · Bazi · Divination',navBazi:'Readings',navShop:'Shop',navPlace:'Flying stars',demo:'Demo site · sample products and prices',
  heroTitle:'Bazi, zodiac, tarot,<br>then the stone for you',
  heroText:'Enter your birth details once and all five readings on the right use them. Each reading ends with the crystals that suit it.',
  fDate:'Date of birth',fHour:'Time of birth',fName:'Name (optional)',fNamePh:'e.g. Mei',fGo:'Read',hourUnknown:'Not sure',
  heroFine:'A sample birthday is filled in. Solar terms use their usual dates, so a birthday right on a boundary may be one day off. All readings are cultural tradition and entertainment, not a promise of any outcome.',
  tabs:{bazi:'Bazi',zodiac:'Star sign',sx:'Chinese zodiac',tarot:'Tarot',today:'Today'},
  shopTitle:'Shop',shopText:'Every piece comes with a QR card. Scan it to open that piece’s own page: element, placement, care and batch.',
  all:'All',bracelet:'Bracelets',ornament:'Ornaments',elAll:'Any element',
  placeTitle:'Where to place an ornament',placeText:'Xuan Kong flying stars: tap any square to see its element, where the 2026 stars fall, and whether it is a good direction for your Kua.',
  compass:'Drawn the traditional way, with south at the top. Stand at the centre of your home and use your phone’s compass.',
  foot1:'Crystal, Bazi, zodiac and tarot content is cultural tradition and entertainment. It is not medical, investment or financial advice.',
  foot2:'Demo site: products, prices and batch details are examples, to be replaced with real stock before launch.',
  foot3:'Tarot art by Pamela Colman Smith, 1909 Rider edition (public domain). Scans of an original deck restored by Steve P. (steve-p.org).',
  pillars:['Year','Month','Day','Hour'],unknown:'Unknown',
  empty:'Nothing in stock for this combination. Try another element.',fits:'Suits your chart',
  batch:'Batch 2026-10 (demo)',elOf:e=>`Element: ${EL_EN[e]}`,
  dl:{mat:'Material',origin:'Origin',size:'Size',meaning:'Meaning',wear:'How to wear',place:'Placement',dir:'Best direction',care:'Care'},
  careB:'Wipe with a soft cloth and keep away from perfume and chemicals. Restring every year or two.',careD:'Wipe with a soft cloth and keep away from perfume and chemicals. Dust regularly.',
  ask:'Copy enquiry message',copied:'Copied. Paste it into LINE or an Instagram DM.',close:'Close',
  askMsg:(n,c,p)=>`Hi, I’d like to ask about the ${n} (item ${c}, ${p}). Is it still available?`,
  ppFine:'This is the page the piece’s QR card opens. Meanings follow cultural tradition and promise no outcome.',
  verdict:(who,dm,dmEl,total,missing,weak,info)=>`
   <p>${who?who+'’s':'Your'} Day Master is <strong>${dm} ${dmEl}</strong>. The chart holds ${total} element readings in all. ${missing.length?`It has no <strong>${missing.join(', ')}</strong>.`:'All five elements are present.'}</p>
   <p>The weakest is <strong>${weak.join(', ')}</strong>. Tradition suggests balancing it with <strong>${info.color}</strong> crystals, associated with ${info.meaning}. Place ornaments to the <strong>${info.dir}</strong>.</p>`,
  seePicks:e=>`See ${EL_EN[e]} crystals`,seePlace:'See placement',
  recsFor:'Matching crystals',
  zLead:(n,s)=>`${n?n+' is':'You are'}<span class="big">${s}</span>`,
  zFacts:{range:'Dates',el:'Element',ruler:'Keywords'},
  zNote:'Based on your sun sign. If you were born on a cusp day you may belong to the neighbouring sign.',
  sxLead:(n,a)=>`${n?n+' was':'You were'} born in the year of the<span class="big">${a}</span>`,
  sxYear:'2026, Year of the Fire Horse (4 Feb 2026 to 3 Feb 2027)',
  sxFacts:{rel:'Relation to 2026',ally:'Trine allies',pair:'Best match'},
  sxRel:{zhi:'Your own year (clash with Tai Sui)',chong:'Direct clash with Tai Sui',hai:'Harm with Tai Sui',po:'Break with Tai Sui',sanhe:'Trine harmony, supported',liuhe:'Six harmony, supported',none:'No direct clash or harmony'},
  sxAdvice:{bad:'Tradition suggests keeping a low profile this year. Wear obsidian or clear quartz for protection and place an ornament near the front door.',good:'The year supports you, so reach for opportunities. Citrine or rutilated quartz is associated with gathering wealth.',none:'The year neither clashes nor helps. Choose crystals for your weakest Bazi element.'},
  tQ:'Your question (optional)',tQPh:'e.g. Should I change jobs this year?',tDraw:'Shuffle and draw three',tPos:['Past','Present','Future'],up:'Upright',rev:'Reversed',
  tHint:'Hold your question in mind as you draw. A sample draw is already shown.',
  tSum:(q)=>q?`On “${q}”:`:'',
  todayLead:d=>`Today, ${d}`,todayDay:p=>`Day pillar ${p}`,
  todayRows:['Overall','Work','Love','Money'],
  todayRel:{sheng:'Today’s element feeds yours. Help comes easily, so ask for it or start something new.',bi:'Today matches your element. Plenty of energy for teamwork; watch for stubbornness.',xie:'You give out a lot today and express yourself well. Keep some energy back for yourself.',cai:'Your element masters today’s. Good for earning and pushing plans forward.',ke:'Today’s element presses on yours. Expect some pressure; slow down and be patient.'},
  todayFacts:{color:'Lucky colour',num:'Lucky number',dir:'Lucky direction'},
  todayNote:'Worked out from your Day Master and today’s day pillar, plus a little chance. For fun only; it changes daily.',
  cellLabel:e=>EL_EN[e],cellTitle:(d,e)=>`${d} · ${EL_EN[e]}`,
  pdl:{color:'Colours',meaning:'Meaning',items:'Our ornaments',star:'2026 star',cure:'Tradition suggests'},none:'None in stock, available to order',
  cellFit:'This direction carries your weakest element, so it is the best spot for a balancing crystal.',
  fsTitle:'2026 flying stars: One White in the centre',fsNote:'Flying stars move each year at the start of spring. These apply from 4 Feb 2026 to 3 Feb 2027.',
  elName:e=>EL_EN[e], sep:', '
 }
};

const EL_INFO = {
 木:{zh:{dir:'東、東南',space:'客廳東邊、書枱',color:'綠色',meaning:'生長、學習、人緣'},en:{dir:'east and south-east',space:'east of the living room, a desk',color:'green',meaning:'growth, study and good relationships'}},
 火:{zh:{dir:'南',space:'客廳南邊、工作枱',color:'紅、紫、粉色',meaning:'熱情、名聲、行動力'},en:{dir:'south',space:'south of the living room, a workbench',color:'red, purple and pink',meaning:'passion, reputation and drive'}},
 土:{zh:{dir:'中宮、西南、東北',space:'屋中央、收銀位',color:'黃、啡色',meaning:'穩定、積聚、守財'},en:{dir:'centre, south-west and north-east',space:'the centre of the home, a cash desk',color:'yellow and brown',meaning:'stability and keeping wealth'}},
 金:{zh:{dir:'西、西北',space:'玄關、辦公室西邊',color:'白、金、銀色',meaning:'決斷、貴人、清晰'},en:{dir:'west and north-west',space:'the entrance, west of an office',color:'white, gold and silver',meaning:'clarity, decisiveness and helpful people'}},
 水:{zh:{dir:'北',space:'睡房北邊、門口',color:'黑、藍色',meaning:'智慧、流動、保護'},en:{dir:'north',space:'north of the bedroom, near the door',color:'black and blue',meaning:'wisdom, flow and protection'}}
};

const PRODUCTS = [
 {id:'B01',type:'手鏈',el:'木',price:2680,c:['#4E9A6A','#BFE3C9'],
  zh:{name:'綠幽靈手鏈',size:'8mm・18顆',mat:'綠幽靈水晶',origin:'巴西',meaning:'傳統視為「正財」之石，寓意事業穩步生長。',use:'戴左手，日常佩戴。'},
  en:{name:'Green Phantom Quartz Bracelet',size:'8mm · 18 beads',mat:'Green phantom quartz',origin:'Brazil',meaning:'Traditionally a stone of steady income and career growth.',use:'Wear on the left wrist, every day.'}},
 {id:'B02',type:'手鏈',el:'木',price:1280,c:['#3E8C67','#9FD3B4'],
  zh:{name:'東菱玉手鏈',size:'8mm・20顆',mat:'東菱石',origin:'印度',meaning:'寓意平和、人緣好，適合新環境。',use:'左右手皆可。'},
  en:{name:'Green Aventurine Bracelet',size:'8mm · 20 beads',mat:'Aventurine',origin:'India',meaning:'Associated with calm and getting on with people; good for a fresh start.',use:'Either wrist.'}},
 {id:'B03',type:'手鏈',el:'火',price:1880,c:['#7A1E2A','#D9707D'],
  zh:{name:'石榴石手鏈',size:'6mm・28顆',mat:'鎂鋁榴石',origin:'莫桑比克',meaning:'寓意熱情同行動力。',use:'戴左手，洗澡前除下。'},
  en:{name:'Garnet Bracelet',size:'6mm · 28 beads',mat:'Pyrope garnet',origin:'Mozambique',meaning:'Associated with passion and drive.',use:'Left wrist. Take it off before showering.'}},
 {id:'B04',type:'手鏈',el:'火',price:3280,c:['#C9607A','#F4C3CF'],
  zh:{name:'紅紋石手鏈',size:'8mm・19顆',mat:'菱錳礦',origin:'阿根廷',meaning:'寓意溫柔、感情順利。',use:'避免碰撞，質地較軟。'},
  en:{name:'Rhodochrosite Bracelet',size:'8mm · 19 beads',mat:'Rhodochrosite',origin:'Argentina',meaning:'Associated with gentleness and love.',use:'A softer stone, so avoid knocks.'}},
 {id:'B05',type:'手鏈',el:'土',price:2280,c:['#C9922B','#F5D98A'],
  zh:{name:'黃水晶手鏈',size:'8mm・20顆',mat:'黃水晶',origin:'巴西',meaning:'傳統視為「偏財」之石，寓意積聚。',use:'戴左手。'},
  en:{name:'Citrine Bracelet',size:'8mm · 20 beads',mat:'Citrine',origin:'Brazil',meaning:'Traditionally a stone of windfalls and saving.',use:'Left wrist.'}},
 {id:'B06',type:'手鏈',el:'土',price:1080,c:['#7B5320','#D9A75A'],
  zh:{name:'虎眼石手鏈',size:'10mm・17顆',mat:'虎眼石',origin:'南非',meaning:'寓意膽量、專注。',use:'左右手皆可。'},
  en:{name:'Tiger’s Eye Bracelet',size:'10mm · 17 beads',mat:'Tiger’s eye',origin:'South Africa',meaning:'Associated with courage and focus.',use:'Either wrist.'}},
 {id:'B07',type:'手鏈',el:'金',price:6800,c:['#B08A3E','#F1DFA8'],
  zh:{name:'鈦晶手鏈',size:'10mm・17顆',mat:'金紅石髮晶',origin:'巴西',meaning:'寓意魄力、貴人運，髮絲越密越貴。',use:'戴左手，避免同其他手鏈互擦。'},
  en:{name:'Golden Rutilated Quartz Bracelet',size:'10mm · 17 beads',mat:'Rutilated quartz',origin:'Brazil',meaning:'Associated with confidence and helpful people. Denser needles are more prized.',use:'Left wrist. Keep apart from other bracelets.'}},
 {id:'B08',type:'手鏈',el:'金',price:980,c:['#C9CED6','#FFFFFF'],
  zh:{name:'白水晶手鏈',size:'8mm・20顆',mat:'白水晶',origin:'巴西',meaning:'寓意淨化、清晰，百搭入門款。',use:'左右手皆可。'},
  en:{name:'Clear Quartz Bracelet',size:'8mm · 20 beads',mat:'Clear quartz',origin:'Brazil',meaning:'Associated with clarity. An easy first piece that goes with anything.',use:'Either wrist.'}},
 {id:'B09',type:'手鏈',el:'水',price:980,c:['#1E1E24','#6B6E80'],
  zh:{name:'黑曜石手鏈',size:'10mm・17顆',mat:'黑曜岩',origin:'墨西哥',meaning:'傳統視為護身之石，寓意擋走負能量。',use:'戴右手。'},
  en:{name:'Obsidian Bracelet',size:'10mm · 17 beads',mat:'Obsidian',origin:'Mexico',meaning:'Traditionally a protective stone that keeps bad energy away.',use:'Right wrist.'}},
 {id:'B10',type:'手鏈',el:'水',price:2480,c:['#6FA6C4','#D6ECF6'],
  zh:{name:'海藍寶手鏈',size:'7mm・24顆',mat:'綠柱石',origin:'巴西',meaning:'寓意溝通順暢、心情平靜。',use:'避免長時間曝曬，會褪色。'},
  en:{name:'Aquamarine Bracelet',size:'7mm · 24 beads',mat:'Beryl',origin:'Brazil',meaning:'Associated with clear communication and calm.',use:'Keep out of strong sun, which fades it.'}},
 {id:'D01',type:'擺件',shape:'geode',el:'火',price:12800,c:['#6B3F94','#C9A6E8'],
  zh:{name:'紫水晶洞（小）',size:'高約 22cm・3.2kg',mat:'紫水晶',origin:'烏拉圭',meaning:'傳統用作「聚氣」，寓意守財、助讀書。',use:'洞口向屋內，擺客廳南邊或收銀位。'},
  en:{name:'Amethyst Geode (Small)',size:'About 22cm tall · 3.2kg',mat:'Amethyst',origin:'Uruguay',meaning:'Traditionally gathers energy; associated with keeping wealth and study.',use:'Opening facing into the room, south of the living room or by the till.'}},
 {id:'D02',type:'擺件',shape:'cluster',el:'金',price:3600,c:['#BFC6D1','#FFFFFF'],
  zh:{name:'白水晶簇',size:'約 12×9cm・480g',mat:'白水晶',origin:'巴西',meaning:'寓意淨化空間、提升專注。',use:'擺玄關或書枱西邊。'},
  en:{name:'Clear Quartz Cluster',size:'About 12×9cm · 480g',mat:'Clear quartz',origin:'Brazil',meaning:'Associated with clearing a space and focus.',use:'At the entrance or west side of a desk.'}},
 {id:'D03',type:'擺件',shape:'sphere',el:'土',price:4200,c:['#C79226','#F8DE8E'],
  zh:{name:'黃水晶球 6cm',size:'直徑 6cm・連木座',mat:'黃水晶',origin:'巴西',meaning:'寓意財氣圓滿、積聚。',use:'擺屋中央或西南方，避免猛烈陽光直射。'},
  en:{name:'Citrine Sphere 6cm',size:'6cm across · with wooden stand',mat:'Citrine',origin:'Brazil',meaning:'Associated with complete, well-kept wealth.',use:'Centre or south-west of the home, out of strong sun.'}},
 {id:'D04',type:'擺件',shape:'pyramid',el:'木',price:3980,c:['#4B8F62','#C6E6CF'],
  zh:{name:'綠幽靈金字塔',size:'底 6cm・高 5cm',mat:'綠幽靈水晶',origin:'巴西',meaning:'寓意事業有方向、穩步向上。',use:'擺書枱或辦公枱東邊。'},
  en:{name:'Green Phantom Pyramid',size:'6cm base · 5cm tall',mat:'Green phantom quartz',origin:'Brazil',meaning:'Associated with career direction and steady progress.',use:'East side of a desk.'}},
 {id:'D05',type:'擺件',shape:'sphere',el:'水',price:2800,c:['#1A1A20','#5C6075'],
  zh:{name:'黑曜石球 8cm',size:'直徑 8cm・連木座',mat:'黑曜岩',origin:'墨西哥',meaning:'傳統用作鎮宅、擋煞。',use:'擺大門附近或北方。'},
  en:{name:'Obsidian Sphere 8cm',size:'8cm across · with wooden stand',mat:'Obsidian',origin:'Mexico',meaning:'Traditionally guards the home.',use:'Near the front door or to the north.'}}
];

/* Western sun signs. start = month*100+day. Crystal pairings are common popular associations. */
const ZODIAC = [
 {start:120,sym:'♒︎',el:'風',elEn:'Air',zh:'水瓶座',en:'Aquarius',range:['1月20日–2月18日','20 Jan – 18 Feb'],kw:['獨立、創新、重視自由','Independent, inventive, free-spirited'],rec:['D01','B10']},
 {start:219,sym:'♓︎',el:'水',elEn:'Water',zh:'雙魚座',en:'Pisces',range:['2月19日–3月20日','19 Feb – 20 Mar'],kw:['溫柔、直覺強、富想像力','Gentle, intuitive, imaginative'],rec:['B10','B08']},
 {start:321,sym:'♈︎',el:'火',elEn:'Fire',zh:'白羊座',en:'Aries',range:['3月21日–4月19日','21 Mar – 19 Apr'],kw:['衝勁、直接、愛挑戰','Bold, direct, loves a challenge'],rec:['B03','B06']},
 {start:420,sym:'♉︎',el:'土',elEn:'Earth',zh:'金牛座',en:'Taurus',range:['4月20日–5月20日','20 Apr – 20 May'],kw:['穩重、務實、重享受','Steady, practical, enjoys comfort'],rec:['B02','B04']},
 {start:521,sym:'♊︎',el:'風',elEn:'Air',zh:'雙子座',en:'Gemini',range:['5月21日–6月20日','21 May – 20 Jun'],kw:['好奇、口才好、多變','Curious, quick-witted, adaptable'],rec:['B05','B08']},
 {start:621,sym:'♋︎',el:'水',elEn:'Water',zh:'巨蟹座',en:'Cancer',range:['6月21日–7月22日','21 Jun – 22 Jul'],kw:['顧家、細心、重感情','Caring, attentive, home-loving'],rec:['B08','B04']},
 {start:723,sym:'♌︎',el:'火',elEn:'Fire',zh:'獅子座',en:'Leo',range:['7月23日–8月22日','23 Jul – 22 Aug'],kw:['自信、慷慨、有領導力','Confident, generous, a natural leader'],rec:['B07','B06']},
 {start:823,sym:'♍︎',el:'土',elEn:'Earth',zh:'處女座',en:'Virgo',range:['8月23日–9月22日','23 Aug – 22 Sep'],kw:['細緻、有條理、追求完美','Precise, organised, a perfectionist'],rec:['B10','B02']},
 {start:923,sym:'♎︎',el:'風',elEn:'Air',zh:'天秤座',en:'Libra',range:['9月23日–10月22日','23 Sep – 22 Oct'],kw:['重和諧、有品味、善交際','Fair-minded, stylish, sociable'],rec:['B04','D02']},
 {start:1023,sym:'♏︎',el:'水',elEn:'Water',zh:'天蠍座',en:'Scorpio',range:['10月23日–11月21日','23 Oct – 21 Nov'],kw:['專注、深情、意志強','Intense, loyal, strong-willed'],rec:['B09','B03']},
 {start:1122,sym:'♐︎',el:'火',elEn:'Fire',zh:'射手座',en:'Sagittarius',range:['11月22日–12月21日','22 Nov – 21 Dec'],kw:['樂觀、愛自由、好奇心強','Optimistic, adventurous, curious'],rec:['D01','B01']},
 {start:1222,sym:'♑︎',el:'土',elEn:'Earth',zh:'山羊座',en:'Capricorn',range:['12月22日–1月19日','22 Dec – 19 Jan'],kw:['踏實、有野心、肯捱','Grounded, ambitious, hard-working'],rec:['B03','B06']}
];
const ZODIAC_EL_ZH = {風:'風象',水:'水象',火:'火象',土:'土象'};

/* 2026 丙午 relations, keyed by birth-year branch index */
const TAISUI_2026 = {6:'zhi',0:'chong',1:'hai',3:'po',2:'sanhe',10:'sanhe',7:'liuhe'};
const SANHE = [[8,0,4],[11,3,7],[2,6,10],[5,9,1]];
const LIUHE = {0:1,1:0,2:11,11:2,3:10,10:3,4:9,9:4,5:8,8:5,6:7,7:6};

/* Major Arcana. Meanings written for this site. */
const TAROT = [
 {n:'0',sym:'◯',zh:'愚者',en:'The Fool',up:['新開始、放膽一試','A fresh start; take the leap'],rv:['衝動、未準備好','Rash, not quite ready'],rec:'B08'},
 {n:'I',sym:'✦',zh:'魔術師',en:'The Magician',up:['資源齊備、即刻行動','You have what you need; act now'],rv:['欠方向、有心無力','Scattered, all talk'],rec:'B07'},
 {n:'II',sym:'☾',zh:'女祭司',en:'The High Priestess',up:['相信直覺、靜觀其變','Trust your intuition; watch and wait'],rv:['忽略內心聲音','Ignoring your inner voice'],rec:'B10'},
 {n:'III',sym:'✿',zh:'皇后',en:'The Empress',up:['豐盛、被照顧','Abundance and being cared for'],rv:['過度付出、依賴','Over-giving, dependence'],rec:'B04'},
 {n:'IV',sym:'▣',zh:'皇帝',en:'The Emperor',up:['建立秩序、負起責任','Build structure; take charge'],rv:['控制欲過強','Too much control'],rec:'B06'},
 {n:'V',sym:'✚',zh:'教皇',en:'The Hierophant',up:['聽取前輩意見','Seek guidance from experience'],rv:['墨守成規','Stuck in convention'],rec:'D02'},
 {n:'VI',sym:'♡',zh:'戀人',en:'The Lovers',up:['重要選擇、關係和諧','An important choice; harmony'],rv:['猶豫不決、關係失衡','Indecision, imbalance'],rec:'B04'},
 {n:'VII',sym:'➤',zh:'戰車',en:'The Chariot',up:['決心、勇往直前','Determination; full speed ahead'],rv:['失去控制','Losing control'],rec:'B03'},
 {n:'VIII',sym:'∞',zh:'力量',en:'Strength',up:['耐性、柔中帶剛','Patience and quiet strength'],rv:['自我懷疑','Self-doubt'],rec:'B06'},
 {n:'IX',sym:'✧',zh:'隱者',en:'The Hermit',up:['反思、獨處找答案','Reflect; find answers alone'],rv:['封閉、孤立','Withdrawn, isolated'],rec:'D01'},
 {n:'X',sym:'⊕',zh:'命運之輪',en:'Wheel of Fortune',up:['轉機到、順勢而行','A turn for the better; go with it'],rv:['時機未到','Not the right time yet'],rec:'B05'},
 {n:'XI',sym:'≡',zh:'正義',en:'Justice',up:['公平、有因有果','Fairness; cause and effect'],rv:['偏頗、唔公平','Bias, unfairness'],rec:'B08'},
 {n:'XII',sym:'⟲',zh:'吊人',en:'The Hanged Man',up:['暫停、換個角度睇','Pause; see it another way'],rv:['拖延、白白犧牲','Stalling, needless sacrifice'],rec:'B10'},
 {n:'XIII',sym:'✕',zh:'死神',en:'Death',up:['結束舊階段、迎接轉變','One chapter closes; change arrives'],rv:['抗拒改變','Resisting change'],rec:'B09'},
 {n:'XIV',sym:'⧖',zh:'節制',en:'Temperance',up:['平衡、慢慢調和','Balance; blend things slowly'],rv:['過度、失衡','Excess, imbalance'],rec:'D01'},
 {n:'XV',sym:'⊗',zh:'惡魔',en:'The Devil',up:['慾望、被束縛','Temptation; feeling bound'],rv:['擺脫束縛','Breaking free'],rec:'D05'},
 {n:'XVI',sym:'↯',zh:'高塔',en:'The Tower',up:['突變、打破舊局','Sudden change; old structures fall'],rv:['險險避過','A narrow escape'],rec:'B09'},
 {n:'XVII',sym:'★',zh:'星星',en:'The Star',up:['希望、重拾信心','Hope; confidence returns'],rv:['失去信心','Losing faith'],rec:'B10'},
 {n:'XVIII',sym:'☽',zh:'月亮',en:'The Moon',up:['不安、真相未明','Uncertainty; not all is clear'],rv:['迷霧漸散','The fog lifts'],rec:'D02'},
 {n:'XIX',sym:'☼',zh:'太陽',en:'The Sun',up:['成功、開心','Success and joy'],rv:['喜事遲啲到','Joy, but delayed'],rec:'D03'},
 {n:'XX',sym:'⟡',zh:'審判',en:'Judgement',up:['覺醒、重新評估','Awakening; take stock'],rv:['對自己太苛刻','Too hard on yourself'],rec:'B08'},
 {n:'XXI',sym:'◎',zh:'世界',en:'The World',up:['完成、圓滿','Completion and fulfilment'],rv:['差少少未完成','Not quite finished'],rec:'D04'}
];

/* 九宮, south on top. fs = 2026 flying star. */
const STARS = {
 1:{zh:'一白貪狼',en:'1 White',good:true,mzh:'人緣、桃花、升遷',men:'Popularity, romance, promotion',czh:'保持整潔明亮，可擺白水晶。',cen:'Keep it bright and tidy; clear quartz suits it.',rec:'D02'},
 2:{zh:'二黑病符',en:'2 Black',good:false,mzh:'傳統主健康欠佳',men:'Traditionally linked to poor health',czh:'傳統用金屬物化解，可擺白水晶簇，少喺此位久坐。',cen:'Traditionally countered with metal; a clear quartz cluster suits it. Avoid sitting here for long.',rec:'D02'},
 3:{zh:'三碧祿存',en:'3 Jade',good:false,mzh:'口舌是非',men:'Arguments and gossip',czh:'傳統用紅色或火元素化解，可擺紫水晶洞。',cen:'Traditionally countered with red or Fire; an amethyst geode suits it.',rec:'D01'},
 4:{zh:'四綠文曲',en:'4 Green',good:true,mzh:'文昌、讀書、考試',men:'Study and exams',czh:'適合擺書枱，可擺綠幽靈金字塔。',cen:'A good spot for a desk; a green phantom pyramid suits it.',rec:'D04'},
 5:{zh:'五黃廉貞',en:'5 Yellow',good:false,mzh:'傳統視為最凶，主意外',men:'Traditionally the most troublesome star',czh:'避免動土、保持安靜，傳統用金屬物化解，可擺白水晶簇。',cen:'Avoid renovation here and keep it quiet; tradition counters it with metal, such as a clear quartz cluster.',rec:'D02'},
 6:{zh:'六白武曲',en:'6 White',good:true,mzh:'權力、偏財',men:'Authority and windfalls',czh:'可擺鈦晶或白水晶。',cen:'Rutilated or clear quartz suits it.',rec:'D02'},
 7:{zh:'七赤破軍',en:'7 Red',good:false,mzh:'破財、防盜',men:'Loss and theft',czh:'傳統用水元素化解，可擺黑曜石球。',cen:'Traditionally countered with Water; an obsidian sphere suits it.',rec:'D05'},
 8:{zh:'八白左輔',en:'8 White',good:true,mzh:'正財、置業',men:'Steady wealth and property',czh:'財位，可擺黃水晶球。',cen:'The wealth spot; a citrine sphere suits it.',rec:'D03'},
 9:{zh:'九紫右弼',en:'9 Purple',good:true,mzh:'喜慶、姻緣',men:'Celebrations and marriage',czh:'保持明亮，可擺紫水晶洞。',cen:'Keep it bright; an amethyst geode suits it.',rec:'D01'}
};
const CELLS = [
 {el:'木',fs:9,zh:{dir:'東南',tip:'書枱或客廳東南角，適合綠幽靈金字塔、綠色水晶簇。'},en:{dir:'South-east',tip:'A desk or the south-east corner of the living room. Suits a green phantom pyramid or green clusters.'}},
 {el:'火',fs:5,zh:{dir:'南',tip:'客廳南邊、工作枱，適合紫水晶洞、紅色系擺件。'},en:{dir:'South',tip:'South of the living room or a workbench. Suits an amethyst geode or red pieces.'}},
 {el:'土',fs:7,zh:{dir:'西南',tip:'適合黃水晶球、虎眼石擺件。'},en:{dir:'South-west',tip:'Suits a citrine sphere or tiger’s eye pieces.'}},
 {el:'木',fs:8,zh:{dir:'東',tip:'正東適合綠色水晶，寓意家人健康、學業。'},en:{dir:'East',tip:'Green crystals here are associated with family wellbeing and study.'}},
 {el:'土',fs:1,zh:{dir:'中宮',tip:'屋中央宜保持整潔，可擺黃水晶球或茶晶。'},en:{dir:'Centre',tip:'Keep the centre of the home tidy. A citrine sphere or smoky quartz suits it.'}},
 {el:'金',fs:3,zh:{dir:'西',tip:'適合白水晶簇、鈦晶擺件。'},en:{dir:'West',tip:'Suits a clear quartz cluster or rutilated quartz.'}},
 {el:'土',fs:4,zh:{dir:'東北',tip:'適合黃色系或啡色系水晶，寓意穩定。'},en:{dir:'North-east',tip:'Yellow or brown crystals here are associated with stability.'}},
 {el:'水',fs:6,zh:{dir:'北',tip:'睡房北邊或大門附近，適合黑曜石球、海藍寶。'},en:{dir:'North',tip:'North of the bedroom or near the front door. Suits an obsidian sphere or aquamarine.'}},
 {el:'金',fs:2,zh:{dir:'西北',tip:'辦公室西北，適合白水晶、鈦晶，寓意貴人。'},en:{dir:'North-west',tip:'North-west of an office. Clear or rutilated quartz here is associated with helpful people.'}}
];
