"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Printer, ChevronLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../../../lib/supabaseClient";

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
  cream: "#F2F0FA",
  white: "#FFFFFF",
};

const GRADE_LABEL = { 3: "3rd Grade", 4: "4th Grade", 5: "5th Grade" };

export default function ClassRosterPrintPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState(null);
  const [roster, setRoster] = useState([]);
  const [joinUrl, setJoinUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      loadRoster(data.user.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRoster = useCallback(async (teacherId) => {
    setLoading(true);
    setError(null);

    // Only load this class if it actually belongs to the signed-in teacher —
    // same ownership check used on the individual student page.
    const { data: cls, error: classError } = await supabase
      .from("classes")
      .select("*")
      .eq("id", classId)
      .eq("teacher_id", teacherId)
      .maybeSingle();

    if (classError || !cls) {
      setError("Couldn't load this class — it may not exist, or you may not have access to it.");
      setLoading(false);
      return;
    }
    setClassInfo(cls);

    const { data: students } = await supabase
      .from("students")
      .select("id, first_name, pin")
      .eq("class_id", classId)
      .order("first_name");
    setRoster(students || []);

    // Built from wherever this page is actually being viewed from, so it
    // works whether Emily is testing on localhost or on the real deployed
    // domain — no domain hardcoded here.
    if (typeof window !== "undefined") {
      setJoinUrl(`${window.location.origin}/join/${encodeURIComponent(cls.class_code)}`);
    }

    setLoading(false);
    setLoadingAuth(false);
  }, [classId]);

  if (loadingAuth || loading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (error || !classInfo) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textDark, fontFamily: "'Inter', sans-serif", padding: 20, textAlign: "center" }}>
        <div>
          <p>{error}</p>
          <button onClick={() => router.push("/teacher/assign")} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Back to My Classes</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }

        @media print {
          .no-print { display: none !important; }
          body, html { background: #fff !important; }
          .roster-page { box-shadow: none !important; margin: 0 !important; max-width: none !important; }
        }
      `}</style>

      <div className="no-print" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", background: COLORS.white, borderBottom: `1px solid ${COLORS.border}` }}>
        <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: "none", color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 600 }}>
          <ChevronLeft size={18} /> Back to My Classes
        </button>
        <button onClick={() => window.print()} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <Printer size={16} /> Print Roster
        </button>
      </div>

      <div className="roster-page" style={{ maxWidth: 800, margin: "32px auto", background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(13,27,42,.08)", padding: "40px 48px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 28, paddingBottom: 24, borderBottom: `2px solid ${COLORS.border}` }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, letterSpacing: 0.5, marginBottom: 4 }}>CLEARCENTERS HQ · CLASS ROSTER</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 6px 0" }}>{classInfo.name}</h1>
            <div style={{ fontSize: 13.5, color: COLORS.textMuted }}>
              {classInfo.grade && GRADE_LABEL[classInfo.grade] ? `${GRADE_LABEL[classInfo.grade]} · ` : ""}{classInfo.subject || ""}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Class Code</div>
              <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "monospace", letterSpacing: 1, color: COLORS.textDark }}>{classInfo.class_code}</div>
            </div>
          </div>
          {joinUrl && (
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ padding: 10, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
                <QRCodeSVG value={joinUrl} size={128} />
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6, maxWidth: 148 }}>Scan to go straight to the login page with the code filled in</div>
            </div>
          )}
        </div>

        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 14 }}>
          {roster.length} student{roster.length === 1 ? "" : "s"} — students log in with the class code above (or the QR code), their first name, and their PIN below.
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, padding: "8px 10px", borderBottom: `2px solid ${COLORS.border}` }}>Name</th>
              <th style={{ textAlign: "left", fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, padding: "8px 10px", borderBottom: `2px solid ${COLORS.border}` }}>PIN</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((s) => (
              <tr key={s.id}>
                <td style={{ fontSize: 14, fontWeight: 600, padding: "10px 10px", borderBottom: `1px solid ${COLORS.border}` }}>{s.first_name}</td>
                <td style={{ fontSize: 14, fontFamily: "monospace", letterSpacing: 1, padding: "10px 10px", borderBottom: `1px solid ${COLORS.border}` }}>{s.pin}</td>
              </tr>
            ))}
            {roster.length === 0 && (
              <tr>
                <td colSpan={2} style={{ padding: "20px 10px", textAlign: "center", color: COLORS.textMuted, fontSize: 13 }}>No students in this class yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
