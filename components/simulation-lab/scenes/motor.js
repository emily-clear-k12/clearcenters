// Circuit Motor scene (5.8B-SL). Batteries go into the holder with the
// count pad; "Switch on!" closes the switch and the motor spins a fan.
// Speed is read off an RPM gauge (tachometer strip).
// Twist: "biggerFan" — the robot arm swaps in a bigger fan blade.
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, metalDefs } from "../kit/parts";
import { livePointer, armSwap, armSwapInstant } from "../kit/controls";
import { createCircuit, DEV } from "./circuitKit";

const TY = 512, X0 = 610, HUB = 282;

export const motorScene = {
  id: "motor",
  runLabel: "Switch on!",
  resetLabel: "Switch off",
  sam: {
    start: "Tap + to put batteries in the holder.",
    pumping: "{v} in the circuit! Add more, or drag the purple flag to predict.",
    needFlag: "Drag the purple flag to where you think the speed gauge will stop.",
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
    twistPredict: "The fan blade is bigger now. With {v} batteries, how fast will it spin? Move your flag!",
    twistRun2: "Now pick any number of batteries and switch it on once more.",
    explain: "Use your chart! Tell one number of batteries and how fast the motor spun.",
    pastFlag: "The speed gauge read {v} more than your flag.",
    beforeFlag: "The speed gauge read {v} less than your flag.",
    compareR1: "In Round 1 the same batteries gave {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, rpm: 0, angle: 0 };
  metalDefs(defs);
  addDefs(defs, "motorDefs", `
    <linearGradient id="bladeA" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a99cf5"/><stop offset="1" stop-color="#6d5dd3"/>
    </linearGradient>
    <linearGradient id="bladeB" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffb37a"/><stop offset="1" stop-color="#e2553a"/>
    </linearGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 100, minor: 50, fine: 10, unitLabel: "" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "SPEED GAUGE" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "RPM →" }, st);

  const circuit = createCircuit(stage, cfg, api, { bottomY: 420, sideX: 404, sideY: 398 });
  const A = layers.actors;
  // motor body + shaft
  el("rect", { x: DEV.x - 6, y: HUB, width: 12, height: 100, rx: 4, fill: "url(#slxChrome)", stroke: "#a39dbd" }, st);
  el("rect", { x: DEV.x - 40, y: 376, width: 80, height: 46, rx: 12, fill: "url(#slxSteel)", stroke: "#4e5870", "stroke-width": 1.5 }, st);
  el("rect", { x: DEV.x - 30, y: 382, width: 60, height: 6, rx: 3, fill: "#fff", opacity: 0.4 }, st);
  el("text", { x: DEV.x, y: 408, "text-anchor": "middle", class: "weight-label", text: "MOTOR", style: "font-size:11px" }, st);
  el("rect", { x: DEV.x - 50, y: 420, width: 100, height: 12, rx: 6, fill: "#5b5378" }, st);
  function fan(parent, R, fill) {
    const g = el("g", {}, parent);
    const blur = el("circle", { cx: 0, cy: 0, r: R, fill: "#7b6cd9", opacity: 0 }, g);
    const rot = el("g", {}, g);
    for (let i = 0; i < 3; i++) el("path", { d: `M0 -6 C${R * 0.35} ${-R * 0.35} ${R * 0.3} ${-R} 0 ${-R} C${-R * 0.34} ${-R} ${-R * 0.3} ${-R * 0.4} 0 -6Z`, fill, stroke: "#fff", "stroke-width": 2, transform: `rotate(${i * 120})` }, rot);
    el("circle", { cx: 0, cy: 0, r: 11, fill: "#2a2440" }, g);
    el("circle", { cx: -3, cy: -3, r: 3, fill: "#fff", opacity: 0.6 }, g);
    set(g, { transform: `translate(${DEV.x},${HUB})` });
    return { g, rot, blur };
  }
  const fanA = el("g", {}, A), fanB = el("g", { opacity: 0 }, A);
  const small = fan(fanA, 66, "url(#bladeA)"), big = fan(fanB, 96, "url(#bladeB)");
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${Math.round(v / 10) * 10} RPM` });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const cur = () => (S.round === 2 ? big : small);
  const tick = (dt) => {
    if (RM) return;
    S.angle = (S.angle + S.rpm * 1.25 * dt) % 360; // visual: 900 RPM ≈ 3 turns/s
    const f = cur();
    set(f.rot, { transform: `rotate(${S.angle.toFixed(1)})` });
    set(f.blur, { opacity: Math.min(0.28, (S.rpm / MAX) * 0.3) });
  };
  anim.tickers.add(tick);

  async function run(dist) {
    circuit.S.busy = true;
    circuit.pad.setVisible(false);
    pointer.set(0); pointer.show();
    await circuit.power(true, 60 + circuit.S.count * 28);
    await pointer.to(dist, RM ? 0 : 1500, ease.outCubic, (v) => { S.rpm = v; });
    S.rpm = dist;
    await anim.wait(RM ? 0 : 400);
    await pointer.hide(300);
    circuit.S.busy = false;
  }
  async function reset() {
    circuit.S.busy = true;
    const from = S.rpm;
    await circuit.power(false);
    await tween(RM ? 0 : 700, (u) => { S.rpm = lerp(from, 0, u); }, ease.outCubic);
    S.rpm = 0;
    circuit.clear();
    circuit.pad.setVisible(true);
    circuit.S.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: fanA, newG: fanB }); return; }
    circuit.pad.setVisible(false);
    await armSwap(arm, anim, { x: DEV.x, grabY: HUB - 30, oldG: fanA, newG: fanB });
    circuit.pad.setVisible(true);
  }
  circuit.paint();
  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    getSetting: () => circuit.S.count,
    hasSetting: () => circuit.S.chosen,
    setSetting: (v, a) => circuit.setCount(v, a),
    run, reset, playTwist,
    setEnabled: circuit.setEnabled, setLocked: circuit.setLocked, setAttention: circuit.setAttention,
    destroy() { anim.tickers.delete(tick); circuit.destroy(); },
  };
}
