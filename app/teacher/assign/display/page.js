"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../../../lib/supabaseClient";

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

function DisplayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [classInfo, setClassInfo] = useState(null);
  const [joinUrl, setJoinUrl] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setLoadingAuth(false);
    });
  }, [router]);

  useEffect(() => {
    if (!classId) return;
    supabase.from("classes").select("*").eq("id", classId).single().then(({ data }) => setClassInfo(data));
  }, [classId]);

  useEffect(() => {
    if (classInfo && typeof window !== "undefined") {
      setJoinUrl(`${window.location.origin}/join/${classInfo.class_code}`);
    }
  }, [classInfo]);

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>Loading...</div>;
  }

  if (!classId || !classInfo) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: 20, textAlign: "center" }}>
        <div>
          <p style={{ color: COLORS.textMuted, marginBottom: 12 }}>No class selected.</p>
          <button onClick={() => router.push("/teacher/assign")} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Go to My Classes</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${COLORS.violetSoft} 0%, ${COLORS.cream} 60%)`, fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      <button
        onClick={() => router.push("/teacher/assign")}
        style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 6, background: COLORS.white, border: "none", borderRadius: 999, padding: "10px 18px", fontWeight: 700, fontSize: 13, color: COLORS.textDark, cursor: "pointer", boxShadow: "0 4px 16px rgba(13,27,42,.1)" }}
      >
        <ChevronLeft size={16} /> Exit
      </button>

      <img src="/teacher/crystal_pedestal.png" alt="" style={{ position: "absolute", right: 40, top: 40, width: 140, opacity: 0.9 }} />
      <img src="/teacher/hq_crystal_cluster.png" alt="" style={{ position: "absolute", left: -20, bottom: -20, width: 160, opacity: 0.6 }} />

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <img src="/teacher/brand_crystal_mark.png" alt="" style={{ height: 34 }} />
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.textDark }}>ClearCenters</div>
        </div>

        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 52px)", color: COLORS.textDark, margin: "0 0 6px 0", textAlign: "center" }}>
          Join {classInfo.name}
        </h1>
        <p style={{ fontSize: 17, color: COLORS.textMuted, margin: "0 0 40px 0", textAlign: "center" }}>
          Scan the code or enter it at sign in — then just your name and PIN.
        </p>

        <div style={{ background: COLORS.white, borderRadius: 28, boxShadow: "0 24px 60px rgba(13,27,42,.15)", padding: "48px 56px", display: "flex", alignItems: "center", gap: 56 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.violet, letterSpacing: 2, marginBottom: 14 }}>CLASS CODE</div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(48px, 7vw, 76px)", color: COLORS.textDark, letterSpacing: 4 }}>
              {classInfo.class_code}
            </div>
          </div>

          <div style={{ width: 1, alignSelf: "stretch", background: "#ECEAF5" }} />

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.teal, letterSpacing: 2, marginBottom: 14 }}>QR CODE</div>
            {joinUrl && (
              <div style={{ padding: 12, background: COLORS.white, borderRadius: 16, border: `2px solid ${COLORS.violetSoft}` }}>
                <QRCodeSVG value={joinUrl} size={160} fgColor={COLORS.textDark} />
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 32, background: COLORS.white, borderRadius: 999, padding: "10px 22px", boxShadow: "0 4px 16px rgba(13,27,42,.08)" }}>
          <span style={{ color: COLORS.teal, fontWeight: 700 }}>✓</span>
          <span style={{ fontSize: 14, color: COLORS.textDark, fontWeight: 600 }}>You belong here. Ask questions. Explore ideas. Do your best.</span>
        </div>
      </div>
    </div>
  );
}

export default function DisplayPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#F2F0FA" }} />}>
      <DisplayContent />
    </Suspense>
  );
}
