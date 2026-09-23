// Assembly Deck server-case registry. Never imported by client code — it
// carries every answer key, the decoy reasons, and the grading rubric.

import { SERVER_CASE as CASE_3_6A_AD } from "./3-6A-AD.server";
import { SERVER_CASE as CASE_3_12B_AD } from "./3-12B-AD.server";
import { SERVER_CASE as CASE_3_11B_AD } from "./3-11B-AD.server";
import { SERVER_CASE as CASE_3_13A_AD } from "./3-13A-AD.server";
import { SERVER_CASE as CASE_3_10C_AD } from "./3-10C-AD.server";
import { SERVER_CASE as CASE_4_10B_AD } from "./4-10B-AD.server";
import { SERVER_CASE as CASE_4_8B_AD } from "./4-8B-AD.server";
import { SERVER_CASE as CASE_4_9B_AD } from "./4-9B-AD.server";
import { SERVER_CASE as CASE_4_12B_AD } from "./4-12B-AD.server";
import { SERVER_CASE as CASE_4_11B_AD } from "./4-11B-AD.server";
import { SERVER_CASE as CASE_SS_4_6B_AD } from "./SS-4-6B-AD.server";
import { SERVER_CASE as CASE_SS_5_4C_AD } from "./SS-5-4C-AD.server";
import { SERVER_CASE as CASE_ELA_3_12B_AD } from "./ELA-3-12B-AD.server";
import { SERVER_CASE as CASE_ELA_5_12C_AD } from "./ELA-5-12C-AD.server";

const CASES = {
  "3.6A-AD": CASE_3_6A_AD,
  "3.12B-AD": CASE_3_12B_AD,
  "3.11B-AD": CASE_3_11B_AD,
  "3.13A-AD": CASE_3_13A_AD,
  "3.10C-AD": CASE_3_10C_AD,
  "4.10B-AD": CASE_4_10B_AD,
  "4.8B-AD": CASE_4_8B_AD,
  "4.9B-AD": CASE_4_9B_AD,
  "4.12B-AD": CASE_4_12B_AD,
  "4.11B-AD": CASE_4_11B_AD,
  "SS.4.6B-AD": CASE_SS_4_6B_AD,
  "SS.5.4C-AD": CASE_SS_5_4C_AD,
  "ELA.3.12B-AD": CASE_ELA_3_12B_AD,
  "ELA.5.12C-AD": CASE_ELA_5_12C_AD,
};

export function getAssemblyDeckServerCase(standard) {
  return CASES[standard] || null;
}

function roundKey(serverCase, roundId) {
  return ((serverCase && serverCase.rounds) || {})[roundId] || null;
}

// Every piece id that belongs in a slot for this round, plus its decoy ids.
// Derived from the key so a round can never disagree with itself.
function indexRound(rk) {
  const placed = {};
  Object.entries((rk && rk.key) || {}).forEach(([slotId, ids]) => {
    (ids || []).forEach((id) => { placed[id] = slotId; });
  });
  return { placed, decoyIds: Object.keys((rk && rk.decoys) || {}) };
}

// Grade one paragraph board.
//   board: { [slotId]: [pieceId, ...] }
export function gradeRound(serverCase, roundId, board) {
  const rk = roundKey(serverCase, roundId);
  if (!rk) return { results: [], correct: 0, total: 0, perfect: false };
  const { placed } = indexRound(rk);
  const results = [];
  let correct = 0;
  Object.entries(board || {}).forEach(([slotId, ids]) => {
    (ids || []).forEach((pieceId) => {
      const belongsIn = placed[pieceId] || null;
      const ok = belongsIn === slotId;
      if (ok) correct += 1;
      results.push({
        pieceId,
        slotId,
        correct: ok,
        kind: ok ? "ok" : belongsIn ? "spot" : "out",
        note: ok ? null : belongsIn
          ? (rk.misplacementNotes || {})[pieceId] || "This sentence belongs somewhere else in the paragraph."
          : (rk.decoys || {})[pieceId] || "This sentence does not belong in this paragraph at all.",
      });
    });
  });
  const total = Object.keys(placed).length;
  return { results, correct, total, perfect: correct === total && results.length === total };
}

// Grade the reject step for one round.
//   rejections: { [pieceId]: reasonKey }
export function gradeRejections(serverCase, roundId, rejections) {
  const rk = roundKey(serverCase, roundId);
  if (!rk) return { results: [], correct: 0, total: 0, perfect: false };
  const answers = rejections || {};
  const results = Object.entries(rk.decoyReason || {}).map(([pieceId, reasonKey]) => {
    const chosen = answers[pieceId] || null;
    return { pieceId, chosen, correctReason: reasonKey, correct: chosen === reasonKey, why: (rk.decoys || {})[pieceId] || null };
  });
  const correct = results.filter((r) => r.correct).length;
  return { results, correct, total: results.length, perfect: results.length > 0 && correct === results.length };
}

// Grade the assembly round — which finished paragraph goes in which position.
//   order: { [assemblySlotId]: roundId }
export function gradeAssembly(serverCase, order) {
  const key = (serverCase && serverCase.assemblyKey) || {};
  const entries = Object.entries(key);
  const submitted = order || {};
  const results = entries.map(([slotId, roundId]) => ({ slotId, expected: roundId, chosen: submitted[slotId] || null, correct: submitted[slotId] === roundId }));
  const correct = results.filter((r) => r.correct).length;
  return { results, correct, total: entries.length, perfect: entries.length > 0 && correct === entries.length };
}

// ---- Editor's Trap (Sept 22, 2026) ----
// After the paragraphs are assembled, S.A.M. slips one bad sentence into a
// finished paragraph and dares the student to find it. The trap text lives
// here, never in the public case, and the answer is checked by POSITION: the
// route rebuilds the same paragraph from the student's own board, inserts the
// trap where the case says, and compares the index the student tapped. So the
// client is handed sentences, not ids, and there is nothing in the payload
// that gives the intruder away.
export function trapSentences(serverCase, publicRound, board) {
  const trap = serverCase && serverCase.trap;
  if (!trap) return null;
  const ordered = (publicRound.slots || []).flatMap((slot) =>
    ((board || {})[slot.id] || []).map((id) => (publicRound.pieces.find((p) => p.id === id) || {}).text || "")
  ).filter(Boolean);
  const at = Math.max(0, Math.min(trap.position, ordered.length));
  const sentences = [...ordered.slice(0, at), trap.text, ...ordered.slice(at)];
  return { roundId: trap.roundId, sentences, position: at };
}

export function trapVerdict(serverCase, publicRound, board, chosenIndex) {
  const t = trapSentences(serverCase, publicRound, board);
  if (!t) return null;
  const correct = Number(chosenIndex) === t.position;
  return { correct, position: t.position, text: serverCase.trap.text, why: serverCase.trap.why };
}

// ---- Chief's Debrief (Sept 22, 2026) ----
// Two short questions after the trap, on the finished report. They exist
// because the leftovers were carrying the whole end of the case: the student
// sorted leftovers three times and was then asked to WRITE about leftovers.
// The debrief asks about the report itself instead.
//
// PINPOINT — the student taps one sentence in the report they assembled. It is
// graded by piece id against an accept list, so more than one sentence can be
// the right answer when the case genuinely has two that carry the idea.
export function gradePinpoint(serverCase, pieceId) {
  const d = (serverCase && serverCase.debrief) || null;
  if (!d || !Array.isArray(d.pinpointAccept)) return null;
  const correct = !!pieceId && d.pinpointAccept.includes(pieceId);
  return {
    pieceId: pieceId || null,
    correct,
    accepted: d.pinpointAccept,
    why: correct ? d.pinpointWhy || null : d.pinpointMiss || null,
  };
}

// QUICK CHECK — one multiple-choice question tied to the case's standard.
export function gradeQuickCheck(serverCase, choiceId) {
  const d = (serverCase && serverCase.debrief) || null;
  if (!d || !d.quickCheckKey) return null;
  const correct = choiceId === d.quickCheckKey;
  return {
    choiceId: choiceId || null,
    correct,
    key: d.quickCheckKey,
    // The explanation for the choice the student actually made, so a wrong
    // answer gets told what was wrong with ITS reasoning, not just the key.
    why: ((d.quickCheckWhy || {})[choiceId] || null),
    keyWhy: ((d.quickCheckWhy || {})[d.quickCheckKey] || null),
  };
}

export function gradeWhatIf(serverCase, choiceId) {
  const spec = serverCase && serverCase.whatIf;
  if (!spec || !spec.key) return null;
  const correct = choiceId === spec.key;
  const known = spec.why && Object.prototype.hasOwnProperty.call(spec.why, choiceId);
  return {
    choiceId: choiceId || null,
    correct,
    key: spec.key,
    why: known ? spec.why[choiceId] : "Power only moves forward from the plants. Both animals are after them.",
    keyWhy: (spec.why || {})[spec.key] || null,
    walk: spec.walk || [],
    walkLine: spec.walkLine || null,
  };
}

export function gradeLook(serverCase, choiceId, attempt) {
  const spec = serverCase && serverCase.look;
  if (!spec || !spec.key) return null;
  const correct = choiceId === spec.key;
  const second = Number(attempt) >= 2;
  return {
    choiceId: choiceId || null,
    correct,
    kept: !correct && second,
    why: correct ? spec.why : second ? null : spec.hint,
  };
}

export function gradeRepair(serverCase, text, attempt) {
  const spec = serverCase && serverCase.repair;
  if (!spec) return null;
  const raw = String(text || "").trim();
  const t = raw.toLowerCase();
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length < 6) {
    return { correct: false, why: "Make it a full sentence the log could use.", model: Number(attempt) >= 2 ? spec.model : null };
  }
  const neg = /\b(never|not|no|don't|dont|didn't|didnt|doesn't|doesnt|none|nobody|wasn't|wasnt|isn't|isnt)\b/.test(t);
  const bearEats = /\bbear\b[^.]{0,40}\b(eats|ate|eat|eating)\b/.test(t);
  if (bearEats && !neg) {
    return { correct: false, why: "That still says a bear did it. The notes never showed a bear.", model: Number(attempt) >= 2 ? spec.model : null };
  }
  if (neg && (/\bbear\b/.test(t) || /\bnotes\b/.test(t))) {
    return { correct: true, why: spec.why };
  }
  return {
    correct: false,
    why: "Say what the notes never showed. A fixed sentence has to be true.",
    model: Number(attempt) >= 2 ? spec.model : null,
  };
}

// Which reply the person who asked for the report sends back.
export function requesterReply(serverCase, graded, trapCaught) {
  const r = serverCase && serverCase.requester;
  if (!r) return null;
  const decoyRate = graded.decoys.total ? graded.decoys.correct / graded.decoys.total : 1;
  const tier = graded.buildPerfect && graded.rejectPerfect && graded.assemblyPerfect
    ? "great"
    : decoyRate >= 0.5 && graded.assemblyPerfect
    ? "good"
    : "rough";
  return { name: r.name, emoji: r.emoji, tier, text: (r.replies || {})[tier] || null, trapCaught: !!trapCaught };
}

// Whole-case roll-up, recomputed server-side at submit time from the boards
// the client sends. The client's own scores are never trusted.
export function gradeCase(serverCase, payload) {
  const roundIds = Object.keys((serverCase && serverCase.rounds) || {});
  const rounds = roundIds.map((id) => {
    const build = gradeRound(serverCase, id, (payload.boards || {})[id]);
    const rejects = gradeRejections(serverCase, id, (payload.rejections || {})[id]);
    return { id, build, rejects };
  });
  const assembly = gradeAssembly(serverCase, payload.assembly);
  const placement = rounds.reduce((a, r) => ({ correct: a.correct + r.build.correct, total: a.total + r.build.total }), { correct: 0, total: 0 });
  const decoys = rounds.reduce((a, r) => ({ correct: a.correct + r.rejects.correct, total: a.total + r.rejects.total }), { correct: 0, total: 0 });
  // Both debrief answers are regraded here from what the client sends, exactly
  // like every other score — the client's own verdict is never trusted.
  const pinpoint = gradePinpoint(serverCase, payload.pinpointPieceId);
  const quickCheck = gradeQuickCheck(serverCase, payload.quickCheckChoiceId);
  return {
    rounds,
    assembly,
    placement,
    decoys,
    pinpoint,
    quickCheck,
    buildPerfect: placement.total > 0 && placement.correct === placement.total,
    rejectPerfect: decoys.total > 0 && decoys.correct === decoys.total,
    assemblyPerfect: assembly.perfect,
  };
}
