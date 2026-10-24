/* 五行石室 — app logic */

let lang = 'zh';
try { if (location.hash === '#en') lang = 'en'; else { const s = localStorage.getItem('wx-lang'); if (s === 'en' || s === 'zh') lang = s; } } catch (e) {}
const t = k => T[lang][k];
const info = e => EL_INFO[e][lang];
const L = p => p[lang];
const byId = id => PRODUCTS.find(p => p.id === id);
const fmt = n => 'NT$ ' + n.toLocaleString('en-US');
const pad = n => String(n).padStart(2, '0');
const $ = id => document.getElementById(id);

/* ---------- calculations ---------- */
function bazi(y, m, d, h) {
  let dd = Date.UTC(y, m - 1, d); if (h === 23) dd += 864e5;
  const days = Math.round((dd - Date.UTC(2000, 0, 1)) / 864e5);
  const di = ((54 + days) % 60 + 60) % 60;            // 2000-01-01 = 戊午
  const yy = (m < 2 || (m === 2 && d < 4)) ? y - 1 : y; // year turns at 立春
  const yi = ((yy - 4) % 60 + 60) % 60;
  const md = m * 100 + d, bd = [204,306,405,506,606,707,808,908,1008,1107,1207];
  let k; if (md < 106) k = 10; else if (md < 204) k = 11; else { k = 0; bd.forEach((b, i) => { if (md >= b) k = i; }); }
  const ys = yi % 10, ms = (((ys % 5) * 2 + 2) + k) % 10, mb = (k + 2) % 12, ds = di % 10;
  const p = [[ys, yi % 12], [ms, mb], [ds, di % 12]];
  if (h != null) { const hb = Math.floor((h + 1) / 2) % 12; p.push([((ds % 5) * 2 + hb) % 10, hb]); } else p.push(null);
  return p;
}
function sunSign(m, d) {
  const md = m * 100 + d;
  if (md < 120) return ZODIAC[11];
  let z = ZODIAC[0]; ZODIAC.forEach(x => { if (md >= x.start) z = x; });
  return z;
}
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
function wireOpen(root) { root.querySelectorAll('[data-open]').forEach(a => a.onclick = e => { e.preventDefault(); openPassport(a.dataset.open); }); }

/* ---------- state ---------- */
let profile = null, pickEl = null, fType = 'all', fEl = 'all', tab = 'bazi', tarotDraw = null, curCell = CELLS[4], openId = null;

function readProfile() {
  const v = $('bdate').value; if (!v) return null;
  const [y, m, d] = v.split('-').map(Number);
  const hv = $('bhour').value;
  return { y, m, d, h: hv === '' ? null : Number(hv), name: $('bname').value.trim() };
}

/* ---------- static text ---------- */
const HOURS = [23,1,3,5,7,9,11,13,15,17,19,21];
const TABS = ['bazi','zodiac','sx','tarot','today'];
function applyStatic() {
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
  document.title = t('brand');
  document.querySelectorAll('[data-t]').forEach(el => el.innerHTML = t(el.dataset.t));
  $('bname').placeholder = t('fNamePh');
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  const sel = $('bhour'), cur = sel.value;
  sel.innerHTML = `<option value="">${t('hourUnknown')}</option>` + HOURS.map((h, i) => {
    const label = `${pad(h)}:00–${pad((h + 1) % 24)}:59 ` + (lang === 'en' ? `${BR_PY[i]} (${ANI_EN[i]})` : `${BR[i]}時`);
    return `<option value="${h}">${label}</option>`;
  }).join('');
  sel.value = cur;
  $('tabs').innerHTML = TABS.map(k => `<button class="tab" role="tab" id="tab-${k}" data-tab="${k}" aria-selected="${tab === k}" aria-controls="pane">${t('tabs')[k]}</button>`).join('');
  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; document.querySelectorAll('[data-tab]').forEach(x => x.setAttribute('aria-selected', x === b)); renderPane(); });
  $('typeFilters').innerHTML = [['all','all'],['手鏈','bracelet'],['擺件','ornament']].map(([v, k]) => `<button class="chip" data-type="${v}" aria-pressed="${fType === v}">${t(k)}</button>`).join('');
  $('elFilters').innerHTML = `<button class="chip" data-el="all" aria-pressed="${fEl === 'all'}">${t('elAll')}</button>` +
    ELS.map(e => `<button class="chip el el-${e}" data-el="${e}" aria-pressed="${fEl === e}">${lang === 'en' ? EL_EN[e] + ' ' + e : e}</button>`).join('');
  document.querySelectorAll('[data-type]').forEach(b => b.onclick = () => { fType = b.dataset.type; document.querySelectorAll('[data-type]').forEach(x => x.setAttribute('aria-pressed', x === b)); renderGrid(); });
  document.querySelectorAll('[data-el]').forEach(b => b.onclick = () => setEl(b.dataset.el));
}

/* ---------- 八字 core (also sets pickEl) ---------- */
function chartData() {
  const p = bazi(profile.y, profile.m, profile.d, profile.h);
  const count = {木:0,火:0,土:0,金:0,水:0};
  p.forEach(x => { if (x) { count[ST_EL[x[0]]]++; count[BR_EL[x[1]]]++; } });
  const min = Math.min(...ELS.map(e => count[e]));
  const weak = ELS.filter(e => count[e] === min);
  return { p, count, weak, dmEl: ST_EL[p[2][0]] };
}
function glyph(ch, py, el) { return `<div class="glyph el-${el}">${ch}<i>${lang === 'en' ? py + ' · ' + EL_EN[el] : el}</i></div>`; }

function paneBazi(c) {
  const labels = t('pillars'), nm = t('elName');
  const pillars = c.p.map((x, i) => {
    if (!x) return `<div class="pillar off"><small>${labels[i]}</small><div class="glyph">？<i>${t('unknown')}</i></div><div class="glyph">？<i>${t('unknown')}</i></div></div>`;
    return `<div class="pillar"><small>${labels[i]}</small>${glyph(ST[x[0]], ST_PY[x[0]], ST_EL[x[0]])}${glyph(BR[x[1]], BR_PY[x[1]], BR_EL[x[1]])}</div>`;
  }).join('');
  const total = Object.values(c.count).reduce((a, b) => a + b, 0), max = Math.max(...Object.values(c.count), 1);
  const bars = ELS.map(e => `<div class="bar el-${e}"><b>${nm(e)}</b><div class="track"><div class="fill" style="width:${c.count[e] / max * 100}%"></div></div><span>${c.count[e]}</span></div>`).join('');
  const missing = ELS.filter(e => c.count[e] === 0);
  const dm = lang === 'en' ? `${ST[c.p[2][0]]} ${ST_PY[c.p[2][0]]}` : ST[c.p[2][0]];
  const recs = PRODUCTS.filter(p => p.el === pickEl).map(p => p.id);
  return `<div class="chart">
    <div class="pillars">${pillars}</div>
    <div class="bars">${bars}</div>
    <div class="verdict">${t('verdict')(profile.name, dm, nm(c.dmEl), total, missing.map(nm), c.weak.map(nm), info(pickEl))}
      <div class="row"><button class="btn" type="button" id="seePicks">${t('seePicks')(pickEl)}</button><button class="btn ghost" type="button" id="seePlace">${t('seePlace')}</button></div>
    </div></div>${recList(recs)}`;
}

function paneZodiac() {
  const z = sunSign(profile.m, profile.d), i = lang === 'en' ? 1 : 0;
  const el = {火:'火',土:'土',風:'金',水:'水'}[z.el];   // colour only
  return `<div class="el-${el}" style="display:flex;flex-direction:column;gap:18px">
    <p class="lead">${t('zLead')(profile.name, `${z.sym} ${lang === 'en' ? z.en : z.zh}`)}</p>
    <div class="facts">
      <div class="fact"><small>${t('zFacts').range}</small><b>${z.range[i]}</b></div>
      <div class="fact"><small>${t('zFacts').el}</small><b>${lang === 'en' ? z.elEn : ZODIAC_EL_ZH[z.el]}</b></div>
      <div class="fact"><small>${t('zFacts').ruler}</small><b style="font-size:15px">${z.kw[i]}</b></div>
    </div>
    <p class="note">${t('zNote')}</p></div>${recList(z.rec)}`;
}

function paneSx(c) {
  const b = c.p[0][1];                          // year branch (立春-based)
  const ani = lang === 'en' ? `${ANI_EN[b]} ${ANI_ZH[b]}` : ANI_ZH[b];
  const rel = TAISUI_2026[b] || 'none';
  const kind = rel === 'none' ? 'none' : (rel === 'sanhe' || rel === 'liuhe') ? 'good' : 'bad';
  const group = SANHE.find(g => g.includes(b)).filter(x => x !== b);
  const aname = x => lang === 'en' ? ANI_EN[x] : ANI_ZH[x];
  const el = kind === 'bad' ? '火' : kind === 'good' ? '木' : BR_EL[b];
  const recs = kind === 'bad' ? ['B09','B08','D05'] : kind === 'good' ? ['B05','B07','D03'] : PRODUCTS.filter(p => p.el === pickEl).map(p => p.id).slice(0, 3);
  return `<div class="el-${el}" style="display:flex;flex-direction:column;gap:18px">
    <p class="lead">${t('sxLead')(profile.name, ani)}</p>
    <p class="sub">${t('sxYear')}</p>
    <div class="facts">
      <div class="fact"><small>${t('sxFacts').rel}</small><b class="${kind === 'bad' ? 'warn' : kind === 'good' ? 'good' : ''}">${t('sxRel')[rel]}</b></div>
      <div class="fact"><small>${t('sxFacts').ally}</small><b>${group.map(aname).join(t('sep'))}</b></div>
      <div class="fact"><small>${t('sxFacts').pair}</small><b>${aname(LIUHE[b])}</b></div>
    </div>
    <p style="margin:0">${t('sxAdvice')[kind]}</p></div>${recList(recs)}`;
}

function drawTarot() {
  const idx = [...TAROT.keys()];
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  tarotDraw = idx.slice(0, 3).map(i => ({ i, rev: Math.random() < 0.3 }));
}
function paneTarot() {
  if (!tarotDraw) drawTarot();
  const q = ($('tq') && $('tq').value.trim()) || '';
  const k = lang === 'en' ? 1 : 0;
  const cards = tarotDraw.map((d, pos) => {
    const c = TAROT[d.i];
    return `<div class="tcard"><span class="pos">${t('tPos')[pos]}</span>
      <div class="face${d.rev ? ' rev' : ''}"><img src="img/tarot/${pad(d.i)}.jpg" alt="${c.n} ${lang === 'en' ? c.en : c.zh}" width="360" height="600" loading="lazy"></div>
      <b class="tname">${c.n} · ${lang === 'en' ? c.en : c.zh}</b>
      <span class="ori">${d.rev ? t('rev') : t('up')}</span>
      <p>${(d.rev ? c.rv : c.up)[k]}</p></div>`;
  }).join('');
  return `<form class="tq" id="tqForm"><label for="tq">${t('tQ')}<input id="tq" type="text" value="${q.replace(/"/g, '&quot;')}" placeholder="${t('tQPh')}"></label><button class="btn" type="submit">${t('tDraw')}</button></form>
    <p class="note">${t('tHint')}</p>
    ${q ? `<p class="sub" style="margin:0">${t('tSum')(q.replace(/</g, '&lt;'))}</p>` : ''}
    <div class="spread">${cards}</div>${recList(tarotDraw.map(d => TAROT[d.i].rec))}`;
}

function paneToday(c) {
  const now = new Date(), y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
  const tp = bazi(y, m, d, null)[2];
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
  const dateStr = lang === 'en' ? now.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) : `${y}年${m}月${d}日`;
  const dayP = lang === 'en' ? `${ST[tp[0]]}${BR[tp[1]]} (${EL_EN[tEl]})` : `${ST[tp[0]]}${BR[tp[1]]}（${tEl}）`;
  const rows = t('todayRows').map((lab, i) => `<div class="star-row"><span>${lab}</span><div class="pips" aria-label="${scores[i]}/5">${[1,2,3,4,5].map(n => `<i class="pip${n <= scores[i] ? ' on' : ''}"></i>`).join('')}</div></div>`).join('');
  return `<div class="el-${luckyEl}" style="display:flex;flex-direction:column;gap:18px">
    <p class="lead">${t('todayLead')(dateStr)}<span class="sub" style="display:block;font-family:var(--body);font-size:14px">${t('todayDay')(dayP)}</span></p>
    <p style="margin:0">${t('todayRel')[rel]}</p>
    <div class="stars">${rows}</div>
    <div class="facts">
      <div class="fact"><small>${t('todayFacts').color}</small><b>${inf.color}</b></div>
      <div class="fact"><small>${t('todayFacts').num}</small><b style="font-family:var(--mono)">${num}</b></div>
      <div class="fact"><small>${t('todayFacts').dir}</small><b>${inf.dir}</b></div>
    </div>
    <p class="note">${t('todayNote')}</p></div>${recList([pick.id])}`;
}

function renderPane() {
  const c = chartData();
  pickEl = c.weak[0];
  const pane = $('pane');
  pane.className = 'tabpane el-' + pickEl;
  pane.setAttribute('aria-labelledby', 'tab-' + tab);
  pane.innerHTML = tab === 'bazi' ? paneBazi(c) : tab === 'zodiac' ? paneZodiac() : tab === 'sx' ? paneSx(c) : tab === 'tarot' ? paneTarot() : paneToday(c);
  wireOpen(pane);
  const sp = $('seePicks'); if (sp) sp.onclick = () => { setEl(pickEl); $('shop').scrollIntoView({ behavior: 'smooth' }); };
  const pl = $('seePlace'); if (pl) pl.onclick = () => { showCell(CELLS.find(x => x.el === pickEl)); $('place').scrollIntoView({ behavior: 'smooth' }); };
  const tf = $('tqForm'); if (tf) tf.onsubmit = e => { e.preventDefault(); const q = $('tq').value; drawTarot(); renderPane(); $('tq').value = q; };
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

/* ---------- 九宮 + flying stars ---------- */
function renderLuoshu() {
  $('luoshu').innerHTML = CELLS.map((c, i) => `<button class="cell el-${c.el}${c.el === pickEl ? ' hint' : ''}" data-i="${i}" aria-pressed="${c === curCell}"><b>${c[lang].dir}</b><small>${t('cellLabel')(c.el)}</small><span class="fs">${lang === 'en' ? STARS[c.fs].en : STARS[c.fs].zh}</span></button>`).join('');
  document.querySelectorAll('.cell').forEach(b => b.onclick = () => showCell(CELLS[+b.dataset.i]));
}
function showCell(c) {
  curCell = c;
  const inf = info(c.el), pd = t('pdl'), s = STARS[c.fs];
  const el = $('placeInfo'); el.className = 'place-info el-' + c.el;
  const items = PRODUCTS.filter(p => p.type === '擺件' && p.el === c.el);
  el.innerHTML = `<h3>${t('cellTitle')(c[lang].dir, c.el)}</h3><p style="margin:0">${c[lang].tip}</p>
  <dl><dt>${pd.color}</dt><dd>${inf.color}</dd><dt>${pd.meaning}</dt><dd>${inf.meaning}</dd>
  <dt>${pd.items}</dt><dd>${items.length ? items.map(p => `<a href="#" data-open="${p.id}">${L(p).name}</a>`).join(t('sep')) : t('none')}</dd>
  <dt>${pd.star}</dt><dd><span class="star-badge">${lang === 'en' ? s.en : s.zh}</span><span class="${s.good ? 'good' : 'warn'}">${lang === 'en' ? s.men : s.mzh}</span></dd>
  <dt>${pd.cure}</dt><dd>${lang === 'en' ? s.cen : s.czh} <a href="#" data-open="${s.rec}">${L(byId(s.rec)).name}</a></dd></dl>
  ${c.el === pickEl ? `<p class="fine" style="color:var(--c)">${t('cellFit')}</p>` : ''}`;
  wireOpen(el);
  renderLuoshu();
}

/* ---------- boot ---------- */
function refresh() { profile = readProfile() || profile; renderPane(); renderGrid(); showCell(curCell); }
$('birthForm').addEventListener('submit', e => { e.preventDefault(); refresh(); });
document.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => {
  lang = b.dataset.lang; try { localStorage.setItem('wx-lang', lang); } catch (e) {}
  applyStatic(); refresh(); if (openId) openPassport(openId);
});
$('bhour').innerHTML = '<option value="9"></option>';
applyStatic();
profile = readProfile();
drawTarot();
renderPane();
curCell = CELLS.find(c => c.el === pickEl) || CELLS[4];
renderGrid(); showCell(curCell);
