/* 五行石室 — animated oracles: coins, Mei Hua, yarrow, tortoise shell, fortune sticks, petals.
   Loaded before app.js; uses app.js helpers (t, block, recList, ...) only inside functions. */

const T3 = {
 zh:{
  tabs:{meihua:'易經・梅花易數',yarrow:'蓍草占',turtle:'龜甲占',petal:'數花瓣'},
  coinLabel:{6:'老陰 ✕',7:'少陽',8:'少陰',9:'老陽 ○'},coinHead:'字',coinTail:'背',
  icToss:'擲銅錢起卦',icTossing:n=>`第 ${n} 擲…`,
  mhGo:'用此刻起卦',mhHint:'梅花易數：用農曆年、月、日、時嘅數起卦，唔使工具，隨時可算。',
  mhCalc:(y,m,d,h,u,l,mv)=>`年支 ${y} + 月 ${m} + 日 ${d} = 上卦 ${u}；再加時支 ${h} = 下卦 ${l}；動爻第 ${mv} 爻`,
  mhMain:'本卦',mhHu:'互卦',mhBian:'變卦',mhTi:'體卦',mhYong:'用卦',
  mhRel:{shengti:'用卦生體卦：大吉，有外力幫手。',bi:'體用比和：吉，事情順利。',tike:'體卦剋用卦：小吉，可成但要費力。',tisheng:'體卦生用卦：付出多，回報慢。',keti:'用卦剋體卦：阻力大，宜緩行。'},
  yaGo:'開始分蓍',yaSkip:'跳過動畫',yaHint:'大衍之數五十，其用四十有九。每爻三變：分二、掛一、揲四、歸奇，十八變成一卦。',
  yaStep:(line,ch,l,r,rem,left)=>`第 ${line} 爻第 ${ch} 變：左 ${l}・右 ${r}，除去 ${rem}，餘 ${left}`,
  yaLeft:'左',yaRight:'右',
  tuQ:'心中問題（可留空）',tuQPh:'例如：呢單生意應唔應該做？',tuGo:'灼龜',tuHint:'商代用火灼龜甲，睇裂紋（兆）嘅走向占吉凶。直紋旁邊嘅側紋向上為吉，向下為凶。',
  tuRes:{ji:['吉','側紋向上，所問之事可行。'],zhong:['平','側紋平直，宜再觀察。'],xiong:['凶','側紋向下，暫緩為宜。']},
  tuNote:'裂紋為模擬示意，解讀為簡化說法。',
  peQ:'問題',peMode:{love:'佢愛唔愛我',do:'應唔應該做'},peWords:{love:['佢愛我','佢唔愛我'],do:['做','唔好做']},
  peHint:'撳花瓣逐片摘，最後一片就係答案。',peNew:'換一朵花',peLeft:n=>`仲有 ${n} 片`,peFinal:'最後一片：',
  qShake:'搖緊…',qHint:'誠心默念問題，搖籤筒抽一支籤，再擲筊問神明係咪呢支。',
  jiaoFace:{flat:'平面',round:'凸面'}
 },
 en:{
  tabs:{meihua:'I Ching · Mei Hua',yarrow:'Yarrow stalks',turtle:'Tortoise shell',petal:'Petals'},
  coinLabel:{6:'Old yin ✕',7:'Young yang',8:'Young yin',9:'Old yang ○'},coinHead:'字',coinTail:'背',
  icToss:'Toss the coins',icTossing:n=>`Toss ${n}…`,
  mhGo:'Cast for this moment',mhHint:'Mei Hua Yi Shu casts a hexagram from the lunar year, month, day and hour, so you need no tools.',
  mhCalc:(y,m,d,h,u,l,mv)=>`Year ${y} + month ${m} + day ${d} = upper ${u}; plus hour ${h} = lower ${l}; moving line ${mv}`,
  mhMain:'Main',mhHu:'Nuclear',mhBian:'Changed',mhTi:'Self trigram',mhYong:'Matter trigram',
  mhRel:{shengti:'The matter feeds you: very favourable, with outside help.',bi:'Self and matter match: favourable and smooth.',tike:'You master the matter: achievable with effort.',tisheng:'You feed the matter: much effort, slow return.',keti:'The matter presses on you: strong resistance; go slowly.'},
  yaGo:'Divide the stalks',yaSkip:'Skip animation',yaHint:'Of fifty stalks, forty-nine are used. Each line takes three rounds of dividing, setting one aside and counting off by fours; eighteen rounds make a hexagram.',
  yaStep:(line,ch,l,r,rem,left)=>`Line ${line}, round ${ch}: left ${l} · right ${r}, remove ${rem}, ${left} remain`,
  yaLeft:'Left',yaRight:'Right',
  tuQ:'Your question (optional)',tuQPh:'e.g. Should I take this deal?',tuGo:'Heat the shell',tuHint:'In the Shang dynasty, diviners heated tortoise shells and read the cracks. A side crack rising from the main crack is favourable; falling is not.',
  tuRes:{ji:['Favourable','The side crack rises: go ahead.'],zhong:['Neutral','The side crack runs level: wait and watch.'],xiong:['Unfavourable','The side crack falls: hold off for now.']},
  tuNote:'The cracks are a simulation and the reading is simplified.',
  peQ:'Question',peMode:{love:'Do they love me?',do:'Should I do it?'},peWords:{love:['Loves me','Loves me not'],do:['Do it','Don’t']},
  peHint:'Tap the petals one by one. The last petal is your answer.',peNew:'New flower',peLeft:n=>`${n} left`,peFinal:'Last petal:',
  qShake:'Shaking…',qHint:'Hold your question in mind, shake out a stick, then throw the blocks to ask whether it is the right one.',
  jiaoFace:{flat:'flat',round:'round'}
 }
};
['zh','en'].forEach(k => { const tb = T3[k].tabs; Object.assign(T2[k].tabs, tb); const c = Object.assign({}, T3[k]); delete c.tabs; Object.assign(T2[k], c); });

/* ---------- shared ---------- */
const RM = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = ms => new Promise(r => setTimeout(r, RM ? ms * 0.1 : ms));
function triIdx(bits3) { return TRIGRAMS.findIndex(g => g.k === bits3.join('')); }
function ohex(bits) { const lo = triIdx(bits.slice(0, 3)), up = triIdx(bits.slice(3)); return { n: KW[up][lo], up: TRIGRAMS[up], lo: TRIGRAMS[lo] }; }
function hexName(h) { const x = HEX[h.n]; return isEn() ? `${h.n}. ${x[1]} ${x[0]}` : `第${h.n}卦　${x[0]}`; }
function hexMeaning(h) { return HEX[h.n][isEn() ? 3 : 2]; }
function linesHtml(bits, moving = []) { return `<div class="hex">${bits.map((b, i) => `<i class="ln${b ? '' : ' yin'}${moving[i] ? ' mv' : ''}"></i>`).reverse().join('')}</div>`; }
function triLabel(g) { return `${g.sym} ${g.zh}${isEn() ? ' ' + g.nat[1] : '（' + g.nat[0] + '）'}`; }
function hexCard(h, bits, moving, label, ghost) {
  return `<div class="hex-card${ghost ? ' ghost' : ''}">${label ? `<span class="pos">${label}</span>` : ''}${linesHtml(bits, moving)}<b>${hexName(h)}</b><small>${t('icUpper')} ${triLabel(h.up)}・${t('icLower')} ${triLabel(h.lo)}</small><p>${hexMeaning(h)}</p></div>`;
}
/* result from line values 6/7/8/9 */
function valuesResult(vals) {
  const main = vals.map(v => (v === 7 || v === 9) ? 1 : 0), moving = vals.map(v => v === 6 || v === 9);
  const chg = main.map((b, i) => moving[i] ? 1 - b : b), H = ohex(main), H2 = ohex(chg), nMove = moving.filter(Boolean).length;
  return block(H.up.el, `<div class="hex-pair">${hexCard(H, main, moving, t('mhMain'))}${nMove ? hexCard(H2, chg, [], t('icChange'), true) : ''}</div>
    <p class="note">${nMove ? t('icMoving')(nMove) : t('icNoChange')}</p>`) + recList([...recsOfEl(H.up.el, 2), ...recsOfEl(H.lo.el, 1)]);
}
function valueList(vals) {
  return `<ol class="vlist">${vals.map((v, i) => `<li><span>${i + 1}</span>${linesHtml([v === 7 || v === 9 ? 1 : 0], [v === 6 || v === 9])}<em>${t('coinLabel')[v]}</em></li>`).reverse().join('')}</ol>`;
}

/* ---------- 金錢卦 ---------- */
let coinS = null, coinBusy = false;
function newCoins() { const faces = Array.from({ length: 6 }, () => [0, 0, 0].map(() => Math.random() < 0.5 ? 3 : 2)); return { faces, vals: faces.map(f => f[0] + f[1] + f[2]) }; }
const coinHtml = v => `<div class="coin ${v === 3 ? 'tail' : 'head'}"><span>${v === 3 ? t('coinTail') : t('coinHead')}</span></div>`;
function paneCoins() {
  if (!coinS) coinS = newCoins();
  return `<div class="row"><button class="btn" type="button" id="coinGo">${t('icToss')}</button></div><p class="note">${t('icHint')}</p>
    <div class="coin-stage"><div class="coins" id="coins">${coinS.faces[5].map(coinHtml).join('')}</div><div id="coinMsg" class="sub"></div></div>
    <div class="vwrap" id="vwrap">${valueList(coinS.vals)}</div>` + valuesResult(coinS.vals);
}
async function animateCoins(pane) {
  if (coinBusy) return; coinBusy = true;
  const next = newCoins(), coins = pane.querySelector('#coins'), vw = pane.querySelector('#vwrap'), msg = pane.querySelector('#coinMsg');
  pane.querySelector('#coinGo').disabled = true;
  vw.innerHTML = '<ol class="vlist"></ol>'; const ol = vw.firstChild;
  for (let i = 0; i < 6; i++) {
    msg.textContent = t('icTossing')(i + 1);
    [...coins.children].forEach((c, k) => { c.classList.remove('head', 'tail'); c.style.animationDelay = (k * 60) + 'ms'; c.classList.add('spin'); });
    await sleep(760);
    coins.innerHTML = next.faces[i].map(coinHtml).join('');
    const v = next.vals[i];
    ol.insertAdjacentHTML('afterbegin', `<li class="pop"><span>${i + 1}</span>${linesHtml([v === 7 || v === 9 ? 1 : 0], [v === 6 || v === 9])}<em>${t('coinLabel')[v]}</em></li>`);
    await sleep(320);
  }
  coinS = next; coinBusy = false; renderPane();
}

/* ---------- 梅花易數 ---------- */
let mhAt = null;
function meihua(date) {
  const lu = Solar.fromDate(date).getLunar();
  const y = lu.getYearZhiIndex() + 1, m = Math.abs(lu.getMonth()), d = lu.getDay(), h = lu.getTimeZhiIndex() + 1;
  const up = (y + m + d) % 8 || 8, lo = (y + m + d + h) % 8 || 8, mv = (y + m + d + h) % 6 || 6;
  const bits = [...TRIGRAMS[lo - 1].k].map(Number).concat([...TRIGRAMS[up - 1].k].map(Number));
  return { y, m, d, h, up, lo, mv, bits, lu };
}
function paneMeihua() {
  if (!HAS_LUNAR) return '';
  if (!mhAt) mhAt = new Date();
  const r = meihua(mhAt), moving = r.bits.map((_, i) => i === r.mv - 1);
  const H = ohex(r.bits), hu = ohex([r.bits[1], r.bits[2], r.bits[3], r.bits[2], r.bits[3], r.bits[4]]);
  const chg = r.bits.map((b, i) => i === r.mv - 1 ? 1 - b : b), B = ohex(chg);
  const tiLower = r.mv > 3, ti = tiLower ? H.lo : H.up, yong = tiLower ? H.up : H.lo;
  const rel = ti.el === yong.el ? 'bi' : GEN[yong.el] === ti.el ? 'shengti' : CTRL[ti.el] === yong.el ? 'tike' : GEN[ti.el] === yong.el ? 'tisheng' : 'keti';
  const when = isEn() ? mhAt.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : `${mhAt.getMonth() + 1}月${mhAt.getDate()}日 ${pad(mhAt.getHours())}:${pad(mhAt.getMinutes())}`;
  const nm = t('elName');
  return `<div class="row"><button class="btn" type="button" id="mhGo">${t('mhGo')}</button><span class="sub">${when}・${r.lu.getYearInGanZhi()}${isEn() ? ' ' : '年'}${BR[r.h - 1]}${isEn() ? ' hour' : '時'}</span></div>
    <p class="note">${t('mhHint')}</p><p class="note mono">${t('mhCalc')(r.y, r.m, r.d, r.h, r.up, r.lo, r.mv)}</p>` +
    block(ti.el, `<div class="hex-pair three reveal">${hexCard(H, r.bits, moving, t('mhMain'))}${hexCard(hu, [r.bits[1], r.bits[2], r.bits[3], r.bits[2], r.bits[3], r.bits[4]], [], t('mhHu'), true)}${hexCard(B, chg, [], t('mhBian'), true)}</div>
    <div class="facts">${fact(t('mhTi'), `${triLabel(ti)}・${nm(ti.el)}`)}${fact(t('mhYong'), `${triLabel(yong)}・${nm(yong.el)}`)}</div>
    <p style="margin:0"><strong>${t('mhRel')[rel]}</strong></p>`) + recList([...recsOfEl(ti.el, 2), ...recsOfEl(Object.keys(GEN).find(k => GEN[k] === ti.el), 1)]);
}

/* ---------- 蓍草占 ---------- */
let yarrowS = null, yarrowBusy = false, yarrowSkip = false;
function castYarrow() {
  const steps = [], vals = [];
  for (let line = 0; line < 6; line++) {
    let n = 49;
    for (let ch = 0; ch < 3; ch++) {
      const L = 1 + Math.floor(Math.random() * (n - 2)), R = n - L;   // both piles keep at least one stalk after hanging one
      const rL = L % 4 || 4, rR = (R - 1) % 4 || 4, rem = 1 + rL + rR;
      n -= rem; steps.push({ line: line + 1, ch: ch + 1, L, R, rem, left: n });
    }
    vals.push(n / 4);
  }
  return { steps, vals };
}
function pileHtml(n, label) { return `<div class="pile"><div class="stalks">${'<i></i>'.repeat(n)}</div><small>${label} ${n}</small></div>`; }
function paneYarrow() {
  if (!yarrowS) yarrowS = castYarrow();
  return `<div class="row"><button class="btn" type="button" id="yaGo">${t('yaGo')}</button></div><p class="note">${t('yaHint')}</p>
    <div class="ya-stage" id="yaStage" hidden><div class="piles" id="yaPiles"></div><p class="sub mono" id="yaMsg"></p><button class="chip" type="button" id="yaSkip">${t('yaSkip')}</button></div>
    <div class="vwrap" id="yaLines">${valueList(yarrowS.vals)}</div>` + valuesResult(yarrowS.vals);
}
async function animateYarrow(pane) {
  if (yarrowBusy) return; yarrowBusy = true; yarrowSkip = false;
  const next = castYarrow(), stage = pane.querySelector('#yaStage'), piles = pane.querySelector('#yaPiles'), msg = pane.querySelector('#yaMsg'), lines = pane.querySelector('#yaLines');
  pane.querySelector('#yaGo').disabled = true; stage.hidden = false;
  pane.querySelector('#yaSkip').onclick = () => { yarrowSkip = true; };
  lines.innerHTML = '<ol class="vlist"></ol>'; const ol = lines.firstChild;
  for (const s of next.steps) {
    if (yarrowSkip) break;
    piles.innerHTML = pileHtml(s.L, t('yaLeft')) + pileHtml(s.R, t('yaRight'));
    msg.textContent = t('yaStep')(s.line, s.ch, s.L, s.R, s.rem, s.left);
    await sleep(s.ch === 3 ? 520 : 300);
    if (s.ch === 3) { const v = s.left / 4; ol.insertAdjacentHTML('afterbegin', `<li class="pop"><span>${s.line}</span>${linesHtml([v === 7 || v === 9 ? 1 : 0], [v === 6 || v === 9])}<em>${t('coinLabel')[v]}</em></li>`); }
  }
  yarrowS = next; yarrowBusy = false; renderPane();
}

/* ---------- 龜甲占 ---------- */
let turtleS = null, turtleQ = '';
function newTurtle() { const seed = 1 + Math.floor(Math.random() * 1e6), r = rng(seed); const ang = (r() * 100 - 50); return { seed, ang, res: ang > 14 ? 'ji' : ang < -14 ? 'xiong' : 'zhong' }; }
function crackPaths(s, W, H) {
  const r = rng(s.seed), cx = W / 2 + (r() - .5) * 30, cy = H / 2 + (r() - .5) * 16, paths = [];
  const walk = (x, y, ang, len, steps, w) => { const pts = [[x, y]]; for (let i = 0; i < steps; i++) { ang += (r() - .5) * 0.5; x += Math.cos(ang) * len / steps; y += Math.sin(ang) * len / steps; pts.push([x, y]); } paths.push({ pts, w }); return pts; };
  const main = walk(cx, cy - 46, Math.PI / 2, 96, 14, 2.6);      // vertical 墨 crack
  const mid = main[6], a = -s.ang * Math.PI / 180;               // side branch: positive ang rises
  walk(mid[0], mid[1], a, 70, 10, 2.1);
  for (let k = 0; k < 7; k++) { const p = main[1 + Math.floor(r() * 12)]; walk(p[0], p[1], r() * Math.PI * 2, 14 + r() * 26, 5, 0.9); }
  return { paths, cx, cy };
}
function drawShell(cv, s, progress) {
  const ctx = cv.getContext('2d'), W = cv.width, H = cv.height, css = getComputedStyle(cv);
  const ink = css.getPropertyValue('--ink').trim() || '#25222A', shell = css.getPropertyValue('--earth-bg').trim() || '#F3EAD8', rim = css.getPropertyValue('--earth').trim() || '#A2762A';
  ctx.clearRect(0, 0, W, H);
  ctx.save(); ctx.beginPath(); ctx.ellipse(W / 2, H / 2, W * 0.44, H * 0.44, 0, 0, Math.PI * 2); ctx.fillStyle = shell; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = rim; ctx.stroke(); ctx.clip();
  ctx.globalAlpha = .35; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
  [0.28, 0.45, 0.6, 0.76].forEach(f => { ctx.moveTo(0, H * f); ctx.quadraticCurveTo(W / 2, H * f + (f < .5 ? -14 : 14), W, H * f); }); ctx.stroke(); ctx.globalAlpha = 1;
  const { paths, cx, cy } = crackPaths(s, W, H);
  if (progress < 1) { const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 60); g.addColorStop(0, `rgba(255,140,40,${0.7 * (1 - progress) + .2})`); g.addColorStop(1, 'rgba(255,140,40,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  ctx.strokeStyle = ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  paths.forEach((p, i) => {
    const local = Math.max(0, Math.min(1, progress * 1.6 - i * 0.06)); if (!local) return;
    const n = Math.max(2, Math.ceil(p.pts.length * local)); ctx.lineWidth = p.w; ctx.beginPath();
    p.pts.slice(0, n).forEach(([x, y], k) => k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
  });
  ctx.restore();
}
function paneTurtle() {
  if (!turtleS) turtleS = newTurtle();
  const r = t('tuRes')[turtleS.res], el = { ji: '木', zhong: '土', xiong: '火' }[turtleS.res];
  return `<form class="tq" id="tuForm"><label for="tuQ">${t('tuQ')}<input id="tuQ" value="${esc(turtleQ)}" placeholder="${t('tuQPh')}"></label><button class="btn" type="submit">${t('tuGo')}</button></form>
    <p class="note">${t('tuHint')}</p>
    <div class="shell-wrap"><canvas id="shell" width="360" height="270" aria-label="${r[0]}"></canvas></div>
    <div id="tuOut">` + block(el, `${turtleQ ? `<p class="sub" style="margin:0">${t('tSum')(esc(turtleQ))}</p>` : ''}<p class="lead">${r[0]}<span class="sub" style="display:block;font-size:15px;font-family:var(--body)">${r[1]}</span></p><p class="note">${t('tuNote')}</p>`) +
    recList({ ji: ['D03','B07'], zhong: ['B08','D02'], xiong: ['B09','D05'] }[turtleS.res]) + '</div>';
}
async function animateTurtle(pane) {
  turtleQ = pane.querySelector('#tuQ').value.trim();
  const s = newTurtle(), cv = pane.querySelector('#shell'), out = pane.querySelector('#tuOut');
  out.style.visibility = 'hidden'; pane.querySelector('#tuForm button').disabled = true;
  const t0 = performance.now(), dur = RM ? 50 : 1800;
  await new Promise(res => { const step = now => { const p = Math.min(1, (now - t0) / dur); drawShell(cv, s, p); p < 1 ? requestAnimationFrame(step) : res(); }; requestAnimationFrame(step); });
  await sleep(250);
  turtleS = s; renderPane();
}

/* ---------- 求籤 (animated) ---------- */
let qianS = null, qianBusy = false;
function newQian() { return { n: Math.floor(Math.random() * QIAN.length), stage: 'ok', cup: 'sheng', faces: ['flat', 'round'] }; }
function cupFaces(cup) { return cup === 'sheng' ? (Math.random() < .5 ? ['flat', 'round'] : ['round', 'flat']) : cup === 'xiao' ? ['flat', 'flat'] : ['round', 'round']; }
const jiaoHtml = f => `<div class="jiao ${f}" title="${t('jiaoFace')[f]}"></div>`;
function tubeHtml(n) {
  return `<div class="tube" id="tube"><svg viewBox="0 0 120 170" aria-hidden="true">
    <g class="sticks">${[22,32,42,52,62,72,82,92].map((x, i) => `<rect x="${x}" y="${18 + (i % 3) * 6}" width="6" height="90" rx="2" fill="#C9A46A" stroke="#8A6A3A"/>`).join('')}</g>
    <rect class="out" x="56" y="30" width="8" height="96" rx="2" fill="#E8C98A" stroke="#8A6A3A"/>
    <path d="M14 62 L106 62 L98 162 Q60 170 22 162 Z" fill="#9E3B2A" stroke="#6E2418" stroke-width="2"/>
    <path d="M14 62 Q60 74 106 62" fill="none" stroke="#6E2418" stroke-width="2"/>
    <text x="60" y="122" text-anchor="middle" font-size="22" fill="#F3E2B8" font-family="Noto Serif TC, serif">${isEn() ? '' : '籤'}</text></svg>
    ${n != null ? `<span class="stick-no">${n}</span>` : ''}</div>`;
}
function paneQianA() {
  if (!qianS) qianS = newQian();
  const q = QIAN[qianS.n], k = isEn();
  const head = `<div class="row"><button class="btn${qianS.stage === 'drawn' ? ' ghost' : ''}" type="button" id="qDraw">${t('qDraw')}</button>${qianS.stage === 'drawn' ? `<button class="btn" type="button" id="qThrow">${t('qThrow')}</button>` : ''}</div><p class="note">${t('qHint')}</p>
    <div class="qian-stage">${tubeHtml(qianS.n + 1)}<div class="jiaos" id="jiaos">${qianS.faces ? qianS.faces.map(jiaoHtml).join('') : ''}</div></div>`;
  if (qianS.stage !== 'ok') {
    const msg = qianS.stage === 'drawn' ? t('qWait') : t('qCup')[qianS.cup];
    return head + `<div class="qian-stick"><b>${t('qNo')(qianS.n + 1)}</b><p>${msg}</p></div>`;
  }
  const el = { 上上: '土', 上: '木', 中: '金', 下: '水' }[q[0]];
  return head + block(el, `<p class="sub" style="margin:0">${t('qCup').sheng}</p>
    <div class="qian"><div class="qian-head"><b>${t('qNo')(qianS.n + 1)}</b><em>${k ? QIAN_GRADE_EN[q[0]] : q[0]}</em></div>
      <p class="qian-verse">${q[1].replace('，', '，<br>')}</p>${k ? `<p class="sub" style="margin:0">${q[2]}</p>` : ''}
      <p style="margin:0"><strong>${t('qAdvice')}${k ? ': ' : '：'}</strong>${k ? q[4] : q[3]}</p></div>
    <p class="note">${t('qNote')}</p>`) + recList(QIAN_REC[q[0]]);
}
async function animateShake(pane) {
  if (qianBusy) return; qianBusy = true;
  const tube = pane.querySelector('#tube'); pane.querySelectorAll('#qDraw,#qThrow').forEach(b => b.disabled = true);
  const no = tube.querySelector('.stick-no'); if (no) no.remove();
  pane.querySelector('#jiaos').innerHTML = '';
  tube.classList.add('shake'); await sleep(1300); tube.classList.remove('shake');
  const n = Math.floor(Math.random() * QIAN.length);
  tube.classList.add('pop'); tube.insertAdjacentHTML('beforeend', `<span class="stick-no">${n + 1}</span>`); await sleep(700);
  qianS = { n, stage: 'drawn', cup: null, faces: null }; qianBusy = false; renderPane();
}
async function animateThrow(pane) {
  if (qianBusy) return; qianBusy = true;
  pane.querySelectorAll('#qDraw,#qThrow').forEach(b => b.disabled = true);
  const r = Math.random(), cup = r < 0.5 ? 'sheng' : r < 0.75 ? 'xiao' : 'yin', faces = cupFaces(cup);
  const box = pane.querySelector('#jiaos'); box.innerHTML = jiaoHtml('flat') + jiaoHtml('round');
  [...box.children].forEach((j, i) => { j.style.animationDelay = (i * 90) + 'ms'; j.classList.add('toss'); });
  await sleep(950);
  box.innerHTML = faces.map(jiaoHtml).join(''); await sleep(500);
  qianS = { n: qianS.n, stage: cup === 'sheng' ? 'ok' : 'retry', cup, faces }; qianBusy = false; renderPane();
}

/* ---------- 數花瓣 ---------- */
let petalS = null;
function newPetal(mode) { return { n: 5 + Math.floor(Math.random() * 9), plucked: 0, mode: mode || 'love' }; }
function flowerSvg(s) {
  let petals = '';
  for (let i = s.plucked; i < s.n; i++) {
    const a = i / s.n * 360;
    petals += `<g transform="rotate(${a.toFixed(1)} 110 110)"><ellipse class="petal" data-p="${i}" cx="110" cy="58" rx="17" ry="42" tabindex="0" role="button" aria-label="${i + 1}"/></g>`;
  }
  return `<svg viewBox="0 0 220 220" class="flower" aria-hidden="false">${petals}<circle cx="110" cy="110" r="24" class="disc"/></svg>`;
}
function panePetal() {
  if (!petalS) petalS = newPetal();
  const words = t('peWords')[petalS.mode], done = petalS.plucked === petalS.n;
  const last = petalS.plucked ? words[(petalS.plucked - 1) % 2] : '';
  const yes = done && (petalS.plucked - 1) % 2 === 0;
  const recs = petalS.mode === 'love' ? (yes ? ['B04','B03'] : ['B04','B08']) : (yes ? ['B07','B01'] : ['B09','B08']);
  return `<div class="tq"><label for="peMode">${t('peQ')}<select id="peMode">${Object.keys(t('peMode')).map(k => `<option value="${k}"${k === petalS.mode ? ' selected' : ''}>${t('peMode')[k]}</option>`).join('')}</select></label><button class="btn ghost" type="button" id="peNew">${t('peNew')}</button></div>
    <p class="note">${t('peHint')}</p>
    <div class="petal-stage"><div class="flower-wrap" id="flower">${flowerSvg(petalS)}</div>
      <div class="petal-word"><b id="peWord">${done ? t('peFinal') + ' ' + last : (last || '…')}</b><small>${t('peLeft')(petalS.n - petalS.plucked)}</small></div></div>` +
    (done ? block(yes ? '木' : '水', `<p class="lead"><span class="big">${last}</span></p>`) + recList(recs) : '');
}
function pluck(pane, el) {
  if (el.classList.contains('fall')) return;
  el.classList.add('fall');
  const words = t('peWords')[petalS.mode], w = pane.querySelector('#peWord');
  if (w) w.textContent = words[petalS.plucked % 2];
  setTimeout(() => { petalS.plucked++; renderPane(); }, RM ? 60 : 650);
}

/* ---------- registry ---------- */
const ORACLE_PANES = { iching: paneCoins, meihua: paneMeihua, yarrow: paneYarrow, turtle: paneTurtle, qian: paneQianA, petal: panePetal };
const ORACLE_WIRE = {
  iching: p => { p.querySelector('#coinGo').onclick = () => animateCoins(p); },
  meihua: p => { const b = p.querySelector('#mhGo'); if (b) b.onclick = () => { mhAt = new Date(); renderPane(); }; },
  yarrow: p => { p.querySelector('#yaGo').onclick = () => animateYarrow(p); },
  turtle: p => { const cv = p.querySelector('#shell'); if (cv) drawShell(cv, turtleS, 1); p.querySelector('#tuForm').onsubmit = e => { e.preventDefault(); animateTurtle(p); }; },
  qian: p => { p.querySelector('#qDraw').onclick = () => animateShake(p); const th = p.querySelector('#qThrow'); if (th) th.onclick = () => animateThrow(p); },
  petal: p => {
    p.querySelector('#peMode').onchange = e => { petalS.mode = e.target.value; renderPane(); };
    p.querySelector('#peNew').onclick = () => { petalS = newPetal(petalS.mode); renderPane(); };
    p.querySelectorAll('.petal').forEach(el => { el.onclick = () => pluck(p, el); el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pluck(p, el); } }; });
  }
};
function oracleInit() { coinS = newCoins(); yarrowS = castYarrow(); turtleS = newTurtle(); qianS = newQian(); qianS.faces = cupFaces('sheng'); petalS = newPetal(); }
