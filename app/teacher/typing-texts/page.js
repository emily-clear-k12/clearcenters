"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, panelStyle } from "../../../lib/teacherTheme";
import { sanitizeTypingText, CUSTOM_MAX_CHARS } from "../../../lib/cases/relay-station";

// Relay Station — Custom Texts (Sept 22, 2026; design doc §11). A teacher
// pastes any passage and it becomes an assignable Relay Station case that
// only they see in the Challenge Library (Relay Station → grade → subject).
// The preview shows exactly what students will type, after cleanup (curly
// quotes, dashes, accents, emoji, extra spaces).
const ACCENT = PAGE_ACCENTS["/teacher/assign"] || COLORS.copper;

const KIND_OPTIONS = [
  { v: "paragraph", label: "Paragraph / reading" },
  { v: "spelling", label: "Spelling list" },
  { v: "vocabulary", label: "Vocabulary words" },
  { v: "sentences", label: "Sentences" },
  { v: "conversation", label: "Conversation / dialogue" },
  { v: "letter", label: "Letter" },
  { v: "list", label: "List" },
  { v: "other", label: "Other" },
];
const SUBJECT_OPTIONS = ["ELAR", "Science", "Social Studies", "Math"];
const WPM_GUESS = { 3: 8, 4: 12, 5: 15 };

export default function TypingTextsPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [texts, setTexts] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", grade: "4", subject: "ELAR", kind: "paragraph", mode: "choice", intro: "", composePrompt: "", text: "" });

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  const callApi = useCallback(async (payload) => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/teacher/typing-texts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, accessToken: session?.access_token }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
    return data;
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await callApi({ action: "list" });
      setTexts(data.texts);
    } catch (err) {
      setError(err.message);
      setTexts([]);
    }
  }, [callApi]);

  useEffect(() => { if (!loadingAuth) load(); }, [loadingAuth, load]);

  const cleaned = useMemo(() => sanitizeTypingText(form.text), [form.text]);
  const estMinutes = Math.max(1, Math.round(cleaned.text.length / 5 / (WPM_GUESS[form.grade] || 10)));

  async function save() {
    setSaving(true); setError(null); setNotice(null);
    try {
      await callApi({ action: "create", ...form, grade: Number(form.grade) });
      setNotice(`Saved "${form.title}". Find it in Challenge Library → Relay Station → ${form.grade === "3" ? "3rd" : form.grade + "th"} Grade → ${form.subject}.`);
      setForm((f) => ({ ...f, title: "", intro: "", composePrompt: "", text: "" }));
      await load();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
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
  const canSave = form.title.trim() && cleaned.text.length >= 20 && !saving;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex", flexDirection: "column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <TeacherHUD title="Typing Texts" subtitle="Relay Station · your own passages to assign" accent={ACCENT} teacherEmail={teacherEmail} />

      <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        {error && <div style={{ background: `${COLORS.danger}18`, color: COLORS.danger, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13.5 }}>{error}</div>}
        {notice && <div style={{ background: `${COLORS.success}18`, color: COLORS.success, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13.5, fontWeight: 600 }}>{notice}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 16, marginBottom: 16 }}>
          <div style={panelStyle(ACCENT, { padding: 18 })}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>New custom text</div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>Title</span>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Week 6 Spelling: -tion words" style={input} maxLength={80} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
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
              <label><span style={label}>Type</span>
                <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value, mode: e.target.value === "spelling" ? "dictation" : form.mode })} style={input}>
                  {KIND_OPTIONS.map((k) => <option key={k.v} value={k.v}>{k.label}</option>)}
                </select>
              </label>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>How students type it</span>
              <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })} style={input}>
                <option value="choice">Student's choice (Copy, Dictation, or Corrupted Transmission)</option>
                <option value="copy">Copy only — they see the text</option>
                <option value="dictation">Dictation only — they hear it, can't see it (great for spelling tests)</option>
              </select>
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>Directions for students (optional)</span>
              <input value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} placeholder="e.g. Type each spelling word, then use it in the sentence." style={input} maxLength={300} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>"Your Turn" writing prompt afterward (optional)</span>
              <input value={form.composePrompt} onChange={(e) => setForm({ ...form, composePrompt: e.target.value })} placeholder="e.g. Now write 3 sentences using at least 3 of these spelling words." style={input} maxLength={400} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <span style={label}>Text to type</span>
              <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={10} placeholder={"Paste or type the passage here.\nPress Enter for a new line. Start a line with 4 spaces (or a Tab) to indent it."} style={{ ...input, fontFamily: "'Courier New', monospace", resize: "vertical" }} />
              <div style={{ fontSize: 11.5, color: cleaned.tooLong ? COLORS.danger : COLORS.textMuted, marginTop: 4 }}>
                {cleaned.text.length} / {CUSTOM_MAX_CHARS} characters · about {estMinutes} min for a typical {form.grade === "3" ? "3rd" : form.grade + "th"} grader
                {cleaned.tooLong && " — trimmed to the limit"}
              </div>
            </div>
            <button onClick={save} disabled={!canSave} className="gc-btn" style={{ background: canSave ? ACCENT : `${ACCENT}55`, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: canSave ? "pointer" : "default" }}>
              {saving ? "Saving…" : "Save Text"}
            </button>
          </div>

          <div style={panelStyle(ACCENT, { padding: 18 })}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Student preview</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>Exactly what students will type. ↵ = press Enter, → = press Tab.</div>
            {cleaned.removed.length > 0 && (
              <div style={{ background: `${COLORS.warning}18`, color: "#9A5B12", borderRadius: 8, padding: "6px 10px", fontSize: 12, marginBottom: 8 }}>
                Removed characters students can't type: {cleaned.removed.join(" ")}
              </div>
            )}
            <div style={{ background: "#0D1B2A", color: "#fff", borderRadius: 12, padding: 14, fontFamily: "'Courier New', monospace", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", minHeight: 200, maxHeight: 380, overflowY: "auto" }}>
              {cleaned.text
                ? cleaned.text.split("\n").map((line, i, arr) => (
                    <div key={i}>
                      {line.split("\t").map((part, j) => (
                        <React.Fragment key={j}>{j > 0 && <span style={{ color: "#00C2C7" }}>→   </span>}{part}</React.Fragment>
                      ))}
                      {i < arr.length - 1 && <span style={{ color: "#00C2C7", fontSize: 12 }}> ↵</span>}
                    </div>
                  ))
                : <span style={{ color: "rgba(255,255,255,.4)" }}>Your text will appear here.</span>}
            </div>
          </div>
        </div>

        <div style={panelStyle(ACCENT, { padding: 18 })}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>My texts</div>
          {texts === null ? (
            <div style={{ color: COLORS.textMuted, fontSize: 13.5 }}>Loading…</div>
          ) : texts.length === 0 ? (
            <div style={{ color: COLORS.textMuted, fontSize: 13.5 }}>No custom texts yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {texts.map((t) => (
                <div key={t.standard} style={{ display: "flex", gap: 12, alignItems: "center", border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 12px", background: COLORS.white }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Grade {t.grade} · {t.subject} · {t.mode === "dictation" ? "🎧 Dictation · " : t.mode === "copy" ? "Copy only · " : ""}{t.compose_prompt ? "✍️ Your Turn · " : ""}{t.text.length} chars · {t.text.replace(/\s+/g, " ").slice(0, 80)}
                    </div>
                  </div>
                  {t.assigned && <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.success, background: `${COLORS.success}1F`, borderRadius: 999, padding: "2px 10px" }}>Assigned</span>}
                  <button onClick={() => router.push("/teacher/assign/new")} className="gc-btn" style={{ background: `${ACCENT}22`, color: ACCENT, border: "none", borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>Assign</button>
                  {!t.assigned && (
                    <button onClick={() => remove(t.standard)} className="gc-btn" style={{ background: "none", color: COLORS.danger, border: "none", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>Delete</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
