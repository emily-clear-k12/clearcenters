"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2 } from "lucide-react";

const COLORS = {
  navy: "#16243F",
  deepNavy: "#1B2D4D",
  slate: "#2A3E63",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  gold: "#FFC44D",
};

const CONFIDENCE_LEVELS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

const STARTER_CHIPS = ["Ask Daisy what she's noticed", "Ask Frankie about his crop data", "Ask Dr. Wren to explain the food web"];
const REQUIRED_CHECKS = 3;

function CharAvatar({ cast, charId, size = 36 }) {
  const c = cast[charId] || Object.values(cast)[0];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: COLORS.white, border: "2.5px solid " + c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, flexShrink: 0 }}>
      {c.emoji}
    </div>
  );
}

function StepTracker({ currentIdx }) {
  const steps = ["Read", "Discuss", "Think", "Revise", "Share"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: 46 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: i <= currentIdx ? "none" : "2px solid rgba(255,255,255,.3)", background: i < currentIdx ? COLORS.teal : i === currentIdx ? COLORS.violet : "transparent", color: i <= currentIdx ? COLORS.white : "rgba(255,255,255,.55)" }}>
              {i < currentIdx ? "check" : i + 1}
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 600, color: i <= currentIdx ? COLORS.white : "rgba(255,255,255,.5)" }}>{label}</div>
          </div>
          {i < steps.length - 1 && <div style={{ width: 18, height: 2, background: i < currentIdx ? COLORS.teal : "rgba(255,255,255,.25)", marginBottom: 14 }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Organizer({ fieldsMeta, values, onChange, compact, errors, readOnly, horizontal }) {
  return (
    <div style={{ display: "grid", gap: compact ? 10 : 14, gridTemplateColumns: horizontal ? "repeat(4, 1fr)" : "1fr" }}>
      {fieldsMeta.map((f) => {
        const hasError = errors && errors[f.key];
        return (
          <div key={f.key} style={{ background: COLORS.white, borderRadius: 14, padding: compact ? 12 : 16, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
              <div style={{ fontWeight: 700, fontSize: compact ? 12.5 : 14, color: COLORS.textDark }}>{f.label}</div>
              {!readOnly && <span style={{ color: "#D64545", fontWeight: 700, fontSize: compact ? 12.5 : 14 }}>*</span>}
            </div>
            <textarea
              value={values[f.key] || ""}
              onChange={(e) => !readOnly && onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              readOnly={readOnly}
              style={{ width: "100%", resize: "vertical", border: hasError ? "2px solid #D64545" : "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px", fontFamily: "inherit", fontSize: compact ? 13 : 14, minHeight: compact ? 50 : 66, boxSizing: "border-box", background: hasError ? "#FDF2F2" : readOnly ? COLORS.cream : COLORS.white, color: COLORS.textDark }}
            />
            {hasError && <div style={{ color: "#D64545", fontSize: 11.5, fontWeight: 600, marginTop: 4 }}>Fill this in before continuing.</div>}
          </div>
        );
      })}
    </div>
  );
}

function SourceTracker({ cast, sources, onChange, readOnly, horizontal }) {
  const castIds = Object.keys(cast);
  return (
    <div style={{ background: COLORS.white, borderRadius: 14, padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark, marginBottom: 2 }}>Your Sources</div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 10 }}>What did each character tell you?</div>
      <div style={{ display: "grid", gridTemplateColumns: horizontal ? "repeat(4, 1fr)" : "1fr", gap: horizontal ? 10 : 8 }}>
        {castIds.map((id) => (
          <div key={id} style={horizontal ? { display: "flex", flexDirection: "column", gap: 6 } : { display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={horizontal ? { display: "flex", flexDirection: "column", alignItems: "center" } : { display: "flex", flexDirection: "column", alignItems: "center", width: 46, flexShrink: 0, paddingTop: 4 }}>
              <CharAvatar cast={cast} charId={id} size={28} />
              <div style={{ fontSize: 9.5, fontWeight: 700, color: cast[id].color, textAlign: "center", marginTop: 2 }}>{cast[id].name.split(" ")[0]}</div>
            </div>
            <textarea
              value={sources[id] || ""}
              onChange={(e) => !readOnly && onChange(id, e.target.value)}
              readOnly={readOnly}
              placeholder={"According to " + cast[id].name.split(" ")[0] + "..."}
              style={{ width: "100%", resize: "vertical", border: "2px solid #ECEAF5", borderRadius: 10, padding: "7px 10px", fontFamily: "inherit", fontSize: horizontal ? 11.5 : 12.5, minHeight: horizontal ? 60 : 40, boxSizing: "border-box", background: readOnly ? COLORS.cream : COLORS.white, color: COLORS.textDark }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptModal({ open, onClose, coldOpenMessages, cast, liveMessages }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 18, width: "min(600px, 100%)", maxHeight: "80vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ background: COLORS.violet, color: COLORS.white, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>The Discussion So Far</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.2)", border: "none", color: COLORS.white, borderRadius: 8, padding: "4px 10px", fontWeight: 700, cursor: "pointer" }}>Close</button>
        </div>
        <div style={{ overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, background: COLORS.cream }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 2 }}>COLD OPEN</div>
          {coldOpenMessages.map((m, i) =>
            m.who === "system" ? (
              <div key={"co" + i} style={{ alignSelf: "center", background: "#DDE6EA", color: "#3C4C55", fontSize: 12.5, padding: "7px 12px", borderRadius: 10, maxWidth: "92%", textAlign: "center" }}>{m.text}</div>
            ) : (
              <div key={"co" + i} style={{ display: "flex", gap: 8, alignItems: "flex-end", maxWidth: "88%" }}>
                <CharAvatar cast={cast} charId={m.charId} size={28} />
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: cast[m.charId].color }}>{cast[m.charId].name}</div>
                  <div style={{ background: COLORS.white, borderRadius: 12, padding: "7px 11px", fontSize: 13.5, lineHeight: 1.35, color: COLORS.textDark }}>{m.text}</div>
                </div>
              </div>
            )
          )}
          {liveMessages && liveMessages.length > 0 && (
            <React.Fragment>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 0.5, margin: "8px 0 2px" }}>LIVE CHAT</div>
              {liveMessages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={"lv" + i} style={{ alignSelf: "flex-end", maxWidth: "88%" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, textAlign: "right" }}>You</div>
                    <div style={{ background: COLORS.violetSoft, borderRadius: 12, padding: "7px 11px", fontSize: 13.5, lineHeight: 1.35 }}>{msg.text}</div>
                  </div>
                ) : (
                  <div key={"lv" + i} style={{ display: "flex", gap: 8, alignItems: "flex-end", maxWidth: "88%" }}>
                    <CharAvatar cast={cast} charId={msg.charId} size={28} />
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: (cast[msg.charId] || {}).color }}>{cast[msg.charId] ? cast[msg.charId].name : "Character"}</div>
                      <div style={{ background: COLORS.white, borderRadius: 12, padding: "7px 11px", fontSize: 13.5, lineHeight: 1.35, color: COLORS.textDark }}>{msg.text}</div>
                    </div>
                  </div>
                )
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function SubmitConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.white, borderRadius: 18, width: "min(420px, 100%)", padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.4)", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🐝</div>
        <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.textDark, marginBottom: 8 }}>Ready to submit for grading?</div>
        <div style={{ fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 6 }}>Once you submit, you won't be able to make more changes to your answer.</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          <button onClick={onCancel} style={{ background: COLORS.cream, color: COLORS.textDark, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>No, go back</button>
          <button onClick={onConfirm} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Yes, submit</button>
        </div>
      </div>
    </div>
  );
}

function CelebrationModal({ open, onGoHome }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.violetSoft, borderRadius: 18, width: "min(420px, 100%)", padding: 28, boxShadow: "0 24px 60px rgba(0,0,0,.4)", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.textDark, marginBottom: 6 }}>Thanks for reflecting on your work!</div>
        <div style={{ fontSize: 13.5, color: COLORS.textMuted, marginBottom: 20 }}>Your teacher will release your final grade soon.</div>
        <button onClick={onGoHome} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "12px 26px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Go back to Home</button>
      </div>
    </div>
  );
}

export default function ActivityClient(props) {
  const assignmentId = props.assignmentId;
  const caseStandard = props.caseStandard;
  const publicCase = props.publicCase;
  const cast = props.cast;
  const organizerFields = props.organizerFields;
  const existingSubmission = props.existingSubmission;
  const alreadySubmitted = props.alreadySubmitted;

  const router = useRouter();
  const draft = existingSubmission || {};
  const hasOrganizerDraft = draft.organizer && Object.values(draft.organizer).some(function (v) { return v; });

  const [appPhase, setAppPhase] = useState(alreadySubmitted ? "share" : hasOrganizerDraft ? "organizer" : "coldopen");
  const [coldPhase, setColdPhase] = useState("intro");
  const [coldMsgIndex, setColdMsgIndex] = useState(-1);

  const [organizer, setOrganizer] = useState(draft.organizer || { misconception: "", evidence: "", analysis: "", unclear: "" });
  const [sources, setSources] = useState(draft.sources || Object.fromEntries(Object.keys(cast).map(function (id) { return [id, ""]; })));
  const [showOrganizerErrors, setShowOrganizerErrors] = useState(false);
  const [showDiscussErrors, setShowDiscussErrors] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const [liveMessages, setLiveMessages] = useState([{ role: "assistant", charId: Object.keys(cast)[0], text: publicCase.trapLine }]);
  const [liveDraft, setLiveDraft] = useState("");
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState(null);
  const scrollRef = useRef(null);

  const [attempt1, setAttempt1] = useState(draft.attempt1 || "");
  const [attempt2, setAttempt2] = useState(draft.attempt2 || "");
  const [checklist, setChecklist] = useState(draft.checklist || publicCase.selfCheckQuestions.map(function () { return false; }));
  const [showReviseErrors, setShowReviseErrors] = useState(false);
  const [hintText, setHintText] = useState(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [hintError, setHintError] = useState(null);
  const [hintCount, setHintCount] = useState(0);

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [selfConfidence, setSelfConfidence] = useState(draft.self_confidence || null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(function () {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [liveMessages, liveLoading, coldMsgIndex]);

  function saveProgress(fields) {
    var body = Object.assign({ assignmentId: assignmentId }, fields);
    fetch("/api/submission/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(function () {});
  }

  function advanceColdOpen() {
    if (coldPhase === "intro") { setColdPhase("messages"); setColdMsgIndex(0); return; }
    if (coldPhase === "messages") {
      if (coldMsgIndex < publicCase.coldOpenMessages.length - 1) setColdMsgIndex(coldMsgIndex + 1);
      else setColdPhase("trap");
      return;
    }
    if (coldPhase === "trap") { setColdPhase("think"); return; }
  }

  function updateOrganizer(key, value) { setOrganizer(function (prev) { var next = Object.assign({}, prev); next[key] = value; return next; }); }
  function updateSource(id, value) { setSources(function (prev) { var next = Object.assign({}, prev); next[id] = value; return next; }); }

  function getOrganizerErrors() {
    var errors = {};
    organizerFields.forEach(function (f) { errors[f.key] = !organizer[f.key] || !organizer[f.key].trim(); });
    return errors;
  }
  var organizerErrors = getOrganizerErrors();
  var organizerComplete = Object.keys(organizerErrors).every(function (k) { return !organizerErrors[k]; });

  function handleContinueToDiscuss() {
    if (!organizerComplete) { setShowOrganizerErrors(true); return; }
    setShowOrganizerErrors(false);
    saveProgress({ organizer: organizer });
    setAppPhase("discuss");
  }

  function handleContinueToThink() {
    if (!organizerComplete) { setShowDiscussErrors(true); return; }
    setShowDiscussErrors(false);
    saveProgress({ organizer: organizer, sources: sources });
    setAppPhase("think");
  }

  function sendLiveMessage() {
    if (!liveDraft.trim() || liveLoading) return;
    var userMsg = { role: "user", text: liveDraft.trim() };
    var nextMessages = liveMessages.concat([userMsg]);
    setLiveMessages(nextMessages);
    setLiveDraft("");
    setLiveLoading(true);
    setLiveError(null);
    fetch("/api/discuss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseStandard: caseStandard, messages: nextMessages }),
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        if (!result.ok) throw new Error(result.data.error);
        setLiveMessages(nextMessages.concat([{ role: "assistant", charId: result.data.charId, text: result.data.text }]));
      })
      .catch(function () {
        setLiveError("Couldn't reach the AI characters just now. Give it another try.");
      })
      .finally(function () {
        setLiveLoading(false);
      });
  }

  function currentDraftText() {
    return (attempt2 && attempt2.trim()) || (attempt1 && attempt1.trim()) || "";
  }

  function requestHint() {
    if (hintLoading) return;
    setHintLoading(true);
    setHintError(null);
    fetch("/api/hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseStandard: caseStandard, draftText: currentDraftText() }),
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        if (!result.ok) throw new Error(result.data.error);
        setHintText(result.data.hint);
        setHintCount(function (c) { return c + 1; });
      })
      .catch(function () {
        setHintError("Couldn't reach S.A.M. just now. Give it another try.");
      })
      .finally(function () {
        setHintLoading(false);
      });
  }

  function toggleChecklistItem(i) {
    setChecklist(function (prev) {
      var next = prev.slice();
      next[i] = !next[i];
      return next;
    });
  }
  var checkedCount = checklist.filter(Boolean).length;
  var checklistPasses = checkedCount >= REQUIRED_CHECKS;

  function handleRequestSubmit() {
    if (!checklistPasses) { setShowReviseErrors(true); return; }
    setShowReviseErrors(false);
    setShowSubmitConfirm(true);
  }

  function confirmSubmit() {
    setShowSubmitConfirm(false);
    setSubmitting(true);
    setAppPhase("share");
    fetch("/api/submission/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assignmentId: assignmentId,
        caseStandard: caseStandard,
        attempt1: attempt1,
        attempt2: attempt2,
        organizer: organizer,
        sources: sources,
        checklist: checklist,
        selfConfidence: null,
      }),
    })
      .catch(function () {})
      .finally(function () {
        setSubmitting(false);
      });
  }

  function pickConfidence(id) {
    setSelfConfidence(id);
    saveProgress({ self_confidence: id });
  }

  var stepIdx = appPhase === "organizer" ? 0 : appPhase === "discuss" ? 1 : appPhase === "think" ? 2 : appPhase === "revise" ? 3 : 4;

  if (appPhase === "coldopen") {
    return (
      <div onClick={coldPhase !== "think" ? advanceColdOpen : undefined} style={{ minHeight: "100vh", background: "linear-gradient(160deg, " + COLORS.navy + " 0%, " + COLORS.deepNavy + " 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: coldPhase !== "think" ? "pointer" : "default", color: COLORS.white, fontFamily: "'Inter', sans-serif", padding: 24, userSelect: "none", position: "relative" }}>
        <style>{"@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');"}</style>
        <div style={{ position: "absolute", top: 18, left: 22, fontWeight: 700, fontSize: 15 }}>ClearCenters <span style={{ color: COLORS.gold }}>· Group Chat</span></div>
        <div style={{ position: "absolute", top: 16, right: 22, background: COLORS.violet, fontWeight: 700, fontSize: 11, letterSpacing: 1.5, padding: "5px 12px", borderRadius: 999 }}>COLD OPEN</div>

        {coldPhase === "intro" && (
          <div style={{ textAlign: "center", maxWidth: 520 }}>
            <div style={{ fontSize: 56, marginBottom: 10 }}>📱</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 32, marginBottom: 10, fontWeight: 700 }}>The Farm Crew</h1>
            {Object.values(cast).map(function (c) { return (<div key={c.name} style={{ color: "rgba(255,255,255,.75)", fontSize: 15, margin: "3px 0" }}>{c.emoji} {c.name}</div>); })}
            <div style={{ marginTop: 24, display: "inline-block", background: COLORS.violet, fontWeight: 700, padding: "11px 24px", borderRadius: 999, fontSize: 15 }}>Click to begin</div>
          </div>
        )}

        {coldPhase === "messages" && (
          <div style={{ width: "min(680px, 92vw)", height: "min(72vh, 620px)", background: COLORS.cream, borderRadius: 22, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(0,0,0,.45)" }}>
            <div style={{ background: COLORS.violet, color: COLORS.white, padding: "12px 18px", textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>The Farm Crew</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{Object.values(cast).map(function (c) { return c.name; }).join(", ")}</div>
            </div>
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
              {publicCase.coldOpenMessages.slice(0, coldMsgIndex + 1).map(function (m, i) {
                return m.who === "system" ? (
                  <div key={i} style={{ alignSelf: "center", background: "#DDE6EA", color: "#3C4C55", fontSize: 13, padding: "8px 14px", borderRadius: 12, maxWidth: "92%", textAlign: "center" }}>{m.text}</div>
                ) : (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end", maxWidth: "86%" }}>
                    <CharAvatar cast={cast} charId={m.charId} size={32} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: cast[m.charId].color }}>{cast[m.charId].name}</div>
                      <div style={{ background: COLORS.white, borderRadius: 14, padding: "8px 12px", fontSize: 14.5, lineHeight: 1.35, color: COLORS.textDark }}>{m.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {coldPhase === "trap" && (
          <div style={{ textAlign: "center", maxWidth: 800 }}>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 17, marginBottom: 12 }}>{Object.values(cast)[0].name} says:</div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 700, lineHeight: 1.25 }}>"{publicCase.trapLine}"</div>
          </div>
        )}

        {coldPhase === "think" && (
          <div style={{ textAlign: "center", maxWidth: 720 }}>
            <div style={{ color: COLORS.gold, fontWeight: 700, letterSpacing: 2, fontSize: 13, marginBottom: 10 }}>LET'S THINK ABOUT IT</div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, marginBottom: 18, lineHeight: 1.25 }}>{publicCase.bigQuestion}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 22 }}>
              {publicCase.evidenceBank.map(function (e, i) { return (<div key={i} style={{ background: "rgba(255,255,255,.08)", border: "1.5px solid " + COLORS.violet, color: "rgba(255,255,255,.9)", fontSize: 13, padding: "7px 14px", borderRadius: 999 }}>{e}</div>); })}
            </div>
            <button onClick={function () { setAppPhase("organizer"); }} style={{ background: COLORS.teal, color: COLORS.white, fontWeight: 700, padding: "12px 28px", borderRadius: 999, fontSize: 15, border: "none", cursor: "pointer" }}>Start My Organizer →</button>
          </div>
        )}

        {coldPhase !== "think" && <div style={{ position: "absolute", bottom: 14, fontSize: 12.5, color: "rgba(255,255,255,.5)" }}>Click anywhere to continue</div>}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, " + COLORS.navy + " 0%, " + COLORS.deepNavy + " 100%)", fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex", flexDirection: "column" }}>
      <style>{"\n        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');\n        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }\n        .gc-btn:hover { transform: translateY(-1px); }\n        .gc-fade-in { animation: gcFadeIn 220ms ease-out; }\n        @keyframes gcFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }\n        .gc-dot { animation: gcPulse 1.2s ease-in-out infinite; }\n        @keyframes gcPulse { 0%,100% { opacity: .3; } 50% { opacity: 1; } }\n      "}</style>

      <div style={{ background: COLORS.slate, padding: "12px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button onClick={function () { router.push("/home"); }} className="gc-btn" style={{ background: "none", color: COLORS.white, display: "flex", alignItems: "center", padding: 6, borderRadius: 8 }}>← Home</button>
        <div style={{ marginRight: "auto" }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.white, fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>{publicCase.title}</div>
          <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12 }}>{publicCase.standard}</div>
        </div>
        <StepTracker currentIdx={stepIdx} />
      </div>

      {appPhase === "organizer" && (
        <div style={{ flex: 1, padding: "20px 20px 32px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 640 }}>
            <div className="gc-fade-in" style={{ background: COLORS.violetSoft, borderRadius: 14, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet, letterSpacing: 0.5, marginBottom: 4 }}>BIG QUESTION</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textDark }}>{publicCase.bigQuestion}</div>
            </div>
            <button className="gc-btn" onClick={function () { setTranscriptOpen(true); }} style={{ marginBottom: 14, background: COLORS.white, color: COLORS.violet, border: "2px solid " + COLORS.violet, borderRadius: 999, padding: "9px 16px", fontWeight: 700, fontSize: 13 }}>Re-read the discussion</button>
            <Organizer fieldsMeta={organizerFields} values={organizer} onChange={updateOrganizer} errors={showOrganizerErrors ? organizerErrors : null} />
            {showOrganizerErrors && !organizerComplete && (<div style={{ color: "#FFD9D9", background: "rgba(214,69,69,.25)", borderRadius: 10, padding: "8px 12px", fontSize: 12.5, fontWeight: 600, marginTop: 10, textAlign: "center" }}>Fill in every box before continuing.</div>)}
            <button className="gc-btn" onClick={handleContinueToDiscuss} style={{ marginTop: 16, width: "100%", background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "13px 20px", fontWeight: 700, fontSize: 15 }}>Continue to Discuss →</button>
          </div>
        </div>
      )}

      {appPhase === "discuss" && (
        <div style={{ flex: 1, padding: "16px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: 1080, marginBottom: 14 }}>
            <div className="gc-fade-in" style={{ background: COLORS.violetSoft, borderRadius: 14, padding: "14px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet, letterSpacing: 0.5, marginBottom: 4 }}>KEEP THIS IN MIND · YOU'LL ANSWER THIS IN THINK</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textDark }}>{publicCase.bigQuestion}</div>
            </div>
          </div>
          <div style={{ width: "100%", maxWidth: 1080, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
            <div style={{ background: COLORS.white, borderRadius: 20, boxShadow: "0 8px 24px rgba(0,0,0,.2)", overflow: "hidden", display: "flex", flexDirection: "column", height: 560 }}>
              <div style={{ background: COLORS.violetSoft, padding: "10px 16px", fontWeight: 700, fontSize: 13, color: COLORS.violet }}>Keep investigating — ask the characters below</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(" + Object.keys(cast).length + ", 1fr)", gap: 8, padding: "10px 16px", background: COLORS.white, borderBottom: "1px solid #ECEAF5" }}>
                {Object.keys(cast).map(function (id) {
                  var c = cast[id];
                  return (
                    <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 4 }}>
                      <CharAvatar cast={cast} charId={id} size={32} />
                      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textDark, lineHeight: 1.2 }}>{c.name}</div>
                      <div style={{ fontSize: 10, color: COLORS.textMuted, lineHeight: 1.3 }}>{c.hint}</div>
                    </div>
                  );
                })}
              </div>
              <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, background: COLORS.cream }}>
                {liveMessages.map(function (msg, i) {
                  return msg.role === "user" ? (
                    <div key={i} className="gc-fade-in" style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, marginBottom: 2, textAlign: "right" }}>You</div>
                      <div style={{ background: COLORS.violetSoft, borderRadius: "14px 4px 14px 14px", padding: "9px 13px", fontSize: 14, lineHeight: 1.5 }}>{msg.text}</div>
                    </div>
                  ) : (
                    <div key={i} className="gc-fade-in" style={{ display: "flex", gap: 9, maxWidth: "85%" }}>
                      <CharAvatar cast={cast} charId={msg.charId} />
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: (cast[msg.charId] || {}).color, marginBottom: 2 }}>{cast[msg.charId] ? cast[msg.charId].name : "Character"}</div>
                        <div style={{ background: COLORS.white, borderLeft: "4px solid " + ((cast[msg.charId] || {}).color || "#ccc"), borderRadius: "4px 14px 14px 14px", padding: "9px 13px", fontSize: 14, lineHeight: 1.5, color: COLORS.textDark }}>{msg.text}</div>
                      </div>
                    </div>
                  );
                })}
                {liveLoading && (
                  <div style={{ display: "flex", gap: 9 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.white, border: "2.5px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" }}><Loader2 size={16} className="gc-dot" style={{ color: COLORS.textMuted }} /></div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted, fontStyle: "italic", alignSelf: "center" }}>thinking<span className="gc-dot">...</span></div>
                  </div>
                )}
                {liveError && <div style={{ fontSize: 12.5, color: "#B23A3A", background: "#FBEAEA", borderRadius: 10, padding: "8px 12px" }}>{liveError}</div>}
              </div>
              <div style={{ borderTop: "1px solid #ECEAF5", padding: 12, background: COLORS.white }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                  {STARTER_CHIPS.map(function (chip, i) { return (<button key={i} className="gc-btn" onClick={function () { setLiveDraft(chip); }} style={{ background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 999, padding: "5px 12px", fontWeight: 600, fontSize: 11.5 }}>{chip}</button>); })}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <textarea value={liveDraft} onChange={function (e) { setLiveDraft(e.target.value); }} onKeyDown={function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendLiveMessage(); } }} placeholder="Type your message..." style={{ flex: 1, resize: "none", border: "2px solid #ECEAF5", borderRadius: 12, padding: "10px 12px", fontFamily: "inherit", fontSize: 14, height: 44, boxSizing: "border-box" }} />
                  <button className="gc-btn" onClick={sendLiveMessage} disabled={liveLoading} style={{ background: liveLoading ? "#9FE4E6" : COLORS.teal, color: COLORS.white, borderRadius: 12, padding: "0 18px", display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14 }}><Send size={16} /></button>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", letterSpacing: 0.5 }}>YOUR ORGANIZER · KEEP BUILDING IT</div>
                <button className="gc-btn" onClick={function () { setTranscriptOpen(true); }} style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "5px 11px", fontWeight: 700, fontSize: 11.5 }}>Re-read</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                <SourceTracker cast={cast} sources={sources} onChange={updateSource} />
                <Organizer fieldsMeta={organizerFields} values={organizer} onChange={updateOrganizer} compact errors={showDiscussErrors ? organizerErrors : null} />
              </div>
              {showDiscussErrors && !organizerComplete && (<div style={{ color: "#FFD9D9", background: "rgba(214,69,69,.25)", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 600, marginTop: 10, textAlign: "center" }}>Fill in every box before continuing.</div>)}
              <button className="gc-btn" onClick={handleContinueToThink} style={{ marginTop: 12, background: COLORS.gold, color: COLORS.navy, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14 }}>Continue to Think →</button>
            </div>
          </div>
        </div>
      )}

      {appPhase === "think" && (
        <div style={{ flex: 1, padding: "16px 20px 32px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="gc-fade-in" style={{ background: COLORS.violetSoft, borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet, letterSpacing: 0.5, marginBottom: 4 }}>BIG QUESTION</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textDark }}>{publicCase.bigQuestion}</div>
            </div>
            <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)", padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginBottom: 8 }}>Write your explanation. Use your evidence!</div>
              <textarea value={attempt1} onChange={function (e) { setAttempt1(e.target.value); }} placeholder="Start writing your answer here..." style={{ width: "100%", minHeight: 160, resize: "vertical", border: "2px solid #ECEAF5", borderRadius: 12, padding: 12, fontFamily: "inherit", fontSize: 14.5, lineHeight: 1.5, boxSizing: "border-box" }} />
              <div style={{ textAlign: "right", fontSize: 11.5, color: COLORS.textMuted, marginTop: 4 }}>{attempt1.length} / 800</div>
            </div>
            <div>
              <button className="gc-btn" onClick={requestHint} disabled={hintLoading} style={{ background: hintLoading ? "#9FE4E6" : COLORS.teal, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                {hintLoading ? <Loader2 size={16} className="gc-dot" /> : "Get a hint"} {!hintLoading && hintCount > 0 ? "(another)" : ""}
              </button>
              {hintText && (
                <div className="gc-fade-in" style={{ marginTop: 12, background: "#E6F8F9", borderRadius: 14, padding: 14, display: "flex", gap: 10 }}>
                  <img src="/icons/robot_point.png" alt="S.A.M." style={{ width: 40, height: 40, objectFit: "contain", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: COLORS.teal, marginBottom: 3 }}>S.A.M.</div>
                    <div style={{ fontSize: 13.5, color: COLORS.textDark, lineHeight: 1.5 }}>{hintText}</div>
                  </div>
                </div>
              )}
              {hintError && <div style={{ marginTop: 10, fontSize: 12.5, color: "#B23A3A", background: "#FBEAEA", borderRadius: 10, padding: "8px 12px" }}>{hintError}</div>}
            </div>
            <button className="gc-btn" onClick={function () { saveProgress({ attempt1: attempt1 }); setAppPhase("revise"); }} style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "13px 20px", fontWeight: 700, fontSize: 15 }}>Continue to Revise →</button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", letterSpacing: 0.5 }}>YOUR NOTES · FOR REFERENCE</div>
              <button className="gc-btn" onClick={function () { setTranscriptOpen(true); }} style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "5px 11px", fontWeight: 700, fontSize: 11.5 }}>Re-read</button>
            </div>
            <SourceTracker cast={cast} sources={sources} onChange={function () {}} readOnly horizontal />
            <Organizer fieldsMeta={organizerFields} values={organizer} onChange={function () {}} compact readOnly horizontal />
          </div>
        </div>
      )}

      {appPhase === "revise" && (
        <div style={{ flex: 1, padding: "16px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: 1080, marginBottom: 14 }}>
            <div className="gc-fade-in" style={{ background: COLORS.violetSoft, borderRadius: 14, padding: "14px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet, letterSpacing: 0.5, marginBottom: 4 }}>BIG QUESTION</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textDark }}>{publicCase.bigQuestion}</div>
            </div>
          </div>
          <div style={{ width: "100%", maxWidth: 1080, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)", padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Your Attempt 1</div>
                <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 14, lineHeight: 1.5, color: COLORS.textDark, minHeight: 60 }}>{attempt1 || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(no answer written)</span>}</div>
              </div>
              <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)", padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginBottom: 4 }}>Want to revise? (optional)</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Leave this blank to keep your first attempt, or rewrite your answer here.</div>
                <textarea value={attempt2} onChange={function (e) { setAttempt2(e.target.value); }} placeholder="Rewrite your answer here if you'd like to improve it..." style={{ width: "100%", minHeight: 140, resize: "vertical", border: "2px solid #ECEAF5", borderRadius: 12, padding: 12, fontFamily: "inherit", fontSize: 14.5, lineHeight: 1.5, boxSizing: "border-box" }} />
                <div style={{ textAlign: "right", fontSize: 11.5, color: COLORS.textMuted, marginTop: 4 }}>{attempt2.length} / 800</div>
              </div>
              <div>
                <button className="gc-btn" onClick={requestHint} disabled={hintLoading} style={{ background: hintLoading ? "#9FE4E6" : COLORS.teal, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  {hintLoading ? <Loader2 size={16} className="gc-dot" /> : "Get a hint"} {!hintLoading && hintCount > 0 ? "(another)" : ""}
                </button>
                {hintText && (
                  <div className="gc-fade-in" style={{ marginTop: 12, background: "#E6F8F9", borderRadius: 14, padding: 14, display: "flex", gap: 10 }}>
                    <img src="/icons/robot_point.png" alt="S.A.M." style={{ width: 40, height: 40, objectFit: "contain", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 12, color: COLORS.teal, marginBottom: 3 }}>S.A.M.</div>
                      <div style={{ fontSize: 13.5, color: COLORS.textDark, lineHeight: 1.5 }}>{hintText}</div>
                    </div>
                  </div>
                )}
                {hintError && <div style={{ marginTop: 10, fontSize: 12.5, color: "#B23A3A", background: "#FBEAEA", borderRadius: 10, padding: "8px 12px" }}>{hintError}</div>}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginBottom: 4 }}>Self-Check Checklist</div>
                <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>Check off the ones that are true — you need at least {REQUIRED_CHECKS} of 5 ({checkedCount}/5 so far).</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {publicCase.selfCheckQuestions.map(function (item, i) {
                    return (
                      <button key={i} className="gc-btn" onClick={function () { toggleChecklistItem(i); }} style={{ display: "flex", alignItems: "flex-start", gap: 8, textAlign: "left", background: checklist[i] ? "#E6F8F9" : COLORS.cream, border: checklist[i] ? "1.5px solid " + COLORS.teal : "1.5px solid transparent", borderRadius: 10, padding: "9px 11px" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1, border: "2px solid " + (checklist[i] ? COLORS.teal : "#D8D4E8"), background: checklist[i] ? COLORS.teal : COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 12, fontWeight: 700 }}>{checklist[i] ? "check" : ""}</div>
                        <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.4 }}>{item}</div>
                      </button>
                    );
                  })}
                </div>
                {showReviseErrors && !checklistPasses && (<div style={{ color: "#B23A3A", background: "#FBEAEA", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 600, marginTop: 10 }}>Check at least {REQUIRED_CHECKS} of 5 before submitting.</div>)}
              </div>
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", letterSpacing: 0.5 }}>YOUR NOTES · FOR REFERENCE</div>
                  <button className="gc-btn" onClick={function () { setTranscriptOpen(true); }} style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "5px 11px", fontWeight: 700, fontSize: 11.5 }}>Re-read</button>
                </div>
                <SourceTracker cast={cast} sources={sources} onChange={function () {}} readOnly horizontal />
                <Organizer fieldsMeta={organizerFields} values={organizer} onChange={function () {}} compact readOnly horizontal />
              </div>
              <button className="gc-btn" onClick={handleRequestSubmit} style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "13px 20px", fontWeight: 700, fontSize: 15 }}>Submit for Grading →</button>
            </div>
          </div>
        </div>
      )}

      {appPhase === "share" && (
        <div style={{ flex: 1, padding: "16px 20px 32px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 760, display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="gc-fade-in" style={{ background: COLORS.violetSoft, borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet, letterSpacing: 0.5, marginBottom: 4 }}>BIG QUESTION</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textDark }}>{publicCase.bigQuestion}</div>
            </div>
            <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)", padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Your Final Answer</div>
              <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 14, lineHeight: 1.5, color: COLORS.textDark }}>{currentDraftText() || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(no answer written)</span>}</div>
            </div>
            <div className="gc-fade-in" style={{ background: "#E6F8F9", borderRadius: 14, padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <img src="/icons/robot_point.png" alt="" style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.teal, marginBottom: 3 }}>{submitting ? "Submitting..." : "Submitted! Nice work."}</div>
                <div style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.5 }}>Your teacher will release your official grade soon. In the meantime, take a moment to think about how your answer went.</div>
              </div>
            </div>
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginBottom: 10 }}>How confident are you in your answer?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {CONFIDENCE_LEVELS.map(function (c) {
                  return (
                    <button key={c.id} className="gc-btn" onClick={function () { pickConfidence(c.id); }} style={{ padding: "16px 10px", borderRadius: 12, fontWeight: 700, fontSize: 13.5, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: selfConfidence === c.id ? COLORS.violet : COLORS.cream, color: selfConfidence === c.id ? COLORS.white : COLORS.textDark, border: selfConfidence === c.id ? "2px solid " + COLORS.violet : "2px solid transparent" }}>
                      <span style={{ fontSize: 26 }}>{c.emoji}</span>{c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <SubmitConfirmModal open={showSubmitConfirm} onCancel={function () { setShowSubmitConfirm(false); }} onConfirm={confirmSubmit} />
      <CelebrationModal open={selfConfidence !== null && appPhase === "share"} onGoHome={function () { router.push("/home"); }} />
      <TranscriptModal open={transcriptOpen} onClose={function () { setTranscriptOpen(false); }} coldOpenMessages={publicCase.coldOpenMessages} cast={cast} liveMessages={appPhase !== "organizer" ? liveMessages : null} />

      <p style={{ fontSize: 11.5, color: "rgba(255,255,255,.55)", textAlign: "center", marginTop: 4, marginBottom: 12, lineHeight: 1.5 }}>
        The characters and AI are never the judge — your teacher is always the scorer of record.
      </p>
    </div>
  );
}
