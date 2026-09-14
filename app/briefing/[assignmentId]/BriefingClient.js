"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../../components/BackToHubButton";
import SamGuide from "../../../components/SamGuide";

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  white: "#FFFFFF",
  cream: "#F2F0FA",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  navy: "#0D1B2A",
  success: "#22C55E",
};

// Sept 14, 2026 — Briefings v2 foundation. This used to be a single fixed
// 6-phase array shared by every lesson (SS AND Science), which is exactly
// why Science ended up a copy of the SS shape instead of a real review —
// the player itself couldn't render anything else. PHASES is now computed
// per-briefing inside BriefingClient() from `briefing.phases` (every
// public pack already carries that array); DEFAULT_PHASE_IDS below is
// only a defensive fallback for a pack that somehow omits it.
const DEFAULT_PHASE_IDS = ["intelDrop", "fieldBrief", "reasonSort", "opsChoice", "evidenceDrop", "clearance"];

const PHASE_LABELS = {
  intelDrop: "Intel Drop",
  fieldBrief: "Field Brief",
  reasonSort: "Reason Sort",
  opsChoice: "Ops Choice",
  evidenceDrop: "Evidence Drop",
  clearance: "Clearance",
  // v2 additions — see lib/briefings/schema/mechanics.schema.js for the
  // data contract each of these reads, and quickReview for the Science
  // light-review shape's shorter recap phase (scienceLightReview.schema.js).
  quickReview: "Quick Review",
  matchPairs: "Match Pairs",
  sequenceIt: "Sequence It",
  labelPicture: "Label the Picture",
  trueFalseReason: "True or False",
  // v3 additions (Sept 2026) — the "make them think" pass. These are NEW
  // phase ids, deliberately not modifications of intelDrop/fieldBrief/
  // evidenceDrop, so the three lessons already in the catalog keep running
  // on the old shapes untouched while new lessons opt in to these.
  openingFrame: "Opening",
  storyTeach: "Field Brief",
  synthesis: "Put It Together",
  transfer: "New Town",
};

/** Phases that imply Reason Sort was already past (pre-P2 saves). */
const PHASES_AFTER_REASON_SORT = ["opsChoice", "evidenceDrop", "clearance"];

/** Every practice-mechanic phase id a lesson's `phases` array might use —
 * see lib/briefings/schema/mechanics.schema.js's PRACTICE_MECHANICS
 * (duplicated here, not imported, to keep this client self-contained the
 * way the rest of this file already is). Used to resolve the Clearance
 * "sort"/"practice1"/"practice2" progress gates generically instead of
 * hardcoding "reasonSort" — that hardcoding is exactly what would have
 * silently broken SS-3-2B's gate once it moved to a different mechanic. */
const MECHANIC_PHASE_IDS = ["reasonSort", "matchPairs", "sequenceIt", "labelPicture", "trueFalseReason"];

const SAM_ANCHORS = {
  home: { right: 18, bottom: 18 },
  image: { left: 24, bottom: 24 },
  qc: { right: 24, top: "42%" },
  sort: { right: 18, bottom: 140 },
  chips: { right: 18, bottom: 120 },
  postcard: { left: "42%", bottom: 28 },
  stamp: { right: 28, top: 100 },
};

function renderBold(text) {
  const parts = String(text || "").split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i}>{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}


function fieldBriefPages(briefing) {
  const pages = briefing?.fieldBrief?.pages;
  return Array.isArray(pages) && pages.length > 0 ? pages : null;
}

function fieldBriefPageIndex(field, pages) {
  const n = pages?.length || 0;
  if (!n) return 0;
  const raw = field?.pageIndex != null ? field.pageIndex : field?.beatIndex;
  const i = Number(raw);
  const idx = Number.isFinite(i) ? i : 0;
  return Math.max(0, Math.min(n - 1, idx));
}

function assignmentLaunchIsProject(assignment) {
  const raw = String(assignment?.launchMode || assignment?.launch_mode || assignment?.mode || "").toLowerCase();
  return raw === "project" || raw === "projection";
}

/** Graceful migrate of older phase_state shapes. */
function migratePhaseState(saved) {
  const s = saved || {};
  const intel = s.intel || {};
  const ops = s.ops || {};
  const evidence = s.evidence || {};
  const clearance = s.clearance || {};
  const rs = s.reasonSort || {};
  const currentPhase = s.currentPhase || "intelDrop";
  // Pre-P2 saves that already passed Field Brief into Ops/Evidence/Clearance
  // never had reasonSort — treat as complete so Clearance gates don't brick resume.
  const legacyPastSort =
    !s.reasonSort && PHASES_AFTER_REASON_SORT.includes(currentPhase);
  return {
    currentPhase,
    intel: {
      notice: intel.notice || "",
      wonder: intel.wonder || "",
      claim: intel.claim || "",
      chip: intel.chip || "",
      revealed: Boolean(intel.revealed),
    },
    field: {
      beatIndex: s.field?.beatIndex || 0,
      pageIndex: s.field?.pageIndex != null ? s.field.pageIndex : s.field?.beatIndex || 0,
      answers: s.field?.answers || {},
      graded: Boolean(s.field?.graded),
      results: s.field?.results || null,
      pageChips: s.field?.pageChips || {},
    },
    reasonSort: {
      assignments: rs.assignments || {},
      selectedItemId: rs.selectedItemId || "",
      checked: Boolean(rs.checked),
      results: rs.results || null,
      passed: Boolean(rs.passed) || legacyPastSort,
      legacySkipped: Boolean(rs.legacySkipped) || legacyPastSort,
    },
    ops: {
      picks: ops.picks || [],
      chips: ops.chips || [],
      justification: ops.justification || "",
      deferredReasonId: ops.deferredReasonId || "",
      debrief: Boolean(ops.debrief),
      consequence: ops.consequence || null,
      // v3: which townsperson's warning the student said came true.
      whoseAnswer: ops.whoseAnswer || "",
    },
    evidence: {
      sceneId: evidence.sceneId || "",
      reason: evidence.reason || "",
      evidence: evidence.evidence || "",
      score: evidence.score ?? null,
      postcardSide: evidence.postcardSide || "front",
      transmitPreview: Boolean(evidence.transmitPreview),
      fundPickId: evidence.fundPickId || "",
    },
    clearance: {
      answers: clearance.answers || {},
      // Legacy honesty taps ignored for gating; kept for old payload shape.
      selfCheck: clearance.selfCheck || [],
      graded: Boolean(clearance.graded),
      results: clearance.results || null,
    },
    // v2 mechanic state slices. Unconditionally present (like the ones
    // above) so a lesson can use any subset without extra migration code;
    // a lesson that doesn't use a given mechanic just never touches it.
    quickReview: {
      quickCheckAnswer: s.quickReview?.quickCheckAnswer || "",
      graded: Boolean(s.quickReview?.graded),
      results: s.quickReview?.results || null,
    },
    matchPairs: {
      selectedLeftId: s.matchPairs?.selectedLeftId || "",
      matches: s.matchPairs?.matches || {},
      checked: Boolean(s.matchPairs?.checked),
      results: s.matchPairs?.results || null,
      passed: Boolean(s.matchPairs?.passed),
    },
    sequenceIt: {
      order: s.sequenceIt?.order || null, // null = not yet shuffled this session
      checked: Boolean(s.sequenceIt?.checked),
      results: s.sequenceIt?.results || null,
      passed: Boolean(s.sequenceIt?.passed),
    },
    labelPicture: {
      selectedWordId: s.labelPicture?.selectedWordId || "",
      placements: s.labelPicture?.placements || {},
      checked: Boolean(s.labelPicture?.checked),
      results: s.labelPicture?.results || null,
      passed: Boolean(s.labelPicture?.passed),
    },
    trueFalseReason: {
      answers: s.trueFalseReason?.answers || {},
      checked: Boolean(s.trueFalseReason?.checked),
      results: s.trueFalseReason?.results || null,
      passed: Boolean(s.trueFalseReason?.passed),
    },
    // --- v3 slices ---
    openingFrame: {
      isIt: s.openingFrame?.isIt || "",
      traits: s.openingFrame?.traits || [],
      traitsDone: Boolean(s.openingFrame?.traitsDone),
      // The prediction is deliberately NOT graded here — it's settled at the
      // end of storyTeach, which is the whole point of making it a prediction.
      prediction: s.openingFrame?.prediction || "",
      locked: Boolean(s.openingFrame?.locked),
    },
    storyTeach: {
      beatIndex: s.storyTeach?.beatIndex || 0,
      // per beat: { choiceIndex, named, stretchIndex }
      beats: s.storyTeach?.beats || {},
      done: Boolean(s.storyTeach?.done),
    },
    synthesis: {
      order: s.synthesis?.order || [],
      orderDone: Boolean(s.synthesis?.orderDone),
      causeIndex: s.synthesis?.causeIndex || 0,
      causeAnswers: s.synthesis?.causeAnswers || {},
      causesDone: Boolean(s.synthesis?.causesDone),
      removed: s.synthesis?.removed || "",
      breakAnswer: s.synthesis?.breakAnswer || "",
      passed: Boolean(s.synthesis?.passed),
    },
    transfer: {
      tapped: s.transfer?.tapped || [],
      claim: s.transfer?.claim || "",
      checked: Boolean(s.transfer?.checked),
      results: s.transfer?.results || null,
      passed: Boolean(s.transfer?.passed),
    },
  };
}

/* --------------------------------------------------------------------
 * Read aloud (Web Speech API).
 *
 * Every task in a briefing is gated on reading 20-40 words, so a student
 * who can't decode can't reach the thinking at all. This reads the
 * rendered phase card — prompts AND answer choices, because for a
 * struggling reader the options matter as much as the question.
 *
 * Deliberately the browser's own synthesis rather than recorded audio:
 * recorded sounds better but has to be re-cut every time a line changes,
 * which the AI batch-generation pipeline can't carry. Voice quality is
 * therefore whatever the device has. Browsers also block audio that
 * starts without a gesture, so a phase can't read itself on open — it
 * always takes a tap.
 * ------------------------------------------------------------------ */
const TTS_SKIP = new Set(["AGENT TIP", "←", "→"]);

function collectSpeakable(root) {
  if (!root) return [];
  const out = [];
  const walk = (node) => {
    if (!node) return;
    // Don't read the read-aloud control itself.
    if (node.dataset && node.dataset.ttsSkip === "1") return;
    if (node.nodeType === 3) {
      const t = node.textContent.replace(/\s+/g, " ").trim();
      if (t && !TTS_SKIP.has(t)) out.push(t);
      return;
    }
    if (node.nodeType !== 1) return;
    const style = typeof window !== "undefined" ? window.getComputedStyle(node) : null;
    if (style && (style.display === "none" || style.visibility === "hidden")) return;
    node.childNodes.forEach(walk);
  };
  walk(root);
  // Merge adjacent fragments (bold spans split sentences into pieces) and
  // keep utterances short enough that Stop feels responsive.
  const merged = [];
  let buf = "";
  out.forEach((t) => {
    buf = buf ? `${buf} ${t}` : t;
    if (buf.length > 160 || /[.!?:]$/.test(t)) {
      merged.push(buf);
      buf = "";
    }
  });
  if (buf) merged.push(buf);
  return merged;
}

function useReadAloud() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const voiceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    setSupported(true);
    const pick = () => {
      const en = window.speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
      if (!en.length) return;
      const nicer = en.filter((v) => /natural|google|samantha|aria|zira|enhanced|premium/i.test(v.name));
      voiceRef.current = nicer[0] || en[0];
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (chunks) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const list = [].concat(chunks).filter((s) => s && s.trim());
      if (!list.length) return;
      setSpeaking(true);
      list.forEach((text, i) => {
        const u = new SpeechSynthesisUtterance(text.trim());
        if (voiceRef.current) u.voice = voiceRef.current;
        u.rate = 0.95;
        u.pitch = 1.02;
        if (i === list.length - 1) {
          u.onend = () => setSpeaking(false);
          u.onerror = () => setSpeaking(false);
        }
        window.speechSynthesis.speak(u);
      });
    },
    []
  );

  return { speak, stop, speaking, supported };
}

/** Deterministic-enough shuffle seeded off a stable id string, so a
 * reload doesn't keep re-shuffling a sequence the student already
 * partially ordered (see SequenceIt below, which persists `order` once
 * generated rather than recomputing every render). */
function shuffleWithSeed(arr, seed) {
  const a = [...arr];
  let s = String(seed || "seed")
    .split("")
    .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 233280, 7);
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


function fillClaimFrame(frame, chip) {
  const f = frame || "I think this place exists because __________.";
  if (!chip) return f;
  if (f.includes("__________")) return f.replace("__________", chip);
  return `${f.trim()} ${chip}`;
}

function projectLabel(briefing, id) {
  return briefing.opsChoice.projects.find((p) => p.id === id)?.label || id;
}

function teksProjects(briefing) {
  return (briefing.opsChoice?.projects || []).filter((p) => p.teks !== false && !p.distractor);
}

function deferredTeksProject(briefing, picks) {
  const funded = new Set(picks || []);
  const waiting = teksProjects(briefing).filter((p) => !funded.has(p.id));
  return waiting.length === 1 ? waiting[0] : null;
}

function evidenceChipToReasonChoice(chip, extra) {
  const map = {
    "posted rules / firefighters / speed limits": "a",
    "place to worship freely": "b",
    "market, farms, jobs, homes": "c",
    ...(extra || {}),
  };
  return map[chip] || null;
}

function reasonIdToChoice(reasonId, extra) {
  const map = {
    security: "a",
    religious: "b",
    material: "c",
    "security and laws": "a",
    "religious freedom": "b",
    "material well-being": "c",
    ...(extra || {}),
  };
  return map[reasonId] || null;
}

function PostcardMissionTrail({ briefing, art, evidence, compact }) {
  const ev = evidence || {};
  const scene = (briefing.evidenceDrop?.frontScenes || []).find((s) => s.id === ev.sceneId);
  const img = scene?.imageKey ? art?.[scene.imageKey] : null;
  if (!ev.sceneId && !ev.reason && !ev.evidence) return null;
  return (
    <div
      style={{
        marginTop: compact ? 12 : 16,
        borderRadius: 16,
        border: `2px solid ${COLORS.violet}`,
        background: COLORS.white,
        padding: compact ? 12 : 16,
        boxShadow: "0 8px 20px rgba(123,93,255,.12)",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.gold, letterSpacing: 0.5, marginBottom: 8 }}>
        {briefing.clearance?.postcardReceivedLabel || "HQ received · mission trail postcard"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "140px 1fr", gap: 12, alignItems: "center" }}>
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            background: COLORS.violetSoft,
            minHeight: 96,
            display: "grid",
            placeItems: "center",
            fontSize: 36,
          }}
        >
          {img ? (
            <img src={img} alt="" style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
          ) : (
            <span aria-hidden="true">{scene?.sticker || "✉️"}</span>
          )}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.teal, marginBottom: 4 }}>POSTCARD · BACK</div>
          <p style={{ margin: 0, fontSize: 14, color: COLORS.textDark, lineHeight: 1.45 }}>
            People formed our community for <strong>{ev.reason || "—"}</strong>. You can see it because{" "}
            <strong>{ev.evidence || "—"}</strong>.
          </p>
          {scene?.label && (
            <p style={{ margin: "8px 0 0", fontSize: 12, color: COLORS.textMuted }}>
              Front scene: <strong style={{ color: COLORS.textDark }}>{scene.label}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function reasonFromChip(chip) {
  const map = {
    safety: "security and laws",
    rules: "security and laws",
    beliefs: "religious freedom",
    "food/jobs": "material well-being",
    school: "material well-being",
    friends: "security and laws",
  };
  return map[chip] || "";
}

export default function BriefingClient({ student, assignment, briefing, initialSubmission }) {
  const router = useRouter();
  const art = briefing.art || {};
  const saved = initialSubmission?.phase_state || {};
  // Per-briefing phase list — see the DEFAULT_PHASE_IDS comment above.
  const PHASES = (briefing.phases && briefing.phases.length ? briefing.phases : DEFAULT_PHASE_IDS).map((id) => ({
    id,
    label: PHASE_LABELS[id] || id,
  }));

  const [phaseIndex, setPhaseIndex] = useState(() => {
    const idx = PHASES.findIndex((p) => p.id === saved.currentPhase);
    return idx >= 0 ? idx : 0;
  });
  const [phaseState, setPhaseState] = useState(() => migratePhaseState(saved));
  const [scores, setScores] = useState(initialSubmission?.scores || {});
  const [status, setStatus] = useState(initialSubmission?.status || "in_progress");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [samLine, setSamLine] = useState("");
  const [samState, setSamState] = useState("idle");
  const [samAnchor, setSamAnchor] = useState("home");
  // v2 engagement — hidden, ungraded bonus revealed once after Clearance.
  // Local-only (not persisted): it's "just fun," never gates anything, and
  // re-showing the reveal button on a later visit is fine.
  const [bonusRevealed, setBonusRevealed] = useState(false);
  const bodyRef = useRef(null);
  const readAloud = useReadAloud();
  const stopReading = readAloud.stop;

  const phaseId = PHASES[phaseIndex].id;
  const samLines = briefing.samLines || {};
  const samTips = briefing.samTips || {};
  const packPages = fieldBriefPages(briefing);
  const isProjectMode = assignmentLaunchIsProject(assignment);

  // Clear stale SAM lines on phase change; park at home between beats.
  // Pages-shape Field Brief: Solo pops the page question; Project stays quiet / react-only.
  useEffect(() => {
    const opsDebrief = phaseId === "opsChoice" && Boolean(phaseState.ops?.debrief);
    if (opsDebrief) {
      setSamLine(briefing.opsChoice?.debriefSamLine || "Two funded. One waits until next year.");
      setSamState("celebrating");
      setSamAnchor("home");
      return;
    }
    if (phaseId === "fieldBrief" && packPages) {
      const page = packPages[fieldBriefPageIndex(phaseState.field, packPages)] || packPages[0];
      const chipId = phaseState.field?.pageChips?.[page.id];
      const sam = page.sam || {};
      const alreadyRight = Boolean(sam.correct && chipId === sam.correct);
      setSamAnchor("home");
      if (isProjectMode) {
        setSamLine(alreadyRight ? sam.afterCorrect || "" : "");
        setSamState(alreadyRight ? "celebrating" : "idle");
        return;
      }
      if (alreadyRight) {
        setSamLine(sam.afterCorrect || samLines.fieldBrief || "");
        setSamState("celebrating");
      } else {
        setSamLine(sam.question || samLines.fieldBrief || "");
        setSamState("helping");
      }
      return;
    }
    setSamLine(samLines[phaseId] || "");
    setSamState(phaseId === "clearance" && status === "cleared" ? "celebrating" : "helping");
    if (phaseId === "intelDrop" || phaseId === "openingFrame") setSamAnchor("image");
    else if (phaseId === "fieldBrief" || phaseId === "quickReview" || phaseId === "storyTeach" || phaseId === "synthesis")
      setSamAnchor("qc");
    else if (phaseId === "transfer") setSamAnchor("image");
    else if (phaseId === "reasonSort" || phaseId === "matchPairs" || phaseId === "sequenceIt" || phaseId === "labelPicture" || phaseId === "trueFalseReason")
      setSamAnchor("sort");
    else if (phaseId === "opsChoice") setSamAnchor("chips");
    else if (phaseId === "evidenceDrop") setSamAnchor("postcard");
    else if (phaseId === "clearance") setSamAnchor(status === "cleared" ? "stamp" : "home");
    else setSamAnchor("home");
  }, [phaseId, status, samLines, phaseState.ops?.debrief, briefing.opsChoice?.debriefSamLine, packPages, isProjectMode, phaseState.field?.beatIndex]);

  // Changing phase should never leave the previous card still being read.
  useEffect(() => {
    stopReading();
  }, [phaseId, stopReading]);

  const persist = useCallback(
    async (nextState, nextScores, nextStatus) => {
      setBusy(true);
      try {
        const res = await fetch("/api/briefing/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignmentId: assignment.id,
            phaseState: nextState,
            scores: nextScores,
            status: nextStatus,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Save failed");
      } catch (err) {
        setToast(err.message || "Could not save progress");
      } finally {
        setBusy(false);
      }
    },
    [assignment.id]
  );

  const updateState = useCallback(
    (patch, opts = {}) => {
      setPhaseState((prev) => {
        const next = { ...prev, ...patch, currentPhase: opts.phase || prev.currentPhase };
        if (!opts.skipSave) {
          persist(next, opts.scores || scores, opts.status || status);
        }
        return next;
      });
      if (opts.scores) setScores(opts.scores);
      if (opts.status) setStatus(opts.status);
    },
    [persist, scores, status]
  );

  async function grade(phase, payload) {
    const res = await fetch("/api/briefing/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ briefingId: briefing.id, phase, payload }),
    });
    return res.json();
  }

  function goTo(index) {
    const clamped = Math.max(0, Math.min(PHASES.length - 1, index));
    const nextPhase = PHASES[clamped].id;
    setPhaseIndex(clamped);
    setSamLine(""); // clear prior phase line immediately
    updateState({ currentPhase: nextPhase }, { phase: nextPhase });
  }

  function goToPhase(phaseKey) {
    const idx = PHASES.findIndex((p) => p.id === phaseKey);
    if (idx >= 0) goTo(idx);
  }

  const card = {
    background: COLORS.white,
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 8px 24px rgba(13,27,42,.08)",
  };

  const tipOnTap = samTips[phaseId] || "";

  // —— Phase renderers ——
  function IntelDrop() {
    const intel = phaseState.intel;
    return (
      <div style={card}>
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 18, alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: COLORS.violetSoft,
                minHeight: 280,
                flex: 1,
                boxShadow: "inset 0 0 0 2px rgba(123,93,255,.12)",
              }}
            >
              <img
                src={art.intel}
                alt="Mystery place"
                style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              style={{
                background: COLORS.violetSoft,
                borderRadius: 14,
                padding: "12px 14px",
                borderLeft: `4px solid ${COLORS.violet}`,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.violet, letterSpacing: 0.4, marginBottom: 4 }}>
                AGENT TIP
              </div>
              <p style={{ margin: 0, fontSize: 13.5, color: COLORS.textDark, lineHeight: 1.45 }}>
                {briefing.intelDrop.kidParagraph ||
                  "Look at this place. Don't name the town yet. Your job: pick why people might live here. Tap the reason that fits best."}
              </p>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 8px 0", color: COLORS.textDark }}>
              {briefing.intelDrop.title}
            </h2>
            <p style={{ fontSize: 15, fontWeight: 700, color: COLORS.textDark, margin: "0 0 12px 0" }}>
              {briefing.intelDrop.kidPrompt || "Pick why you think this place is here."}
            </p>
            <label style={labelStyle}>Claim (pick one)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {briefing.intelDrop.claimChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="gc-btn"
                  onClick={() => {
                    setSamAnchor("chips");
                    setSamState("thinking");
                    updateState(
                      {
                        intel: {
                          ...intel,
                          chip,
                          claim: fillClaimFrame(briefing.intelDrop.claimFrame, chip),
                        },
                      },
                      { skipSave: true }
                    );
                  }}
                  style={{ ...chipStyle(intel.chip === chip), padding: "10px 14px", fontSize: 13.5 }}
                >
                  {chip}
                </button>
              ))}
            </div>
            {intel.chip && (
              <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "4px 0 8px" }}>
                Your claim: <strong style={{ color: COLORS.textDark }}>{fillClaimFrame(briefing.intelDrop.claimFrame, intel.chip)}</strong>
              </p>
            )}
            {!intel.revealed ? (
              <button
                type="button"
                className="gc-btn"
                disabled={busy || !intel.chip}
                onClick={async () => {
                  const result = await grade("intelDrop", { claim: intel.claim, chip: intel.chip });
                  setToast(result.message || "");
                  setSamLine(result.message || samLine);
                  setSamState(result.pass ? "celebrating" : "thinking");
                  if (result.pass) {
                    const nextIntel = { ...intel, revealed: true };
                    updateState({ intel: nextIntel }, { scores: { ...scores, intel: result } });
                  }
                }}
                style={{ ...primaryBtn, opacity: !intel.chip ? 0.5 : 1 }}
              >
                Lock claim & reveal
              </button>
            ) : (
              <div style={{ marginTop: 12, background: COLORS.tealSoft, borderRadius: 12, padding: 12 }}>
                <p style={{ margin: "0 0 8px 0", fontSize: 13.5, color: COLORS.textDark }}>{renderBold(briefing.intelDrop.reveal)}</p>
                <p style={{ margin: 0, fontSize: 13.5, color: COLORS.textDark }}>{renderBold(briefing.intelDrop.learningTarget)}</p>
                <button type="button" className="gc-btn" onClick={() => goToPhase("fieldBrief")} style={{ ...primaryBtn, marginTop: 12 }}>
                  Continue to Field Brief →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function FieldBrief() {
    if (packPages) return FieldBriefPages();
    return FieldBriefBeats();
  }

  function FieldBriefPages() {
    const field = phaseState.field;
    const pages = packPages;
    const pageIndex = fieldBriefPageIndex(field, pages);
    const page = pages[pageIndex] || pages[0];
    const img = page.imageKey ? art[page.imageKey] : null;
    const sam = page.sam || {};
    const chips = sam.chips || [];
    const picked = field.pageChips?.[page.id] || "";
    const chipCorrect = Boolean(sam.correct && picked === sam.correct);
    const isCheck = page.kicker === "Check" || page.id === "check";
    const qcs = page.quickChecks || [];
    const requireChip = briefing.fieldBrief.requireQcBeforeNext !== false;
    const checkAnswered = qcs.length === 0 || qcs.every((q) => Boolean(field.answers[q.id]));
    const canNextTeach = !requireChip || chipCorrect || !chips.length;
    const lastPage = pageIndex >= pages.length - 1;

    function setPageIndex(nextIdx) {
      const clamped = Math.max(0, Math.min(pages.length - 1, nextIdx));
      updateState({ field: { ...field, beatIndex: clamped, pageIndex: clamped } });
    }

    function pickChip(chipId) {
      const nextChips = { ...(field.pageChips || {}), [page.id]: chipId };
      const ok = chipId === sam.correct;
      setSamAnchor("home");
      setSamState(ok ? "celebrating" : "thinking");
      setSamLine(ok ? sam.afterCorrect || "Nice." : sam.afterWrong || "Try again.");
      updateState({ field: { ...field, pageChips: nextChips } }, { skipSave: true });
    }

    function pickQc(qcId, choiceId) {
      setSamAnchor("home");
      setSamState("thinking");
      updateState(
        { field: { ...field, answers: { ...field.answers, [qcId]: choiceId } } },
        { skipSave: true }
      );
    }

    const kickerTrail = pages.map((pg, i) => (
      <span
        key={pg.id}
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          color: i === pageIndex ? COLORS.violet : COLORS.textMuted,
        }}
      >
        {i > 0 ? <span style={{ color: "#D5D2E2", margin: "0 6px" }}>·</span> : null}
        {pg.kicker}
      </span>
    ));

    return (
      <div style={card}>
        <div style={{ marginBottom: 10 }}>{kickerTrail}</div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: COLORS.violet,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {page.kicker}
        </div>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 14px 0", color: COLORS.textDark }}>
          {page.title}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: isCheck ? "0.9fr 1.2fr" : "1.15fr 1fr", gap: 18, alignItems: "start" }}>
          {img && (
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: COLORS.violetSoft,
                minHeight: isCheck ? 200 : 260,
                boxShadow: "inset 0 0 0 2px rgba(123,93,255,.12)",
              }}
            >
              <img
                src={img}
                alt=""
                style={{ width: "100%", height: "100%", minHeight: isCheck ? 200 : 260, objectFit: "cover", display: "block" }}
              />
            </div>
          )}
          <div>
            {page.body && (
              <p style={{ fontSize: 16, color: COLORS.textDark, lineHeight: 1.6, marginTop: 0 }}>
                {renderBold(page.body)}
              </p>
            )}
            {page.vocabSentences?.length > 0 && (
              <div style={{ margin: "8px 0 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                {page.vocabSentences.map((line) => (
                  <p
                    key={line}
                    style={{
                      margin: 0,
                      fontSize: 13.5,
                      lineHeight: 1.45,
                      color: COLORS.textDark,
                      padding: "8px 12px",
                      background: COLORS.cream,
                      borderRadius: 12,
                      borderLeft: `4px solid ${COLORS.violet}`,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
            {page.compare && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  margin: "8px 0 12px",
                }}
              >
                {[page.compare.left, page.compare.right].filter(Boolean).map((col) => (
                  <div
                    key={col.town}
                    style={{
                      background: COLORS.cream,
                      borderRadius: 14,
                      padding: "12px 14px",
                      borderTop: `4px solid ${COLORS.gold}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: COLORS.violet,
                        letterSpacing: 0.8,
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {col.town}
                    </div>
                    <div style={{ fontSize: 14.5, color: COLORS.textDark, lineHeight: 1.45 }}>{col.way}</div>
                  </div>
                ))}
              </div>
            )}
            {page.compare?.need && (
              <p style={{ fontSize: 13.5, color: COLORS.textMuted, margin: "0 0 12px", fontStyle: "italic" }}>
                Same need: {page.compare.need}.
              </p>
            )}

            {!isCheck && chips.length > 0 && (
              <div style={{ marginTop: 8 }}>
                {sam.question && (
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: COLORS.textDark }}>
                    {sam.question}
                  </div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {chips.map((c) => {
                    const on = picked === c.id;
                    const showMark = on && sam.correct;
                    const right = showMark && c.id === sam.correct;
                    const wrong = showMark && c.id !== sam.correct;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className="gc-btn"
                        onClick={() => pickChip(c.id)}
                        style={{
                          ...chipStyle(on),
                          padding: "10px 14px",
                          fontSize: 13.5,
                          color: COLORS.textDark,
                          borderColor: right ? COLORS.success : wrong ? "#EF4444" : on ? COLORS.teal : "#9EE6E8",
                          background: right ? "#ECFDF3" : wrong ? "#FEF2F2" : COLORS.tealSoft,
                        }}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
                {requireChip && !chipCorrect && (
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: COLORS.textMuted }}>
                    Tap a chip before Next.
                  </p>
                )}
              </div>
            )}

            {isCheck && (
              <div style={{ marginTop: 4 }}>
                {qcs.map((qc) => (
                  <div key={qc.id} style={{ marginTop: 12, background: COLORS.cream, borderRadius: 12, padding: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{qc.prompt}</div>
                    {(qc.choices || []).map((c) => {
                      const on = field.answers[qc.id] === c.id;
                      const marked = field.results?.results?.[qc.id];
                      return (
                        <button
                          key={c.id}
                          type="button"
                          className="gc-btn"
                          disabled={field.graded}
                          onClick={() => pickQc(qc.id, c.id)}
                          style={{
                            ...choiceBtn,
                            borderColor: on ? COLORS.violet : "transparent",
                            background: on ? COLORS.violetSoft : COLORS.white,
                          }}
                        >
                          {c.text}
                          {marked && (
                            <span
                              style={{
                                marginLeft: 8,
                                fontWeight: 700,
                                color: marked.correct ? COLORS.success : "#EF4444",
                              }}
                            >
                              {marked.correct ? "✓" : "✗"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {requireChip && !checkAnswered && (
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: COLORS.textMuted }}>
                    Answer both checks, then tap Check answers.
                  </p>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {!lastPage ? (
                <button
                  type="button"
                  className="gc-btn"
                  disabled={!canNextTeach}
                  onClick={() => {
                    if (!canNextTeach) return;
                    setSamAnchor("home");
                    setPageIndex(pageIndex + 1);
                  }}
                  style={{ ...primaryBtn, opacity: canNextTeach ? 1 : 0.45 }}
                >
                  Next →
                </button>
              ) : !field.graded ? (
                <button
                  type="button"
                  className="gc-btn"
                  disabled={busy || (requireChip && !checkAnswered)}
                  onClick={async () => {
                    const answers = {};
                    qcs.forEach((q) => {
                      if (field.answers[q.id]) answers[q.id] = field.answers[q.id];
                    });
                    const result = await grade("fieldBrief", { answers });
                    setToast(result.pass ? "Quick checks locked." : "Check missed items and keep going.");
                    setSamLine(result.pass ? "Nice work on the checks. Ready to sort?" : "Look again — then keep going.");
                    setSamState(result.pass ? "celebrating" : "thinking");
                    updateState(
                      { field: { ...field, graded: true, results: result } },
                      { scores: { ...scores, field: result } }
                    );
                  }}
                  style={{ ...primaryBtn, opacity: requireChip && !checkAnswered ? 0.45 : 1 }}
                >
                  Check answers
                </button>
              ) : (
                <button type="button" className="gc-btn" onClick={() => goToPhase("reasonSort")} style={primaryBtn}>
                  Continue to Reason Sort →
                </button>
              )}
              {pageIndex > 0 && (
                <button
                  type="button"
                  className="gc-btn"
                  onClick={() => {
                    const next = pageIndex - 1;
                    updateState({ field: { ...field, beatIndex: next, pageIndex: next } }, { skipSave: true });
                  }}
                  style={ghostBtn}
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function FieldBriefBeats() {
    const field = phaseState.field;
    const beat = briefing.fieldBrief.beats[field.beatIndex] || briefing.fieldBrief.beats[0];
    const qc = briefing.fieldBrief.quickChecks.find((q) => q.id === beat.qcId);
    const img = art[beat.imageKey];
    const answered = qc ? Boolean(field.answers[qc.id]) : true;
    const requireQc = briefing.fieldBrief.requireQcBeforeNext !== false;

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 12px 0" }}>Field Brief</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {briefing.fieldBrief.vocab.map((v) => (
            <div
              key={v.term}
              style={{
                background: COLORS.violetSoft,
                borderRadius: 10,
                padding: "8px 10px",
                maxWidth: 190,
                borderLeft: `4px solid ${v.color || COLORS.violet}`,
              }}
              title={v.meaning}
            >
              <div style={{ fontWeight: 700, fontSize: 12, color: v.color || COLORS.violet }}>
                <span aria-hidden="true" style={{ marginRight: 4 }}>{v.icon || "📘"}</span>
                {v.term}
              </div>
              <div style={{ fontSize: 11.5, color: COLORS.textDark, lineHeight: 1.35 }}>{v.meaning}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 16 }}>
          <div style={{ borderRadius: 14, overflow: "hidden", background: COLORS.violetSoft, minHeight: 220 }}>
            {img && <img src={img} alt="" style={{ width: "100%", height: "100%", minHeight: 220, objectFit: "cover" }} />}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, marginBottom: 4 }}>
              Beat {field.beatIndex + 1} of {briefing.fieldBrief.beats.length}
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontFamily: "'Poppins', sans-serif" }}>{beat.title}</h3>
            <p style={{ fontSize: 14.5, color: COLORS.textDark, lineHeight: 1.55 }}>{renderBold(beat.body)}</p>
            <p style={{ fontSize: 13, color: COLORS.textMuted, fontStyle: "italic" }}>Example: {beat.example}</p>
            {qc && (
              <div style={{ marginTop: 12, background: COLORS.cream, borderRadius: 12, padding: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{qc.prompt}</div>
                {qc.choices.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="gc-btn"
                    disabled={field.graded}
                    onClick={() => {
                      setSamAnchor("qc");
                      setSamState("thinking");
                      updateState(
                        { field: { ...field, answers: { ...field.answers, [qc.id]: c.id } } },
                        { skipSave: true }
                      );
                    }}
                    style={{
                      ...choiceBtn,
                      borderColor: field.answers[qc.id] === c.id ? COLORS.violet : "transparent",
                      background: field.answers[qc.id] === c.id ? COLORS.violetSoft : COLORS.white,
                    }}
                  >
                    {c.text}
                    {field.results?.results?.[qc.id] && (
                      <span style={{ marginLeft: 8, fontWeight: 700, color: field.results.results[qc.id].correct ? COLORS.success : "#EF4444" }}>
                        {field.results.results[qc.id].correct ? "✓" : "✗"}
                      </span>
                    )}
                  </button>
                ))}
                {requireQc && !answered && (
                  <p style={{ margin: "8px 0 0", fontSize: 12, color: COLORS.textMuted }}>Answer this quick check before Next.</p>
                )}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {field.beatIndex < briefing.fieldBrief.beats.length - 1 ? (
                <button
                  type="button"
                  className="gc-btn"
                  disabled={requireQc && !answered}
                  onClick={() => {
                    if (requireQc && !answered) return;
                    setSamAnchor("home");
                    updateState({ field: { ...field, beatIndex: field.beatIndex + 1 } });
                  }}
                  style={{ ...primaryBtn, opacity: requireQc && !answered ? 0.45 : 1 }}
                >
                  Next beat →
                </button>
              ) : !field.graded ? (
                <button
                  type="button"
                  className="gc-btn"
                  disabled={busy || (requireQc && !answered)}
                  onClick={async () => {
                    const result = await grade("fieldBrief", { answers: field.answers });
                    setToast(result.pass ? "Quick checks locked." : "Check missed items and keep going.");
                    setSamLine(result.pass ? "Nice work on the checks." : "Look again — then keep going.");
                    setSamState(result.pass ? "celebrating" : "thinking");
                    updateState(
                      { field: { ...field, graded: true, results: result } },
                      { scores: { ...scores, field: result } }
                    );
                  }}
                  style={{ ...primaryBtn, opacity: requireQc && !answered ? 0.45 : 1 }}
                >
                  Check answers
                </button>
              ) : (
                <button type="button" className="gc-btn" onClick={() => goToPhase("reasonSort")} style={primaryBtn}>
                  Continue to Reason Sort →
                </button>
              )}
              {field.beatIndex > 0 && (
                <button
                  type="button"
                  className="gc-btn"
                  onClick={() => updateState({ field: { ...field, beatIndex: field.beatIndex - 1 } }, { skipSave: true })}
                  style={ghostBtn}
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }


  function ReasonSort() {
    const rs = phaseState.reasonSort;
    const pack = briefing.reasonSort || {};
    const bins = pack.bins || [];
    const items = pack.items || [];
    const assignments = rs.assignments || {};
    const selectedItemId = rs.selectedItemId || "";
    const results = rs.results?.results || null;
    const allAssigned = items.length > 0 && items.every((it) => assignments[it.id]);

    function selectItem(id) {
      if (rs.passed) return;
      setSamAnchor("sort");
      setSamState("thinking");
      updateState({ reasonSort: { ...rs, selectedItemId: id } }, { skipSave: true });
    }

    function assignToBin(binId) {
      if (rs.passed || !selectedItemId) return;
      const nextAssign = { ...assignments, [selectedItemId]: binId };
      updateState(
        {
          reasonSort: {
            ...rs,
            assignments: nextAssign,
            selectedItemId: "",
            checked: false,
            results: null,
          },
        },
        { skipSave: true }
      );
    }

    function unassign(itemId) {
      if (rs.passed) return;
      // After a check, keep correct tiles locked; only misses can be pulled back.
      if (results?.[itemId]?.correct) return;
      const nextAssign = { ...assignments };
      delete nextAssign[itemId];
      updateState(
        { reasonSort: { ...rs, assignments: nextAssign, checked: false, results: rs.results } },
        { skipSave: true }
      );
    }

    const unassigned = items.filter((it) => !assignments[it.id]);

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>
          {pack.title || "Community Reason Sort"}
        </h2>
        <p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 0 }}>
          {pack.kidPrompt || "Sort each example under the reason that fits best."}
        </p>
        <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: -4 }}>
          Tip: tap a clue, then tap a reason bin. Tap a sorted clue to pull it back.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "12px 0 16px" }}>
          {unassigned.map((it) => {
            const on = selectedItemId === it.id;
            return (
              <button
                key={it.id}
                type="button"
                className="gc-btn"
                onClick={() => selectItem(it.id)}
                style={{
                  borderRadius: 12,
                  padding: "10px 12px",
                  maxWidth: 280,
                  textAlign: "left",
                  fontSize: 13,
                  fontWeight: 600,
                  border: `2px solid ${on ? COLORS.violet : "#E1E2EE"}`,
                  background: on ? COLORS.violetSoft : COLORS.white,
                  color: COLORS.textDark,
                  boxShadow: on ? "0 6px 14px rgba(123,93,255,.18)" : "0 2px 8px rgba(13,27,42,.05)",
                }}
              >
                {it.text}
              </button>
            );
          })}
          {unassigned.length === 0 && !rs.passed && (
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>All clues sorted — check your work.</span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.max(bins.length, 1)}, minmax(0, 1fr))`, gap: 12 }}>
          {bins.map((bin) => {
            const inBin = items.filter((it) => assignments[it.id] === bin.id);
            return (
              <div
                key={bin.id}
                style={{
                  borderRadius: 14,
                  border: `2px solid ${bin.color || COLORS.violet}`,
                  background: COLORS.white,
                  minHeight: 180,
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  className="gc-btn"
                  onClick={() => assignToBin(bin.id)}
                  disabled={!selectedItemId || rs.passed}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    padding: "10px 8px",
                    background: `${bin.color || COLORS.violet}22`,
                    border: `1.5px dashed ${bin.color || COLORS.violet}`,
                    color: COLORS.textDark,
                    fontWeight: 800,
                    fontSize: 12.5,
                    fontFamily: "'Poppins', sans-serif",
                    opacity: !selectedItemId || rs.passed ? 0.75 : 1,
                  }}
                >
                  <span aria-hidden="true" style={{ marginRight: 4 }}>{bin.emoji || "📁"}</span>
                  {bin.label}
                  {selectedItemId && !rs.passed ? " · tap to place" : ""}
                </button>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  {inBin.map((it) => {
                    const mark = results?.[it.id];
                    const border =
                      mark == null
                        ? "#E1E2EE"
                        : mark.correct
                          ? COLORS.success
                          : "#EF4444";
                    return (
                      <button
                        key={it.id}
                        type="button"
                        className="gc-btn"
                        onClick={() => unassign(it.id)}
                        style={{
                          textAlign: "left",
                          borderRadius: 10,
                          padding: "8px 10px",
                          fontSize: 12.5,
                          fontWeight: 600,
                          background: COLORS.cream,
                          border: `2px solid ${border}`,
                          color: COLORS.textDark,
                        }}
                      >
                        {mark?.correct === false ? "✗ " : mark?.correct ? "✓ " : ""}
                        {it.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!rs.passed ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || !allAssigned}
            onClick={async () => {
              const result = await grade("reasonSort", { assignments });
              setToast(result.message || "");
              if (result.pass) {
                setSamLine(pack.helpPass || result.message || "Nice sorting!");
                setSamState("celebrating");
                updateState(
                  {
                    reasonSort: {
                      ...rs,
                      assignments,
                      checked: true,
                      results: result,
                      passed: true,
                      selectedItemId: "",
                    },
                  },
                  { scores: { ...scores, reasonSort: result } }
                );
              } else {
                setSamLine(pack.helpWrong || result.message || "Try another bin.");
                setSamState("helping");
                setSamAnchor("sort");
                // Clear missed assignments so student can retry those tiles
                const missIds = result.missIds || [];
                const nextAssign = { ...assignments };
                missIds.forEach((id) => {
                  delete nextAssign[id];
                });
                updateState(
                  {
                    reasonSort: {
                      ...rs,
                      assignments: nextAssign,
                      checked: true,
                      results: result,
                      passed: false,
                      selectedItemId: "",
                    },
                  },
                  { scores: { ...scores, reasonSort: result }, skipSave: false }
                );
              }
            }}
            style={{ ...primaryBtn, opacity: !allAssigned ? 0.5 : 1 }}
          >
            Check Reason Sort
          </button>
        ) : (
          <div style={{ marginTop: 12, background: COLORS.tealSoft, borderRadius: 12, padding: 12 }}>
            <p style={{ margin: 0, fontSize: 13.5 }}>{pack.helpPass || "Reason Sort complete."}</p>
            <button
              type="button"
              className="gc-btn"
              onClick={() => goToPhase("opsChoice")}
              style={{ ...primaryBtn, marginTop: 12 }}
            >
              Continue to Ops Choice →
            </button>
          </div>
        )}
      </div>
    );
  }

  function OpsChoice() {
    const ops = phaseState.ops;
    const pack = briefing.opsChoice;
    const projects = pack.projects || [];
    const teksList = teksProjects(briefing);
    const deferredProj = deferredTeksProject(briefing, ops.picks);
    const pickCount = pack.pickCount || 2;

    const toggle = (id) => {
      if (ops.debrief) return;
      let picks = ops.picks.includes(id) ? ops.picks.filter((p) => p !== id) : [...ops.picks, id];
      if (picks.length > pickCount) picks = picks.slice(-pickCount);
      setSamAnchor("chips");
      // Clearing picks resets deferred chip if the waiting project changed.
      const nextDeferred = deferredTeksProject(briefing, picks);
      const keepDeferred =
        nextDeferred && ops.deferredReasonId && nextDeferred.reasonId === ops.deferredReasonId
          ? ops.deferredReasonId
          : "";
      updateState({ ops: { ...ops, picks, deferredReasonId: keepDeferred, consequence: null } }, { skipSave: true });
    };

    const slots = Array.from({ length: pickCount }, (_, i) => {
      const id = ops.picks[i];
      return id ? projects.find((p) => p.id === id) || { id, label: id, emoji: "📌" } : null;
    });

    const waitingTeks = teksList.filter((p) => !ops.picks.includes(p.id));
    const canSubmit =
      ops.picks.length === pickCount &&
      ops.chips.length > 0 &&
      Boolean(ops.deferredReasonId);


    const shortReason = (p) =>
      (p && (p.shortReasonLabel || p.reason || p.label)) || "";

    const fundedProjects = ops.picks.map((id) => projects.find((x) => x.id === id)).filter(Boolean);
    const waitingIds = ops.consequence?.waitingIds?.length
      ? ops.consequence.waitingIds
      : waitingTeks.map((p) => p.id);
    const waitingProjects = waitingIds
      .map((id) => projects.find((x) => x.id === id))
      .filter((p) => p && !p.distractor);

    // Post-vote: lean visual THIS YEAR / NEXT YEAR board (Grade 3 — picture-first).
    if (ops.debrief) {
      return (
        <div style={card}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title}</h2>
          <p
            style={{
              fontSize: 15,
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              color: COLORS.violet,
              margin: "0 0 10px 0",
            }}
          >
            {pack.boardTitle || "THIS YEAR / NEXT YEAR"}
          </p>

          {/* Tiny strip — collapse the four big project cards */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {projects.map((p) => {
              const funded = ops.picks.includes(p.id);
              const waiting = waitingIds.includes(p.id) && !p.distractor;
              return (
                <span
                  key={`strip-${p.id}`}
                  title={p.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    background: funded ? COLORS.tealSoft : waiting ? "#EEF0F5" : COLORS.cream,
                    color: funded ? COLORS.teal : COLORS.textMuted,
                    border: `1.5px solid ${funded ? COLORS.teal : waiting ? "#C9CDD9" : "#E1E2EE"}`,
                    opacity: p.distractor ? 0.45 : 1,
                  }}
                >
                  <span aria-hidden="true">{p.emoji || "📌"}</span>
                  {funded ? "NOW" : waiting ? "WAIT" : "—"}
                </span>
              );
            })}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 12,
              marginBottom: 8,
            }}
          >
            {/* THIS YEAR — two green NOW slots */}
            <div
              style={{
                background: "#E8F9EE",
                borderRadius: 16,
                padding: 14,
                border: `2px solid ${COLORS.success}`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.6,
                  color: COLORS.success,
                  marginBottom: 10,
                }}
              >
                {pack.boardThisYearLabel || "THIS YEAR"}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {Array.from({ length: pickCount }, (_, i) => {
                  const p = fundedProjects[i];
                  return (
                    <div
                      key={`now-${i}`}
                      style={{
                        minHeight: 88,
                        borderRadius: 14,
                        background: COLORS.white,
                        border: `2.5px solid ${COLORS.success}`,
                        padding: 12,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: 4,
                        boxShadow: "0 6px 14px rgba(34,197,94,.12)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: COLORS.success,
                          letterSpacing: 0.5,
                        }}
                      >
                        {pack.nowSlotLabel || "NOW"}
                      </div>
                      <div style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">
                        {p?.emoji || "✅"}
                      </div>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 14,
                          fontFamily: "'Poppins', sans-serif",
                          color: COLORS.textDark,
                          lineHeight: 1.2,
                        }}
                      >
                        {p ? shortReason(p) : "—"}
                      </div>
                      {/* `improves` has been authored in every pack since P3
                          and was never rendered anywhere — the board showed
                          two-word labels and nothing else, which is most of
                          why this screen felt empty. */}
                      {p?.improves && (
                        <div style={{ fontSize: 11.5, color: COLORS.textMuted, lineHeight: 1.3, marginTop: 2 }}>
                          {p.improves}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NEXT YEAR — one grey waiting slot */}
            <div
              style={{
                background: "#F3F4F8",
                borderRadius: 16,
                padding: 14,
                border: "2px solid #C9CDD9",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.6,
                  color: COLORS.textMuted,
                  marginBottom: 10,
                }}
              >
                {pack.boardNextYearLabel || "NEXT YEAR"}
              </div>
              {(waitingProjects.length ? waitingProjects : [null]).map((p, i) => (
                <div
                  key={`wait-${p?.id || i}`}
                  style={{
                    minHeight: 88,
                    borderRadius: 14,
                    background: COLORS.white,
                    border: "2.5px dashed #B8BCC8",
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: COLORS.textMuted,
                      letterSpacing: 0.5,
                    }}
                  >
                    {pack.nextSlotLabel || "WAITING"}
                  </div>
                  <div style={{ fontSize: 28, lineHeight: 1 }} aria-hidden="true">
                    {p?.emoji || "⏳"}
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      fontFamily: "'Poppins', sans-serif",
                      color: COLORS.textDark,
                      lineHeight: 1.2,
                    }}
                  >
                    {p ? shortReason(p) : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "Whose warning came true?" — only when the pack supplies
              voices. Ties the consequence back to a named person who said
              this would happen, which is the perspective-taking the old
              version had nowhere at all. */}
          {(pack.voices || []).length > 0 && (() => {
            const waiting = waitingProjects[0];
            const answered = ops.whoseAnswer;
            const right = waiting?.reasonId;
            return (
              <div style={{ marginTop: 16 }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 15, margin: "0 0 8px" }}>
                  {pack.whosePrompt || "Whose warning came true?"}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {pack.voices.map((v) => (
                    <button
                      key={`whose-${v.id}`}
                      type="button"
                      className="gc-btn"
                      disabled={answered === right}
                      onClick={() => {
                        if (v.id === right) {
                          setSamLine(
                            pack.whoseRight ||
                              "All three of them were telling the truth about what they needed. You could only build two, so somebody was always going to be right and still have to wait."
                          );
                          setSamState("celebrating");
                          updateState({ ops: { ...ops, whoseAnswer: v.id } });
                        } else {
                          setSamLine(pack.whoseWrong || "Read the problem again, and read what each of them said. Somebody described exactly this.");
                          setSamState("helping");
                          setToast(pack.whoseWrong || "Somebody described exactly this last year.");
                        }
                      }}
                      style={chipStyle(answered === v.id)}
                    >
                      {v.emoji || "🗣️"} {v.who}
                    </button>
                  ))}
                </div>
                {answered === right && (
                  <div
                    style={{
                      marginTop: 10,
                      background: COLORS.tealSoft,
                      border: `1.5px solid ${COLORS.teal}`,
                      borderRadius: 12,
                      padding: 12,
                      fontSize: 13.5,
                    }}
                  >
                    {pack.whoseRight ||
                      "All three were telling the truth about what they needed. You could only build two, so somebody was always going to be right and still have to wait."}
                  </div>
                )}
              </div>
            );
          })()}

          <button
            type="button"
            className="gc-btn"
            disabled={(pack.voices || []).length > 0 && ops.whoseAnswer !== waitingProjects[0]?.reasonId}
            /* Was hardcoded to goToPhase("evidenceDrop") — which silently
               dead-ends any lesson whose phase after Ops isn't Evidence
               Drop (the v3 shape goes to Transfer). goNext() follows this
               lesson's own phases array, like everything else does. */
            onClick={goNext}
            style={{
              ...primaryBtn,
              marginTop: 16,
              width: "100%",
              padding: "14px 20px",
              fontSize: 15,
              boxSizing: "border-box",
            }}
          >
            {pack.continueLabel || "Continue →"}
          </button>
        </div>
      );
    }

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title}</h2>
        <p
          style={{
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "'Poppins', sans-serif",
            color: COLORS.violet,
            margin: "0 0 6px 0",
          }}
        >
          {pack.pickHeader || `Pick exactly ${pickCount}`}
        </p>
        <p style={{ fontSize: 13.5, color: COLORS.textMuted, marginTop: 0 }}>{renderBold(pack.constraint)}</p>
        {pack.scenario && (
          <div style={{ margin: "10px 0 4px", background: COLORS.cream, borderRadius: 12, padding: 12, fontSize: 13.5, color: COLORS.textDark, lineHeight: 1.5 }}>
            {renderBold(pack.scenario)}
          </div>
        )}

        {/* Three townspeople who each want a different project, and all of
            whom are right. This is what turns a resource puzzle into a
            civic decision — and it's what makes the cost a person rather
            than a category when one of them has to wait. Optional: a pack
            without `voices` renders exactly as it did before. */}
        {(pack.voices || []).length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "12px 0" }}>
            {pack.voices.map((v) => (
              <div
                key={v.id}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  background: COLORS.white,
                  border: "1.5px solid #E1E2EE",
                  borderRadius: 12,
                  padding: "10px 12px",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: COLORS.violetSoft,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 17,
                  }}
                  aria-hidden="true"
                >
                  {v.emoji || "🗣️"}
                </span>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5, color: COLORS.textMuted, textTransform: "uppercase" }}>
                    {v.who}
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textDark, marginTop: 2 }}>{v.said}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fund meter — two slots */}
        <div
          style={{
            margin: "12px 0 8px",
            background: COLORS.cream,
            borderRadius: 14,
            padding: 12,
            border: `1.5px solid #E1E2EE`,
          }}
        >
          <div style={{ fontSize: 11.5, fontWeight: 800, color: COLORS.violet, letterSpacing: 0.4, marginBottom: 8 }}>
            {pack.fundMeterLabel || "Fund meter — fill 2 slots"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${pickCount}, minmax(0, 1fr))`, gap: 10 }}>
            {slots.map((slot, i) => (
              <div
                key={`slot-${i}`}
                style={{
                  minHeight: 64,
                  borderRadius: 12,
                  border: `2px ${slot ? "solid" : "dashed"} ${slot ? COLORS.violet : "#C9CDD9"}`,
                  background: slot ? COLORS.violetSoft : COLORS.white,
                  padding: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 22 }} aria-hidden="true">
                  {slot ? slot.emoji || "✅" : "⬜"}
                </span>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textDark, lineHeight: 1.25 }}>
                  {slot ? slot.label : pack.emptySlotLabel ? `${pack.emptySlotLabel} ${i + 1}` : `Open slot ${i + 1}`}
                </div>
              </div>
            ))}
          </div>
          {ops.picks.length === pickCount && waitingTeks.length > 0 && !ops.picks.some((id) => projects.find((p) => p.id === id)?.distractor) && (
            <div style={{ marginTop: 10, fontSize: 12.5, color: COLORS.textMuted }}>
              <strong style={{ color: COLORS.textDark }}>{pack.waitingLabel || "Waiting until next year"}:</strong>{" "}
              {waitingTeks.map((p) => `${p.emoji || ""} ${p.label}`).join(" · ")}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, margin: "14px 0" }}>
          {projects.map((p) => {
            const on = ops.picks.includes(p.id);
            const isDistractor = Boolean(p.distractor);
            return (
              <button
                key={p.id}
                type="button"
                className="gc-btn"
                disabled={ops.debrief}
                onClick={() => toggle(p.id)}
                style={{
                  textAlign: "left",
                  borderRadius: 16,
                  padding: "18px 16px",
                  minHeight: 118,
                  border: `2.5px solid ${on ? COLORS.violet : "#E1E2EE"}`,
                  background: on ? COLORS.violetSoft : COLORS.white,
                  color: COLORS.textDark,
                  boxShadow: on ? "0 8px 18px rgba(123,93,255,.18)" : "0 4px 12px rgba(13,27,42,.06)",
                  opacity: ops.debrief ? 0.92 : 1,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }} aria-hidden="true">
                  {p.emoji || "📌"}
                </div>
                <div style={{ fontWeight: 800, fontSize: 14.5, fontFamily: "'Poppins', sans-serif" }}>{p.label}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 4 }}>
                  {p.reason}
                </div>
                {on && (
                  <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: isDistractor ? "#B45309" : COLORS.violet }}>
                    {isDistractor ? "★ Tempting pick" : "✓ Funded"}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <label style={labelStyle}>Why these two? (pick chips)</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          {(pack.justificationChips || []).map((chip) => (
            <button
              key={chip}
              type="button"
              className="gc-btn"
              disabled={ops.debrief}
              onClick={() => {
                const chips = ops.chips.includes(chip) ? ops.chips.filter((c) => c !== chip) : [...ops.chips, chip];
                updateState({ ops: { ...ops, chips } }, { skipSave: true });
              }}
              style={{ ...chipStyle(ops.chips.includes(chip)), padding: "9px 12px" }}
            >
              {chip}
            </button>
          ))}
        </div>

        <label style={labelStyle}>{pack.deferredPrompt || "Name the real community reason that waits until next year:"}</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          {(pack.deferredReasonChips || []).map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="gc-btn"
              disabled={ops.debrief}
              onClick={() =>
                updateState(
                  {
                    ops: {
                      ...ops,
                      deferredReasonId: ops.deferredReasonId === chip.id ? "" : chip.id,
                    },
                  },
                  { skipSave: true }
                )
              }
              style={{ ...chipStyle(ops.deferredReasonId === chip.id), padding: "9px 12px" }}
            >
              {chip.label}
            </button>
          ))}
        </div>
        {deferredProj && ops.deferredReasonId && ops.deferredReasonId !== deferredProj.reasonId && !ops.debrief && (
          <p style={{ fontSize: 12.5, color: "#B45309", marginTop: 0 }}>
            Hint: look at which real TEKS project is still waiting in the fund meter.
          </p>
        )}

        <button
          type="button"
          className="gc-btn"
          disabled={busy || !canSubmit}
          onClick={async () => {
            const result = await grade("opsChoice", {
              projectIds: ops.picks,
              chips: ops.chips,
              justification: "",
              deferredReasonId: ops.deferredReasonId,
              allProjectIds: projects.map((p) => p.id),
            });
            setToast(result.message || "");
            if (result.pass) {
              setSamLine(pack.debriefSamLine || "Two funded. One waits until next year.");
              setSamState("celebrating");
              setSamAnchor("home");
              const waiting = (result.deferredProjectIds || [])
                .map((id) => projects.find((p) => p.id === id))
                .filter(Boolean);
              updateState(
                {
                  ops: {
                    ...ops,
                    debrief: true,
                    consequence: {
                      fundedIds: ops.picks.slice(),
                      deferredReasonId: result.deferredReasonId || ops.deferredReasonId,
                      waitingIds: waiting.map((p) => p.id),
                    },
                  },
                },
                { scores: { ...scores, ops: result } }
              );
            } else {
              setSamLine(result.message || pack.distractorFailMessage || "");
              setSamState("helping");
            }
          }}
          style={{
            ...primaryBtn,
            opacity: !canSubmit ? 0.5 : 1,
          }}
        >
          Submit council vote
        </button>
      </div>
    );
  }

  function EvidenceDrop() {
    const ev = phaseState.evidence;
    const ops = phaseState.ops;
    const funded = (ops.picks || [])
      .map((id) => briefing.opsChoice.projects.find((p) => p.id === id))
      .filter((p) => p && !p.distractor && p.sceneId);
    const carryPrompt =
      funded.length === 2
        ? (briefing.evidenceDrop.carryForwardPrompt || "You funded {X} & {Y} — pick one to show on your postcard")
            .replace("{X}", funded[0].label)
            .replace("{Y}", funded[1].label)
        : briefing.evidenceDrop.frontHint;

    const sceneOptions =
      funded.length >= 1
        ? briefing.evidenceDrop.frontScenes.filter((s) => funded.some((f) => f.sceneId === s.id || f.reason.toLowerCase().includes(s.reason.split(" ")[0])))
        : briefing.evidenceDrop.frontScenes;
    const scenes = sceneOptions.length ? sceneOptions : briefing.evidenceDrop.frontScenes;
    const selectedScene = briefing.evidenceDrop.frontScenes.find((s) => s.id === ev.sceneId);

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 6px 0" }}>{briefing.evidenceDrop.title}</h2>
        <p style={{ fontSize: 13.5, color: COLORS.textMuted, marginTop: 0 }}>{carryPrompt}</p>

        {/* Postcard product UX */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 12,
          }}
        >
          {/* FRONT */}
          <div
            style={{
              borderRadius: 16,
              border: `2px solid ${ev.postcardSide !== "back" ? COLORS.violet : "#E1E2EE"}`,
              background: COLORS.cream,
              padding: 14,
              minHeight: 260,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.violet, letterSpacing: 0.4, marginBottom: 8 }}>
              POSTCARD · FRONT
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {scenes.map((s) => {
                const img = art[s.imageKey];
                const on = ev.sceneId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className="gc-btn"
                    onClick={() => {
                      setSamAnchor("postcard");
                      updateState(
                        {
                          evidence: {
                            ...ev,
                            sceneId: s.id,
                            reason: s.reason,
                            postcardSide: "front",
                            fundPickId: funded.find((f) => f.sceneId === s.id)?.id || "",
                          },
                        },
                        { skipSave: true }
                      );
                    }}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      textAlign: "left",
                      borderRadius: 12,
                      padding: 8,
                      border: `2px solid ${on ? COLORS.violet : "transparent"}`,
                      background: on ? COLORS.violetSoft : COLORS.white,
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 48,
                        borderRadius: 8,
                        overflow: "hidden",
                        background: COLORS.violetSoft,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 22,
                      }}
                    >
                      {img ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : s.sticker || "📷"}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{s.label}</div>
                      <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>{s.reason}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BACK */}
          <div
            style={{
              borderRadius: 16,
              border: `2px solid ${ev.postcardSide === "back" ? COLORS.teal : "#E1E2EE"}`,
              background: COLORS.white,
              padding: 14,
              minHeight: 260,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.teal, letterSpacing: 0.4, marginBottom: 8 }}>
              POSTCARD · BACK
            </div>
            <p style={{ fontSize: 13, color: COLORS.textDark, marginBottom: 8 }}>{briefing.evidenceDrop.backFrame}</p>
            <label style={labelStyle}>Reason</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {briefing.evidenceDrop.reasonOptions.map((r) => (
                <button
                  key={r}
                  type="button"
                  className="gc-btn"
                  onClick={() => updateState({ evidence: { ...ev, reason: r, postcardSide: "back" } }, { skipSave: true })}
                  style={chipStyle(ev.reason === r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <label style={labelStyle}>Evidence</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {briefing.evidenceDrop.evidenceChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="gc-btn"
                  onClick={() => updateState({ evidence: { ...ev, evidence: chip, postcardSide: "back" } }, { skipSave: true })}
                  style={chipStyle(ev.evidence === chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
            {selectedScene && (
              <p style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>
                Front scene: <strong style={{ color: COLORS.textDark }}>{selectedScene.label}</strong>
              </p>
            )}
          </div>
        </div>

        {ev.score == null ? (
          !ev.transmitPreview ? (
            <button
              type="button"
              className="gc-btn"
              disabled={!ev.sceneId || !ev.reason || !ev.evidence}
              onClick={() => {
                setSamLine("Ready to transmit to HQ?");
                setSamState("helping");
                updateState({ evidence: { ...ev, transmitPreview: true } }, { skipSave: true });
              }}
              style={{
                ...primaryBtn,
                opacity: !ev.sceneId || !ev.reason || !ev.evidence ? 0.5 : 1,
              }}
            >
              Preview transmit →
            </button>
          ) : (
            <div style={{ marginTop: 14, background: COLORS.navy, color: COLORS.white, borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.gold, marginBottom: 6 }}>TRANSMIT TO HQ</div>
              <p style={{ margin: "0 0 8px", fontSize: 14 }}>
                People formed our community for <strong>{ev.reason}</strong>. You can see it because <strong>{ev.evidence}</strong>.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="gc-btn"
                  disabled={busy}
                  onClick={async () => {
                    const result = await grade("evidenceDrop", { reason: ev.reason, evidence: ev.evidence });
                    setToast(result.message || "");
                    setSamLine(result.message || "");
                    setSamState(result.pass ? "celebrating" : "thinking");
                    if (result.pass) {
                      updateState(
                        { evidence: { ...ev, score: result.score, transmitPreview: true } },
                        { scores: { ...scores, evidence: result } }
                      );
                    }
                  }}
                  style={{
                    ...primaryBtn,
                    marginTop: 0,
                    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.teal})`,
                    color: COLORS.navy,
                  }}
                >
                  {briefing.evidenceDrop.transmitLabel || "Transmit postcard to HQ"}
                </button>
                <button
                  type="button"
                  className="gc-btn"
                  onClick={() => updateState({ evidence: { ...ev, transmitPreview: false } }, { skipSave: true })}
                  style={{ ...ghostBtn, marginTop: 0, background: "transparent", color: COLORS.white, borderColor: "rgba(255,255,255,.35)" }}
                >
                  Edit postcard
                </button>
              </div>
            </div>
          )
        ) : (
          <div style={{ marginTop: 12, background: COLORS.tealSoft, borderRadius: 12, padding: 12 }}>
            <p style={{ margin: 0, fontSize: 13.5 }}>Score: {ev.score}/2 — postcard received at HQ.</p>
            <button type="button" className="gc-btn" onClick={() => goToPhase("clearance")} style={{ ...primaryBtn, marginTop: 12 }}>
              Continue to Clearance →
            </button>
          </div>
        )}
      </div>
    );
  }

  function Clearance() {
    const cl = phaseState.clearance;
    const intelChip = phaseState.intel.chip;
    const opsPicks = phaseState.ops.picks || [];
    const evReason = phaseState.evidence.reason;
    const fundedLabels = opsPicks.map((id) => projectLabel(briefing, id));

    // Progress gates auto-tick from saved work (read-only) — not honesty taps.
    const fieldGateLabel = packPages
      ? "Field Brief pages + checks done"
      : "All 3 Field Brief beats + QCs done";
    const gateDefs = briefing.clearance.progressGates || [
      { id: "claim", label: "Claim locked" },
      { id: "field", label: fieldGateLabel },
      { id: "sort", label: "Reason Sort complete" },
      { id: "postcard", label: "Postcard transmitted to HQ" },
    ];
    // Which mechanic(s) this lesson actually uses for practice — SS lessons
    // have exactly one (today: reasonSort or matchPairs); Science's
    // light-review shape has two back to back.
    const mechanicPhaseIds = (briefing.phases || []).filter((id) => MECHANIC_PHASE_IDS.includes(id));
    const gateDone = {
      claim: Boolean(phaseState.intel.revealed),
      field: Boolean(phaseState.field.graded),
      // Legacy SS gate id — resolves to whichever mechanic the lesson uses.
      sort: mechanicPhaseIds[0] ? Boolean(phaseState[mechanicPhaseIds[0]]?.passed) : false,
      postcard: phaseState.evidence.score != null,
      // Science light-review gate ids.
      review: Boolean(phaseState.quickReview?.graded),
      practice1: mechanicPhaseIds[0] ? Boolean(phaseState[mechanicPhaseIds[0]]?.passed) : false,
      practice2: mechanicPhaseIds[1] ? Boolean(phaseState[mechanicPhaseIds[1]]?.passed) : false,
      // v3 gate ids.
      opening: Boolean(phaseState.openingFrame?.locked),
      teach: Boolean(phaseState.storyTeach?.done),
      together: Boolean(phaseState.synthesis?.passed),
      newtown: Boolean(phaseState.transfer?.passed),
    };
    const progressGates = gateDefs.map((g) => ({ ...g, done: Boolean(gateDone[g.id]) }));
    const gatesOk = progressGates.every((g) => g.done);
    const answersOk = (briefing.clearance.items || []).every((item) => {
      const got = cl.answers[item.id];
      // A keep-claim stores "<keep>|<because>" — half a sentence isn't an
      // answer, so require both sides before Clearance can be submitted.
      if (item.type === "keepClaim") {
        const [k, b] = String(got || "").split("|");
        return Boolean(k && b);
      }
      return Boolean(got);
    });

    // Dynamic c4: infer from deferred Ops project or postcard EVIDENCE text — never name the answer in the stem.
    const deferredProj = deferredTeksProject(briefing, opsPicks);
    const evidenceText = phaseState.evidence.evidence || "";
    const reuseReason = evReason || reasonFromChip(intelChip);
    const reasonMap = briefing.clearance?.reasonIdToChoice || {};
    const evidenceMap = briefing.clearance?.evidenceToReasonChoice || {};
    let c4Expected =
      reasonIdToChoice(deferredProj?.reasonId, reasonMap) ||
      evidenceChipToReasonChoice(evidenceText, evidenceMap) ||
      reasonIdToChoice(reuseReason, reasonMap) ||
      null;

    return (
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.gold, letterSpacing: 0.6 }}>HQ CLEARANCE</div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "4px 0 6px 0" }}>
              {briefing.clearance.hqTitle || "HQ Clearance Check"}
            </h2>
            <p style={{ margin: 0, fontSize: 13.5, color: COLORS.textMuted }}>
              {briefing.clearance.hqIntro ||
                "Agent report-in. Answer four quick questions."}
            </p>
          </div>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              border: `3px dashed ${COLORS.violet}`,
              display: "grid",
              placeItems: "center",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.violet,
              textAlign: "center",
              lineHeight: 1.15,
              background: COLORS.violetSoft,
              flexShrink: 0,
            }}
          >
            HQ
            <br />
            PASS
          </div>
        </div>

        {(intelChip || fundedLabels.length > 0 || evReason) && (
          <div style={{ margin: "14px 0", background: COLORS.cream, borderRadius: 12, padding: 12, fontSize: 13 }}>
            <strong>Your mission trail:</strong>{" "}
            {intelChip && <span>Intel claim → {intelChip}. </span>}
            {fundedLabels.length > 0 && <span>Funded → {fundedLabels.join(" & ")}. </span>}
            {evReason && <span>Postcard → {evReason}.</span>}
          </div>
        )}


        {cl.graded && cl.results && status !== "cleared" && !cl.results.pass && (
          <div style={{ marginTop: 16 }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 8px 0" }}>HQ explains</h3>
            <p style={{ fontSize: 13.5, color: COLORS.textMuted, marginTop: 0 }}>
              This is a lesson. You don't have to change your answers — here's what HQ wanted you to see.
            </p>
            {(briefing.clearance.items || []).map((item) => {
              const res = cl.results?.results?.[item.id] || {};
              const picked = (item.choices || []).find((c) => c.id === cl.answers[item.id]);
              const expectedId = res.expected;
              const right = (item.choices || []).find((c) => c.id === expectedId);
              const why = (briefing.clearance.explanations || {})[item.id] || "";
              return (
                <div key={`ex-${item.id}`} style={{ marginBottom: 12, background: COLORS.cream, borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6 }}>{item.prompt}</div>
                  <div style={{ fontSize: 13, color: COLORS.textDark }}>
                    You picked: <strong>{picked?.text || "—"}</strong>
                    {res.correct ? " ✓" : ""}
                  </div>
                  {!res.correct && right && (
                    <div style={{ fontSize: 13, color: COLORS.textDark, marginTop: 4 }}>
                      HQ's answer: <strong>{right.text}</strong>
                    </div>
                  )}
                  {why && <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.45 }}>{why}</p>}
                </div>
              );
            })}
            <button
              type="button"
              className="gc-btn"
              onClick={() => {
                updateState(
                  { clearance: { ...cl, graded: true, results: cl.results } },
                  { scores: { ...scores, clearance: cl.results }, status: "cleared", phase: "clearance" }
                );
                setStatus("cleared");
                setSamLine(samLines.cleared || briefing.clearance.clearedMessage);
                setSamState("celebrating");
                setSamAnchor("stamp");
              }}
              style={{ ...primaryBtn, marginTop: 8 }}
            >
              Continue — briefing cleared
            </button>
          </div>
        )}

        {!(cl.graded && cl.results && status !== "cleared" && !cl.results.pass) && briefing.clearance.items.map((item) => {
          let prompt = item.prompt;
          if (item.dynamicReuse) {
            if (deferredProj) {
              prompt = briefing.clearance?.dynamicDeferredPrompt || "Which reason is Maple Crossing still waiting on?";
            } else if (evidenceText) {
              const tmpl = briefing.clearance?.dynamicEvidencePrompt || "Your postcard evidence was “{evidence}” — which reason matches?";
              prompt = tmpl.replace("{evidence}", evidenceText);
            } else if (fundedLabels.length) {
              prompt =
                briefing.clearance?.dynamicFallbackPrompt ||
                "Think about the Founders’ Council vote. Which TEKS reason still matters for Maple Crossing even if it waits?";
            }
          }
          // v3 keep-claim: two chip rows that assemble one sentence. No
          // right answer to WHICH reason — that's the student's and the
          // teacher reads it — but the sentence still has to hold together,
          // which the server checks. See the clearance branch in
          // app/api/briefing/grade/route.js.
          if (item.type === "keepClaim") {
            const [keep = "", because = ""] = String(cl.answers[item.id] || "").split("|");
            const setKeep = (k) =>
              updateState(
                { clearance: { ...cl, answers: { ...cl.answers, [item.id]: `${k}|${because}` } } },
                { skipSave: true }
              );
            const setBecause = (b) =>
              updateState(
                { clearance: { ...cl, answers: { ...cl.answers, [item.id]: `${keep}|${b}` } } },
                { skipSave: true }
              );
            const note = cl.results?.results?.[item.id];
            return (
              <div key={item.id} style={{ marginBottom: 14, background: COLORS.cream, borderRadius: 12, padding: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 2 }}>{prompt}</div>
                <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 8 }}>
                  {item.teacherReadNote || "Your teacher reads this one — there's no right answer to which you'd keep."}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>
                  I&rsquo;d keep <strong style={{ color: COLORS.violet }}>{(item.keepOptions || []).find((o) => o.id === keep)?.label || "______"}</strong>
                  , because without it{" "}
                  <strong style={{ color: COLORS.violet }}>
                    {(item.becauseOptions || []).find((o) => o.id === because)?.label || "______"}
                  </strong>
                  .
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.textMuted, margin: "8px 0 4px" }}>WHAT I&rsquo;D KEEP</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(item.keepOptions || []).map((o) => (
                    <button key={o.id} type="button" className="gc-btn" onClick={() => setKeep(o.id)} style={chipStyle(keep === o.id)}>
                      {o.label}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.textMuted, margin: "10px 0 4px" }}>BECAUSE WITHOUT IT…</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(item.becauseOptions || []).map((o) => (
                    <button key={o.id} type="button" className="gc-btn" onClick={() => setBecause(o.id)} style={chipStyle(because === o.id)}>
                      {o.label}
                    </button>
                  ))}
                </div>
                {note?.message && (
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: note.coherent ? COLORS.success : "#B45309",
                    }}
                  >
                    {note.message}
                  </div>
                )}
              </div>
            );
          }
          return (
            <div key={item.id} style={{ marginBottom: 14, background: COLORS.cream, borderRadius: 12, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{prompt}</div>
              {(item.choices || []).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="gc-btn"
                  onClick={() =>
                    updateState(
                      { clearance: { ...cl, answers: { ...cl.answers, [item.id]: c.id } } },
                      { skipSave: true }
                    )
                  }
                  style={{
                    ...choiceBtn,
                    borderColor: cl.answers[item.id] === c.id ? COLORS.violet : "transparent",
                    background: cl.answers[item.id] === c.id ? COLORS.violetSoft : COLORS.white,
                  }}
                >
                  {c.text}
                </button>
              ))}
            </div>
          );
        })}

        {status === "cleared" ? null : (cl.graded && cl.results && !cl.results.pass) ? null : (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || !answersOk}
            onClick={async () => {
              if (!answersOk) return;
              const result = await grade("clearance", {
                answers: cl.answers,
                expectedIds: c4Expected ? { c4: c4Expected } : {},
              });
              updateState(
                { clearance: { ...cl, graded: true, results: result } },
                { scores: { ...scores, clearance: result } }
              );
              if (result.pass) {
                setToast("Clearance checks passed.");
                updateState(
                  { clearance: { ...cl, graded: true, results: result } },
                  { scores: { ...scores, clearance: result }, status: "cleared", phase: "clearance" }
                );
                setStatus("cleared");
                setSamLine(samLines.cleared || briefing.clearance.clearedMessage);
                setSamState("celebrating");
                setSamAnchor("stamp");
              } else {
                setToast("");
                setSamLine("HQ will show you the answers — this is a lesson, not a redo.");
                setSamState("helping");
              }
            }}
            style={{ ...primaryBtn, opacity: !answersOk ? 0.5 : 1 }}
          >
            Submit for clearance
          </button>
        )}

        {status === "cleared" && (
          <div
            style={{
              marginTop: 16,
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(135deg, ${COLORS.violetSoft}, ${COLORS.tealSoft})`,
              borderRadius: 16,
              padding: 20,
              border: `2px solid ${COLORS.violet}`,
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 12,
                top: 12,
                width: 128,
                height: 128,
                borderRadius: "50%",
                border: `5px solid ${COLORS.success}`,
                color: COLORS.success,
                display: "grid",
                placeItems: "center",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                transform: "rotate(-14deg)",
                background: "rgba(255,255,255,.92)",
                boxShadow: "0 12px 28px rgba(34,197,94,.35)",
                textAlign: "center",
                lineHeight: 1.15,
                letterSpacing: 0.5,
              }}
            >
              CLEARED
              <br />
              ★ ✓ ★
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 20, margin: "0 0 8px 0", maxWidth: "68%" }}>
              Briefing cleared
            </p>
            <p style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.textDark, maxWidth: "72%" }}>
              {briefing.clearance.clearedMessage}
            </p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.violet }}>
              {briefing.clearance.challengeCta || "Ask your teacher when you're ready for a Challenge"}
            </p>
            {/* Exit card — the thing that leaves the station. Scrapping the
                postcard removed the only artifact this lesson produced and
                replaced it with a score, which is worth nothing on a wall.
                This carries the one ungraded sentence, so twenty of them go
                up and the class disagrees. */}
            {(() => {
              const exit = briefing.clearance?.exitCard;
              const keepItem = (briefing.clearance?.items || []).find((it) => it.type === "keepClaim");
              if (!exit?.enabled || !keepItem) return null;
              const [keep = "", because = ""] = String(cl.answers[keepItem.id] || "").split("|");
              const keepLabel = (keepItem.keepOptions || []).find((o) => o.id === keep)?.label;
              const becauseLabel = (keepItem.becauseOptions || []).find((o) => o.id === because)?.label;
              if (!keepLabel || !becauseLabel) return null;
              return (
                <div
                  style={{
                    margin: "16px 0",
                    border: `2.5px dashed ${COLORS.violet}`,
                    borderRadius: 16,
                    background: COLORS.violetSoft,
                    padding: 18,
                  }}
                >
                  <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.9, color: COLORS.violet, textTransform: "uppercase" }}>
                    ✂︎ {exit.tag || "Take this with you"}
                  </div>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1.5, margin: "10px 0" }}>
                    “I&rsquo;d keep {keepLabel}, because without it {becauseLabel}.”
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontSize: 12.5, fontWeight: 700, color: COLORS.textMuted }}>
                    <span>{student.first_name || "Agent"}</span>
                    <span style={{ flex: 1, borderBottom: `2px dotted ${COLORS.violet}` }} />
                    <span>
                      {briefing.title} · {briefing.teks}
                    </span>
                  </div>
                  {exit.forTeacher && (
                    <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, margin: "10px 0 0" }}>{exit.forTeacher}</p>
                  )}
                </div>
              );
            })()}

            <HiddenBonus />
            <PostcardMissionTrail briefing={briefing} art={art} evidence={phaseState.evidence} />
            <button type="button" className="gc-btn" onClick={() => router.push("/briefings")} style={{ ...primaryBtn, marginTop: 14 }}>
              Back to My Briefings
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- v2 mechanics -------------------------------------------------
  // Generic "go to whatever comes next" helper — the four mechanics below
  // (and QuickReview) don't hardcode a target phase like ReasonSort/
  // OpsChoice/etc. do, because they can sit anywhere in a lesson's phase
  // list (Science's light-review shape runs two of them back to back).
  function goNext() {
    goTo(phaseIndex + 1);
  }

  // Shown only on the Clearance "cleared" screen (see the JSX above this
  // block). A silly, ungraded S.A.M. line — the "worth finishing" payoff
  // from the Sept 14 engagement discussion. Explicitly NOT a confetti/
  // celebration burst on every correct tap, which Emily didn't like.
  function HiddenBonus() {
    const bonus = briefing.engagement?.hiddenBonus;
    if (!bonus?.enabled || !bonus?.samLine) return null;
    if (!bonusRevealed) {
      return (
        <button
          type="button"
          className="gc-btn"
          onClick={() => setBonusRevealed(true)}
          style={{ ...ghostBtn, marginTop: 10 }}
        >
          🎁 One more thing from S.A.M....
        </button>
      );
    }
    return (
      <div
        style={{
          marginTop: 10,
          borderRadius: 12,
          border: `1.5px dashed ${COLORS.gold}`,
          background: "#FFFBEF",
          padding: "10px 12px",
          fontSize: 13,
          color: COLORS.textDark,
          maxWidth: "72%",
        }}
      >
        {bonus.samLine}
      </div>
    );
  }

  function QuickReview() {
    const pack = briefing.quickReview || {};
    const qr = phaseState.quickReview;
    const qc = pack.quickCheck || null;

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title || "Quick Review"}</h2>
        {pack.recapBody && (
          <p style={{ fontSize: 14, color: COLORS.textDark, lineHeight: 1.5 }}>{renderBold(pack.recapBody)}</p>
        )}
        {Array.isArray(pack.vocab) && pack.vocab.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "10px 0 16px" }}>
            {pack.vocab.map((v) => (
              <span
                key={v.term}
                title={v.meaning}
                style={{ ...chipStyle(false), display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                {v.icon ? <span aria-hidden="true">{v.icon}</span> : null}
                {v.term}
              </span>
            ))}
          </div>
        )}
        {qc ? (
          <>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark }}>{qc.prompt}</p>
            {(qc.choices || []).map((c) => {
              const picked = qr.quickCheckAnswer === c.id;
              const graded = qr.graded;
              const isCorrect = graded && qr.results?.correct === c.id;
              const isWrongPick = graded && picked && !isCorrect;
              return (
                <button
                  key={c.id}
                  type="button"
                  className="gc-btn"
                  disabled={graded}
                  onClick={() => updateState({ quickReview: { ...qr, quickCheckAnswer: c.id } }, { skipSave: true })}
                  style={{
                    ...choiceBtn,
                    border: `2px solid ${isCorrect ? COLORS.success : isWrongPick ? "#EF4444" : picked ? COLORS.violet : "#E1E2EE"}`,
                    background: picked ? COLORS.violetSoft : COLORS.white,
                  }}
                >
                  {c.text}
                </button>
              );
            })}
            {!qr.graded ? (
              <button
                type="button"
                className="gc-btn"
                disabled={busy || !qr.quickCheckAnswer}
                onClick={async () => {
                  const result = await grade("quickReview", { answer: qr.quickCheckAnswer });
                  setSamLine(result.message || "");
                  setSamState(result.correct === qr.quickCheckAnswer ? "celebrating" : "helping");
                  updateState({ quickReview: { ...qr, graded: true, results: result } });
                }}
                style={primaryBtn}
              >
                Check
              </button>
            ) : (
              <button type="button" className="gc-btn" onClick={goNext} style={primaryBtn}>
                Continue
              </button>
            )}
          </>
        ) : (
          <button type="button" className="gc-btn" onClick={goNext} style={primaryBtn}>
            Continue
          </button>
        )}
      </div>
    );
  }

  function MatchPairs() {
    const pack = briefing.matchPairs || {};
    const mp = phaseState.matchPairs;
    const leftItems = pack.leftItems || [];
    const rightItems = pack.rightItems || [];
    const matches = mp.matches || {};
    const usedRightIds = new Set(Object.values(matches));
    const results = mp.results?.results || null;
    const allMatched = leftItems.length > 0 && leftItems.every((it) => matches[it.id]);

    function selectLeft(id) {
      if (mp.passed) return;
      updateState({ matchPairs: { ...mp, selectedLeftId: id } }, { skipSave: true });
    }
    function matchToRight(rightId) {
      if (mp.passed || !mp.selectedLeftId || usedRightIds.has(rightId)) return;
      updateState(
        {
          matchPairs: { ...mp, matches: { ...matches, [mp.selectedLeftId]: rightId }, selectedLeftId: "", checked: false, results: null },
        },
        { skipSave: true }
      );
    }
    function unmatch(leftId) {
      if (mp.passed || results?.[leftId]?.correct) return;
      const next = { ...matches };
      delete next[leftId];
      updateState({ matchPairs: { ...mp, matches: next, checked: false } }, { skipSave: true });
    }

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title || "Match Pairs"}</h2>
        <p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 0 }}>{pack.kidPrompt}</p>
        <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: -4 }}>
          Tip: tap one on the left, then tap its match on the right. Tap a matched pair to undo it.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {leftItems.map((it) => {
              const matchedTo = matches[it.id];
              const mark = results?.[it.id];
              const border = mark == null ? (mp.selectedLeftId === it.id ? COLORS.violet : "#E1E2EE") : mark.correct ? COLORS.success : "#EF4444";
              return (
                <button
                  key={it.id}
                  type="button"
                  className="gc-btn"
                  onClick={() => (matchedTo ? unmatch(it.id) : selectLeft(it.id))}
                  style={{
                    ...choiceBtn,
                    border: `2px solid ${border}`,
                    background: matchedTo ? COLORS.violetSoft : mp.selectedLeftId === it.id ? COLORS.violetSoft : COLORS.white,
                  }}
                >
                  {it.icon ? <span aria-hidden="true" style={{ marginRight: 6 }}>{it.icon}</span> : null}
                  {it.text}
                  {matchedTo ? ` → ${rightItems.find((r) => r.id === matchedTo)?.text || "?"}` : ""}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rightItems.map((it) => {
              const taken = usedRightIds.has(it.id);
              return (
                <button
                  key={it.id}
                  type="button"
                  className="gc-btn"
                  disabled={taken || !mp.selectedLeftId || mp.passed}
                  onClick={() => matchToRight(it.id)}
                  style={{ ...choiceBtn, border: "2px solid #E1E2EE", opacity: taken ? 0.5 : 1 }}
                >
                  {it.icon ? <span aria-hidden="true" style={{ marginRight: 6 }}>{it.icon}</span> : null}
                  {it.text}
                </button>
              );
            })}
          </div>
        </div>
        {!mp.passed ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || !allMatched}
            onClick={async () => {
              const result = await grade("matchPairs", { matches });
              setToast(result.message || "");
              if (result.pass) {
                setSamLine(pack.helpPass || result.message || "Nice matching!");
                setSamState("celebrating");
                updateState({ matchPairs: { ...mp, checked: true, results: result, passed: true } }, { scores: { ...scores, matchPairs: result } });
              } else {
                setSamLine(pack.helpWrong || result.message || "Try another match.");
                setSamState("helping");
                updateState({ matchPairs: { ...mp, checked: true, results: result } }, { skipSave: true });
              }
            }}
            style={{ ...primaryBtn, opacity: allMatched ? 1 : 0.6 }}
          >
            Check matches
          </button>
        ) : (
          <button type="button" className="gc-btn" onClick={goNext} style={primaryBtn}>
            Continue
          </button>
        )}
      </div>
    );
  }

  function SequenceIt() {
    const pack = briefing.sequenceIt || {};
    const si = phaseState.sequenceIt;
    const steps = pack.steps || [];
    const order = si.order || shuffleWithSeed(steps.map((s) => s.id), briefing.id + "-sequenceIt");
    const results = si.results?.results || null;

    function move(id, dir) {
      if (si.passed) return;
      const idx = order.indexOf(id);
      const swapWith = idx + dir;
      if (swapWith < 0 || swapWith >= order.length) return;
      const next = [...order];
      [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
      updateState({ sequenceIt: { ...si, order: next, checked: false, results: null } }, { skipSave: true });
    }

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title || "Sequence It"}</h2>
        <p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 0 }}>{pack.kidPrompt}</p>
        <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: -4 }}>Tip: use the arrows to put the steps in order.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
          {order.map((id, i) => {
            const step = steps.find((s) => s.id === id);
            const mark = results?.[id];
            const border = mark == null ? "#E1E2EE" : mark.correct ? COLORS.success : "#EF4444";
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 12,
                  border: `2px solid ${border}`,
                  background: COLORS.white,
                  padding: "8px 10px",
                }}
              >
                <span style={{ fontWeight: 800, color: COLORS.violet, minWidth: 18 }}>{i + 1}.</span>
                <span style={{ flex: 1, fontSize: 13.5 }}>
                  {step?.icon ? <span aria-hidden="true" style={{ marginRight: 6 }}>{step.icon}</span> : null}
                  {step?.text}
                </span>
                <button type="button" className="gc-btn" disabled={si.passed || i === 0} onClick={() => move(id, -1)} style={ghostBtn}>
                  ↑
                </button>
                <button type="button" className="gc-btn" disabled={si.passed || i === order.length - 1} onClick={() => move(id, 1)} style={ghostBtn}>
                  ↓
                </button>
              </div>
            );
          })}
        </div>
        {!si.passed ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy}
            onClick={async () => {
              const result = await grade("sequenceIt", { order });
              setToast(result.message || "");
              if (result.pass) {
                setSamLine(pack.helpPass || result.message || "Nice ordering!");
                setSamState("celebrating");
                updateState({ sequenceIt: { ...si, order, checked: true, results: result, passed: true } }, { scores: { ...scores, sequenceIt: result } });
              } else {
                setSamLine(pack.helpWrong || result.message || "Try a different order.");
                setSamState("helping");
                updateState({ sequenceIt: { ...si, order, checked: true, results: result } }, { skipSave: true });
              }
            }}
            style={primaryBtn}
          >
            Check order
          </button>
        ) : (
          <button type="button" className="gc-btn" onClick={goNext} style={primaryBtn}>
            Continue
          </button>
        )}
      </div>
    );
  }

  function LabelPicture() {
    const pack = briefing.labelPicture || {};
    const lp = phaseState.labelPicture;
    const hotspots = pack.hotspots || [];
    const wordBank = pack.wordBank || [];
    const placements = lp.placements || {};
    const usedWordIds = new Set(Object.values(placements));
    const results = lp.results?.results || null;
    const allPlaced = hotspots.length > 0 && hotspots.every((h) => placements[h.id]);
    const img = pack.imageKey ? art?.[pack.imageKey] : null;

    function selectWord(id) {
      if (lp.passed || usedWordIds.has(id)) return;
      updateState({ labelPicture: { ...lp, selectedWordId: id } }, { skipSave: true });
    }
    function placeOnHotspot(hotspotId) {
      if (lp.passed || !lp.selectedWordId) return;
      updateState(
        {
          labelPicture: { ...lp, placements: { ...placements, [hotspotId]: lp.selectedWordId }, selectedWordId: "", checked: false, results: null },
        },
        { skipSave: true }
      );
    }
    function clearHotspot(hotspotId) {
      if (lp.passed || results?.[hotspotId]?.correct) return;
      const next = { ...placements };
      delete next[hotspotId];
      updateState({ labelPicture: { ...lp, placements: next, checked: false } }, { skipSave: true });
    }

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title || "Label the Picture"}</h2>
        <p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 0 }}>{pack.kidPrompt}</p>
        <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", background: COLORS.violetSoft, minHeight: 220 }}>
          {img && <img src={img} alt="" style={{ width: "100%", display: "block" }} />}
          {hotspots.map((h) => {
            const placedWordId = placements[h.id];
            const mark = results?.[h.id];
            const border = mark == null ? (placedWordId ? COLORS.violet : "#FFFFFF") : mark.correct ? COLORS.success : "#EF4444";
            return (
              <button
                key={h.id}
                type="button"
                className="gc-btn"
                onClick={() => (placedWordId ? clearHotspot(h.id) : placeOnHotspot(h.id))}
                style={{
                  position: "absolute",
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: "translate(-50%, -50%)",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                  fontWeight: 700,
                  border: `2px solid ${border}`,
                  background: placedWordId ? COLORS.white : "rgba(255,255,255,.85)",
                  color: COLORS.textDark,
                  minWidth: 28,
                }}
              >
                {placedWordId ? wordBank.find((w) => w.id === placedWordId)?.text || "?" : "?"}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "12px 0" }}>
          {wordBank.map((w) => (
            <button
              key={w.id}
              type="button"
              className="gc-btn"
              disabled={usedWordIds.has(w.id) || lp.passed}
              onClick={() => selectWord(w.id)}
              style={chipStyle(lp.selectedWordId === w.id)}
            >
              {w.text}
            </button>
          ))}
        </div>
        {!lp.passed ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || !allPlaced}
            onClick={async () => {
              const result = await grade("labelPicture", { placements });
              setToast(result.message || "");
              if (result.pass) {
                setSamLine(pack.helpPass || result.message || "Nice labeling!");
                setSamState("celebrating");
                updateState({ labelPicture: { ...lp, checked: true, results: result, passed: true } }, { scores: { ...scores, labelPicture: result } });
              } else {
                setSamLine(pack.helpWrong || result.message || "Try another label.");
                setSamState("helping");
                updateState({ labelPicture: { ...lp, checked: true, results: result } }, { skipSave: true });
              }
            }}
            style={{ ...primaryBtn, opacity: allPlaced ? 1 : 0.6 }}
          >
            Check labels
          </button>
        ) : (
          <button type="button" className="gc-btn" onClick={goNext} style={primaryBtn}>
            Continue
          </button>
        )}
      </div>
    );
  }

  function TrueFalseReason() {
    const pack = briefing.trueFalseReason || {};
    const tf = phaseState.trueFalseReason;
    const statements = pack.statements || [];
    const answers = tf.answers || {};
    const results = tf.results?.results || null;
    const allAnswered = statements.length > 0 && statements.every((s) => answers[s.id]);

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title || "True or False"}</h2>
        <p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 0 }}>{pack.kidPrompt}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          {statements.map((s) => {
            const picked = answers[s.id];
            const mark = results?.[s.id];
            return (
              <div key={s.id} style={{ borderRadius: 12, border: "2px solid #E1E2EE", padding: 10 }}>
                <p style={{ margin: "0 0 8px 0", fontSize: 13.5 }}>{s.text}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["true", "false"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className="gc-btn"
                      disabled={tf.passed}
                      onClick={() => updateState({ trueFalseReason: { ...tf, answers: { ...answers, [s.id]: v }, checked: false } }, { skipSave: true })}
                      style={{
                        ...chipStyle(picked === v),
                        textTransform: "capitalize",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {mark && (
                  <p style={{ margin: "8px 0 0 0", fontSize: 12.5, color: mark.correct ? COLORS.success : "#EF4444", fontWeight: 600 }}>
                    {mark.correct ? "✓ " : "✗ "}
                    {mark.reason}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {!tf.passed ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || !allAnswered}
            onClick={async () => {
              const result = await grade("trueFalseReason", { answers });
              setToast(result.message || "");
              if (result.pass) {
                setSamLine(result.message || "Nice reasoning!");
                setSamState("celebrating");
                updateState({ trueFalseReason: { ...tf, checked: true, results: result, passed: true } }, { scores: { ...scores, trueFalseReason: result } });
              } else {
                setSamLine(result.message || "Check the reasons and try again.");
                setSamState("helping");
                updateState({ trueFalseReason: { ...tf, checked: true, results: result } }, { skipSave: true });
              }
            }}
            style={{ ...primaryBtn, opacity: allAnswered ? 1 : 0.6 }}
          >
            Check answers
          </button>
        ) : (
          <button type="button" className="gc-btn" onClick={goNext} style={primaryBtn}>
            Continue
          </button>
        )}
      </div>
    );
  }

  /* ------------------------------------------------------------------
   * v3 phases — the "make them think" pass.
   *
   * Design rules these four share, and the reason they exist at all:
   *  - a wrong option is never a joke; every distractor is a mistake a
   *    third grader actually makes, and its feedback teaches rather than
   *    just marking;
   *  - nothing is typed (grade 3 types ~5 wpm, which eats a 20-minute
   *    station), but the tapping has to carry a thought — options combine
   *    into claims that can be false, rather than matching 1:1;
   *  - some steps have NO right answer and are scored by the teacher, per
   *    the project's own rule that the AI is a first reader, never judge.
   * ------------------------------------------------------------------ */

  function OpeningFrame() {
    const pack = briefing.openingFrame || {};
    const of = phaseState.openingFrame;
    const traitOpts = pack.traits || [];
    const needed = pack.traitsNeeded || 2;

    const pickTrait = (i) => {
      const has = of.traits.includes(i);
      let next = has ? of.traits.filter((x) => x !== i) : [...of.traits, i];
      if (next.length > needed) next = next.slice(-needed);
      const wrong = next.filter((x) => !traitOpts[x].isTrait);
      if (next.length === needed && wrong.length) {
        setSamLine(traitOpts[wrong[0]].why || "Not that one.");
        setSamState("helping");
        next = next.filter((x) => traitOpts[x].isTrait);
      }
      const done = next.length === needed && next.every((x) => traitOpts[x].isTrait);
      updateState({ openingFrame: { ...of, traits: next, traitsDone: done } }, { skipSave: true });
      if (done) {
        setSamLine(pack.traitsReveal || "");
        setSamState("celebrating");
      }
    };

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title}</h2>
        <p style={{ fontSize: 14.5, color: COLORS.textDark, marginTop: 0 }}>{pack.setup}</p>

        <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "14px 0 8px" }}>
          {pack.isItPrompt}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(pack.isItOptions || []).map((o) => (
            <button
              key={o.id}
              type="button"
              className="gc-btn"
              onClick={() => {
                updateState({ openingFrame: { ...of, isIt: o.id } }, { skipSave: true });
                setSamLine(o.response || "");
                setSamState("helping");
              }}
              style={{ ...pickBtn(of.isIt === o.id), textAlign: "left" }}
            >
              {o.text}
            </button>
          ))}
        </div>
        {of.isIt && (
          <p style={{ fontSize: 13.5, color: COLORS.textMuted, marginTop: 10 }}>
            {(pack.isItOptions || []).find((o) => o.id === of.isIt)?.response}
          </p>
        )}

        {of.isIt && (
          <>
            <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "18px 0 8px" }}>
              {pack.traitsPrompt}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {traitOpts.map((t, i) => (
                <button
                  key={t.text}
                  type="button"
                  className="gc-btn"
                  disabled={of.traitsDone}
                  onClick={() => pickTrait(i)}
                  style={{ ...pickBtn(of.traits.includes(i)), textAlign: "left" }}
                >
                  {t.text}
                </button>
              ))}
            </div>
            {of.traitsDone && (
              <div
                style={{
                  marginTop: 12,
                  background: COLORS.tealSoft,
                  border: `1.5px solid ${COLORS.teal}`,
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 13.5,
                }}
              >
                {renderBold(pack.traitsReveal)}
              </div>
            )}
          </>
        )}

        {of.traitsDone && (
          <>
            <p style={{ fontSize: 13.5, color: COLORS.textDark, margin: "18px 0 6px" }}>{renderBold(pack.predictSetup)}</p>
            <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "0 0 8px" }}>
              {pack.predictPrompt}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(pack.predictOptions || []).map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className="gc-btn"
                  disabled={of.locked}
                  onClick={() => updateState({ openingFrame: { ...of, prediction: o.id } }, { skipSave: true })}
                  style={{
                    ...pickBtn(of.prediction === o.id),
                    flex: "1 1 190px",
                    textAlign: "left",
                    minHeight: 74,
                  }}
                >
                  <span style={{ display: "block", fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>{o.label}</span>
                  <span style={{ display: "block", fontSize: 12.5, color: COLORS.textMuted, marginTop: 3 }}>{o.hint}</span>
                </button>
              ))}
            </div>
            {!of.locked ? (
              <button
                type="button"
                className="gc-btn"
                disabled={busy || !of.prediction}
                onClick={async () => {
                  const result = await grade("openingFrame", { prediction: of.prediction, isIt: of.isIt });
                  setSamLine(result.message || "");
                  setSamState("helping");
                  updateState(
                    { openingFrame: { ...of, locked: true } },
                    { scores: { ...scores, openingFrame: result } }
                  );
                }}
                style={{ ...primaryBtn, marginTop: 14, opacity: of.prediction ? 1 : 0.5 }}
              >
                {pack.lockLabel || "Lock in my guess"}
              </button>
            ) : (
              <>
                <div
                  style={{
                    marginTop: 14,
                    background: COLORS.cream,
                    border: "1.5px dashed #C9CDD9",
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 13.5,
                  }}
                >
                  {renderBold(pack.lockedNote || "Locked in. HQ isn't telling you yet — you'll find out by watching the town get built.")}
                </div>
                <button type="button" className="gc-btn" onClick={goNext} style={{ ...primaryBtn, marginTop: 12 }}>
                  Continue
                </button>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  function StoryTeach() {
    const pack = briefing.storyTeach || {};
    const st = phaseState.storyTeach;
    const beats = pack.beats || [];
    const i = Math.min(st.beatIndex, Math.max(beats.length - 1, 0));
    const beat = beats[i] || {};
    const mine = st.beats[beat.id] || {};
    const isLast = i === beats.length - 1;
    const img = art[beat.imageKey];

    const setBeat = (patch, opts) =>
      updateState(
        { storyTeach: { ...st, beats: { ...st.beats, [beat.id]: { ...mine, ...patch } } } },
        opts || { skipSave: true }
      );

    const chosen = mine.choiceIndex != null ? beat.choices?.[mine.choiceIndex] : null;

    return (
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{beat.title}</h2>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: COLORS.violet, textTransform: "uppercase" }}>
            {beat.tag || `Problem ${i + 1} of ${beats.length}`}
          </span>
        </div>

        {/* Ledger — fills one line per beat the student has named, so the
            three reasons visibly accumulate instead of arriving as a list. */}
        <div style={{ background: COLORS.cream, borderRadius: 12, padding: "10px 12px", margin: "8px 0 12px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.7, color: COLORS.textMuted, textTransform: "uppercase" }}>
            {pack.ledgerTitle || "Why people stay"}
          </div>
          {beats.filter((b) => st.beats[b.id]?.named).length === 0 ? (
            <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 4 }}>
              {pack.ledgerEmpty || "Nothing yet — you'll fill this in as the town grows."}
            </div>
          ) : (
            beats
              .filter((b) => st.beats[b.id]?.named)
              .map((b, n) => (
                <div key={b.id} style={{ fontSize: 13, fontWeight: 700, marginTop: 5, color: COLORS.textDark }}>
                  <span style={{ color: COLORS.teal, fontWeight: 800 }}>{n + 1}. </span>
                  {b.ledgerLine}
                </div>
              ))
          )}
        </div>

        {img && (
          <img
            src={img}
            alt=""
            style={{ width: "100%", maxWidth: 520, borderRadius: 14, display: "block", marginBottom: 10 }}
          />
        )}
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: COLORS.textDark, margin: "0 0 12px" }}>
          {renderBold(beat.situation)}
        </p>

        <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "0 0 8px" }}>
          {beat.ask || "What should they do?"}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(beat.choices || []).map((c, ci) => (
            <button
              key={ci}
              type="button"
              className="gc-btn"
              disabled={mine.choiceIndex != null}
              onClick={() => {
                setBeat({ choiceIndex: ci });
                setSamAnchor("qc");
              }}
              style={{ ...pickBtn(mine.choiceIndex === ci), textAlign: "left" }}
            >
              {c.text}
            </button>
          ))}
        </div>

        {chosen && (
          <>
            <div
              style={{
                marginTop: 12,
                background: chosen.best ? COLORS.tealSoft : "#FFF4DC",
                border: `1.5px solid ${chosen.best ? COLORS.teal : "#FFC44D"}`,
                borderRadius: 12,
                padding: 12,
                fontSize: 13.5,
              }}
            >
              {chosen.best ? beat.bestLead || "That's what they chose too — and here's why it worked." : <><strong>If they had: </strong>{chosen.whatIf}</>}
            </div>
            <div
              style={{
                marginTop: 8,
                background: "#E8F9EE",
                border: `1.5px solid ${COLORS.success}`,
                borderRadius: 12,
                padding: 12,
                fontSize: 13.5,
              }}
            >
              {chosen.best ? renderBold(beat.did) : <><strong>What they actually did: </strong>{renderBold(beat.did)}</>}
            </div>

            {/* The student names the reason — THIS is what writes the ledger.
                Handing them the label is what made the old Field Brief feel
                like a list of facts instead of an explanation. */}
            {!mine.named ? (
              <>
                <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "16px 0 8px" }}>
                  {pack.namePrompt || "So — why did those families stay? Name it, and it goes in the ledger."}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(pack.reasons || []).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className="gc-btn"
                      onClick={async () => {
                        const result = await grade("storyTeach", { beatId: beat.id, named: r.id });
                        if (result.pass) {
                          setSamLine(result.message || "That's it.");
                          setSamState("celebrating");
                          setBeat({ named: r.id }, { scores: { ...scores, [`storyTeach_${beat.id}`]: result } });
                        } else {
                          setSamLine(result.message || beat.nameWrong || "");
                          setSamState("helping");
                          setToast(result.message || "");
                        }
                      }}
                      style={chipStyle(false)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {beat.vocabTerm && (
                  <p style={{ fontSize: 13, margin: "14px 0 0", color: COLORS.textMuted }}>
                    <strong style={{ color: COLORS.teal, fontFamily: "'Poppins', sans-serif" }}>{beat.vocabTerm}</strong>
                    {" · "}
                    {beat.vocabMeaning}
                  </p>
                )}
                {beat.realWorld && (
                  <div
                    style={{
                      marginTop: 10,
                      background: COLORS.violetSoft,
                      border: `1.5px solid ${COLORS.violet}`,
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.7, color: COLORS.violet, textTransform: "uppercase" }}>
                      This really happened
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 13.5 }}>{beat.realWorld}</p>
                  </div>
                )}

                {/* Near-transfer: stretches the category so a student who has
                    been pattern-matching on one example gets caught here. */}
                {beat.stretch && (
                  <>
                    <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "16px 0 8px" }}>
                      {beat.stretch.q}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {beat.stretch.options.map((o, si) => (
                        <button
                          key={si}
                          type="button"
                          className="gc-btn"
                          disabled={mine.stretchIndex != null}
                          onClick={() => setBeat({ stretchIndex: si })}
                          style={{ ...pickBtn(mine.stretchIndex === si), textAlign: "left" }}
                        >
                          {o.text}
                        </button>
                      ))}
                    </div>
                    {mine.stretchIndex != null && (
                      <div
                        style={{
                          marginTop: 10,
                          background: beat.stretch.options[mine.stretchIndex].ok ? "#E8F9EE" : "#FFF4DC",
                          border: `1.5px solid ${beat.stretch.options[mine.stretchIndex].ok ? COLORS.success : "#FFC44D"}`,
                          borderRadius: 12,
                          padding: 12,
                          fontSize: 13.5,
                        }}
                      >
                        {renderBold(beat.stretch.options[mine.stretchIndex].why)}
                      </div>
                    )}
                  </>
                )}

                {(!beat.stretch || mine.stretchIndex != null) && (
                  <>
                    {beat.bridge && !isLast && (
                      <p style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.teal, marginTop: 14 }}>{beat.bridge}</p>
                    )}
                    {isLast && st.done && (
                      <div
                        style={{
                          marginTop: 14,
                          background: COLORS.cream,
                          border: "1.5px dashed #C9CDD9",
                          borderRadius: 12,
                          padding: 12,
                          fontSize: 13.5,
                        }}
                      >
                        {renderBold(
                          phaseState.openingFrame.prediction === pack.firstReasonId
                            ? pack.predictionRight || ""
                            : (pack.predictionWrong || "").replace(
                                "{GUESS}",
                                (briefing.openingFrame?.predictOptions || []).find(
                                  (o) => o.id === phaseState.openingFrame.prediction
                                )?.label || "your guess"
                              )
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      className="gc-btn"
                      onClick={() => {
                        if (isLast) {
                          if (!st.done) updateState({ storyTeach: { ...st, done: true } });
                          else goNext();
                        } else {
                          updateState({ storyTeach: { ...st, beatIndex: i + 1 } });
                        }
                      }}
                      style={{ ...primaryBtn, marginTop: 12 }}
                    >
                      {isLast ? (st.done ? "Continue" : pack.finalLabel || "So — which one came first?") : beat.nextLabel || "Next →"}
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }

  function Synthesis() {
    const pack = briefing.synthesis || {};
    const sy = phaseState.synthesis;
    const cards = pack.orderCards || [];
    const causes = pack.causes || [];
    const cause = causes[Math.min(sy.causeIndex, Math.max(causes.length - 1, 0))];
    const removal = (pack.removals || []).find((r) => r.id === sy.removed);

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title}</h2>

        {/* Part 1 — sequencing. TEKS 3.17(B) pairs "sequence and categorize"
            with this content standard; every other phase categorizes and
            nothing sequenced until this existed. */}
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: COLORS.gold, textTransform: "uppercase", marginTop: 12 }}>
          {pack.orderTag || "Part 1 · What happened when"}
        </p>
        <p style={{ fontSize: 13.5, color: COLORS.textMuted, margin: "4px 0 8px" }}>{pack.orderPrompt}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {cards.map((c) => {
            const rank = sy.order.indexOf(c.id);
            return (
              <button
                key={c.id}
                type="button"
                className="gc-btn"
                disabled={rank > -1}
                onClick={async () => {
                  const result = await grade("synthesis", { step: "order", pick: c.id, soFar: sy.order });
                  if (!result.pass) {
                    setSamLine(result.message || "");
                    setSamState("helping");
                    setToast(result.message || "");
                    return;
                  }
                  const next = [...sy.order, c.id];
                  setSamLine(result.message || "");
                  setSamState(next.length === cards.length ? "celebrating" : "helping");
                  updateState(
                    { synthesis: { ...sy, order: next, orderDone: next.length === cards.length } },
                    next.length === cards.length ? { scores: { ...scores, synthesisOrder: result } } : { skipSave: true }
                  );
                }}
                style={{
                  ...pickBtn(rank > -1),
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    background: rank > -1 ? COLORS.teal : "#E1E2EE",
                    color: rank > -1 ? COLORS.white : COLORS.textMuted,
                  }}
                >
                  {rank > -1 ? rank + 1 : "?"}
                </span>
                {c.text}
              </button>
            );
          })}
        </div>

        {/* Part 2 — causation. Distractors are events from the wrong end of
            the timeline, which is the characteristic grade-3 causal error. */}
        {sy.orderDone && cause && !sy.causesDone && (
          <>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: COLORS.gold, textTransform: "uppercase", marginTop: 20 }}>
              {pack.causeTag || "Part 2 · What caused what"}
            </p>
            <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "6px 0 8px" }}>{cause.q}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cause.options.map((o, oi) => (
                <button
                  key={oi}
                  type="button"
                  className="gc-btn"
                  onClick={() => {
                    const answered = { ...sy.causeAnswers, [cause.id]: oi };
                    setSamLine(o.why);
                    setSamState(o.ok ? "celebrating" : "helping");
                    const advance = o.ok;
                    updateState(
                      {
                        synthesis: {
                          ...sy,
                          causeAnswers: answered,
                          causeIndex: advance ? sy.causeIndex + 1 : sy.causeIndex,
                          causesDone: advance && sy.causeIndex + 1 >= causes.length,
                        },
                      },
                      { skipSave: true }
                    );
                    setToast(o.why);
                  }}
                  style={{ ...pickBtn(false), textAlign: "left" }}
                >
                  {o.text}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Part 3 — interdependence. The old version asserted "take one away
            and there's no town" in a closing sentence; here they pull one
            out and reason about what fails, which is the actual big idea. */}
        {sy.causesDone && (
          <>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: COLORS.gold, textTransform: "uppercase", marginTop: 20 }}>
              {pack.removeTag || "Part 3 · Take one away"}
            </p>
            <p style={{ fontSize: 13.5, color: COLORS.textMuted, margin: "4px 0 8px" }}>{pack.removePrompt}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(pack.removals || []).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="gc-btn"
                  disabled={sy.passed}
                  onClick={() => updateState({ synthesis: { ...sy, removed: r.id, breakAnswer: "" } }, { skipSave: true })}
                  style={{ ...pickBtn(sy.removed === r.id), textAlign: "left" }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {removal && (
              <>
                <p style={{ fontWeight: 800, fontFamily: "'Poppins', sans-serif", fontSize: 15, margin: "16px 0 8px" }}>{removal.q}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {removal.options.map((o, oi) => (
                    <button
                      key={oi}
                      type="button"
                      className="gc-btn"
                      disabled={sy.passed}
                      onClick={async () => {
                        const result = await grade("synthesis", { step: "break", removed: removal.id, pick: oi });
                        setSamLine(result.message || "");
                        setSamState(result.pass ? "celebrating" : "helping");
                        setToast(result.message || "");
                        updateState(
                          { synthesis: { ...sy, breakAnswer: String(oi), passed: Boolean(result.pass) } },
                          result.pass ? { scores: { ...scores, synthesis: result } } : { skipSave: true }
                        );
                      }}
                      style={{ ...pickBtn(sy.breakAnswer === String(oi)), textAlign: "left" }}
                    >
                      {o.text}
                    </button>
                  ))}
                </div>
                {sy.passed && (
                  <>
                    <div
                      style={{
                        marginTop: 12,
                        background: "#E8F9EE",
                        border: `1.5px solid ${COLORS.success}`,
                        borderRadius: 12,
                        padding: 12,
                        fontSize: 13.5,
                      }}
                    >
                      {renderBold(pack.bigIdea || "")}
                    </div>
                    <button type="button" className="gc-btn" onClick={goNext} style={{ ...primaryBtn, marginTop: 12 }}>
                      Continue
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }

  function Transfer() {
    const pack = briefing.transfer || {};
    const tr = phaseState.transfer;
    const spots = pack.spots || [];
    const need = pack.tapCount || 2;
    const img = art[pack.imageKey];
    const ready = tr.tapped.length === need && tr.claim;

    const tapSpot = (id) => {
      if (tr.passed) return;
      const has = tr.tapped.includes(id);
      let next = has ? tr.tapped.filter((x) => x !== id) : [...tr.tapped, id];
      if (next.length > need) next = next.slice(-need);
      setSamAnchor("image");
      updateState({ transfer: { ...tr, tapped: next, checked: false } }, { skipSave: true });
    };

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{pack.title}</h2>
        <p style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 0 }}>{renderBold(pack.kidPrompt || "")}</p>

        {img && (
          <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "10px 0" }}>
            <img src={img} alt={pack.imageAlt || ""} style={{ width: "100%", borderRadius: 14, display: "block" }} />
            {spots.map((s) => {
              const on = tr.tapped.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  className="gc-btn"
                  aria-label={s.label}
                  aria-pressed={on}
                  disabled={tr.passed}
                  onClick={() => tapSpot(s.id)}
                  style={{
                    position: "absolute",
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: 46,
                    height: 46,
                    borderRadius: 999,
                    border: `3px solid ${on ? COLORS.violet : "rgba(255,255,255,.85)"}`,
                    background: on ? "rgba(123,93,255,.28)" : "rgba(13,27,42,.14)",
                    padding: 0,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Which spots were tapped, in words — the art is a sketch stand-in
            in some packs, and a student who can't read the picture still
            needs to know what they selected. */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {spots.map((s) => (
            <button
              key={`chip-${s.id}`}
              type="button"
              className="gc-btn"
              disabled={tr.passed}
              onClick={() => tapSpot(s.id)}
              style={chipStyle(tr.tapped.includes(s.id))}
            >
              {s.label}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 13.5, color: COLORS.textDark, margin: "10px 0 6px" }}>{pack.claimFrame}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(pack.claimOptions || []).map((o) => (
            <button
              key={o.id}
              type="button"
              className="gc-btn"
              disabled={tr.passed}
              onClick={() => updateState({ transfer: { ...tr, claim: o.id, checked: false } }, { skipSave: true })}
              style={chipStyle(tr.claim === o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>

        {tr.results?.message && (
          <div
            style={{
              marginTop: 12,
              background: tr.passed ? "#E8F9EE" : "#FFF4DC",
              border: `1.5px solid ${tr.passed ? COLORS.success : "#FFC44D"}`,
              borderRadius: 12,
              padding: 12,
              fontSize: 13.5,
            }}
          >
            {renderBold(tr.results.message)}
          </div>
        )}

        {!tr.passed ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || !ready}
            onClick={async () => {
              const result = await grade("transfer", { tapped: tr.tapped, claim: tr.claim });
              setSamLine(result.message || "");
              setSamState(result.pass ? "celebrating" : "helping");
              updateState(
                { transfer: { ...tr, checked: true, results: result, passed: Boolean(result.pass) } },
                result.pass ? { scores: { ...scores, transfer: result } } : { skipSave: true }
              );
            }}
            style={{ ...primaryBtn, marginTop: 12, opacity: ready ? 1 : 0.5 }}
          >
            {pack.submitLabel || "Send my proof to HQ"}
          </button>
        ) : (
          <button type="button" className="gc-btn" onClick={goNext} style={{ ...primaryBtn, marginTop: 12 }}>
            Continue
          </button>
        )}
      </div>
    );
  }

  let body = null;
  if (phaseId === "intelDrop") body = <IntelDrop />;
  else if (phaseId === "openingFrame") body = <OpeningFrame />;
  else if (phaseId === "storyTeach") body = <StoryTeach />;
  else if (phaseId === "synthesis") body = <Synthesis />;
  else if (phaseId === "transfer") body = <Transfer />;
  else if (phaseId === "fieldBrief") body = <FieldBrief />;
  else if (phaseId === "reasonSort") body = <ReasonSort />;
  else if (phaseId === "opsChoice") body = <OpsChoice />;
  else if (phaseId === "evidenceDrop") body = <EvidenceDrop />;
  else if (phaseId === "quickReview") body = <QuickReview />;
  else if (phaseId === "matchPairs") body = <MatchPairs />;
  else if (phaseId === "sequenceIt") body = <SequenceIt />;
  else if (phaseId === "labelPicture") body = <LabelPicture />;
  else if (phaseId === "trueFalseReason") body = <TrueFalseReason />;
  else body = <Clearance />;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <BackToHubButton />
      {/* Sept 12, 2026 — bottom padding bumped 100 -> 320 so SamGuide (fixed
          to the viewport, see SAM_ANCHORS above) always has clear floor
          space under it. SAM_ANCHORS' bottom-anchored spots (home/image/
          postcard/sort/chips) sit as close as 18-28px off the bottom edge,
          and its "side" speech bubble can reach roughly that offset + 38px
          + its own height above the icon — Emily flagged the bubble
          covering the Intel Drop "AGENT TIP" panel text on exactly this
          phase. 320px comfortably clears that reach (worst case ~277px)
          even at SamGuide.js's capped bubble height (see bubbleStyle's
          maxHeight there — the two numbers are meant to be read together:
          this is the reserved floor, that's the guaranteed-not-to-exceed-it
          ceiling), so the fixed guide always lands on empty background
          instead of real content, at any anchor or scroll position. */}
      <main style={{ padding: "22px 28px 320px", position: "relative", maxWidth: 1040, margin: "0 auto" }}>
        <button
          type="button"
          className="gc-btn"
          onClick={() => router.push("/briefings")}
          style={{ background: "none", color: COLORS.textMuted, fontSize: 13, fontWeight: 600, padding: 0, marginBottom: 10 }}
        >
          ← My Briefings
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet }}>
              {briefing.id} · TEKS {briefing.teks} · ~{briefing.minutes || 30} min
            </div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, margin: "2px 0 4px", color: COLORS.textDark }}>
              {briefing.title}
            </h1>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 13 }}>{briefing.tagline}</p>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: status === "cleared" ? COLORS.success : COLORS.violet }}>
            {status === "cleared" ? "Cleared" : busy ? "Saving…" : "In progress"}
          </div>
        </div>

        {briefing.engagement?.progressTrail?.enabled && (
          <div
            style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}
            aria-hidden="true"
            title={`Step ${phaseIndex + 1} of ${PHASES.length}`}
          >
            {PHASES.map((p, i) => (
              <span key={p.id} style={{ fontSize: 15, opacity: i <= phaseIndex ? 1 : 0.28 }}>
                {i < phaseIndex ? "👣" : i === phaseIndex ? "🚶" : "·"}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {PHASES.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="gc-btn"
              onClick={() => goTo(i)}
              style={{
                borderRadius: 999,
                padding: "7px 12px",
                fontSize: 12,
                fontWeight: 700,
                background: i === phaseIndex ? COLORS.violet : COLORS.white,
                color: i === phaseIndex ? COLORS.white : COLORS.textDark,
                border: `1.5px solid ${i === phaseIndex ? COLORS.violet : "#E1E2EE"}`,
              }}
            >
              {i + 1}. {p.label}
            </button>
          ))}
        </div>

        {/* Read aloud. One control per phase rather than a speaker icon on
            every line: it reads the rendered card top to bottom, so it
            covers the phases that predate this too, with no per-content
            authoring. See useReadAloud above for why it's browser TTS. */}
        {readAloud.supported && (
          <div data-tts-skip="1" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              className="gc-btn"
              onClick={() => (readAloud.speaking ? readAloud.stop() : readAloud.speak(collectSpeakable(bodyRef.current)))}
              style={{
                borderRadius: 999,
                padding: "7px 14px",
                fontSize: 12.5,
                fontWeight: 700,
                background: readAloud.speaking ? COLORS.teal : COLORS.tealSoft,
                color: readAloud.speaking ? COLORS.white : COLORS.teal,
                border: `1.5px solid ${COLORS.teal}`,
              }}
            >
              {readAloud.speaking ? "■ Stop" : "🔊 Read this to me"}
            </button>
          </div>
        )}

        <div ref={bodyRef}>{body}</div>

        {toast && (
          <div
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              background: COLORS.navy,
              color: COLORS.white,
              padding: "10px 16px",
              borderRadius: 999,
              fontSize: 13,
              zIndex: 20,
            }}
          >
            {toast}
          </div>
        )}

        <SamGuide
          skinKey={student.equipped_sam_skin}
          alt={student.sam_nickname || "S.A.M."}
          size={110}
          anchors={SAM_ANCHORS}
          activeAnchor={samAnchor}
          line={samLine}
          state={samState}
          tipOnTap={tipOnTap}
          onDismiss={() => setSamLine("")}
          bubbleSide={samAnchor === "image" || samAnchor === "postcard" ? "right" : "left"}
          bubblePlacement={phaseId === "fieldBrief" ? "above" : "side"}
        />
      </main>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, margin: "10px 0 4px" };
const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "2px solid #ECEAF5",
  borderRadius: 10,
  padding: "9px 10px",
  fontSize: 13.5,
  fontFamily: "inherit",
};
const primaryBtn = {
  marginTop: 12,
  background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`,
  color: COLORS.white,
  borderRadius: 999,
  padding: "10px 18px",
  fontWeight: 700,
  fontSize: 13.5,
};
const ghostBtn = {
  marginTop: 12,
  background: COLORS.white,
  color: COLORS.textMuted,
  borderRadius: 999,
  padding: "10px 14px",
  fontWeight: 700,
  fontSize: 13,
  border: "1.5px solid #E1E2EE",
};
const choiceBtn = {
  display: "block",
  width: "100%",
  textAlign: "left",
  borderRadius: 12,
  padding: "10px 12px",
  marginBottom: 6,
  border: "2px solid transparent",
  fontSize: 13,
  color: COLORS.textDark,
};
/** Selectable variant of `choiceBtn` above, for the v3 phases where a
 * student picks one of several full-width options and the selection has
 * to read clearly (the existing phases spread `choiceBtn` and set the two
 * state colors inline; this just names that pattern once). */
function pickBtn(on) {
  return {
    ...choiceBtn,
    background: on ? COLORS.violetSoft : COLORS.white,
    borderColor: on ? COLORS.violet : "#E1E2EE",
    fontWeight: on ? 800 : 600,
  };
}
function chipStyle(on) {
  return {
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 700,
    background: on ? COLORS.violetSoft : COLORS.white,
    color: on ? COLORS.violet : COLORS.textDark,
    border: `1.5px solid ${on ? COLORS.violet : "#E1E2EE"}`,
  };
}
