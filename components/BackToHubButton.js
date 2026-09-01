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
// Added a "Log Out" pill alongside "Back to Hub" (Sept 1, 2026) — Emily
// flagged that the student site had no reachable way to log out. It turned
// out there WAS a working handleLogout (POST /api/student-logout, then
// redirect to /login) — but it only lived on StudentSidebar.js, a component
// nothing renders anymore since Notebook merged into Progress and /notebook
// just redirects away before that sidebar ever mounts. Every real
// student-facing page (Home aside, which builds its own header) uses THIS
// component, so putting Log Out here — right next to Back to Hub, in the
// one corner confirmed clear of anything else on every page that renders
// this (Missions' crystal pill and Galaxy Hub's stats panel both live at
// top-right, not top-left) — makes it reachable everywhere at once instead
// of needing a per-page fix.
function StudentBackNav() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  const pillBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "none",
    borderRadius: 999,
    padding: "8px 15px",
    fontWeight: 700,
    fontSize: 12.5,
    boxShadow: "0 4px 14px rgba(0,0,0,.1)",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ position: "fixed", top: 20, left: 20, zIndex: 50, display: "flex", gap: 8 }}>
      <button
        type="button"
        onClick={() => router.push("/home")}
        className="gc-btn"
        style={{ ...pillBase, background: "rgba(255,255,255,.75)", color: "#1F2A44" }}
      >
        ← Back to Hub
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="gc-btn"
        style={{ ...pillBase, background: "rgba(20,16,50,.55)", color: "#FFFFFF" }}
      >
        Log Out
      </button>
    </div>
  );
}

export default function BackToHubButton() {
  return <StudentBackNav />;
}
