"use client";

import { useState, useEffect, useMemo, useCallback, createContext, useContext, useRef } from "react";
import SamGuide from "../../../components/SamGuide";
import BackToHubButton from "../../../components/BackToHubButton";
import { assembledReport, getRound, leftoversSoFar, reasonChipsFor, rejectReason, roundSize, trayOrder, CHALLENGE } from "../../../lib/cases/assembly-deck/index.public";

// Assembly Deck — the student screen (design doc §3).
// brief -> [build -> rejects] x rounds -> assembly -> what-if -> trap -> debrief -> explain -> done
// Pieces move by TAP-then-TAP, never drag-only: tap a sentence, tap a slot.
// Everything is a real <button>, so the whole engine works from a keyboard and
// with a screen reader, and nothing here is timed.

const THEME = {
  bg: "url(/student/hub_background.jpg) center / cover fixed",
  panel: "rgba(255,255,255,0.94)",
  inset: "#F4F7FC",
  chip: "#EEF3FA",
  border: "rgba(90, 70, 180, 0.18)",
  text: "#1F2A44",
  muted: "#5C6780",
  dim: "#8B95A8",
  done: "#12A36A",
  cursor: "#E0A322",
  error: "#E14B60",
  violet: "#6D4AFF",
  teal: "#0E9AA8",
};

const SamContext = createContext(() => {});
const useSay = () => useContext(SamContext);

function Panel({ children, style }) {
  return (
    <div style={{ background: THEME.panel, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 22, width: "100%", maxWidth: 900, boxShadow: "0 12px 36px rgba(40, 30, 90, 0.12)", color: THEME.text, ...style }}>
      {children}
    </div>
  );
}

function btn(color, disabled) {
  const ink = color === THEME.violet || color === THEME.error ? "#FFFFFF" : "#10203A";
  return {
    background: disabled ? "#E7EDF6" : color,
    color: disabled ? THEME.dim : ink,
    border: "none",
    borderRadius: 12,
    padding: "12px 20px",
    fontSize: 15.5,
    fontWeight: 800,
    fontFamily: "inherit",
    cursor: disabled ? "default" : "pointer",
  };
}

function Shell({ children, sam, bright }) {
  return (
    <div style={{ minHeight: "100vh", background: bright ? "url(/student/assembly_bay.jpg) center / cover fixed" : THEME.bg, color: THEME.text, fontFamily: "system-ui, sans-serif", padding: "24px 16px 120px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <BackToHubButton />
      {children}
      {sam}
    </div>
  );
}

// The sentences a student has placed, read back in slot order — this is the
// paragraph they built.
function paragraphText(round, board) {
  if (!round) return "";
  return round.slots
    .flatMap((slot) => ((board || {})[slot.id] || []).map((id) => (round.pieces.find((p) => p.id === id) || {}).text || ""))
    .filter(Boolean)
    .join(" ");
}

function SourceCard({ source, open, onToggle }) {
  if (!source) return null;
  return (
    <div style={{ background: THEME.inset, border: `1px solid ${THEME.border}`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
      <button
        onClick={onToggle}
        style={{ background: "none", border: "none", color: THEME.teal, fontSize: 12, letterSpacing: 1.4, fontWeight: 800, fontFamily: "inherit", cursor: "pointer", padding: 0 }}
      >
        📋 {source.title} {open ? "▾" : "▸"}
      </button>
      {open && (
        <ul style={{ margin: "10px 0 0", paddingLeft: 20, color: THEME.muted, fontSize: 14.5, lineHeight: 1.75 }}>
          {source.lines.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      )}
    </div>
  );
}

// ======================================================================
// CASE FILE — openable from every working screen (Emily, Sept 22)
// ======================================================================
// A student cannot answer a question about the report they built if the report
// has scrolled off three screens ago. The Case File is the whole record: the
// notes they were given, the paragraphs they have finished, and — the part
// that was missing — every sentence they left in the tray, with the reason
// they gave for it. Read-only. It never shows an answer the student has not
// already earned: a leftover's verdict appears only once that round has been
// checked.
function CaseFile({ publicCase, boards, rejections, rejectResults, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const report = assembledReport(publicCase, boards, null);
  const leftovers = leftoversSoFar(publicCase, boards, rejections);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Case file"
      style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(20, 28, 48, 0.45)", overflowY: "auto", padding: "24px 16px 80px", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Panel>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>🗂️ CASE FILE</div>
            <h2 style={{ fontSize: 22, margin: "6px 0 0" }}>{publicCase.title}</h2>
          </div>
          <button onClick={onClose} style={{ ...btn(THEME.violet), padding: "9px 16px", flexShrink: 0 }}>Close</button>
        </div>

        {publicCase.source && (
          <div style={{ background: THEME.inset, border: `1px solid ${THEME.border}`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 11.5, letterSpacing: 1.4, fontWeight: 800, color: THEME.teal, marginBottom: 8 }}>📋 {publicCase.source.title}</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: THEME.muted, fontSize: 14.5, lineHeight: 1.75 }}>
              {publicCase.source.lines.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        )}

        <div style={{ fontSize: 11.5, letterSpacing: 1.4, fontWeight: 800, color: THEME.muted, marginBottom: 8 }}>PARAGRAPHS YOU HAVE BUILT</div>
        {report.length ? (
          report.map((para) => (
            <div key={para.roundId} style={{ background: "rgba(123,93,255,0.1)", border: `1px solid ${THEME.border}`, borderRadius: 14, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: THEME.cursor, marginBottom: 6 }}>{para.label}</div>
              <div style={{ fontSize: 15, lineHeight: 1.75 }}>{para.sentences.map((s) => s.text).join(" ")}</div>
            </div>
          ))
        ) : (
          <div style={{ color: THEME.dim, fontSize: 14, marginBottom: 14 }}>Nothing built yet.</div>
        )}

        <div style={{ fontSize: 11.5, letterSpacing: 1.4, fontWeight: 800, color: THEME.muted, margin: "18px 0 8px" }}>
          SENTENCES YOU LEFT IN THE TRAY
        </div>
        {leftovers.length ? (
          leftovers.map((group) => (
            <div key={group.roundId} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: THEME.cursor, marginBottom: 6 }}>{group.label}</div>
              {group.pieces.map((p) => {
                const graded = ((rejectResults || {})[group.roundId] || []).find((r) => r.pieceId === p.pieceId) || null;
                const chosen = rejectReason(p.reason);
                return (
                  <div key={p.pieceId} style={{ background: THEME.inset, border: `1px solid ${graded ? (graded.correct ? THEME.done : THEME.error) : "transparent"}`, borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
                    <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{p.text}</div>
                    {chosen && (
                      <div style={{ marginTop: 6, fontSize: 13, color: graded ? (graded.correct ? THEME.done : THEME.error) : THEME.muted }}>
                        {graded ? (graded.correct ? "✓ " : "✗ ") : ""}You said: {chosen.short}
                      </div>
                    )}
                    {graded && !graded.correct && (
                      <div style={{ marginTop: 4, fontSize: 13, color: THEME.muted }}>
                        It was: {(rejectReason(graded.correctReason) || {}).short || graded.correctReason}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div style={{ color: THEME.dim, fontSize: 14 }}>Nothing left over yet — build a paragraph first.</div>
        )}
      </Panel>
    </div>
  );
}

function CaseFileButton({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open the case file"
      style={{
        position: "fixed", left: 14, bottom: 14, zIndex: 45,
        background: THEME.panel, border: `1px solid ${THEME.border}`, borderRadius: 99,
        padding: "11px 18px", color: THEME.text, fontSize: 14.5, fontWeight: 800,
        fontFamily: "inherit", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      🗂️ Case file
    </button>
  );
}

// ======================================================================
// BRIEF
// ======================================================================
function Brief({ publicCase, onStart, challenge, setChallenge }) {
  const say = useSay();
  useEffect(() => { say("Read the brief, Cadet. You are building the whole report today, not just one paragraph.", "helping"); }, [say]);
  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>🧩 ASSEMBLY DECK</div>
      <h1 style={{ fontSize: 28, margin: "8px 0 4px" }}>{publicCase.title}</h1>
      <div style={{ color: THEME.muted, fontSize: 13.5, marginBottom: 14 }}>
        {publicCase.subject} · Grade {publicCase.grade} · {publicCase.rounds.length} paragraphs · about {publicCase.estimatedMinutes} minutes
      </div>
      {publicCase.brief.map((line, i) => (
        <p key={i} style={{ fontSize: 16, lineHeight: 1.7, color: i === 0 ? THEME.text : THEME.muted, margin: "0 0 10px" }}>{line}</p>
      ))}
      <SourceCard source={publicCase.source} open onToggle={() => {}} />
      <button
        onClick={() => setChallenge(!challenge)}
        aria-pressed={challenge}
        style={{
          display: "block", width: "100%", textAlign: "left", marginBottom: 14,
          background: challenge ? "rgba(255,196,77,0.16)" : THEME.inset,
          border: `1px solid ${challenge ? THEME.cursor : "transparent"}`,
          borderRadius: 14, padding: "12px 14px", color: THEME.text, fontFamily: "inherit", cursor: "pointer",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 15 }}>{challenge ? "✓ " : ""}⚡ {CHALLENGE.label}</div>
        <div style={{ color: THEME.muted, fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>{CHALLENGE.blurb}</div>
      </button>
      <button onClick={onStart} style={btn(THEME.violet)}>Open the deck →</button>
    </Panel>
  );
}

// ======================================================================
// BUILD — one paragraph
// ======================================================================
function BuildRound({ publicCase, round, roundNumber, board, setBoard, onDone, sourceOpen, setSourceOpen, challenge }) {
  const say = useSay();
  const [selected, setSelected] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [feedback, setFeedback] = useState(null); // { results, perfect, reveal }
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const placedIds = useMemo(() => new Set(Object.values(board || {}).flat()), [board]);
  const tray = trayOrder(round, challenge).filter((p) => !placedIds.has(p.id));
  const { slotCapacity } = roundSize(round);
  const full = placedIds.size >= slotCapacity;

  useEffect(() => {
    say(`Paragraph ${roundNumber}: ${round.goal}`, "helping");
  }, [say, round.id, round.goal, roundNumber]);

  function place(slotId) {
    if (!selected) return;
    const slot = round.slots.find((s) => s.id === slotId);
    const current = (board[slotId] || []).filter((id) => id !== selected);
    if (current.length >= (slot.accepts || 1)) return; // slot is full
    const next = {};
    Object.entries(board).forEach(([id, arr]) => { next[id] = arr.filter((x) => x !== selected); });
    next[slotId] = [...current, selected];
    setBoard(next);
    setSelected(null);
    setFeedback(null);
  }

  function pull(pieceId) {
    const next = {};
    Object.entries(board).forEach(([id, arr]) => { next[id] = arr.filter((x) => x !== pieceId); });
    setBoard(next);
    setFeedback(null);
  }

  async function check() {
    setBusy(true);
    setErr(null);
    const nextAttempt = attempt + 1;
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStandard: publicCase.standard, action: "check", roundId: round.id, board, attempt: nextAttempt, challenge }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't check that build.");
      setAttempt(nextAttempt);
      if (data.perfect) {
        setFeedback(data);
        say("That is the paragraph. Read it back — it sounds like writing now.", "celebrating", 4000);
      } else if (publicCase.chain && nextAttempt >= 2) {
        setFeedback({ kept: true });
        say("Next, the ones you left out.", "helping");
      } else if (data.reveal) {
        // Second attempt: show the build rather than leaving a student stuck.
        setBoard(data.reveal);
        setFeedback({ ...data, revealed: true });
        say("I filled in the last pieces. Read it through — the order is the lesson.", "thinking");
      } else {
        // Wrong pieces go back to the tray with a reason attached.
        const wrong = new Set(data.results.filter((r) => !r.correct).map((r) => r.pieceId));
        const next = {};
        Object.entries(board).forEach(([slotId, arr]) => { next[slotId] = arr.filter((id) => !wrong.has(id)); });
        setBoard(next);
        setFeedback(data);
        say("Close. Read the notes on the ones that came back.", "helping");
      }
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  const noteFor = (pieceId) => {
    const r = feedback && feedback.results.find((x) => x.pieceId === pieceId && !x.correct);
    return r ? r.note : null;
  };
  const isCorrect = (pieceId) => !feedback?.kept && !!(feedback && feedback.results.find((x) => x.pieceId === pieceId && x.correct));

  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>
        🧩 PARAGRAPH {roundNumber} OF {publicCase.rounds.length}
      </div>
      <h2 style={{ fontSize: 22, margin: "6px 0 2px" }}>{round.label}</h2>
      <p style={{ color: THEME.muted, fontSize: 14.5, margin: "0 0 14px" }}>{round.goal}</p>
      <SourceCard source={publicCase.source} open={sourceOpen} onToggle={() => setSourceOpen((v) => !v)} />

      {/* the board */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {round.slots.map((slot) => {
          const ids = board[slot.id] || [];
          const capacity = slot.accepts || 1;
          const openSeat = ids.length < capacity;
          return (
            <div key={slot.id} style={{ border: `3px ${openSeat ? "dashed" : "solid"} ${openSeat && selected ? "#E0A322" : "rgba(14,154,168,0.45)"}`, borderRadius: 16, padding: "12px 14px", background: "#FFFFFF", boxShadow: openSeat && selected ? "0 0 0 4px rgba(224,163,34,0.35)" : "0 4px 0 rgba(14,154,168,0.12)" }}>
              <div style={{ fontSize: 11.5, letterSpacing: 1.2, fontWeight: 800, color: THEME.cursor, marginBottom: 6 }}>
                {slot.label.toUpperCase()}{capacity > 1 ? ` · ${ids.length}/${capacity}` : ""}
              </div>
              {ids.map((id) => {
                const piece = round.pieces.find((p) => p.id === id);
                const locked = isCorrect(id);
                return (
                  <button
                    key={id}
                    onClick={() => !locked && pull(id)}
                    aria-label={locked ? `Locked in ${slot.label}: ${piece.text}` : `Remove from ${slot.label}: ${piece.text}`}
                    style={{
                      display: "block", width: "100%", textAlign: "left", marginBottom: 6,
                      background: locked ? "#E5F8EE" : "#F7F4FF",
                      border: `3px solid ${locked ? THEME.done : THEME.violet}`,
                      boxShadow: locked ? "0 0 0 4px rgba(18,163,106,0.2)" : "0 3px 0 rgba(109,74,255,0.18)",
                      borderRadius: 10, padding: "9px 11px", color: THEME.text, fontSize: 15, lineHeight: 1.55,
                      fontFamily: "inherit", cursor: locked ? "default" : "pointer",
                    }}
                  >
                    {locked && <span style={{ color: THEME.done, fontWeight: 800 }}>✓ </span>}{piece.text}
                  </button>
                );
              })}
              {openSeat && (
                <button
                  onClick={() => place(slot.id)}
                  disabled={!selected}
                  style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: selected ? THEME.cursor : THEME.dim, fontSize: 14, fontFamily: "inherit", padding: "6px 2px", cursor: selected ? "pointer" : "default" }}
                >
                  {selected ? "↳ put the selected sentence here" : challenge ? "empty" : slot.hint}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ background: "linear-gradient(180deg, #E7F8FF, #F4FBFF)", border: "3px solid rgba(14,154,168,0.35)", borderRadius: 18, padding: "12px 12px 14px", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#0E7C8A", marginBottom: 8 }}>Tap a sentence. Then tap where it goes.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tray.map((piece) => {
            const note = noteFor(piece.id);
            const on = selected === piece.id;
            return (
              <div key={piece.id}>
                <button
                  onClick={() => setSelected(on ? null : piece.id)}
                  aria-pressed={on}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: on ? "#FFF3C4" : "#FFFFFF",
                    border: `3px solid ${on ? "#E0A322" : note ? THEME.error : "#D5E4F2"}`,
                    boxShadow: on ? "0 0 0 4px rgba(224,163,34,0.35)" : "0 3px 0 #D5E4F2",
                    borderRadius: 16, padding: "12px 14px", color: THEME.text, fontSize: 17, lineHeight: 1.5, fontFamily: "inherit", cursor: "pointer",
                  }}
                >
                  {piece.text}
                </button>
                {note && !feedback?.kept && <div style={{ color: "#9A3412", fontSize: 14, fontWeight: 700, margin: "6px 4px 0" }}>{note}</div>}
              </div>
            );
          })}
          {!tray.length && <div style={{ color: THEME.dim, fontSize: 14 }}>All the sentences are on the board.</div>}
        </div>
      </div>

      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {!feedback?.perfect && !feedback?.revealed && !feedback?.kept && (
        <button onClick={check} disabled={!full || busy} style={btn(THEME.done, !full || busy)}>
          {busy ? "Checking…" : attempt === 0 ? "Check this paragraph" : "Check again"}
        </button>
      )}
      {(feedback?.kept) && (
        <button onClick={() => onDone({ attempts: attempt, revealed: false })} style={btn(THEME.violet)}>
          Next
        </button>
      )}
      {(feedback?.perfect || feedback?.revealed) && (
        <>
          <div style={{ background: "rgba(57,217,122,0.12)", border: `3px solid ${THEME.done}`, borderRadius: 12, padding: "14px 16px", fontSize: 15.5, lineHeight: 1.75, marginBottom: 14 }}>
            <strong style={{ color: THEME.done }}>{feedback.revealed ? "Here is the finished paragraph." : "Paragraph built."}</strong>
            <div style={{ marginTop: 8 }}>{paragraphText(round, board)}</div>
          </div>
          <button onClick={() => onDone({ attempts: attempt, revealed: !!feedback.revealed })} style={btn(THEME.violet)}>
            Now the leftovers →
          </button>
        </>
      )}
      {!full && attempt === 0 && <div style={{ color: THEME.dim, fontSize: 13, marginTop: 8 }}>Fill every slot to check.</div>}
    </Panel>
  );
}

// ======================================================================
// REJECTS — why didn't these belong?
// ======================================================================
function RejectRound({ publicCase, round, roundNumber, board, rejections, setRejections, onDone, onGraded, challenge }) {
  const say = useSay();
  const [feedback, setFeedback] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [kept, setKept] = useState(false);
  const [hint, setHint] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const placed = useMemo(() => new Set(Object.values(board || {}).flat()), [board]);
  const leftovers = round.pieces.filter((p) => !placed.has(p.id));
  const options = reasonChipsFor(round, challenge);
  const answered = leftovers.every((p) => rejections[p.id]);

  useEffect(() => { say(publicCase.chain ? "Why was each of these left out?" : "This is the part that counts. Why did each one fail to make the paragraph?", "thinking"); }, [say, round.id, publicCase.chain]);

  async function check() {
    const next = attempt + 1;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStandard: publicCase.standard, action: "rejects", roundId: round.id, rejections, challenge }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't check those.");
      setAttempt(next);
      if (publicCase.chain && !data.perfect && next >= 2) {
        setKept(true);
        setHint("");
        setFeedback(null);
        if (onGraded) onGraded(data.results.map((r) => ({ pieceId: r.pieceId, correct: r.correct })));
        say("Okay. Next.", "helping");
      } else if (publicCase.chain && !data.perfect) {
        setHint("Not yet. Read the sentence next to the notes, then pick a different reason.");
        say("Try once more. The notes are the check.", "helping");
      } else {
        setFeedback(data);
        if (onGraded) onGraded(data.results);
        say(data.perfect ? "Both of them, exactly right." : "Read what each one really was — that is the skill.", data.perfect ? "celebrating" : "helping", 3500);
      }
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  return (
    <Panel>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#0E7C8A", marginBottom: 4 }}>{publicCase.chain ? "Left out" : "🗑️ The leftovers"} · paragraph {roundNumber}</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 12px" }}>{round.rejectPrompt}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
        {leftovers.map((piece) => {
          const chosen = rejections[piece.id];
          const result = feedback && feedback.results.find((r) => r.pieceId === piece.id);
          return (
            <div key={piece.id} style={{ background: "#FFFFFF", borderRadius: 16, padding: "16px", border: "3px solid #C5D8EA", boxShadow: "0 3px 0 #D5E4F2" }}>
              <div style={{ fontSize: 18, lineHeight: 1.55, fontWeight: 750, color: "#1F2A44", marginBottom: 12 }}>{piece.text}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {options.map((opt) => {
                  const on = chosen === opt.key;
                  const rightAnswer = result && result.correctReason === opt.key;
                  return (
                    <button
                      key={opt.key}
                      disabled={!!feedback}
                      onClick={() => setRejections({ ...rejections, [piece.id]: opt.key })}
                      style={{
                        background: rightAnswer ? "#E5F8EE" : on ? "#FFF3C4" : "#F7FBFF",
                        border: `3px solid ${rightAnswer ? THEME.done : on ? "#E0A322" : "#D5E4F2"}`,
                        borderRadius: 14, padding: "12px 14px", color: "#1F2A44", fontSize: 16, lineHeight: 1.45, fontWeight: 700, fontFamily: "inherit", cursor: feedback ? "default" : "pointer", textAlign: "left",
                      }}
                    >
                      {rightAnswer ? "✓ " : ""}{opt.label}
                    </button>
                  );
                })}
              </div>
              {result && !publicCase.chain && (result.why || result.protest) && (
                <div style={{ marginTop: 12, borderLeft: `3px solid ${THEME.border}`, paddingLeft: 12 }}>
                  {result.protest && (
                    <div style={{ fontSize: 13.5, color: THEME.cursor, fontStyle: "italic", lineHeight: 1.6 }}>
                      🗯️ {result.protest}
                    </div>
                  )}
                  {result.why && (
                    <div style={{ marginTop: 6, fontSize: 13.5, color: result.correct ? THEME.done : THEME.muted, lineHeight: 1.6 }}>
                      <strong>S.A.M.:</strong> {result.correct ? "Right. " : ""}{result.why}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {hint && <div style={{ color: "#9A3412", fontWeight: 700, fontSize: 14.5, marginBottom: 10 }}>{hint}</div>}
      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {!feedback && !kept ? (
        <button onClick={check} disabled={!answered || busy} style={btn(THEME.done, !answered || busy)}>
          {busy ? "Checking…" : attempt === 0 ? "Check my reasons" : "Check again"}
        </button>
      ) : (
        <button onClick={onDone} style={btn(THEME.violet)}>
          {publicCase.repair && round.id === publicCase.repair.roundId
            ? "Look at the chain →"
            : roundNumber < publicCase.rounds.length ? "Next paragraph →" : "Put the paragraphs in order →"}
        </button>
      )}
    </Panel>
  );
}

// ======================================================================
// ASSEMBLY — the finished paragraphs, in order
// ======================================================================
function shuffleRounds(rounds) {
  const list = [...rounds];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  const same = list.every((round, i) => round.id === rounds[i].id);
  if (same && list.length > 1) return [list[list.length - 1], ...list.slice(0, -1)];
  return list;
}

function AssemblyRound({ publicCase, boards, assembly, setAssembly, onDone }) {
  const say = useSay();
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [kept, setKept] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [deck] = useState(() => shuffleRounds(publicCase.rounds));

  const used = new Set(Object.values(assembly));
  const unplaced = deck.filter((r) => !used.has(r.id));
  const complete = publicCase.assembly.slots.every((s) => assembly[s.id]);

  useEffect(() => { say("Every paragraph is built. Now: what order does a reader actually need them in?", "thinking"); }, [say]);

  function place(slotId) {
    if (!selected) return;
    const next = { ...assembly };
    Object.keys(next).forEach((k) => { if (next[k] === selected) delete next[k]; });
    next[slotId] = selected;
    setAssembly(next);
    setSelected(null);
    setFeedback(null);
  }

  async function check() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStandard: publicCase.standard, action: "assembly", assembly }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't check the order.");
      if (publicCase.chain && !data.perfect) {
        const next = attempt + 1;
        setAttempt(next);
        if (next >= 2) {
          setKept(true);
          setFeedback(null);
          say("Okay. On we go.", "helping");
        } else {
          setFeedback({ hintOnly: true });
          say("Not that order. What should a reader know first?", "helping");
        }
      } else {
        setFeedback(data);
        say(data.perfect ? "That is the order. Now tell me why the rest didn't make it." : "Not quite — think about what a reader needs first.", data.perfect ? "celebrating" : "helping", 3500);
      }
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>📚 ASSEMBLE THE PIECE</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 4px" }}>{publicCase.assembly.prompt}</h2>
      <p style={{ color: THEME.muted, fontSize: 14, margin: "0 0 14px" }}>{publicCase.assembly.hint}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {publicCase.assembly.slots.map((slot) => {
          const roundId = assembly[slot.id];
          const round = roundId ? getRound(publicCase, roundId) : null;
          const result = feedback && !feedback.hintOnly && feedback.results && feedback.results.find((r) => r.slotId === slot.id);
          return (
            <div key={slot.id} style={{ border: `1px ${round ? "solid" : "dashed"} ${result ? (result.correct ? THEME.done : THEME.error) : selected && !round ? THEME.cursor : THEME.border}`, borderRadius: 14, padding: "10px 12px", background: THEME.inset }}>
              <div style={{ fontSize: 11.5, letterSpacing: 1.2, fontWeight: 800, color: THEME.cursor, marginBottom: 6 }}>{slot.label.toUpperCase()}</div>
              {round ? (
                <button
                  onClick={() => {
                    // A wrong order has to stay changeable — the check is
                    // feedback, not a lock. Only a correct, finished order
                    // freezes the board.
                    if (feedback && feedback.perfect) return;
                    const next = { ...assembly };
                    delete next[slot.id];
                    setAssembly(next);
                    setFeedback(null);
                  }}
                  style={{ display: "block", width: "100%", textAlign: "left", background: "rgba(123,93,255,0.15)", border: "none", borderRadius: 10, padding: "8px 10px", color: THEME.text, fontFamily: "inherit", cursor: feedback && feedback.perfect ? "default" : "pointer" }}
                >
                  <strong style={{ fontSize: 14 }}>{round.label}</strong>
                  <div style={{ color: THEME.muted, fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>{paragraphText(round, boards[round.id])}</div>
                </button>
              ) : (
                <button onClick={() => place(slot.id)} disabled={!selected} style={{ background: "none", border: "none", color: selected ? THEME.cursor : THEME.dim, fontSize: 14, fontFamily: "inherit", padding: "4px 2px", cursor: selected ? "pointer" : "default" }}>
                  {selected ? "↳ put the selected paragraph here" : "empty"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!!unplaced.length && (
        <>
          <div style={{ fontSize: 11.5, letterSpacing: 1.4, fontWeight: 800, color: THEME.muted, marginBottom: 8 }}>YOUR PARAGRAPHS · tap one, then tap its place</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {unplaced.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(selected === r.id ? null : r.id)}
                aria-pressed={selected === r.id}
                style={{ textAlign: "left", background: selected === r.id ? "#FFF3C4" : "#FFFFFF", border: `3px solid ${selected === r.id ? "#E0A322" : "#D5E4F2"}`, boxShadow: selected === r.id ? "0 0 0 4px rgba(224,163,34,0.35)" : "0 3px 0 #D5E4F2", borderRadius: 16, padding: "12px 14px", color: THEME.text, fontFamily: "inherit", cursor: "pointer" }}
              >
                <strong style={{ fontSize: 14 }}>{r.label}</strong>
                <div style={{ color: THEME.muted, fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>{paragraphText(r, boards[r.id])}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {feedback && feedback.hintOnly && (
        <div style={{ color: "#9A3412", fontWeight: 700, fontSize: 14.5, marginBottom: 12 }}>Not that order. Think about what a reader needs to know first, then try once more.</div>
      )}
      {feedback && feedback.note && (
        <div style={{ background: "rgba(57,217,122,0.12)", border: `1px solid ${THEME.done}`, borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.65, marginBottom: 12 }}>{feedback.note}</div>
      )}
      {!feedback?.perfect && !kept ? (
        <button onClick={check} disabled={!complete || busy} style={btn(THEME.done, !complete || busy)}>
          {busy ? "Checking…" : feedback ? "Try this order" : "Check the order"}
        </button>
      ) : (
        <button onClick={onDone} style={btn(THEME.violet)}>One more thing →</button>
      )}
    </Panel>
  );
}

// ======================================================================
// EDITOR'S TRAP — S.A.M. slips one bad sentence into a finished paragraph
// ======================================================================
function TrapRound({ publicCase, boards, challenge, onDone, embedded }) {
  const say = useSay();
  const [dared, setDared] = useState(!!challenge || !!embedded);
  const [data, setData] = useState(null);
  const [picked, setPicked] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [tries, setTries] = useState(0);
  const [hint, setHint] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const told = useRef(false);

  useEffect(() => {
    if (embedded || dared) return undefined;
    say("One more thing, Cadet. Want to see if I can fool you?", "thinking");
  }, [say, dared, embedded]);

  const call = useCallback(async (payload) => {
    const res = await fetch("/api/assembly-deck/submit", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseStandard: publicCase.standard, boards, ...payload }),
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error || "The trap misfired.");
    return d;
  }, [publicCase.standard, boards]);

  useEffect(() => {
    let cancelled = false;
    if (!dared || data) return undefined;
    call({ action: "trap" }).then((d) => { if (!cancelled) { setData(d); if (!embedded) say("I hid one sentence of mine in your paragraph. Find it.", "helping"); } }, (e) => setErr(e.message));
    return () => { cancelled = true; };
  }, [dared, data, call, say]);

  async function answer() {
    setBusy(true); setErr(null);
    try {
      const d = await call({ action: "trapAnswer", chosenIndex: picked });
      if (embedded && !d.correct && tries < 1) {
        setTries(1);
        setPicked(null);
        setHint("Not that one. Try once more.");
        say("Not that one. Look again.", "helping", 2500);
      } else {
        setVerdict(embedded ? { correct: !!d.correct } : d);
        setHint("");
        if (embedded && !told.current) {
          told.current = true;
          onDone(!!d.correct);
        }
        say(d.correct ? "Caught it." : embedded ? "Okay. On to the next check." : "That one was yours. Mine is the one still highlighted.", d.correct ? "celebrating" : "thinking", 3000);
      }
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  if (!dared) {
    return (
      <Panel>
        <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.cursor, fontWeight: 700 }}>🎭 EDITOR&apos;S TRAP · OPTIONAL</div>
        <h2 style={{ fontSize: 21, margin: "6px 0 8px" }}>Want to see if I can fool you?</h2>
        <p style={{ color: THEME.muted, fontSize: 15, lineHeight: 1.7, margin: "0 0 16px" }}>
          I&apos;ll slip one sentence of my own into a paragraph you built. If you spot it, that&apos;s +2 💎. If you don&apos;t, nothing happens except I get to feel clever.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => setDared(true)} style={btn(THEME.cursor)}>Try me →</button>
          <button onClick={() => onDone(false)} style={{ ...btn(THEME.inset), color: THEME.muted, border: `1px solid ${THEME.border}` }}>Skip it</button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.cursor, fontWeight: 700 }}>{embedded ? "1 · SPOT THE FAKE" : "EDITOR TRAP"}</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 4px" }}>One of these sentences is mine. Which one?</h2>
      <p style={{ color: THEME.muted, fontSize: 14, margin: "0 0 14px" }}>{data ? data.label : "Loading the paragraph…"}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {(data ? data.sentences : []).map((text, i) => {
          const on = picked === i;
          const isTrap = !embedded && verdict && verdict.position === i;
          return (
            <button
              key={i}
              disabled={!!verdict}
              onClick={() => setPicked(i)}
              aria-pressed={on}
              style={{
                textAlign: "left",
                background: isTrap ? "rgba(255,90,110,0.18)" : on ? "rgba(255,196,77,0.2)" : THEME.chip,
                border: `1px solid ${isTrap ? THEME.error : on ? THEME.cursor : "transparent"}`,
                borderRadius: 10, padding: "10px 12px", color: THEME.text, fontSize: 15, lineHeight: 1.6, fontFamily: "inherit",
                cursor: verdict ? "default" : "pointer",
              }}
            >
              {isTrap ? "🎭 " : ""}{text}
            </button>
          );
        })}
      </div>
      {hint && !verdict && <div style={{ color: "#9A3412", fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{hint}</div>}
      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {!verdict ? (
        <button onClick={answer} disabled={picked === null || busy} style={btn(THEME.done, picked === null || busy)}>
          {busy ? "Checking…" : tries === 0 ? "That one" : "Check again"}
        </button>
      ) : (
        <>
          <div style={{ background: verdict.correct ? "rgba(57,217,122,0.12)" : THEME.inset, border: `1px solid ${verdict.correct ? THEME.done : THEME.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.7, marginBottom: embedded ? 0 : 14 }}>
            <strong style={{ color: verdict.correct ? THEME.done : THEME.cursor }}>{verdict.correct ? "Caught it. +2 💎" : "Okay."}</strong>
            {!embedded && verdict.why && <div style={{ marginTop: 6, color: THEME.muted }}>{verdict.why}</div>}
          </div>
          {!embedded && <button onClick={() => onDone(verdict.correct)} style={btn(THEME.violet)}>On to the debrief →</button>}
        </>
      )}
    </Panel>
  );
}

// ======================================================================
// CHIEF'S DEBRIEF — tap the line, then one multiple choice (Emily, Sept 22)
// ======================================================================
// The case used to end on the leftovers twice: sort them three times, then
// write about them. This screen asks about the report the student actually
// built. Question one is a hotspot — every sentence in the finished report is
// tappable. Question two is a single multiple choice on the standard. Question
// two does not appear until question one has been answered, so the screen is
// never a wall of questions.
function Debrief({ publicCase, boards, assembly, pinpoint, setPinpoint, quick, setQuick, onDone, embedded }) {
  const say = useSay();
  const [picked, setPicked] = useState(null);
  const [choice, setChoice] = useState(null);
  const [pinTries, setPinTries] = useState(0);
  const [quickTries, setQuickTries] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const spec = publicCase.debrief || {};
  const part = useRef({ pin: false, quick: !(spec.quickCheck) });
  const sent = useRef(false);
  function mark(which) {
    part.current[which] = true;
    if (embedded && !sent.current && part.current.pin && part.current.quick) {
      sent.current = true;
      onDone();
    }
  }
  const report = useMemo(() => assembledReport(publicCase, boards, assembly), [publicCase, boards, assembly]);

  useEffect(() => { if (!embedded) say("Debrief, Cadet. Two questions about the report you just built.", "thinking"); }, [say, embedded]);

  async function ask(action, payload, setter, onOk) {
    setBusy(true); setErr(null);
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStandard: publicCase.standard, action, ...payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't check that.");
      setter({ ...data, ...payload });
      onOk(data);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>{embedded ? "3 · TWO QUICK QUESTIONS" : "CHIEF DEBRIEF"}</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 4px" }}>{spec.pinpoint ? spec.pinpoint.prompt : "Find it in your report."}</h2>
      {spec.pinpoint && spec.pinpoint.hint && (
        <p style={{ color: THEME.muted, fontSize: 14, margin: "0 0 14px" }}>{spec.pinpoint.hint}</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
        {report.map((para) => (
          <div key={para.roundId}>
            <div style={{ fontSize: 11.5, letterSpacing: 1.2, fontWeight: 800, color: THEME.cursor, marginBottom: 6 }}>{para.label.toUpperCase()}</div>
            {para.sentences.map((s) => {
              const on = picked === s.pieceId;
              const chosenAndWrong = pinpoint && pinpoint.pinpointPieceId === s.pieceId && !pinpoint.correct;
              const chosenAndRight = pinpoint && pinpoint.pinpointPieceId === s.pieceId && pinpoint.correct;
              return (
                <button
                  key={s.pieceId}
                  disabled={!!pinpoint}
                  onClick={() => setPicked(on ? null : s.pieceId)}
                  aria-pressed={on}
                  style={{
                    display: "block", width: "100%", textAlign: "left", marginBottom: 6,
                    background: chosenAndRight ? "rgba(57,217,122,0.2)" : chosenAndWrong ? "rgba(255,90,110,0.16)" : on ? "rgba(255,196,77,0.2)" : THEME.chip,
                    border: `1px solid ${chosenAndRight ? THEME.done : chosenAndWrong ? THEME.error : on ? THEME.cursor : "transparent"}`,
                    borderRadius: 10, padding: "10px 12px", color: THEME.text, fontSize: 15, lineHeight: 1.6,
                    fontFamily: "inherit", cursor: pinpoint ? "default" : "pointer",
                  }}
                >
                  {chosenAndRight ? "✓ " : chosenAndWrong ? "✗ " : ""}{s.text}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {pinpoint && pinpoint.why && (
        <div style={{ background: pinpoint.correct ? "rgba(57,217,122,0.12)" : THEME.inset, border: `1px solid ${pinpoint.correct ? THEME.done : THEME.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.7, marginBottom: 16 }}>
          <strong style={{ color: pinpoint.correct ? THEME.done : THEME.cursor }}>{pinpoint.correct ? "That's the one. +1 💎" : "Not that one."}</strong>
          <div style={{ marginTop: 6, color: THEME.muted }}>{pinpoint.why}</div>
        </div>
      )}

      {!pinpoint && (
        <button
          onClick={() => ask("pinpoint", { pinpointPieceId: picked }, setPinpoint, (d) => {
            say(d.correct ? "That is the sentence." : "Try once more. The question tells you what to look for.", d.correct ? "celebrating" : "helping", 2500);
            if (d.correct || pinTries >= 1) mark("pin");
          })}
          disabled={!picked || busy}
          style={btn(THEME.done, !picked || busy)}
        >
          {busy ? "Checking…" : pinTries === 0 ? "That sentence" : "Check again"}
        </button>
      )}
      {publicCase.chain && pinpoint && !pinpoint.correct && pinTries < 1 && (
        <button onClick={() => { setPinTries(1); setPinpoint(null); setPicked(null); }} style={{ ...btn(THEME.violet), marginBottom: 12 }}>Try a different sentence</button>
      )}

      {/* question two only opens once question one is answered */}
      {(embedded || pinpoint) && spec.quickCheck && (
        <>
          <div style={{ borderTop: `1px solid ${THEME.border}`, margin: "4px 0 16px" }} />
          <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>QUESTION 2 OF 2</div>
          <h2 style={{ fontSize: 20, margin: "6px 0 12px" }}>{spec.quickCheck.prompt}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {spec.quickCheck.choices.map((c) => {
              const on = choice === c.id;
              const isKey = !publicCase.chain && quick && quick.key === c.id;
              const wrongPick = quick && quick.choiceId === c.id && !quick.correct;
              return (
                <button
                  key={c.id}
                  disabled={!!quick}
                  onClick={() => setChoice(on ? null : c.id)}
                  aria-pressed={on}
                  style={{
                    textAlign: "left",
                    background: isKey ? "rgba(57,217,122,0.2)" : wrongPick ? "rgba(255,90,110,0.16)" : on ? "rgba(255,196,77,0.2)" : THEME.chip,
                    border: `1px solid ${isKey ? THEME.done : wrongPick ? THEME.error : on ? THEME.cursor : "transparent"}`,
                    borderRadius: 10, padding: "10px 12px", color: THEME.text, fontSize: 15, lineHeight: 1.6, fontFamily: "inherit",
                    cursor: quick ? "default" : "pointer",
                  }}
                >
                  {isKey ? "✓ " : wrongPick ? "✗ " : ""}{c.text}
                </button>
              );
            })}
          </div>
          {quick && (
            <div style={{ background: quick.correct ? "rgba(57,217,122,0.12)" : THEME.inset, border: `1px solid ${quick.correct ? THEME.done : THEME.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.7, marginBottom: 16 }}>
              <strong style={{ color: quick.correct ? THEME.done : THEME.cursor }}>{quick.correct ? "Right. +1 💎" : "Not quite."}</strong>
              {quick.why && <div style={{ marginTop: 6, color: THEME.muted }}>{quick.why}</div>}
              {!quick.correct && quick.keyWhy && <div style={{ marginTop: 6, color: THEME.muted }}>{quick.keyWhy}</div>}
            </div>
          )}
          {!quick ? (
            <button
              onClick={() => ask("quickCheck", { quickCheckChoiceId: choice }, setQuick, (d) => {
                say(d.correct ? "Good." : "Try once more if you have it.", d.correct ? "celebrating" : "helping", 2500);
                if (d.correct || quickTries >= 1) mark("quick");
              })}
              disabled={!choice || busy}
              style={btn(THEME.done, !choice || busy)}
            >
              {busy ? "Checking…" : "Lock it in"}
            </button>
          ) : publicCase.chain && !quick.correct && quickTries < 1 ? (
            <button onClick={() => { setQuickTries(1); setQuick(null); setChoice(null); }} style={btn(THEME.violet)}>Try again</button>
          ) : !embedded ? (
            <button onClick={onDone} style={btn(THEME.violet)}>Last question →</button>
          ) : null}
        </>
      )}

      {/* a case authored before the debrief existed still has to be finishable */}
      {pinpoint && !spec.quickCheck && (
        <button onClick={onDone} style={btn(THEME.violet)}>Last question →</button>
      )}

      {err && <div style={{ color: THEME.error, fontSize: 13, marginTop: 10 }}>{err}</div>}
    </Panel>
  );
}

// ======================================================================
// EXPLAIN
// ======================================================================
function Explain({ publicCase, text, setText, onSubmit, busy, err }) {
  const say = useSay();
  const writing = publicCase.explain || {};
  const starters = writing.starters || [];
  const checks = writing.checks || [];
  const [checked, setChecked] = useState(() => checks.map(() => false));
  const checkedCount = checked.filter(Boolean).length;
  useEffect(() => { say(starters.length ? "Use a starter if you want one. Then check off your writing." : "Last thing. Say it the way you would say it out loud.", "helping"); }, [say, starters.length]);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const ready = words >= 8 && (checks.length === 0 || checkedCount >= 3);
  function addStarter(line) {
    setText((cur) => {
      const base = cur && cur.trim() ? cur.replace(/\s+$/, "") + " " : "";
      return base + line + " ";
    });
  }
  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>✍️ ONE LAST QUESTION</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 10px" }}>{writing.prompt}</h2>
      {!!starters.length && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#0E7C8A", marginBottom: 8 }}>Sentence starters</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {starters.map((line) => (
              <button key={line} type="button" onClick={() => addStarter(line)} style={{ background: "#FFF3C4", border: "3px solid #E0A322", borderRadius: 14, padding: "10px 12px", color: "#1F2A44", fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                {line}…
              </button>
            ))}
          </div>
        </div>
      )}
      {!starters.length && (
        <ul style={{ margin: "0 0 14px", paddingLeft: 20, color: THEME.muted, fontSize: 14, lineHeight: 1.8 }}>
          {(writing.criteria || []).map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Write your paragraph…"
        style={{ width: "100%", background: "#FFFFFF", border: "3px solid #D5E4F2", borderRadius: 16, padding: 14, color: "#1F2A44", fontSize: 17, lineHeight: 1.7, fontFamily: "inherit", resize: "vertical" }}
      />
      <div style={{ color: THEME.dim, fontSize: 12.5, margin: "6px 0 14px" }}>{words} word{words === 1 ? "" : "s"}</div>
      {!!checks.length && (
        <div style={{ background: "#F4FBFF", border: "3px solid rgba(14,154,168,0.35)", borderRadius: 16, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#0E7C8A", marginBottom: 8 }}>Writing check · {checkedCount} of {checks.length} · need 3</div>
          {checks.map((item, i) => (
            <button key={item} type="button" onClick={() => setChecked((cur) => cur.map((on, n) => n === i ? !on : on))} style={{ display: "flex", gap: 10, alignItems: "flex-start", width: "100%", textAlign: "left", background: checked[i] ? "#E5F8EE" : "#FFFFFF", border: `3px solid ${checked[i] ? THEME.done : "#D5E4F2"}`, borderRadius: 12, padding: "10px 12px", marginBottom: 8, color: "#1F2A44", fontSize: 16, lineHeight: 1.45, fontFamily: "inherit", cursor: "pointer" }}>
              <span style={{ fontWeight: 800 }}>{checked[i] ? "✓" : "○"}</span>
              <span>{item}</span>
            </button>
          ))}
        </div>
      )}
      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      <button onClick={() => onSubmit()} disabled={!ready || busy} style={btn(THEME.done, !ready || busy)}>
        {busy ? "Sending…" : "Submit"}
      </button>
      {!ready && <div style={{ color: THEME.dim, fontSize: 13, marginTop: 8 }}>{checks.length ? "Write a few sentences and check at least 3." : "A sentence or two, at least."}</div>}
    </Panel>
  );
}

const FEELINGS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

function Feel({ onPick, busy, err }) {
  const say = useSay();
  useEffect(() => { say("Before you go. How did that one feel?", "thinking"); }, [say]);
  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>AFTER YOU SUBMIT</div>
      <h2 style={{ fontSize: 24, margin: "6px 0 14px" }}>How do you feel about this one?</h2>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {FEELINGS.map((item) => (
          <button key={item.id} type="button" disabled={busy} onClick={() => onPick(item.id)} style={{ flex: "1 1 140px", background: "#FFFFFF", border: "3px solid #D5E4F2", borderRadius: 16, padding: "16px 10px", color: "#1F2A44", fontWeight: 800, fontSize: 16, fontFamily: "inherit", cursor: busy ? "default" : "pointer" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{item.emoji}</div>
            {item.label}
          </button>
        ))}
      </div>
      {err && <div style={{ color: THEME.error, fontSize: 13, marginTop: 12 }}>{err}</div>}
    </Panel>
  );
}

// ======================================================================
// DONE
// ======================================================================
function Done({ publicCase, boards, assembly, result }) {
  const say = useSay();
  useEffect(() => { say("Report delivered, Cadet. Look what you built.", "celebrating"); }, [say]);
  const ordered = (publicCase.assembly.slots || []).map((s) => getRound(publicCase, (assembly || {})[s.id])).filter(Boolean);
  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.done, fontWeight: 700 }}>✅ REPORT DELIVERED</div>
      <h1 style={{ fontSize: 26, margin: "8px 0 14px" }}>{publicCase.title}</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        <Stat label="Sentences placed" value={`${result.placement.correct}/${result.placement.total}`} />
        <Stat label="Leftovers explained" value={`${result.decoys.correct}/${result.decoys.total}`} />
        <Stat label="Paragraph order" value={`${result.assemblyScore.correct}/${result.assemblyScore.total}`} />
        {result.pinpoint && <Stat label="Pinpoint" value={result.pinpoint.correct ? "✓ Found it" : "Missed"} accent={result.pinpoint.correct ? THEME.done : THEME.muted} />}
        {result.quickCheck && <Stat label="Quick check" value={result.quickCheck.correct ? "✓ Right" : "Missed"} accent={result.quickCheck.correct ? THEME.done : THEME.muted} />}
        {result.whatIf && <Stat label="What if" value={result.whatIf.correct ? "✓ Used the chain" : "Missed"} accent={result.whatIf.correct ? THEME.done : THEME.muted} />}
        {result.repair && <Stat label="Repair" value={result.repair.correct ? "✓ Fixed it" : "Missed"} accent={result.repair.correct ? THEME.done : THEME.muted} />}
        {result.crystalsEarned > 0 && <Stat label="Crystals" value={`+${result.crystalsEarned} 💎`} accent={THEME.cursor} />}
        {result.challenge && <Stat label="Mode" value="⚡ Challenge" accent={THEME.cursor} />}
        {result.trapCaught && <Stat label="Editor's Trap" value="🎭 Caught" accent={THEME.done} />}
      </div>

      {result.reply && result.reply.text && (
        <div style={{ background: "rgba(123,93,255,0.14)", border: `1px solid ${THEME.violet}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 12, letterSpacing: 1.4, fontWeight: 800, color: THEME.violet, marginBottom: 8 }}>
            {result.reply.emoji} {result.reply.name.toUpperCase()} WROTE BACK
          </div>
          <div style={{ fontSize: 15.5, lineHeight: 1.75 }}>{result.reply.text}</div>
        </div>
      )}

      {(result.glows || []).length > 0 && (
        <div style={{ background: "rgba(0,194,199,0.12)", border: `1px solid ${THEME.teal}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 12, letterSpacing: 1.4, fontWeight: 800, color: THEME.teal, marginBottom: 8 }}>S.A.M. READ YOUR WRITING</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, lineHeight: 1.75 }}>
            {result.glows.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
          {result.grow && <div style={{ marginTop: 10, color: THEME.cursor, fontSize: 15 }}>Next step: {result.grow}</div>}
        </div>
      )}

      <div style={{ background: THEME.inset, borderRadius: 14, padding: "16px 18px" }}>
        <div style={{ fontSize: 12, letterSpacing: 1.4, fontWeight: 800, color: THEME.muted, marginBottom: 10 }}>WHAT YOU BUILT</div>
        {ordered.map((r) => (
          <p key={r.id} style={{ fontSize: 15.5, lineHeight: 1.8, margin: "0 0 12px" }}>{paragraphText(r, boards[r.id])}</p>
        ))}
      </div>
      {result.assemblyNote && <div style={{ color: THEME.muted, fontSize: 13.5, marginTop: 12, lineHeight: 1.6 }}>Why this order: {result.assemblyNote}</div>}
    </Panel>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div style={{ background: THEME.inset, borderRadius: 12, padding: "10px 14px", minWidth: 120 }}>
      <div style={{ fontSize: 11.5, letterSpacing: 1, color: THEME.muted }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: accent || THEME.text }}>{value}</div>
    </div>
  );
}

// ======================================================================
// POND — a power line. Paragraphs open the next stretch. A cut drops
// everything downstream. Leftovers never talk; they just refuse to seat.
// ======================================================================
function PondBoard({ chain, locked, scenario, cutStep, guess }) {
  if (!chain) return null;
  const testing = scenario === "cut-test";
  const broken = !testing && locked.includes(chain.breakOn);
  const cutAt = chain.links.findIndex((link) => link.id === "plants");
  function lit(link, index) {
    const earned = testing || locked.includes(link.on);
    if (!earned) return false;
    if (broken && link.breakLabel && link.id !== "plants" && link.id !== "sun") return false;
    if (testing && cutStep >= 0 && index >= cutAt) {
      if (index === cutAt) return false;
      if (link.id === "minnows") return cutStep < 1;
      if (link.id === "herons") return cutStep < 2;
      return cutStep < 1;
    }
    return true;
  }
  const status = testing && cutStep >= 2
    ? "Plants cut. Minnows dark. Herons dark."
    : testing && cutStep >= 0
    ? "Cutting the plants…"
    : testing
    ? "Line is live. Mark who you think goes dark."
    : broken
    ? chain.breakLine
    : "Power moves along the line as each paragraph locks.";
  return (
    <div style={{ width: "100%", maxWidth: 900, background: "rgba(255,255,255,0.92)", border: "1px solid rgba(14,154,168,0.32)", borderRadius: 22, padding: "14px 16px 16px", boxShadow: "0 12px 30px rgba(14,120,140,0.12)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, letterSpacing: 1.6, fontWeight: 800, color: "#0E7C8A" }}>{String(chain.title || "Pond").toUpperCase()}</div>
        <div style={{ fontSize: 13.5, color: "#3D6B78", lineHeight: 1.4 }}>{status}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 16, overflowX: "auto" }}>
        {chain.links.map((link, i) => {
          const on = lit(link, i);
          const nextOn = i < chain.links.length - 1 && lit(chain.links[i + 1], i + 1);
          const marked = (guess || []).includes(link.id);
          const thick = broken && link.id === "plants";
          const fill = link.id === "sun" ? "#FFE08A" : link.id === "plants" ? "#8BE0A4" : link.id === "minnows" ? "#8ECAFF" : "#D4C6FF";
          return (
            <div key={link.id} style={{ display: "flex", alignItems: "center", flex: "1 1 0", minWidth: 88 }}>
              <div style={{ textAlign: "center", width: 78, flexShrink: 0 }}>
                <div style={{
                  width: thick ? 58 : 52, height: thick ? 58 : 52, margin: "0 auto", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  background: on ? fill : "#EEF2F6",
                  border: `3px solid ${marked ? "#E0A322" : on ? "#0E9AA8" : "#D5DEE8"}`,
                  boxShadow: on ? "0 0 16px rgba(14,154,168,0.35)" : "none",
                  filter: on ? "none" : "grayscale(0.7)",
                  transition: "background .4s, box-shadow .4s, filter .4s, border-color .2s",
                }}>{link.mark}</div>
                <div style={{ marginTop: 6, fontSize: 12.5, fontWeight: 800, color: on ? "#1F2A44" : "#8B95A8" }}>
                  {broken && link.breakLabel ? link.breakLabel : link.label}
                </div>
              </div>
              {i < chain.links.length - 1 && (
                <div style={{ flex: 1, height: 8, margin: "0 2px 18px", borderRadius: 99, background: on && nextOn ? "linear-gradient(90deg, #7DDEE8, #12A36A)" : "#D5DEE8", boxShadow: on && nextOn ? "0 0 10px rgba(14,154,168,0.45)" : "none", transition: "background .4s, box-shadow .4s" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RepairRound({ publicCase, onDone, onPick }) {
  const say = useSay();
  const look = publicCase.look;
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  useEffect(() => { say("Look at the picture. Pick the sentence the chain actually shows.", "helping"); }, [say]);

  async function check() {
    const next = attempt + 1;
    setAttempt(next);
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStandard: publicCase.standard, action: "look", lookChoiceId: choice, attempt: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't check that.");
      if (onPick) onPick(choice);
      if (data.correct || data.kept) setFeedback(data);
      else setFeedback({ hint: data.why });
      say(data.correct ? "That sentence matches the picture." : data.kept ? "Okay. Next." : "Look at the arrows and try once more.", data.correct ? "celebrating" : "helping", 3500);
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  if (!look) return null;
  const done = feedback && (feedback.correct || feedback.kept);
  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>LOOK AT THE CHAIN</div>
      <h2 style={{ fontSize: 22, margin: "6px 0 12px" }}>{look.prompt}</h2>
      <img src={look.image} alt="Sun, pond plants, minnows, and a heron, with arrows from one to the next." style={{ width: "100%", borderRadius: 16, border: "3px solid rgba(14,154,168,0.35)", marginBottom: 8 }} />
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: 13, fontWeight: 800, color: "#0E7C8A", marginBottom: 14 }}>
        <span>Sun</span><span>Plants</span><span>Minnows</span><span>Heron</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {look.choices.map((item) => {
          const on = choice === item.id;
          return (
            <button
              key={item.id}
              disabled={!!done}
              onClick={() => { setChoice(item.id); setFeedback(null); }}
              style={{
                textAlign: "left",
                background: on ? "#FFF3C4" : "#FFFFFF",
                border: `3px solid ${on ? "#E0A322" : "#D5E4F2"}`,
                boxShadow: on ? "0 0 0 4px rgba(224,163,34,0.35)" : "0 3px 0 #D5E4F2",
                borderRadius: 16, padding: "12px 14px", color: THEME.text, fontSize: 16, lineHeight: 1.5, fontFamily: "inherit", cursor: done ? "default" : "pointer",
              }}
            >
              {item.text}
            </button>
          );
        })}
      </div>
      {err && <div style={{ color: THEME.error, fontSize: 13, marginTop: 10 }}>{err}</div>}
      {feedback && feedback.hint && <div style={{ color: "#9A3412", fontWeight: 700, fontSize: 14.5, marginTop: 12 }}>{feedback.hint}</div>}
      {feedback && feedback.why && !feedback.hint && (
        <div style={{ marginTop: 12, color: feedback.correct ? THEME.done : THEME.muted, fontWeight: 700 }}>{feedback.why}</div>
      )}
      <div style={{ marginTop: 14 }}>
        {done ? (
          <button onClick={onDone} style={btn(THEME.violet)}>Next paragraph →</button>
        ) : (
          <button onClick={check} disabled={!choice || busy} style={btn(THEME.done, !choice || busy)}>{busy ? "Checking…" : attempt === 0 ? "Check" : "Check again"}</button>
        )}
      </div>
    </Panel>
  );
}

function guessId(marks, nobody) {
  if (nobody) return "c";
  const has = (id) => marks.includes(id);
  if (has("minnows") && has("herons") && !has("plants") && !has("sun")) return "a";
  if (has("herons") && !has("minnows") && !has("plants") && !has("sun")) return "b";
  if (has("plants") && !has("minnows") && !has("herons") && !has("sun")) return "d";
  if (!marks.length) return null;
  return "other";
}

function WhatIfRound({ publicCase, onDone, setChoice, onMark, onCut, embedded }) {
  const say = useSay();
  const [marks, setMarks] = useState([]);
  const [nobody, setNobody] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const ready = nobody || marks.length > 0;
  useEffect(() => { if (!embedded) say("The line is live. Mark who loses power, then cut the plants.", "thinking"); }, [say, embedded]);

  function toggle(id) {
    if (feedback) return;
    setNobody(false);
    setMarks((cur) => {
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      if (onMark) onMark(next);
      return next;
    });
  }

  async function cut() {
    const id = guessId(marks, nobody);
    setChoice(id);
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStandard: publicCase.standard, action: "whatIf", whatIfChoiceId: id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't throw the switch.");
      setFeedback(data);
      if (onCut) onCut();
      if (embedded && onDone) onDone();
      say(data.correct ? "You read the line. Watch it go dark." : "Watch the shutoff. The plants feed everything after them.", data.correct ? "celebrating" : "helping", 4000);
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  const targets = (publicCase.chain && publicCase.chain.links || []).filter((link) => link.id !== "sun");
  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>{embedded ? "2 · CUT THE PLANTS" : "CUT THE LINE"}</div>
      <h2 style={{ fontSize: 22, margin: "6px 0 8px" }}>{publicCase.whatIf.prompt}</h2>
      <p style={{ color: THEME.muted, fontSize: 14.5, margin: "0 0 14px" }}>{publicCase.whatIf.hint}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {targets.map((link) => {
          const on = marks.includes(link.id);
          return (
            <button key={link.id} disabled={!!feedback} onClick={() => toggle(link.id)} style={{ background: on ? "rgba(224,163,34,0.18)" : THEME.chip, border: `1px solid ${on ? THEME.cursor : "transparent"}`, borderRadius: 999, padding: "8px 14px", color: THEME.text, fontWeight: 800, fontFamily: "inherit", cursor: feedback ? "default" : "pointer" }}>
              {link.mark} {link.label}
            </button>
          );
        })}
        <button disabled={!!feedback} onClick={() => { if (feedback) return; setNobody(true); setMarks([]); if (onMark) onMark([]); }} style={{ background: nobody ? "rgba(224,163,34,0.18)" : THEME.chip, border: `1px solid ${nobody ? THEME.cursor : "transparent"}`, borderRadius: 999, padding: "8px 14px", color: THEME.text, fontWeight: 800, fontFamily: "inherit", cursor: feedback ? "default" : "pointer" }}>
          Nobody
        </button>
      </div>
      {feedback && (
        <div style={{ background: feedback.correct ? "rgba(57,217,122,0.12)" : "#F4FBFF", border: `1px solid ${feedback.correct ? THEME.done : THEME.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.65, marginBottom: 14 }}>
          <strong style={{ color: feedback.correct ? THEME.done : THEME.cursor }}>{feedback.correct ? "The shutoff matches your mark. +1 💎" : "The line corrected you."}</strong>
          <div style={{ marginTop: 6, color: THEME.muted }}>{feedback.why}</div>
          {feedback.walkLine && <div style={{ marginTop: 6 }}>{feedback.walkLine}</div>}
        </div>
      )}
      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {!feedback ? (
        <button onClick={cut} disabled={!ready || busy} style={btn(ready ? THEME.error : THEME.done, !ready || busy)}>
          {busy ? "Cutting…" : "Cut the plants"}
        </button>
      ) : !embedded ? (
        <button onClick={onDone} style={btn(THEME.violet)}>One more thing →</button>
      ) : null}
    </Panel>
  );
}

function BonusTransmission({ publicCase, boards, assembly, challenge, onCut, onMark, setChoice, setTrapCaught, pinpoint, setPinpoint, quick, setQuick, onDone }) {
  const say = useSay();
  const [ready, setReady] = useState({ trap: false, cut: false, debrief: false });
  const all = ready.trap && ready.cut && ready.debrief;
  useEffect(() => { say("Bonus transmission. Three short checks, all on this page.", "thinking"); }, [say]);
  return (
    <>
      <Panel>
        <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 800 }}>BONUS TRANSMISSION</div>
        <h2 style={{ fontSize: 24, margin: "6px 0 8px" }}>Three short checks. One page.</h2>
        <p style={{ color: THEME.muted, fontSize: 16, lineHeight: 1.6, margin: 0 }}>Spot the fake sentence, cut the plants, then answer two quick questions. Crystals if you catch them. Nothing here opens a new screen.</p>
      </Panel>
      <TrapRound publicCase={publicCase} boards={boards} challenge={challenge} embedded onDone={(caught) => { setTrapCaught(!!caught); setReady((r) => ({ ...r, trap: true })); }} />
      <WhatIfRound publicCase={publicCase} setChoice={setChoice} onMark={onMark} onCut={onCut} embedded onDone={() => setReady((r) => ({ ...r, cut: true }))} />
      <Debrief publicCase={publicCase} boards={boards} assembly={assembly} pinpoint={pinpoint} setPinpoint={setPinpoint} quick={quick} setQuick={setQuick} embedded onDone={() => setReady((r) => ({ ...r, debrief: true }))} />
      <Panel>
        <button onClick={onDone} disabled={!all} style={{ ...btn(THEME.violet, !all), width: "100%" }}>{all ? "Last question →" : "Finish all three checks"}</button>
      </Panel>
    </>
  );
}

// ======================================================================
// ROOT
// ======================================================================
export default function AssemblyDeckClient({ assignmentId, caseStandard, publicCase, existingSubmission, alreadySubmitted, revisionRequested, revisionFeedback, samSkin, samNickname }) {
  const [sam, setSam] = useState({ line: "", state: "idle" });
  const say = useCallback((line, state, ms) => {
    setSam({ line, state: state || "idle" });
    if (ms) setTimeout(() => setSam((s) => (s.line === line ? { line: "", state: "idle" } : s)), ms);
  }, []);

  const saved = (existingSubmission && existingSubmission.assembly_deck_data) || null;
  const [phase, setPhase] = useState(alreadySubmitted && saved ? "done" : "brief");
  const [roundIndex, setRoundIndex] = useState(0);
  const [boards, setBoards] = useState(() => (saved && saved.boards) || Object.fromEntries(publicCase.rounds.map((r) => [r.id, {}])));
  const [rejections, setRejections] = useState(() => (saved && saved.rejections) || Object.fromEntries(publicCase.rounds.map((r) => [r.id, {}])));
  const [assembly, setAssembly] = useState(() => (saved && saved.assembly) || {});
  const [attempts, setAttempts] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [result, setResult] = useState(() => (alreadySubmitted && saved ? {
    placement: saved.placement || { correct: 0, total: 0 },
    decoys: saved.decoys || { correct: 0, total: 0 },
    assemblyScore: saved.assemblyScore || { correct: 0, total: 0 },
    pinpoint: saved.pinpoint || null,
    quickCheck: saved.quickCheck || null,
    glows: saved.glows || [],
    grow: saved.grow || null,
    crystalsEarned: 0,
    assemblyNote: null,
  } : null));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [sourceOpen, setSourceOpen] = useState(true);
  const [challenge, setChallenge] = useState(false);
  const [trapCaught, setTrapCaught] = useState(false);
  // Graded leftover verdicts, kept at the root so the Case File can show them
  // on any later screen — a student answering the last question can see which
  // of their reasons held up.
  const [rejectResults, setRejectResults] = useState({});
  const [pinpoint, setPinpoint] = useState(null);
  const [quick, setQuick] = useState(null);
  const [caseFileOpen, setCaseFileOpen] = useState(false);
  const [locked, setLocked] = useState(() => (alreadySubmitted ? publicCase.rounds.map((r) => r.id) : []));
  const [cutStep, setCutStep] = useState(-1);
  const [guess, setGuess] = useState([]);
  const [whatIfChoice, setWhatIfChoice] = useState(null);
  const [lookChoice, setLookChoice] = useState(null);

  const round = publicCase.rounds[roundIndex];

  async function submit(confidence) {
    const feeling = typeof confidence === "string" ? confidence : null;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId, caseStandard, action: "submit", boards, rejections, assembly, explanation,
          attempt: attempts, challenge, trapCaught,
          pinpointPieceId: pinpoint ? pinpoint.pinpointPieceId : null,
          quickCheckChoiceId: quick ? quick.quickCheckChoiceId : null,
          whatIfChoiceId: whatIfChoice,
          lookChoiceId: lookChoice,
          confidence: feeling,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't turn that in.");
      setResult(data);
      setPhase("done");
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  let body = null;
  if (phase === "brief") {
    body = <Brief publicCase={publicCase} onStart={() => setPhase("build")} challenge={challenge} setChallenge={setChallenge} />;
  } else if (phase === "build") {
    body = (
      <BuildRound
        key={`build-${round.id}`}
        publicCase={publicCase}
        round={round}
        roundNumber={roundIndex + 1}
        board={boards[round.id] || {}}
        setBoard={(b) => setBoards((all) => ({ ...all, [round.id]: b }))}
        onDone={({ attempts: a }) => {
          setAttempts((n) => n + a);
          setLocked((ids) => (ids.includes(round.id) ? ids : [...ids, round.id]));
          setPhase("rejects");
        }}
        sourceOpen={sourceOpen}
        setSourceOpen={setSourceOpen}
        challenge={challenge}
      />
    );
  } else if (phase === "rejects") {
    body = (
      <RejectRound
        key={`rej-${round.id}`}
        publicCase={publicCase}
        round={round}
        roundNumber={roundIndex + 1}
        board={boards[round.id] || {}}
        rejections={rejections[round.id] || {}}
        setRejections={(r) => setRejections((all) => ({ ...all, [round.id]: r }))}
        onDone={() => {
          if (publicCase.repair && round.id === publicCase.repair.roundId) { setPhase("repair"); return; }
          if (roundIndex + 1 < publicCase.rounds.length) { setRoundIndex(roundIndex + 1); setPhase("build"); }
          else setPhase("assembly");
        }}
        onGraded={(results) => setRejectResults((all) => ({ ...all, [round.id]: results }))}
        challenge={challenge}
      />
    );
  } else if (phase === "assembly") {
    body = <AssemblyRound publicCase={publicCase} boards={boards} assembly={assembly} setAssembly={setAssembly} onDone={() => setPhase(publicCase.chain ? "bonus" : publicCase.whatIf ? "whatif" : "trap")} />;
  } else if (phase === "repair") {
    body = (
      <RepairRound
        publicCase={publicCase}
        onPick={setLookChoice}
        onDone={() => {
          if (roundIndex + 1 < publicCase.rounds.length) { setRoundIndex(roundIndex + 1); setPhase("build"); }
          else setPhase("assembly");
        }}
      />
    );
  } else if (phase === "bonus") {
    body = (
      <BonusTransmission
        publicCase={publicCase}
        boards={boards}
        assembly={assembly}
        challenge={challenge}
        setChoice={setWhatIfChoice}
        onMark={setGuess}
        onCut={() => {
          setCutStep(0);
          setTimeout(() => setCutStep(1), 650);
          setTimeout(() => setCutStep(2), 1300);
        }}
        setTrapCaught={setTrapCaught}
        pinpoint={pinpoint}
        setPinpoint={setPinpoint}
        quick={quick}
        setQuick={setQuick}
        onDone={() => setPhase("explain")}
      />
    );
  } else if (phase === "whatif") {
    body = (
      <WhatIfRound
        publicCase={publicCase}
        setChoice={setWhatIfChoice}
        onMark={setGuess}
        onCut={() => {
          setCutStep(0);
          setTimeout(() => setCutStep(1), 650);
          setTimeout(() => setCutStep(2), 1300);
        }}
        onDone={() => setPhase("trap")}
      />
    );
  } else if (phase === "trap") {
    body = <TrapRound publicCase={publicCase} boards={boards} challenge={challenge} onDone={(caught) => { setTrapCaught(!!caught); setPhase(publicCase.debrief ? "debrief" : "explain"); }} />;
  } else if (phase === "debrief") {
    body = (
      <Debrief
        publicCase={publicCase}
        boards={boards}
        assembly={assembly}
        pinpoint={pinpoint}
        setPinpoint={setPinpoint}
        quick={quick}
        setQuick={setQuick}
        onDone={() => setPhase("explain")}
      />
    );
  } else if (phase === "explain") {
    body = <Explain publicCase={publicCase} text={explanation} setText={setExplanation} onSubmit={publicCase.chain ? () => setPhase("feel") : () => submit()} busy={busy} err={err} />;
  } else if (phase === "feel") {
    body = <Feel onPick={(id) => submit(id)} busy={busy} err={err} />;
  } else {
    body = <Done publicCase={publicCase} boards={boards} assembly={assembly} result={result} />;
  }

  const progress = phase === "done" ? 1
    : phase === "bonus" ? 0.9
    : phase === "trap" ? 0.92
    : phase === "debrief" ? 0.96
    : phase === "feel" ? 0.99
    : phase === "explain" ? 0.98
    : (roundIndex + (phase === "rejects" ? 0.5 : 0)) / (publicCase.rounds.length + 1);

  return (
    <SamContext.Provider value={say}>
      <Shell
        bright={!!publicCase.chain}
        sam={<SamGuide skinKey={samSkin} alt={samNickname || "S.A.M."} size={96} anchors={{ home: { right: 14, bottom: 14 } }} line={sam.line} state={sam.state} tipOnTap zIndex={40} />}
      >
        {publicCase.chain && <PondBoard chain={publicCase.chain} locked={locked} scenario={phase === "whatif" || phase === "bonus" ? "cut-test" : "story"} cutStep={cutStep} guess={phase === "whatif" || phase === "bonus" ? guess : []} />}
        {revisionRequested && (
          <Panel style={{ background: "rgba(255,196,77,0.12)", border: `1px solid ${THEME.cursor}`, maxWidth: 900 }}>
            <strong style={{ color: THEME.cursor }}>Your teacher sent this back for another look.</strong>
            {revisionFeedback && <div style={{ marginTop: 6, color: THEME.muted, fontSize: 14.5, lineHeight: 1.6 }}>{revisionFeedback}</div>}
          </Panel>
        )}
        {phase !== "brief" && phase !== "done" && (
          <div style={{ width: "100%", maxWidth: 900, height: 6, background: "#E4E9F5", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${Math.round(progress * 100)}%`, height: "100%", background: THEME.teal, transition: "width .4s" }} />
          </div>
        )}
        {body}
        {phase !== "brief" && phase !== "done" && !caseFileOpen && <CaseFileButton onOpen={() => setCaseFileOpen(true)} />}
        {caseFileOpen && (
          <CaseFile
            publicCase={publicCase}
            boards={boards}
            rejections={rejections}
            rejectResults={rejectResults}
            onClose={() => setCaseFileOpen(false)}
          />
        )}
      </Shell>
    </SamContext.Provider>
  );
}
