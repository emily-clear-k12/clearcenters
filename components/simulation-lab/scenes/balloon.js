// Balloon Rocket scene (5.7B-SL). The student pumps air into a balloon that
// rides a straw on a string; it launches along a meter track.
// Twist: "weight" — the robot arm tapes a weight under the balloon.
import { el, set, lerp, clamp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";

const X0 = 240, PX = 108, SY = 262, TY = 512, PXC = 96;

export const balloonScene = {
  id: "balloon",
  runLabel: "Launch!",
  resetLabel: "New balloon",
  // S.A.M. lines for operating this object. {v} = current setting.
  // A case can override any of these in its public `scene.sam` block.
  sam: {
    start: "Push the pump to fill the balloon. Hold it down to keep pumping!",
    pumping: "{v} breaths! Keep pumping, or drag the purple flag to predict.",
    needFlag: "Now drag the purple flag to where you think the rocket will stop.",
    needSetting: "Pump some air into the balloon first!",
    ready: "Great prediction! Tap Launch when you’re ready.",
    readyNoFlag: "Ready when you are — tap Launch!",
    running: "Whoosh — there it goes!",
    full: "That’s as full as it gets — {max} breaths!",
    empty: "The balloon is already empty.",
    repeat: "You already tried {v} breaths. Try a different number to find a pattern!",
    next: "Tap the pump for a fresh balloon and try a different number of breaths.",
    locked: "Mission Control set this test to {v} breaths — just place your flag!",
    fairTest: "Think about what you did with the pump each time.",
    twistPredict: "The rocket is heavier now. With {v} breaths, where will it stop? Move your flag!",
    twistRun2: "Now pick any number of breaths and launch it once more.",
    explain: "Use your chart! Real numbers make your explanation strong.",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable;
  const S = { breaths: 0, rx: 18, ry: 12, x: X0, y: SY, rot: 0, sq: 1, hoseT: 0, enabled: true, locked: false, busy: false, flying: false };

  metalDefs(defs);
  addDefs(defs, "bGrad", `
    <radialGradient id="bGrad" cx="38%" cy="30%" r="75%">
      <stop offset="0" stop-color="#ffb3c1"/><stop offset=".45" stop-color="#ff7391"/><stop offset="1" stop-color="#d9406a"/>
    </radialGradient>
    <linearGradient id="bNeck" x1="0" x2="1"><stop offset="0" stop-color="#c7365d"/><stop offset="1" stop-color="#f06285"/></linearGradient>
    <pattern id="strawStripe" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <rect width="14" height="14" fill="#ffffff"/><rect width="6" height="14" fill="#5cc9bc"/>
    </pattern>
    <linearGradient id="pumpBody" x1="0" x2="1">
      <stop offset="0" stop-color="#1f8f83"/><stop offset=".35" stop-color="#3cc6b5"/><stop offset=".7" stop-color="#2bb3a3"/><stop offset="1" stop-color="#1c8074"/>
    </linearGradient>`);

  /* ---------- static scenery ---------- */
  const st = layers.static;
  ground(st, defs, TY);
  function stand(x) {
    const g = el("g", { class: "stand" }, st);
    el("ellipse", { cx: x, cy: TY - 4, rx: 34, ry: 7, fill: "#2a2440", opacity: 0.1 }, g);
    el("rect", { x: x - 30, y: TY - 16, width: 60, height: 12, rx: 6, fill: "#cfc8e6" }, g);
    el("rect", { x: x - 5, y: SY - 14, width: 10, height: TY - SY + 2, rx: 5, fill: "url(#slxChrome)" }, g);
    el("rect", { x: x - 14, y: SY - 12, width: 28, height: 24, rx: 8, fill: "#7b6cd9" }, g);
    el("circle", { cx: x, cy: SY, r: 4, fill: "#fff" }, g);
  }
  stand(34);
  stand(1336);
  el("rect", { x: 1316, y: SY - 22, width: 12, height: 44, rx: 6, fill: "#f0932b", opacity: 0.9 }, st);
  el("line", { x1: 34, y1: SY, x2: 1336, y2: SY, stroke: "#6f6892", "stroke-width": 2.4, "stroke-linecap": "round" }, st);
  el("line", { x1: 34, y1: SY - 1, x2: 1336, y2: SY - 1, stroke: "#ffffff", "stroke-width": 0.8, opacity: 0.7 }, st);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: cfg.outcome.max, unitLabel: cfg.outcome.short || "m" });

  /* ---------- pump ---------- */
  const pump = el("g", { class: "pump" }, st);
  el("ellipse", { cx: PXC, cy: 520, rx: 70, ry: 120, fill: "#2bb3a3", opacity: 0, class: "pump-glow" }, pump);
  el("ellipse", { cx: PXC, cy: 614, rx: 58, ry: 9, fill: "#2a2440", opacity: 0.12 }, pump);
  el("rect", { x: PXC - 50, y: 598, width: 100, height: 14, rx: 7, fill: "#5b5378" }, pump);
  el("rect", { x: PXC - 50, y: 598, width: 100, height: 5, rx: 2.5, fill: "#7d74a3" }, pump);
  el("rect", { x: PXC - 4, y: 420, width: 8, height: 40, rx: 3, fill: "url(#slxChrome)" }, pump);
  el("rect", { x: PXC - 20, y: 452, width: 40, height: 150, rx: 12, fill: "url(#pumpBody)" }, pump);
  el("rect", { x: PXC - 22, y: 448, width: 44, height: 12, rx: 6, fill: "#1c7a6f" }, pump);
  el("rect", { x: PXC - 13, y: 470, width: 5, height: 110, rx: 2.5, fill: "#ffffff", opacity: 0.35 }, pump);
  el("rect", { x: PXC - 20, y: 520, width: 40, height: 22, fill: "#ffffff", opacity: 0.9 }, pump);
  el("text", { x: PXC, y: 536, "text-anchor": "middle", class: "pump-label", text: "AIR" }, pump);
  const handle = el("g", {}, pump);
  el("rect", { x: PXC - 46, y: 404, width: 92, height: 20, rx: 10, fill: "#f0932b" }, handle);
  el("rect", { x: PXC - 40, y: 407, width: 80, height: 5, rx: 2.5, fill: "#ffffff", opacity: 0.45 }, handle);
  const pumpHint = el("g", { class: "pump-hint" }, pump);
  el("path", { d: `M${PXC - 10} 378 l10 10 l10 -10`, fill: "none", stroke: "#f0932b", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, pumpHint);
  el("path", { d: `M${PXC - 10} 364 l10 10 l10 -10`, fill: "none", stroke: "#f0932b", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.5 }, pumpHint);
  const lock = lockBadge(pump, PXC + 26, 462, 16);
  const pumpHit = el("rect", { x: PXC - 70, y: 350, width: 140, height: 272, rx: 20, fill: "transparent", class: "hit" }, pump);

  /* ---------- actors ---------- */
  const A = layers.actors;
  const hoseG = el("g", {}, A);
  const hose = el("path", { fill: "none", stroke: "#5b5378", "stroke-width": 8, "stroke-linecap": "round" }, hoseG);
  const hoseHi = el("path", { fill: "none", stroke: "#8f86b8", "stroke-width": 2.5, "stroke-linecap": "round", opacity: 0.8 }, hoseG);
  const bead = el("circle", { r: 5, fill: "#ffffff", opacity: 0 }, hoseG);
  const shadowG = el("g", {}, A);
  const shadow = el("ellipse", { cy: TY - 10, fill: "#2a2440", opacity: 0.09 }, shadowG);
  const streaks = el("g", { opacity: 0 }, A);
  const streakEls = [0, 1, 2].map(() => el("line", { stroke: "#b9aee6", "stroke-width": 3, "stroke-linecap": "round" }, streaks));
  const fxLayer = el("g", { class: "fx" }, A);
  const puffs = particles(fxLayer, anim, { stroke: "#cfc6ee", grow: 14, alpha: 0.85, dragX: 0.08, dragY: 0.2, lift: 6 });
  const bal = el("g", { class: "balloon" }, A);
  const body = el("g", {}, bal);
  const neck = el("path", { fill: "url(#bNeck)" }, body);
  const lip = el("rect", { width: 6, height: 11, rx: 3, fill: "#c7365d" }, body);
  const bodyE = el("ellipse", { fill: "url(#bGrad)" }, body);
  const shine = el("ellipse", { fill: "#ffffff", opacity: 0.55 }, body);
  const shine2 = el("ellipse", { fill: "#ffffff", opacity: 0.35 }, body);
  const clip = el("g", {}, body);
  el("rect", { x: -4, y: -9, width: 8, height: 18, rx: 2.5, fill: "#2a2440" }, clip);
  el("path", { d: "M-2 -9 l-8 -8 M2 -9 l8 -8", stroke: "#b9b4cf", "stroke-width": 2.5, "stroke-linecap": "round" }, clip);
  const weight = el("g", { opacity: 0 }, body);
  drawWeight(weight, true);
  const strawG = el("g", {}, bal);
  el("rect", { x: -50, y: -8, width: 100, height: 16, rx: 8, fill: "url(#strawStripe)", stroke: "#48a99d", "stroke-width": 1.2 }, strawG);
  el("rect", { x: -46, y: -6, width: 92, height: 4, rx: 2, fill: "#fff", opacity: 0.6 }, strawG);
  const tape1 = el("rect", { width: 14, rx: 2, fill: "#ffffff", opacity: 0.8, stroke: "#ddd6f2" }, bal);
  const tape2 = el("rect", { width: 14, rx: 2, fill: "#ffffff", opacity: 0.8, stroke: "#ddd6f2" }, bal);
  const balHit = el("ellipse", { fill: "transparent", class: "hit" }, bal);

  const bubble = el("g", { class: "count-bubble" }, A);
  el("rect", { x: -96, y: -26, width: 192, height: 52, rx: 26, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 1.5, filter: "url(#softShadow)" }, bubble);
  el("path", { d: "M-10 25 L0 38 L10 25 Z", fill: "#ffffff" }, bubble);
  const minusBtn = el("g", { class: "minus-btn" }, bubble);
  el("circle", { cx: -70, cy: 0, r: 19, fill: "#f1eefa", stroke: "#d8d0f0" }, minusBtn);
  el("rect", { x: -78, y: -2, width: 16, height: 4, rx: 2, fill: "#5b5378" }, minusBtn);
  el("circle", { cx: -70, cy: 0, r: 30, fill: "transparent", class: "hit" }, minusBtn);
  const countNum = el("text", { x: -6, y: 9, class: "count-num", "text-anchor": "middle", text: "0" }, bubble);
  const countUnit = el("text", { x: 18, y: 7, class: "count-unit", text: V.unitWord || "breaths" }, bubble);

  const arm = robotArm(A, defs, anim, { clawLength: 26, cargoY: 8 });
  const armWeight = el("g", {}, arm.cargo);
  drawWeight(armWeight, false);

  function drawWeight(g, withTape) {
    el("rect", { x: -26, y: 0, width: 52, height: 28, rx: 7, fill: "url(#slxSteel)", stroke: "#4e5870", "stroke-width": 1.5 }, g);
    el("rect", { x: -19, y: 4, width: 38, height: 4, rx: 2, fill: "#fff", opacity: 0.45 }, g);
    el("text", { x: 0, y: 22, "text-anchor": "middle", class: "weight-label", text: "WEIGHT" }, g);
    if (withTape) el("rect", { x: -12, y: -7, width: 24, height: 12, rx: 2, fill: "#ffffff", opacity: 0.8, stroke: "#d8d0f0" }, g);
  }

  /* ---------- drawing ---------- */
  const sizeFor = (b) => { const rx = b <= 0 ? 18 : 24 + b * 3.9; return { rx, ry: b <= 0 ? 12 : rx * 0.68 }; };
  const nozzle = () => ({ x: S.x - S.rx * S.sq - 16, y: S.y + 8 + S.ry });
  function draw() {
    const rx = S.rx * S.sq, ry = S.ry / Math.sqrt(S.sq);
    set(bal, { transform: `translate(${S.x.toFixed(2)},${S.y.toFixed(2)}) rotate(${S.rot.toFixed(2)})` });
    set(body, { transform: `translate(0,${(8 + ry).toFixed(2)})` });
    set(bodyE, { rx, ry, cx: 0, cy: 0 });
    set(shine, { cx: rx * 0.22, cy: -ry * 0.48, rx: rx * 0.34, ry: Math.max(2, ry * 0.16), transform: `rotate(-8 ${rx * 0.22} ${-ry * 0.48})` });
    set(shine2, { cx: rx * 0.62, cy: -ry * 0.16, rx: Math.max(2, rx * 0.06), ry: Math.max(2, ry * 0.12) });
    const n = rx - 4;
    set(neck, { d: `M${-n + 8},-7 C${-n},-6 ${-n - 6},-4 ${-n - 12},-4 L${-n - 12},4 C${-n - 6},4 ${-n},6 ${-n + 8},7 Z` });
    set(lip, { x: -n - 16, y: -5.5 });
    set(clip, { transform: clip._t || `translate(${-n - 6},0)` });
    set(weight, { transform: `translate(0,${ry - 3})` });
    set(tape1, { x: -rx * 0.35 - 7, y: -5, height: 15 });
    set(tape2, { x: rx * 0.35 - 7, y: -5, height: 15 });
    set(balHit, { cx: 0, cy: 8 + ry, rx: Math.max(48, rx + 10), ry: Math.max(40, ry + 12) });
    set(shadow, { cx: S.x, rx: rx * 0.9, ry: 6 + rx * 0.05, opacity: 0.05 + rx / 900 });
    drawHose();
  }
  function hosePath(t) {
    const nz = nozzle();
    const sx = PXC + 20, sy = 586;
    const ex = lerp(nz.x, sx + 40, t), ey = lerp(nz.y, sy - 10, t);
    return `M${sx},${sy} C${sx + 70},${sy} ${ex - 80},${ey + 10} ${ex},${ey}`;
  }
  function drawHose() {
    const p = hosePath(S.hoseT);
    set(hose, { d: p });
    set(hoseHi, { d: p });
    hoseG.style.opacity = S.hoseT >= 1 ? 0 : 1 - S.hoseT * 0.6;
  }
  function drawBubble() {
    set(bubble, { transform: `translate(${X0},${SY - 58})` });
    countNum.textContent = S.breaths;
    const w = countNum.getComputedTextLength ? countNum.getComputedTextLength() : 20;
    set(countNum, { x: -18 + w / 2 });
    set(countUnit, { x: -12 + w });
    minusBtn.style.opacity = S.breaths > 0 && !S.locked ? 1 : 0.35;
  }

  /* ---------- interactions ---------- */
  let holdTimer = null, pumping = false;
  async function pumpOnce() {
    if (S.busy) return;
    if (S.breaths >= V.max) { api.say(cfg.sam.full(V.max)); wobble(); return; }
    S.busy = true;
    pumpHint.style.display = "none";
    tween(110, (u) => set(handle, { transform: `translate(0,${u * 30})` }), ease.outQuad)
      .then(() => tween(200, (u) => set(handle, { transform: `translate(0,${30 - u * 30})` }), ease.outCubic));
    const len = hose.getTotalLength();
    await tween(RM ? 0 : 230, (u) => { const p = hose.getPointAtLength(u * len); set(bead, { cx: p.x, cy: p.y, opacity: Math.sin(u * Math.PI) }); }, ease.inOutCubic);
    set(bead, { opacity: 0 });
    const from = sizeFor(S.breaths);
    S.breaths = clamp(S.breaths + V.step, 0, V.max);
    const to = sizeFor(S.breaths);
    drawBubble();
    api.onSetting(S.breaths);
    await tween(RM ? 0 : 260, (u) => { S.rx = lerp(from.rx, to.rx, u); S.ry = lerp(from.ry, to.ry, u); draw(); }, ease.outBack);
    S.busy = false;
  }
  function wobble() {
    tween(RM ? 0 : 420, (u, raw) => { S.rot = Math.sin(raw * Math.PI * 5) * 4 * (1 - raw); draw(); }, ease.linear);
  }
  async function startPump(e) {
    e.preventDefault();
    if (!S.enabled || S.flying) return;
    if (S.locked) { api.say(cfg.sam.locked(S.breaths)); wobble(); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    pumping = true;
    const loop = async () => {
      if (!pumping) return;
      await pumpOnce();
      if (pumping) holdTimer = setTimeout(loop, 120);
    };
    loop();
  }
  function stopPump() { pumping = false; clearTimeout(holdTimer); }
  pumpHit.addEventListener("pointerdown", startPump);
  balHit.addEventListener("pointerdown", startPump);
  window.addEventListener("pointerup", stopPump);
  window.addEventListener("pointercancel", stopPump);
  minusBtn.addEventListener("pointerdown", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!S.enabled || S.flying || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.breaths)); return; }
    if (S.breaths <= 0) { api.say(cfg.sam.empty()); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    const from = sizeFor(S.breaths);
    S.breaths = Math.max(0, S.breaths - V.step);
    const to = sizeFor(S.breaths);
    drawBubble();
    api.onSetting(S.breaths);
    for (let i = 0; i < 3; i++) puffs.emit(nozzle().x, nozzle().y, -60 - Math.random() * 40, (Math.random() - 0.5) * 30, 3, 0.55 + Math.random() * 0.35);
    await tween(RM ? 0 : 240, (u) => { S.rx = lerp(from.rx, to.rx, u); S.ry = lerp(from.ry, to.ry, u); draw(); }, ease.outCubic);
  });

  /* ---------- engine-facing API ---------- */
  async function setSetting(v, animate) {
    if (!animate || RM) {
      S.breaths = v;
      const s = sizeFor(v);
      S.rx = s.rx; S.ry = s.ry;
      draw(); drawBubble(); api.onSetting(v);
      return;
    }
    while (S.breaths < v) { await pumpOnce(); await anim.wait(90); }
  }

  async function run(dist) {
    S.flying = true;
    stopPump();
    bubble.style.opacity = 0;
    pumpHint.style.display = "none";
    const n = S.rx - 4;
    await tween(RM ? 0 : 240, (u) => { clip._t = `translate(${-n - 6 - u * 16},${u * 40}) rotate(${-u * 120})`; set(clip, { opacity: 1 - u }); draw(); }, ease.outQuad);
    tween(RM ? 0 : 380, (u) => { S.hoseT = u; drawHose(); }, ease.outCubic);
    const x1 = X0 + dist * PX, rx0 = S.rx, ry0 = S.ry, lim = sizeFor(0);
    if (RM) {
      await tween(250, (u) => { bal.style.opacity = 1 - u; });
      S.x = x1; S.rx = lim.rx; S.ry = lim.ry; draw();
      await tween(300, (u) => { bal.style.opacity = u; });
      S.flying = false;
      return;
    }
    await tween(120, (u) => { S.sq = 1 - 0.08 * Math.sin(u * Math.PI); draw(); }, ease.linear);
    const T = 900 + dist * 230;
    let t = 0;
    await tween(T, (e, u, dt) => {
      t += dt;
      const p = 1 - Math.pow(1 - u, 2.4);
      const v = Math.pow(1 - u, 1.4);
      S.x = X0 + p * (x1 - X0);
      const dfl = ease.outQuad(Math.min(1, u * 1.08));
      S.rx = lerp(rx0, lim.rx, dfl); S.ry = lerp(ry0, lim.ry, dfl);
      S.sq = 1 + 0.12 * v;
      S.rot = Math.sin(t * 26) * 5 * v * (1 - dfl * 0.6);
      draw();
      const cy = S.y + 8 + S.ry;
      streakEls.forEach((ln, i) => { const len = 30 + 70 * v; const x2 = S.x - S.rx - 30 - i * 8; set(ln, { x1: x2 - len * (1 - i * 0.25), x2, y1: cy + (i - 1) * 16, y2: cy + (i - 1) * 16 }); });
      streaks.setAttribute("opacity", (Math.max(0, v - 0.15) * 0.9).toFixed(2));
      const thrust = 1 - dfl;
      if (thrust > 0.03 && Math.random() < 0.3 + thrust * 1.2) {
        const nz = nozzle();
        puffs.emit(nz.x - 4, nz.y + (Math.random() - 0.5) * 6, -120 - 380 * thrust * Math.random(), (Math.random() - 0.5) * 70, 2.5 + thrust * 4, 0.55 + Math.random() * 0.35);
      }
    }, ease.linear);
    streaks.setAttribute("opacity", 0);
    await tween(300, (e, u) => { S.rot = Math.sin(u * Math.PI * 3) * 3 * (1 - u); S.sq = 1; draw(); }, ease.linear);
    S.flying = false;
  }

  async function reset() {
    S.flying = true;
    await tween(RM ? 0 : 200, (u) => { bal.style.opacity = 1 - u; shadowG.style.opacity = 1 - u; });
    S.x = X0; S.breaths = 0; S.rot = 0; S.sq = 1;
    const s = sizeFor(0);
    S.rx = s.rx; S.ry = s.ry;
    clip._t = null;
    set(clip, { opacity: 1 });
    draw(); drawBubble();
    tween(RM ? 0 : 320, (u) => { S.hoseT = 1 - u; drawHose(); }, ease.outCubic);
    await tween(RM ? 0 : 320, (u) => { bal.style.opacity = u; shadowG.style.opacity = u; set(bal, { transform: `translate(${S.x},${S.y}) scale(${0.6 + 0.4 * u})` }); }, ease.outBack);
    draw();
    bubble.style.opacity = 1;
    S.flying = false;
    api.onSetting(0);
  }

  async function playTwist({ instant } = {}) {
    if (instant) { weight.style.opacity = 1; armWeight.style.opacity = 0; draw(); return; }
    bubble.style.opacity = 0;
    const bottomY = () => S.y + 8 + S.ry * 2 - 3 + 8;
    arm.show(X0);
    await arm.move(-80, bottomY() - 8, 950, ease.outCubic);
    armWeight.style.opacity = 0;
    weight.style.opacity = 1;
    await tween(RM ? 0 : 420, (e, u) => { S.y = SY + Math.sin(u * Math.PI) * 9 * (1 - u * 0.5); draw(); }, ease.linear);
    S.y = SY;
    draw();
    arm.open();
    await arm.move(bottomY() - 8, -90, 700, ease.inOutCubic);
    arm.hide();
    bubble.style.opacity = 1;
  }

  function setEnabled(on) {
    S.enabled = on;
    pump.classList.toggle("disabled", !on);
    bubble.style.pointerEvents = on ? "" : "none";
  }
  function setLocked(on) {
    S.locked = on;
    set(lock, { opacity: on ? 1 : 0 });
    drawBubble();
  }
  function setAttention(on) { pump.classList.toggle("attention", !!on); }

  draw();
  drawBubble();

  return {
    TY, unitPx: PX, markerTop: SY + 44, flagH: 128, pinChipY: 54, pinHead: true,
    trackX: (v) => X0 + v * PX,
    getSetting: () => S.breaths,
    hasSetting: () => S.breaths >= V.min,
    setSetting, run, reset, playTwist, setEnabled, setLocked, setAttention,
    destroy() {
      stopPump();
      puffs.destroy();
      window.removeEventListener("pointerup", stopPump);
      window.removeEventListener("pointercancel", stopPump);
    },
  };
}
