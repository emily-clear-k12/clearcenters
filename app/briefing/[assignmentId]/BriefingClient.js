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
  { id: "opsChoice", label: "Ops Choice" },
  { id: "evidenceDrop", label: "Evidence Drop" },
  { id: "clearance", label: "Clearance" },
];

const SAM_ANCHORS = {
  home: { right: 18, bottom: 18 },
  image: { left: 24, bottom: 24 },
  qc: { right: 24, top: "42%" },
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
  return {
    currentPhase: s.currentPhase || "intelDrop",
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
    ops: {
      picks: ops.picks || [],
      chips: ops.chips || [],
      justification: ops.justification || "",
      debrief: Boolean(ops.debrief),
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
      selfCheck: clearance.selfCheck || [],
      graded: Boolean(clearance.graded),
      results: clearance.results || null,
    },
  };
}

function projectLabel(briefing, id) {
  return briefing.opsChoice.projects.find((p) => p.id === id)?.label || id;
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
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              background: COLORS.violetSoft,
              minHeight: 320,
              height: "100%",
              boxShadow: "inset 0 0 0 2px rgba(123,93,255,.12)",
            }}
          >
            <img
              src={art.intel}
              alt="Mystery place"
              style={{ width: "100%", height: "100%", minHeight: 320, objectFit: "cover", display: "block" }}
            />
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
                <button type="button" className="gc-btn" onClick={() => goTo(1)} style={{ ...primaryBtn, marginTop: 12 }}>
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
                <button type="button" className="gc-btn" onClick={() => goTo(2)} style={primaryBtn}>
                  Continue to Ops Choice →
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

  function OpsChoice() {
    const ops = phaseState.ops;
    const toggle = (id) => {
      let picks = ops.picks.includes(id) ? ops.picks.filter((p) => p !== id) : [...ops.picks, id];
      if (picks.length > briefing.opsChoice.pickCount) picks = picks.slice(-briefing.opsChoice.pickCount);
      setSamAnchor("chips");
      updateState({ ops: { ...ops, picks } }, { skipSave: true });
    };
    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px 0" }}>{briefing.opsChoice.title}</h2>
        <p
          style={{
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "'Poppins', sans-serif",
            color: COLORS.violet,
            margin: "0 0 6px 0",
          }}
        >
          {briefing.opsChoice.pickHeader || `Pick exactly ${briefing.opsChoice.pickCount}`}
        </p>
        <p style={{ fontSize: 13.5, color: COLORS.textMuted, marginTop: 0 }}>{renderBold(briefing.opsChoice.constraint)}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, margin: "14px 0" }}>
          {briefing.opsChoice.projects.map((p) => {
            const on = ops.picks.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                className="gc-btn"
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
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }} aria-hidden="true">{p.emoji || "📌"}</div>
                <div style={{ fontWeight: 800, fontSize: 14.5, fontFamily: "'Poppins', sans-serif" }}>{p.label}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 4 }}>{p.reason}</div>
                {on && <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: COLORS.violet }}>✓ Funded</div>}
              </button>
            );
          })}
        </div>
        <label style={labelStyle}>Why these two? (pick chips)</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          {briefing.opsChoice.justificationChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className="gc-btn"
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
        {!ops.debrief ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || ops.picks.length !== briefing.opsChoice.pickCount || ops.chips.length === 0}
            onClick={async () => {
              const result = await grade("opsChoice", {
                projectIds: ops.picks,
                chips: ops.chips,
                justification: "",
                allProjectIds: briefing.opsChoice.projects.map((p) => p.id),
              });
              setToast(result.message || "");
              setSamLine(result.message || "");
              setSamState(result.pass ? "celebrating" : "thinking");
              if (result.pass) {
                updateState({ ops: { ...ops, debrief: true } }, { scores: { ...scores, ops: result } });
              }
            }}
            style={{
              ...primaryBtn,
              opacity: ops.picks.length !== briefing.opsChoice.pickCount || ops.chips.length === 0 ? 0.5 : 1,
            }}
          >
            Submit council vote
          </button>
        ) : (
          <div style={{ marginTop: 12, background: COLORS.tealSoft, borderRadius: 12, padding: 12 }}>
            <p style={{ margin: 0, fontSize: 13.5 }}>{renderBold(briefing.opsChoice.debrief)}</p>
            <button type="button" className="gc-btn" onClick={() => goTo(3)} style={{ ...primaryBtn, marginTop: 12 }}>
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
      .filter(Boolean);
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
            <button type="button" className="gc-btn" onClick={() => goTo(4)} style={{ ...primaryBtn, marginTop: 12 }}>
              Continue to Clearance →
            </button>
          </div>
        )}
      </div>
    );
  }

  function Clearance() {
    const cl = phaseState.clearance;
    const required = briefing.clearance.selfCheckRequired || 3;
    const intelChip = phaseState.intel.chip;
    const opsPicks = phaseState.ops.picks || [];
    const evReason = phaseState.evidence.reason;
    const fundedLabels = opsPicks.map((id) => projectLabel(briefing, id));

    // Dynamic c4: reuse Ops/Evidence when available
    const reuseReason = evReason || reasonFromChip(intelChip);
    const c4ExpectedMap = {
      "security and laws": "a",
      "religious freedom": "b",
      "material well-being": "c",
    };
    const c4Expected = c4ExpectedMap[reuseReason] || null;

    return (
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: COLORS.gold, letterSpacing: 0.6 }}>HQ CLEARANCE</div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "4px 0 6px 0" }}>
              {briefing.clearance.hqTitle || "HQ Clearance Check"}
            </h2>
            <p style={{ margin: 0, fontSize: 13.5, color: COLORS.textMuted }}>
              {briefing.clearance.hqIntro || "Agent report-in. Answer four quick questions, then mark your self-check."}
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
          if (item.dynamicReuse && (fundedLabels.length || reuseReason)) {
            prompt = reuseReason
              ? `You showed “${reuseReason}” on your postcard (or claim). Which TEKS reason is that?`
              : `You funded ${fundedLabels.join(" & ")}. Which TEKS reason matches one of those projects?`;
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

        <h3 style={{ fontSize: 14, margin: "8px 0" }}>Self-check (mark at least {required} of 5)</h3>
        {briefing.clearance.selfCheck.map((line, i) => {
          const on = cl.selfCheck.includes(i);
          return (
            <button
              key={line}
              type="button"
              className="gc-btn"
              onClick={() => {
                const selfCheck = on ? cl.selfCheck.filter((x) => x !== i) : [...cl.selfCheck, i];
                updateState({ clearance: { ...cl, selfCheck } }, { skipSave: true });
              }}
              style={{ ...choiceBtn, borderColor: on ? COLORS.teal : "transparent", background: on ? COLORS.tealSoft : COLORS.white }}
            >
              {on ? "✓ " : ""}
              {line}
            </button>
          );
        })}

        {status !== "cleared" ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || cl.selfCheck.length < required}
            onClick={async () => {
              const result = await grade("clearance", {
                answers: cl.answers,
                expectedIds: c4Expected ? { c4: c4Expected } : {},
              });
              setToast(result.pass ? "Clearance checks passed." : "Review missed items — you can still clear with self-check.");
              const canClear = result.pass || cl.selfCheck.length >= required;
              if (canClear) {
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
              }
            }}
            style={{ ...primaryBtn, opacity: cl.selfCheck.length < required ? 0.5 : 1 }}
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
                right: 16,
                top: 16,
                width: 110,
                height: 110,
                borderRadius: "50%",
                border: `4px solid ${COLORS.success}`,
                color: COLORS.success,
                display: "grid",
                placeItems: "center",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                transform: "rotate(-12deg)",
                background: "rgba(255,255,255,.85)",
                boxShadow: "0 8px 20px rgba(34,197,94,.25)",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              CLEARED
              <br />
              ✓
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 18, margin: "0 0 8px 0", maxWidth: "70%" }}>
              Briefing cleared
            </p>
            <p style={{ margin: "0 0 10px", fontSize: 14, color: COLORS.textDark, maxWidth: "72%" }}>
              {briefing.clearance.clearedMessage}
            </p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.violet }}>
              {briefing.clearance.challengeCta || "Ask your teacher when you're ready for a Challenge"}
            </p>
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
