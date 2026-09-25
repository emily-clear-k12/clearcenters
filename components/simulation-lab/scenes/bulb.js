// Circuit Brightness scene (4.8C-SL). Batteries go into the holder with the
// count pad; "Switch on!" closes the switch, current flows and the bulb
// glows. Brightness is read off a light-meter gauge.
// Twist: "biggerBulb" — the robot arm swaps in a bigger bulb.
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, metalDefs } from "../kit/parts";
import { livePointer, armSwap, armSwapInstant } from "../kit/controls";
import { createCircuit, DEV } from "./circuitKit";

const TY = 512, X0 = 610, BY = 290;

export const bulbScene = {
  id: "bulb",
  runLabel: "Switch on!",
  resetLabel: "Switch off",
  sam: {
    start: "Tap + to put batteries in the holder.",
    pumping: "{v} in the circuit! Add more, or drag the purple flag to predict.",
    needFlag: "Drag the purple flag to where you think the light meter will stop.",
    needSetting: "Put at least one battery in the holder first!",
    ready: "Great prediction! Tap “Switch on!”",
    readyNoFlag: "Ready when you are — tap “Switch on!”",
    running: "Closing the switch…",
    full: "The holder is full — {max} batteries is the most.",
    empty: "The holder is already empty.",
    repeat: "You already tried {v} batteries. Try a different number to find a pattern!",
    next: "Tap Switch off, then choose a different number of batteries.",
    locked: "Mission Control set this test to {v} batteries — just place your flag!",
    fairTest: "Think about what you changed with the + and − buttons each time.",
    twistPredict: "The bulb is bigger now. With {v} batteries, how bright will it be? Move your flag!",
    twistRun2: "Now pick any number of batteries and switch it on once more.",
    explain: "Use your chart! Tell one number of batteries and how bright the bulb was.",
    pastFlag: "The light meter read {v} more than your flag.",
    beforeFlag: "The light meter read {v} less than your flag.",
    compareR1: "In Round 1 the same batteries gave {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, glow: 0 };
  metalDefs(defs);
  addDefs(defs, "bulbDefs", `
    <radialGradient id="bulbGlass" cx="40%" cy="35%" r="70%">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset="1" stop-color="#e9e4f6" stop-opacity=".75"/>
    </radialGradient>
    <radialGradient id="bulbLit" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#fffbe0"/><stop offset=".55" stop-color="#ffe27a"/><stop offset="1" stop-color="#ffc34d"/>
    </radialGradient>
    <radialGradient id="bulbHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ffe27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/>
    </radialGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 5, minor: 1, fine: 0, unitLabel: "" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "LIGHT METER" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "BRIGHTNESS →" }, st);

  const circuit = createCircuit(stage, cfg, api, { bottomY: 382, sideX: 414, sideY: 356 });
  const A = layers.actors;
  // socket (shared)
  el("rect", { x: DEV.x - 30, y: 346, width: 60, height: 38, rx: 8, fill: "#8f86b8" }, st);
  el("rect", { x: DEV.x - 24, y: 336, width: 48, height: 14, rx: 4, fill: "url(#slxChrome)" }, st);
  const halo = el("circle", { cx: DEV.x, cy: BY, r: 90, fill: "url(#bulbHalo)", opacity: 0 }, A);
  const rays = el("g", { opacity: 0 }, A);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    if (Math.sin(a) > 0.55) continue;
    el("line", { x1: DEV.x + Math.cos(a) * 70, y1: BY + Math.sin(a) * 70, x2: DEV.x + Math.cos(a) * 92, y2: BY + Math.sin(a) * 92, stroke: "#ffc34d", "stroke-width": 5, "stroke-linecap": "round", class: "ray" }, rays);
  }
  function bulb(parent, r, label) {
    const g = el("g", {}, parent);
    const cy = 336 - r * 0.92;
    el("path", { d: `M${DEV.x - r * 0.42} 338 L${DEV.x - r * 0.5} ${cy + r * 0.62} A${r} ${r} 0 1 1 ${DEV.x + r * 0.5} ${cy + r * 0.62} L${DEV.x + r * 0.42} 338 Z`, fill: "url(#bulbGlass)", stroke: "#cfc8e6", "stroke-width": 2.5 }, g);
    const lit = el("circle", { cx: DEV.x, cy, r: r * 0.92, fill: "url(#bulbLit)", opacity: 0 }, g);
    el("path", { d: `M${DEV.x - 12} 336 V${cy + 8} M${DEV.x + 12} 336 V${cy + 8} M${DEV.x - 12} ${cy + 8} q6 -14 12 0 q6 14 12 0`, fill: "none", stroke: "#8f86b8", "stroke-width": 2.5, "stroke-linecap": "round" }, g);
    el("ellipse", { cx: DEV.x - r * 0.35, cy: cy - r * 0.35, rx: r * 0.18, ry: r * 0.3, fill: "#fff", opacity: 0.7, transform: `rotate(30 ${DEV.x - r * 0.35} ${cy - r * 0.35})` }, g);
    if (label) el("text", { x: DEV.x, y: cy + r * 0.3, "text-anchor": "middle", class: "scene-label", text: label }, g);
    return { g, lit };
  }
  const bulbA = el("g", {}, A), bulbB = el("g", { opacity: 0 }, A);
  const small = bulb(bulbA, 46, null), big = bulb(bulbB, 64, "BIG");
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#f0932b", fmt: (v) => `${Math.round(v)}` });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  function glow(v) {
    S.glow = v;
    const k = Math.min(1, v / MAX);
    const lit = S.round === 2 ? big.lit : small.lit;
    set(lit, { opacity: (0.15 + 0.85 * k) * (v > 0 ? 1 : 0) });
    set(halo, { opacity: k * 0.95, r: 60 + 110 * k, cy: S.round === 2 ? 336 - 64 * 0.92 : BY });
    set(rays, { opacity: k });
  }

  async function run(dist) {
    circuit.S.busy = true;
    circuit.pad.setVisible(false);
    pointer.set(0); pointer.show();
    await circuit.power(true, 60 + circuit.S.count * 28);
    await pointer.to(dist, RM ? 0 : 1300, ease.outCubic, (v) => glow(v));
    glow(dist);
    await anim.wait(RM ? 0 : 400);
    await pointer.hide(300);
    circuit.S.busy = false;
  }
  async function reset() {
    circuit.S.busy = true;
    const from = S.glow;
    await circuit.power(false);
    await tween(RM ? 0 : 300, (u) => glow(lerp(from, 0, u)));
    circuit.clear();
    circuit.pad.setVisible(true);
    circuit.S.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: bulbA, newG: bulbB }); return; }
    circuit.pad.setVisible(false);
    await armSwap(arm, anim, { x: DEV.x, grabY: 336 - 46 * 1.84 - 30, oldG: bulbA, newG: bulbB });
    circuit.pad.setVisible(true);
  }
  circuit.paint();
  glow(0);
  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    getSetting: () => circuit.S.count,
    hasSetting: () => circuit.S.chosen,
    setSetting: (v, a) => circuit.setCount(v, a),
    run, reset, playTwist,
    setEnabled: circuit.setEnabled, setLocked: circuit.setLocked, setAttention: circuit.setAttention,
    destroy() { circuit.destroy(); },
  };
}
