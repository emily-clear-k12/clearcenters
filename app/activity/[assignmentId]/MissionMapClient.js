"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { GENERIC_HINTS, getCaseHints } from "../../../lib/hints";
import SamIcon from "../../../components/SamIcon";

// Mission Map's own locked palette — light sky-blue with a signal-gold
// accent for cleared ground (revised Aug 30 v3: replaced an initial dark
// "deep space" navy/indigo backdrop per Emily's direct ask after live-
// testing), distinct from Signal Check (navy/teal/violet/gold) and Group
// Chat (violet-led) so it still reads as its own activity even though it
// shares the app shell. The map itself keeps a darker, fog-of-war feel
// (see the SVG mask below) — only the surrounding page chrome went light.
const COLORS = {
  navy: "#0F1830",
  indigo: "#2A2F6B",
  // Light sky-blue surface colors (Emily's ask, Aug 30 — replaced the dark
  // navy/indigo "deep space" backdrop). navy/indigo stay defined above only
  // because they're still used as dark text-on-gold-button / marker-number
  // colors, which read fine in a light theme too.
  skyTop: "#EAF4FF",
  skyBottom: "#BEE0FF",
  gold: "#FFC44D",
  teal: "#00C2C7",
  fogGrey: "#3B4260",
  white: "#1F2A44",
  danger: "#E5484D",
  success: "#1FA35C",
  textMuted: "rgba(31,42,68,.62)",
};

// One consistent move at every checkpoint (pick the right clue from a few
// choices) — see MissionMap_Digital_Design_v1.md §2-3. Only two real phases
// plus the entry screen: brief the mission, walk the path checkpoint by
// checkpoint, then unlock the final written response.
const PHASES = ["brief", "walk", "finalUnlock"];
const PHASE_LABEL = { brief: "Mission Brief", walk: "Walk the Path", finalUnlock: "Final Unlock" };

const CONFIDENCE_LEVELS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

// Same product-wide rule as every other engine: at least 3 of 5 self-check
// questions must be checked before submit unlocks.
const REQUIRED_CHECKS = 3;

// Revised checkpoint flow (Aug 30 v4, per Emily's direct live-test feedback):
// no more instant right/wrong reveal with unlimited retries. A student picks
// an answer and taps Submit to check it — nothing is graded until that
// deliberate tap. Get it right the first time: move on immediately. Get it
// wrong the first time: S.A.M. gives a hint, quietly — no red flash, no X —
// and the student picks again. Whatever they submit the second time is
// final and the mission moves on regardless, right or wrong, so one hard
// checkpoint never blocks the rest of the quest. The right/wrong outcome is
// still recorded for the teacher; it's just never displayed back to the
// student as a red mark on the map, which Emily explicitly didn't want.
const MAX_ATTEMPTS = 2;

// Generic "why did you pick that?" reason chips shown after every checkpoint
// pick, reused as-is for any future case/checkpoint — grade-3 students tap
// one instead of typing, per Emily's ask to scale reading/writing by grade
// (a 4th/5th-grade case can swap this for a short free-text box later; nothing
// here is written specifically for this case's content).
const REASON_CHIPS = [
  { id: "evidence", text: "The evidence showed it" },
  { id: "ruled_out", text: "I ruled out the others" },
  { id: "made_sense", text: "It made the most sense" },
];

// S.A.M.'s reactive in-line dialogue — added Sept 1 2026 after Emily played
// a finished mission and flagged something "blah" about it even though
// nothing was broken. Root cause, worked out together: S.A.M. was a static
// icon that only ever spoke when a student got something wrong (the hint
// text below). It never once reacted to anything going RIGHT, and never
// said a word between checkpoints — so the one character riding along on
// the mission had no presence. These lines are generic and reusable across
// every current and future case (no case-data changes needed), same
// convention as REASON_CHIPS below — picked at random each time so a
// replay doesn't feel scripted. Purely flavor: never affects grading, never
// changes the correct/incorrect record, never shown as a judgment (no
// "wrong!" language even in lockedWrong — same no-shame rule the rest of
// this engine already follows for misses).
const SAM_REACTIONS = {
  firstTry: [
    "Nice read, Cadet — first try, clean signal.",
    "That's the one. You didn't even blink.",
    "Locked in — that's exactly what the evidence was pointing at.",
    "Sharp eyes on that one. Moving you forward.",
    "Yes! Clean catch, Cadet.",
  ],
  recovered: [
    "There it is — knew you'd spot it on a second look.",
    "Good recovery. That's the real signal.",
    "That's it — the extra look paid off.",
    "Nailed it that time. Onward.",
  ],
  lockedWrong: [
    "Tricky one — I've flagged it for your teacher to go over with you.",
    "That didn't land, but the mission keeps moving. Don't let it slow you down.",
    "Not the one I'd have called either, honestly. Pressing on.",
  ],
  arrival: [
    "Next stop's just ahead, Cadet.",
    "Something new to check out up there.",
    "Signal's coming from that marker — go take a look.",
    "One more stop before we're through this stretch.",
    "Eyes open on this next one.",
  ],
};
function pickSamLine(category) {
  const pool = SAM_REACTIONS[category];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Sentence stems for the Final Unlock response box — tap one and it drops
// into the textarea instead of the student having to compose a sentence
// from scratch. Emily's ask, Aug 30 v4: "the writing needs to have sentence
// stems (even for 4th grade) but ones that they can just click on." Each
// case supplies its own `responseStems` (tied to its specific final-answer
// requirement) in its PUBLIC_CASE; this generic opener is always shown
// first so every case gets at least one stem for free, including future
// 4th/5th-grade cases that haven't defined their own yet.
const GENERIC_OPENER_STEM = "In this mission, I found out that ___.";

// Deterministic shuffle so a checkpoint's answer choices don't always land
// in the same position (audited Sept 1, 2026: every single checkpoint
// across all 3 authored cases — 18 for 18 — had its correct answer authored
// as choice "a", since choices are simply written in whatever order reads
// most naturally, with correctness tracked by `id`, never by position — see
// `correctChoiceId`/`correctOptionId` below, both compared by id). Shuffling
// the DISPLAY order here can never change what counts as correct. Seeded
// off (case standard + checkpoint id + a per-choice/option salt + studentId)
// so the order is stable across re-renders and reloads for one student's
// one attempt — it doesn't visibly reshuffle out from under them mid-pick —
// but varies checkpoint to checkpoint and student to student, so no fixed
// position is ever a safe bet. This is the actual, permanent fix: not
// relocating "a" to a different fixed spot in the case data (which just
// moves the same bias somewhere else), but randomizing at render time so it
// can never regress no matter how a future case's choices get authored.
function seededShuffle(array, seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(h, 31) + seed.charCodeAt(i)) | 0;
  }
  function rand() {
    h ^= h << 13; h |= 0;
    h ^= h >>> 17;
    h ^= h << 5; h |= 0;
    return ((h >>> 0) % 100000) / 100000;
  }
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }
  return result;
}

// Every finalResponsePrompt across all 3 authored cases follows the same
// "<intro>. Your answer should: (1) ..., (2) ..., and (3) ..." shape — a
// dense wall of prose with the actual checklist buried inline. Parses that
// into a lead sentence + a real bullet list so a student can use it as a
// checklist while writing (Emily's ask, Sept 1, 2026), without rewriting
// any case's actual content. A prompt that doesn't match this exact shape
// (a future case authored differently) just falls back to one paragraph,
// same as before this existed.
function splitResponsePrompt(text) {
  if (!text) return { lead: "", parts: [] };
  const match = text.match(/^([\s\S]*?Your answer should:)\s*(\(1\)[\s\S]*)$/i);
  if (!match) return { lead: text, parts: [] };
  const lead = match[1].trim();
  const parts = match[2]
    .split(/\(\d+\)\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) =>
      s
        .replace(/,?\s*and\s*$/i, "")
        .replace(/,\s*$/, "")
        .trim()
        .replace(/\.?$/, ".")
    );
  return { lead, parts };
}

function PromptText({ text, style }) {
  const { lead, parts } = splitResponsePrompt(text);
  if (parts.length === 0) return <p style={style}>{text}</p>;
  return (
    <div style={style}>
      <p style={{ margin: "0 0 8px 0" }}>{lead}</p>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {parts.map((p, i) => (
          <li key={i} style={{ marginBottom: 6 }}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

// Reveal radii for the fog-of-war mask, in the SVG's own 0-100 coordinate
// space (see the <svg viewBox="0 0 100 100"> below) — a cleared checkpoint
// burns off a wider patch of fog than the "next stop" peek at the current,
// unresolved checkpoint, so the path ahead is hinted at, not fully spoiled.
const CLEARED_REVEAL_RADIUS = 15;
const CURRENT_PEEK_RADIUS = 9;

function EvidenceBlock({ evidence }) {
  // Optional `evidence.image` support (v9, Aug 31) — added ahead of Emily
  // actually generating any images, so "connecting" one later is just
  // dropping the file at its path and adding one `image: "..."` line to
  // that checkpoint's evidence object, not another round of client code.
  // Same graceful-degradation convention as the background map art: if the
  // path 404s (or nothing's been generated yet), it silently renders
  // nothing rather than a broken-image icon — never blocks the checkpoint.
  const [imageFailed, setImageFailed] = useState(false);
  if (!evidence) return null;
  const icon = evidence.type === "data" ? "📊" : "📖";
  // A checkpoint can override the label (e.g. "FIELD NOTE — VOLUNTEER A") for
  // a conflicting-report checkpoint where two evidence blocks sit side by
  // side and need to read as distinct sources, not two copies of the same one.
  const label = evidence.label || (evidence.type === "data" ? "FIELD DATA" : "FIELD NOTES");
  return (
    <div style={{ background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.14)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
      <div style={{ fontSize: 10.5, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>{icon} {label}</div>
      {evidence.image && !imageFailed && (
        <img
          src={evidence.image}
          alt=""
          onError={() => setImageFailed(true)}
          style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 8, marginBottom: 10, display: "block" }}
        />
      )}
      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(31,42,68,.88)" }}>{evidence.text}</div>
    </div>
  );
}

export default function MissionMapClient({
  assignmentId,
  studentId,
  caseStandard,
  publicCase,
  existingSubmission,
  alreadySubmitted,
  revisionRequested,
  revisionFeedback,
  samSkin,
  samNickname,
}) {
  const router = useRouter();
  // Sept 4, 2026 — S.A.M. expansion: samLabel replaces every literal
  // "S.A.M." text label so a student's chosen nickname shows up everywhere.
  const samLabel = samNickname || "S.A.M.";
  // Scoped by studentId as well as assignmentId (fixed Aug 30, caught by a
  // real live-test bug report): a shared class-wide assignment has ONE
  // assignmentId for every student, but localStorage is shared per browser,
  // not per logged-in student. Without studentId in the key, switching
  // student accounts in the same browser without a hard refresh could show
  // the wrong student's saved-but-never-submitted draft phase (e.g. landing
  // straight on Final Unlock for a student who never got there). The real
  // submitted/graded state was always safe — it's read from the database,
  // scoped by student_id there too — only this transient local draft wasn't.
  const storageKey = `cc_missionmap_draft_${assignmentId}_${studentId || "anon"}`;
  const checkpoints = publicCase.checkpoints;
  const totalCheckpoints = checkpoints.length;

  const draft = (() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  })();

  const [phase, setPhase] = useState(
    alreadySubmitted && !revisionRequested ? "finalUnlock" : draft.phase || "brief"
  );

  // checkpointState[id] = { attempts, resolved, correct, choiceId, reasonId }
  const [checkpointState, setCheckpointState] = useState(draft.checkpointState || {});
  const [currentIndex, setCurrentIndex] = useState(draft.currentIndex || 0);
  const [evidenceLog, setEvidenceLog] = useState(draft.evidenceLog || []);
  const [showCelebration, setShowCelebration] = useState(false);
  // Feature #3 (Aug 31 v7, Emily's ask — "make the Evidence Log itself a
  // bigger payoff" instead of trying to make the map spatially interactive,
  // which is Sector Survey's lane, not Mission Map's — see
  // MissionMap_Digital_Design_v1.md §7). Engine-level, not per-case: works
  // off totalCheckpoints/currentIndex alone, so every current and future
  // Mission Map case gets it for free with zero case-data changes.
  // finalPreviewSeen persists across reloads (it's part of the draft) so the
  // one-time auto-expand only ever fires once per mission attempt; the
  // student can still re-open the collapsed chip as many times as they want.
  const [finalPreviewSeen, setFinalPreviewSeen] = useState(draft.finalPreviewSeen || false);
  const [finalPreviewExpanded, setFinalPreviewExpanded] = useState(false);
  const [mapImageFailed, setMapImageFailed] = useState(false);
  // Click-to-open: the current checkpoint's question doesn't show until the
  // student taps its marker on the map (Emily's explicit ask, Aug 30 v3) —
  // closes automatically whenever the mission advances to a new checkpoint.
  const [checkpointOpen, setCheckpointOpen] = useState(false);

  // The tentative pick + reason chip for whichever checkpoint is currently
  // open — nothing is graded until the student taps Submit (v4 rebuild:
  // no more instant-feedback-on-tap). Reset whenever the open checkpoint
  // changes so a fresh attempt starts blank.
  const [pendingChoiceId, setPendingChoiceId] = useState(null);
  const [pendingReasonId, setPendingReasonId] = useState(null);
  // Grade 4/5 counterpart to pendingReasonId — a short typed sentence instead
  // of a tapped chip (v8, built alongside the first real grade 4/5 cases,
  // completing the branch the schema always anticipated — see
  // MissionMap_Digital_Design_v1.md §7's grade-scaling note). Reset the same
  // way pendingReasonId is.
  const [pendingReasonText, setPendingReasonText] = useState("");
  // "sequence"-type checkpoints track an ordered array of item ids the
  // student has tapped into place, instead of a single pendingChoiceId —
  // every other checkpoint type still uses pendingChoiceId above.
  const [pendingSequenceOrder, setPendingSequenceOrder] = useState([]);
  // predictions[checkpointId] = the option id the student picked in a
  // "predict before you see the evidence" step (only present on checkpoints
  // that define `predictBeforeEvidence`) — set once, then the evidence and
  // choices reveal below it.
  const [predictions, setPredictions] = useState(draft.predictions || {});

  const [hintTextByCheckpoint, setHintTextByCheckpoint] = useState({});
  // S.A.M.'s reactive line — set right after a checkpoint resolves (correct
  // first try / correct after a hint / locked in wrong) and cleared a few
  // seconds later. Separate from arrivalLine below so the two never fight
  // for the same instant: a fresh reaction always takes priority over
  // arrival banter until it clears itself.
  const [samReaction, setSamReaction] = useState(null);
  const samReactionTimer = useRef(null);
  function showSamReaction(category) {
    setSamReaction(pickSamLine(category));
    if (samReactionTimer.current) clearTimeout(samReactionTimer.current);
    samReactionTimer.current = setTimeout(() => setSamReaction(null), 3400);
  }
  // Light arrival banter — a line chosen once per new checkpoint (never on
  // the very first one, and only shown while no fresher reaction is up), so
  // S.A.M. has something to say even on stretches where every answer is
  // right the first time and the reaction line above clears fast.
  const [arrivalLine, setArrivalLine] = useState(null);
  useEffect(() => {
    if (currentIndex > 0 && currentIndex < totalCheckpoints) {
      setArrivalLine(pickSamLine("arrival"));
    } else {
      setArrivalLine(null);
    }
  }, [currentIndex, totalCheckpoints]);

  const [finalResponseText, setFinalResponseText] = useState(
    draft.finalResponseText || (existingSubmission && existingSubmission.mission_map_data && existingSubmission.mission_map_data.finalResponseText) || ""
  );
  // Ref so a tapped sentence stem can land in the textarea and put the
  // cursor at the end, instead of just updating state with no visual focus.
  const finalResponseRef = useRef(null);
  // Strips a trailing blank placeholder (e.g. "...the sparrow could ___.")
  // before inserting, so the student doesn't have to manually delete it
  // themselves before they can keep typing (Emily's ask, Sept 1 2026: "for
  // any sentence starter buttons that you have -- remove the line at the
  // end so the student doesn't have to"). Only trims a blank run sitting at
  // the very end of the stem — a mid-sentence blank like "Energy moves from
  // the ___ to the ___ to the ___ in this food chain." is left alone, since
  // those are meant to be filled in, not trimmed off.
  function stripTrailingBlank(text) {
    return text.replace(/\s*_{2,}\s*\.?\s*$/, "");
  }
  function insertResponseStem(stemText) {
    if (submitted) return;
    const cleaned = stripTrailingBlank(stemText);
    setFinalResponseText((prev) => {
      const trimmed = prev.replace(/\s+$/, "");
      return trimmed ? trimmed + " " + cleaned + " " : cleaned + " ";
    });
    requestAnimationFrame(() => {
      const el = finalResponseRef.current;
      if (el) {
        el.focus();
        const end = el.value.length;
        el.setSelectionRange(end, end);
      }
    });
  }
  const [checklist, setChecklist] = useState(
    draft.checklist || publicCase.selfCheckQuestions.map(() => false)
  );
  const [showChecklistError, setShowChecklistError] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [selfConfidence, setSelfConfidence] = useState(draft.self_confidence || null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(alreadySubmitted);
  // "Clean run" badge — server-verified (never a bare client flag, see the
  // submit route), read back from the submit response. Positive-only: no
  // badge and no message at all when a run isn't clean, never a penalty.
  const [missionCleanRun, setMissionCleanRun] = useState(
    !!(existingSubmission && existingSubmission.mission_map_data && existingSubmission.mission_map_data.cleanRun)
  );
  // Live streak — how many checkpoints in a row (from the start of the
  // mission) were solved on the first try. Since Mission Map is a fixed,
  // sequential path, "consecutive from the start up to wherever the student
  // currently is" IS the current streak — no separate counter/state needed,
  // just read straight off checkpointState each render. Purely a visible,
  // positive momentum cue (Emily's "add light stakes" ask) — never punishes
  // a broken streak, just quietly stops showing until a new one builds.
  const currentStreak = (() => {
    let s = 0;
    for (let i = 0; i < checkpoints.length; i++) {
      const st = checkpointState[checkpoints[i].id];
      if (st && st.resolved && st.correct && st.attempts === 1) s++;
      else break;
    }
    return s;
  })();
  // Manual "Save Progress" — Emily's ask, Sept 1 2026 ("make sure that on
  // signal check and mission map that we have a save progress button where
  // the student can save progress close it and come back to it - i believe
  // we have something like that already set up in group chat"). Same
  // idle/saving/saved/error state-machine as Group Chat's manualSaveState.
  const [manualSaveState, setManualSaveState] = useState("idle");

  // Autosave the in-progress mission to localStorage, same convention as
  // Signal Check — this is client-side draft resilience, separate from the
  // server-side saveProgress() calls at real phase transitions below.
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ phase, checkpointState, currentIndex, evidenceLog, predictions, finalResponseText, checklist, self_confidence: selfConfidence, finalPreviewSeen })
      );
    } catch (err) {}
  }, [phase, checkpointState, currentIndex, evidenceLog, predictions, finalResponseText, checklist, selfConfidence, finalPreviewSeen]);

  // Every time the mission moves to a new checkpoint, close the panel again
  // (so the student is back looking at the map and has to tap the next
  // stop) and clear any tentative pick/reason left over from the last one.
  useEffect(() => {
    setCheckpointOpen(false);
    setPendingChoiceId(null);
    setPendingReasonId(null);
    setPendingReasonText("");
    setPendingSequenceOrder([]);
  }, [currentIndex]);

  // Final-case preview trigger: with 2 checkpoints left to go (scaled to
  // whatever length the case is — see previewThreshold below), auto-expand
  // the "here's what you'll need to explain at the end" card once. Skipped
  // entirely for a 1- or 2-checkpoint case — there's no real "mid-mission"
  // moment to build toward on something that short.
  const previewThreshold = totalCheckpoints > 2 ? totalCheckpoints - 2 : null;
  const reachedFinalPreviewPoint = previewThreshold !== null && currentIndex >= previewThreshold;
  useEffect(() => {
    if (reachedFinalPreviewPoint && !finalPreviewSeen) {
      setFinalPreviewSeen(true);
      setFinalPreviewExpanded(true);
    }
  }, [reachedFinalPreviewPoint, finalPreviewSeen]);

  function saveProgress(fields) {
    return fetch("/api/submission/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, ...fields }),
    }).then((res) => res.ok).catch(() => false);
  }

  function startWalking() {
    setPhase("walk");
    saveProgress({ phase: "walk" });
  }

  // The manual Save Progress button — writes the FULL current state (not
  // just whatever one field a phase-transition autosave happens to touch)
  // to the real server-side mission_map_data column, the same column
  // existingSubmission.mission_map_data is read back from on load. Combined
  // with the client-side localStorage autosave above, this means a student
  // can close the tab and come back on a different device and still land
  // back where they left off, not just in the same browser.
  async function handleManualSave() {
    setManualSaveState("saving");
    const ok = await saveProgress({
      mission_map_data: {
        phase,
        checkpointState,
        currentIndex,
        evidenceLog,
        predictions,
        finalResponseText,
        checklist,
        finalPreviewSeen,
      },
      self_confidence: selfConfidence,
    });
    setManualSaveState(ok ? "saved" : "error");
    if (ok) setTimeout(() => setManualSaveState("idle"), 2000);
  }

  // Checkpoint-indexed hints, not a running counter across the whole
  // mission (fixed Aug 30 v4 while rebuilding this flow) — a hint should
  // match whichever checkpoint the student is actually stuck on. Falls back
  // to the shared generic pool if a case hasn't got a hint written for that
  // checkpoint index yet.
  function requestHint(checkpoint, checkpointIndex) {
    const caseHints = getCaseHints(caseStandard);
    const hint = caseHints[checkpointIndex] || GENERIC_HINTS[checkpointIndex % GENERIC_HINTS.length];
    setHintTextByCheckpoint((prev) => ({ ...prev, [checkpoint.id]: hint }));

    // Sept 4, 2026 — Teacher-facing S.A.M. expansion, Feature A: same
    // fire-and-forget hint-usage log as ActivityClient.js and
    // SignalCheckClient.js — never awaited, never blocks the hint.
    fetch("/api/student/log-hint-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, caseStandard }),
    }).catch(() => {});
  }

  function selectPrediction(checkpointId, optionId) {
    setPredictions((prev) => ({ ...prev, [checkpointId]: optionId }));
  }

  // Submits whatever is currently picked (+ reason chip) for a checkpoint.
  // Nothing is graded until this deliberate tap — no more instant
  // right/wrong reveal on the choice buttons themselves. First submit: if
  // right, move on immediately; if wrong, S.A.M. gives a quiet hint (no red
  // flash, no X — Emily was clear she doesn't want either) and the student
  // gets one more try. Second submit is always final, right or wrong, and
  // the mission keeps moving regardless — one hard checkpoint never blocks
  // the rest of the quest.
  function submitCheckpointAnswer(checkpoint, checkpointIndex) {
    const cpType = checkpoint.type || "standard";
    // "sequence" checkpoints answer with an ordered array, not a single id —
    // everything else (standard/quickScan/showdown) still uses pendingChoiceId.
    const hasAnswer =
      cpType === "sequence"
        ? pendingSequenceOrder.length > 0 && pendingSequenceOrder.length === (checkpoint.items || []).length
        : !!pendingChoiceId;
    if (!hasAnswer) return;
    const existing = checkpointState[checkpoint.id] || { attempts: 0, resolved: false };
    if (existing.resolved) return;

    const attempts = existing.attempts + 1;
    let isCorrect, recordedChoiceId;
    if (cpType === "sequence") {
      recordedChoiceId = pendingSequenceOrder.join(">");
      isCorrect = JSON.stringify(pendingSequenceOrder) === JSON.stringify(checkpoint.correctOrder || []);
    } else if (cpType === "showdown") {
      recordedChoiceId = pendingChoiceId;
      isCorrect = pendingChoiceId === checkpoint.correctSide;
    } else {
      recordedChoiceId = pendingChoiceId;
      isCorrect = pendingChoiceId === checkpoint.correctChoiceId;
    }
    const isFinalAttempt = isCorrect || attempts >= MAX_ATTEMPTS;

    if (!isFinalAttempt) {
      // First miss: quiet hint, no visual "wrong" reveal, try again.
      setCheckpointState((prev) => ({ ...prev, [checkpoint.id]: { attempts, resolved: false } }));
      requestHint(checkpoint, checkpointIndex);
      setPendingChoiceId(null);
      setPendingReasonId(null);
      setPendingReasonText("");
      setPendingSequenceOrder([]);
      return;
    }

    resolveCheckpoint(checkpoint, recordedChoiceId, pendingReasonId, isCorrect, attempts, pendingReasonText);
  }

  function resolveCheckpoint(checkpoint, choiceId, reasonId, correct, attempts, reasonText) {
    setCheckpointState((prev) => ({
      ...prev,
      [checkpoint.id]: { attempts, resolved: true, correct, choiceId, reasonId, reasonText: reasonText || null },
    }));
    // Evidence Log gets the entry whether the checkpoint was cleared
    // correctly or locked in wrong — a locked-in miss is still a real
    // signal worth keeping visible, not erased from the mission record.
    // Nothing here reveals right/wrong to the student — that's tracked for
    // the teacher, not displayed as a red mark, per Emily's explicit ask.
    setEvidenceLog((prev) => [
      ...prev,
      { checkpointId: checkpoint.id, text: checkpoint.evidenceLogEntry, correct },
    ]);
    setPendingChoiceId(null);
    setPendingReasonId(null);
    setPendingReasonText("");
    setPendingSequenceOrder([]);

    // S.A.M. reacts to every checkpoint's real outcome — first real presence
    // beyond the miss-only hint text below (see SAM_REACTIONS above).
    showSamReaction(correct ? (attempts === 1 ? "firstTry" : "recovered") : "lockedWrong");

    const clearedSoFar = currentIndex + 1;
    if (clearedSoFar % 2 === 0 && clearedSoFar < totalCheckpoints) {
      // Mid-path celebration every couple of checkpoints, not just once at
      // the very end (design doc §5).
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1400);
    }

    if (clearedSoFar >= totalCheckpoints) {
      setTimeout(() => {
        setPhase("finalUnlock");
        saveProgress({ phase: "finalUnlock" });
      }, 700);
    } else {
      // The delay lets the character token's CSS transition actually play
      // out to the next checkpoint's map position before its card appears.
      setTimeout(() => setCurrentIndex(clearedSoFar), 700);
    }
  }

  const checkedCount = checklist.filter(Boolean).length;
  const checklistPasses = checkedCount >= REQUIRED_CHECKS;

  function toggleChecklistItem(i) {
    setChecklist((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      return next;
    });
  }

  function pickConfidence(id) {
    setSelfConfidence(id);
    saveProgress({ self_confidence: id });
  }

  function handleRequestSubmit() {
    if (!finalResponseText.trim()) {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!checklistPasses) { setShowChecklistError(true); return; }
    setShowChecklistError(false);
    setShowSubmitConfirm(true);
  }

  async function submitForGrading() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const checkpointResults = checkpoints.map((cp) => {
        const st = checkpointState[cp.id] || { attempts: 0, resolved: false };
        const result = {
          id: cp.id,
          type: cp.type || "standard",
          finalChoiceId: st.choiceId || null,
          firstTryCorrect: !!st.correct && st.attempts === 1,
          attempts: st.attempts,
          lockedInWrong: st.resolved && !st.correct,
          // Not shown to the student, not graded — visible to the teacher
          // as a window into reasoning, and (for a predict-first checkpoint)
          // whether their guess matched the real result. reasonId is the
          // grade-≤3 tapped-chip path; reasonText is the grade-4/5 typed
          // path — a case only ever populates one of the two, depending on
          // publicCase.grade.
          reasonId: st.reasonId || null,
          reasonText: st.reasonText || null,
        };
        if (cp.predictBeforeEvidence && predictions[cp.id] != null) {
          result.predictionChoiceId = predictions[cp.id];
          result.predictionCorrect = predictions[cp.id] === cp.predictBeforeEvidence.correctOptionId;
        }
        return result;
      });

      const res = await fetch("/api/mission-map/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          checkpointResults,
          finalResponseText,
          checklist,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = await res.json().catch(() => ({}));
      setMissionCleanRun(!!data.cleanRun);
      try { localStorage.removeItem(storageKey); } catch (err) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Couldn't submit your mission just now — nothing has been lost. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function confirmSubmit() {
    setShowSubmitConfirm(false);
    submitForGrading();
  }

  // Real background photo added Sept 1 2026 (Emily supplied the image
  // directly) — same convention as Group Chat's and Signal Check's
  // /group-chat/window.jpg and /signal-check/window.jpg: a fixed cover photo
  // plus a CSS scrim layered on top via a positioned sibling div, never a
  // solid `background` color alone. Mission Map's theme is the light
  // sky-blue palette (not Signal Check's dark navy), so the scrim here is a
  // light wash instead of a dark one — just enough to keep white cards and
  // dark text readable over the photo without hiding it.
  const backgroundStyle = {
    minHeight: "100vh",
    backgroundImage: 'url("/mission-map/window.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    fontFamily: "'Inter', sans-serif",
    color: COLORS.white,
    position: "relative",
  };

  // The Evidence Log rendered as a growing "case file" instead of a plain
  // bullet list — a stack of slightly-askew index cards that visibly gets
  // thicker as the mission goes, with a running "X of Y collected" counter.
  // Same component powers both the compact in-progress view (walk phase)
  // and the full view on Final Unlock, so the payoff reads as one
  // continuous object the student has been building the whole time, not two
  // different lists. Pure engine-level presentation — reads only
  // evidenceLog/totalCheckpoints, no case-data changes needed.
  function CaseFileLog({ compact }) {
    const count = evidenceLog.length;
    if (count === 0) {
      if (compact) return null;
      return (
        <div style={{ fontSize: 12.5, color: COLORS.textMuted, fontStyle: "italic", padding: "4px 2px" }}>
          Your case file is still empty — evidence collects here as you clear checkpoints.
        </div>
      );
    }
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700 }}>
            {compact ? "📁 CASE FILE" : "📁 YOUR CASE FILE"}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>{count} of {totalCheckpoints} collected</div>
        </div>
        {/* Redesigned Sept 1 2026 (Emily's ask, from a screenshot of the old
            single-column rotated-card stack): a horizontal grid of squarish
            tiles instead of one long vertical list, so a student can see
            every piece of evidence collected at a glance while writing their
            final response, instead of scrolling through a tall stack. */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
          {evidenceLog.map((e, i) => (
            <div
              key={i}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(31,42,68,.14)",
                borderRadius: 10,
                padding: "12px 12px",
                fontSize: 12.5,
                lineHeight: 1.4,
                color: "rgba(31,42,68,.85)",
                boxShadow: "0 2px 6px rgba(31,42,68,.1)",
                minHeight: compact ? 70 : 90,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ color: COLORS.gold, fontWeight: 700 }}>#{i + 1}</span>
              <span>{e.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // A small persistent-feeling companion line — reuses the same visual
  // shape as SamHint (icon + label + text) so S.A.M. reads as one character
  // whether it's hinting, reacting, or just chatting between checkpoints.
  // Shows samReaction when there is one (a fresh outcome always wins),
  // otherwise falls back to arrivalLine so the map never sits silent.
  function SamBanner() {
    const text = samReaction || arrivalLine;
    if (!text) return null;
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(255,196,77,.1)", border: `1px solid ${COLORS.gold}55`, borderRadius: 12, padding: 12, marginBottom: 14 }}>
        <SamIcon skinKey={samSkin} alt={samLabel} size={28} />
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.gold, marginBottom: 2, letterSpacing: 0.5 }}>{samLabel}</div>
          <div style={{ fontSize: 13.5, color: "rgba(31,42,68,.88)" }}>{text}</div>
        </div>
      </div>
    );
  }

  function SamHint({ checkpointId }) {
    const text = hintTextByCheckpoint[checkpointId];
    if (!text) return null;
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.1)", borderRadius: 12, padding: 12, marginTop: 12 }}>
        <SamIcon skinKey={samSkin} alt={samLabel} size={32} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gold, marginBottom: 2 }}>{samLabel}</div>
          <div style={{ fontSize: 13.5, color: "rgba(31,42,68,.85)" }}>{text}</div>
        </div>
      </div>
    );
  }

  // --- The map itself -------------------------------------------------
  // A background image (Emily supplies one per case at publicCase.mapImage)
  // with checkpoint markers and a character token positioned by percentage
  // coordinates, a dashed path line connecting the gates in order, and a
  // fog-of-war layer with circular cutouts that "burn off" as checkpoints
  // clear. If the image isn't there yet, a themed placeholder gradient
  // stands in so nothing looks broken — same graceful-degradation approach
  // already used for missing case thumbnails elsewhere in the app.
  function MissionMap({ interactive } = {}) {
    const clearedIds = Object.keys(checkpointState).filter((id) => checkpointState[id].resolved);
    const revealCircles = [
      ...checkpoints
        .filter((cp) => clearedIds.includes(cp.id))
        .map((cp) => ({ x: cp.position.x, y: cp.position.y, r: CLEARED_REVEAL_RADIUS })),
    ];
    if (currentIndex < totalCheckpoints) {
      const cur = checkpoints[currentIndex];
      if (!clearedIds.includes(cur.id)) {
        revealCircles.push({ x: cur.position.x, y: cur.position.y, r: CURRENT_PEEK_RADIUS });
      }
    }
    const pathPoints = checkpoints.map((cp) => `${cp.position.x},${cp.position.y}`).join(" ");
    const tokenCp = checkpoints[Math.min(currentIndex, totalCheckpoints - 1)];

    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", background: `linear-gradient(135deg, ${COLORS.skyBottom}, ${COLORS.skyTop})`, marginBottom: 18, boxShadow: "0 8px 20px rgba(31,42,68,.18)" }}>
        {!mapImageFailed && (
          <img
            src={publicCase.mapImage}
            alt=""
            onError={() => setMapImageFailed(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {mapImageFailed && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 11, color: "rgba(31,42,68,.45)", letterSpacing: 1 }}>MAP ART PENDING</div>
          </div>
        )}

        {/* Explicit width/height attributes + explicit mask units, not just
            CSS sizing (hardened Aug 30 v4 — Emily reported not seeing any
            fog at all; this is the most likely real cause, since relying on
            style-only sizing plus default mask units is known to render
            inconsistently in some browsers/webviews). */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <mask id="mm-fog-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {revealCircles.map((c, i) => (
                <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="black" />
              ))}
            </mask>
          </defs>
          <polyline points={pathPoints} fill="none" stroke="rgba(255,196,77,.65)" strokeWidth="0.8" strokeDasharray="2,2" />
          <rect x="0" y="0" width="100" height="100" fill="rgba(8,10,24,.72)" mask="url(#mm-fog-mask)" />
        </svg>

        {checkpoints.map((cp, i) => {
          const st = checkpointState[cp.id];
          const cleared = st && st.resolved;
          const isCurrent = i === currentIndex;
          const clickable = interactive && isCurrent && !cleared && !checkpointOpen;
          // Cleared checkpoints all get the same neutral "done" look — never
          // a right/wrong color or a red X. Whether the final pick was
          // actually correct is recorded for the teacher (see
          // submitForGrading below) but never shown back to the student on
          // the map itself, per Emily's explicit ask (Aug 30 v4).
          const bg = cleared ? COLORS.teal : isCurrent ? COLORS.gold : COLORS.fogGrey;
          return (
            <div
              key={cp.id}
              title={clickable ? `Tap to investigate Checkpoint ${i + 1}` : `Checkpoint ${i + 1}`}
              onClick={clickable ? () => setCheckpointOpen(true) : undefined}
              className={clickable ? "mm-marker-pulse" : undefined}
              style={{
                position: "absolute",
                left: `${cp.position.x}%`,
                top: `${cp.position.y}%`,
                transform: "translate(-50%, -50%)",
                width: isCurrent ? 26 : 18,
                height: isCurrent ? 26 : 18,
                borderRadius: "50%",
                background: bg,
                border: "2px solid rgba(255,255,255,.85)",
                boxShadow: isCurrent ? `0 0 0 6px ${COLORS.gold}33` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: COLORS.navy,
                zIndex: 2,
                cursor: clickable ? "pointer" : "default",
              }}
            >
              {cleared ? "✓" : i + 1}
            </div>
          );
        })}

        {/* Character token — a cheap emoji placeholder standing in for real
            character art, positioned at the current checkpoint and animated
            there via a CSS transition whenever currentIndex advances. */}
        <div
          style={{
            position: "absolute",
            left: `${tokenCp.position.x}%`,
            top: `${tokenCp.position.y}%`,
            transform: "translate(-50%, -140%)",
            transition: "left 700ms ease, top 700ms ease",
            fontSize: 26,
            zIndex: 3,
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,.5))",
          }}
        >
          🧑‍🚀
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={backgroundStyle}>
        <style>{`.mm-scrim { position: fixed; inset: 0; background: linear-gradient(180deg, rgba(234,244,255,.82) 0%, rgba(190,224,255,.86) 100%); z-index: 0; pointer-events: none; }`}</style>
        <div className="mm-scrim" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Transmission received, Cadet.</h1>
          {missionCleanRun && (
            <div style={{ display: "inline-block", background: "rgba(255,196,77,.18)", border: `1px solid ${COLORS.gold}`, borderRadius: 999, padding: "8px 18px", fontWeight: 700, color: COLORS.navy, marginBottom: 14 }}>
              🌟 Clean run — every checkpoint solved on the first try!
            </div>
          )}
          <p style={{ color: COLORS.textMuted }}>
            Your mission report is in. ECHO's read is just a first pass — your teacher is always the scorer of record.
          </p>
          {!selfConfidence && (
            <div style={{ marginTop: 24 }}>
              <div style={{ marginBottom: 10, fontSize: 13.5, color: COLORS.textMuted }}>How solid do you feel about this mission?</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {CONFIDENCE_LEVELS.map((c) => (
                  <button key={c.id} className="mm-btn" onClick={() => pickConfidence(c.id)}
                    style={{ background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.18)", borderRadius: 12, padding: "10px 16px", color: COLORS.white }}>
                    <div style={{ fontSize: 22 }}>{c.emoji}</div>
                    <div style={{ fontSize: 11 }}>{c.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <button className="mm-btn" onClick={() => router.push("/home")}
            style={{ marginTop: 30, background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 700 }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .mm-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .mm-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .mm-choice { transition: all 150ms ease; }
        .mm-marker-pulse { animation: mm-marker-pulse 1.6s ease-in-out infinite; }
        @keyframes mm-marker-pulse { 0%,100%{box-shadow:0 0 0 6px ${COLORS.gold}33;} 50%{box-shadow:0 0 0 12px ${COLORS.gold}00;} }
        .mm-scrim { position: fixed; inset: 0; background: linear-gradient(180deg, rgba(234,244,255,.82) 0%, rgba(190,224,255,.86) 100%); z-index: 0; pointer-events: none; }
      `}</style>
      <div className="mm-scrim" />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", padding: "24px 20px 80px" }}>
        {revisionRequested && (
          <div style={{ background: "rgba(255,196,77,.15)", border: `1px solid ${COLORS.gold}`, borderRadius: 12, padding: 14, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Your teacher asked you to take another pass.</div>
            {revisionFeedback && <div style={{ fontSize: 13.5, color: "rgba(31,42,68,.8)" }}>{revisionFeedback}</div>}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Added Sept 1 2026 (Emily's ask: "once they save the activity
                they might need to get back to the home screen but i dont
                see a button to do that") — Mission Map previously only had
                a "Back to Home" button on the post-submit screen, nothing
                reachable from the Brief/Walk/Final Unlock phases at all. */}
            <button
              type="button"
              className="mm-btn"
              onClick={() => router.push("/home")}
              style={{ background: "none", color: COLORS.white, padding: 0, fontWeight: 700, fontSize: 13 }}
            >
              ← Home
            </button>
            <div style={{ fontSize: 12, letterSpacing: 1, color: COLORS.teal, fontWeight: 700 }}>{PHASE_LABEL[phase]}</div>
            {phase === "walk" && currentStreak >= 2 && (
              <div
                title={`${currentStreak} checkpoints in a row on the first try`}
                style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,196,77,.18)", border: `1px solid ${COLORS.gold}`, borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 700, color: COLORS.navy }}
              >
                ⚡ {currentStreak}
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              type="button"
              className="mm-btn"
              onClick={handleManualSave}
              disabled={manualSaveState === "saving"}
              style={{
                background: "rgba(31,42,68,.06)",
                border: "1px solid rgba(31,42,68,.18)",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              {manualSaveState === "saving" ? "Saving…" : manualSaveState === "saved" ? "✓ Saved" : manualSaveState === "error" ? "Couldn't save — try again" : "💾 Save Progress"}
            </button>
            <div style={{ display: "flex", gap: 5 }}>
              {PHASES.map((p) => (
                <div key={p} style={{ width: 8, height: 8, borderRadius: 4, background: p === phase ? COLORS.gold : "rgba(31,42,68,.18)" }} />
              ))}
            </div>
          </div>
        </div>

        {phase === "brief" && (
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24 }}>{publicCase.title}</h1>
            <p style={{ color: "rgba(31,42,68,.85)", lineHeight: 1.6 }}>{publicCase.mission.briefText}</p>
            <div style={{ background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.1)", borderRadius: 12, padding: 16, margin: "16px 0" }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>MISSION GOAL</div>
              <div>{publicCase.mission.goal}</div>
            </div>
            <MissionMap />
            <button className="mm-btn" onClick={startWalking}
              style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15 }}>
              Begin Mission
            </button>
          </div>
        )}

        {phase === "walk" && (
          <div>
            <MissionMap interactive />

            {showCelebration && (
              <div style={{ textAlign: "center", padding: 10, color: COLORS.gold, fontWeight: 700 }}>✨ Signal clearing — nice work, Cadet ✨</div>
            )}

            {!checkpointOpen && <SamBanner />}

            {reachedFinalPreviewPoint && (
              <div style={{ marginTop: 4, marginBottom: 14 }}>
                {finalPreviewExpanded ? (
                  <div style={{ background: "rgba(255,196,77,.14)", border: `1px solid ${COLORS.gold}`, borderRadius: 14, padding: 16 }}>
                    <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>
                      📂 PREVIEW: YOUR FINAL CASE
                    </div>
                    <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 8, fontStyle: "italic" }}>
                      Keep this in mind for the rest of your mission —
                    </div>
                    <PromptText
                      text={publicCase.finalResponsePrompt}
                      style={{ fontSize: 13.5, color: "rgba(31,42,68,.9)", lineHeight: 1.55, marginBottom: 12 }}
                    />
                    <button
                      className="mm-btn"
                      onClick={() => setFinalPreviewExpanded(false)}
                      style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 10, padding: "8px 16px", fontWeight: 700, fontSize: 13 }}
                    >
                      Got it — keep going →
                    </button>
                  </div>
                ) : (
                  <button
                    className="mm-btn"
                    onClick={() => setFinalPreviewExpanded(true)}
                    style={{ background: "rgba(255,196,77,.12)", border: `1px solid ${COLORS.gold}`, borderRadius: 999, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, color: COLORS.navy }}
                  >
                    📌 Final case preview — tap to view again
                  </button>
                )}
              </div>
            )}

            {currentIndex < totalCheckpoints && !checkpointOpen && (
              <div style={{ textAlign: "center", padding: "10px 0 4px", color: COLORS.textMuted, fontSize: 13 }}>
                📍 Tap the glowing marker on the map to check out Checkpoint {currentIndex + 1}
              </div>
            )}

            {currentIndex < totalCheckpoints && checkpointOpen ? (
              (() => {
                const cp = checkpoints[currentIndex];
                const st = checkpointState[cp.id] || { attempts: 0, resolved: false };
                // Was grade-scaled (3rd tapped a chip, 4th/5th typed a
                // sentence) until Sept 1 2026, when Emily asked for the tap
                // chip for every grade — "for 5th and 4th grade -- can also
                // just put a button like in 3rd grade." Left as a named
                // constant (not inlined `true`) so the free-text path below
                // stays intact and easy to bring back per-grade later if
                // that's ever wanted again.
                const usesReasonChips = true;
                const needsPrediction = !!cp.predictBeforeEvidence && predictions[cp.id] == null;
                // Checkpoint types (added Sept 1 2026, alongside S.A.M.'s
                // reactive dialogue and the streak/clean-run work — all part
                // of the same "something's missing" fix): a checkpoint with
                // no `type` field behaves EXACTLY as before ("standard"), so
                // none of the 3 existing authored cases needed a single edit.
                // "quickScan" skips the reason-chip/textarea step entirely,
                // to actually feel faster, not just be labeled that way.
                const cpType = cp.type || "standard";
                const needsReason = cpType !== "quickScan";
                const hasAnswer =
                  cpType === "sequence"
                    ? pendingSequenceOrder.length > 0 && pendingSequenceOrder.length === (cp.items || []).length
                    : !!pendingChoiceId;
                const canSubmit =
                  hasAnswer &&
                  (!needsReason || (usesReasonChips ? !!pendingReasonId : pendingReasonText.trim().length > 0));
                // Every checkpoint across all 3 authored cases had
                // correctChoiceId: "a" — the FIRST authored choice, every
                // time (confirmed by a full grep audit, Sept 1 2026). The
                // correctness check itself is id-based and untouched here;
                // only the DISPLAY order is shuffled, deterministically per
                // student+checkpoint (same seed => same order on reload, no
                // re-shuffle-to-cheat by refreshing), so this is fixed for
                // good regardless of how future cases happen to be authored.
                const displayChoices = cp.choices ? seededShuffle(cp.choices, `${caseStandard}-${cp.id}-${studentId || ""}`) : [];
                const displayPredictOptions = cp.predictBeforeEvidence
                  ? seededShuffle(cp.predictBeforeEvidence.options, `${caseStandard}-${cp.id}-predict-${studentId || ""}`)
                  : [];
                // Showdown: which evidence block renders first — shuffled
                // the same deterministic way as choices, so "trust A" isn't
                // a free pattern-match across cases.
                const showdownOrder = cpType === "showdown"
                  ? seededShuffle(["A", "B"], `${caseStandard}-${cp.id}-showdown-${studentId || ""}`)
                  : [];
                // Sequence: the pool of not-yet-placed pieces, in shuffled
                // display order (never pre-sorted correctly) — placed pieces
                // are removed from the pool and shown in the ordered strip
                // above it instead.
                const sequenceItems = cp.items || [];
                const sequenceDisplayItems = cpType === "sequence"
                  ? seededShuffle(sequenceItems, `${caseStandard}-${cp.id}-seq-${studentId || ""}`)
                  : [];
                const sequenceAvailable = sequenceDisplayItems.filter((it) => !pendingSequenceOrder.includes(it.id));
                return (
                  <div key={cp.id} style={{ background: "#FFFFFF", border: "1px solid rgba(31,42,68,.12)", boxShadow: "0 4px 16px rgba(31,42,68,.08)", borderRadius: 16, padding: 18, marginTop: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontSize: 12, color: COLORS.textMuted }}>Checkpoint {currentIndex + 1} of {totalCheckpoints}</div>
                      {!st.resolved && (
                        <button
                          className="mm-btn"
                          onClick={() => setCheckpointOpen(false)}
                          style={{ background: "transparent", color: COLORS.textMuted, fontSize: 12, padding: 0 }}
                        >
                          ← Back to map
                        </button>
                      )}
                    </div>
                    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 19, marginTop: 0 }}>{cp.prompt}</h2>

                    {needsPrediction ? (
                      // Predict-before-you-see-it step (only on checkpoints
                      // that define one, e.g. the caged-experiment gate) —
                      // tap a guess, then the real evidence reveals below.
                      <div style={{ background: "rgba(31,42,68,.04)", border: "1px solid rgba(31,42,68,.12)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>{cp.predictBeforeEvidence.question}</div>
                        <div style={{ display: "grid", gap: 8 }}>
                          {displayPredictOptions.map((opt) => (
                            <button
                              key={opt.id}
                              className="mm-btn"
                              onClick={() => selectPrediction(cp.id, opt.id)}
                              style={{ textAlign: "left", background: "#FFFFFF", border: "1px solid rgba(31,42,68,.2)", borderRadius: 10, padding: "10px 14px", color: COLORS.white, fontSize: 13.5 }}
                            >
                              {opt.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {cp.predictBeforeEvidence && (
                          <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 10, fontStyle: "italic" }}>
                            Your guess: {cp.predictBeforeEvidence.options.find((o) => o.id === predictions[cp.id])?.text}
                          </div>
                        )}
                        {cpType === "showdown" ? (
                          // Showdown: two competing evidence blocks, pick
                          // which one actually holds up — no separate choice
                          // list, the evidence IS the answer.
                          <div style={{ display: "grid", gap: 12, marginTop: 4 }}>
                            {showdownOrder.map((side) => {
                              const ev = side === "A" ? cp.evidenceA : cp.evidenceB;
                              if (!ev) return null;
                              const selected = pendingChoiceId === side;
                              return (
                                <div
                                  key={side}
                                  style={{
                                    borderRadius: 14,
                                    border: selected ? `2px solid ${COLORS.gold}` : "1px solid rgba(31,42,68,.14)",
                                    padding: 10,
                                    background: selected ? "rgba(255,196,77,.06)" : "transparent",
                                  }}
                                >
                                  <EvidenceBlock evidence={ev} />
                                  <button
                                    disabled={st.resolved}
                                    onClick={() => setPendingChoiceId(side)}
                                    className="mm-btn"
                                    style={{
                                      width: "100%",
                                      background: selected ? COLORS.gold : "rgba(31,42,68,.05)",
                                      border: selected ? "none" : "1px solid rgba(31,42,68,.18)",
                                      color: selected ? COLORS.navy : COLORS.white,
                                      borderRadius: 10,
                                      padding: "10px 14px",
                                      fontWeight: 700,
                                      fontSize: 13.5,
                                    }}
                                  >
                                    {selected ? "✓ " : ""}{ev.choiceLabel || "Trust this one"}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ) : cpType === "sequence" ? (
                          // Sequence: tap pieces into order; tap a placed
                          // piece again to send it back to the pool. Submit
                          // only enables once every piece has a slot.
                          <div style={{ marginTop: 4 }}>
                            {cp.evidence && <EvidenceBlock evidence={cp.evidence} />}
                            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Tap the pieces into order:</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14, minHeight: 20 }}>
                              {pendingSequenceOrder.length === 0 && (
                                <span style={{ fontSize: 12.5, color: COLORS.textMuted, fontStyle: "italic" }}>Nothing placed yet — tap a piece below.</span>
                              )}
                              {pendingSequenceOrder.map((id, i) => {
                                const it = sequenceItems.find((x) => x.id === id);
                                return (
                                  <button
                                    key={id}
                                    disabled={st.resolved}
                                    onClick={() => setPendingSequenceOrder((prev) => prev.filter((x) => x !== id))}
                                    className="mm-btn"
                                    style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 10, padding: "8px 12px", fontSize: 13, fontWeight: 700 }}
                                  >
                                    {i + 1}. {it ? it.text : id}
                                  </button>
                                );
                              })}
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              {sequenceAvailable.map((it) => (
                                <button
                                  key={it.id}
                                  disabled={st.resolved}
                                  onClick={() => setPendingSequenceOrder((prev) => [...prev, it.id])}
                                  className="mm-btn"
                                  style={{ background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.18)", color: COLORS.white, borderRadius: 10, padding: "8px 12px", fontSize: 13 }}
                                >
                                  {it.text}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          // "standard" and "quickScan" both use this same
                          // evidence + choice-list shape — quickScan is just
                          // a lighter case of it (smaller evidence, 2
                          // choices, no reason step) rather than its own UI.
                          <>
                            <EvidenceBlock evidence={cp.evidence} />
                            {cp.secondEvidence && <EvidenceBlock evidence={cp.secondEvidence} />}
                            <div style={{ display: "grid", gap: 10, marginTop: 4 }}>
                              {displayChoices.map((choice) => {
                                const selected = pendingChoiceId === choice.id;
                                return (
                                  <button
                                    key={choice.id}
                                    disabled={st.resolved}
                                    onClick={() => setPendingChoiceId(choice.id)}
                                    className="mm-btn mm-choice"
                                    style={{
                                      textAlign: "left",
                                      background: selected ? "rgba(255,196,77,.18)" : "rgba(31,42,68,.04)",
                                      border: selected ? `2px solid ${COLORS.gold}` : "1px solid rgba(31,42,68,.16)",
                                      borderRadius: 12,
                                      padding: selected ? "13px 15px" : "14px 16px",
                                      color: COLORS.white,
                                      fontSize: 14.5,
                                    }}
                                  >
                                    {choice.text}
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        )}

                        {hasAnswer && needsReason && usesReasonChips && !st.resolved && (
                          <div style={{ marginTop: 14 }}>
                            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Why'd you pick that?</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                              {REASON_CHIPS.map((chip) => (
                                <button
                                  key={chip.id}
                                  className="mm-btn"
                                  onClick={() => setPendingReasonId(chip.id)}
                                  style={{
                                    background: pendingReasonId === chip.id ? COLORS.gold : "rgba(31,42,68,.05)",
                                    border: "1px solid rgba(31,42,68,.16)",
                                    borderRadius: 20,
                                    padding: "8px 14px",
                                    fontSize: 12.5,
                                    color: COLORS.navy,
                                  }}
                                >
                                  {chip.text}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {hasAnswer && needsReason && !usesReasonChips && !st.resolved && (
                          <div style={{ marginTop: 14 }}>
                            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Why'd you pick that? (one sentence is fine)</div>
                            <textarea
                              value={pendingReasonText}
                              onChange={(e) => setPendingReasonText(e.target.value)}
                              placeholder="I picked this because..."
                              rows={2}
                              style={{ width: "100%", borderRadius: 10, padding: 10, fontSize: 13.5, border: "1px solid rgba(31,42,68,.2)", background: "#FFFFFF", color: COLORS.white, fontFamily: "inherit", resize: "vertical" }}
                            />
                          </div>
                        )}

                        {!st.resolved && (
                          <button
                            className="mm-btn"
                            disabled={!canSubmit}
                            onClick={() => submitCheckpointAnswer(cp, currentIndex)}
                            style={{
                              marginTop: 16,
                              background: canSubmit ? COLORS.gold : "rgba(31,42,68,.15)",
                              color: canSubmit ? COLORS.navy : COLORS.textMuted,
                              borderRadius: 12,
                              padding: "12px 22px",
                              fontWeight: 700,
                              fontSize: 14.5,
                            }}
                          >
                            Submit
                          </button>
                        )}
                      </>
                    )}
                    <SamHint checkpointId={cp.id} />
                  </div>
                );
              })()
            ) : null}

            {evidenceLog.length > 0 && (
              <div style={{ marginTop: 28, borderTop: "1px solid rgba(31,42,68,.14)", paddingTop: 16 }}>
                <CaseFileLog compact />
              </div>
            )}
          </div>
        )}

        {phase === "finalUnlock" && (
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif" }}>Final Unlock</h2>
            <PromptText text={publicCase.finalResponsePrompt} style={{ color: "rgba(31,42,68,.85)" }} />

            <div style={{ marginBottom: 16, background: "rgba(31,42,68,.04)", border: "1px solid rgba(31,42,68,.1)", borderRadius: 12, padding: 14 }}>
              <CaseFileLog />
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>TAP A SENTENCE STARTER</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[GENERIC_OPENER_STEM, ...(publicCase.responseStems || [])].map((stem, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={submitted}
                    onClick={() => insertResponseStem(stem)}
                    style={{
                      background: "rgba(0,194,199,.12)",
                      border: "1px solid rgba(0,194,199,.5)",
                      color: "rgba(31,42,68,.9)",
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: submitted ? "default" : "pointer",
                      opacity: submitted ? 0.5 : 1,
                    }}
                  >
                    {stem}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              ref={finalResponseRef}
              value={finalResponseText}
              onChange={(e) => setFinalResponseText(e.target.value)}
              placeholder="Write your answer using what you collected... or tap a sentence starter above"
              rows={9}
              disabled={submitted}
              style={{ width: "100%", borderRadius: 12, padding: 14, fontSize: 14.5, border: "1px solid rgba(31,42,68,.2)", background: "#FFFFFF", color: COLORS.white, fontFamily: "inherit", resize: "vertical" }}
            />

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>
                Check off the ones that are true — you need at least {REQUIRED_CHECKS} of {publicCase.selfCheckQuestions.length} ({checkedCount}/{publicCase.selfCheckQuestions.length} so far).
              </div>
              {publicCase.selfCheckQuestions.map((q, i) => (
                <label key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, fontSize: 13.5, cursor: "pointer" }}>
                  <input type="checkbox" checked={checklist[i]} onChange={() => toggleChecklistItem(i)} style={{ marginTop: 3 }} />
                  <span>{q}</span>
                </label>
              ))}
              {showChecklistError && (
                <div style={{ color: COLORS.danger, fontSize: 12, fontWeight: 600, marginTop: 6 }}>Check at least {REQUIRED_CHECKS} before submitting.</div>
              )}
            </div>

            <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 16, fontStyle: "italic" }}>
              ECHO's read is just a first pass — your teacher is always the scorer of record.
            </div>

            {submitError && <div style={{ color: COLORS.danger, marginTop: 10 }}>{submitError}</div>}

            <button className="mm-btn" onClick={handleRequestSubmit} disabled={submitting}
              style={{ marginTop: 18, background: COLORS.gold, color: COLORS.navy, borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
              Submit Mission
            </button>
          </div>
        )}
      </div>

      {showSubmitConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,10,20,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(31,42,68,.12)", boxShadow: "0 12px 30px rgba(31,42,68,.2)", borderRadius: 16, padding: 24, maxWidth: 360, textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>Submit this mission?</h3>
            <p style={{ color: "rgba(31,42,68,.75)", fontSize: 13.5 }}>You can't change your answer after this.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
              <button className="mm-btn" onClick={() => setShowSubmitConfirm(false)} style={{ background: "transparent", border: "1px solid rgba(31,42,68,.25)", color: COLORS.white, borderRadius: 10, padding: "10px 18px" }}>Not yet</button>
              <button className="mm-btn" onClick={confirmSubmit} style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 10, padding: "10px 18px", fontWeight: 700 }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
