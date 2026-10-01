// ClearCode engine (Sept 30, 2026). Pure functions shared by the student
// screens, the API routes and the teacher pages. Design:
// claude/ClearCode_Design_v1.md. Content: ./ladder.js + ./ruins/*.js.
//
// Words a student sees come from content files; nothing here invents words.
import { RUINS, PLANETS, RUIN_ORDER, getRuin, ruinIndex, nextRuinId, ruinLabel, planetOf, ruinsOfPlanet } from "./ladder.js";
import G1 from "./ruins/G1.js";
import A3 from "./ruins/A3.js";
import K1 from "./ruins/K1.js";

export { RUINS, PLANETS, RUIN_ORDER, getRuin, ruinIndex, nextRuinId, ruinLabel, planetOf, ruinsOfPlanet };

// Ruins written in full so far. The rest of the ladder has placement probes
// only; their full content is the next content batch.
const CONTENT = { A3, G1, K1 };

export function getRuinContent(id) {
  return CONTENT[id] || null;
}
export function isRuinReady(id) {
  return !!CONTENT[id];
}
export const READY_RUINS = Object.keys(CONTENT);

export const CHAMBERS_PER_RUIN = 4;
export const VAULT_ITEMS = 15;
export const DEFAULT_PASS_MARK = 80;
export const CHAMBER_CRYSTALS = 5;
export const VAULT_CRYSTALS = 5;
export const BONUS_CAP = 3;
export const SCAN_PASS = 3; // of 4 probe items

// ---------- small helpers ----------
export function shuffle(list, rand = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickN(list, n, rand) {
  return shuffle(list, rand).slice(0, n);
}
// A pick item: { kind: "pick", say, answer, options }
function pickItem(arr, rand, extra = {}) {
  return { kind: "pick", say: arr[0], answer: arr[0], options: shuffle(arr, rand), ...extra };
}
// A spell item: { kind: "spell", say, answer, parts, chips }
function spellItem(d, rand) {
  const parts = d.parts;
  return { kind: "spell", say: d.w || d.word, answer: d.w || d.word, parts, chips: shuffle([...new Set([...parts, ...(d.extra || [])])], rand) };
}

// Central-time date key (same clock the site uses for streaks).
export function dateKey(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

// ---------- placement scan ----------
// One representative ruin per planet for the coarse scan.
function repOf(planetIdx) {
  const list = ruinsOfPlanet(PLANETS[planetIdx].id);
  return list[Math.floor((list.length - 1) / 2)].id;
}

// The 4 items of a ruin's probe, in a fixed order: pick, spell, alien, alien.
export function probeItems(ruinId, rand = Math.random) {
  const ru = getRuin(ruinId);
  if (!ru) return [];
  return [
    pickItem(ru.probe.pick, rand, { probe: ruinId }),
    { ...spellItem(ru.probe.spell, rand), probe: ruinId },
    pickItem(ru.probe.alien[0], rand, { probe: ruinId, alien: true }),
    pickItem(ru.probe.alien[1], rand, { probe: ruinId, alien: true }),
  ];
}

// tested = { [ruinId]: correctCount (0-4) }. Returns the next ruin to probe,
// or the finished placement. Deterministic from the results so far, so a scan
// can resume after a refresh.
export function scanStep(tested = {}) {
  const passed = (id) => (tested[id] || 0) >= SCAN_PASS;
  const has = (id) => Object.prototype.hasOwnProperty.call(tested, id);
  // Coarse: binary search over planets for the first planet whose
  // representative ruin is not passed.
  let lo = 0;
  let hi = PLANETS.length - 1;
  let firstFail = PLANETS.length;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const rep = repOf(mid);
    if (!has(rep)) return { done: false, next: rep, phase: "coarse" };
    if (passed(rep)) lo = mid + 1;
    else { firstFail = mid; hi = mid - 1; }
  }
  const finish = (start, extra = {}) => {
    const testedIds = Object.keys(tested);
    const startIdx = start ? ruinIndex(start) : RUIN_ORDER.length;
    return {
      done: true,
      startRuin: start,
      scoredOut: !start,
      belowFloor: !!extra.belowFloor,
      mastered: testedIds.filter((id) => passed(id)).sort((a, b) => ruinIndex(a) - ruinIndex(b)),
      // Spotty gaps: missed ruins that sit below a ruin the student passed.
      gaps: testedIds.filter((id) => !passed(id) && id !== start && testedIds.some((p) => passed(p) && ruinIndex(p) > ruinIndex(id))).sort((a, b) => ruinIndex(a) - ruinIndex(b)),
      probes: testedIds.length,
    };
  };
  if (firstFail === PLANETS.length) return finish(null);
  // Fine: ruin by ruin inside the first failing planet.
  const ruins = ruinsOfPlanet(PLANETS[firstFail].id);
  for (const ru of ruins) {
    if (!has(ru.id)) return { done: false, next: ru.id, phase: "fine" };
    if (!passed(ru.id)) return finish(ru.id, { belowFloor: ru.id === RUIN_ORDER[0] });
  }
  // Every ruin in that planet passed on its own: start at the next planet.
  const after = PLANETS[firstFail + 1] ? ruinsOfPlanet(PLANETS[firstFail + 1].id)[0].id : null;
  return finish(after);
}

// ---------- chambers ----------
// Rooms by chamber number (1-4, then 5+ = extra practice before a vault retry).
// Word rooms rotate so each day feels different.
function wordRoomsFor(n, c) {
  const has = { forge: !!(c.forge && c.forge.items && c.forge.items.length), chain: !!(c.chains && c.chains.length), wall: !!(c.wall && c.wall.words.length) };
  const plans = {
    1: ["wall", "sort", "door"],
    2: [has.forge ? "forge" : "chain", "door"],
    3: ["chain", "wall", "sort"],
    4: ["sort", has.forge ? "forge" : "wall", "door"],
  };
  const k = ((n - 1) % 4) + 1;
  return plans[k].filter((r) => r !== "chain" || has.chain).filter((r) => r !== "wall" || has.wall);
}

// warmPool: pick items ([answer, foil, foil]) from ruins the student already
// mastered. classWords: [{ word, chunks, meaning }] from the teacher.
export function buildChamber(ruinId, n, { warmPool = [], classWords = [], rand = Math.random } = {}) {
  const c = getRuinContent(ruinId);
  if (!c) return null;
  const rooms = [];
  const k = ((n - 1) % 4) + 1;
  // Warm-up: 6 quick review items.
  const warmSrc = warmPool.length >= 6 ? warmPool : [...warmPool, ...c.checks];
  rooms.push({ type: "warm", items: pickN(warmSrc, 6, rand).map((a) => pickItem(a, rand)) });
  // Codex: full on chamber 1, short refresh after.
  const checks = c.checks.slice(((k - 1) * 3) % c.checks.length, ((k - 1) * 3) % c.checks.length + 3);
  rooms.push({ type: "codex", full: n === 1, cards: c.codex, code: c.code, checks: (n === 1 ? checks : checks.slice(0, 1)).map((a) => pickItem(a, rand)) });
  for (const room of wordRoomsFor(n, c)) {
    if (room === "wall") rooms.push({ type: "wall", mode: c.wall.mode, words: pickN(c.wall.words, 2, rand) });
    if (room === "sort") {
      const yes = pickN(c.bank, 4, rand).map((w) => ({ w, yes: true }));
      const no = pickN(c.contrast, 4, rand).map((w) => ({ w, yes: false }));
      rooms.push({ type: "sort", sort: { yes: c.sort.yes, no: c.sort.no, yesHint: c.sort.yesHint, noHint: c.sort.noHint }, items: shuffle([...yes, ...no], rand) });
    }
    if (room === "door") rooms.push({ type: "door", words: pickN(c.door, 2, rand).map((d) => spellItem(d, rand)) });
    if (room === "forge") {
      const items = pickN(c.forge.items, 2, rand);
      const chips = [];
      const seen = new Set();
      const kindOf = (t, i, parts) => (parts.length === 1 ? "base" : i === parts.length - 1 && i > 0 ? "suf" : i === 0 && parts.length === 3 ? "pre" : i === 0 ? "base" : "base");
      c.forge.items.forEach((it) => it.parts.forEach((t, i) => { const key = t; if (!seen.has(key)) { seen.add(key); chips.push({ t, k: kindOf(t, i, it.parts) }); } }));
      (c.forge.extra || []).forEach((x) => { if (!seen.has(x.t)) { seen.add(x.t); chips.push(x); } });
      rooms.push({ type: "forge", items, chips: shuffle(chips, rand) });
    }
    if (room === "chain") {
      const chain = c.chains[(k - 1) % c.chains.length];
      const pool = [...new Set([...c.bank, ...c.contrast, ...c.chains.flat()])];
      const steps = chain.slice(1).map((w, i) => {
        const prev = chain[i];
        const near = pool.filter((x) => x !== w && x !== prev && x.length === w.length && oneApart(x, prev));
        const foils = pickN(near.length >= 2 ? near : pool.filter((x) => x !== w && x !== prev), 2, rand);
        return { from: prev, say: w, answer: w, options: shuffle([w, ...foils], rand) };
      });
      rooms.push({ type: "chain", start: chain[0], steps });
    }
  }
  const insc = c.inscriptions[(k - 1) % c.inscriptions.length];
  rooms.push({ type: "read", title: insc.title, text: insc.text, find: c.find, code: c.code });
  if (classWords && classWords.length) rooms.push({ type: "class", words: classWords.slice(0, 3) });
  const game = c.game || {};
  rooms.push({ type: "game", kind: n % 2 === 1 ? "runner" : "storm", targets: game.targets || c.bank, decoys: game.decoys || c.contrast, code: c.code });
  return rooms;
}

function oneApart(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d === 1;
}

// The Friday vault: 15 items. reviewPool = pick items from earlier ruins.
export function buildVault(ruinId, { reviewPool = [], rand = Math.random } = {}) {
  const c = getRuinContent(ruinId);
  if (!c) return null;
  const picks = pickN(c.vaultPicks, 8, rand).map((a) => pickItem(a, rand));
  const spells = pickN(c.door, 3, rand).map((d) => spellItem(d, rand));
  const fakes = pickN(c.vaultFake, 2, rand).map((a) => pickItem(a, rand, { alien: true }));
  const review = pickN(reviewPool.length >= 2 ? reviewPool : c.checks, 2, rand).map((a) => pickItem(a, rand, { review: true }));
  return shuffle([...picks, ...spells, ...fakes, ...review], rand);
}

export function vaultNeeded(passMark = DEFAULT_PASS_MARK) {
  return Math.ceil((Number(passMark) || DEFAULT_PASS_MARK) / 100 * VAULT_ITEMS);
}

// Review items for warm-ups and vaults: probe picks + checks from ruins
// before this one (most recent first).
export function reviewPool(ruinId, limit = 8) {
  const idx = ruinIndex(ruinId);
  const out = [];
  for (let i = idx - 1; i >= 0 && out.length < limit * 2; i--) {
    const id = RUIN_ORDER[i];
    const ru = getRuin(id);
    out.push(ru.probe.pick);
    const c = getRuinContent(id);
    if (c) c.checks.slice(0, 3).forEach((x) => out.push(x));
  }
  return out.slice(0, limit * 2);
}

// ---------- progress ----------
// progress row shape (clearcode_progress):
//   status: "scan" | "scanned" | "on" | "off"
//   scan: { pending, tested, result, history: [{ at, result }] }
//   current_ruin, pass_mark
//   ruins: { [id]: { chambers, startedAt, vaultTries, vaultBest, passedAt } }
//   log: [{ date, ruin, kind: "chamber"|"vault", n, correct, total, minutes, passed? }]
//   chamber: { ruin, n, room, date } (resume point)

export function ruinState(progress, id) {
  return (progress && progress.ruins && progress.ruins[id]) || { chambers: 0, vaultTries: 0, vaultBest: null, passedAt: null };
}

// What today's session is for the current ruin.
export function nextSession(progress) {
  const id = progress && progress.current_ruin;
  if (!id) return { kind: "none" };
  const rs = ruinState(progress, id);
  const vaultReady = rs.chambers >= CHAMBERS_PER_RUIN || rs.earlyVault;
  // After a missed vault: one more practice chamber, then retry.
  if (rs.vaultTries > 0 && !rs.passedAt && (rs.chambersSinceVault || 0) < 1) return { kind: "chamber", ruin: id, n: rs.chambers + 1, retryPrep: true };
  if (vaultReady) return { kind: "vault", ruin: id };
  return { kind: "chamber", ruin: id, n: rs.chambers + 1 };
}

export function doneToday(progress, today = dateKey()) {
  return Array.isArray(progress && progress.log) && progress.log.some((e) => e.date === today && !e.placed);
}

// Apply a finished chamber or vault to a progress row. Returns the new row
// fields plus what the student earned. Pure: the API saves the result.
export function applyFinish(progress, { kind, ruin, n, correct, total, minutes = 0, bonus = 0, today = dateKey() }) {
  const ruins = { ...(progress.ruins || {}) };
  const rs = { ...ruinState(progress, ruin) };
  if (!rs.startedAt) rs.startedAt = today;
  const log = Array.isArray(progress.log) ? [...progress.log] : [];
  let crystals = 0;
  let current = progress.current_ruin;
  let result = { kind };
  const acc = total ? correct / total : 0;
  if (kind === "chamber") {
    rs.chambers = (rs.chambers || 0) + 1;
    if (rs.vaultTries > 0) rs.chambersSinceVault = (rs.chambersSinceVault || 0) + 1;
    crystals = CHAMBER_CRYSTALS + Math.min(BONUS_CAP, Math.max(0, Number(bonus) || 0));
    // Masters it early: chamber 1 at 95%+ opens the vault next session.
    if (n === 1 && acc >= 0.95) rs.earlyVault = true;
    log.push({ date: today, ruin, kind, n, correct, total, minutes });
    // Self-correcting start: the first ruin after placement, two chambers under 50% -> back one ruin.
    const placedRuin = progress.scan && progress.scan.result && progress.scan.result.startRuin;
    const recent = log.filter((e) => e.ruin === ruin && e.kind === "chamber").slice(-2);
    if (ruin === placedRuin && rs.chambers <= 2 && recent.length === 2 && recent.every((e) => e.total && e.correct / e.total < 0.5)) {
      const prev = RUIN_ORDER[ruinIndex(ruin) - 1];
      if (prev) { current = prev; result.movedBack = prev; }
    }
    result.piece = Math.min(rs.chambers, CHAMBERS_PER_RUIN);
  } else {
    const need = vaultNeeded(progress.pass_mark);
    const passed = correct >= need;
    rs.vaultTries = (rs.vaultTries || 0) + 1;
    rs.vaultBest = Math.max(rs.vaultBest || 0, correct);
    rs.chambersSinceVault = 0;
    log.push({ date: today, ruin, kind, correct, total, minutes, passed });
    if (passed) {
      rs.passedAt = today;
      crystals = VAULT_CRYSTALS;
      current = nextRuinId(ruin);
      result = { ...result, passed: true, relic: (getRuinContent(ruin) || {}).relic || null, next: current };
    } else {
      result = { ...result, passed: false, need, correct };
    }
  }
  ruins[ruin] = rs;
  return { fields: { ruins, log: log.slice(-400), current_ruin: current, chamber: null }, crystals, result };
}

// Students who need the teacher: a vault missed twice, or the last two
// sessions under 60%.
export function needsHelp(progress) {
  if (!progress || progress.status !== "on") return null;
  const id = progress.current_ruin;
  const rs = ruinState(progress, id);
  if (rs.vaultTries >= 2 && !rs.passedAt) return { reason: `Missed the vault for ${ruinLabel(id)} twice`, ruin: id };
  const recent = (progress.log || []).filter((e) => e.ruin === id).slice(-2);
  if (recent.length === 2 && recent.every((e) => e.total && e.correct / e.total < 0.6)) return { reason: `Under 60% on the last two sessions in ${ruinLabel(id)}`, ruin: id };
  return null;
}

export function masteredRuins(progress) {
  const fromVault = Object.entries((progress && progress.ruins) || {}).filter(([, v]) => v && v.passedAt).map(([k]) => k);
  const fromScan = (progress && progress.scan && progress.scan.result && progress.scan.result.startRuin)
    ? RUIN_ORDER.slice(0, ruinIndex(progress.scan.result.startRuin))
    : [];
  return [...new Set([...fromScan, ...fromVault])].sort((a, b) => ruinIndex(a) - ruinIndex(b));
}

export function minutesThisWeek(progress, today = new Date()) {
  const start = new Date(today);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const startKey = dateKey(start);
  return ((progress && progress.log) || []).filter((e) => e.date >= startKey).reduce((n, e) => n + (Number(e.minutes) || 0), 0);
}

// ---------- class words ----------
// Rough syllable chunks for teacher-entered words (VC/CV split rules). Good
// enough to hear a long word in parts; the teacher can fix chunks by hand.
export function chunkWord(word) {
  const w = String(word || "").toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 4) return [w];
  const endings = ["tion", "sion", "ture", "ment", "ness", "able", "ible", "ous", "ing"];
  let tail = "";
  for (const e of endings) if (w.endsWith(e) && w.length > e.length + 2) { tail = e; break; }
  const body = tail ? w.slice(0, -tail.length) : w;
  const isV = (ch) => "aeiouy".includes(ch);
  const parts = [];
  let cur = "";
  for (let i = 0; i < body.length; i++) {
    cur += body[i];
    const next = body[i + 1];
    const after = body[i + 2];
    if (isV(body[i]) && next && !isV(next) && after) {
      if (!isV(after) && body[i + 3] !== undefined && cur.length >= 1) { cur += next; i++; parts.push(cur); cur = ""; }
      else if (isV(after)) { parts.push(cur); cur = ""; }
    }
  }
  if (cur) parts.push(cur);
  if (tail) parts.push(tail);
  return parts.filter(Boolean);
}

export function cleanClassWords(list) {
  return (Array.isArray(list) ? list : []).map((x) => {
    const word = String((x && x.word) || x || "").trim().slice(0, 40);
    if (!word) return null;
    const chunks = Array.isArray(x && x.chunks) && x.chunks.length ? x.chunks.map((c) => String(c).slice(0, 20)) : chunkWord(word);
    return { word, chunks, meaning: String((x && x.meaning) || "").trim().slice(0, 140) };
  }).filter(Boolean).slice(0, 12);
}
