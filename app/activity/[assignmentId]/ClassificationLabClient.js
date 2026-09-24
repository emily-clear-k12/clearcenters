"use client";

import { useState } from "react";
import SamIcon from "../../../components/SamIcon";
import BackToHubButton from "../../../components/BackToHubButton";
import "./classification-lab.css";

const PAGE_NAMES = ["Sort", "Harder sort", "Venn"];

function sameZone(item, zone) {
  return item === zone;
}

export default function ClassificationLabClient({ assignmentId, publicCase, savedPages, samSkin }) {
  const needsSam = publicCase.grade === "Grade 5";
  const [page, setPage] = useState(0);
  const [placed, setPlaced] = useState({});
  const [picked, setPicked] = useState(null);
  const [note, setNote] = useState(null);
  const [labelAt, setLabelAt] = useState({});
  const [itemAt, setItemAt] = useState({});
  const [mc, setMc] = useState(null);
  const [multi, setMulti] = useState([]);
  const [inline, setInline] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [samOpen, setSamOpen] = useState(false);
  const [saved, setSaved] = useState(savedPages || {});
  const [busy, setBusy] = useState(false);
  const [doneNote, setDoneNote] = useState(null);

  const sort = page < 2 ? publicCase.pages[page] : null;
  const defsOpen = !needsSam || samOpen;

  function resetWork() {
    setPlaced({});
    setPicked(null);
    setNote(null);
    setLabelAt({});
    setItemAt({});
    setMc(null);
    setMulti([]);
    setInline(null);
    setSamOpen(false);
  }

  function go(next) {
    setPage(next);
    resetWork();
  }

  function readDrag(event) {
    try {
      return JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      return picked;
    }
  }

  function fileSort(groupId) {
    if (!picked || picked.kind !== "item" || !sort) return;
    setPlaced((prev) => ({ ...prev, [picked.id]: groupId }));
    setPicked(null);
    setNote(null);
  }

  function placeLabel(zone, id) {
    setLabelAt((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (next[key] === id) delete next[key];
      });
      const other = zone === "left" ? "right" : "left";
      if (next[zone] && next[zone] !== id) next[other] = next[zone];
      next[zone] = id;
      return next;
    });
    setPicked(null);
  }

  function placeItem(zone, id) {
    setItemAt((prev) => ({ ...prev, [id]: zone }));
    setPicked(null);
  }

  function dropOn(zone, event) {
    event.preventDefault();
    setDragOver(null);
    const payload = readDrag(event);
    if (!payload) return;
    if (payload.kind === "label" && (zone === "left" || zone === "right")) placeLabel(zone, payload.id);
    if (payload.kind === "item") placeItem(zone, payload.id);
  }

  async function check() {
    if (busy) return;
    setBusy(true);
    setNote(null);
    const body = page < 2
      ? { assignmentId, page, placed }
      : { assignmentId, page, labelAt, itemAt, mc, multi, inline };
    try {
      const res = await fetch("/api/classification-lab/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.need === "labels") {
        setNote("Drag both rules onto the circles first.");
      } else if (data.need === "pile") {
        setNote(page === 2 ? "Every item still needs a place." : "The pile still has items.");
      } else if (data.error) {
        setNote("That check did not go through. Try again.");
      } else if (data.misses === 0) {
        setNote(data.saved ? "Saved. The card's rule holds." : "The card's rule holds. Your first sort stays saved.");
      } else {
        const count = data.misses === 1 ? "1 does not match the card." : `${data.misses} do not match the card.`;
        setNote(data.saved ? `Saved. ${count}` : `${count} Your first sort stays saved.`);
      }
      if (data.saved) {
        setSaved((prev) => ({ ...prev, [page]: { correct: data.total - data.misses, total: data.total } }));
      }
      if (data.done) {
        setDoneNote(data.crystals ? `All three sorts are saved. +${data.crystals} crystals.` : "All three sorts are saved.");
      }
    } catch (err) {
      setNote("That check did not go through. Try again.");
    }
    setBusy(false);
  }

  const pile = sort ? sort.items.filter((item) => !placed[item.id]) : [];
  const looseLabels = publicCase.venn.labels.filter((label) => labelAt.left !== label.id && labelAt.right !== label.id);
  const looseItems = publicCase.venn.items.filter((item) => !itemAt[item.id]);
  const defs = (publicCase.defs && publicCase.defs[page]) || [];

  function chip(item) {
    const selected = picked && picked.kind === "item" && picked.id === item.id;
    return (
      <button
        key={item.id}
        type="button"
        draggable
        className={selected ? "cl-chip is-picked" : "cl-chip"}
        onDragStart={(event) => event.dataTransfer.setData("text/plain", JSON.stringify({ kind: "item", id: item.id }))}
        onClick={() => setPicked({ kind: "item", id: item.id })}
      >
        {item.label}
      </button>
    );
  }

  return (
    <div className="cl-page">
      <BackToHubButton />
      <div className="cl-shell">
        <header className="cl-top">
          <div>
            <p className="cl-kicker">Classification Lab · {publicCase.teks}</p>
            <h1>{publicCase.title}</h1>
          </div>
          <div className="cl-head-actions">
            {needsSam && !samOpen && (
              <button type="button" className="cl-sam" onClick={() => setSamOpen(true)}>
                <SamIcon skinKey={samSkin} size={28} />
                Ask SAM
              </button>
            )}
            <span className="cl-grade">{publicCase.grade}</span>
          </div>
        </header>

        <div className="cl-pages" role="tablist">
          {PAGE_NAMES.map((label, index) => (
            <button key={label} type="button" aria-selected={page === index} onClick={() => go(index)}>
              {index + 1}. {label}{saved[index] ? ` · ${saved[index].correct}/${saved[index].total}` : ""}
            </button>
          ))}
        </div>

        <div className={defsOpen ? "cl-layout has-defs" : "cl-layout"}>
          <div>
            {sort && (
              <>
                <section className="cl-card">
                  <p className="cl-kicker">Spec card</p>
                  <h2>{sort.rule}</h2>
                  <p>{sort.notThis}</p>
                </section>
                <div className="cl-work">
                  <section className="cl-bay">
                    <div className="cl-bay-head">
                      <h2>Specimen pile</h2>
                      <span>{pile.length} left</span>
                    </div>
                    <div className="cl-tiles">
                      {pile.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={picked && picked.id === item.id ? "cl-tile is-picked" : "cl-tile"}
                          onClick={() => setPicked({ kind: "item", id: item.id })}
                        >
                          {item.image ? <img src={item.image} alt="" /> : item.shape ? <i className={`cl-shape ${item.shape}`} /> : <b className={item.label.length > 8 ? "is-long" : ""}>{item.label}</b>}
                          <span>{item.image || item.shape ? item.label : item.clue}</span>
                          {item.image || item.shape ? <small>{item.clue}</small> : null}
                        </button>
                      ))}
                      {!pile.length && <p className="cl-empty">The pile is clear.</p>}
                    </div>
                  </section>
                  <section className="cl-groups">
                    {sort.groups.map((group) => {
                      const items = sort.items.filter((item) => placed[item.id] === group.id);
                      return (
                        <div key={group.id} className="cl-group">
                          <button type="button" className="cl-group-label" onClick={() => fileSort(group.id)}>{group.label}</button>
                          <div className="cl-group-body">
                            {items.map((item) => (
                              <button key={item.id} type="button" className="cl-chip" onClick={() => {
                                setPlaced((prev) => {
                                  const next = { ...prev };
                                  delete next[item.id];
                                  return next;
                                });
                                setPicked({ kind: "item", id: item.id });
                              }}>{item.label}</button>
                            ))}
                            {!items.length && <span className="cl-drop">Choose an item, then tap here.</span>}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                </div>
              </>
            )}

            {page === 2 && (
              <>
                <section className="cl-card">
                  <p className="cl-kicker">Venn</p>
                  <h2>Drag each rule onto a circle.</h2>
                  <p>Then place each item. The center means both. The outside means neither.</p>
                </section>
                <section className="cl-bay">
                  <div className="cl-trays">
                    <div>
                      <h2>Rules</h2>
                      <div className="cl-group-body">
                        {looseLabels.map((label) => (
                          <button
                            key={label.id}
                            type="button"
                            draggable
                            className={picked && picked.kind === "label" && picked.id === label.id ? "cl-rule is-picked" : "cl-rule"}
                            onDragStart={(event) => event.dataTransfer.setData("text/plain", JSON.stringify({ kind: "label", id: label.id }))}
                            onClick={() => setPicked({ kind: "label", id: label.id })}
                          >{label.text}</button>
                        ))}
                        {!looseLabels.length && <span className="cl-drop">Both rules are on the circles.</span>}
                      </div>
                    </div>
                    <div>
                      <h2>Items</h2>
                      <div className="cl-group-body">
                        {looseItems.map((item) => chip(item))}
                        {!looseItems.length && <span className="cl-drop">Every item has a place.</span>}
                      </div>
                    </div>
                  </div>
                  <div className="cl-venn">
                    {["left", "right"].map((zone) => {
                      const label = publicCase.venn.labels.find((item) => item.id === labelAt[zone]);
                      const items = publicCase.venn.items.filter((item) => itemAt[item.id] === zone);
                      return (
                        <div
                          key={zone}
                          className={dragOver === zone ? `cl-bubble ${zone} is-over` : `cl-bubble ${zone}`}
                          onDragOver={(event) => { event.preventDefault(); setDragOver(zone); }}
                          onDragLeave={() => setDragOver(null)}
                          onDrop={(event) => dropOn(zone, event)}
                        >
                          <button type="button" className="cl-slot" onClick={() => {
                            if (picked && picked.kind === "label") placeLabel(zone, picked.id);
                            if (picked && picked.kind === "item") placeItem(zone, picked.id);
                          }}>{label ? label.text : "Drop a rule"}</button>
                          <div className="cl-group-body">{items.map((item) => chip(item))}</div>
                        </div>
                      );
                    })}
                    <div
                      className={dragOver === "center" ? "cl-center is-over" : "cl-center"}
                      onDragOver={(event) => { event.preventDefault(); setDragOver("center"); }}
                      onDrop={(event) => dropOn("center", event)}
                    >
                      <button type="button" className="cl-slot" onClick={() => picked && picked.kind === "item" && placeItem("center", picked.id)}>Center</button>
                      <div className="cl-group-body">{publicCase.venn.items.filter((item) => itemAt[item.id] === "center").map((item) => chip(item))}</div>
                    </div>
                  </div>
                  <div
                    className={dragOver === "out" ? "cl-outside is-over" : "cl-outside"}
                    onDragOver={(event) => { event.preventDefault(); setDragOver("out"); }}
                    onDrop={(event) => dropOn("out", event)}
                  >
                    <button type="button" className="cl-slot" onClick={() => picked && picked.kind === "item" && placeItem("out", picked.id)}>Outside both circles</button>
                    <div className="cl-group-body">{publicCase.venn.items.filter((item) => itemAt[item.id] === "out").map((item) => chip(item))}</div>
                  </div>
                </section>
                <section className="cl-questions">
                  <article>
                    <h2>Multiple choice</h2>
                    <p>{publicCase.venn.mc.prompt}</p>
                    <div className="cl-choices">
                      {publicCase.venn.mc.choices.map((choice) => (
                        <button key={choice.id} type="button" aria-pressed={mc === choice.id} onClick={() => setMc(choice.id)}>{choice.text}</button>
                      ))}
                    </div>
                  </article>
                  <article>
                    <h2>Choose all that fit</h2>
                    <p>{publicCase.venn.multi.prompt}</p>
                    <div className="cl-choices">
                      {publicCase.venn.multi.choices.map((choice) => (
                        <button key={choice.id} type="button" aria-pressed={multi.includes(choice.id)} onClick={() => setMulti((prev) => prev.includes(choice.id) ? prev.filter((id) => !sameZone(id, choice.id)) : [...prev, choice.id])}>{choice.text}</button>
                      ))}
                    </div>
                  </article>
                  <article>
                    <h2>Finish the sentence</h2>
                    <p>{publicCase.venn.inline.before} <em>{(publicCase.venn.inline.choices.find((choice) => choice.id === inline) || {}).text || "______"}</em> {publicCase.venn.inline.after}</p>
                    <div className="cl-choices">
                      {publicCase.venn.inline.choices.map((choice) => (
                        <button key={choice.id} type="button" aria-pressed={inline === choice.id} onClick={() => setInline(choice.id)}>{choice.text}</button>
                      ))}
                    </div>
                  </article>
                </section>
              </>
            )}
          </div>
          {defsOpen && (
            <aside className="cl-defs">
              <p className="cl-kicker"><SamIcon skinKey={samSkin} size={28} /> SAM</p>
              {defs.map((item) => (
                <p key={item.term}><b>{item.term}.</b> {item.text}</p>
              ))}
            </aside>
          )}
        </div>

        <footer className="cl-foot">
          <p>{doneNote || note || (needsSam && !samOpen ? "Try it first. Ask SAM if you need the words." : "A miss will not show which item.")}</p>
          <div className="cl-actions">
            {page > 0 && <button type="button" className="cl-back" onClick={() => go(page - 1)}>Back</button>}
            <button type="button" className="cl-check" onClick={check} disabled={busy}>{busy ? "Checking" : "Check"}</button>
            {page < 2 && <button type="button" className="cl-next" onClick={() => go(page + 1)}>Next page</button>}
          </div>
        </footer>
      </div>
    </div>
  );
}
