"use client";

import { useMemo, useState } from "react";
import BackToHubButton from "../../../components/BackToHubButton";
import SamIcon from "../../../components/SamIcon";
import "./expedition-station.css";

function fracLabel(n, d) {
  if (n === 0) return "0";
  if (n === d) return "1";
  return `${n}/${d}`;
}

function starsGlyph(n) {
  return "★".repeat(n) + "☆".repeat(Math.max(0, 3 - n));
}

function fillMeters(quest, cards) {
  const meters = { ...quest.meterStart };
  [1, 2, 3, 4, 5].forEach((id) => {
    if (!cards[id] || !cards[id].done) return;
    const t = quest.tasks[id];
    if (!t || !t.meter) return;
    if (t.meter.heat) meters.heat = Math.min(100, meters.heat + t.meter.heat);
    if (t.meter.supplies) meters.supplies += t.meter.supplies;
    if (t.discovery) meters.journal += 1;
  });
  return meters;
}

export default function ExpeditionStationClient({
  assignmentId,
  publicCase,
  studentFirstName,
  existingData,
  alreadySubmitted,
  samSkin,
}) {
  const quest = publicCase;
  const firstName = studentFirstName || "Specialist";
  const saved = existingData || { briefed: false, cards: {} };

  const [screen, setScreen] = useState(saved.briefed ? (saved.act1Done ? "complete" : "board") : "opening");
  const [cards, setCards] = useState(saved.cards || {});
  const [taskId, setTaskId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);
  const [wrongTries, setWrongTries] = useState(0);
  const [usedHint, setUsedHint] = useState(false);
  const [sure, setSure] = useState(null);
  const [samLine, setSamLine] = useState("Tap a card on the mission board. Any order is fine.");

  // machine local state
  const [pickN, setPickN] = useState(null);
  const [pickD, setPickD] = useState(null);
  const [who, setWho] = useState(null);
  const [reason, setReason] = useState(null);
  const [written, setWritten] = useState("");
  const [scoopStep, setScoopStep] = useState("missing");
  const [scoops, setScoops] = useState([]);
  const [ways, setWays] = useState([]);
  const [challengeStep, setChallengeStep] = useState(1);

  const meters = useMemo(() => fillMeters(quest, cards), [quest, cards]);
  const doneBoard = [1, 2, 3, 4].filter((id) => cards[id] && cards[id].done).length;
  const challengeOpen = doneBoard === 4;
  const actDone = challengeOpen && cards[5] && cards[5].done;
  const totalStars = Object.values(cards).reduce((sum, c) => sum + (c && c.done ? c.stars || 0 : 0), 0);

  function resetMachine() {
    setPickN(null);
    setPickD(null);
    setWho(null);
    setReason(null);
    setWritten("");
    setScoopStep("missing");
    setScoops([]);
    setWays([]);
    setChallengeStep(1);
    setWrongTries(0);
    setUsedHint(false);
    setSure(null);
    setNote(null);
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
      // local continue even if network hiccups
    }
    setBusy(false);
    setScreen("board");
    setSamLine("Four cards. Any order. The challenge unlocks when all four are done.");
  }

  function openTask(id) {
    const task = quest.tasks[id];
    if (!task || task.locked) return;
    if (id === 5 && !challengeOpen) return;
    if (cards[id] && cards[id].done) {
      setSamLine(`Already done · ${starsGlyph(cards[id].stars)}. Pick another card.`);
      return;
    }
    resetMachine();
    setTaskId(id);
    setScreen("task");
    setPickD(task.fill ? task.fill.denom : task.tune ? task.tune.denom : task.scoops ? task.scoops.denom : 8);
    setSamLine(task.hint ? "Need a nudge? Tap Hint. It won't give the answer away." : "Take your time — nothing is timed.");
  }

  async function submitAttempt(extra) {
    if (busy) return;
    if (!sure) {
      setNote({ kind: "bad", text: "Quick check: how sure are you? Tap one, then submit." });
      return;
    }
    setBusy(true);
    setNote(null);
    const body = {
      assignmentId,
      taskId,
      wrongTries,
      usedHint,
      sure,
      ...extra,
    };
    try {
      const res = await fetch("/api/expedition-station/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setNote({ kind: "bad", text: data.error || "Could not save. Try again." });
        setBusy(false);
        return;
      }
      if (!data.ok) {
        setWrongTries((n) => n + 1);
        setNote({ kind: "bad", text: data.feedback || "Not yet." });
        setSamLine(data.hint || quest.tasks[taskId].hint);
        setBusy(false);
        return;
      }
      if (data.partial) {
        setNote({ kind: "good", text: data.feedback });
        if (data.next === "scoops") setScoopStep("scoops");
        if (data.next === 2) {
          setChallengeStep(2);
          setPickN(null);
        }
        setBusy(false);
        return;
      }
      const nextCards = { ...cards, [taskId]: { done: true, stars: data.stars, sure } };
      setCards(nextCards);
      setNote({ kind: "good", text: `${data.feedback} ${starsGlyph(data.stars)}` });
      if (data.discovery) {
        setSamLine(`Discovery · ${data.discovery.name}: ${data.discovery.fact}`);
      } else if (data.meter) {
        setSamLine(`${data.meter.label}: ${data.meter.story}`);
      } else {
        setSamLine("Saved. Back to the board when you're ready.");
      }
      if (data.actComplete) {
        setTimeout(() => setScreen("complete"), 900);
      } else {
        setTimeout(() => {
          setScreen("board");
          setTaskId(null);
          resetMachine();
        }, 900);
      }
    } catch (err) {
      setNote({ kind: "bad", text: "Network hiccup. Try submit again." });
    }
    setBusy(false);
  }

  function showHint() {
    setUsedHint(true);
    const task = quest.tasks[taskId];
    setSamLine(task.hint);
  }

  function renderQuestBar() {
    const segs = [];
    for (let i = 1; i <= 15; i++) {
      const dia = i % 5 === 0;
      const filled = i <= 5 ? !!(cards[i] && cards[i].done) : false;
      const locked = i > 5;
      const next = !filled && !locked && (i <= 4 ? doneBoard + 1 === i : challengeOpen && i === 5);
      segs.push(
        <i
          key={i}
          className={`${dia ? "es-dia" : "es-seg"} ${filled ? "on" : ""} ${locked ? "lk" : ""} ${next ? "next" : ""}`}
          title={dia ? `Challenge ${i / 5}` : `Task ${i}`}
        />
      );
    }
    return <div className="es-qbar">{segs}</div>;
  }

  function FracPicker({ denom, value, onPick, max }) {
    const top = max != null ? max : denom;
    const opts = [];
    for (let n = 0; n <= top; n++) opts.push(n);
    return (
      <div className="es-frac-grid">
        {opts.map((n) => (
          <button
            key={n}
            type="button"
            className={`es-frac ${value === n ? "on" : ""}`}
            onClick={() => onPick(n, denom)}
          >
            {fracLabel(n, denom)}
          </button>
        ))}
      </div>
    );
  }

  function TankVisual({ denom, filled, safe }) {
    const pct = Math.max(0, Math.min(100, (filled / denom) * 100));
    const safePct = safe != null ? Math.max(0, Math.min(100, (safe / denom) * 100)) : null;
    return (
      <div className="es-gauge">
        <div className="es-tank" aria-hidden="true">
          <div className="es-fuel" style={{ height: `${pct}%` }} />
          {safePct != null ? <div className="es-safe" style={{ bottom: `${safePct}%` }} /> : null}
        </div>
        <div className="es-ticks">
          {Array.from({ length: denom + 1 }, (_, i) => (
            <span key={i}>{fracLabel(i, denom)}</span>
          ))}
        </div>
      </div>
    );
  }

  function SureRow() {
    return (
      <div className="es-sure" aria-label="How sure are you?">
        {["Very sure", "Kind of sure", "Not sure yet"].map((label) => (
          <button
            key={label}
            type="button"
            className={`es-frac ${sure === label ? "on" : ""}`}
            onClick={() => setSure(label)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }

  function renderTask() {
    const task = quest.tasks[taskId];
    if (!task) return null;

    if (task.machine === "Crew Debate") {
      return (
        <>
          <div className="es-line">{task.line}</div>
          {task.nova ? <div className="es-line nova">{task.nova}</div> : null}
          <p>{task.question}</p>
          <div className="es-debate">
            <button type="button" className={`es-choice ${who === "kai" ? "on" : ""}`} onClick={() => setWho("kai")}>
              Kai is right
            </button>
            <button type="button" className={`es-choice ${who === "nova" ? "on" : ""}`} onClick={() => setWho("nova")}>
              Nova is right
            </button>
          </div>
          <div className="es-reasons">
            {(task.reasons || []).map((r) => (
              <button
                key={r.id}
                type="button"
                className={`es-choice ${reason === r.id ? "on" : ""}`}
                onClick={() => setReason(r.id)}
              >
                <b>{r.id}.</b> {r.text}
              </button>
            ))}
          </div>
          <label>
            <div style={{ marginTop: 12, color: "var(--es-muted)", fontSize: 13 }}>{task.writtenPrompt}</div>
            <textarea className="es-textarea" value={written} onChange={(e) => setWritten(e.target.value)} />
          </label>
          <SureRow />
          <div className="es-row">
            <button type="button" className="es-btn ghost" onClick={showHint}>
              Hint
            </button>
            <button
              type="button"
              className="es-btn"
              disabled={busy || !who || !reason}
              onClick={() => submitAttempt({ who, reason, written })}
            >
              Submit
            </button>
          </div>
        </>
      );
    }

    if (task.machine === "Tune" && task.tune) {
      const denom = task.tune.denom;
      const angle = pickN == null ? (task.tune.start.n / denom) * 360 : (pickN / denom) * 360;
      return (
        <>
          <div className="es-line">{task.line}</div>
          <p>{task.question}</p>
          <div className="es-dial" aria-hidden="true">
            <div className="es-needle" style={{ transform: `rotate(${angle}deg)` }} />
          </div>
          {task.tune.used ? (
            <p style={{ textAlign: "center", color: "var(--es-muted)" }}>
              {task.tune.startLabel || "Started at"} {fracLabel(task.tune.start.n, denom)}.{" "}
              {task.tune.usedLabel || "Cold used"} {fracLabel(task.tune.used.n, denom)}.
            </p>
          ) : (
            <p style={{ textAlign: "center", color: "var(--es-muted)" }}>
              The dial goes from 0 to 1 in {denom} equal jumps of {fracLabel(1, denom)}.
            </p>
          )}
          <FracPicker denom={denom} value={pickN} onPick={(n, d) => { setPickN(n); setPickD(d); }} max={denom + 2} />
          <SureRow />
          <div className="es-row">
            <button type="button" className="es-btn ghost" onClick={showHint}>
              Hint
            </button>
            <button
              type="button"
              className="es-btn"
              disabled={busy || pickN == null}
              onClick={() => submitAttempt({ n: pickN, d: pickD })}
            >
              Lock signal
            </button>
          </div>
        </>
      );
    }

    if (task.scoops) {
      const denom = task.scoops.denom;
      const start = task.scoops.start.n;
      const target = task.scoops.target.n;
      const poured = scoops.reduce((a, b) => a + b, 0);
      const level = start + poured;
      if (scoopStep === "missing") {
        return (
          <>
            <div className="es-line">{task.line}</div>
            <p>{task.missingPrompt || "How much more fuel does the sled need?"}</p>
            <TankVisual denom={denom} filled={start} />
            <FracPicker denom={denom} value={pickN} onPick={(n, d) => { setPickN(n); setPickD(d); }} />
            <SureRow />
            <div className="es-row">
              <button type="button" className="es-btn ghost" onClick={showHint}>
                Hint
              </button>
              <button
                type="button"
                className="es-btn"
                disabled={busy || pickN == null}
                onClick={() => submitAttempt({ step: "missing", n: pickN, d: pickD })}
              >
                Check
              </button>
            </div>
          </>
        );
      }
      return (
        <>
          <div className="es-line">{task.line}</div>
          <p>
            Fill to {fracLabel(target, denom)}{" "}
            {task.scoops.waysNeeded > 1 ? "two different ways" : ""} with{" "}
            {(task.scoops.scoopSizes || [1, 2]).map((size) => fracLabel(size, denom)).join(" and ")} scoops.
          </p>
          <div className="es-scoop-bar" aria-hidden="true">
            {Array.from({ length: denom }, (_, i) => (
              <div
                key={i}
                className={`es-scoop-cell ${i < level ? "on" : ""} ${i + 1 === target ? "target" : ""}`}
              />
            ))}
          </div>
          <p style={{ color: "var(--es-muted)" }}>
            Now at {fracLabel(level, denom)}. Way {ways.length + 1} of 2.
          </p>
          <div className="es-row">
            <button type="button" className="es-btn ghost" onClick={() => setScoops((s) => [...s, 1])}>
              Scoop 1/10
            </button>
            <button type="button" className="es-btn ghost" onClick={() => setScoops((s) => [...s, 2])}>
              Scoop 2/10
            </button>
            <button type="button" className="es-btn ghost" onClick={() => setScoops([])}>
              Clear scoops
            </button>
            <button
              type="button"
              className="es-btn warm"
              onClick={() => {
                if (!scoops.length) return;
                setWays((w) => [...w, scoops]);
                setScoops([]);
              }}
            >
              Save this way
            </button>
          </div>
          <ul className="es-locked-list">
            {ways.map((w, i) => (
              <li key={i}>
                Way {i + 1}: {w.map((x) => `${x}/10`).join(" + ")}
              </li>
            ))}
          </ul>
          <SureRow />
          <div className="es-row">
            <button type="button" className="es-btn ghost" onClick={showHint}>
              Hint
            </button>
            <button
              type="button"
              className="es-btn"
              disabled={busy || ways.length < 2}
              onClick={() => submitAttempt({ step: "scoops", ways })}
            >
              Fill the sled
            </button>
          </div>
        </>
      );
    }

    // Fill (task 1) + Challenge fill (task 5)
    const denom = (task.fill && task.fill.denom) || 8;
    const filled = pickN == null ? (task.fill && task.fill.start) || 0 : pickN;
    const safe = task.fill && task.fill.safe;
    return (
      <>
        <div className="es-line">{task.line}</div>
        <p>
          {task.challenge
            ? (task.stepPrompts && task.stepPrompts[challengeStep - 1]) ||
              (challengeStep === 1
                ? "Step 1: What is the tank level now?"
                : "Step 2: How far above the safe line is the fuel?")
            : task.question}
        </p>
        <TankVisual
          denom={denom}
          filled={challengeStep === 2 && pickN == null && task.fill && task.fill.burn != null ? 6 : filled}
          safe={safe}
        />
        {task.fill && task.fill.pours ? (
          <p style={{ color: "var(--es-muted)" }}>
            Pours: {task.fill.pours.map((p) => fracLabel(p.n, p.d)).join(" + ")}
          </p>
        ) : null}
        {task.challenge && task.fill && task.fill.burn != null ? (
          <p style={{ color: "var(--es-muted)" }}>
            Story: start {fracLabel(task.fill.start, denom)}, burn {fracLabel(task.fill.burn, denom)} ×{" "}
            {task.fill.nights} nights, then add {fracLabel(task.fill.refill, denom)}. Safe line{" "}
            {fracLabel(task.fill.safe, denom)}.
          </p>
        ) : null}
        <FracPicker
          denom={denom}
          value={pickN}
          onPick={(n, d) => {
            setPickN(n);
            setPickD(d);
          }}
          max={task.challenge ? denom + 3 : denom}
        />
        <SureRow />
        <div className="es-row">
          <button type="button" className="es-btn ghost" onClick={showHint}>
            Hint
          </button>
          <button
            type="button"
            className="es-btn"
            disabled={busy || pickN == null}
            onClick={() =>
              submitAttempt(
                task.challenge ? { step: challengeStep, n: pickN, d: pickD } : { n: pickN, d: pickD }
              )
            }
          >
            {task.challenge
              ? (task.stepButtons && task.stepButtons[challengeStep - 1]) ||
                (challengeStep === 1 ? "Check level" : "Check gap")
              : task.pourLabel || "Pour"}
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="es-root">
      <div className="es-top">
        <div className="es-who">
          <BackToHubButton />
          <span className="es-pill math">{quest.subject}</span>
          <span className="es-pill act">
            {actDone ? "Act 1 complete" : challengeOpen ? "Act 1 · challenge ready" : `Act 1 · ${doneBoard} of 4 cards`}
          </span>
          <span className="es-pill">{quest.planet} · {quest.outpost}</span>
        </div>
        <div className="es-meters">
          <div className="es-meter">
            <b>{(quest.meterLabels && quest.meterLabels.heat) || "Heat"}</b>
            <span>{meters.heat}%</span>
          </div>
          <div className="es-meter">
            <b>{(quest.meterLabels && quest.meterLabels.supplies) || "Supplies"}</b>
            <span>
              {meters.supplies} {(quest.meterLabels && quest.meterLabels.suppliesUnit) || "days"}
            </span>
          </div>
          <div className="es-meter">
            <b>Journal</b>
            <span>
              {meters.journal}/{quest.journalMax}
            </span>
          </div>
          <div className="es-meter">
            <b>Stars</b>
            <span className="es-stars">{totalStars}</span>
          </div>
        </div>
      </div>

      <div className="es-panel" style={{ paddingBottom: 12 }}>
        <div className="es-kicker">Quest · {quest.standard}</div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <strong>{quest.title}</strong>
            <div style={{ color: "var(--es-muted)", fontSize: 13 }}>
              {Object.values(cards).filter((c) => c && c.done).length} of 15 tasks · Act 1 playable
            </div>
          </div>
          {renderQuestBar()}
        </div>
      </div>

      {screen === "opening" ? (
        <div className="es-panel">
          <div className="es-kicker">Opening transmission</div>
          <h1 className="es-title">{quest.title}</h1>
          <p className="es-blurb">{quest.blurb}</p>
          <p className="es-blurb">{quest.skillsChip}</p>
          {(quest.opening || []).map((line, i) => (
            <div className="es-line" key={i}>
              {line.replace("{name}", firstName).replace("{firstName}", firstName)}
            </div>
          ))}
          <div className="es-row">
            <button type="button" className="es-btn" disabled={busy} onClick={markBriefed}>
              Open mission board
            </button>
          </div>
        </div>
      ) : null}

      {screen === "board" ? (
        <div className="es-panel">
          <div className="es-kicker">{quest.acts[1].title}</div>
          <h2 className="es-title" style={{ fontSize: 22 }}>
            Mission board
          </h2>
          <p className="es-blurb">Four cards, any order. Challenge 1 unlocks when all four are done.</p>
          <div className="es-board">
            {[1, 2, 3, 4].map((id) => {
              const t = quest.tasks[id];
              const done = cards[id] && cards[id].done;
              return (
                <button key={id} type="button" className={`es-card ${done ? "done" : ""}`} onClick={() => openTask(id)}>
                  <div className="lvl">
                    Card {id} · {t.level}
                  </div>
                  <h3>{t.title}</h3>
                  <div className="mach">{t.machine}</div>
                  {done ? <div className="es-stars">{starsGlyph(cards[id].stars)}</div> : null}
                </button>
              );
            })}
            <button
              type="button"
              className={`es-card challenge ${cards[5] && cards[5].done ? "done" : ""}`}
              disabled={!challengeOpen}
              onClick={() => openTask(5)}
            >
              <div className="lvl">Challenge 1 {challengeOpen ? "· unlocked" : "· locked"}</div>
              <h3>{quest.tasks[5].title}</h3>
              <div className="mach">{quest.tasks[5].machine} · counts double</div>
              {cards[5] && cards[5].done ? <div className="es-stars">{starsGlyph(cards[5].stars)}</div> : null}
            </button>
          </div>
          <div style={{ marginTop: 18 }}>
            <div className="es-kicker">Later acts (coming next)</div>
            <ul className="es-locked-list">
              <li>{quest.acts[2].title} — locked</li>
              <li>{quest.acts[3].title} — locked</li>
            </ul>
          </div>
          {alreadySubmitted || actDone ? (
            <p className="es-note good">Act 1 is saved. Your teacher can see your stars and written reason.</p>
          ) : null}
        </div>
      ) : null}

      {screen === "task" && taskId ? (
        <div className="es-panel">
          <div className="es-kicker">
            Task {taskId} · {quest.tasks[taskId].machine} · TEKS {quest.teks}
          </div>
          <h2 className="es-title" style={{ fontSize: 22 }}>
            {quest.tasks[taskId].title}
          </h2>
          {renderTask()}
          {note ? <div className={`es-note ${note.kind}`}>{note.text}</div> : null}
          <div className="es-row">
            <button
              type="button"
              className="es-btn ghost"
              onClick={() => {
                setScreen("board");
                setTaskId(null);
                resetMachine();
              }}
            >
              Back to board
            </button>
          </div>
        </div>
      ) : null}

      {screen === "complete" ? (
        <div className="es-panel">
          <div className="es-kicker">Act 1 complete</div>
          <h1 className="es-title">{quest.acts[1].complete.replace("{firstName}", firstName)}</h1>
          <p className="es-blurb">{quest.acts[1].teaser}</p>
          <p>
            Stars this act: <span className="es-stars">{totalStars}</span>
          </p>
          <p className="es-blurb">
            {(quest.meterLabels && quest.meterLabels.heat) || "Heat"} {meters.heat}% ·{" "}
            {(quest.meterLabels && quest.meterLabels.supplies) || "Supplies"} {meters.supplies}{" "}
            {(quest.meterLabels && quest.meterLabels.suppliesUnit) || "days"} · Journal {meters.journal}/{quest.journalMax}
          </p>
          <div className="es-row">
            <button type="button" className="es-btn good" onClick={() => setScreen("board")}>
              Review board
            </button>
          </div>
        </div>
      ) : null}

      <div className="es-sam">
        <SamIcon skinKey={samSkin} size={56} />
        <div>
          <b>S.A.M.</b>
          <div style={{ color: "var(--es-muted)", marginTop: 4 }}>{samLine}</div>
        </div>
      </div>
    </div>
  );
}
