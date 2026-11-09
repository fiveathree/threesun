/* Headless smoke test: renders every reading in both languages with a stub DOM.
   Run from the repo root:  node tests/smoke.js
   Animations and canvas drawing are NOT exercised; check those in a real browser. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const R = path.join(__dirname, '..', 'js') + '/';
const vals = { bdate: '1986-03-15', btime: '10:00', bgender: 'f', bplace: 'khh', bname: '' };
const els = {};
const mk = id => ({ id, innerHTML: '', value: vals[id] ?? '', checked: false, disabled: false, hidden: true, className: '', textContent: '', placeholder: '',
  setAttribute() {}, querySelectorAll: () => [], querySelector: sel => sel === '#shell' ? null : mk(sel), addEventListener() {}, focus() {}, scrollIntoView() {} });
const doc = { documentElement: {}, title: '', getElementById: id => els[id] || (els[id] = mk(id)), querySelectorAll: () => [], addEventListener() {} };
const ctx = { document: doc, location: { hash: '' }, localStorage: { getItem: () => null, setItem() {} }, navigator: {}, console, setTimeout };
ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
for (const f of ['vendor/lunar.js', 'vendor/astronomy.min.js', 'strokes.js', 'data.js', 'data2.js', 'oracles.js', 'blood.js', 'more.js', 'shushu.js', 'persona.js'])
  vm.runInContext(fs.readFileSync(R + f, 'utf8'), ctx, { filename: f });
vm.runInContext(fs.readFileSync(R + 'app.js', 'utf8') + '\n;this.__={renderPane,setTab:v=>tab=v,setLang:v=>lang=v,applyStatic,setProfile:v=>profile=v,getProfile:()=>profile,GROUPS,HAS_LUNAR,HAS_ASTRO};', ctx, { filename: 'app.js' });
const api = ctx.__, strip = s => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
let fails = 0;
console.log('libraries loaded: lunar', api.HAS_LUNAR, '· astronomy', api.HAS_ASTRO);
const tabs = Object.values(api.GROUPS).flat();
for (const L of ['zh', 'en']) {
  api.setLang(L); api.applyStatic();
  for (const tb of tabs) {
    api.setTab(tb); api.renderPane();
    const h = els.pane.innerHTML, bad = !h || h.includes('class="warn"');
    if (bad) fails++;
    if (h.includes('class="recs"') && !h.includes('recs-why')) { fails++; console.log('FAIL', L, tb, 'crystals not using the shared rule'); }
    console.log(bad ? 'FAIL' : ' ok ', L, tb.padEnd(8), '|', strip(h).slice(0, 110));
  }
}
api.setLang('zh'); api.setProfile({ ...api.getProfile(), hh: null, mm: null });
for (const tb of ['ziwei', 'astro', 'bazi']) { api.setTab(tb); api.renderPane(); console.log(' ok  no-time', tb.padEnd(6), '|', strip(els.pane.innerHTML).slice(0, 80)); }
// Date-driven readings across 400 consecutive days and 12 hours, in both languages (catches table gaps such as a missing mansion).
const base = Date.UTC(1990, 0, 1), dated = ['bazi', 'overview', 'ziwei', 'life', 'nine', 'stone', 'astro', 'sx', 'xiu', 'qizheng', 'vedic', 'maya', 'blood', 'hd', 'match', 'qimen', 'liuren', 'xlr', 'kua', 'today'];
let dfails = 0;
for (let i = 0; i < 400; i++) {
  const dt = new Date(base + i * 864e5), hh = (i * 2) % 24;
  api.setProfile({ ...api.getProfile(), y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), hh, mm: 30, gender: i % 2 ? 'm' : 'f' });
  for (const L of ['zh', 'en']) {
    api.setLang(L);
    for (const tb of dated) {
      api.setTab(tb); api.renderPane();
      const h = els.pane.innerHTML;
      if (!h || h.includes('<p class="warn">') || /undefined|NaN/.test(strip(h))) { if (dfails++ < 10) console.log('FAIL', L, tb, dt.toISOString().slice(0, 10), hh, '|', strip(h).slice(0, 100)); }
    }
  }
}
console.log(dfails ? `FAIL ${dfails} dated reading(s)` : ' ok  400 dates × 12 hours × ' + dated.length + ' tabs × 2 languages');
fails += dfails;
console.log(fails ? `\n${fails} reading(s) failed` : '\nAll readings rendered.');
process.exit(fails ? 1 : 0);
