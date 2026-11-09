/* 48星區. The date split (12 cusps + parts I–III of each sign) follows the popular 48-period birthday scheme;
   titles and texts are written for this site. Part I = the sign itself, II and III = coloured by the next two signs
   of the same element (classical decans), cusp = blend of two signs. Uses app.js / more.js helpers inside functions only. */
const Z48_START = [319,325,403,411, 419,425,503,511, 519,525,603,611, 619,625,703,711, 719,726,803,811, 819,826,903,911,
  919,925,1003,1011, 1019,1026,1103,1112, 1119,1125,1203,1211, 1219,1226,103,110, 117,123,131,208, 216,223,303,311];
const Z48_SIGN = [2,3,4,5,6,7,8,9,10,11,0,1];   // ZODIAC index for each row, Aries first
const Z48 = [
 ['夢想啟動者','雙魚嘅想像力遇上白羊嘅衝勁，諗到就想即刻實現。','有創意、行動快','心急、易半途而廢','The Dream Starter','Pisces imagination meets Aries drive; ideas want to become real at once.','Creative, quick to act','Impatient, may quit halfway'],
 ['開路先鋒','最純粹嘅白羊，第一個衝出去，鍾意開荒。','坦率、勇敢','衝動、欠耐性','The Trailblazer','Aries at its purest: first out of the gate, loves breaking new ground.','Frank, brave','Rash, impatient'],
 ['熱血主角','白羊衝勁加獅子自信，鍾意做焦點、帶住大家。','自信、有感染力','好面子、聽唔入意見','The Bold Lead','Aries drive with Leo confidence; enjoys centre stage and leading others.','Confident, inspiring','Proud, deaf to advice'],
 ['理想冒險家','衝勁之外多咗遠見，鍾意為信念同新體驗出發。','樂觀、眼光遠','講多過做、怕被綁','The Idealistic Adventurer','Drive plus vision; sets out for beliefs and new experiences.','Optimistic, far-seeing','Talks more than acts, hates ties'],
 ['實幹開拓者','白羊嘅膽量加金牛嘅耐力，敢開始又捱得落去。','有魄力、肯捱','固執、好勝','The Steady Pioneer','Aries nerve plus Taurus stamina: dares to start and stays the course.','Forceful, hard-working','Stubborn, competitive'],
 ['穩陣建設者','一步一步建立安穩生活，重質素同實際。','可靠、有計劃','唔鍾意變、慢熱','The Steady Builder','Builds a secure life step by step; values quality and practicality.','Reliable, planned','Resists change, slow to warm'],
 ['細心匠人','踏實之餘好睇重細節，做嘢要做到最好。','仔細、勤力','挑剔、易擔心','The Careful Artisan','Grounded and detail-minded; wants every job done right.','Thorough, diligent','Picky, a worrier'],
 ['長線經營者','有耐性又有野心，鍾意慢慢累積成果。','有毅力、識理財','太嚴肅、放唔低','The Long-game Player','Patient and ambitious, building results over time.','Persistent, good with money','Too serious, can’t let go'],
 ['實用點子王','金牛嘅實際加雙子嘅靈活，諗到又識變成收入。','多才、反應快','欠專注、易厭','The Practical Ideas Person','Taurus sense meets Gemini wit; ideas that can earn.','Versatile, quick','Unfocused, easily bored'],
 ['好奇傳訊員','最純粹嘅雙子，乜都想知、乜都想講。','聰明、健談','三分鐘熱度、口快','The Curious Messenger','Gemini at its purest: wants to know and share everything.','Clever, chatty','Short-lived enthusiasm, speaks too fast'],
 ['社交調和者','識講又識聽，擅長拉近人與人嘅距離。','有魅力、圓滑','猶豫、怕得罪人','The Social Connector','Talks and listens well; good at bringing people together.','Charming, tactful','Indecisive, afraid to offend'],
 ['創新思考家','腦筋轉數快，鍾意新科技同新想法。','有創意、獨立','抽離、難捉摸','The Inventive Thinker','A fast mind drawn to new ideas and technology.','Original, independent','Detached, hard to pin down'],
 ['感性說書人','雙子嘅表達力加巨蟹嘅感受力，好識講動人嘅故事。','體貼、有想像力','情緒起伏、敏感','The Heartfelt Storyteller','Gemini expression with Cancer feeling; tells moving stories.','Caring, imaginative','Moody, sensitive'],
 ['溫暖守護者','最純粹嘅巨蟹，重家庭，照顧身邊人。','顧家、有同理心','缺安全感、易受傷','The Warm Guardian','Cancer at its purest: family-centred and nurturing.','Devoted, empathetic','Insecure, easily hurt'],
 ['深情洞察者','感情深、直覺準，表面溫和、內心好堅定。','忠心、敏銳','記仇、佔有慾','The Deep Feeler','Deep emotions and sharp intuition; gentle outside, resolute inside.','Loyal, perceptive','Holds grudges, possessive'],
 ['溫柔夢想家','心軟、富想像力，好容易感受到別人需要。','善良、有藝術感','逃避、易被情緒帶走','The Gentle Dreamer','Soft-hearted and imaginative; senses what others need.','Kind, artistic','Escapist, swept by moods'],
 ['剛柔並濟','巨蟹嘅細膩加獅子嘅熱情，可以好溫柔，亦可以好強勢。','有勇氣、重感情','情緒大起大落','Soft and Strong','Cancer sensitivity with Leo warmth; tender or forceful by turns.','Brave, affectionate','Big mood swings'],
 ['天生王者','最純粹嘅獅子，自信大方，有領導氣場。','慷慨、有魄力','好面子、霸道','The Natural Ruler','Leo at its purest: confident, generous, commanding.','Generous, forceful','Vain, bossy'],
 ['熱情探險家','鍾意挑戰同遠行，用熱情感染身邊人。','樂觀、坦率','衝動、誇張','The Ardent Explorer','Loves challenges and travel; spreads enthusiasm.','Upbeat, frank','Impulsive, exaggerates'],
 ['勇往直前','獅子嘅自信加白羊嘅衝勁，目標一定就全速衝。','果斷、行動力強','急躁、聽唔入人講','Full Steam Ahead','Leo confidence plus Aries drive; once set, charges ahead.','Decisive, active','Hasty, won’t listen'],
 ['低調實力派','外表有光芒，做嘢又細心，識得收放。','有才華、觀察力強','對自己太嚴、難親近','The Quiet Talent','Shines outside, meticulous inside; knows when to hold back.','Gifted, observant','Self-critical, hard to approach'],
 ['精準分析師','最純粹嘅處女，有條理、追求完美。','細心、有系統','挑剔、易焦慮','The Precise Analyst','Virgo at its purest: orderly and perfectionist.','Careful, systematic','Critical, anxious'],
 ['可靠管家','實際又有責任感，係大家最放心嘅人。','穩重、有效率','太認真、少表達','The Trusted Steward','Practical and responsible; the person everyone relies on.','Steady, efficient','Too earnest, reserved'],
 ['品味實踐者','細心之外重視享受同美感，做嘢實際又有質素。','有品味、踏實','固執、計較','The Tasteful Realist','Careful, with an eye for comfort and beauty; practical with quality.','Refined, grounded','Stubborn, calculating'],
 ['美學完美主義','處女嘅細緻加天秤嘅美感，對靚嘢好有要求。','有藝術觸覺','太講究、怕面對難題','The Aesthetic Perfectionist','Virgo precision plus Libra beauty; exacting about style.','Artistic eye','Fussy, avoids hard problems'],
 ['優雅平衡者','最純粹嘅天秤，重公平同和諧，有品味。','公正、有魅力','猶豫不決','The Graceful Balancer','Libra at its purest: fair, harmonious, stylish.','Fair, charming','Indecisive'],
 ['理想社交家','鍾意結識唔同嘅人，追求公平同進步。','開明、友善','抽離、難投入','The Progressive Socialite','Meets all kinds of people; values fairness and progress.','Open-minded, friendly','Detached'],
 ['機智外交家','口才好、反應快，擅長談判同協調。','靈活、識講','善變、流於表面','The Witty Diplomat','Eloquent and quick; good at negotiating.','Flexible, persuasive','Changeable, superficial'],
 ['魅力評論家','天秤嘅魅力加天蠍嘅深度，睇人睇事一針見血。','有洞察力、迷人','講嘢尖銳、愛恨分明','The Magnetic Critic','Libra charm with Scorpio depth; sees straight through things.','Insightful, alluring','Sharp-tongued'],
 ['專注探索者','最純粹嘅天蠍，認定目標就深入到底。','專注、意志強','多疑、佔有慾','The Focused Seeker','Scorpio at its purest: goes deep once committed.','Focused, strong-willed','Suspicious, possessive'],
 ['神秘感應者','直覺強、感受深，有種講唔出嘅吸引力。','敏銳、有同情心','情緒化、愛收埋','The Mysterious Sensitive','Strong intuition and deep feeling; quietly magnetic.','Perceptive, compassionate','Moody, secretive'],
 ['忠誠守護者','對自己人極之保護，重感情亦重承諾。','忠心、有承擔','控制慾、記仇','The Loyal Protector','Fiercely protective of their own; true to commitments.','Loyal, dependable','Controlling, grudging'],
 ['坦率改革者','天蠍嘅深度加射手嘅直率，敢講真話、敢求變。','真誠、有勇氣','太直、反叛','The Candid Reformer','Scorpio depth with Sagittarius candour; dares to speak and change.','Honest, brave','Blunt, rebellious'],
 ['自由旅人','最純粹嘅射手，樂觀好動，愛探索世界。','開朗、好奇','無定性、怕承諾','The Free Traveller','Sagittarius at its purest: upbeat and exploring.','Cheerful, curious','Restless, commitment-shy'],
 ['衝鋒冒險王','想到就出發，鍾意刺激同挑戰。','勇敢、熱情','魯莽、欠計劃','The Daring Adventurer','Sets off at once; loves thrills and challenges.','Brave, enthusiastic','Reckless, unplanned'],
 ['豪邁理想家','有遠大理想，又有魅力帶動大家一齊追。','大方、有遠見','誇大、好勝','The Grand Idealist','Big ideals and the charisma to rally others.','Generous, visionary','Exaggerates, competitive'],
 ['務實夢想家','射手嘅理想加山羊嘅務實，敢諗又識落地。','有遠見、肯捱','壓抑、太嚴肅','The Grounded Visionary','Sagittarius ideals with Capricorn realism; dreams that land.','Far-sighted, diligent','Repressed, serious'],
 ['堅毅攀登者','最純粹嘅山羊，目標清晰，一步步向上。','有責任感、有毅力','保守、工作狂','The Determined Climber','Capricorn at its purest: clear goals, steady ascent.','Responsible, persistent','Conservative, workaholic'],
 ['實力收藏家','重實際亦重享受，識儲又識用。','穩重、識理財','固執、物質化','The Prudent Collector','Practical yet enjoys comfort; saves and spends wisely.','Steady, money-wise','Stubborn, materialistic'],
 ['嚴謹執行者','做事有計劃、有標準，交帶清楚。','專業、可靠','挑剔、放唔開','The Rigorous Executor','Planned and exacting; delivers clearly.','Professional, reliable','Picky, uptight'],
 ['傳統革新者','尊重傳統又想突破，喺舊框架入面搞新嘢。','有創意、腳踏實地','矛盾、固執','The Traditional Innovator','Respects tradition yet wants breakthroughs.','Inventive, grounded','Conflicted, stubborn'],
 ['獨立先驅','最純粹嘅水瓶，諗法獨特，重自由。','創新、有原則','抽離、我行我素','The Independent Pioneer','Aquarius at its purest: original and free.','Innovative, principled','Detached, contrary'],
 ['靈感發明家','腦筋快、點子多，鍾意同人交流想法。','聰明、健談','三心兩意','The Idea Inventor','A quick mind full of ideas, loves to swap them.','Bright, talkative','Scattered'],
 ['人道理想家','重公平同友情，想令世界更好。','友善、有理想','理論多過行動','The Humanitarian','Values fairness and friendship; wants a better world.','Friendly, idealistic','More theory than action'],
 ['敏感夢想家','水瓶嘅理想加雙魚嘅感受力，善良又有創意。','有同理心、有創意','逃避現實','The Sensitive Visionary','Aquarius ideals with Pisces feeling; kind and creative.','Empathetic, inventive','Escapist'],
 ['靈性藝術家','最純粹嘅雙魚，想像力豐富，感受細膩。','溫柔、有藝術感','迷惘、易被左右','The Soulful Artist','Pisces at its purest: imaginative and tender.','Gentle, artistic','Unfocused, easily swayed'],
 ['溫情照顧者','心軟、顧家，擅長安慰同照顧人。','體貼、有愛心','過度付出、敏感','The Tender Carer','Soft-hearted and family-minded, a natural comforter.','Caring, loving','Over-giving, sensitive'],
 ['深沉直覺家','直覺準，意志比外表強，帶點神秘感。','洞察力強、堅韌','多疑、情緒深','The Deep Intuitive','Uncanny intuition, with more resolve than shows.','Perceptive, resilient','Suspicious, intense']
];
const T8 = {
  zh: {
    tabs: { zone48: '48星區' },
    z48Lead: (n, z, s) => `${n ? n + '係' : '你係'}${z}<span class="big">${s}</span>`,
    z48Other: (z, s) => `${z}<span class="big">${s}</span>`,
    z48Facts: { range: '日期', plus: '優點', minus: '要留意', no: '星區編號' },
    z48Pals: '同你最夾嘅星區',
    z48All: '48 星區一覽（撳任何一格睇）',
    z48Info: '48星區將每個星座再分成 I、II、III 三段，加上星座之間嘅 12 個交界，一年分成 48 段，日期分法來自 1990 年代美國流行嘅生日占星書。呢度嘅名稱同解說係本站原創，用傳統「十度分區」原理寫：I 係純粹嘅本星座；II、III 分別帶同元素另外兩個星座嘅色彩；交界係兩個星座嘅混合。最夾嘅星區取同元素星座同一段，加對面星座同一段。五行跟本星座元素（交界跟後面嗰個星座）。只作娛樂參考。',
    z48Cusp: '交界'
  },
  en: {
    tabs: { zone48: '48 star zones' },
    z48Lead: (n, z, s) => `${n ? n + ' is' : 'You are'} ${z}<span class="big">${s}</span>`,
    z48Other: (z, s) => `${z}<span class="big">${s}</span>`,
    z48Facts: { range: 'Dates', plus: 'Strengths', minus: 'Watch for', no: 'Zone no.' },
    z48Pals: 'Most compatible zones',
    z48All: 'All 48 zones (tap any square)',
    z48Info: 'The 48 zones split each sign into parts I, II and III, plus the 12 cusps between signs, giving 48 periods a year; the dates follow a popular 1990s American birthday-astrology book. Titles and texts here are written for this site using the classical decan idea: part I is the sign itself, II and III are coloured by the other two signs of the same element, and a cusp blends two signs. Compatible zones are the same part of the other two same-element signs and of the opposite sign. The element follows the sign (a cusp follows the later sign). For fun only.',
    z48Cusp: 'Cusp'
  }
};
['zh','en'].forEach(k => { Object.assign(T2[k].tabs, T8[k].tabs); const c = Object.assign({}, T8[k]); delete c.tabs; Object.assign(T2[k], c); });

let z48View = null;
function zone48Of(m, d) {
  const md = m * 100 + d; let best = -1, bv = -1;
  Z48_START.forEach((s, i) => { if (s <= md && s > bv) { bv = s; best = i; } });
  return best < 0 ? Z48_START.indexOf(1226) : best;      // 1–2 Jan is still Capricorn I
}
function z48Name(i) {
  const row = Math.floor(i / 4), part = i % 4, z = ZODIAC[Z48_SIGN[row]], prev = ZODIAC[Z48_SIGN[mod(row - 1, 12)]];
  const nm = x => x.zh.replace('座', '');
  if (part === 0) return isEn() ? `${prev.en}–${z.en} cusp` : `${nm(prev)}${nm(z)}交界`;
  return `${isEn() ? z.en : z.zh} ${['', 'I', 'II', 'III'][part]}`;
}
const z48El = i => ZEL[ZODIAC[Z48_SIGN[Math.floor(i / 4)]].el];
function z48Range(i) {
  const s = Z48_START[i], e = Z48_START[(i + 1) % 48], end = new Date(Date.UTC(2001, Math.floor(e / 100) - 1, e % 100) - 864e5);
  const f = (m, d) => isEn() ? `${d} ${t('stM')(m)}` : `${m}月${d}日`;
  return `${f(Math.floor(s / 100), s % 100)} – ${f(end.getUTCMonth() + 1, end.getUTCDate())}`;
}
function paneZone48() {
  const mine = zone48Of(profile.m, profile.d), i = z48View == null ? mine : z48View, Z = Z48[i], k = isEn() ? 4 : 0, el = z48El(i);
  const row = Math.floor(i / 4), part = i % 4;
  const pals = [4, 8, 6].map(o => (row + o) % 12 * 4 + part);   // other two same-element signs, then the opposite sign
  const heads = [t('z48Cusp'), 'I', 'II', 'III'];
  const grid = `<div class="bd-grid z48-grid"><span></span>${heads.map(x => `<b>${x}</b>`).join('')}` +
    Z48_SIGN.map((zi, r) => `<span class="bd-sign">${ZODIAC[zi].sym}<small>${isEn() ? ZODIAC[zi].en : ZODIAC[zi].zh}</small></span>` +
      [0, 1, 2, 3].map(p => { const j = r * 4 + p; return `<button type="button" class="bd-cell el-${z48El(j)}${j === mine ? ' hint' : ''}" data-z48="${j}" aria-pressed="${j === i}">${softWrap(Z48[j][k])}</button>`; }).join('')).join('') + '</div>';
  const lead = i === mine ? t('z48Lead')(profile.name, z48Name(i), Z[k]) : t('z48Other')(z48Name(i), Z[k]);
  return block(el, `<p class="lead">${lead}${infoTip(t('whatIs'), t('z48Info'))}</p>
    <p style="margin:0">${Z[k + 1]}</p>
    <div class="facts">${fact(t('z48Facts').range, z48Range(i))}${fact(t('z48Facts').plus, Z[k + 2], 'good')}${fact(t('z48Facts').minus, Z[k + 3], 'bad')}${fact(t('z48Facts').no, `#${i + 1} / 48`)}</div>
    <div><h4 class="mini">${t('z48Pals')}</h4><div class="filters">${pals.map(j => `<button type="button" class="chip" data-z48="${j}">${z48Name(j)} · ${Z48[j][k]}</button>`).join('')}</div></div>
    ${i === mine ? '' : `<p style="margin:0"><button type="button" class="chip" id="z48Back">${t('bdMine')}</button></p>`}`) +
    `<h4 class="bd-h">${t('z48All')}</h4>${grid}` + crystalsFor(el);
}
ORACLE_PANES.zone48 = paneZone48;
ORACLE_WIRE.zone48 = pane => {
  pane.querySelectorAll('[data-z48]').forEach(b => b.onclick = () => { z48View = +b.dataset.z48; renderPane(); });
  const back = pane.querySelector('#z48Back'); if (back) back.onclick = () => { z48View = null; renderPane(); };
};
