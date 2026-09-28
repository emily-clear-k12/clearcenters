// Particle Dissolve Race scene (5.6C-SL). The student chooses how finely the
// salt is ground (the mortar grinds the chunks smaller with each +). On
// "Pour & stir!" the dish tips the salt into the water, the spoon stirs and a
// stopwatch counts until the last grain disappears. The beaker and the salt
// dish sit on ONE scale whose reading never changes — the salt is still there
// (matter is conserved), it just dissolved. Seconds are read off a gauge.
// Twist: "colderWater" — the robot arm swaps the room-temperature pitcher for
// an ice-cold one; the water tints blue and the thermometer drops.
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer, armSwap, armSwapInstant } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";
import { stopwatch, labBeaker } from "../kit/props";

const TY = 512, X0 = 610;
const BX = 250, BTOP = 318, BBOT = 432, BW = 132; // beaker on the scale
const DISH = { x: 385, y: 420 };
const PITCHER = 92;
const SCALE_G = "250 g";
const GRIND_WORDS = ["", "big chunks", "big chunks", "chunks", "chunks", "coarse", "coarse", "fine", "fine", "powder"];

export const dissolveRaceScene = {
  id: "dissolveRace",
  runLabel: "Pour & stir!",
  resetLabel: "Fresh water",
  sam: {
    start: "Tap + to grind the salt. Each tap makes the pieces smaller.",
    pumping: "Grind level {v}! Change it, or drag the purple flag to predict the seconds.",
    needFlag: "Drag the purple flag to how many seconds you think it will take.",
    needSetting: "Grind the salt first — tap +!",
    ready: "Great prediction! Tap “Pour & stir!”",
    readyNoFlag: "Ready when you are — tap “Pour & stir!”",
    running: "Stirring… watch the scale too!",
    full: "That’s as fine as it gets — powder!",
    empty: "Those are the biggest chunks.",
    repeat: "You already tried grind level {v}. Try a different one to find a pattern!",
    next: "Tap Fresh water, then choose a different grind level.",
    locked: "Mission Control set this test to grind level {v} — just place your flag!",
    fairTest: "Think about what you changed with the grinder each time.",
    twistPredict: "The water is ice cold now. At grind level {v}, how many seconds will it take? Move your flag!",
    twistRun2: "Now pick any grind level and try the cold water once more.",
    explain: "Use your chart! Tell one grind level and how many seconds it took — and what the scale showed.",
    pastFlag: "It took {v} longer than your flag.",
    beforeFlag: "It took {v} less than your flag.",
    compareR1: "In Round 1, room-temperature water took {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, t: 0, stir: 0, cold: false, poured: false };
  metalDefs(defs);
  addDefs(defs, "raceDefs", `
    <linearGradient id="scaleTop" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8f86b8"/><stop offset="1" stop-color="#6d6592"/></linearGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 10, minor: 5, fine: 1, unitLabel: "s" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "SECONDS TO" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "DISSOLVE →" }, st);
  // counter under the pitcher, the scale and the mortar
  el("rect", { x: 40, y: 466, width: 500, height: 12, rx: 6, fill: "#d8d0f0" }, st);
  // the scale (beaker + dish both sit on it)
  el("ellipse", { cx: 310, cy: 466, rx: 150, ry: 6, fill: "#2a2440", opacity: 0.1 }, st);
  el("rect", { x: 170, y: 436, width: 280, height: 30, rx: 10, fill: "url(#scaleTop)" }, st);
  el("rect", { x: 160, y: 430, width: 300, height: 8, rx: 4, fill: "#b4bccb" }, st);
  el("rect", { x: 262, y: 441, width: 96, height: 21, rx: 5, fill: "#1f3a2f" }, st);
  const scaleT = el("text", { x: 310, y: 457, "text-anchor": "middle", class: "chip-text", fill: "#7dffb2", style: "font-size:15px", text: SCALE_G }, st);
  el("text", { x: 196, y: 455, class: "weight-label", style: "font-size:9px", fill: "#fff", text: "SCALE" }, st);
  el("text", { x: 380, y: 455, class: "weight-label", style: "font-size:9px", fill: "#fff", text: "TOTAL" }, st);

  const A = layers.actors;
  const beaker = labBeaker(A, { x: BX, top: BTOP, bot: BBOT, w: BW, defs });
  const chunks = el("g", {}, A);
  const grains = particles(A, anim, { fill: "#ffffff", stroke: "#cfc8e6", strokeWidth: 1, grow: -1, alpha: 1, dragX: 0.3, dragY: 1, lift: -200 });
  const spoon = el("g", {}, A);
  el("rect", { x: -3, y: -120, width: 6, height: 120, rx: 3, fill: "url(#slxChrome)", stroke: "#a39dbd" }, spoon);
  el("ellipse", { cx: 0, cy: 0, rx: 10, ry: 5, fill: "#b4bccb" }, spoon);
  beaker.front();
  // thermometer in the beaker
  const thermo = el("g", {}, A);
  el("rect", { x: BX + 36, y: BTOP - 58, width: 12, height: 140, rx: 6, fill: "#ffffff", stroke: "#bfb6e0", "stroke-width": 2 }, thermo);
  const mercury = el("rect", { x: BX + 39.5, width: 5, rx: 2.5, fill: "#ef5b6b" }, thermo);
  el("circle", { cx: BX + 42, cy: BTOP + 86, r: 9, fill: "#ef5b6b" }, thermo);
  const ice = el("g", { opacity: 0 }, A);
  [[-40, 0], [-12, 4], [14, -2]].forEach(([dx, dy]) => el("rect", { x: BX + dx - 10, y: BTOP + 14 + dy, width: 20, height: 18, rx: 4, fill: "#e8f7ff", stroke: "#9fd4ee", "stroke-width": 2, opacity: 0.95 }, ice));

  // salt dish (tips into the beaker on the run)
  const dish = el("g", {}, A);
  const dishIn = el("g", {}, dish);
  el("path", { d: "M-34 -12 Q-30 8 0 8 Q30 8 34 -12 Z", fill: "#ffffff", stroke: "#bfb6e0", "stroke-width": 2 }, dishIn);
  const dishSalt = el("g", {}, dishIn);
  el("text", { x: 0, y: 24, "text-anchor": "middle", class: "weight-label", style: "font-size:9px", text: "SALT" }, dishIn);
  set(dish, { transform: `translate(${DISH.x},${DISH.y})` });

  // mortar + pestle beside the scale
  const MX = 500;
  el("path", { d: `M${MX - 30} 432 Q${MX - 28} 464 ${MX} 464 Q${MX + 28} 464 ${MX + 30} 432 Z`, fill: "#9aa3b5", stroke: "#7c8599", "stroke-width": 2 }, st);
  el("text", { x: MX, y: 490, "text-anchor": "middle", class: "tile-caption", text: "GRINDER" }, st);
  const pestle = el("g", { transform: `translate(${MX},430)` }, A);
  el("rect", { x: -6, y: -54, width: 12, height: 58, rx: 6, fill: "#b4bccb", stroke: "#7c8599", "stroke-width": 1.5 }, pestle);

  // pitchers (swap wrappers)
  const pitA = el("g", {}, A), pitB = el("g", { opacity: 0 }, A);
  function pitcher(parent, label, fill, lid) {
    const g = el("g", { transform: `translate(${PITCHER},0)` }, parent);
    el("path", { d: "M-26 372 H22 L26 460 Q26 466 20 466 H-20 Q-26 466 -26 460 Z", fill: "#ffffff", stroke: "#bfb6e0", "stroke-width": 2 }, g);
    el("path", { d: "M-23 392 H22 L25 460 Q25 463 20 463 H-20 Q-23 463 -23 460 Z", fill, opacity: 0.8 }, g);
    el("path", { d: "M22 386 Q42 392 36 420 Q32 436 23 440", fill: "none", stroke: "#bfb6e0", "stroke-width": 5 }, g);
    el("path", { d: "M-26 372 L-34 364 H-18 Z", fill: "#ffffff", stroke: "#bfb6e0", "stroke-width": 2 }, g);
    el("rect", { x: -30, y: 410, width: 52, height: 20, rx: 5, fill: lid }, g);
    el("text", { x: -4, y: 424, "text-anchor": "middle", class: "weight-label", style: "font-size:8.5px", fill: "#fff", text: label }, g);
    return g;
  }
  pitcher(pitA, "ROOM", "#9fdcf0", "#7b6cd9");
  pitcher(pitB, "ICE COLD", "#5ab5f0", "#2b7fd3");

  const watch = stopwatch(A, { x: 566, y: 326, r: 32, color: "#7b6cd9", label: "STOPWATCH" });
  const pad = countPad(A, { x: 330, y: 222, unit: "", width: 300, onStep: (d) => step(d) });
  const lock = lockBadge(A, 330 + 162, 208, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${Math.round(v)} s` });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  // salt pieces: level 1 = a few big chunks … level 9 = lots of fine powder
  function saltPieces(level) {
    const L = level || 1;
    const n = 4 + Math.round((L - 1) * 3.2), r = 9 - (L - 1) * 0.95;
    const out = [];
    for (let i = 0; i < n; i++) out.push({ dx: -24 + ((i * 37) % 48) + (L > 6 ? (i % 3) : 0), dy: -2 - ((i * 13) % 9), r: Math.max(1.6, r * (0.8 + ((i * 7) % 5) / 12)) });
    return out;
  }
  function drawDish(level) {
    while (dishSalt.firstChild) dishSalt.firstChild.remove();
    if (level == null || S.poured) { if (!S.poured) el("path", { d: "M-22 -8 Q0 -22 22 -8 Z", fill: "#ffffff", stroke: "#d8d0f0" }, dishSalt); return; }
    for (const p of saltPieces(level)) el("circle", { cx: p.dx, cy: p.dy - p.r * 0.4, r: p.r, fill: "#ffffff", stroke: "#cfc8e6", "stroke-width": 1 }, dishSalt);
  }
  const WL = BTOP + 12;
  function drawWater(t) {
    beaker.water(WL, t, 2 + S.stir * 3, S.cold ? "rgb(150,200,245)" : "rgb(170,225,245)");
    const mh = S.cold ? 26 : 70;
    set(mercury, { y: BTOP + 80 - mh, height: mh });
  }
  const tick = (dt, now) => {
    S.t = now / 1000;
    if (!RM) drawWater(S.t);
    set(spoon, { transform: `translate(${BX - 18 + Math.sin(S.t * 7) * 24 * S.stir},${BBOT - 18}) rotate(${-8 + Math.sin(S.t * 7) * 8 * S.stir})` });
  };
  anim.tickers.add(tick);

  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: `Level ${v}`, unit: GRIND_WORDS[v] || "" }),
    offText: "Grind",
    onChange: (v) => drawDish(v),
  });
  async function step(d) {
    const before = ctl.value;
    await ctl.step(d);
    if (ctl.value !== before && !RM) await tween(360, (u, raw) => set(pestle, { transform: `translate(${MX + Math.sin(raw * Math.PI * 4) * 8},${430 + Math.abs(Math.sin(raw * Math.PI * 4)) * 8})` }), ease.linear);
  }
  async function pulseScale() {
    if (RM) return;
    await tween(500, (u, raw) => set(scaleT, { style: `font-size:${(15 + Math.sin(raw * Math.PI) * 4).toFixed(1)}px` }), ease.linear);
  }
  async function run(dist) {
    ctl.busy = true;
    pad.setVisible(false);
    const level = ctl.value || 1;
    pointer.set(0); pointer.show();
    watch.set(0, "0 s");
    // tip the dish over the beaker
    await tween(RM ? 0 : 520, (u) => set(dish, { transform: `translate(${lerp(DISH.x, BX + 64, u)},${lerp(DISH.y, BTOP - 30, u)}) rotate(${-u * 70})` }), ease.inOutCubic);
    const pieces = saltPieces(level);
    const made = pieces.map((p, i) => el("circle", { cx: BX - 30 + ((i * 29) % 70), cy: BBOT - 6 - p.r - ((i * 11) % 14), r: p.r, fill: "#ffffff", stroke: "#cfc8e6", "stroke-width": 1 }, chunks));
    if (!RM) for (let i = 0; i < 16; i++) grains.emit(BX + 50 + Math.random() * 10, BTOP - 20, -30 - Math.random() * 30, 60, 1.6 + (10 - level) * 0.25, 0.5);
    S.poured = true; drawDish(level);
    await tween(RM ? 0 : 420, (u) => set(dish, { transform: `translate(${lerp(BX + 64, DISH.x, u)},${lerp(BTOP - 30, DISH.y, u)}) rotate(${-(1 - u) * 70})` }), ease.inOutCubic);
    S.stir = 1;
    pulseScale();
    const T = RM ? 0 : 1200 + dist * 30;
    await pointer.to(dist, T, ease.linear, (v, u) => {
      watch.set(v / 60, `${Math.round(v)} s`);
      made.forEach((c, i) => set(c, { r: Math.max(0, pieces[i].r * (1 - u * (1 + (i % 4) * 0.08))), opacity: 1 - u * 0.3 }));
    });
    made.forEach((c) => c.remove());
    S.stir = 0;
    watch.set(dist / 60, `${dist} s`);
    await pulseScale();
    await pointer.hide(300);
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    while (chunks.firstChild) chunks.firstChild.remove();
    watch.set(0, "");
    S.poured = false;
    ctl.clear();
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: pitA, newG: pitB }); S.cold = true; set(ice, { opacity: 1 }); drawWater(S.t); return; }
    pad.setVisible(false);
    await armSwap(arm, anim, { x: PITCHER, grabY: 360, oldG: pitA, newG: pitB });
    S.cold = true;
    await tween(RM ? 0 : 600, (u) => set(ice, { opacity: u }));
    drawWater(S.t);
    pad.setVisible(true);
  }
  ctl.paint();
  drawWater(0);
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    destroy() { anim.tickers.delete(tick); grains.destroy(); },
  });
}
