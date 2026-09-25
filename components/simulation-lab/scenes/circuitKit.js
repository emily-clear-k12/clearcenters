// Shared circuit bench for the two battery cases (4.8C bulb, 5.8B motor):
// a battery holder filled with the count pad (batteries drop into series
// slots), wires, a knife switch, and "current" dots that flow faster with
// more batteries. The scene draws its own device (bulb / motor) at DEV.
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { countPad } from "../kit/controls";
import { lockBadge } from "../kit/parts";

export const DEV = { x: 440 };
const HOLD = { l: 40, r: 344, y: 444 };
const SW = { l: 236, r: 300, y: 356 };

export function createCircuit(stage, cfg, api, { bottomY, sideX, sideY, padY = 206 }) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable;
  const S = { count: 0, chosen: false, enabled: true, locked: false, busy: false, on: false, speed: 0 };
  addDefs(defs, "circuitDefs", `
    <linearGradient id="battBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4fd1c1"/><stop offset="1" stop-color="#1f8f83"/>
    </linearGradient>
    <linearGradient id="battCap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a4166"/><stop offset="1" stop-color="#2a2440"/>
    </linearGradient>`);
  const st = layers.static, A = layers.actors;

  // holder
  el("ellipse", { cx: (HOLD.l + HOLD.r) / 2, cy: 468, rx: 170, ry: 8, fill: "#2a2440", opacity: 0.1 }, st);
  el("rect", { x: HOLD.l - 8, y: HOLD.y - 22, width: HOLD.r - HOLD.l + 16, height: 44, rx: 12, fill: "#5b5378" }, st);
  el("rect", { x: HOLD.l, y: HOLD.y - 14, width: HOLD.r - HOLD.l, height: 28, rx: 8, fill: "#3f375c" }, st);
  for (let i = 0; i < 9; i++) el("text", { x: slotX(i) + 14, y: HOLD.y + 36, "text-anchor": "middle", class: "scene-num", text: String(i + 1), style: "font-size:12px" }, st);
  // wires
  const wirePath = `M${HOLD.r} ${HOLD.y} H${DEV.x} V${bottomY} M${sideX} ${sideY} H${SW.r} M${SW.l} ${SW.y} H24 V${HOLD.y} H${HOLD.l}`;
  el("path", { d: `M${HOLD.r} ${HOLD.y} H${DEV.x} V${bottomY}`, fill: "none", stroke: "#ef5b6b", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, st);
  el("path", { d: `M${sideX} ${sideY} H${SW.r} M${SW.l} ${SW.y} H24 V${HOLD.y} H${HOLD.l}`, fill: "none", stroke: "#2a2440", "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, st);
  // switch
  el("rect", { x: SW.l - 16, y: SW.y + 6, width: SW.r - SW.l + 32, height: 12, rx: 6, fill: "#cfc8e6" }, st);
  el("circle", { cx: SW.l, cy: SW.y, r: 7, fill: "#5b5378" }, st);
  el("circle", { cx: SW.r, cy: SW.y, r: 7, fill: "#5b5378" }, st);
  const lever = el("g", {}, A);
  el("rect", { x: 0, y: -4, width: SW.r - SW.l + 6, height: 8, rx: 4, fill: "url(#slxChrome)", stroke: "#8f86b8" }, lever);
  el("circle", { cx: SW.r - SW.l + 6, cy: 0, r: 8, fill: "#f0932b" }, lever);
  el("text", { x: (SW.l + SW.r) / 2, y: SW.y + 40, "text-anchor": "middle", class: "scene-label", text: "SWITCH" }, st);
  let leverA = -38;
  const drawLever = () => set(lever, { transform: `translate(${SW.l},${SW.y}) rotate(${leverA})` });
  drawLever();

  // batteries
  const battG = el("g", {}, A);
  const cells = [];
  function slotX(i) { return HOLD.l + 6 + i * 33; }
  function drawBattery(i) {
    const g = el("g", { transform: `translate(${slotX(i)},${HOLD.y - 10})` }, battG);
    el("rect", { x: 0, y: 0, width: 28, height: 20, rx: 5, fill: "url(#battBody)" }, g);
    el("rect", { x: 0, y: 0, width: 9, height: 20, rx: 4, fill: "url(#battCap)" }, g);
    el("rect", { x: 28, y: 6, width: 3.5, height: 8, rx: 1.5, fill: "#cfc8e6" }, g);
    el("rect", { x: 11, y: 3, width: 14, height: 3, rx: 1.5, fill: "#fff", opacity: 0.45 }, g);
    return g;
  }
  const dotsG = el("g", {}, A);
  const measure = el("path", { d: wirePath, fill: "none", stroke: "none" }, dotsG);
  let dots = [];
  let phase = 0;
  function buildDots() {
    dotsG.querySelectorAll("circle").forEach((c) => c.remove());
    const len = measure.getTotalLength();
    dots = [];
    for (let d = 0; d < len; d += 34) dots.push({ d, c: el("circle", { r: 4, fill: "#ffe27a", stroke: "#f0932b", "stroke-width": 1.5, opacity: 0 }, dotsG) });
  }
  buildDots();
  const tick = (dt) => {
    if (!S.on || RM) return;
    phase += dt * S.speed;
    const len = measure.getTotalLength();
    dots.forEach((o) => {
      const p = measure.getPointAtLength((o.d + phase) % len);
      set(o.c, { cx: p.x.toFixed(1), cy: p.y.toFixed(1) });
    });
  };
  anim.tickers.add(tick);

  const pad = countPad(A, { x: 190, y: padY, unit: V.unitWord || "batteries", width: 250, onStep: step });
  const lock = lockBadge(A, 190 + 138, padY - 14, 16);

  function paint() {
    const n = S.count;
    while (cells.length < n) cells.push(drawBattery(cells.length));
    while (cells.length > n) cells.pop().remove();
    pad.set(S.count, { atMin: S.count <= 0, atMax: S.count >= V.max, unitText: S.count === 1 ? "battery" : "batteries" });
    set(lock, { opacity: S.locked ? 1 : 0 });
  }
  async function dropIn(i) {
    const g = cells[i];
    if (!g || RM) return;
    await tween(260, (u) => set(g, { transform: `translate(${slotX(i)},${HOLD.y - 10 - (1 - u) * 60})`, opacity: u }), ease.outBack);
  }
  async function step(d) {
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.count)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    const next = Math.max(0, Math.min(V.max, S.count + d * V.step));
    if (next === S.count) { api.say(d > 0 ? cfg.sam.full(V.max) : cfg.sam.empty()); return; }
    S.count = next;
    S.chosen = S.count >= V.min;
    paint();
    if (d > 0) dropIn(S.count - 1);
    api.onSetting(S.count);
  }
  async function setCount(v, animate) {
    if (!animate || RM) { S.count = v; S.chosen = v >= V.min; paint(); api.onSetting(v); return; }
    while (S.count !== v) {
      S.count += S.count < v ? 1 : -1;
      S.chosen = S.count >= V.min;
      paint();
      if (S.count > 0) dropIn(S.count - 1);
      api.onSetting(S.count);
      await anim.wait(170);
    }
  }
  async function power(on, speed = 0) {
    await tween(RM ? 0 : 260, (u) => { leverA = on ? lerp(-38, 0, u) : lerp(0, -38, u); drawLever(); }, ease.outCubic);
    S.on = on;
    S.speed = speed;
    dots.forEach((o) => set(o.c, { opacity: on && !RM ? 0.95 : 0 }));
  }
  return {
    S, pad, paint, setCount, power,
    clear() { S.count = 0; S.chosen = false; paint(); },
    setEnabled(on) { S.enabled = on; pad.setEnabled(on); },
    setLocked(on) { S.locked = on; paint(); },
    setAttention(on) { pad.g.classList.toggle("attention", !!on); },
    destroy() { anim.tickers.delete(tick); },
  };
}
