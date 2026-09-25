// Ramp scene (3.8B-SL). The student drags the top of a ramp to pick an angle;
// a toy cart carrying a ball rolls down and across numbered floor tiles.
// Twist is data-driven by the case's `scene.twist.type`:
//   "carpet"    (current) the robot arm drops a carpet roll that unrolls over
//               the floor tiles, so the cart stops sooner at every angle.
//   "heavyBall" (previous) the arm swaps in a heavier steel ball. Kept so the
//               switch back is a one-line case change (plus its lookup table).
import { el, set, lerp, clamp, ease, addDefs, svgPoint } from "../kit/core";
import { ground, floorTiles, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";

const TY = 512, P = { x: 420, y: TY }, L = 330, TILES = 14, PX = (1320 - 420) / 14, S0 = L - 84, CS = 1.3, WR = 10.5 * CS;
const DEG = Math.PI / 180;

export const rampScene = {
  id: "ramp",
  runLabel: "Let it roll!",
  resetLabel: "Back to the top",
  sam: {
    start: "Drag the top of the ramp up or down to pick an angle.",
    pumping: "{v}° it is! Now drag the purple flag to predict.",
    needFlag: "Drag the purple flag to where you think the cart will stop.",
    needSetting: "Pick an angle first — drag the top of the ramp.",
    ready: "Nice prediction! Tap “Let it roll!”",
    readyNoFlag: "Ready when you are — tap “Let it roll!”",
    running: "Here it goes!",
    full: "That’s the steepest it goes — {max}°.",
    empty: "That’s the flattest it goes — {min}°.",
    repeat: "You already tried {v}°. Try a different angle to find a pattern!",
    next: "Change the angle for your next run.",
    locked: "Mission Control set this test to {v}° — just place your flag!",
    fairTest: "Think about what you changed with your finger each time.",
    twistPredict: "The floor is carpet now. At {v}°, where will it stop? Move your flag!",
    twistRun2: "Now pick any angle and roll it once more.",
    explain: "Use your chart! Tell one angle you tried and how far it rolled.",
  },
  // Per-twist S.A.M. overrides (merged over `sam` for the case's twist type).
  samByTwist: {
    heavyBall: { twistPredict: "The ball is heavier now. At {v}°, where will it stop? Move your flag!" },
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim, svg } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable;
  const twistType = (cfg.twist && cfg.twist.type) || "carpet";
  const S = { angle: 30, target: 30, chosen: false, enabled: true, locked: false, rolling: false, mode: "ramp", s: S0, fx: 0, rot: 0, wheel: 0, heavy: false, carOpacity: 1, carpet: false };

  metalDefs(defs);
  addDefs(defs, "plank", `
    <linearGradient id="plank" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dcd5f0"/>
    </linearGradient>
    <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd970"/><stop offset="1" stop-color="#f5a623"/>
    </linearGradient>
    <radialGradient id="ballR1" cx="35%" cy="30%" r="75%">
      <stop offset="0" stop-color="#ffc2cf"/><stop offset=".5" stop-color="#ff7a95"/><stop offset="1" stop-color="#d9406a"/>
    </radialGradient>
    <radialGradient id="ballR2" cx="35%" cy="30%" r="75%">
      <stop offset="0" stop-color="#eef1f6"/><stop offset=".45" stop-color="#9aa4b8"/><stop offset="1" stop-color="#4c566c"/>
    </radialGradient>
    <clipPath id="aboveFloor"><rect x="0" y="0" width="1366" height="${TY}"/></clipPath>
    <pattern id="carpetPile" width="10" height="8" patternUnits="userSpaceOnUse">
      <rect width="10" height="8" fill="#f7c99c"/>
      <path d="M1 7 l1.5 -4 M5 7 l1 -3.5 M8 7.5 l1.2 -4" stroke="#e8a86c" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="3.5" cy="2" r=".9" fill="#fbe0c3"/>
    </pattern>
    <linearGradient id="carpetRoll" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbd7b0"/><stop offset="1" stop-color="#e39a5c"/>
    </linearGradient>
    <clipPath id="carpetReveal"><rect id="carpetRevealRect" x="${P.x}" y="${TY - 4}" width="0" height="56"/></clipPath>`);

  /* ---------- static: floor + tiles ---------- */
  const st = layers.static;
  ground(st, defs, TY);
  const tiles = floorTiles(st, anim, { x0: P.x, px: PX, TY, count: TILES, padLeft: 30, caption: "floor tiles" });

  // Carpet covering (twist "carpet"), drawn into the tiles' surface layer so
  // tile numbers stay countable and the count highlight still shows on top.
  const carpet = el("g", { "clip-path": "url(#carpetReveal)", opacity: 0 }, tiles.surface);
  const carpetEnd = P.x + TILES * PX;
  el("rect", { x: P.x + 1, y: TY - 3, width: carpetEnd - P.x - 1, height: 50, rx: 8, fill: "url(#carpetPile)", stroke: "#dd9a5e", "stroke-width": 1.5 }, carpet);
  el("rect", { x: P.x + 1, y: TY - 3, width: carpetEnd - P.x - 1, height: 5, rx: 2.5, fill: "#e39a5c", opacity: 0.55 }, carpet);
  for (let i = 1; i < TILES; i++) el("line", { x1: P.x + i * PX, x2: P.x + i * PX, y1: TY + 4, y2: TY + 40, stroke: "#df9f63", "stroke-width": 1.4, "stroke-dasharray": "3 4", opacity: 0.8 }, carpet);
  for (let i = 0; i < TILES; i++) el("text", { x: P.x + i * PX + PX / 2, y: TY + 29, class: "ruler-num tile-num carpet-num", "text-anchor": "middle", text: String(i + 1) }, carpet);
  const revealRect = defs.querySelector("#carpetRevealRect");

  /* ---------- ramp (rotating) ---------- */
  const rampWrap = el("g", { "clip-path": "url(#aboveFloor)" }, st);
  const post = el("g", {}, st);
  const postFoot = el("rect", { width: 44, height: 10, rx: 5, fill: "#cfc8e6" }, post);
  const postOuter = el("rect", { width: 22, rx: 6, fill: "#7b6cd9" }, post);
  const postInner = el("rect", { width: 10, rx: 4, fill: "url(#slxChrome)" }, post);
  const rampG = el("g", {}, rampWrap);
  el("rect", { x: P.x - L - 8, y: 0, width: L + 30, height: 20, rx: 8, fill: "url(#plank)", stroke: "#cfc6ea", "stroke-width": 1.5, transform: `translate(0,${P.y})` }, rampG);
  el("rect", { x: P.x - L - 8, y: P.y - 3, width: L + 30, height: 6, rx: 3, fill: "#2bb3a3" }, rampG);
  for (let i = 0; i < 6; i++) {
    const x = P.x - L + 40 + i * 42;
    el("path", { d: `M${x} ${P.y + 7} l7 5 l-7 5`, fill: "none", stroke: "#b3a9dc", "stroke-width": 2.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, rampG);
  }
  el("rect", { x: P.x - L - 8, y: P.y - 22, width: 10, height: 22, rx: 3, fill: "#5b5378" }, rampG);
  const wedge = el("path", { fill: "#2bb3a3", opacity: 0.16 }, st);
  const wedgeArc = el("path", { fill: "none", stroke: "#2bb3a3", "stroke-width": 2.5 }, st);

  const notchG = el("g", { class: "notches" }, st);
  const notches = [];
  {
    const a0 = V.min * DEG, a1 = V.max * DEG;
    el("path", { d: `M${P.x - L * Math.cos(a0)} ${P.y - L * Math.sin(a0)} A${L} ${L} 0 0 1 ${P.x - L * Math.cos(a1)} ${P.y - L * Math.sin(a1)}`, fill: "none", stroke: "#cfc6ea", "stroke-width": 3, "stroke-dasharray": "2 9", "stroke-linecap": "round" }, notchG);
  }
  for (let a = V.min; a <= V.max; a += V.step) {
    const x = P.x - L * Math.cos(a * DEG), y = P.y - L * Math.sin(a * DEG);
    const g = el("g", { class: "notch" }, notchG);
    el("circle", { cx: x, cy: y, r: 6, class: "notch-dot" }, g);
    if (a === V.min || a === V.max) {
      const lx = P.x - (L + 40) * Math.cos(a * DEG), ly = P.y - (L + 40) * Math.sin(a * DEG);
      el("text", { x: lx, y: ly + 5, "text-anchor": "middle", class: "notch-label", text: `${a}°` }, g);
    }
    const hit = el("circle", { cx: x, cy: y, r: 25, fill: "transparent", class: "hit" }, g);
    const angle = a;
    hit.addEventListener("pointerdown", async (e) => { e.preventDefault(); e.stopPropagation(); await choose(angle); });
    notches.push({ a, g });
  }

  /* ---------- actors ---------- */
  const A = layers.actors;
  const fxLayer = el("g", {}, A);
  const dust = particles(fxLayer, anim, { stroke: "#d4cbef", strokeWidth: 1.2, grow: 10, alpha: 0.7, dragX: 0.1, dragY: 1, lift: 0 });
  const carShadow = el("ellipse", { rx: 36, ry: 5, fill: "#2a2440", opacity: 0.12 }, A);
  const car = el("g", { class: "car" }, A);
  const carInner = el("g", {}, el("g", { transform: `scale(${CS})` }, car));
  el("path", { d: "M-26 -36 Q0 -46 26 -36", fill: "none", stroke: "#d98b12", "stroke-width": 5, "stroke-linecap": "round" }, carInner);
  const ballG = el("g", { transform: "translate(0,-38)" }, carInner);
  const ball = el("circle", { r: 14, fill: "url(#ballR1)" }, ballG);
  const ballBand = el("path", { d: "M-14 0 Q0 7 14 0", fill: "none", stroke: "#ffffff", "stroke-width": 3, opacity: 0.7 }, ballG);
  el("ellipse", { cx: -5, cy: -6, rx: 4.5, ry: 3, fill: "#ffffff", opacity: 0.7 }, ballG);
  el("path", { d: "M-34 -34 H34 Q38 -34 37 -28 L33 -14 Q32 -10 27 -10 H-27 Q-32 -10 -33 -14 L-37 -28 Q-38 -34 -34 -34 Z", fill: "url(#carBody)", stroke: "#d98b12", "stroke-width": 1.5 }, carInner);
  el("rect", { x: -28, y: -30, width: 56, height: 4, rx: 2, fill: "#ffffff", opacity: 0.5 }, carInner);
  el("circle", { cx: 30, cy: -24, r: 3.2, fill: "#fff6d6" }, carInner);
  el("rect", { x: -31, y: -21, width: 62, height: 5, rx: 2.5, fill: "#7b6cd9", opacity: 0.85 }, carInner);
  function wheel(x) {
    const g = el("g", { transform: `translate(${x},-10)` }, carInner);
    el("circle", { r: 10.5, fill: "#2a2440" }, g);
    el("circle", { r: 6, fill: "#e9e4f6" }, g);
    const sp = el("g", {}, g);
    el("rect", { x: -1.3, y: -6, width: 2.6, height: 12, rx: 1.3, fill: "#7b6cd9" }, sp);
    el("rect", { x: -6, y: -1.3, width: 12, height: 2.6, rx: 1.3, fill: "#7b6cd9" }, sp);
    el("circle", { r: 2, fill: "#2a2440" }, g);
    return sp;
  }
  const w1 = wheel(-20), w2 = wheel(20);
  const carHit = el("rect", { x: -56, y: -76, width: 112, height: 90, fill: "transparent", class: "hit" }, car);

  const knob = el("g", { class: "ramp-knob" }, A);
  el("circle", { r: 40, class: "knob-pulse" }, knob);
  el("circle", { r: 27, fill: "#ffffff", stroke: "#f0932b", "stroke-width": 5, filter: "url(#softShadow)" }, knob);
  el("path", { d: "M-8 -5 L0 -13 L8 -5 M-8 5 L0 13 L8 5", fill: "none", stroke: "#f0932b", "stroke-width": 3.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, knob);
  const knobHit = el("circle", { r: 46, fill: "transparent", class: "hit" }, knob);
  const angleTag = el("g", { class: "angle-tag" }, A);
  el("rect", { x: -40, y: -20, width: 80, height: 40, rx: 20, fill: "#f0932b" }, angleTag);
  const angleText = el("text", { x: 0, y: 8, "text-anchor": "middle", class: "angle-text", text: "30°" }, angleTag);
  const lock = lockBadge(angleTag, 44, -14, 13);

  // twist props
  const arm = robotArm(A, defs, anim, { clawLength: 30, cargoY: 22 });
  const armBall = el("g", { opacity: 0 }, arm.cargo);
  el("circle", { r: 16 * CS, fill: "url(#ballR2)" }, armBall);
  el("path", { d: "M-16 0 Q0 7 16 0", fill: "none", stroke: "#2a2440", "stroke-width": 3, opacity: 0.35 }, armBall);
  const armRoll = el("g", { opacity: 0 }, arm.cargo);
  drawRoll(armRoll, 22);
  const flyBall = el("g", { opacity: 0 }, A);
  el("circle", { r: 14 * CS, fill: "url(#ballR1)" }, flyBall);
  const roll = el("g", { opacity: 0 }, A);
  const rollBody = el("g", {}, roll);

  function drawRoll(g, r) {
    g.innerHTML = "";
    el("circle", { r, fill: "url(#carpetRoll)", stroke: "#c98142", "stroke-width": 2 }, g);
    el("path", { d: `M0 0 m${-r * 0.2} 0 a${r * 0.2} ${r * 0.2} 0 1 1 ${r * 0.4} 0 a${r * 0.45} ${r * 0.45} 0 1 1 ${-r * 0.8} 0 a${r * 0.7} ${r * 0.7} 0 1 1 ${r * 1.3} 0`, fill: "none", stroke: "#c98142", "stroke-width": 1.8, opacity: 0.8 }, g);
  }

  /* ---------- geometry + draw ---------- */
  const top = (a) => ({ x: P.x - L * Math.cos(a * DEG), y: P.y - L * Math.sin(a * DEG) });
  const onRamp = (s, a) => ({ x: P.x - s * Math.cos(a * DEG), y: P.y - s * Math.sin(a * DEG) });
  function draw() {
    const a = S.angle, T = top(a);
    set(rampG, { transform: `rotate(${a.toFixed(2)} ${P.x} ${P.y})` });
    const px = T.x + 26;
    const under = P.y - (P.x - px) * Math.tan(a * DEG) + 20 / Math.cos(a * DEG) - 2;
    const avail = TY - under;
    const outerH = Math.max(8, Math.min(44, avail - 10));
    set(postFoot, { x: px - 22, y: TY - 8 });
    set(postOuter, { x: px - 11, y: TY - 4 - outerH, height: outerH });
    set(postInner, { x: px - 5, y: under, height: Math.max(0, TY - 4 - outerH - under + 4) });
    const r = 64, e = { x: P.x - r * Math.cos(a * DEG), y: P.y - r * Math.sin(a * DEG) };
    set(wedge, { d: `M${P.x} ${P.y} L${P.x - r} ${P.y} A${r} ${r} 0 0 1 ${e.x} ${e.y} Z` });
    set(wedgeArc, { d: `M${P.x - r} ${P.y} A${r} ${r} 0 0 1 ${e.x} ${e.y}` });
    set(knob, { transform: `translate(${T.x.toFixed(1)},${T.y.toFixed(1)})` });
    const nx = Math.sin(a * DEG), ny = -Math.cos(a * DEG);
    set(angleTag, { transform: `translate(${(T.x + nx * 66 + 8).toFixed(1)},${(T.y + ny * 66).toFixed(1)})` });
    angleText.textContent = `${Math.round(S.target)}°`;
    notches.forEach((n) => n.g.classList.toggle("active", n.a === Math.round(S.target)));
    drawCar();
  }
  function carPose() {
    if (S.mode === "ramp") { const p = onRamp(S.s, S.angle); return { x: p.x, y: p.y, rot: S.angle }; }
    const blend = 1 - ease.outQuad(clamp(S.fx / 30, 0, 1));
    return { x: P.x + S.fx, y: P.y, rot: S.rot * blend };
  }
  function drawCar() {
    const c = carPose();
    set(car, { transform: `translate(${c.x.toFixed(2)},${c.y.toFixed(2)}) rotate(${c.rot.toFixed(2)})` });
    set(w1, { transform: `rotate(${S.wheel.toFixed(1)})` });
    set(w2, { transform: `rotate(${S.wheel.toFixed(1)})` });
    set(carShadow, { cx: c.x, cy: c.y + 1, rx: 46, opacity: S.mode === "ramp" ? 0 : 0.12 });
    car.style.opacity = S.carOpacity;
  }
  function setBall(heavy) {
    set(ball, { r: heavy ? 16 : 14, fill: heavy ? "url(#ballR2)" : "url(#ballR1)" });
    set(ballBand, { d: heavy ? "M-16 0 Q0 7 16 0" : "M-14 0 Q0 7 14 0", stroke: heavy ? "#2a2440" : "#ffffff", opacity: heavy ? 0.35 : 0.7 });
    set(ballG, { transform: `translate(0,${heavy ? -39 : -38})` });
  }

  function tick(dt) {
    if (Math.abs(S.target - S.angle) > 0.01) {
      S.angle += (S.target - S.angle) * Math.min(1, dt * (RM ? 60 : 12));
      if (Math.abs(S.target - S.angle) < 0.02) S.angle = S.target;
      draw();
    }
  }
  anim.tickers.add(tick);

  /* ---------- interaction ---------- */
  let dragging = false;
  async function choose(a) {
    if (!S.enabled || S.rolling) return;
    if (S.locked) { api.say(cfg.sam.locked(S.target)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    applyTarget(a);
  }
  function applyTarget(a) {
    const snapped = clamp(Math.round(a / V.step) * V.step, V.min, V.max);
    const changed = snapped !== S.target || !S.chosen;
    S.target = snapped;
    S.chosen = true;
    knob.classList.remove("attention");
    if (changed) { draw(); api.onSetting(snapped); }
  }
  knobHit.addEventListener("pointerdown", async (e) => {
    e.preventDefault();
    if (!S.enabled || S.rolling) return;
    if (S.locked) { api.say(cfg.sam.locked(S.target)); return; }
    try { knobHit.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    const ok = await api.beginAdjust();
    if (!ok) return;
    dragging = true;
    knob.classList.add("dragging");
  });
  knobHit.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const p = svgPoint(svg, e.clientX, e.clientY);
    const a = Math.atan2(P.y - p.y, P.x - p.x) / DEG;
    if (a < V.min - 4 && S.target === V.min) api.say(cfg.sam.empty());
    if (a > V.max + 4 && S.target === V.max) api.say(cfg.sam.full());
    applyTarget(clamp(a, V.min - 2, V.max + 2));
  });
  const endDrag = () => { dragging = false; knob.classList.remove("dragging"); };
  knobHit.addEventListener("pointerup", endDrag);
  knobHit.addEventListener("pointercancel", endDrag);
  carHit.addEventListener("pointerdown", () => { if (S.enabled && !S.rolling && !S.locked) api.say(cfg.sam.start()); });

  /* ---------- engine API ---------- */
  async function setSetting(v, animate) {
    S.target = v;
    S.chosen = true;
    if (!animate || RM) S.angle = v;
    draw();
    api.onSetting(v);
    if (animate && !RM) await anim.wait(600);
  }

  async function run(dist) {
    S.rolling = true;
    knob.classList.add("hidden-while-run");
    const a = S.angle * DEG;
    const Dpx = dist * PX;
    if (RM) {
      await tween(250, (u) => { S.carOpacity = 1 - u; drawCar(); });
      S.mode = "floor"; S.fx = Dpx; S.rot = 0; drawCar();
      await tween(300, (u) => { S.carOpacity = u; drawCar(); });
      knob.classList.remove("hidden-while-run");
      S.rolling = false;
      return;
    }
    const g = 1500, acc = g * Math.sin(a);
    const tr = Math.sqrt((2 * S0) / acc), vb = acc * tr;
    const dec = (vb * vb) / (2 * Dpx), tf = vb / dec;
    await tween(160, (e, u) => { S.s = S0 + Math.sin(u * Math.PI) * 3; drawCar(); }, ease.linear);
    let traveled = 0;
    await tween(tr * 1000, (e, u) => {
      const t = u * tr;
      const s = S0 - 0.5 * acc * t * t;
      traveled = S0 - s;
      S.s = Math.max(0, s);
      S.wheel = traveled / WR / DEG;
      drawCar();
    }, ease.linear);
    S.mode = "floor"; S.rot = S.angle; S.fx = 0; drawCar();
    for (let i = 0; i < 6; i++) dust.emit(P.x - 10, P.y - 2, -40 - Math.random() * 60, -20 - Math.random() * 30, 3, 0.6);
    const base = traveled;
    await tween(tf * 1000, (e, u) => {
      const t = u * tf;
      S.fx = vb * t - 0.5 * dec * t * t;
      S.wheel = (base + S.fx) / WR / DEG;
      const sp = (vb - dec * t) / 800;
      drawCar();
      if (Math.random() < sp * (S.carpet ? 0.8 : 0.5)) dust.emit(P.x + S.fx - 40, P.y - 3, -30, -20 - Math.random() * 30, 3, 0.6);
    }, ease.linear);
    S.fx = Dpx; drawCar();
    await tween(360, (e, u) => { set(carInner, { transform: `rotate(${Math.sin(u * Math.PI * 2) * 2.5 * (1 - u)} 0 0)` }); }, ease.linear);
    set(carInner, { transform: "" });
    knob.classList.remove("hidden-while-run");
    S.rolling = false;
  }

  async function reset() {
    S.rolling = true;
    await tween(RM ? 0 : 200, (u) => { S.carOpacity = 1 - u; drawCar(); });
    S.mode = "ramp"; S.s = S0; S.fx = 0; S.rot = 0; S.wheel = 0;
    setBall(S.heavy);
    drawCar();
    await tween(RM ? 0 : 300, (u) => { S.carOpacity = u; drawCar(); }, ease.outQuad);
    knob.classList.remove("hidden-while-run");
    S.rolling = false;
  }

  /* ---------- twists ---------- */
  function showCarpet(width) {
    carpet.setAttribute("opacity", 1);
    set(revealRect, { width: Math.max(0, width) });
  }
  async function playCarpet(instant) {
    if (instant) { S.carpet = true; showCarpet(carpetEnd - P.x + 4); return; }
    const x0 = P.x + 26, rest = TY + 44 - 22;
    arm.show(x0);
    armRoll.style.opacity = 1;
    await arm.move(-80, rest - 22 - 8, 950, ease.outCubic);
    armRoll.style.opacity = 0;
    set(roll, { opacity: 1, transform: `translate(${x0},${rest})` });
    drawRoll(rollBody, 22);
    arm.open();
    const up = arm.move(rest - 30, -100, 700, ease.inOutCubic);
    await anim.wait(RM ? 0 : 150);
    S.carpet = true;
    const dist = carpetEnd - x0 + 10;
    await tween(RM ? 0 : 1500, (u) => {
      const x = x0 + dist * u, r = lerp(22, 9, u);
      drawRoll(rollBody, r);
      set(roll, { transform: `translate(${x.toFixed(1)},${(TY + 44 - r).toFixed(1)}) rotate(${((dist * u) / 22 / DEG).toFixed(1)})` });
      showCarpet(x - P.x);
    }, ease.inOutCubic);
    await up;
    arm.hide();
    arm.close();
    await tween(RM ? 0 : 250, (u) => set(roll, { opacity: 1 - u }), ease.linear);
    showCarpet(carpetEnd - P.x + 4);
  }
  async function playHeavyBall(instant) {
    if (instant) { S.heavy = true; setBall(true); return; }
    const c = carPose();
    const bx = c.x + 38 * CS * Math.sin(S.angle * DEG), by = c.y - 38 * CS * Math.cos(S.angle * DEG);
    arm.show(bx);
    armBall.style.opacity = 1;
    await arm.move(-80, by - 44, 950, ease.outCubic);
    set(flyBall, { opacity: 1, transform: `translate(${bx},${by})` });
    tween(RM ? 0 : 700, (e, u) => { set(flyBall, { transform: `translate(${bx - u * 70},${by - Math.sin(u * Math.PI) * 60 + u * 30})`, opacity: 1 - u }); }, ease.linear)
      .then(() => set(flyBall, { opacity: 0 }));
    ball.style.opacity = 0;
    await tween(RM ? 0 : 160, (u) => set(armBall, { transform: `translate(0,${u * 20})` }), ease.inQuad);
    armBall.style.opacity = 0;
    S.heavy = true;
    setBall(true);
    ball.style.opacity = 1;
    await tween(RM ? 0 : 380, (e, u) => set(carInner, { transform: `translate(0,${Math.sin(u * Math.PI) * 4 * (1 - u)})` }), ease.linear);
    set(carInner, { transform: "" });
    arm.open();
    await arm.move(by - 44, -100, 700, ease.inOutCubic);
    arm.hide();
    arm.close();
  }
  function playTwist({ instant } = {}) {
    return twistType === "heavyBall" ? playHeavyBall(instant) : playCarpet(instant);
  }

  function setEnabled(on) { S.enabled = on; knob.classList.toggle("disabled", !on); notchG.classList.toggle("disabled", !on); }
  function setLocked(on) { S.locked = on; set(lock, { opacity: on ? 1 : 0 }); knob.classList.toggle("locked", on); }
  function setAttention(on) { knob.classList.toggle("attention", !!on); }

  setBall(false);
  draw();
  return {
    TY, unitPx: PX, markerTop: null, flagH: 150, pinChipY: 100, pinHead: false, landingBlockW: 104,
    trackX: (v) => P.x + v * PX,
    getSetting: () => S.target,
    hasSetting: () => S.chosen,
    setSetting, run, reset, playTwist, setEnabled, setLocked, setAttention,
    showCount: (dist, round) => tiles.countUp(dist, round === 2 ? "#f0932b" : "#2bb3a3"),
    clearCount: () => tiles.clear(),
    destroy() { anim.tickers.delete(tick); dust.destroy(); },
  };
}
