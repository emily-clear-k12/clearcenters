"use client";
import {BridgePage,PageHeading} from "../../../../components/teacher/BridgeUI";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Printer } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS } from "../../../../lib/teacherTheme";
import { missionMapTeksCode } from "../../../../lib/cases/mission-map/teksLabels";

// Sept 13 — moved to the console-interior look, same pattern as the rest of
// Reports. Same reasoning as the class/student reports: plain opaque white
// report card (printable document), aqua Observatory chrome around it,
// proficiency-band colors (including violet for "Developing") untouched.
const ACCENT = "#7541cf";
const BG = PAGE_BACKGROUNDS["/teacher/reports"];

function proficiencyBand(avg) {
  if (avg >= 1.8) return { label: "Excellent", color: COLORS.success };
  if (avg >= 1.4) return { label: "Proficient", color: COLORS.info };
  if (avg >= 1.0) return { label: "Developing", color: COLORS.violet };
  return { label: "Needs Support", color: COLORS.danger };
}

export default function StandardsReportPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classGroups, setClassGroups] = useState([]);
  // Sept 22 2026 — Relay Station keyboarding (Tech Apps (c)(12)(C)). Typing
  // has no teacher grade, so it gets its own section built from Foundations
  // Track progress (via /api/teacher/typing-track "summary").
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      load(data.user.id);
      setLoadingAuth(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const load = useCallback(async (teacherId) => {
    setLoading(true);

    // Same shape as the class report's "Standards Summary" and the Student
    // Progress "By Standard" tab — just every class on one printable page
    // instead of one class at a time, since that's what gets handed to an
    // admin or compared across a teacher's own classes.
    const { data: classes } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    const classIds = (classes || []).map((c) => c.id);

    let students = [];
    if (classIds.length > 0) {
      const { data } = await supabase.from("students").select("id, class_id").in("class_id", classIds);
      students = data || [];
    }
    const studentClassMap = Object.fromEntries(students.map((s) => [s.id, s.class_id]));

    const { data: assignments } = classIds.length > 0
      ? await supabase.from("assignments").select("id, class_id, case_standard").in("class_id", classIds)
      : { data: [] };
    const assignmentStandard = Object.fromEntries((assignments || []).map((a) => [a.id, a.case_standard]));
    const assignmentIds = (assignments || []).map((a) => a.id);

    const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    let caseTitleMap = {};
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);
      caseTitleMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.title]));
    }

    let submissions = [];
    if (assignmentIds.length > 0) {
      const { data } = await supabase.from("submissions").select("student_id, assignment_id, teacher_grade, released").in("assignment_id", assignmentIds);
      submissions = data || [];
    }

    const byClassStandard = {};
    submissions.forEach((s) => {
      if (!s.released || s.teacher_grade === null || s.teacher_grade === undefined) return;
      const standard = assignmentStandard[s.assignment_id];
      const classId = studentClassMap[s.student_id];
      if (!standard || !classId) return;
      if (!byClassStandard[classId]) byClassStandard[classId] = {};
      if (!byClassStandard[classId][standard]) byClassStandard[classId][standard] = [];
      byClassStandard[classId][standard].push(s.teacher_grade);
    });

    const grouped = (classes || []).map((c) => {
      const stdMap = byClassStandard[c.id] || {};
      const standardRows = Object.entries(stdMap).map(([standard, grades]) => {
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        return { standard, title: caseTitleMap[standard] || standard, gradedCount: grades.length, avgPct: Math.round((avg / 2) * 100), band: proficiencyBand(avg) };
      }).sort((a, b) => a.avgPct - b.avgPct);
      return { classId: c.id, className: c.name, standards: standardRows };
    });

    setClassGroups(grouped);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/teacher/typing-track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "summary", accessToken: session?.access_token }),
      });
      const t = await res.json();
      if (res.ok) setTyping(t);
    } catch (err) {
      // Typing section is optional — the rest of the report still renders.
    }

    setLoading(false);
  }, []);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const generatedDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const anyStandards = classGroups.some((g) => g.standards.length > 0);

  return (
    <BridgePage teacherEmail={teacherEmail} >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          .reports-shell { background: white !important; background-image: none !important; }
          body, main { background: white !important; }
          .report-card { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div className="no-print"><PageHeading title="Reports" subtitle="standards, all classes"></PageHeading></div>

      <div className="cc-detail-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 800, margin: "0 auto 20px" }} className="no-print">
          <button onClick={() => router.push("/teacher/reports")} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontWeight: 700, fontSize: 13.5 }}>
            <ChevronLeft size={18} /> Back to Reports
          </button>
          <button onClick={() => window.print()} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 8, background: ACCENT, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5 }}>
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>

        <div className="report-card" style={{ maxWidth: 800, margin: "0 auto", background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 8px 28px rgba(80,60,150,.16)" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>ClearCenters Standards Report</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 4px 0" }}>All Classes</h1>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>Generated {generatedDate}{teacherEmail ? ` · ${teacherEmail}` : ""}</div>
          </div>

          {!anyStandards && classGroups.length === 0 && (
            <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "20px 0" }}>No classes yet.</div>
          )}
          {!anyStandards && classGroups.length > 0 && (
            <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "20px 0" }}>No released grades yet across any class — this fills in once grades are released.</div>
          )}

          {typing && typing.classes && typing.classes.some((c) => c.startedCount > 0) && (
            <div style={{ marginBottom: 28, paddingBottom: 12, borderBottom: `2px solid ${COLORS.border}` }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2, fontFamily: "'Poppins', sans-serif" }}>Keyboarding — Relay Station Foundations Track</div>
              <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>Tech Apps TEKS 3.12C / 4.12C / 5.12C — "demonstrate proper touch keyboarding techniques" with accuracy (and speed, grades 4–5). Based on track levels passed, not a teacher grade.</div>
              <div style={{ display: "grid", gap: 2 }}>
                {typing.classes.filter((c) => c.startedCount > 0).map((c) => {
                  const pct = Math.round(((c.avgLevelsPassed || 0) / typing.total) * 100);
                  const band = pct >= 90 ? { label: "Excellent", color: COLORS.success } : pct >= 70 ? { label: "Proficient", color: COLORS.info } : pct >= 40 ? { label: "Developing", color: COLORS.violet } : { label: "Needs Support", color: COLORS.danger };
                  const code = c.grade ? `Tech Apps ${c.grade}.12C` : "Tech Apps 12C";
                  return (
                    <div key={c.classId} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5, flexWrap: "wrap" }}>
                      <div style={{ width: 220, fontWeight: 600 }}>{c.className} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>({code})</span></div>
                      <div style={{ color: COLORS.textMuted }}>
                        {c.startedCount}/{c.studentCount} started · {c.completedCount} completed · avg {Math.round((c.avgLevelsPassed || 0) * 10) / 10} of {typing.total} levels
                        {c.avgAccuracy !== null ? ` · ${Math.round(c.avgAccuracy)}% acc` : ""}{c.avgWpm !== null ? ` · ${Math.round(c.avgWpm)} WPM` : ""}
                      </div>
                      <div style={{ flex: 1 }} />
                      <div style={{ width: 40, fontWeight: 700, textAlign: "right" }}>{pct}%</div>
                      <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 999, background: band.color + "22", color: band.color }}>{band.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {classGroups.map((g) => (
            g.standards.length > 0 && (
              <div key={g.classId} style={{ marginBottom: 28 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>{g.className}</div>
                <div style={{ display: "grid", gap: 2 }}>
                  {g.standards.map((row) => (
                    <div key={row.standard} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5 }}>
                      {/* Sept 16, 2026 — this is a standards report, so the
                          number beside each case has to be the real standard.
                          Mission Map's `standard` is an internal concept
                          number (3.1-MM) that isn't the TEKS the case teaches
                          (3.12B), which made a quarter of this report's rows
                          misleading and hid the fact that a Mission Map case
                          and, say, a Signal Check case can cover the same
                          standard. Everything else already stores the real
                          standard, so it passes straight through. */}
                      <div style={{ width: 220, fontWeight: 600 }}>{row.title} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>({missionMapTeksCode(row.standard) || row.standard})</span></div>
                      <div style={{ width: 80, color: COLORS.textMuted }}>{row.gradedCount} graded</div>
                      <div style={{ flex: 1 }} />
                      <div style={{ width: 40, fontWeight: 700, textAlign: "right" }}>{row.avgPct}%</div>
                      <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 999, background: row.band.color + "22", color: row.band.color }}>{row.band.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </BridgePage>
  );
}
