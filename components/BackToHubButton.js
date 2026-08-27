"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Small shared "return to the hub" affordance for the 3 pages that used to
// live behind the sidebar (Missions, Progress, Crystal Vault) now that Home
// is the hub and there's no persistent nav — see components/TeacherPageBanner.js
// for the equivalent pattern on the teacher side.
export default function BackToHubButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/home")}
      className="gc-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(255,255,255,.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "none",
        borderRadius: 999,
        padding: "8px 15px",
        fontWeight: 700,
        fontSize: 12.5,
        color: "#1F2A44",
        boxShadow: "0 4px 14px rgba(0,0,0,.1)",
        cursor: "pointer",
        marginBottom: 14,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      ← Back to Hub
    </button>
  );
}
