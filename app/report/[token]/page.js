"use client";

// The shared, read-only student report a family or administrator opens from
// the link a teacher copies on the student's report page. No sign-in; the
// token in the link is checked by /api/reports/shared/[token].
// Sept 29, 2026: draws the same card as the teacher's page
// (components/StudentReportCard.js), in the same words: Got it / Almost /
// Not yet.

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import StudentReportCard from "../../../components/StudentReportCard";

const PAGE = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
.sr-page{min-height:100vh;background:#f3effc;padding:32px 16px 60px;font-family:Inter,system-ui,sans-serif;color:#241b50}
.sr-page-bar{max-width:840px;margin:0 auto 14px;display:flex;justify-content:flex-end}
.sr-page-bar button{border:0;border-radius:999px;background:#6a3fc6;color:#fff;font:700 13.5px Inter,sans-serif;padding:10px 20px;cursor:pointer}
.sr-page-msg{max-width:420px;margin:60px auto;background:#fff;border-radius:20px;padding:30px;text-align:center;box-shadow:0 8px 28px #3a2a7a24}
.sr-page-msg img{width:min(200px,60%);height:auto;margin:0 auto 16px;display:block}
@media print{.sr-page{background:#fff;padding:0}.sr-page-bar{display:none}}
`;

export default function SharedReportPage() {
  const { token } = useParams();
  const [state, setState] = useState({ loading: true, error: "", report: null });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reports/shared/${token}`)
      .then(async (res) => {
        const body = await res.json();
        if (cancelled) return;
        if (!res.ok) setState({ loading: false, error: body.error || "Couldn't load this report.", report: null });
        else setState({ loading: false, error: "", report: body });
      })
      .catch(() => { if (!cancelled) setState({ loading: false, error: "Couldn't load this report. Check your connection and try again.", report: null }); });
    return () => { cancelled = true; };
  }, [token]);

  return (
    <div className="sr-page">
      <style>{PAGE}</style>
      {state.loading ? <div className="sr-page-msg">Loading the report…</div>
        : state.error || !state.report ? (
          <div className="sr-page-msg"><img src="/clearcenters_logo.png" alt="ClearCenters" /><p style={{ color: "#c93c3c", margin: 0 }}>{state.error || "Couldn't load this report."}</p></div>
        ) : (
          <>
            <div className="sr-page-bar"><button type="button" onClick={() => window.print()}>Print or save as PDF</button></div>
            <StudentReportCard report={state.report} showAllWork />
          </>
        )}
    </div>
  );
}
