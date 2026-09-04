"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
export default function WorldRewardStationClient({ planet, story, storyRead: initialStoryRead, crystalPoints, equippedWorldTrail, gameState }) {
  const router = useRouter();
  const [storyRead, setStoryRead] = useState(initialStoryRead);
  const [readingStory, setReadingStory] = useState(false);
  const [trail, setTrail] = useState(equippedWorldTrail);
  const [trailSaving, setTrailSaving] = useState(false);
  const [bgSaving, setBgSaving] = useState(false);
  const [bgApplied, setBgApplied] = useState(false);
  const [gameUnlocked, setGameUnlocked] = useState(Boolean(gameState?.unlocked));
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState("");
  const [bestScore, setBestScore] = useState(gameState?.bestScore || 0);
  const [points, setPoints] = useState(crystalPoints);

  const trailEquippedHere = trail === planet.planet_key;

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
    <div style={{ position: "relative", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: COLORS.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .wr-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .wr-btn:hover { transform: translateY(-1px); }
        .wr-btn:disabled { cursor: default; opacity: .6; transform: none; }
        .wr-card { background: rgba(13,20,35,.62); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 20px; padding: 20px 22px; margin-bottom: 16px; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: COLORS.navy }}>
        <img src={planet.image_path} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,20,35,.35) 0%, rgba(13,20,35,.85) 55%, rgba(13,20,35,.97) 100%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "22px 20px 60px" }}>
        <button
          type="button"
          onClick={() => router.push("/gear-locker")}
          className="wr-btn"
          style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12.5, marginBottom: 18 }}
        >
          ← Back to Galaxy Hub
        </button>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${planet.theme_color}33`, color: planet.theme_color, borderRadius: 999, padding: "4px 14px", fontWeight: 700, fontSize: 11.5, marginBottom: 10 }}>
            🪐 WORLD REWARD STATION
          </div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(24px, 5vw, 34px)", fontWeight: 700, margin: 0, textShadow: "0 2px 12px rgba(0,0,0,.5)" }}>
            {planet.name}
          </h1>
        </div>

        {!story ? (
          <div className="wr-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#C9D2EE", margin: 0 }}>
              🛰️ S.A.M. hasn't logged a report on {planet.name} yet. Check back soon, Cadet!
            </p>
          </div>
        ) : (
          <>
            {/* Story card */}
            <div className="wr-card">
              <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: planet.theme_color, margin: "0 0 10px 0" }}>
                📖 Learn About This World
              </p>
              {story.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 13.5, lineHeight: 1.6, color: "#E4E8F7", margin: "0 0 10px 0" }}>
                  {p}
                </p>
              ))}
              {!storyRead ? (
                <button type="button" onClick={handleReadStory} disabled={readingStory} className="wr-btn" style={{ marginTop: 6, background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`, color: COLORS.white, borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 13.5 }}>
                  {readingStory ? "Logging..." : "I've read it! 🎉"}
                </button>
              ) : (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,.18)", color: "#4ADE80", borderRadius: 999, padding: "6px 16px", fontWeight: 700, fontSize: 12.5, marginTop: 4 }}>
                  ✓ Explored — rewards unlocked below
                </div>
              )}
            </div>

            {storyRead && (
              <>
                {/* Trail card */}
                <div className="wr-card">
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: planet.theme_color, margin: "0 0 10px 0" }}>
                    🎨 New for S.A.M.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      {story.trailColors.map((c, i) => (
                        <span key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}`, display: "inline-block" }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 13, color: "#C9D2EE" }}>{planet.name} Trail — a sparkling trail that follows S.A.M. wherever it goes.</span>
                  </div>
                  <button type="button" onClick={handleToggleTrail} disabled={trailSaving} className="wr-btn" style={{
                    background: trailEquippedHere ? "rgba(255,255,255,.14)" : `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`,
                    color: COLORS.white, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 12.5,
                  }}>
                    {trailEquippedHere ? "✓ Equipped — tap to remove" : "Equip this trail"}
                  </button>
                </div>

                {/* Background card */}
                <div className="wr-card">
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: planet.theme_color, margin: "0 0 10px 0" }}>
                    🖼️ New Background Unlocked
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <img src={planet.image_path} alt="" style={{ width: 90, height: 54, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#C9D2EE" }}>Set {planet.name} as your Home screen background.</span>
                  </div>
                  <button type="button" onClick={handleApplyBackground} disabled={bgSaving} className="wr-btn" style={{
                    background: bgApplied ? "rgba(255,255,255,.14)" : `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`,
                    color: COLORS.white, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 12.5,
                  }}>
                    {bgSaving ? "Saving..." : bgApplied ? "✓ Set as your background" : "Set as my Home background"}
                  </button>
                </div>
              </>
            )}

            {/* Game card — only renders once a world actually has a game
                defined in lib/worldStories.js; a future world with a story
                but no game yet just won't show this card, instead of
                crashing on story.game.name being undefined. */}
            {story.game && (
            <div className="wr-card">
              <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .5, textTransform: "uppercase", color: planet.theme_color, margin: "0 0 10px 0" }}>
                🎮 {story.game.name}
              </p>
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
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 16, overflow: "hidden", marginBottom: 10 }}>
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
