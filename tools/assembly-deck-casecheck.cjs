// Assembly Deck case validator. Catches the authoring mistakes that only show
// up when a student hits them: a decoy graded against a reason chip the round
// never offers, an assembly key that points at a round that does not exist,
// a pinpoint answer that is not actually in the finished report.
//
//   node tools/assembly-deck-casecheck.cjs
const ts = require("/opt/node22/lib/node_modules/typescript"), fs = require("fs");
require.extensions[".js"] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, "utf8"), { compilerOptions: { module: 1, target: 7, esModuleInterop: true }, fileName: f + "x" }).outputText, f);
const CC = "/home/claude/cc/lib/cases/assembly-deck";
const PUB = require(CC + "/index.public.js"), SRV = require(CC + "/index.server.js");

let fails = 0;
const bad = (std, m) => { console.log(`  ✗ ${std}: ${m}`); fails++; };

for (const p of PUB.listAssemblyDeckCases()) {
  const s = SRV.getAssemblyDeckServerCase(p.standard);
  if (!s) { bad(p.standard, "no server case"); continue; }
  const std = p.standard;
  const pieceIds = new Set();
  const inKey = new Set();

  for (const round of p.rounds) {
    const rk = (s.rounds || {})[round.id];
    if (!rk) { bad(std, `round ${round.id} has no server key`); continue; }
    const ids = new Set(round.pieces.map((x) => x.id));
    round.pieces.forEach((x) => pieceIds.add(x.id));

    // the key: every id real, every slot filled to capacity, nothing doubled
    const seen = new Set();
    for (const slot of round.slots) {
      const assigned = (rk.key || {})[slot.id] || [];
      if (assigned.length !== (slot.accepts || 1)) bad(std, `${round.id}.${slot.id} takes ${slot.accepts || 1} but the key assigns ${assigned.length}`);
      for (const id of assigned) {
        if (!ids.has(id)) bad(std, `${round.id} key references ${id}, which is not a piece in that round`);
        if (seen.has(id)) bad(std, `${round.id} key uses ${id} in two slots`);
        seen.add(id);
        inKey.add(id);
      }
    }
    for (const slotId of Object.keys(rk.key || {})) {
      if (!round.slots.some((x) => x.id === slotId)) bad(std, `${round.id} key has slot ${slotId}, which the public round does not have`);
    }

    // the decoys: real, not in the key, each with a reason the round offers
    const offered = new Set(round.reasonOptions || []);
    const decoyIds = Object.keys(rk.decoys || {});
    for (const id of decoyIds) {
      if (!ids.has(id)) bad(std, `${round.id} decoy ${id} is not a piece in that round`);
      if (seen.has(id)) bad(std, `${round.id} lists ${id} as both a decoy and a key piece`);
      const reason = (rk.decoyReason || {})[id];
      if (!reason) bad(std, `${round.id} decoy ${id} has no decoyReason`);
      else if (!offered.has(reason)) bad(std, `${round.id} grades ${id} as "${reason}" but does not offer that chip — a student cannot pick it`);
    }
    // every leftover must BE a decoy, or the reject step has an unanswerable card
    const leftovers = round.pieces.filter((x) => !seen.has(x.id)).map((x) => x.id);
    for (const id of leftovers) {
      if (!decoyIds.includes(id)) bad(std, `${round.id}: ${id} is left over but has no decoy entry`);
    }
  }

  // assembly: one round per slot, every round used exactly once
  const slots = (p.assembly.slots || []).map((x) => x.id);
  const key = s.assemblyKey || {};
  for (const slotId of slots) {
    if (!key[slotId]) bad(std, `assembly slot ${slotId} has no key`);
    else if (!p.rounds.some((r) => r.id === key[slotId])) bad(std, `assembly key ${slotId} points at round ${key[slotId]}, which does not exist`);
  }
  const used = Object.values(key);
  if (new Set(used).size !== used.length) bad(std, "assembly key uses the same round twice");
  if (used.length !== p.rounds.length) bad(std, `assembly key places ${used.length} of ${p.rounds.length} rounds`);

  // the trap
  if (s.trap) {
    const tr = p.rounds.find((r) => r.id === s.trap.roundId);
    if (!tr) bad(std, `trap points at round ${s.trap.roundId}, which does not exist`);
    else {
      const capacity = tr.slots.reduce((n, x) => n + (x.accepts || 1), 0);
      if (s.trap.position < 0 || s.trap.position > capacity) bad(std, `trap position ${s.trap.position} is outside a ${capacity}-sentence paragraph`);
    }
    if (!s.trap.why) bad(std, "trap has no why");
  }

  // the debrief (Sept 22): both questions have to be answerable
  const dPub = p.debrief, dSrv = s.debrief;
  if (!dPub || !dSrv) {
    bad(std, "no debrief — the case ends on the written question with nothing between it and the trap");
  } else {
    const accept = dSrv.pinpointAccept || [];
    if (!dPub.pinpoint || !dPub.pinpoint.prompt) bad(std, "debrief has no pinpoint prompt");
    if (!accept.length) bad(std, "pinpoint has no accepted answer");
    for (const id of accept) {
      if (!pieceIds.has(id)) bad(std, `pinpoint accepts ${id}, which is not a piece in this case`);
      // THE one that matters: a decoy never reaches the finished report, so a
      // student could never tap it.
      else if (!inKey.has(id)) bad(std, `pinpoint accepts ${id}, but that sentence is a leftover — it never appears in the report the student taps`);
    }
    if (!dSrv.pinpointWhy || !dSrv.pinpointMiss) bad(std, "pinpoint is missing its why or its miss note");

    const qPub = dPub.quickCheck, qKey = dSrv.quickCheckKey;
    if (!qPub || !(qPub.choices || []).length) bad(std, "debrief has no quick-check choices");
    else {
      const choiceIds = qPub.choices.map((c) => c.id);
      if (new Set(choiceIds).size !== choiceIds.length) bad(std, "quick check has duplicate choice ids");
      if (choiceIds.length < 3) bad(std, `quick check offers only ${choiceIds.length} choices`);
      if (!qKey) bad(std, "quick check has no key");
      else if (!choiceIds.includes(qKey)) bad(std, `quick-check key "${qKey}" is not one of the choices`);
      for (const id of choiceIds) {
        if (!((dSrv.quickCheckWhy || {})[id])) bad(std, `quick-check choice ${id} has no explanation — a student who picks it gets nothing back`);
      }
    }
  }

  // the written question and its rubric
  if (!p.explain || !p.explain.prompt) bad(std, "no explain prompt");
  if (!(s.mustInclude || []).length) bad(std, "no mustInclude rubric");
  if (!s.modelAnswer) bad(std, "no model answer");
  if (/left .*out|stayed in the tray|reject(ed)? those/i.test((p.explain || {}).prompt || "")) {
    bad(std, "the written question still asks about the leftovers — that is the debrief's job now");
  }
  if (!s.requester || !s.requester.replies) bad(std, "no requester reply");
  console.log(`  checked ${std} — ${p.rounds.length} rounds, ${pieceIds.size} sentences`);
}

console.log(fails ? `\n${fails} PROBLEMS` : "\nEVERY CASE IS INTERNALLY CONSISTENT");
process.exit(fails ? 1 : 0);
