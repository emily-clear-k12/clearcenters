"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../lib/teacherTheme";

// Sept 13 — moved to the console-interior look. This page is still a
// "Coming Soon" stub, so there's no real content to port — just the shell:
// TeacherSidebar + TeacherPageBanner swapped for TeacherHUD, decorative
// violet became this page's green ACCENT (Resources' own family, shared
// with Badges & Rewards). No dedicated background art exists yet for this
// page, so it falls back to the plain canvas wash like every other
// not-yet-illustrated page.
const ACCENT = PAGE_ACCENTS["/teacher/resources"];
const BG = PAGE_BACKGROUNDS["/teacher/resources"];

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
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.canvas,
        backgroundImage: BG ? `linear-gradient(180deg, rgba(243,239,252,.55) 0%, rgba(243,239,252,.82) 100%), url(${BG})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      <TeacherHUD title="Resources" subtitle="Teaching guides & printable companions" accent={ACCENT} teacherEmail={teacherEmail} />

      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 900, margin: "0 auto", width: "100%", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ ...panelStyle(ACCENT, { padding: 48, textAlign: "center", maxWidth: 480 }) }}>
          <img src="/teacher/nav_resources.png" alt="" style={{ width: 56, height: 56, objectFit: "contain", marginBottom: 16 }} />
          <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 18px 0" }}>Teaching guides, printable companions, and support materials for each case.</p>
          <span style={{ display: "inline-block", background: `${ACCENT}22`, color: ACCENT, fontWeight: 700, fontSize: 12.5, padding: "7px 18px", borderRadius: 999 }}>Coming Soon</span>
        </div>
      </main>
    </div>
  );
}
