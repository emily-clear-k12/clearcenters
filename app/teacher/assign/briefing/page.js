"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import TeacherSidebar from "../../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../../components/TeacherPageBanner";

const COLORS = {
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#6FD8F5",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

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
    return <div style={{ padding: 40, color: COLORS.textMuted }}>Loading…</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.cream }}>
      <TeacherSidebar />
      <div style={{ flex: 1, padding: "24px 28px", maxWidth: 980 }}>
        <TeacherPageBanner style={{ marginBottom: 20 }}>
          <div style={{ maxWidth: "62%" }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, margin: "0 0 4px 0" }}>Assign Briefing</h1>
            <p style={{ color: COLORS.textMuted, fontSize: 14, margin: 0 }}>
              Social Studies teach-first shelf — separate from Challenge Library
            </p>
          </div>
        </TeacherPageBanner>
        <button
          type="button"
          className="gc-btn"
          onClick={() => router.push("/teacher/assign")}
          style={{ background: "none", color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4, padding: 0, marginBottom: 16, fontWeight: 600, fontSize: 13 }}
        >
          <ChevronLeft size={16} /> Back to My Classes
        </button>

        <div style={{ background: COLORS.white, borderRadius: 18, padding: 22, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
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
                    background: on ? COLORS.violetSoft : COLORS.white,
                    border: on ? `2px solid ${COLORS.violet}` : `2px solid ${COLORS.border}`,
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet }}>{b.id}</div>
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

          {error && <p style={{ color: "#EF4444", fontSize: 13 }}>{error}</p>}
          {message && <p style={{ color: "#16A34A", fontSize: 13 }}>{message}</p>}

          <button
            type="button"
            className="gc-btn"
            disabled={saving}
            onClick={handleAssign}
            style={{
              marginTop: 8,
              background: COLORS.violet,
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
};
function chip(on) {
  return {
    borderRadius: 999,
    padding: "7px 12px",
    fontSize: 12.5,
    fontWeight: 700,
    background: on ? COLORS.violetSoft : COLORS.white,
    color: on ? COLORS.violet : COLORS.textDark,
    border: `1.5px solid ${on ? COLORS.violet : COLORS.border}`,
  };
}

export default function AssignBriefingPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading…</div>}>
      <AssignBriefingInner />
    </Suspense>
  );
}
