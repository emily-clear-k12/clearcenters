"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HOME_BACKGROUNDS } from "../../lib/homeBackgrounds";
import { SAM_SKINS, DEFAULT_SAM_SKIN } from "../../lib/samSkins";
import { getWorldStory } from "../../lib/worldStories";
import SamIcon from "../../components/SamIcon";
import SamStage from "../../components/SamStage";
import SamTrail from "../../components/SamTrail";

// Sept 4, 2026 — display names for the Home settings panel's background
// picker (added alongside the gear-icon settings window). Keyed by the same
// paths HOME_BACKGROUNDS holds so the picker always matches the real list;
// a background added there without an entry here just shows a plain
// fallback label instead of breaking.
const HOME_BACKGROUND_LABELS = {
  "/student/hub_background.jpg": "Main Deck",
  "/student/hub_background_library.jpg": "Library",
  "/student/hub_background_bridge.jpg": "The Bridge",
  "/student/hub_background_mess_hall.jpg": "Mess Hall",
  "/student/hub_background_observatory.jpg": "Observatory",
  "/student/hub_background_work_room.jpg": "Work Room",
};

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

// Bright per-subject outline on the mission cards so a student can tell
// what subject an assignment is at a glance, without reading the standard
// code — Emily's request (Aug 27). Cases without a recognized subject (or
// with subject not yet selected by the data layer) fall back to the same
// soft blue ring the cards originally shipped with, so nothing looks
// broken if a new subject shows up before it has a color here.
const SUBJECT_RING_COLORS = {
  "Science": "#39D97A",
  "Social Studies": "#FFDD40",
};
const DEFAULT_RING_COLOR = "#8FA4FF";

function subjectRingColor(subject) {
  return SUBJECT_RING_COLORS[subject] || DEFAULT_RING_COLOR;
}

// Home is now the "hub" — a single full-viewport sci-fi stage (spaceship
// interior background) with the Active Mission + Up Next centered on it,
// and three glowing orb "portals" standing in for the old sidebar's nav
// links. Everything here is absolutely positioned against a fixed-height
// stage (rather than the old scrolling flex layout) on purpose, so the
// portals always line up with the glowing floor rings baked into the
// background art, and so the whole thing fits on one screen with no
// scrolling — that was the point of the redesign.
export default function HomeClient({ student, studentClass, assignments, missionsCompleted, badgeTiers, homeBackground, shoutout, earnedWorldBackgrounds }) {
  const router = useRouter();
  const [samOpen, setSamOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notif, setNotif] = useState(null);

  // Sept 4, 2026 — Teacher-facing S.A.M. expansion, Feature B: an encouraging
  // note a teacher sent "as S.A.M." from the Rewards modal. page.js only
  // ever hands this down when there's an unseen one, so its mere presence is
  // the signal to show it — dismissing marks it seen server-side so it never
  // shows again.
  const [shoutoutVisible, setShoutoutVisible] = useState(!!shoutout);
  const [dismissingShoutout, setDismissingShoutout] = useState(false);

  async function handleDismissShoutout() {
    if (dismissingShoutout || !shoutout) return;
    setDismissingShoutout(true);
    setShoutoutVisible(false);
    try {
      await fetch("/api/student/mark-shoutout-seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shoutoutId: shoutout.id }),
      });
    } catch (e) {
      // Best-effort — if this fails the note just may reappear next login,
      // which is a far better failure mode than blocking the dismiss.
    } finally {
      setDismissingShoutout(false);
    }
  }

  // Sept 4, 2026 — the background actually shown, starting from whatever
  // page.js resolved (the student's saved choice, or this session's random
  // pick). Kept in its own state so picking a new one in the settings panel
  // updates the screen immediately, without a full page reload.
  const [currentBg, setCurrentBg] = useState(homeBackground);
  const [bgSaving, setBgSaving] = useState(false);

  // Sept 4, 2026 — first real piece of the S.A.M. expansion: which skin is
  // equipped (drives every SamIcon on this page and, once page.js's props
  // reach an activity, everywhere else too) and the student's own nickname
  // for S.A.M., if they've set one. Same optimistic-save shape as the
  // background picker above.
  const [samSkinKey, setSamSkinKey] = useState(student.equipped_sam_skin || DEFAULT_SAM_SKIN);
  const [samSkinSaving, setSamSkinSaving] = useState(false);
  const [samNickname, setSamNickname] = useState(student.sam_nickname || "");
  const [nicknameDraft, setNicknameDraft] = useState(student.sam_nickname || "");
  const [nicknameSaving, setNicknameSaving] = useState(false);
  const samLabel = samNickname || "S.A.M.";

  // Sept 5, 2026 — Galaxy Hub world-reward-station work: which world's
  // S.A.M. trail is equipped (null = none) and which world backgrounds
  // this student has actually earned (read that world's story — see
  // app/gear-locker/world/[planetKey]). Same optimistic-save shape as the
  // skin/background pickers above. Trail colors come straight from
  // lib/worldStories.js — a trail is just a 3-hex-color palette, no image
  // asset, so there's nothing else to fetch for it.
  const [equippedTrail, setEquippedTrail] = useState(student.equipped_world_trail || null);
  const [trailSaving, setTrailSaving] = useState(false);
  const equippedTrailColors = equippedTrail ? getWorldStory(equippedTrail)?.trailColors : null;

  async function handlePickWorldTrail(planetKey) {
    if (planetKey === equippedTrail || trailSaving) return;
    const previous = equippedTrail;
    setEquippedTrail(planetKey);
    setTrailSaving(true);
    try {
      const res = await fetch("/api/student/set-world-trail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planetKey }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch (e) {
      setEquippedTrail(previous);
    } finally {
      setTrailSaving(false);
    }
  }

  async function handlePickEarnedBackground(planetKey, imagePath) {
    if (imagePath === currentBg || bgSaving) return;
    const previous = currentBg;
    setCurrentBg(imagePath);
    setBgSaving(true);
    try {
      const res = await fetch("/api/student/set-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worldKey: planetKey }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch (e) {
      setCurrentBg(previous);
    } finally {
      setBgSaving(false);
    }
  }

  // Added Sept 1, 2026 — Home is the hub every student lands on and the one
  // real nav screen that doesn't render the shared BackToHubButton (see that
  // file for the matching Log Out pill added there), so it needs its own
  // way to log out rather than relying on it existing somewhere else.
  async function handleLogout() {
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  // Sept 4, 2026 — saves a permanent background choice from the new
  // settings panel (POST /api/student/set-background). Applied optimistically
  // so the screen updates right away; reverted if the save actually fails,
  // so the picker never shows a choice that didn't stick.
  async function handlePickBackground(path) {
    if (path === currentBg || bgSaving) return;
    const previous = currentBg;
    setCurrentBg(path);
    setBgSaving(true);
    try {
      const res = await fetch("/api/student/set-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ background: path }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch (e) {
      setCurrentBg(previous);
    } finally {
      setBgSaving(false);
    }
  }

  // Sept 4, 2026 — equips a S.A.M. skin the student has actually unlocked.
  // The picker UI below already hides the click for locked skins, but this
  // still handles a failed save the same optimistic-then-revert way as
  // handlePickBackground — including the case where the server rejects it
  // (e.g. a stale crystal_points count made something look unlocked that
  // isn't really, server-side, quite yet).
  async function handlePickSamSkin(skinKey, unlocked) {
    if (!unlocked || skinKey === samSkinKey || samSkinSaving) return;
    const previous = samSkinKey;
    setSamSkinKey(skinKey);
    setSamSkinSaving(true);
    try {
      const res = await fetch("/api/student/set-sam-skin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skin: skinKey }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch (e) {
      setSamSkinKey(previous);
    } finally {
      setSamSkinSaving(false);
    }
  }

  // Sept 4, 2026 — saves a custom nickname for S.A.M. Trims and caps length
  // client-side too (the route re-checks), and clearing the field back to
  // empty is a real, supported way to go back to calling it "S.A.M."
  async function handleSaveNickname() {
    const trimmed = nicknameDraft.trim().slice(0, 20);
    if (trimmed === samNickname || nicknameSaving) return;
    const previous = samNickname;
    setSamNickname(trimmed);
    setNicknameSaving(true);
    try {
      const res = await fetch("/api/student/set-sam-nickname", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: trimmed }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch (e) {
      setSamNickname(previous);
      setNicknameDraft(previous);
    } finally {
      setNicknameSaving(false);
    }
  }

  useEffect(() => {
    fetch("/api/student/notifications")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (data) setNotif(data); })
      .catch(() => {});
  }, []);

  const activeMission = assignments[0] || null;
  const upNext = assignments.slice(1, 3);

  // Just enough badge logic to show the student's CURRENT tier icon next to
  // their name in the header tile (Aug 27) — the full badge collection with
  // earned/locked state for every tier lives on its own /badges page.
  const tiers = badgeTiers && badgeTiers.length > 0 ? badgeTiers : [];
  const currentTierIndex = [...tiers].reverse().findIndex((t) => student.crystal_points >= t.threshold);
  const currentTier = tiers.length > 0 ? (currentTierIndex >= 0 ? tiers[tiers.length - 1 - currentTierIndex] : tiers[0]) : null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        // Sept 4, 2026: one of 6 backgrounds, picked at random per login by
        // student-login/route.js and passed down through page.js — see
        // lib/homeBackgrounds.js. Falls back to the original single image
        // if the prop is ever missing (shouldn't happen, page.js always
        // resolves one, but a safe default costs nothing).
        backgroundImage: `url(${currentBg || "/student/hub_background.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        @keyframes hub-floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .hub-portal { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; border: none; background: none; font-family: inherit; width: 130px; }
        .hub-orb-wrap { position: relative; width: 104px; height: 104px; transition: transform 220ms ease, filter 220ms ease; filter: drop-shadow(0 6px 14px rgba(0,0,0,.35)); }
        .hub-orb-wrap img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .hub-portal:hover .hub-orb-wrap { transform: scale(1.1) translateY(-4px); }
        .hub-portal--missions:hover .hub-orb-wrap { filter: drop-shadow(0 10px 22px rgba(0,0,0,.4)) drop-shadow(0 0 22px #7B5DFF); }
        .hub-portal--progress:hover .hub-orb-wrap { filter: drop-shadow(0 10px 22px rgba(0,0,0,.4)) drop-shadow(0 0 22px #00C2C7); }
        .hub-portal--crystal:hover .hub-orb-wrap { filter: drop-shadow(0 10px 22px rgba(0,0,0,.4)) drop-shadow(0 0 22px #FFC44D); }
      `}</style>

      {/* Header — a compact, more-square stat tile in the top-left corner
          (Aug 27) rather than the old full-width bar. Welcome + name +
          current badge on one line, class underneath, then streak / missions
          completed / crystal points stacked as simple rows below — all the
          identity + stats info consolidated into one tile instead of spread
          across a wide bar with pills floating on the right. */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 20,
          width: 232,
          background: "rgba(255,255,255,.68)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 20,
          padding: "16px 18px",
          boxShadow: "0 4px 16px rgba(0,0,0,.1)",
          zIndex: 5,
        }}
      >
        {/* Sept 4, 2026 — settings gear, top-right corner of the header
            tile per Emily's ask ("the gear symbol link in their box in the
            top left"). Opens the personalization panel below rather than
            navigating anywhere, same toggle pattern as the S.A.M. button. */}
        <button
          type="button"
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="gc-btn"
          title="Settings"
          style={{
            position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: "50%",
            background: "rgba(255,255,255,.85)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,.12)", padding: 0,
          }}
        >
          ⚙️
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, paddingRight: 22 }}>
          {currentTier && (
            <img
              src={`/badges/transparent/${currentTier.tier_key}.png`}
              alt={currentTier.label}
              title={currentTier.label}
              // Falls back to the original (square, light-gray-background)
              // badge art if a tier ever shows up without a matching
              // background-removed version in /badges/transparent/ — e.g. a
              // brand-new tier a teacher adds later. Everyday case is the
              // transparent version loads fine and this never fires.
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = currentTier.image_path; }}
              style={{ width: 40, height: 40, objectFit: "contain", flexShrink: 0 }}
            />
          )}
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16.5, fontWeight: 700, margin: 0, color: COLORS.textDark, lineHeight: 1.25 }}>
            Welcome back, {student.first_name}!
          </h1>
        </div>
        {studentClass?.name && (
          <p style={{ margin: "0 0 10px 0", color: COLORS.textMuted, fontSize: 12 }}>{studentClass.name}</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {student.streak_days > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 700, fontSize: 12.5, color: COLORS.textDark }}>
              <span style={{ fontSize: 14 }}>🔥</span> {student.streak_days} day{student.streak_days === 1 ? "" : "s"}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 700, fontSize: 12.5, color: COLORS.textDark }}>
            <span style={{ fontSize: 14 }}>🎯</span> {missionsCompleted} mission{missionsCompleted === 1 ? "" : "s"} completed
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 700, fontSize: 12.5, color: COLORS.textDark }}>
            <img src="/icons/crystal_points_gold.png" alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
            {student.crystal_points}
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="gc-btn"
          style={{ marginTop: 10, background: "none", color: COLORS.textMuted, fontSize: 11.5, fontWeight: 600, padding: 0, textDecoration: "underline" }}
        >
          Log Out
        </button>
      </div>

      {/* Sept 4, 2026 — Settings panel, opened from the header tile's gear
          icon. Holds the background picker (6 options, HOME_BACKGROUNDS),
          the S.A.M. skin picker + nickname field (first real UI for the
          S.A.M. expansion — see SAM_Companion_Concept_v1.md), and a second,
          more visible Log Out button — Emily reported the small text-link
          Log Out felt "lost"; it's actually still there (see above), just
          easy to miss, so this adds an obvious duplicate rather than
          replacing it. Neither picker is gated by Galaxy Hub unlocks yet —
          S.A.M. skins gate on crystal_points directly (server-verified in
          set-sam-skin/route.js), same mechanism as planets/badges, but a
          real background-to-planet mapping and a S.A.M.-specific tie-in
          both still need deciding with Emily first, the same way the
          portal-name mapping was, rather than guessed at here. */}
      {settingsOpen && (
        <div
          style={{
            position: "absolute", top: 18, left: 262, width: 296,
            background: COLORS.white, borderRadius: 18, boxShadow: "0 10px 28px rgba(0,0,0,.22)",
            padding: 18, zIndex: 6,
          }}
        >
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14.5, margin: "0 0 12px 0", color: COLORS.textDark }}>
            ⚙️ Settings
          </p>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: "uppercase", color: COLORS.textMuted, margin: "0 0 8px 0" }}>
            Choose your background
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
            {HOME_BACKGROUNDS.map((path) => {
              const selected = path === currentBg;
              return (
                <button
                  key={path}
                  type="button"
                  onClick={() => handlePickBackground(path)}
                  className="gc-btn"
                  style={{
                    position: "relative", padding: 0, borderRadius: 10, overflow: "hidden",
                    border: selected ? `2.5px solid ${COLORS.violet}` : "2.5px solid transparent",
                    background: "none", cursor: bgSaving ? "default" : "pointer", opacity: bgSaving && !selected ? 0.6 : 1,
                  }}
                >
                  <img src={path} alt={HOME_BACKGROUND_LABELS[path] || "Background"} style={{ width: "100%", height: 50, objectFit: "cover", display: "block" }} />
                  <span style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, fontSize: 8.5, fontWeight: 700,
                    color: COLORS.white, background: "rgba(20,26,50,.6)", padding: "2px 0", textAlign: "center",
                  }}>
                    {HOME_BACKGROUND_LABELS[path] || "Background"}
                  </span>
                  {selected && (
                    <span style={{ position: "absolute", top: 2, right: 3, fontSize: 11, textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sept 5, 2026 — earned world backgrounds, its own separate
              section per Emily's ask ("needs to be its own separate
              section and doesn't need to show the student anything until
              they have unlocked a background") — this whole block simply
              doesn't render until earnedWorldBackgrounds has at least one
              entry, unlike the always-visible free grid above. */}
          {earnedWorldBackgrounds && earnedWorldBackgrounds.length > 0 && (
            <>
              <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: "uppercase", color: COLORS.textMuted, margin: "0 0 8px 0" }}>
                🌟 Earned Backgrounds
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                {earnedWorldBackgrounds.map((world) => {
                  const selected = world.image_path === currentBg;
                  return (
                    <button
                      key={world.planet_key}
                      type="button"
                      onClick={() => handlePickEarnedBackground(world.planet_key, world.image_path)}
                      className="gc-btn"
                      style={{
                        position: "relative", padding: 0, borderRadius: 10, overflow: "hidden",
                        border: selected ? `2.5px solid ${COLORS.violet}` : "2.5px solid transparent",
                        background: "none", cursor: bgSaving ? "default" : "pointer", opacity: bgSaving && !selected ? 0.6 : 1,
                      }}
                    >
                      <img src={world.image_path} alt={world.name} style={{ width: "100%", height: 50, objectFit: "cover", display: "block" }} />
                      <span style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, fontSize: 8.5, fontWeight: 700,
                        color: COLORS.white, background: "rgba(20,26,50,.6)", padding: "2px 0", textAlign: "center",
                      }}>
                        {world.name}
                      </span>
                      {selected && (
                        <span style={{ position: "absolute", top: 2, right: 3, fontSize: 11, textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: "uppercase", color: COLORS.textMuted, margin: "0 0 8px 0" }}>
            Customize S.A.M.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
            {SAM_SKINS.map((skin) => {
              // Sept 4, 2026 — a skin is unlocked by crystal_points OR by a
              // teacher granting it directly from the Rewards modal's Skin
              // tab (Feature B) — matches the server-side check in
              // set-sam-skin/route.js.
              const teacherUnlocked = (student.teacher_unlocked_sam_skins || []).includes(skin.key);
              const unlocked = student.crystal_points >= skin.threshold || teacherUnlocked;
              const selected = skin.key === samSkinKey;
              return (
                <button
                  key={skin.key}
                  type="button"
                  onClick={() => handlePickSamSkin(skin.key, unlocked)}
                  className="gc-btn"
                  style={{
                    position: "relative", padding: "8px 4px 6px", borderRadius: 10,
                    border: selected ? `2.5px solid ${COLORS.violet}` : "2.5px solid transparent",
                    background: unlocked ? COLORS.violetSoft : "rgba(31,42,68,.05)",
                    cursor: unlocked && !samSkinSaving ? "pointer" : "default",
                    opacity: !unlocked ? 0.8 : (samSkinSaving && !selected ? 0.6 : 1),
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  }}
                >
                  <SamIcon skinKey={skin.key} size={34} alt={skin.name} />
                  <span style={{ fontSize: 8.5, fontWeight: 700, color: COLORS.textDark, textAlign: "center" }}>
                    {skin.name.replace(" S.A.M.", "")}
                  </span>
                  {unlocked ? (
                    selected && <span style={{ position: "absolute", top: 2, right: 3, fontSize: 11 }}>✓</span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 2, background: "rgba(31,42,68,.1)", color: COLORS.textMuted, borderRadius: 999, padding: "1px 6px", fontSize: 8, fontWeight: 700 }}>
                      🔒 💎{skin.threshold}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sept 5, 2026 — world trails, earned by reading a world's story
              at its reward station. Same "don't render until there's
              something to show" rule as the earned-backgrounds section
              above. */}
          {earnedWorldBackgrounds && earnedWorldBackgrounds.length > 0 && (
            <>
              <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: "uppercase", color: COLORS.textMuted, margin: "0 0 8px 0" }}>
                S.A.M. Trails
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                <button
                  type="button"
                  onClick={() => handlePickWorldTrail(null)}
                  disabled={trailSaving}
                  className="gc-btn"
                  style={{
                    border: !equippedTrail ? `2px solid ${COLORS.violet}` : "2px solid transparent",
                    background: COLORS.violetSoft, borderRadius: 999, padding: "6px 12px",
                    fontSize: 11, fontWeight: 700, color: COLORS.textDark,
                  }}
                >
                  None
                </button>
                {earnedWorldBackgrounds.map((world) => {
                  const storyData = getWorldStory(world.planet_key);
                  if (!storyData) return null;
                  const selected = world.planet_key === equippedTrail;
                  return (
                    <button
                      key={world.planet_key}
                      type="button"
                      onClick={() => handlePickWorldTrail(world.planet_key)}
                      disabled={trailSaving}
                      className="gc-btn"
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        border: selected ? `2px solid ${COLORS.violet}` : "2px solid transparent",
                        background: COLORS.violetSoft, borderRadius: 999, padding: "6px 12px",
                        fontSize: 11, fontWeight: 700, color: COLORS.textDark,
                      }}
                    >
                      <span style={{ display: "flex", gap: 2 }}>
                        {storyData.trailColors.slice(0, 3).map((c, i) => (
                          <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block" }} />
                        ))}
                      </span>
                      {world.name}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: "uppercase", color: COLORS.textMuted, margin: "0 0 6px 0" }}>
            Give S.A.M. a nickname
          </p>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            <input
              type="text"
              value={nicknameDraft}
              onChange={(e) => setNicknameDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSaveNickname(); }}
              placeholder="S.A.M."
              maxLength={20}
              style={{ flex: 1, minWidth: 0, border: `1.5px solid ${COLORS.violetSoft}`, borderRadius: 8, padding: "7px 9px", fontSize: 12.5, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}
            />
            <button
              type="button"
              onClick={handleSaveNickname}
              disabled={nicknameSaving || nicknameDraft.trim() === samNickname}
              className="gc-btn"
              style={{
                background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 8,
                padding: "7px 12px", fontWeight: 700, fontSize: 12,
                opacity: nicknameSaving || nicknameDraft.trim() === samNickname ? 0.6 : 1,
                cursor: nicknameSaving ? "default" : "pointer",
              }}
            >
              Save
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="gc-btn"
            style={{
              width: "100%", background: "none", border: `1.5px solid ${COLORS.textMuted}`, borderRadius: 10,
              color: COLORS.textDark, fontWeight: 700, fontSize: 12.5, padding: "9px 0",
            }}
          >
            Log Out
          </button>
        </div>
      )}

      {/* Centered column: notification (if any) + Active Mission + Up Next */}
      <div
        style={{
          position: "absolute",
          top: 92,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(660px, 54%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 3,
        }}
      >
        {notif && notif.count > 0 && (
          <button
            type="button"
            onClick={() => router.push("/progress")}
            className="gc-btn"
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
              background: "rgba(255,244,229,.92)", border: `1.5px solid ${COLORS.gold}`, borderRadius: 14,
              padding: "10px 14px", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>{notif.revisionCount > 0 ? "🔁" : "🌟"}</span>
            <span style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: "#8A5A00", lineHeight: 1.35 }}>
              {notif.revisionCount > 0 && notif.newGradeCount > 0
                ? `${notif.revisionCount} mission${notif.revisionCount === 1 ? "" : "s"} need${notif.revisionCount === 1 ? "s" : ""} another try, and you have ${notif.newGradeCount} new grade${notif.newGradeCount === 1 ? "" : "s"} waiting!`
                : notif.revisionCount > 0
                ? `${notif.revisionCount} mission${notif.revisionCount === 1 ? "" : "s"} need${notif.revisionCount === 1 ? "s" : ""} another try — see what your teacher said.`
                : `You have ${notif.newGradeCount} new grade${notif.newGradeCount === 1 ? "" : "s"} waiting in My Progress!`}
            </span>
            <span style={{ color: "#8A5A00", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>View →</span>
          </button>
        )}

        {activeMission ? (
          <div
            style={{
              position: "relative", width: "100%", background: "rgba(20,26,50,.42)",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 18,
              padding: "16px 18px",
              boxShadow: `0 0 0 2.5px ${subjectRingColor(activeMission.cases?.subject)}, 0 0 22px ${subjectRingColor(activeMission.cases?.subject)}77, 0 10px 30px rgba(0,10,40,.35)`,
              animation: "hub-floaty 5s ease-in-out infinite",
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 9, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", background: "rgba(123,93,255,.35)", color: "#E4DBFF", fontSize: 10, fontWeight: 700, letterSpacing: .4, padding: "4px 11px", borderRadius: 999 }}>
                YOUR ACTIVE MISSION · {activeMission.cases?.engine === "fact_check_desk" ? "SIGNAL CHECK" : activeMission.cases?.engine === "mission_map" ? "MISSION MAP" : "GROUP CHAT"}
              </span>
              {activeMission.revisionRequested && (
                <span style={{ display: "inline-flex", background: "rgba(255,196,77,.3)", color: "#FFE7B0", fontSize: 10, fontWeight: 700, letterSpacing: .4, padding: "4px 11px", borderRadius: 999 }}>
                  🔁 Revision requested
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
              <div style={{ width: 68, height: 68, borderRadius: 13, flexShrink: 0, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,.25)" }}>
                <img src={caseImagePath(activeMission.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15.5, margin: "0 0 3px 0", color: COLORS.white }}>{activeMission.cases?.title}</p>
                <p style={{ fontSize: 11.5, color: "#C9D2EE", margin: "0 0 9px 0" }}>
                  {activeMission.case_standard}{activeMission.due_date ? ` · Due ${activeMission.due_date}` : ""}
                </p>
                <button onClick={() => router.push(`/activity/${activeMission.id}`)} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12 }}>
                  Continue Mission →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", background: "rgba(20,26,50,.42)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 18, padding: "22px 18px", textAlign: "center", color: "#C9D2EE", fontSize: 13 }}>
            No missions assigned yet — check back once your teacher assigns one!
          </div>
        )}

        {upNext.length > 0 && (
          <>
            <span style={{ alignSelf: "flex-start", fontSize: 10.5, fontWeight: 700, letterSpacing: .4, textTransform: "uppercase", color: "#EDEBFF", textShadow: "0 1px 6px rgba(0,0,0,.5)", marginLeft: 4 }}>
              Up Next
            </span>
            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              {upNext.map((a) => {
                const ring = subjectRingColor(a.cases?.subject);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => router.push(`/activity/${a.id}`)}
                    className="gc-btn"
                    style={{
                      position: "relative", flex: 1, height: 62, borderRadius: 13, overflow: "hidden",
                      background: "rgba(20,26,50,.42)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                      boxShadow: `0 0 0 2px ${ring}, 0 0 14px ${ring}66, 0 6px 18px rgba(0,10,40,.3)`,
                      display: "flex", alignItems: "center", gap: 10, padding: "0 12px", border: "none", textAlign: "left", font: "inherit",
                    }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: ring, flexShrink: 0, boxShadow: `0 0 8px ${ring}` }} />
                    <span style={{ color: COLORS.white, minWidth: 0 }}>
                      <span style={{ display: "block", fontWeight: 700, fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {a.cases?.title}{a.revisionRequested ? " 🔁" : ""}
                      </span>
                      <span style={{ display: "block", fontSize: 10.5, color: "#C9D2EE" }}>{a.case_standard}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Portals — the three "screens" a student can navigate to */}
      <div style={{ position: "absolute", bottom: "6%", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 64, zIndex: 4 }}>
        <button type="button" className="hub-portal hub-portal--missions" onClick={() => router.push("/missions")}>
          <div className="hub-orb-wrap"><img src="/student/orb_missions.png" alt="" /></div>
          <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.white, background: "rgba(20,26,50,.55)", padding: "4px 14px", borderRadius: 999, backdropFilter: "blur(6px)" }}>My Missions</span>
        </button>
        <button type="button" className="hub-portal hub-portal--progress" onClick={() => router.push("/progress")}>
          <div className="hub-orb-wrap"><img src="/student/orb_progress.png" alt="" /></div>
          <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.white, background: "rgba(20,26,50,.55)", padding: "4px 14px", borderRadius: 999, backdropFilter: "blur(6px)" }}>My Progress</span>
        </button>
        <button type="button" className="hub-portal hub-portal--crystal" onClick={() => router.push("/gear-locker")}>
          <div className="hub-orb-wrap"><img src="/student/orb_crystal.png" alt="" /></div>
          <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.white, background: "rgba(20,26,50,.55)", padding: "4px 14px", borderRadius: 999, backdropFilter: "blur(6px)" }}>Galaxy Hub</span>
        </button>
      </div>

      {/* Sept 4, 2026 — grown from a 58px corner button to a real 150px
          "companion" presence (SamStage), per Emily's flag that S.A.M. was
          too small anywhere for the new animation packs to ever read. Same
          corner spot, same click-to-toggle-tooltip behavior — just big
          enough to actually be seen, with a soft shadow "platform"
          grounding it instead of floating at an arbitrary size. */}
      <SamStage
        skinKey={samSkinKey}
        alt={samLabel}
        size={150}
        onClick={() => setSamOpen(!samOpen)}
        style={{ position: "absolute", right: 10, bottom: 10, zIndex: 5 }}
      />

      {/* Sept 5, 2026 — World Reward Station cosmetic: a mouse-following
          sparkle trail earned by reading a world's "learn about this
          world" story (see lib/worldStories.js + set-world-trail route).
          Same code-only Bloom Trail mechanic Glow Garden's old activity
          used, just recolored per equipped world — no new art needed. */}
      <SamTrail colors={equippedTrailColors} active={Boolean(equippedTrail)} />

      {samOpen && (
        <div style={{ position: "absolute", right: 26, bottom: 186, width: 240, background: COLORS.white, borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,.2)", padding: 16, zIndex: 5 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, margin: "0 0 4px 0" }}>
            {samLabel} <span style={{ color: COLORS.teal }}>· ClearCenters Assistant for Missions</span>
          </p>
          <p style={{ fontSize: 12.5, color: COLORS.textDark, margin: 0, lineHeight: 1.45 }}>
            Click me anytime you're working on a mission and need a hint!
          </p>
        </div>
      )}

      {shoutout && shoutoutVisible && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }}>
          <div style={{ background: COLORS.white, borderRadius: 20, width: "min(380px, 100%)", padding: 26, boxShadow: "0 20px 50px rgba(0,0,0,.35)", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, margin: "0 auto 14px" }}>
              <SamIcon skinKey={samSkinKey} alt={samLabel} size="100%" />
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.textDark, margin: "0 0 10px 0" }}>
              A note from {samLabel}!
            </p>
            <p style={{ fontSize: 14, color: COLORS.textDark, lineHeight: 1.55, margin: "0 0 20px 0" }}>
              {shoutout.message}
            </p>
            <button
              type="button"
              onClick={handleDismissShoutout}
              className="gc-btn"
              style={{ background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`, color: COLORS.white, borderRadius: 999, padding: "11px 28px", fontWeight: 700, fontSize: 14 }}
            >
              Thanks, {samLabel}!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
