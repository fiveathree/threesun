/* 誕生石、配對合盤、九星氣學、二十八宿、瑪雅曆、小六壬、盧恩符文、蛇夫座.
   All readings and keywords are written for this site. Uses app.js helpers inside functions only. */
const T5 = {
  zh: {
    tabs: { stone: '誕生石', match: '配對合盤', nine: '九星氣學', xiu: '二十八宿', maya: '瑪雅曆', xlr: '小六壬', rune: '盧恩符文' },
    groups: { persona: '性格・配對', shu: '術數' },
    whatIs: '點樣計',
    stLead: (n, s) => `${n ? n + '嘅' : '你嘅'}誕生石係<span class="big">${s}</span>`,
    stOther: (m, s) => `${m} 月誕生石係<span class="big">${s}</span>`,
    stFacts: { month: '出生月份', color: '顏色', mean: '傳統寓意', zodiac: '星座守護石' },
    stAll: '12 個月誕生石（撳睇其他月份）',
    stInfo: '誕生石用現代通用嘅月份表（1912 年美國珠寶商協會訂立，之後有修訂）。星座守護石係坊間常見配搭。寓意屬傳統說法，唔係功效保證。',
    stM: m => `${m} 月`,
    mtLead: (a, b, s) => `${a || '你'} × ${b || '對方'}<span class="big">${s} 分</span>`,
    mtForm: '對方出生日期', mtName: '對方名（可以唔填）', mtGo: '睇配對',
    mtFacts: { star: '星座', sx: '生肖', dm: '日主五行' },
    mtVerdict: s => s >= 85 ? '天生一對，好有默契。' : s >= 72 ? '幾夾，有少少磨合位，互相遷就就好順。' : s >= 60 ? '性格有差異，多啲溝通可以互補。' : '差異幾大，需要多啲耐性同體諒。',
    mtStar: { same: '同一象，諗法相近', good: '互相配合', diff: '節奏唔同' },
    mtSx: { liuhe: '六合', sanhe: '三合', same: '同生肖', chong: '相沖', hai: '相害', none: '普通' },
    mtDm: { same: '比和', gen: '相生', ke: '相剋' },
    mtRec: '情侶可以各自戴補自己五行嘅手鏈，或者一齊揀同款。',
    mtInfo: '配對分數由三部分平均：星座元素（火風、土水互相配合）、生肖（六合、三合加分，相沖、相害減分）、八字日主五行（相生最好，比和次之，相剋要磨合）。對方唔使填出生時間。純屬娛樂參考。',
    nnLead: (n, s) => `${n ? n + '嘅' : '你嘅'}本命星係<span class="big">${s}</span>`,
    nnFacts: { month: '月命星', el: '五行', y26: '2026 年位置' },
    nnInfo: '九星氣學係日本流行嘅九星術，同玄空飛星用同一套九星。本命星按立春計年份，月命星按節氣計月份。2026 年一白入中，你嘅本命星今年飛到邊個宮位，就睇嗰個宮嘅運勢（傳統說法）。',
    nnYear: '2026 年運勢',
    xuLead: (n, s) => `${n ? n + '出生嗰日' : '你出生嗰日'}值<span class="big">${s}</span>`,
    xuFacts: { shou: '四象', zheng: '七政', animal: '星禽', luck: '吉凶' },
    xuInfo: '二十八宿係中國古代將天空分成 28 個星區，每日輪流「值日」。呢度用你出生嗰日嘅值日星宿（同農民曆一樣）。日本「宿曜占星術」用 27 宿、算法唔同，所以結果可能唔一樣。',
    xuLuck: { 吉: '吉', 凶: '凶' },
    myLead: (n, k, s) => `${n ? n + '係' : '你係'} Kin ${k}<span class="big">${s}</span>`,
    myFacts: { seal: '圖騰', tone: '調性', today: '今日 Kin' },
    myInfo: '用 13 月亮曆（Dreamspell）計法：260 日一個週期，由 20 個圖騰同 13 個調性組成，2 月 29 日唔計。台灣流行嘅「瑪雅曆」多數係呢個版本，同考古學嘅瑪雅長紀曆計法唔同。',
    xlLead: r => `<span class="big">${r}</span>`,
    xlBirth: '用出生時間起課', xlNow: '用而家時間起課',
    xlSteps: (m, d, h) => `農曆 ${m} 月 → ${d} 日 → ${h}時`,
    xlInfo: '小六壬又叫「掐指一算」：喺手指上面排大安、留連、速喜、赤口、小吉、空亡六個位。由大安起農曆月份，再由嗰度起日子，再起時辰，最後停喺邊個位就係結果。',
    rnDraw: '再抽三粒', rnPos: ['過去', '現在', '未來'], rnUp: '正位', rnRev: '逆位',
    rnInfo: '盧恩符文係古北歐文字（Elder Futhark 24 個字母），後世用嚟占卜。逆位只適用於倒轉會唔同樣嘅符文。符文解釋係本站原創。',
    ophFact: '13 星座（計蛇夫座）',
    ophInfo: '太陽實際喺天上會經過 13 個星座，包括 11 月 29 日至 12 月 17 日嘅蛇夫座。呢個係天文學上太陽真正喺邊個星座，日期跟國際天文聯會嘅星座邊界。占星學仍然用 12 星座。'
  },
  en: {
    tabs: { stone: 'Birthstone', match: 'Compatibility', nine: 'Nine Star Ki', xiu: '28 Mansions', maya: 'Maya calendar', xlr: 'Xiao Liu Ren', rune: 'Runes' },
    groups: { persona: 'Personality', shu: 'Classical arts' },
    whatIs: 'How it works',
    stLead: (n, s) => `${n ? n + '’s' : 'Your'} birthstone is<span class="big">${s}</span>`,
    stOther: (m, s) => `The ${m} birthstone is<span class="big">${s}</span>`,
    stFacts: { month: 'Birth month', color: 'Colour', mean: 'Traditional meaning', zodiac: 'Star-sign stones' },
    stAll: 'Birthstones of the 12 months (tap to view)',
    stInfo: 'Uses the modern birthstone list (set by American jewellers in 1912 and revised since). Star-sign stones are common popular pairings. Meanings are traditional, not promised effects.',
    stM: m => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m - 1],
    mtLead: (a, b, s) => `${a || 'You'} × ${b || 'them'}<span class="big">${s} / 100</span>`,
    mtForm: 'Their birth date', mtName: 'Their name (optional)', mtGo: 'Check',
    mtFacts: { star: 'Star signs', sx: 'Chinese zodiac', dm: 'Day master' },
    mtVerdict: s => s >= 85 ? 'A natural match with easy understanding.' : s >= 72 ? 'A good fit; a little give and take keeps it smooth.' : s >= 60 ? 'Different temperaments that can complement each other with talk.' : 'Quite different; patience and understanding help.',
    mtStar: { same: 'Same element, similar outlook', good: 'Complementary', diff: 'Different pace' },
    mtSx: { liuhe: 'Six Harmony', sanhe: 'Three Harmony', same: 'Same animal', chong: 'Clash', hai: 'Harm', none: 'Neutral' },
    mtDm: { same: 'Same element', gen: 'Supportive', ke: 'Controlling' },
    mtRec: 'Each person can wear a bracelet for their own weak element, or choose a matching pair.',
    mtInfo: 'The score averages three parts: star-sign elements (fire with air, earth with water work well), Chinese zodiac (Six and Three Harmony score higher, Clash and Harm lower) and the Bazi day-master elements (supportive is best, same is next, controlling needs work). Their birth time is not needed. For fun only.',
    nnLead: (n, s) => `${n ? n + '’s' : 'Your'} birth star is<span class="big">${s}</span>`,
    nnFacts: { month: 'Month star', el: 'Element', y26: '2026 position' },
    nnInfo: 'Nine Star Ki is the Japanese form of the nine-star system also used in Flying Stars feng shui. The birth star follows the solar year from Li Chun; the month star follows the solar terms. In 2026 star 1 is in the centre; the palace your star moves to sets the year’s theme (traditional view).',
    nnYear: '2026 outlook',
    xuLead: (n, s) => `${n ? n + ' was' : 'You were'} born on a day of<span class="big">${s}</span>`,
    xuFacts: { shou: 'Quadrant', zheng: 'Seven luminaries', animal: 'Mansion animal', luck: 'Omen' },
    xuInfo: 'The 28 Lunar Mansions divide the sky into 28 sections, and each takes a turn ruling a day. This uses the mansion ruling your birth day, as in the Chinese almanac. Japanese Sukuyo astrology uses 27 mansions and a different method, so results can differ.',
    xuLuck: { 吉: 'Lucky', 凶: 'Unlucky' },
    myLead: (n, k, s) => `${n ? n + ' is' : 'You are'} Kin ${k}<span class="big">${s}</span>`,
    myFacts: { seal: 'Seal', tone: 'Tone', today: 'Today’s Kin' },
    myInfo: 'Uses the 13 Moon (Dreamspell) count: a 260-day cycle of 20 seals and 13 tones, skipping 29 February. Most popular “Maya calendar” readings use this version, which differs from the archaeological Maya Long Count.',
    xlLead: r => `<span class="big">${r}</span>`,
    xlBirth: 'Use birth time', xlNow: 'Use the time now',
    xlSteps: (m, d, h) => `Lunar month ${m} → day ${d} → ${h} hour`,
    xlInfo: 'Xiao Liu Ren is counted on the fingers across six positions: Great Peace, Delay, Quick Joy, Red Mouth, Small Luck and Void. Count the lunar month from Great Peace, then the day from there, then the double-hour; where you stop is the answer.',
    rnDraw: 'Draw three again', rnPos: ['Past', 'Present', 'Future'], rnUp: 'Upright', rnRev: 'Reversed',
    rnInfo: 'Runes are the 24 letters of the Elder Futhark, later used for divination. Only runes that look different upside down can be reversed. The readings are written for this site.',
    ophFact: '13 signs (with Ophiuchus)',
    ophInfo: 'The Sun actually passes through 13 constellations, including Ophiuchus from 29 Nov to 17 Dec. This shows the constellation the Sun was really in, using the official IAU constellation boundaries. Astrology still uses 12 signs.'
  }
};
['zh','en'].forEach(k => { Object.assign(T2[k].tabs, T5[k].tabs); Object.assign(T2[k].groups, T5[k].groups); const c = Object.assign({}, T5[k]); delete c.tabs; delete c.groups; Object.assign(T2[k], c); });

const lunarOf = pr => Solar.fromYmdHms(pr.y, pr.m, pr.d, pr.hh == null ? 12 : pr.hh, pr.mm || 0, 0).getLunar();
const ZEL = { 火: '火', 土: '土', 風: '金', 水: '水' };   // western element → 五行 colour

/* ---------- 誕生石 ---------- */
const BSTONE = [
 { c: '#8E1F2B', rec: ['B03'], zh: ['石榴石', '深紅', '堅定、友誼'], en: ['Garnet', 'Deep red', 'Constancy, friendship'] },
 { c: '#6B4C9A', rec: ['D01'], zh: ['紫水晶', '紫', '冷靜、清晰思考'], en: ['Amethyst', 'Purple', 'Calm, clear thinking'] },
 { c: '#7FC4D6', rec: ['B10'], zh: ['海藍寶', '淺藍', '勇氣、平靜溝通'], en: ['Aquamarine', 'Pale blue', 'Courage, calm talk'] },
 { c: '#E8ECEF', rec: ['B08', 'D02'], zh: ['鑽石（可用白水晶）', '透明', '純淨、承諾'], en: ['Diamond (or clear quartz)', 'Clear', 'Purity, commitment'] },
 { c: '#2E8B57', rec: ['B02', 'B01'], zh: ['祖母綠', '綠', '成長、愛情'], en: ['Emerald', 'Green', 'Growth, love'] },
 { c: '#E9E4F0', rec: ['B08'], zh: ['珍珠、月光石', '乳白', '溫柔、直覺'], en: ['Pearl, moonstone', 'Milky white', 'Gentleness, intuition'] },
 { c: '#B3123A', rec: ['B04', 'B03'], zh: ['紅寶石', '紅', '熱情、活力'], en: ['Ruby', 'Red', 'Passion, vitality'] },
 { c: '#9ACD32', rec: ['B01'], zh: ['橄欖石', '黃綠', '開朗、新開始'], en: ['Peridot', 'Lime green', 'Cheer, new starts'] },
 { c: '#1F3F8F', rec: ['B10', 'B09'], zh: ['藍寶石', '深藍', '智慧、忠誠'], en: ['Sapphire', 'Deep blue', 'Wisdom, loyalty'] },
 { c: '#D9668F', rec: ['B04'], zh: ['碧璽、蛋白石', '粉紅、彩色', '創意、多彩'], en: ['Tourmaline, opal', 'Pink, multicolour', 'Creativity, variety'] },
 { c: '#E3A21A', rec: ['B05', 'D03'], zh: ['黃玉、黃水晶', '金黃', '溫暖、自信'], en: ['Topaz, citrine', 'Golden', 'Warmth, confidence'] },
 { c: '#3FA7A0', rec: ['B10'], zh: ['綠松石、坦桑石', '藍綠', '保護、旅途平安'], en: ['Turquoise, tanzanite', 'Blue-green', 'Protection, safe travels'] }
];
let stView = null;
function paneStone() {
  const m = stView || profile.m, s = BSTONE[m - 1], L5 = isEn() ? s.en : s.zh, z = sunSign(profile.m, profile.d);
  const zs = z.rec.map(id => L(byId(id)).name).join(t('sep'));
  const months = BSTONE.map((x, i) => `<button type="button" class="chip st-chip" data-stm="${i + 1}" aria-pressed="${i + 1 === m}"><i style="background:${x.c}"></i>${t('stM')(i + 1)}${i + 1 === profile.m ? ' ★' : ''}</button>`).join('');
  const sel = byId(s.rec[0]).el;
  return block(sel, `<p class="lead">${m === profile.m ? t('stLead')(profile.name, L5[0]) : t('stOther')(isEn() ? t('stM')(m) : m, L5[0])}${infoTip(t('whatIs'), t('stInfo'))}</p>
    <div class="facts">${fact(t('stFacts').month, t('stM')(m))}${fact(t('stFacts').color, `<i class="swatch" style="background:${s.c}"></i>${L5[1]}`)}${fact(t('stFacts').mean, L5[2])}${m === profile.m ? fact(t('stFacts').zodiac, zs) : ''}</div>`) +
    `<h4 class="bd-h">${t('stAll')}</h4><div class="filters">${months}</div>` + crystalsFor(sel, s.rec[0]);
}

/* ---------- 配對合盤 ---------- */
let mtIn = { date: '1988-08-20', name: '' };
const KE = { 木: '土', 火: '金', 土: '水', 金: '木', 水: '火' };
const HAI = [[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];
function weakOf(p) {
  const cnt = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  p.forEach(x => { if (x) { cnt[ST_EL[x[0]]]++; cnt[BR_EL[x[1]]]++; } });
  const min = Math.min(...ELS.map(e => cnt[e])); return ELS.find(e => cnt[e] === min);
}
function paneMatch(c) {
  const [y, m, d] = mtIn.date.split('-').map(Number);
  const other = { y, m, d, hh: null, mm: null }, p2 = bazi(other);
  const z1 = sunSign(profile.m, profile.d), z2 = sunSign(m, d);
  const starK = z1.el === z2.el ? 'same' : ['火風', '風火', '土水', '水土'].includes(z1.el + z2.el) ? 'good' : 'diff';
  const b1 = c.p[0][1], b2 = p2[0][1];
  const sxK = b1 === b2 ? 'same' : LIUHE[b1] === b2 ? 'liuhe' : SANHE.some(g => g.includes(b1) && g.includes(b2)) ? 'sanhe'
    : mod(b1 - b2, 12) === 6 ? 'chong' : HAI.some(h => h.includes(b1) && h.includes(b2)) ? 'hai' : 'none';
  const e1 = c.dmEl, e2 = ST_EL[p2[2][0]];
  const dmK = e1 === e2 ? 'same' : GEN[e1] === e2 || GEN[e2] === e1 ? 'gen' : 'ke';
  const sc = Math.round(({ same: 85, good: 90, diff: 58 }[starK] + { liuhe: 96, sanhe: 92, same: 76, chong: 42, hai: 52, none: 70 }[sxK] + { gen: 92, same: 80, ke: 56 }[dmK]) / 3);
  const nm = x => isEn() ? x.en : x.zh, an = b => isEn() ? ANI_EN[b] : ANI_ZH[b];
  const cls = k => ['diff', 'chong', 'hai', 'ke'].includes(k) ? 'bad' : ['good', 'liuhe', 'sanhe', 'gen'].includes(k) ? 'good' : '';
  const w2 = weakOf(p2);
  return `<form class="tq" id="mtForm"><label for="mtDate">${t('mtForm')}<input id="mtDate" type="date" value="${esc(mtIn.date)}" min="1920-01-01" max="2026-12-31" required></label>
      <label for="mtName">${t('mtName')}<input id="mtName" type="text" value="${esc(mtIn.name)}"></label><button class="btn" type="submit">${t('mtGo')}</button></form>` +
    block(sc >= 72 ? '木' : sc >= 60 ? '土' : '火', `<p class="lead">${t('mtLead')(profile.name, esc(mtIn.name), sc)}${infoTip(t('whatIs'), t('mtInfo'))}</p>
    <p style="margin:0">${t('mtVerdict')(sc)}</p>
    <div class="facts">${fact(t('mtFacts').star, `${z1.sym} × ${z2.sym} ${t('mtStar')[starK]}`, cls(starK))}${fact(t('mtFacts').sx, `${an(b1)} × ${an(b2)} ${t('mtSx')[sxK]}`, cls(sxK))}${fact(t('mtFacts').dm, `${t('elName')(e1)} × ${t('elName')(e2)} ${t('mtDm')[dmK]}`, cls(dmK))}</div>
    <p class="note">${nm(z1)} × ${nm(z2)}</p><p style="margin:0">${t('mtRec')}</p>`) + crystalsFor(w2);
}

/* ---------- 九星氣學 ---------- */
const NINE = [null,
 { el: '水', zh: ['一白水星', '溫和、適應力強，外柔內剛，識得忍耐等機會。'], en: ['1 White Water', 'Gentle and adaptable, soft outside and firm inside; patient for the right moment.'] },
 { el: '土', zh: ['二黑土星', '踏實、肯付出，默默支持身邊人，做嘢有耐性。'], en: ['2 Black Earth', 'Down-to-earth and giving, quietly supportive and patient at work.'] },
 { el: '木', zh: ['三碧木星', '朝氣、行動快，有想法就即刻做，講嘢直接。'], en: ['3 Jade Wood', 'Lively and fast-moving; acts on ideas at once and speaks directly.'] },
 { el: '木', zh: ['四綠木星', '人緣好、識溝通，處事圓融，鍾意自由。'], en: ['4 Green Wood', 'Popular and a good communicator; tactful and freedom-loving.'] },
 { el: '土', zh: ['五黃土星', '氣場強、有領導力，遇事唔怕扛，但要學識放鬆。'], en: ['5 Yellow Earth', 'A strong presence and leader who shoulders things; learn to relax.'] },
 { el: '金', zh: ['六白金星', '有責任感、有原則，追求完美，適合做主導。'], en: ['6 White Metal', 'Responsible and principled, a perfectionist suited to leading.'] },
 { el: '金', zh: ['七赤金星', '風趣、識享受，口才好，社交能力強。'], en: ['7 Red Metal', 'Witty, enjoys life, a fine talker with strong social skills.'] },
 { el: '土', zh: ['八白土星', '穩重、有毅力，擅長儲蓄同累積，遇變能轉。'], en: ['8 White Earth', 'Steady and persistent, good at saving and turning change to advantage.'] },
 { el: '火', zh: ['九紫火星', '熱情、有品味，觸覺敏銳，鍾意成為焦點。'], en: ['9 Purple Fire', 'Passionate and stylish, perceptive and fond of the spotlight.'] }
];
const NINE_YEAR = [   // by CELLS index (palace the star sits in for 2026)
 ['人緣同合作運旺，適合傾合作、擴闊人脈。', 'Good year for partnerships and widening your network.'],
 ['表現機會多、容易受注目，留意情緒同口舌。', 'Plenty of chances to shine; watch your temper and words.'],
 ['宜穩守、照顧身體同屋企，唔好急進。', 'Hold steady and look after health and home; don’t rush.'],
 ['衝勁大，新計劃起步嘅好時機。', 'High drive; a good time to launch new plans.'],
 ['轉捩點之年，變化多，宜先定好方向。', 'A turning-point year with many changes; set your direction first.'],
 ['收穫同享受期，記得留意開支。', 'A time of reward and enjoyment; mind your spending.'],
 ['宜沉澱、整理同學習，為下一步準備。', 'Settle, sort out and study to prepare your next step.'],
 ['低調蓄力，適合進修同休息。', 'Keep a low profile and recharge; good for study and rest.'],
 ['有貴人同上司支持，適合爭取升職。', 'Support from mentors and bosses; good for seeking promotion.']
];
function paneNine(c) {
  const yi = mod(6 * c.p[0][0] - 5 * c.p[0][1], 60), yy = mod(profile.y - 4, 60) === yi ? profile.y : profile.y - 1;
  const ys = mod(1 - (yy - 2026) - 1, 9) + 1;
  const k = mod(c.p[1][1] - 2, 12), start = [1, 4, 7].includes(ys) ? 8 : [3, 6, 9].includes(ys) ? 5 : 2;
  const ms = mod(start - k - 1, 9) + 1;
  const ci = CELLS.findIndex(x => x.fs === ys), cell = CELLS[ci], i = isEn() ? 1 : 0, N = s => (isEn() ? NINE[s].en : NINE[s].zh);
  return block(NINE[ys].el, `<p class="lead">${t('nnLead')(profile.name, N(ys)[0])}${infoTip(t('whatIs'), t('nnInfo'))}</p>
    <p style="margin:0">${N(ys)[1]}</p>
    <div class="facts">${fact(t('nnFacts').month, N(ms)[0])}${fact(t('nnFacts').el, t('elName')(NINE[ys].el))}${fact(t('nnFacts').y26, cell[lang].dir)}</div>
    <p style="margin:0"><strong>${t('nnYear')}：</strong>${NINE_YEAR[ci][i]}</p>`) + crystalsFor(NINE[ys].el);
}

/* ---------- 二十八宿 ---------- */
const XIU = {
 角: ['Horn', '有開拓精神，鍾意帶頭做新嘢。', 'A pioneer who likes to lead new ventures.'],
 亢: ['Neck', '有骨氣、唔肯屈服，凡事講道理。', 'Principled and unbending; argues from reason.'],
 氐: ['Root', '踏實勤力，慢慢建立根基。', 'Grounded and diligent, building slowly.'],
 房: ['Room', '溫和有福氣，人緣好。', 'Gentle and fortunate, well liked.'],
 心: ['Heart', '心思細密，感受力強。', 'Perceptive, with deep feelings.'],
 尾: ['Tail', '有耐性，做嘢有始有終。', 'Patient; sees things through.'],
 箕: ['Winnowing Basket', '好動愛自由，鍾意四圍去。', 'Restless and free, loves to roam.'],
 斗: ['Dipper', '有遠見，識計劃同理財。', 'Far-sighted, good at planning and money.'],
 牛: ['Ox', '肯捱肯做，責任感重。', 'Hard-working, with a strong sense of duty.'],
 女: ['Girl', '手巧細心，重視生活細節。', 'Skilful and careful about daily details.'],
 虛: ['Emptiness', '想像力豐富，鍾意思考。', 'Imaginative and reflective.'],
 危: ['Rooftop', '敢冒險，臨危不亂。', 'Daring, and steady in a crisis.'],
 室: ['Encampment', '顧家，重視安穩生活。', 'Home-loving; values security.'],
 壁: ['Wall', '好學，鍾意閱讀同累積知識。', 'Studious; loves reading and gathering knowledge.'],
 奎: ['Legs', '有才華，文藝觸覺好。', 'Talented, with an artistic touch.'],
 婁: ['Bond', '識照顧人，擅長團隊合作。', 'Caring and a good team player.'],
 胃: ['Stomach', '有儲備意識，做事穩陣。', 'Builds reserves and works steadily.'],
 昴: ['Hairy Head', '直率坦白，愛恨分明。', 'Frank; loves and hates clearly.'],
 畢: ['Net', '心思縝密，識得把握機會。', 'Meticulous and quick to seize chances.'],
 觜: ['Turtle Beak', '口才好，反應快。', 'Eloquent and quick-witted.'],
 參: ['Three Stars', '有正義感，鍾意打抱不平。', 'A strong sense of justice.'],
 井: ['Well', '冷靜理性，追求公平。', 'Calm and rational; values fairness.'],
 鬼: ['Ghost', '直覺強，對神秘事物有興趣。', 'Intuitive, drawn to the mysterious.'],
 柳: ['Willow', '柔中帶剛，適應力強。', 'Soft yet firm, highly adaptable.'],
 星: ['Star', '有魅力，鍾意成為焦點。', 'Charismatic; enjoys the spotlight.'],
 張: ['Extended Net', '大方熱情，識得招呼人。', 'Generous and warm, a great host.'],
 翼: ['Wings', '志向遠大，鍾意出外闖。', 'Ambitious; likes to venture abroad.'],
 軫: ['Chariot', '細心可靠，擅長安排事務。', 'Careful and reliable, good at arranging things.']
};
const SHOU_EN = { 青龍: 'Azure Dragon (east)', 白虎: 'White Tiger (west)', 朱雀: 'Vermilion Bird (south)', 玄武: 'Black Tortoise (north)' };
const ZHENG_EL = { 木: '木', 火: '火', 土: '土', 金: '金', 水: '水', 日: '火', 月: '水' };
const ZHENG_EN = { 木: 'Jupiter', 火: 'Mars', 土: 'Saturn', 金: 'Venus', 水: 'Mercury', 日: 'Sun', 月: 'Moon' };
function paneXiu() {
  const l = lunarOf(profile), x = toTrad(l.getXiu()), X = XIU[x], z = l.getZheng(), sh = toTrad(l.getShou()), lk = l.getXiuLuck();
  const el = ZHENG_EL[z], name = isEn() ? `${x} · ${X[0]}` : `${x}宿`;
  return block(el, `<p class="lead">${t('xuLead')(profile.name, name)}${infoTip(t('whatIs'), t('xuInfo'))}</p>
    <p style="margin:0">${isEn() ? X[2] : X[1]}</p>
    <div class="facts">${fact(t('xuFacts').shou, isEn() ? SHOU_EN[sh] : `${sh}（${toTrad(l.getGong())}方）`)}${fact(t('xuFacts').zheng, isEn() ? ZHENG_EN[z] : z)}${fact(t('xuFacts').animal, toTrad(l.getAnimal()))}${fact(t('xuFacts').luck, t('xuLuck')[lk] || lk, lk === '吉' ? 'good' : 'bad')}</div>`) + crystalsFor(el);
}

/* ---------- 瑪雅曆 (13 Moon / Dreamspell count) ---------- */
const SEALS = [
 ['紅龍', 'Red Dragon', '誕生、滋養', 'Birth, nurture'], ['白風', 'White Wind', '溝通、靈感', 'Communication, spirit'],
 ['藍夜', 'Blue Night', '夢想、豐盛', 'Dreams, abundance'], ['黃種子', 'Yellow Seed', '目標、開花', 'Intention, flowering'],
 ['紅蛇', 'Red Serpent', '生命力、本能', 'Life force, instinct'], ['白世界橋', 'White Worldbridger', '連結、放下', 'Connection, letting go'],
 ['藍手', 'Blue Hand', '實踐、療癒', 'Doing, healing'], ['黃星星', 'Yellow Star', '美感、藝術', 'Beauty, art'],
 ['紅月', 'Red Moon', '淨化、流動', 'Cleansing, flow'], ['白狗', 'White Dog', '忠誠、愛心', 'Loyalty, love'],
 ['藍猴', 'Blue Monkey', '玩心、魔法', 'Play, magic'], ['黃人', 'Yellow Human', '自由意志、智慧', 'Free will, wisdom'],
 ['紅天行者', 'Red Skywalker', '探索、空間', 'Exploration, space'], ['白巫師', 'White Wizard', '接納、永恆', 'Receptivity, timelessness'],
 ['藍鷹', 'Blue Eagle', '視野、創造', 'Vision, creativity'], ['黃戰士', 'Yellow Warrior', '勇氣、提問', 'Courage, questioning'],
 ['紅地球', 'Red Earth', '導航、同步', 'Navigation, synchronicity'], ['白鏡', 'White Mirror', '反映、秩序', 'Reflection, order'],
 ['藍風暴', 'Blue Storm', '轉化、能量', 'Transformation, energy'], ['黃太陽', 'Yellow Sun', '光明、生命', 'Light, life']
];
const TONES = [
 ['磁性', 'Magnetic', '凝聚目標'], ['月亮', 'Lunar', '面對挑戰'], ['電力', 'Electric', '啟動服務'], ['自我存在', 'Self-existing', '定義形式'],
 ['超頻', 'Overtone', '賦予力量'], ['韻律', 'Rhythmic', '平衡組織'], ['共振', 'Resonant', '調和頻率'], ['銀河', 'Galactic', '整合信念'],
 ['太陽', 'Solar', '實現意圖'], ['行星', 'Planetary', '顯化成果'], ['光譜', 'Spectral', '釋放放下'], ['水晶', 'Crystal', '合作分享'], ['宇宙', 'Cosmic', '超越堅持']
];
const TONE_EN = ['Unify purpose', 'Meet the challenge', 'Activate service', 'Define form', 'Empower', 'Balance', 'Attune', 'Integrate', 'Realise intention', 'Manifest', 'Release', 'Cooperate', 'Transcend'];
function kinOf(y, m, d) {
  const days = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(2013, 6, 26)) / 864e5);
  let leaps = 0;   // 29 Feb is not counted
  const a = Math.min(y, 2013), b = Math.max(y, 2013);
  for (let yr = a; yr <= b; yr++) {
    if (!(yr % 4 === 0 && (yr % 100 !== 0 || yr % 400 === 0))) continue;
    const f = Date.UTC(yr, 1, 29), lo = Math.min(Date.UTC(y, m - 1, d), Date.UTC(2013, 6, 26)), hi = Math.max(Date.UTC(y, m - 1, d), Date.UTC(2013, 6, 26));
    if (f > lo && f <= hi) leaps++;
  }
  return mod(163 + days - Math.sign(days) * leaps, 260) + 1;   // 26 Jul 2013 = Kin 164
}
function paneMaya() {
  const md = profile.m === 2 && profile.d === 29 ? [2, 28] : [profile.m, profile.d];
  const kin = kinOf(profile.y, ...md), s = (kin - 1) % 20, tn = (kin - 1) % 13, S = SEALS[s], Tn = TONES[tn];
  const now = new Date(), tk = kinOf(now.getFullYear(), now.getMonth() + 1, now.getDate()), el = ['火', '金', '水', '土'][s % 4];
  const nm = isEn() ? `${Tn[1]} ${S[1]}` : `${Tn[0]}的${S[0]}`;
  const tS = SEALS[(tk - 1) % 20], tT = TONES[(tk - 1) % 13];
  return block(el, `<p class="lead">${t('myLead')(profile.name, kin, nm)}${infoTip(t('whatIs'), t('myInfo'))}</p>
    <div class="facts">${fact(t('myFacts').seal, isEn() ? `${S[1]}: ${S[3]}` : `${S[0]}：${S[2]}`)}${fact(t('myFacts').tone, isEn() ? `${tn + 1} ${Tn[1]}: ${TONE_EN[tn]}` : `${tn + 1} ${Tn[0]}：${Tn[2]}`)}${fact(t('myFacts').today, `${tk} ${isEn() ? `${tT[1]} ${tS[1]}` : `${tT[0]}的${tS[0]}`}`)}</div>`) + crystalsFor(el);
}

/* ---------- 小六壬 ---------- */
const LR6 = [
 { el: '木', zh: ['大安', '事事平穩，求事可成，宜靜唔宜急。'], en: ['Great Peace', 'Things are stable and plans can succeed; stay calm rather than rush.'] },
 { el: '土', zh: ['留連', '事情會拖，要有耐性，唔好心急。'], en: ['Delay', 'Things will drag; be patient.'] },
 { el: '火', zh: ['速喜', '好消息快到，宜即刻行動。'], en: ['Quick Joy', 'Good news is coming soon; act now.'] },
 { el: '金', zh: ['赤口', '容易有口角是非，講嘢要小心。'], en: ['Red Mouth', 'Prone to arguments; choose your words carefully.'] },
 { el: '水', zh: ['小吉', '有小收穫，人際和順。'], en: ['Small Luck', 'Small gains and smooth relations.'] },
 { el: '土', zh: ['空亡', '暫時未有結果，等一等再算。'], en: ['Void', 'No result for now; wait and ask again later.'] }
];
let xlNow = false;
function paneXlr() {
  const l = xlNow ? Solar.fromDate(new Date()).getLunar() : lunarOf(profile);
  const lm = Math.abs(l.getMonth()), ld = l.getDay(), hz = xlNow || profile.hh != null ? l.getTimeZhiIndex() : null;
  const p1 = (lm - 1) % 6, p2 = (p1 + ld - 1) % 6, p3 = hz == null ? null : (p2 + hz) % 6, r = p3 == null ? p2 : p3;
  const R = LR6[r], N = x => (isEn() ? x.en : x.zh);
  const ring = LR6.map((x, i) => `<div class="xl-pos el-${x.el}${i === r ? ' on' : ''}"><b>${N(x)[0]}</b><small>${[i === p1 ? '①' : '', i === p2 ? '②' : '', i === p3 ? '③' : ''].join('')}</small></div>`).join('');
  return `<div class="filters"><button type="button" class="chip" data-xl="0" aria-pressed="${!xlNow}">${t('xlBirth')}</button><button type="button" class="chip" data-xl="1" aria-pressed="${xlNow}">${t('xlNow')}</button></div>` +
    block(R.el, `<p class="lead">${t('xlLead')(N(R)[0])}${infoTip(t('whatIs'), t('xlInfo'))}</p><p style="margin:0">${N(R)[1]}</p>
    <div class="xl-ring">${ring}</div>
    <p class="note">${t('xlSteps')(lm, ld, hz == null ? '?' : BR[hz])}</p>`) + crystalsFor(R.el);
}

/* ---------- 盧恩符文 ---------- */
const RUNES = [
 { n: 'Fehu', p: 'M10 5V55M10 25L30 10M10 35L30 20', el: '土', rec: 'B05', zh: ['財富', '收入同資源增加，記得珍惜。', '錢財流失，留意開支。'], en: ['Wealth', 'Income and resources grow; value them.', 'Money slips away; watch spending.'] },
 { n: 'Uruz', p: 'M10 55V5L30 20V55', el: '木', rec: 'B01', zh: ['原牛', '體力同意志強，有衝勁。', '精神不足，要休息。'], en: ['Aurochs', 'Strong body and will, full of drive.', 'Low energy; rest.'] },
 { n: 'Thurisaz', p: 'M12 5V55M12 18L28 30L12 42', el: '火', rec: 'B03', zh: ['巨人', '遇到阻礙，停一停再出手。', '衝動行事會傷到自己。'], en: ['Giant', 'An obstacle; pause before acting.', 'Rash moves backfire.'] },
 { n: 'Ansuz', p: 'M10 5V55M10 5L28 18M10 18L28 31', el: '金', rec: 'B08', zh: ['神諭', '好消息、好建議，留心聽。', '溝通有誤會。'], en: ['Message', 'Good news and advice; listen closely.', 'Miscommunication.'] },
 { n: 'Raidho', p: 'M10 55V5L28 17L10 29L28 55', el: '水', rec: 'B10', zh: ['旅程', '出行或者轉變順利。', '行程受阻。'], en: ['Journey', 'Travel or change goes smoothly.', 'Plans are held up.'] },
 { n: 'Kenaz', p: 'M28 8L10 30L28 52', el: '火', rec: 'D01', zh: ['火炬', '靈感同創意湧現。', '熱情減退。'], en: ['Torch', 'Inspiration and creativity flow.', 'Enthusiasm fades.'] },
 { n: 'Gebo', p: 'M8 8L32 52M32 8L8 52', el: '火', rec: 'B04', zh: ['禮物', '互相付出，關係平衡。'], en: ['Gift', 'Give and take in balance.'] },
 { n: 'Wunjo', p: 'M10 55V5L28 17L10 29', el: '土', rec: 'B05', zh: ['喜悅', '開心滿足，願望達成。', '小小失落。'], en: ['Joy', 'Contentment; a wish comes true.', 'A small letdown.'] },
 { n: 'Hagalaz', p: 'M8 5V55M32 5V55M8 22L32 38', el: '水', rec: 'B09', zh: ['冰雹', '突如其來嘅變化，過後會更好。'], en: ['Hail', 'Sudden change that clears the way.'] },
 { n: 'Nauthiz', p: 'M20 5V55M10 22L30 34', el: '土', rec: 'B06', zh: ['需要', '欠缺嘅嘢提醒你要有耐性。'], en: ['Need', 'What you lack teaches patience.'] },
 { n: 'Isa', p: 'M20 5V55', el: '水', rec: 'B09', zh: ['冰', '暫停、冷靜，唔宜行動。'], en: ['Ice', 'Pause and cool down; not a time to act.'] },
 { n: 'Jera', p: 'M16 8L6 20L16 32M24 28L34 40L24 52', el: '土', rec: 'D03', zh: ['收成', '努力有回報，時候到就有收成。'], en: ['Harvest', 'Effort pays off in due time.'] },
 { n: 'Eihwaz', p: 'M20 5V55M20 5L30 15M20 55L10 45', el: '木', rec: 'B01', zh: ['紫杉', '堅韌，捱得過難關。'], en: ['Yew', 'Resilience through hard times.'] },
 { n: 'Perthro', p: 'M10 5V55M10 8L26 20L30 10M10 52L26 40L30 50', el: '水', rec: 'B10', zh: ['命運之杯', '有驚喜或者秘密揭開。', '期望落空。'], en: ['Lot cup', 'A surprise or a secret revealed.', 'Disappointment.'] },
 { n: 'Algiz', p: 'M20 55V5M20 25L8 8M20 25L32 8', el: '金', rec: 'D02', zh: ['保護', '受保護，有貴人。', '要小心提防。'], en: ['Protection', 'Protected, with helpful people.', 'Stay on guard.'] },
 { n: 'Sowilo', p: 'M26 5L12 25L28 35L14 55', el: '火', rec: 'B03', zh: ['太陽', '成功、自信、充滿能量。'], en: ['Sun', 'Success, confidence and energy.'] },
 { n: 'Tiwaz', p: 'M20 55V5M8 18L20 5L32 18', el: '金', rec: 'B07', zh: ['戰神', '公正、勇氣，堅持就會贏。', '失去動力。'], en: ['Warrior', 'Justice and courage; persist and win.', 'Lost momentum.'] },
 { n: 'Berkano', p: 'M10 5V55M10 5L28 17L10 29L28 42L10 55', el: '木', rec: 'B02', zh: ['樺樹', '成長、家庭、新開始。', '停滯不前。'], en: ['Birch', 'Growth, family and new beginnings.', 'Stagnation.'] },
 { n: 'Ehwaz', p: 'M8 55V5L20 20L32 5V55', el: '土', rec: 'B06', zh: ['馬', '合作順利，進展快。', '合作唔和。'], en: ['Horse', 'Smooth teamwork and fast progress.', 'Partners out of step.'] },
 { n: 'Mannaz', p: 'M8 55V5L32 30M32 55V5L8 30', el: '金', rec: 'B08', zh: ['人', '認識自己，人際互助。', '覺得孤立。'], en: ['Humankind', 'Self-knowledge and mutual help.', 'Feeling isolated.'] },
 { n: 'Laguz', p: 'M12 55V5L30 20', el: '水', rec: 'B10', zh: ['水', '跟直覺走，情感流動。', '迷惘、搵唔到方向。'], en: ['Water', 'Follow intuition; feelings flow.', 'Confusion.'] },
 { n: 'Ingwaz', p: 'M20 15L32 30L20 45L8 30Z', el: '木', rec: 'B02', zh: ['種子', '完成一個階段，準備新開始。'], en: ['Seed', 'A phase completes; ready to begin again.'] },
 { n: 'Dagaz', p: 'M8 10V50L32 10V50L8 10', el: '火', rec: 'D01', zh: ['黎明', '突破、豁然開朗。'], en: ['Dawn', 'Breakthrough and clarity.'] },
 { n: 'Othala', p: 'M20 5L32 20L8 45M20 5L8 20L32 45', el: '土', rec: 'D03', zh: ['家園', '家庭、傳承、根基穩固。', '家事煩惱。'], en: ['Heritage', 'Home, inheritance and firm roots.', 'Family worries.'] }
];
let runeDraw = null;
function drawRunes() {
  const idx = [...RUNES.keys()];
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  runeDraw = idx.slice(0, 3).map(i => ({ i, rev: RUNES[i].zh.length > 2 && Math.random() < 0.3 }));
}
function paneRune() {
  if (!runeDraw) drawRunes();
  const cards = runeDraw.map((d, k) => {
    const r = RUNES[d.i], R = isEn() ? r.en : r.zh;
    return `<div class="tcard el-${r.el}"><span class="pos">${t('rnPos')[k]}</span>
      <svg class="rune${d.rev ? ' rev' : ''}" viewBox="0 0 40 60" aria-hidden="true"><path d="${r.p}"/></svg>
      <b class="tname">${r.n} · ${R[0]}</b><span class="ori">${d.rev ? t('rnRev') : t('rnUp')}</span><p>${d.rev ? R[2] : R[1]}</p></div>`;
  }).join('');
  return `<p style="margin:0"><button type="button" class="btn" id="rnDraw">${t('rnDraw')}</button>${infoTip(t('whatIs'), t('rnInfo'))}</p>
    <div class="spread">${cards}</div>${crystalsFor(RUNES[runeDraw[1].i].el, RUNES[runeDraw[1].i].rec)}`;
}

/* ---------- 蛇夫座 (used by paneAstro) ---------- */
const SIGN13 = [[120, '摩羯座', 'Capricornus'], [216, '水瓶座', 'Aquarius'], [311, '雙魚座', 'Pisces'], [418, '白羊座', 'Aries'], [513, '金牛座', 'Taurus'],
 [621, '雙子座', 'Gemini'], [720, '巨蟹座', 'Cancer'], [810, '獅子座', 'Leo'], [916, '處女座', 'Virgo'], [1030, '天秤座', 'Libra'],
 [1123, '天蠍座', 'Scorpius'], [1129, '蛇夫座', 'Ophiuchus'], [1217, '射手座', 'Sagittarius']];
function sign13(m, d) {
  const md = m * 100 + d; let s = SIGN13[12];
  SIGN13.forEach(x => { if (md >= x[0]) s = x; });
  return isEn() ? s[2] : s[1];
}
const ophFact = () => fact(t('ophFact') + infoTip(t('whatIs'), t('ophInfo')), sign13(profile.m, profile.d));

Object.assign(ORACLE_PANES, { stone: paneStone, nine: () => paneNine(chartData()), xiu: paneXiu, maya: paneMaya, xlr: paneXlr, rune: paneRune, match: () => paneMatch(chartData()) });
Object.assign(ORACLE_WIRE, {
  stone: pane => pane.querySelectorAll('[data-stm]').forEach(b => b.onclick = () => { stView = +b.dataset.stm; renderPane(); }),
  match: pane => { const f = pane.querySelector('#mtForm'); if (f) f.onsubmit = e => { e.preventDefault(); mtIn = { date: $('mtDate').value || mtIn.date, name: $('mtName').value.trim() }; renderPane(); }; },
  xlr: pane => pane.querySelectorAll('[data-xl]').forEach(b => b.onclick = () => { xlNow = b.dataset.xl === '1'; renderPane(); }),
  rune: pane => { const b = pane.querySelector('#rnDraw'); if (b) b.onclick = () => { drawRunes(); renderPane(); }; }
});
