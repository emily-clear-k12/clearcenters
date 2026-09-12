"use client";

import React, { useState, useCallback, useEffect } from "react";
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

const PHASES = [
  { id: "intelDrop", label: "Intel Drop" },
  { id: "fieldBrief", label: "Field Brief" },
  { id: "reasonSort", label: "Reason Sort" },
  { id: "opsChoice", label: "Ops Choice" },
  { id: "evidenceDrop", label: "Evidence Drop" },
  { id: "clearance", label: "Clearance" },
];

/** Phases that imply Reason Sort was already past (pre-P2 saves). */
const PHASES_AFTER_REASON_SORT = ["opsChoice", "evidenceDrop", "clearance"];

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
  };
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
      setSamAnchor("qc");
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
    if (phaseId === "intelDrop") setSamAnchor("image");
    else if (phaseId === "fieldBrief") setSamAnchor("qc");
    else if (phaseId === "reasonSort") setSamAnchor("sort");
    else if (phaseId === "opsChoice") setSamAnchor("chips");
    else if (phaseId === "evidenceDrop") setSamAnchor("postcard");
    else if (phaseId === "clearance") setSamAnchor(status === "cleared" ? "stamp" : "home");
    else setSamAnchor("home");
  }, [phaseId, status, samLines, phaseState.ops?.debrief, briefing.opsChoice?.debriefSamLine, packPages, isProjectMode, phaseState.field?.beatIndex]);

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
      setSamAnchor("qc");
      setSamState(ok ? "celebrating" : "thinking");
      setSamLine(ok ? sam.afterCorrect || "Nice." : sam.afterWrong || "Try again.");
      updateState({ field: { ...field, pageChips: nextChips } }, { skipSave: true });
    }

    function pickQc(qcId, choiceId) {
      setSamAnchor("qc");
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
                          borderColor: right ? COLORS.success : wrong ? "#EF4444" : on ? COLORS.violet : "#E1E2EE",
                          background: right ? "#ECFDF3" : wrong ? "#FEF2F2" : on ? COLORS.violetSoft : COLORS.white,
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

          <button
            type="button"
            className="gc-btn"
            onClick={() => goToPhase("evidenceDrop")}
            style={{
              ...primaryBtn,
              marginTop: 16,
              width: "100%",
              padding: "14px 20px",
              fontSize: 15,
              boxSizing: "border-box",
            }}
          >
            Continue to Evidence Drop →
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
    const gateDone = {
      claim: Boolean(phaseState.intel.revealed),
      field: Boolean(phaseState.field.graded),
      sort: Boolean(phaseState.reasonSort?.passed),
      postcard: phaseState.evidence.score != null,
    };
    const progressGates = gateDefs.map((g) => ({ ...g, done: Boolean(gateDone[g.id]) }));
    const gatesOk = progressGates.every((g) => g.done);
    const answersOk = (briefing.clearance.items || []).every((item) => Boolean(cl.answers[item.id]));

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
                "Agent report-in. Finish the progress gates from your work, then answer four quick questions."}
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

        {!(cl.graded && cl.results && status !== "cleared" && !cl.results.pass) && (<>
        <h3 style={{ fontSize: 14, margin: "8px 0 6px" }}>Mission progress (auto from your work)</h3>
        <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 0 }}>
          These check themselves when you finish each beat. If a circle is empty, tap Go finish this.
        </p>
        <div style={{ display: "grid", gap: 6, marginBottom: 14 }}>
          {progressGates.map((g) => {
            const gatePhase = { claim: "intelDrop", field: "fieldBrief", sort: "reasonSort", postcard: "evidenceDrop" }[g.id];
            return (
            <button
              key={g.id}
              type="button"
              className="gc-btn"
              onClick={() => { if (!g.done && gatePhase) goToPhase(gatePhase); }}
              style={{
                ...choiceBtn,
                marginBottom: 0,
                borderColor: g.done ? COLORS.teal : COLORS.violet,
                background: g.done ? COLORS.tealSoft : COLORS.white,
                cursor: g.done ? "default" : "pointer",
                opacity: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
              aria-checked={g.done}
              role="checkbox"
            >
              <span>
              <span style={{ fontWeight: 800, color: g.done ? COLORS.success : COLORS.textMuted, marginRight: 8 }}>
                {g.done ? "✓" : "○"}
              </span>
              {g.label}
              </span>
              {!g.done && gatePhase && (
                <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet }}>Go finish this →</span>
              )}
            </button>
            );
          })}
        </div>
        </>)}

        {status === "cleared" ? null : (cl.graded && cl.results && !cl.results.pass) ? null : (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || !gatesOk || !answersOk}
            onClick={async () => {
              if (!gatesOk || !answersOk) return;
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
            style={{ ...primaryBtn, opacity: !gatesOk || !answersOk ? 0.5 : 1 }}
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
            <PostcardMissionTrail briefing={briefing} art={art} evidence={phaseState.evidence} />
            <button type="button" className="gc-btn" onClick={() => router.push("/briefings")} style={{ ...primaryBtn, marginTop: 14 }}>
              Back to My Briefings
            </button>
          </div>
        )}
      </div>
    );
  }

  let body = null;
  if (phaseId === "intelDrop") body = <IntelDrop />;
  else if (phaseId === "fieldBrief") body = <FieldBrief />;
  else if (phaseId === "reasonSort") body = <ReasonSort />;
  else if (phaseId === "opsChoice") body = <OpsChoice />;
  else if (phaseId === "evidenceDrop") body = <EvidenceDrop />;
  else body = <Clearance />;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <BackToHubButton />
      <main style={{ padding: "22px 28px 100px", position: "relative", maxWidth: 1040, margin: "0 auto" }}>
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

        {body}

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
