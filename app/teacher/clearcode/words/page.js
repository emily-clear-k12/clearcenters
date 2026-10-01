"use client";
import React, { useEffect, useState, Suspense } from "react";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../../components/teacher/BridgeUI";
import { ClearCodeTabs, useClearCodeClass, callClearCode } from "../../../../components/teacher/ClearCodeShared";
import { chunkWord } from "../../../../lib/clearcode";

// ClearCode Class words (Sept 30, 2026): this week's big words from what the
// class is assigned. Students chunk them in a short room each chamber.
// The list clears itself each Monday.
const MAX = 12;

function Words() {
  const cc = useClearCodeClass();
  const { classId } = cc;
  const [words, setWords] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!classId) return;
    setWords(null); setMsg(""); setDirty(false);
    callClearCode({ action: "getWords", classId })
      .then((d) => { setWords(d.words || []); setSuggested(d.suggested || []); })
      .catch((e) => { setWords([]); setMsg(e.message); });
  }, [classId]);

  if (!cc.ready) return <div className="cc-loading">Loading...</div>;
  const have = new Set((words || []).map((w) => w.word.toLowerCase()));

  function add(word) {
    const w = String(word || "").trim();
    if (!w || have.has(w.toLowerCase()) || (words || []).length >= MAX) return;
    setWords([...(words || []), { word: w, chunks: chunkWord(w), meaning: "" }]);
    setDirty(true); setDraft("");
  }
  function edit(i, patch) {
    setWords(words.map((w, j) => (j === i ? { ...w, ...patch } : w)));
    setDirty(true);
  }
  function remove(i) { setWords(words.filter((_, j) => j !== i)); setDirty(true); }
  async function save() {
    setBusy(true); setMsg("");
    try { const d = await callClearCode({ action: "saveWords", classId, words }); setWords(d.words); setDirty(false); setMsg("Saved. Students see these in their next chamber."); }
    catch (e) { setMsg(e.message); }
    setBusy(false);
  }

  return (
    <BridgePage teacherEmail={cc.teacherEmail}>
      <PageHeading title="ClearCode" subtitle="Class words">
        {cc.classes.length > 1 && <ClassTabs classes={cc.classes} value={classId} onChange={cc.setClassId} />}
      </PageHeading>
      <ClearCodeTabs active="words" classId={classId} />
      {!cc.classes.length ? <Empty>Make a class first.</Empty> : words === null ? <div className="cc-loading">Loading this week&apos;s words…</div> : (
        <div className="cc-two" style={{ alignItems: "start" }}>
          <section className="cc-panel">
            <div className="cc-between" style={{ marginBottom: 6 }}>
              <h3 style={{ margin: 0 }}>This week&apos;s class words</h3>
              <span className="cc-muted">{words.length} of {MAX}</span>
            </div>
            <p className="cc-muted" style={{ marginTop: 0 }}>Big words from this week&apos;s lessons. Students break each one into chunks, so the word is easier when they meet it in class. The chunks fill in for you; fix them if they look off. The list clears each Monday.</p>
            {words.length === 0 ? <p className="cc-muted">No class words yet this week. Add some below or tap a suggestion.</p> : (
              <div className="cc-table-scroll">
                <table className="cc-table">
                  <thead><tr><th>Word</th><th>Chunks</th><th>Kid-friendly meaning (optional)</th><th></th></tr></thead>
                  <tbody>
                    {words.map((w, i) => (
                      <tr key={w.word}>
                        <td><b>{w.word}</b></td>
                        <td><input aria-label={`Chunks for ${w.word}`} value={w.chunks.join("-")} onChange={(e) => edit(i, { chunks: e.target.value.split("-").map((c) => c.trim()).filter(Boolean) })} style={{ width: 150 }} /></td>
                        <td><input aria-label={`Meaning of ${w.word}`} value={w.meaning || ""} maxLength={140} placeholder="e.g. a change in form" onChange={(e) => edit(i, { meaning: e.target.value })} style={{ width: "100%", minWidth: 180 }} /></td>
                        <td><button type="button" className="cc-btn quiet" onClick={() => remove(i)}>Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <form className="cc-row" style={{ marginTop: 14 }} onSubmit={(e) => { e.preventDefault(); add(draft); }}>
              <input aria-label="Add a word" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a word, like photosynthesis" maxLength={40} disabled={words.length >= MAX} style={{ flex: 1, minWidth: 200 }} />
              <button type="submit" className="cc-btn secondary" disabled={!draft.trim() || words.length >= MAX}>Add</button>
              <button type="button" className="cc-btn" disabled={!dirty || busy} onClick={save}>{busy ? "Saving…" : "Save words"}</button>
            </form>
            {msg && <p className="cc-muted" style={{ margin: "10px 0 0", fontWeight: 600 }} role="status">{msg}</p>}
          </section>
          <section className="cc-panel">
            <h3>Suggested from this week</h3>
            <p className="cc-muted" style={{ marginTop: 0 }}>Long words from the activities you assigned in the last 7 days. Tap one to add it.</p>
            {suggested.filter((w) => !have.has(w)).length === 0 ? <p className="cc-muted" style={{ margin: 0 }}>Nothing to suggest yet. Suggestions show up after you assign activities this week.</p> : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {suggested.filter((w) => !have.has(w)).map((w) => (
                  <button key={w} type="button" className="cc-btn secondary" disabled={words.length >= MAX} onClick={() => add(w)}>+ {w}</button>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </BridgePage>
  );
}

export default function Page() {
  return <Suspense fallback={null}><Words /></Suspense>;
}
