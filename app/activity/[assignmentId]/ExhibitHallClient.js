"use client";

import { useRef, useState } from "react";
import "./exhibit-hall.css";

function CardFace({ card, tall }) {
  if (card.kind === "text") return <p className="ms-quote">{card.text}</p>;
  if (card.kind === "graph" || card.kind === "chart") {
    const bars = card.bars || [];
    return (
      <div className={tall ? "ms-graph is-tall" : "ms-graph"}>
        {bars.map((bar, index) => (
          <div key={bar.label}><span style={{ height: bar.height, background: index === 0 ? "#1aa7b5" : "#6d45c8" }} /><small>{bar.label}</small></div>
        ))}
      </div>
    );
  }
  return <img src={card.image} alt="" style={tall ? { width: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 12 } : undefined} />;
}

export default function ExhibitHallClient({ assignmentId, publicCase, alreadySubmitted }) {
  const exhibit = publicCase;
  const cards = exhibit.cards;
  const spots = exhibit.spots;
  const cardBy = (id) => cards.find((card) => card.id === id);

  const [step, setStep] = useState(alreadySubmitted ? "done" : "build");
  const [picked, setPicked] = useState(null);
  const [wall, setWall] = useState([null, null, null, null]);
  const [bin, setBin] = useState(null);
  const [reason, setReason] = useState(null);
  const [look, setLook] = useState(null);
  const [checks, setChecks] = useState(0);
  const [lines, setLines] = useState({});
  const [plaque, setPlaque] = useState("");
  const [best, setBest] = useState({ one: "", two: "" });
  const [fooled, setFooled] = useState("");
  const [leftOut, setLeftOut] = useState("");
  const [held, setHeld] = useState("");
  const [finding, setFinding] = useState("");
  const [heatPick, setHeatPick] = useState(null);
  const [sandPicks, setSandPicks] = useState([]);
  const [daysFalse, setDaysFalse] = useState(null);
  const [notePick, setNotePick] = useState(null);
  const [stamps, setStamps] = useState({});
  const [pending, setPending] = useState(null);
  const [status, setStatus] = useState("Open a card and stamp it before you use it.");
  const [busy, setBusy] = useState(false);
  const dragRef = useRef(null);
  const skipClick = useRef(false);
  const [ghost, setGhost] = useState(null);

  const used = new Set([...wall.filter(Boolean), bin].filter(Boolean));
  const loose = cards.filter((card) => !used.has(card.id));
  const wallIds = wall.filter(Boolean);
  const heldCard = cards.find((card) => !wall.includes(card.id) && card.id !== bin);

  function payload(kind) {
    return {
      assignmentId, kind, wall, bin, reason, stamps, lines, plaque, best, fooled, leftOut, held, finding, heatPick, sandPicks, daysFalse, notePick,
    };
  }

  async function send(kind) {
    setBusy(true);
    const response = await fetch("/api/exhibit-hall/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload(kind)),
    });
    const data = await response.json().catch(() => ({}));
    setBusy(false);
    return data;
  }

  function putOnSpot(id, slot) {
    setWall((prev) => {
      const next = prev.map((item) => (item === id ? null : item));
      next[slot] = id;
      return next;
    });
    if (bin === id) {
      setBin(null);
      setReason(null);
    }
    setPicked(null);
  }

  function putInBin(id) {
    setWall((prev) => prev.map((item) => (item === id ? null : item)));
    setBin(id);
    setReason(null);
    setPicked(null);
  }

  function putAway(id) {
    setWall((prev) => prev.map((item) => (item === id ? null : item)));
    if (bin === id) {
      setBin(null);
      setReason(null);
    }
    setPicked(null);
  }

  function trySpot(id, slot) {
    if (!stamps[id]) {
      setPending({ id, target: slot });
      setLook(id);
      setStatus("Look at it and choose what kind of source it is.");
      return;
    }
    putOnSpot(id, slot);
  }

  function tryBin(id) {
    if (!stamps[id]) {
      setPending({ id, target: "bin" });
      setLook(id);
      setStatus("Look at it and choose what kind of source it is.");
      return;
    }
    putInBin(id);
  }

  function chooseStamp(kind) {
    if (!look) return;
    const id = look;
    const drop = pending;
    setStamps((prev) => ({ ...prev, [id]: kind }));
    setLook(null);
    setPending(null);
    if (drop?.id === id) {
      if (drop.target === "bin") putInBin(id);
      else putOnSpot(id, drop.target);
      return;
    }
    setPicked(id);
  }

  function onPointerDown(event, id) {
    if (event.button !== 0) return;
    dragRef.current = { id, x: event.clientX, y: event.clientY, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    const drag = dragRef.current;
    if (!drag) return;
    if (!drag.moved && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 8) return;
    drag.moved = true;
    setGhost({ id: drag.id, x: event.clientX, y: event.clientY });
  }

  function onPointerUp(event) {
    const drag = dragRef.current;
    dragRef.current = null;
    setGhost(null);
    if (!drag?.moved) return;
    skipClick.current = true;
    const under = document.elementFromPoint(event.clientX, event.clientY);
    const drop = under?.closest("[data-drop]")?.dataset.drop;
    if (drop === "bin") tryBin(drag.id);
    else if (drop === "storage") putAway(drag.id);
    else if (drop?.startsWith("spot-")) trySpot(drag.id, Number(drop.slice(5)));
  }

  async function check() {
    if (wallIds.length < 4 || !bin || !reason) {
      setStatus("Use all 4 spots, and put one piece in the bin with a reason.");
      return;
    }
    const data = await send("wall");
    if (data.need === "wall") {
      setStatus("Use all 4 spots, and put one piece in the bin with a reason.");
      return;
    }
    setChecks(1);
    setStatus("Saved. A wrong piece can stay. The first save is the one that counts.");
  }

  async function turnIn() {
    const data = await send("turnin");
    if (data.need === "wall") {
      setStatus("Save the wall before you turn it in.");
      return;
    }
    if (data.ok) setStep("done");
  }

  function piece(id) {
    const card = cardBy(id);
    return (
      <button
        type="button"
        className={picked === id ? "ms-piece is-on" : "ms-piece"}
        onPointerDown={(event) => onPointerDown(event, id)}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={() => {
          if (skipClick.current) {
            skipClick.current = false;
            return;
          }
          setPicked(id);
        }}
      >
        <CardFace card={card} />
        <b>{card.title}</b>
        <span>{card.tag}</span>
        {stamps[id] ? <span>{stamps[id]}</span> : null}
      </button>
    );
  }

  return (
    <div className="ms-page">
      <div className="ms-shell">
        <header className="ms-top">
          <div>
            <p className="ms-kicker">{exhibit.kicker}</p>
            <h1>{exhibit.title}</h1>
            <p className="ms-quiet">{step === "build" ? "1 · The wall" : step === "write" ? "2 · The labels" : step === "open" ? "3 · New source" : "Turned in"}</p>
          </div>
        </header>

        <section className="ms-card">
          <p className="ms-kicker">The job</p>
          <h2>{exhibit.job}</h2>
          <p>{exhibit.detail}</p>
        </section>

        {step === "build" && (
          <div className="ms-layout">
            <section className="ms-panel">
              <h2>Storage room</h2>
              <p className="ms-quiet">{loose.length} cards left. Open one and stamp it, then drag it to a spot.</p>
              <div className="ms-cards" data-drop="storage">
                {loose.map((card) => (
                  <div key={card.id}>
                    {piece(card.id)}
                    <button type="button" className="ms-ghost" onClick={() => setLook(card.id)}>Bigger</button>
                  </div>
                ))}
              </div>
            </section>
            <div>
              <section className="ms-panel">
                <h2>Your wall · one problem each</h2>
                <div className="ms-wall">
                  {wall.map((id, index) => (
                    <div key={spots[index].id} className={picked || ghost ? "ms-slot is-on" : "ms-slot"} data-drop={`spot-${index}`}>
                      <b>{spots[index].label}</b>
                      {id ? piece(id) : <button type="button" className="ms-ghost" onClick={() => picked && trySpot(picked, index)}>Empty spot</button>}
                    </div>
                  ))}
                </div>
                <div className={picked || ghost ? "ms-bin is-on" : "ms-bin"} data-drop="bin">
                  <b>Not in this exhibit</b>
                  {bin ? piece(bin) : <p className="ms-quiet">Put one piece here that does not belong.</p>}
                  {bin && (
                    <div className="ms-reasons">
                      {exhibit.reasons.map((item) => (
                        <button key={item.id} type="button" aria-pressed={reason === item.id} onClick={() => setReason(item.id)}>{item.label}</button>
                      ))}
                    </div>
                  )}
                  {!bin && <button type="button" className="ms-ghost" onClick={() => picked && tryBin(picked)}>Put the chosen card here</button>}
                </div>
              </section>
              <aside className="ms-panel ms-sam">
                <p className="ms-kicker">SAM</p>
                <p>The four spots are four different problems.</p>
              </aside>
            </div>
          </div>
        )}

        {step === "write" && (
          <section className="ms-panel">
            <p className="ms-kicker">1 · The plaque</p>
            <p className="ms-sentence">This exhibit shows <input aria-label="What the exhibit shows" value={plaque} onChange={(event) => setPlaque(event.target.value)} />.</p>
            <p className="ms-sentence">The two pieces a visitor should look at first are <input aria-label="First piece" value={best.one} onChange={(event) => setBest((prev) => ({ ...prev, one: event.target.value }))} /> and <input aria-label="Second piece" value={best.two} onChange={(event) => setBest((prev) => ({ ...prev, two: event.target.value }))} />.</p>
            <p className="ms-kicker">2 · The labels</p>
            <div className="ms-wall">
              {wall.map((id, index) => (
                <div key={spots[index].id} className="ms-slot">
                  <b>{spots[index].label}</b>
                  {id ? (
                    <>
                      <CardFace card={cardBy(id)} />
                      <span>{cardBy(id).title}</span>
                      <p className="ms-sentence">I notice <input aria-label={`What you notice on ${cardBy(id).title}`} value={lines[id]?.what || ""} onChange={(event) => setLines((prev) => ({ ...prev, [id]: { what: event.target.value, why: prev[id]?.why || "" } }))} />.</p>
                      <p className="ms-sentence">This helps because <input aria-label={`Why ${cardBy(id).title} helps`} value={lines[id]?.why || ""} onChange={(event) => setLines((prev) => ({ ...prev, [id]: { what: prev[id]?.what || "", why: event.target.value } }))} />.</p>
                    </>
                  ) : <p className="ms-quiet">Empty spot</p>}
                </div>
              ))}
            </div>
            <p className="ms-kicker">3 · The piece you kept out</p>
            <div className="ms-bin">
              {bin ? (
                <>
                  <CardFace card={cardBy(bin)} />
                  <span>{cardBy(bin).title}</span>
                  <p className="ms-sentence">Someone might think <input aria-label="What someone might think" value={fooled} onChange={(event) => setFooled(event.target.value)} />.</p>
                  <p className="ms-sentence">This stays out because <input aria-label="Why it stays out" value={leftOut} onChange={(event) => setLeftOut(event.target.value)} />.</p>
                </>
              ) : <p className="ms-quiet">Nothing was left out.</p>}
            </div>
            {heldCard && (
              <>
                <p className="ms-kicker">4 · Still in storage</p>
                <div className="ms-bin">
                  <CardFace card={heldCard} />
                  <span>{heldCard.title}</span>
                  <p className="ms-sentence">I did not use this because <input aria-label="Why it stayed in storage" value={held} onChange={(event) => setHeld(event.target.value)} />.</p>
                </div>
              </>
            )}
            <aside className="ms-panel ms-sam">
              <p className="ms-kicker">SAM</p>
              <p>Say what you see, then say why you used it. Use your own words.</p>
            </aside>
          </section>
        )}

        {step === "open" && (
          <section className="ms-panel">
            <p className="ms-kicker">A note just came in</p>
            <h2>Read it, then see what your sources can answer.</h2>
            <div className="ms-bin">
              <b>{exhibit.lateTitle}</b>
              <p className="ms-quote">{exhibit.late}</p>
              <p className="ms-sentence">This source shows <input aria-label="What the new source shows" value={finding} onChange={(event) => setFinding(event.target.value)} />.</p>
            </div>
            <div className="ms-bin">
              <p>{exhibit.mcPrompt}</p>
              <div className="ms-reasons">
                {exhibit.mc.map((choice) => (
                  <button key={choice} type="button" aria-pressed={heatPick === choice} onClick={() => setHeatPick(choice)}>{choice}</button>
                ))}
              </div>
            </div>
            <div className="ms-bin">
              <p>{exhibit.msPrompt}</p>
              <div className="ms-reasons">
                {exhibit.ms.map((choice) => (
                  <button key={choice} type="button" aria-pressed={sandPicks.includes(choice)} onClick={() => setSandPicks((prev) => prev.includes(choice) ? prev.filter((item) => item !== choice) : [...prev, choice])}>{choice}</button>
                ))}
              </div>
            </div>
            <div className="ms-bin">
              <p>{exhibit.tfPrompt}</p>
              <div className="ms-reasons">
                <button type="button" aria-pressed={daysFalse === false} onClick={() => setDaysFalse(false)}>True</button>
                <button type="button" aria-pressed={daysFalse === true} onClick={() => setDaysFalse(true)}>False</button>
              </div>
            </div>
            <div className="ms-bin">
              <p className="ms-sentence">{exhibit.icLead}{" "}
                <select aria-label="What the new source helps with" value={notePick || ""} onChange={(event) => setNotePick(event.target.value)}>
                  <option value="">choose</option>
                  {exhibit.ic.map((choice) => <option key={choice}>{choice}</option>)}
                </select>.
              </p>
            </div>
            <aside className="ms-panel ms-sam">
              <p className="ms-kicker">SAM</p>
              <p>Answer each one. A wrong answer can stay.</p>
            </aside>
          </section>
        )}

        {step === "done" && (
          <section className="ms-panel">
            <p className="ms-kicker">The Nature Deck</p>
            <h2>{plaque || exhibit.title}</h2>
            <p>The cadets can walk through tomorrow. Your teacher will read what your sources could answer.</p>
          </section>
        )}

        <footer className="ms-foot">
          <p>{status}</p>
          <div className="ms-actions">
            {step === "build" && <button type="button" className="ms-check" disabled={busy} onClick={check}>Save</button>}
            {step === "build" && <button type="button" className="ms-next" disabled={checks < 1} onClick={() => setStep("write")}>Write the labels</button>}
            {step === "write" && <button type="button" className="ms-back" onClick={() => setStep("build")}>Back to the wall</button>}
            {step === "write" && <button type="button" className="ms-next" onClick={() => setStep("open")}>New source</button>}
            {step === "open" && <button type="button" className="ms-back" onClick={() => setStep("write")}>Back to the labels</button>}
            {step === "open" && <button type="button" className="ms-next" disabled={busy} onClick={turnIn}>Turn it in</button>}
          </div>
        </footer>

        {ghost && (
          <div className="ms-float" style={{ left: ghost.x, top: ghost.y }}>
            <CardFace card={cardBy(ghost.id)} />
            <b>{cardBy(ghost.id).title}</b>
          </div>
        )}
        {look && (
          <div className="ms-look" onClick={() => { setLook(null); setPending(null); }}>
            <div onClick={(event) => event.stopPropagation()}>
              <CardFace card={cardBy(look)} tall />
              <h2>{cardBy(look).title}</h2>
              <p>{cardBy(look).tag}</p>
              <p>What kind of source is this?</p>
              <div className="ms-reasons">
                {exhibit.stamps.map((kind) => (
                  <button key={kind} type="button" aria-pressed={stamps[look] === kind} onClick={() => chooseStamp(kind)}>{kind}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
