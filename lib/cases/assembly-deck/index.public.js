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
import { PUBLIC_CASE as CASE_4_10B_AD } from "./4-10B-AD.public";
import { PUBLIC_CASE as CASE_SS_4_6B_AD } from "./SS-4-6B-AD.public";
import { PUBLIC_CASE as CASE_SS_5_4C_AD } from "./SS-5-4C-AD.public";
import { PUBLIC_CASE as CASE_ELA_3_12B_AD } from "./ELA-3-12B-AD.public";
import { PUBLIC_CASE as CASE_ELA_5_12C_AD } from "./ELA-5-12C-AD.public";

const CASES = {
  "3.6A-AD": CASE_3_6A_AD,
  "4.10B-AD": CASE_4_10B_AD,
  "SS.4.6B-AD": CASE_SS_4_6B_AD,
  "SS.5.4C-AD": CASE_SS_5_4C_AD,
  "ELA.3.12B-AD": CASE_ELA_3_12B_AD,
  "ELA.5.12C-AD": CASE_ELA_5_12C_AD,
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

// Total placements across every round plus the assembly — used for the
// progress bar and the results screen.
export function caseSize(publicCase) {
  const rounds = (publicCase && publicCase.rounds) || [];
  const placements = rounds.reduce((n, r) => n + roundSize(r).slotCapacity, 0);
  const leftovers = rounds.reduce((n, r) => n + roundSize(r).leftoverCount, 0);
  return { rounds: rounds.length, placements, leftovers, assemblySlots: ((publicCase && publicCase.assembly && publicCase.assembly.slots) || []).length };
}
