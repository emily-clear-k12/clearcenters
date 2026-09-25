// Dissolving Station scene (4.6B-SL). The student sets the hot plate's
// temperature; on "Add sugar!" a scoop keeps pouring sugar into the beaker
// while it stirs and dissolves, until the water can't take any more and
// grains settle on the bottom. Grams dissolved are read off a gauge.
// Twist: "salt" — the robot arm swaps the sugar jar for a salt jar.
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer, armSwap, armSwapInstant } from "../kit/controls";

const TY = 512, X0 = 610;
const BX = 250, BTOP = 300, BBOT = 430, BW = 150; // beaker
const JAR = { x: 440, y: 330 };

export const dissolveScene = {
  id: "dissolve",
  runLabel: "Add sugar!",
  resetLabel: "Fresh water",
  sam: {
    start: "Tap + to heat the water on the hot plate.",
    pumping: "{v}°C water! Change it, or drag the purple flag to predict.",
    needFlag: "Drag the purple flag to how many grams you think will dissolve.",
    needSetting: "Set the water’s temperature first — tap +!",
    ready: "Great prediction! Tap “Add sugar!”",
    readyNoFlag: "Ready when you are — tap “Add sugar!”",
    running: "Pouring and stirring…",
    full: "That’s as hot as it goes — {max}°C.",
    empty: "That’s the coldest setting — {min}°C.",
    repeat: "You already tried {v}°C. Try a different temperature to find a pattern!",
    next: "Tap Fresh water, then choose a different temperature.",
    locked: "Mission Control set this test to {v}°C — just place your flag!",
    fairTest: "Think about what you changed on the hot plate each time.",
    twistPredict: "It’s salt now, not sugar. At {v}°C, how many grams will dissolve? Move your flag!",
    twistRun2: "Now pick any temperature and try the salt once more.",
    explain: "Use your chart! Tell one temperature and how many grams dissolved.",
    pastFlag: "{v} more dissolved than your flag.",
    beforeFlag: "{v} less dissolved than your flag.",
    compareR1: "In Round 1, sugar at that temperature was {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { temp: null, chosen: false, enabled: true, locked: false, busy: false, round: 1, t: 0 };
  metalDefs(defs);
  addDefs(defs, "dissDefs", `
    <linearGradient id="beakerGlass" x1="0" x2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset=".15" stop-color="#ffffff" stop-opacity=".15"/><stop offset=".85" stop-color="#ffffff" stop-opacity=".1"/><stop offset="1" stop-color="#ffffff" stop-opacity=".6"/>
    </linearGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 10, minor: 5, fine: 1, unitLabel: "g" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "DISSOLVED" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "GRAMS →" }, st);
  // hot plate
  el("ellipse", { cx: BX, cy: 468, rx: 120, ry: 8, fill: "#2a2440", opacity: 0.1 }, st);
  el("rect", { x: BX - 110, y: 440, width: 220, height: 28, rx: 10, fill: "#5b5378" }, st);
  const coil = el("rect", { x: BX - 90, y: 434, width: 180, height: 8, rx: 4, fill: "#8f86b8" }, st);
  el("circle", { cx: BX + 86, cy: 454, r: 8, fill: "#f0932b" }, st);
  el("text", { x: BX - 60, y: 459, class: "weight-label", text: "HOT PLATE", style: "font-size:10px" }, st);

  const A = layers.actors;
  const water = el("path", { opacity: 0.8 }, A);
  const settled = el("path", { fill: "#ffffff", stroke: "#e4def6", "stroke-width": 1, opacity: 0 }, A);
  const grains = particles(A, anim, { fill: "#ffffff", stroke: "#cfc8e6", strokeWidth: 1, grow: -1.5, alpha: 1, dragX: 0.3, dragY: 1, lift: -160 });
  const steam = particles(A, anim, { fill: "none", stroke: "#ffffff", strokeWidth: 2.5, grow: 12, alpha: 0.8, dragX: 0.3, dragY: 0.6, lift: 40 });
  const spoon = el("g", {}, A);
  el("rect", { x: -3, y: -120, width: 6, height: 120, rx: 3, fill: "url(#slxChrome)", stroke: "#a39dbd" }, spoon);
  el("ellipse", { cx: 0, cy: 0, rx: 10, ry: 5, fill: "#b4bccb" }, spoon);
  // beaker glass (front)
  el("path", { d: `M${BX - BW / 2} ${BTOP - 20} V${BBOT - 10} Q${BX - BW / 2} ${BBOT} ${BX - BW / 2 + 10} ${BBOT} H${BX + BW / 2 - 10} Q${BX + BW / 2} ${BBOT} ${BX + BW / 2} ${BBOT - 10} V${BTOP - 20}`, fill: "url(#beakerGlass)", stroke: "#bfb6e0", "stroke-width": 3 }, A);
  for (let i = 1; i <= 4; i++) el("rect", { x: BX - BW / 2 + 6, y: BBOT - i * 28, width: i % 2 ? 16 : 10, height: 2, fill: "#bfb6e0" }, A);
  // thermometer
  const thermo = el("g", {}, A);
  el("rect", { x: BX + 44, y: BTOP - 70, width: 12, height: 150, rx: 6, fill: "#ffffff", stroke: "#bfb6e0", "stroke-width": 2 }, thermo);
  const mercury = el("rect", { x: BX + 47.5, width: 5, rx: 2.5, fill: "#ef5b6b" }, thermo);
  el("circle", { cx: BX + 50, cy: BTOP + 84, r: 9, fill: "#ef5b6b" }, thermo);
  // jars (swap wrappers)
  const jarA = el("g", {}, A), jarB = el("g", { opacity: 0 }, A);
  function jar(parent, label, lid) {
    const g = el("g", { transform: `translate(${JAR.x},${JAR.y})` }, parent);
    el("rect", { x: -34, y: 0, width: 68, height: 100, rx: 14, fill: "#ffffff", stroke: "#d8d0f0", "stroke-width": 2 }, g);
    el("rect", { x: -30, y: 34, width: 60, height: 62, rx: 10, fill: "#f6f4fc" }, g);
    for (let i = 0; i < 16; i++) el("circle", { cx: -24 + (i % 8) * 7, cy: 78 + Math.floor(i / 8) * 8, r: 2.5, fill: "#e9e4f6" }, g);
    el("rect", { x: -38, y: -14, width: 76, height: 18, rx: 6, fill: lid }, g);
    el("rect", { x: -26, y: 42, width: 52, height: 22, rx: 5, fill: lid }, g);
    el("text", { x: 0, y: 58, "text-anchor": "middle", class: "weight-label", text: label, style: "font-size:11px" }, g);
    el("rect", { x: -34, y: 110, width: 68, height: 0 }, g);
    return g;
  }
  jar(jarA, "SUGAR", "#7b6cd9");
  jar(jarB, "SALT", "#2bb3a3");
  el("rect", { x: JAR.x - 44, y: JAR.y + 100, width: 88, height: 10, rx: 5, fill: "#cfc8e6" }, st);
  el("rect", { x: JAR.x - 6, y: JAR.y + 110, width: 12, height: 468 - JAR.y - 110, fill: "#cfc8e6" }, st);
  // scoop that pours
  const scoop = el("g", { opacity: 0 }, A);
  el("path", { d: "M-18 -8 H18 L14 8 H-14 Z", fill: "#b4bccb", stroke: "#8691a6", "stroke-width": 1.5 }, scoop);
  el("rect", { x: 16, y: -4, width: 34, height: 6, rx: 3, fill: "#8691a6" }, scoop);

  const pad = countPad(A, { x: BX, y: 214, unit: "°C", width: 230, onStep: step });
  const lock = lockBadge(A, BX + 128, 200, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${Math.round(v)} g` });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const WL = BTOP + 10; // water line
  const k = () => (S.temp == null ? 0 : (S.temp - V.min + V.step) / (V.max - V.min + V.step));
  function drawWater(t) {
    const amp = 2 + (S.stir || 0) * 3;
    let d = `M${BX - BW / 2 + 2} ${BBOT - 4} V${WL}`;
    for (let x = BX - BW / 2 + 2; x <= BX + BW / 2 - 2; x += 10) d += ` L${x} ${(WL + Math.sin(x / 18 + t * 3) * amp).toFixed(1)}`;
    d += ` V${BBOT - 4} Z`;
    set(water, { d });
    const h = k();
    set(water, { fill: `rgb(${Math.round(150 + 90 * h)},${Math.round(215 - 60 * h)},${Math.round(240 - 110 * h)})` });
    set(coil, { fill: h > 0 ? `rgb(${Math.round(143 + 110 * h)},${Math.round(134 - 40 * h)},${Math.round(184 - 120 * h)})` : "#8f86b8" });
    const mh = 20 + 110 * h;
    set(mercury, { y: BTOP + 80 - mh, height: mh });
  }
  const tick = (dt, now) => {
    S.t = now / 1000;
    if (!RM) drawWater(S.t);
    if (!RM && S.temp != null && S.temp >= 60 && Math.random() < dt * (S.temp - 50) / 12) steam.emit(BX + (Math.random() - 0.5) * 100, WL - 6, (Math.random() - 0.5) * 10, -20, 3, 1.2);
    set(spoon, { transform: `translate(${BX - 20 + Math.sin(S.t * 6) * 22 * (S.stir || 0)},${BBOT - 20}) rotate(${-8 + Math.sin(S.t * 6) * 8 * (S.stir || 0)})` });
  };
  anim.tickers.add(tick);

  function paint() {
    if (S.temp == null) pad.set("Off", { unitText: "", atMin: true });
    else pad.set(S.temp, { unitText: "°C", atMin: S.temp <= V.min, atMax: S.temp >= V.max });
    set(lock, { opacity: S.locked ? 1 : 0 });
    drawWater(S.t);
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
    if (S.temp == null) { S.temp = V.min; paint(); api.onSetting(S.temp); await anim.wait(150); }
    while (S.temp !== v) { S.temp += S.temp < v ? V.step : -V.step; paint(); api.onSetting(S.temp); await anim.wait(150); }
  }
  function settle(amount) {
    const w = 30 + 60 * amount, h = 6 + 8 * amount;
    set(settled, { d: `M${BX - w} ${BBOT - 4} Q${BX} ${BBOT - 4 - h * 2} ${BX + w} ${BBOT - 4} Z`, opacity: amount > 0 ? 1 : 0 });
  }
  async function run(dist) {
    S.busy = true;
    pad.setVisible(false);
    pointer.set(0); pointer.show();
    set(scoop, { opacity: 1 });
    const sx = BX + 10, sy = BTOP - 40;
    await tween(RM ? 0 : 400, (u) => set(scoop, { transform: `translate(${lerp(JAR.x, sx, u)},${lerp(JAR.y - 30, sy, u)}) rotate(${-u * 35})` }), ease.inOutCubic);
    S.stir = 1;
    const T = RM ? 0 : 900 + dist * 40;
    await pointer.to(dist, T, ease.linear, () => {
      if (!RM && Math.random() < 0.7) grains.emit(sx - 12 + Math.random() * 10, sy + 8, (Math.random() - 0.5) * 30, 40, 2.2, 0.5 + Math.random() * 0.3);
    });
    // one more scoop that can't dissolve: it settles on the bottom
    if (!RM) for (let i = 0; i < 20; i++) grains.emit(sx - 12 + Math.random() * 10, sy + 8, (Math.random() - 0.5) * 30, 40, 2.4, 0.9);
    await tween(RM ? 0 : 700, (u) => settle(u), ease.outCubic);
    S.stir = 0;
    await tween(RM ? 0 : 300, (u) => set(scoop, { opacity: 1 - u }));
    await pointer.hide(300);
    S.busy = false;
  }
  async function reset() {
    S.busy = true;
    await tween(RM ? 0 : 300, (u) => set(settled, { opacity: 1 - u }));
    settle(0);
    S.temp = null; S.chosen = false;
    paint();
    pad.setVisible(true);
    S.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: jarA, newG: jarB }); return; }
    pad.setVisible(false);
    await armSwap(arm, anim, { x: JAR.x, grabY: JAR.y - 40, oldG: jarA, newG: jarB });
    pad.setVisible(true);
  }
  paint();
  settle(0);
  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    getSetting: () => S.temp,
    hasSetting: () => S.chosen && S.temp != null,
    setSetting, run, reset, playTwist,
    setEnabled(on) { S.enabled = on; pad.setEnabled(on); },
    setLocked(on) { S.locked = on; paint(); },
    setAttention(on) { pad.g.classList.toggle("attention", !!on); },
    destroy() { anim.tickers.delete(tick); grains.destroy(); steam.destroy(); },
  };
}
