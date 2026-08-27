"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

export default function ResourcesPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <TeacherSidebar teacherEmail={teacherEmail} />
      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column" }}>
        <TeacherPageBanner>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: 0 }}>Resources</h1>
        </TeacherPageBanner>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 4px 16px rgba(13,27,42,.06)", maxWidth: 480 }}>
            <img src="/teacher/nav_resources.png" alt="" style={{ width: 56, height: 56, objectFit: "contain", marginBottom: 16 }} />
            <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 18px 0" }}>Teaching guides, printable companions, and support materials for each case.</p>
            <span style={{ display: "inline-block", background: COLORS.violetSoft, color: COLORS.violet, fontWeight: 700, fontSize: 12.5, padding: "7px 18px", borderRadius: 999 }}>Coming Soon</span>
          </div>
        </div>
      </main>
    </div>
  );
}
