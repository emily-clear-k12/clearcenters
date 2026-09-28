"use client";

// Expedition Station — student screen (rebuilt Sept 26, 2026).
// One engine for every quest: all three acts, math machines (Fill, Tune,
// Travel, Scoops, Repair, Numberless, Sort Bay, Crew Debate, compare) and the
// ELAR / science task types (choice, multi, highlight, edit, order, number,
// write, parts, data tables). Answer keys stay on the server; this screen only
// knows each task's kind (publicTask.answerKind) and its public settings.

import { useMemo, useState } from "react";
import BackToHubButton from "../../../components/BackToHubButton";
import SamIcon from "../../../components/SamIcon";
import Visual from "./ExpeditionVisuals";
import "./expedition-station.css";

const PLANET_ART = {
  Frostveil: "/planets/frost_ring.png",
  Cindara: "/planets/lavacore.png",
  Lumara: "/planets/glow_garden.png",
  Solara: "/planets/jungle_moon.png",
  Cloudreach: "/planets/cloud_reef.png",
  Mechara: "/planets/robot_relay_city.png",
};

const CREW = {
  vega: { name: "Commander Vega", short: "Vega", initial: "V", img: "/expedition/crew/vega.png" },
  kai: { name: "Kai", short: "Kai", initial: "K", img: "/expedition/crew/kai.png" },
  nova: { name: "Nova", short: "Nova", initial: "N", img: "/expedition/crew/nova.png" },
};

function fracLabel(n, d) {
  if (d === 1) return String(n);
  if (n === 0) return "0";
  if (n === d) return "1";
  if (n > d) {
    const w = Math.floor(n / d);
    const r = n % d;
    return r ? `${n}/${d} (${w} ${r}/${d})` : `${n}/${d} (${w})`;
  }
  return `${n}/${d}`;
}

function starsGlyph(n) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 3 - n));
}

function fill(text, firstName) {
  return String(text || "").replaceAll("{name}", firstName).replaceAll("{firstName}", firstName);
}

function computeMeters(quest, cards) {
  const meters = { ...quest.meterStart };
  Object.keys(quest.tasks)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach((id) => {
      if (!cards[id] || !cards[id].done) return;
      const t = quest.tasks[id];
      if (!t || !t.meter) return;
      if (t.meter.heat) meters.heat = Math.min(100, meters.heat + t.meter.heat);
      if (t.meter.supplies) meters.supplies += t.meter.supplies;
      if (t.discovery) meters.journal += 1;
    });
  return meters;
}

// "Step 1: ... Step 2: ..." → ["Step 1: ...", "Step 2: ..."]
function splitSteps(question, count) {
  const parts = String(question || "").split(/(?=(?:Step|Part) \d+:)/).map((s) => s.trim()).filter((s) => /^(Step|Part) \d+:/.test(s));
  if (parts.length >= count) return parts;
  return Array.from({ length: count }, (_, i) => parts[i] || `Step ${i + 1}`);
}

// First "a/b" in the task text, so the picker starts in the story's units.
function firstDenom(task) {
  const m = `${task.line || ""} ${task.question || ""}`.match(/\d+\s*\/\s*(\d+)/);
  return m ? Number(m[1]) : null;
}

function defaultDenom(task) {
  return (
    (task.fill && task.fill.denom) ||
    (task.tune && (task.tune.denom || (task.tune.lines && task.tune.lines[0] && task.tune.lines[0].denom))) ||
    (task.travel && task.travel.denom) ||
    (task.scoops && task.scoops.denom) ||
    (task.numberless && task.numberless.denom) ||
    firstDenom(task) ||
    8
  );
}

function Avatar({ who, size = 44 }) {
  const c = CREW[who] || CREW.vega;
  const [broken, setBroken] = useState(false);
  return (
    <span className={`es-avatar es-avatar-${who || "vega"}`} style={{ width: size, height: size }} aria-hidden="true">
      {!broken ? <img src={c.img} alt="" onError={() => setBroken(true)} /> : <b>{c.initial}</b>}
    </span>
  );
}

function CrewLine({ who, text }) {
  if (!text) return null;
  const c = CREW[who] || CREW.vega;
  return (
    <div className="es-crewline">
      <Avatar who={who} />
      <div>
        <div className="es-crewname">{c.name}</div>
        <p>{text}</p>
      </div>
    </div>
  );
}

// ---------- shared inputs ----------

function FracInput({ value, onChange, defaultD }) {
  const n = value ? value.n : 0;
  const d = value ? value.d : defaultD;
  const set = (nn, dd) => onChange({ n: Math.max(0, nn), d: Math.max(1, dd) });
  return (
    <div className="es-frac-input" role="group" aria-label="Your fraction">
      <div className="es-frac-col">
        <button type="button" className="es-step-btn" aria-label="Top number up" onClick={() => set(n + 1, d)}>+</button>
        <div className="es-frac-num" aria-live="polite">{n}</div>
        <button type="button" className="es-step-btn" aria-label="Top number down" onClick={() => set(n - 1, d)}>−</button>
      </div>
      <div className="es-frac-bar" />
      <div className="es-frac-col">
        <button type="button" className="es-step-btn" aria-label="Bottom number up" onClick={() => set(n, d + 1)}>+</button>
        <div className="es-frac-num">{d}</div>
        <button type="button" className="es-step-btn" aria-label="Bottom number down" onClick={() => set(n, d - 1)}>−</button>
      </div>
      <div className="es-frac-read">{d === 1 ? `= ${n}` : n > d ? `= ${Math.floor(n / d)}${n % d ? ` ${n % d}/${d}` : ""}` : ""}</div>
    </div>
  );
}

function TankVisual({ denom, filled, safe, label, match }) {
  const pct = Math.max(0, Math.min(100, (filled / denom) * 100));
  const safePct = safe != null ? Math.max(0, Math.min(100, (safe / denom) * 100)) : null;
  const matchPct = match ? Math.max(0, Math.min(100, (match.n / match.d) * 100)) : null;
  return (
    <div className="es-gauge">
      <div className="es-tank" aria-hidden="true">
        <div className="es-fuel" style={{ height: `${pct}%` }} />
        {safePct != null ? <div className="es-safe" style={{ bottom: `${safePct}%` }} /> : null}
      </div>
      {matchPct != null ? (
        <div className="es-tank es-tank-match" aria-label={`${match.label || "Match"}: ${fracLabel(match.n, match.d)}`}>
          <div className="es-fuel" style={{ height: `${matchPct}%` }} />
          <span className="es-tank-tag">{match.label || "Match"} · {fracLabel(match.n, match.d)}</span>
        </div>
      ) : null}
      <div className="es-ticks">
        {Array.from({ length: denom + 1 }, (_, i) => (
          <span key={i}>{fracLabel(denom - i, denom).split(" ")[0]}</span>
        ))}
      </div>
      {label ? <div className="es-gauge-label">{label}</div> : null}
    </div>
  );
}

function GridVisual({ grid, denom, filled, onPick }) {
  const wholes = grid.wholes || 1;
  const per = grid.rows * grid.cols;
  return (
    <div className="es-grids">
      {Array.from({ length: wholes }, (_, w) => (
        <div className="es-grid" key={w} style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)` }}>
          {Array.from({ length: per }, (_, i) => {
            const idx = w * per + i + 1;
            return (
              <button
                type="button"
                key={i}
                className={`es-cell ${idx <= filled ? "on" : ""}`}
                aria-label={`Shade ${idx} of ${denom * wholes}`}
                onClick={() => onPick(idx === filled ? idx - 1 : idx)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function DialVisual({ denom, value }) {
  const angle = Math.max(0, Math.min(1.25, value / denom)) * 300 - 150;
  return (
    <div className="es-dial" aria-hidden="true">
      {Array.from({ length: denom + 1 }, (_, i) => (
        <i key={i} className="es-dial-tick" style={{ transform: `rotate(${(i / denom) * 300 - 150}deg)` }} />
      ))}
      <div className="es-needle" style={{ transform: `rotate(${angle}deg)` }} />
      <div className="es-dial-cap" />
    </div>
  );
}

function NumberLine({ denom, max = 1, value, marks = [], onPick, label }) {
  const total = denom * max;
  const pct = (n) => (n / total) * 100;
  return (
    <div className="es-line-wrap">
      <div className="es-numline">
        <div className="es-numline-track" />
        {Array.from({ length: total + 1 }, (_, i) => (
          <button
            type="button"
            key={i}
            className={`es-numline-tick ${i % denom === 0 ? "whole" : ""}`}
            style={{ left: `${pct(i)}%` }}
            aria-label={`Mark ${fracLabel(i, denom)}`}
            onClick={() => onPick && onPick(i)}
          >
            <span>{i % denom === 0 ? i / denom : ""}</span>
          </button>
        ))}
        {marks.map((m, i) => (
          <div key={i} className="es-numline-mark" style={{ left: `${pct((m.n / m.d) * denom)}%` }}>
            <em>{m.label || fracLabel(m.n, m.d)}</em>
          </div>
        ))}
        {value != null ? <div className="es-rover" style={{ left: `${pct(value)}%` }} aria-hidden="true" /> : null}
      </div>
      {label ? <div className="es-numline-label">{label}</div> : null}
    </div>
  );
}

function DataTable({ data }) {
  if (!data) return null;
  return (
    <div className="es-table-wrap">
      <div className="es-table-title">{data.title}</div>
      <table className="es-table">
        <thead>
          <tr>{data.columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {data.rows.map((r, i) => (
            <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- passages (ELAR) ----------

function PassagePanel({ passages, ids, selectable, selected, onToggle, editing, fixes, onFix, openToken, setOpenToken }) {
  const list = (ids || []).map((id) => passages && passages[id]).filter(Boolean);
  if (!list.length) return null;
  return (
    <div className="es-passages">
      {list.map((p) => (
        <article className="es-passage" key={p.id}>
          <header>
            <span className="es-passage-id">Passage {p.id}</span>
            <h3>{p.title}</h3>
            <em>{p.genre}</em>
          </header>
          {p.paragraphs
            ? p.paragraphs.map((para, i) => (
                <p key={i}>
                  {para.map((s) => (
                    <span
                      key={s.id}
                      className={`es-sentence ${selectable ? "tap" : ""} ${selected && selected.includes(s.id) ? "on" : ""}`}
                      onClick={selectable ? () => onToggle(s.id) : undefined}
                      role={selectable ? "button" : undefined}
                      tabIndex={selectable ? 0 : undefined}
                      onKeyDown={selectable ? (e) => (e.key === "Enter" || e.key === " ") && onToggle(s.id) : undefined}
                    >
                      {s.text}{" "}
                    </span>
                  ))}
                </p>
              ))
            : null}
          {p.tokens && !p.paragraphs ? (
            selectable && p.sentences ? (
              <p>
                {p.sentences.map((s) => (
                  <span key={s.id} className={`es-sentence tap ${selected && selected.includes(s.id) ? "on" : ""}`} onClick={() => onToggle(s.id)} role="button" tabIndex={0}>
                    {s.text}{" "}
                  </span>
                ))}
              </p>
            ) : (
              <p className="es-edit-text">
                {p.tokens.map((tk, i) =>
                  editing && tk.id ? (
                    <span key={i} className="es-token-wrap">
                      <button
                        type="button"
                        className={`es-token err ${fixes && fixes[tk.id] ? "fixed" : ""}`}
                        onClick={() => setOpenToken(openToken === tk.id ? null : tk.id)}
                      >
                        {(fixes && fixes[tk.id]) || tk.text}
                      </button>
                      {openToken === tk.id ? (
                        <span className="es-token-fixes">
                          {tk.options.map((o) => (
                            <button type="button" key={o} onClick={() => { onFix(tk.id, o); setOpenToken(null); }}>{o}</button>
                          ))}
                          {fixes && fixes[tk.id] ? <button type="button" className="undo" onClick={() => { onFix(tk.id, null); setOpenToken(null); }}>undo</button> : null}
                        </span>
                      ) : null}{" "}
                    </span>
                  ) : editing ? (
                    <button type="button" key={i} className="es-token" onClick={(e) => { e.currentTarget.classList.remove("shake"); void e.currentTarget.offsetWidth; e.currentTarget.classList.add("shake"); }}>
                      {tk.text}
                    </button>
                  ) : (
                    <span key={i}>{tk.text} </span>
                  )
                )}
              </p>
            )
          ) : null}
        </article>
      ))}
    </div>
  );
}

// ---------- main ----------

export default function ExpeditionStationClient({ assignmentId, publicCase, studentFirstName, existingData, alreadySubmitted, samSkin }) {
  const quest = publicCase;
  const firstName = studentFirstName || "Specialist";
  const saved = existingData || { briefed: false, cards: {} };
  const playable = Array.isArray(quest.playableActs) ? quest.playableActs : [1];
  const planetArt = PLANET_ART[quest.planet] || "/planets/frost_ring.png";
  const labels = quest.meterLabels || {};
  const subjectKey = String(quest.subject || "Math").toLowerCase().startsWith("ela") ? "elar" : String(quest.subject || "").toLowerCase().startsWith("sci") ? "science" : "math";

  const [cards, setCards] = useState(saved.cards || {});
  const actDone = (n, map = cards) => {
    const act = quest.acts[n];
    return !!act && [...act.tasks, act.challenge].every((id) => map[id] && map[id].done);
  };
  const actOpen = (n, map = cards) => playable.includes(n) && (n === 1 || actDone(n - 1, map));
  const questDone = playable.length > 0 && playable.every((n) => actDone(n));
  const firstOpenAct = () => playable.find((n) => actOpen(n) && !actDone(n)) || playable[playable.length - 1] || 1;

  const [screen, setScreen] = useState(!saved.briefed ? "opening" : questDone ? "questComplete" : "board");
  const [act, setAct] = useState(firstOpenAct());
  const [taskId, setTaskId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);
  const [wrongTries, setWrongTries] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [sure, setSure] = useState(null);
  const [samLine, setSamLine] = useState(questDone ? "Quest complete! Your teacher can see your stars and written answers." : "Pick a card on the quest board. Any order is fine.");
  const [justFinishedAct, setJustFinishedAct] = useState(null);

  // task-local state
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState(null); // scoops: missing|scoops · numberless: questions|solve
  const [frac, setFrac] = useState(null);
  const [who, setWho] = useState(null);
  const [reason, setReason] = useState(null);
  const [written, setWritten] = useState("");
  const [scoops, setScoops] = useState([]);
  const [ways, setWays] = useState([]);
  const [picks, setPicks] = useState([]);
  const [tap, setTap] = useState(null);
  const [errorPick, setErrorPick] = useState(null);
  const [placements, setPlacements] = useState({});
  const [heldItem, setHeldItem] = useState(null);
  const [wrongItems, setWrongItems] = useState([]);
  const [choice, setChoice] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [fixes, setFixes] = useState({});
  const [openToken, setOpenToken] = useState(null);
  const [order, setOrder] = useState(null);
  const [numberValue, setNumberValue] = useState("");
  const [model, setModel] = useState(null);
  const [point, setPoint] = useState(null);

  const meters = useMemo(() => computeMeters(quest, cards), [quest, cards]);
  const totalStars = Object.values(cards).reduce((sum, c) => sum + (c && c.done ? c.stars || 0 : 0), 0);
  const doneCount = Object.values(cards).filter((c) => c && c.done).length;
  const task = taskId ? quest.tasks[taskId] : null;

  function resetDraft(t) {
    setFrac(t ? { n: 0, d: defaultDenom(t) } : null);
    setWho(null);
    setReason(null);
    setWritten("");
    setScoops([]);
    setWays([]);
    setPicks([]);
    setTap(null);
    setErrorPick(null);
    setPlacements({});
    setHeldItem(null);
    setWrongItems([]);
    setChoice(null);
    setSentences([]);
    setFixes({});
    setOpenToken(null);
    setOrder(null);
    setNumberValue("");
    setModel(null);
    setPoint(null);
    setNote(null);
  }

  function openTask(id) {
    const t = quest.tasks[id];
    if (!t || t.locked || !actOpen(t.act)) return;
    const a = quest.acts[t.act];
    if (id === a.challenge && !a.tasks.every((x) => cards[x] && cards[x].done)) return;
    if (cards[id] && cards[id].done) {
      setSamLine(`Already done · ${starsGlyph(cards[id].stars)}. Pick another card.`);
      return;
    }
    resetDraft(t);
    setStep(1);
    setStage(t.answerKind === "scoops" ? "missing" : t.answerKind === "numberless" ? "questions" : null);
    setWrongTries(0);
    setUsedHint(false);
    setSure(null);
    setTaskId(id);
    setScreen("task");
    setSamLine("Take your time — nothing is timed. Tap Hint if you want a nudge.");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToBoard() {
    setScreen("board");
    setTaskId(null);
    resetDraft(null);
  }

  async function markBriefed() {
    setBusy(true);
    try {
      await fetch("/api/expedition-station/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, action: "brief" }),
      });
    } catch (err) {
      // keep going even if the network hiccups
    }
    setBusy(false);
    setScreen("board");
    setSamLine("Four cards, any order. The challenge opens when all four are done.");
  }

  function showHint() {
    setUsedHint(true);
    setSamLine(task.hint);
  }

  // Build the request body for the current task, step, or part.
  function bodyFor() {
    const kind = task.answerKind;
    const f = frac || { n: 0, d: defaultDenom(task) };
    const generic = (k) => {
      switch (k) {
        case "choice": return { choice };
        case "multi": return { picks };
        case "highlight": return { sentences };
        case "edit": return { fixes };
        case "order": return { order: order || currentPart().items.map((i) => i.id) };
        case "number": return { value: Number(numberValue), model };
        case "point": return { point };
        case "write": return { written };
        case "sort": return { placements };
        default: return {};
      }
    };
    switch (kind) {
      case "frac": return { n: f.n, d: f.d };
      case "steps":
      case "challenge": return { step, n: f.n, d: f.d };
      case "scoops": return stage === "missing" ? { step: "missing", n: f.n, d: f.d } : { step: "scoops", ways };
      case "debate": return { who, reason, written };
      case "mistake": return { tap, error: errorPick, n: f.n, d: f.d };
      case "numberless": return stage === "questions" ? { step: "questions", picks } : { step: "solve", n: f.n, d: f.d };
      case "compare": return { who, n: f.n, d: f.d };
      case "sort": return { placements };
      case "parts": return { step, ...generic(task.partKinds[step - 1]) };
      default: return generic(kind);
    }
  }

  function currentPart() {
    return task && task.parts ? task.parts[step - 1] : null;
  }

  async function submitAttempt() {
    if (busy) return;
    if (!sure) {
      setNote({ kind: "bad", text: "Quick check: how sure are you? Tap one, then submit." });
      return;
    }
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/expedition-station/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, taskId, sure, wrongTries, usedHint, ...bodyFor() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNote({ kind: "bad", text: data.error || "Could not save. Try again." });
        setBusy(false);
        return;
      }
      if (!data.ok) {
        setWrongTries((n) => n + 1);
        setWrongItems(data.wrongItems || []);
        setNote({ kind: "bad", text: data.feedback || "Not yet." });
        setSamLine(data.hint || task.hint);
        setBusy(false);
        return;
      }
      if (data.partial) {
        setNote({ kind: "good", text: data.feedback });
        if (data.next === "scoops") setStage("scoops");
        else if (data.next === "solve") setStage("solve");
        else if (typeof data.next === "number") {
          setStep(data.next);
          resetDraft(task);
          setNote({ kind: "good", text: data.feedback });
        }
        setSure(null);
        setBusy(false);
        return;
      }
      const nextCards = { ...cards, [taskId]: { done: true, stars: data.stars, sure } };
      setCards(nextCards);
      setNote({ kind: "good", text: `${data.feedback} ${starsGlyph(data.stars)}` });
      if (data.discovery) setSamLine(`New journal entry · ${data.discovery.name}: ${data.discovery.fact}`);
      else if (data.meter) setSamLine(`${data.meter.label}: ${data.meter.story}`);
      else setSamLine("Saved. Back to the board when you're ready.");
      const finished = data.completedAct || null;
      setTimeout(() => {
        setTaskId(null);
        resetDraft(null);
        if (data.questDone) {
          setScreen("questComplete");
        } else if (finished) {
          setJustFinishedAct(finished);
          setScreen("actComplete");
        } else {
          setScreen("board");
        }
      }, 1100);
    } catch (err) {
      setNote({ kind: "bad", text: "Network hiccup. Try submit again." });
    }
    setBusy(false);
  }

  // ---------- small pieces ----------

  function SureRow() {
    const opts = [
      { id: "unsure", label: "😕 Not sure" },
      { id: "kinda", label: "🙂 Kind of sure" },
      { id: "sure", label: "😄 Very sure" },
    ];
    return (
      <div className="es-sure" role="group" aria-label="How sure are you?">
        <span>How sure are you?</span>
        {opts.map((o) => (
          <button key={o.id} type="button" className={`es-chip ${sure === o.id ? "on" : ""}`} onClick={() => setSure(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  function Actions({ ready = true, label = "Submit" } = {}) {
    return (
      <div className="es-actions">
        <button type="button" className="es-btn ghost" onClick={showHint}>Hint</button>
        <button type="button" className="es-btn" disabled={busy || !ready} onClick={submitAttempt}>
          {busy ? "Checking…" : label}
        </button>
      </div>
    );
  }

  function Choices({ list, value, onPick, multi }) {
    return (
      <div className="es-choices">
        {list.map((c) => {
          const on = multi ? value.includes(c.id) : value === c.id;
          return (
            <button key={c.id} type="button" className={`es-choice ${on ? "on" : ""}`} onClick={() => onPick(c.id)}>
              {c.text}
            </button>
          );
        })}
      </div>
    );
  }

  function toggleIn(list, id, max) {
    if (list.includes(id)) return list.filter((x) => x !== id);
    if (max && list.length >= max) return [...list.slice(1), id];
    return [...list, id];
  }

  function SortBoard({ bins, items }) {
    return (
      <div className="es-sort">
        <p className="es-sub">Tap a card, then tap the bin it belongs in.</p>
        <div className="es-sort-items">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              className={`es-sort-item ${heldItem === it.id ? "held" : ""} ${placements[it.id] ? "placed" : ""} ${wrongItems.includes(it.id) ? "wrong" : ""}`}
              onClick={() => setHeldItem(heldItem === it.id ? null : it.id)}
            >
              {it.image ? <img src={it.image} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : null}
              <span>{it.label}</span>
              {placements[it.id] ? <small>→ {(bins.find((b) => b.id === placements[it.id]) || {}).label}</small> : null}
            </button>
          ))}
        </div>
        <div className="es-bins">
          {bins.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`es-bin ${heldItem ? "ready" : ""}`}
              onClick={() => {
                if (!heldItem) return;
                setPlacements({ ...placements, [heldItem]: b.id });
                setWrongItems(wrongItems.filter((x) => x !== heldItem));
                setHeldItem(null);
              }}
            >
              <b>{b.label}</b>
              <span>{items.filter((it) => placements[it.id] === b.id).map((it) => it.label).join(" · ") || "—"}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function OrderList({ items }) {
    const list = (order || items.map((i) => i.id)).map((id) => items.find((i) => i.id === id));
    const move = (i, dir) => {
      const ids = list.map((x) => x.id);
      const j = i + dir;
      if (j < 0 || j >= ids.length) return;
      [ids[i], ids[j]] = [ids[j], ids[i]];
      setOrder(ids);
    };
    return (
      <ol className="es-order">
        {list.map((it, i) => (
          <li key={it.id}>
            <span className="es-order-n">{i + 1}</span>
            <span className="es-order-text">{it.text}</span>
            <span className="es-order-btns">
              <button type="button" aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>▲</button>
              <button type="button" aria-label="Move down" onClick={() => move(i, 1)} disabled={i === list.length - 1}>▼</button>
            </span>
          </li>
        ))}
      </ol>
    );
  }

  // Renders one generic (ELAR/science) input for a kind and config.
  function GenericInput({ kind, cfg }) {
    switch (kind) {
      case "choice":
        return Choices({ list: cfg.choices, value: choice, onPick: setChoice });
      case "multi":
        return (
          <>
            <p className="es-sub">Pick every answer that fits.</p>
            {Choices({ list: cfg.choices || cfg.items, value: picks, onPick: (id) => setPicks(toggleIn(picks, id)), multi: true })}
          </>
        );
      case "highlight":
        return (
          <p className="es-sub">
            Tap {cfg.count > 1 ? `${cfg.count} sentences` : "a sentence"} in the passage to highlight {cfg.count > 1 ? "them" : "it"}.{" "}
            {sentences.length ? <b>Selected: {sentences.length}</b> : null}
          </p>
        );
      case "edit":
        return <p className="es-sub">Tap each word that's wrong, then pick the fix. Words that are already right won't change.</p>;
      case "order":
        return OrderList({ items: cfg.items });
      case "number": {
        const drives = cfg.visual && cfg.visual.mode !== "show" && ["array", "blocks", "money"].includes(cfg.visual.type);
        return (
          <label className="es-number">
            <input
              type="number"
              inputMode="decimal"
              readOnly={!!drives}
              placeholder={drives ? "Build it on the picture" : undefined}
              value={numberValue}
              onChange={(e) => { if (!drives) setNumberValue(e.target.value); }}
              aria-label="Your answer"
            />
            {cfg.unit ? <span>{cfg.unit}</span> : null}
          </label>
        );
      }
      case "write": {
        const words = written.trim() ? written.trim().split(/\s+/).length : 0;
        return (
          <div className="es-write">
            {cfg.rubric ? (
              <ul className="es-rubric">
                {cfg.rubric.map((r) => <li key={r}>{r}</li>)}
              </ul>
            ) : null}
            <textarea className="es-textarea" rows={6} value={written} onChange={(e) => setWritten(e.target.value)} aria-label="Your response" />
            <div className="es-wordcount">{words} / {cfg.minWords || 1} words · your teacher scores this part</div>
          </div>
        );
      }
      case "sort":
        return SortBoard({ bins: cfg.bins, items: cfg.items });
      default:
        return null;
    }
  }

  function genericReady(kind, cfg) {
    switch (kind) {
      case "choice": return !!choice;
      case "multi": return picks.length > 0;
      case "highlight": return sentences.length === (cfg.count || 1);
      case "edit": return Object.keys(fixes).length > 0;
      case "order": return true;
      case "number": return numberValue !== "";
      case "point": return !!point;
      case "write": return written.trim().split(/\s+/).filter(Boolean).length >= (cfg.minWords || 1);
      case "sort": return cfg.items.every((it) => placements[it.id]);
      default: return true;
    }
  }

  // ---------- task renderer ----------

  function renderTask() {
    const t = task;
    const kind = t.answerKind;
    const denom = defaultDenom(t);
    const stepCount = t.stepCount || 1;
    const stepPrompt = kind === "steps" || kind === "challenge" ? (t.stepPrompts && t.stepPrompts[step - 1]) || splitSteps(t.question, stepCount)[step - 1] : null;
    const fracValue = frac || { n: 0, d: denom };
    const pressMatch = String(t.question || "").match(/press ([A-Z][A-Za-z]*(?: signal)?)/);
    const pressLabel = pressMatch ? pressMatch[1] : null;
    const fillLevel = frac && frac.d === denom ? frac.n : frac ? Math.round((frac.n / frac.d) * denom) : (t.fill && t.fill.start) || 0;

    const header = (
      <>
        <CrewLine who={t.speaker} text={t.line} />
        {t.nova ? <CrewLine who="nova" text={t.nova.replace(/^Nova:\s*/, "")} /> : null}
        {kind === "steps" || kind === "challenge" ? (
          <div className="es-steps">
            {Array.from({ length: stepCount }, (_, i) => (
              <span key={i} className={`es-step-dot ${i + 1 < step ? "done" : i + 1 === step ? "now" : ""}`}>{i + 1}</span>
            ))}
            <p className="es-question">{stepPrompt}</p>
          </div>
        ) : kind === "parts" ? null : (
          <p className="es-question">{t.question}</p>
        )}
        {t.data ? <DataTable data={t.data} /> : null}
        {t.visual && ["debate", "sort"].includes(kind) ? <Visual key={`${taskId}-hv`} v={t.visual} value={numberValue} onChange={setNumberValue} onModel={setModel} point={point} onPoint={setPoint} /> : null}
      </>
    );

    // ----- Crew Debate -----
    if (kind === "debate") {
      return (
        <>
          {header}
          <div className="es-debate">
            {["kai", "nova"].map((w) => (
              <button key={w} type="button" className={`es-choice es-who ${who === w ? "on" : ""}`} onClick={() => setWho(w)}>
                <Avatar who={w} size={32} /> {CREW[w].short} is right
              </button>
            ))}
          </div>
          <p className="es-sub">Pick the best reason.</p>
          {Choices({ list: (t.reasons || []).map((r) => ({ id: r.id, text: r.text })), value: reason, onPick: setReason })}
          <label className="es-label">
            {t.writtenPrompt}
            <textarea className="es-textarea" rows={3} value={written} onChange={(e) => setWritten(e.target.value)} />
          </label>
          {SureRow()}
          {Actions({ ready: !!who && !!reason && written.trim().length >= 8 })}
        </>
      );
    }

    // ----- Repair (find the mistake) -----
    if (kind === "mistake") {
      return (
        <>
          {header}
          <div className="es-log" role="group" aria-label="Log entry">
            {t.repair.log.map((part) => (
              <button key={part.id} type="button" className={`es-log-part ${tap === part.id ? "on" : ""}`} onClick={() => setTap(part.id)}>
                {part.text}
              </button>
            ))}
          </div>
          <p className="es-sub">What went wrong?</p>
          {Choices({ list: t.repair.errors, value: errorPick, onPick: setErrorPick })}
          <p className="es-sub">Write the right answer.</p>
          <FracInput value={fracValue} onChange={setFrac} defaultD={denom} />
          {SureRow()}
          {Actions({ ready: !!tap && !!errorPick })}
        </>
      );
    }

    // ----- Numberless -----
    if (kind === "numberless") {
      const nl = t.numberless;
      if (stage === "questions") {
        return (
          <>
            {header}
            <p className="es-sub">Pick every question the story could answer.</p>
            {Choices({ list: nl.questions, value: picks, onPick: (id) => setPicks(toggleIn(picks, id)), multi: true })}
            {SureRow()}
            {Actions({ ready: picks.length > 0, label: "Show the numbers" })}
          </>
        );
      }
      return (
        <>
          <CrewLine who={t.speaker} text={nl.reveal} />
          <p className="es-question">{nl.ask}</p>
          <FracInput value={fracValue} onChange={setFrac} defaultD={nl.denom || denom} />
          {SureRow()}
          {Actions()}
        </>
      );
    }

    // ----- Scoops -----
    if (kind === "scoops") {
      const sc = t.scoops;
      const d = sc.denom;
      if (stage === "missing") {
        return (
          <>
            {header}
            <TankVisual denom={d} filled={sc.start.n} label={`Target: ${fracLabel(sc.target.n, d)}`} />
            <p className="es-question">{t.missingPrompt || "How much more do we need?"}</p>
            <FracInput value={fracValue} onChange={setFrac} defaultD={d} />
            {SureRow()}
            {Actions({ label: "Check" })}
          </>
        );
      }
      const poured = scoops.reduce((a, b) => a + b, 0);
      const need = sc.waysNeeded || 1;
      return (
        <>
          <CrewLine who={t.speaker} text={`Now fill it to ${fracLabel(sc.target.n, d)}${need > 1 ? " two different ways" : ""}.`} />
          <TankVisual denom={d} filled={sc.start.n + poured} label={`Target: ${fracLabel(sc.target.n, d)}`} />
          <div className="es-scoop-row">
            {(sc.scoopSizes || [1, 2]).map((size) => (
              <button key={size} type="button" className="es-scoop" onClick={() => setScoops([...scoops, size])}>
                + {fracLabel(size, d)} scoop
              </button>
            ))}
            <button type="button" className="es-btn ghost small" onClick={() => setScoops([])}>Empty</button>
          </div>
          <p className="es-sub">This way: {scoops.length ? scoops.map((s) => fracLabel(s, d)).join(" + ") : "no scoops yet"}</p>
          <div className="es-ways">
            {ways.map((w, i) => (
              <span key={i} className="es-way">Way {i + 1}: {w.map((s) => fracLabel(s, d)).join(" + ")}</span>
            ))}
          </div>
          <div className="es-actions">
            {ways.length < need ? (
              <button type="button" className="es-btn secondary" disabled={!scoops.length} onClick={() => { setWays([...ways, scoops]); setScoops([]); }}>
                Save this way
              </button>
            ) : null}
          </div>
          {SureRow()}
          {Actions({ ready: ways.length >= need })}
        </>
      );
    }

    // ----- Sort Bay -----
    if (kind === "sort") {
      return (
        <>
          {header}
          {SortBoard({ bins: t.sort.bins, items: t.sort.items })}
          {SureRow()}
          {Actions({ ready: t.sort.items.every((it) => placements[it.id]) })}
        </>
      );
    }

    // ----- compare (Travel with two tracks) -----
    if (kind === "compare") {
      const tv = t.travel;
      return (
        <>
          {header}
          {tv.tracks.map((tr) => {
            const total = (tr.moves || []).reduce((a, m) => a + m.n / m.d, 0);
            return (
              <div key={tr.who} className="es-track">
                <div className="es-track-name">{tr.label || (CREW[tr.who] ? CREW[tr.who].short : tr.who)}</div>
                <NumberLine denom={tv.denom} max={tv.max || 1} value={null} marks={[{ n: Math.round(total * tv.denom), d: tv.denom, label: "?" }]} label={tv.label} />
              </div>
            );
          })}
          <p className="es-sub">Who went farther?</p>
          <div className="es-debate">
            {tv.tracks.map((tr) => (
              <button key={tr.who} type="button" className={`es-choice ${who === tr.who ? "on" : ""}`} onClick={() => setWho(tr.who)}>
                {tr.label || (CREW[tr.who] ? CREW[tr.who].short : tr.who)}
              </button>
            ))}
          </div>
          <p className="es-sub">How much farther?</p>
          <FracInput value={fracValue} onChange={setFrac} defaultD={tv.denom} />
          {SureRow()}
          {Actions({ ready: !!who })}
        </>
      );
    }

    // ----- parts (ELAR / science) -----
    if (kind === "parts") {
      const part = currentPart();
      const pk = t.partKinds[step - 1];
      const cfg = { ...part, count: part.count || (t.partSelectCounts && t.partSelectCounts[step - 1]) || 1 };
      const passageIds = part.passage ? [].concat(part.passage) : t.passage;
      return (
        <div className={`es-split ${passageIds && passageIds.length ? "with-passage" : ""}`}>
          {passageIds && passageIds.length ? (
            <PassagePanel
              passages={quest.passages}
              ids={passageIds}
              selectable={pk === "highlight"}
              selected={sentences}
              onToggle={(id) => setSentences(toggleIn(sentences, id, cfg.count))}
              editing={pk === "edit"}
              fixes={fixes}
              onFix={(id, v) => { const f = { ...fixes }; if (v) f[id] = v; else delete f[id]; setFixes(f); }}
              openToken={openToken}
              setOpenToken={setOpenToken}
            />
          ) : null}
          <div className="es-split-task">
            {header}
            <div className="es-steps">
              {t.parts.map((_, i) => (
                <span key={i} className={`es-step-dot ${i + 1 < step ? "done" : i + 1 === step ? "now" : ""}`}>{i + 1}</span>
              ))}
              <p className="es-question">Part {step}: {part.prompt}</p>
            </div>
            {cfg.visual ? <Visual key={`${taskId}-${step}-v`} v={cfg.visual} value={numberValue} onChange={setNumberValue} onModel={setModel} point={point} onPoint={setPoint} /> : null}
            {GenericInput({ kind: pk, cfg: cfg })}
            {SureRow()}
            {Actions({ ready: genericReady(pk, cfg), label: step < t.parts.length ? "Check this part" : "Submit" })}
          </div>
        </div>
      );
    }

    // ----- single generic (ELAR / science) -----
    if (["choice", "multi", "highlight", "edit", "order", "number", "write", "point"].includes(kind)) {
      const cfg = { choices: t.choices, items: t.items, unit: t.unit, minWords: t.minWords, rubric: t.rubric, count: t.selectCount || 1, visual: t.visual };
      const passageIds = t.passage || [];
      return (
        <div className={`es-split ${passageIds.length ? "with-passage" : ""}`}>
          {passageIds.length ? (
            <PassagePanel
              passages={quest.passages}
              ids={passageIds}
              selectable={kind === "highlight"}
              selected={sentences}
              onToggle={(id) => setSentences(toggleIn(sentences, id, cfg.count))}
              editing={kind === "edit"}
              fixes={fixes}
              onFix={(id, v) => { const f = { ...fixes }; if (v) f[id] = v; else delete f[id]; setFixes(f); }}
              openToken={openToken}
              setOpenToken={setOpenToken}
            />
          ) : null}
          <div className="es-split-task">
            {header}
            {cfg.visual ? <Visual key={`${taskId}-v`} v={cfg.visual} value={numberValue} onChange={setNumberValue} onModel={setModel} point={point} onPoint={setPoint} /> : null}
            {GenericInput({ kind: kind, cfg: cfg })}
            {SureRow()}
            {Actions({ ready: genericReady(kind, cfg) })}
          </div>
        </div>
      );
    }

    // ----- Travel (number line) -----
    if (t.travel && (kind === "frac" || kind === "steps")) {
      const tv = t.travel;
      const pos = frac ? Math.round((frac.n / frac.d) * tv.denom) : null;
      const lineMarks = [
        ...(tv.marks || []),
        ...(tv.goal ? [{ ...tv.goal, label: "Goal" }] : []),
        ...(tv.start && tv.start.n > 0 ? [{ ...tv.start, label: "Start" }] : []),
        ...(tv.tracks || []).filter((tr) => tr.mark).map((tr) => ({ ...tr.mark, label: tr.label || tr.who })),
      ];
      const moveText = tv.moves
        ? tv.moves.map((m) => `${m.n < 0 ? "back " : ""}${fracLabel(Math.abs(m.n), m.d)}`).join(", then ")
        : tv.move
        ? `${tv.move.n < 0 ? "back " : "forward "}${fracLabel(Math.abs(tv.move.n), tv.move.d)}`
        : tv.step
        ? `jumps of ${fracLabel(tv.step.n, tv.step.d)}`
        : null;
      return (
        <>
          {header}
          {tv.compareLine ? (
            <NumberLine denom={tv.compareLine.denom} max={tv.max || 1} value={null} marks={[tv.compareLine.mark]} label="Top gauge" />
          ) : null}
          <NumberLine
            denom={tv.denom}
            max={tv.max || 1}
            value={pos}
            marks={lineMarks}
            onPick={(i) => setFrac({ n: i, d: tv.denom })}
            label={tv.label}
          />
          {moveText ? <p className="es-sub">Moves: {moveText}</p> : null}
          <p className="es-sub">Tap the line or set the fraction.</p>
          <FracInput value={fracValue} onChange={setFrac} defaultD={tv.denom} />
          {SureRow()}
          {Actions({ label: (t.stepButtons && t.stepButtons[step - 1]) || pressLabel || (kind === "steps" ? `Check step ${step}` : "Submit") })}
        </>
      );
    }

    // ----- Tune (dial) -----
    if (t.tune && (kind === "frac" || kind === "steps")) {
      const tn = t.tune;
      const lineDenom = tn.lines ? tn.lines[Math.min(step - 1, tn.lines.length - 1)].denom : tn.denom;
      const value = frac ? (frac.n / frac.d) * lineDenom : tn.start ? tn.start.n : 0;
      return (
        <>
          {header}
          <DialVisual denom={lineDenom} value={value} />
          {tn.used ? (
            <p className="es-sub center">
              {tn.startLabel || "Started at"} {fracLabel(tn.start.n, tn.denom)}. {tn.usedLabel || "Used"} {fracLabel(tn.used.n, tn.denom)}.
            </p>
          ) : (
            <p className="es-sub center">This dial goes from 0 to 1 in {lineDenom} equal jumps of {fracLabel(1, lineDenom)}.</p>
          )}
          <FracInput value={fracValue} onChange={setFrac} defaultD={lineDenom} />
          {SureRow()}
          {Actions({ label: (t.stepButtons && t.stepButtons[step - 1]) || pressLabel || "Lock signal" })}
        </>
      );
    }

    // ----- Fill (tank, grid, or strip) -----
    const fl = t.fill || { denom };
    return (
      <>
        {header}
        {fl.grid ? (
          <GridVisual grid={fl.grid} denom={fl.denom} filled={frac && frac.d === fl.denom ? frac.n : 0} onPick={(n) => setFrac({ n, d: fl.denom })} />
        ) : fl.strip ? (
          <GridVisual grid={{ rows: 1, cols: fl.denom }} denom={fl.denom} filled={frac && frac.d === fl.denom ? frac.n : 0} onPick={(n) => setFrac({ n, d: fl.denom })} />
        ) : (
          <TankVisual denom={fl.denom} filled={frac ? fillLevel : fl.start || 0} safe={fl.safe} match={fl.match} />
        )}
        {fl.pours ? <p className="es-sub">Pours: {fl.pours.map((p) => fracLabel(p.n, p.d)).join(" + ")}</p> : null}
        <FracInput value={fracValue} onChange={setFrac} defaultD={fl.denom} />
        {SureRow()}
        {Actions({ label: (t.stepButtons && t.stepButtons[step - 1]) || t.pourLabel || pressLabel || (kind === "steps" ? `Check step ${step}` : "Pour") })}
      </>
    );
  }

  // ---------- board ----------

  function QuestBar() {
    const segs = [];
    for (let i = 1; i <= 15; i++) {
      const dia = i % 5 === 0;
      const done = !!(cards[i] && cards[i].done);
      segs.push(<i key={i} className={`${dia ? "es-dia" : "es-seg"} ${done ? "on" : ""}`} title={dia ? `Challenge ${i / 5}` : `Task ${i}`} />);
    }
    return <div className="es-qbar" aria-label={`${doneCount} of 15 tasks done`}>{segs}</div>;
  }

  function Meters() {
    return (
      <div className="es-meters">
        <div className="es-meter"><b>{labels.heat || "Heat"}</b><span>{meters.heat}%</span><i style={{ width: `${meters.heat}%` }} /></div>
        <div className="es-meter"><b>{labels.supplies || "Supplies"}</b><span>{meters.supplies} {labels.suppliesUnit || "days"}</span></div>
        <div className="es-meter"><b>Journal</b><span>{meters.journal}/{quest.journalMax}</span></div>
        <div className="es-meter"><b>Stars</b><span className="es-stars">★ {totalStars}</span></div>
      </div>
    );
  }

  function Board() {
    const a = quest.acts[act];
    const open = actOpen(act);
    const fourDone = a.tasks.every((id) => cards[id] && cards[id].done);
    const fresh = open && act > 1 && ![...a.tasks, a.challenge].some((id) => cards[id] && cards[id].done);
    return (
      <div className="es-board-layout">
        <aside className="es-planet-panel es-glass">
          <img className="es-planet-img" src={planetArt} alt={`The planet ${quest.planet}`} />
          <div className="es-planet-name">{quest.planet}</div>
          <div className="es-planet-outpost">{quest.outpost}</div>
          {Meters()}
        </aside>
        <section className="es-glass es-board-main">
          <div className="es-act-tabs" role="tablist">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                role="tab"
                aria-selected={act === n}
                type="button"
                className={`es-act-tab ${act === n ? "on" : ""} ${actDone(n) ? "done" : ""} ${!actOpen(n) ? "locked" : ""}`}
                onClick={() => setAct(n)}
              >
                <span>Act {n}</span>
                <small>{actDone(n) ? "Complete" : actOpen(n) ? quest.acts[n].short : playable.includes(n) ? "Finish the act before" : "Coming soon"}</small>
              </button>
            ))}
          </div>
          <h2 className="es-title">{a.title}</h2>
          {fresh && a.opening ? (
            <div className="es-transmission compact">
              {a.opening.map((line, i) => <CrewLine key={i} who={act === 2 ? "nova" : "vega"} text={fill(line, firstName)} />)}
            </div>
          ) : null}
          {!open ? (
            <p className="es-locked-note">
              {playable.includes(act) ? `Finish Act ${act - 1} to open this part of the quest.` : "This part of the quest opens soon."}
            </p>
          ) : (
            <>
              <p className="es-sub">Four cards, any order. The challenge opens when all four are done, and it counts double.</p>
              <div className="es-cards">
                {a.tasks.map((id, i) => {
                  const t = quest.tasks[id];
                  const done = cards[id] && cards[id].done;
                  return (
                    <button key={id} type="button" className={`es-card ${done ? "done" : ""}`} onClick={() => openTask(id)}>
                      <span className="es-card-n">{id}</span>
                      <span className="es-card-level">{t.level || (i < 4 ? "Task" : "")}</span>
                      <b>{t.title}</b>
                      <span className="es-card-machine">{t.machine}</span>
                      {done ? <span className="es-stars">{starsGlyph(cards[id].stars)}</span> : null}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className={`es-card challenge ${cards[a.challenge] && cards[a.challenge].done ? "done" : ""}`}
                  disabled={!fourDone}
                  onClick={() => openTask(a.challenge)}
                >
                  <span className="es-card-n">◆ {a.challenge}</span>
                  <span className="es-card-level">{fourDone ? "Surprise challenge" : "Locked · finish the four cards"}</span>
                  <b>{fourDone ? quest.tasks[a.challenge].title : "???"}</b>
                  <span className="es-card-machine">counts double</span>
                  {cards[a.challenge] && cards[a.challenge].done ? <span className="es-stars">{starsGlyph(cards[a.challenge].stars)}</span> : null}
                </button>
              </div>
            </>
          )}
          {alreadySubmitted && questDone ? <p className="es-note good">This quest is turned in. Your teacher can see your stars and written answers.</p> : null}
        </section>
      </div>
    );
  }

  // ---------- page ----------

  return (
    <div className={`es-root es-subject-${subjectKey}`}>
      <BackToHubButton />
      <div className="es-shell">
        <header className="es-top es-glass">
          <div className="es-top-left">
            <div>
              <div className="es-kicker">Expedition Station · {quest.planet}</div>
              <div className="es-top-title">{quest.title}</div>
            </div>
          </div>
          <div className="es-top-right">
            <span className={`es-pill subject`}>{quest.subject}</span>
            <span className="es-pill">{doneCount} of 15</span>
            {QuestBar()}
          </div>
        </header>

        {screen === "opening" ? (
          <div className="es-opening">
            <section className="es-glass es-transmission">
              <div className="es-channel"><span className="es-blink" /> Incoming transmission · {quest.channel || quest.planet}</div>
              {(quest.opening || []).map((line, i) => <CrewLine key={i} who="vega" text={fill(line, firstName)} />)}
            </section>
            <section className="es-glass es-quest-card">
              <img className="es-planet-img float" src={planetArt} alt={`The planet ${quest.planet}`} />
              <div className="es-kicker">New quest</div>
              <h1 className="es-title big">{quest.title}</h1>
              <p className="es-blurb">{quest.blurb}</p>
              <dl className="es-facts">
                <dt>Planet</dt><dd>{quest.planet}</dd>
                <dt>Length</dt><dd>15 tasks in 3 acts</dd>
                <dt>Saving</dt><dd>Automatic after every task</dd>
              </dl>
              <div className="es-skill-chip">{quest.skillsChip}</div>
              <button type="button" className="es-btn big" disabled={busy} onClick={markBriefed}>Set course for {quest.planet}</button>
            </section>
          </div>
        ) : null}

        {screen === "board" ? Board() : null}

        {screen === "task" && task ? (
          <section className="es-glass es-task">
            <div className="es-task-head">
              <div>
                <div className="es-kicker">
                  {task.challenge ? "Surprise challenge" : `Task ${taskId}`} · {task.machine} · Act {task.act}
                </div>
                <h2 className="es-title">{task.title}</h2>
              </div>
              <button type="button" className="es-btn ghost small" onClick={backToBoard}>Back to board</button>
            </div>
            {renderTask()}
            {note ? <div className={`es-note ${note.kind}`} role="status">{note.text}</div> : null}
          </section>
        ) : null}

        {screen === "actComplete" ? (
          <section className="es-glass es-complete">
            <img className="es-planet-img float" src={planetArt} alt="" />
            <div className="es-kicker">Act {justFinishedAct} complete</div>
            <h1 className="es-title big">{fill(quest.acts[justFinishedAct || 1].complete, firstName)}</h1>
            <p className="es-blurb">{quest.acts[justFinishedAct || 1].teaser}</p>
            {Meters()}
            <button
              type="button"
              className="es-btn big"
              onClick={() => {
                const next = (justFinishedAct || 1) + 1;
                setAct(playable.includes(next) ? next : justFinishedAct || 1);
                setScreen("board");
              }}
            >
              Back to the quest board
            </button>
          </section>
        ) : null}

        {screen === "questComplete" ? (
          <section className="es-glass es-complete">
            <img className="es-planet-img float" src={planetArt} alt="" />
            <div className="es-kicker">Quest complete</div>
            <h1 className="es-title big">{fill(quest.acts[playable[playable.length - 1] || 1].complete, firstName)}</h1>
            {Meters()}
            <div className="es-score-list">
              {Object.keys(quest.tasks).map(Number).sort((x, y) => x - y).map((id) => {
                const t = quest.tasks[id];
                const c = cards[id];
                return (
                  <div key={id} className={`es-score ${t.challenge ? "challenge" : ""}`}>
                    <span>{id} · {t.title}</span>
                    <b>{c && c.done ? starsGlyph(c.stars) : "—"}</b>
                  </div>
                );
              })}
            </div>
            <button type="button" className="es-btn ghost" onClick={() => setScreen("board")}>Review the board</button>
          </section>
        ) : null}
      </div>

      <aside className="es-sam" aria-live="polite">
        <SamIcon skinKey={samSkin} size={56} />
        <div>
          <b>S.A.M.</b>
          <p>{samLine}</p>
        </div>
      </aside>
    </div>
  );
}
