"use client";

import React from "react";
import BackToHubButton from "../../components/BackToHubButton";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

// Same tier medallion grid, same earned/locked treatment, same current-tier
// gold ring — lifted verbatim from the old Crystal Vault "Your Badges"
// section (Aug 27 Galaxy Hub rebuild) and given its own page/header since
// it no longer has a home inside the vault-turned-planet-map. Nothing about
// how a tier counts as "earned" changed here.
export default function BadgesClient({ student, badgeTiers }) {
  const tiers = badgeTiers && badgeTiers.length > 0 ? badgeTiers : [];
  const currentTierIndex = [...tiers].reverse().findIndex((t) => student.crystal_points >= t.threshold);
  const currentTier = tiers.length > 0 ? (currentTierIndex >= 0 ? tiers[tiers.length - 1 - currentTierIndex] : tiers[0]) : null;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <BackToHubButton />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, margin: "0 0 4px 0" }}>Your Badges</h1>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14 }}>See every badge you've earned along the way.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, borderRadius: 999, padding: "8px 16px", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontWeight: 700, fontSize: 15 }}>
            💎 {student.crystal_points}
          </div>
        </div>

        <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.08)", padding: 20, marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: .3, margin: "0 0 14px 0" }}>Your Badges</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {tiers.map((tier) => {
              const earned = student.crystal_points >= tier.threshold;
              const isCurrent = currentTier && tier.id === currentTier.id;
              return (
                <div key={tier.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 68, position: "relative" }}>
                  {isCurrent && (
                    <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 66, height: 66, borderRadius: "50%", boxShadow: `0 0 0 3px ${COLORS.gold}` }} />
                  )}
                  <img src={tier.image_path} alt="" style={{ width: 58, height: 58, objectFit: "contain", borderRadius: 10, opacity: earned ? 1 : 0.28, filter: earned ? "none" : "grayscale(1)" }} />
                  <div style={{ fontSize: 10.5, fontWeight: 700, textAlign: "center", lineHeight: 1.2, color: earned ? COLORS.textDark : COLORS.textMuted }}>
                    {tier.label}{!earned ? " · Locked" : ""}
                  </div>
                </div>
              );
            })}
            {tiers.length === 0 && (
              <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0 }}>Badges aren't set up yet — check back soon!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
