"use client";

import React from "react";
import BackToHubButton from "../../components/BackToHubButton";

// Same locally-duplicated student-facing palette as ProgressClient.js,
// BadgesClient.js, etc. — no shared theme file on the student side, by
// established convention (see Teacher_SiteWide_Redesign_Plan.md's note on
// lib/teacherTheme.js being a teacher-only thing).
const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  goldSoft: "#FFF7E6",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

const card = {
  background: "rgba(255,255,255,.95)",
  borderRadius: 18,
  boxShadow: "0 4px 20px rgba(60,40,120,.12)",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function MessagesClient({ student, messages }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <div style={{ position: "relative", zIndex: 1, padding: "70px 24px 40px", maxWidth: 640, margin: "0 auto" }}>
        <BackToHubButton />

        <div style={{ ...card, padding: "18px 22px", marginBottom: 18 }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24, fontWeight: 700, margin: "0 0 4px 0" }}>📬 Messages</h1>
          <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 13.5 }}>Notes and announcements from your teacher, {student.first_name}.</p>
        </div>

        {messages.length === 0 ? (
          <div style={{ ...card, padding: 28, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>
            Nothing here yet — your teacher's messages will show up in this list.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {messages.map((m) => (
              <div key={m.id} style={{ ...card, padding: "16px 18px", position: "relative" }}>
                {m.wasUnread && (
                  <span style={{ position: "absolute", top: 14, right: 16, background: COLORS.gold, color: COLORS.textDark, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>New</span>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingRight: m.wasUnread ? 46 : 0 }}>
                  <span style={{ background: m.isBroadcast ? COLORS.tealSoft : COLORS.violetSoft, color: m.isBroadcast ? COLORS.teal : COLORS.violet, fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 999 }}>
                    {m.isBroadcast ? `📢 ${m.className} Announcement` : "💬 Just for you"}
                  </span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 8, whiteSpace: "pre-wrap" }}>{m.body}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{formatDate(m.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
