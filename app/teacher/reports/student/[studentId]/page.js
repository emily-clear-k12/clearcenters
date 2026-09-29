"use client";

// One student's report — rebuilt Sept 29, 2026.
// Same words as the gradebook and Reports (Got it / Almost / Not yet), no
// percents or bands. The card itself is components/StudentReportCard.js and
// the numbers come from lib/studentReport.js — the shared link a family
// opens (app/report/[token]) uses both too, so it matches this page exactly.

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../../lib/supabaseClient";
import { BridgePage } from "../../../../../components/teacher/BridgeUI";
import StudentReportCard from "../../../../../components/StudentReportCard";
import { buildStudentReport } from "../../../../../lib/studentReport";
import { rememberTeacherClass } from "../../../../../lib/teacherClass";

export default function StudentReportPage() {
  const router = useRouter();
  const { studentId } = useParams();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [report, setReport] = useState(null);
  const [classId, setClassId] = useState("");
  const [allWork, setAllWork] = useState(false);
  const [shareStatus, setShareStatus] = useState("idle"); // idle | loading | copied | error
  const [shareError, setShareError] = useState("");

  const load = useCallback(async (teacherId) => {
    setLoading(true);
    const { data: student } = await supabase.from("students").select("id, first_name, class_id, crystal_points").eq("id", studentId).maybeSingle();
    if (!student) { setNotFound(true); setLoading(false); return; }
    // Only this student's own teacher can open their report.
    const { data: cls } = await supabase.from("classes").select("id, name, teacher_id").eq("id", student.class_id).maybeSingle();
    if (!cls || cls.teacher_id !== teacherId) { setNotFound(true); setLoading(false); return; }
    setClassId(cls.id);
    rememberTeacherClass(cls.id);

    const [{ data: students }, { data: assignments }, { data: teacherRow }, { data: tiers }] = await Promise.all([
      supabase.from("students").select("*").eq("class_id", cls.id),
      supabase.from("assignments").select("id, case_standard, class_id, game_skin, due_date, created_at").eq("class_id", cls.id),
      supabase.from("teachers").select("name").eq("id", teacherId).maybeSingle(),
      supabase.from("badge_tiers").select("*").order("sort_order"),
    ]);
    const ids = (assignments || []).map((a) => a.id);
    const standards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    const [targetResult, subResult, caseResult] = await Promise.all([
      ids.length ? supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", ids) : { data: [] },
      ids.length ? supabase.from("submissions").select("id, student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested, self_confidence").in("assignment_id", ids) : { data: [] },
      standards.length ? supabase.from("cases").select("standard, title, engine, subject, learning_target").in("standard", standards) : { data: [] },
    ]);
    let cases = caseResult.data;
    if (caseResult.error) cases = (await supabase.from("cases").select("standard, title, engine, subject").in("standard", standards)).data;

    setReport(buildStudentReport({
      studentId: student.id,
      className: cls.name,
      teacherName: teacherRow?.name || "",
      students: students || [],
      assignments: assignments || [],
      targets: targetResult.data || [],
      submissions: subResult.data || [],
      cases: cases || [],
      tiers: tiers || [],
      crystalPoints: student.crystal_points || 0,
    }));
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      load(data.user.id);
    });
  }, [router, load]);

  // Copies a no-login link to this student's report (app/report/[token]) for
  // a family or an administrator. The same link comes back every time until
  // it's reset.
  const copyShareLink = useCallback(async (regenerate) => {
    setShareStatus("loading");
    setShareError("");
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) throw new Error("Your session expired. Refresh the page and try again.");
      const res = await fetch("/api/teacher/reports/share-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, accessToken, regenerate: !!regenerate }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Couldn't make a share link.");
      await navigator.clipboard.writeText(`${window.location.origin}/report/${json.token}`);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2200);
    } catch (err) {
      setShareError(err.message || "Couldn't make a share link.");
      setShareStatus("error");
    }
  }, [studentId]);

  if (loading && !notFound) return <div className="cc-loading">Loading…</div>;

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <style>{`.srp-bar{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;max-width:840px;margin:0 auto 16px}.srp-bar .cc-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.srp-back{font:600 13px Inter,sans-serif;color:#6a3fc6;text-decoration:none}.srp-back:hover{text-decoration:underline}.srp-small{display:block;font-size:11px;color:#6b6491;margin-top:4px;text-align:right}.srp-small button{background:none;border:0;padding:0;color:#6a3fc6;text-decoration:underline;cursor:pointer;font:inherit}.srp-more{max-width:840px;margin:12px auto 0;text-align:center}@media print{.srp-bar,.srp-more,.cc-console{display:none!important}body,main,.cc-page,.cc-workspace{background:#fff!important}}`}</style>
      {notFound ? (
        <div className="cc-empty">
          <p>Couldn't find that student.</p>
          <Link className="cc-btn" href="/teacher/reports">Back to Reports</Link>
        </div>
      ) : (
        <>
          <div className="srp-bar">
            <Link className="srp-back" href={`/teacher/reports?classId=${classId}&tab=students`}>← Back to {report.className}</Link>
            <div>
              <div className="cc-row">
                <Link className="cc-btn secondary" href={`/teacher/gradebook?classId=${classId}`}>Gradebook</Link>
                <Link className="cc-btn secondary" href={`/teacher/students/${studentId}`}>All their work</Link>
                <button type="button" className="cc-btn secondary" onClick={() => copyShareLink(false)} disabled={shareStatus === "loading"}>
                  {shareStatus === "loading" ? "Getting link…" : shareStatus === "copied" ? "Link copied" : "Copy share link"}
                </button>
                <button type="button" className="cc-btn" onClick={() => window.print()}>Print or save as PDF</button>
              </div>
              {shareStatus === "error"
                ? <span className="srp-small" style={{ color: "#c93c3c" }}>{shareError}</span>
                : <span className="srp-small">Only released grades show. <button type="button" onClick={() => copyShareLink(true)}>Reset the share link</button></span>}
            </div>
          </div>
          <StudentReportCard report={report} showAllWork={allWork} />
          {report.work.length > 12 && (
            <div className="srp-more">
              <button type="button" className="cc-btn quiet" onClick={() => setAllWork(!allWork)}>{allWork ? "Show the newest 12" : `Show all ${report.work.length}`}</button>
            </div>
          )}
        </>
      )}
    </BridgePage>
  );
}
