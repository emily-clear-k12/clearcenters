// Scene registry. A case opts in to the scene-based Simulation Lab by adding a
// `scene: { id: "<one of these keys>", ... }` block to its PUBLIC case file.
// The ids themselves live in ../sceneIds.js (a plain list the server can
// import without pulling in any drawing code).
import { balloonScene } from "./balloon";
import { rampScene } from "./ramp";

const SCENES = {
  [balloonScene.id]: balloonScene,
  [rampScene.id]: rampScene,
};

export function getScene(id) {
  return SCENES[id] || null;
}
