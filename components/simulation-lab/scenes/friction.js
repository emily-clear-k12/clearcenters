// Friction scene (4.7-SL). The student taps one of nine surface samples
// (smooth → rough); that surface is laid along the track. On "Launch!" a
// spring launcher shoves a block that slides along a cm ruler and stops.
// Twist: "heavyBlock" — the robot arm swaps in a heavier block.
import { el, set, lerp, clamp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { armSwap, armSwapInstant } from "../kit/controls";

const TY = 512, X0 = 250, PX = 52, LANE = TY - 10;
const SW = { x: 72, y: 214, s: 44, gap: 8 };

export const frictionScene = {
  id: "friction",
  runLabel: "Launch!",
  resetLabel: "Reset block",
  sam: {
    start: "Tap a surface sample to lay it on the track — 1 is smooth, 9 is very rough.",
    pumping: "Level {v} surface! Now drag the purple flag to predict where the block stops.",
    needFlag: "Drag the purple flag to where you think the block will stop.",
    needSetting: "Pick a surface first — tap one of the samples!",
    ready: "Great prediction! Tap “Launch!”",
    readyNoFlag: "Ready when you are — tap “Launch!”",
    running: "Spring released!",
    full: "That’s the roughest — level {max}.",
    empty: "That’s the smoothest — level {min}.",
    repeat: "You already tried level {v}. Try a different surface to find a pattern!",
    next: "Tap Reset block, then pick a different surface.",
    locked: "Mission Control set this test to level {v} — just place your flag!",
    fairTest: "Think about what you changed when you picked a sample.",
    twistPredict: "The block is heavier now. On level {v}, where will it stop? Move your flag!",
    twistRun2: "Now pick any surface and launch the heavy block once more.",
    explain: "Use your chart! Tell one roughness level and how far the block slid.",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max;
  const S = { level: null, chosen: false, enabled: true, locked: false, busy: false, round: 1, x: 0, comp: 0 };
  metalDefs(defs);
  const grit = (lv) => `rgb(${Math.round(236 - lv * 7)},${Math.round(230 - lv * 11)},${Math.round(246 - lv * 22)})`;
  let pats = "";
  for (let lv = 1; lv <= 9; lv++) {
    let dots = "";
    const n = lv * 5;
    for (let i = 0; i < n; i++) {
      const x = ((i * 37) % 40) + 2, y = ((i * 53 + lv * 7) % 40) + 2;
      dots += `<circle cx="${x}" cy="${y}" r="${(0.8 + lv * 0.18).toFixed(2)}" fill="#8a6a45" opacity="${(0.25 + lv * 0.06).toFixed(2)}"/>`;
    }
    pats += `<pattern id="grit${lv}" width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill="${grit(lv)}"/>${dots}</pattern>`;
  }
  addDefs(defs, "frDefs", pats + `
    <linearGradient id="blockA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd970"/><stop offset="1" stop-color="#f5a623"/></linearGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 2, minor: 1, fine: 0.5, unitLabel: "cm" });
  // launcher
  el("rect", { x: X0 - 150, y: LANE - 60, width: 26, height: 64, rx: 8, fill: "#7b6cd9" }, st);
  el("rect", { x: X0 - 160, y: LANE + 2, width: 50, height: 10, rx: 5, fill: "#5b5378" }, st);
  const spring = el("path", { fill: "none", stroke: "#8691a6", "stroke-width": 4, "stroke-linejoin": "round", "stroke-linecap": "round" }, layers.actors);
  const plate = el("rect", { y: LANE - 50, width: 10, height: 44, rx: 4, fill: "#5b5378" }, layers.actors);
  // surface lane
  const lane = el("rect", { x: X0 - 36, y: LANE - 4, width: MAX * PX + 60, height: 12, rx: 6, fill: "#efeaf9", stroke: "#d8d0f0" }, st);
  const surf = el("rect", { x: X0 - 36, y: LANE - 4, width: 0, height: 12, rx: 6, fill: "url(#grit5)" }, layers.actors);

  // sample picker
  const picker = el("g", { class: "ctl" }, layers.actors);
  el("rect", { x: SW.x - 18, y: SW.y - 30, width: 9 * (SW.s + SW.gap) + 28, height: SW.s + 58, rx: 18, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 1.5, filter: "url(#softShadow)" }, picker);
  el("rect", { x: SW.x - 22, y: SW.y - 34, width: 9 * (SW.s + SW.gap) + 36, height: SW.s + 66, rx: 22, fill: "#7b6cd9", class: "ctl-glow" }, picker);
  el("text", { x: SW.x - 4, y: SW.y - 10, class: "scene-label", text: "SMOOTH" }, picker);
  el("text", { x: SW.x + 9 * (SW.s + SW.gap) - 4, y: SW.y - 10, class: "scene-label", "text-anchor": "end", text: "ROUGH" }, picker);
  const chips = [];
  for (let lv = 1; lv <= 9; lv++) {
    const x = SW.x + (lv - 1) * (SW.s + SW.gap);
    const g = el("g", { class: "preset" }, picker);
    const ring = el("rect", { x: x - 3, y: SW.y - 3, width: SW.s + 6, height: SW.s + 6, rx: 12, fill: "none", stroke: "#7b6cd9", "stroke-width": 3, opacity: 0 }, g);
    el("rect", { x, y: SW.y, width: SW.s, height: SW.s, rx: 9, fill: `url(#grit${lv})`, stroke: "#d8d0f0" }, g);
    el("text", { x: x + SW.s / 2, y: SW.y + SW.s + 16, "text-anchor": "middle", text: String(lv) }, g);
    const hit = el("rect", { x: x - 3, y: SW.y - 6, width: SW.s + 6, height: SW.s + 28, fill: "transparent", class: "hit" }, g);
    hit.addEventListener("pointerdown", (e) => { e.preventDefault(); pick(lv); });
    chips.push({ g, ring });
  }
  const lock = lockBadge(picker, SW.x + 9 * (SW.s + SW.gap) + 4, SW.y - 26, 14);

  const A = layers.actors;
  const dust = particles(A, anim, { fill: "#e9dcc4", stroke: "#c9ab82", strokeWidth: 1, grow: 6, alpha: 0.8, dragX: 0.1, dragY: 0.2, lift: 12 });
  const blockA = el("g", {}, A), blockB = el("g", { opacity: 0 }, A);
  const bA = el("g", {}, blockA), bB = el("g", {}, blockB);
  function block(g, w, h, fill, label) {
    el("ellipse", { cx: 0, cy: 4, rx: w / 2, ry: 4, fill: "#2a2440", opacity: 0.15 }, g);
    el("rect", { x: -w / 2, y: -h, width: w, height: h, rx: 7, fill, stroke: "#ffffff", "stroke-width": 2 }, g);
    el("rect", { x: -w / 2 + 6, y: -h + 5, width: w - 12, height: 5, rx: 2.5, fill: "#fff", opacity: 0.45 }, g);
    if (label) el("text", { x: 0, y: -h / 2 + 5, "text-anchor": "middle", class: "weight-label", text: label, style: "font-size:11px" }, g);
  }
  block(bA, 56, 40, "url(#blockA)", null);
  block(bB, 64, 48, "url(#slxSteel)", "HEAVY");
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const BW = () => (S.round === 2 ? 64 : 56);
  const HALF = () => BW() / 2;
  function draw() {
    const cx = X0 + S.x * PX;
    [bA, bB].forEach((b) => set(b, { transform: `translate(${cx.toFixed(1)},${LANE - 4})` }));
    // the spring stays at the start line; only the block slides away
    const px0 = X0 - 124, px1 = X0 + Math.min(0, S.x) * PX - HALF() - 10;
    let d = `M${px0} ${LANE - 28}`;
    const coils = 7, w = (px1 - px0) / coils;
    for (let i = 0; i < coils; i++) d += ` l${(w / 2).toFixed(1)} -12 l${(w / 2).toFixed(1)} 24 l0 -12`;
    set(spring, { d });
    set(plate, { x: px1 });
  }
  function paint() {
    chips.forEach((c, i) => set(c.ring, { opacity: S.level === i + 1 ? 1 : 0 }));
    set(surf, { width: S.level ? MAX * PX + 60 : 0, fill: S.level ? `url(#grit${S.level})` : "none" });
    set(lock, { opacity: S.locked ? 1 : 0 });
  }
  async function pick(lv) {
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.level)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    S.level = lv; S.chosen = true;
    paint();
    if (!RM) await tween(260, (u) => set(surf, { width: (MAX * PX + 60) * u }), ease.outCubic);
    api.onSetting(lv);
  }
  async function setSetting(v, animate) {
    S.level = v; S.chosen = true;
    paint();
    if (animate && !RM) await tween(300, (u) => set(surf, { width: (MAX * PX + 60) * u }), ease.outCubic);
    api.onSetting(v);
  }
  async function run(dist) {
    S.busy = true;
    await tween(RM ? 0 : 350, (u) => { S.comp = u; S.x = -u * 30 / PX; draw(); }, ease.outCubic);
    if (RM) { S.comp = 0; S.x = dist; draw(); S.busy = false; return; }
    await tween(90, (u) => { S.comp = 1 - u; S.x = -(1 - u) * 30 / PX; draw(); }, ease.linear);
    const T = 500 + dist * 90;
    await tween(T, (u) => {
      S.x = dist * (1 - Math.pow(1 - u, 2));
      draw();
      const v = 1 - u;
      if (Math.random() < v * (0.2 + S.level * 0.08)) dust.emit(X0 + S.x * PX - HALF(), LANE - 2, -30 - Math.random() * 40 * v, -10 - Math.random() * 20, 2, 0.5);
    }, ease.linear);
    S.x = dist; draw();
    S.busy = false;
  }
  async function reset() {
    S.busy = true;
    const from = S.x;
    await tween(RM ? 0 : 200, (u) => { (S.round === 2 ? blockB : blockA).style.opacity = 1 - u; });
    S.x = 0; draw();
    await tween(RM ? 0 : 260, (u) => { (S.round === 2 ? blockB : blockA).style.opacity = u; }, ease.outCubic);
    S.level = null; S.chosen = false;
    paint();
    S.busy = false;
    api.onSetting(0);
    return from;
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: blockA, newG: blockB }); draw(); return; }
    await armSwap(arm, anim, { x: X0 + S.x * PX, grabY: LANE - 4 - 40 - 22, oldG: blockA, newG: blockB });
  }
  draw();
  paint();
  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 72, pinHead: true, landingBlockW: 70,
    trackX: (v) => X0 + v * PX,
    getSetting: () => S.level,
    hasSetting: () => S.chosen && S.level != null,
    setSetting, run, reset, playTwist,
    setEnabled(on) { S.enabled = on; picker.classList.toggle("disabled", !on); },
    setLocked(on) { S.locked = on; paint(); },
    setAttention(on) { picker.classList.toggle("attention", !!on); },
    destroy() { dust.destroy(); },
  };
}
