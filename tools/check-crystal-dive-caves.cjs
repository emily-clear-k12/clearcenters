const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const questions = require('../public/games/crystal-dive-questions.js');
let now = 0;
const elements = new Map();
function node(id) {
  if (elements.has(id)) return elements.get(id);
  const value = { id, textContent: '', style: { setProperty() {} }, children: [], hidden: false,
    classList: { values: new Set(), contains(name) { return this.values.has(name); }, add(name) { this.values.add(name); } },
    appendChild(child) { this.children.push(child); },
    querySelectorAll() { return this.children; }, setAttribute() {},
  };
  Object.defineProperty(value, 'innerHTML', { get() { return this.html || ''; }, set(html) { this.html = html; this.children = []; } });
  elements.set(id, value); return value;
}
const ctx = new Proxy({}, { get(_, key) { return key === 'createRadialGradient' ? () => ({ addColorStop() {} }) : () => {}; }, set() { return true; } });
node('map').getContext = () => ctx;
const listeners = {};
node('map').addEventListener = (name, fn) => { listeners['canvas:' + name] = fn; };
node('map').getBoundingClientRect = () => ({ left: 0, top: 0, width: 1280, height: 720 });
const sandbox = {
  window: { CrystalDiveQuestions: questions, addEventListener(name, fn) { listeners[name] = fn; } },
  document: { getElementById: node, createElement: () => node(Symbol()), querySelectorAll: () => [] },
  performance: { now: () => now }, requestAnimationFrame(fn) { if (fn.name === 'tick') sandbox.frame = fn; },
  setTimeout(fn) { sandbox.timeout = fn; }, Image: class { complete = false; naturalWidth = 0; }, console,
  Math: Object.assign(Object.create(Math), { random: () => 0.5 }), Promise,
};
vm.createContext(sandbox);
const engine = fs.readFileSync(path.join(__dirname, '../public/games/crystal-dive-engine.js'), 'utf8');
vm.runInContext(engine.replace('  intro(); requestAnimationFrame(render); requestAnimationFrame(tick);',
  '  window.__collisionProbe = () => ({ rover, sections }); window.__setCrystals = (value) => { crystals = value; }; window.__setAnswers = (value) => { answers = value; }; window.__finish = finish; intro(); requestAnimationFrame(render); requestAnimationFrame(tick);'), sandbox);
const game = sandbox.window.CrystalDive;
const fact = { id: 'seven-times-eight', prompt: 'What is 7 × 8?', bins: [{ id: '56', label: '56' }, { id: '49', label: '49' }], correctBinId: '56' };
game.setQuestionBank({ sortBins: [fact] }); game.configure({ sessionMinutes: 20, questionSeconds: 5 });
sandbox.Math.random = () => .15; // Include an early jewel while exercising the full cave loop.
game.start();
function frame() { now += 40; sandbox.frame(now); }
function drive(key, until, limit = 220) {
  listeners.keydown({ key, preventDefault() {} });
  for (let i = 0; i < limit && !until(game.getSnapshot()); i++) frame();
  listeners.keyup({ key });
  assert(until(game.getSnapshot()), 'Rover must reach destination using held controls: ' + JSON.stringify(game.getSnapshot()));
}
function solveCave(kind) {
  // The fake DOM keeps earlier cave buttons; a browser replaces them with each panel.
  const buttons = node('targets').children.filter((button) => typeof button.onclick === 'function').slice(-({ crystals: 1, jewel: 9, mechanism: 3, guardian: 4, shadows: 4 }[kind]));
  if (kind === 'crystals') for (let i = 0; i < 5; i++) buttons[0].onclick();
  else if (kind === 'jewel') buttons.slice(0, 4).forEach((button) => button.onclick());
  else if (kind === 'mechanism') for (const button of buttons) {
    for (let i = 0; i < 3 && !button.classList.contains('done'); i++) button.onclick();
  }
  else if (kind === 'guardian') {
    const order = node('panel').innerHTML.match(/order: ([\d →]+)\./)[1].match(/\d/g);
    for (const digit of order) buttons.find((button) => button.textContent === digit).onclick();
  } else buttons.forEach((button) => button.onclick());
}
const initial = game.getSnapshot();
const cave = initial.cavePositions.reduce((best, next) => Math.abs(next.x - initial.roverX) < Math.abs(best.x - initial.roverX) ? next : best);
drive(cave.x < initial.roverX ? 'a' : 'd', (s) => Math.abs(s.roverX - cave.x) < 25);
drive('s', (s) => Math.abs(s.roverY - cave.y) < 40);
assert(game.getSnapshot().cameraY > 0);
assert(game.getSnapshot().bonusSeconds < 18);
listeners.keydown({ key: ' ', preventDefault() {} });
assert.equal(game.getSnapshot().mode, 'cave');
const pausedBonus = game.getSnapshot().bonusSeconds;
for (let j = 0; j < 12; j++) frame();
assert.equal(game.getSnapshot().bonusSeconds, pausedBonus);
assert.equal(node('panel').className, 'panel cave-panel');
solveCave(cave.kind);
sandbox.timeout();
assert.equal(game.getSnapshot().mode, 'question');
assert.equal(node('panel').className, 'panel');
for (let i = 0; i < 4; i++) {
  const choice = node('choices').children.find((button) => button.textContent === (i === 1 ? '49' : '56'));
  choice.onclick();
  assert(choice.classList.contains(i === 1 ? 'incorrect' : 'correct'), 'selected answer should show its result');
  if (i === 0) assert.match(node('feedback').innerHTML, /crystal-reward.*\+2 crystals/);
  for (let j = 0; j < 31; j++) frame();
}
assert.equal(game.getSnapshot().mode, 'explore');
assert.equal(game.getSnapshot().answered, 4);
assert.equal(game.getSnapshot().overdriveSeconds, 0, 'one missed question prevents Overdrive');
assert(game.getSnapshot().cavePositions.some((c) => c.lit));
const second = initial.cavePositions.find((c) => c.x !== cave.x);
drive(second.x < game.getSnapshot().roverX ? 'a' : 'd', (s) => Math.abs(s.roverX - second.x) < 25);
drive('s', (s) => Math.abs(s.roverY - second.y) < 60);
listeners['canvas:pointerdown']({ clientX: second.x, clientY: second.y - game.getSnapshot().cameraY });
assert.equal(game.getSnapshot().mode, 'cave', 'second cave should remain enterable after the first recharge');
solveCave(second.kind);
sandbox.timeout();
for (let i = 0; i < 4; i++) {
  node('choices').children.find((button) => button.textContent === '56').onclick();
  for (let j = 0; j < 31; j++) frame();
}
assert.equal(game.getSnapshot().answered, 8);
assert(game.getSnapshot().overdriveSeconds > 7, 'four correct answers trigger Overdrive');
assert.equal(game.getSnapshot().cavePositions.filter((c) => c.lit).length, 2);
const oldX = game.getSnapshot().roverX, oldCamera = game.getSnapshot().cameraY;
const beforeCrystals = game.getSnapshot().crystals;
drive('s', (s) => s.layer === 2);
assert(game.getSnapshot().cameraY > oldCamera);
assert.equal(game.getSnapshot().roverX, oldX);
assert(game.getSnapshot().crystals - beforeCrystals >= 10, 'fast descent earns its bonus alongside any Overdrive finds');
assert.notDeepEqual(game.getSnapshot().cavePositions.map((c) => c.x), initial.cavePositions.map((c) => c.x));
assert.equal(game.getSnapshot().wispCount, 1);
const rare = game.getSnapshot().cavePositions.find((c) => c.kind === 'jewel');
assert(rare, 'this seeded run should offer an occasional third jewel cave');
drive(rare.x < game.getSnapshot().roverX ? 'a' : 'd', (s) => Math.abs(s.roverX - rare.x) < 25);
drive('s', (s) => Math.abs(s.roverY - rare.y) < 85);
const beforeJewel = game.getSnapshot().crystals;
listeners['canvas:pointerdown']({ clientX: rare.x, clientY: rare.y - game.getSnapshot().cameraY });
assert.equal(game.getSnapshot().mode, 'cave');
solveCave('jewel');
assert.equal(game.getSnapshot().crystals - beforeJewel, 12);
assert(game.getSnapshot().cavePositions.find((c) => c.kind === 'jewel').lit);
sandbox.timeout();
assert.equal(game.getSnapshot().mode, 'question');
game.start();
for (let i = 0; i < 470; i++) frame();
assert.equal(game.getSnapshot().bonusSeconds, 0);
assert.equal(game.getSnapshot().mode, 'explore', 'bonus expiration must not end the run');
sandbox.Math.random = () => .35;
game.start();
const cavePlan = sandbox.window.__collisionProbe().sections.slice(0, 2).flatMap((section, sectionIndex) =>
  section.caves.map((cave, caveIndex) => ({ kind: cave.kind, sectionIndex, caveIndex }))).filter((cave) => cave.kind !== 'jewel');
assert.equal(new Set(cavePlan.map((c) => c.kind)).size, 4, 'a shuffled set visits every cave encounter before repeating');
const firstLayout = game.getSnapshot().cavePositions.map((c) => [c.x, c.y, c.kind]);
sandbox.Math.random = () => .85;
game.start();
assert.notDeepEqual(game.getSnapshot().cavePositions.map((c) => [c.x, c.y, c.kind]), firstLayout, 'new runs rearrange cave entrances');
sandbox.Math.random = () => .35;
let guardianLayout;
for (const planned of cavePlan) {
  game.start();
  const state = sandbox.window.__collisionProbe();
  const target = state.sections[planned.sectionIndex].caves[planned.caveIndex];
  state.rover.x = target.x; state.rover.y = target.y;
  listeners.keydown({ key: ' ', preventDefault() {} });
  assert.equal(game.getSnapshot().mode, 'cave');
  if (target.kind === 'guardian') {
    const order = node('panel').innerHTML.match(/order: ([\d →]+)\./)[1].match(/\d/g);
    assert.notDeepEqual(order, ['1', '2', '3', '4'], 'guardian sequence is not the same predictable order');
    guardianLayout = node('targets').children.slice(-4).map((button) => [button.style.left, button.style.top]);
  }
  solveCave(target.kind);
  assert(target.lit, target.kind + ' encounter can be solved');
  sandbox.timeout();
  assert.equal(game.getSnapshot().mode, 'question');
}
sandbox.Math.random = () => .85;
game.start();
const rerolled = sandbox.window.__collisionProbe();
const guardian = rerolled.sections.slice(0, 2).flatMap((section) => section.caves).find((cave) => cave.kind === 'guardian');
rerolled.rover.x = guardian.x; rerolled.rover.y = guardian.y;
listeners.keydown({ key: ' ', preventDefault() {} });
assert.notDeepEqual(node('targets').children.slice(-4).map((button) => [button.style.left, button.style.top]), guardianLayout, 'the same encounter moves its objects between runs');
game.start();
const { rover, sections } = sandbox.window.__collisionProbe();
const wisp = sections[1].wisps[0];
rover.x = 640; rover.y = 1185; rover.heading = Math.PI / 2;
wisp.x = wisp.baseX = 640; wisp.y = wisp.baseY = 1165; wisp.phase = 0;
sandbox.window.__setCrystals(5);
frame();
assert.equal(game.getSnapshot().crystals, 4, 'wisp collision costs exactly one crystal');
assert(game.getSnapshot().freezeSeconds > 1.9 && wisp.frozen > 1.9, 'digger and wisp both freeze for two seconds');
const frozenY = rover.y, frozenX = wisp.x;
listeners.keydown({ key: 's', preventDefault() {} });
for (let i = 0; i < 25; i++) frame();
assert.equal(rover.y, frozenY, 'digger cannot move while frozen');
assert.equal(wisp.x, frozenX, 'wisp cannot move while frozen');
assert.equal(game.getSnapshot().crystals, 4, 'frozen contact cannot drain more crystals');
for (let i = 0; i < 26; i++) frame();
assert(rover.y > frozenY, 'digger moves again after the two-second freeze');
assert.equal(game.getSnapshot().freezeSeconds, 0);
listeners.keyup({ key: 's' });
game.start();
const prismState = sandbox.window.__collisionProbe();
const prismWisp = prismState.sections[1].wisps[0];
prismWisp.phase = 0;
prismWisp.x = prismWisp.baseX; prismWisp.y = prismWisp.baseY;
prismState.rover.x = prismWisp.x - 120; prismState.rover.y = prismWisp.y; prismState.rover.heading = 0;
sandbox.window.__setCrystals(5);
frame();
assert(prismWisp.prism && prismWisp.stunned > 0, 'headlight dazzles a wisp and drops a prism');
assert.equal(game.getSnapshot().freezeSeconds, 0);
const prism = prismWisp.prism;
prismState.rover.x = prism.x; prismState.rover.y = prism.y;
frame();
assert.equal(game.getSnapshot().crystals, 9, 'collecting the prism earns four crystals');
assert.equal(prismWisp.prism, null, 'the same prism cannot be collected twice');
prismState.rover.x = prismWisp.x; prismState.rover.y = prismWisp.y;
frame();
assert(game.getSnapshot().freezeSeconds > 1.9, 'driving into a dazzled wisp still freezes the rover');
assert.equal(game.getSnapshot().crystals, 8, 'headlight does not cancel contact damage');
assert.equal(node('wispFreeze').hidden, false, 'freeze is prominently shown over the map');
sandbox.Math.random = () => .5;
const completions = [];
game.onComplete((result) => { completions.push(result); });
game.start();
sandbox.window.__setCrystals(20);
sandbox.window.__setAnswers([
  { questionId: 'a', type: 'sort_bins', prompt: 'What is 7 × 8?', correct: false, responseTimeMs: 4000 },
  { questionId: 'a', type: 'sort_bins', prompt: 'What is 7 × 8?', correct: false, responseTimeMs: 3000 },
  { questionId: 'b', type: 'sort_bins', prompt: 'What is 6 × 6?', correct: true, responseTimeMs: 3500 },
  { questionId: 'c', type: 'sort_bins', prompt: 'What is 4 × 5?', correct: true, responseTimeMs: 2000 },
]);
sandbox.window.__finish();
assert.match(node('panel').innerHTML, /50% correct/);
assert.match(node('panel').innerHTML, /7 × 8/);
assert.equal(game.getSnapshot().spinsLeft, 1);
assert.equal(completions.length, 0, 'run is not awarded before the spin');
node('spin').onclick(); sandbox.timeout();
assert.equal(game.getSnapshot().bankedCrystals, 20);
game.start();
sandbox.window.__setCrystals(10);
sandbox.window.__setAnswers(Array.from({ length: 4 }, (_, i) => ({ questionId: String(i), type: 'sort_bins', prompt: 'Fact ' + i, correct: true, responseTimeMs: 1000 })));
sandbox.window.__finish();
assert.match(node('panel').innerHTML, /100% correct/);
assert.equal(game.getSnapshot().spinsLeft, 2);
node('spin').disabled = false; // The fake DOM reuses nodes; the real recap creates a fresh button.
node('spin').onclick(); sandbox.timeout();
assert.equal(game.getSnapshot().spinsLeft, 1);
assert.equal(game.getSnapshot().bankedCrystals, 10);
node('spin').onclick(); sandbox.timeout();
assert.equal(game.getSnapshot().spinsLeft, 0);
assert.equal(game.getSnapshot().bankedCrystals, 20);
setImmediate(() => {
  assert.equal(completions.length, 2);
  assert.equal(completions[0].crystals, 20);
  assert.equal(completions[0].crystalsCollected, 20);
  assert.equal(completions[0].percentCorrect, 50);
  assert.equal(completions[0].practiceFacts[0], 'What is 7 × 8?');
  assert.equal(completions[1].crystals, 20);
  assert.equal(completions[1].crystalsCollected, 10);
  assert.equal(completions[1].spinAwards.length, 2);
  game.onPrepare(() => Promise.resolve({ spins: [{ index: 5, award: 15 }], crystalsCollected: 10,
    correctCount: 0, attempted: 1, percentCorrect: 0, practiceFacts: ['What is 7 × 8?'] }));
  game.start();
  sandbox.window.__setCrystals(10);
  sandbox.window.__setAnswers([{ questionId: 'a', type: 'sort_bins', prompt: 'What is 7 × 8?', correct: false, responseTimeMs: 2000 }]);
  sandbox.window.__finish();
  node('spin').disabled = true; // Simulate the browser's fresh, disabled button while saving.
  setImmediate(() => {
    assert.equal(node('spin').disabled, false, 'server result enables the wheel');
    node('spin').onclick(); sandbox.timeout();
    assert.equal(game.getSnapshot().bankedCrystals, 15, 'server chose the final spin award');
    console.log('Caves, Overdrive, collision freeze, recap, local spins, and server-prepared spins verified.');
  });
});
