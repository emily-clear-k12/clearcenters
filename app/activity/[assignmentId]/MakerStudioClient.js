"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../../components/BackToHubButton";
import SamGuide from "../../../components/SamGuide";
import "./maker-studio.css";

function CardFace({ card }) {
  if (!card) return null;
  if (card.kind === "text" || !card.image) return <p className="mk-quote">{card.text}</p>;
  return <img src={card.image} alt={card.text || card.title} />;
}

function emptyPlacard() {
  return { animal: "", part: "", because: "" };
}

export default function MakerStudioClient({
  assignmentId,
  publicCase,
  existingData,
  alreadySubmitted,
  revisionFeedback,
  samSkin,
  samNickname,
}) {
  const router = useRouter();
  const exhibit = publicCase;
  const cards = exhibit.cards || [];
  const reasons = exhibit.reasons || [];
  const halls = exhibit.halls || [];
  const need = exhibit.wallSize || 4;
  const cardBy = (id) => cards.find((c) => c.id === id);

  const saved = existingData || {};
  const startStep = alreadySubmitted ? "done" : saved.hallId ? (saved.checkAttempts > 0 ? "write" : "build") : "commission";

  const [step, setStep] = useState(startStep);
  const [hallId, setHallId] = useState(saved.hallId || null);
  const [wallColor, setWallColor] = useState(saved.wallColor || "#f4f1fb");
  const [exhibitTitle, setExhibitTitle] = useState(saved.exhibitTitle || "");
  const [wall, setWall] = useState(() => {
    const w = Array.isArray(saved.wall) ? saved.wall.slice(0, need) : [];
    while (w.length < need) w.push(null);
    return w;
  });
  const [bin, setBin] = useState(saved.bin || null);
  const [reason, setReason] = useState(saved.reason || null);
  const [picked, setPicked] = useState(null);
  const [look, setLook] = useState(null);
  const [openedCards, setOpenedCards] = useState(() => new Set(saved.openedCards || []));
  const [placards, setPlacards] = useState(() => saved.placards || {});
  const [plaque, setPlaque] = useState(saved.plaque || "");
  const [confidence, setConfidence] = useState(saved.confidence || null);
  const [checkAttempts, setCheckAttempts] = useState(saved.checkAttempts || 0);
  const [bounce, setBounce] = useState((saved.lastCheck && saved.lastCheck.bounce) || []);
  const [rejectNote, setRejectNote] = useState((saved.lastCheck && saved.lastCheck.rejectNote) || "");
  const [wallNote, setWallNote] = useState((saved.lastCheck && saved.lastCheck.wallNote) || "");
  const [status, setStatus] = useState("Read the job, then pick your hall.");
  const [busy, setBusy] = useState(false);
  const [writeBack, setWriteBack] = useState((saved && saved.writeBack) || null);
  const [crystals, setCrystals] = useState(0);

  const hall = halls.find((h) => h.id === hallId) || halls[0];
  const used = useMemo(() => new Set([...wall.filter(Boolean), bin].filter(Boolean)), [wall, bin]);
  const loose = cards.filter((c) => !used.has(c.id));
  const wallReady = wall.filter(Boolean).length === need && bin && reason;

  function markOpened(id) {
    setOpenedCards((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  function payload(kind) {
    return {
      assignmentId,
      kind,
      hallId,
      wallColor,
      exhibitTitle,
      wall,
      bin,
      reason,
      placards,
      plaque,
      confidence,
      openedCards: [...openedCards],
      checkAttempts,
    };
  }

  async function send(kind) {
    setBusy(true);
    try {
      const response = await fetch("/api/maker-studio/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload(kind)),
      });
      return await response.json().catch(() => ({}));
    } finally {
      setBusy(false);
    }
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
    setStatus("On the wall.");
  }

  function putInBin(id) {
    setWall((prev) => prev.map((item) => (item === id ? null : item)));
    setBin(id);
    setReason(null);
    setPicked(null);
    setStatus("Not in this exhibit — pick why.");
  }

  function putAway(id) {
    setWall((prev) => prev.map((item) => (item === id ? null : item)));
    if (bin === id) {
      setBin(null);
      setReason(null);
    }
    setPicked(null);
  }

  function openCard(id) {
    markOpened(id);
    setLook(id);
    setPicked(id);
  }

  async function checkWall() {
    if (!wallReady) {
      setStatus(`Fill all ${need} spots, put one card aside, and pick a reason.`);
      return;
    }
    const data = await send("check");
    if (data.need === "wall") {
      setStatus(data.message || "Finish the wall first.");
      return;
    }
    setCheckAttempts(data.checkAttempts || checkAttempts + 1);
    setBounce(data.bounce || []);
    setRejectNote(data.rejectNote || "");
    setWallNote(data.wallNote || "");
    if (data.forced && Array.isArray(data.wall)) {
      const next = data.wall.slice(0, need);
      while (next.length < need) next.push(null);
      setWall(next);
      setStatus("Take a look at a strong set. Now write the placards.");
      setStep("write");
      return;
    }
    if ((data.bounce || []).length) {
      const bad = new Set((data.bounce || []).map((b) => b.id));
      setWall((prev) => prev.map((id) => (bad.has(id) ? null : id)));
      setStatus("Some pieces came back. Read why, then try again.");
      return;
    }
    if (data.rejectOk === false) {
      setStatus(data.rejectNote || "Check the reason for the card you left out.");
      return;
    }
    setStatus(data.mythBuster ? "Myth busted! Great eye. Write the placards." : "Wall looks solid. Write the placards.");
    setStep("write");
  }

  async function turnIn() {
    const missing = wall.filter(Boolean).some((id) => {
      const p = placards[id] || emptyPlacard();
      return !(p.animal && p.part && p.because);
    });
    if (missing || plaque.trim().length < 20) {
      setStatus("Finish every placard and the plaque before you turn it in.");
      return;
    }
    if (!confidence) {
      setStatus("How sure are you? Tap a face, then turn in.");
      return;
    }
    const data = await send("turnin");
    if (data.need) {
      setStatus(data.message || "Check the wall before you turn it in.");
      if (data.need === "check") setStep("build");
      return;
    }
    if (data.ok) {
      setWriteBack(data.writeBack || null);
      setCrystals(data.crystals || 0);
      setWallNote(data.wallNote || wallNote);
      setStep("done");
    }
  }

  function updatePlacard(id, key, value) {
    setPlacards((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || emptyPlacard()), [key]: value },
    }));
  }

  const samLine =
    step === "commission"
      ? exhibit.samOpen
      : step === "hall"
        ? "Pick a hall, name your exhibit, and choose a wall color."
        : step === "build"
          ? "Tap a card, then tap a spot — or Not in this exhibit."
          : step === "write"
            ? "Why did each piece earn its spot? Then write the plaque."
            : "Grand opening! Head back to the hub when you are ready.";

  if (!exhibit) {
    return (
      <div className="mk-page">
        <div className="mk-shell">
          <div className="mk-card"><h2>This exhibit is not ready yet.</h2></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mk-page" style={hall ? { backgroundImage: `url(${hall.image})` } : undefined}>
      <BackToHubButton />
      <SamGuide
        skinKey={samSkin}
        alt={samNickname || "S.A.M."}
        size={96}
        anchors={{ home: { right: 16, bottom: 16 } }}
        line={samLine}
        state={step === "done" ? "celebrating" : "helping"}
        tipOnTap={exhibit.hints?.[0] || "Body part. Desert. Prove it."}
      />

      <div className="mk-shell">
        <header className="mk-top">
          <div>
            <p className="mk-kicker">{exhibit.kicker}</p>
            <h1>{exhibitTitle || exhibit.title}</h1>
            <p className="mk-quiet">{exhibit.drivingQuestion}</p>
          </div>
          <div className="mk-quiet">{need} pieces · ~{exhibit.estimatedMinutes} min</div>
        </header>

        {revisionFeedback ? (
          <div className="mk-bounce">Teacher note: {revisionFeedback}</div>
        ) : null}

        {step === "commission" && (
          <>
            <section className="mk-card">
              <h2>From: {exhibit.commission.from}</h2>
              {(exhibit.commission.lines || []).map((line) => (
                <p key={line}>{line}</p>
              ))}
            </section>
            <footer className="mk-foot">
              <span className="mk-quiet">The plaque will answer the question above.</span>
              <button type="button" className="mk-next" onClick={() => setStep("hall")}>Pick my hall</button>
            </footer>
          </>
        )}

        {step === "hall" && (
          <>
            <section className="mk-panel">
              <h2>Pick your hall</h2>
              <p className="mk-quiet">Same number of spots. Only the look changes.</p>
              <div className="mk-halls">
                {halls.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={hallId === h.id ? "mk-hall is-on" : "mk-hall"}
                    onClick={() => {
                      setHallId(h.id);
                      setWallColor((h.wallColors && h.wallColors[0]) || "#f4f1fb");
                    }}
                  >
                    <img src={h.image} alt="" />
                    <b>{h.name}</b>
                    <span className="mk-quiet">{h.tag}</span>
                  </button>
                ))}
              </div>
              <label className="mk-field">
                Name your exhibit
                <input
                  value={exhibitTitle}
                  onChange={(e) => setExhibitTitle(e.target.value)}
                  placeholder={exhibit.title}
                  maxLength={60}
                />
              </label>
              <div className="mk-quiet" style={{ marginTop: 10 }}>Wall color</div>
              <div className="mk-colors">
                {(hall?.wallColors || ["#f4f1fb", "#e8f4fb", "#fff4e6"]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={wallColor === c ? "mk-color is-on" : "mk-color"}
                    style={{ background: c }}
                    aria-label={`Wall color ${c}`}
                    onClick={() => setWallColor(c)}
                  />
                ))}
              </div>
            </section>
            <footer className="mk-foot">
              <button type="button" className="mk-ghost" onClick={() => setStep("commission")}>Back</button>
              <button
                type="button"
                className="mk-next"
                disabled={!hallId}
                onClick={async () => {
                  await send("save");
                  setStep("build");
                  setStatus("Tap a card, then tap a spot on the wall.");
                }}
              >
                Open storage room
              </button>
            </footer>
          </>
        )}

        {step === "build" && (
          <>
            <section className="mk-card">
              <h2>The job</h2>
              <p>{(exhibit.commission.lines || []).slice(-2).join(" ")}</p>
            </section>
            <div className="mk-layout">
              <section className="mk-panel">
                <h2>Storage room</h2>
                <p className="mk-quiet">Tap a card to look. Then tap a wall spot — or Not in this exhibit.</p>
                <div className="mk-cards">
                  {loose.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      className={picked === card.id ? "mk-piece is-on" : "mk-piece"}
                      onClick={() => openCard(card.id)}
                    >
                      <span className="mk-thumb"><CardFace card={card} /></span>
                      <b>{card.title}</b>
                      <span>{card.tag}</span>
                    </button>
                  ))}
                </div>
              </section>
              <section className="mk-panel">
                <h2>Your wall</h2>
                <div className="mk-wall" style={{ backgroundColor: wallColor }}>
                  <div className="mk-wall-spots">
                    {wall.map((id, slot) => {
                      const card = id ? cardBy(id) : null;
                      return (
                        <button
                          key={slot}
                          type="button"
                          className={picked && !id ? "mk-spot is-on" : "mk-spot"}
                          onClick={() => {
                            if (picked) putOnSpot(picked, slot);
                            else if (id) {
                              setPicked(id);
                              setStatus("Tap another spot, the bin, or tap again to put it back.");
                            }
                          }}
                          onDoubleClick={() => id && putAway(id)}
                        >
                          <span className="mk-quiet">Spot {slot + 1}</span>
                          {card ? (
                            <>
                              <CardFace card={card} />
                              <b>{card.title}</b>
                            </>
                          ) : (
                            <span className="mk-quiet">{picked ? "Tap to place" : "Empty"}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mk-bin-row">
                  <button
                    type="button"
                    className={bin ? "mk-bin is-on" : "mk-bin"}
                    onClick={() => {
                      if (picked) putInBin(picked);
                      else setStatus("Pick a card first, then tap here.");
                    }}
                  >
                    <b>Not in this exhibit</b>
                    <div className="mk-quiet">{bin ? cardBy(bin)?.title : "Put one card here on purpose"}</div>
                  </button>
                </div>
                {bin ? (
                  <>
                    <p className="mk-quiet" style={{ marginTop: 10 }}>Why does it stay out?</p>
                    <div className="mk-reasons">
                      {reasons.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          className={reason === r.id ? "mk-reason is-on" : "mk-reason"}
                          onClick={() => setReason(r.id)}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
                {bounce.length ? (
                  <div className="mk-bounce">
                    {bounce.map((b) => (
                      <div key={b.id}><b>{cardBy(b.id)?.title || b.id}:</b> {b.why}</div>
                    ))}
                    {rejectNote ? <div style={{ marginTop: 6 }}>{rejectNote}</div> : null}
                  </div>
                ) : null}
                {wallNote && !bounce.length ? <div className="mk-bounce mk-ok">{wallNote}</div> : null}
              </section>
            </div>
            <footer className="mk-foot">
              <span className="mk-quiet">{status}</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button type="button" className="mk-ghost" onClick={() => setStep("hall")}>Hall</button>
                <button type="button" className="mk-check" disabled={busy || !wallReady} onClick={checkWall}>
                  {checkAttempts ? "Check again" : "Check the wall"}
                </button>
              </div>
            </footer>
          </>
        )}

        {step === "write" && (
          <>
            <section className="mk-panel">
              <h2>Placards</h2>
              <p className="mk-quiet">{exhibit.placardStem}</p>
              <ul className="mk-quiet">
                {(exhibit.placardLooksFor || []).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {wall.filter(Boolean).map((id) => {
                const card = cardBy(id);
                const p = placards[id] || emptyPlacard();
                return (
                  <div key={id} className="mk-card" style={{ marginTop: 12 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 88 }}><CardFace card={card} /></div>
                      <div>
                        <b>{card.title}</b>
                        <div className="mk-quiet">{card.tag}</div>
                      </div>
                    </div>
                    <div className="mk-stem">
                      <label>The
                        <input value={p.animal} onChange={(e) => updatePlacard(id, "animal", e.target.value)} placeholder="animal" />
                      </label>
                      <label>has
                        <input value={p.part} onChange={(e) => updatePlacard(id, "part", e.target.value)} placeholder="body part" />
                      </label>
                      <label>This helps it live in the desert because
                        <input value={p.because} onChange={(e) => updatePlacard(id, "because", e.target.value)} placeholder="heat, sand, or little water" />
                      </label>
                    </div>
                  </div>
                );
              })}
            </section>
            <section className="mk-panel">
              <h2>The plaque</h2>
              <p className="mk-quiet">{exhibit.plaquePrompt}</p>
              <p className="mk-quiet">Start with: {exhibit.plaqueStarter}</p>
              <label className="mk-field">
                Exhibit sign
                <textarea
                  value={plaque}
                  onChange={(e) => setPlaque(e.target.value)}
                  placeholder={exhibit.plaqueStarter}
                />
              </label>
              <p className="mk-quiet" style={{ marginTop: 12 }}>How sure are you?</p>
              <div className="mk-conf">
                {[
                  { id: "shaky", face: "😕" },
                  { id: "okay", face: "🙂" },
                  { id: "strong", face: "😄" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={confidence === c.id ? "is-on" : ""}
                    onClick={() => setConfidence(c.id)}
                    aria-label={c.id}
                  >
                    {c.face}
                  </button>
                ))}
              </div>
            </section>
            <footer className="mk-foot">
              <button type="button" className="mk-ghost" onClick={() => setStep("build")}>Back to wall</button>
              <button type="button" className="mk-next" disabled={busy} onClick={turnIn}>Grand opening</button>
            </footer>
            <p className="mk-quiet" style={{ textAlign: "center" }}>{status}</p>
          </>
        )}

        {step === "done" && (
          <section className="mk-panel mk-opening">
            <p className="mk-kicker">Grand opening</p>
            <h2>{exhibitTitle || exhibit.title}</h2>
            <p className="mk-quiet">From {exhibit.commission.from}</p>
            <p style={{ marginTop: 12, fontSize: 16 }}>{writeBack || "Your exhibit is turned in."}</p>
            {wallNote ? <p className="mk-quiet">{wallNote}</p> : null}
            {crystals ? <p style={{ fontWeight: 700, marginTop: 8 }}>+{crystals} crystal points</p> : null}
            <div className="mk-gallery-wall" style={{ background: wallColor, padding: 12, borderRadius: 16 }}>
              {wall.filter(Boolean).map((id) => {
                const card = cardBy(id);
                const p = placards[id] || emptyPlacard();
                return (
                  <div key={id} className="mk-gallery-piece">
                    <CardFace card={card} />
                    <b>{card.title}</b>
                    <p className="mk-quiet">
                      The {p.animal || "___"} has {p.part || "___"}. This helps it live in the desert because {p.because || "___"}.
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mk-card" style={{ marginTop: 14, textAlign: "left" }}>
              <h2>Plaque</h2>
              <p>{plaque}</p>
            </div>
            <button type="button" className="mk-next" style={{ marginTop: 16 }} onClick={() => router.push("/student")}>
              Back to hub
            </button>
          </section>
        )}
      </div>

      {look ? (
        <div className="mk-look" onClick={() => setLook(null)}>
          <div className="mk-look-card" onClick={(e) => e.stopPropagation()}>
            <CardFace card={cardBy(look)} />
            <h2 style={{ margin: "10px 0 4px" }}>{cardBy(look)?.title}</h2>
            <p className="mk-quiet">{cardBy(look)?.tag}</p>
            <p>{cardBy(look)?.text}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <button type="button" className="mk-ghost" onClick={() => setLook(null)}>Close</button>
              <button
                type="button"
                className="mk-next"
                onClick={() => {
                  setPicked(look);
                  setLook(null);
                  setStatus("Now tap a wall spot — or Not in this exhibit.");
                }}
              >
                Use this card
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
