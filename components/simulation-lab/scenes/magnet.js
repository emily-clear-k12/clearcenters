// Magnet Pull scene (3.7A-SL). The student drags the magnet up or down its
// stand (or taps − / +) to set its distance above a dish of paperclips; on
// "Test it!" clips leap up and cling to the magnet, then drop one by one
// into a numbered counting tray. The count is the outcome.
// Twist: "biggerMagnet" — the robot arm swaps in a bigger, stronger magnet.
import { el, set, lerp, clamp, ease, addDefs, svgPoint } from "../kit/core";
import { ground, floorTiles, robotArm, lockBadge, metalDefs } from "../kit/parts";
import { countPad, armSwap, armSwapInstant } from "../kit/controls";

const TY = 512, X0 = 600, PX = 66, COUNT = 10;
const CX = 300, DISH = 444, CM = 17; // 1 cm = 20 px on the stand ruler
const POLE = 150;

export const magnetScene = {
  id: "magnet",
  runLabel: "Test it!",
  resetLabel: "Drop the clips",
  sam: {
    start: "Drag the magnet up or down (or tap − / +) to pick how far it is from the paperclips.",
    pumping: "{v} cm away! Now drag the purple flag to predict how many clips it will hold.",
    needFlag: "Drag the purple flag to how many paperclips you think it will pick up.",
    needSetting: "Move the magnet first — drag it up or down!",
    ready: "Great prediction! Tap “Test it!”",
    readyNoFlag: "Ready when you are — tap “Test it!”",
    running: "Here come the paperclips…",
    full: "That’s as far as it goes — {max} cm.",
    empty: "That’s as close as it goes — {min} cm.",
    repeat: "You already tried {v} cm. Try a different distance to find a pattern!",
    next: "Tap Drop the clips, then move the magnet to a new distance.",
    locked: "Mission Control set this test to {v} cm — just place your flag!",
    fairTest: "Think about what you changed when you moved the magnet.",
    twistPredict: "This magnet is bigger and stronger. At {v} cm, how many clips will it hold? Move your flag!",
    twistRun2: "Now pick any distance and test the big magnet once more.",
    explain: "Use your chart! Tell one distance and how many paperclips it held.",
    pastFlag: "It held {v} more than your flag.",
    beforeFlag: "It held {v} fewer than your flag.",
    compareR1: "In Round 1 the same distance held {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim, svg } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable;
  const S = { d: null, shown: V.max + 0.6, chosen: false, enabled: true, locked: false, busy: false, round: 1, dragging: false };
  metalDefs(defs);
  addDefs(defs, "magDefs", `
    <linearGradient id="magRed" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#d9404f"/><stop offset=".45" stop-color="#ff7382"/><stop offset="1" stop-color="#c7303f"/>
    </linearGradient>`);
  const st = layers.static;
  ground(st, defs, TY);
  const tiles = floorTiles(st, anim, { x0: X0, px: PX, TY, count: COUNT, padLeft: X0 - 40, caption: "" });
  el("text", { x: X0 - 54, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "CLIP" }, st);
  el("text", { x: X0 - 54, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "COUNTER →" }, st);
  // stand + ruler
  el("ellipse", { cx: POLE, cy: 466, rx: 50, ry: 8, fill: "#2a2440", opacity: 0.1 }, st);
  el("rect", { x: POLE - 40, y: 452, width: 80, height: 14, rx: 7, fill: "#5b5378" }, st);
  el("rect", { x: POLE - 6, y: 180, width: 12, height: 276, rx: 5, fill: "url(#slxChrome)" }, st);
  const rulerX = CX + 70;
  el("rect", { x: rulerX - 4, y: DISH - 8 - (V.max + 0.5) * CM, width: 40, height: (V.max + 0.5) * CM + 8, rx: 8, fill: "#ffffff", stroke: "#d8d0f0", "stroke-width": 1.5 }, st);
  for (let c = 0; c <= V.max; c++) {
    const y = DISH - 8 - c * CM;
    el("rect", { x: rulerX - 4, y: y - 1, width: c % 1 ? 6 : 10, height: 2, fill: "#5b5378" }, st);
    if (c % 1 === 0) el("text", { x: rulerX + 20, y: y + 5, "text-anchor": "middle", class: "scene-num", style: "font-size:12px", text: String(c) }, st);
  }
  el("text", { x: rulerX + 16, y: DISH + 20, "text-anchor": "middle", class: "scene-label", text: "cm" }, st);
  // dish of clips
  el("ellipse", { cx: CX, cy: 468, rx: 100, ry: 8, fill: "#2a2440", opacity: 0.1 }, st);
  el("path", { d: `M${CX - 80} ${DISH - 8} H${CX + 80} L${CX + 66} ${DISH + 16} H${CX - 66} Z`, fill: "#e9e4f6", stroke: "#cfc8e6", "stroke-width": 2 }, st);
  el("rect", { x: CX - 26, y: DISH + 16, width: 52, height: 10, fill: "#cfc8e6" }, st);

  const A = layers.actors;
  const pileG = el("g", {}, A);
  function clip(parent, x, y, rot, col = "#8691a6") {
    const g = el("g", { transform: `translate(${x},${y}) rotate(${rot})` }, parent);
    el("path", { d: "M-4 7 V-5 A4 4 0 0 1 4 -5 V6 A2.5 2.5 0 0 1 -1 6 V-3", fill: "none", stroke: col, "stroke-width": 2.2, "stroke-linecap": "round" }, g);
    return g;
  }
  const pile = [];
  for (let i = 0; i < 18; i++) pile.push(clip(pileG, CX - 60 + (i % 9) * 15 + (i > 8 ? 7 : 0), DISH - 12 - (i > 8 ? 7 : 0), (i * 47) % 180 - 90));
  const flyG = el("g", {}, A);
  const counted = el("g", {}, layers.under);

  // magnet on a slider (height) inside a swap wrapper (twist)
  const slider = el("g", { class: "ctl" }, A);
  el("rect", { x: POLE - 14, y: -14, width: 28, height: 28, rx: 8, fill: "#7b6cd9" }, slider);
  el("rect", { x: POLE, y: -5, width: CX - POLE, height: 10, rx: 5, fill: "url(#slxChrome)" }, slider);
  el("circle", { cx: CX, cy: 0, r: 60, fill: "#7b6cd9", class: "ctl-glow" }, slider);
  const magA = el("g", {}, slider), magB = el("g", { opacity: 0 }, slider);
  function magnet(parent, w, h, label) {
    const g = el("g", {}, parent);
    el("rect", { x: CX - 5, y: 0, width: 10, height: 12, fill: "#5b5378" }, g);
    el("path", { d: `M${CX - w / 2} 10 H${CX + w / 2} V${h} H${CX + w / 2 - w * 0.3} V${h * 0.5} A${w * 0.2} ${w * 0.2} 0 0 0 ${CX - w / 2 + w * 0.3} ${h * 0.5} V${h} H${CX - w / 2} Z`, fill: "url(#magRed)", stroke: "#a82232", "stroke-width": 2, "stroke-linejoin": "round" }, g);
    el("rect", { x: CX - w / 2, y: h - 12, width: w * 0.3, height: 12, fill: "#dfe3ec" }, g);
    el("rect", { x: CX + w / 2 - w * 0.3, y: h - 12, width: w * 0.3, height: 12, fill: "#dfe3ec" }, g);
    if (label) el("text", { x: CX, y: 28, "text-anchor": "middle", class: "weight-label", text: label }, g);
    return g;
  }
  magnet(magA, 64, 56, null);
  magnet(magB, 92, 70, "BIG");
  const clingG = el("g", {}, slider);
  const hit = el("rect", { x: CX - 70, y: -20, width: 140, height: 100, fill: "transparent", class: "hit" }, slider);
  const lock = lockBadge(slider, CX + 56, 0, 14);
  const distTag = el("g", { opacity: 0 }, A);
  const tagR = el("rect", { width: 70, height: 30, rx: 15, fill: "#f0932b" }, distTag);
  const tagT = el("text", { "text-anchor": "middle", class: "chip-text", fill: "#fff", text: "" }, distTag);
  const gapLine = el("line", { stroke: "#f0932b", "stroke-width": 2.5, "stroke-dasharray": "4 5", opacity: 0 }, A);

  const pad = countPad(A, { x: 170, y: 190, unit: "cm", width: 210, onStep: step });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const magH = () => (S.round === 2 ? 70 : 56);
  const bottomFor = (d) => DISH - 8 - d * CM;
  function draw() {
    const yb = bottomFor(S.shown);
    set(slider, { transform: `translate(0,${(yb - magH()).toFixed(1)})` });
    const show = S.d != null;
    set(distTag, { opacity: show ? 1 : 0, transform: `translate(${rulerX + 44},${(yb + (DISH - 8)) / 2 - 15})` });
    tagT.textContent = show ? `${S.d} cm` : "";
    set(tagT, { x: 35, y: 21 });
    set(gapLine, { x1: rulerX - 10, x2: rulerX - 10, y1: yb, y2: DISH - 8, opacity: show ? 0.9 : 0 });
    if (S.d == null) pad.set("—", { unitText: "cm", atMin: false, atMax: false });
    else pad.set(S.d, { unitText: "cm", atMin: S.d <= V.min, atMax: S.d >= V.max });
    set(lock, { opacity: S.locked ? 1 : 0 });
  }
  async function moveTo(d, ms = 260) {
    const from = S.shown;
    await tween(RM ? 0 : ms, (u) => { S.shown = lerp(from, d, u); draw(); }, ease.outCubic);
  }
  function choose(d) {
    S.d = d; S.chosen = true;
    draw();
    api.onSetting(d);
  }
  async function step(dir) {
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.d)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    const cur = S.d == null ? (dir > 0 ? V.min - 1 : V.max + 1) : S.d;
    const next = clamp(cur + dir * V.step, V.min, V.max);
    if (next === S.d) { api.say(dir > 0 ? cfg.sam.full(V.max) : cfg.sam.empty(V.min)); return; }
    choose(next);
    moveTo(next);
  }
  // drag the magnet
  hit.addEventListener("pointerdown", async (e) => {
    e.preventDefault();
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.d)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    S.dragging = true;
    try { hit.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    const p0 = svgPoint(svg, e.clientX, e.clientY);
    const off = p0.y - bottomFor(S.shown);
    const move = (ev) => {
      if (!S.dragging) return;
      const p = svgPoint(svg, ev.clientX, ev.clientY);
      const d = clamp((DISH - 8 - (p.y - off)) / CM, V.min, V.max);
      S.shown = d; draw();
      const snapped = Math.round(d);
      if (snapped !== S.d) choose(snapped);
    };
    const up = () => {
      S.dragging = false;
      hit.removeEventListener("pointermove", move);
      hit.removeEventListener("pointerup", up);
      hit.removeEventListener("pointercancel", up);
      if (S.d != null) moveTo(S.d, 160);
    };
    hit.addEventListener("pointermove", move);
    hit.addEventListener("pointerup", up);
    hit.addEventListener("pointercancel", up);
  });

  async function setSetting(v, animate) {
    choose(v);
    await moveTo(v, animate && !RM ? 500 : 0);
  }
  async function run(dist) {
    S.busy = true;
    pad.setVisible(false);
    const n = Math.round(dist);
    const yb = bottomFor(S.shown);
    const cling = [];
    for (let i = 0; i < n; i++) {
      const src = pile[i % pile.length];
      const x0 = CX - 60 + (i % 9) * 15, y0 = DISH - 12;
      const ty = magH() + 8 + Math.floor(i / 3) * 12, tx = CX - 16 + (i % 3) * 16;
      const c = clip(flyG, x0, y0, 0);
      src.style.opacity = i < pile.length ? 0.25 : 1;
      await tween(RM ? 0 : 150, (u) => set(c, { transform: `translate(${lerp(x0, tx, u).toFixed(1)},${lerp(y0, yb - magH() + ty, u).toFixed(1)}) rotate(${u * 180})` }), ease.inOutCubic);
      c.remove();
      cling.push(clip(clingG, tx, ty, 180));
    }
    await anim.wait(RM ? 0 : 350);
    // count them into the tray
    for (let i = 0; i < n; i++) {
      const c = cling[i];
      const yb2 = bottomFor(S.shown) - magH();
      const fx = CX - 16 + (i % 3) * 16, fy = yb2 + magH() + 8 + Math.floor(i / 3) * 12;
      c.remove();
      const f = clip(flyG, fx, fy, 180);
      const tx = X0 + i * PX + PX / 2, ty = TY + 22;
      await tween(RM ? 0 : 240, (u) => set(f, { transform: `translate(${lerp(fx, tx, u).toFixed(1)},${(lerp(fy, ty, u) - Math.sin(u * Math.PI) * 60).toFixed(1)}) rotate(${180 + u * 180})` }), ease.inOutCubic);
      f.remove();
      clip(counted, tx, ty, 0, "#5b5378");
    }
    tiles.countUp(n, S.round === 2 ? "#f0932b" : "#2bb3a3");
    S.busy = false;
  }
  async function reset() {
    S.busy = true;
    await tween(RM ? 0 : 220, (u) => set(counted, { opacity: 1 - u }));
    counted.innerHTML = "";
    set(counted, { opacity: 1 });
    tiles.clear();
    pile.forEach((p) => { p.style.opacity = 1; });
    S.d = null; S.chosen = false;
    await moveTo(V.max + 0.6, 300);
    draw();
    pad.setVisible(true);
    S.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: magA, newG: magB }); draw(); return; }
    pad.setVisible(false);
    const top = bottomFor(S.shown) - 56;
    await armSwap(arm, anim, { x: CX, grabY: top - 18, oldG: magA, newG: magB, onSwap: () => draw() });
    pad.setVisible(true);
  }
  draw();
  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    getSetting: () => S.d,
    hasSetting: () => S.chosen && S.d != null,
    setSetting, run, reset, playTwist,
    setEnabled(on) { S.enabled = on; pad.setEnabled(on); slider.classList.toggle("disabled", !on); },
    setLocked(on) { S.locked = on; draw(); },
    setAttention(on) { slider.classList.toggle("attention", !!on); pad.g.classList.toggle("attention", !!on); },
    showCount: null,
    destroy() {},
  };
}
