"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../components/BackToHubButton";

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  gold: "#FFC44D",
  white: "#FFFFFF",
  cream: "#F2F0FA",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  navy: "#0D1B2A",
};

const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  cleared: "Cleared",
};

const STATUS_COLOR = {
  not_started: COLORS.textMuted,
  in_progress: COLORS.violet,
  cleared: "#22C55E",
};

export default function BriefingsClient({ student, assignments, catalog }) {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <BackToHubButton />
      <main style={{ padding: "28px 32px", maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 26, fontWeight: 700, color: COLORS.textDark, margin: "0 0 6px 0" }}>
          My Briefings
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "0 0 22px 0" }}>
          Social Studies · Grade 3 · teach-first missions (separate from Challenges)
        </p>

        {assignments.length > 0 ? (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", color: COLORS.textMuted, margin: "0 0 12px 0" }}>
              Assigned to you
            </h2>
            <div style={{ display: "grid", gap: 14 }}>
              {assignments.map((a) => {
                const b = a.briefings || {};
                return (
                  <button
                    key={a.id}
                    type="button"
                    className="gc-btn"
                    onClick={() => router.push(`/briefing/${a.id}`)}
                    style={{
                      textAlign: "left",
                      background: COLORS.white,
                      border: "2px solid transparent",
                      borderRadius: 16,
                      padding: 16,
                      boxShadow: "0 4px 14px rgba(13,27,42,.08)",
                      display: "flex",
                      gap: 14,
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: 72, height: 72, borderRadius: 12, overflow: "hidden", background: COLORS.violetSoft, flexShrink: 0 }}>
                      <img
                        src="/briefings/ss-3-2a-br/01-intel-drop-mystery-gate.png"
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.textDark }}>
                        {b.title || a.briefing_id}
                      </div>
                      <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 2 }}>
                        TEKS {b.teks || "—"} · ~{b.minutes || 40} min
                      </div>
                      <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, color: STATUS_COLOR[a.status] || COLORS.textMuted }}>
                        {STATUS_LABEL[a.status] || a.status}
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: COLORS.violet, fontSize: 13 }}>Open →</span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <div style={{ background: COLORS.white, borderRadius: 16, padding: 18, marginBottom: 24, boxShadow: "0 4px 14px rgba(13,27,42,.06)" }}>
            <p style={{ margin: 0, color: COLORS.textDark, fontSize: 14, lineHeight: 1.5 }}>
              No Briefings assigned yet. Ask your teacher to assign one from <strong>Assign Briefing</strong>,
              or preview the pilot below once it is assigned.
            </p>
          </div>
        )}

        <section>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", color: COLORS.textMuted, margin: "0 0 12px 0" }}>
            Pilot catalog
          </h2>
          <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {catalog.map((b) => (
              <div
                key={b.id}
                style={{
                  background: COLORS.white,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(13,27,42,.08)",
                }}
              >
                <div style={{ height: 120, background: COLORS.violetSoft }}>
                  {b.art && <img src={b.art} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet, marginBottom: 4 }}>{b.id}</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: COLORS.textDark }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4, lineHeight: 1.4 }}>{b.tagline}</div>
                  <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 10 }}>
                    {b.subject} · Grade {b.grade} · TEKS {b.teks}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
