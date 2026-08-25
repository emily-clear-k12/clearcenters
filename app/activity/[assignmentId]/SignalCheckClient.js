"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Signal Check's own locked palette — navy/teal/violet/gold, distinct from
// Group Chat (violet-led) and Newsroom (navy/gold-led) so it reads as its
// own activity even though it shares the app shell.
const COLORS = {
  navy: "#16243F",
  teal: "#00C2C7",
  gold: "#FFC44D",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  white: "#FFFFFF",
  danger: "#FF6B6B",
  success: "#22C55E",
  cream: "#F2F0FA",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

const PHASES = ["main", "scan", "sort", "verdict", "submit"];
const PHASE_LABEL = { main: "Transmission", scan: "Scan", sort: "Sensor Sort", verdict: "Verdict", submit: "Submit" };

function TopBar({ standard, subject }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0", zIndex: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 3, color: COLORS.white }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={COLORS.teal} strokeWidth="2" /><path d="M20 20L16 16" stroke={COLORS.teal} strokeWidth="2" strokeLinecap="round" /></svg>
        SIGNAL CHECK
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "rgba(255,255,255,.85)", background: "rgba(10,8,20,.5)", border: "1px solid rgba(255,255,255,.22)", padding: "6px 12px", borderRadius: 999 }}>
        {standard} · SECTOR: {(subject || "").toUpperCase()}
      </span>
    </div>
  );
}

function Dots({ phase }) {
  const idx = PHASES.indexOf(phase);
  return (
    <div style={{ position: "relative", display: "flex", gap: 8, justifyContent: "center", margin: "14px 0 0", zIndex: 2 }}>
      {PHASES.map((p, i) => (
        <span key={p} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= idx ? COLORS.teal : "rgba(255,255,255,.28)", boxShadow: i <= idx ? `0 0 8px ${COLORS.teal}` : "none" }} />
      ))}
    </div>
  );
}

function EchoLine({ text }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, maxWidth: 640, margin: "0 auto", zIndex: 2 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 35% 30%, ${COLORS.teal}, #0c2230 75%)`, boxShadow: "0 0 14px rgba(0,194,199,.65)" }} />
      <div style={{ fontSize: 13.5, lineHeight: 1.4, color: "rgba(255,255,255,.92)", background: "rgba(8,10,22,.55)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 14, padding: "11px 16px" }}>
        <span style={{ color: COLORS.teal, fontWeight: 700, letterSpacing: 0.5 }}>ECHO — </span>{text}
      </div>
    </div>
  );
}

function GlassCard({ children, style }) {
  return (
    <div style={{ position: "relative", background: "rgba(8,10,22,.55)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 18, padding: "20px 24px", backdropFilter: "blur(4px)", zIndex: 2, ...style }}>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="sc-btn"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14.5, color: COLORS.navy, background: disabled ? "rgba(0,194,199,.4)" : COLORS.teal, border: "none", borderRadius: 999, padding: "13px 26px", cursor: disabled ? "default" : "pointer", boxShadow: disabled ? "none" : "0 8px 24px rgba(0,194,199,.45)", ...style }}
    >
      {children}
    </button>
  );
}

function verdictColor(v) {
  if (v === "False") return COLORS.danger;
  if (v === "True") return COLORS.success;
  return COLORS.gold;
}

export default function SignalCheckClient({ assignmentId, caseStandard, publicCase, existingSubmission, alreadySubmitted, revisionRequested, revisionFeedback }) {
  const router = useRouter();
  const storageKey = "cc_signalcheck_draft_" + assignmentId;

  const [phase, setPhase] = useState("main");

  // Sensor Sort game state — self-check practice, never graded.
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [placements, setPlacements] = useState({}); // { itemId: binId }
  const [attemptsByItem, setAttemptsByItem] = useState({}); // { itemId: n }
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [wrongFlashBinId, setWrongFlashBinId] = useState(null);

  // Screen 5 answers, shape depends on publicCase.stemMode.
  const [statementAnswers, setStatementAnswers] = useState({});
  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(alreadySubmitted);

  const hydrated = useRef(false);

  useEffect(() => {
    if (alreadySubmitted) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (!revisionRequested) setPhase(d.phase || "main");
        setPlacements(d.placements || {});
        setAttemptsByItem(d.attemptsByItem || {});
        setFirstTryCorrect(d.firstTryCorrect || 0);
        setStatementAnswers(d.statementAnswers || {});
      }
    } catch (err) {}
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated.current || submitted) return;
    const draft = { phase, placements, attemptsByItem, firstTryCorrect, statementAnswers };
    try { localStorage.setItem(storageKey, JSON.stringify(draft)); } catch (err) {}
  }, [phase, placements, attemptsByItem, firstTryCorrect, statementAnswers, submitted, storageKey]);

  function goTo(next) {
    setPhase(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const evidenceById = {};
  publicCase.evidenceReadings.forEach((e) => { evidenceById[e.id] = e; });

  const unplacedItems = publicCase.evidenceReadings.filter((e) => !placements[e.id]);
  const allSorted = Object.keys(placements).length === publicCase.evidenceReadings.length;

  function pickItem(itemId) {
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
  }

  function placeInBin(bin) {
    if (!selectedItemId) return;
    const itemId = selectedItemId;
    const isCorrect = bin.correctItemIds.includes(itemId);
    setAttemptsByItem((prev) => {
      const n = (prev[itemId] || 0) + 1;
      if (isCorrect && n === 1) setFirstTryCorrect((f) => f + 1);
      return { ...prev, [itemId]: n };
    });
    if (isCorrect) {
      setPlacements((prev) => ({ ...prev, [itemId]: bin.id }));
      setSelectedItemId(null);
    } else {
      setWrongFlashBinId(bin.id);
      setTimeout(() => setWrongFlashBinId(null), 420);
    }
  }

  function setAnswer(stmtId, field, value) {
    setStatementAnswers((prev) => ({ ...prev, [stmtId]: { ...prev[stmtId], [field]: value } }));
  }

  function validateSubmit() {
    const mode = publicCase.stemMode;
    const nextErrors = {};
    publicCase.statements.forEach((s) => {
      const a = statementAnswers[s.id] || {};
      if (mode === "dropdown") {
        if (!a.verdict || !a.evidence1 || !a.evidence2) nextErrors[s.id] = true;
      } else if (mode === "dropdown-open") {
        if (!a.verdict || !a.reasoning || !a.reasoning.trim()) nextErrors[s.id] = true;
      } else {
        if (!a.verdictText || !a.verdictText.trim() || !a.reasoning || !a.reasoning.trim()) nextErrors[s.id] = true;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submitForGrading() {
    if (!validateSubmit()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/signal-check/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          stemMode: publicCase.stemMode,
          statementAnswers,
          practiceContext: {
            sortTotalItems: publicCase.evidenceReadings.length,
            sortFirstTryCorrect: firstTryCorrect,
            sortTotalAttempts: Object.values(attemptsByItem).reduce((a, b) => a + b, 0),
          },
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      try { localStorage.removeItem(storageKey); } catch (err) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Couldn't submit your report just now — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: 20 }}>
        <div style={{ maxWidth: 480, textAlign: "center", background: "rgba(8,10,22,.6)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 20, padding: 32 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>📡</div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8, color: COLORS.white }}>Your signal is filed!</div>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14, marginBottom: 20 }}>Your teacher will review your verdicts and let you know how it went.</p>
          <PrimaryButton onClick={() => router.push("/missions")}>Back to Missions</PrimaryButton>
        </div>
      </div>
    );
  }

  const backgroundStyle = {
    minHeight: "100vh",
    backgroundImage: 'url("/signal-check/window.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center 45%",
    backgroundAttachment: "fixed",
    fontFamily: "'Inter', sans-serif",
    color: COLORS.white,
  };

  return (
    <div style={backgroundStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        .sc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .sc-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .sc-scrim { position: fixed; inset: 0; background: linear-gradient(180deg, rgba(10,8,20,.55) 0%, rgba(8,6,18,.78) 45%, rgba(8,6,18,.9) 100%); z-index: 0; pointer-events: none; }
        .sc-chip { cursor: pointer; transition: transform 120ms ease, box-shadow 120ms ease; }
        .sc-chip:hover { transform: translateY(-1px); }
        .sc-chip.selected { box-shadow: 0 0 0 2px ${COLORS.teal}; }
        .sc-bin.flash { animation: sc-flash 0.4s ease; }
        @keyframes sc-flash { 0%,100% { box-shadow: none; } 50% { box-shadow: 0 0 0 3px ${COLORS.danger}; } }
        .sc-select { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 13px; background: rgba(0,194,199,.16); border: 1.5px solid ${COLORS.teal}; color: ${COLORS.white}; border-radius: 8px; padding: 5px 8px; margin: 0 3px; }
        .sc-textarea { width: 100%; resize: vertical; min-height: 70px; border: 1.5px solid rgba(255,255,255,.25); border-radius: 10px; padding: 10px 12px; font-family: 'Inter', sans-serif; font-size: 13.5px; background: rgba(255,255,255,.06); color: ${COLORS.white}; box-sizing: border-box; }
        .sc-textarea::placeholder { color: rgba(255,255,255,.4); }
        .sc-textarea.err { border-color: ${COLORS.danger}; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div className="sc-scrim" />

      <TopBar standard={publicCase.teksLabel} subject={publicCase.subject} />
      <Dots phase={phase} />

      {revisionRequested && phase === "main" && (
        <div style={{ position: "relative", maxWidth: 760, margin: "16px auto 0", padding: "0 20px", zIndex: 2 }}>
          <div style={{ background: "rgba(255,196,77,.16)", border: `1.5px solid ${COLORS.gold}`, borderRadius: 14, padding: "14px 16px", fontSize: 13.5, color: "#FFE4A6" }}>
            🔁 Your teacher asked you to take another pass at this signal. Their note: "{revisionFeedback || "Take another look at your evidence."}"
          </div>
        </div>
      )}

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "20px 20px 60px", zIndex: 2 }}>

        {phase === "main" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>⟶ INCOMING TRANSMISSION · SOURCE: {publicCase.transmission.source}</div>
            <GlassCard style={{ maxWidth: 560 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.3 }}>"{publicCase.transmission.claimHeadline}"</div>
              <div style={{ marginTop: 12, fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>— logged by {publicCase.transmission.source}, {publicCase.transmission.loggedAt}</div>
            </GlassCard>
            <PrimaryButton onClick={() => goTo("scan")}>
              Scan the Evidence
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </PrimaryButton>
            <EchoLine text={publicCase.echo.main} />
          </div>
        )}

        {phase === "scan" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {publicCase.statements.map((s) => (
                <div key={s.id} style={{ background: "rgba(8,10,22,.6)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 14, padding: "10px 16px", maxWidth: 320 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9.5, letterSpacing: 1, color: COLORS.teal }}>{s.tag}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.35, marginTop: 3 }}>"{s.text}"</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>⟶ DATA LOG · {publicCase.evidenceReadings.length} SENSOR READINGS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
              {publicCase.evidenceReadings.map((e) => (
                <div key={e.id} style={{ background: "rgba(8,10,22,.55)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13 }}>{e.label}</div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, padding: "4px 8px", borderRadius: 999, background: e.kind === "distractor" ? "rgba(255,107,107,.16)" : "rgba(0,194,199,.2)", color: e.kind === "distractor" ? "#FF9C9C" : COLORS.teal, border: `1px solid ${e.kind === "distractor" ? "rgba(255,107,107,.4)" : "rgba(0,194,199,.5)"}` }}>{e.attribute}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <PrimaryButton onClick={() => goTo("sort")}>
                Match the Signal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </PrimaryButton>
            </div>
            <EchoLine text={publicCase.echo.scan} />
          </div>
        )}

        {phase === "sort" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16 }}>🛰️ Sensor Sort</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, letterSpacing: 1.5, color: COLORS.teal, marginTop: 3 }}>TAP A READING, THEN TAP THE SIGNAL IT PROVES</div>
            </div>

            <div style={{ background: "rgba(8,10,22,.5)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: 14, minHeight: 60 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 1, color: "rgba(255,255,255,.6)", marginBottom: 8, textAlign: "center" }}>SENSOR TRAY</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {unplacedItems.length === 0 && <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>All readings sorted.</div>}
                {unplacedItems.map((e) => (
                  <div key={e.id} onClick={() => pickItem(e.id)} className={"sc-chip" + (selectedItemId === e.id ? " selected" : "")} style={{ background: "rgba(255,255,255,.08)", border: "1.5px dashed rgba(255,255,255,.4)", borderRadius: 10, padding: "9px 12px", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12 }}>
                    {e.label}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {publicCase.sortBins.map((bin) => (
                <div key={bin.id} onClick={() => placeInBin(bin)} className={"sc-bin" + (wrongFlashBinId === bin.id ? " flash" : "")} style={{ flex: "1 1 200px", cursor: selectedItemId ? "pointer" : "default", background: "rgba(8,10,22,.5)", border: `1.5px solid ${bin.id === "none" ? "rgba(255,255,255,.3)" : "rgba(0,194,199,.5)"}`, borderRadius: 16, padding: "12px 14px", minHeight: 90 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1, color: bin.id === "none" ? "rgba(255,255,255,.6)" : COLORS.teal }}>{bin.label}{bin.sublabel ? ` · ${bin.sublabel}` : ""}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {publicCase.evidenceReadings.filter((e) => placements[e.id] === bin.id).map((e) => (
                      <div key={e.id} style={{ background: "rgba(0,194,199,.14)", border: "1.5px solid rgba(0,194,199,.6)", borderRadius: 9, padding: "6px 9px", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 11 }}>{e.label}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <PrimaryButton disabled={!allSorted} onClick={() => goTo("verdict")}>
                Lock In Sort — {Object.keys(placements).length}/{publicCase.evidenceReadings.length}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </PrimaryButton>
            </div>
            <EchoLine text={publicCase.echo.sort} />
          </div>
        )}

        {phase === "verdict" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>⟶ FILE A VERDICT ON EACH SIGNAL</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              {publicCase.statements.map((s) => (
                <div key={s.id} style={{ flex: "1 1 260px", maxWidth: 340, background: "rgba(8,10,22,.58)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: 16 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9.5, letterSpacing: 1, color: COLORS.teal, marginBottom: 6 }}>{s.tag}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.35, color: "rgba(255,255,255,.85)", marginBottom: 12 }}>"{s.text}"</div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                    {publicCase.verdictOptions.map((opt) => {
                      const active = opt === s.correctVerdict;
                      return (
                        <div key={opt} style={{ flex: 1, textAlign: "center", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 10.5, padding: "8px 4px", borderRadius: 9, background: active ? `${verdictColor(opt)}29` : "rgba(255,255,255,.06)", border: active ? `1.5px solid ${verdictColor(opt)}` : "1.5px solid rgba(255,255,255,.16)", color: active ? COLORS.white : "rgba(255,255,255,.4)" }}>
                          {opt.toUpperCase()}
                          {active && <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 7.5, marginTop: 3, opacity: 0.85 }}>LOCKED</div>}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: 11.5, lineHeight: 1.45, color: "rgba(255,255,255,.82)" }}><b style={{ color: COLORS.white }}>Why?</b> {s.reasonText}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <PrimaryButton onClick={() => goTo("submit")}>
                Send Correction
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </PrimaryButton>
            </div>
            <EchoLine text={publicCase.echo.verdict} />
          </div>
        )}

        {phase === "submit" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Space Mono', monospace", fontSize: 10.5, letterSpacing: 1.3, color: COLORS.gold, background: "rgba(255,196,77,.15)", border: `1px solid ${COLORS.gold}`, padding: "7px 15px", borderRadius: 999 }}>
                READY TO SUBMIT · NOT YET GRADED
              </div>
            </div>
            <div style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>
              ⟶ FILE YOUR FINAL REPORT
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640, margin: "0 auto", width: "100%" }}>
              {publicCase.statements.map((s) => {
                const a = statementAnswers[s.id] || {};
                const hasErr = !!errors[s.id];
                return (
                  <div key={s.id} style={{ background: "rgba(8,10,22,.6)", border: hasErr ? `1.5px solid ${COLORS.danger}` : "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: "14px 18px" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 1, color: COLORS.teal, marginBottom: 6 }}>{s.tag}</div>

                    {publicCase.stemMode === "dropdown" && (
                      <div style={{ fontSize: 13, lineHeight: 1.7 }}>
                        "{s.text}" is{" "}
                        <select className="sc-select" value={a.verdict || ""} onChange={(e) => setAnswer(s.id, "verdict", e.target.value)}>
                          <option value="">choose ▾</option>
                          {publicCase.verdictOptions.map((o) => <option key={o} value={o}>{o.toUpperCase()}</option>)}
                        </select>{" "}
                        because{" "}
                        <select className="sc-select" value={a.evidence1 || ""} onChange={(e) => setAnswer(s.id, "evidence1", e.target.value)}>
                          <option value="">choose ▾</option>
                          {publicCase.evidenceReadings.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
                        </select>{" "}
                        and{" "}
                        <select className="sc-select" value={a.evidence2 || ""} onChange={(e) => setAnswer(s.id, "evidence2", e.target.value)}>
                          <option value="">choose ▾</option>
                          {publicCase.evidenceReadings.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
                        </select>.
                      </div>
                    )}

                    {publicCase.stemMode === "dropdown-open" && (
                      <>
                        <div style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}>
                          "{s.text}" is{" "}
                          <select className="sc-select" value={a.verdict || ""} onChange={(e) => setAnswer(s.id, "verdict", e.target.value)}>
                            <option value="">choose ▾</option>
                            {publicCase.verdictOptions.map((o) => <option key={o} value={o}>{o.toUpperCase()}</option>)}
                          </select>.
                        </div>
                        <textarea className={"sc-textarea" + (hasErr ? " err" : "")} placeholder="Explain your reasoning using the evidence..." value={a.reasoning || ""} onChange={(e) => setAnswer(s.id, "reasoning", e.target.value)} />
                      </>
                    )}

                    {publicCase.stemMode === "open" && (
                      <>
                        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)", marginBottom: 6 }}>"{s.text}"</div>
                        <textarea className={"sc-textarea" + (hasErr ? " err" : "")} placeholder="Is this True, Misleading, or False? Write your verdict..." style={{ minHeight: 44, marginBottom: 8 }} value={a.verdictText || ""} onChange={(e) => setAnswer(s.id, "verdictText", e.target.value)} />
                        <textarea className={"sc-textarea" + (hasErr ? " err" : "")} placeholder="Explain your reasoning using the evidence..." value={a.reasoning || ""} onChange={(e) => setAnswer(s.id, "reasoning", e.target.value)} />
                      </>
                    )}

                    {hasErr && <div style={{ color: COLORS.danger, fontSize: 11, fontWeight: 600, marginTop: 6 }}>Fill this in before submitting.</div>}
                  </div>
                );
              })}
            </div>

            {submitError && <div style={{ textAlign: "center", color: COLORS.danger, fontSize: 13, fontWeight: 600 }}>{submitError}</div>}

            <div style={{ textAlign: "center" }}>
              <PrimaryButton onClick={submitForGrading} disabled={submitting}>
                {submitting ? <Loader2 size={16} className="spin" style={{ animation: "spin 1s linear infinite" }} /> : null}
                Submit for Grading
                {!submitting && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12L20 4L14 20L11 13L4 12Z" stroke={COLORS.navy} strokeWidth="1.8" strokeLinejoin="round" /></svg>}
              </PrimaryButton>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 8 }}>Goes to your teacher for review — ECHO's read is just a first pass.</div>
            </div>

            <EchoLine text={publicCase.echo.submit} />
          </div>
        )}

      </div>
    </div>
  );
}
