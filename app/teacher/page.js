"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const COLORS = {
  navy: "#16243F",
  deepNavy: "#1B2D4D",
  slate: "#2A3E63",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  warning: "#FF9F43",
};

export default function TeacherDashboard() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherName, setTeacherName] = useState("");
  const [classCount, setClassCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setTeacherName(data.user.email?.split("@")[0] || "");
      setLoadingAuth(false);
    });
  }, [router]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    const { data: classes } = await supabase.from("classes").select("id");
    const classIds = (classes || []).map((c) => c.id);
    setClassCount(classIds.length);

    if (classIds.length > 0) {
      const { count: students } = await supabase
        .from("students")
        .select("id", { count: "exact", head: true })
        .in("class_id", classIds);
      setStudentCount(students || 0);
    }

    const { data: subs, error: fetchError } = await supabase
      .from("submissions")
      .select("id, submitted_at, student_id")
      .not("submitted_at", "is", null)
      .is("teacher_grade", null)
      .order("submitted_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    const list = subs || [];
    if (list.length > 0) {
      const studentIds = [...new Set(list.map((s) => s.student_id).filter(Boolean))];
      const { data: students } = await supabase.from("students").select("id, first_name").in("id", studentIds);
      const studentMap = Object.fromEntries((students || []).map((s) => [s.id, s]));
      setPendingSubmissions(list.map((s) => ({ ...s, studentName: studentMap[s.student_id]?.first_name || "Unknown" })));
    } else {
      setPendingSubmissions([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loadingAuth) loadDashboard();
  }, [loadingAuth, loadDashboard]);

  if (loadingAuth || loading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  const pendingCount = pendingSubmissions.length;

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.deepNavy} 100%)`, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-pulse { animation: gcPulse 2s ease-in-out infinite; }
        @keyframes gcPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,159,67,.4); } 50% { box-shadow: 0 0 0 10px rgba(255,159,67,0); } }
      `}</style>

      <div style={{ background: COLORS.slate, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.white, fontWeight: 700, fontSize: 17, marginRight: "auto" }}>
          ClearCenters HQ · Dashboard
        </div>
        <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5 }}>
          Assign & Roster
        </button>
        <button onClick={() => router.push("/teacher/grade")} className="gc-btn" style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5 }}>
          Review Submissions
        </button>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.push("/login"); }}
          className="gc-btn"
          style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5 }}
        >
          Log Out
        </button>
      </div>

      <div style={{ padding: "24px 20px 40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 960 }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.white, margin: "0 0 20px 0" }}>
            Welcome back{teacherName ? `, ${teacherName}` : ""}!
          </h1>

          {error && (
            <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>
          )}

          {pendingCount > 0 ? (
            <button
              onClick={() => router.push("/teacher/grade")}
              className="gc-btn gc-pulse"
              style={{ width: "100%", background: COLORS.white, borderRadius: 18, padding: 22, boxShadow: "0 8px 24px rgba(0,0,0,.15)", marginBottom: 20, display: "flex", alignItems: "center", gap: 18, textAlign: "left", border: `2px solid ${COLORS.warning}` }}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#FFF4E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>📥</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 19, color: COLORS.textDark, fontFamily: "'Poppins', sans-serif" }}>
                  {pendingCount} submission{pendingCount === 1 ? "" : "s"} waiting to review
                </div>
                <div style={{ fontSize: 13.5, color: COLORS.textMuted, marginTop: 2 }}>
                  {pendingSubmissions.slice(0, 3).map((s) => s.studentName).filter(Boolean).join(", ")}
                  {pendingCount > 3 ? ` and ${pendingCount - 3} more` : ""}
                </div>
              </div>
              <div style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 14 }}>Review Now →</div>
            </button>
          ) : (
            <div style={{ background: COLORS.white, borderRadius: 18, padding: 22, boxShadow: "0 4px 16px rgba(0,0,0,.1)", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 26 }}>✅</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.textDark }}>You're all caught up!</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>No submissions are waiting for a grade right now.</div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 18, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
              <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.violet }}>{classCount}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>Classes</div>
            </div>
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 18, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
              <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.teal }}>{studentCount}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>Students</div>
            </div>
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 18, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
              <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.gold }}>{pendingCount}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>Needs Review</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: COLORS.white, borderRadius: 16, padding: 20, textAlign: "left", boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>📋</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.textDark, marginBottom: 3 }}>Assign & Roster</div>
              <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>Manage classes, assign cases, add students</div>
            </button>
            <button onClick={() => router.push("/teacher/grade")} className="gc-btn" style={{ background: COLORS.white, borderRadius: 16, padding: 20, textAlign: "left", boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>📥</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.textDark, marginBottom: 3 }}>Review Submissions</div>
              <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>Grade real student work and release grades</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
