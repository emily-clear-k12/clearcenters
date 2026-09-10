"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../../components/BackToHubButton";
import SamStage from "../../../components/SamStage";

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

export default function BriefingClient({ student, assignment, briefing, initialSubmission }) {
  const router = useRouter();
  const art = briefing.art || {};
  const saved = initialSubmission?.phase_state || {};

  const [phaseIndex, setPhaseIndex] = useState(() => {
    const idx = PHASES.findIndex((p) => p.id === saved.currentPhase);
    return idx >= 0 ? idx : 0;
  });
  const [phaseState, setPhaseState] = useState(() => ({
    currentPhase: saved.currentPhase || "intelDrop",
    intel: saved.intel || { notice: "", wonder: "", claim: "", chip: "", revealed: false },
    field: saved.field || { beatIndex: 0, answers: {}, graded: false, results: null },
    ops: saved.ops || { picks: [], chips: [], justification: "", debrief: false },
    evidence: saved.evidence || { sceneId: "", reason: "", evidence: "", score: null },
    clearance: saved.clearance || { answers: {}, selfCheck: [], graded: false, results: null },
  }));
  const [scores, setScores] = useState(initialSubmission?.scores || {});
  const [status, setStatus] = useState(initialSubmission?.status || "in_progress");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [samLine, setSamLine] = useState(
    briefing.intelDrop?.samOpener?.replace(/\*\*/g, "") || "Ready when you are."
  );

  const phaseId = PHASES[phaseIndex].id;

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
    updateState({ currentPhase: nextPhase }, { phase: nextPhase });
  }

  const card = {
    background: COLORS.white,
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 8px 24px rgba(13,27,42,.08)",
  };

  // —— Phase renderers ——
  function IntelDrop() {
    const intel = phaseState.intel;
    return (
      <div style={card}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 18 }}>
          <div style={{ borderRadius: 14, overflow: "hidden", background: COLORS.violetSoft, minHeight: 220 }}>
            <img src={art.intel} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 8px 0", color: COLORS.textDark }}>{briefing.intelDrop.title}</h2>
            <p style={{ fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.5 }}>{renderBold(briefing.intelDrop.samOpener)}</p>
            <label style={labelStyle}>Notice (optional)</label>
            <input
              value={intel.notice}
              onChange={(e) => updateState({ intel: { ...intel, notice: e.target.value } }, { skipSave: true })}
              style={inputStyle}
              placeholder="I notice…"
            />
            <label style={labelStyle}>Wonder (optional)</label>
            <input
              value={intel.wonder}
              onChange={(e) => updateState({ intel: { ...intel, wonder: e.target.value } }, { skipSave: true })}
              style={inputStyle}
              placeholder="I wonder…"
            />
            <label style={labelStyle}>Claim (required)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {briefing.intelDrop.claimChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="gc-btn"
                  onClick={() =>
                    updateState(
                      { intel: { ...intel, chip, claim: intel.claim || `I think this place exists because ${chip}` } },
                      { skipSave: true }
                    )
                  }
                  style={chipStyle(intel.chip === chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
            <textarea
              value={intel.claim}
              onChange={(e) => updateState({ intel: { ...intel, claim: e.target.value } }, { skipSave: true })}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder={briefing.intelDrop.claimFrame}
            />
            {!intel.revealed ? (
              <button
                type="button"
                className="gc-btn"
                disabled={busy}
                onClick={async () => {
                  const result = await grade("intelDrop", { claim: intel.claim });
                  setToast(result.message || "");
                  setSamLine(result.message || samLine);
                  if (result.pass) {
                    const nextIntel = { ...intel, revealed: true };
                    updateState({ intel: nextIntel }, { scores: { ...scores, intel: result } });
                  }
                }}
                style={primaryBtn}
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

    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 12px 0" }}>Field Brief</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {briefing.fieldBrief.vocab.map((v) => (
            <div key={v.term} style={{ background: COLORS.violetSoft, borderRadius: 10, padding: "8px 10px", maxWidth: 180 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: COLORS.violet }}>{v.term}</div>
              <div style={{ fontSize: 11.5, color: COLORS.textDark, lineHeight: 1.35 }}>{v.meaning}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 16 }}>
          <div style={{ borderRadius: 14, overflow: "hidden", background: COLORS.violetSoft, minHeight: 180 }}>
            {img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, marginBottom: 4 }}>
              Beat {field.beatIndex + 1} of {briefing.fieldBrief.beats.length}
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontFamily: "'Poppins', sans-serif" }}>{beat.title}</h3>
            <p style={{ fontSize: 14, color: COLORS.textDark, lineHeight: 1.5 }}>{renderBold(beat.body)}</p>
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
                    onClick={() =>
                      updateState(
                        { field: { ...field, answers: { ...field.answers, [qc.id]: c.id } } },
                        { skipSave: true }
                      )
                    }
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
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
              {field.beatIndex < briefing.fieldBrief.beats.length - 1 ? (
                <button
                  type="button"
                  className="gc-btn"
                  onClick={() => updateState({ field: { ...field, beatIndex: field.beatIndex + 1 } })}
                  style={primaryBtn}
                >
                  Next beat →
                </button>
              ) : !field.graded ? (
                <button
                  type="button"
                  className="gc-btn"
                  disabled={busy}
                  onClick={async () => {
                    const result = await grade("fieldBrief", { answers: field.answers });
                    setToast(result.pass ? "Quick checks locked." : "Check missed items and keep going.");
                    updateState(
                      { field: { ...field, graded: true, results: result } },
                      { scores: { ...scores, field: result } }
                    );
                  }}
                  style={primaryBtn}
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
      updateState({ ops: { ...ops, picks } }, { skipSave: true });
    };
    return (
      <div style={card}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16 }}>
          <div style={{ borderRadius: 14, overflow: "hidden", background: COLORS.violetSoft, minHeight: 200 }}>
            <img src={art.ops} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 6px 0" }}>{briefing.opsChoice.title}</h2>
            <p style={{ fontSize: 13.5, color: COLORS.textMuted }}>{renderBold(briefing.opsChoice.constraint)}</p>
            <div style={{ display: "grid", gap: 8, margin: "12px 0" }}>
              {briefing.opsChoice.projects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="gc-btn"
                  onClick={() => toggle(p.id)}
                  style={{
                    ...choiceBtn,
                    borderColor: ops.picks.includes(p.id) ? COLORS.violet : "transparent",
                    background: ops.picks.includes(p.id) ? COLORS.violetSoft : COLORS.white,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>{p.reason}</div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {briefing.opsChoice.justificationChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="gc-btn"
                  onClick={() => {
                    const chips = ops.chips.includes(chip) ? ops.chips.filter((c) => c !== chip) : [...ops.chips, chip];
                    updateState({ ops: { ...ops, chips } }, { skipSave: true });
                  }}
                  style={chipStyle(ops.chips.includes(chip))}
                >
                  {chip}
                </button>
              ))}
            </div>
            <textarea
              value={ops.justification}
              onChange={(e) => updateState({ ops: { ...ops, justification: e.target.value } }, { skipSave: true })}
              rows={2}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Why these two?"
            />
            {!ops.debrief ? (
              <button
                type="button"
                className="gc-btn"
                disabled={busy}
                onClick={async () => {
                  const result = await grade("opsChoice", {
                    projectIds: ops.picks,
                    chips: ops.chips,
                    justification: ops.justification,
                    allProjectIds: briefing.opsChoice.projects.map((p) => p.id),
                  });
                  setToast(result.message || "");
                  setSamLine(result.message || samLine);
                  if (result.pass) {
                    updateState({ ops: { ...ops, debrief: true } }, { scores: { ...scores, ops: result } });
                  }
                }}
                style={primaryBtn}
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
        </div>
      </div>
    );
  }

  function EvidenceDrop() {
    const ev = phaseState.evidence;
    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 8px 0" }}>{briefing.evidenceDrop.title}</h2>
        <p style={{ fontSize: 13.5, color: COLORS.textMuted }}>{renderBold(briefing.evidenceDrop.frontHint)}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "12px 0" }}>
          {briefing.evidenceDrop.frontScenes.map((s) => (
            <button
              key={s.id}
              type="button"
              className="gc-btn"
              onClick={() =>
                updateState(
                  { evidence: { ...ev, sceneId: s.id, reason: s.reason } },
                  { skipSave: true }
                )
              }
              style={chipStyle(ev.sceneId === s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 13, color: COLORS.textDark, marginBottom: 8 }}>{briefing.evidenceDrop.backFrame}</p>
        <label style={labelStyle}>Reason</label>
        <select
          value={ev.reason}
          onChange={(e) => updateState({ evidence: { ...ev, reason: e.target.value } }, { skipSave: true })}
          style={inputStyle}
        >
          <option value="">Choose…</option>
          {briefing.evidenceDrop.reasonOptions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <label style={labelStyle}>Evidence</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {briefing.evidenceDrop.evidenceChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className="gc-btn"
              onClick={() => updateState({ evidence: { ...ev, evidence: chip } }, { skipSave: true })}
              style={chipStyle(ev.evidence === chip)}
            >
              {chip}
            </button>
          ))}
        </div>
        <textarea
          value={ev.evidence}
          onChange={(e) => updateState({ evidence: { ...ev, evidence: e.target.value } }, { skipSave: true })}
          rows={2}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="You can see it because…"
        />
        {ev.score == null ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy}
            onClick={async () => {
              const result = await grade("evidenceDrop", { reason: ev.reason, evidence: ev.evidence });
              setToast(result.message || "");
              setSamLine(result.message || samLine);
              if (result.pass) {
                updateState(
                  { evidence: { ...ev, score: result.score } },
                  { scores: { ...scores, evidence: result } }
                );
              }
            }}
            style={primaryBtn}
          >
            Publish postcard
          </button>
        ) : (
          <div style={{ marginTop: 12, background: COLORS.tealSoft, borderRadius: 12, padding: 12 }}>
            <p style={{ margin: 0, fontSize: 13.5 }}>Score: {ev.score}/2 — postcard saved.</p>
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
    return (
      <div style={card}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 12px 0" }}>Clearance</h2>
        {briefing.clearance.items.map((item) => (
          <div key={item.id} style={{ marginBottom: 14, background: COLORS.cream, borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>{item.prompt}</div>
            {item.type === "open" ? (
              <textarea
                value={cl.answers[item.id] || ""}
                onChange={(e) =>
                  updateState(
                    { clearance: { ...cl, answers: { ...cl.answers, [item.id]: e.target.value } } },
                    { skipSave: true }
                  )
                }
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder={item.hint || ""}
              />
            ) : (
              (item.choices || []).map((c) => (
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
              ))
            )}
          </div>
        ))}

        <h3 style={{ fontSize: 14, margin: "8px 0" }}>Self-check (mark at least {required})</h3>
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
              {on ? "✓ " : ""}{line}
            </button>
          );
        })}

        {status !== "cleared" ? (
          <button
            type="button"
            className="gc-btn"
            disabled={busy || cl.selfCheck.length < required}
            onClick={async () => {
              const result = await grade("clearance", { answers: cl.answers });
              setToast(result.pass ? "Clearance checks passed." : "Review missed items — you can still clear with self-check.");
              const canClear = result.pass || cl.selfCheck.length >= required;
              if (canClear) {
                updateState(
                  { clearance: { ...cl, graded: true, results: result } },
                  { scores: { ...scores, clearance: result }, status: "cleared", phase: "clearance" }
                );
                setStatus("cleared");
                setSamLine(briefing.clearance.clearedMessage);
              } else {
                updateState({ clearance: { ...cl, graded: true, results: result } }, { scores: { ...scores, clearance: result } });
              }
            }}
            style={{ ...primaryBtn, opacity: cl.selfCheck.length < required ? 0.5 : 1 }}
          >
            Submit for clearance
          </button>
        ) : (
          <div style={{ marginTop: 16, background: `linear-gradient(135deg, ${COLORS.violetSoft}, ${COLORS.tealSoft})`, borderRadius: 14, padding: 16 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 8px 0" }}>
              Briefing cleared ✓
            </p>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.textDark }}>{briefing.clearance.clearedMessage}</p>
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
      <main style={{ padding: "22px 28px 80px", position: "relative", maxWidth: 1040, margin: "0 auto" }}>
        <button type="button" className="gc-btn" onClick={() => router.push("/briefings")} style={{ background: "none", color: COLORS.textMuted, fontSize: 13, fontWeight: 600, padding: 0, marginBottom: 10 }}>
          ← My Briefings
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet }}>{briefing.id} · TEKS {briefing.teks}</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, margin: "2px 0 4px", color: COLORS.textDark }}>{briefing.title}</h1>
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
          <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: COLORS.navy, color: COLORS.white, padding: "10px 16px", borderRadius: 999, fontSize: 13, zIndex: 20 }}>
            {toast}
          </div>
        )}

        <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 10 }}>
          <SamStage skinKey={student.equipped_sam_skin} alt={student.sam_nickname || "S.A.M."} size={110} />
          <div style={{ position: "absolute", right: 120, bottom: 20, width: 220, background: COLORS.white, borderRadius: 14, boxShadow: "0 8px 20px rgba(0,0,0,.15)", padding: 12, fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.4 }}>
            {samLine}
          </div>
        </div>
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
