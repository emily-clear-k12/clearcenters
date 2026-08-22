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
    <div style={{ minHeight: "100vh", background: "#1F2A44", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", position: "relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      <button
        onClick={() => router.push("/teacher/assign")}
        style={{ position: "absolute", top: 24, left: 24, zIndex: 10, display: "flex", alignItems: "center", gap: 6, background: COLORS.white, border: "none", borderRadius: 999, padding: "10px 18px", fontWeight: 700, fontSize: 13, color: COLORS.textDark, cursor: "pointer", boxShadow: "0 4px 16px rgba(13,27,42,.1)" }}
      >
        <ChevronLeft size={16} /> Exit
      </button>

      <div style={{ position: "relative", width: "100%", maxWidth: 1250, aspectRatio: "1672 / 941" }}>
        <img src="/teacher/join_class_bg.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />

        {/* Class code, overlaid exactly in the blank left box */}
        <div style={{ position: "absolute", left: "41%", top: "44%", width: "21%", height: "26%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2.6vw, 34px)", color: "#0D1B2A", letterSpacing: 1 }}>
            {classInfo.class_code}
          </div>
        </div>

        {/* QR code, overlaid exactly in the blank right box */}
        <div style={{ position: "absolute", left: "66.5%", top: "44%", width: "11%", height: "26%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {joinUrl && <QRCodeSVG value={joinUrl} size={110} fgColor="#0D1B2A" style={{ width: "78%", height: "auto" }} />}
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
