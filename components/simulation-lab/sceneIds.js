// Which scene ids exist. Kept separate from scenes/index.js so server code
// (page routing, the submit route) can ask "does this case use the scene
// flow?" without importing any browser drawing code.
//
// Keep in sync with scenes/index.js. Every live Simulation Lab case must
// name one of these in its public `scene` block — there is no other
// Simulation Lab layout (ClearCenters_STATE.md rule 22).
export const SCENE_IDS = ["balloon", "ramp", "boat", "bulb", "motor", "ice", "magnet", "dissolve", "friction", "shadow"];

export function hasSimLabScene(publicCase) {
  return !!(publicCase && publicCase.scene && SCENE_IDS.includes(publicCase.scene.id));
}
