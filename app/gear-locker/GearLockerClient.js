"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../components/BackToHubButton";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  border: "#E1E2EE",
  danger: "#E4574C",
};

// Fixed spots on the map, read off Emily's background/mockup — percent of
// the full viewport as of the Aug 27 full-screen pass (see MissionsClient.js
// for the same change, made the same day for the same reason: Emily wants
// this page edge-to-edge like Home instead of sitting in a bordered card,
// and accepted that a `cover`-cropped background can nudge these spots
// slightly off-pixel on an unusually-shaped window).
//
// Rebalanced again Aug 27 (later still) per Emily's request: 3 planets on
// each side of the ship, mirrored, instead of 5 planets plus one sitting
// dead-center. The background art has 5 baked-in "landing ring" anchors at
// x = 26/36/50/64/74 (see the price-ordering note this replaces, below) —
// an odd number, so there's no way to split them 3-and-3 without leaving
// the center ring (50, 29) empty. Emily confirmed that trade-off directly
// ("move it anyway") rather than have it picked silently. The fix: Robot
// Relay City moves off the center ring into the ring at x=36 (previously
// Frost Ring's spot), Frost Ring shifts one ring outward to x=26 (glow
// Garden's old spot), and Glow Garden moves to a new ringless spot at
// x=12 — mirroring LavaCore's existing ringless spot at x=88 exactly
// (50-12 = 88-50 = 38; same y, 48, on both). The center ring (50, 29) is
// now unused — a real, deliberate side effect, not an oversight. Jungle
// Moon / Cloud Reef / LavaCore (the right half) are untouched, since they
// already mirror this pattern's spacing.
//
// Left-to-right cheapest-to-most-expensive (Group S's rule) still holds
// across all 6, it's just measured outward-in-from-each-edge now instead
// of one continuous left-to-right sweep through a center point: x=12
// (Glow Garden, 50) < x=26 (Frost Ring, 80) < x=36 (Robot Relay City, 120)
// < [ship, unused ring] < x=64 (Jungle Moon, 150) < x=74 (Cloud Reef, 200)
// < x=88 (LavaCore, 250).
//
// LavaCore was never on a baked ring to begin with (added after the
// original 5 planets, once Emily sent its art — see the git history of
// this comment for that positioning story) — Glow Garden now shares that
// same "floats on its own, no landing pad" treatment on the mirror spot.
const PLANET_POSITIONS = {
  glow_garden: { x: 12, y: 48 },
  frost_ring: { x: 26, y: 47 },
  robot_relay_city: { x: 36, y: 35 },
  jungle_moon: { x: 64, y: 29 },
  cloud_reef: { x: 74, y: 47 },
  lavacore: { x: 88, y: 48 },
};
const SHIP_POSITION = { x: 50, y: 52 };

function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function PlanetDetailModal({ planet, unlocked, onClose }) {
  if (!planet) return null;
  const pointsToUnlock = Math.max(0, planet.threshold - planet.__studentPoints);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(8,10,30,.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(180deg, #1B1440, #0D0B2A)", borderRadius: 24, width: "min(440px, 100%)", overflow: "hidden", boxShadow: "0 24px 70px rgba(0,0,0,.5)", position: "relative", textAlign: "center", padding: "30px 26px" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", cursor: "pointer", fontSize: 15 }}>×</button>
        <img
          src={planet.image_path}
          alt={planet.name}
          style={{ width: 190, height: 190, objectFit: "contain", margin: "0 auto 10px", display: "block" }}
        />
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 21, color: COLORS.white, margin: "0 0 8px 0" }}>{planet.name}</h2>
        {unlocked ? (
          <>
            <p style={{ fontSize: 13.5, color: "#C9D2EE", lineHeight: 1.5, margin: "0 0 16px 0" }}>{planet.description}</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,.18)", color: "#4ADE80", borderRadius: 999, padding: "6px 16px", fontWeight: 700, fontSize: 12.5 }}>
              🚀 You've arrived! Welcome to {planet.name}.
            </div>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13.5, color: "#8C93B8", lineHeight: 1.5, margin: "0 0 16px 0" }}>🔒 This world is still locked.</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${planet.theme_color}26`, color: planet.theme_color, borderRadius: 999, padding: "6px 16px", fontWeight: 700, fontSize: 12.5 }}>
              💎 Need {pointsToUnlock} more crystal{pointsToUnlock === 1 ? "" : "s"} to unlock
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CrystalLogModal({ open, onClose, pointsHistory }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 20, width: "min(380px, 100%)", maxHeight: "70vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,.4)", padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 17, fontWeight: 700, margin: 0, color: COLORS.textDark }}>💎 Crystal Log</h2>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.cream, border: "none", cursor: "pointer", fontSize: 14 }}>×</button>
        </div>
        {pointsHistory.length === 0 ? (
          <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: 0 }}>No crystal activity yet — go complete a mission!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {pointsHistory.map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: COLORS.cream, borderRadius: 10, padding: "8px 12px" }}>
                <span style={{ fontSize: 12, color: COLORS.textMuted }}>{formatShortDate(row.created_at)}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: row.amount >= 0 ? "#22C55E" : COLORS.danger }}>
                  {row.amount >= 0 ? "+" : ""}{row.amount}
                </span>
                <span style={{ fontSize: 11.5, color: COLORS.textMuted }}>→ {row.new_total}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function GearLockerClient({ student, planets, visitedPlanetKeys, badgeTiers, pointsHistory }) {
  const router = useRouter();
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [logOpen, setLogOpen] = useState(false);
  const [messagesTip, setMessagesTip] = useState(false);
  const [lockedTip, setLockedTip] = useState(null);

  const visitedSet = new Set(visitedPlanetKeys);
  const tiers = badgeTiers || [];
  const badgesEarnedCount = tiers.filter((t) => student.crystal_points >= t.threshold).length;
  const planetsVisitedCount = planets.filter((p) => visitedSet.has(p.planet_key)).length;

  function isUnlocked(planet) {
    return student.crystal_points >= planet.threshold;
  }

  // Locked planets used to render grayscale + dimmed (map node, grid card,
  // and the arrival-scene modal). Emily asked to drop that — locked planets
  // now render in full color everywhere; the 🔒 badge is the only locked
  // signal left. See the `filter` props below (and PlanetDetailModal above)
  // for where the grayscale used to be applied.

  async function openPlanet(planet) {
    const unlocked = isUnlocked(planet);
    if (!unlocked) {
      setLockedTip(planet.planet_key);
      setTimeout(() => setLockedTip(null), 1800);
    }

    // Glow Garden is the pilot for a real per-planet arrival scene (built
    // Aug 27) — once unlocked, it gets its own page instead of the generic
    // modal below. Every other planet is untouched and still opens
    // PlanetDetailModal; this branch is the only thing that changed here.
    // A still-locked Glow Garden falls through exactly like every other
    // locked planet (tooltip + the modal's own locked view) — only an
    // unlocked visit routes to the new page. The new page records its own
    // "visit" server-side on mount, so we don't also fire /api/planets/visit
    // for it here.
    if (unlocked && planet.planet_key === "glow_garden") {
      router.push("/gear-locker/glow-garden");
      return;
    }

    setSelectedPlanet({ ...planet, __studentPoints: student.crystal_points });
    if (unlocked && !visitedSet.has(planet.planet_key)) {
      try {
        await fetch("/api/planets/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planetKey: planet.planet_key }),
        });
        router.refresh();
      } catch (err) {
        // A hiccup here just means the "visited" checkmark takes one more
        // visit to appear — not worth blocking the arrival scene over.
      }
    }
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .planet-node { transition: transform 150ms ease, filter 150ms ease; cursor: pointer; border: none; background: none; padding: 0; font-family: inherit; }
        .planet-node:hover { transform: translate(-50%, -100%) scale(1.06) !important; }
        .nav-pill { transition: transform 120ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .nav-pill:hover { transform: translateY(-1px); }
      `}</style>

      {/* Full-viewport fixed background (Aug 27 full-screen pass) — replaces
          the old aspect-ratio-locked "card" stage, same change and same
          reasoning as MissionsClient.js. This stays pinned to the viewport
          as the page scrolls (there IS scroll on this page, unlike
          Missions, since the nav bar + Available Planets grid live below
          the map) — the opaque foreground content further down simply
          covers it once scrolled that far, same trick ProgressClient.js
          already uses for its hero background. */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0D0B2A" }}>
        <img src="/student/galaxy_hub_bg.jpg" alt="Galaxy Hub" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* No HTML title here on purpose — the background art already has a
          "GALAXY HUB" neon sign baked in up top; adding our own text
          title doubled it up and collided with the sign. */}

      <BackToHubButton />

      {/* Fixed full-viewport overlay for the interactive map layer (crystal
          panel, stats panel, dashed lines, ship, planet nodes) — pinned
          exactly like the background above so they stay glued together at
          any scroll position, matching Missions' same approach. */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1 }}>
          {/* Crystal count + log */}
          <div style={{ position: "absolute", top: "4%", left: "3%", background: "rgba(20,16,50,.72)", backdropFilter: "blur(8px)", borderRadius: 16, padding: "10px 14px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,.3)" }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: "#A9B4E8", textTransform: "uppercase", letterSpacing: .4, marginBottom: 4 }}>Your Crystals</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(16px, 2vw, 24px)", color: COLORS.white, marginBottom: 4 }}>
              💎 {student.crystal_points}
            </div>
            <button onClick={() => setLogOpen(true)} className="gc-btn" style={{ background: "none", color: "#9B8FE0", fontSize: 10.5, fontWeight: 700, textDecoration: "underline", padding: 0 }}>
              Crystal Log ↗
            </button>
          </div>

          {/* Stats panel */}
          <div style={{ position: "absolute", top: "4%", right: "3%", background: "rgba(20,16,50,.72)", backdropFilter: "blur(8px)", borderRadius: 16, padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,.3)", minWidth: 120 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: "#A9B4E8", textTransform: "uppercase", letterSpacing: .4, marginBottom: 6 }}>Your Stats</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: "clamp(9px, 1vw, 11.5px)", color: COLORS.white }}>
              <div>🌍 Planets Visited: <b>{planetsVisitedCount}</b></div>
              <div>🛡️ Badges Earned: <b>{badgesEarnedCount}</b></div>
              <div>🔥 Streak: <b>{student.streak_days || 0} Day{student.streak_days === 1 ? "" : "s"}</b></div>
            </div>
          </div>

          {/* Dashed connector lines */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            {planets.map((p) => {
              const pos = PLANET_POSITIONS[p.planet_key];
              if (!pos) return null;
              return (
                <line
                  key={p.planet_key}
                  x1={SHIP_POSITION.x} y1={SHIP_POSITION.y}
                  x2={pos.x} y2={pos.y}
                  stroke="rgba(160,180,255,.4)"
                  strokeWidth="0.3"
                  strokeDasharray="1.2 1.2"
                />
              );
            })}
          </svg>

          {/* Ship / current location */}
          <div style={{ position: "absolute", left: `${SHIP_POSITION.x}%`, top: `${SHIP_POSITION.y}%`, transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 3 }}>
            <div style={{ width: "clamp(30px, 5vw, 52px)", height: "clamp(30px, 5vw, 52px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,93,255,.9), rgba(123,93,255,.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(14px, 2.2vw, 24px)", boxShadow: "0 0 24px rgba(123,93,255,.7)", margin: "0 auto 6px" }}>
              🚀
            </div>
            <div style={{ background: "rgba(20,16,50,.8)", borderRadius: 999, padding: "3px 12px", fontSize: "clamp(7px, 0.9vw, 10px)", fontWeight: 700, color: COLORS.white, whiteSpace: "nowrap" }}>
              CURRENT LOCATION · Crystal Command
            </div>
          </div>

          {/* Planet nodes */}
          {planets.map((planet) => {
            const pos = PLANET_POSITIONS[planet.planet_key];
            if (!pos) return null;
            const unlocked = isUnlocked(planet);
            const visited = visitedSet.has(planet.planet_key);
            return (
              <button
                key={planet.id}
                type="button"
                className="planet-node"
                onClick={() => openPlanet(planet)}
                style={{ position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -100%)", zIndex: 2, textAlign: "center" }}
              >
                <div style={{ position: "relative", width: "clamp(48px, 9vw, 100px)", height: "clamp(48px, 9vw, 100px)" }}>
                  <img
                    src={planet.image_path}
                    alt={planet.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain", filter: unlocked ? "drop-shadow(0 6px 14px rgba(0,0,0,.4))" : "drop-shadow(0 6px 10px rgba(0,0,0,.4))" }}
                  />
                  {unlocked ? (
                    visited && (
                      <div style={{ position: "absolute", top: -2, right: -2, width: 20, height: 20, borderRadius: "50%", background: "#22C55E", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, boxShadow: "0 2px 6px rgba(0,0,0,.3)" }}>✓</div>
                    )
                  ) : (
                    <div style={{ position: "absolute", top: -2, right: -2, width: 20, height: 20, borderRadius: "50%", background: "rgba(20,16,50,.85)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, boxShadow: "0 2px 6px rgba(0,0,0,.3)" }}>🔒</div>
                  )}
                </div>
                <div style={{ marginTop: 4, fontSize: "clamp(8px, 1vw, 11px)", fontWeight: 700, color: COLORS.white, textShadow: "0 1px 4px rgba(0,0,0,.6)", whiteSpace: "nowrap" }}>{planet.name}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 2, background: unlocked ? `${planet.theme_color}CC` : "rgba(20,16,50,.75)", color: "#fff", borderRadius: 999, padding: "2px 8px", fontSize: "clamp(7px, 0.85vw, 10px)", fontWeight: 700 }}>
                  💎 {planet.threshold}
                </div>
                {lockedTip === planet.planet_key && (
                  <div style={{ marginTop: 4, background: "#1B1440", color: "#fff", borderRadius: 8, padding: "3px 8px", fontSize: 9.5, whiteSpace: "nowrap" }}>
                    Need {Math.max(0, planet.threshold - student.crystal_points)} more!
                  </div>
                )}
              </button>
            );
          })}
      </div>

      {/* Spacer — pushes the scrollable content below the fold so it
          doesn't start out overlapping the fixed map above. Same 100vh
          used everywhere else the map/pedestal art is sized to fill the
          screen. */}
      <div style={{ height: "100vh" }} />

      {/* Scrollable foreground content — opaque so it fully covers the
          fixed map/background above once the student scrolls this far,
          same trick ProgressClient.js uses for its hero background. */}
      <div style={{ position: "relative", zIndex: 2, background: COLORS.cream, padding: "24px 24px 40px", maxWidth: 1300, margin: "0 auto" }}>
        {/* NAV BAR — this page only, per Emily's call; every other student
            page keeps the small Back to Hub button instead. */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <div className="nav-pill" style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13 }}>
            🪐 Galaxy Map
          </div>
          <button type="button" onClick={() => router.push("/missions")} className="nav-pill gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, color: COLORS.textDark, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
            📋 My Missions
          </button>
          <button type="button" onClick={() => router.push("/progress")} className="nav-pill gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, color: COLORS.textDark, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
            💎 My Progress
          </button>
          <button type="button" onClick={() => router.push("/badges")} className="nav-pill gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, color: COLORS.textDark, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
            🛡️ Badges
          </button>
          <div style={{ position: "relative" }}>
            <button type="button" onClick={() => { setMessagesTip(true); setTimeout(() => setMessagesTip(false), 1800); }} className="nav-pill gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.white, color: COLORS.textDark, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13, boxShadow: "0 2px 10px rgba(0,0,0,.08)" }}>
              💬 Messages
            </button>
            {messagesTip && (
              <div style={{ position: "absolute", top: "110%", left: "50%", transform: "translateX(-50%)", background: COLORS.navy, color: COLORS.white, borderRadius: 8, padding: "5px 12px", fontSize: 11, whiteSpace: "nowrap", zIndex: 5 }}>
                Coming soon!
              </div>
            )}
          </div>
        </div>

        {/* AVAILABLE PLANETS list */}
        <div>
          <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.6, margin: "0 0 14px 0" }}>✦ Available Planets ✦</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 14 }}>
            {planets.map((planet) => {
              const unlocked = isUnlocked(planet);
              return (
                <button
                  key={planet.id}
                  type="button"
                  onClick={() => openPlanet(planet)}
                  className="gc-btn"
                  style={{ textAlign: "left", background: COLORS.white, borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,.08)", overflow: "hidden", padding: 14, border: "none", cursor: "pointer", font: "inherit", color: "inherit", position: "relative" }}
                >
                  <div style={{ width: "100%", height: 90, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                    <img src={planet.image_path} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: planet.theme_color, marginBottom: 4 }}>{planet.name}</div>
                  <p style={{ fontSize: 11.5, color: COLORS.textMuted, lineHeight: 1.4, margin: "0 0 10px 0", minHeight: 46 }}>{planet.description}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: unlocked ? `${planet.theme_color}1F` : COLORS.cream, color: unlocked ? planet.theme_color : COLORS.textMuted, borderRadius: 999, padding: "4px 11px", fontWeight: 700, fontSize: 12 }}>
                    💎 {planet.threshold}
                  </div>
                  {!unlocked && (
                    <div style={{ position: "absolute", top: 12, right: 12, width: 26, height: 26, borderRadius: "50%", background: "rgba(20,16,50,.75)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🔒</div>
                  )}
                </button>
              );
            })}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: COLORS.textMuted, marginTop: 16 }}>
            ✦ Earn crystals by completing missions and turning in your best work! ✦
          </p>
        </div>
      </div>

      <PlanetDetailModal planet={selectedPlanet} unlocked={selectedPlanet ? isUnlocked(selectedPlanet) : false} onClose={() => setSelectedPlanet(null)} />
      <CrystalLogModal open={logOpen} onClose={() => setLogOpen(false)} pointsHistory={pointsHistory} />
    </div>
  );
}
