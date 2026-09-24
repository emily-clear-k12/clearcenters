"use client";
import { BridgePage, PageHeading } from "../../../components/teacher/BridgeUI";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { COLORS, panelStyle } from "../../../lib/teacherTheme";

// Frequency Rush — Word Lists (Sept 24, 2026; FrequencyRush_Fluency_Expansion_v1.md
// step 3). A teacher types, pastes or uploads a list of words with
// definitions. The site makes the wrong spellings, the teacher checks them
// (and can re-roll any word), and the list becomes an assignable Frequency
// Rush activity that only they see in the Challenge Library.
//
// Same page pattern as Relay Station's Typing Texts. All checking and wrong-
// spelling work happens on the server (/api/teacher/word-lists), because
// the English word list it checks against is too big to send to the browser.
const ACCENT = "#7541cf";
const SUBJECT_OPTIONS = ["ELAR", "Science", "Social Studies", "Math"];
const EXAMPLE = "habitat - the natural home of a plant or animal\nprey - an animal that is hunted for food\npredator - an animal that hunts other animals\nproducer - a living thing that makes its own food";

export default function WordListsPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [lists, setLists] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ title: "", grade: "4", subject: "ELAR", text: "", includeMeaning: true, includeSpelling: true });
  const [preview, setPreview] = useState(null); // { entries, problems }
  const [rerolling, setRerolling] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  const callApi = useCallback(async (payload) => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/teacher/word-lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, accessToken: session?.access_token }),
    });
    const data = await res.json();
    if (!res.ok) {
      const err = new Error(data.error || "Something went wrong.");
      err.problems = data.problems;
      throw err;
    }
    return data;
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await callApi({ action: "list" });
      setLists(data.lists);
    } catch (err) {
      setError(err.message);
      setLists([]);
    }
  }, [callApi]);

  useEffect(() => { if (!loadingAuth) load(); }, [loadingAuth, load]);

  // Any edit to the text means the checked preview is out of date.
  function setText(text) {
    setForm((f) => ({ ...f, text }));
    setPreview(null);
  }

  function onUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 200000) { setError("That file is too big. Upload a .txt or .csv list under 200 KB."); return; }
    const reader = new FileReader();
    reader.onload = () => { setError(null); setText(String(reader.result || "")); };
    reader.readAsText(file);
    e.target.value = "";
  }

  async function check() {
    setBusy(true); setError(null); setNotice(null);
    try {
      const data = await callApi({ action: "preview", text: form.text });
      setPreview(data);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  }

  async function reroll(index) {
    const entry = preview.entries[index];
    setRerolling(index);
    try {
      const data = await callApi({
        action: "reroll",
        word: entry.word,
        otherWords: preview.entries.filter((_, i) => i !== index).map((e) => e.word),
        avoid: entry.misspellings,
      });
      setPreview((p) => ({ ...p, entries: p.entries.map((e, i) => (i === index ? { ...e, misspellings: data.misspellings } : e)) }));
    } catch (err) {
      setError(err.message);
    }
    setRerolling(null);
  }

  async function save() {
    setBusy(true); setError(null); setNotice(null);
    try {
      await callApi({
        action: "create",
        title: form.title,
        grade: Number(form.grade),
        subject: form.subject,
        includeMeaning: form.includeMeaning,
        includeSpelling: form.includeSpelling,
        entries: preview.entries,
      });
      setNotice(`Saved "${form.title}". Find it in Challenge Library → ${form.subject} → ${form.grade === "3" ? "3rd" : form.grade + "th"} Grade → Frequency Rush → My Word Lists.`);
      setForm((f) => ({ ...f, title: "", text: "" }));
      setPreview(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  }

  async function remove(standard) {
    setError(null); setNotice(null);
    try {
      await callApi({ action: "delete", standard });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const input = { width: "100%", boxSizing: "border-box", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 10px", fontSize: 13.5, fontFamily: "inherit" };
  const label = { fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 4 };
  const pill = (on) => ({ background: on ? ACCENT : COLORS.white, color: on ? COLORS.white : COLORS.textDark, border: `1.5px solid ${on ? ACCENT : COLORS.border}`, borderRadius: 999, padding: "7px 14px", fontWeight: 700, fontSize: 12.5, cursor: "pointer" });
  const hasProblems = preview && preview.problems && preview.problems.length > 0;
  const canCheck = form.text.trim().length > 0 && !busy;
  const canSave = preview && !hasProblems && form.title.trim() && (form.includeMeaning || form.includeSpelling) && !busy;
  const spellingSkipped = preview ? preview.entries.filter((e) => (e.misspellings || []).length < 2).length : 0;

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <PageHeading title="Word Lists" subtitle="Frequency Rush · your own spelling and vocabulary lists"></PageHeading>

      <div className="cc-detail-content">
        {error && <div style={{ background: `${COLORS.danger}18`, color: COLORS.danger, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13.5 }}>{error}</div>}
        {notice && <div style={{ background: `${COLORS.success}18`, color: COLORS.success, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13.5, fontWeight: 600 }}>{notice}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div style={panelStyle(ACCENT, { padding: 18 })}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>New word list</div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>Title</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Week 6 Spelling or Ecosystems Vocabulary" style={input} maxLength={80} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              <label><span style={label}>Grade</span>
                <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} style={input}>
                  <option value="3">3rd</option><option value="4">4th</option><option value="5">5th</option>
                </select>
              </label>
              <label><span style={label}>Subject</span>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={input}>
                  {SUBJECT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>Question types</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <button type="button" className="cc-btn" aria-pressed={form.includeMeaning} onClick={() => setForm({ ...form, includeMeaning: !form.includeMeaning })} style={pill(form.includeMeaning)}>Meaning</button>
                <button type="button" className="cc-btn" aria-pressed={form.includeSpelling} onClick={() => setForm({ ...form, includeSpelling: !form.includeSpelling })} style={pill(form.includeSpelling)}>Spelling</button>
              </div>
              <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 4 }}>
                Meaning: match each word and its definition. Spelling: pick the correct spelling from near-miss wrong ones.
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>Words and definitions ({4}–{30} words)</span>
              <textarea value={form.text} onChange={(e) => setText(e.target.value)} rows={10} placeholder={"One word per line, with its definition:\n\n" + EXAMPLE} style={{ ...input, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6, flexWrap: "wrap" }}>
                <label className="gc-btn" style={{ background: `${ACCENT}22`, color: ACCENT, borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>
                  Upload a .txt or .csv
                  <input type="file" accept=".txt,.csv,text/plain,text/csv" onChange={onUpload} style={{ display: "none" }} />
                </label>
                <span style={{ fontSize: 11.5, color: COLORS.textMuted }}>
                  Separate each word from its definition with a dash, colon or comma. You can also paste two columns straight from a spreadsheet.
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={check} disabled={!canCheck} className="gc-btn" style={{ background: canCheck ? `${ACCENT}22` : `${ACCENT}11`, color: ACCENT, border: "none", borderRadius: 999, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: canCheck ? "pointer" : "default" }}>
                {busy && !preview ? "Checking…" : "Check list"}
              </button>
              <button onClick={save} disabled={!canSave} className="gc-btn" style={{ background: canSave ? ACCENT : `${ACCENT}55`, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: canSave ? "pointer" : "default" }}>
                {busy && preview ? "Saving…" : "Save List"}
              </button>
            </div>
            {!preview && form.text.trim() && <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 6 }}>Check the list first to see the wrong spellings students will get.</div>}
          </div>

          <div style={panelStyle(ACCENT, { padding: 18 })}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>What students will see</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>
              The site makes three wrong spellings for each word. None of them is a real word. Don't like one? Press ↻ for new ones.
            </div>
            {!preview ? (
              <div style={{ color: COLORS.textMuted, fontSize: 13.5, padding: "30px 0", textAlign: "center" }}>Press "Check list" to see your words here.</div>
            ) : (
              <>
                {hasProblems && (
                  <div style={{ background: `${COLORS.warning}18`, color: "#9A5B12", borderRadius: 8, padding: "8px 12px", fontSize: 12.5, marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>Fix these, then check again:</div>
                    {preview.problems.map((p, i) => <div key={i}>• {p}</div>)}
                  </div>
                )}
                {spellingSkipped > 0 && form.includeSpelling && (
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>
                    {spellingSkipped} word{spellingSkipped === 1 ? " is" : "s are"} too short to misspell well, so {spellingSkipped === 1 ? "it gets" : "they get"} meaning questions only.
                  </div>
                )}
                <div style={{ maxHeight: 420, overflowY: "auto", display: "grid", gap: 6 }}>
                  {preview.entries.map((e, i) => (
                    <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 12px", background: COLORS.white }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{e.word}</div>
                        <div style={{ fontSize: 12.5, color: COLORS.textMuted, flex: 1 }}>{e.definition}</div>
                      </div>
                      {form.includeSpelling && (
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted }}>WRONG SPELLINGS</span>
                          {(e.misspellings || []).length < 2 ? (
                            <span style={{ fontSize: 12, color: COLORS.textMuted }}>too short — meaning questions only</span>
                          ) : (
                            e.misspellings.map((m) => (
                              <span key={m} style={{ fontSize: 12.5, background: `${COLORS.danger}12`, color: "#8a2b2b", borderRadius: 6, padding: "1px 8px", textDecoration: "line-through" }}>{m}</span>
                            ))
                          )}
                          <button type="button" onClick={() => reroll(i)} disabled={rerolling === i} title="New wrong spellings" style={{ marginLeft: "auto", background: "none", border: "none", color: ACCENT, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                            {rerolling === i ? "…" : "↻"}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div style={panelStyle(ACCENT, { padding: 18 })}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>My word lists</div>
          {lists === null ? (
            <div style={{ color: COLORS.textMuted, fontSize: 13.5 }}>Loading…</div>
          ) : lists.length === 0 ? (
            <div style={{ color: COLORS.textMuted, fontSize: 13.5 }}>No word lists yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {lists.map((l) => (
                <div key={l.standard} style={{ display: "flex", gap: 12, alignItems: "center", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 12px", background: COLORS.white }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{l.title}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Grade {l.grade} · {l.subject} · {(l.words || []).length} words · {[l.include_meaning !== false && "meaning", l.include_spelling !== false && "spelling"].filter(Boolean).join(" + ")} · {(l.words || []).map((w) => w.word).join(", ")}
                    </div>
                  </div>
                  {l.assigned && <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.success, background: `${COLORS.success}1F`, borderRadius: 999, padding: "2px 10px" }}>Assigned</span>}
                  <button onClick={() => router.push("/teacher/assign/new")} className="gc-btn" style={{ background: `${ACCENT}22`, color: ACCENT, border: "none", borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>Assign</button>
                  {!l.assigned && (
                    <button onClick={() => remove(l.standard)} className="gc-btn" style={{ background: "none", color: COLORS.danger, border: "none", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>Delete</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BridgePage>
  );
}
