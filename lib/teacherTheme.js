// Sept 13, 2026 — single source of truth for the teacher console pages'
// palette. Every page being moved over from the old sidebar+light-cream
// look should import from here instead of declaring its own local
// COLORS — the old pattern (every page.js had its own hand-typed COLORS
// object) is exactly how the app ended up with slightly different
// violets/teals floating around before this file existed.
//
// Revised same day: the first pass at this (My Classes) used a flat dark
// navy "console" background with no art — Emily doesn't want that ("I
// don't like dark mode"). The real pattern, same as every student hub page
// (public/student/*_hub_bg.jpg) and the teacher Overview redesign, is a
// bright white/lavender sci-fi interior BACKGROUND IMAGE per page, with
// glass panels tinted a light violet to match the room's own ambient
// light — never a flat dark fill standing in for real art.
export const COLORS = {
  // Brand accents — unchanged by the light/dark pivot, these are used the
  // same way on either background.
  violet: "#8C52F2",
  teal: "#6FD8F5",
  aqua: "#4DD6FF",
  gold: "#FFC44D",
  success: "#22C55E",
  warning: "#FF9F43",
  danger: "#E4574C",
  info: "#3D84F5",
  magenta: "#D65DE0",
  // Mission Control's decorative accent (Sept 13, later same-day fix).
  // Mission Control originally reused `warning` (the real orange "needs
  // review" alert color) as its own brand accent — meaning the whole My
  // Classes page was saturated orange AND the genuine "needs review" signal
  // was that same orange, so the real alert didn't stand out and the page
  // read as "off-putting" per Emily's feedback. `pink` is Mission Control's
  // own color now, used only for decoration (HUD dot, buttons, panel
  // borders); `warning` stays reserved purely for real urgency signals.
  pink: "#FF6FA0",

  // Light-theme surface tokens.
  white: "#FFFFFF",
  canvas: "#F3EFFC", // fallback wash behind a page's art (loading state, or no art yet)
  textDark: "#2A2350", // deep violet-charcoal — reads as "ink" against the bright art, not flat black
  textMuted: "#6B6491",
  border: "rgba(140,82,242,.22)",
};

// Each Overview landmark carries its own accent (see the `accent` prop on
// every <Landmark> in app/teacher/page.js) — this is that same mapping, so
// a destination page can pull "my own" accent color rather than re-typing
// it, and so the two stay in sync if a landmark's color is ever retuned.
// Keyed by the page's own route.
export const PAGE_ACCENTS = {
  "/teacher/assign": COLORS.pink, // Mission Control (see `pink` note above)
  "/teacher/reports": COLORS.aqua, // Observatory
  "/teacher/progress": COLORS.aqua, // Observatory (same destination family)
  // Grading isn't one of the 5 Overview landmarks on its own, but it's the
  // same "checking on how students are doing" family as Progress/Reports,
  // so it shares their aqua Observatory color rather than inventing a 6th.
  "/teacher/grade": COLORS.aqua,
  "/teacher/messages": COLORS.magenta, // Messages
  "/teacher/resources": COLORS.success, // Resources
  "/teacher/badges": COLORS.success, // Resources (same destination family)
  "/teacher/settings": COLORS.teal, // S.A.M.
};

// Each reskinned page's own background art (Emily-provided, same 1672×941
// canvas as the Overview background so it can use the exact same
// full-bleed "cover" math). Add to this as more pages get their art —
// PAGE_BACKGROUNDS[route] || null lets a page fall back to the plain
// `canvas` wash below until its own art arrives.
export const PAGE_BACKGROUNDS = {
  "/teacher/assign": "/teacher/console/bg-platform-room.jpg",
  "/teacher/reports": "/teacher/console/bg-observatory.jpg",
  "/teacher/progress": "/teacher/console/bg-observatory.jpg",
  "/teacher/grade": "/teacher/console/bg-observatory.jpg",
  "/teacher/messages": "/teacher/console/bg-messages.jpg",
  // Challenge Library keeps its own dedicated art (Emily made this one
  // specifically for this page back on Aug 27, before the console-theme
  // pass existed) rather than reusing My Classes' bg-platform-room.jpg —
  // no reason to replace already-good custom art. Same Mission Control
  // family accent (pink) as its parent page, just its own background.
  "/teacher/assign/new": "/teacher/challenge_library_bg.jpg",
};

// Native pixel size of every console background — same convention as
// BG_ASPECT in app/teacher/page.js, so every reskinned page can reuse the
// exact same verified full-bleed-with-no-scroll technique (see that
// file's Scene comment for the full rationale): the canvas is always
// sized to at least 100% of its wrapper on both axes and center-cropped,
// so screen shape never distorts the art, and a min-height floor on the
// wrapper stops an unusually short-and-wide window from cropping into
// content instead of just decorative edges.
export const BG_ASPECT = "1672 / 941";

// The full-bleed background wrapper — goes around the scrollable content,
// NOT around individual panels. `overflow: hidden` is what makes the
// inner canvas's overflow (from minWidth/minHeight 100%) actually crop
// instead of pushing the page wider/taller.
export function sceneWrapperStyle(extra = {}) {
  return {
    position: "relative",
    overflow: "hidden",
    minHeight: "38vw",
    background: COLORS.canvas,
    ...extra,
  };
}

// The art itself — an absolutely-positioned canvas locked to BG_ASPECT,
// sized to cover its wrapper on whichever axis is tighter, and centered
// so any crop is symmetric. `imageUrl` may be null (no art yet for this
// page): renders just the canvas COLOR wash so layout/spacing still work
// before Emily's art for that page arrives.
export function sceneCanvasStyle(imageUrl) {
  return {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
    aspectRatio: BG_ASPECT,
    minWidth: "100%", minHeight: "100%", width: "auto", height: "auto",
    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
    backgroundSize: "100% 100%", backgroundPosition: "center",
    backgroundColor: COLORS.canvas,
  };
}

// Shared "glass panel" look for content floating over a page's background
// art — a light, softly violet-tinted translucent card (matching the
// room art's own lavender ambient light) rather than a flat white card
// with a hard edge. `accent` lets a panel pick up a page's own landmark
// color for its border/glow instead of a flat neutral one everywhere.
export function panelStyle(accent = COLORS.violet, extra = {}) {
  return {
    background: "rgba(247,244,255,.86)",
    border: `1.5px solid ${accent}55`,
    borderRadius: 16,
    boxShadow: `0 8px 28px rgba(80,60,150,.16), inset 0 0 0 1px rgba(255,255,255,.6)`,
    backdropFilter: "blur(6px)",
    color: COLORS.textDark,
    ...extra,
  };
}
