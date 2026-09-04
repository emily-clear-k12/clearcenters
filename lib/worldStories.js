// Sept 5, 2026 — per-world "learn about this world" lore, plus the S.A.M.
// trail-color palette and game info each world's reward-station page draws
// from (see app/gear-locker/world/[planetKey] and
// SAM_Companion_Concept_v1.md). A planet_key with no entry here just
// renders a "coming soon" state on its reward-station page instead of
// erroring — that's how the other 5 worlds behave until they get their own
// real story and game like Lumara did.
//
// trailColors is the ENTIRE art requirement for a world's S.A.M. trail
// cosmetic — the trail itself (components/SamTrail.js) is a pure JS/CSS
// mouse-following sparkle effect with no image asset at all, generalized
// from Glow Garden's original one-off "Bloom Trail." Differentiating a
// trail per world is a 3-hex-color swap here, nothing more — no new art,
// no trip back to an image generator, per Emily's question about exactly
// this.
export const WORLD_STORIES = {
  glow_garden: {
    title: "Lumara: The Glowing Canopy",
    paragraphs: [
      "MISSION LOG — LUMARA TRANSMISSION RECEIVED \u{1F4E1}",
      "Cadet, welcome to Lumara — the greenest, glowiest, bounciest world in the whole galaxy. Every leaf here hums with its own soft light, like the entire jungle forgot to turn off its nightlight.",
      "Local legend says a crew of mischievous leaf-sprites hides glowing seeds all across the canopy, and the only way to find them is to bounce from leaf to leaf without ever touching the ground. (S.A.M. tried it once. S.A.M. does not recommend touching the ground.)",
      "Explore the canopy, listen for the hum, and see how high you can climb. Lumara's been waiting a long time for a cadet brave enough to visit — try not to keep it waiting any longer!",
    ],
    trailColors: ["#3FD08A", "#FFC44D", "#7CFFC4"],
    game: {
      key: "canopy_bounce",
      name: "Lumara: Canopy Bounce",
      description: "Spring from leaf to leaf, collect glowing seeds, and climb as high as you can before the 45-second timer runs out.",
      path: "/games/lumara-canopy-bounce/index.html",
    },
  },
};

export function getWorldStory(planetKey) {
  return WORLD_STORIES[planetKey] || null;
}
