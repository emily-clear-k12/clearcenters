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

// Sept 4, 2026 rebuild: Emily replaced the abstract open-space background
// with a real illustrated "Galaxy Hub" room — six portal windows built
// directly into the art (Glow Garden / Ice World / Lavacore / Sandspire /
// Sky Isles / Robot World), plus its own baked-in ship out the center
// window. The old floating planet-icon-on-open-sky metaphor (a rocket
// emoji "current location" marker, dashed lines connecting it to six
// separate orb images) doesn't fit this grounded, literal room — the art
// itself now shows "you are here" and "these are the doors to other
// worlds," so that whole decorative overlay system is retired here, not
// just repositioned. What's left: an invisible clickable hotspot sized to
// each portal's real position in the art (so the portal itself is the
// link), plus the same name/crystal-threshold/lock-state readout that
// used to float under each icon, now anchored under its portal instead.
//
// Four of the six planet_keys kept their DB identity (frost_ring,
// robot_relay_city, jungle_moon, cloud_reef are still the real keys
// student_planet_visits references) but their DISPLAY NAME was renamed to
// match the new art's baked-in labels (Ice World, Robot World, Sandspire,
// Sky Isles respectively) — see the Sept 4 SQL for that rename. Glow
// Garden and Lavacore matched already.
//
// Hotspot boxes were measured directly off the real art (percent of image
// width/height, oval left/right/top/bottom edges read from a gridded
// crop) rather than guessed — same discipline as Simulation Lab's
// CONSOLE_HOTSPOTS. Like that constant, these are "tuned by eye against
// the source image," not pixel-perfect, and may want a small nudge once
// Emily sees it live on a real screen.
const PORTAL_HOTSPOTS = {
  glow_garden: { x: 13, y: 39, w: 12, h: 39 },
  frost_ring: { x: 26.5, y: 43, w: 12, h: 31 }, // "Ice World" portal
  lavacore: { x: 41, y: 43, w: 12, h: 29 },
  jungle_moon: { x: 64.5, y: 44, w: 12, h: 29 }, // "Sandspire" portal
  cloud_reef: { x: 74.5, y: 43.5, w: 10, h: 31 }, // "Sky Isles" portal
  robot_relay_city: { x: 85.5, y: 43, w: 12, h: 31 }, // "Robot World" portal
};

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

  // TEMP — Sept 4, 2026, Emily's ask while she's working on the Galaxy Hub
  // redesign ("unlock all of the planets just so we can see them... for
  // now as we're working"): force every planet open regardless of real
  // crystal_points, so every portal/description/arrival-page can be
  // clicked through and previewed. The 💎 threshold pill still shows the
  // real cost everywhere (it reads planet.threshold directly, untouched)
  // — only the lock GATE is bypassed, not the displayed price. No student
  // data changed; nothing in Supabase touched. Flip DEV_FORCE_UNLOCK_ALL
  // back to false (or delete it and restore the real comparison below)
  // once the design pass is done — don't ship this true.
  const DEV_FORCE_UNLOCK_ALL = true;
  function isUnlocked(planet) {
    if (DEV_FORCE_UNLOCK_ALL) return true;
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
        /* Sept 4, 2026: base transform changed from translate(-50%,-100%)
           (anchored above a floating icon) to translate(-50%,-50%)
           (centered over the portal hotspot box) — this hover override
           has to match the new base or it'll jump the button on hover. */
        .planet-node:hover { transform: translate(-50%, -50%) scale(1.06) !important; }
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
      {/* Sept 1 2026 (Emily's ask, "make the background more transparent"):
          faded the OLD abstract-sky art down to 55% opacity so the
          floating planet-icon images and their drop-shadows would stand
          out against it, without needing a dark scrim that would've
          fought with the stats panels' translucent glass look.
          Sept 4 2026: that reasoning no longer applies — the floating
          icons are gone, and the new art's own baked-in portals are now
          the clickable UI, so dimming it works against legibility instead
          of helping it. Emily also flagged it read as "dark" once the new
          art was live. Back up near full opacity so the portals and their
          labels are clearly readable. */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "#0D0B2A" }}>
        <img src="/student/galaxy_hub_bg.jpg" alt="Galaxy Hub" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.97 }} />
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

          {/* Portal hotspots — Sept 4, 2026 rebuild. Each portal baked into
              the new art IS the link now; no floating icon, no dashed
              lines, no separate ship marker (see the big comment above
              PORTAL_HOTSPOTS for why those were retired rather than just
              repositioned). The clickable button covers the portal oval
              itself; the name/threshold/lock readout floats just below it,
              same information as before, just anchored to the art instead
              of to an icon. */}
          {planets.map((planet) => {
            const spot = PORTAL_HOTSPOTS[planet.planet_key];
            if (!spot) return null;
            const unlocked = isUnlocked(planet);
            const visited = visitedSet.has(planet.planet_key);
            return (
              <button
                key={planet.id}
                type="button"
                className="planet-node"
                onClick={() => openPlanet(planet)}
                aria-label={planet.name}
                style={{
                  position: "absolute",
                  left: `${spot.x}%`, top: `${spot.y}%`,
                  width: `${spot.w}%`, height: `${spot.h}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 2, textAlign: "center",
                  background: "none", border: "none", padding: 0, cursor: "pointer",
                }}
              >
                {/* Invisible click target over the portal art itself — no
                    icon image here anymore, the portal in the background
                    IS the button. */}
                <div style={{ position: "absolute", inset: 0 }}>
                  {unlocked ? (
                    visited && (
                      <div style={{ position: "absolute", top: "2%", right: "6%", width: 22, height: 22, borderRadius: "50%", background: "#22C55E", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, boxShadow: "0 2px 6px rgba(0,0,0,.4)" }}>✓</div>
                    )
                  ) : (
                    <div style={{ position: "absolute", top: "2%", right: "6%", width: 22, height: 22, borderRadius: "50%", background: "rgba(20,16,50,.85)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, boxShadow: "0 2px 6px rgba(0,0,0,.4)" }}>🔒</div>
                  )}
                </div>
                {/* Name + crystal-threshold pill, anchored just below the
                    portal so it reads correctly no matter the portal's
                    height. */}
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: "clamp(8px, 1vw, 11px)", fontWeight: 700, color: COLORS.white, textShadow: "0 1px 4px rgba(0,0,0,.6)" }}>{planet.name}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 3, marginTop: 2, background: unlocked ? `${planet.theme_color}CC` : "rgba(20,16,50,.75)", color: "#fff", borderRadius: 999, padding: "2px 8px", fontSize: "clamp(7px, 0.85vw, 10px)", fontWeight: 700 }}>
                    💎 {planet.threshold}
                  </div>
                  {lockedTip === planet.planet_key && (
                    <div style={{ marginTop: 4, background: "#1B1440", color: "#fff", borderRadius: 8, padding: "3px 8px", fontSize: 9.5 }}>
                      Need {Math.max(0, planet.threshold - student.crystal_points)} more!
                    </div>
                  )}
                </div>
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
