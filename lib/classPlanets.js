// Sept 13, 2026 — the 5 class-planet designs used on the teacher Overview
// "Orbit Map" dashboard (app/teacher/page.js). Same shape/spirit as
// lib/samSkins.js: one flat list, looked up by key, so every consumer (the
// dashboard itself, and the planet picker on Class Settings) shares one
// source of truth instead of each hardcoding its own array/index math.
//
// Unlike S.A.M.'s skins, these aren't gated by any unlock threshold — a
// teacher can assign any of the 5 to any class freely from Class Settings.
// `classes.planet_key` is nullable: when a class has no explicit pick yet,
// the dashboard falls back to assigning by that class's position in the
// list (see planetForClass below), which is exactly the behavior the page
// already had before this was pickable.
export const CLASS_PLANETS = [
  { key: "violet", name: "Violet Crystal", image: "/teacher/orbit/planet-violet-crystal.png", hue: { core: "#8C52F2", glow: "#B79BF7" } },
  { key: "teal", name: "Teal Ocean", image: "/teacher/orbit/planet-teal-ocean.png", hue: { core: "#3FC7D8", glow: "#8FE3EE" } },
  { key: "amber", name: "Amber Ember", image: "/teacher/orbit/planet-amber-ember.png", hue: { core: "#E8A23C", glow: "#F6C97F" } },
  { key: "rose", name: "Rose Nebula", image: "/teacher/orbit/planet-rose-nebula.png", hue: { core: "#E36BA0", glow: "#F3A8C6" } },
  { key: "emerald", name: "Emerald Aurora", image: "/teacher/orbit/planet-emerald-aurora.png", hue: { core: "#3FBE7A", glow: "#8EDFB0" } },
];

export function getClassPlanet(key) {
  return CLASS_PLANETS.find((p) => p.key === key) || null;
}

// The planet a given class should show: its own explicit pick if it has
// one, otherwise the same "assign by position" fallback the dashboard used
// before a picker existed, so classes without a pick don't all collapse to
// the same planet.
export function planetForClass(cls, index) {
  return getClassPlanet(cls && cls.planet_key) || CLASS_PLANETS[index % CLASS_PLANETS.length];
}
