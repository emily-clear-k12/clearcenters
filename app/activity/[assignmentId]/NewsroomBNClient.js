"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";

// "Press navy" — Newsroom's own locked default accent color, distinct
// from Group Chat's violet, so the two challenge types feel visually
// different to a student even though they share the app shell.
const COLORS = {
  navy: "#1E3A5F",
  navyDark: "#11253D",
  navySoft: "#C7D6E8",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#697386",
  gold: "#FFC44D",
  danger: "#D64545",
  dangerSoft: "#FDF2F2",
  success: "#22C55E",
};

const ROLE_LABEL = {
  reliable: "Reliable / Direct",
  credibleButLimited: "Credible but Limited",
  presentButUseless: "Present but Useless",
  confidentButWrong: "Confident but Wrong",
};

const PHASES = [
  "coldopen", "firstguess", "selectvoices", "investigate", "change",
  "causechain", "nexttest", "attempt1", "secondlook", "attempt2",
  "headline", "review",
];

const STEP_GROUPS = [
  { label: "Dispatch", phases: ["coldopen", "firstguess"] },
  { label: "Investigate", phases: ["selectvoices", "investigate"] },
  { label: "Report", phases: ["change", "causechain", "nexttest", "attempt1"] },
  { label: "Second Look", phases: ["secondlook", "attempt2"] },
  { label: "On Air", phases: ["headline", "review"] },
];

function StepTracker({ phase }) {
  const activeGroupIdx = STEP_GROUPS.findIndex((g) => g.phases.includes(phase));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {STEP_GROUPS.map((g, i) => (
        <React.Fragment key={g.label}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: 58 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: i <= activeGroupIdx ? "none" : "2px solid rgba(255,255,255,.3)", background: i < activeGroupIdx ? COLORS.gold : i === activeGroupIdx ? COLORS.navySoft : "transparent", color: i < activeGroupIdx ? COLORS.navyDark : i === activeGroupIdx ? COLORS.navyDark : "rgba(255,255,255,.55)" }}>
              {i < activeGroupIdx ? "✓" : i + 1}
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 600, color: i <= activeGroupIdx ? COLORS.white : "rgba(255,255,255,.5)", textAlign: "center" }}>{g.label}</div>
          </div>
          {i < STEP_GROUPS.length - 1 && <div style={{ width: 14, height: 2, background: i < activeGroupIdx ? COLORS.gold : "rgba(255,255,255,.25)", marginBottom: 14 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, error, minHeight = 70, readOnly }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontWeight: 700, fontSize: 13.5, color: COLORS.textDark, marginBottom: 6 }}>
        {label} {!readOnly && <span style={{ color: COLORS.danger }}>*</span>}
      </div>
      <textarea
        value={value || ""}
        onChange={(e) => !readOnly && onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{ width: "100%", resize: "vertical", border: error ? `2px solid ${COLORS.danger}` : "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontFamily: "inherit", fontSize: 14, minHeight, boxSizing: "border-box", background: error ? COLORS.dangerSoft : readOnly ? COLORS.cream : COLORS.white, color: COLORS.textDark }}
      />
      {error && <div style={{ color: COLORS.danger, fontSize: 11.5, fontWeight: 600, marginTop: 4 }}>Fill this in before continuing.</div>}
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.08)", padding: 22, ...style }}>{children}</div>;
}

function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="gc-btn"
      style={{ background: COLORS.navy, color: COLORS.white, borderRadius: 999, padding: "12px 24px", fontWeight: 700, fontSize: 14.5, opacity: disabled ? 0.45 : 1, cursor: disabled ? "default" : "pointer", ...style }}
    >
      {children}
    </button>
  );
}

function VoiceCard({ voice, selected, onToggle, disabled }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled && !selected}
      className="gc-btn"
      style={{ textAlign: "left", background: selected ? "#EAF0F8" : COLORS.white, border: selected ? `2px solid ${COLORS.navy}` : "2px solid #ECEAF5", borderRadius: 14, padding: 14, opacity: disabled && !selected ? 0.45 : 1, cursor: disabled && !selected ? "not-allowed" : "pointer" }}
    >
      <div style={{ fontWeight: 700, fontSize: 14.5, color: COLORS.textDark, marginBottom: 4 }}>{voice.name}</div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.4 }}>{voice.credibilityDescriptor}</div>
      {selected && <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: COLORS.navy }}>✓ Calling this source</div>}
    </button>
  );
}

export default function NewsroomBNClient({ assignmentId, caseStandard, publicCase, existingSubmission, alreadySubmitted, revisionRequested, revisionFeedback }) {
  const router = useRouter();
  const storageKey = "cc_newsroom_draft_" + assignmentId;

  const [phase, setPhase] = useState(revisionRequested ? "firstguess" : "coldopen");
  const [coldOpenIdx, setColdOpenIdx] = useState(0);

  const [firstGuess, setFirstGuess] = useState("");
  const [calledVoiceIds, setCalledVoiceIds] = useState([]);
  const [activeChatVoice, setActiveChatVoice] = useState(null);
  const [chatMessages, setChatMessages] = useState({}); // { voiceId: [{role,text}] }
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [investigationLog, setInvestigationLog] = useState([]); // [{voiceId, text, stamp}]

  const [changeText, setChangeText] = useState("");
  const [changeCitationVoiceId, setChangeCitationVoiceId] = useState("");

  const [rootCause, setRootCause] = useState("");
  const [ripples, setRipples] = useState(["", "", ""]);

  const [testMeasure, setTestMeasure] = useState("");
  const [testConstant, setTestConstant] = useState("");

  const [attempt1, setAttempt1] = useState({ rightNow: "", watchFor: "" });
  const [attempt1Locked, setAttempt1Locked] = useState(false);

  const [attempt2, setAttempt2] = useState({ rightNow: "", watchFor: "" });
  const [usedVoiceIds, setUsedVoiceIds] = useState([]);
  const [rejectedVoiceId, setRejectedVoiceId] = useState("");
  const [rejectedJustification, setRejectedJustification] = useState("");

  const [headline, setHeadline] = useState("");
  const [wordCheckAck, setWordCheckAck] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(alreadySubmitted);

  const chatEndRef = useRef(null);
  const hydrated = useRef(false);

  // Restore an in-progress draft from this browser only — Newsroom
  // doesn't have server-side autosave yet (Group Chat does), so this is
  // a lightweight safety net against an accidental refresh/close.
  useEffect(() => {
    if (alreadySubmitted) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const d = JSON.parse(raw);
        if (!revisionRequested) setPhase(d.phase || "coldopen");
        setFirstGuess(d.firstGuess || "");
        setCalledVoiceIds(d.calledVoiceIds || []);
        setChatMessages(d.chatMessages || {});
        setInvestigationLog(d.investigationLog || []);
        setChangeText(d.changeText || "");
        setChangeCitationVoiceId(d.changeCitationVoiceId || "");
        setRootCause(d.rootCause || "");
        setRipples(d.ripples || ["", "", ""]);
        setTestMeasure(d.testMeasure || "");
        setTestConstant(d.testConstant || "");
        setAttempt1(d.attempt1 || { rightNow: "", watchFor: "" });
        setAttempt1Locked(!!d.attempt1Locked);
        setAttempt2(d.attempt2 || { rightNow: "", watchFor: "" });
        setUsedVoiceIds(d.usedVoiceIds || []);
        setRejectedVoiceId(d.rejectedVoiceId || "");
        setRejectedJustification(d.rejectedJustification || "");
        setHeadline(d.headline || "");
        setWordCheckAck(!!d.wordCheckAck);
      }
    } catch (err) {
      // corrupt/missing draft — just start fresh
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated.current || submitted) return;
    const draft = {
      phase, firstGuess, calledVoiceIds, chatMessages, investigationLog, changeText, changeCitationVoiceId,
      rootCause, ripples, testMeasure, testConstant, attempt1, attempt1Locked, attempt2, usedVoiceIds,
      rejectedVoiceId, rejectedJustification, headline, wordCheckAck,
    };
    try { localStorage.setItem(storageKey, JSON.stringify(draft)); } catch (err) {}
  }, [phase, firstGuess, calledVoiceIds, chatMessages, investigationLog, changeText, changeCitationVoiceId, rootCause, ripples, testMeasure, testConstant, attempt1, attempt1Locked, attempt2, usedVoiceIds, rejectedVoiceId, rejectedJustification, headline, wordCheckAck, submitted, storageKey]);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, activeChatVoice]);

  const voiceById = {};
  publicCase.voices.forEach((v) => { voiceById[v.id] = v; });
  const calledVoices = publicCase.voices.filter((v) => calledVoiceIds.includes(v.id));
  const uncalledVoices = publicCase.voices.filter((v) => !calledVoiceIds.includes(v.id));

  function toggleCalledVoice(id) {
    setCalledVoiceIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }

  async function sendChatMessage() {
    if (!chatInput.trim() || !activeChatVoice) return;
    const voiceId = activeChatVoice;
    const priorMessages = chatMessages[voiceId] || [];
    const userMsg = { role: "user", text: chatInput.trim() };
    const nextMessages = [...priorMessages, userMsg];
    setChatMessages((m) => ({ ...m, [voiceId]: nextMessages }));
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("/api/newsroom/discuss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStandard, voiceId, messages: nextMessages }),
      });
      const data = await res.json();
      const replyText = data.text || "Sorry, I didn't catch that — can you ask again?";
      setChatMessages((m) => ({ ...m, [voiceId]: [...nextMessages, { role: "assistant", text: replyText }] }));
    } catch (err) {
      setChatMessages((m) => ({ ...m, [voiceId]: [...nextMessages, { role: "assistant", text: "(connection hiccup — try asking again)" }] }));
    } finally {
      setChatLoading(false);
    }
  }

  function logClaim(voiceId, text, stamp) {
    setInvestigationLog((log) => [...log, { voiceId, text, stamp }]);
  }

  function startChat(voiceId) {
    setActiveChatVoice(voiceId);
    if (!chatMessages[voiceId]) {
      const v = voiceById[voiceId];
      setChatMessages((m) => ({ ...m, [voiceId]: [{ role: "assistant", text: v.openerLine }] }));
    }
  }

  const logsPerCalledVoice = calledVoiceIds.map((id) => investigationLog.filter((l) => l.voiceId === id).length);
  const canLeaveInvestigate = calledVoiceIds.length === 2 && logsPerCalledVoice.every((n) => n > 0);

  function goTo(nextPhase, validate) {
    if (validate) {
      const errs = validate();
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
    }
    setErrors({});
    setPhase(nextPhase);
  }

  async function handleFinalSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    const newsroomData = {
      firstGuess,
      calledVoiceIds,
      investigationLog,
      change: { text: changeText, citationVoiceId: changeCitationVoiceId },
      causeChain: { rootCause, ripples },
      nextTest: { measure: testMeasure, constant: testConstant },
      attempt1,
      attempt2: { ...attempt2, usedVoiceIds, rejectedVoiceId, rejectedJustification },
      headline,
      wordCheckAck,
    };
    try {
      const res = await fetch("/api/newsroom/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, caseStandard, newsroomData }),
      });
      if (!res.ok) throw new Error("Submit failed");
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
        <Card style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>📡</div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Your report is on air!</div>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>Your teacher will review your investigation and let you know how it went.</p>
          <PrimaryButton onClick={() => router.push("/missions")}>Back to Missions</PrimaryButton>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover:not(:disabled) { transform: translateY(-1px); }
      `}</style>

      <div style={{ background: COLORS.navyDark, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: COLORS.white, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15 }}>
          📡 Newsroom · Breaking News
        </div>
        <StepTracker phase={phase} />
      </div>

      {revisionRequested && phase === "firstguess" && (
        <div style={{ maxWidth: 720, margin: "16px auto 0", padding: "0 20px" }}>
          <div style={{ background: "#FFF4E5", border: `1.5px solid ${COLORS.gold}`, borderRadius: 14, padding: "14px 16px", fontSize: 13.5, color: "#8A5A00" }}>
            🔁 Your teacher asked you to take another pass at this story. Their note: "{revisionFeedback || "Take another look at your evidence."}"
          </div>
        </div>
      )}

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px 60px" }}>

        {phase === "coldopen" && (
          <Card>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.navy, letterSpacing: 0.5, marginBottom: 10 }}>📡 DISPATCH RECEIVED</div>
            {publicCase.coldOpenMessages.map((m, i) => (
              <div key={i} style={{ marginBottom: 10, fontSize: 14.5, lineHeight: 1.5, color: m.who === "producer" ? COLORS.navy : COLORS.textDark, fontWeight: m.who === "producer" ? 700 : 400 }}>
                {m.who === "producer" ? "🎙️ Producer: " : ""}{m.text}
              </div>
            ))}
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 19, margin: "18px 0 6px" }}>{publicCase.title}</div>
            <div style={{ fontStyle: "italic", color: COLORS.textMuted, fontSize: 13.5, marginBottom: 16 }}>{publicCase.tagline}</div>
            <PrimaryButton onClick={() => goTo("firstguess")}>Get Out There →</PrimaryButton>
          </Card>
        )}

        {phase === "firstguess" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Your First Guess</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 14 }}>Before you investigate — what's your first guess about what's going on? You'll come back to this.</p>
            <Field label={publicCase.bigQuestion} value={firstGuess} onChange={setFirstGuess} placeholder="What do you think is happening?" error={errors.firstGuess} />
            <PrimaryButton onClick={() => goTo("selectvoices", () => (firstGuess.trim() ? {} : { firstGuess: true }))}>Start Investigating →</PrimaryButton>
          </Card>
        )}

        {phase === "selectvoices" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Call the Source</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 16 }}>You have 4 contacts, but only time to call <b>2 of them</b>. Choose carefully.</p>
            <div style={{ background: COLORS.cream, border: "1px solid #ECEAF5", borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Evidence Feed</div>
              {publicCase.evidenceFeed.map((e) => (
                <div key={e.id} style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 6, lineHeight: 1.4 }}><b>{e.id}</b> — {e.text}</div>
              ))}
            </div>
            <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
              {publicCase.voices.map((v) => (
                <VoiceCard key={v.id} voice={v} selected={calledVoiceIds.includes(v.id)} onToggle={() => toggleCalledVoice(v.id)} disabled={calledVoiceIds.length >= 2} />
              ))}
            </div>
            <PrimaryButton disabled={calledVoiceIds.length !== 2} onClick={() => { setActiveChatVoice(calledVoiceIds[0]); startChat(calledVoiceIds[0]); goTo("investigate"); }}>
              Call These 2 Sources →
            </PrimaryButton>
          </Card>
        )}

        {phase === "investigate" && (
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #ECEAF5" }}>
              {calledVoiceIds.map((id) => (
                <button key={id} className="gc-btn" onClick={() => startChat(id)} style={{ flex: 1, padding: "12px 8px", background: activeChatVoice === id ? COLORS.cream : COLORS.white, fontWeight: 700, fontSize: 13, color: COLORS.textDark, borderBottom: activeChatVoice === id ? `2px solid ${COLORS.navy}` : "2px solid transparent" }}>
                  {voiceById[id].name.split(" ")[0]}
                  {investigationLog.filter((l) => l.voiceId === id).length > 0 && <span style={{ marginLeft: 6, color: COLORS.success }}>✓</span>}
                </button>
              ))}
            </div>
            {activeChatVoice && (
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>{voiceById[activeChatVoice].credibilityDescriptor}</div>
                <div style={{ maxHeight: 280, overflowY: "auto", marginBottom: 10 }}>
                  {(chatMessages[activeChatVoice] || []).map((m, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "inline-block", maxWidth: "90%", padding: "9px 12px", borderRadius: 12, fontSize: 13.5, lineHeight: 1.45, background: m.role === "user" ? COLORS.navySoft : COLORS.cream, color: COLORS.textDark, float: m.role === "user" ? "right" : "left", clear: "both" }}>
                        {m.text}
                      </div>
                      <div style={{ clear: "both" }} />
                      {m.role === "assistant" && (
                        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                          <button className="gc-btn" onClick={() => logClaim(activeChatVoice, m.text, "observation")} style={{ fontSize: 10.5, fontWeight: 700, background: COLORS.cream, color: COLORS.textDark, borderRadius: 999, padding: "4px 10px" }}>+ Log as Observation</button>
                          <button className="gc-btn" onClick={() => logClaim(activeChatVoice, m.text, "inference")} style={{ fontSize: 10.5, fontWeight: 700, background: COLORS.cream, color: COLORS.textDark, borderRadius: 999, padding: "4px 10px" }}>+ Log as Inference</button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !chatLoading && sendChatMessage()}
                    placeholder={"Ask " + voiceById[activeChatVoice].name.split(" ")[0] + " a question..."}
                    style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "9px 12px", fontSize: 13.5, fontFamily: "inherit" }}
                  />
                  <button className="gc-btn" onClick={sendChatMessage} disabled={chatLoading || !chatInput.trim()} style={{ background: COLORS.navy, color: COLORS.white, borderRadius: 10, width: 42, display: "flex", alignItems: "center", justifyContent: "center", opacity: chatLoading || !chatInput.trim() ? 0.5 : 1 }}>
                    {chatLoading ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                  </button>
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8 }}>Logged claims from {voiceById[activeChatVoice].name.split(" ")[0]}: {investigationLog.filter((l) => l.voiceId === activeChatVoice).length}</div>
              </div>
            )}
            <div style={{ padding: "0 16px 16px" }}>
              {!canLeaveInvestigate && <div style={{ fontSize: 12, color: COLORS.danger, fontWeight: 600, marginBottom: 10 }}>Log at least one claim from each source before moving on.</div>}
              <PrimaryButton disabled={!canLeaveInvestigate} onClick={() => goTo("change")}>Done Investigating →</PrimaryButton>
            </div>
          </Card>
        )}

        {phase === "change" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>What's Really Going On?</div>
            <Field label="Explain what you think actually happened, based on your investigation so far." value={changeText} onChange={setChangeText} error={errors.changeText} />
            <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6 }}>Which source's evidence proves this? <span style={{ color: COLORS.danger }}>*</span></div>
            <select value={changeCitationVoiceId} onChange={(e) => setChangeCitationVoiceId(e.target.value)} style={{ width: "100%", border: errors.changeCitationVoiceId ? `2px solid ${COLORS.danger}` : "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14, marginBottom: 16, fontFamily: "inherit" }}>
              <option value="">Choose a source...</option>
              {calledVoices.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
            <PrimaryButton onClick={() => goTo("causechain", () => {
              const e = {};
              if (!changeText.trim()) e.changeText = true;
              if (!changeCitationVoiceId) e.changeCitationVoiceId = true;
              return e;
            })}>Continue →</PrimaryButton>
          </Card>
        )}

        {phase === "causechain" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Cause & Effect Chain</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 14 }}>Trace the ripple effects from the root cause — at least 3 steps.</p>
            <Field label={publicCase.causeChainPrompts.rootCause} value={rootCause} onChange={setRootCause} error={errors.rootCause} minHeight={56} />
            {publicCase.causeChainPrompts.ripples.map((prompt, i) => (
              <Field key={i} label={prompt} value={ripples[i]} onChange={(v) => setRipples((r) => r.map((x, idx) => (idx === i ? v : x)))} error={errors["ripple" + i]} minHeight={56} />
            ))}
            <PrimaryButton onClick={() => goTo("nexttest", () => {
              const e = {};
              if (!rootCause.trim()) e.rootCause = true;
              ripples.forEach((r, i) => { if (!r.trim()) e["ripple" + i] = true; });
              return e;
            })}>Continue →</PrimaryButton>
          </Card>
        )}

        {phase === "nexttest" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Design a Next Test</div>
            <Field label="If you could investigate this further, what's one thing you'd measure or compare to test your conclusion?" value={testMeasure} onChange={setTestMeasure} error={errors.testMeasure} minHeight={56} />
            <Field label="What would you keep the same to make it a fair test?" value={testConstant} onChange={setTestConstant} error={errors.testConstant} minHeight={56} />
            <PrimaryButton onClick={() => goTo("attempt1", () => {
              const e = {};
              if (!testMeasure.trim()) e.testMeasure = true;
              if (!testConstant.trim()) e.testConstant = true;
              return e;
            })}>Continue →</PrimaryButton>
          </Card>
        )}

        {phase === "attempt1" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>What Viewers Should Know</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 14 }}>This is your first report — once you submit it, it's locked, and a producer will give you a chance to take a Second Look before it airs.</p>
            <Field label="Right now..." value={attempt1.rightNow} onChange={(v) => setAttempt1((a) => ({ ...a, rightNow: v }))} placeholder="What's true right now, based on your investigation?" error={errors.a1right} minHeight={56} />
            <Field label="Going forward, watch for..." value={attempt1.watchFor} onChange={(v) => setAttempt1((a) => ({ ...a, watchFor: v }))} placeholder="What should viewers keep an eye on?" error={errors.a1watch} minHeight={56} />
            <PrimaryButton onClick={() => {
              const e = {};
              if (!attempt1.rightNow.trim()) e.a1right = true;
              if (!attempt1.watchFor.trim()) e.a1watch = true;
              setErrors(e);
              if (Object.keys(e).length > 0) return;
              setAttempt1Locked(true);
              setPhase("secondlook");
            }}>Lock In Attempt 1 →</PrimaryButton>
          </Card>
        )}

        {phase === "secondlook" && (
          <Card>
            <div style={{ background: "#EAF0F8", borderRadius: 12, padding: "12px 14px", marginBottom: 16, fontSize: 13.5, color: COLORS.navy, lineHeight: 1.5 }}>
              📺 Your report already filed. Before it airs — review <b>all</b> the evidence the newsroom collected, not just what you called. Would a producer sign off on this, or is there something stronger you're missing?
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Full Evidence Pool — all 4 sources</div>
            <div style={{ display: "grid", gap: 10, marginBottom: 6 }}>
              {publicCase.voices.map((v) => (
                <div key={v.id} style={{ border: "2px solid #ECEAF5", borderRadius: 12, padding: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>{v.name} {calledVoiceIds.includes(v.id) ? <span style={{ fontSize: 10.5, color: COLORS.textMuted, fontWeight: 600 }}>(you called them)</span> : <span style={{ fontSize: 10.5, color: COLORS.gold, fontWeight: 700 }}>NEW</span>}</div>
                  <div style={{ fontSize: 11.5, color: COLORS.textMuted, margin: "3px 0 6px" }}>{v.credibilityDescriptor}</div>
                  <div style={{ fontSize: 13, fontStyle: "italic" }}>"{v.openerLine}"</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: "8px 0 16px" }}>Notice the credibility stamps from your interviews aren't shown here — judge each source fresh, using what you can tell about them now.</p>
            <PrimaryButton onClick={() => goTo("attempt2")}>Take a Second Look →</PrimaryButton>
          </Card>
        )}

        {phase === "attempt2" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Second Look — Final Report</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 14 }}>This is your final, locked version. Draw from at least 2 different sources.</p>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Which sources support your report? Pick at least 2. <span style={{ color: COLORS.danger }}>*</span></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {publicCase.voices.map((v) => {
                const checked = usedVoiceIds.includes(v.id);
                return (
                  <button key={v.id} type="button" className="gc-btn" onClick={() => setUsedVoiceIds((ids) => (checked ? ids.filter((x) => x !== v.id) : [...ids, v.id]))} style={{ padding: "8px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, background: checked ? COLORS.navy : COLORS.cream, color: checked ? COLORS.white : COLORS.textDark }}>
                    {v.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
            {errors.usedVoiceIds && <div style={{ color: COLORS.danger, fontSize: 11.5, fontWeight: 600, marginTop: -10, marginBottom: 12 }}>Pick at least 2 sources.</div>}
            <Field label="Right now..." value={attempt2.rightNow} onChange={(v) => setAttempt2((a) => ({ ...a, rightNow: v }))} error={errors.a2right} minHeight={56} />
            <Field label="Going forward, watch for..." value={attempt2.watchFor} onChange={(v) => setAttempt2((a) => ({ ...a, watchFor: v }))} error={errors.a2watch} minHeight={56} />
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Which source did you decide NOT to use? <span style={{ color: COLORS.danger }}>*</span></div>
            <select value={rejectedVoiceId} onChange={(e) => setRejectedVoiceId(e.target.value)} style={{ width: "100%", border: errors.rejectedVoiceId ? `2px solid ${COLORS.danger}` : "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14, marginBottom: 10, fontFamily: "inherit" }}>
              <option value="">Choose a source...</option>
              {publicCase.voices.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
            <Field label="Why isn't their evidence strong enough to include?" value={rejectedJustification} onChange={setRejectedJustification} error={errors.rejectedJustification} minHeight={56} />
            <PrimaryButton onClick={() => goTo("headline", () => {
              const e = {};
              if (usedVoiceIds.length < 2) e.usedVoiceIds = true;
              if (!attempt2.rightNow.trim()) e.a2right = true;
              if (!attempt2.watchFor.trim()) e.a2watch = true;
              if (!rejectedVoiceId) e.rejectedVoiceId = true;
              if (!rejectedJustification.trim()) e.rejectedJustification = true;
              return e;
            })}>Lock In Final Report →</PrimaryButton>
          </Card>
        )}

        {phase === "headline" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Headline — Word Check</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 14 }}>Two other headlines are circulating for this story. Read them before you write your own.</p>
            <div style={{ background: "#FDF2F2", borderRadius: 10, padding: "10px 14px", marginBottom: 8, fontSize: 13.5 }}><b>Oversold:</b> {publicCase.headlineChoices.oversold}</div>
            <div style={{ background: "#F2F2F2", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 13.5 }}><b>Undersold:</b> {publicCase.headlineChoices.undersold}</div>
            <Field label="Your headline" value={headline} onChange={setHeadline} placeholder="Write a headline that matches your evidence — not too dramatic, not too flat." error={errors.headline} minHeight={50} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 16, cursor: "pointer" }}>
              <input type="checkbox" checked={wordCheckAck} onChange={(e) => setWordCheckAck(e.target.checked)} />
              My headline beats both of the ones above.
            </label>
            <PrimaryButton onClick={() => goTo("review", () => {
              const e = {};
              if (!headline.trim()) e.headline = true;
              if (!wordCheckAck) e.wordCheckAck = true;
              return e;
            })}>Continue →</PrimaryButton>
          </Card>
        )}

        {phase === "review" && (
          <Card>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Ready to Go On Air?</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 16 }}>Once you submit, your teacher will review your full investigation.</p>
            <div style={{ background: COLORS.cream, borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{headline}</div>
              <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 6 }}>{attempt2.rightNow}</div>
            </div>
            {submitError && <div style={{ color: COLORS.danger, fontSize: 13, marginBottom: 12 }}>{submitError}</div>}
            <PrimaryButton onClick={handleFinalSubmit} disabled={submitting}>{submitting ? "Submitting..." : "Go On Air — Submit →"}</PrimaryButton>
          </Card>
        )}

      </div>
    </div>
  );
}
