/* 五行石室 — app logic */

Object.assign(T.zh, T2.zh); Object.assign(T.en, T2.en);
const HAS_LUNAR = typeof Solar !== 'undefined';
const HAS_ASTRO = typeof Astronomy !== 'undefined';

let lang = 'zh';
try { if (location.hash === '#en') lang = 'en'; else { const s = localStorage.getItem('wx-lang'); if (s === 'en' || s === 'zh') lang = s; } } catch (e) {}
const t = k => T[lang][k];
const info = e => EL_INFO[e][lang];
const L = p => p[lang];
const byId = id => PRODUCTS.find(p => p.id === id);
const fmt = n => 'NT$ ' + n.toLocaleString('en-US');
const pad = n => String(n).padStart(2, '0');
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const mod = (a, n) => ((a % n) + n) % n;
const isEn = () => lang === 'en';

/* ---------- calculations ---------- */
function baziSimple(y, m, d, h) {
  let dd = Date.UTC(y, m - 1, d); if (h === 23) dd += 864e5;
  const days = Math.round((dd - Date.UTC(2000, 0, 1)) / 864e5);
  const di = mod(54 + days, 60);
  const yy = (m < 2 || (m === 2 && d < 4)) ? y - 1 : y;
  const yi = mod(yy - 4, 60);
  const md = m * 100 + d, bd = [204,306,405,506,606,707,808,908,1008,1107,1207];
  let k; if (md < 106) k = 10; else if (md < 204) k = 11; else { k = 0; bd.forEach((b, i) => { if (md >= b) k = i; }); }
  const ys = yi % 10, ms = (((ys % 5) * 2 + 2) + k) % 10, mb = (k + 2) % 12, ds = di % 10;
  const p = [[ys, yi % 12], [ms, mb], [ds, di % 12]];
  if (h != null) { const hb = Math.floor((h + 1) / 2) % 12; p.push([((ds % 5) * 2 + hb) % 10, hb]); } else p.push(null);
  return p;
}
function bazi(pr) {
  if (!HAS_LUNAR) return baziSimple(pr.y, pr.m, pr.d, pr.hh);
  const e = Solar.fromYmdHms(pr.y, pr.m, pr.d, pr.hh == null ? 12 : pr.hh, pr.mm || 0, 0).getLunar().getEightChar();
  const gz = s => [ST.indexOf(s[0]), BR.indexOf(s[1])];
  return [gz(e.getYear()), gz(e.getMonth()), gz(e.getDay()), pr.hh == null ? null : gz(e.getTime())];
}
function dayPillar(date) {
  if (!HAS_LUNAR) return baziSimple(date.getFullYear(), date.getMonth() + 1, date.getDate(), null)[2];
  const s = Solar.fromDate(date).getLunar().getDayInGanZhi();
  return [ST.indexOf(s[0]), BR.indexOf(s[1])];
}
function sunSign(m, d) {
  const md = m * 100 + d;
  if (md < 120) return ZODIAC[11];
  let z = ZODIAC[0]; ZODIAC.forEach(x => { if (md >= x.start) z = x; });
  return z;
}
const SIGN_ORDER = [2,3,4,5,6,7,8,9,10,11,0,1];  // longitude 0° = Aries → ZODIAC index
function signAt(lon) { return ZODIAC[SIGN_ORDER[Math.floor(mod(lon, 360) / 30)]]; }
function hash(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let s = seed % 233280; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

/* ---------- drawings ---------- */
let gid = 0;
function gradDefs(id, c) { return `<defs><radialGradient id="g${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${c[1]}"/><stop offset=".55" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[0]}" stop-opacity=".85"/></radialGradient></defs>`; }
function drawProduct(p) {
  const id = 'x' + (gid++);
  if (p.type === '手鏈') {
    const n = 17, R = 62, r = 13, R2 = rng(p.id.charCodeAt(2) * 31); let beads = '';
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2 - Math.PI / 2, x = 100 + R * Math.cos(a), y = 100 + R * Math.sin(a) * 0.92;
      beads += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r + R2() * 1.4).toFixed(1)}" fill="url(#g${id})" opacity="${(0.88 + R2() * 0.12).toFixed(2)}"/>`;
    }
    return `<svg viewBox="0 0 200 200" aria-hidden="true">${gradDefs(id, p.c)}<ellipse cx="100" cy="100" rx="${R}" ry="${R * 0.92}" fill="none" stroke="${p.c[0]}" stroke-opacity=".35" stroke-width="1.5"/>${beads}</svg>`;
  }
  if (p.shape === 'sphere') return `<svg viewBox="0 0 200 200" aria-hidden="true">${gradDefs(id, p.c)}<path d="M62 168 Q100 150 138 168 L132 182 L68 182Z" fill="#8A6A4A"/><circle cx="100" cy="100" r="62" fill="url(#g${id})"/><ellipse cx="78" cy="72" rx="16" ry="9" fill="#fff" opacity=".35"/></svg>`;
  if (p.shape === 'pyramid') return `<svg viewBox="0 0 200 200" aria-hidden="true">${gradDefs(id, p.c)}<polygon points="100,34 40,160 100,176" fill="url(#g${id})"/><polygon points="100,34 160,160 100,176" fill="${p.c[0]}"/><polygon points="100,34 100,176 160,160" fill="#000" opacity=".12"/></svg>`;
  if (p.shape === 'cluster') {
    let s = ''; const R2 = rng(7);
    [[60,70],[82,98],[100,120],[118,92],[140,66],[72,54],[128,58]].forEach(([x, h]) => {
      const b = 150, w = 9 + R2() * 5;
      s += `<polygon points="${x - w},${b} ${x - w},${b - h + 18} ${x},${b - h} ${x + w},${b - h + 18} ${x + w},${b}" fill="url(#g${id})" stroke="${p.c[0]}" stroke-opacity=".5"/>`;
    });
    return `<svg viewBox="0 0 200 200" aria-hidden="true">${gradDefs(id, p.c)}<ellipse cx="100" cy="156" rx="64" ry="14" fill="#8C8578"/>${s}</svg>`;
  }
  let pts = ''; const R2 = rng(11);
  for (let i = 0; i < 26; i++) {
    const a = R2() * Math.PI * 2, rr = R2() * 34, x = 100 + rr * Math.cos(a), y = 96 + rr * Math.sin(a) * 1.6;
    pts += `<polygon points="${x - 5},${y + 6} ${x},${y - 7} ${x + 5},${y + 6}" fill="${p.c[1]}" opacity="${(0.5 + R2() * 0.5).toFixed(2)}"/>`;
  }
  return `<svg viewBox="0 0 200 200" aria-hidden="true">${gradDefs(id, p.c)}<ellipse cx="100" cy="100" rx="66" ry="88" fill="#7A6E62"/><ellipse cx="100" cy="98" rx="52" ry="74" fill="url(#g${id})"/>${pts}</svg>`;
}
function recList(ids) {
  const uniq = [...new Set(ids)].map(byId).filter(Boolean);
  return `<div class="recs"><h4>${t('recsFor')}</h4><div class="rec-list">${uniq.map(p =>
    `<button type="button" class="rec el-${p.el}" data-open="${p.id}">${drawProduct(p)}<span>${L(p).name}<small>${fmt(p.price)}</small></span></button>`).join('')}</div></div>`;
}
const recsOfEl = (el, n = 3) => PRODUCTS.filter(p => p.el === el).map(p => p.id).slice(0, n);
function wireOpen(root) { root.querySelectorAll('[data-open]').forEach(a => a.onclick = e => { e.preventDefault(); openPassport(a.dataset.open); }); }
const block = (el, html) => `<div class="el-${el} stack">${html}</div>`;
const fact = (k, v, cls = '') => `<div class="fact"><small>${k}</small><b class="${cls}">${v}</b></div>`;

/* ---------- state ---------- */
let profile = null, pickEl = null, fType = 'all', fEl = 'all', tab = 'bazi', tarotDraw = null, curCell = CELLS[4], openId = null;
let hexLines = null, qian = null, nameIn = { sur: '林', given: '雅琪' }, palmAns = { hand: 2, finger: 2, face: 2 };
let alPick = '嫁娶', alY = null, alM = null;
const GROUPS = { fate: ['bazi','ziwei','life','name'], stars: ['astro','sx'], div: ['tarot','iching','qian'], fs: ['kua','almanac','today'], phys: ['palm'] };
const groupOf = k => Object.keys(GROUPS).find(g => GROUPS[g].includes(k));

function readProfile() {
  const v = $('bdate').value; if (!v) return null;
  const [y, m, d] = v.split('-').map(Number);
  const noTime = $('bnotime').checked, tv = $('btime').value;
  let hh = null, mm = null;
  if (!noTime && tv) { [hh, mm] = tv.split(':').map(Number); }
  return { y, m, d, hh, mm, gender: $('bgender').value, place: PLACES.find(p => p.id === $('bplace').value) || PLACES[0], name: $('bname').value.trim() };
}

/* ---------- static text ---------- */
function applyStatic() {
  document.documentElement.lang = isEn() ? 'en' : 'zh-Hant';
  document.title = t('brand');
  document.querySelectorAll('[data-t]').forEach(el => el.innerHTML = t(el.dataset.t));
  $('bname').placeholder = t('fNamePh');
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  const g = $('bgender'), gv = g.value || 'f';
  g.innerHTML = `<option value="f">${t('female')}</option><option value="m">${t('male')}</option>`; g.value = gv;
  const pl = $('bplace'), pv = pl.value || 'khh';
  pl.innerHTML = PLACES.map(p => `<option value="${p.id}">${isEn() ? p.en : p.zh}</option>`).join(''); pl.value = pv;
  renderTabs();
  $('typeFilters').innerHTML = [['all','all'],['手鏈','bracelet'],['擺件','ornament']].map(([v, k]) => `<button class="chip" data-type="${v}" aria-pressed="${fType === v}">${t(k)}</button>`).join('');
  $('elFilters').innerHTML = `<button class="chip" data-el="all" aria-pressed="${fEl === 'all'}">${t('elAll')}</button>` +
    ELS.map(e => `<button class="chip el el-${e}" data-el="${e}" aria-pressed="${fEl === e}">${isEn() ? EL_EN[e] + ' ' + e : e}</button>`).join('');
  document.querySelectorAll('[data-type]').forEach(b => b.onclick = () => { fType = b.dataset.type; document.querySelectorAll('[data-type]').forEach(x => x.setAttribute('aria-pressed', x === b)); renderGrid(); });
  document.querySelectorAll('[data-el]').forEach(b => b.onclick = () => setEl(b.dataset.el));
}
function renderTabs() {
  const g = groupOf(tab);
  $('groups').innerHTML = Object.keys(GROUPS).map(k => `<button type="button" class="grp" data-grp="${k}" aria-pressed="${k === g}">${t('groups')[k]}</button>`).join('');
  $('tabs').innerHTML = GROUPS[g].map(k => `<button class="tab" role="tab" id="tab-${k}" data-tab="${k}" aria-selected="${tab === k}" aria-controls="pane">${t('tabs')[k]}</button>`).join('');
  document.querySelectorAll('[data-grp]').forEach(b => b.onclick = () => { tab = GROUPS[b.dataset.grp][0]; renderTabs(); renderPane(); });
  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; renderTabs(); renderPane(); });
}

/* ---------- 八字 ---------- */
function chartData() {
  const p = bazi(profile);
  const count = {木:0,火:0,土:0,金:0,水:0};
  p.forEach(x => { if (x) { count[ST_EL[x[0]]]++; count[BR_EL[x[1]]]++; } });
  const min = Math.min(...ELS.map(e => count[e]));
  const weak = ELS.filter(e => count[e] === min);
  return { p, count, weak, dmEl: ST_EL[p[2][0]] };
}
function glyph(ch, py, el) { return `<div class="glyph el-${el}">${ch}<i>${isEn() ? py + ' · ' + EL_EN[el] : el}</i></div>`; }
function paneBazi(c) {
  const labels = t('pillars'), nm = t('elName');
  const pillars = c.p.map((x, i) => {
    if (!x) return `<div class="pillar off"><small>${labels[i]}</small><div class="glyph">？<i>${t('unknown')}</i></div><div class="glyph">？<i>${t('unknown')}</i></div></div>`;
    return `<div class="pillar"><small>${labels[i]}</small>${glyph(ST[x[0]], ST_PY[x[0]], ST_EL[x[0]])}${glyph(BR[x[1]], BR_PY[x[1]], BR_EL[x[1]])}</div>`;
  }).join('');
  const total = Object.values(c.count).reduce((a, b) => a + b, 0), max = Math.max(...Object.values(c.count), 1);
  const bars = ELS.map(e => `<div class="bar el-${e}"><b>${nm(e)}</b><div class="track"><div class="fill" style="width:${c.count[e] / max * 100}%"></div></div><span>${c.count[e]}</span></div>`).join('');
  const missing = ELS.filter(e => c.count[e] === 0);
  const dm = isEn() ? `${ST[c.p[2][0]]} ${ST_PY[c.p[2][0]]}` : ST[c.p[2][0]];
  return `<div class="chart">
    <div class="pillars">${pillars}</div>
    <div class="bars">${bars}</div>
    <div class="verdict">${t('verdict')(profile.name, dm, nm(c.dmEl), total, missing.map(nm), c.weak.map(nm), info(pickEl))}
      <div class="row"><button class="btn" type="button" id="seePicks">${t('seePicks')(pickEl)}</button><button class="btn ghost" type="button" id="seePlace">${t('seePlace')}</button></div>
    </div></div>${recList(recsOfEl(pickEl, 6))}`;
}

/* ---------- 紫微斗數 ---------- */
function ziwei(pr) {
  let sol = Solar.fromYmdHms(pr.y, pr.m, pr.d, pr.hh, pr.mm || 0, 0);
  if (pr.hh === 23) sol = sol.next(1);
  const lu = sol.getLunar();
  let month = lu.getMonth(); const day = lu.getDay(); const leap = month < 0;
  if (leap) { month = -month; if (day > 15) month = month % 12 + 1; }
  const ys = lu.getYearGanIndex(), yb = lu.getYearZhiIndex();
  const hi = Math.floor((pr.hh + 1) / 2) % 12;
  const ming = mod(2 + month - 1 - hi, 12), shen = mod(2 + month - 1 + hi, 12);
  const start = ((ys % 5) * 2 + 2) % 10;
  const stemOf = b => (start + mod(b - 2, 12)) % 10;
  const ms = stemOf(ming), gzIdx = mod(6 * ms - 5 * ming, 60);
  const ju = JU[NAYIN_EL[Math.floor(gzIdx / 2)]];
  let x = 0; while ((day + x) % ju) x++;
  const q = (day + x) / ju;
  const z = mod(2 + q - 1 + (x % 2 ? -x : x), 12), f = mod(4 - z, 12);
  const cells = Array.from({ length: 12 }, () => ({ main: [], minor: [] }));
  const put = (b, name, main) => cells[mod(b, 12)][main ? 'main' : 'minor'].push(name);
  [['紫微',0],['天機',-1],['太陽',-3],['武曲',-4],['天同',-5],['廉貞',-8]].forEach(([n, o]) => put(z + o, n, true));
  [['天府',0],['太陰',1],['貪狼',2],['巨門',3],['天相',4],['天梁',5],['七殺',6],['破軍',10]].forEach(([n, o]) => put(f + o, n, true));
  put(10 - hi, '文昌'); put(4 + hi, '文曲'); put(4 + month - 1, '左輔'); put(10 - (month - 1), '右弼');
  const KY = {0:[1,7],4:[1,7],6:[1,7],1:[0,8],5:[0,8],2:[11,9],3:[11,9],7:[6,2],8:[3,5],9:[3,5]}[ys];
  put(KY[0], '天魁'); put(KY[1], '天鉞');
  const lc = [2,3,5,6,5,6,8,9,11,0][ys]; put(lc, '祿存'); put(lc + 1, '擎羊'); put(lc - 1, '陀羅');
  const ma = [[8,0,4],[2,6,10],[5,9,1],[11,3,7]].findIndex(g => g.includes(yb)); put([2,8,11,5][ma], '天馬');
  const sihua = {}; ZW_SIHUA[ST[ys]].forEach((n, i) => sihua[n] = i);
  const palaceAt = b => mod(ming - b, 12);   // palace index for branch b
  return { cells, ming, shen, ju, stemOf, palaceAt, sihua, lunar: lu, leap };
}
function starName(n) { return isEn() ? (ZW_MAIN[n] ? ZW_MAIN[n].en : ZW_MINOR[n]) : n; }
function paneZiwei() {
  if (!HAS_LUNAR) return `<p>${t('needTime')}</p>`;
  if (profile.hh == null) return `<p class="lead" style="font-size:18px">${t('needTime')}</p>`;
  const z = ziwei(profile);
  let mainStars = z.cells[z.ming].main, borrowed = false;
  if (!mainStars.length) { mainStars = z.cells[mod(z.ming + 6, 12)].main; borrowed = true; }
  const lead = mainStars.map(starName).join(isEn() ? ' & ' : '、');
  const first = ZW_MAIN[mainStars[0]];
  const POS = {5:[1,1],6:[1,2],7:[1,3],8:[1,4],4:[2,1],9:[2,4],3:[3,1],10:[3,4],2:[4,1],1:[4,2],0:[4,3],11:[4,4]};
  const pn = ZW_PALACES[isEn() ? 'en' : 'zh'];
  const tag = n => z.sihua[n] != null ? `<em class="hua h${z.sihua[n]}">${SIHUA_LABEL[isEn() ? 'en' : 'zh'][z.sihua[n]]}</em>` : '';
  const cellsHtml = Object.entries(POS).map(([b, [r, c]]) => {
    b = +b; const cell = z.cells[b], pi = z.palaceAt(b);
    return `<div class="zw-cell${b === z.ming ? ' is-ming' : ''}" style="grid-row:${r};grid-column:${c}">
      <div class="zw-main">${cell.main.map(n => `<span>${starName(n)}${tag(n)}</span>`).join('')}</div>
      <div class="zw-minor">${cell.minor.map(n => `<span>${starName(n)}${tag(n)}</span>`).join('')}</div>
      <div class="zw-foot"><b>${pn[pi]}${b === z.shen ? (isEn() ? ' · Body' : '・身') : ''}</b><span>${ST[z.stemOf(b)]}${BR[b]}</span></div></div>`;
  }).join('');
  const lunarStr = isEn() ? `${z.lunar.getYearInGanZhi()} · ${z.leap ? 'leap ' : ''}month ${Math.abs(z.lunar.getMonth())} · day ${z.lunar.getDay()}` : `${z.lunar.getYearInGanZhi()}年 ${z.lunar.getMonthInChinese()}月${z.lunar.getDayInChinese()}`;
  const center = `<div class="zw-center" style="grid-row:2/4;grid-column:2/4">
     <b>${profile.name || (isEn() ? 'Chart' : '命盤')}</b>
     <span>${lunarStr}</span><span>${JU_NAME[isEn() ? 'en' : 'zh'][z.ju]}</span>
     <span>${t('zwFacts').ming} ${ST[z.stemOf(z.ming)]}${BR[z.ming]} · ${t('zwFacts').shen} ${BR[z.shen]}</span></div>`;
  return block(first.el, `<p class="lead">${t('zwLead')(profile.name, lead)}</p>
    ${borrowed ? `<p class="sub">${t('zwEmpty')}</p>` : ''}
    <p style="margin:0">${mainStars.map(n => `<strong>${starName(n)}</strong>${isEn() ? ': ' + ZW_MAIN[n].en_d : '：' + ZW_MAIN[n].zh_d}`).join('<br>')}</p>
    <div class="zw-wrap"><div class="zw-grid">${cellsHtml}${center}</div></div>
    <p class="note">${t('zwNote')}</p>`) + recList(mainStars.flatMap(n => ZW_MAIN[n].rec));
}

/* ---------- 生命靈數 ---------- */
function paneLife() {
  const digits = `${profile.y}${pad(profile.m)}${pad(profile.d)}`.split('').map(Number);
  const total = digits.reduce((a, b) => a + b, 0);
  let r = total; while (r > 9) r = String(r).split('').reduce((a, b) => a + +b, 0);
  const label = total > 9 ? `${total}/${r}` : `${r}`;
  const cnt = Array(10).fill(0); digits.forEach(n => cnt[n]++);
  const LAY = [3,6,9,2,5,8,1,4,7];
  const grid = LAY.map(n => `<div class="lp-cell${cnt[n] ? ' on' : ''}"><b>${n}</b><span>${cnt[n] ? '●'.repeat(Math.min(cnt[n], 4)) : ''}</span></div>`).join('');
  const lines = LIFE_LINES.filter(l => l.n.every(n => cnt[n]));
  const missing = [1,2,3,4,5,6,7,8,9].filter(n => !cnt[n]);
  const d = LIFE[r][isEn() ? 'en' : 'zh'];
  const el = ['','火','火','土','木','水','水','火','金','金'][r];
  return block(el, `<p class="lead">${t('lpLead')(profile.name, label)}</p>
    <p style="margin:0"><strong>${d[0]}</strong><br>${d[1]}</p>
    <div class="lp-wrap"><div><h4 class="mini">${t('lpGrid')}</h4><div class="lp-grid">${grid}</div></div>
      <div class="facts" style="flex:1">${fact(t('lpLines'), lines.length ? lines.map(l => isEn() ? l.en : l.zh).join(t('sep')) : t('lpNoLine'))}${fact(t('lpMissing'), missing.length ? missing.join(isEn() ? ', ' : '、') : t('lpNone'))}</div></div>
    <p class="note">${t('lpNote')}</p>`) + recList([LIFE[r].c, ...missing.slice(0, 2).map(n => LIFE[n].c)]);
}

/* ---------- 姓名學 ---------- */
function strokes(ch) {
  if (NUM_CHARS[ch]) return NUM_CHARS[ch];
  const c = ch.codePointAt(0);
  if (c < 0x4E00 || c > 0x9FFF) return 0;
  return KX_STROKES.charCodeAt(c - 0x4E00) - 48;
}
function paneName() {
  const sur = [...nameIn.sur.trim()], giv = [...nameIn.given.trim()];
  const form = `<form class="tq" id="nmForm"><label for="nmSur">${t('nmSur')}<input id="nmSur" value="${esc(nameIn.sur)}" placeholder="${t('nmSurPh')}" maxlength="2"></label><label for="nmGiven">${t('nmGiven')}<input id="nmGiven" value="${esc(nameIn.given)}" placeholder="${t('nmGivenPh')}" maxlength="3"></label><button class="btn" type="submit">${t('nmGo')}</button></form>`;
  if (!sur.length || !giv.length) return form;
  const bad = [...sur, ...giv].find(c => !strokes(c));
  if (bad) return form + `<p class="warn">${t('nmMiss')(esc(bad))}</p>`;
  const S = sur.map(strokes), G = giv.map(strokes);
  const sumS = S.reduce((a, b) => a + b, 0), sumG = G.reduce((a, b) => a + b, 0);
  const tian = sur.length === 1 ? S[0] + 1 : sumS;
  const ren = S[S.length - 1] + G[0];
  const di = giv.length === 1 ? G[0] + 1 : sumG;
  const zong = sumS + sumG;
  const wai = zong - ren + (sur.length === 1 ? 1 : 0) + (giv.length === 1 ? 1 : 0);
  const luck = n => { const v = n > 81 ? mod(n - 1, 80) + 1 : n; return LUCKY_81.has(v) ? 'ji' : HALF_81.has(v) ? 'ban' : 'xiong'; };
  const g5 = { tian, ren, di, wai, zong };
  const good = Object.values(g5).filter(n => luck(n) === 'ji').length;
  const elOf = n => DIGIT_EL[n % 10];
  const rel = (a, b) => a === b ? 'same' : (GEN[a] === b || GEN[b] === a) ? 'sheng' : 'ke';
  const [eT, eR, eD] = [elOf(tian), elOf(ren), elOf(di)];
  const nm = t('elName');
  const chars = [...sur, ...giv].map((c, i) => `<span class="nm-ch"><b>${c}</b><small>${(i < sur.length ? S[i] : G[i - sur.length])}</small></span>`).join('');
  const rows = Object.keys(g5).map(k => `<div class="nm-row"><span>${t('nmGrids')[k]}<small>${t('nmRole')[k]}</small></span><b>${g5[k]}</b><i class="el-${elOf(g5[k])}" style="color:var(--c)">${nm(elOf(g5[k]))}</i><em class="lk ${luck(g5[k])}">${t('nmLuck')[luck(g5[k])]}</em></div>`).join('');
  return form + block(eR, `<div class="nm-chars">${chars}</div>
    <div class="nm-table">${rows}</div>
    <p style="margin:0">${t('nmSum')(good, 5)} ${t('nmSancai')}：${nm(eT)} → ${nm(eR)} → ${nm(eD)}（${t('nmRel')[rel(eT, eR)]}、${t('nmRel')[rel(eR, eD)]}）</p>
    <p class="note">${t('nmNote')}</p>`) + recList([...recsOfEl(eR, 2), ...recsOfEl(Object.keys(GEN).find(k => GEN[k] === eR), 1)]);
}

/* ---------- 星盤 ---------- */
function paneAstro() {
  const sun0 = sunSign(profile.m, profile.d);
  const pl = profile.place, hasTime = profile.hh != null;
  const nameOf = z => `${z.sym} ${isEn() ? z.en : z.zh}`;
  let rows = '', moonZ = null, ascZ = null;
  if (HAS_ASTRO) {
    const A = Astronomy;
    const utc = new Date(Date.UTC(profile.y, profile.m - 1, profile.d, hasTime ? profile.hh : 12, hasTime ? profile.mm : 0) - pl.tz * 3600e3);
    const time = A.MakeTime(utc);
    const P = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'], keys = ['sun','moon','mercury','venus','mars','jupiter','saturn'];
    const lon = P.map(b => A.Ecliptic(A.GeoVector(b, time, true)).elon);
    moonZ = signAt(lon[1]);
    if (hasTime) {
      const T = (utc - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525;
      const eps = (23.4392911 - 0.0130042 * T) * Math.PI / 180;
      const ramc = mod(A.SiderealTime(time) * 15 + pl.lon, 360) * Math.PI / 180, phi = pl.lat * Math.PI / 180;
      const asc = mod(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * 180 / Math.PI, 360);
      ascZ = signAt(asc); lon.push(asc); keys.push('asc');
    }
    rows = keys.map((k, i) => {
      const z = signAt(lon[i]), deg = Math.floor(mod(lon[i], 30));
      return `<div class="ast-row"><span>${t('astPlanets')[k]}<small>${t('astRole')[k]}</small></span><b>${nameOf(z)}</b><em>${deg}°</em></div>`;
    }).join('');
  }
  const sun = sun0, i = isEn() ? 1 : 0;
  const el = {火:'火',土:'土',風:'金',水:'水'}[sun.el];
  return block(el, `<p class="lead">${t('zLead')(profile.name, nameOf(sun))}</p>
    ${moonZ ? `<p class="sub" style="margin:0">${t('astLead')(profile.name, isEn() ? sun.en : sun.zh, isEn() ? moonZ.en : moonZ.zh, ascZ ? (isEn() ? ascZ.en : ascZ.zh) : '')}</p>` : ''}
    <div class="facts">${fact(t('zFacts').range, sun.range[i])}${fact(t('zFacts').el, isEn() ? sun.elEn : ZODIAC_EL_ZH[sun.el])}${fact(t('zFacts').ruler, sun.kw[i])}</div>
    ${rows ? `<div class="ast-table">${rows}</div>` : ''}
    ${!hasTime ? `<p class="note">${t('astNoAsc')}</p>` : ''}
    <p class="note">${t('astNote')}</p>`) + recList([...sun.rec, ...(moonZ ? [moonZ.rec[0]] : []), ...(ascZ ? [ascZ.rec[0]] : [])]);
}

/* ---------- 生肖太歲 ---------- */
function paneSx(c) {
  const b = c.p[0][1];
  const ani = isEn() ? `${ANI_EN[b]} ${ANI_ZH[b]}` : ANI_ZH[b];
  const rel = TAISUI_2026[b] || 'none';
  const kind = rel === 'none' ? 'none' : (rel === 'sanhe' || rel === 'liuhe') ? 'good' : 'bad';
  const group = SANHE.find(g => g.includes(b)).filter(x => x !== b);
  const aname = x => isEn() ? ANI_EN[x] : ANI_ZH[x];
  const el = kind === 'bad' ? '火' : kind === 'good' ? '木' : BR_EL[b];
  const recs = kind === 'bad' ? ['B09','B08','D05'] : kind === 'good' ? ['B05','B07','D03'] : recsOfEl(pickEl);
  return block(el, `<p class="lead">${t('sxLead')(profile.name, ani)}</p>
    <p class="sub">${t('sxYear')}</p>
    <div class="facts">${fact(t('sxFacts').rel, t('sxRel')[rel], kind === 'bad' ? 'warn' : kind === 'good' ? 'good' : '')}${fact(t('sxFacts').ally, group.map(aname).join(t('sep')))}${fact(t('sxFacts').pair, aname(LIUHE[b]))}</div>
    <p style="margin:0">${t('sxAdvice')[kind]}</p>`) + recList(recs);
}

/* ---------- 塔羅 ---------- */
function drawTarot() {
  const idx = [...TAROT.keys()];
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  tarotDraw = idx.slice(0, 3).map(i => ({ i, rev: Math.random() < 0.3 }));
}
function paneTarot() {
  if (!tarotDraw) drawTarot();
  const q = ($('tq') && $('tq').value.trim()) || '';
  const k = isEn() ? 1 : 0;
  const cards = tarotDraw.map((d, pos) => {
    const c = TAROT[d.i];
    return `<div class="tcard"><span class="pos">${t('tPos')[pos]}</span>
      <div class="face${d.rev ? ' rev' : ''}"><img src="img/tarot/${pad(d.i)}.jpg" alt="${c.n} ${isEn() ? c.en : c.zh}" width="360" height="600" loading="lazy"></div>
      <b class="tname">${c.n} · ${isEn() ? c.en : c.zh}</b>
      <span class="ori">${d.rev ? t('rev') : t('up')}</span>
      <p>${(d.rev ? c.rv : c.up)[k]}</p></div>`;
  }).join('');
  return `<form class="tq" id="tqForm"><label for="tq">${t('tQ')}<input id="tq" type="text" value="${esc(q)}" placeholder="${t('tQPh')}"></label><button class="btn" type="submit">${t('tDraw')}</button></form>
    <p class="note">${t('tHint')}</p>
    ${q ? `<p class="sub" style="margin:0">${t('tSum')(esc(q))}</p>` : ''}
    <div class="spread">${cards}</div>${recList(tarotDraw.map(d => TAROT[d.i].rec))}`;
}

/* ---------- 金錢卦 ---------- */
function tossHex() { hexLines = Array.from({ length: 6 }, () => [0, 0, 0].reduce(a => a + (Math.random() < 0.5 ? 3 : 2), 0)); }
function hexOf(bits) {
  const lo = TRIGRAMS.findIndex(g => g.k === bits.slice(0, 3).join('')), up = TRIGRAMS.findIndex(g => g.k === bits.slice(3).join(''));
  return { n: KW[up][lo], up: TRIGRAMS[up], lo: TRIGRAMS[lo] };
}
function paneIching() {
  if (!hexLines) tossHex();
  const main = hexLines.map(v => (v === 7 || v === 9) ? 1 : 0);
  const moving = hexLines.map(v => v === 6 || v === 9);
  const chg = main.map((b, i) => moving[i] ? 1 - b : b);
  const H = hexOf(main), H2 = hexOf(chg), nMove = moving.filter(Boolean).length;
  const hx = h => HEX[h.n];
  const nameH = h => isEn() ? `${h.n}. ${hx(h)[1]} ${hx(h)[0]}` : `第${h.n}卦　${hx(h)[0]}`;
  const lineSvg = bits => `<div class="hex">${bits.map((b, i) => `<i class="ln${b ? '' : ' yin'}${moving[i] ? ' mv' : ''}"></i>`).reverse().join('')}</div>`;
  const tri = g => `${g.sym} ${g.zh}${isEn() ? ' ' + g.nat[1] : '（' + g.nat[0] + '）'}`;
  return `<div class="row"><button class="btn" type="button" id="icToss">${t('icToss')}</button></div><p class="note">${t('icHint')}</p>` +
    block(H.up.el, `<div class="hex-pair">
      <div class="hex-card">${lineSvg(main)}<b>${nameH(H)}</b><small>${t('icUpper')} ${tri(H.up)}・${t('icLower')} ${tri(H.lo)}</small><p>${hx(H)[isEn() ? 3 : 2]}</p></div>
      ${nMove ? `<div class="hex-card ghost"><span class="pos">${t('icChange')}</span>${lineSvg(chg).replace(/ mv/g, '')}<b>${nameH(H2)}</b><p>${hx(H2)[isEn() ? 3 : 2]}</p></div>` : ''}
    </div>
    <p class="note">${nMove ? t('icMoving')(nMove) : t('icNoChange')}</p>`) + recList([...recsOfEl(H.up.el, 2), ...recsOfEl(H.lo.el, 1)]);
}

/* ---------- 求籤 ---------- */
function drawQian(confirmed) { qian = { n: Math.floor(Math.random() * QIAN.length), stage: confirmed ? 'ok' : 'drawn', cup: confirmed ? 'sheng' : null }; }
function paneQian() {
  if (!qian) drawQian(true);
  const q = QIAN[qian.n], k = isEn();
  const btns = `<div class="row"><button class="btn${qian.stage === 'drawn' ? ' ghost' : ''}" type="button" id="qDraw">${t('qDraw')}</button>${qian.stage === 'drawn' ? `<button class="btn" type="button" id="qThrow">${t('qThrow')}</button>` : ''}</div>`;
  if (qian.stage !== 'ok') {
    const msg = qian.stage === 'drawn' ? t('qWait') : t('qCup')[qian.cup];
    return btns + `<div class="qian-stick"><b>${t('qNo')(qian.n + 1)}</b><p>${msg}</p></div>`;
  }
  const el = { 上上: '土', 上: '木', 中: '金', 下: '水' }[q[0]];
  return btns + block(el, `<p class="sub" style="margin:0">${t('qCup').sheng}</p>
    <div class="qian"><div class="qian-head"><b>${t('qNo')(qian.n + 1)}</b><em>${k ? QIAN_GRADE_EN[q[0]] : q[0]}</em></div>
      <p class="qian-verse">${q[1].replace('，', '，<br>')}</p>${k ? `<p class="sub" style="margin:0">${q[2]}</p>` : ''}
      <p style="margin:0"><strong>${t('qAdvice')}${isEn() ? ': ' : '：'}</strong>${k ? q[4] : q[3]}</p></div>
    <p class="note">${t('qNote')}</p>`) + recList(QIAN_REC[q[0]]);
}

/* ---------- 八宅本命卦 ---------- */
function kuaOf(pr, c) {
  const yi = mod(6 * c.p[0][0] - 5 * c.p[0][1], 60);
  const yy = mod(pr.y - 4, 60) === yi ? pr.y : pr.y - 1;
  let k = pr.gender === 'm' ? mod(11 - mod(yy, 9), 9) : mod(4 + mod(yy, 9), 9);
  if (k === 0) k = 9;
  if (k === 5) k = pr.gender === 'm' ? 2 : 8;
  return k;
}
function paneKua(c) {
  const k = kuaOf(profile, c), K = KUA[k], li = isEn() ? 1 : 0;
  const bad = Object.keys(DIRS).filter(d => !K.good.includes(d));
  const goodRows = K.good.map((d, i) => `<div class="kua-row good"><b>${DIRS[d][li]}</b><span>${t('kuaMean')[i]}</span></div>`).join('');
  const grid = CELL_DIR.map(d => {
    if (!d) return `<div class="kua-cell mid">${isEn() ? K.en : K.zh}</div>`;
    const gi = K.good.indexOf(d);
    return `<div class="kua-cell ${gi >= 0 ? 'good' : 'bad'}"><b>${DIRS[d][li]}</b><small>${gi >= 0 ? t('kuaNames')[gi] : '·'}</small></div>`;
  }).join('');
  return block(K.el, `<p class="lead">${t('kuaLead')(profile.name, `${isEn() ? K.en : K.zh}・${t('kuaGroup')[K.g]}`)}</p>
    <div class="kua-wrap"><div class="kua-grid">${grid}</div>
    <div class="stack" style="flex:1;min-width:0"><h4 class="mini">${t('kuaGood')}</h4>${goodRows}<h4 class="mini">${t('kuaBad')}</h4><p style="margin:0">${bad.map(d => DIRS[d][li]).join(t('sep'))}</p></div></div>
    <p class="note">${t('kuaNote')}</p>`) + recList(recsOfEl(K.el));
}

/* ---------- 農民曆 ---------- */
const yjLabel = s => { const tr = toTrad(s); return isEn() ? (YIJI_EN[tr] || tr) : tr; };
function paneAlmanac() {
  if (!HAS_LUNAR) return '';
  const now = new Date();
  if (alY == null) { alY = now.getFullYear(); alM = now.getMonth() + 1; }
  const lu = Solar.fromDate(now).getLunar();
  const dp = lu.getDayInGanZhi(), el = ST_EL[ST.indexOf(dp[0])];
  const lunarStr = isEn() ? `${lu.getYearInGanZhi()} year, month ${Math.abs(lu.getMonth())}, day ${lu.getDay()}` : `${lu.getYearInGanZhi()}年 ${lu.getMonthInChinese()}月${lu.getDayInChinese()}`;
  const dateStr = isEn() ? now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
  const pos = s => isEn() ? (DIRS[{東:'E',南:'S',西:'W',北:'N',東北:'NE',東南:'SE',西南:'SW',西北:'NW'}[toTrad(s).replace('正', '')]] || [0, toTrad(s)])[1] : toTrad(s);
  const first = new Date(alY, alM - 1, 1), days = new Date(alY, alM, 0).getDate(), lead = first.getDay();
  let cells = Array.from({ length: lead }, () => '<div class="cal-cell empty"></div>').join('');
  for (let d = 1; d <= days; d++) {
    const l = Solar.fromYmd(alY, alM, d).getLunar();
    const ok = l.getDayYi().map(toTrad).includes(alPick), bad = l.getDayJi().map(toTrad).includes(alPick);
    const today = alY === now.getFullYear() && alM === now.getMonth() + 1 && d === now.getDate();
    cells += `<div class="cal-cell${ok ? ' ok' : ''}${bad ? ' no' : ''}${today ? ' today' : ''}"><b>${d}</b><small>${l.getDay() === 1 ? l.getMonthInChinese() + '月' : l.getDayInChinese()}</small></div>`;
  }
  const wk = isEn() ? ['Su','Mo','Tu','We','Th','Fr','Sa'] : ['日','一','二','三','四','五','六'];
  const monthLabel = isEn() ? new Date(alY, alM - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : `${alY}年${alM}月`;
  return block(el, `<p class="lead">${dateStr}<span class="sub" style="display:block;font-family:var(--body);font-size:14px">${t('alLunar')} ${lunarStr}・${dp}${isEn() ? '' : '日'}</span></p>
    <div class="yj"><div class="yj-col ok"><h4>${t('alYi')}</h4><p>${lu.getDayYi().map(yjLabel).join(t('sep'))}</p></div><div class="yj-col no"><h4>${t('alJi')}</h4><p>${lu.getDayJi().map(yjLabel).join(t('sep'))}</p></div></div>
    <div class="facts">${fact(t('alChong'), toTrad(lu.getDayChongDesc()))}${fact(t('alSha'), pos(lu.getDaySha()))}${fact(t('alXi'), pos(lu.getDayPositionXiDesc()))}${fact(t('alCai'), pos(lu.getDayPositionCaiDesc()))}${fact(t('alFu'), pos(lu.getDayPositionFuDesc()))}</div>
    <div class="cal-head"><label for="alPick">${t('alPick')}<select id="alPick">${ALMANAC_PICKS.map(p => `<option value="${p}"${p === alPick ? ' selected' : ''}>${isEn() ? YIJI_EN[p] + ' ' + p : p}</option>`).join('')}</select></label>
      <div class="cal-nav"><button type="button" class="chip" id="alPrev" aria-label="${t('alPrev')}">‹</button><b>${monthLabel}</b><button type="button" class="chip" id="alNext" aria-label="${t('alNext')}">›</button></div></div>
    <div class="cal">${wk.map(w => `<div class="cal-wk">${w}</div>`).join('')}${cells}</div>
    <p class="note"><span class="cal-key ok"></span>${t('alGood')}　${t('alNote')}</p>`) + recList(recsOfEl(el));
}

/* ---------- 今日運勢 ---------- */
function paneToday(c) {
  const now = new Date(), y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
  const tp = dayPillar(now);
  const tEl = ST_EL[tp[0]], me = c.dmEl;
  const rel = tEl === me ? 'bi' : GEN[tEl] === me ? 'sheng' : GEN[me] === tEl ? 'xie' : CTRL[me] === tEl ? 'cai' : 'ke';
  const base = {sheng:5, bi:4, cai:4, xie:3, ke:2}[rel];
  const r = rng(hash(`${profile.y}-${profile.m}-${profile.d}|${y}-${m}-${d}`));
  const clamp = v => Math.max(1, Math.min(5, v));
  const scores = [base, clamp(base + Math.round(r() * 2 - 1)), clamp(base + Math.round(r() * 2 - 1)), clamp(base + (rel === 'cai' ? 1 : 0) + Math.round(r() * 2 - 1))];
  const luckyEl = rel === 'ke' ? Object.keys(GEN).find(k => GEN[k] === me) : pickEl;
  const inf = info(luckyEl);
  const pool = PRODUCTS.filter(p => p.el === luckyEl);
  const pick = pool[Math.floor(r() * pool.length)];
  const num = 1 + Math.floor(r() * 9);
  const dateStr = isEn() ? now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : `${y}年${m}月${d}日`;
  const dayP = isEn() ? `${ST[tp[0]]}${BR[tp[1]]} (${EL_EN[tEl]})` : `${ST[tp[0]]}${BR[tp[1]]}（${tEl}）`;
  const rows = t('todayRows').map((lab, i) => `<div class="star-row"><span>${lab}</span><div class="pips" aria-label="${scores[i]}/5">${[1,2,3,4,5].map(n => `<i class="pip${n <= scores[i] ? ' on' : ''}"></i>`).join('')}</div></div>`).join('');
  return block(luckyEl, `<p class="lead">${t('todayLead')(dateStr)}<span class="sub" style="display:block;font-family:var(--body);font-size:14px">${t('todayDay')(dayP)}</span></p>
    <p style="margin:0">${t('todayRel')[rel]}</p>
    <div class="stars">${rows}</div>
    <div class="facts">${fact(t('todayFacts').color, inf.color)}${fact(t('todayFacts').num, num)}${fact(t('todayFacts').dir, inf.dir)}</div>
    <p class="note">${t('todayNote')}</p>`) + recList([pick.id]);
}

/* ---------- 手相面相 ---------- */
function panePalm() {
  const li = isEn() ? 2 : 1;
  const sel = k => `<label for="pm-${k}">${t('pmQ')[k]}<select id="pm-${k}" data-pm="${k}">${PALM_Q[k].map((o, i) => `<option value="${i}"${palmAns[k] === i ? ' selected' : ''}>${o[li]}</option>`).join('')}</select></label>`;
  const score = {木:0,火:0,土:0,金:0,水:0};
  score[PALM_Q.hand[palmAns.hand][0]] += 2; score[PALM_Q.face[palmAns.face][0]] += 2; score[PALM_Q.finger[palmAns.finger][0]] += 1;
  const order = ELS.slice().sort((a, b) => score[b] - score[a]);
  const [a, b] = order, nm = t('elName');
  const label = score[b] && score[b] >= score[a] / 2 ? t('pmMix')(nm(a), nm(b)) : t('pmPure')(nm(a));
  const parent = Object.keys(GEN).find(k => GEN[k] === a);
  return `<div class="palm-form">${sel('hand')}${sel('finger')}${sel('face')}</div>` + block(a, `<p class="lead">${t('pmLead')(label)}</p>
    <p style="margin:0">${PALM_TYPE[a][isEn() ? 'en' : 'zh']}${score[b] ? ' ' + PALM_TYPE[b][isEn() ? 'en' : 'zh'] : ''}</p>
    <p class="note">${t('pmNote')}</p>`) + recList([...recsOfEl(a, 2), ...recsOfEl(parent, 1)]);
}

/* ---------- pane router ---------- */
function renderPane() {
  const c = chartData();
  pickEl = c.weak[0];
  const pane = $('pane');
  pane.className = 'tabpane el-' + pickEl;
  pane.setAttribute('aria-labelledby', 'tab-' + tab);
  const P = { bazi: () => paneBazi(c), ziwei: paneZiwei, life: paneLife, name: paneName, astro: paneAstro, sx: () => paneSx(c), tarot: paneTarot, iching: paneIching, qian: paneQian, kua: () => paneKua(c), almanac: paneAlmanac, today: () => paneToday(c), palm: panePalm };
  try { pane.innerHTML = P[tab](); } catch (err) { pane.innerHTML = `<p class="warn">${esc(err.message)}</p>`; console.error(err); }
  wireOpen(pane);
  const on = (id, fn, ev = 'onclick') => { const el = $(id); if (el) el[ev] = fn; };
  on('seePicks', () => { setEl(pickEl); $('shop').scrollIntoView({ behavior: 'smooth' }); });
  on('seePlace', () => { showCell(CELLS.find(x => x.el === pickEl)); $('place').scrollIntoView({ behavior: 'smooth' }); });
  on('tqForm', e => { e.preventDefault(); const q = $('tq').value; drawTarot(); renderPane(); $('tq').value = q; }, 'onsubmit');
  on('nmForm', e => { e.preventDefault(); nameIn = { sur: $('nmSur').value, given: $('nmGiven').value }; renderPane(); }, 'onsubmit');
  on('icToss', () => { tossHex(); renderPane(); });
  on('qDraw', () => { drawQian(false); renderPane(); });
  on('qThrow', () => { const r = Math.random(); qian.cup = r < 0.5 ? 'sheng' : r < 0.75 ? 'xiao' : 'yin'; qian.stage = qian.cup === 'sheng' ? 'ok' : 'retry'; renderPane(); });
  on('alPick', e => { alPick = e.target.value; renderPane(); }, 'onchange');
  on('alPrev', () => { alM--; if (alM < 1) { alM = 12; alY--; } renderPane(); });
  on('alNext', () => { alM++; if (alM > 12) { alM = 1; alY++; } renderPane(); });
  pane.querySelectorAll('[data-pm]').forEach(s => s.onchange = () => { palmAns[s.dataset.pm] = +s.value; renderPane(); });
}

/* ---------- shop ---------- */
function setEl(e) { fEl = e; document.querySelectorAll('[data-el]').forEach(b => b.setAttribute('aria-pressed', b.dataset.el === e)); renderGrid(); }
function renderGrid() {
  const list = PRODUCTS.filter(p => (fType === 'all' || p.type === fType) && (fEl === 'all' || p.el === fEl));
  const g = $('grid');
  if (!list.length) { g.innerHTML = `<p class="empty">${t('empty')}</p>`; return; }
  g.innerHTML = list.map(p => `<button class="card el-${p.el}${p.el === pickEl ? ' pick' : ''}" data-id="${p.id}">
    <div class="pic">${drawProduct(p)}</div>
    <div class="meta"><div class="top"><span>${L(p).size}</span><span class="tag">${t('elName')(p.el)}</span></div>
    <h3>${L(p).name}</h3><div class="price">${fmt(p.price)}</div>${p.el === pickEl ? `<span class="pickmark">${t('fits')}</span>` : ''}</div></button>`).join('');
  g.querySelectorAll('.card').forEach(c => c.onclick = () => openPassport(c.dataset.id));
}

/* ---------- product page ---------- */
const overlay = $('overlay'), pp = $('passport');
let lastFocus = null;
function openPassport(id) {
  const p = byId(id), x = L(p), inf = info(p.el), dl = t('dl');
  if (overlay.hidden) lastFocus = document.activeElement;
  openId = id;
  pp.className = 'passport el-' + p.el;
  pp.innerHTML = `<div class="pic">${drawProduct(p)}</div>
  <div class="body">
    <div style="display:flex;justify-content:space-between;align-items:start;gap:8px"><span class="code">CR-${p.id} · ${t('batch')}</span><button class="xbtn" id="ppClose" aria-label="${t('close')}">×</button></div>
    <h3 id="ppName">${x.name}</h3>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="tag">${t('elOf')(p.el)}</span><span class="price" style="font-family:var(--mono)">${fmt(p.price)}</span></div>
    <dl>
      <dt>${dl.mat}</dt><dd>${x.mat}</dd>
      <dt>${dl.origin}</dt><dd>${x.origin}</dd>
      <dt>${dl.size}</dt><dd>${x.size}</dd>
      <dt>${dl.meaning}</dt><dd>${x.meaning}</dd>
      <dt>${p.type === '手鏈' ? dl.wear : dl.place}</dt><dd>${x.use}</dd>
      <dt>${dl.dir}</dt><dd>${inf.dir} (${inf.space})</dd>
      <dt>${dl.care}</dt><dd>${p.type === '手鏈' ? t('careB') : t('careD')}</dd>
    </dl>
    <div class="actions"><button class="btn" id="ppAsk" type="button">${t('ask')}</button><span class="toast" id="ppToast"></span></div>
    <p class="fine" style="margin:0">${t('ppFine')}</p>
  </div>`;
  overlay.hidden = false;
  $('ppClose').onclick = closePassport;
  $('ppClose').focus();
  $('ppAsk').onclick = () => {
    const msg = t('askMsg')(x.name, 'CR-' + p.id, fmt(p.price)), tt = $('ppToast');
    try { navigator.clipboard.writeText(msg).then(() => tt.textContent = t('copied')).catch(() => tt.textContent = msg); } catch (e) { tt.textContent = msg; }
  };
}
function closePassport() { overlay.hidden = true; openId = null; if (lastFocus) lastFocus.focus(); }
overlay.addEventListener('click', e => { if (e.target === overlay) closePassport(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) closePassport(); });

/* ---------- 九宮 + flying stars + kua ---------- */
function renderLuoshu() {
  $('luoshu').innerHTML = CELLS.map((c, i) => `<button class="cell el-${c.el}${c.el === pickEl ? ' hint' : ''}" data-i="${i}" aria-pressed="${c === curCell}"><b>${c[lang].dir}</b><small>${t('cellLabel')(c.el)}</small><span class="fs">${isEn() ? STARS[c.fs].en : STARS[c.fs].zh}</span></button>`).join('');
  document.querySelectorAll('.cell').forEach(b => b.onclick = () => showCell(CELLS[+b.dataset.i]));
}
function showCell(c) {
  curCell = c;
  const inf = info(c.el), pd = t('pdl'), s = STARS[c.fs];
  const el = $('placeInfo'); el.className = 'place-info el-' + c.el;
  const items = PRODUCTS.filter(p => p.type === '擺件' && p.el === c.el);
  let kuaLine = '';
  const dir = CELL_DIR[CELLS.indexOf(c)];
  if (dir && profile) {
    const K = KUA[kuaOf(profile, chartData())], gi = K.good.indexOf(dir);
    kuaLine = `<dt>${isEn() ? 'Your Kua' : '本命卦'}</dt><dd class="${gi >= 0 ? 'good' : 'warn'}">${isEn() ? K.en : K.zh}：${gi >= 0 ? t('kuaMean')[gi] : t('kuaBad')}</dd>`;
  }
  el.innerHTML = `<h3>${t('cellTitle')(c[lang].dir, c.el)}</h3><p style="margin:0">${c[lang].tip}</p>
  <dl><dt>${pd.color}</dt><dd>${inf.color}</dd><dt>${pd.meaning}</dt><dd>${inf.meaning}</dd>
  <dt>${pd.items}</dt><dd>${items.length ? items.map(p => `<a href="#" data-open="${p.id}">${L(p).name}</a>`).join(t('sep')) : t('none')}</dd>
  <dt>${pd.star}</dt><dd><span class="star-badge">${isEn() ? s.en : s.zh}</span><span class="${s.good ? 'good' : 'warn'}">${isEn() ? s.men : s.mzh}</span></dd>
  <dt>${pd.cure}</dt><dd>${isEn() ? s.cen : s.czh} <a href="#" data-open="${s.rec}">${L(byId(s.rec)).name}</a></dd>${kuaLine}</dl>
  ${c.el === pickEl ? `<p class="fine" style="color:var(--c)">${t('cellFit')}</p>` : ''}`;
  wireOpen(el);
  renderLuoshu();
}

/* ---------- boot ---------- */
function refresh() { profile = readProfile() || profile; renderPane(); renderGrid(); showCell(curCell); }
$('birthForm').addEventListener('submit', e => { e.preventDefault(); refresh(); });
$('bnotime').addEventListener('change', () => { $('btime').disabled = $('bnotime').checked; });
document.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => {
  lang = b.dataset.lang; try { localStorage.setItem('wx-lang', lang); } catch (e) {}
  applyStatic(); refresh(); if (openId) openPassport(openId);
});
applyStatic();
profile = readProfile();
drawTarot(); tossHex(); drawQian(true);
renderPane();
curCell = CELLS.find(c => c.el === pickEl) || CELLS[4];
renderGrid(); showCell(curCell);
