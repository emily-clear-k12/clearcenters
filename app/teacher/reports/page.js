"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

export default function ReportsPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      loadClasses(data.user.id);
      setLoadingAuth(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const loadClasses = useCallback(async (teacherId) => {
    setLoading(true);
    const { data: classesData } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    const classIds = (classesData || []).map((c) => c.id);

    let counts = {};
    if (classIds.length > 0) {
      const { data: students } = await supabase.from("students").select("id, class_id").in("class_id", classIds);
      (students || []).forEach((s) => { counts[s.class_id] = (counts[s.class_id] || 0) + 1; });
    }

    setClasses((classesData || []).map((c) => ({ ...c, studentCount: counts[c.id] || 0 })));
    setLoading(false);
  }, []);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-card { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; }
        .gc-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
      `}</style>
      <TeacherSidebar teacherEmail={teacherEmail} />
      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 900, margin: "0 auto" }}>
        <TeacherPageBanner>
          <div style={{ maxWidth: "62%" }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 6px 0" }}>Reports</h1>
            <p style={{ color: COLORS.textMuted, fontSize: 14, margin: 0 }}>Pick a class to generate a printable summary — great for parent conferences or admin check-ins.</p>
          </div>
        </TeacherPageBanner>

        <div className="gc-card" onClick={() => router.push("/teacher/reports/standards")} style={{ background: COLORS.violetSoft, border: `1px solid ${COLORS.violet}33`, borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 16px rgba(13,27,42,.06)", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 20, flexShrink: 0 }}>📊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Standards Report — All Classes</div>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>How every standard is going, broken out class by class — one printable page.</div>
          </div>
          <div style={{ color: COLORS.violet, fontWeight: 700, fontSize: 13 }}>View →</div>
        </div>

        {classes.length === 0 ? (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No classes yet.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {classes.map((c) => (
              <div key={c.id} className="gc-card" onClick={() => router.push(`/teacher/reports/${c.id}`)} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 18, marginBottom: 12 }}>{c.name[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>{c.studentCount} student{c.studentCount === 1 ? "" : "s"}</div>
                <div style={{ marginTop: 12, color: COLORS.violet, fontWeight: 700, fontSize: 12.5 }}>Generate Report →</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
