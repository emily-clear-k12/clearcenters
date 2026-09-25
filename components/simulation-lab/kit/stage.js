// Builds the layered SVG stage every scene draws into (1366 x 704 units,
// the area under the 64px top bar of the 1366 x 768 canvas).
//   static  scenery that never moves (floor, track, stands, notches)
//   under   ghost markers, prediction flag, gap band   (engine-owned)
//   actors  the moving experiment (balloon, cart, arm, particles)
//   over    landing pin, gap bracket, confetti          (engine-owned)
import { el, createAnimator } from "./core";

export function createStage(svg, { rm }) {
  svg.innerHTML = "";
  const defs = el("defs", {}, svg);
  defs.innerHTML = `<filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#4a3b8c" flood-opacity=".18"/></filter>`;
  const layers = {
    static: el("g", { class: "l-static" }, svg),
    under: el("g", { class: "l-under" }, svg),
    actors: el("g", { class: "l-actors" }, svg),
    over: el("g", { class: "l-over" }, svg),
  };
  const anim = createAnimator(rm);
  return {
    svg,
    defs,
    layers,
    anim,
    destroy() {
      anim.destroy();
      svg.innerHTML = "";
    },
  };
}
