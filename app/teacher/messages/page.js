"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../lib/teacherTheme";

// Sept 14 — Feature 5 of the teacher-efficiency build (see
// Teacher_SiteWide_Redesign_Plan.md), and the last of the five. Turns this
// from a "Coming Soon" stub into real messaging: an announcement to a
// whole class, or a direct nudge to one student, both landing in that
// student's own in-app inbox (app/messages) — no email, per the scope
// decision made before this build started (the app has no parent/guardian
// data model or email-sending integration at all).
//
// Deliberately its own thing, not a reuse of the existing S.A.M. shoutout
// system (RewardsModal's "shoutout" tab on Overview, `sam_shoutouts`
// table) — shoutouts are a single ephemeral, always-encouraging note "from
// S.A.M.," one active note at a time, no history. This is real free-text
// messaging from the teacher themselves, class-wide or direct, kept as a
// real history both sides can see, with per-student read tracking.
const ACCENT = PAGE_ACCENTS["/teacher/messages"];
const BG = PAGE_BACKGROUNDS["/teacher/messages"];

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [history, setHistory] = useState([]);

  const [classId, setClassId] = useState("");
  const [mode, setMode] = useState("class"); // "class" | "student"
  const [studentId, setStudentId] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", text }

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      load(data.user.id);
      setLoadingAuth(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const load = useCallback(async (tId) => {
    setLoading(true);

    const { data: classesData } = await supabase.from("classes").select("id, name").eq("teacher_id", tId).order("name");
    const classList = classesData || [];
    setClasses(classList);
    setClassId((prev) => prev || (classList[0] && classList[0].id) || "");
    const classIds = classList.map((c) => c.id);

    if (classIds.length > 0) {
      // Same "SQL delivered != SQL run" hardening as Roster Management —
      // `active` may not exist yet, so fall back to treating everyone as
      // active rather than erroring out on the student picker.
      let { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("id, first_name, class_id, active")
        .in("class_id", classIds);
      if (studentsError) {
        const fallback = await supabase.from("students").select("id, first_name, class_id").in("class_id", classIds);
        studentsData = (fallback.data || []).map((s) => ({ ...s, active: true }));
      } else {
        studentsData = (studentsData || []).map((s) => ({ ...s, active: s.active !== false }));
      }
      setStudents(studentsData.filter((s) => s.active));

      const { data: historyData } = await supabase
        .from("teacher_messages")
        .select("id, batch_id, class_id, student_id, is_broadcast, body, created_at, read_at, students(first_name), classes(name)")
        .eq("teacher_id", tId)
        .order("created_at", { ascending: false });
      setHistory(historyData || []);
    }

    setLoading(false);
  }, []);

  // Group the flat per-recipient rows back into one card per send — every
  // row in a batch shares the same body/class/timestamp, so this is just
  // "how many recipients, how many have read it" per batch_id.
  const batches = useMemo(() => {
    const map = new Map();
    history.forEach((row) => {
      if (!map.has(row.batch_id)) {
        map.set(row.batch_id, {
          batchId: row.batch_id,
          body: row.body,
          createdAt: row.created_at,
          isBroadcast: row.is_broadcast,
          className: row.classes?.name || "",
          studentName: row.is_broadcast ? null : row.students?.first_name || "",
          total: 0,
          read: 0,
        });
      }
      const b = map.get(row.batch_id);
      b.total += 1;
      if (row.read_at) b.read += 1;
    });
    return [...map.values()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [history]);

  const classStudents = students.filter((s) => s.class_id === classId);
  const canSend = classId && body.trim() && (mode === "class" ? classStudents.length > 0 : !!studentId) && !sending;

  async function handleSend() {
    if (!canSend) return;
    setSending(true);
    setStatus(null);
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    try {
      if (!accessToken) throw new Error("Your session expired — refresh the page and try again.");
      const res = await fetch("/api/teacher/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, studentId: mode === "student" ? studentId : null, body, accessToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Couldn't send that.");
      setStatus({ type: "success", text: mode === "class" ? `Sent to ${json.recipientCount} student${json.recipientCount === 1 ? "" : "s"}!` : "Sent!" });
      setBody("");
      if (teacherId) await load(teacherId);
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Couldn't send that." });
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 4000);
    }
  }

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.canvas,
        backgroundImage: `linear-gradient(180deg, rgba(243,239,252,.55) 0%, rgba(243,239,252,.82) 100%), url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-mode { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
      `}</style>

      <TeacherHUD title="Messages" subtitle="Notes and rewards" accent={ACCENT} teacherEmail={teacherEmail} actions={<a className="cc-btn" href="/teacher/badges">Rewards</a>} />

      <main style={{ flex: 1, padding: "28px 36px 60px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 720 }}>
          {classes.length === 0 ? (
            <div style={panelStyle(ACCENT, { padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 })}>No classes yet.</div>
          ) : (
            <>
              <div style={panelStyle(ACCENT, { padding: 22, marginBottom: 24 })}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>New Message</div>

                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <select
                    value={classId}
                    onChange={(e) => { setClassId(e.target.value); setStudentId(""); }}
                    style={{ flex: "1 1 200px", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, fontFamily: "inherit", color: COLORS.textDark, background: COLORS.white }}
                  >
                    {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>

                  <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: `1.5px solid ${COLORS.border}` }}>
                    <button
                      onClick={() => setMode("class")}
                      className="gc-mode"
                      style={{ padding: "10px 16px", fontSize: 13, fontWeight: 700, background: mode === "class" ? ACCENT : COLORS.white, color: mode === "class" ? COLORS.white : COLORS.textMuted }}
                    >
                      Whole Class
                    </button>
                    <button
                      onClick={() => setMode("student")}
                      className="gc-mode"
                      style={{ padding: "10px 16px", fontSize: 13, fontWeight: 700, background: mode === "student" ? ACCENT : COLORS.white, color: mode === "student" ? COLORS.white : COLORS.textMuted }}
                    >
                      One Student
                    </button>
                  </div>
                </div>

                {mode === "student" && (
                  <select
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, fontFamily: "inherit", color: COLORS.textDark, background: COLORS.white, marginBottom: 14 }}
                  >
                    <option value="">Choose a student...</option>
                    {classStudents.map((s) => <option key={s.id} value={s.id}>{s.first_name}</option>)}
                  </select>
                )}
                {mode === "class" && classStudents.length === 0 && (
                  <div style={{ fontSize: 12.5, color: COLORS.danger, marginBottom: 14 }}>No active students in this class.</div>
                )}

                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={mode === "class" ? "Write an announcement for the whole class..." : "Write a note for this student..."}
                  rows={4}
                  maxLength={2000}
                  style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, fontFamily: "inherit", color: COLORS.textDark, resize: "vertical", marginBottom: 14 }}
                />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ fontSize: 12, color: status ? (status.type === "success" ? COLORS.success : COLORS.danger) : COLORS.textMuted, fontWeight: 600 }}>
                    {status ? status.text : " "}
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!canSend}
                    className="gc-btn"
                    style={{ display: "flex", alignItems: "center", gap: 8, background: ACCENT, color: COLORS.white, borderRadius: 999, padding: "10px 22px", fontWeight: 700, fontSize: 13.5, opacity: canSend ? 1 : 0.5 }}
                  >
                    <Send size={15} /> {sending ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>

              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, fontFamily: "'Poppins', sans-serif", paddingLeft: 2 }}>Sent</div>
              {batches.length === 0 ? (
                <div style={panelStyle(ACCENT, { padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 13.5 })}>Nothing sent yet — your first message will show up here.</div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {batches.map((b) => (
                    <div key={b.batchId} style={panelStyle(ACCENT, { padding: "16px 18px" })}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>
                          {b.isBroadcast ? `📢 Whole class: ${b.className}` : `💬 ${b.studentName} · ${b.className}`}
                        </div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, whiteSpace: "nowrap" }}>{timeAgo(b.createdAt)}</div>
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 10, whiteSpace: "pre-wrap" }}>{b.body}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: b.read === b.total ? COLORS.success : COLORS.textMuted }}>
                        {b.total === 1 ? (b.read === 1 ? "Read" : "Not read yet") : `Read by ${b.read} of ${b.total}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
