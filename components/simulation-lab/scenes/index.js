// Scene registry. A case opts in to the scene-based Simulation Lab by adding a
// `scene: { id: "<one of these keys>", ... }` block to its PUBLIC case file.
// The ids themselves live in ../sceneIds.js (a plain list the server can
// import without pulling in any drawing code).
import { balloonScene } from "./balloon";
import { rampScene } from "./ramp";
import { boatScene } from "./boat";
import { bulbScene } from "./bulb";
import { motorScene } from "./motor";
import { iceScene } from "./ice";
import { magnetScene } from "./magnet";
import { dissolveScene } from "./dissolve";
import { frictionScene } from "./friction";
import { shadowScene } from "./shadow";

const SCENES = {
  [balloonScene.id]: balloonScene,
  [rampScene.id]: rampScene,
  [boatScene.id]: boatScene,
  [bulbScene.id]: bulbScene,
  [motorScene.id]: motorScene,
  [iceScene.id]: iceScene,
  [magnetScene.id]: magnetScene,
  [dissolveScene.id]: dissolveScene,
  [frictionScene.id]: frictionScene,
  [shadowScene.id]: shadowScene,
};

export function getScene(id) {
  return SCENES[id] || null;
}
