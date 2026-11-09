/* 奇門遁甲、大六壬、七政四餘、印度占星. Readings written for this site; uses app.js helpers inside functions only. */
const T6 = {
  zh: {
    tabs: { qimen: '奇門遁甲', liuren: '大六壬', qizheng: '七政四餘', vedic: '印度占星' },
    useBirth: '用出生時間', useNow: '用而家時間', noTimeNow: '你冇填出生時間，所以用而家時間起盤。',
    qmLead: (d, j) => `${d}<span class="big">${j}</span>`,
    qmFacts: { zhifu: '值符', zhishi: '值使', good: '吉門方位' },
    qmInfo: '時家奇門、轉盤、拆補法：按節氣定陽遁或陰遁同局數，按日柱符頭定上中下元；排地盤三奇六儀，再按時辰轉天盤九星、八門同八神。每格由上至下：八神、九星、八門、天盤干／地盤干。南方喺上。開、休、生三吉門所在方位傳統上宜出行、求事。',
    qmYuan: ['上元', '中元', '下元'], qmDun: ['陽遁', '陰遁'], qmJu: n => `${n} 局`,
    qmDoor: '值使門',
    lrLead: (a, b) => `初傳 ${a}<span class="big">${b}</span>`,
    lrFacts: { jiang: '月將', hour: '占時', method: '取傳法' },
    lrPlate: '天地盤（外圈地盤、內格天盤）', lrKe: '四課', lrChuan: '三傳',
    lrInfo: '大六壬：以月將加占時排天地盤，由日干、日支起四課，再按賊剋、比用、涉害、遙剋、昂星等法發三傳。呢度係簡化版：涉害只按孟仲季取，未排十二天將，別責、八專當一般課處理。六親以日干五行計。',
    lrM: { zei: '賊剋（下賊上）', ke: '賊剋（上剋下）', bi: '比用', she: '涉害', yao: '遙剋', ang: '昂星', fu: '伏吟', fan: '返吟' },
    qz: { 日: '太陽', 月: '太陰', 水: '水星', 金: '金星', 火: '火星', 木: '木星', 土: '土星', 羅: '羅睺', 計: '計都', 孛: '月孛' },
    qzLead: (n, g) => `${n ? n + '嘅' : '你嘅'}命宮<span class="big">${g}</span>`,
    qzLeadNo: '七政四餘星盤',
    qzFacts: { lord: '命主', at: '命主位置' },
    qzCols: ['星曜', '宮', '宿'],
    qzInfo: '七政＝日、月、金木水火土五星；四餘＝羅睺、計都、月孛、紫氣。行星位置用天文計算；宮用中氣分十二宮（同時憲曆），宿度用漢代古度按角宿距星（角宿一）推算，屬近似值。羅睺取北交點、計都取南交點、月孛取月球平遠地點；紫氣冇天文對應、各派起點唔同，所以未列。命宮要有出生時間先計到。',
    qzLord: { 日: '光明磊落，有領導氣質。', 月: '溫柔細膩，重感情同家庭。', 水: '聰明好學，口才同文筆好。', 金: '有品味，人緣好，重視美感。', 火: '勇敢積極，行動力強。', 木: '寬厚仁慈，有福氣同貴人。', 土: '穩重踏實，有耐性，大器晚成。' },
    vdLead: (n, s) => `${n ? n + '嘅' : '你嘅'}月宿<span class="big">${s}</span>`,
    vdFacts: { pada: '分', moon: '月亮星座（恆星）', sun: '太陽星座（恆星）', lagna: '上升（恆星）', dasha: '而家大運' },
    vdInfo: '印度占星（Jyotish）用恆星黃道：將西洋（回歸）黃道減去歲差（Lahiri，2026 年約 24.2°），所以星座通常會退後一個。最重要係月亮所在嘅 27 月宿（Nakshatra），每宿再分 4 分（pada）。大運用 Vimshottari 120 年週期，由出生時月宿嘅主星開始計。',
    vdDasha: (p, y) => `${p}（到 ${y} 年）`,
    vdLords: { Ketu: '計都', Venus: '金星', Sun: '太陽', Moon: '月亮', Mars: '火星', Rahu: '羅睺', Jupiter: '木星', Saturn: '土星', Mercury: '水星' }
  },
  en: {
    tabs: { qimen: 'Qi Men Dun Jia', liuren: 'Da Liu Ren', qizheng: 'Seven Luminaries', vedic: 'Vedic astrology' },
    useBirth: 'Use birth time', useNow: 'Use the time now', noTimeNow: 'No birth time was entered, so the chart uses the time now.',
    qmLead: (d, j) => `${d}<span class="big">${j}</span>`,
    qmFacts: { zhifu: 'Chief star', zhishi: 'Chief door', good: 'Lucky-door directions' },
    qmInfo: 'Hour chart, rotating plate, Chai Bu method: the solar term sets yang or yin and the ju number; the day’s lead pillar sets the upper, middle or lower yuan. The earth plate of stems is laid out, then the nine stars, eight doors and eight spirits turn with the hour. Each square shows, top to bottom: spirit, star, door, heaven stem / earth stem. South is at the top. The Open, Rest and Life doors traditionally mark good directions.',
    qmYuan: ['Upper yuan', 'Middle yuan', 'Lower yuan'], qmDun: ['Yang', 'Yin'], qmJu: n => `ju ${n}`,
    qmDoor: 'Chief door',
    lrLead: (a, b) => `First transmission ${a}<span class="big">${b}</span>`,
    lrFacts: { jiang: 'Monthly general', hour: 'Hour', method: 'Method' },
    lrPlate: 'Heaven and earth plates (earth outside, heaven inside)', lrKe: 'Four lessons', lrChuan: 'Three transmissions',
    lrInfo: 'Da Liu Ren places the monthly general on the hour to form the heaven plate, builds four lessons from the day stem and branch, then takes three transmissions by the usual rules. This is simplified: “involved harm” uses only the meng/zhong/ji order, the twelve generals are not placed, and Bie Ze and Ba Zhuan are treated as ordinary charts. Relations are counted from the day stem’s element.',
    lrM: { zei: 'Rebellion (lower controls upper)', ke: 'Control (upper controls lower)', bi: 'Comparison', she: 'Involved harm', yao: 'Distant control', ang: 'Pleiades', fu: 'Hidden (Fu Yin)', fan: 'Reverse (Fan Yin)' },
    qz: { 日: 'Sun', 月: 'Moon', 水: 'Mercury', 金: 'Venus', 火: 'Mars', 木: 'Jupiter', 土: 'Saturn', 羅: 'Rahu (N. node)', 計: 'Ketu (S. node)', 孛: 'Yuebei (lunar apogee)' },
    qzLead: (n, g) => `${n ? n + '’s' : 'Your'} life palace<span class="big">${g}</span>`,
    qzLeadNo: 'Seven Luminaries chart',
    qzFacts: { lord: 'Palace lord', at: 'Lord’s position' },
    qzCols: ['Body', 'Palace', 'Mansion'],
    qzInfo: 'The seven luminaries are the Sun, Moon and five planets; the four remainders are Rahu, Ketu, Yuebei and Ziqi. Positions are computed astronomically. Palaces follow the twelve mid-terms, as in the Qing calendar; mansions use the Han-era widths measured from Spica, so they are approximate. Rahu is the north node, Ketu the south node and Yuebei the mean lunar apogee; Ziqi has no astronomical counterpart and schools disagree on its start, so it is left out. The life palace needs a birth time.',
    qzLord: { 日: 'Open and upright with a leader’s air.', 月: 'Gentle and sensitive, devoted to family.', 水: 'Clever and studious, good with words.', 金: 'Stylish and popular, with an eye for beauty.', 火: 'Brave and active, quick to act.', 木: 'Generous and kind, blessed with helpers.', 土: 'Steady and patient; success comes later.' },
    vdLead: (n, s) => `${n ? n + '’s' : 'Your'} Moon nakshatra<span class="big">${s}</span>`,
    vdFacts: { pada: 'Pada', moon: 'Moon sign (sidereal)', sun: 'Sun sign (sidereal)', lagna: 'Ascendant (sidereal)', dasha: 'Current dasha' },
    vdInfo: 'Vedic astrology (Jyotish) uses the sidereal zodiac: the Western tropical position minus the precession offset (Lahiri, about 24.2° in 2026), so signs often shift back by one. The key factor is the Moon’s nakshatra, one of 27 lunar mansions, each split into four padas. Dashas follow the 120-year Vimshottari cycle, starting from the lord of the birth nakshatra.',
    vdDasha: (p, y) => `${p} (to ${y})`,
    vdLords: { Ketu: 'Ketu', Venus: 'Venus', Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Rahu: 'Rahu', Jupiter: 'Jupiter', Saturn: 'Saturn', Mercury: 'Mercury' }
  }
};
['zh','en'].forEach(k => { Object.assign(T2[k].tabs, T6[k].tabs); const c = Object.assign({}, T6[k]); delete c.tabs; Object.assign(T2[k], c); });

const RING8 = [1, 8, 3, 4, 9, 2, 7, 6];                    // 洛書外圈順時針
const LUO_LAYOUT = [4, 9, 2, 3, 5, 7, 8, 1, 6];            // 南方喺上
const PAL_DIR = { 1: ['北', 'N'], 2: ['西南', 'SW'], 3: ['東', 'E'], 4: ['東南', 'SE'], 5: ['中', 'C'], 6: ['西北', 'NW'], 7: ['西', 'W'], 8: ['東北', 'NE'], 9: ['南', 'S'] };
const ringAt = (p, n) => RING8[mod(RING8.indexOf(p) + n, 8)];
const timeLunar = useNow => useNow || profile.hh == null ? Solar.fromDate(new Date()).getLunar() : lunarOf(profile);
const nowToggle = (key, on) => `<div class="filters"><button type="button" class="chip" data-now="${key}:0" aria-pressed="${!on}"${profile.hh == null ? ' disabled' : ''}>${t('useBirth')}</button><button type="button" class="chip" data-now="${key}:1" aria-pressed="${on}">${t('useNow')}</button></div>` + (profile.hh == null ? `<p class="note">${t('noTimeNow')}</p>` : '');

/* ---------- 奇門遁甲（時家・轉盤・拆補） ---------- */
const QM_JU = {   // [陽0/陰1, 上, 中, 下]
 冬至: [0,1,7,4], 小寒: [0,2,8,5], 大寒: [0,3,9,6], 立春: [0,8,5,2], 雨水: [0,9,6,3], 惊蛰: [0,1,7,4], 春分: [0,3,9,6], 清明: [0,4,1,7], 谷雨: [0,5,2,8], 立夏: [0,4,1,7], 小满: [0,5,2,8], 芒种: [0,6,3,9],
 夏至: [1,9,3,6], 小暑: [1,8,2,5], 大暑: [1,7,1,4], 立秋: [1,2,5,8], 处暑: [1,1,4,7], 白露: [1,9,3,6], 秋分: [1,7,1,4], 寒露: [1,6,9,3], 霜降: [1,5,8,2], 立冬: [1,6,9,3], 小雪: [1,5,8,2], 大雪: [1,4,7,1]
};
const JQ_TRAD = { 惊蛰: '驚蟄', 谷雨: '穀雨', 小满: '小滿', 芒种: '芒種', 处暑: '處暑' };
const QM_STEMS = '戊己庚辛壬癸丁丙乙';
const QM_STAR = { 1: ['天蓬', 'Peng'], 2: ['天芮', 'Rui'], 3: ['天沖', 'Chong'], 4: ['天輔', 'Fu'], 5: ['天禽', 'Qin'], 6: ['天心', 'Xin'], 7: ['天柱', 'Zhu'], 8: ['天任', 'Ren'], 9: ['天英', 'Ying'] };
const QM_DOOR = { 1: ['休', 'Rest'], 2: ['死', 'Death'], 3: ['傷', 'Harm'], 4: ['杜', 'Block'], 6: ['開', 'Open'], 7: ['驚', 'Fright'], 8: ['生', 'Life'], 9: ['景', 'View'] };
const QM_GOD = [['值符', 'Chief'], ['螣蛇', 'Serpent'], ['太陰', 'Moon'], ['六合', 'Harmony'], ['白虎', 'Tiger'], ['玄武', 'Tortoise'], ['九地', 'Earth'], ['九天', 'Heaven']];
const QM_DOOR_TXT = {
 1: ['吉門：宜休息、見貴人、處理人事。', 'Lucky: rest, meeting patrons, people matters.'],
 8: ['吉門：宜求財、開業、置業。', 'Lucky: money, opening a business, property.'],
 3: ['凶門：易有損傷爭執，宜討債。', 'Unlucky: injury or quarrels; good only for collecting debts.'],
 4: ['平門：宜躲避、保密、靜候。', 'Neutral: hiding, secrecy, waiting.'],
 9: ['平門：宜考試、文書、宣傳。', 'Neutral: exams, documents, publicity.'],
 2: ['凶門：諸事不宜，宜靜守。', 'Unlucky: avoid new matters; stay put.'],
 7: ['凶門：易受驚、有官非，小心行事。', 'Unlucky: alarms and disputes; act carefully.'],
 6: ['吉門：宜開業、出行、求職。', 'Lucky: openings, travel, job-seeking.']
};
let qmNow = false;
function qimenChart(l) {
  const jq = l.getPrevJieQi(false).getName(), J = QM_JU[jq];
  const dg = l.getDayGanIndex(), dz = l.getDayZhiIndex(), head = mod(dz - dg % 5, 12);
  const yuan = [0, 6, 3, 9].includes(head) ? 0 : [2, 8, 5, 11].includes(head) ? 1 : 2;
  const yin = J[0] === 1, ju = J[1 + yuan], earth = {};
  [...QM_STEMS].forEach((s, i) => { earth[yin ? mod(ju - 1 - i, 9) + 1 : mod(ju - 1 + i, 9) + 1] = s; });
  const hg = l.getTimeGanIndex(), hz = l.getTimeZhiIndex(), hIdx = mod(6 * hg - 5 * hz, 60);
  const xunYi = '戊己庚辛壬癸'[Math.floor(hIdx / 10)], step = hIdx % 10;
  const palOf = s => +Object.keys(earth).find(p => earth[p] === s);
  const P0 = palOf(xunYi), P0r = P0 === 5 ? 2 : P0;
  let Pt = palOf(hg === 0 ? xunYi : ST[hg]); if (Pt === 5) Pt = 2;
  const sShift = RING8.indexOf(Pt) - RING8.indexOf(P0r);
  let Pd = yin ? mod(P0 - 1 - step, 9) + 1 : mod(P0 - 1 + step, 9) + 1; if (Pd === 5) Pd = 2;
  const dShift = RING8.indexOf(Pd) - RING8.indexOf(P0r);
  const cell = {}; for (let p = 1; p <= 9; p++) cell[p] = { earth: earth[p] };
  RING8.forEach(p => {
    const to = ringAt(p, sShift);
    cell[to].star = p; cell[to].heaven = earth[p] + (p === 2 ? earth[5] : '');
    cell[ringAt(p, dShift)].door = p;
  });
  QM_GOD.forEach((g, i) => { cell[ringAt(Pt, yin ? -i : i)].god = i; });
  return { jq, yin, ju, yuan, cell, zhifu: P0 === 5 ? 5 : P0r, zhishi: P0r, Pd, hz };
}
function paneQimen() {
  const l = timeLunar(qmNow), Q = qimenChart(l), k = isEn() ? 1 : 0;
  const cells = LUO_LAYOUT.map(p => {
    const c = Q.cell[p];
    if (p === 5) return `<div class="qm-cell mid"><small>${PAL_DIR[5][k]}</small><b>${QM_STAR[5][k]}</b><span class="qm-st">${c.earth}</span></div>`;
    const lucky = [1, 6, 8].includes(c.door);
    return `<div class="qm-cell${lucky ? ' lucky' : ''}${p === Q.Pd ? ' chief' : ''}"><small>${PAL_DIR[p][k]} · ${QM_GOD[c.god][k]}</small><b>${QM_STAR[c.star][k]}</b><em>${QM_DOOR[c.door][k]}${isEn() ? '' : '門'}</em><span class="qm-st">${c.heaven} / ${c.earth}</span></div>`;
  }).join('');
  const good = LUO_LAYOUT.filter(p => p !== 5 && [1, 6, 8].includes(Q.cell[p].door)).map(p => `${PAL_DIR[p][k]}（${QM_DOOR[Q.cell[p].door][k]}）`).join(t('sep'));
  const jqName = JQ_TRAD[Q.jq] || Q.jq;
  const el = { 1: '水', 2: '土', 3: '木', 4: '木', 6: '金', 7: '金', 8: '土', 9: '火' }[Q.zhishi];
  return nowToggle('qm', qmNow || profile.hh == null) +
    block(el, `<p class="lead">${t('qmLead')(`${jqName} · ${t('qmYuan')[Q.yuan]} · ${BR[Q.hz]}${isEn() ? '' : '時'}`, `${t('qmDun')[+Q.yin]}${isEn() ? ' ' : ''}${t('qmJu')(Q.ju)}`)}${infoTip(t('whatIs'), t('qmInfo'))}</p>
    <div class="facts">${fact(t('qmFacts').zhifu, QM_STAR[Q.zhifu][k])}${fact(t('qmFacts').zhishi, `${QM_DOOR[Q.zhishi][k]}${isEn() ? '' : '門'}`)}${fact(t('qmFacts').good, good || '—')}</div>
    <div class="qm-grid">${cells}</div>
    <p style="margin:0"><strong>${t('qmDoor')}：</strong>${QM_DOOR_TXT[Q.zhishi][k]}</p>`) + recList(recsOfEl(el, 3));
}

/* ---------- 大六壬（簡化） ---------- */
const LR_QI = { 雨水: 11, 春分: 10, 谷雨: 9, 小满: 8, 夏至: 7, 大暑: 6, 处暑: 5, 秋分: 4, 霜降: 3, 小雪: 2, 冬至: 1, 大寒: 0 };
const LR_JIANG = ['神后', '大吉', '功曹', '太衝', '天罡', '太乙', '勝光', '小吉', '傳送', '從魁', '河魁', '登明'];
const LR_JIANG_EN = ['Shen Hou', 'Da Ji', 'Gong Cao', 'Tai Chong', 'Tian Gang', 'Tai Yi', 'Sheng Guang', 'Xiao Ji', 'Chuan Song', 'Cong Kui', 'He Kui', 'Deng Ming'];
const LR_JI = [2, 4, 5, 7, 5, 7, 8, 10, 11, 1];                     // 日干寄宮
const LR_XING = [3, 10, 5, 0, 4, 8, 6, 1, 2, 9, 7, 11];             // 三刑（辰午酉亥自刑）
const LR_MA = { 8: 2, 0: 2, 4: 2, 2: 8, 6: 8, 10: 8, 5: 11, 9: 11, 1: 11, 11: 5, 3: 5, 7: 5 };
const LIUQIN = [['兄弟', 'Siblings', '朋友、同輩，亦代表競爭。', 'Friends and peers; also rivalry.'], ['子孫', 'Offspring', '開心事、創作、子女，有化解之意。', 'Joy, creativity and children; eases troubles.'],
 ['妻財', 'Wealth', '財運同收入，感情上代表伴侶。', 'Money and income; a partner in love.'], ['官鬼', 'Authority', '工作、壓力或者官非，要小心。', 'Work, pressure or disputes; take care.'], ['父母', 'Parents', '文書、長輩、學業同屋企。', 'Documents, elders, study and home.']];
const relOf = (dayEl, el) => [dayEl, GEN[dayEl], KE[dayEl], Object.keys(KE).find(k => KE[k] === dayEl), Object.keys(GEN).find(k => GEN[k] === dayEl)].indexOf(el);
let lrNow = false;
function liurenChart(l) {
  const jiang = LR_QI[l.getPrevQi(false).getName()], h = l.getTimeZhiIndex(), g = l.getDayGanIndex(), b = l.getDayZhiIndex();
  const up = e => mod(jiang + e - h, 12), down = x => mod(x - jiang + h, 12);
  const dayEl = ST_EL[g], yang = g % 2 === 0;
  const k1 = [LR_JI[g], up(LR_JI[g])], k2 = [k1[1], up(k1[1])], k3 = [b, up(b)], k4 = [k3[1], up(k3[1])];
  const ke = [k1, k2, k3, k4], lowEl = (k, i) => i === 0 ? dayEl : BR_EL[k[0]];
  let first, method;
  const zei = ke.filter((k, i) => KE[lowEl(k, i)] === BR_EL[k[1]]), shang = ke.filter((k, i) => KE[BR_EL[k[1]]] === lowEl(k, i));
  const pick = list => {
    const ups = [...new Set(list.map(k => k[1]))];
    if (ups.length === 1) return [ups[0], null];
    const same = ups.filter(x => (x % 2 === 0) === yang);
    if (same.length === 1) return [same[0], 'bi'];
    const pool = same.length ? same : ups, rank = x => [2, 5, 8, 11].includes(down(x)) ? 0 : [0, 3, 6, 9].includes(down(x)) ? 1 : 2;
    return [pool.slice().sort((a, c) => rank(a) - rank(c))[0], 'she'];
  };
  if (jiang === h) { method = 'fu'; first = (zei.length || shang.length) ? pick(zei.length ? zei : shang)[0] : (yang ? k1[1] : k3[1]); }
  else if (mod(jiang - h, 12) === 6) { method = 'fan'; first = (zei.length || shang.length) ? pick(zei.length ? zei : shang)[0] : LR_MA[b]; }
  else if (zei.length || shang.length) { const [x, m] = pick(zei.length ? zei : shang); first = x; method = m || (zei.length ? 'zei' : 'ke'); }
  else {
    const far = [k2, k3, k4], a = far.filter(k => KE[BR_EL[k[1]]] === dayEl), c = far.filter(k => KE[dayEl] === BR_EL[k[1]]);
    if (a.length || c.length) { first = pick(a.length ? a : c)[0]; method = 'yao'; }
    else { method = 'ang'; first = yang ? up(9) : down(9); }
  }
  let mid, last;
  if (method === 'fu') { mid = LR_XING[first] === first ? mod(first + 6, 12) : LR_XING[first]; last = LR_XING[mid] === mid ? mod(mid + 6, 12) : LR_XING[mid]; }
  else if (method === 'fan' && !(zei.length || shang.length)) { mid = k3[1]; last = k1[1]; }
  else if (method === 'ang') { mid = yang ? k3[1] : k1[1]; last = yang ? k1[1] : k3[1]; }
  else { mid = up(first); last = up(mid); }
  return { jiang, h, g, b, dayEl, ke, chuan: [first, mid, last], method, up };
}
function paneLiuren() {
  const l = timeLunar(lrNow), R = liurenChart(l), k = isEn() ? 1 : 0;
  const rel = x => LIUQIN[relOf(R.dayEl, BR_EL[x])];
  const grid = Array(16).fill('<div class="lr-c empty"></div>');
  [[0, 0, 5], [0, 1, 6], [0, 2, 7], [0, 3, 8], [1, 3, 9], [2, 3, 10], [3, 3, 11], [3, 2, 0], [3, 1, 1], [3, 0, 2], [2, 0, 3], [1, 0, 4]].forEach(([r, c, e]) => {
    grid[r * 4 + c] = `<div class="lr-c el-${BR_EL[R.up(e)]}"><b>${BR[R.up(e)]}</b><small>${BR[e]}</small></div>`;
  });
  const plate = grid.join('');
  const keHtml = R.ke.slice().reverse().map((x, i) => `<div class="lr-ke"><b>${BR[x[1]]}</b><small>${3 - i === 0 ? ST[R.g] : BR[x[0]]}</small></div>`).join('');
  const ch = R.chuan.map((x, i) => `<div class="ast-row"><span>${[isEn() ? 'First' : '初傳', isEn() ? 'Middle' : '中傳', isEn() ? 'Last' : '末傳'][i]}</span><b>${BR[x]}（${t('elName')(BR_EL[x])}）</b><em>${rel(x)[k]}</em></div>`).join('');
  const f = rel(R.chuan[0]);
  return nowToggle('lr', lrNow || profile.hh == null) +
    block(BR_EL[R.chuan[0]], `<p class="lead">${t('lrLead')(BR[R.chuan[0]], f[k])}${infoTip(t('whatIs'), t('lrInfo'))}</p>
    <p style="margin:0">${f[k + 2]}</p>
    <div class="facts">${fact(t('lrFacts').jiang, `${BR[R.jiang]} ${isEn() ? LR_JIANG_EN[R.jiang] : LR_JIANG[R.jiang]}`)}${fact(t('lrFacts').hour, `${ST[l.getDayGanIndex()]}${BR[R.b]}${isEn() ? ' day · ' : '日 '}${BR[R.h]}${isEn() ? ' hour' : '時'}`)}${fact(t('lrFacts').method, t('lrM')[R.method])}</div>
    <div class="lr-wrap"><div><h4 class="mini">${t('lrPlate')}</h4><div class="lr-plate">${plate}</div></div>
    <div style="flex:1;min-width:0"><h4 class="mini">${t('lrKe')}</h4><div class="lr-kes">${keHtml}</div>
    <h4 class="mini" style="margin-top:12px">${t('lrChuan')}</h4><div class="ast-table">${ch}</div></div></div>`) + recList([...recsOfEl(BR_EL[R.chuan[0]], 2), ...recsOfEl(pickEl, 1)]);
}

/* ---------- 七政四餘 ---------- */
const XIU_DU = [['角', 12], ['亢', 9], ['氐', 15], ['房', 5], ['心', 5], ['尾', 18], ['箕', 11], ['斗', 26], ['牛', 8], ['女', 12], ['虛', 10], ['危', 17], ['室', 16], ['壁', 9],
 ['奎', 16], ['婁', 12], ['胃', 14], ['昴', 11], ['畢', 16], ['觜', 2], ['參', 9], ['井', 33], ['鬼', 4], ['柳', 15], ['星', 7], ['張', 18], ['翼', 18], ['軫', 17]];
const GONG = [['戌', '降婁'], ['酉', '大梁'], ['申', '實沈'], ['未', '鶉首'], ['午', '鶉火'], ['巳', '鶉尾'], ['辰', '壽星'], ['卯', '大火'], ['寅', '析木'], ['丑', '星紀'], ['子', '玄枵'], ['亥', '娵訾']]; // 由白羊 0° 起
const GONG_LORD = { 子: '土', 丑: '土', 寅: '木', 亥: '木', 卯: '火', 戌: '火', 辰: '金', 酉: '金', 巳: '水', 申: '水', 午: '日', 未: '月' };
const BODY_EL = { 日: '火', 月: '水', 水: '水', 金: '金', 火: '火', 木: '木', 土: '土', 羅: '火', 計: '土', 孛: '水' };
function xiuAt(lon, year) {
  let x = mod(lon - (203.84 + (year - 2000) * 0.013970), 360) * 365.25 / 360, i = 0;
  while (x >= XIU_DU[i][1] && i < 27) { x -= XIU_DU[i][1]; i++; }
  return [XIU_DU[i][0], Math.floor(x)];
}
function skyAt(pr) {     // tropical longitudes + ascendant, shared by 七政四餘 and 印度占星
  const A = Astronomy, pl = pr.place, hasTime = pr.hh != null;
  const utc = new Date(Date.UTC(pr.y, pr.m - 1, pr.d, hasTime ? pr.hh : 12, hasTime ? pr.mm : 0) - pl.tz * 3600e3), at = A.MakeTime(utc);
  const lon = {};
  [['日', 'Sun'], ['月', 'Moon'], ['水', 'Mercury'], ['金', 'Venus'], ['火', 'Mars'], ['木', 'Jupiter'], ['土', 'Saturn']].forEach(([k, b]) => { lon[k] = A.Ecliptic(A.GeoVector(b, at, true)).elon; });
  const T = (utc - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525;
  lon.羅 = mod(125.04452 - 1934.136261 * T, 360); lon.計 = mod(lon.羅 + 180, 360); lon.孛 = mod(83.3532465 + 4069.0137287 * T, 360);
  let asc = null;
  if (hasTime) {
    const eps = (23.4392911 - 0.0130042 * T) * Math.PI / 180, ramc = mod(A.SiderealTime(at) * 15 + pl.lon, 360) * Math.PI / 180, phi = pl.lat * Math.PI / 180;
    asc = mod(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * 180 / Math.PI, 360);
  }
  return { lon, asc, year: pr.y + (pr.m - 0.5) / 12, utc };
}
function paneQizheng() {
  if (!HAS_ASTRO) return `<p class="note">—</p>`;
  const S = skyAt(profile), g = x => GONG[Math.floor(mod(x, 360) / 30)], k = isEn() ? 1 : 0;
  const rows = Object.keys(t('qz')).map(b => {
    const [xn, deg] = xiuAt(S.lon[b], S.year), G = g(S.lon[b]);
    return `<div class="ast-row"><span>${t('qz')[b]}</span><b>${G[0]}${isEn() ? '' : '宮'} ${isEn() ? '' : G[1]}</b><em>${xn}${deg}°</em></div>`;
  }).join('');
  const head = `<div class="ast-row qz-head"><span>${t('qzCols')[0]}</span><b>${t('qzCols')[1]}</b><em>${t('qzCols')[2]}</em></div>`;
  if (S.asc == null) return block(pickEl, `<p class="lead">${t('qzLeadNo')}${infoTip(t('whatIs'), t('qzInfo'))}</p><div class="ast-table">${head}${rows}</div>`) + recList(recsOfEl(pickEl, 3));
  const mg = g(S.asc), lord = GONG_LORD[mg[0]], lg = g(S.lon[lord]), [lx] = xiuAt(S.lon[lord], S.year), el = BODY_EL[lord];
  return block(el, `<p class="lead">${t('qzLead')(profile.name, `${mg[0]}${isEn() ? '' : '宮'} ${mg[1]}`)}${infoTip(t('whatIs'), t('qzInfo'))}</p>
    <div class="facts">${fact(t('qzFacts').lord, t('qz')[lord])}${fact(t('qzFacts').at, `${lg[0]}${isEn() ? '' : '宮'} · ${lx}`)}</div>
    <p style="margin:0">${isEn() ? T6.en.qzLord[lord] : T6.zh.qzLord[lord]}</p>
    <div class="ast-table">${head}${rows}</div>`) + recList([...recsOfEl(el, 2), ...recsOfEl(pickEl, 1)]);
}

/* ---------- 印度占星 ---------- */
const NAK = [
 ['Ashwini', '婁', '行動快、鍾意幫人，有醫者心腸。', 'Quick to act and to help, with a healer’s heart.'],
 ['Bharani', '胃', '意志強，擔得起重擔。', 'Strong-willed; carries heavy loads.'],
 ['Krittika', '昴', '直接銳利，有決斷力。', 'Sharp and decisive.'],
 ['Rohini', '畢', '有魅力，鍾意美好事物。', 'Charming; loves beautiful things.'],
 ['Mrigashira', '觜', '好奇心強，愛探索。', 'Curious and exploring.'],
 ['Ardra', '參', '感情強烈，經歷風雨後成長。', 'Intense; grows through storms.'],
 ['Punarvasu', '井', '樂觀，跌倒會再企起身。', 'Optimistic; always bounces back.'],
 ['Pushya', '鬼', '識照顧人，有滋養力。', 'Nurturing and supportive.'],
 ['Ashlesha', '柳', '洞察力強，心思深。', 'Perceptive and deep.'],
 ['Magha', '星', '重視傳統同家族榮譽。', 'Values tradition and family honour.'],
 ['Purva Phalguni', '張', '享受生活，富創意。', 'Enjoys life and is creative.'],
 ['Uttara Phalguni', '翼', '可靠，重承諾。', 'Reliable; keeps promises.'],
 ['Hasta', '軫', '手巧，做事有技巧。', 'Skilful hands and methods.'],
 ['Chitra', '角', '有美感，鍾意創作。', 'Artistic; loves to create.'],
 ['Swati', '亢', '獨立自由，適應力強。', 'Independent and adaptable.'],
 ['Vishakha', '氐', '目標明確，有決心。', 'Goal-driven and determined.'],
 ['Anuradha', '房', '重友情，擅長合作。', 'A loyal friend and collaborator.'],
 ['Jyeshtha', '心', '有責任感，似大家長。', 'Responsible, like an elder.'],
 ['Mula', '尾', '追尋根本，鍾意研究。', 'Seeks the roots; loves research.'],
 ['Purva Ashadha', '箕', '自信，唔怕挑戰。', 'Confident and unafraid.'],
 ['Uttara Ashadha', '斗', '堅持到底，終會成功。', 'Persistent; wins in the end.'],
 ['Shravana', '女', '善於聆聽，好學。', 'A good listener and learner.'],
 ['Dhanishta', '虛', '有節奏感，識享受成果。', 'Rhythmic; enjoys success.'],
 ['Shatabhisha', '危', '獨立思考，帶點神秘。', 'An independent thinker, a little mysterious.'],
 ['Purva Bhadrapada', '室', '理想主義，熱心。', 'Idealistic and zealous.'],
 ['Uttara Bhadrapada', '壁', '沉穩有智慧。', 'Calm and wise.'],
 ['Revati', '奎', '溫柔善良，照顧弱小。', 'Gentle and kind to the vulnerable.']
];
const DASHA = [['Ketu', 7, '火'], ['Venus', 20, '金'], ['Sun', 6, '火'], ['Moon', 10, '水'], ['Mars', 7, '火'], ['Rahu', 18, '土'], ['Jupiter', 16, '木'], ['Saturn', 19, '土'], ['Mercury', 17, '水']];
function paneVedic() {
  if (!HAS_ASTRO) return `<p class="note">—</p>`;
  const S = skyAt(profile), ay = 23.857 + 0.013969 * (S.year - 2000), sid = x => mod(x - ay, 360);
  const mn = sid(S.lon.月), ni = Math.floor(mn / (360 / 27)), frac = (mn % (360 / 27)) / (360 / 27), pada = Math.floor(frac * 4) + 1, N = NAK[ni];
  let di = ni % 9, end = S.utc.getTime() + (1 - frac) * DASHA[di][1] * 365.25 * 864e5;
  while (end < Date.now()) { di = (di + 1) % 9; end += DASHA[di][1] * 365.25 * 864e5; }
  const nm = z => `${z.sym} ${isEn() ? z.en : z.zh}`, lord = DASHA[ni % 9], el = lord[2];
  return block(el, `<p class="lead">${t('vdLead')(profile.name, isEn() ? N[0] : `${N[0]}（${N[1]}宿）`)}${infoTip(t('whatIs'), t('vdInfo'))}</p>
    <p style="margin:0">${isEn() ? N[3] : N[2]}</p>
    <div class="facts">${fact(t('vdFacts').pada, `${pada} / 4 · ${t('vdLords')[lord[0]]}`)}${fact(t('vdFacts').moon, nm(signAt(mn)))}${fact(t('vdFacts').sun, nm(signAt(sid(S.lon.日))))}${S.asc != null ? fact(t('vdFacts').lagna, nm(signAt(sid(S.asc)))) : ''}${fact(t('vdFacts').dasha, t('vdDasha')(t('vdLords')[DASHA[di][0]], new Date(end).getFullYear()))}</div>`) + recList([...recsOfEl(el, 2), ...recsOfEl(DASHA[di][2], 1)]);
}

Object.assign(ORACLE_PANES, { qimen: paneQimen, liuren: paneLiuren, qizheng: paneQizheng, vedic: paneVedic });
const wireNow = pane => pane.querySelectorAll('[data-now]').forEach(b => b.onclick = () => {
  const [k, v] = b.dataset.now.split(':'); if (k === 'qm') qmNow = v === '1'; else lrNow = v === '1'; renderPane();
});
Object.assign(ORACLE_WIRE, { qimen: wireNow, liuren: wireNow });
