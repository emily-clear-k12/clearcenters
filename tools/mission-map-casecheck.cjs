// Mission Map case validator. The engine grades a checkpoint one way on the
// client (from the PUBLIC case) and another way on the server (from the
// SERVER case), so the two can silently disagree — a student sees "correct"
// and the gradebook records a miss. This checks that they never do, along
// with the structural mistakes that only surface when a student hits them.
//
//   node tools/mission-map-casecheck.cjs
const ts = require("/opt/node22/lib/node_modules/typescript"), fs = require("fs");
require.extensions[".js"] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, "utf8"), { compilerOptions: { module: 1, target: 7, esModuleInterop: true }, fileName: f + "x" }).outputText, f);
const MM = "/home/claude/cc/lib/cases/mission-map";
const PUB = require(MM + "/index.public.js");
const SRV = require(MM + "/index.server.js");
const LAB = require(MM + "/teksLabels.js");

let fails = 0;
const notes = [];
const bad = (std, m) => { console.log(`  ✗ ${std}: ${m}`); fails++; };

// What the client compares against, per type (MissionMapClient.js), and what
// the server compares against (app/api/mission-map/submit/route.js).
function expectedPublic(cp) {
  if (cp.type === "sequence") return (cp.correctOrder || []).join(">");
  if (cp.type === "showdown") return cp.correctSide;
  return cp.correctChoiceId;
}
function expectedServer(cp) {
  if (cp.type === "sequence") return (cp.correctOrder || []).join(">");
  if (cp.type === "showdown") return cp.correctSide;
  return cp.correctChoiceId;
}

const standards = PUB.listMissionMapStandards();
console.log(`checking ${standards.length} Mission Map cases\n`);

for (const std of standards) {
  const p = PUB.getMissionMapPublicCase(std);
  const s = SRV.getMissionMapServerCase(std);
  if (!p) { bad(std, "no public case"); continue; }
  if (!s) { bad(std, "no server case"); continue; }
  if (p.standard !== std) bad(std, `public case's own standard field says "${p.standard}"`);
  if (s.standard !== std) bad(std, `server case's own standard field says "${s.standard}"`);
  if (p.title !== s.title) bad(std, `titles disagree: public "${p.title}" vs server "${s.title}"`);

  const pc = p.checkpoints || [], sc = s.checkpoints || [];
  if (!pc.length) { bad(std, "no checkpoints"); continue; }
  if (pc.length !== sc.length) bad(std, `public has ${pc.length} checkpoints, server has ${sc.length}`);

  const seen = new Set();
  pc.forEach((cp, i) => {
    if (seen.has(cp.id)) bad(std, `duplicate checkpoint id ${cp.id}`);
    seen.add(cp.id);
    if (cp.order !== i + 1) bad(std, `${cp.id} has order ${cp.order} but sits at position ${i + 1}`);
    if (!cp.prompt) bad(std, `${cp.id} has no prompt`);
    if (!cp.evidenceLogEntry) bad(std, `${cp.id} adds nothing to the Evidence Log`);
    if (!cp.position || typeof cp.position.x !== "number" || typeof cp.position.y !== "number") bad(std, `${cp.id} has no map position`);

    const srv = sc.find((x) => x.id === cp.id);
    if (!srv) { bad(std, `${cp.id} is missing from the server case entirely`); return; }
    if ((cp.type || null) !== (srv.type || null)) bad(std, `${cp.id} type disagrees: public "${cp.type || "standard"}" vs server "${srv.type || "standard"}"`);

    // THE one that matters: the two sides must expect the same answer.
    const pe = expectedPublic(cp), se = expectedServer(srv);
    if (!pe) bad(std, `${cp.id} has no answer key in the public case`);
    if (!se) bad(std, `${cp.id} has no answer key in the server case`);
    if (pe && se && pe !== se) bad(std, `${cp.id} ANSWER MISMATCH — client grades "${pe}", server grades "${se}". A student would be told they were right and marked wrong.`);

    if (cp.type === "showdown") {
      if (!cp.evidenceA || !cp.evidenceB) bad(std, `${cp.id} is a showdown with fewer than two evidence blocks`);
      if (!["A", "B"].includes(cp.correctSide)) bad(std, `${cp.id} showdown correctSide is "${cp.correctSide}", not "A" or "B"`);
      if (cp.evidenceA && !cp.evidenceA.choiceLabel) bad(std, `${cp.id} evidenceA has no choiceLabel`);
      if (cp.evidenceB && !cp.evidenceB.choiceLabel) bad(std, `${cp.id} evidenceB has no choiceLabel`);
      if (cp.choices) bad(std, `${cp.id} is a showdown but also carries a choices list — the client renders the evidence, so the list is dead and confusing`);
    } else if (cp.type === "sequence") {
      const ids = (cp.items || []).map((x) => x.id);
      if (ids.length < 2) bad(std, `${cp.id} is a sequence with fewer than two items`);
      if (new Set(ids).size !== ids.length) bad(std, `${cp.id} has duplicate item ids`);
      const order = cp.correctOrder || [];
      if (order.length !== ids.length) bad(std, `${cp.id} orders ${order.length} of ${ids.length} items — the submit button never enables`);
      order.forEach((id) => { if (!ids.includes(id)) bad(std, `${cp.id} correctOrder names "${id}", which is not one of its items`); });
      // A sequence whose items are authored already in the right order is a
      // NOTE, not a failure. MissionMapClient.js shuffles `cp.items` on every
      // render with a per-student seed and does so unconditionally, so the
      // authoring order never reaches a student. (Checked Sept 22, 2026
      // against the client — four of the shipped cases are authored this way
      // and all four are fine.) It is still worth printing: the shuffle is
      // the only thing standing between the file order and the answer, so if
      // that call ever moves behind a condition, this line is the warning
      // that was already there.
      if (JSON.stringify(ids) === JSON.stringify(order)) notes.push(`${std}: ${cp.id} authors its items in answer order — harmless while the client shuffles them`);
    } else {
      const ids = (cp.choices || []).map((c) => c.id);
      if (ids.length < 3) bad(std, `${cp.id} offers only ${ids.length} choices`);
      if (new Set(ids).size !== ids.length) bad(std, `${cp.id} has duplicate choice ids`);
      if (!ids.includes(cp.correctChoiceId)) bad(std, `${cp.id} keys "${cp.correctChoiceId}", which is not one of its choices`);
      const texts = (cp.choices || []).map((c) => c.text.trim().toLowerCase());
      if (new Set(texts).size !== texts.length) bad(std, `${cp.id} has two choices with identical text`);
    }
  });

  if (!p.finalResponsePrompt) bad(std, "no finalResponsePrompt");
  if (!(s.mustInclude || []).length) bad(std, "no mustInclude rubric");
  if (!s.modelAnswer) bad(std, "no modelAnswer");
  if (!(p.selfCheckQuestions || []).length) bad(std, "no selfCheckQuestions");

  // The Standards report and the case tile read this map, not the case file.
  const label = LAB.missionMapTeksLabel(std);
  if (!label) bad(std, "missing from teksLabels.js — the Standards report would show the internal number instead of the TEKS code");
  else if (!p.teksLabel) bad(std, "public case has no teksLabel of its own");
  else {
    const short = LAB.missionMapTeksCode(std);
    if (short && !p.teksLabel.includes(short)) bad(std, `teksLabels.js says ${short} but the case file's own teksLabel does not mention it`);
  }
}

// A Mission Map code is an internal concept number, so two cases must never
// claim the same one, and the numbering must not skip.
const byGrade = {};
standards.forEach((std) => {
  const m = std.match(/^(\d)\.(\d+)-MM$/);
  if (!m) { bad(std, "case code does not match <grade>.<n>-MM"); return; }
  (byGrade[m[1]] = byGrade[m[1]] || []).push(Number(m[2]));
});
Object.entries(byGrade).forEach(([g, ns]) => {
  ns.sort((a, b) => a - b);
  const expected = Array.from({ length: ns.length }, (_, i) => i + 1);
  if (JSON.stringify(ns) !== JSON.stringify(expected)) {
    bad(`grade ${g}`, `concept numbers are ${ns.join(",")} — expected an unbroken 1..${ns.length}`);
  }
});

const counts = {};
standards.forEach((s) => { const c = PUB.getMissionMapPublicCase(s); if (c) counts[c.subject] = (counts[c.subject] || 0) + 1; });
console.log("by subject:", Object.entries(counts).map(([k, v]) => `${k} ${v}`).join("  "));
if (notes.length) {
  console.log("\nnotes (not failures):");
  notes.forEach((n) => console.log("  \u00b7", n));
}
console.log(fails ? `\n${fails} PROBLEMS` : "\nEVERY MISSION MAP CASE IS CONSISTENT");
process.exit(fails ? 1 : 0);
