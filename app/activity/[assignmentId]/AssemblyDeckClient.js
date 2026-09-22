"use client";

import { useState, useEffect, useMemo, useCallback, createContext, useContext } from "react";
import SamGuide from "../../../components/SamGuide";
import BackToHubButton from "../../../components/BackToHubButton";
import { getRound, reasonChipsFor, rejectReason, roundSize, trayOrder, CHALLENGE } from "../../../lib/cases/assembly-deck/index.public";

// Assembly Deck — the student screen (design doc §3).
// brief -> [build -> rejects] x rounds -> assembly -> trap -> explain -> done
// Pieces move by TAP-then-TAP, never drag-only: tap a sentence, tap a slot.
// Everything is a real <button>, so the whole engine works from a keyboard and
// with a screen reader, and nothing here is timed.

const THEME = {
  bg: "radial-gradient(ellipse at 20% 20%, #16243F 0%, #0D1B2A 45%, #060B16 100%)",
  panel: "rgba(13, 27, 42, 0.92)",
  border: "rgba(143, 164, 255, 0.28)",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.62)",
  dim: "rgba(255,255,255,0.3)",
  done: "#39D97A",
  cursor: "#FFC44D",
  error: "#FF5A6E",
  violet: "#7B5DFF",
  teal: "#00C2C7",
};

const SamContext = createContext(() => {});
const useSay = () => useContext(SamContext);

function Panel({ children, style }) {
  return (
    <div style={{ background: THEME.panel, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 22, width: "100%", maxWidth: 900, boxShadow: "0 18px 50px rgba(0,0,0,0.35)", ...style }}>
      {children}
    </div>
  );
}

function btn(color, disabled) {
  return {
    background: disabled ? "rgba(255,255,255,0.08)" : color,
    color: disabled ? THEME.dim : "#0D1B2A",
    border: "none",
    borderRadius: 12,
    padding: "12px 20px",
    fontSize: 15.5,
    fontWeight: 800,
    fontFamily: "inherit",
    cursor: disabled ? "default" : "pointer",
  };
}

function Shell({ children, sam }) {
  return (
    <div style={{ minHeight: "100vh", background: THEME.bg, color: THEME.text, fontFamily: "system-ui, sans-serif", padding: "24px 16px 120px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
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
    <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${THEME.border}`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
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
          background: challenge ? "rgba(255,196,77,0.16)" : "rgba(255,255,255,0.05)",
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
        // The student reads their own finished paragraph before moving on —
        // that read-back is the payoff for the whole round, so it gets its own
        // beat instead of being skipped by an auto-advance.
        setFeedback(data);
        say("That is the paragraph. Read it back — it sounds like writing now.", "celebrating", 4000);
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
  const isCorrect = (pieceId) => !!(feedback && feedback.results.find((x) => x.pieceId === pieceId && x.correct));

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
            <div key={slot.id} style={{ border: `1px ${openSeat ? "dashed" : "solid"} ${openSeat && selected ? THEME.cursor : THEME.border}`, borderRadius: 14, padding: "10px 12px", background: "rgba(255,255,255,0.03)" }}>
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
                      background: locked ? "rgba(57,217,122,0.16)" : "rgba(123,93,255,0.18)",
                      border: `1px solid ${locked ? THEME.done : THEME.violet}`,
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

      {/* the tray */}
      <div style={{ fontSize: 11.5, letterSpacing: 1.4, fontWeight: 800, color: THEME.muted, marginBottom: 8 }}>
        SENTENCE TRAY · tap one, then tap where it goes
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
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
                  background: on ? "rgba(255,196,77,0.2)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${on ? THEME.cursor : note ? THEME.error : "transparent"}`,
                  borderRadius: 10, padding: "10px 12px", color: THEME.text, fontSize: 15, lineHeight: 1.55, fontFamily: "inherit", cursor: "pointer",
                }}
              >
                {piece.text}
              </button>
              {note && <div style={{ color: THEME.error, fontSize: 13, margin: "4px 2px 0" }}>↳ {note}</div>}
            </div>
          );
        })}
        {!tray.length && <div style={{ color: THEME.dim, fontSize: 14 }}>The tray is empty.</div>}
      </div>

      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {!feedback?.perfect && !feedback?.revealed && (
        <button onClick={check} disabled={!full || busy} style={btn(THEME.done, !full || busy)}>
          {busy ? "Checking…" : attempt === 0 ? "Check this paragraph" : "Check again"}
        </button>
      )}
      {(feedback?.perfect || feedback?.revealed) && (
        <>
          <div style={{ background: "rgba(57,217,122,0.12)", border: `1px solid ${THEME.done}`, borderRadius: 12, padding: "14px 16px", fontSize: 15.5, lineHeight: 1.75, marginBottom: 14 }}>
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
function RejectRound({ publicCase, round, roundNumber, board, rejections, setRejections, onDone, challenge }) {
  const say = useSay();
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const placed = useMemo(() => new Set(Object.values(board || {}).flat()), [board]);
  const leftovers = round.pieces.filter((p) => !placed.has(p.id));
  const options = reasonChipsFor(round, challenge);
  const answered = leftovers.every((p) => rejections[p.id]);

  useEffect(() => { say("This is the part that counts. Why did each one fail to make the paragraph?", "thinking"); }, [say, round.id]);

  async function check() {
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
      setFeedback(data);
      say(data.perfect ? "Both of them, exactly right. Listen to them complain." : "Read what each one really was — that is the skill.", data.perfect ? "celebrating" : "helping", 3500);
    } catch (e) {
      setErr(e.message);
    }
    setBusy(false);
  }

  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.cursor, fontWeight: 700 }}>🗑️ THE LEFTOVERS · PARAGRAPH {roundNumber}</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 12px" }}>{round.rejectPrompt}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
        {leftovers.map((piece) => {
          const chosen = rejections[piece.id];
          const result = feedback && feedback.results.find((r) => r.pieceId === piece.id);
          return (
            <div key={piece.id} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 14px", border: `1px solid ${result ? (result.correct ? THEME.done : THEME.error) : "transparent"}` }}>
              <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 10 }}>{piece.text}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {options.map((opt) => {
                  const on = chosen === opt.key;
                  const rightAnswer = result && result.correctReason === opt.key;
                  return (
                    <button
                      key={opt.key}
                      disabled={!!feedback}
                      onClick={() => setRejections({ ...rejections, [piece.id]: opt.key })}
                      style={{
                        background: rightAnswer ? "rgba(57,217,122,0.2)" : on ? "rgba(123,93,255,0.25)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${rightAnswer ? THEME.done : on ? THEME.violet : "transparent"}`,
                        borderRadius: 99, padding: "7px 13px", color: THEME.text, fontSize: 13.5, fontFamily: "inherit", cursor: feedback ? "default" : "pointer",
                      }}
                    >
                      {rightAnswer ? "✓ " : ""}{opt.label}
                    </button>
                  );
                })}
              </div>
              {result && (result.protest || result.why) && (
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
      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {!feedback ? (
        <button onClick={check} disabled={!answered || busy} style={btn(THEME.done, !answered || busy)}>
          {busy ? "Checking…" : "Check my reasons"}
        </button>
      ) : (
        <button onClick={onDone} style={btn(THEME.violet)}>
          {roundNumber < publicCase.rounds.length ? `Next paragraph →` : "Put the paragraphs in order →"}
        </button>
      )}
    </Panel>
  );
}

// ======================================================================
// ASSEMBLY — the finished paragraphs, in order
// ======================================================================
function AssemblyRound({ publicCase, boards, assembly, setAssembly, onDone }) {
  const say = useSay();
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const used = new Set(Object.values(assembly));
  const unplaced = publicCase.rounds.filter((r) => !used.has(r.id));
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
      setFeedback(data);
      say(data.perfect ? "That is the order. Now tell me why the rest didn't make it." : "Not quite — think about what a reader needs first.", data.perfect ? "celebrating" : "helping", 3500);
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
          const result = feedback && feedback.results.find((r) => r.slotId === slot.id);
          return (
            <div key={slot.id} style={{ border: `1px ${round ? "solid" : "dashed"} ${result ? (result.correct ? THEME.done : THEME.error) : selected && !round ? THEME.cursor : THEME.border}`, borderRadius: 14, padding: "10px 12px", background: "rgba(255,255,255,0.03)" }}>
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
                style={{ textAlign: "left", background: selected === r.id ? "rgba(255,196,77,0.2)" : "rgba(255,255,255,0.06)", border: `1px solid ${selected === r.id ? THEME.cursor : "transparent"}`, borderRadius: 10, padding: "10px 12px", color: THEME.text, fontFamily: "inherit", cursor: "pointer" }}
              >
                <strong style={{ fontSize: 14 }}>{r.label}</strong>
                <div style={{ color: THEME.muted, fontSize: 13.5, lineHeight: 1.6, marginTop: 4 }}>{paragraphText(r, boards[r.id])}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {feedback && feedback.note && (
        <div style={{ background: "rgba(57,217,122,0.12)", border: `1px solid ${THEME.done}`, borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.65, marginBottom: 12 }}>{feedback.note}</div>
      )}
      {!feedback || !feedback.perfect ? (
        <button onClick={check} disabled={!complete || busy} style={btn(THEME.done, !complete || busy)}>
          {busy ? "Checking…" : feedback ? "Try this order" : "Check the order"}
        </button>
      ) : (
        <button onClick={onDone} style={btn(THEME.violet)}>Last step: explain →</button>
      )}
    </Panel>
  );
}

// ======================================================================
// EDITOR'S TRAP — S.A.M. slips one bad sentence into a finished paragraph
// ======================================================================
function TrapRound({ publicCase, boards, challenge, onDone }) {
  const say = useSay();
  const [dared, setDared] = useState(!!challenge);
  const [data, setData] = useState(null);
  const [picked, setPicked] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!dared) say("One more thing, Cadet. Want to see if I can fool you?", "thinking");
  }, [say, dared]);

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
    call({ action: "trap" }).then((d) => { if (!cancelled) { setData(d); say("I hid one sentence of mine in your paragraph. Find it.", "helping"); } }, (e) => setErr(e.message));
    return () => { cancelled = true; };
  }, [dared, data, call, say]);

  async function answer() {
    setBusy(true); setErr(null);
    try {
      const d = await call({ action: "trapAnswer", chosenIndex: picked });
      setVerdict(d);
      say(d.correct ? "Caught me. That sentence was mine." : "That one was yours. Mine is the one still highlighted.", d.correct ? "celebrating" : "thinking", 4000);
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
          <button onClick={onDone} style={{ ...btn("rgba(255,255,255,0.08)"), color: THEME.muted }}>Skip it</button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.cursor, fontWeight: 700 }}>🎭 EDITOR&apos;S TRAP</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 4px" }}>One of these sentences is mine. Which one?</h2>
      <p style={{ color: THEME.muted, fontSize: 14, margin: "0 0 14px" }}>{data ? data.label : "Loading the paragraph…"}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {(data ? data.sentences : []).map((text, i) => {
          const on = picked === i;
          const isTrap = verdict && verdict.position === i;
          return (
            <button
              key={i}
              disabled={!!verdict}
              onClick={() => setPicked(i)}
              aria-pressed={on}
              style={{
                textAlign: "left",
                background: isTrap ? "rgba(255,90,110,0.18)" : on ? "rgba(255,196,77,0.2)" : "rgba(255,255,255,0.06)",
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
      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      {!verdict ? (
        <button onClick={answer} disabled={picked === null || busy} style={btn(THEME.done, picked === null || busy)}>
          {busy ? "Checking…" : "That one"}
        </button>
      ) : (
        <>
          <div style={{ background: verdict.correct ? "rgba(57,217,122,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${verdict.correct ? THEME.done : THEME.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 14.5, lineHeight: 1.7, marginBottom: 14 }}>
            <strong style={{ color: verdict.correct ? THEME.done : THEME.cursor }}>{verdict.correct ? "Caught it. +2 💎" : "That was one of yours."}</strong>
            <div style={{ marginTop: 6, color: THEME.muted }}>{verdict.why}</div>
          </div>
          <button onClick={() => onDone(verdict.correct)} style={btn(THEME.violet)}>Last step: explain →</button>
        </>
      )}
    </Panel>
  );
}

// ======================================================================
// EXPLAIN
// ======================================================================
function Explain({ publicCase, text, setText, onSubmit, busy, err }) {
  const say = useSay();
  useEffect(() => { say("Last thing. Say it the way you would say it out loud.", "helping"); }, [say]);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <Panel>
      <div style={{ fontSize: 12, letterSpacing: 2, color: THEME.teal, fontWeight: 700 }}>✍️ ONE LAST QUESTION</div>
      <h2 style={{ fontSize: 21, margin: "6px 0 10px" }}>{publicCase.explain.prompt}</h2>
      <ul style={{ margin: "0 0 14px", paddingLeft: 20, color: THEME.muted, fontSize: 14, lineHeight: 1.8 }}>
        {publicCase.explain.criteria.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Write two or three sentences…"
        style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: `1px solid ${THEME.border}`, borderRadius: 12, padding: 12, color: THEME.text, fontSize: 15.5, lineHeight: 1.7, fontFamily: "inherit", resize: "vertical" }}
      />
      <div style={{ color: THEME.dim, fontSize: 12.5, margin: "6px 0 14px" }}>{words} word{words === 1 ? "" : "s"}</div>
      {err && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 10 }}>{err}</div>}
      <button onClick={onSubmit} disabled={words < 8 || busy} style={btn(THEME.done, words < 8 || busy)}>
        {busy ? "Sending…" : "Turn in my report"}
      </button>
      {words < 8 && <div style={{ color: THEME.dim, fontSize: 13, marginTop: 8 }}>A sentence or two, at least.</div>}
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

      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px 18px" }}>
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
    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 14px", minWidth: 120 }}>
      <div style={{ fontSize: 11.5, letterSpacing: 1, color: THEME.muted }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: accent || THEME.text }}>{value}</div>
    </div>
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

  const round = publicCase.rounds[roundIndex];

  async function submit() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/assembly-deck/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, caseStandard, action: "submit", boards, rejections, assembly, explanation, attempt: attempts, challenge, trapCaught }),
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
        onDone={({ attempts: a }) => { setAttempts((n) => n + a); setPhase("rejects"); }}
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
          if (roundIndex + 1 < publicCase.rounds.length) { setRoundIndex(roundIndex + 1); setPhase("build"); }
          else setPhase("assembly");
        }}
        challenge={challenge}
      />
    );
  } else if (phase === "assembly") {
    body = <AssemblyRound publicCase={publicCase} boards={boards} assembly={assembly} setAssembly={setAssembly} onDone={() => setPhase("trap")} />;
  } else if (phase === "trap") {
    body = <TrapRound publicCase={publicCase} boards={boards} challenge={challenge} onDone={(caught) => { setTrapCaught(!!caught); setPhase("explain"); }} />;
  } else if (phase === "explain") {
    body = <Explain publicCase={publicCase} text={explanation} setText={setExplanation} onSubmit={submit} busy={busy} err={err} />;
  } else {
    body = <Done publicCase={publicCase} boards={boards} assembly={assembly} result={result} />;
  }

  const progress = phase === "done" ? 1 : phase === "trap" ? 0.95 : phase === "explain" ? 0.98 : (roundIndex + (phase === "rejects" ? 0.5 : 0)) / (publicCase.rounds.length + 1);

  return (
    <SamContext.Provider value={say}>
      <Shell
        sam={<SamGuide skinKey={samSkin} alt={samNickname || "S.A.M."} size={96} anchors={{ home: { right: 14, bottom: 14 } }} line={sam.line} state={sam.state} tipOnTap zIndex={40} />}
      >
        {revisionRequested && (
          <Panel style={{ background: "rgba(255,196,77,0.12)", border: `1px solid ${THEME.cursor}`, maxWidth: 900 }}>
            <strong style={{ color: THEME.cursor }}>Your teacher sent this back for another look.</strong>
            {revisionFeedback && <div style={{ marginTop: 6, color: THEME.muted, fontSize: 14.5, lineHeight: 1.6 }}>{revisionFeedback}</div>}
          </Panel>
        )}
        {phase !== "brief" && phase !== "done" && (
          <div style={{ width: "100%", maxWidth: 900, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${Math.round(progress * 100)}%`, height: "100%", background: THEME.teal, transition: "width .4s" }} />
          </div>
        )}
        {body}
      </Shell>
    </SamContext.Provider>
  );
}
