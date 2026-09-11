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
      answers: s.field?.answers || {},
      graded: Boolean(s.field?.graded),
      results: s.field?.results || null,
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

function evidenceChipToReasonChoice(chip) {
  const map = {
    "posted rules / firefighters / speed limits": "a",
    "place to worship freely": "b",
    "market, farms, jobs, homes": "c",
  };
  return map[chip] || null;
}

function reasonIdToChoice(reasonId) {
  const map = {
    security: "a",
    religious: "b",
    material: "c",
    "security and laws": "a",
    "religious freedom": "b",
    "material well-being": "c",
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

  // Clear stale SAM lines on phase change; park at home between beats.
  useEffect(() => {
    setSamLine(samLines[phaseId] || "");
    setSamState(phaseId === "clearance" && status === "cleared" ? "celebrating" : "helping");
    if (phaseId === "intelDrop") setSamAnchor("image");
    else if (phaseId === "fieldBrief") setSamAnchor("qc");
    else if (phaseId === "reasonSort") setSamAnchor("sort");
    else if (phaseId === "opsChoice") setSamAnchor("chips");
    else if (phaseId === "evidenceDrop") setSamAnchor("postcard");
    else if (phaseId === "clearance") setSamAnchor(status === "cleared" ? "stamp" : "home");
    else setSamAnchor("home");
  }, [phaseId, status, samLines]);

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
                          claim: `I think this place exists because ${chip}`,
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
                Your claim: <strong style={{ color: COLORS.textDark }}>I think this place exists because {intel.chip}</strong>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
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
                  {slot ? slot.label : `Open fund slot ${i + 1}`}
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
                  border: `2.5px solid ${on ? (isDistractor ? "#F59E0B" : COLORS.violet) : "#E1E2EE"}`,
                  background: on ? (isDistractor ? "#FFF7E6" : COLORS.violetSoft) : COLORS.white,
                  color: COLORS.textDark,
                  boxShadow: on ? "0 8px 18px rgba(123,93,255,.18)" : "0 4px 12px rgba(13,27,42,.06)",
                  opacity: ops.debrief ? 0.92 : 1,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }} aria-hidden="true">
                  {p.emoji || "📌"}
                </div>
                <div style={{ fontWeight: 800, fontSize: 14.5, fontFamily: "'Poppins', sans-serif" }}>{p.label}</div>
                <div style={{ fontSize: 12.5, color: isDistractor ? "#B45309" : COLORS.textMuted, marginTop: 4 }}>
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

        {!ops.debrief ? (
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
              setSamLine(result.message || pack.distractorFailMessage || "");
              setSamState(result.pass ? "celebrating" : "helping");
              if (result.pass) {
                const funded = ops.picks.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
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
              }
            }}
            style={{
              ...primaryBtn,
              opacity: !canSubmit ? 0.5 : 1,
            }}
          >
            Submit council vote
          </button>
        ) : (
          <div style={{ marginTop: 12, background: COLORS.tealSoft, borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.teal, letterSpacing: 0.4, marginBottom: 6 }}>
              {pack.consequenceTitle || "What improves vs what waits"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div style={{ background: COLORS.white, borderRadius: 12, padding: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Improves now</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: COLORS.textDark }}>
                  {ops.picks.map((id) => {
                    const p = projects.find((x) => x.id === id);
                    if (!p) return null;
                    return (
                      <li key={id} style={{ marginBottom: 4 }}>
                        <strong>{p.label}</strong>
                        {p.improves ? ` — ${p.improves}` : ""}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div style={{ background: COLORS.white, borderRadius: 12, padding: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Waiting until next year</div>
                {(ops.consequence?.waitingIds || waitingTeks.map((p) => p.id)).map((id) => {
                  const p = projects.find((x) => x.id === id);
                  if (!p || p.distractor) return null;
                  return (
                    <p key={id} style={{ margin: "0 0 6px", fontSize: 12.5 }}>
                      {p.emoji} <strong>{p.label}</strong>
                      <br />
                      <span style={{ color: COLORS.textMuted }}>
                        {(pack.deferredReasonChips || []).find((c) => c.id === (ops.deferredReasonId || p.reasonId))?.label ||
                          `Waiting on ${p.reason}`}
                      </span>
                    </p>
                  );
                })}
              </div>
            </div>
            <p style={{ margin: "0 0 8px", fontSize: 13.5 }}>{renderBold(pack.debrief)}</p>
            <button type="button" className="gc-btn" onClick={() => goToPhase("evidenceDrop")} style={{ ...primaryBtn, marginTop: 8 }}>
              Continue to Evidence Drop →
            </button>
          </div>
        )}
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
    const gateDefs = briefing.clearance.progressGates || [
      { id: "claim", label: "Claim locked" },
      { id: "field", label: "All 3 Field Brief beats + QCs done" },
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
    let c4Expected =
      reasonIdToChoice(deferredProj?.reasonId) ||
      evidenceChipToReasonChoice(evidenceText) ||
      reasonIdToChoice(reuseReason) ||
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

        {briefing.clearance.items.map((item) => {
          let prompt = item.prompt;
          if (item.dynamicReuse) {
            if (deferredProj) {
              prompt = "Which reason is Maple Crossing still waiting on?";
            } else if (evidenceText) {
              prompt = `Your postcard evidence was “${evidenceText}” — which reason matches?`;
            } else if (fundedLabels.length) {
              prompt =
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

        <h3 style={{ fontSize: 14, margin: "8px 0 6px" }}>Mission progress (auto from your work)</h3>
        <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 0 }}>
          These check themselves when you finish each beat — no need to tap them.
        </p>
        <div style={{ display: "grid", gap: 6, marginBottom: 14 }}>
          {progressGates.map((g) => (
            <div
              key={g.id}
              style={{
                ...choiceBtn,
                marginBottom: 0,
                borderColor: g.done ? COLORS.teal : "#E1E2EE",
                background: g.done ? COLORS.tealSoft : COLORS.white,
                cursor: "default",
                opacity: g.done ? 1 : 0.85,
              }}
              aria-checked={g.done}
              role="checkbox"
            >
              <span style={{ fontWeight: 800, color: g.done ? COLORS.success : COLORS.textMuted, marginRight: 8 }}>
                {g.done ? "✓" : "○"}
              </span>
              {g.label}
            </div>
          ))}
        </div>

        {status !== "cleared" ? (
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
              setToast(result.pass ? "Clearance checks passed." : "Review missed questions, then try again.");
              if (result.pass) {
                updateState(
                  { clearance: { ...cl, graded: true, results: result } },
                  { scores: { ...scores, clearance: result }, status: "cleared", phase: "clearance" }
                );
                setStatus("cleared");
                setSamLine(samLines.cleared || briefing.clearance.clearedMessage);
                setSamState("celebrating");
                setSamAnchor("stamp");
              } else {
                updateState({ clearance: { ...cl, graded: true, results: result } }, { scores: { ...scores, clearance: result } });
                setSamLine("Check the missed questions — your progress gates are already done.");
                setSamState("helping");
              }
            }}
            style={{ ...primaryBtn, opacity: !gatesOk || !answersOk ? 0.5 : 1 }}
          >
            Submit for clearance
          </button>
        ) : (
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
