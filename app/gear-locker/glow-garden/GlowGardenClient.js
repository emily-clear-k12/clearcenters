"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DISCOVERY_KEYS, discoveryCount, isMastered } from "./glowGardenLogic";

// Real production palette — matches GearLockerClient.js exactly, supersedes
// the placeholder palette used in the disposable HTML prototypes (v1-v3).
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

const PLANET_KEY = "glow_garden";
const GAME_KEY = "catch_glow_sprites";
const GAME_SRC = "/games/catch-the-glow-sprites.html";

// Fixed hotspot positions, read off the hero art the same way
// GearLockerClient's PLANET_POSITIONS are read off the map background.
const DISCOVERY_META = {
  glowseed: {
    name: "Glow Seed",
    color: "#7CFFC4",
    pos: { left: "64%", top: "20%" },
    locked: "/glow-garden/glowseed_locked.png",
    found: "/glow-garden/glowseed_found.png",
    lore: "Glow Seeds hum so quietly you can only hear them when you stop walking. They always root near water.",
  },
  crystaldroplet: {
    name: "Crystal Droplet",
    color: COLORS.teal,
    pos: { left: "85%", top: "46%" },
    locked: "/glow-garden/crystaldroplet_locked.png",
    found: "/glow-garden/crystaldroplet_found.png",
    lore: "Legend says every Crystal Droplet holds one drop from the waterfall's very first splash.",
  },
  crystalblossom: {
    name: "Crystal Blossom",
    color: "#FF9FE5",
    pos: { left: "68%", top: "80%" },
    locked: "/glow-garden/crystalblossom_locked.png",
    found: "/glow-garden/crystalblossom_found.png",
    lore: "Crystal Blossoms only open their petals for explorers who've already found everything else nearby.",
  },
};

function discoveriesFromKeys(keys) {
  const set = new Set(keys || []);
  const obj = {};
  DISCOVERY_KEYS.forEach((k) => {
    obj[k] = set.has(k);
  });
  return obj;
}

export default function GlowGardenClient({ planet, crystalPoints, discoveredKeys, gameCleared: initialGameCleared, gamePlayed: initialGamePlayed }) {
  const router = useRouter();

  const [discoveries, setDiscoveries] = useState(() => discoveriesFromKeys(discoveredKeys));
  const [gameCleared, setGameCleared] = useState(Boolean(initialGameCleared));
  const [gamePlayed, setGamePlayed] = useState(Boolean(initialGamePlayed));
  const [dodgesLeft, setDodgesLeft] = useState(() => {
    const obj = {};
    DISCOVERY_KEYS.forEach((k) => {
      obj[k] = 1 + Math.round(Math.random());
    });
    return obj;
  });
  const [dodgingKey, setDodgingKey] = useState(null);
  const [pinPositions, setPinPositions] = useState(() => {
    const obj = {};
    DISCOVERY_KEYS.forEach((k) => {
      obj[k] = { left: parseFloat(DISCOVERY_META[k].pos.left), top: parseFloat(DISCOVERY_META[k].pos.top) };
    });
    return obj;
  });
  const [worldLights, setWorldLights] = useState(() =>
    DISCOVERY_KEYS.filter((k) => discoveriesFromKeys(discoveredKeys)[k]).map((k) => ({ key: k, justPopped: false }))
  );
  const [twinkles, setTwinkles] = useState([]);
  const [toast, setToast] = useState(null); // { icon, text }
  const [loreCard, setLoreCard] = useState(null); // { key, left, top }
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [passportModalOpen, setPassportModalOpen] = useState(false);
  const [masteredOverlayOpen, setMasteredOverlayOpen] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const [sparks, setSparks] = useState([]);
  const [flyIcon, setFlyIcon] = useState(null);
  const [chipPopKey, setChipPopKey] = useState(null);
  const [trailArmed, setTrailArmed] = useState(() => isMastered(discoveriesFromKeys(discoveredKeys), initialGameCleared));
  const [trailHintVisible, setTrailHintVisible] = useState(false);

  const stageRef = useRef(null);
  const gameFrameRef = useRef(null);
  const pinRefs = useRef({});
  const chipRefs = useRef({});
  const toastTimerRef = useRef(null);
  const loreTimerRef = useRef(null);
  const alreadyMasteredOnLoadRef = useRef(isMastered(discoveriesFromKeys(discoveredKeys), initialGameCleared));
  const celebratedRef = useRef(false);

  const mastered = isMastered(discoveries, gameCleared);
  const discCount = discoveryCount(discoveries);

  // ---- ambient twinkle field (client-only, added after mount so the
  // server-rendered HTML has none — purely decorative, non-deterministic,
  // so there's nothing worth matching between server and client here) ----
  useEffect(() => {
    const arr = Array.from({ length: 36 }, () => ({
      size: 1 + Math.random() * 2.2,
      left: Math.random() * 100,
      top: Math.random() * 70,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }));
    setTwinkles(arr);
  }, []);

  function showToast(icon, text) {
    setToast({ icon, text });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2400);
  }

  function screenFlash() {
    setFlashKey((k) => k + 1);
  }

  function burstAt(x, y, color) {
    const batch = Array.from({ length: 14 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 70;
      return {
        id: Math.random().toString(36).slice(2),
        x,
        y,
        size: 4 + Math.random() * 5,
        color,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        duration: 650 + Math.random() * 300,
      };
    });
    setSparks((prev) => [...prev, ...batch]);
    batch.forEach((s) => {
      setTimeout(() => {
        setSparks((prev) => prev.filter((p) => p.id !== s.id));
      }, s.duration + 350);
    });
  }

  function flyToChip(fromX, fromY, key) {
    const chipEl = chipRefs.current[key];
    if (!chipEl) return;
    const target = chipEl.getBoundingClientRect();
    const id = Math.random().toString(36).slice(2);
    setFlyIcon({ id, key, fromX, fromY, toX: target.left + target.width / 2, toY: target.top + target.height / 2 });
    setTimeout(() => {
      setFlyIcon((cur) => (cur && cur.id === id ? null : cur));
      setChipPopKey(key);
      setTimeout(() => setChipPopKey((cur) => (cur === key ? null : cur)), 650);
    }, 700);
  }

  function spawnConfetti() {
    const colors = ["#7CFFC4", COLORS.gold, "#FF9FE5", COLORS.violet, COLORS.teal];
    const vw = typeof window !== "undefined" ? window.innerWidth : 800;
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;
    const batch = Array.from({ length: 60 }, (_, i) => {
      const startX = Math.random() * vw;
      const endX = startX + (Math.random() * 200 - 100);
      return {
        id: Math.random().toString(36).slice(2),
        color: colors[i % colors.length],
        w: 5 + Math.random() * 5,
        h: 8 + Math.random() * 8,
        startX,
        endX,
        vh,
        rot: Math.random() * 720 - 360,
        duration: 2200 + Math.random() * 1400,
      };
    });
    setConfetti((prev) => [...prev, ...batch]);
    batch.forEach((c) => {
      setTimeout(() => {
        setConfetti((prev) => prev.filter((p) => p.id !== c.id));
      }, c.duration + 900);
    });
  }

  function showLoreCard(key, anchorEl) {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = Math.min(vw - 280, Math.max(12, rect.left + rect.width / 2 - 130));
    let top = rect.top + rect.height + 10;
    if (top > vh - 140) top = rect.top - 118;
    setLoreCard({ key, left, top });
    clearTimeout(loreTimerRef.current);
    loreTimerRef.current = setTimeout(() => setLoreCard(null), 4200);
  }

  function dodgePin(key) {
    setDodgingKey(key);
    setTimeout(() => setDodgingKey((cur) => (cur === key ? null : cur)), 400);
    // Position lives in React state (not a direct DOM mutation) so it
    // survives the re-renders that toasts/sparks/etc. trigger — mutating
    // pin.style.left directly would just get overwritten the next time
    // React re-applies the JSX style prop from the fixed meta position.
    setTimeout(() => {
      setPinPositions((prev) => {
        const cur = prev[key];
        const newLeft = Math.min(92, Math.max(45, cur.left + (Math.random() * 16 - 8)));
        const newTop = Math.min(88, Math.max(16, cur.top + (Math.random() * 16 - 8)));
        return { ...prev, [key]: { left: newLeft, top: newTop } };
      });
    }, 140);
  }

  function recordDiscovery(discoveryKey) {
    fetch("/api/planets/discover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planetKey: PLANET_KEY, discoveryKey }),
    }).catch(() => {
      // A hiccup here just means this discovery needs to be found again next
      // visit for it to stick — not worth blocking the reveal over, same
      // reasoning as the visit-recording try/catch on the main map.
    });
  }

  function handlePinClick(key, e) {
    if (discoveries[key]) return;
    const meta = DISCOVERY_META[key];

    if (dodgesLeft[key] > 0) {
      setDodgesLeft((prev) => ({ ...prev, [key]: prev[key] - 1 }));
      dodgePin(key);
      burstAt(e.clientX, e.clientY, "rgba(255,255,255,.7)");
      showToast(null, "💨 So close — it slipped away! Try again.");
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    setDiscoveries((prev) => ({ ...prev, [key]: true }));
    setWorldLights((prev) => [...prev, { key, justPopped: true }]);
    burstAt(cx, cy, meta.color);
    screenFlash();
    flyToChip(cx, cy, key);
    showToast(meta.found, `Found it! ${meta.name} added to your collection.`);
    recordDiscovery(key);

    setTimeout(() => {
      setWorldLights((prev) => prev.map((w) => (w.key === key ? { ...w, justPopped: false } : w)));
    }, 550);
    setTimeout(() => showLoreCard(key, chipRefs.current[key]), 700);
  }

  // ---- game result messages from the embedded iframe ----
  useEffect(() => {
    function handleMessage(e) {
      if (gameFrameRef.current && e.source !== gameFrameRef.current.contentWindow) return;
      const d = e.data;
      if (!d || d.type !== "glowSpritesResult") return;

      setGamePlayed(true);
      if (d.cleared) {
        setGameCleared(true);
        showToast(null, "✨ Game completed! Great exploring!");
      }
      fetch("/api/planets/game-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planetKey: PLANET_KEY, gameKey: GAME_KEY, cleared: Boolean(d.cleared), score: d.score }),
      }).catch(() => {});
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- mastery celebration: fires once, only on the transition into
  // mastery this session — a student who was already mastered before
  // opening the page just sees the badge/reward already in place, no
  // replayed confetti every visit. ----
  useEffect(() => {
    if (mastered && !alreadyMasteredOnLoadRef.current && !celebratedRef.current) {
      celebratedRef.current = true;
      spawnConfetti();
      setTimeout(() => {
        setMasteredOverlayOpen(true);
        setTrailArmed(true);
        setTrailHintVisible(true);
        setTimeout(() => setTrailHintVisible(false), 4000);
      }, 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mastered]);

  // ---- Bloom Trail cursor sparkle, once unlocked ----
  useEffect(() => {
    if (!trailArmed) return undefined;
    let last = 0;
    function onMove(e) {
      const now = Date.now();
      if (now - last < 45) return;
      last = now;
      const id = Math.random().toString(36).slice(2);
      const size = 5 + Math.random() * 5;
      const color = ["#FF9FE5", COLORS.violet, COLORS.teal][Math.floor(Math.random() * 3)];
      setSparks((prev) => [...prev, { id, trail: true, x: e.clientX - size / 2, y: e.clientY - size / 2, size, color, dx: 0, dy: 0, duration: 550 }]);
      setTimeout(() => setSparks((prev) => prev.filter((p) => p.id !== id)), 600);
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [trailArmed]);

  function openGame() {
    setGameModalOpen(true);
  }
  function closeGame() {
    setGameModalOpen(false);
    if (gameFrameRef.current) gameFrameRef.current.src = "about:blank";
  }
  function goBack() {
    router.push("/gear-locker");
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: COLORS.navy, fontFamily: "'Inter', sans-serif", color: COLORS.white, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gg-twinkle{ position:absolute; border-radius:50%; background:#fff; pointer-events:none; animation: gg-twinkle-anim linear infinite; }
        @keyframes gg-twinkle-anim{ 0%,100%{ opacity:.15; transform:scale(.7); } 50%{ opacity:.9; transform:scale(1.15); } }
        .gg-btn{ font-family:'Poppins', sans-serif; font-weight:700; border:none; cursor:pointer; transition: transform 150ms ease, box-shadow 150ms ease; }
        .gg-btn:hover{ transform: translateY(-1px); }
        .gg-imgbtn{ border:none; background:none; padding:0; cursor:pointer; filter:drop-shadow(0 6px 14px rgba(13,10,32,.4)); transition: transform 150ms ease; }
        .gg-imgbtn:hover{ transform: translateY(-1px) scale(1.03); }
        .gg-pin{ position:absolute; z-index:6; width:44px; height:44px; margin-left:-22px; margin-top:-44px; cursor:pointer; filter:drop-shadow(0 4px 10px rgba(0,0,0,.5)); animation: gg-bob 2.4s ease-in-out infinite; border:none; background:none; padding:0; }
        @keyframes gg-bob{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-6px); } }
        .gg-pin.gg-dodging{ animation: gg-dodgehop .4s ease; }
        @keyframes gg-dodgehop{ 0%{ transform:scale(1,1); } 35%{ transform:scale(1.3,.7) rotate(-6deg); } 70%{ transform:scale(.8,1.2) rotate(4deg); } 100%{ transform:scale(1,1) rotate(0); } }
        .gg-ring{ position:absolute; inset:-10px; border-radius:50%; border:2px solid rgba(255,255,255,.8); animation: gg-ringpulse 1.8s ease-out infinite; }
        @keyframes gg-ringpulse{ 0%{ transform:scale(.6); opacity:.9; } 100%{ transform:scale(1.5); opacity:0; } }
        .gg-worldlight{ position:absolute; z-index:3; width:12px; height:12px; margin-left:-6px; margin-top:-6px; border-radius:50%; cursor:pointer; animation: gg-worldglow 2.6s ease-in-out infinite; }
        @keyframes gg-worldglow{ 0%,100%{ transform:scale(1); opacity:.75; } 50%{ transform:scale(1.5); opacity:1; } }
        .gg-worldlight.gg-pop{ animation: gg-worldpopin .5s ease; }
        @keyframes gg-worldpopin{ 0%{ transform:scale(0); } 60%{ transform:scale(1.8); } 100%{ transform:scale(1); } }
        .gg-chip.gg-just-found{ animation: gg-chippop .6s ease; }
        @keyframes gg-chippop{ 0%{ transform:scale(.4) rotate(-8deg);} 55%{ transform:scale(1.28) rotate(4deg);} 100%{ transform:scale(1) rotate(0);} }
        .gg-flash{ position:fixed; inset:0; background:#fff; z-index:40; opacity:0; pointer-events:none; }
        .gg-flash.gg-go{ animation: gg-flashfade .5s ease-out; }
        @keyframes gg-flashfade{ 0%{ opacity:.45; } 100%{ opacity:0; } }
        .gg-banner-in{ animation: gg-bannerin .6s cubic-bezier(.2,.8,.2,1); }
        @keyframes gg-bannerin{ 0%{ transform:scale(.5) rotate(-6deg); opacity:0; } 100%{ transform:scale(1) rotate(0); opacity:1; } }
        @keyframes gg-spin{ from{ transform:rotate(0);} to{ transform:rotate(360deg);} }
        .gg-play{ background:linear-gradient(135deg,#7CFFC4,#3fd08a); color:#0d2a1e; box-shadow:0 0 0 1px rgba(124,255,196,.5), 0 10px 26px rgba(124,255,196,.35); animation: gg-pulseglow 2.6s ease-in-out infinite; }
        @keyframes gg-pulseglow{ 0%,100%{ box-shadow:0 0 0 1px rgba(124,255,196,.5), 0 10px 26px rgba(124,255,196,.28);} 50%{ box-shadow:0 0 0 1px rgba(124,255,196,.8), 0 14px 34px rgba(124,255,196,.55);} }
      `}</style>

      {/* Screen flash, keyed so re-triggering restarts the animation */}
      <div key={flashKey} className={flashKey > 0 ? "gg-flash gg-go" : "gg-flash"} />

      <div
        ref={stageRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: "url('/glow-garden/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,27,42,.62) 0%, rgba(13,27,42,.12) 30%, rgba(13,27,42,.6) 100%)", pointerEvents: "none", zIndex: 1 }} />

        {twinkles.map((t, i) => (
          <div key={i} className="gg-twinkle" style={{ width: t.size, height: t.size, left: `${t.left}%`, top: `${t.top}%`, animationDuration: `${t.duration}s`, animationDelay: `${t.delay}s`, zIndex: 2 }} />
        ))}

        {/* Top bar */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px" }}>
          <button type="button" onClick={goBack} className="gg-btn" style={{ background: "rgba(20,16,50,.72)", backdropFilter: "blur(6px)", border: `1px solid ${COLORS.violet}66`, borderRadius: 999, padding: "10px 18px", color: COLORS.white, fontSize: 14 }}>
            ← Back
          </button>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, background: "rgba(20,16,50,.72)", backdropFilter: "blur(6px)", border: `1px solid ${COLORS.violet}66`, borderRadius: 999, padding: "8px 16px", color: COLORS.white, fontSize: 14 }}>
            💎 {crystalPoints}
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ position: "relative", zIndex: 5, padding: "0 32px", marginTop: 2 }}>
          <div style={{ color: "#C9D2EE", fontWeight: 700, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>ClearCenters</div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", color: "#fff", fontSize: "clamp(28px, 5vw, 46px)", margin: "2px 0 4px", textShadow: `0 0 24px ${COLORS.violet}88, 0 4px 20px rgba(0,0,0,.4)` }}>{planet.name}</h1>
          <p style={{ color: "#C9D2EE", margin: 0, fontSize: 15 }}>{planet.description || "Explore and discover rewards"}</p>
        </div>

        {/* Stat row */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", gap: 14, margin: "20px 32px 0", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ background: "rgba(20,16,50,.72)", backdropFilter: "blur(6px)", border: `1px solid ${COLORS.violet}66`, borderRadius: 16, padding: "10px 18px", display: "flex", alignItems: "center", gap: 12, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 20px rgba(13,10,32,.35)" }}>
            <div style={{ position: "relative", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 34 34" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                <circle cx="17" cy="17" r="14" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
                <circle cx="17" cy="17" r="14" fill="none" stroke="#7CFFC4" strokeWidth="3" strokeLinecap="round" strokeDasharray="88" strokeDashoffset={88 - (88 * discCount) / 3} style={{ transition: "stroke-dashoffset .5s ease" }} />
              </svg>
              <span style={{ fontSize: 14 }}>🌱</span>
            </div>
            Discoveries&nbsp;{discCount}/3
          </div>
          <div style={{ background: "rgba(20,16,50,.72)", backdropFilter: "blur(6px)", border: `1px solid ${COLORS.violet}66`, borderRadius: 16, padding: "10px 18px", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 20px rgba(13,10,32,.35)" }}>
            🎮 Game&nbsp;{gameCleared ? "Completed ✓" : "Not played yet"}
          </div>
        </div>

        {/* Action row */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", gap: 12, margin: "18px 32px", flexWrap: "wrap", alignItems: "center" }}>
          <button type="button" onClick={openGame} className="gg-btn gg-play" style={{ fontSize: 15, borderRadius: 999, padding: "14px 26px" }}>
            ▶ {gameCleared ? "Play Again" : "Play Game"}
          </button>
          <button type="button" onClick={() => setPassportModalOpen(true)} className="gg-imgbtn" style={{ height: 46 }}>
            <img src="/glow-garden/btn_view_passport.png" alt="View Passport" style={{ height: "100%", display: "block" }} />
          </button>
        </div>

        {/* Chip rail */}
        <div style={{ position: "relative", zIndex: 5, margin: "20px 32px 32px", display: "inline-flex", gap: 10, background: "rgba(20,16,50,.72)", backdropFilter: "blur(8px)", border: `1px solid ${COLORS.violet}66`, borderRadius: 999, padding: "8px 14px", boxShadow: "0 10px 26px rgba(13,10,32,.4)" }}>
          {DISCOVERY_KEYS.map((key) => {
            const meta = DISCOVERY_META[key];
            const found = discoveries[key];
            return (
              <div
                key={key}
                ref={(el) => (chipRefs.current[key] = el)}
                title={meta.name}
                onClick={() => found && showLoreCard(key, chipRefs.current[key])}
                className={`gg-chip${chipPopKey === key ? " gg-just-found" : ""}`}
                style={{ position: "relative", width: 42, height: 42, borderRadius: "50%", background: found ? "rgba(124,255,196,.12)" : "rgba(255,255,255,.06)", border: found ? "1.5px solid #7CFFC4" : "1.5px solid rgba(255,255,255,.18)", boxShadow: found ? "0 0 14px rgba(124,255,196,.5)" : "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: found ? "pointer" : "default", transition: "transform .3s ease, border-color .3s ease, background .3s ease" }}
              >
                <img src={found ? meta.found : meta.locked} alt={meta.name} style={{ width: 26, height: 26, objectFit: "contain" }} />
              </div>
            );
          })}
        </div>

        {/* World lights — persistent glow left behind at each catch site */}
        {worldLights.map(({ key, justPopped }) => {
          const meta = DISCOVERY_META[key];
          const pos = pinPositions[key];
          return (
            <div
              key={key}
              onClick={() => showLoreCard(key, pinRefs.current[`light-${key}`])}
              ref={(el) => (pinRefs.current[`light-${key}`] = el)}
              className={`gg-worldlight${justPopped ? " gg-pop" : ""}`}
              style={{ left: `${pos.left}%`, top: `${pos.top}%`, background: meta.color, boxShadow: `0 0 10px 3px ${meta.color}` }}
              title={meta.name}
            />
          );
        })}

        {/* Discovery pins — only shown for undiscovered items */}
        {DISCOVERY_KEYS.filter((k) => !discoveries[k]).map((key) => {
          const meta = DISCOVERY_META[key];
          const pos = pinPositions[key];
          return (
            <button
              key={key}
              type="button"
              ref={(el) => (pinRefs.current[key] = el)}
              onClick={(e) => handlePinClick(key, e)}
              className={`gg-pin${dodgingKey === key ? " gg-dodging" : ""}`}
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              title="Click to discover"
            >
              <div className="gg-ring" />
              <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
                <circle cx="12" cy="12" r="10" fill={meta.color} stroke="#fff" strokeWidth="2" />
              </svg>
            </button>
          );
        })}

        <div style={{ height: 60 }} />
      </div>

      {/* Sparks (burst + cursor trail) */}
      {sparks.map((s) => (
        <div
          key={s.id}
          style={{
            position: "fixed",
            zIndex: s.trail ? 90 : 55,
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.color,
            boxShadow: `0 0 8px ${s.color}`,
            pointerEvents: "none",
            animation: `gg-spark-${s.id} ${s.duration}ms cubic-bezier(.2,.8,.2,1) forwards`,
          }}
        >
          <style>{`@keyframes gg-spark-${s.id}{ from{ transform:translate(0,0); opacity:1; } to{ transform:translate(${s.dx}px, ${s.dy}px); opacity:0; } }`}</style>
        </div>
      ))}

      {/* Fly-to-chip icon */}
      {flyIcon && (
        <img
          key={flyIcon.id}
          src={DISCOVERY_META[flyIcon.key].found}
          alt=""
          style={{
            position: "fixed",
            zIndex: 80,
            pointerEvents: "none",
            width: 34,
            height: 34,
            objectFit: "contain",
            filter: "drop-shadow(0 0 10px rgba(255,255,255,.8))",
            left: flyIcon.toX,
            top: flyIcon.toY,
            transform: "scale(.4)",
            opacity: 0.2,
            transition: "left .65s cubic-bezier(.2,.75,.15,1), top .65s cubic-bezier(.2,.75,.15,1), transform .65s ease, opacity .65s ease",
          }}
        />
      )}

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            position: "fixed",
            zIndex: 65,
            pointerEvents: "none",
            left: c.startX,
            top: -20,
            width: c.w,
            height: c.h,
            background: c.color,
            borderRadius: 2,
            animation: `gg-confetti-${c.id} ${c.duration}ms cubic-bezier(.3,.6,.4,1) forwards`,
          }}
        >
          <style>{`@keyframes gg-confetti-${c.id}{ from{ transform:translate(0,0) rotate(0deg); opacity:1; } to{ transform:translate(${c.endX - c.startX}px, ${c.vh + 40}px) rotate(${c.rot}deg); opacity:.9; } }`}</style>
        </div>
      ))}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50, background: "rgba(20,16,50,.9)", backdropFilter: "blur(8px)", border: `1px solid ${COLORS.violet}66`, borderRadius: 14, padding: "12px 20px", boxShadow: "0 12px 30px rgba(13,10,32,.5)", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.white }}>
          {toast.icon && <img src={toast.icon} alt="" style={{ width: 28, height: 28 }} />}
          {toast.text}
        </div>
      )}

      {/* Lore card */}
      {loreCard && (
        <div
          onClick={() => setLoreCard(null)}
          style={{ position: "fixed", zIndex: 85, maxWidth: 260, left: loreCard.left, top: loreCard.top, background: "rgba(20,16,50,.9)", backdropFilter: "blur(10px)", border: `1px solid ${COLORS.violet}66`, borderRadius: 16, padding: "14px 16px", boxShadow: "0 14px 32px rgba(13,10,32,.5)", cursor: "pointer" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <img src={DISCOVERY_META[loreCard.key].found} alt="" style={{ width: 26, height: 26, objectFit: "contain" }} />
            <b style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13.5 }}>{DISCOVERY_META[loreCard.key].name}</b>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.4, color: "#C9D2EE", fontStyle: "italic" }}>&quot;{DISCOVERY_META[loreCard.key].lore}&quot;</p>
        </div>
      )}

      {/* Trail-armed hint */}
      {trailHintVisible && (
        <div style={{ position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)", zIndex: 45, background: "rgba(20,16,50,.9)", border: `1px solid ${COLORS.violet}66`, color: COLORS.white, fontFamily: "'Poppins', sans-serif", fontSize: 12.5, padding: "8px 16px", borderRadius: 999 }}>
          ✨ Bloom Trail is following you — try moving your mouse!
        </div>
      )}

      {/* Game modal */}
      {gameModalOpen && (
        <div onClick={closeGame} style={{ position: "fixed", inset: 0, background: "rgba(13,10,32,.78)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.navy, border: `1px solid ${COLORS.violet}66`, color: COLORS.white, borderRadius: 22, maxWidth: 820, width: "100%", maxHeight: "88vh", overflow: "auto", padding: "26px 26px 22px", position: "relative" }}>
            <button onClick={closeGame} style={{ position: "absolute", top: 16, right: 18, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#C9D2EE" }}>✕</button>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px", fontSize: 22 }}>Catch the Glow Sprites</h2>
            <p style={{ color: "#C9D2EE", fontSize: 13.5, margin: "0 0 16px" }}>Find all the glow sprites before time runs out!</p>
            <div style={{ background: COLORS.navy, borderRadius: 16, overflow: "hidden" }}>
              <iframe ref={gameFrameRef} title="Catch the Glow Sprites" src={gameModalOpen ? GAME_SRC : "about:blank"} style={{ width: "100%", height: "64vh", border: "none", display: "block" }} />
            </div>
          </div>
        </div>
      )}

      {/* Passport modal */}
      {passportModalOpen && (
        <div onClick={() => setPassportModalOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(13,10,32,.78)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.navy, border: `1px solid ${COLORS.violet}66`, color: COLORS.white, borderRadius: 22, maxWidth: 560, width: "100%", maxHeight: "88vh", overflow: "auto", padding: "26px 26px 22px", position: "relative" }}>
            <button onClick={() => setPassportModalOpen(false)} style={{ position: "absolute", top: 16, right: 18, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#C9D2EE" }}>✕</button>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "0 0 4px", fontSize: 22 }}>Passport &amp; Collection</h2>
            <p style={{ color: "#C9D2EE", fontSize: 13.5, margin: "0 0 16px" }}>Your journey through {planet.name}.</p>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.violet}38, ${COLORS.teal}26)`, border: `1.5px dashed ${COLORS.violet}66`, borderRadius: 16, padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#C9D2EE", fontWeight: 700 }}>ClearCenters</div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", margin: "2px 0 0", fontSize: 19, color: "#cbb2ff" }}>{planet.name}<br />Planet Passport</h3>
              </div>
              <img src={mastered ? "/glow-garden/badge_mastered.png" : "/glow-garden/badge_visited.png"} alt="" style={{ width: 78, height: 78, objectFit: "contain" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 14.5 }}>Collection Progress</h3>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#cbb2ff" }}>{discCount} / 3</span>
            </div>
            <p style={{ color: "#C9D2EE", fontSize: 13.5, marginTop: -6, marginBottom: 12 }}>Discover and collect all items to unlock the special reward.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {DISCOVERY_KEYS.map((key) => {
                const meta = DISCOVERY_META[key];
                const found = discoveries[key];
                return (
                  <div key={key} style={{ background: found ? "rgba(124,255,196,.08)" : "rgba(255,255,255,.05)", border: found ? "1px solid #7CFFC4" : `1px solid ${COLORS.violet}66`, borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={found ? meta.found : meta.locked} alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{meta.name}</div>
                      <div style={{ fontSize: 11, color: "#C9D2EE" }}>{found ? 1 : 0}/1</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 18, background: "rgba(255,255,255,.05)", border: `1px solid ${COLORS.violet}66`, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 16 }}>
              <img src={mastered ? DISCOVERY_META.crystalblossom.found : DISCOVERY_META.crystalblossom.locked} alt="" style={{ width: 56, height: 56, objectFit: "contain" }} />
              <div>
                <h4 style={{ margin: "0 0 2px", fontFamily: "'Poppins', sans-serif", fontSize: 15 }}>Bloom Trail</h4>
                <p style={{ margin: 0, fontSize: 12.5, color: "#C9D2EE" }}>A radiant trail that follows your every step.</p>
                <span style={{ marginTop: 8, display: "inline-block", fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: mastered ? "#22C55E" : "rgba(255,255,255,.12)", color: mastered ? "#fff" : "#C9D2EE" }}>
                  {mastered ? "Unlocked!" : "Not Unlocked"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mastered overlay */}
      {masteredOverlayOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 70, background: `radial-gradient(120% 90% at 50% 0%, ${COLORS.violet}66, rgba(13,27,42,.96))`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, textAlign: "center", padding: 20 }}>
          <img src="/glow-garden/flourish_1.png" alt="" style={{ position: "absolute", maxWidth: 760, opacity: 0.7, zIndex: -1, animation: "gg-spin 30s linear infinite" }} />
          <img src="/glow-garden/flourish_2.png" alt="" style={{ position: "absolute", maxWidth: 560, opacity: 0.5, zIndex: -1, animation: "gg-spin 22s linear infinite reverse" }} />
          <img src="/glow-garden/mastered_banner.png" alt="Glow Garden Planet Mastered!" className="gg-banner-in" style={{ maxWidth: "min(520px, 90vw)" }} />
          <p style={{ color: "#fff", maxWidth: 440, fontSize: 15 }}>Congratulations! You&apos;ve completed {planet.name} and mastered all its wonders.</p>
          <div style={{ background: "rgba(255,255,255,.08)", border: `1px solid ${COLORS.violet}66`, borderRadius: 16, padding: "14px 22px", display: "flex", alignItems: "center", gap: 14 }}>
            <img src={DISCOVERY_META.crystalblossom.found} alt="" style={{ width: 52, height: 52 }} />
            <div style={{ textAlign: "left" }}>
              <b style={{ display: "block", fontFamily: "'Poppins', sans-serif", color: "#7CFFC4", fontSize: 14 }}>Bloom Trail unlocked</b>
              <span style={{ fontSize: 12, color: "#C9D2EE" }}>Move your mouse to see it in action</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
            <button type="button" onClick={() => { setMasteredOverlayOpen(false); setPassportModalOpen(true); }} className="gg-imgbtn" style={{ height: 50 }}>
              <img src="/glow-garden/btn_view_passport.png" alt="View Passport" style={{ height: "100%", display: "block" }} />
            </button>
            <button type="button" onClick={() => { setMasteredOverlayOpen(false); goBack(); }} className="gg-imgbtn" style={{ height: 50 }}>
              <img src="/glow-garden/btn_go_back.png" alt="Go Back" style={{ height: "100%", display: "block" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
