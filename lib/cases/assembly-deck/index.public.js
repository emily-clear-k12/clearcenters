// Assembly Deck public-case registry — mirrors simulation-lab's
// index.public.js. One entry per authored case (see
// AssemblyDeck_Digital_Design_v1.md §11 for the wave plan).
// Case codes carry the -AD suffix so they can never collide with the same
// TEKS number in another engine, and Math/ELAR use the MA./ELA. prefixes.
//
// A case is a whole short PIECE, not one paragraph (Emily's Sept 22 call —
// these have to fill a ~20-minute center rotation): two or three paragraph
// builds, each with its own tray and its own decoys, then an assembly round
// that puts the finished paragraphs in order, then the written explanation.
// Rounds are labeled by CONTENT, never by position, so the assembly round is
// a real structure decision instead of a formality.

import { PUBLIC_CASE as CASE_3_6A_AD } from "./3-6A-AD.public";
import { PUBLIC_CASE as CASE_3_12B_AD } from "./3-12B-AD.public";
import { PUBLIC_CASE as CASE_3_11B_AD } from "./3-11B-AD.public";
import { PUBLIC_CASE as CASE_3_13A_AD } from "./3-13A-AD.public";
import { PUBLIC_CASE as CASE_3_10C_AD } from "./3-10C-AD.public";
import { PUBLIC_CASE as CASE_4_10B_AD } from "./4-10B-AD.public";
import { PUBLIC_CASE as CASE_4_8B_AD } from "./4-8B-AD.public";
import { PUBLIC_CASE as CASE_4_9B_AD } from "./4-9B-AD.public";
import { PUBLIC_CASE as CASE_4_12B_AD } from "./4-12B-AD.public";
import { PUBLIC_CASE as CASE_4_11B_AD } from "./4-11B-AD.public";
import { PUBLIC_CASE as CASE_5_6B_AD } from "./5-6B-AD.public";
import { PUBLIC_CASE as CASE_5_8C_AD } from "./5-8C-AD.public";
import { PUBLIC_CASE as CASE_5_12B_AD } from "./5-12B-AD.public";
import { PUBLIC_CASE as CASE_5_10C_AD } from "./5-10C-AD.public";
import { PUBLIC_CASE as CASE_3_7B_AD } from "./3-7B-AD.public";
import { PUBLIC_CASE as CASE_3_8A_AD } from "./3-8A-AD.public";
import { PUBLIC_CASE as CASE_3_9A_AD } from "./3-9A-AD.public";
import { PUBLIC_CASE as CASE_3_12C_AD } from "./3-12C-AD.public";
import { PUBLIC_CASE as CASE_4_8C_AD } from "./4-8C-AD.public";
import { PUBLIC_CASE as CASE_4_9A_AD } from "./4-9A-AD.public";
import { PUBLIC_CASE as CASE_4_10A_AD } from "./4-10A-AD.public";
import { PUBLIC_CASE as CASE_4_10C_AD } from "./4-10C-AD.public";
import { PUBLIC_CASE as CASE_5_8B_AD } from "./5-8B-AD.public";
import { PUBLIC_CASE as CASE_5_9_AD } from "./5-9-AD.public";
import { PUBLIC_CASE as CASE_5_10A_AD } from "./5-10A-AD.public";
import { PUBLIC_CASE as CASE_5_12A_AD } from "./5-12A-AD.public";
import { PUBLIC_CASE as CASE_SS_3_5B_AD } from "./SS-3-5B-AD.public";
import { PUBLIC_CASE as CASE_SS_3_7C_AD } from "./SS-3-7C-AD.public";
import { PUBLIC_CASE as CASE_SS_3_9A_AD } from "./SS-3-9A-AD.public";
import { PUBLIC_CASE as CASE_SS_3_14B_AD } from "./SS-3-14B-AD.public";
import { PUBLIC_CASE as CASE_SS_4_2C_AD } from "./SS-4-2C-AD.public";
import { PUBLIC_CASE as CASE_SS_4_3D_AD } from "./SS-4-3D-AD.public";
import { PUBLIC_CASE as CASE_SS_4_4B_AD } from "./SS-4-4B-AD.public";
import { PUBLIC_CASE as CASE_SS_4_6B_AD } from "./SS-4-6B-AD.public";
import { PUBLIC_CASE as CASE_SS_4_11C_AD } from "./SS-4-11C-AD.public";
import { PUBLIC_CASE as CASE_SS_5_2A_AD } from "./SS-5-2A-AD.public";
import { PUBLIC_CASE as CASE_SS_5_4C_AD } from "./SS-5-4C-AD.public";
import { PUBLIC_CASE as CASE_SS_5_12B_AD } from "./SS-5-12B-AD.public";
import { PUBLIC_CASE as CASE_SS_5_14A_AD } from "./SS-5-14A-AD.public";
import { PUBLIC_CASE as CASE_SS_5_15B_AD } from "./SS-5-15B-AD.public";
import { PUBLIC_CASE as CASE_ELA_3_12B_AD } from "./ELA-3-12B-AD.public";
import { PUBLIC_CASE as CASE_ELA_3_12A_AD } from "./ELA-3-12A-AD.public";
import { PUBLIC_CASE as CASE_ELA_3_12C_AD } from "./ELA-3-12C-AD.public";
import { PUBLIC_CASE as CASE_ELA_3_12D_AD } from "./ELA-3-12D-AD.public";
import { PUBLIC_CASE as CASE_ELA_3_7D_AD } from "./ELA-3-7D-AD.public";
import { PUBLIC_CASE as CASE_ELA_4_12B_AD } from "./ELA-4-12B-AD.public";
import { PUBLIC_CASE as CASE_ELA_4_12C_AD } from "./ELA-4-12C-AD.public";
import { PUBLIC_CASE as CASE_ELA_4_12D_AD } from "./ELA-4-12D-AD.public";
import { PUBLIC_CASE as CASE_ELA_4_7D_AD } from "./ELA-4-7D-AD.public";
import { PUBLIC_CASE as CASE_ELA_5_12B_AD } from "./ELA-5-12B-AD.public";
import { PUBLIC_CASE as CASE_ELA_5_12C_AD } from "./ELA-5-12C-AD.public";
import { PUBLIC_CASE as CASE_ELA_5_12D_AD } from "./ELA-5-12D-AD.public";
import { PUBLIC_CASE as CASE_ELA_5_7D_AD } from "./ELA-5-7D-AD.public";
import { PUBLIC_CASE as CASE_ELA_5_13D_AD } from "./ELA-5-13D-AD.public";
import { PUBLIC_CASE as CASE_MA_3_5A_AD } from "./MA-3-5A-AD.public";
import { PUBLIC_CASE as CASE_MA_3_5B_AD } from "./MA-3-5B-AD.public";
import { PUBLIC_CASE as CASE_MA_3_4K_AD } from "./MA-3-4K-AD.public";
import { PUBLIC_CASE as CASE_MA_3_8B_AD } from "./MA-3-8B-AD.public";
import { PUBLIC_CASE as CASE_MA_4_5A_AD } from "./MA-4-5A-AD.public";
import { PUBLIC_CASE as CASE_MA_4_4H_AD } from "./MA-4-4H-AD.public";
import { PUBLIC_CASE as CASE_MA_4_5B_AD } from "./MA-4-5B-AD.public";
import { PUBLIC_CASE as CASE_MA_4_9B_AD } from "./MA-4-9B-AD.public";
import { PUBLIC_CASE as CASE_MA_5_4B_AD } from "./MA-5-4B-AD.public";
import { PUBLIC_CASE as CASE_MA_5_3K_AD } from "./MA-5-3K-AD.public";
import { PUBLIC_CASE as CASE_MA_5_3L_AD } from "./MA-5-3L-AD.public";
import { PUBLIC_CASE as CASE_MA_5_9C_AD } from "./MA-5-9C-AD.public";

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
  "5.6B-AD": CASE_5_6B_AD,
  "5.8C-AD": CASE_5_8C_AD,
  "5.12B-AD": CASE_5_12B_AD,
  "5.10C-AD": CASE_5_10C_AD,
  "3.7B-AD": CASE_3_7B_AD,
  "3.8A-AD": CASE_3_8A_AD,
  "3.9A-AD": CASE_3_9A_AD,
  "3.12C-AD": CASE_3_12C_AD,
  "4.8C-AD": CASE_4_8C_AD,
  "4.9A-AD": CASE_4_9A_AD,
  "4.10A-AD": CASE_4_10A_AD,
  "4.10C-AD": CASE_4_10C_AD,
  "5.8B-AD": CASE_5_8B_AD,
  "5.9-AD": CASE_5_9_AD,
  "5.10A-AD": CASE_5_10A_AD,
  "5.12A-AD": CASE_5_12A_AD,
  "SS.3.5B-AD": CASE_SS_3_5B_AD,
  "SS.3.7C-AD": CASE_SS_3_7C_AD,
  "SS.3.9A-AD": CASE_SS_3_9A_AD,
  "SS.3.14B-AD": CASE_SS_3_14B_AD,
  "SS.4.2C-AD": CASE_SS_4_2C_AD,
  "SS.4.3D-AD": CASE_SS_4_3D_AD,
  "SS.4.4B-AD": CASE_SS_4_4B_AD,
  "SS.4.6B-AD": CASE_SS_4_6B_AD,
  "SS.4.11C-AD": CASE_SS_4_11C_AD,
  "SS.5.2A-AD": CASE_SS_5_2A_AD,
  "SS.5.4C-AD": CASE_SS_5_4C_AD,
  "SS.5.12B-AD": CASE_SS_5_12B_AD,
  "SS.5.14A-AD": CASE_SS_5_14A_AD,
  "SS.5.15B-AD": CASE_SS_5_15B_AD,
  "ELA.3.12B-AD": CASE_ELA_3_12B_AD,
  "ELA.3.12A-AD": CASE_ELA_3_12A_AD,
  "ELA.3.12C-AD": CASE_ELA_3_12C_AD,
  "ELA.3.12D-AD": CASE_ELA_3_12D_AD,
  "ELA.3.7D-AD": CASE_ELA_3_7D_AD,
  "ELA.4.12B-AD": CASE_ELA_4_12B_AD,
  "ELA.4.12C-AD": CASE_ELA_4_12C_AD,
  "ELA.4.12D-AD": CASE_ELA_4_12D_AD,
  "ELA.4.7D-AD": CASE_ELA_4_7D_AD,
  "ELA.5.12B-AD": CASE_ELA_5_12B_AD,
  "ELA.5.12C-AD": CASE_ELA_5_12C_AD,
  "ELA.5.12D-AD": CASE_ELA_5_12D_AD,
  "ELA.5.7D-AD": CASE_ELA_5_7D_AD,
  "ELA.5.13D-AD": CASE_ELA_5_13D_AD,
  "MA.3.5A-AD": CASE_MA_3_5A_AD,
  "MA.3.5B-AD": CASE_MA_3_5B_AD,
  "MA.3.4K-AD": CASE_MA_3_4K_AD,
  "MA.3.8B-AD": CASE_MA_3_8B_AD,
  "MA.4.5A-AD": CASE_MA_4_5A_AD,
  "MA.4.4H-AD": CASE_MA_4_4H_AD,
  "MA.4.5B-AD": CASE_MA_4_5B_AD,
  "MA.4.9B-AD": CASE_MA_4_9B_AD,
  "MA.5.4B-AD": CASE_MA_5_4B_AD,
  "MA.5.3K-AD": CASE_MA_5_3K_AD,
  "MA.5.3L-AD": CASE_MA_5_3L_AD,
  "MA.5.9C-AD": CASE_MA_5_9C_AD,
};

export function getAssemblyDeckPublicCase(standard) {
  return CASES[standard] || null;
}

export function listAssemblyDeckCases() {
  return Object.values(CASES);
}

// Why a sentence can fail to belong. The student picks one of these for each
// leftover piece — that choice is the real thinking in the reject step, since
// the leftovers themselves are obvious once the board is right. A case offers
// a subset via `reasonOptions`.
export const REJECT_REASONS = [
  { key: "opinion", label: "It's an opinion, not a fact", short: "Opinion" },
  { key: "contradicts", label: "It says the opposite of the notes", short: "Contradicts the notes" },
  { key: "unsupported", label: "The notes never showed this", short: "Not in the notes" },
  { key: "offtopic", label: "It's true, but it belongs somewhere else", short: "Off topic" },
  { key: "story", label: "It's a personal story, not information", short: "Personal story" },
  { key: "anecdote", label: "It's one example, not real evidence", short: "One example" },
];

export function rejectReason(key) {
  return REJECT_REASONS.find((r) => r.key === key) || null;
}

export function reasonOptionsFor(round) {
  const keys = (round && round.reasonOptions) || REJECT_REASONS.map((r) => r.key);
  return REJECT_REASONS.filter((r) => keys.includes(r.key));
}

// Chief's Challenge (Sept 22, 2026) — an opt-in harder run. It adds no new
// content: it takes scaffolding away. Slot hints are hidden, the tray is
// shuffled, every reason chip in the engine is offered instead of the case's
// shortlist, the second-attempt reveal is switched off (you keep trying), and
// the Editor's Trap stops being optional. Crystals go up to match.
export const CHALLENGE = {
  label: "Chief's Challenge",
  blurb: "No slot hints, a shuffled tray, every reason on the table, no second-attempt bail-out, and the Editor's Trap is mandatory. Worth extra crystals.",
  bonusCrystals: 3,
};

export function reasonChipsFor(round, challenge) {
  return challenge ? REJECT_REASONS : reasonOptionsFor(round);
}

// Deterministic shuffle so a reload does not reorder the tray mid-build.
export function trayOrder(round, challenge) {
  const pieces = (round && round.pieces) || [];
  if (!challenge) return pieces;
  const seed = [...(round.id || "")].reduce((n, c) => n + c.charCodeAt(0), pieces.length);
  return pieces
    .map((p, i) => ({ p, k: ((i + 1) * 9301 + seed * 49297) % 233280 }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.p);
}

export function getRound(publicCase, roundId) {
  return ((publicCase && publicCase.rounds) || []).find((r) => r.id === roundId) || null;
}

// How many pieces a perfect round places, and how many leftovers it has.
// Client-safe: it counts slots and pieces, never which is which.
export function roundSize(round) {
  if (!round) return { slotCapacity: 0, leftoverCount: 0 };
  const slotCapacity = (round.slots || []).reduce((n, s) => n + (s.accepts || 1), 0);
  return { slotCapacity, leftoverCount: Math.max(0, (round.pieces || []).length - slotCapacity) };
}

// The sentences a student placed in one round, read back in slot order.
export function roundSentences(round, board) {
  if (!round) return [];
  return (round.slots || [])
    .flatMap((slot) => (((board || {})[slot.id]) || []).map((id) => (round.pieces || []).find((p) => p.id === id)))
    .filter(Boolean)
    .map((p) => ({ pieceId: p.id, text: p.text }));
}

// The finished report: every paragraph in the order the student assembled it,
// sentence by sentence. The Case File overlay reads it, and so does the
// pinpoint question — the student taps one of these sentences.
export function assembledReport(publicCase, boards, assembly) {
  const slots = (publicCase && publicCase.assembly && publicCase.assembly.slots) || [];
  const order = slots.map((s) => (assembly || {})[s.id]).filter(Boolean);
  // Before the assembly round is done, fall back to the authoring order so the
  // Case File still has something to show.
  const ids = order.length ? order : ((publicCase && publicCase.rounds) || []).map((r) => r.id);
  return ids
    .map((id) => {
      const round = getRound(publicCase, id);
      if (!round) return null;
      const sentences = roundSentences(round, (boards || {})[id]);
      return sentences.length ? { roundId: id, label: round.label, sentences } : null;
    })
    .filter(Boolean);
}

// Every sentence a student left in the tray, round by round, with the reason
// they gave for it. This is what the last question used to ask about from
// memory — now the student can open it on any screen.
export function leftoversSoFar(publicCase, boards, rejections) {
  return ((publicCase && publicCase.rounds) || [])
    .map((round) => {
      const placed = new Set(Object.values((boards || {})[round.id] || {}).flat());
      const pieces = (round.pieces || []).filter((p) => !placed.has(p.id));
      // A round nobody has built yet has every piece "left over" — that is not
      // a leftover, it is an unstarted round, so it stays out of the file.
      const started = placed.size > 0;
      if (!started || !pieces.length) return null;
      const chosen = (rejections || {})[round.id] || {};
      return {
        roundId: round.id,
        label: round.label,
        pieces: pieces.map((p) => ({ pieceId: p.id, text: p.text, reason: chosen[p.id] || null })),
      };
    })
    .filter(Boolean);
}

// Total placements across every round plus the assembly — used for the
// progress bar and the results screen.
export function caseSize(publicCase) {
  const rounds = (publicCase && publicCase.rounds) || [];
  const placements = rounds.reduce((n, r) => n + roundSize(r).slotCapacity, 0);
  const leftovers = rounds.reduce((n, r) => n + roundSize(r).leftoverCount, 0);
  return { rounds: rounds.length, placements, leftovers, assemblySlots: ((publicCase && publicCase.assembly && publicCase.assembly.slots) || []).length };
}
