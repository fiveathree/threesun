/* 五行石室 — data for the extra readings. All interpretive text written for this site. */

const T2 = {
 zh:{
  heroTitle:'命理、星象、占卜、風水，<br>算完揀返你嘅石',
  heroText:'輸入一次出生資料，十幾種推算都會用到。每個結果最後都會配返適合你嘅水晶。',
  heroFine:'已填入示範資料。八字同節氣按天文曆法計算。所有結果屬傳統文化同娛樂參考，唔代表任何保證。',
  fTime:'出生時間',fNoTime:'唔知道出生時間',fGender:'性別',female:'女',male:'男',fPlace:'出生地',
  groups:{fate:'命理',stars:'星象',div:'占卜',fs:'風水',phys:'相學'},
  tabs:{bazi:'八字五行',ziwei:'紫微斗數',life:'生命靈數',name:'姓名學',astro:'星盤',sx:'生肖太歲',tarot:'塔羅',iching:'金錢卦',qian:'求籤',kua:'八宅本命卦',xuankong:'玄空飛星',almanac:'農民曆',today:'今日運勢',palm:'手相面相'},
  needTime:'呢個推算需要出生時間。喺左邊填返時間，再撳「開始推算」。',
  /* ziwei */
  zwLead:(n,s)=>`${n?n+'嘅':''}命宮主星：<span class="big">${s}</span>`,
  zwEmpty:'命宮無主星，借對宮（遷移宮）星曜嚟睇。',
  zwFacts:{ju:'五行局',ming:'命宮',shen:'身宮',lunar:'農曆生日'},
  zwNote:'只排十四主星、六吉星、祿存羊陀、天馬同生年四化，未計亮度同大限。閏月下半月當下一個月計，晚上 11 點後當第二日計。',
  /* life path */
  lpLead:(n,x)=>`${n?n+'嘅':'你嘅'}生命靈數<span class="big">${x}</span>`,
  lpGrid:'生日數字九宮格',lpLines:'連線',lpMissing:'空缺數',lpNone:'冇',lpNoLine:'冇完整連線',
  lpNote:'將西曆生日每個數字加埋，加到得一位數為止。11、22、33 係大師數。',
  /* name */
  nmSur:'姓',nmGiven:'名',nmGo:'計筆劃',nmSurPh:'例如：林',nmGivenPh:'例如：雅琪',
  nmGrids:{tian:'天格',ren:'人格',di:'地格',wai:'外格',zong:'總格'},
  nmRole:{tian:'祖上、家運',ren:'主運、性格',di:'前運、少年',wai:'副運、人際',zong:'後運、中晚年'},
  nmLuck:{ji:'吉',ban:'半吉',xiong:'凶'},
  nmSancai:'三才（天、人、地）',nmRel:{sheng:'相生',ke:'相剋',same:'比和'},
  nmMiss:c=>`「${c}」未有筆劃資料，請換個字或者用繁體字。`,
  nmNote:'筆劃按康熙字典計（例如「氵」計水 4 劃）。數字字按數值計。不同姓名學派別計法略有不同。',
  nmSum:(good,total)=>`五格之中有 ${good} 格屬吉（共 ${total} 格）。`,
  /* astro */
  astLead:(n,s,m,a)=>`太陽${s}・月亮${m}${a?'・上升'+a:''}`,
  astPlanets:{sun:'太陽',moon:'月亮',mercury:'水星',venus:'金星',mars:'火星',jupiter:'木星',saturn:'土星',asc:'上升'},
  astRole:{sun:'核心自我',moon:'情緒、內心',mercury:'思考、溝通',venus:'愛情、美感',mars:'行動、衝勁',jupiter:'幸運、擴展',saturn:'責任、考驗',asc:'第一印象'},
  astNoAsc:'上升星座需要準確出生時間同地點。',
  astNote:'行星位置用 Astronomy Engine 計算。出生地時區以標準時間計；台灣同香港 1979 年前部分年份有夏令時間，嗰啲年出生要自行減一個鐘。',
  /* iching */
  icToss:'擲六次銅錢起卦',icHint:'心中默念問題，撳掣擲六次（三個銅錢一次）。已經幫你起咗一個示範卦。',
  icLines:'卦爻（由下而上）',icChange:'變卦',icNoChange:'冇變爻，以本卦為準。',icMoving:n=>`${n} 個變爻`,
  icUpper:'上卦',icLower:'下卦',
  /* qian */
  qDraw:'搖籤筒',qThrow:'擲筊確認',qNo:n=>`第 ${n} 籤`,qGrade:'籤等',
  qCup:{sheng:'聖筊：一正一反，神明應允',xiao:'笑筊：兩面向上，請再求過',yin:'陰筊：兩面向下，請再求過'},
  qWait:'抽到籤，請擲筊確認。',qAdvice:'解',qNote:'籤詩為本站原創，唔係任何廟宇嘅籤文。',
  /* kua */
  kuaLead:(n,k)=>`${n?n+'嘅':'你嘅'}本命卦<span class="big">${k}</span>`,
  kuaGroup:{e:'東四命',w:'西四命'},kuaGood:'四吉方',kuaBad:'四凶方',
  kuaNames:['生氣','天醫','延年','伏位'],
  kuaMean:['生氣：財運、事業','天醫：健康、貴人','延年：感情、人緣','伏位：穩定、靜心'],
  kuaNote:'本命卦按立春後嘅出生年同性別計。床頭、書枱同大門最好向吉方。',
  /* almanac */
  alLunar:'農曆',alYi:'宜',alJi:'忌',alChong:'沖',alSha:'煞',alXi:'喜神',alCai:'財神',alFu:'福神',
  alPick:'揀一件事，睇本月邊日適合',alPrev:'上個月',alNext:'下個月',alGood:'適合',
  alNote:'宜忌資料來自傳統通書，經 lunar-javascript 曆法庫計算。',
  /* palm */
  pmQ:{hand:'手掌形狀',finger:'手指同手掌比例',face:'臉形'},
  pmLead:t=>`你屬<span class="big">${t}</span>`,pmMix:(a,b)=>`${a}型帶${b}`,pmPure:a=>`${a}型`,
  pmNote:'按傳統五行手相、面相分類，揀最接近嘅描述就得，唔使影相。'
 },
 en:{
  heroTitle:'Destiny, stars, oracles, feng shui,<br>then the stone for you',
  heroText:'Enter your birth details once and more than a dozen readings use them. Each one ends with the crystals that suit it.',
  heroFine:'Sample details are filled in. Bazi and solar terms are worked out astronomically. All readings are cultural tradition and entertainment, not a promise of any outcome.',
  fTime:'Time of birth',fNoTime:'I don’t know my birth time',fGender:'Gender',female:'Female',male:'Male',fPlace:'Place of birth',
  groups:{fate:'Destiny',stars:'Stars',div:'Oracles',fs:'Feng shui',phys:'Hands & face'},
  tabs:{bazi:'Bazi',ziwei:'Zi Wei Dou Shu',life:'Life path',name:'Name numbers',astro:'Birth chart',sx:'Chinese zodiac',tarot:'Tarot',iching:'I Ching',qian:'Fortune sticks',kua:'Kua number',xuankong:'Flying stars',almanac:'Almanac',today:'Today',palm:'Palm & face'},
  needTime:'This reading needs your birth time. Add it on the left, then press Read.',
  zwLead:(n,s)=>`${n?n+'’s':'Your'} Life Palace star<span class="big">${s}</span>`,
  zwEmpty:'The Life Palace has no main star, so the opposite (Travel) palace is borrowed.',
  zwFacts:{ju:'Element bureau',ming:'Life Palace',shen:'Body Palace',lunar:'Lunar birthday'},
  zwNote:'Shows the 14 main stars, six auxiliary stars, Lu Cun, Qing Yang, Tuo Luo, Tian Ma and the four transformations. Brightness and decade luck are not shown. The second half of a leap month counts as the next month; births after 11pm count as the next day.',
  lpLead:(n,x)=>`${n?n+'’s':'Your'} life path number<span class="big">${x}</span>`,
  lpGrid:'Birth-date grid',lpLines:'Lines',lpMissing:'Missing numbers',lpNone:'None',lpNoLine:'No complete lines',
  lpNote:'Add every digit of your birth date until one digit remains. 11, 22 and 33 are master numbers.',
  nmSur:'Surname',nmGiven:'Given name',nmGo:'Count strokes',nmSurPh:'e.g. 林',nmGivenPh:'e.g. 雅琪',
  nmGrids:{tian:'Heaven',ren:'Person',di:'Earth',wai:'Outer',zong:'Total'},
  nmRole:{tian:'family line',ren:'core luck and character',di:'early life',wai:'relationships',zong:'later life'},
  nmLuck:{ji:'Lucky',ban:'Mixed',xiong:'Unlucky'},
  nmSancai:'Three talents (Heaven, Person, Earth)',nmRel:{sheng:'feeds',ke:'clashes with',same:'matches'},
  nmMiss:c=>`No stroke data for “${c}”. Try another character or the traditional form.`,
  nmNote:'Strokes follow the Kangxi Dictionary (for example 氵 counts as 水, 4 strokes). Number characters count by value. Schools differ slightly.',
  nmSum:(good,total)=>`${good} of the ${total} grids are lucky.`,
  astLead:(n,s,m,a)=>`Sun in ${s} · Moon in ${m}${a?' · '+a+' rising':''}`,
  astPlanets:{sun:'Sun',moon:'Moon',mercury:'Mercury',venus:'Venus',mars:'Mars',jupiter:'Jupiter',saturn:'Saturn',asc:'Rising'},
  astRole:{sun:'core self',moon:'feelings',mercury:'thinking and talking',venus:'love and taste',mars:'drive',jupiter:'luck and growth',saturn:'duty and tests',asc:'first impression'},
  astNoAsc:'Your rising sign needs an exact birth time and place.',
  astNote:'Planet positions come from Astronomy Engine. Birthplaces use standard time; Taiwan and Hong Kong used daylight saving in some years before 1979, so take off an hour if that applies.',
  icToss:'Toss the coins six times',icHint:'Hold your question in mind and toss three coins six times. A sample reading is already shown.',
  icLines:'Lines (bottom to top)',icChange:'Changing to',icNoChange:'No changing lines; read the main hexagram.',icMoving:n=>`${n} changing line${n>1?'s':''}`,
  icUpper:'Upper',icLower:'Lower',
  qDraw:'Shake the sticks',qThrow:'Throw the blocks',qNo:n=>`Stick ${n}`,qGrade:'Grade',
  qCup:{sheng:'Yes: one up, one down. The answer is confirmed.',xiao:'Laughing: both up. Draw again.',yin:'No: both down. Draw again.'},
  qWait:'You drew a stick. Throw the blocks to confirm it.',qAdvice:'Reading',qNote:'Verses written for this site, not taken from any temple.',
  kuaLead:(n,k)=>`${n?n+'’s':'Your'} Kua number<span class="big">${k}</span>`,
  kuaGroup:{e:'East group',w:'West group'},kuaGood:'Four good directions',kuaBad:'Four poor directions',
  kuaNames:['Sheng Qi','Tian Yi','Yan Nian','Fu Wei'],
  kuaMean:['Sheng Qi: wealth and career','Tian Yi: health and helpers','Yan Nian: love and relationships','Fu Wei: stability and calm'],
  kuaNote:'Worked out from your birth year (from the start of spring) and gender. Face your bed head, desk and front door towards a good direction where you can.',
  alLunar:'Lunar date',alYi:'Good for',alJi:'Avoid',alChong:'Clashes',alSha:'Sha',alXi:'Joy',alCai:'Wealth',alFu:'Blessing',
  alPick:'Pick an activity to see the good days this month',alPrev:'Previous month',alNext:'Next month',alGood:'Good day',
  alNote:'Good and bad activities follow the traditional almanac, calculated with the lunar-javascript library.',
  pmQ:{hand:'Palm shape',finger:'Fingers compared with palm',face:'Face shape'},
  pmLead:t=>`You are<span class="big">${t}</span>`,pmMix:(a,b)=>`${a} with ${b}`,pmPure:a=>`${a} type`,
  pmNote:'Based on the traditional five-element reading of hands and faces. Pick the closest description; no photo needed.'
 }
};

const PLACES = [
 {id:'khh',zh:'高雄',en:'Kaohsiung',lat:22.63,lon:120.30,tz:8},
 {id:'tnn',zh:'台南',en:'Tainan',lat:22.99,lon:120.21,tz:8},
 {id:'txg',zh:'台中',en:'Taichung',lat:24.15,lon:120.67,tz:8},
 {id:'tpe',zh:'台北',en:'Taipei',lat:25.03,lon:121.56,tz:8},
 {id:'hkg',zh:'香港',en:'Hong Kong',lat:22.32,lon:114.17,tz:8},
 {id:'mfm',zh:'澳門',en:'Macau',lat:22.20,lon:113.55,tz:8},
 {id:'sha',zh:'上海',en:'Shanghai',lat:31.23,lon:121.47,tz:8},
 {id:'sin',zh:'新加坡',en:'Singapore',lat:1.35,lon:103.82,tz:8},
 {id:'kul',zh:'吉隆坡',en:'Kuala Lumpur',lat:3.14,lon:101.69,tz:8},
 {id:'tyo',zh:'東京',en:'Tokyo',lat:35.68,lon:139.69,tz:9}
];

/* ---- 紫微斗數 ---- */
const ZW_PALACES = {zh:['命宮','兄弟','夫妻','子女','財帛','疾厄','遷移','交友','官祿','田宅','福德','父母'],en:['Life','Siblings','Spouse','Children','Wealth','Health','Travel','Friends','Career','Property','Fortune','Parents']};
const ZW_MAIN = {
 紫微:{en:'Zi Wei',el:'土',zh_d:'領導力強、自尊心重，有貴氣。',en_d:'A natural leader with dignity and pride.',rec:['D03','B05']},
 天機:{en:'Tian Ji',el:'木',zh_d:'聰明機敏，諗嘢快，鍾意變化。',en_d:'Clever and quick, likes change.',rec:['B01','D04']},
 太陽:{en:'Tai Yang',el:'火',zh_d:'熱心付出，重名聲，肯照顧人。',en_d:'Warm and giving, cares about reputation.',rec:['B03','D01']},
 武曲:{en:'Wu Qu',el:'金',zh_d:'剛毅果斷，理財能力強。',en_d:'Decisive and good with money.',rec:['B07','D02']},
 天同:{en:'Tian Tong',el:'水',zh_d:'隨和樂天，人緣好，懂得享受。',en_d:'Easy-going and well liked; enjoys life.',rec:['B10','B09']},
 廉貞:{en:'Lian Zhen',el:'火',zh_d:'有原則、有魅力，帶少少叛逆。',en_d:'Principled and magnetic, with an edge.',rec:['B04','B03']},
 天府:{en:'Tian Fu',el:'土',zh_d:'穩重保守，識守財，有包容力。',en_d:'Steady and careful; keeps wealth well.',rec:['D03','B06']},
 太陰:{en:'Tai Yin',el:'水',zh_d:'細膩溫柔，重家庭，有藝術觸覺。',en_d:'Gentle and home-loving, with an artistic eye.',rec:['B10','B08']},
 貪狼:{en:'Tan Lang',el:'木',zh_d:'多才多藝，交際廣，慾望強。',en_d:'Talented, sociable and full of wants.',rec:['B01','B02']},
 巨門:{en:'Ju Men',el:'水',zh_d:'口才好，愛追根究底，宜防口舌。',en_d:'Persuasive and questioning; watch for arguments.',rec:['B09','B10']},
 天相:{en:'Tian Xiang',el:'水',zh_d:'公正持平，樂於助人，重儀表。',en_d:'Fair, helpful and well presented.',rec:['B10','B08']},
 天梁:{en:'Tian Liang',el:'土',zh_d:'有長者風範，愛照顧人，逢凶化吉。',en_d:'Protective and mentor-like; turns trouble around.',rec:['B06','D03']},
 七殺:{en:'Qi Sha',el:'金',zh_d:'衝勁大，敢闖敢拼，獨當一面。',en_d:'Bold and driven; stands alone.',rec:['B07','B09']},
 破軍:{en:'Po Jun',el:'水',zh_d:'勇於破舊立新，人生變化多。',en_d:'Breaks the old to build the new; a life of change.',rec:['B09','D05']}
};
const ZW_MINOR = {文昌:'Wen Chang',文曲:'Wen Qu',左輔:'Zuo Fu',右弼:'You Bi',天魁:'Tian Kui',天鉞:'Tian Yue',祿存:'Lu Cun',擎羊:'Qing Yang',陀羅:'Tuo Luo',天馬:'Tian Ma'};
const ZW_SIHUA = {甲:['廉貞','破軍','武曲','太陽'],乙:['天機','天梁','紫微','太陰'],丙:['天同','天機','文昌','廉貞'],丁:['太陰','天同','天機','巨門'],戊:['貪狼','太陰','右弼','天機'],己:['武曲','貪狼','天梁','文曲'],庚:['太陽','武曲','太陰','天同'],辛:['巨門','太陽','文曲','文昌'],壬:['天梁','紫微','左輔','武曲'],癸:['破軍','巨門','太陰','貪狼']};
const SIHUA_LABEL = {zh:['祿','權','科','忌'],en:['Lu','Quan','Ke','Ji']};
const NAYIN_EL = '金火木土金火水土金木水土火木水金火木土金火水土金木水土火木水';
const JU = {水:2,木:3,金:4,土:5,火:6};
const JU_NAME = {zh:{2:'水二局',3:'木三局',4:'金四局',5:'土五局',6:'火六局'},en:{2:'Water 2',3:'Wood 3',4:'Metal 4',5:'Earth 5',6:'Fire 6'}};

/* ---- 生命靈數 ---- */
const LIFE = {
 1:{c:'B03',zh:['獨立、自信、有領導力','做事主動，鍾意開拓新路，要學識聽人意見。'],en:['Independent, confident, a leader','You start things and open new paths; remember to listen.']},
 2:{c:'B04',zh:['溫柔、敏感、重合作','善解人意，係好拍檔，要學識為自己發聲。'],en:['Gentle, sensitive, a partner','You read people well and work well with others; speak up for yourself.']},
 3:{c:'B05',zh:['樂觀、表達力強、有創意','口才好、點子多，要學識專注完成。'],en:['Cheerful, expressive, creative','Full of words and ideas; practise finishing what you start.']},
 4:{c:'B01',zh:['穩重、務實、有紀律','做事按部就班，值得信賴，要學識放鬆。'],en:['Steady, practical, disciplined','Reliable and methodical; allow yourself to relax.']},
 5:{c:'B10',zh:['自由、好奇、愛變化','適應力強、鍾意新體驗，要學識定性。'],en:['Free, curious, loves change','Adaptable and adventurous; work on staying put.']},
 6:{c:'B09',zh:['有責任感、愛照顧人','重家庭同朋友，要小心唔好攬晒上身。'],en:['Responsible and caring','Family and friends come first; don’t carry it all yourself.']},
 7:{c:'D01',zh:['思考型、追求真相','鍾意研究同獨處，要學識信任別人。'],en:['A thinker who seeks the truth','You love study and solitude; let others in.']},
 8:{c:'B07',zh:['有魄力、善管理資源','對金錢同權力有觸覺，要平衡工作同生活。'],en:['Driven, good with resources','A head for money and power; balance work with life.']},
 9:{c:'B08',zh:['理想主義、包容、有大愛','樂於助人，眼光闊，要學識放低過去。'],en:['Idealistic, generous, big-hearted','Helpful with a wide view; learn to let the past go.']}
};
const LIFE_LINES = [
 {n:[1,2,3],zh:'藝術線',en:'Artistic line'},{n:[4,5,6],zh:'組織線',en:'Organising line'},{n:[7,8,9],zh:'權力線',en:'Power line'},
 {n:[1,4,7],zh:'物質線',en:'Material line'},{n:[2,5,8],zh:'感情線',en:'Emotional line'},{n:[3,6,9],zh:'智慧線',en:'Wisdom line'},
 {n:[1,5,9],zh:'事業線',en:'Career line'},{n:[3,5,7],zh:'人緣線',en:'Popularity line'}
];

/* ---- 姓名學 ---- */
const NUM_CHARS = {一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9,十:10};
const LUCKY_81 = new Set([1,3,5,6,7,8,11,13,15,16,18,21,23,24,25,29,31,32,33,35,37,39,41,45,47,48,52,57,61,63,65,67,68,81]);
const HALF_81 = new Set([17,26,27,30,38,40,43,49,51,55,58,71,73,75]);
const DIGIT_EL = ['水','木','木','火','火','土','土','金','金','水'];

/* ---- 八宅 ---- */
const DIRS = {N:['北','North'],NE:['東北','North-east'],E:['東','East'],SE:['東南','South-east'],S:['南','South'],SW:['西南','South-west'],W:['西','West'],NW:['西北','North-west']};
const KUA = {
 1:{zh:'坎卦',en:'Kan 1',g:'e',good:['SE','E','S','N'],el:'水'},
 2:{zh:'坤卦',en:'Kun 2',g:'w',good:['NE','W','NW','SW'],el:'土'},
 3:{zh:'震卦',en:'Zhen 3',g:'e',good:['S','N','SE','E'],el:'木'},
 4:{zh:'巽卦',en:'Xun 4',g:'e',good:['N','S','E','SE'],el:'木'},
 6:{zh:'乾卦',en:'Qian 6',g:'w',good:['W','NE','SW','NW'],el:'金'},
 7:{zh:'兌卦',en:'Dui 7',g:'w',good:['NW','SW','NE','W'],el:'金'},
 8:{zh:'艮卦',en:'Gen 8',g:'w',good:['SW','NW','W','NE'],el:'土'},
 9:{zh:'離卦',en:'Li 9',g:'e',good:['E','SE','N','S'],el:'火'}
};
const CELL_DIR = ['SE','S','SW','E',null,'W','NE','N','NW'];

/* ---- 易經 ---- */
const TRIGRAMS = [ /* bottom→top lines, 1 = yang */
 {k:'111',zh:'乾',sym:'☰',nat:['天','Heaven'],el:'金'},{k:'110',zh:'兌',sym:'☱',nat:['澤','Lake'],el:'金'},
 {k:'101',zh:'離',sym:'☲',nat:['火','Fire'],el:'火'},{k:'100',zh:'震',sym:'☳',nat:['雷','Thunder'],el:'木'},
 {k:'011',zh:'巽',sym:'☴',nat:['風','Wind'],el:'木'},{k:'010',zh:'坎',sym:'☵',nat:['水','Water'],el:'水'},
 {k:'001',zh:'艮',sym:'☶',nat:['山','Mountain'],el:'土'},{k:'000',zh:'坤',sym:'☷',nat:['地','Earth'],el:'土'}
];
const KW = [ /* [upper][lower], trigram order 乾兌離震巽坎艮坤 */
 [1,10,13,25,44,6,33,12],[43,58,49,17,28,47,31,45],[14,38,30,21,50,64,56,35],[34,54,55,51,32,40,62,16],
 [9,61,37,42,57,59,53,20],[5,60,63,3,48,29,39,8],[26,41,22,27,18,4,52,23],[11,19,36,24,46,7,15,2]
];
const HEX = [null,
 ['乾','Qian','剛健進取，自強不息。','Strength; keep pushing forward.'],
 ['坤','Kun','包容承載，順勢而為。','Receptive; support and follow through.'],
 ['屯','Zhun','萬事起頭難，穩住陣腳。','Difficult beginnings; hold steady.'],
 ['蒙','Meng','虛心學習，向人請教。','Learning; find a teacher.'],
 ['需','Xu','耐心等待時機。','Wait patiently for the right moment.'],
 ['訟','Song','避免爭執，退一步海闊天空。','Conflict; step back from disputes.'],
 ['師','Shi','組織團隊，紀律為先。','Lead a team with discipline.'],
 ['比','Bi','親近合作，結伴同行。','Unity; join with others.'],
 ['小畜','Xiao Chu','小有積累，未到大成。','Small gains; keep building.'],
 ['履','Lu','小心行事，守禮而行。','Tread carefully and courteously.'],
 ['泰','Tai','天地交泰，順利通達。','Peace; things flow well.'],
 ['否','Pi','閉塞不通，暫且守成。','Stagnation; hold your ground.'],
 ['同人','Tong Ren','志同道合，廣結善緣。','Fellowship; find like minds.'],
 ['大有','Da You','豐收富足。','Great possession; abundance.'],
 ['謙','Qian','謙虛得益。','Modesty brings reward.'],
 ['豫','Yu','愉快準備，順勢而動。','Enthusiasm; prepare, then move.'],
 ['隨','Sui','隨機應變，跟隨正道。','Following; adapt wisely.'],
 ['蠱','Gu','整頓舊弊。','Repair what has gone bad.'],
 ['臨','Lin','機會臨近，積極把握。','Approach; opportunity is near.'],
 ['觀','Guan','觀察全局，再作決定。','Observe before you act.'],
 ['噬嗑','Shi He','果斷處理障礙。','Bite through obstacles decisively.'],
 ['賁','Bi','修飾外表，更重內涵。','Grace; polish, but keep substance.'],
 ['剝','Bo','根基動搖，宜守不宜攻。','Splitting apart; defend, don’t advance.'],
 ['復','Fu','重新開始，否極泰來。','Return; a fresh turn.'],
 ['無妄','Wu Wang','真誠自然，切勿妄動。','Sincerity; no rash moves.'],
 ['大畜','Da Chu','厚積薄發。','Great restraint; store up strength.'],
 ['頤','Yi','注意言語飲食，修身養性。','Nourishment; mind what you take in.'],
 ['大過','Da Guo','負擔過重，需要調整。','Overload; lighten the burden.'],
 ['坎','Kan','重重險阻，守信可以渡關。','Danger; stay true to get through.'],
 ['離','Li','光明依附，發揮所長。','Brightness; shine with support.'],
 ['咸','Xian','感應相通，感情萌芽。','Attraction; mutual feeling.'],
 ['恆','Heng','持之以恆。','Endurance; stay the course.'],
 ['遯','Dun','適時退避。','Retreat at the right time.'],
 ['大壯','Da Zhuang','聲勢壯大，切勿過剛。','Great power; don’t overreach.'],
 ['晉','Jin','步步高升。','Progress; rising steadily.'],
 ['明夷','Ming Yi','韜光養晦。','Darkening light; keep a low profile.'],
 ['家人','Jia Ren','家庭和睦，各守本分。','Family; harmony at home.'],
 ['睽','Kui','意見分歧，求同存異。','Opposition; find common ground.'],
 ['蹇','Jian','前路艱難，求助貴人。','Obstruction; ask for help.'],
 ['解','Xie','困難解除。','Release; problems ease.'],
 ['損','Sun','先捨後得。','Decrease; give first, gain later.'],
 ['益','Yi','增益得利，宜進取。','Increase; a good time to act.'],
 ['夬','Guai','果斷決策。','Breakthrough; decide firmly.'],
 ['姤','Gou','不期而遇，慎防誘惑。','Encounter; watch for temptation.'],
 ['萃','Cui','人才匯聚。','Gathering; people come together.'],
 ['升','Sheng','循序上升。','Rising step by step.'],
 ['困','Kun','困境之中守住信念。','Exhaustion; hold to your values.'],
 ['井','Jing','充實內在，惠及他人。','The well; deepen your resources.'],
 ['革','Ge','改革求變。','Revolution; time for change.'],
 ['鼎','Ding','推陳出新，穩固根基。','The cauldron; renew and establish.'],
 ['震','Zhen','突發驚動，臨危不亂。','Shock; stay calm.'],
 ['艮','Gen','適可而止。','Keeping still; know when to stop.'],
 ['漸','Jian','循序漸進。','Gradual progress.'],
 ['歸妹','Gui Mei','名分未定，謹慎選擇。','The marrying maiden; choose roles carefully.'],
 ['豐','Feng','盛極之時，居安思危。','Abundance; plan for after the peak.'],
 ['旅','Lu','在外奔波，謹慎守己。','The wanderer; travel with care.'],
 ['巽','Xun','柔順滲透，謙遜進言。','Gentle; persistent influence.'],
 ['兌','Dui','喜悅交流。','Joy; open exchange.'],
 ['渙','Huan','化解隔閡。','Dispersion; dissolve barriers.'],
 ['節','Jie','節制有度。','Limitation; moderation.'],
 ['中孚','Zhong Fu','誠信為本。','Inner truth; sincerity.'],
 ['小過','Xiao Guo','小事可行，大事宜緩。','Small matters go well; wait on big ones.'],
 ['既濟','Ji Ji','已經成功，提防鬆懈。','Completion; stay alert.'],
 ['未濟','Wei Ji','未完成，仍有希望。','Not yet complete; hope remains.']
];

/* ---- 求籤 (original verses) ---- */
const QIAN = [
 ['上上','春風得意馬蹄輕，一路花開到錦城。','Spring wind at your back; flowers line the road.','大膽向前，所求可成。','Go boldly; what you seek can be done.'],
 ['上上','明月當空照九州，雲開霧散上高樓。','Clouds part under a full moon.','困局將解，貴人在側。','The deadlock lifts; help is near.'],
 ['上上','金石為開志不移，十年辛苦一朝知。','Steady will opens stone; hard work is seen at last.','堅持到底，收成在望。','Keep going; the harvest is in sight.'],
 ['上','小舟順水過長灘，兩岸青山入眼看。','A small boat runs downstream past green hills.','順勢而行，莫要逆流。','Go with the current.'],
 ['上','梅花耐雪待春回，暗香先到報喜來。','Plum blossom waits out the snow.','先苦後甜，靜候佳音。','Bitter first, sweet later; good news is coming.'],
 ['上','燕子銜泥築新巢，一磚一瓦莫心焦。','A swallow builds its nest one beakful at a time.','慢慢經營，家宅工作都會安穩。','Build slowly; home and work will settle.'],
 ['上','井中有水自清涼，不必他求遠四方。','The well already holds clear water.','答案就在身邊，珍惜眼前人。','The answer is close by; value who is near.'],
 ['上','一枝竹筍破泥中，節節高升向碧空。','A bamboo shoot pushes up, joint by joint.','事業步步上揚。','Your career rises step by step.'],
 ['上','舊友相逢酒一杯，失物重尋笑顏開。','Old friends meet; lost things return.','失而復得，舊緣再續。','What was lost comes back.'],
 ['上','春雨潤田禾苗長，勤耕自有好收藏。','Spring rain on well-tended fields.','勤力必有回報。','Effort pays off.'],
 ['中','霧鎖江頭船未行，且停舟楫待天明。','Mist on the river; wait for daylight.','時機未到，暫緩決定。','Not yet; hold the decision.'],
 ['中','半山亭裡歇一回，回頭再看路崔巍。','Rest at the halfway pavilion.','先休息，再出發。','Rest, then carry on.'],
 ['中','雙燕分飛各一方，秋來還自返雕梁。','Two swallows part and return in autumn.','分離只屬暫時。','The separation is only for now.'],
 ['中','月有陰晴人有時，莫將得失放心池。','The moon waxes and wanes.','得失以平常心看待。','Take gains and losses calmly.'],
 ['中','江心風浪暫無邊，穩把船舵到岸前。','Waves mid-river; hold the rudder.','守住原則，可以過關。','Hold your course and you will get through.'],
 ['中','錢財入手似流沙，量入為出始成家。','Money slips through like sand.','理財要有節制。','Spend within your means.'],
 ['中','曲徑通幽路轉彎，柳暗花明又一山。','A winding path turns to a new view.','換條路或有轉機。','Another route may open things up.'],
 ['中','鏡中花影水中天，看似可親實未全。','Flowers in a mirror, sky in the water.','看清虛實再行動。','Check what is real before acting.'],
 ['中','種瓜得瓜豆得豆，今朝播種明朝收。','Plant melons, reap melons.','因果分明，做好本分。','Do your part well; results follow.'],
 ['下','秋風落葉滿空庭，獨倚欄杆聽雨聲。','Autumn leaves fill an empty courtyard.','宜靜不宜動，照顧好自己。','Stay still and look after yourself.'],
 ['下','山高路險馬難行，莫向崎嶇強出征。','The mountain road is too steep for the horse.','唔好勉強，另擇時機。','Don’t force it; choose another time.'],
 ['下','浮雲遮月影朦朧，是非口舌在其中。','Clouds hide the moon; gossip stirs.','少說話，避是非。','Say less and avoid disputes.'],
 ['下','竹籃打水一場空，莫信他人說動容。','Carrying water in a bamboo basket.','小心承諾同投資。','Be wary of promises and investments.'],
 ['下','夜行無燈路難分，且守家園待曉雲。','No lantern on the night road.','先守住，等天光。','Hold on until morning.']
];
const QIAN_GRADE_EN = {上上:'Excellent',上:'Good',中:'Middling',下:'Poor'};
const QIAN_REC = {上上:['D03','B05'],上:['B01','D04'],中:['B08','D02'],下:['B09','D05']};

/* ---- 手相面相 ---- */
const PALM_Q = {
 hand:[['金','方形手掌，指頭方正','Square palm, square fingertips'],['木','長方手掌，手指修長、指節明顯','Long palm, long knotty fingers'],['水','手掌厚軟，手指圓潤','Soft, plump palm, rounded fingers'],['火','手掌偏尖長，指尖尖','Tapering palm, pointed fingertips'],['土','手掌厚大，手指粗短','Thick, broad palm, short sturdy fingers']],
 finger:[['木','手指明顯比手掌長','Fingers clearly longer than the palm'],['土','手掌明顯比手指長','Palm clearly longer than the fingers'],['水','兩者差唔多','About the same']],
 face:[['金','方臉，輪廓分明','Square face, defined jaw'],['木','長臉，額頭高','Long face, high forehead'],['水','圓臉，面頰飽滿','Round face, full cheeks'],['火','上闊下尖，下巴尖','Wide top, pointed chin'],['土','臉厚實，下巴寬','Solid face, broad chin']]
};
const PALM_TYPE = {
 金:{zh:'做事果斷、重原則，講效率。',en:'Decisive and principled; values efficiency.'},
 木:{zh:'有理想、肯學習，富同情心。',en:'Idealistic, keen to learn, compassionate.'},
 水:{zh:'聰明靈活、適應力強，人緣好。',en:'Clever, adaptable and well liked.'},
 火:{zh:'熱情主動、反應快，有感染力。',en:'Warm, quick and inspiring.'},
 土:{zh:'穩重踏實、值得信賴，有耐性。',en:'Steady, dependable and patient.'}
};

/* ---- 農民曆 helpers ---- */
const S2T = '开開绘繪齐齊斋齋庙廟谢謝订訂纳納问問归歸宁寧帐帳进進坟墳启啟钻鑽殓殮门門动動竖豎坏壞补補盖蓋厕廁仓倉涂塗桥橋筑築扫掃饰飾墙牆马馬挂掛财財买買车車产產佣傭货貨机機经經络絡酝醞酿釀铸鑄种種渔漁结結网網养養习習艺藝学學发髮见見贵貴针針头頭猎獵会會亲親医醫词詞讼訟库庫疗療诸諸馀餘丧喪断斷蚁蟻无無东東鸡雞猪豬龙龍冲沖';
const S2T_MAP = {}; for (let i = 0; i < S2T.length; i += 2) S2T_MAP[S2T[i]] = S2T[i + 1];
const toTrad = s => [...String(s)].map(c => S2T_MAP[c] || c).join('');
const YIJI_EN = {祭祀:'Offerings',祈福:'Praying for blessings',求嗣:'Praying for children',開光:'Consecrating',沐浴:'Bathing rites',嫁娶:'Weddings',訂盟:'Engagements',納采:'Betrothal gifts',冠笄:'Coming-of-age rites',安床:'Setting up a bed',入宅:'Moving into a home',移徙:'Moving house',出行:'Travel',修造:'Building and repairs',動土:'Breaking ground',破土:'Groundwork for burials',安葬:'Burials',上梁:'Raising beams',開市:'Opening a business',立券:'Signing contracts',交易:'Trading',納財:'Receiving money',求財:'Seeking wealth',栽種:'Planting',牧養:'Raising animals',納畜:'Buying livestock',入學:'Starting school',理髮:'Haircuts',會親友:'Meeting family and friends',赴任:'Starting a new post',求醫:'Seeing a doctor',治病:'Treatment',裁衣:'Tailoring',拆卸:'Demolition',掃舍:'Cleaning house',解除:'Clearing',餘事勿取:'Nothing else',諸事不宜:'Nothing is favourable',捕捉:'Catching pests',畋獵:'Hunting',開倉:'Opening stores',置產:'Buying property',作灶:'Building a stove',造屋:'Building a house',安門:'Installing doors',經絡:'Weaving',醞釀:'Brewing',伐木:'Felling trees',乘船:'Boat trips',探病:'Visiting the sick',行喪:'Funerals',入殓:'Encoffining',成服:'Mourning dress',除服:'Ending mourning',立碑:'Raising a headstone',啟鑽:'Opening a grave',修墳:'Repairing graves',安香:'Setting up an altar',謝土:'Thanking the earth',出火:'Moving an altar',塑繪:'Sculpting and painting',齋醮:'Taoist rites',造橋:'Building bridges',掘井:'Digging wells',開池:'Digging ponds',開廁:'Building toilets',作廁:'Building toilets',補垣:'Mending walls',塞穴:'Sealing holes',平治道塗:'Road repairs',修飾垣牆:'Decorating walls',結網:'Net making',取漁:'Fishing',割蜜:'Collecting honey',習藝:'Learning a craft',剃頭:'Shaving the head',整手足甲:'Nail trimming',分居:'Separating households',造倉:'Building storehouses',開渠:'Digging channels',鼓鑄:'Metal casting',造船:'Boatbuilding',作染:'Dyeing',安碓磑:'Setting up a mill',雇傭:'Hiring',出貨財:'Lending money',安機械:'Installing machinery',造車器:'Building vehicles',買車:'Buying a car',掛匾:'Hanging a signboard',問名:'Exchanging names',納婿:'Taking in a son-in-law',歸寧:'Visiting parents',合帳:'Hanging bed curtains',進人口:'Adding to the household',挽面:'Face threading',開容:'Grooming',酬神:'Thanking the gods',造廟:'Building temples',祀灶:'Kitchen god offerings',焚香:'Burning incense',雕刻:'Carving',訂婚:'Engagement',普渡:'Ghost festival rites',移柩:'Moving a coffin',開生墳:'Preparing a grave',合壽木:'Making a coffin',起基:'Laying foundations',豎柱:'Raising pillars',開井開池:'Digging wells and ponds',作陂放水:'Building weirs',破屋:'Pulling down a house',壞垣:'Knocking down walls',伐木做梁:'Cutting timber for beams',開柱眼:'Cutting mortises',穿屏扇架:'Fitting screens',蓋屋合脊:'Roofing',造倉庫:'Building storehouses',築堤:'Building embankments',放水:'Draining water',合脊:'Ridging a roof',造畜稠:'Building animal pens',修門:'Repairing doors',定磉:'Setting column bases',作梁:'Making beams',架馬:'Setting up trestles',教牛馬:'Training animals',針灸:'Acupuncture',渡水:'Crossing water',見貴:'Meeting VIPs',求醫療病:'Seeking treatment',立券交易:'Contracts and trade',安機:'Installing machinery',會友:'Meeting friends',斷蟻:'Pest control',歸岫:'Returning home',起基動土:'Foundations and groundwork',破屋壞垣:'Demolition',蓋屋:'Roofing',詞訟:'Lawsuits',齊醮:'Taoist rites',無:'None'};
const ALMANAC_PICKS = ['嫁娶','開市','入宅','移徙','出行','交易','安床','動土','納財','祭祀'];
