// Ice Melt Race scene (3.6C-SL). The student sets the heat lamp's
// temperature on its control pad; on "Lamp on!" the lamp heats an ice cube
// on a tray and a time-lapse timer runs while the cube melts into a puddle.
// The outcome (minutes to melt) is read off a timer gauge.
// Twist: "biggerIce" — the robot arm swaps in a bigger ice cube.
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer, armSwap, armSwapInstant } from "../kit/controls";

const TY = 512, X0 = 610;
const CX = 300, TRAY = 440, LAMP = { x: 300, y: 292 };

export const iceScene = {
  id: "ice",
  runLabel: "Lamp on!",
  resetLabel: "New ice cube",
  sam: {
    start: "Tap + to set how hot the heat lamp will be.",
    pumping: "{v}°C! Change it, or drag the purple flag to predict.",
    needFlag: "Drag the purple flag to where you think the timer will stop.",
    needSetting: "Set the lamp’s temperature first — tap +!",
    ready: "Great prediction! Tap “Lamp on!”",
    readyNoFlag: "Ready when you are — tap “Lamp on!”",
    running: "Lamp on! Watch the timer…",
    full: "That’s as hot as the lamp goes — {max}°C.",
    empty: "That’s the lowest setting — {min}°C.",
    repeat: "You already tried {v}°C. Try a different temperature to find a pattern!",
    next: "Tap New ice cube, then choose a different temperature.",
    locked: "Mission Control set this test to {v}°C — just place your flag!",
    fairTest: "Think about what you changed on the lamp each time.",
    twistPredict: "The ice cube is bigger now. At {v}°C, how long will it take to melt? Move your flag!",
    twistRun2: "Now pick any temperature and melt one more cube.",
    explain: "Use your chart! Tell one temperature and how many minutes it took.",
    pastFlag: "It took {v} longer than your flag.",
    beforeFlag: "It melted {v} sooner than your flag.",
    compareR1: "In Round 1 the same temperature took {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { temp: null, chosen: false, enabled: true, locked: false, busy: false, round: 1, melt: 0, on: 0 };
  metalDefs(defs);
  addDefs(defs, "iceDefs", `
    <linearGradient id="iceFace" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f4fcff"/><stop offset="1" stop-color="#b9e6f5"/>
    </linearGradient>
    <radialGradient id="lampCone" cx="50%" cy="0%" r="100%">
      <stop offset="0" stop-color="#ffd970" stop-opacity=".7"/><stop offset="1" stop-color="#ffd970" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="puddle" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#9fdcf0" stop-opacity=".9"/><stop offset="1" stop-color="#9fdcf0" stop-opacity=".35"/>
    </radialGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 1, minor: 0.5, fine: 0, unitLabel: "min" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "MELT TIMER" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "MINUTES →" }, st);
  // lamp stand
  el("ellipse", { cx: 110, cy: 466, rx: 50, ry: 8, fill: "#2a2440", opacity: 0.1 }, st);
  el("rect", { x: 70, y: 452, width: 80, height: 14, rx: 7, fill: "#5b5378" }, st);
  el("rect", { x: 104, y: 250, width: 12, height: 206, rx: 5, fill: "url(#slxChrome)" }, st);
  el("rect", { x: 104, y: 246, width: LAMP.x - 104, height: 12, rx: 6, fill: "url(#slxChrome)" }, st);
  // tray
  el("ellipse", { cx: CX, cy: 468, rx: 120, ry: 8, fill: "#2a2440", opacity: 0.1 }, st);
  el("rect", { x: CX - 20, y: TRAY + 6, width: 40, height: 20, fill: "#cfc8e6" }, st);
  el("path", { d: `M${CX - 110} ${TRAY} H${CX + 110} L${CX + 96} ${TRAY + 12} H${CX - 96} Z`, fill: "#e9e4f6", stroke: "#cfc8e6", "stroke-width": 2 }, st);

  const A = layers.actors;
  const cone = el("path", { d: `M${LAMP.x - 34} ${LAMP.y + 14} L${LAMP.x - 120} ${TRAY} H${LAMP.x + 120} L${LAMP.x + 34} ${LAMP.y + 14} Z`, fill: "url(#lampCone)", opacity: 0 }, A);
  const puddle = el("ellipse", { cx: CX, cy: TRAY - 1, rx: 0, ry: 0, fill: "url(#puddle)" }, A);
  const cubeA = el("g", {}, A), cubeB = el("g", { opacity: 0 }, A);
  function cube(parent, s) {
    const g = el("g", {}, parent);
    const inner = el("g", {}, g);
    el("rect", { x: -s / 2, y: -s, width: s, height: s, rx: s * 0.18, fill: "url(#iceFace)", stroke: "#8fd3ea", "stroke-width": 2.5 }, inner);
    el("path", { d: `M${-s / 2 + s * 0.18} ${-s + 6} L${s / 2 - 6} ${-s + 6}`, stroke: "#ffffff", "stroke-width": 4, "stroke-linecap": "round", opacity: 0.8 }, inner);
    el("path", { d: `M${-s * 0.28} ${-s * 0.65} l${s * 0.18} ${s * 0.12}`, stroke: "#ffffff", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.7 }, inner);
    set(g, { transform: `translate(${CX},${TRAY})` });
    return inner;
  }
  const small = cube(cubeA, 70), big = cube(cubeB, 100);
  const drips = particles(A, anim, { fill: "#9fdcf0", stroke: "#6cc4e0", strokeWidth: 1, grow: -1, alpha: 0.95, dragX: 0.5, dragY: 1, lift: -120 });
  const waves = el("g", { opacity: 0 }, A);
  for (let i = -1; i <= 1; i++) el("path", { d: `M${LAMP.x + i * 40} ${LAMP.y + 40} q8 12 0 24 q-8 12 0 24`, fill: "none", stroke: "#f0932b", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.6, class: "heat-wave" }, waves);
  // lamp head
  const head = el("g", {}, A);
  el("path", { d: `M${LAMP.x - 44} ${LAMP.y + 14} L${LAMP.x - 24} ${LAMP.y - 30} H${LAMP.x + 24} L${LAMP.x + 44} ${LAMP.y + 14} Z`, fill: "#f0932b", stroke: "#cf7414", "stroke-width": 2 }, head);
  el("rect", { x: LAMP.x - 8, y: 252, width: 16, height: LAMP.y - 30 - 252 + 2, fill: "#5b5378" }, head);
  const bulb = el("ellipse", { cx: LAMP.x, cy: LAMP.y + 14, rx: 30, ry: 9, fill: "#fff3c4", stroke: "#e8c46a" }, head);
  const tempTag = el("g", { opacity: 0 }, A);
  const tagRect = el("rect", { x: LAMP.x + 52, y: LAMP.y - 30, width: 76, height: 30, rx: 15, fill: "#f0932b" }, tempTag);
  const tagTxt = el("text", { x: LAMP.x + 90, y: LAMP.y - 9, "text-anchor": "middle", class: "chip-text", fill: "#fff", text: "" }, tempTag);

  const pad = countPad(A, { x: CX, y: 206, unit: "°C", width: 230, onStep: step });
  const lock = lockBadge(A, CX + 128, 192, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${v.toFixed(1)} min` });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const curCube = () => (S.round === 2 ? big : small);
  const size = () => (S.round === 2 ? 100 : 70);
  function heat(k) {
    set(bulb, { fill: k > 0 ? `rgb(255,${Math.round(243 - 60 * k)},${Math.round(196 - 150 * k)})` : "#fff3c4" });
    set(cone, { opacity: S.on ? 0.25 + 0.75 * k : 0 });
    set(waves, { opacity: S.on ? k : 0 });
  }
  function level() { return S.temp == null ? 0 : (S.temp - V.min + V.step) / (V.max - V.min + V.step); }
  function paint() {
    if (S.temp == null) pad.set("Off", { unitText: "", atMin: true });
    else pad.set(S.temp, { unitText: "°C", atMin: S.temp <= V.min, atMax: S.temp >= V.max });
    set(lock, { opacity: S.locked ? 1 : 0 });
    set(tempTag, { opacity: S.temp == null ? 0 : 1 });
    tagTxt.textContent = S.temp == null ? "" : `${S.temp}°C`;
    heat(level() * 0.5);
  }
  function drawMelt(m) {
    S.melt = m;
    const k = Math.max(0, 1 - m);
    set(curCube(), { transform: `scale(${(0.15 + 0.85 * k).toFixed(3)},${k.toFixed(3)})`, opacity: m >= 1 ? 0 : 1 });
    const pr = size() * (0.55 + 0.9 * m);
    set(puddle, { rx: m > 0 ? pr : 0, ry: m > 0 ? 5 + 5 * m : 0 });
  }

  async function step(d) {
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.temp)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    let next;
    if (S.temp == null) { if (d < 0) { api.say(cfg.sam.start()); return; } next = V.min; }
    else next = Math.max(V.min, Math.min(V.max, S.temp + d * V.step));
    if (next === S.temp) { api.say(d > 0 ? cfg.sam.full(V.max) : cfg.sam.empty(V.min)); return; }
    S.temp = next; S.chosen = true;
    paint();
    api.onSetting(S.temp);
  }
  async function setSetting(v, animate) {
    S.chosen = true;
    if (!animate || RM) { S.temp = v; paint(); api.onSetting(v); return; }
    if (S.temp == null) { S.temp = V.min; paint(); api.onSetting(S.temp); await anim.wait(160); }
    while (S.temp !== v) { S.temp += S.temp < v ? V.step : -V.step; paint(); api.onSetting(S.temp); await anim.wait(160); }
  }
  async function run(dist) {
    S.busy = true;
    pad.setVisible(false);
    S.on = 1;
    heat(level());
    pointer.set(0); pointer.show();
    const T = RM ? 0 : 900 + dist * 220;
    await pointer.to(dist, T, ease.linear, (v, u) => {
      drawMelt(u);
      if (!RM && Math.random() < 0.25 && u < 0.97) {
        const s = size() * (1 - u);
        drips.emit(CX + (Math.random() - 0.5) * s, TRAY - s * 0.3, (Math.random() - 0.5) * 20, 10, 2.5, 0.35);
      }
    });
    drawMelt(1);
    S.on = 0;
    heat(level() * 0.5);
    await pointer.hide(300);
    S.busy = false;
  }
  async function reset() {
    S.busy = true;
    const c = curCube();
    await tween(RM ? 0 : 250, (u) => set(puddle, { opacity: 1 - u }));
    set(puddle, { rx: 0, ry: 0, opacity: 1 });
    S.melt = 0;
    set(c, { transform: "scale(1,1)", opacity: 1 });
    await tween(RM ? 0 : 320, (u) => set(c, { transform: `translate(0,${(-(1 - u) * 50).toFixed(1)})`, opacity: u }), ease.outBack);
    set(c, { transform: "" });
    S.temp = null; S.chosen = false;
    paint();
    pad.setVisible(true);
    S.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: cubeA, newG: cubeB }); return; }
    pad.setVisible(false);
    await armSwap(arm, anim, { x: CX, grabY: TRAY - 70 - 24, oldG: cubeA, newG: cubeB });
    pad.setVisible(true);
  }
  paint();
  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too short", over: "too long" },
    trackX: (v) => X0 + v * PX,
    getSetting: () => S.temp,
    hasSetting: () => S.chosen && S.temp != null,
    setSetting, run, reset, playTwist,
    setEnabled(on) { S.enabled = on; pad.setEnabled(on); },
    setLocked(on) { S.locked = on; paint(); },
    setAttention(on) { pad.g.classList.toggle("attention", !!on); },
    destroy() { drips.destroy(); },
  };
}
