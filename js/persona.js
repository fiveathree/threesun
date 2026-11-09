/* 16型性格、九型人格、能量類型（人類圖概念）. Questions, type names and texts are written for this site. */
const T7 = {
  zh: {
    tabs: { mbti: '16型性格', ennea: '九型人格', hd: '能量類型' },
    q16Lead: c => `你係<span class="big">${c}</span>`,
    q16Todo: n => `仲有 ${n} 題未答，答晒就有結果。`,
    q16Info: '16型性格用四組傾向：外向 E／內向 I、實感 S／直覺 N、思考 T／情感 F、判斷 J／感知 P。四個字母分類源自榮格嘅心理類型理論。呢度係本站自己寫嘅 12 題簡易版，唔係官方 MBTI® 測驗，只作娛樂參考。',
    q16Axis: { E: '外向', I: '內向', S: '實感', N: '直覺', T: '思考', F: '情感', J: '判斷', P: '感知' },
    q16Reset: '重新做',
    enLead: (n, w) => `你係第 ${n} 型<span class="big">${w}</span>`,
    enTodo: '撳「似我」揀出符合你嘅句子，揀得越多越準。',
    enLike: '似我',
    enInfo: '九型人格（Enneagram）將人分做九種核心動機。呢度每型有兩句描述，你揀「似我」最多嘅就係主型，旁邊兩型之中分數較高嘅係「翼型」。題目同解說係本站原創簡易版，只作娛樂參考。',
    enFacts: { wing: '翼型', fear: '核心恐懼', grow: '成長方向' },
    hdLead: (n, s) => `${n ? n + '係' : '你係'}<span class="big">${s}</span>`,
    hdFacts: { strategy: '策略', authority: '內在權威', profile: '人生角色', def: '定義' },
    hdInfo: '概念來自人類圖（Human Design）系統：用出生時間（個性）同出生前太陽倒退 88° 嗰刻（設計）兩組行星位置，對應 64 個閘門；兩端閘門都有就連成通道，令中心「有定義」。類型由薦骨同喉嚨有冇接通決定。呢度係本站簡化計算同自行撰寫嘅解說，非官方，需要出生時間先準，只作娛樂參考。',
    hdCenters: { head: '頭頂', ajna: '邏輯', throat: '喉嚨', g: '自我', heart: '意志', spleen: '直覺', sacral: '薦骨', sp: '情緒', root: '根部' },
    hdDef: ['冇定義', '一分人', '二分人', '三分人', '四分人'],
    hdNoTime: '你冇填出生時間，以下用中午 12 點計，月亮同上升位置可能唔準。'
  },
  en: {
    tabs: { mbti: '16 types', ennea: 'Enneagram', hd: 'Energy type' },
    q16Lead: c => `You are<span class="big">${c}</span>`,
    q16Todo: n => `${n} question${n > 1 ? 's' : ''} left; answer them all to see your type.`,
    q16Info: 'The 16 types use four preferences: Extraversion E / Introversion I, Sensing S / Intuition N, Thinking T / Feeling F, Judging J / Perceiving P. The four-letter scheme comes from Jung’s psychological types. This is a 12-question version written for this site, not the official MBTI® assessment, and is for fun only.',
    q16Axis: { E: 'Extraverted', I: 'Introverted', S: 'Sensing', N: 'Intuitive', T: 'Thinking', F: 'Feeling', J: 'Judging', P: 'Perceiving' },
    q16Reset: 'Start again',
    enLead: (n, w) => `You are type ${n}<span class="big">${w}</span>`,
    enTodo: 'Tap “Like me” on each statement that fits you; the more you pick, the clearer the result.',
    enLike: 'Like me',
    enInfo: 'The Enneagram describes nine core motivations. Each type has two statements here; the type with the most “Like me” picks is your main type, and the higher-scoring neighbour is your wing. Statements and texts are a simple version written for this site, for fun only.',
    enFacts: { wing: 'Wing', fear: 'Core fear', grow: 'Growth' },
    hdLead: (n, s) => `${n ? n + ' is' : 'You are'} a<span class="big">${s}</span>`,
    hdFacts: { strategy: 'Strategy', authority: 'Inner authority', profile: 'Profile', def: 'Definition' },
    hdInfo: 'Based on the Human Design system: planet positions at birth (personality) and when the Sun was 88° earlier (design) map to 64 gates; when both ends of a channel are active the channel joins two centres and defines them. The type depends on whether the sacral centre and throat are connected. This is a simplified calculation with texts written for this site, not official, needs a birth time to be accurate, and is for fun only.',
    hdCenters: { head: 'Head', ajna: 'Ajna', throat: 'Throat', g: 'G', heart: 'Heart', spleen: 'Spleen', sacral: 'Sacral', sp: 'Solar plexus', root: 'Root' },
    hdDef: ['None', 'Single', 'Split', 'Triple split', 'Quadruple split'],
    hdNoTime: 'No birth time was entered, so noon is used; the Moon and some gates may be off.'
  }
};
['zh','en'].forEach(k => { Object.assign(T2[k].tabs, T7[k].tabs); const c = Object.assign({}, T7[k]); delete c.tabs; Object.assign(T2[k], c); });

const loadJSON = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v || d; } catch (e) { return d; } };
const saveJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

/* ---------- 16型性格 ---------- */
const Q16 = [   // [axis letters, zh question, zh A, zh B, en question, en A, en B]
 ['EI', '放假你會', '約朋友出去玩', '留喺屋企充電', 'On a day off you', 'go out with friends', 'stay in and recharge'],
 ['EI', '去到新場合', '主動同人傾', '等人嚟搭話', 'At a new gathering you', 'start conversations', 'wait to be approached'],
 ['EI', '諗嘢嗰陣', '講出嚟先諗得清', '自己諗好先講', 'When thinking things through you', 'talk it out', 'think first, then speak'],
 ['SN', '你比較信', '實際經驗', '直覺同靈感', 'You trust more', 'hands-on experience', 'hunches and inspiration'],
 ['SN', '睇說明書', '一步步跟住做', '睇大概就自己摸', 'With instructions you', 'follow them step by step', 'skim and figure it out'],
 ['SN', '傾偈鍾意講', '具體發生咗咩', '將來嘅可能性', 'You like to talk about', 'what actually happened', 'what could be'],
 ['TF', '做決定靠', '邏輯分析', '大家嘅感受', 'You decide by', 'logic', 'how people feel'],
 ['TF', '朋友有難題', '幫佢分析點解決', '先聽佢講、陪住佢', 'When a friend has a problem you', 'help solve it', 'listen and stay with them'],
 ['TF', '你覺得更重要', '公平', '和諧', 'What matters more', 'fairness', 'harmony'],
 ['JP', '去旅行', '早早計劃好行程', '去到先算', 'On a trip you', 'plan the itinerary early', 'decide as you go'],
 ['JP', '有死線', '提早做完', '最後衝刺', 'With a deadline you', 'finish early', 'sprint at the end'],
 ['JP', '你張枱', '整齊有序', '亂中有序', 'Your desk is', 'neat and ordered', 'organised chaos']
];
const TYPE16 = {
 ISTJ: ['可靠執行者', '守規矩、重承諾，做嘢一絲不苟。', 'The Reliable Executor', 'Rule-keeping and true to their word, thorough in everything.'],
 ISFJ: ['默默守護者', '細心體貼，默默照顧身邊人。', 'The Quiet Protector', 'Thoughtful and attentive, quietly caring for those around them.'],
 INFJ: ['理想引路人', '有洞察力同理想，想令世界更好。', 'The Idealistic Guide', 'Insightful and idealistic, wanting to make the world better.'],
 INTJ: ['遠見策劃師', '獨立有遠見，鍾意長遠計劃。', 'The Visionary Planner', 'Independent and far-sighted, fond of long-range plans.'],
 ISTP: ['冷靜工匠', '動手能力強，臨危不亂。', 'The Cool Craftsperson', 'Good with their hands and calm under pressure.'],
 ISFP: ['溫柔藝術家', '感受力強，用作品表達自己。', 'The Gentle Artist', 'Sensitive, expressing themself through what they make.'],
 INFP: ['浪漫理想家', '重視內心價值，富同理心。', 'The Romantic Idealist', 'Guided by inner values and full of empathy.'],
 INTP: ['好奇思想家', '鍾意研究原理，邏輯清晰。', 'The Curious Thinker', 'Loves to understand how things work; clear logic.'],
 ESTP: ['行動派玩家', '反應快，享受刺激同挑戰。', 'The Action Taker', 'Quick to react and thrives on excitement.'],
 ESFP: ['開心表演者', '熱情活潑，帶動氣氛一流。', 'The Joyful Performer', 'Warm and lively, great at lifting the mood.'],
 ENFP: ['熱情發起人', '點子多、感染力強。', 'The Enthusiastic Spark', 'Full of ideas and infectious energy.'],
 ENTP: ['機智辯論家', '腦筋快，鍾意挑戰舊有想法。', 'The Witty Challenger', 'Quick-minded, loves to question old ideas.'],
 ESTJ: ['高效管理者', '有組織力，講求效率同秩序。', 'The Efficient Manager', 'Organised, valuing efficiency and order.'],
 ESFJ: ['熱心照顧者', '重視人情，識照顧大家需要。', 'The Warm Host', 'People-focused and good at meeting everyone’s needs.'],
 ENFJ: ['魅力導師', '識鼓勵人，天生嘅帶領者。', 'The Inspiring Mentor', 'Encouraging and a natural leader of people.'],
 ENTJ: ['果斷指揮官', '目標明確，擅長帶領團隊。', 'The Decisive Commander', 'Clear goals and skilled at leading teams.']
};
let ans16 = loadJSON('wx-16', Array(12).fill(null));
function paneMbti() {
  const k = isEn() ? 4 : 1, left = ans16.filter(a => a == null).length;
  const qs = Q16.map((q, i) => `<div class="q-row"><span>${i + 1}. ${q[k]}</span><div class="filters">${[0, 1].map(o => `<button type="button" class="chip" data-q16="${i}:${o}" aria-pressed="${ans16[i] === o}">${q[k + 1 + o]}</button>`).join('')}</div></div>`).join('');
  let res = `<p class="sub" style="margin:0">${t('q16Todo')(left)}${infoTip(t('whatIs'), t('q16Info'))}</p>`, rEl = pickEl;
  if (!left) {
    const code = ['EI', 'SN', 'TF', 'JP'].map((ax, a) => { const n = ans16.slice(a * 3, a * 3 + 3).filter(x => x === 0).length; return n >= 2 ? ax[0] : ax[1]; }).join('');
    const D = TYPE16[code], el = code[1] === 'S' ? (code[3] === 'J' ? '土' : '火') : (code[2] === 'F' ? '木' : '金');
    res = block(el, `<p class="lead">${t('q16Lead')(`${code} ${isEn() ? D[2] : D[0]}`)}${infoTip(t('whatIs'), t('q16Info'))}</p><p style="margin:0">${isEn() ? D[3] : D[1]}</p>
      <div class="facts">${[...code].map(c => fact(c, t('q16Axis')[c])).join('')}</div>
      <p style="margin:0"><button type="button" class="chip" id="q16Reset">${t('q16Reset')}</button></p>`);
    rEl = el;
  }
  return res + `<div class="q-list">${qs}</div>` + crystalsFor(rEl);
}

/* ---------- 九型人格 ---------- */
const ENNEA = [null,
 { el: '金', zh: ['完美型', '我好睇重做啱做好，見到錯會好想改。', '我對自己要求好高。', '有原則、負責任，追求做得更好。', '做錯、唔夠好', '學識接受「夠好」就得'], en: ['The Perfectionist', 'I care about doing things right and want to fix mistakes.', 'I hold myself to very high standards.', 'Principled and responsible, always improving.', 'Being wrong or not good enough', 'Accept that “good enough” is fine'] },
 { el: '火', zh: ['助人型', '我好自然會留意別人需要，主動幫手。', '被人需要會令我好開心。', '溫暖慷慨，樂於付出。', '唔被愛、唔被需要', '照顧別人之前先照顧自己'], en: ['The Helper', 'I naturally notice what others need and step in.', 'Being needed makes me happy.', 'Warm and generous, glad to give.', 'Being unloved or unneeded', 'Care for yourself before others'] },
 { el: '火', zh: ['成就型', '我好著重成績同目標。', '我好在意別人點睇我嘅表現。', '積極進取，有效率，形象好。', '失敗、冇價值', '成就之外，都欣賞真實嘅自己'], en: ['The Achiever', 'Results and goals matter a lot to me.', 'I care how others see my performance.', 'Driven, efficient and polished.', 'Failure and worthlessness', 'Value who you are, not only what you achieve'] },
 { el: '水', zh: ['自我型', '我覺得自己同人唔同，感受特別深。', '我鍾意有個人風格、獨特嘅嘢。', '有創意、重感受，追求真實自我。', '冇身份、平凡', '欣賞日常生活入面嘅美好'], en: ['The Individualist', 'I feel different from others and feel things deeply.', 'I love personal style and unique things.', 'Creative and emotionally honest.', 'Having no identity; being ordinary', 'Find beauty in everyday life'] },
 { el: '水', zh: ['理智型', '我鍾意先觀察、搞清楚先行動。', '我需要好多獨處時間思考。', '冷靜好學，有洞察力。', '無能、被掏空', '將知識行動出嚟，同人分享'], en: ['The Observer', 'I like to watch and understand before acting.', 'I need lots of time alone to think.', 'Calm, curious and insightful.', 'Being helpless or depleted', 'Put knowledge into action and share it'] },
 { el: '土', zh: ['忠誠型', '我做事前會諗定最壞情況。', '我好重視可信賴嘅人同團體。', '忠心可靠，有危機意識。', '冇支持、冇安全感', '相信自己嘅判斷'], en: ['The Loyalist', 'I plan for the worst before acting.', 'I value people and groups I can trust.', 'Loyal, dependable and alert to risk.', 'Being without support or safety', 'Trust your own judgement'] },
 { el: '木', zh: ['活躍型', '我鍾意新鮮好玩、計劃多多。', '我唔鍾意被沉悶或者痛苦困住。', '樂觀好動，充滿可能性。', '被困住、痛苦', '專注一樣嘢，深入享受'], en: ['The Enthusiast', 'I love fun, novelty and lots of plans.', 'I hate being stuck in boredom or pain.', 'Optimistic, busy and full of possibilities.', 'Being trapped or in pain', 'Focus on one thing and savour it'] },
 { el: '火', zh: ['領袖型', '我講嘢直接，唔怕衝突。', '我想掌握主導權，保護自己人。', '有魄力、保護弱小，敢擔當。', '被控制、受傷害', '容許自己展示柔軟一面'], en: ['The Challenger', 'I speak directly and don’t fear conflict.', 'I want control and to protect my people.', 'Forceful, protective and willing to take charge.', 'Being controlled or hurt', 'Let yourself show a softer side'] },
 { el: '土', zh: ['和平型', '我好怕同人起衝突，寧願遷就。', '我隨和，好易適應環境。', '包容平和，識調解。', '衝突、分離', '講出自己真正想要嘅嘢'], en: ['The Peacemaker', 'I avoid conflict and would rather go along.', 'I am easy-going and adapt easily.', 'Accepting, calm and a natural mediator.', 'Conflict and separation', 'Say what you really want'] }
];
let enPick = loadJSON('wx-ennea', []);
function paneEnnea() {
  const k = isEn() ? 'en' : 'zh', st = [];
  for (let n = 1; n <= 9; n++) [1, 2].forEach(j => st.push([n, j]));
  const order = st.map((x, i) => st[(i * 7) % 18]);    // mix types so they don't sit in blocks
  const list = order.map(([n, j]) => { const id = `${n}-${j}`; return `<div class="q-row"><span>${ENNEA[n][k][j]}</span><button type="button" class="chip" data-en="${id}" aria-pressed="${enPick.includes(id)}">${t('enLike')}</button></div>`; }).join('');
  const sc = n => enPick.filter(id => id.startsWith(n + '-')).length;
  let res = `<p class="sub" style="margin:0">${t('enTodo')}${infoTip(t('whatIs'), t('enInfo'))}</p>`, rEl = pickEl;
  if (enPick.length) {
    let best = 1; for (let n = 2; n <= 9; n++) if (sc(n) > sc(best)) best = n;
    const a = best === 1 ? 9 : best - 1, b = best === 9 ? 1 : best + 1, wing = sc(b) > sc(a) ? b : a, E = ENNEA[best][k];
    res = block(ENNEA[best].el, `<p class="lead">${t('enLead')(best, E[0])}${infoTip(t('whatIs'), t('enInfo'))}</p><p style="margin:0">${E[3]}</p>
      <div class="facts">${fact(t('enFacts').wing, `${best}w${wing} · ${ENNEA[wing][k][0]}`)}${fact(t('enFacts').fear, E[4])}${fact(t('enFacts').grow, E[5])}</div>`);
    rEl = ENNEA[best].el;
  }
  return res + `<div class="q-list">${list}</div>` + crystalsFor(rEl);
}

/* ---------- 能量類型（人類圖概念，簡化） ---------- */
const HD_WHEEL = [41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60];  // gate 41 starts at 302°
const HD_CENTER = { head: [64,61,63], ajna: [47,24,4,17,43,11], throat: [62,23,56,35,12,45,33,8,31,20,16], g: [1,13,25,46,2,15,10,7], heart: [21,40,26,51],
  spleen: [48,57,44,50,32,28,18], sp: [36,22,37,6,49,55,30], sacral: [5,14,29,59,9,3,42,27,34], root: [53,60,52,19,39,41,58,38,54] };
const HD_CH = [[1,8],[2,14],[3,60],[4,63],[5,15],[6,59],[7,31],[9,52],[10,20],[10,34],[10,57],[11,56],[12,22],[13,33],[16,48],[17,62],[18,58],[19,49],[20,34],[20,57],[21,45],[23,43],[24,61],[25,51],[26,44],[27,50],[28,38],[29,46],[30,41],[32,54],[34,57],[35,36],[37,40],[39,55],[42,53],[47,64]];
const HD_TYPE = {
 gen: { el: '火', zh: ['生產者', '回應', '有持久嘅生命力，做自己熱愛嘅嘢就充滿動力。等生活帶嚟機會，再用身體感覺去回應。'], en: ['Generator', 'Respond', 'Sustained life energy; doing what you love keeps you going. Wait for life to bring options, then respond with your gut.'] },
 mg: { el: '火', zh: ['顯示生產者', '回應後告知', '快速又多才多藝，可以同時處理好多樣嘢。先回應，行動前講聲畀身邊人知。'], en: ['Manifesting Generator', 'Respond, then inform', 'Fast and multi-skilled, able to juggle many things. Respond first, and tell people before you act.'] },
 man: { el: '金', zh: ['顯示者', '告知', '天生嘅發起人，有能力開創新局面。行動前先通知身邊人，阻力會少好多。'], en: ['Manifestor', 'Inform', 'A natural initiator who can start new things. Let people know before acting and resistance drops.'] },
 proj: { el: '水', zh: ['投射者', '等待邀請', '擅長睇透人同系統，適合做引導者。等被認可同邀請先出手，效果最好。'], en: ['Projector', 'Wait for the invitation', 'Sees deeply into people and systems; a natural guide. Wait to be recognised and invited.'] },
 refl: { el: '木', zh: ['反映者', '等待一個月亮週期', '好似一面鏡，反映環境同身邊人嘅狀態。重大決定等 28 日，感受清楚先決定。'], en: ['Reflector', 'Wait a lunar cycle', 'Like a mirror reflecting your surroundings. Give big decisions about 28 days.'] }
};
const HD_AUTH = { sp: ['情緒權威', 'Emotional'], sacral: ['薦骨權威', 'Sacral'], spleen: ['直覺權威', 'Splenic'], heart: ['意志力權威', 'Ego'], g: ['自我投射權威', 'Self-projected'], none: ['環境權威', 'Environmental'], lunar: ['月亮權威', 'Lunar'] };
const HD_POS = { head: [100, 22], ajna: [100, 66], throat: [100, 112], g: [100, 160], heart: [142, 172], spleen: [44, 214], sacral: [100, 220], sp: [156, 214], root: [100, 270] };
function hdGates(at) {
  const A = Astronomy, out = [];
  ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'].forEach(b => out.push(A.Ecliptic(A.GeoVector(b, at, true)).elon));
  const T = at.tt / 36525, node = mod(125.04452 - 1934.136261 * T, 360);
  out.push(mod(out[0] + 180, 360), node, mod(node + 180, 360));
  return out.map(lon => { const o = mod(lon - 302, 360), i = Math.floor(o / 5.625); return [HD_WHEEL[i], Math.floor((o % 5.625) / 0.9375) + 1]; });
}
function paneHd() {
  if (!HAS_ASTRO) return `<p class="note">—</p>`;
  const A = Astronomy, pl = profile.place, hasTime = profile.hh != null;
  const utc = new Date(Date.UTC(profile.y, profile.m - 1, profile.d, hasTime ? profile.hh : 12, hasTime ? profile.mm : 0) - pl.tz * 3600e3), at = A.MakeTime(utc);
  const sun = A.Ecliptic(A.GeoVector('Sun', at, true)).elon;
  const dAt = A.SearchSunLongitude(mod(sun - 88, 360), A.MakeTime(new Date(utc.getTime() - 100 * 864e5)), 40);
  const pers = hdGates(at), des = hdGates(dAt), on = new Set([...pers, ...des].map(g => g[0]));
  const centerOf = g => Object.keys(HD_CENTER).find(c => HD_CENTER[c].includes(g));
  const chans = HD_CH.filter(([a, b]) => on.has(a) && on.has(b)), defd = new Set(), adj = {};
  chans.forEach(([a, b]) => { const x = centerOf(a), y = centerOf(b); defd.add(x); defd.add(y); (adj[x] = adj[x] || new Set()).add(y); (adj[y] = adj[y] || new Set()).add(x); });
  const reach = (from, to) => { const seen = new Set([from]), q = [from]; while (q.length) { const c = q.shift(); if (c === to) return true; (adj[c] || []).forEach(n => { if (!seen.has(n)) { seen.add(n); q.push(n); } }); } return false; };
  const motorToThroat = ['heart', 'sp', 'root', 'sacral'].some(m => defd.has(m) && reach(m, 'throat'));
  const type = !defd.size ? 'refl' : defd.has('sacral') ? (['heart', 'sp', 'root', 'sacral'].some(m => defd.has(m) && reach(m, 'throat')) ? 'mg' : 'gen') : (motorToThroat ? 'man' : 'proj');
  const auth = type === 'refl' ? 'lunar' : ['sp', 'sacral', 'spleen', 'heart'].find(c => defd.has(c)) || (defd.has('g') && reach('g', 'throat') ? 'g' : 'none');
  let parts = 0; const seen = new Set();
  defd.forEach(c => { if (seen.has(c)) return; parts++; const q = [c]; seen.add(c); while (q.length) (adj[q.shift()] || []).forEach(n => { if (!seen.has(n)) { seen.add(n); q.push(n); } }); });
  const H = HD_TYPE[type], k = isEn() ? 1 : 0, Hx = isEn() ? H.en : H.zh;
  const lines = chans.map(([a, b]) => { const p = HD_POS[centerOf(a)], q = HD_POS[centerOf(b)]; return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`; }).join('');
  const nodes = Object.keys(HD_POS).map(c => `<g class="${defd.has(c) ? 'on' : ''}"><rect x="${HD_POS[c][0] - 22}" y="${HD_POS[c][1] - 13}" width="44" height="26" rx="6"/><text x="${HD_POS[c][0]}" y="${HD_POS[c][1] + 4}">${t('hdCenters')[c]}</text></g>`).join('');
  const svg = `<svg class="hd-svg" viewBox="0 0 200 292" role="img" aria-label="${[...defd].map(c => t('hdCenters')[c]).join(', ')}"><g class="hd-lines">${lines}</g>${nodes}</svg>`;
  return (hasTime ? '' : `<p class="note">${t('hdNoTime')}</p>`) +
    block(H.el, `<p class="lead">${t('hdLead')(profile.name, Hx[0])}${infoTip(t('whatIs'), t('hdInfo'))}</p><p style="margin:0">${Hx[2]}</p>
    <div class="lr-wrap">${svg}<div class="facts" style="flex:1;min-width:200px">${fact(t('hdFacts').strategy, Hx[1])}${fact(t('hdFacts').authority, HD_AUTH[auth][k])}${fact(t('hdFacts').profile, `${pers[0][1]}/${des[0][1]}`)}${fact(t('hdFacts').def, t('hdDef')[Math.min(parts, 4)])}</div></div>`) + crystalsFor(H.el);
}

Object.assign(ORACLE_PANES, { mbti: paneMbti, ennea: paneEnnea, hd: paneHd });
Object.assign(ORACLE_WIRE, {
  mbti: pane => {
    pane.querySelectorAll('[data-q16]').forEach(b => b.onclick = () => { const [i, o] = b.dataset.q16.split(':').map(Number); ans16[i] = o; saveJSON('wx-16', ans16); renderPane(); });
    const r = pane.querySelector('#q16Reset'); if (r) r.onclick = () => { ans16 = Array(12).fill(null); saveJSON('wx-16', ans16); renderPane(); };
  },
  ennea: pane => pane.querySelectorAll('[data-en]').forEach(b => b.onclick = () => {
    const id = b.dataset.en; enPick = enPick.includes(id) ? enPick.filter(x => x !== id) : [...enPick, id]; saveJSON('wx-ennea', enPick); renderPane();
  })
});
