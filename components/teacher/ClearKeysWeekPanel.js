"use client";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { MINUTE_CHOICES } from "../../lib/clearkeysWeekly";

// "This week" for ClearKeys (Sept 29, 2026): the class's Daily Transmission
// words and a minutes-per-day goal. Words last for the current week only.
async function call(payload) {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch("/api/teacher/clearkeys", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, accessToken: session?.access_token }) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}
const toLines = (words) => words.map((w) => (w.def ? `${w.word} - ${w.def}` : w.word)).join("\n");
function fromLines(text) {
  return String(text || "").split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const m = l.split(/\s+[-–—:=]\s+|\t/);
    return { word: (m[0] || "").trim(), def: m.slice(1).join(" ").trim() };
  }).filter((w) => w.word);
}
function prettyDate(key) {
  if (!key) return "";
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString(undefined, { month: "short", day: "numeric", timeZone: "UTC" });
}

export default function ClearKeysWeekPanel({ classId }) {
  const [data, setData] = useState(null);
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = useCallback(async () => {
    if (!classId) return;
    try {
      const d = await call({ action: "getSettings", classId });
      setData(d);
      const current = d.settings.weekOf === d.thisWeek ? d.settings.weekWords : [];
      setText(toLines(current));
      setMinutes(d.settings.minutesPerDay || 0);
    } catch (e) { setMsg({ bad: true, text: e.message }); }
  }, [classId]);
  useEffect(() => { setData(null); setMsg(null); load(); }, [load]);

  async function save() {
    setBusy(true); setMsg(null);
    try {
      const words = fromLines(text);
      await call({ action: "saveSettings", classId, weekWords: words, minutesPerDay: minutes });
      setMsg({ bad: false, text: words.length ? `Saved. Tomorrow's Daily Transmission will use these ${words.length} words.` : "Saved." });
      load();
    } catch (e) { setMsg({ bad: true, text: e.message }); }
    setBusy(false);
  }

  if (!classId) return null;
  const words = fromLines(text);
  return (
    <section className="cc-panel" style={{ marginBottom: 18 }}>
      <div className="cc-row cc-between" style={{ alignItems: "flex-start" }}>
        <div>
          <h3>This week in ClearKeys</h3>
          <p className="cc-muted" style={{ margin: 0 }}>{data ? `Week of ${prettyDate(data.thisWeek)}. Words clear on their own next Monday.` : "Loading…"}</p>
        </div>
        <label className="cc-field" style={{ margin: 0, minWidth: 190 }}>
          Daily typing goal
          <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
            {MINUTE_CHOICES.map((m) => <option key={m} value={m}>{m ? `${m} minutes a day` : "No minutes goal"}</option>)}
          </select>
        </label>
      </div>
      {data && data.ready === false && <p className="cc-error" style={{ marginTop: 12 }}>These settings need a quick database update first (add_clearkeys_settings.sql).</p>}
      <div className="cc-two" style={{ marginTop: 14, gridTemplateColumns: "minmax(0,1.3fr) minmax(240px,1fr)" }}>
        <label className="cc-field" style={{ margin: 0 }}>
          Words for the Daily Transmission, one per line (word - meaning)
          <textarea className="cc-input" rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder={"evaporation - water changing into a gas\ncondensation - water vapor cooling into drops"} style={{ font: "14px/1.5 Inter, sans-serif", resize: "vertical" }} />
        </label>
        <div>
          {data && data.wordLists && data.wordLists.length > 0 && (
            <label className="cc-field">
              Or use one of your word lists
              <select defaultValue="" onChange={(e) => { const l = data.wordLists[Number(e.target.value)]; if (l) setText(toLines(l.words.slice(0, 12))); }}>
                <option value="" disabled>Pick a list…</option>
                {data.wordLists.map((l, i) => <option key={i} value={i}>{l.title} ({l.words.length} words)</option>)}
              </select>
            </label>
          )}
          <p className="cc-muted" style={{ margin: "0 0 8px", fontSize: 13 }}>Students type the usual Daily message plus a line with these words and a word of the day with its meaning. Up to 12 words.</p>
          {words[0] && (
            <div style={{ background: "#f3effb", borderRadius: 12, padding: "10px 12px", fontSize: 13, lineHeight: 1.5 }}>
              <b>Preview:</b> This week&apos;s words: {words.map((w) => w.word).join(", ")}.{words[0].def ? ` Word of the day: ${words[0].word}. ${words[0].word.charAt(0).toUpperCase() + words[0].word.slice(1)} means ${words[0].def.replace(/[.!?]+$/, "")}.` : ""}
            </div>
          )}
        </div>
      </div>
      <div className="cc-row" style={{ marginTop: 12 }}>
        <button type="button" className="cc-btn" onClick={save} disabled={busy || !data}>{busy ? "Saving…" : "Save this week"}</button>
        {msg && <span role="status" style={{ fontSize: 13, color: msg.bad ? "#812424" : "#087b64", fontWeight: 600 }}>{msg.text}</span>}
      </div>
    </section>
  );
}
