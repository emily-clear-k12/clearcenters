"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DEV_FORCE_UNLOCK_ALL } from "../../../../lib/devFlags";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  teal: "#00C2C7",
  gold: "#FFC44D",
  white: "#FFFFFF",
  textMuted: "#8892A6",
  danger: "#E4574C",
};

// Sept 5, 2026 — the unified "world reward station" screen. One component
// for every Galaxy Hub planet, parameterized entirely by the `planet` +
// `story` props, exactly per Emily's ask: "the same offerings for each
// world... once we get one nailed down it should be pretty easy to
// implement." Lumara (glow_garden) is the reference build — it has a real
// `story` (lib/worldStories.js) and a real embedded game; every other
// planet renders this same shell with a "coming soon" state in place of
// the story/trail/background/game cards, so every portal is clickable
// today even before its own content exists.
//
// The reward flow, per Emily's design: arriving here already cost the
// planet's normal crystal threshold (unchanged, checked in page.js).
// Reading the story is the ONE trigger that unlocks both the S.A.M. trail
// and the earned Home background — free, no separate crystal cost. The
// embedded game is a separate, paid unlock ("just like... a ticket
// price") — 1 crystal, spent via /api/student/unlock-world-game.
//
// Sept 12, 2026 — atmosphere/engagement pass, per Emily's "the game is
// great but the story and placement and how dark everything is seems very
// meh." Three things changed on purpose, nothing about the reward LOGIC
// above did:
//   1. Atmosphere — the old build rendered the planet's hero art at 55%
//      opacity under a gradient that hit 97% opaque navy by the bottom of
//      the screen, which was crushing genuinely vivid source art (see
//      public/planets/*.jpg) down to a flat dark wash on every world
//      alike. Opacity's way up and the gradient's much lighter now, plus a
//      handful of pure-CSS particles drifting in the planet's own
//      theme_color so each world reads as its own place instead of "navy
//      blue, but the icon's different." No new art needed for any of this.
//   2. Story as a moment — the four paragraphs used to dump in as one
//      static block. They now cascade in one at a time (CSS animation-delay,
//      no timers) under a "RECEIVING TRANSMISSION" tag with a scanline
//      texture, playing into the "MISSION LOG" framing the copy already
//      had, so reading it feels like decoding an incoming signal rather
//      than clicking past a wall of text to get to the good stuff.
//   3. Reward cards as kiosks — Trail/Background/Game used to be identical
//      plain translucent boxes stacked in a column. Each now gets its own
//      circular icon badge and a colored header bar keyed to the planet's
//      theme_color, and Trail/Background sit side by side in a 2-column
//      grid on wider screens — meant to read more like distinct stations
//      you're standing in front of than form fields to fill in.
// What this pass deliberately did NOT touch: a true hotspot "diorama" (click
// directly on objects drawn into the scene art, the way GearLockerClient's
// PORTAL_HOTSPOTS work on the Galaxy Hub map) needs pixel positions tuned
// by eye against each world's real rendered art — that's a fast-follow once
// this is live and can actually be looked at, not something to guess at
// blind. The game itself is also untouched per Emily's call — it's the one
// thing already working.
export default function WorldRewardStationClient({ planet, story, storyRead: initialStoryRead, crystalPoints, equippedWorldTrail, gameState }) {
  const router = useRouter();
  const [storyRead, setStoryRead] = useState(initialStoryRead);
  const [readingStory, setReadingStory] = useState(false);
  const [trail, setTrail] = useState(equippedWorldTrail);
  const [trailSaving, setTrailSaving] = useState(false);
  const [bgSaving, setBgSaving] = useState(false);
  const [bgApplied, setBgApplied] = useState(false);
  // Sept 12, 2026: DEV_FORCE_UNLOCK_ALL (lib/devFlags.js) starts the game
  // card already unlocked so it's playable the moment a world's page loads
  // — no crystal spend, and student_planet_games is never touched by this,
  // same "display bypass only" rule the flag uses everywhere else. Real
  // unlock state still wins once the flag is off again.
  const [gameUnlocked, setGameUnlocked] = useState(DEV_FORCE_UNLOCK_ALL || Boolean(gameState?.unlocked));
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [bestScore, setBestScore] = useState(gameState?.bestScore || 0);
  const [points, setPoints] = useState(crystalPoints);

  // Sept 12, 2026 — a brief celebratory burst the moment the story is
  // actually marked read this visit (not on a page load where it was
  // already read before) — pure display state, clears itself, nothing
  // persisted. See handleReadStory below.
  const [justUnlockedStory, setJustUnlockedStory] = useState(false);

  const trailEquippedHere = trail === planet.planet_key;
  const theme = planet.theme_color || COLORS.violet;

  // Sept 12, 2026 — a small fixed set of drifting embers/motes in the
  // planet's own theme color, purely CSS-driven (see @keyframes wr-drift
  // below). Randomized once per world so it doesn't reshuffle on every
  // re-render; deliberately cheap (16 divs, no canvas, no library) — same
  // "code only, no new art" trick the S.A.M. trail already uses.
  const particles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      key: i,
      left: Math.round(((i * 37) % 100 + Math.random() * 8) % 100),
      size: 2 + Math.round(Math.random() * 3),
      duration: 10 + Math.round(Math.random() * 9),
      delay: -Math.round(Math.random() * 18),
    }));
  }, [planet.planet_key]);

  async function handleReadStory() {
    if (storyRead || readingStory) return;
    setReadingStory(true);
    try {
      const res = await fetch("/api/student/read-world-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planetKey: planet.planet_key }),
      });
      if (!res.ok) throw new Error("failed");
      setStoryRead(true);
      setJustUnlockedStory(true);
      setTimeout(() => setJustUnlockedStory(false), 1400);
    } catch (e) {
      // Best-effort — the button just stays clickable to try again.
    } finally {
      setReadingStory(false);
    }
  }

  async function handleToggleTrail() {
    if (trailSaving) return;
    const nextTrail = trailEquippedHere ? null : planet.planet_key;
    const previous = trail;
    setTrail(nextTrail);
    setTrailSaving(true);
    try {
      const res = await fetch("/api/student/set-world-trail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planetKey: nextTrail }),
      });
      if (!res.ok) throw new Error("failed");
    } catch (e) {
      setTrail(previous);
    } finally {
      setTrailSaving(false);
    }
  }

  async function handleApplyBackground() {
    if (bgSaving) return;
    setBgSaving(true);
    try {
      const res = await fetch("/api/student/set-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worldKey: planet.planet_key }),
      });
      if (!res.ok) throw new Error("failed");
      setBgApplied(true);
    } catch (e) {
      // Leave bgApplied false — the button stays clickable to retry.
    } finally {
      setBgSaving(false);
    }
  }

  async function handleUnlockGame() {
    if (unlocking || gameUnlocked) return;
    setUnlockError("");
    if (points < 1) {
      setUnlockError("Not enough crystals yet — come back once you've earned a few more!");
      return;
    }
    setUnlocking(true);
    try {
      const res = await fetch("/api/student/unlock-world-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planetKey: planet.planet_key }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setUnlockError(data.error || "Couldn't unlock the game — try again.");
        return;
      }
      setGameUnlocked(true);
      setPoints((p) => Math.max(0, p - 1));
    } catch (e) {
      setUnlockError("Couldn't unlock the game — try again.");
    } finally {
      setUnlocking(false);
    }
  }

  // Sept 5, 2026 — the embedded game reports its result via postMessage
  // (see the small additive change in the game's own game.js) so the
  // score reaches this student's real account through the existing
  // /api/planets/game-result route, instead of only ever living in the
  // game iframe's own localStorage.
  useEffect(() => {
    if (!story?.game || !gameUnlocked) return undefined;
    function onMessage(e) {
      if (!e.data || e.data.type !== "clearcenters-game-result") return;
      const score = Number(e.data.score) || 0;
      setBestScore((prev) => Math.max(prev, score));
      fetch("/api/planets/game-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planetKey: planet.planet_key, gameKey: story.game.key, cleared: true, score }),
      }).catch(() => {});
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [story, gameUnlocked, planet.planet_key]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: COLORS.white, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .wr-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .wr-btn:hover { transform: translateY(-1px); }
        .wr-btn:disabled { cursor: default; opacity: .6; transform: none; }
        .wr-card {
          position: relative; background: rgba(13,20,35,.5); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border-radius: 20px; padding: 22px 22px 20px; margin-bottom: 16px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
        }
        .wr-kiosk-badge {
          position: absolute; top: -16px; left: 22px; width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; font-size: 18px;
          box-shadow: 0 4px 14px rgba(0,0,0,.35);
        }
        .wr-scene {
          animation: wr-warp-in 900ms cubic-bezier(.2,.8,.2,1) both;
        }
        @keyframes wr-warp-in {
          0% { opacity: 0; transform: scale(1.06); filter: brightness(2.4) blur(8px); }
          55% { filter: brightness(1.25) blur(0px); }
          100% { opacity: 1; transform: scale(1); filter: brightness(1) blur(0); }
        }
        .wr-flash {
          position: fixed; inset: 0; z-index: 5; pointer-events: none;
          background: radial-gradient(circle at 50% 40%, rgba(255,255,255,.85), transparent 62%);
          animation: wr-flash-out 750ms ease-out forwards;
        }
        @keyframes wr-flash-out { from { opacity: .8; } to { opacity: 0; } }
        @keyframes wr-drift {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          12% { opacity: .85; }
          85% { opacity: .55; }
          100% { transform: translateY(-112vh) scale(1.5); opacity: 0; }
        }
        @keyframes wr-line-in {
          from { opacity: 0; transform: translateY(7px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wr-blink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
        @keyframes wr-pop {
          0% { transform: scale(.4); opacity: 0; }
          55% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .wr-burst {
          position: fixed; inset: 0; z-index: 20; pointer-events: none;
          display: flex; align-items: center; justify-content: center;
        }
        .wr-burst-ring {
          width: 160px; height: 160px; border-radius: 50%;
          border: 3px solid rgba(255,255,255,.85);
          animation: wr-burst-ring 900ms cubic-bezier(.15,.8,.3,1) forwards;
        }
        @keyframes wr-burst-ring {
          0% { transform: scale(.2); opacity: .95; }
          100% { transform: scale(2.3); opacity: 0; }
        }
        .wr-2col { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
        @media (max-width: 520px) {
          .wr-kiosk-badge { width: 34px; height: 34px; font-size: 15px; top: -13px; left: 18px; }
        }
      `}</style>

      {/* Arrival flash — a quick bright pulse on mount only, one React key
          per planet so navigating world-to-world without a full reload
          still re-triggers it. */}
      <div key={`flash-${planet.planet_key}`} className="wr-flash" />

      {/* Sept 12, 2026 — atmosphere pass: opacity way up (was .55) and the
          gradient scaled way back (was rgba navy .35 -> .85 -> .97, which
          crushed the actual art down to a flat dark wash by the time you
          scrolled past the header) — see the big comment above this
          component for why. The gradient that's left is just enough to
          keep white text readable over the busiest part of the art. */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: COLORS.navy }}>
        <img src={planet.image_path} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.92 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(13,20,35,.12) 0%, rgba(13,20,35,.5) 60%, rgba(13,20,35,.82) 100%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% -10%, ${theme}33, transparent 55%)` }} />
        {particles.map((p) => (
          <span
            key={p.key}
            style={{
              position: "absolute", bottom: "-5%", left: `${p.left}%`,
              width: p.size, height: p.size, borderRadius: "50%",
              background: theme, boxShadow: `0 0 ${p.size * 3}px ${theme}`,
              animation: `wr-drift ${p.duration}s ease-in ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="wr-scene" style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "22px 20px 60px" }}>
        <button
          type="button"
          onClick={() => router.push("/gear-locker")}
          className="wr-btn"
          style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12.5, marginBottom: 18 }}
        >
          ← Back to Galaxy Hub
        </button>

        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${theme}40`, color: COLORS.white, borderRadius: 999, padding: "4px 14px", fontWeight: 700, fontSize: 11.5, marginBottom: 10, boxShadow: `0 0 18px ${theme}55` }}>
            🪐 WORLD REWARD STATION
          </div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 700, margin: 0, textShadow: `0 2px 20px ${theme}99, 0 2px 12px rgba(0,0,0,.6)` }}>
            {planet.name}
          </h1>
        </div>

        {!story ? (
          <div className="wr-card" style={{ textAlign: "center", padding: "34px 22px" }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>🛰️</div>
            <p style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.white, margin: "0 0 6px 0" }}>
              Transmission still incoming...
            </p>
            <p style={{ fontSize: 13, color: "#B9C2E4", margin: 0, lineHeight: 1.5 }}>
              S.A.M. hasn't logged a full report on {planet.name} yet — this world's story, trail, and game
              are still being built. Check back soon, Cadet!
            </p>
          </div>
        ) : (
          <>
            {/* Story card — reframed as a decoding transmission: a blinking
                "receiving" tag, a light scanline texture, and the
                paragraphs cascading in one at a time via animation-delay
                instead of dumping in as a single static block. */}
            <div className="wr-card">
              <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0px, rgba(255,255,255,.035) 1px, transparent 1px, transparent 3px)", pointerEvents: "none" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE80", animation: "wr-blink 1.4s ease-in-out infinite" }} />
                <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: theme, margin: 0 }}>
                  📡 Receiving Transmission — Learn About This World
                </p>
              </div>
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    position: "relative", fontSize: 13.5, lineHeight: 1.6, color: "#E4E8F7", margin: "0 0 10px 0",
                    opacity: 0, animation: "wr-line-in 550ms ease forwards", animationDelay: `${250 + i * 480}ms`,
                  }}
                >
                  {p}
                </p>
              ))}
              {!storyRead ? (
                <button type="button" onClick={handleReadStory} disabled={readingStory} className="wr-btn" style={{ position: "relative", marginTop: 6, background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`, color: COLORS.white, borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 13.5, boxShadow: `0 4px 18px ${theme}44` }}>
                  {readingStory ? "Logging..." : "I've read it! 🎉"}
                </button>
              ) : (
                <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,.18)", color: "#4ADE80", borderRadius: 999, padding: "6px 16px", fontWeight: 700, fontSize: 12.5, marginTop: 4 }}>
                  ✓ Explored — rewards unlocked below
                </div>
              )}
            </div>

            {storyRead && (
              <div className="wr-2col">
                {/* Trail card — now its own "kiosk": a circular badge
                    hanging off the top edge instead of an inline emoji, and
                    a themed glow instead of the same flat panel every card
                    used to share. */}
                <div className="wr-card" style={{ paddingTop: 26 }}>
                  <div className="wr-kiosk-badge" style={{ background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})` }}>🎨</div>
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: theme, margin: "0 0 10px 0" }}>
                    New for S.A.M.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                      {story.trailColors.map((c, i) => (
                        <span key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}`, display: "inline-block" }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12.5, color: "#C9D2EE", lineHeight: 1.4 }}>{planet.name} Trail — sparkles that follow S.A.M. everywhere.</span>
                  </div>
                  <button type="button" onClick={handleToggleTrail} disabled={trailSaving} className="wr-btn" style={{
                    background: trailEquippedHere ? "rgba(255,255,255,.14)" : `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`,
                    color: COLORS.white, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 12.5, width: "100%",
                  }}>
                    {trailEquippedHere ? "✓ Equipped — tap to remove" : "Equip this trail"}
                  </button>
                </div>

                {/* Background card */}
                <div className="wr-card" style={{ paddingTop: 26 }}>
                  <div className="wr-kiosk-badge" style={{ background: `linear-gradient(135deg, ${theme}, ${COLORS.teal})` }}>🖼️</div>
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: theme, margin: "0 0 10px 0" }}>
                    New Background Unlocked
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <img src={planet.image_path} alt="" style={{ width: 84, height: 50, objectFit: "cover", borderRadius: 8, flexShrink: 0, boxShadow: `0 0 0 2px ${theme}55` }} />
                    <span style={{ fontSize: 12.5, color: "#C9D2EE", lineHeight: 1.4 }}>Set {planet.name} as your Home screen background.</span>
                  </div>
                  <button type="button" onClick={handleApplyBackground} disabled={bgSaving} className="wr-btn" style={{
                    background: bgApplied ? "rgba(255,255,255,.14)" : `linear-gradient(135deg, ${theme}, ${COLORS.teal})`,
                    color: COLORS.white, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 12.5, width: "100%",
                  }}>
                    {bgSaving ? "Saving..." : bgApplied ? "✓ Set as your background" : "Set as my Home background"}
                  </button>
                </div>
              </div>
            )}

            {/* Game card — only renders once a world actually has a game
                defined in lib/worldStories.js; a future world with a story
                but no game yet just won't show this card, instead of
                crashing on story.game.name being undefined. Bigger and
                bolder than the other two now — it's the hero payoff. */}
            {story.game && (
            <div className="wr-card" style={{ padding: 0, marginTop: 4 }}>
              <div style={{ background: `linear-gradient(90deg, ${theme}55, transparent)`, padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: COLORS.white, margin: 0 }}>
                  🎮 {story.game.name}
                </p>
              </div>
              <div style={{ padding: "18px 22px 20px" }}>
                {!gameUnlocked ? (
                  <>
                    <p style={{ fontSize: 13, color: "#C9D2EE", margin: "0 0 14px 0" }}>{story.game.description}</p>
                    <button type="button" onClick={handleUnlockGame} disabled={unlocking} className="wr-btn" style={{ background: COLORS.gold, color: "#3A2A00", borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13 }}>
                      {unlocking ? "Unlocking..." : "🎟️ Unlock for 💎 1"}
                    </button>
                    {unlockError && (
                      <p style={{ fontSize: 12, color: COLORS.danger, margin: "10px 0 0 0" }}>{unlockError}</p>
                    )}
                    <p style={{ fontSize: 11, color: COLORS.textMuted, margin: "10px 0 0 0" }}>You have 💎 {points} crystals.</p>
                  </>
                ) : (
                  <>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 16, overflow: "hidden", marginBottom: 10, boxShadow: `0 0 0 2px ${theme}55, 0 8px 30px rgba(0,0,0,.4)` }}>
                      <iframe
                        src={story.game.path}
                        title={story.game.name}
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        style={{ display: "block", width: "100%", height: "100%", border: 0 }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <a href={story.game.path} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: COLORS.teal, fontWeight: 700, textDecoration: "underline" }}>
                        Play in a new tab ↗
                      </a>
                      {bestScore > 0 && (
                        <span style={{ fontSize: 12, color: "#C9D2EE" }}>🏆 Best score: <b style={{ color: COLORS.white }}>{bestScore.toLocaleString()}</b></span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            )}
          </>
        )}
      </div>

      {/* Sept 12, 2026 — a brief ring-burst the moment the story is marked
          read this visit (see justUnlockedStory above). Purely decorative,
          auto-clears, nothing persisted. */}
      {justUnlockedStory && (
        <div className="wr-burst">
          <div className="wr-burst-ring" style={{ borderColor: theme }} />
        </div>
      )}
    </div>
  );
}
