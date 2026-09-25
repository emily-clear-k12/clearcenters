"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../../components/BackToHubButton";
import SamGuide from "../../../components/SamGuide";
import "./exhibit-hall.css";

function ModelFace({ model }) {
  if (!model) return null;
  if (model.type === "fraction") {
    const parts = model.parts || 1;
    return (
      <div className="ms-model">
        <div className="ms-frac" aria-hidden="true">
          {Array.from({ length: parts }, (_, index) => <i key={index} className={index < model.shaded ? "on" : ""} />)}
        </div>
        {model.note ? <small>{model.note}</small> : null}
      </div>
    );
  }
  if (model.type === "array") {
    const cols = model.cols || 1;
    return (
      <div className="ms-model">
        <div className="ms-array" style={{ gridTemplateColumns: `repeat(${cols}, 18px)` }}>
          {Array.from({ length: (model.rows || 1) * cols }, (_, index) => <i key={index} />)}
        </div>
      </div>
    );
  }
  if (model.type === "shape") return <div className={`ms-model ms-shape is-${model.shape || "square"}`} />;
  if (model.type === "place") {
    return (
      <div className="ms-model ms-place">
        {(model.cells || []).map((cell) => (
          <div key={cell.label}><b>{cell.value}</b><small>{cell.label}</small></div>
        ))}
      </div>
    );
  }
  return null;
}

function ChoiceFace({ cards, title }) {
  const card = cards.find((item) => item.title === title);
  if (!card) return null;
  if (card.kind === "graph") return <span className="ms-choice-tag">Graph</span>;
  if (card.kind === "text") return <span className="ms-choice-tag">Note</span>;
  if (card.kind === "model") return <span className="ms-choice-tag">Model</span>;
  if (!card.image) return null;
  return <img className="ms-choice-pic" src={card.image} alt="" />;
}

function CardFace({ card }) {
  if (card.kind === "text") return <p className="ms-quote">{card.text}</p>;
  if (card.kind === "model") return <ModelFace model={card.model} />;
  if (card.kind === "graph" || card.kind === "chart") {
    const bars = card.bars || [];
    return (
      <div className="ms-graph is-tall">
        {bars.map((bar, index) => (
          <div key={bar.label}><span style={{ height: bar.height, background: index === 0 ? "#1aa7b5" : "#6d45c8" }} /><small>{bar.label}</small></div>
        ))}
      </div>
    );
  }
  if (!card.image) return null;
  return <img src={card.image} alt="" />;
}

export default function ExhibitHallClient({ assignmentId, publicCase, alreadySubmitted, samSkin, samNickname }) {
  const router = useRouter();
  const exhibit = publicCase;
  const cards = exhibit.cards;
  const spots = exhibit.spots;
  const cardBy = (id) => cards.find((card) => card.id === id);

  const [step, setStep] = useState(alreadySubmitted ? "done" : "build");
  const [picked, setPicked] = useState(null);
  const [landed, setLanded] = useState(null);
  const [wall, setWall] = useState([null, null, null, null]);
  const [groups, setGroups] = useState({ left: [], right: [], both: [] });
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
  const [status, setStatus] = useState("Tap a picture. Mark what kind of source it is, then tap the spot it belongs on.");
  const [busy, setBusy] = useState(false);

  const split = exhibit.layout === "split";
  const splitIds = [...groups.left, ...groups.right, ...groups.both];
  const used = new Set([...(split ? splitIds : wall.filter(Boolean)), bin].filter(Boolean));
  const loose = cards.filter((card) => !used.has(card.id));
  const wallIds = wall.filter(Boolean);
  const placedIds = split ? splitIds : wall;
  const heldCards = cards.filter((card) => !placedIds.includes(card.id) && card.id !== bin);

  function payload(kind) {
    return {
      assignmentId, kind, wall, groups, bin, reason, stamps, lines, plaque, best, fooled, leftOut, held, finding, heatPick, sandPicks, daysFalse, notePick,
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
  }

  function putOnSide(id, side) {
    setGroups((prev) => {
      const next = {
        left: prev.left.filter((item) => item !== id),
        right: prev.right.filter((item) => item !== id),
        both: prev.both.filter((item) => item !== id),
      };
      next[side] = [...next[side], id];
      return next;
    });
    if (bin === id) {
      setBin(null);
      setReason(null);
    }
  }

  function putInBin(id) {
    setWall((prev) => prev.map((item) => (item === id ? null : item)));
    setGroups((prev) => ({
      left: prev.left.filter((item) => item !== id),
      right: prev.right.filter((item) => item !== id),
      both: prev.both.filter((item) => item !== id),
    }));
    setBin(id);
    setReason(null);
  }

  function putAway(id) {
    setWall((prev) => prev.map((item) => (item === id ? null : item)));
    if (bin === id) {
      setBin(null);
      setReason(null);
    }
  }

  function trySide(id, side) {
    if (!stamps[id]) {
      setLook(id);
      setStatus("Look at it and choose what kind of source it is.");
      return;
    }
    putOnSide(id, side);
    setLook(null);
    setPicked(null);
    setLanded(id);
    setStatus("It is on the wall.");
  }

  function trySpot(id, slot) {
    if (!stamps[id]) {
      setLook(id);
      setStatus("Look at it and choose what kind of source it is.");
      return;
    }
    putOnSpot(id, slot);
    setLook(null);
    setPicked(null);
    setLanded(id);
    setStatus("It is on the wall.");
  }

  function tryBin(id) {
    if (!stamps[id]) {
      setLook(id);
      setStatus("Look at it and choose what kind of source it is.");
      return;
    }
    putInBin(id);
    setLook(null);
    setPicked(null);
    setLanded(id);
    setStatus("Set aside.");
  }

  function chooseStamp(kind) {
    if (!look) return;
    setStamps((prev) => ({ ...prev, [look]: kind }));
    setPicked(look);
    setLook(null);
    setStatus("Now tap a glowing spot.");
  }

  function openCard(id) {
    setPicked(id);
    if (!stamps[id]) {
      setLook(id);
      setStatus("Look at the whole picture. What kind of source is it?");
      return;
    }
    setStatus("Tap a glowing spot.");
  }

  async function check() {
    const splitReady = groups.left.length && groups.right.length && groups.both.length && bin && reason;
    if (split ? !splitReady : (wallIds.length < 4 || !bin || !reason)) {
      setStatus(split ? "Put at least one piece on each side, one in both, and one in the bin with a reason." : "Use all 4 spots, and put one piece in the bin with a reason.");
      return;
    }
    const data = await send("wall");
    if (data.need === "wall") {
      setStatus(split ? "Put at least one piece on each side, one in both, and one in the bin with a reason." : "Use all 4 spots, and put one piece in the bin with a reason.");
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
      <button type="button" className={picked === id ? "ms-piece is-on" : "ms-piece"} onClick={() => openCard(id)}>
        <span className="ms-thumb"><CardFace card={card} /></span>
        <b>{card.title}</b>
        <span>{card.tag}</span>
        {stamps[id] ? <span>{stamps[id]}</span> : null}
      </button>
    );
  }

  return (
    <div className="ms-page">
      <BackToHubButton />
      <SamGuide
        skinKey={samSkin}
        alt={samNickname || "S.A.M."}
        size={96}
        anchors={{ home: { right: 16, bottom: 16 } }}
        line={step === "build" ? (split ? "Tap a picture, then tap the side it belongs on." : "Tap a picture, then tap a glowing spot.") : step === "write" ? "Say what you see, then why you used it." : step === "open" ? "Look at the wall you already built." : "Head back to the hub when you are ready."}
        state={step === "done" ? "celebrating" : "helping"}
        tipOnTap={step === "build" ? (split ? "Some pieces belong on both sides." : "One picture for each problem. One picture does not belong.") : "Use what you can see on the wall."}
        zIndex={40}
      />
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
              <p className="ms-quiet">{loose.length} left. {split ? "Tap one, then tap the side it belongs on." : "Tap one, then tap the spot it belongs on."}</p>
              <div className="ms-cards">
                {loose.map((card) => (
                  <div key={card.id}>{piece(card.id)}</div>
                ))}
              </div>
            </section>
            <div>
              <section className="ms-panel">
                <h2>{split ? "Your wall · two sides" : "Your wall · one problem each"}</h2>
                {split ? (
                  <div className="ms-split">
                    {["left", "right"].map((side) => {
                      const spot = spots.find((item) => item.id === side);
                      return (
                        <div key={side} className={`ms-slot ms-side${picked ? " is-ready" : ""}${groups[side].includes(landed) ? " is-landed" : ""}`}>
                          <b>{spot ? spot.label : side}</b>
                          {groups[side].map((id) => <div key={id} className="ms-placed">{piece(id)}</div>)}
                          <button type="button" className="ms-drop" aria-label={spot ? spot.label : side} onClick={() => picked && trySide(picked, side)} />
                        </div>
                      );
                    })}
                    <div className={`ms-slot ms-both${picked ? " is-ready" : ""}${groups.both.includes(landed) ? " is-landed" : ""}`}>
                      <b>{(spots.find((item) => item.id === "both") || {}).label || "Both"}</b>
                      {groups.both.map((id) => <div key={id} className="ms-placed">{piece(id)}</div>)}
                      <button type="button" className="ms-drop" aria-label="Both" onClick={() => picked && trySide(picked, "both")} />
                    </div>
                  </div>
                ) : (
                <div className="ms-wall">
                  {wall.map((id, index) => (
                    <div key={spots[index].id} className={`ms-slot${!id && picked ? " is-ready" : ""}${id && landed === id ? " is-landed" : ""}`}>
                      <b>{spots[index].label}</b>
                      {id ? piece(id) : <button type="button" className="ms-drop" aria-label={spots[index].label} onClick={() => picked && trySpot(picked, index)} />}
                    </div>
                  ))}
                </div>
                )}
                <div className={`ms-bin${!bin && picked ? " is-ready" : ""}${bin && landed === bin ? " is-landed" : ""}`}>
                  <b>Not in this exhibit</b>
                  {bin ? piece(bin) : null}
                  {bin && (
                    <div className="ms-reasons">
                      {exhibit.reasons.map((item) => (
                        <button key={item.id} type="button" aria-pressed={reason === item.id} onClick={() => setReason(item.id)}>{item.label}</button>
                      ))}
                    </div>
                  )}
                  {!bin && <button type="button" className="ms-drop" aria-label="Not in this exhibit" onClick={() => picked && tryBin(picked)} />}
                </div>
              </section>
            </div>
          </div>
        )}

        {step === "write" && (
          <section className="ms-panel">
            <p className="ms-kicker">1 · The plaque</p>
            <p className="ms-sentence">This exhibit shows <input aria-label="What the exhibit shows" value={plaque} onChange={(event) => setPlaque(event.target.value)} />.</p>
            <p className="ms-sentence">The two pieces a visitor should look at first are <input aria-label="First piece" value={best.one} onChange={(event) => setBest((prev) => ({ ...prev, one: event.target.value }))} /> and <input aria-label="Second piece" value={best.two} onChange={(event) => setBest((prev) => ({ ...prev, two: event.target.value }))} />.</p>
            <p className="ms-kicker">2 · The labels</p>
            <div className={split ? "ms-split" : "ms-labels"}>
              {split ? ["left", "right", "both"].map((side) => {
                const spot = spots.find((item) => item.id === side);
                return (
                  <div key={side} className={side === "both" ? "ms-slot ms-both" : "ms-slot"}>
                    <b>{spot ? spot.label : side}</b>
                    {groups[side].map((id) => (
                      <div key={id} className="ms-frame"><CardFace card={cardBy(id)} /><strong>{cardBy(id).title}</strong></div>
                    ))}
                    <p className="ms-sentence">This side shows <input aria-label={`What ${spot ? spot.label : side} shows`} value={lines[side]?.what || ""} onChange={(event) => setLines((prev) => ({ ...prev, [side]: { what: event.target.value, why: "" } }))} />.</p>
                  </div>
                );
              }) : wall.map((id, index) => (
                <div key={spots[index].id} className="ms-slot">
                  <b>{spots[index].label}</b>
                  {id ? (
                    <>
                      <div className="ms-frame"><CardFace card={cardBy(id)} /></div>
                      <strong>{cardBy(id).title}</strong>
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
                  <div className="ms-frame"><CardFace card={cardBy(bin)} /></div>
                  <strong>{cardBy(bin).title}</strong>
                  <p className="ms-sentence">Someone might think <input aria-label="What someone might think" value={fooled} onChange={(event) => setFooled(event.target.value)} />.</p>
                  <p className="ms-sentence">This stays out because <input aria-label="Why it stays out" value={leftOut} onChange={(event) => setLeftOut(event.target.value)} />.</p>
                </>
              ) : <p className="ms-quiet">Nothing was left out.</p>}
            </div>
            {heldCards.length > 0 && (
              <>
                <p className="ms-kicker">4 · Still in storage</p>
                <div className="ms-bin">
                  {heldCards.map((card) => (
                    <div key={card.id}>
                      <div className="ms-frame"><CardFace card={card} /></div>
                      <strong>{card.title}</strong>
                    </div>
                  ))}
                  <p className="ms-sentence">I did not use {heldCards.length > 1 ? "these" : "this"} because <input aria-label="Why they stayed in storage" value={held} onChange={(event) => setHeld(event.target.value)} />.</p>
                </div>
              </>
            )}
          </section>
        )}

        {step === "open" && (
          <div className="ms-ask">
            <section className="ms-gallery">
              <p className="ms-kicker">Your exhibit</p>
              <h2>{plaque || exhibit.title}</h2>
              <div className={split ? "ms-split" : "ms-hang"}>
                {split ? ["left", "right", "both"].map((side) => {
                  const spot = spots.find((item) => item.id === side);
                  return (
                    <div key={side} className={side === "both" ? "ms-slot ms-both" : "ms-slot"}>
                      <b>{spot ? spot.label : side}</b>
                      {groups[side].map((id) => (
                        <button key={id} type="button" className="ms-frame" onClick={() => setLook(id)}><CardFace card={cardBy(id)} /><strong>{cardBy(id).title}</strong></button>
                      ))}
                    </div>
                  );
                }) : wall.map((id, index) => (
                  <div key={spots[index].id} className="ms-slot">
                    <b>{spots[index].label}</b>
                    {id ? (
                      <>
                        <button type="button" className="ms-frame" onClick={() => setLook(id)}><CardFace card={cardBy(id)} /></button>
                        <strong>{cardBy(id).title}</strong>
                      </>
                    ) : <p className="ms-quiet">Empty spot</p>}
                  </div>
                ))}
              </div>
              <div className="ms-placard">
                <b>{exhibit.lateTitle}</b>
                <p className="ms-quote">{exhibit.late}</p>
                <p className="ms-sentence">This source shows <input aria-label="What the new source shows" value={finding} onChange={(event) => setFinding(event.target.value)} />.</p>
              </div>
            </section>
            <section className="ms-panel">
              <p className="ms-kicker">What can these sources answer?</p>
              <p>Use your exhibit and the new note. A wrong answer can stay.</p>
              <div className="ms-bin">
                <p>{exhibit.mcPrompt}</p>
                <div className="ms-reasons">
                  {exhibit.mc.map((choice) => (
                    <button key={choice} type="button" className="ms-choice" aria-pressed={heatPick === choice} onClick={() => setHeatPick(choice)}>
                      <ChoiceFace cards={cards} title={choice} />
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ms-bin">
                <p>{exhibit.msPrompt}</p>
                <div className="ms-reasons">
                  {exhibit.ms.map((choice) => (
                    <button key={choice} type="button" className="ms-choice" aria-pressed={sandPicks.includes(choice)} onClick={() => setSandPicks((prev) => prev.includes(choice) ? prev.filter((item) => item !== choice) : [...prev, choice])}>
                      <ChoiceFace cards={cards} title={choice} />
                      {choice}
                    </button>
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
            </section>
          </div>
        )}

        {step === "done" && (
          <section className="ms-panel">
            <p className="ms-kicker">The Nature Deck</p>
            <h2>{plaque || exhibit.title}</h2>
            <p>The cadets can walk through tomorrow. Your teacher will read what your sources could answer.</p>
            <button type="button" className="ms-next" onClick={() => router.push("/home")}>Back to Hub</button>
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

        {look && (
          <div className="ms-look" onClick={() => setLook(null)}>
            <div className="ms-sheet" onClick={(event) => event.stopPropagation()}>
              <CardFace card={cardBy(look)} />
              <h2>{cardBy(look).title}</h2>
              <p>{cardBy(look).tag}</p>
              {step === "build" && (
                <>
                  <p>What kind of source is this?</p>
                  <div className="ms-reasons">
                    {exhibit.stamps.map((kind) => (
                      <button key={kind} type="button" aria-pressed={stamps[look] === kind} onClick={() => chooseStamp(kind)}>{kind}</button>
                    ))}
                  </div>
                </>
              )}
              <button type="button" className="ms-ghost" onClick={() => setLook(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
