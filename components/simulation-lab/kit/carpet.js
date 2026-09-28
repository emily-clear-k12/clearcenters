// Carpet covering for numbered floor tiles (a "carpet" twist). Same look as the
// ramp scene's carpet: the robot arm lowers a roll that unrolls over the tiles.
//   const c = tileCarpet({ defs, tiles, x0, px, TY, count, anim, arm })
//   await c.play()   /   c.play({ instant: true })
import { el, set, lerp, ease, addDefs } from "./core";

export function tileCarpet({ defs, tiles, x0, px, TY, count, anim, arm, idSuffix = "K" }) {
  const DEG = Math.PI / 180;
  addDefs(defs, "carpetKit", `
    <pattern id="carpetPileK" width="10" height="8" patternUnits="userSpaceOnUse">
      <rect width="10" height="8" fill="#f7c99c"/>
      <path d="M1 7 l1.5 -4 M5 7 l1 -3.5 M8 7.5 l1.2 -4" stroke="#e8a86c" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="3.5" cy="2" r=".9" fill="#fbe0c3"/>
    </pattern>
    <linearGradient id="carpetRollK" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbd7b0"/><stop offset="1" stop-color="#e39a5c"/>
    </linearGradient>`);
  const clipId = `carpetReveal${idSuffix}`;
  const cp = el("clipPath", { id: clipId }, defs);
  const reveal = el("rect", { x: x0, y: TY - 4, width: 0, height: 56 }, cp);
  const carpet = el("g", { "clip-path": `url(#${clipId})`, opacity: 0 }, tiles.surface);
  const end = x0 + count * px;
  el("rect", { x: x0 + 1, y: TY - 3, width: end - x0 - 1, height: 50, rx: 8, fill: "url(#carpetPileK)", stroke: "#dd9a5e", "stroke-width": 1.5 }, carpet);
  el("rect", { x: x0 + 1, y: TY - 3, width: end - x0 - 1, height: 5, rx: 2.5, fill: "#e39a5c", opacity: 0.55 }, carpet);
  for (let i = 1; i < count; i++) el("line", { x1: x0 + i * px, x2: x0 + i * px, y1: TY + 4, y2: TY + 40, stroke: "#df9f63", "stroke-width": 1.4, "stroke-dasharray": "3 4", opacity: 0.8 }, carpet);
  for (let i = 0; i < count; i++) el("text", { x: x0 + i * px + px / 2, y: TY + 29, class: "ruler-num tile-num carpet-num", "text-anchor": "middle", text: String(i + 1) }, carpet);
  const roll = el("g", { opacity: 0 }, arm.g.parentNode);
  const rollBody = el("g", {}, roll);
  const armRoll = el("g", { opacity: 0 }, arm.cargo);
  function drawRoll(g, r) {
    while (g.firstChild) g.firstChild.remove();
    el("circle", { r, fill: "url(#carpetRollK)", stroke: "#c98142", "stroke-width": 2 }, g);
    el("path", { d: `M0 0 m${-r * 0.2} 0 a${r * 0.2} ${r * 0.2} 0 1 1 ${r * 0.4} 0 a${r * 0.45} ${r * 0.45} 0 1 1 ${-r * 0.8} 0 a${r * 0.7} ${r * 0.7} 0 1 1 ${r * 1.3} 0`, fill: "none", stroke: "#c98142", "stroke-width": 1.8, opacity: 0.8 }, g);
  }
  drawRoll(armRoll, 22);
  const show = (w) => { carpet.setAttribute("opacity", 1); set(reveal, { width: Math.max(0, w) }); };
  async function play({ instant = false, startX } = {}) {
    if (instant) { show(end - x0 + 4); return; }
    const { tween, RM } = anim;
    const sx = startX != null ? startX : x0 + 26, rest = TY + 44 - 22;
    arm.show(sx);
    armRoll.style.opacity = 1;
    await arm.move(-80, rest - 30, 950, ease.outCubic);
    armRoll.style.opacity = 0;
    set(roll, { opacity: 1, transform: `translate(${sx},${rest})` });
    drawRoll(rollBody, 22);
    arm.open();
    const up = arm.move(rest - 30, -100, 700, ease.inOutCubic);
    await anim.wait(RM ? 0 : 150);
    const dist = end - sx + 10;
    await tween(RM ? 0 : 1500, (u) => {
      const x = sx + dist * u, r = lerp(22, 9, u);
      drawRoll(rollBody, r);
      set(roll, { transform: `translate(${x.toFixed(1)},${(TY + 44 - r).toFixed(1)}) rotate(${((dist * u) / 22 / DEG).toFixed(1)})` });
      show(x - x0);
    }, ease.inOutCubic);
    await up;
    arm.hide();
    arm.close();
    await tween(RM ? 0 : 250, (u) => set(roll, { opacity: 1 - u }), ease.linear);
    show(end - x0 + 4);
  }
  return { play, show };
}
