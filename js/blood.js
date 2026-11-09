/* 星座 × 血型 48 型人格. Type names and texts are written for this site.
   BLOOD48[ZODIAC index][blood index]; blood order = BLOOD_TYPES. */
const BLOOD_TYPES = ['A', 'B', 'O', 'AB'];
const BLOOD_INFO = {
  A: { zh: '細心、守規矩、顧及別人', en: 'Careful, orderly, considerate', rec: 'B08' },
  B: { zh: '隨性、有創意、我行我素', en: 'Easy-going, creative, independent', rec: 'D01' },
  O: { zh: '外向、有魄力、重目標', en: 'Outgoing, forceful, goal-driven', rec: 'B07' },
  AB: { zh: '理性、冷靜、有兩面', en: 'Rational, calm, two-sided', rec: 'B10' }
};
const BLOOD48 = [
 [ // 水瓶
  ['冷靜改革家','腦入面好多新點子，但會先諗清楚規則先郁手；對朋友講義氣，只係唔鍾意被人管。','The Calm Reformer','Full of new ideas but thinks the rules through before acting. Loyal to friends, but dislikes being managed.'],
  ['自由發明家','想到就做，興趣多到數唔晒；最怕悶同重複，需要好多個人空間。','The Free Inventor','Acts on ideas at once and has more hobbies than you can count. Hates routine and needs plenty of space.'],
  ['理想派領袖','有遠見又夠膽帶頭，鍾意為大家爭取；有時太相信自己，聽唔入反對聲音。','The Visionary Leader','Far-sighted and willing to lead, happy to fight for the group. Can be too self-assured to hear objections.'],
  ['天才觀察者','理性抽離，睇人睇事好準；表面隨和，其實心入面有一套自己嘅標準。','The Detached Genius','Rational and observant, reads people well. Easy-going on the surface, with firm private standards.']],
 [ // 雙魚
  ['溫柔守護者','好識體諒人，默默照顧身邊人；容易將別人嘅情緒擔上身，要學識講「唔得」。','The Gentle Guardian','Understanding and quietly caring. Tends to soak up other people’s moods; learn to say no.'],
  ['浪漫藝術家','想像力爆燈，情緒來得快去得快；靈感好多，但要有人提佢交死線。','The Romantic Artist','Wildly imaginative, with moods that come and go fast. Full of inspiration, but needs deadline reminders.'],
  ['熱心夢想家','對人真心，對夢想肯付出；有時太易信人，要留返少少防備。','The Warm Dreamer','Sincere with people and committed to dreams. Trusts too easily; keep a little guard up.'],
  ['神秘感應者','直覺準到嚇人，但唔會輕易表露自己；需要獨處時間充電。','The Mystic Sensor','Uncannily intuitive but rarely shows their hand. Recharges with time alone.']],
 [ // 白羊
  ['有計劃嘅衝鋒手','有衝勁但唔亂嚟，定好目標就全速推進；對自己要求高，壓力大會心急。','The Planned Charger','Driven but not reckless: sets a goal, then goes full speed. Demanding of themself and impatient under pressure.'],
  ['即興冒險王','諗到就去，最鍾意新鮮刺激；熱度來得快，要學識堅持到尾。','The Spontaneous Adventurer','Goes the moment an idea strikes and loves anything new. Enthusiasm fades fast; practise finishing.'],
  ['天生大將','夠膽、夠直接，危急關頭最靠得住；脾氣來得快，記得深呼吸先開口。','The Born General','Brave and direct, the one to count on in a crisis. Quick-tempered; breathe before speaking.'],
  ['冷靜挑戰者','外表淡定，其實好勝心好強；鍾意用腦贏，唔鍾意硬碰。','The Cool Challenger','Calm outside, highly competitive inside. Prefers to win with brains rather than force.']],
 [ // 金牛
  ['穩陣計劃家','做事一步一腳印，對錢同時間都好有計劃；唔鍾意突如其來嘅改變。','The Steady Planner','Takes things step by step and plans money and time carefully. Dislikes sudden change.'],
  ['享樂美食家','識食識玩，對靚嘢有天生品味；固執起上嚟十隻牛都拉唔返。','The Pleasure Seeker','Knows good food and good times, with a natural eye for beauty. Once stubborn, ten oxen can’t pull them back.'],
  ['可靠靠山','講得出做得到，係朋友圈入面最穩陣嗰個；慢熱，但認定咗就好長情。','The Rock','Keeps their word and is the steadiest friend in the group. Slow to warm up, but loyal for life.'],
  ['低調鑑賞家','安靜有品味，對質素要求高；表面隨和，原則上一步都唔讓。','The Quiet Connoisseur','Understated, with refined taste and high standards. Easy-going until a principle is at stake.']],
 [ // 雙子
  ['細心溝通家','口才好又識照顧氣氛，諗嘢周到；有時諗太多，搞到自己好攰。','The Careful Communicator','Articulate and good at reading the room. Overthinks to the point of exhaustion.'],
  ['百變點子王','好奇心無底，鍾意同時做幾樣嘢；悶親就想轉台，要揀一兩樣專心做。','The Idea Machine','Endlessly curious and juggles several things at once. Bored easily; pick one or two to focus on.'],
  ['社交萬人迷','去到邊都識到朋友，講嘢好有感染力；承諾多咗，要記得逐樣兌現。','The Social Magnet','Makes friends everywhere and speaks persuasively. Remember to deliver on every promise.'],
  ['雙面策略家','腦筋轉得快，理性同感性隨時切換；身邊人有時捉唔到你諗咩。','The Two-sided Strategist','Quick-minded, switching between logic and feeling at will. Others can’t always tell what you’re thinking.']],
 [ // 巨蟹
  ['暖心管家','記得每個人嘅喜好，屋企同朋友都打點得好好；容易擔心，要多啲信自己。','The Caring Homemaker','Remembers everyone’s likes and looks after home and friends. Worries a lot; trust yourself more.'],
  ['情緒小太陽','感情豐富，開唔開心都寫晒喺面；對自己人好到無得頂。','The Emotional Sunshine','Big-hearted, with every feeling showing on their face. Unbeatably kind to their own people.'],
  ['守護型大家長','保護欲強，邊個有事都第一個出手；要小心唔好管得太多。','The Protective Elder','Strongly protective and first to step in when someone is in trouble. Careful not to over-manage.'],
  ['外冷內熱','第一印象有距離感，熟咗先發現好念舊、好細心；受過傷會收埋自己。','Cool Outside, Warm Inside','Seems distant at first but is sentimental and attentive once close. Withdraws when hurt.']],
 [ // 獅子
  ['有禮領袖','有領導力又顧及別人感受，做嘢好有責任感；好著重面子同人哋點睇。','The Gracious Leader','Leads while minding others’ feelings and takes responsibility seriously. Cares a lot about reputation.'],
  ['舞台主角','天生吸引目光，熱情又大方；鍾意被讚，被冷落會唔開心。','The Star of the Show','Naturally draws attention, warm and generous. Loves praise and sulks when ignored.'],
  ['王者氣場','自信、有魄力，大家自然跟住你行；記得聽下其他人意見。','The Royal Presence','Confident and forceful; people naturally follow. Remember to hear others out.'],
  ['優雅指揮官','冷靜大方，識喺幕後控制大局；唔多講，但講出嚟就有份量。','The Elegant Commander','Composed and gracious, steering things from behind the scenes. Says little, but it carries weight.']],
 [ // 處女
  ['完美主義者','細節控，做嘢準確到無得彈；對自己同人都嚴，記得放鬆下。','The Perfectionist','Obsessed with detail and precise to a fault. Strict with self and others; remember to relax.'],
  ['有趣分析員','腦筋活躍，鍾意研究自己有興趣嘅嘢；認真起上嚟好專注，但興趣轉得快。','The Playful Analyst','An active mind that dives into pet subjects. Intensely focused, but interests change fast.'],
  ['實幹組織者','識安排、識分工，係團隊入面嘅定海神針；唔好成日一個人孭晒啲嘢。','The Hands-on Organiser','Plans and delegates well, the anchor of any team. Don’t carry everything alone.'],
  ['理性顧問','分析力強，畀意見一針見血；有時講得太直，要留意對方感受。','The Rational Adviser','A sharp analyst whose advice hits the mark. Can be too blunt; mind the other person’s feelings.']],
 [ // 天秤
  ['和平使者','識調解、識體諒，最怕同人起衝突；要學識講出自己真正想要咩。','The Peacemaker','Mediates and empathises, and dreads conflict. Learn to say what you really want.'],
  ['時尚社交家','品味好、人緣好，生活要有美感；揀嘢時會猶豫好耐。','The Stylish Socialite','Good taste and popular, needing beauty in daily life. Agonises over choices.'],
  ['魅力談判家','識講識做，總搵到大家都接受嘅方案；表面圓滑，心入面好清楚自己目標。','The Charming Negotiator','Always finds the deal everyone accepts. Smooth outside, clear about their own goals inside.'],
  ['優雅平衡者','冷靜客觀，睇事情好全面；需要時間先會表態。','The Graceful Balancer','Calm and objective, seeing the whole picture. Takes time before taking a side.']],
 [ // 天蠍
  ['深情守密人','認真、專一，一旦信你就好忠心；記仇都記得一樣深。','The Devoted Secret-keeper','Serious and loyal once trust is earned. Holds grudges just as deeply.'],
  ['熱烈探索者','有興趣嘅嘢會鑽到底，愛恨分明；情緒強烈，要搵到出口。','The Intense Explorer','Digs to the bottom of anything interesting; loves and hates clearly. Strong emotions need an outlet.'],
  ['鋼鐵意志','目標一定，點都會做到；有控制欲，要學識放手畀人。','The Iron Will','Once set on a goal, gets it done. Controlling; learn to let others take over.'],
  ['冷靜洞察家','好難被人睇穿，但你睇人好準；鍾意保留神秘感。','The Cool Observer','Hard to read, yet reads others easily. Enjoys keeping an air of mystery.']],
 [ // 射手
  ['有分寸嘅旅人','鍾意自由同新事物，但做事有交代；講嘢直，出發點係好意。','The Measured Traveller','Loves freedom and novelty, yet follows through. Outspoken, but well-meaning.'],
  ['自由靈魂','樂觀到極，一有假期就想走；最怕被綁住，承諾之前要諗清楚。','The Free Spirit','Endlessly optimistic and off travelling at every holiday. Hates being tied down; think before committing.'],
  ['開心果隊長','正能量滿滿，帶動氣氛一流；諗嘢有時太快太大，細節要人幫手。','The Cheerful Captain','Full of positive energy and great at lifting a room. Thinks big and fast; needs help with details.'],
  ['哲學家','鍾意諗人生同大問題，見解獨特；表面嘻嘻哈哈，心入面好有主見。','The Philosopher','Ponders big questions with unusual insight. Jokey on the surface, strong-minded underneath.']],
 [ // 山羊
  ['盡責模範生','守規矩、肯捱、做嘢有始有終；對自己太嚴，記得獎勵下自己。','The Model Achiever','Disciplined and hard-working, finishing what they start. Too hard on themself; remember to celebrate.'],
  ['低調實幹家','用自己方法慢慢爬上去，唔理人點睇；外表冷，其實好幽默。','The Quiet Doer','Climbs steadily in their own way, whatever others think. Looks cool but is quietly funny.'],
  ['野心建築師','目標清晰、計劃長遠，係天生事業型；記得留時間畀屋企人。','The Ambitious Builder','Clear goals and long-range plans, a natural careerist. Save time for family.'],
  ['冷靜戰略家','理性務實，識計數又識睇形勢；唔輕易信人，但信咗就好可靠。','The Cool Strategist','Rational and practical, good with numbers and reading a situation. Slow to trust, but very reliable after.']]
];

const T4 = {
  zh: {
    tabs: { blood: '48型人格' },
    bdPick: '你嘅血型',
    bdLead: (n, s, b, nm) => `${n ? n + '係' : '你係'}${s} × ${b} 型<span class="big">${nm}</span>`,
    bdOther: (s, b, nm) => `${s} × ${b} 型<span class="big">${nm}</span>`,
    bdFacts: { sign: '星座特質', blood: '血型特質', type: '48型編號' },
    bdAll: '48 型一覽（撳任何一格睇）',
    bdMine: '返去我嘅類型',
    bdInfoLabel: '48型人格係咩',
    bdInfo: '48型人格 = 12 星座 × 4 血型（A、B、O、AB）。星座按你填嘅出生日期計，血型喺上面揀。血型性格係日本流行嘅說法，冇科學根據；呢度嘅類型名同解說係本站原創，只作娛樂參考。'
  },
  en: {
    tabs: { blood: '48 types' },
    bdPick: 'Your blood type',
    bdLead: (n, s, b, nm) => `${n ? n + ' is' : 'You are'} ${s} × type ${b}<span class="big">${nm}</span>`,
    bdOther: (s, b, nm) => `${s} × type ${b}<span class="big">${nm}</span>`,
    bdFacts: { sign: 'Star sign', blood: 'Blood type', type: 'Type no.' },
    bdAll: 'All 48 types (tap any square)',
    bdMine: 'Back to my type',
    bdInfoLabel: 'What are the 48 types?',
    bdInfo: '48 types = 12 star signs × 4 blood types (A, B, O, AB). Your star sign comes from the birth date you entered; pick your blood type above. Blood-type personality is a popular Japanese idea with no scientific basis. The type names and texts here are written for this site and are for fun only.'
  }
};
['zh','en'].forEach(k => { Object.assign(T2[k].tabs, T4[k].tabs); const c = Object.assign({}, T4[k]); delete c.tabs; Object.assign(T2[k], c); });

/* pane: uses app.js helpers inside functions only, like oracles.js */
let bdType = 'A', bdView = null;
try { const s = localStorage.getItem('wx-blood'); if (BLOOD_TYPES.includes(s)) bdType = s; } catch (e) {}
const BD_ROWS = [2,3,4,5,6,7,8,9,10,11,0,1];  // Aries first
const bdEl = z => ({ 火: '火', 土: '土', 風: '金', 水: '水' })[z.el];
const bdNum = (zi, bi) => BD_ROWS.indexOf(zi) * 4 + bi + 1;
function paneBlood() {
  const mine = ZODIAC.indexOf(sunSign(profile.m, profile.d)), mb = BLOOD_TYPES.indexOf(bdType);
  const [zi, bi] = bdView || [mine, mb], z = ZODIAC[zi], b = BLOOD_TYPES[bi], d = BLOOD48[zi][bi], k = isEn() ? 2 : 0;
  const isMine = zi === mine && bi === mb, sname = `${z.sym} ${isEn() ? z.en : z.zh}`;
  const pick = BLOOD_TYPES.map(x => `<button type="button" class="chip" data-bd="${x}" aria-pressed="${x === bdType}">${x}</button>`).join('');
  const grid = `<div class="bd-grid" role="group" aria-label="${t('bdAll')}"><span></span>${BLOOD_TYPES.map(x => `<b>${x}</b>`).join('')}` +
    BD_ROWS.map(r => `<span class="bd-sign">${ZODIAC[r].sym}<small>${isEn() ? ZODIAC[r].en : ZODIAC[r].zh}</small></span>` +
      BLOOD_TYPES.map((x, j) => `<button type="button" class="bd-cell el-${bdEl(ZODIAC[r])}${r === mine && j === mb ? ' hint' : ''}" data-bdz="${r}" data-bdb="${j}" aria-pressed="${r === zi && j === bi}">${BLOOD48[r][j][k]}</button>`).join('')).join('') + '</div>';
  return `<div class="bd-pick"><span class="bd-label">${t('bdPick')}${infoTip(t('bdInfoLabel'), t('bdInfo'))}</span><div class="filters">${pick}</div></div>` +
    block(bdEl(z), `<p class="lead">${isMine ? t('bdLead')(profile.name, sname, b, d[k]) : t('bdOther')(sname, b, d[k])}</p>
    <p style="margin:0">${d[k + 1]}</p>
    <div class="facts">${fact(t('bdFacts').sign, z.kw[isEn() ? 1 : 0])}${fact(t('bdFacts').blood, BLOOD_INFO[b][lang])}${fact(t('bdFacts').type, `#${bdNum(zi, bi)} / 48`)}</div>
    ${isMine ? '' : `<p style="margin:0"><button type="button" class="chip" id="bdBack">${t('bdMine')}</button></p>`}`) +
    `<h4 class="bd-h">${t('bdAll')}</h4>${grid}` + recList([...z.rec, BLOOD_INFO[b].rec]);
}
ORACLE_PANES.blood = paneBlood;
ORACLE_WIRE.blood = pane => {
  pane.querySelectorAll('[data-bd]').forEach(x => x.onclick = () => { bdType = x.dataset.bd; bdView = null; try { localStorage.setItem('wx-blood', bdType); } catch (e) {} renderPane(); });
  pane.querySelectorAll('[data-bdz]').forEach(x => x.onclick = () => { bdView = [+x.dataset.bdz, +x.dataset.bdb]; renderPane(); });
  const back = pane.querySelector('#bdBack'); if (back) back.onclick = () => { bdView = null; renderPane(); };
};

/* (i) popover shared by every tab: infoTip() makes the markup, wireTips() runs from renderPane().
   Hover opens it on desktop, tap on mobile; it sizes to its text and shifts to stay on screen. */
const infoTip = (label, text) => `<span class="info-wrap"><button type="button" class="info" aria-label="${label}" aria-expanded="false">i</button><span class="info-pop" role="tooltip" hidden>${text}</span></span>`;
function wireTips(pane) {
  const tips = [...pane.querySelectorAll('.info-wrap')];
  const close = w => { w.querySelector('.info-pop').hidden = true; w.querySelector('.info').setAttribute('aria-expanded', 'false'); };
  tips.forEach(w => {
    const btn = w.querySelector('.info'), pop = w.querySelector('.info-pop'); let hideT = null;
    const show = () => {
      clearTimeout(hideT); tips.forEach(o => o !== w && close(o));
      pop.hidden = false; btn.setAttribute('aria-expanded', 'true');
      pop.style.left = ''; const r = pop.getBoundingClientRect(), cw = document.documentElement.clientWidth;
      const over = r.right - (cw - 12), under = 12 - r.left, cur = parseFloat(getComputedStyle(pop).left);
      if (over > 0) pop.style.left = (cur - Math.min(over, r.left - 12)) + 'px';
      else if (under > 0) pop.style.left = (cur + under) + 'px';
    };
    w.addEventListener('mouseenter', show); w.addEventListener('mouseleave', () => { hideT = setTimeout(() => close(w), 250); });
    btn.onclick = e => { e.stopPropagation(); if (pop.hidden) show(); else close(w); };
  });
  pane.onclick = () => tips.forEach(close);
}
