// Insulation Wrap Test scene (4.8B-SL). A mug of hot cocoa with a thermometer.
// The student sets how many insulation layers wrap the mug (each + wraps one
// more band around it). On "Start timer!" the clock runs while steam rises and
// the thermometer drops; when the cocoa is no longer hot the steam stops and
// the minutes are read off a gauge. More layers = better insulator = hot
// longer (insulators slow heat moving from the cocoa into the room).
// Twist: "breezy" — the robot arm sets down a desk fan; moving air carries
// heat away faster, so the mug cools sooner with any number of layers.
import { el, set, lerp, ease } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer, armSwap, armSwapInstant } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";
import { stopwatch } from "../kit/props";

const TY = 512, X0 = 610, MX = 290, MTOP = 350, MBOT = 460, MW = 104;
const WRAP = ["#f0932b", "#7b6cd9", "#2bb3a3", "#ef5b6b", "#f0b429", "#5cc3e0", "#8a6fe0", "#6cc04a"];
const FAN_X = 90;

export const mugScene = {
  id: "mug",
  runLabel: "Start timer!",
  resetLabel: "Fresh cocoa",
  sam: {
    start: "Tap + to wrap the mug in insulation layers.",
    pumping: "{v}! Change it, or drag the purple flag to predict how many minutes it stays hot.",
    needFlag: "Drag the purple flag to how many minutes you think the cocoa stays hot.",
    needSetting: "Choose the layers first — tap + (or − for none)!",
    ready: "Great prediction! Tap “Start timer!”",
    readyNoFlag: "Ready when you are — tap “Start timer!”",
    running: "Timing… watch the steam and the thermometer.",
    full: "That’s all the wrap we have — {max}.",
    empty: "No wrap at all — just the mug.",
    repeat: "You already tried {v}. Try a different number of layers to find a pattern!",
    next: "Tap Fresh cocoa, then choose a different number of layers.",
    locked: "Mission Control set this test to {v} — just place your flag!",
    fairTest: "Think about what you changed on the mug each time.",
    twistPredict: "A fan makes the room breezy. With {v}, how many minutes will it stay hot? Move your flag!",
    twistRun2: "Now pick any number of layers and try the breezy room once more.",
    explain: "Use your chart! Tell one number of layers and how long the cocoa stayed hot.",
    pastFlag: "It stayed hot {v} longer than your flag.",
    beforeFlag: "It cooled {v} sooner than your flag.",
    compareR1: "In Round 1, with no fan, it stayed hot {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, heat: 1, fan: false, t: 0, spin: 0 };
  metalDefs(defs);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 5, minor: 1, fine: 1, unitLabel: "min" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "MINUTES" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "STILL HOT →" }, st);
  el("rect", { x: 170, y: MBOT, width: 250, height: 10, rx: 5, fill: "#d8d0f0" }, st);

  const A = layers.actors;
  // wrap bands (drawn behind the mug front, outward)
  const wraps = el("g", {}, A);
  // band i = layer i+1 (i = 0 hugs the mug); the outermost band sits at the back
  const wrapEls = WRAP.map((c, i) => {
    const pad = 5 + i * 5;
    return el("rect", { x: MX - MW / 2 - pad, y: MTOP + 14 - i * 1.2, width: MW + pad * 2, height: MBOT - MTOP - 16 + i * 1.2, rx: 14 + i * 2, fill: c, stroke: "#ffffff", "stroke-width": 1.5, opacity: 0 });
  });
  [...wrapEls].reverse().forEach((w) => wraps.appendChild(w));
  // mug
  el("path", { d: `M${MX + MW / 2 - 4} ${MTOP + 30} q40 4 36 36 q-4 30 -36 30`, fill: "none", stroke: "#e9e4f6", "stroke-width": 12 }, A);
  el("rect", { x: MX - MW / 2, y: MTOP, width: MW, height: MBOT - MTOP, rx: 14, fill: "#ffffff", stroke: "#d8d0f0", "stroke-width": 2 }, A);
  el("ellipse", { cx: MX, cy: MTOP + 4, rx: MW / 2 - 6, ry: 7, fill: "#8a5a3c" }, A);
  const thermo = el("g", {}, A);
  el("rect", { x: MX + 18, y: MTOP - 92, width: 12, height: 110, rx: 6, fill: "#ffffff", stroke: "#bfb6e0", "stroke-width": 2 }, thermo);
  const mercury = el("rect", { x: MX + 21.5, width: 5, rx: 2.5, fill: "#ef5b6b" }, thermo);
  el("circle", { cx: MX + 24, cy: MTOP + 16, r: 8, fill: "#ef5b6b" }, thermo);
  const hotChip = el("g", { opacity: 0 }, A);
  el("rect", { x: MX - 70, y: MBOT + 18, width: 140, height: 26, rx: 13, fill: "#5cc3e0" }, hotChip);
  el("text", { x: MX, y: MBOT + 36, "text-anchor": "middle", class: "chip-text", fill: "#fff", text: "Not hot anymore" }, hotChip);
  const steam = particles(A, anim, { fill: "none", stroke: "#ffffff", strokeWidth: 3, grow: 14, alpha: 0.85, dragX: 0.3, dragY: 0.6, lift: 40 });
  // fan (twist)
  const fanG = el("g", { opacity: 0 }, A);
  const fanIn = el("g", {}, fanG);
  el("rect", { x: FAN_X - 5, y: 400, width: 10, height: 60, fill: "#8f86b8" }, fanIn);
  el("rect", { x: FAN_X - 26, y: 454, width: 52, height: 10, rx: 5, fill: "#5b5378" }, fanIn);
  el("circle", { cx: FAN_X, cy: 390, r: 36, fill: "#ffffff", stroke: "#8f86b8", "stroke-width": 3, opacity: 0.9 }, fanIn);
  const blades = el("g", { transform: `translate(${FAN_X},390)` }, fanIn);
  for (let i = 0; i < 3; i++) el("path", { d: "M0 0 C8 -10 10 -26 0 -30 C-8 -26 -8 -10 0 0Z", fill: "#5cc3e0", transform: `rotate(${i * 120})` }, blades);
  el("circle", { cx: FAN_X, cy: 390, r: 5, fill: "#5b5378" }, fanIn);
  const wind = el("g", { opacity: 0 }, A);
  const windLines = [0, 1, 2, 3].map((i) => el("path", { fill: "none", stroke: "#9fd4ee", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.8 }, wind));

  const watch = stopwatch(A, { x: 530, y: 330, r: 30, color: "#f0932b", label: "TIMER" });
  const pad = countPad(A, { x: 290, y: 236, unit: "", width: 240, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 290 + 128, 222, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#f0932b", fmt: (v) => `${Math.round(v)} min` });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  function drawHeat() {
    const mh = 14 + 78 * S.heat;
    set(mercury, { y: MTOP + 12 - mh, height: mh });
  }
  const tick = (dt, now) => {
    S.t = now / 1000;
    if (RM) return;
    if (S.heat > 0.12 && Math.random() < dt * 6 * S.heat) steam.emit(MX - 24 + Math.random() * 40 + (S.fan ? 10 : 0), MTOP - 6, (Math.random() - 0.5) * 12 + (S.fan ? 60 : 0), -30, 3, 1.4);
    if (S.fan) {
      S.spin += dt * 900;
      set(blades, { transform: `translate(${FAN_X},390) rotate(${S.spin.toFixed(0)})` });
      windLines.forEach((w, i) => {
        const ph = ((S.t * 0.9 + i * 0.25) % 1);
        const x = FAN_X + 44 + ph * 260, y = 370 + i * 14;
        set(w, { d: `M${x} ${y} q20 -6 40 0 t40 0`, opacity: (1 - ph) * 0.8 });
      });
    }
  };
  anim.tickers.add(tick);

  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: String(v), unit: v === 1 ? "layer" : "layers" }),
    offText: "Wrap",
    startAt: 0,
    onChange: (v) => wrapEls.forEach((w, i) => { const on = v != null && i < v; if (RM) { set(w, { opacity: on ? 1 : 0 }); return; } const from = +w.getAttribute("opacity"); tween(220, (u) => set(w, { opacity: lerp(from, on ? 1 : 0, u) })); }),
  });

  async function run(dist) {
    ctl.busy = true;
    pad.setVisible(false);
    set(hotChip, { opacity: 0 });
    pointer.set(0); pointer.show();
    S.heat = 1; drawHeat();
    const T = RM ? 0 : 1400 + dist * 90;
    await pointer.to(dist, T, ease.linear, (v, u) => {
      watch.set(v / 60, `${Math.round(v)} min`);
      S.heat = 1 - u * 0.88; drawHeat();
    });
    S.heat = 0.1; drawHeat();
    watch.set(dist / 60, `${dist} min`);
    await tween(RM ? 0 : 300, (u) => set(hotChip, { opacity: u }));
    await pointer.hide(300);
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    set(hotChip, { opacity: 0 });
    watch.set(0, "");
    await tween(RM ? 0 : 400, (u) => { S.heat = lerp(0.1, 1, u); drawHeat(); });
    ctl.clear();
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: null, newG: fanG }); S.fan = true; set(wind, { opacity: 1 }); return; }
    pad.setVisible(false);
    await armSwap(arm, anim, { x: FAN_X, grabY: 340, oldG: null, newG: fanG });
    S.fan = true;
    await tween(RM ? 0 : 400, (u) => set(wind, { opacity: u }));
    pad.setVisible(true);
  }
  drawHeat();
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    destroy() { anim.tickers.delete(tick); steam.destroy(); },
  });
}
