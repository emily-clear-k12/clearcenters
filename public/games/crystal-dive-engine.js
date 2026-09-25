(function () {
  'use strict';
  const canvas = document.getElementById('map');
  const g = canvas.getContext('2d');
  const overlay = document.getElementById('overlay');
  const panel = document.getElementById('panel');
  const questions = window.CrystalDiveQuestions;
  const scenery = new Image();
  scenery.src = '/games/crystal-dive-solara.jpg';
  const cavernArt = new Image();
  cavernArt.src = '/games/crystal-dive-caverns.jpg';
  const wispArt = new Image();
  wispArt.src = '/games/crystal-dive-wisp.png';
  const CELL = 40, LEVEL = 920, WIDTH = 1280, HEIGHT = 720;
  const teacher = { sessionMinutes: 10, questionSeconds: 0 };
  let bank = [], wordLabels = new Map(), done = null, prepare = null, preparedSpins = null, mode = 'intro', layer = 1, crystals = 0, answers = [];
  let sections = [], rover = { x: 640, y: 185, facing: 1, heading: 0 }, camera = 0;
  let keys = {}, queue = [], last = '', burst = 0, burstCorrect = 0, overdrive = 0, current = null, remaining = 600;
  let caveBag = [], lastCaveKind = '', lastJewelLayer = -2;
  let endAt = 0, startedAt = 0, questionAt = 0, finishAt = 0, previousFrame = 0;
  let dust = [], nearCave = null, banner = 0, bannerReward = false, roverFreeze = 0, hitFlash = 0, spinsLeft = 0, spinRotation = 0, bankedCrystals = 0, spinAwards = [];
  const SPIN_MULTIPLIERS = [.5, .75, 1, 1, 1.25, 1.5];
  const el = (id) => document.getElementById(id);
  const copy = (s) => String(s == null ? '' : s).replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]);
  const time = (s) => { s = Math.max(0, Math.ceil(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function nextCaveKind() {
    if (!caveBag.length) {
      caveBag = shuffle(['crystals', 'shadows', 'guardian', 'mechanism']);
      if (caveBag[caveBag.length - 1] === lastCaveKind) [caveBag[0], caveBag[caveBag.length - 1]] = [caveBag[caveBag.length - 1], caveBag[0]];
    }
    lastCaveKind = caveBag.pop(); return lastCaveKind;
  }
  function show(s) { panel.innerHTML = s; overlay.hidden = false; keys = {}; }
  function hide() { overlay.hidden = true; }
  function hud() {
    el('clock').textContent = time(remaining);
    el('depth').textContent = 'Layer ' + layer;
    el('score').textContent = crystals + ' crystals';
    const freeze = el('wispFreeze');
    freeze.hidden = roverFreeze <= 0;
    if (roverFreeze > 0) freeze.textContent = '⚡ WISP HIT · −1 CRYSTAL · FROZEN ' + Math.ceil(roverFreeze) + 's';
    const boost = el('overdrive'); boost.hidden = overdrive <= 0; boost.textContent = '✦ OVERDRIVE · ' + time(overdrive);
    el('depthMeter').textContent = 'DEPTH · ' + Math.max(0, Math.floor((rover.y - 185) / 10)) + ' m ↓';
    const sec = sectionAt(rover.y);
    if (sec) {
      const bonus = el('descentBonus');
      bonus.textContent = sec.bonusSeconds > 0 ? 'DESCENT BONUS +10 · ' + time(sec.bonusSeconds) : 'BONUS FADED · KEEP DIGGING';
      bonus.className = sec.bonusSeconds > 0 && sec.bonusSeconds <= 6 ? 'urgent' : sec.bonusSeconds <= 0 ? 'faded' : '';
      bonus.style.setProperty('--progress', (sec.bonusSeconds / sec.bonusStart * 100) + '%');
    }
  }
  function demo() { return [7, 8, 9, 6, 4, 3].map((n, i) => ({ id: 'demo:' + i, prompt: 'What is ' + n + ' × ' + (i + 3) + '?', bins: [{ id: 'a', label: String(n * (i + 3)) }, { id: 'b', label: String(n * (i + 3) + n) }, { id: 'c', label: String(n * (i + 3) - n) }, { id: 'd', label: String(n + i + 3) }], correctBinId: 'a' })); }
  function intro() {
    mode = 'intro';
    panel.className = 'panel';
    show('<small>SOLARA EXPEDITION</small><h1>Crystal Dive</h1><p>Dig through Solara, discover different cave encounters, and answer four questions to recharge. Get all four right for a short Overdrive burst. Sometimes a third cave hides a jewel you can dig out.</p><p>Reach the next layer before the descent bonus fades for 10 extra crystals. A wisp collision costs one crystal and freezes both of you for two seconds. Dazzle a wisp with your headlight, then race to grab the prism it drops for four crystals—but do not drive into it! At the end, spin to see how many crystals you bank.</p><p>Hold WASD or the arrow keys to move. Press Space near a cave. On touch screens, hold the direction buttons.</p><p id="bankNote"></p><button class="primary" id="start">Start digging</button>');
    el('bankNote').textContent = bank.length ? 'Assignment bank ready.' : 'Preview mode: sample math facts.';
    el('start').onclick = start;
  }
  function sectionAt(y) { return sections[Math.max(0, Math.floor(y / LEVEL))]; }
  function generate(index) {
    if (sections[index]) return sections[index];
    const rowCount = LEVEL / CELL;
    const cells = Array.from({ length: rowCount }, (_, row) => Array.from({ length: 32 }, (_, col) => {
      if (col === 0 || col === 31) return 'rock';
      if (row < 3) return 'air';
      if (row >= 18 && row <= 20 && col >= 3 && col <= 28) return 'dirt';
      return Math.random() < Math.min(.13, .025 + index * .006) ? 'rock' : 'dirt';
    }));
    const jewel = index > 0 && (index - lastJewelLayer >= 4 || (index - lastJewelLayer >= 2 && Math.random() < .32));
    if (jewel) lastJewelLayer = index;
    const count = jewel ? 3 : 2;
    const slots = shuffle([230, 630, 1030]);
    const caves = [];
    for (let i = 0; i < count; i++) {
      const x = slots[i] + (Math.random() - .5) * 125;
      const y = index * LEVEL + 350 + i * 90 + Math.random() * 75;
      const kind = i === 2 ? 'jewel' : nextCaveKind();
      const cave = { x, y, kind, lit: false, seed: Math.random() * 10 };
      caves.push(cave);
      // Keep the illustrated rock rim visual; the approaches stay open from every side.
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const cx = Math.floor(x / CELL) + dx, cy = Math.floor((y - index * LEVEL) / CELL) + dy;
        if (cy >= 0 && cy < rowCount && cx > 0 && cx < 31) cells[cy][cx] = 'air';
      }
    }
    // A clear central spine prevents an unlucky rock pattern blocking the descent.
    for (let row = 0; row < rowCount; row++) for (let col = 14; col <= 17; col++) if (cells[row][col] === 'rock') cells[row][col] = 'dirt';
    const bonusStart = Math.max(14, 18 - Math.floor(index / 2));
    const wispCount = index ? Math.min(3, 1 + Math.floor((index - 1) / 2)) : 0;
    const wisps = Array.from({ length: wispCount }, (_, n) => ({ x: [640, 370, 960][n], y: index * LEVEL + 250 + n * 145,
      baseX: [640, 370, 960][n], baseY: index * LEVEL + 250 + n * 145, phase: index + n * 2.4, stunned: 0, frozen: 0, cooldown: 0, prism: null, prismDropped: false }));
    const section = { index, cells, caves, wisps, charged: false, bonusStart, bonusSeconds: bonusStart, tint: ['#8c5947', '#75546a', '#506076', '#456779', '#51678a'][Math.min(4, Math.floor(index / 2))] };
    sections[index] = section;
    return section;
  }
  function start() {
    sections = []; caveBag = []; lastCaveKind = ''; lastJewelLayer = -2; generate(0); generate(1);
    rover = { x: 640, y: 185, facing: 1, heading: 0 }; camera = 0; layer = 1;
    crystals = 0; answers = []; queue = []; last = ''; dust = []; burst = 0; burstCorrect = 0; overdrive = 0; spinsLeft = 0; spinRotation = 0; bankedCrystals = 0; spinAwards = []; preparedSpins = null; banner = 0; bannerReward = false; roverFreeze = 0; hitFlash = 0;
    remaining = teacher.sessionMinutes * 60; endAt = performance.now() + remaining * 1000;
    mode = 'explore'; hide(); hud(); el('hint').textContent = 'Hold WASD / arrows to drill · Find a cave below';
  }
  function tileAt(x, y) {
    if (x < CELL || x >= WIDTH - CELL || y < 0) return 'rock';
    const sec = sectionAt(y);
    if (!sec) return 'rock';
    return sec.cells[Math.floor((y - sec.index * LEVEL) / CELL)]?.[Math.floor(x / CELL)] || 'rock';
  }
  function carve(x, y) {
    const sec = sectionAt(y), row = Math.floor((y - sec.index * LEVEL) / CELL), col = Math.floor(x / CELL);
    if (sec.cells[row]?.[col] !== 'dirt') return;
    sec.cells[row][col] = 'air';
    for (let i = 0; i < 5; i++) dust.push({ x: col * CELL + 20, y: sec.index * LEVEL + row * CELL + 20, vx: (Math.random() - .5) * 85, vy: (Math.random() - .5) * 85, life: .5 + Math.random() * .3 });
    if (Math.random() < (overdrive > 0 ? .25 : .055)) crystals++;
  }
  function navigate(dt) {
    const currentSection = sectionAt(rover.y);
    if (currentSection) currentSection.bonusSeconds = Math.max(0, currentSection.bonusSeconds - dt);
    overdrive = Math.max(0, overdrive - dt);
    roverFreeze = Math.max(0, roverFreeze - dt); hitFlash = Math.max(0, hitFlash - dt);
    for (const wisp of currentSection?.wisps || []) {
      if (!wisp.stunned && !wisp.frozen) wisp.phase += dt;
      if (!wisp.frozen) {
        wisp.x = wisp.baseX + Math.sin(wisp.phase * 1.4) * 105;
        wisp.y = wisp.baseY + Math.sin(wisp.phase * 2) * 20;
      }
      wisp.stunned = Math.max(0, wisp.stunned - dt); wisp.cooldown = Math.max(0, wisp.cooldown - dt);
      wisp.frozen = Math.max(0, wisp.frozen - dt);
      if (wisp.prism) {
        wisp.prism.life -= dt;
        if (wisp.prism.life <= 0) wisp.prism = null;
      }
      const wx = wisp.x - rover.x, wy = wisp.y - rover.y, distance = Math.hypot(wx, wy);
      // Contact wins at close range. Previously the headlight stunned the
      // wisp first, so driving directly into it silently avoided the hit.
      if (distance < 55 && !wisp.frozen && !wisp.cooldown && !roverFreeze) {
        crystals = Math.max(0, crystals - 1);
        roverFreeze = 2; wisp.frozen = 2; hitFlash = 2; wisp.cooldown = 3;
        el('hint').textContent = 'Wisp collision! −1 crystal · Both frozen for 2 seconds.';
        hud();
      } else if (!roverFreeze && !wisp.frozen && distance >= 75 && distance < 180 && (wx * Math.cos(rover.heading) + wy * Math.sin(rover.heading)) / distance > .75) {
        if (!wisp.prismDropped) {
          wisp.prism = { x: Math.max(75, Math.min(WIDTH - 75, wisp.x + (rover.x < wisp.x ? -72 : 72))), y: wisp.y + 50, life: 8 };
          wisp.prismDropped = true;
          el('hint').textContent = 'Wisp dazzled! Grab the glowing prism for +4 crystals!';
        }
        wisp.stunned = Math.max(wisp.stunned, 1.8);
      }
    }
    let dx = Number(!!(keys.d || keys.arrowright)) - Number(!!(keys.a || keys.arrowleft));
    let dy = Number(!!(keys.s || keys.arrowdown)) - Number(!!(keys.w || keys.arrowup));
    if ((dx || dy) && !roverFreeze) {
      const length = Math.hypot(dx, dy); dx /= length; dy /= length;
      if (dx) rover.facing = Math.sign(dx);
      rover.heading = Math.atan2(dy, dx);
      const step = Math.min((overdrive > 0 ? 525 : 350) * dt, 25);
      // Independent axes let the rover slide around rock rather than stick.
      for (const [axis, amount] of [['x', dx * step], ['y', dy * step]]) {
        const nx = rover.x + (axis === 'x' ? amount : 0), ny = rover.y + (axis === 'y' ? amount : 0);
        const section = sectionAt(rover.y);
        if (axis === 'y' && amount > 0 && !section?.charged && ny >= section.index * LEVEL + 765) { el('hint').textContent = 'Explore a cave and answer four questions to drill deeper.'; continue; }
        const lookX = nx + (axis === 'x' ? Math.sign(amount) * 16 : 0);
        const lookY = ny + (axis === 'y' ? Math.sign(amount) * 16 : 0);
        const terrain = tileAt(lookX, lookY);
        if (terrain === 'rock' || terrain === 'stone') continue;
        if (terrain === 'dirt') carve(lookX, lookY);
        rover[axis] += amount;
      }
      if (overdrive > 0) dust.push({ x: rover.x, y: rover.y, vx: (Math.random() - .5) * 25, vy: (Math.random() - .5) * 25, life: .45, overdrive: true });
      if (Math.floor(rover.y / LEVEL) + 1 > layer) {
        const previous = sections[layer - 1];
        const earned = previous?.bonusSeconds > 0;
        if (earned) crystals += 10;
        layer = Math.floor(rover.y / LEVEL) + 1;
        generate(layer); banner = 2.3; bannerReward = earned;
        el('hint').textContent = earned ? 'Quick descent! +10 crystals · New caves ahead' : 'Layer ' + layer + ' · New caves ahead';
      }
      hud();
    }
    if (!roverFreeze) for (const wisp of currentSection?.wisps || []) {
      if (wisp.prism && Math.hypot(rover.x - wisp.prism.x, rover.y - wisp.prism.y) < 48) {
        crystals += 4; wisp.prism = null; banner = 1.4;
        el('hint').textContent = 'PRISM SNATCH! +4 crystals · Keep digging!';
        hud();
      }
    }
    camera += (Math.max(0, rover.y - 295) - camera) * Math.min(1, dt * 6);
    const active = sectionAt(rover.y);
    nearCave = active?.caves.find((c) => !c.lit && Math.hypot(c.x - rover.x, c.y - rover.y) < 110);
    canvas.style.cursor = nearCave ? 'pointer' : 'default';
    if (roverFreeze) el('hint').textContent = 'Wisp collision! −1 crystal · Both frozen for ' + Math.ceil(roverFreeze) + ' seconds.';
    else if (nearCave) el('hint').textContent = 'Cave entrance nearby · Press Space or ENTER';
    else if (active?.wisps.some((wisp) => wisp.prism)) el('hint').textContent = 'Glowing prism nearby! Grab it before it fades · +4 crystals';
    else if (overdrive > 0) el('hint').textContent = 'OVERDRIVE! Dig fast for extra crystals in the dirt.';
    else if (active && !active.charged && rover.y < active.index * LEVEL + 740) el('hint').textContent = 'Hold WASD / arrows to drill · Find a cave below';
    for (const p of dust) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
    dust = dust.filter((p) => p.life > 0).slice(-130);
    banner = Math.max(0, banner - dt);
  }
  function enter(target) {
    if (mode !== 'explore' || roverFreeze) return;
    const sec = sectionAt(rover.y);
    const cave = target ? (sec?.caves.includes(target) && !target.lit && Math.hypot(target.x - rover.x, target.y - rover.y) < 130 ? target : null)
      : sec?.caves.find((v) => !v.lit && Math.hypot(v.x - rover.x, v.y - rover.y) < 110);
    if (!cave) return;
    mode = 'cave';
    const names = { crystals: 'Crystal Grotto', shadows: 'Glowmist Cavern', guardian: 'Stone Guardian', mechanism: 'Ancient Mechanism', jewel: 'Buried Jewel Chamber' };
    const runeOrder = cave.kind === 'guardian' ? shuffle([1, 2, 3, 4]) : [];
    if (runeOrder.every((number, index) => number === index + 1)) [runeOrder[0], runeOrder[1]] = [runeOrder[1], runeOrder[0]];
    const instructions = {
      crystals: 'Mine the large crystal vein with five taps.',
      shadows: 'Sweep your light through the cavern. You can also tap each glowing spot.',
      guardian: 'Wake the guardian runes in this order: ' + runeOrder.join(' → ') + '.',
      mechanism: 'Turn each ring until its symbol points upward.',
      jewel: 'Break four patches of loose rock to uncover the hidden jewel!',
    };
    show('<div id="targets" class="' + cave.kind + '">' + (cave.kind === 'shadows' ? '<div id="beam"></div>' : '') + '</div><div class="caveHeader"><small>CAVE DISCOVERED · LAYER ' + layer + '</small><h2>' + names[cave.kind] + '</h2><p>' + instructions[cave.kind] + '</p></div><p id="count" class="caveStatus" role="status">Explore the cave!</p>');
    panel.className = 'panel cave-panel';
    let count = 0;
    const field = el('targets');
    function complete() { if (cave.lit) return; cave.lit = true; crystals += cave.kind === 'jewel' ? 12 : cave.kind === 'crystals' ? 5 : 3; hud(); el('count').textContent = cave.kind === 'jewel' ? 'Hidden jewel found! +12 crystals' : 'Cave explored! Drill recharge ahead.'; setTimeout(() => { burst = 0; burstCorrect = 0; ask(); }, 650); }
    function button(text, label, className, x, y, click) {
      const b = document.createElement('button'); b.className = className; b.textContent = text;
      b.style.left = x + '%'; b.style.top = y + '%'; b.setAttribute('aria-label', label);
      b.onclick = click; field.appendChild(b); return b;
    }
    if (cave.kind === 'crystals') {
      const [x, y] = shuffle([[27, 42], [41, 55], [56, 37], [66, 53], [36, 38]])[0];
      const vein = button('◆', 'Mine crystal vein', 'target vein', x, y, () => {
        count++; vein.style.filter = 'brightness(' + (1 + count * .18) + ')'; vein.textContent = count >= 5 ? '✦' : '◆';
        el('count').textContent = 'Crystal vein · ' + Math.min(5, count) + ' / 5 strikes';
        if (count >= 5) complete();
      });
    } else if (cave.kind === 'jewel') {
      const rubbleSpots = shuffle(Array.from({ length: 9 }, (_, i) => [20 + (i % 3) * 27, 31 + Math.floor(i / 3) * 17]));
      for (let i = 0; i < 9; i++) {
        const [x, y] = rubbleSpots[i];
        const rubble = button('▰', 'Dig loose rock ' + (i + 1), 'target rubble', x + (Math.random() - .5) * 6, y + (Math.random() - .5) * 6, () => {
          if (rubble.classList.contains('done')) return;
          rubble.classList.add('done'); count++; el('count').textContent = 'Loose rock cleared · ' + count + ' / 4';
          if (count >= 4) { const gem = document.createElement('span'); gem.className = 'treasure'; gem.textContent = '◆'; field.appendChild(gem); complete(); }
        });
      }
    } else if (cave.kind === 'mechanism') {
      const turns = shuffle([1, 2, 3]);
      // One ring in each column keeps every layout reachable on small screens.
      const ringSpots = [shuffle([[17, 41], [18, 56]])[0], shuffle([[42, 54], [42, 38]])[0], shuffle([[68, 41], [68, 55]])[0]];
      for (let i = 0; i < 3; i++) {
        let rotated = 0;
        const ring = button('▲', 'Turn ring ' + (i + 1), 'target dial', ringSpots[i][0], ringSpots[i][1], () => {
          if (ring.classList.contains('done')) return;
          rotated++; ring.style.transform = 'rotate(' + (360 - turns[i] * 90 + rotated * 90) + 'deg)';
          if (rotated === turns[i]) { ring.classList.add('done'); count++; el('count').textContent = 'Stone rings aligned · ' + count + ' / 3'; if (count === 3) complete(); }
        });
        ring.style.transform = 'rotate(' + (360 - turns[i] * 90) + 'deg)';
      }
    } else {
      const spots = shuffle([[15, 39], [36, 57], [62, 35], [80, 52], [24, 60], [45, 37], [67, 59], [78, 36]]).slice(0, 4);
      for (let i = 0; i < 4; i++) {
        const glow = button(cave.kind === 'guardian' ? String(i + 1) : '✦', 'Reveal cave light ' + (i + 1), 'target' + (cave.kind === 'guardian' ? ' rune' : ''), spots[i][0], spots[i][1], () => {
          if (glow.classList.contains('done') || (cave.kind === 'guardian' && runeOrder[count] !== i + 1)) return;
          glow.classList.add('done'); count++; el('count').textContent = cave.kind === 'guardian' ? 'Guardian runes · ' + count + ' / 4' : 'Hidden lights found · ' + count + ' / 4';
          if (count === 4) complete();
        });
      }
    }
    if (cave.kind === 'shadows') field.onpointermove = (e) => {
      const rect = field.getBoundingClientRect(), beam = el('beam');
      beam.style.left = e.clientX - rect.left + 'px'; beam.style.top = e.clientY - rect.top + 'px';
      field.style.setProperty('--bx', e.clientX - rect.left + 'px'); field.style.setProperty('--by', e.clientY - rect.top + 'px');
      for (const point of field.children) { if (!point.classList?.contains('target') || point.classList.contains('done')) continue; const p = point.getBoundingClientRect(); if (Math.hypot(e.clientX - p.left - p.width / 2, e.clientY - p.top - p.height / 2) < 50) point.click(); }
    };
  }
  function next() { if (!queue.length) queue = questions.nextPool(bank.length ? bank : questions.build({ sortBins: demo() }), last); current = queue.pop(); last = String(current.id); return current; }
  function ask() {
    if (mode === 'recap') return;
    if (remaining <= 0) return finish();
    panel.className = 'panel';
    mode = 'question'; next(); startedAt = performance.now(); questionAt = startedAt + teacher.questionSeconds * 1000; current.answered = false;
    show('<small>DRILL RECHARGE · QUESTION ' + (burst + 1) + ' OF 4 <span id="qt" style="float:right"></span></small><h2>' + copy(current.prompt) + '</h2><div class="options" id="choices"></div><p id="feedback" class="answer-feedback" role="status">Correct answers find two extra crystals.</p>');
    el('qt').textContent = teacher.questionSeconds ? time(teacher.questionSeconds) : 'NO TIMER';
    if (current.type === 'classification') { current.placements = {}; current.index = 0; renderClassification(); return; }
    shuffle(current.choices).forEach((ch) => { const b = document.createElement('button'); b.className = 'choice'; b.textContent = ch.label; b.onclick = () => answer(ch.id, b); el('choices').appendChild(b); });
  }
  function renderClassification(selectedButton) {
    if (current.index >= current.items.length) { answer(current.placements, selectedButton); return; }
    const item = current.items[current.index]; el('choices').innerHTML = '';
    const p = document.createElement('p'); p.style.gridColumn = '1 / -1'; p.textContent = (current.index + 1) + ' / ' + current.items.length + ' · ' + item.text; el('choices').appendChild(p);
    current.categories.forEach((cat) => { const b = document.createElement('button'); b.className = 'choice'; b.textContent = cat.label; b.onclick = () => { current.placements[item.id] = cat.id; current.index++; renderClassification(b); }; el('choices').appendChild(b); });
  }
  function answer(chosen, selectedButton) {
    if (!current || current.answered) return;
    current.answered = true; const right = questions.isCorrect(current, chosen);
    answers.push({ type: current.type, itemId: ['sort_bins', 'classification'].includes(current.type) ? current.id : undefined, questionId: current.id, wordId: current.wordId, prompt: current.prompt, choiceId: chosen, correct: right, responseTimeMs: Math.round(performance.now() - startedAt) });
    if (right) { crystals += 2; burstCorrect++; }
    burst++; hud();
    const feedback = el('feedback');
    if (chosen == null) feedback.textContent = 'Time is up.';
    else if (right) feedback.innerHTML = 'Correct! <strong class="crystal-reward">✦ +2 crystals</strong>';
    else feedback.textContent = current.explanation || 'Keep digging. You will see another question.';
    if (selectedButton) selectedButton.classList.add(right ? 'correct' : 'incorrect');
    el('choices').querySelectorAll('button').forEach((b) => { b.disabled = true; }); finishAt = performance.now() + 1200;
  }
  function practiceFacts() {
    const grouped = new Map();
    for (const a of answers) {
      const key = a.wordId ? 'word:' + a.wordId : a.type + ':' + a.questionId;
      if (!grouped.has(key)) grouped.set(key, { label: (a.wordId && wordLabels.get(String(a.wordId))) || a.prompt || String(a.questionId), misses: 0, attempts: 0, totalMs: 0 });
      const fact = grouped.get(key); fact.attempts++; fact.misses += Number(!a.correct); fact.totalMs += a.responseTimeMs;
    }
    return [...grouped.values()].sort((a, b) => b.misses - a.misses || b.totalMs / b.attempts - a.totalMs / a.attempts).slice(0, 3).map((fact) => fact.label);
  }
  function saveResult() {
    const payload = { reason: 'completed', answers: answers.slice(), layer,
      crystals: bankedCrystals, crystalsCollected: crystals, crystalsBanked: bankedCrystals, spinAwards: spinAwards.slice(),
      correctCount: answers.filter((a) => a.correct).length, attempted: answers.length,
      percentCorrect: answers.length ? Math.round(100 * answers.filter((a) => a.correct).length / answers.length) : 0,
      practiceFacts: practiceFacts() };
    const result = done ? Promise.resolve().then(() => done(payload)) : Promise.resolve();
    result.catch(console.error).finally(() => { el('again').disabled = false; el('again').textContent = 'Dive again'; el('again').onclick = start; });
  }
  function spin() {
    if (mode !== 'recap' || spinsLeft <= 0 || el('spin').disabled) return;
    const prepared = preparedSpins?.[spinAwards.length];
    const index = prepared ? prepared.index : Math.floor(Math.random() * SPIN_MULTIPLIERS.length);
    const award = prepared ? prepared.award : crystals ? Math.max(1, Math.round(crystals * SPIN_MULTIPLIERS[index])) : 0;
    el('spin').disabled = true; el('spinStatus').textContent = 'Spinning…';
    spinRotation += 1800 + (360 - index * 60 - spinRotation % 360 + 360) % 360;
    el('wheel').style.transform = 'rotate(' + spinRotation + 'deg)';
    setTimeout(() => {
      spinAwards.push(award); bankedCrystals += award; spinsLeft--;
      el('banked').textContent = String(bankedCrystals);
      el('spinStatus').textContent = '✦ +' + award + ' crystals! ' + (spinsLeft ? 'One more spin!' : 'Award complete!');
      if (spinsLeft) { el('spin').disabled = false; el('spin').textContent = 'Spin again'; }
      else { el('spin').hidden = true; saveResult(); }
    }, 3600);
  }
  function finish() {
    if (mode === 'recap') return;
    mode = 'recap'; spinsLeft = answers.length && answers.every((a) => a.correct) ? 2 : 1;
    const correct = answers.filter((a) => a.correct).length;
    const percent = answers.length ? Math.round(correct * 100 / answers.length) : 0;
    const facts = practiceFacts();
    const practice = facts.length ? '<ol class="practice-list">' + facts.map((f) => '<li>' + copy(f) + '</li>').join('') + '</ol>' : '<p>No questions answered yet.</p>';
    const wheel = SPIN_MULTIPLIERS.map((m, i) => '<span class="spinner-slice" style="transform:translate(-50%,-50%) rotate(' + i * 60 + 'deg) translateY(-74px) rotate(' + -i * 60 + 'deg)">+' + (crystals ? Math.max(1, Math.round(crystals * m)) : 0) + '</span>').join('');
    panel.className = 'panel recap-panel';
    show('<div class="recap-heading"><small>✦ SOLARA · FLIGHT DECK · LAYER ' + layer + '</small><h1>Expedition complete!</h1><p>Welcome back, explorer. Your crystals are ready for the ship’s prize console.</p></div>' +
      '<div class="recap-body"><div class="recap-grid"><div class="recap-card"><h2>MISSION ACCURACY</h2><strong id="resultPercent">' + percent + '% correct</strong><div id="resultCorrect">' + correct + ' of ' + answers.length + ' correct</div></div>' +
      '<div class="recap-card"><h2>CRYSTALS FOUND</h2><strong id="resultCollected">✦ ' + crystals + '</strong><div>Your spin decides what you bank.</div></div>' +
      '<div class="recap-card practice-card"><h2 id="practiceTitle">' + (correct === answers.length && answers.length ? 'No misses! Keep these facts sharp' : 'Three facts to practice') + '</h2><div id="practiceFacts">' + practice + '</div></div></div>' +
      '<div class="spinner-area"><div class="console-label">✦ SHIP’S CRYSTAL CONSOLE</div><div class="spinner-wrap"><div class="spinner-pointer"></div><div id="wheel" class="spinner-wheel" role="img" aria-label="Crystal prize wheel with six possible awards">' + wheel + '</div></div>' +
      '<p id="spinStatus" class="spinner-message" role="status">' + (spinsLeft === 2 ? 'Perfect run! You earned two spins.' : 'Spin to reveal your crystal award.') + '</p><button class="primary" id="spin">✦ Spin for crystals</button><div class="spinner-prize">BANKED TO YOUR ACCOUNT <strong id="banked">0</strong></div></div></div>' +
      '<button class="primary recap-again" id="again" disabled>Finish your spin first</button>');
    el('spin').onclick = spin; hud();
    if (prepare) {
      el('spin').disabled = true; el('spinStatus').textContent = 'Preparing your crystal wheel…';
      const requestAward = () => Promise.resolve().then(() => prepare({ answers: answers.slice(), layer, crystalsCollected: crystals }))
        .then((result) => {
          if (mode !== 'recap') return;
          if (!Array.isArray(result?.spins) || ![1, 2].includes(result.spins.length) || result.spins.some((s) => !Number.isInteger(s.index) || s.index < 0 || s.index >= SPIN_MULTIPLIERS.length || !Number.isInteger(s.award) || s.award < 0)) throw Error('The crystal wheel could not be prepared.');
          spinsLeft = result.spins.length;
          const total = Number(result.crystalsCollected);
          if (Number.isInteger(total) && total >= 0) {
            el('resultCollected').textContent = '✦ ' + total;
            el('wheel').innerHTML = SPIN_MULTIPLIERS.map((m, i) => '<span class="spinner-slice" style="transform:translate(-50%,-50%) rotate(' + i * 60 + 'deg) translateY(-74px) rotate(' + -i * 60 + 'deg)">+' + (total ? Math.max(1, Math.round(total * m)) : 0) + '</span>').join('');
          }
          if (Number.isInteger(result.percentCorrect)) el('resultPercent').textContent = result.percentCorrect + '% correct';
          if (Number.isInteger(result.correctCount) && Number.isInteger(result.attempted)) el('resultCorrect').textContent = result.correctCount + ' of ' + result.attempted + ' correct';
          if (Array.isArray(result.practiceFacts)) {
            el('practiceTitle').textContent = result.attempted && result.correctCount === result.attempted ? 'No misses! Keep these facts sharp' : 'Three facts to practice';
            el('practiceFacts').innerHTML = result.practiceFacts.length ? '<ol class="practice-list">' + result.practiceFacts.map((f) => '<li>' + copy(f) + '</li>').join('') + '</ol>' : '<p>No questions answered yet.</p>';
          }
          preparedSpins = result.spins;
          el('spin').disabled = false;
          el('spin').textContent = 'Spin the crystal wheel'; el('spin').onclick = spin;
          el('spinStatus').textContent = spinsLeft === 2 ? 'Perfect run! You earned two spins.' : 'Spin to reveal your crystal award.';
        }).catch((error) => {
          if (mode !== 'recap') return;
          el('spinStatus').textContent = error?.message || 'Could not save your run. Try again.';
          el('spin').disabled = false; el('spin').textContent = 'Try saving again'; el('spin').onclick = () => { el('spin').disabled = true; requestAward(); };
        });
      requestAward();
    }
  }
  function tick(t) {
    const dt = Math.max(0, Math.min(.05, (t - (previousFrame || t)) / 1000)); previousFrame = t;
    if (mode !== 'intro' && mode !== 'recap') {
      remaining = Math.max(0, (endAt - t) / 1000);
      if (mode === 'question') {
        if (teacher.questionSeconds && current && !current.answered) { const q = Math.max(0, (questionAt - t) / 1000); if (el('qt')) el('qt').textContent = time(q); if (q <= 0) answer(null); }
        if (current?.answered && t >= finishAt) {
          if (remaining <= 0) finish();
          else if (burst < 4) ask();
          else { sectionAt(rover.y).charged = true; mode = 'explore'; hide(); if (burstCorrect === 4) overdrive = 8; hud(); el('hint').textContent = burstCorrect === 4 ? 'PERFECT RECHARGE! Overdrive for 8 seconds.' : 'Drill charged! Descend for the bonus or explore another cave.'; }
        }
      } else if (remaining <= 0) finish();
      else if (mode === 'explore') navigate(dt);
      hud();
    }
    requestAnimationFrame(tick);
  }
  function renderCave(c, sy, t, tint) {
    const distance = Math.hypot(c.x - rover.x, c.y - rover.y);
    const dx = c.x - rover.x, dy = c.y - rover.y;
    const facing = dx * Math.cos(rover.heading) + dy * Math.sin(rover.heading);
    const visible = distance < 200 && facing > -30;
    const light = c.lit ? 1 : visible ? Math.max(.12, 1 - distance / 240) : 0;
    g.save(); g.translate(c.x, sy);
    // A dark recess cut into the soil, with an irregular rock lip rather than a doorway.
    g.fillStyle = tint; g.globalAlpha = .68;
    g.beginPath();
    for (let i = 0; i <= 24; i++) {
      const a = i * Math.PI * 2 / 24;
      const ripple = 1 + .07 * Math.sin(i * 4.2 + c.seed) + .04 * Math.cos(i * 2.1 + c.seed);
      const x = Math.cos(a) * 106 * ripple, y = Math.sin(a) * 78 * ripple;
      if (!i) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.closePath(); g.fill(); g.globalAlpha = 1;
    const hollow = g.createRadialGradient(8, 8, 6, 0, 0, 88);
    hollow.addColorStop(0, c.lit ? '#1e6686' : light ? '#243c4c' : '#09121e');
    hollow.addColorStop(.72, c.lit ? '#13344f' : '#0d1828');
    hollow.addColorStop(1, '#2a2833');
    g.fillStyle = hollow;
    g.beginPath();
    for (let i = 0; i <= 24; i++) {
      const a = i * Math.PI * 2 / 24;
      const ripple = 1 + .12 * Math.sin(i * 3.7 + c.seed);
      const x = Math.cos(a) * 84 * ripple, y = Math.sin(a) * 57 * ripple;
      if (!i) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.closePath(); g.fill();
    if (cavernArt.complete && cavernArt.naturalWidth) {
      const crop = {
        crystals: [100, 40, 560, 430], jewel: [100, 40, 560, 430], shadows: [868, 40, 560, 430],
        guardian: [100, 552, 560, 430], mechanism: [868, 552, 560, 430],
      }[c.kind];
      g.save(); g.clip();
      g.drawImage(cavernArt, ...crop, -94, -73, 188, 146);
      g.fillStyle = c.lit ? '#081c3155' : light ? '#071425b0' : '#07101ce9';
      g.fillRect(-102, -80, 204, 160);
      g.restore();
    }
    // Jagged overhangs and mineral seams belong to the terrain around the hollow.
    g.fillStyle = tint;
    for (const [x, y, size] of [[-76, -48, 19], [-28, -62, 25], [23, -63, 17], [69, -38, 22]]) {
      g.beginPath(); g.moveTo(x - size, y - 12); g.lineTo(x + size, y - 11); g.lineTo(x + size * .3, y + size); g.lineTo(x, y + size * 1.4); g.closePath(); g.fill();
    }
    g.fillStyle = c.lit ? '#9beafe' : light ? '#8297a0' : '#48505b';
    g.globalAlpha = c.lit ? 1 : Math.max(.32, light);
    for (const [x, y, h] of [[-71, 19, 25], [-45, 37, 32], [53, 32, 28]]) {
      g.beginPath(); g.moveTo(x - 10, y + 14); g.lineTo(x, y - h); g.lineTo(x + 11, y + 14); g.fill();
    }
    g.globalAlpha = 1;
    if (c.lit) {
      g.shadowColor = '#7ef8ff'; g.shadowBlur = 23;
      g.fillStyle = c.kind === 'jewel' ? '#ffeaa2' : '#a5fbff'; g.beginPath(); g.moveTo(0, -30); g.lineTo(17, 0); g.lineTo(0, 31); g.lineTo(-16, 0); g.closePath(); g.fill();
    } else if (visible) {
      const beam = g.createRadialGradient(-dx * .15, -dy * .15, 5, 0, 0, 90);
      beam.addColorStop(0, '#a5edff66'); beam.addColorStop(1, '#a5edff00');
      g.fillStyle = beam; g.beginPath(); g.ellipse(0, 0, 84, 57, 0, 0, 7); g.fill();
    }
    if (distance < 115 && !c.lit && mode === 'explore') {
      g.fillStyle = '#e8faff'; g.font = 'bold 15px system-ui'; g.textAlign = 'center';
      g.fillText('SPACE · EXPLORE', 0, -94);
    }
    g.restore();
  }
  function renderRover(t) {
    const x = rover.x, y = rover.y - camera;
    const moving = mode === 'explore' && Object.keys(keys).some((k) => keys[k]);
    g.save(); g.translate(x, y);
    g.shadowColor = '#8be8f4'; g.shadowBlur = 20;
    // Broad forward lamp follows the most recent movement direction.
    g.save(); g.rotate(rover.heading);
    const beam = g.createRadialGradient(40, 0, 6, 150, 0, 220);
    beam.addColorStop(0, '#b9faffaa'); beam.addColorStop(.45, '#79dffb47'); beam.addColorStop(1, '#9be8ff00');
    g.fillStyle = beam; g.beginPath(); g.moveTo(18, 0); g.lineTo(245, -120); g.lineTo(245, 120); g.fill(); g.restore();
    // Treads and small animated teeth make direction and digging legible.
    g.fillStyle = '#172638'; g.strokeStyle = '#8da8b1'; g.lineWidth = 4;
    for (const yy of [-20, 20]) { g.beginPath(); g.roundRect(-33, yy - 8, 66, 16, 8); g.fill(); g.stroke(); }
    g.shadowBlur = 8; g.fillStyle = '#f0ca77'; g.strokeStyle = '#fff0b8'; g.lineWidth = 3;
    g.beginPath(); g.roundRect(-29, -20, 58, 40, 12); g.fill(); g.stroke();
    g.fillStyle = '#27627c'; g.beginPath(); g.roundRect(-20, -15, 35, 30, 9); g.fill();
    g.fillStyle = '#8ff5ff'; g.beginPath(); g.ellipse(-3, -1, 10, 11, 0, 0, 7); g.fill();
    g.save(); g.rotate(rover.heading);
    g.fillStyle = '#f5d598'; g.strokeStyle = '#715357'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(26, -13); g.lineTo(47, -9); g.lineTo(59, 0); g.lineTo(47, 9); g.lineTo(26, 13); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = '#a16c5b'; g.beginPath(); g.moveTo(39, -10); g.lineTo(45, 7); g.moveTo(49, -7); g.lineTo(53, 3); g.stroke();
    g.fillStyle = '#c8ffff'; g.shadowBlur = 15; g.beginPath(); g.arc(26, 0, 5 + (moving ? Math.sin(t * .018) : 0), 0, 7); g.fill(); g.restore();
    g.restore();
  }
  function renderWisp(w, t) {
    const y = w.y - camera;
    g.save(); g.translate(w.x, y);
    g.shadowColor = w.frozen || w.stunned ? '#a1fcff' : '#9462e8'; g.shadowBlur = w.frozen || w.stunned ? 26 : 18;
    if (wispArt.complete && wispArt.naturalWidth) {
      const sway = Math.sin(t * .005 + w.phase) * .06;
      g.rotate(sway);
      if (w.stunned || w.frozen) { g.filter = 'hue-rotate(100deg) brightness(1.4)'; g.globalAlpha = w.frozen ? .9 : .66; }
      g.drawImage(wispArt, -57, -39, 114, 81);
    } else {
      // Keep the threat visible while the illustrated sprite is loading.
      g.fillStyle = w.stunned ? '#a1fcff' : '#9462e8';
      g.beginPath(); g.moveTo(-38, -15); g.lineTo(-8, 0); g.lineTo(0, -27);
      g.lineTo(10, 0); g.lineTo(38, -15); g.lineTo(12, 14);
      g.lineTo(0, 28); g.lineTo(-12, 14); g.closePath(); g.fill();
    }
    g.restore();
  }
  function renderPrism(prism, t) {
    const glow = .7 + .3 * Math.sin(t * .012);
    g.save(); g.translate(prism.x, prism.y - camera);
    g.globalAlpha = Math.min(1, prism.life * 2);
    g.strokeStyle = '#b9faff'; g.lineWidth = 4; g.shadowColor = '#5dfaff'; g.shadowBlur = 28;
    g.beginPath(); g.arc(0, 0, 28 + glow * 5, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#7af8fa'; g.beginPath(); g.moveTo(0, -23); g.lineTo(17, 0); g.lineTo(0, 23); g.lineTo(-17, 0); g.closePath(); g.fill();
    g.fillStyle = '#fff4b8'; g.font = 'bold 18px system-ui'; g.textAlign = 'center'; g.fillText('+4', 0, -36);
    g.restore();
  }
  function render(t) {
    g.fillStyle = '#152239'; g.fillRect(0, 0, WIDTH, HEIGHT);
    if (scenery.complete && scenery.naturalWidth) {
      if (camera < 720) g.drawImage(scenery, 0, -camera, WIDTH, 720);
      // Underground scenery repeats with an offset so layer transitions cannot reset the viewport.
      const first = Math.floor(camera / 720) * 720;
      for (let y = first; y < camera + HEIGHT + 720; y += 720) if (y > 0) g.drawImage(scenery, 0, 235, 1672, 706, 0, y - camera, WIDTH, 720);
    }
    const min = Math.max(0, Math.floor(camera / LEVEL)), max = Math.floor((camera + HEIGHT) / LEVEL) + 1;
    for (let i = min; i <= max; i++) {
      const sec = sections[i]; if (!sec) continue;
      if (i > 0) { g.fillStyle = sec.tint + '56'; g.fillRect(0, i * LEVEL - camera, WIDTH, LEVEL); }
      const low = Math.max(0, Math.floor((camera - i * LEVEL) / CELL) - 1), high = Math.min(22, Math.ceil((camera + HEIGHT - i * LEVEL) / CELL) + 1);
      for (let row = low; row <= high; row++) for (let col = 0; col < 32; col++) {
        const tile = sec.cells[row]?.[col]; if (!tile || tile === 'air') continue;
        const x = col * CELL, y = i * LEVEL + row * CELL - camera;
        if (tile === 'rock' || tile === 'stone') {
          g.fillStyle = '#1b2536'; g.fillRect(x, y, 41, 41);
          g.fillStyle = tile === 'rock' ? '#48556b' : '#67566a'; g.fillRect(x + 3, y + 3, 35, 35);
          g.strokeStyle = '#a2b4c0'; g.lineWidth = 2;
          g.beginPath(); g.moveTo(x + 5, y + 32); g.lineTo(x + 5, y + 7); g.lineTo(x + 15, y + 4); g.stroke();
          g.strokeStyle = '#233348'; g.beginPath(); g.moveTo(x + 17, y + 11); g.lineTo(x + 25, y + 18); g.lineTo(x + 20, y + 29); g.lineTo(x + 32, y + 35); g.stroke();
          g.fillStyle = '#d4e0df'; g.fillRect(x + 29, y + 9, 4, 3);
          continue;
        }
        g.fillStyle = sec.tint + '66'; g.fillRect(x, y, 41, 41);
        if (tile === 'dirt' && (row + col) % 3 === 0) { g.fillStyle = '#ffd69a30'; g.fillRect(x + 7, y + 14, 16, 3); }
      }
      const barrierY = i * LEVEL + 770 - camera;
      if (!sec.charged && barrierY > -20 && barrierY < HEIGHT + 20) {
        g.fillStyle = '#1b455eaa'; g.fillRect(40, barrierY, WIDTH - 80, 15);
        g.fillStyle = '#8aebf7'; g.font = 'bold 17px system-ui'; g.textAlign = 'center'; g.fillText('DRILL POWER NEEDED ↓', 640, barrierY - 12);
      }
      for (const c of sec.caves) if (c.y - camera > -110 && c.y - camera < HEIGHT + 110) renderCave(c, c.y - camera, t, sec.tint);
      for (const w of sec.wisps) if (w.y - camera > -50 && w.y - camera < HEIGHT + 50) renderWisp(w, t);
      for (const w of sec.wisps) if (w.prism && w.prism.y - camera > -70 && w.prism.y - camera < HEIGHT + 70) renderPrism(w.prism, t);
    }
    for (const p of dust) { g.globalAlpha = Math.min(1, p.life * 1.5); g.fillStyle = p.overdrive ? '#c7fffc' : '#ffdca9'; g.fillRect(p.x - 3, p.y - camera - 3, p.overdrive ? 11 : 6, p.overdrive ? 11 : 6); } g.globalAlpha = 1;
    renderRover(t);
    if (hitFlash) {
      g.fillStyle = '#aa81fb33'; g.fillRect(0, 0, WIDTH, HEIGHT);
      if (roverFreeze) { g.fillStyle = '#f5dcff'; g.font = 'bold 26px system-ui'; g.textAlign = 'center'; g.fillText('−1 CRYSTAL · FROZEN ' + Math.ceil(roverFreeze) + 's', rover.x, rover.y - camera - 60); }
    }
    if (banner) { g.fillStyle = '#10364cdb'; g.fillRect(365, 42, 550, 66); g.fillStyle = '#dffaff'; g.font = 'bold 28px system-ui'; g.textAlign = 'center'; g.fillText(bannerReward ? 'LAYER ' + layer + ' · +10 CRYSTALS!' : 'LAYER ' + layer + ' · DEEPER INTO SOLARA', 640, 86); }
    requestAnimationFrame(render);
  }
  window.addEventListener('keydown', (e) => { const k = e.key.toLowerCase(); if (['arrowleft', 'arrowright', 'arrowup', 'arrowdown', ' ', 'enter', 'w', 'a', 's', 'd'].includes(k)) e.preventDefault(); keys[k] = true; if (k === ' ' || k === 'enter') enter(); });
  window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });
  window.addEventListener('blur', () => { keys = {}; });
  canvas.addEventListener('pointerdown', (e) => {
    if (mode !== 'explore') return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * WIDTH / rect.width;
    const y = (e.clientY - rect.top) * HEIGHT / rect.height + camera;
    const cave = sectionAt(rover.y)?.caves.find((c) => !c.lit && Math.hypot(c.x - x, c.y - y) < 100);
    if (cave) { if (Math.hypot(cave.x - rover.x, cave.y - rover.y) < 130) enter(cave); else el('hint').textContent = 'Drive a little closer to explore this cave.'; }
  });
  document.querySelectorAll('[data-key]').forEach((b) => { b.onpointerdown = (e) => { e.preventDefault(); b.setPointerCapture(e.pointerId); if (b.dataset.key === 'enter') enter(); else keys[b.dataset.key] = true; }; b.onpointerup = b.onpointercancel = () => { keys[b.dataset.key] = false; }; });
  window.CrystalDive = Object.freeze({
    setQuestionBank(v) { if (mode !== 'intro' && mode !== 'recap') throw Error('Load bank before play.'); bank = questions.build(v); wordLabels = new Map((v?.words || []).map((w) => [String(w.id), w.word])); intro(); },
    configure(v) { if (mode !== 'intro' && mode !== 'recap') throw Error('Configure before play.'); if (v.sessionMinutes != null) { if (![5, 10, 15, 20].includes(v.sessionMinutes)) throw RangeError('Session length must be 5, 10, 15 or 20 minutes.'); teacher.sessionMinutes = v.sessionMinutes; } if (v.questionSeconds != null) { if (![0, 5, 8, 10, 15, 20, 30].includes(v.questionSeconds)) throw RangeError('Invalid question timer.'); teacher.questionSeconds = v.questionSeconds; } },
    onComplete(fn) { done = fn; }, start,
    onPrepare(fn) { prepare = fn; },
    getSnapshot() { return { mode, layer, cameraY: Math.round(camera), roverX: Math.round(rover.x), roverY: Math.round(rover.y), cavePositions: sectionAt(rover.y)?.caves.map((c) => ({ x: Math.round(c.x), y: Math.round(c.y), kind: c.kind, lit: c.lit })) || [], wispCount: sectionAt(rover.y)?.wisps.length || 0, wisps: sectionAt(rover.y)?.wisps.map((w) => ({ x: Math.round(w.x), y: Math.round(w.y), frozenSeconds: w.frozen, prism: w.prism ? { x: Math.round(w.prism.x), y: Math.round(w.prism.y), seconds: w.prism.life } : null })) || [], freezeSeconds: roverFreeze, overdriveSeconds: overdrive, bonusSeconds: sectionAt(rover.y)?.bonusSeconds ?? 0, remainingSeconds: remaining, crystals, bankedCrystals, spinsLeft, answered: answers.length }; },
    getCapabilities() { return { questionBankItemTypes: ['sort_bins', 'vocabulary', 'classification'], vocabularyFormats: ['lock_signal', 'true_false', 'frequency_fill'], maxSessionMinutes: 20, questionBurst: 4 }; },
  });
  intro(); requestAnimationFrame(render); requestAnimationFrame(tick);
})();
