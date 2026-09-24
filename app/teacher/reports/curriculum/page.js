"use client";
import {BridgePage,PageHeading} from "../../../../components/teacher/BridgeUI";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Printer } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS } from "../../../../lib/teacherTheme";

// Sept 14 — Feature 4 of the teacher-efficiency build (see
// Teacher_SiteWide_Redesign_Plan.md): one combined rollup of every case
// Emily has ever assigned, across ALL of her classes at once — by design
// not broken out class-by-class the way the Standards Report is, since the
// whole point here is "which standards or case types are landing and which
// aren't" without digging class-by-class. Same Reports/Observatory chrome
// as every other report page.
const ACCENT = "#7541cf";
const BG = PAGE_BACKGROUNDS["/teacher/reports"];

function proficiencyBand(avg) {
  if (avg >= 1.8) return { label: "Excellent", color: COLORS.success };
  if (avg >= 1.4) return { label: "Proficient", color: COLORS.info };
  if (avg >= 1.0) return { label: "Developing", color: COLORS.violet };
  return { label: "Needs Support", color: COLORS.danger };
}

// Duplicated, trimmed copy of the key→label lookup from CHALLENGE_TYPES in
// app/teacher/assign/new/page.js (this page doesn't need the images,
// descriptions, or "real"/coming-soon flags — just the label a teacher
// already knows from the Challenge Library). Same "duplicate the small
// lookup rather than import from a page module" convention already used
// for proficiencyBand/StatBlock/TrendChart across the report pages. Keep
// in sync by hand if a new challenge type ships.
const ENGINE_LABELS = {
  group_chat: "Group Chat",
  fact_check_desk: "Signal Check",
  mission_map: "Mission Map",
  simulation_lab: "Simulation Lab",
  frequency_rush: "Frequency Rush",
  signal_defense: "Signal Ops",
  repair_desk: "Repair Desk",
  museum_exhibit: "Museum Exhibit Builder",
  newsroom: "Newsroom",
  relay_station: "Relay Station",
  assembly_deck: "Assembly Deck",
  classification_lab: "Classification Lab",
};

// Same fallback/prefix rules as matchesChallenge() in Challenge Library: a
// case with no `engine` set is the original written-response type (Group
// Chat), and any "newsroom*" variant (newsroom_bn, newsroom_fr, ...)
// collapses into one Newsroom row.
function resolveEngineKey(caseEngine) {
  if ((caseEngine || "").startsWith("newsroom")) return "newsroom";
  return caseEngine || "group_chat";
}
function engineLabel(key) {
  return ENGINE_LABELS[key] || key;
}

// Shared by both the per-case and per-challenge-type rollups — both are
// "a pile of assignments and their submissions" reduced to the same three
// numbers, just grouped differently.
function summarize({ targetCount, completedCount, grades, submittedCount, revisedCount }) {
  const avg = grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : null;
  return {
    completionPct: targetCount > 0 ? Math.round((100 * completedCount) / targetCount) : null,
    completedCount,
    targetCount,
    avgPct: avg !== null ? Math.round((avg / 2) * 100) : null,
    band: avg !== null ? proficiencyBand(avg) : null,
    gradedCount: grades.length,
    revisionPct: submittedCount > 0 ? Math.round((100 * revisedCount) / submittedCount) : null,
    submittedCount,
  };
}

const SORTS = {
  score: { label: "Lowest Score First", fn: (a, b) => (a.avgPct ?? 999) - (b.avgPct ?? 999) },
  completion: { label: "Lowest Completion First", fn: (a, b) => (a.completionPct ?? 999) - (b.completionPct ?? 999) },
  revision: { label: "Most Sent-Back First", fn: (a, b) => (b.revisionPct ?? -1) - (a.revisionPct ?? -1) },
};

export default function CurriculumAnalyticsPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [hasClasses, setHasClasses] = useState(true);
  const [hasAssignments, setHasAssignments] = useState(true);
  const [caseRows, setCaseRows] = useState([]);
  const [engineRows, setEngineRows] = useState([]);
  const [sortKey, setSortKey] = useState("score");

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

    const { data: classes } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    const classIds = (classes || []).map((c) => c.id);
    if (classIds.length === 0) { setHasClasses(false); setLoading(false); return; }

    // Same "SQL delivered != SQL run" hardening as Roster Management and
    // Overview's classes query — `active` is a new column (Feature 2), so
    // fall back to treating everyone as active if that migration hasn't
    // landed yet, rather than a hard error or an empty page.
    let { data: students, error: studentsError } = await supabase
      .from("students")
      .select("id, class_id, active")
      .in("class_id", classIds);
    if (studentsError) {
      console.error("Curriculum Analytics: 'active' column missing — falling back to treating every student as active. Run the migration in Teacher_SiteWide_Redesign_Plan.md if this persists:", studentsError);
      const fallback = await supabase.from("students").select("id, class_id").in("class_id", classIds);
      students = (fallback.data || []).map((s) => ({ ...s, active: true }));
    } else {
      students = (students || []).map((s) => ({ ...s, active: s.active !== false }));
    }
    const activeStudentIds = new Set(students.filter((s) => s.active).map((s) => s.id));
    const activeIdsByClass = {};
    students.forEach((s) => {
      if (!s.active) return;
      (activeIdsByClass[s.class_id] || (activeIdsByClass[s.class_id] = [])).push(s.id);
    });

    const { data: assignments } = await supabase.from("assignments").select("id, class_id, case_standard").in("class_id", classIds);
    if (!assignments || assignments.length === 0) { setHasAssignments(false); setLoading(false); return; }
    const assignmentIds = assignments.map((a) => a.id);

    const caseStandards = [...new Set(assignments.map((a) => a.case_standard).filter(Boolean))];
    let caseMap = {};
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title, engine").in("standard", caseStandards);
      caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));
    }

    const [{ data: targetRows }, { data: subRows }] = await Promise.all([
      supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds),
      supabase.from("submissions").select("student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested_at").in("assignment_id", assignmentIds),
    ]);

    const targetsByAssignment = {};
    (targetRows || []).forEach((t) => (targetsByAssignment[t.assignment_id] || (targetsByAssignment[t.assignment_id] = [])).push(t.student_id));
    const subsByAssignment = {};
    (subRows || []).forEach((s) => (subsByAssignment[s.assignment_id] || (subsByAssignment[s.assignment_id] = [])).push(s));

    // One accumulator per case (case_standard), combined across every
    // assignment/class that ever used it — this is the whole point of the
    // page: a case shows up here as one row no matter how many classes or
    // how many times it's been assigned.
    const byCase = {};
    assignments.forEach((a) => {
      if (!a.case_standard) return;
      const caseInfo = caseMap[a.case_standard];
      if (!caseInfo) return; // orphaned case_standard (case deleted/renamed since assigning) — skip rather than show a blank row
      if (!byCase[a.case_standard]) {
        byCase[a.case_standard] = {
          standard: a.case_standard, title: caseInfo.title, engine: caseInfo.engine,
          assignmentCount: 0, targetCount: 0, completedCount: 0,
          grades: [], submittedCount: 0, revisedCount: 0,
        };
      }
      const row = byCase[a.case_standard];
      row.assignmentCount += 1;

      // Who this assignment applies to: an explicit target list
      // (assignment_students) if the teacher picked specific students,
      // otherwise the whole class's active roster — same rule used by
      // every report page's appliesToStudent(). Filtered to active
      // students only so a removed student doesn't count against
      // completion for an assignment they can no longer even open.
      const explicitTargets = targetsByAssignment[a.id];
      const targetIds = explicitTargets && explicitTargets.length > 0
        ? explicitTargets.filter((id) => activeStudentIds.has(id))
        : (activeIdsByClass[a.class_id] || []);
      row.targetCount += targetIds.length;

      const targetSet = new Set(targetIds);
      const subs = (subsByAssignment[a.id] || []).filter((s) => targetSet.size === 0 || targetSet.has(s.student_id));

      subs.forEach((s) => {
        if (s.submitted_at) {
          row.completedCount += 1;
          row.submittedCount += 1;
          // `revision_requested_at` is only ever cleared by the teacher's
          // own "undo that send-back" action — a resubmit clears the
          // *current* revision_requested flag but leaves this timestamp
          // alone (see app/api/submission/submit/route.js) — so it's a
          // reliable "was this ever sent back for a redo" marker even
          // after the student fixed it and resubmitted, not just a
          // snapshot of the current pending-revision state.
          if (s.revision_requested_at) row.revisedCount += 1;
        }
        if (s.released && s.teacher_grade !== null && s.teacher_grade !== undefined) {
          row.grades.push(s.teacher_grade);
        }
      });
    });

    const rawCaseRows = Object.values(byCase);

    const formattedCaseRows = rawCaseRows.map((row) => ({
      standard: row.standard,
      title: row.title,
      engineKey: resolveEngineKey(row.engine),
      assignmentCount: row.assignmentCount,
      ...summarize(row),
    }));

    // Same numbers, rolled up by challenge type instead of by individual
    // case — lets Emily see e.g. "Frequency Rush is landing well overall"
    // without reading through every individual vocabulary set.
    const byEngine = {};
    rawCaseRows.forEach((row) => {
      const key = resolveEngineKey(row.engine);
      if (!byEngine[key]) byEngine[key] = { engineKey: key, caseCount: 0, assignmentCount: 0, targetCount: 0, completedCount: 0, grades: [], submittedCount: 0, revisedCount: 0 };
      const e = byEngine[key];
      e.caseCount += 1;
      e.assignmentCount += row.assignmentCount;
      e.targetCount += row.targetCount;
      e.completedCount += row.completedCount;
      e.grades.push(...row.grades);
      e.submittedCount += row.submittedCount;
      e.revisedCount += row.revisedCount;
    });
    const formattedEngineRows = Object.values(byEngine).map((row) => ({
      engineKey: row.engineKey,
      caseCount: row.caseCount,
      assignmentCount: row.assignmentCount,
      ...summarize(row),
    }));

    setCaseRows(formattedCaseRows);
    setEngineRows(formattedEngineRows);
    setLoading(false);
  }, []);

  const sortedCaseRows = useMemo(() => [...caseRows].sort(SORTS[sortKey].fn), [caseRows, sortKey]);
  const sortedEngineRows = useMemo(() => [...engineRows].sort(SORTS[sortKey].fn), [engineRows, sortKey]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const generatedDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <BridgePage teacherEmail={teacherEmail} >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-sort { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          .reports-shell { background: white !important; background-image: none !important; }
          body, main { background: white !important; }
          .report-card { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div className="no-print"><PageHeading title="Reports" subtitle="curriculum analytics across all classes"></PageHeading></div>

      <div className="cc-detail-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 900, margin: "0 auto 20px" }} className="no-print">
          <button onClick={() => router.push("/teacher/reports")} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontWeight: 700, fontSize: 13.5 }}>
            <ChevronLeft size={18} /> Back to Reports
          </button>
          <button onClick={() => window.print()} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 8, background: ACCENT, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5 }}>
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>

        <div className="report-card" style={{ maxWidth: 900, margin: "0 auto", background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 8px 28px rgba(80,60,150,.16)" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>ClearCenters Curriculum Analytics</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 4px 0" }}>All Classes</h1>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>Every case you've assigned, combined across every class · Generated {generatedDate}{teacherEmail ? ` · ${teacherEmail}` : ""}</div>
          </div>

          {!hasClasses && (
            <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "20px 0" }}>No classes yet.</div>
          )}
          {hasClasses && !hasAssignments && (
            <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "20px 0" }}>Nothing assigned yet across any class — this fills in once you've assigned a few cases.</div>
          )}

          {hasClasses && hasAssignments && (
            <>
              <div className="no-print" style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
                {Object.entries(SORTS).map(([key, { label }]) => (
                  <button
                    key={key}
                    onClick={() => setSortKey(key)}
                    className="gc-sort"
                    style={{
                      padding: "6px 13px", borderRadius: 999, fontSize: 11.5, fontWeight: 700,
                      background: sortKey === key ? ACCENT : `${ACCENT}14`,
                      color: sortKey === key ? COLORS.white : ACCENT,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 30 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>By Challenge Type</div>
                <RollupTable rows={sortedEngineRows} nameOf={(r) => engineLabel(r.engineKey)} subOf={(r) => `${r.caseCount} case${r.caseCount === 1 ? "" : "s"} · ${r.assignmentCount} assignment${r.assignmentCount === 1 ? "" : "s"}`} keyOf={(r) => r.engineKey} />
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>By Case</div>
                <RollupTable rows={sortedCaseRows} nameOf={(r) => r.title} subOf={(r) => `${r.standard} · ${engineLabel(r.engineKey)} · assigned ${r.assignmentCount}×`} keyOf={(r) => r.standard} />
              </div>
            </>
          )}
        </div>
      </div>
    </BridgePage>
  );
}

// Shared row renderer for both rollups — same four numbers (completion,
// score, revision rate, graded-count-as-a-denominator-caveat) whether the
// grouping is by challenge type or by individual case.
function RollupTable({ rows, nameOf, subOf, keyOf }) {
  if (rows.length === 0) {
    return <div style={{ fontSize: 13, color: COLORS.textMuted }}>Nothing here yet.</div>;
  }
  return (
    <div style={{ display: "grid", gap: 2 }}>
      {rows.map((row) => (
        <div key={keyOf(row)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 220px", minWidth: 160 }}>
            <div style={{ fontWeight: 600 }}>{nameOf(row)}</div>
            <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{subOf(row)}</div>
          </div>
          <div style={{ width: 110 }}>
            <div style={{ fontWeight: 700 }}>{row.completionPct !== null ? `${row.completionPct}%` : "—"}</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>completed ({row.completedCount}/{row.targetCount})</div>
          </div>
          <div style={{ width: 120 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>{row.avgPct !== null ? `${row.avgPct}%` : "—"}</span>
              {row.band && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: row.band.color + "22", color: row.band.color }}>{row.band.label}</span>}
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>{row.gradedCount} graded &amp; released</div>
          </div>
          <div style={{ width: 90, textAlign: "right" }}>
            <div style={{ fontWeight: 700, color: row.revisionPct !== null && row.revisionPct >= 40 ? COLORS.danger : COLORS.textDark }}>{row.revisionPct !== null ? `${row.revisionPct}%` : "—"}</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>sent back</div>
          </div>
        </div>
      ))}
    </div>
  );
}
