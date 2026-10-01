// ClearDecode demo data for the two demo classes (Oct 1, 2026).
//   node tools/cleardecode-demo-seed.cjs > add_cleardecode_demo.sql
//
// Gives each of the 18 made-up demo students a ClearDecode story that fits
// their demo profile (lib/demo/barrons.js): strong readers scored out of the
// placement scan; struggling readers are in ClearDecode at different ruins,
// with a few weeks of sessions played through the real engine (so every
// teacher view agrees). Fixed seed: same data every run. Matches students by
// first name inside DEMO-4401 and DEMO-4402. Safe to run more than once.
const ts = require("/opt/node22/lib/node_modules/typescript");
const fs = require("fs");
require.extensions[".js"] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, "utf8"), { compilerOptions: { module: 1, target: 7, esModuleInterop: true } }).outputText, f);
const CD = require(__dirname + "/../lib/cleardecode/index.js");

let seed = 4401;
const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

// School days from Sept 2 to Sept 30, 2026 (Oct 1 is "today": nothing logged yet).
const days = [];
for (let d = new Date("2026-09-02T12:00:00Z"); d <= new Date("2026-09-30T12:00:00Z"); d.setUTCDate(d.getUTCDate() + 1)) {
  const w = d.getUTCDay();
  if (w > 0 && w < 6) days.push(d.toISOString().slice(0, 10));
}
const SCAN_DAY = "2026-09-01";

// One story per student. kind: out (scored out) | on | needs (scanned, not
// turned on yet) | wait (scan sent, not taken) | keeper (finished the ladder).
const STORIES = {
  Ava: { kind: "out" },
  Priya: { kind: "out" },
  Olivia: { kind: "out" },
  Layla: { kind: "out" },
  Maya: { kind: "out" },
  Emma: { kind: "out" },
  Camila: { kind: "out" },
  Eli: { kind: "out" },
  Grace: { kind: "wait" },
  Jonah: { kind: "needs", start: "H5", gaps: ["G3"] },
  Aiden: { kind: "keeper", start: "K7", acc: 0.9, attend: 0.97, passProb: 1 },
  Luis: { kind: "on", start: "B2", acc: 0.86, attend: 0.95, rescan: "B5" },     // improving every week
  Sofia: { kind: "on", start: "A4", acc: 0.55, attend: 0.85, passProb: 0.25 },  // needs help: vault keeps holding
  Isaiah: { kind: "on", start: "B5", acc: 0.8, attend: 0.92, rescan: "C2" },    // starting to catch on
  Ryan: { kind: "on", start: "A1", acc: 0.62, attend: 0.9, belowFloor: true, passMark: 90 },
  Diego: { kind: "on", start: "D2", acc: 0.82, attend: 0.9 },
  Mateo: { kind: "on", start: "F3", acc: 0.78, attend: 0.7 },
  Noah: { kind: "on", start: "E3", acc: 0.8, attend: 0.5 },                      // work goes missing
};

function scanResult(start, extra = {}) {
  const i = CD.ruinIndex(start);
  return { startRuin: start, scoredOut: false, belowFloor: !!extra.belowFloor, mastered: CD.RUIN_ORDER.slice(0, i), gaps: extra.gaps || [], at: SCAN_DAY };
}

function play(story) {
  let p = { status: "on", current_ruin: story.start, pass_mark: story.passMark || 80, ruins: {}, log: [], scan: { pending: false, tested: {}, result: scanResult(story.start, story), history: [] }, chamber: null };
  p.scan.history.push({ at: SCAN_DAY, startRuin: story.start, scoredOut: false, mastered: CD.ruinIndex(story.start) });
  for (const day of days) {
    if (rand() > (story.attend || 0.9)) continue;
    const ses = CD.nextSession(p);
    if (ses.kind === "none") break;
    const total = ses.kind === "vault" ? 15 : 24 + Math.floor(rand() * 8);
    let acc = Math.max(0.3, Math.min(0.98, (story.acc || 0.8) + (rand() - 0.5) * 0.18));
    if (ses.kind === "vault") {
      const pass = rand() < (story.passProb != null ? story.passProb : 0.8);
      const need = CD.vaultNeeded(p.pass_mark);
      const correct = pass ? need + Math.floor(rand() * (16 - need)) : Math.max(6, need - 1 - Math.floor(rand() * 3));
      const r = CD.applyFinish(p, { kind: "vault", ruin: ses.ruin, correct: Math.min(15, correct), total: 15, minutes: 12 + Math.floor(rand() * 6), today: day });
      p = { ...p, ...r.fields };
      continue;
    }
    if (ses.kind === "keeper") {
      const items = [];
      CD.buildKeeper(p, { rand })[0].items.forEach((it) => items.push({ probe: it.probe, ok: rand() < 0.88 }));
      const r = CD.applyFinish(p, { kind: "keeper", ruin: CD.KEEPER, n: ses.n, correct: Math.round(acc * 20), total: 20, minutes: 9 + Math.floor(rand() * 4), bonus: Math.floor(rand() * 3), items, reread: { goal: "smooth", self: "smooth" }, today: day });
      p = { ...p, ...r.fields };
      continue;
    }
    const reread = ses.n > 1 ? { goal: CD.REREAD_GOALS[(ses.n - 2) % 3], self: acc > 0.82 ? "smooth" : acc > 0.65 ? "bumps" : "tricky" } : null;
    const r = CD.applyFinish(p, { kind: "chamber", ruin: ses.ruin, n: ses.n, correct: Math.round(acc * total), total, minutes: 17 + Math.floor(rand() * 7), bonus: Math.floor(rand() * 4), reread, today: day });
    p = { ...p, ...r.fields };
  }
  if (story.rescan) {
    p.scan.history.push({ at: "2026-09-29", startRuin: story.rescan, scoredOut: false, mastered: CD.ruinIndex(story.rescan) });
  }
  return p;
}

const rows = {};
for (const [name, st] of Object.entries(STORIES)) {
  if (st.kind === "out") rows[name] = { status: "scanned", current_ruin: null, pass_mark: 80, ruins: {}, log: [], chamber: null, scan: { pending: false, tested: {}, result: { startRuin: null, scoredOut: true, belowFloor: false, mastered: CD.RUIN_ORDER.slice(), gaps: [], at: SCAN_DAY }, history: [{ at: SCAN_DAY, startRuin: null, scoredOut: true, mastered: CD.RUIN_ORDER.length }] } };
  else if (st.kind === "wait") rows[name] = { status: "scan", current_ruin: null, pass_mark: 80, ruins: {}, log: [], chamber: null, scan: { pending: true, tested: {}, sentAt: "2026-09-30T14:00:00Z" } };
  else if (st.kind === "needs") rows[name] = { status: "scanned", current_ruin: null, pass_mark: 80, ruins: {}, log: [], chamber: null, scan: { pending: false, tested: {}, result: scanResult(st.start, st), history: [{ at: SCAN_DAY, startRuin: st.start, scoredOut: false, mastered: CD.ruinIndex(st.start) }] } };
  else if (st.kind === "keeper") rows[name] = play(st);
  else rows[name] = play(st);
}

const q = (v) => `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
const out = [];
out.push("-- Oct 1, 2026: ClearDecode demo data for the demo classes (DEMO-4401, DEMO-4402).");
out.push("-- Made by tools/cleardecode-demo-seed.cjs. Safe to run more than once.");
out.push("BEGIN;");
for (const [name, r] of Object.entries(rows)) {
  out.push(`INSERT INTO clearcode_progress (student_id, class_id, status, scan, current_ruin, ruins, log, pass_mark, chamber, updated_at)
SELECT s.id, s.class_id, '${r.status}', ${q(r.scan)}, ${r.current_ruin ? `'${r.current_ruin}'` : "NULL"}, ${q(r.ruins)}, ${q(r.log)}, ${r.pass_mark}, NULL, now()
FROM students s JOIN classes c ON c.id = s.class_id
WHERE c.class_code IN ('DEMO-4401', 'DEMO-4402') AND s.first_name ILIKE '${name}%'
ON CONFLICT (student_id) DO UPDATE SET class_id = EXCLUDED.class_id, status = EXCLUDED.status, scan = EXCLUDED.scan, current_ruin = EXCLUDED.current_ruin, ruins = EXCLUDED.ruins, log = EXCLUDED.log, pass_mark = EXCLUDED.pass_mark, chamber = NULL, updated_at = now();`);
}
const words = CD.cleanClassWords([
  { word: "evaporation", meaning: "when water turns into a gas and rises" },
  { word: "condensation", meaning: "when water vapor cools and turns back into drops" },
  { word: "remainder", meaning: "the amount left over after you divide" },
]);
out.push(`UPDATE classes SET clearcode_settings = ${q({ weekOf: "2026-09-28", words })} WHERE class_code IN ('DEMO-4401', 'DEMO-4402');`);
out.push("COMMIT;");
out.push(`SELECT c.name AS class, count(p.*) AS cleardecode_students FROM classes c LEFT JOIN students s ON s.class_id = c.id LEFT JOIN clearcode_progress p ON p.student_id = s.id WHERE c.class_code IN ('DEMO-4401', 'DEMO-4402') GROUP BY c.name;`);
process.stdout.write(out.join("\n\n") + "\n");

// Summary to stderr for checking.
for (const [name, r] of Object.entries(rows)) {
  const passed = Object.entries(r.ruins || {}).filter(([, v]) => v.passedAt).map(([k]) => k);
  console.error(`${name.padEnd(7)} ${r.status.padEnd(8)} now:${String(r.current_ruin).padEnd(5)} sessions:${(r.log || []).length} passed:${passed.join(",")} help:${JSON.stringify(CD.needsHelp(r))} complete:${CD.isComplete(r)}`);
}
