"use client";

import React from "react";
import { useRouter } from "next/navigation";

// Small shared "return to the hub" affordance for the pages that used to
// live behind the sidebar (Missions, Progress, Galaxy Hub) now that Home
// is the hub and there's no persistent nav — see components/TeacherPageBanner.js
// for the equivalent pattern on the teacher side.
//
// Changed to `position: fixed` (Aug 27, full-screen pass) now that Missions
// and Galaxy Hub no longer wrap their content in a padded, in-flow `<main>`
// — their background is a fixed full-viewport image with everything else
// floating over it, so this button needs to float on its own too rather
// than relying on `marginBottom` inside a flow layout. Progress still
// renders this inside its normal-flow content column; `position: fixed`
// works there too since it was already floating over a fixed background.
export default function BackToHubButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/home")}
      className="gc-btn"
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 50,
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
        fontFamily: "'Inter', sans-serif",
      }}
    >
      ← Back to Hub
    </button>
  );
}
