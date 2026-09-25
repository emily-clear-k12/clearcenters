// Which scene ids exist. Kept separate from scenes/index.js so server code
// (page routing, the submit route) can ask "does this case use the scene
// flow?" without importing any browser drawing code.
//
// Keep in sync with scenes/index.js. A case whose public file has no
// `scene` block, or names an id not listed here, keeps the original
// console-style Simulation Lab (SimulationLabClient.js) exactly as before.
export const SCENE_IDS = ["balloon", "ramp"];

export function hasSimLabScene(publicCase) {
  return !!(publicCase && publicCase.scene && SCENE_IDS.includes(publicCase.scene.id));
}
