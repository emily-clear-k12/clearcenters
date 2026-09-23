"use client";
import {BridgePage,PageHeading} from "../../../../components/teacher/BridgeUI";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../../lib/teacherTheme";

// Sept 13 — moved to the console-interior look, same pattern as My Classes
// and Challenge Library (both part of the same Mission Control flow this
// page is reached from). No dedicated art exists for this page yet, so it
// reuses My Classes' bg-platform-room.jpg — same room, same family — rather
// than leaving it on the old light-cream look while everything around it
// moves over. Decorative violet became this page's pink ACCENT; no query
// or assignment logic changed.
const ACCENT = "#7541cf";
const BG = PAGE_BACKGROUNDS["/teacher/assign"];

function AssignBriefingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetClassId = searchParams.get("classId");

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [assignClassId, setAssignClassId] = useState(presetClassId || "");
  const [roster, setRoster] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [targetMode, setTargetMode] = useState("whole"); // whole | selected
  const [briefings, setBriefings] = useState([]);
  const [selectedBriefing, setSelectedBriefing] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setTeacherId(data.user.id);
      setLoadingAuth(false);
    });
  }, [router]);

  useEffect(() => {
    if (!teacherId) return;
    supabase
      .from("classes")
      .select("*")
      .eq("teacher_id", teacherId)
      .order("created_at")
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
          return;
        }
        setClasses(data || []);
        if (!assignClassId && data?.[0]) setAssignClassId(data[0].id);
      });
    supabase
      .from("briefings")
      .select("id, title, tagline, subject, grade, teks, minutes, published")
      .eq("published", true)
      .order("id")
      .then(({ data, error: err }) => {
        if (err) {
          setError(
            err.message +
              " — Did you run add_briefings_ss_3_2a_br_migration.sql in Supabase?"
          );
          return;
        }
        setBriefings(data || []);
        if (data?.[0]) setSelectedBriefing(data[0]);
      });
  }, [teacherId]);

  useEffect(() => {
    if (!assignClassId) return;
    supabase
      .from("students")
      .select("id, first_name")
      .eq("class_id", assignClassId)
      .order("first_name")
      .then(({ data }) => {
        setRoster(data || []);
        setSelectedStudentIds([]);
        setTargetMode("whole");
      });
  }, [assignClassId]);

  async function handleAssign() {
    setMessage("");
    setError("");
    if (!assignClassId || !selectedBriefing) {
      setError("Pick a class and a Briefing.");
      return;
    }
    if (targetMode === "selected" && selectedStudentIds.length === 0) {
      setError("Select at least one student, or choose whole class.");
      return;
    }
    setSaving(true);
    const { data: newAssignment, error: insertError } = await supabase
      .from("briefing_assignments")
      .insert({
        class_id: assignClassId,
        briefing_id: selectedBriefing.id,
        due_date: dueDate || null,
      })
      .select("id")
      .single();

    if (insertError) {
      setSaving(false);
      setError(insertError.message);
      return;
    }

    if (targetMode === "selected" && selectedStudentIds.length > 0) {
      const rows = selectedStudentIds.map((student_id) => ({
        assignment_id: newAssignment.id,
        student_id,
      }));
      const { error: targetError } = await supabase
        .from("briefing_assignment_students")
        .insert(rows);
      if (targetError) {
        setSaving(false);
        setError(targetError.message);
        return;
      }
    }

    setSaving(false);
    setMessage(`Assigned “${selectedBriefing.title}” — students see it under My Briefings (not My Missions).`);
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>Loading…</div>;
  }

  return (
    <BridgePage  >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <PageHeading title="Assign Briefing" subtitle="Social Studies teach-first shelf"></PageHeading>

      <div className="cc-detail-content">
        <div style={{ width: "100%", maxWidth: 980 }}>
          <button
            type="button"
            className="gc-btn"
            onClick={() => router.push("/teacher/assign")}
            style={{ background: "none", color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4, padding: 0, marginBottom: 16, fontWeight: 600, fontSize: 13 }}
          >
            <ChevronLeft size={16} /> Back to class management
          </button>

          <div style={panelStyle(ACCENT, { padding: 22 })}>
            <p style={{ margin: "0 0 16px 0", fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.45 }}>
              Briefings use parallel <code>briefing_*</code> tables. Cleared students do <strong>not</strong> auto-unlock Challenges
              (<code>related_challenge_ids</code> is empty for the pilot).
            </p>

            <label style={labelStyle}>Class</label>
            <select value={assignClassId} onChange={(e) => setAssignClassId(e.target.value)} style={inputStyle}>
              <option value="">Select class…</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name} · Grade {c.grade} · {c.subject}</option>
              ))}
            </select>

            <label style={labelStyle}>Briefing</label>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", marginBottom: 12 }}>
              {briefings.map((b) => {
                const on = selectedBriefing?.id === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    className="gc-btn"
                    onClick={() => setSelectedBriefing(b)}
                    style={{
                      textAlign: "left",
                      background: on ? `${ACCENT}1E` : COLORS.white,
                      border: on ? `2px solid ${ACCENT}` : `2px solid ${COLORS.border}`,
                      borderRadius: 14,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT }}>{b.id}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginTop: 2 }}>{b.title}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>TEKS {b.teks} · ~{b.minutes} min</div>
                  </button>
                );
              })}
              {briefings.length === 0 && (
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>No published Briefings found.</div>
              )}
            </div>

            <label style={labelStyle}>Due date (optional)</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} />

            <label style={labelStyle}>Who gets it?</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button type="button" className="gc-btn" onClick={() => setTargetMode("whole")} style={chip(targetMode === "whole")}>Whole class</button>
              <button type="button" className="gc-btn" onClick={() => setTargetMode("selected")} style={chip(targetMode === "selected")}>Selected students</button>
            </div>
            {targetMode === "selected" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {roster.map((s) => {
                  const on = selectedStudentIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className="gc-btn"
                      onClick={() =>
                        setSelectedStudentIds((prev) =>
                          on ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                        )
                      }
                      style={chip(on)}
                    >
                      {s.first_name}
                    </button>
                  );
                })}
              </div>
            )}

            {error && <p style={{ color: COLORS.danger, fontSize: 13 }}>{error}</p>}
            {message && <p style={{ color: COLORS.success, fontSize: 13 }}>{message}</p>}

            <button
              type="button"
              className="gc-btn"
              disabled={saving}
              onClick={handleAssign}
              style={{
                marginTop: 8,
                background: ACCENT,
                color: COLORS.white,
                borderRadius: 999,
                padding: "12px 22px",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {saving ? "Assigning…" : "Assign Briefing"}
            </button>
          </div>
        </div>
      </div>
    </BridgePage>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMuted, margin: "12px 0 6px" };
const inputStyle = {
  width: "100%",
  maxWidth: 420,
  boxSizing: "border-box",
  border: `2px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "9px 10px",
  fontSize: 13.5,
  marginBottom: 4,
  background: "rgba(255,255,255,.65)",
  color: COLORS.textDark,
};
function chip(on) {
  return {
    borderRadius: 999,
    padding: "7px 12px",
    fontSize: 12.5,
    fontWeight: 700,
    background: on ? `${ACCENT}1E` : "rgba(255,255,255,.55)",
    color: on ? ACCENT : COLORS.textDark,
    border: `1.5px solid ${on ? ACCENT : COLORS.border}`,
  };
}

export default function AssignBriefingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading…</div>}>
      <AssignBriefingInner />
    </Suspense>
  );
}
