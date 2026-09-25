// Shadow Tracker scene (5.9-SL). The student drags the Sun along its
// morning arc (or taps an hour on the arc) to pick a time; on "Sun's up!"
// the Sun brightens and the stick's shadow sweeps out along a ruler on the
// ground. Shadow length (feet) is read at the shadow's tip.
// Twist: "flagpole" — the robot arm swaps the stick for a tall flagpole.
import { el, set, lerp, clamp, ease, addDefs, svgPoint } from "../kit/core";
import { ground, meterTrack, robotArm, lockBadge, metalDefs } from "../kit/parts";
import { armSwap, armSwapInstant } from "../kit/controls";

const TY = 512, X0 = 330, PX = 48, GROUND = TY - 10;
// Sun path (degrees): 8:00 low on the left → 12:00 high, always left of the
// stick so the shadow falls to the right along the ruler.
const ARC = { cx: 280, cy: GROUND + 20, r: 240, a0: 160, a1: 100 };

export const shadowScene = {
  id: "shadow",
  runLabel: "Sun’s up!",
  resetLabel: "Reset",
  sam: {
    start: "Drag the Sun along its path (or tap a time) to pick a time of morning.",
    pumping: "{v}:00! Now drag the purple flag to predict where the shadow will end.",
    needFlag: "Drag the purple flag to where you think the shadow will end.",
    needSetting: "Pick a time first — drag the Sun!",
    ready: "Great prediction! Tap “Sun’s up!”",
    readyNoFlag: "Ready when you are — tap “Sun’s up!”",
    running: "Here comes the sunshine…",
    full: "That’s noon — as late as this test goes.",
    empty: "That’s 8:00 — as early as this test goes.",
    repeat: "You already tried {v}:00. Try a different time to find a pattern!",
    next: "Tap Reset, then move the Sun to a different time.",
    locked: "Mission Control set this test to {v}:00 — just place your flag!",
    fairTest: "Think about what you changed when you moved the Sun.",
    twistPredict: "Now it’s a tall flagpole. At {v}:00, where will its shadow end? Move your flag!",
    twistRun2: "Now pick any time and measure the flagpole’s shadow once more.",
    explain: "Use your chart! Tell one time of morning and how long the shadow was.",
    pastFlag: "The shadow went {v} past your flag.",
    beforeFlag: "The shadow ended {v} before your flag.",
    compareR1: "In Round 1 the stick’s shadow at that time was {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim, svg } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max;
  const S = { hour: null, pos: V.min - 0.6, chosen: false, enabled: true, locked: false, busy: false, round: 1, len: 0, lit: 0, dragging: false };
  metalDefs(defs);
  addDefs(defs, "shDefs", `
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ffe27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="sunCore" cx="40%" cy="35%" r="70%">
      <stop offset="0" stop-color="#fff6c9"/><stop offset=".6" stop-color="#ffd24d"/><stop offset="1" stop-color="#f5a623"/>
    </radialGradient>
    <linearGradient id="shadowGrad" x1="0" x2="1">
      <stop offset="0" stop-color="#2a2440" stop-opacity=".45"/><stop offset="1" stop-color="#2a2440" stop-opacity=".22"/>
    </linearGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 2, minor: 1, fine: 0.5, unitLabel: "ft" });
  const hours = [];
  for (let h = V.min; h <= V.max; h += V.step) hours.push(h);
  const angFor = (pos) => lerp(ARC.a0, ARC.a1, (pos - V.min) / (V.max - V.min));
  const ptFor = (pos) => { const a = (angFor(pos) * Math.PI) / 180; return { x: ARC.cx + Math.cos(a) * ARC.r, y: ARC.cy - Math.sin(a) * ARC.r }; };
  // sun path
  const p0 = ptFor(V.min - 0.35), p1 = ptFor(V.max + 0.2);
  el("path", { d: `M${p0.x} ${p0.y} A${ARC.r} ${ARC.r} 0 0 1 ${p1.x} ${p1.y}`, fill: "none", stroke: "#f0b429", "stroke-width": 3, "stroke-dasharray": "2 10", "stroke-linecap": "round", opacity: 0.8 }, st);
  const A = layers.actors;
  const presets = el("g", {}, A);
  const marks = hours.map((h) => {
    const p = ptFor(h);
    const g = el("g", { class: "preset" }, presets);
    const c = el("circle", { cx: p.x, cy: p.y, r: 17, fill: "#ffffff", stroke: "#f0b429", "stroke-width": 2 }, g);
    el("text", { x: p.x, y: p.y + 5, "text-anchor": "middle", text: String(h), style: "font-size:13px" }, g);
    const hit = el("circle", { cx: p.x, cy: p.y, r: 24, fill: "transparent", class: "hit" }, g);
    hit.addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); choose(h, true); });
    return { g, c };
  });
  // shadow + objects
  const shadow = el("path", { fill: "url(#shadowGrad)" }, A);
  const tip = el("circle", { r: 5, fill: "#2a2440", opacity: 0 }, A);
  const stickA = el("g", {}, A), stickB = el("g", { opacity: 0 }, A);
  function stick(g, h, pole) {
    el("ellipse", { cx: X0, cy: GROUND + 2, rx: 16, ry: 4, fill: "#2a2440", opacity: 0.15 }, g);
    if (pole) {
      el("rect", { x: X0 - 4, y: GROUND - h, width: 8, height: h, rx: 3, fill: "url(#slxChrome)", stroke: "#a39dbd" }, g);
      el("path", { d: `M${X0 + 4} ${GROUND - h + 4} h44 l-10 13 l10 13 h-44 Z`, fill: "#2bb3a3" }, g);
      el("circle", { cx: X0, cy: GROUND - h - 3, r: 5, fill: "#f0b429" }, g);
    } else {
      el("rect", { x: X0 - 5, y: GROUND - h, width: 10, height: h, rx: 4, fill: "#c8894b", stroke: "#a86d33" }, g);
      for (let i = 1; i < 4; i++) el("rect", { x: X0 - 5, y: GROUND - (h * i) / 4, width: 6, height: 2, fill: "#fff", opacity: 0.6 }, g);
    }
    el("rect", { x: X0 - 12, y: GROUND - 3, width: 24, height: 6, rx: 3, fill: "#5b5378" }, g);
  }
  const H1 = 104, H2 = 176;
  stick(stickA, H1, false);
  stick(stickB, H2, true);
  // the Sun (draggable)
  const sun = el("g", { class: "ctl" }, A);
  const glow = el("circle", { r: 60, fill: "url(#sunGlow)", opacity: 0.5 }, sun);
  el("circle", { r: 46, fill: "#f0b429", class: "ctl-glow" }, sun);
  const rays = el("g", {}, sun);
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; el("line", { x1: Math.cos(a) * 30, y1: Math.sin(a) * 30, x2: Math.cos(a) * 40, y2: Math.sin(a) * 40, stroke: "#f5a623", "stroke-width": 4, "stroke-linecap": "round" }, rays); }
  el("circle", { r: 25, fill: "url(#sunCore)" }, sun);
  const sunHit = el("circle", { r: 44, fill: "transparent", class: "hit" }, sun);
  const lock = lockBadge(sun, 26, -26, 13);
  const clock = el("g", { opacity: 0 }, A);
  const clockR = el("rect", { width: 72, height: 30, rx: 15, fill: "#f0932b" }, clock);
  const clockT = el("text", { x: 36, y: 21, "text-anchor": "middle", class: "chip-text", fill: "#fff", text: "" }, clock);
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const hNow = () => (S.round === 2 ? H2 : H1);
  function draw() {
    const p = ptFor(S.pos);
    set(sun, { transform: `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})` });
    set(glow, { r: 60 + 30 * S.lit, opacity: 0.4 + 0.5 * S.lit });
    set(rays, { transform: `rotate(${(S.pos * 20).toFixed(1)})` });
    const show = S.hour != null;
    set(clock, { opacity: show ? 1 : 0, transform: `translate(${(p.x + 40).toFixed(1)},${(p.y - 58).toFixed(1)})` });
    clockT.textContent = show ? `${S.hour}:00` : "";
    marks.forEach((m, i) => set(m.c, { fill: hours[i] === S.hour ? "#ffe9a8" : "#ffffff" }));
    set(lock, { opacity: S.locked ? 1 : 0 });
    const L = S.len * PX, h = hNow();
    set(shadow, { d: L > 0 ? `M${X0 - 5} ${GROUND - 3} L${X0 + L} ${GROUND + 1} L${X0 + L - 2} ${GROUND + 9} L${X0 - 5} ${GROUND + 9} Z` : "M0 0" });
    set(tip, { cx: X0 + L, cy: GROUND + 5, opacity: L > 0 ? 0.7 : 0 });
    void h;
  }
  function choose(h, animate) {
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.hour)); return; }
    api.beginAdjust().then((ok) => {
      if (!ok) return;
      S.hour = h; S.chosen = true;
      const from = S.pos;
      tween(animate && !RM ? 320 : 0, (u) => { S.pos = lerp(from, h, u); draw(); }, ease.outCubic);
      api.onSetting(h);
    });
  }
  sunHit.addEventListener("pointerdown", async (e) => {
    e.preventDefault();
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.hour)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    S.dragging = true;
    try { sunHit.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    const move = (ev) => {
      if (!S.dragging) return;
      const p = svgPoint(svg, ev.clientX, ev.clientY);
      const a = (Math.atan2(ARC.cy - p.y, p.x - ARC.cx) * 180) / Math.PI;
      const pos = clamp(V.min + ((a - ARC.a0) / (ARC.a1 - ARC.a0)) * (V.max - V.min), V.min, V.max);
      S.pos = pos; draw();
      const hh = Math.round(pos);
      if (hh !== S.hour) { S.hour = hh; S.chosen = true; api.onSetting(hh); draw(); }
    };
    const up = () => {
      S.dragging = false;
      sunHit.removeEventListener("pointermove", move);
      sunHit.removeEventListener("pointerup", up);
      sunHit.removeEventListener("pointercancel", up);
      if (S.hour != null) { const from = S.pos; tween(RM ? 0 : 160, (u) => { S.pos = lerp(from, S.hour, u); draw(); }); }
    };
    sunHit.addEventListener("pointermove", move);
    sunHit.addEventListener("pointerup", up);
    sunHit.addEventListener("pointercancel", up);
  });

  async function setSetting(v, animate) {
    S.hour = v; S.chosen = true;
    const from = S.pos;
    await tween(animate && !RM ? 450 : 0, (u) => { S.pos = lerp(from, v, u); draw(); }, ease.outCubic);
    api.onSetting(v);
  }
  async function run(dist) {
    S.busy = true;
    await tween(RM ? 0 : 400, (u) => { S.lit = u; draw(); });
    await tween(RM ? 0 : 700 + dist * 60, (u) => { S.len = dist * u; draw(); }, ease.outCubic);
    S.len = dist; draw();
    S.busy = false;
  }
  async function reset() {
    S.busy = true;
    const from = S.len, pf = S.pos;
    await tween(RM ? 0 : 400, (u) => { S.len = lerp(from, 0, u); S.lit = 1 - u; S.pos = lerp(pf, V.min - 0.6, u); draw(); }, ease.inOutCubic);
    S.hour = null; S.chosen = false; S.len = 0; S.lit = 0;
    draw();
    S.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: stickA, newG: stickB }); draw(); return; }
    await armSwap(arm, anim, { x: X0, grabY: GROUND - H1 - 22, oldG: stickA, newG: stickB, onSwap: () => draw() });
  }
  draw();
  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    trackX: (v) => X0 + v * PX,
    getSetting: () => S.hour,
    hasSetting: () => S.chosen && S.hour != null,
    setSetting, run, reset, playTwist,
    setEnabled(on) { S.enabled = on; sun.classList.toggle("disabled", !on); presets.style.pointerEvents = on ? "" : "none"; },
    setLocked(on) { S.locked = on; draw(); },
    setAttention(on) { sun.classList.toggle("attention", !!on); },
    destroy() {},
  };
}
