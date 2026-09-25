// Boat Load scene (3.6A-SL). The student loads stacks of washers onto a
// tray with the count pad; on "Load it!" each stack swings into a toy boat
// floating in a water tank and the boat sinks lower. The outcome — space
// between the water and the top of the boat — is read off a cm gauge.
// Twist: "widerBoat" — the robot arm lifts the boat out and lowers in a
// wider one.
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer, armSwap, armSwapInstant } from "../kit/controls";

const TY = 512, X0 = 610, PX = 66;          // cm gauge
const CX = 272, WATER = 372, FBPX = 5.2, HULL = 70; // tank + boat
const TANK = { l: 50, r: 494, t: 250, b: 462 };
const TRAY = { x: 412, y: 238 };

export const boatScene = {
  id: "boat",
  runLabel: "Load it!",
  resetLabel: "Unload",
  sam: {
    start: "Tap + to put stacks of washers on the tray. Each stack is 5 washers.",
    pumping: "{v} washers on the tray! Add more, or drag the purple flag to predict.",
    needFlag: "Drag the purple flag to where you think the gauge will stop.",
    needSetting: "Tap + or − to choose how many washers to load first!",
    ready: "Great prediction! Tap “Load it!”",
    readyNoFlag: "Ready when you are — tap “Load it!”",
    running: "Loading the cargo…",
    full: "The tray is full — {max} washers is the most.",
    empty: "Zero washers — an empty boat. You can test that too!",
    repeat: "You already tried {v} washers. Try a different amount to find a pattern!",
    next: "Tap Unload, then choose a different number of washers.",
    locked: "Mission Control set this test to {v} washers — just place your flag!",
    fairTest: "Think about what you changed with the + and − buttons each time.",
    twistPredict: "This boat is wider. With {v} washers, how much space will be above the water? Move your flag!",
    twistRun2: "Now pick any number of washers and load the wide boat once more.",
    explain: "Use your chart! Tell one amount of washers and how much space was left.",
    pastFlag: "The gauge read {v} more than your flag.",
    beforeFlag: "The gauge read {v} less than your flag.",
    compareR1: "In Round 1 the same load left {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable;
  const t1 = cfg.round1.table, t2 = cfg.round2.table;
  const S = { count: 0, chosen: false, enabled: true, locked: false, busy: false, round: 1, fb: t1[0], bob: 0, loaded: 0 };

  metalDefs(defs);
  addDefs(defs, "boatDefs", `
    <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7fd6ee" stop-opacity=".75"/><stop offset="1" stop-color="#3aa6c9" stop-opacity=".85"/>
    </linearGradient>
    <linearGradient id="hullA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ff9a6b"/><stop offset="1" stop-color="#e2553a"/>
    </linearGradient>
    <linearGradient id="hullB" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9b8cf0"/><stop offset="1" stop-color="#5a4bb8"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" x2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".12" stop-color="#ffffff" stop-opacity=".12"/><stop offset=".85" stop-color="#ffffff" stop-opacity=".08"/><stop offset="1" stop-color="#ffffff" stop-opacity=".45"/>
    </linearGradient>`);

  /* ---------- static ---------- */
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: cfg.outcome.max, unitLabel: cfg.outcome.short || "cm" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "SPACE ABOVE" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "THE WATER →" }, st);
  // tank back wall + water body
  el("ellipse", { cx: CX, cy: TANK.b + 4, rx: 250, ry: 12, fill: "#2a2440", opacity: 0.1 }, st);
  el("rect", { x: TANK.l, y: TANK.t, width: TANK.r - TANK.l, height: TANK.b - TANK.t, rx: 16, fill: "#eef7fb", opacity: 0.7, stroke: "#c9e6f0", "stroke-width": 2 }, st);
  // tray shelf
  el("rect", { x: TRAY.x - 70, y: TRAY.y + 12, width: 150, height: TANK.t - TRAY.y - 10, rx: 4, fill: "#cfc8e6" }, st);

  /* ---------- actors ---------- */
  const A = layers.actors;
  const waterBack = el("path", { fill: "url(#waterGrad)", opacity: 0.55 }, A);
  const boatA = el("g", {}, A);   // Round 1 boat (swap wrapper)
  const boatB = el("g", { opacity: 0 }, A); // wider boat
  const boatAIn = el("g", {}, boatA), boatBIn = el("g", {}, boatB);
  function drawBoat(g, W, fill, label) {
    el("path", { d: `M${-W / 2} 0 H${W / 2} L${W / 2 - 26} ${HULL} H${-W / 2 + 26} Z`, fill, stroke: "#ffffff", "stroke-width": 2.5, "stroke-linejoin": "round" }, g);
    el("rect", { x: -W / 2 - 4, y: -6, width: W + 8, height: 10, rx: 5, fill: "#ffffff", stroke: "#e4def6" }, g);
    el("rect", { x: -W / 2 + 30, y: 18, width: W - 60, height: 5, rx: 2.5, fill: "#ffffff", opacity: 0.35 }, g);
    el("text", { x: 0, y: 48, "text-anchor": "middle", class: "weight-label", text: label, style: "font-size:11px" }, g);
  }
  drawBoat(boatAIn, 200, "url(#hullA)", "CARGO BOAT");
  drawBoat(boatBIn, 290, "url(#hullB)", "WIDE CARGO BOAT");
  const cargoA = el("g", {}, boatAIn), cargoB = el("g", {}, boatBIn);
  const fx = el("g", {}, A);
  const ripples = particles(fx, anim, { fill: "none", stroke: "#ffffff", strokeWidth: 2, grow: 26, alpha: 0.9, dragX: 0.05, dragY: 0.05, lift: 0 });
  const waterFront = el("path", { fill: "url(#waterGrad)", opacity: 0.5 }, A);
  el("rect", { x: TANK.l, y: TANK.t, width: TANK.r - TANK.l, height: TANK.b - TANK.t, rx: 16, fill: "url(#glass)", stroke: "#bfe0ec", "stroke-width": 3 }, A);
  el("rect", { x: TANK.l + 8, y: TANK.b - 14, width: TANK.r - TANK.l - 16, height: 8, rx: 4, fill: "#ffffff", opacity: 0.5 }, A);

  // freeboard bracket (space above the water), follows the boat
  const bracket = el("g", { class: "fb-bracket" }, A);
  const brLine = el("line", { stroke: "#7b6cd9", "stroke-width": 3, "stroke-linecap": "round" }, bracket);
  const brT = el("line", { stroke: "#7b6cd9", "stroke-width": 3, "stroke-linecap": "round" }, bracket);
  const brB = el("line", { stroke: "#7b6cd9", "stroke-width": 3, "stroke-linecap": "round" }, bracket);
  const brTxt = el("text", { class: "chip-text", fill: "#5a4bb8", text: "" }, bracket);

  // washer tray + stacks
  const trayG = el("g", {}, A);
  el("rect", { x: TRAY.x - 66, y: TRAY.y, width: 142, height: 14, rx: 7, fill: "#ffffff", stroke: "#d8d0f0", "stroke-width": 1.5 }, trayG);
  const trayStacks = el("g", {}, trayG);
  const flying = el("g", {}, A);
  function drawStack(g, x, y) {
    const s = el("g", { transform: `translate(${x},${y})` }, g);
    for (let i = 0; i < 5; i++) {
      el("ellipse", { cx: 0, cy: -i * 4, rx: 12, ry: 4, fill: "url(#slxSteel)", stroke: "#4e5870", "stroke-width": 1 }, s);
      el("ellipse", { cx: 0, cy: -i * 4 - 0.5, rx: 3.5, ry: 1.3, fill: "#eef0f6" }, s);
    }
    return s;
  }
  const traySlot = (i) => ({ x: TRAY.x - 48 + (i % 4) * 30, y: TRAY.y - (i < 4 ? 2 : 22) });
  // up to 8 stacks: a back row (drawn first) and a front row, staggered
  const deckSlot = (i, W) => {
    const gap = (W - 88) / 3, back = i >= 4;
    return { x: -W / 2 + 44 + (i % 4) * gap + (back ? gap / 2 : 0) - (back ? 0 : 6), y: back ? -12 : -2 };
  };

  function placeOnDeck(cargo, i, W) {
    const p = deckSlot(i, W);
    const s = drawStack(cargo, p.x, p.y);
    if (i >= 4) cargo.insertBefore(s, cargo.firstChild); // back row sits behind
  }

  const pad = countPad(A, { x: 196, y: 204, unit: V.unitWord || "washers", width: 250, onStep: step });
  const lock = lockBadge(A, 196 + 138, 190, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${(Math.round(v * 2) / 2).toFixed(v % 1 ? 1 : 0)} cm` });

  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  /* ---------- drawing ---------- */
  const boatW = () => (S.round === 2 ? 290 : 200);
  function wave(y, t, amp) {
    let d = `M${TANK.l + 3} ${TANK.b - 3} L${TANK.l + 3} ${y}`;
    for (let x = TANK.l + 3; x <= TANK.r - 3; x += 14) d += ` L${x} ${(y + Math.sin(x / 34 + t * 2.2) * amp).toFixed(1)}`;
    return d + ` L${TANK.r - 3} ${TANK.b - 3} Z`;
  }
  let tNow = 0;
  function draw() {
    const rim = WATER - S.fb * FBPX + Math.sin(tNow * 2.2) * S.bob;
    [boatAIn, boatBIn].forEach((g) => set(g, { transform: `translate(${CX},${rim.toFixed(1)})` }));
    const amp = 1.6 + S.bob * 0.6;
    set(waterBack, { d: wave(WATER - 2, tNow + 1, amp) });
    set(waterFront, { d: wave(WATER, tNow, amp) });
    const bx = CX + boatW() / 2 + 20;
    set(brLine, { x1: bx, x2: bx, y1: rim, y2: WATER });
    set(brT, { x1: bx - 7, x2: bx + 7, y1: rim, y2: rim });
    set(brB, { x1: bx - 7, x2: bx + 7, y1: WATER, y2: WATER });
    set(brTxt, { x: bx + 12, y: (rim + WATER) / 2 + 6 });
    const f = Math.round(S.fb * 2) / 2;
    brTxt.textContent = `${f % 1 ? f.toFixed(1) : f} cm`;
    bracket.style.opacity = S.fb > 0.2 ? 1 : 0.4;
  }
  const tick = (dt, now) => { tNow = now / 1000; if (!RM) draw(); };
  anim.tickers.add(tick);

  function drawTray() {
    trayStacks.innerHTML = "";
    const n = Math.round(S.count / 5);
    for (let i = 0; i < n; i++) { const p = traySlot(i); drawStack(trayStacks, p.x, p.y); }
    pad.set(S.count, { atMin: S.count <= V.min && S.chosen, atMax: S.count >= V.max });
    set(lock, { opacity: S.locked ? 1 : 0 });
  }

  /* ---------- interactions ---------- */
  async function step(d) {
    if (!S.enabled || S.busy) return;
    if (S.locked) { api.say(cfg.sam.locked(S.count)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    const next = Math.max(V.min, Math.min(V.max, S.count + d * V.step));
    if (next === S.count) {
      if (d > 0) api.say(cfg.sam.full(V.max));
      else if (!S.chosen) { S.chosen = true; drawTray(); api.onSetting(S.count); api.say(cfg.sam.empty()); }
      else api.say(cfg.sam.empty());
      return;
    }
    S.count = next;
    S.chosen = true;
    drawTray();
    api.onSetting(S.count);
  }

  /* ---------- engine API ---------- */
  async function setSetting(v, animate) {
    if (!animate || RM) { S.count = v; S.chosen = true; drawTray(); api.onSetting(v); return; }
    S.chosen = true;
    if (S.count === v) { drawTray(); api.onSetting(v); }
    while (S.count !== v) { S.count += S.count < v ? V.step : -V.step; drawTray(); api.onSetting(S.count); await anim.wait(160); }
  }

  async function run(dist) {
    S.busy = true;
    pad.setVisible(false);
    const table = S.round === 2 ? t2 : t1;
    const f0 = table[0] != null ? table[0] : S.fb;
    S.fb = f0; draw();
    pointer.set(f0); pointer.show();
    const n = Math.round(S.count / 5);
    const cargo = S.round === 2 ? cargoB : cargoA;
    const W = boatW();
    if (RM || n === 0) {
      trayStacks.innerHTML = "";
      for (let i = 0; i < n; i++) placeOnDeck(cargo, i, W);
      await tween(RM ? 0 : 500, (u) => { S.fb = lerp(f0, dist, u); draw(); pointer.set(S.fb); }, ease.outCubic);
      S.bob = RM ? 0 : 1.5;
    } else {
      const stacks = Array.from(trayStacks.children);
      for (let i = 0; i < n; i++) {
        const from = traySlot(n - 1 - i);
        stacks[n - 1 - i].remove();
        const s = drawStack(flying, from.x, from.y);
        const to = deckSlot(i, W);
        const rim = () => WATER - S.fb * FBPX;
        await tween(420, (u) => {
          const tx = CX + to.x, ty = rim() + to.y;
          const x = lerp(from.x, tx, u), y = lerp(from.y, ty, u) - Math.sin(u * Math.PI) * 60;
          set(s, { transform: `translate(${x.toFixed(1)},${y.toFixed(1)})` });
        }, ease.inOutCubic);
        s.remove();
        placeOnDeck(cargo, i, W);
        const fTarget = lerp(f0, dist, (i + 1) / n);
        const fFrom = S.fb;
        for (let k = 0; k < 3; k++) ripples.emit(CX + (Math.random() - 0.5) * W, WATER + 2, (Math.random() - 0.5) * 30, 0, 4, 0.8);
        S.bob = 2.2;
        pointer.to(fTarget, 360);
        await tween(360, (u) => { S.fb = lerp(fFrom, fTarget, u); draw(); }, ease.outBack);
      }
      await tween(500, (u) => { S.bob = lerp(2.2, 1.2, u); });
    }
    S.fb = dist; draw();
    await pointer.hide(300);
    S.busy = false;
  }

  async function reset() {
    S.busy = true;
    const cargo = S.round === 2 ? cargoB : cargoA;
    const table = S.round === 2 ? t2 : t1;
    const f0 = table[0] != null ? table[0] : S.fb, fFrom = S.fb;
    await tween(RM ? 0 : 220, (u) => { cargo.style.opacity = 1 - u; });
    cargo.innerHTML = "";
    cargo.style.opacity = 1;
    await tween(RM ? 0 : 420, (u) => { S.fb = lerp(fFrom, f0, u); draw(); }, ease.outBack);
    S.count = 0; S.chosen = false; S.bob = RM ? 0 : 1.2;
    drawTray();
    pad.setVisible(true);
    S.busy = false;
    api.onSetting(0);
  }

  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: boatA, newG: boatB }); S.fb = t2[0]; draw(); return; }
    pad.setVisible(false);
    const grabY = WATER - S.fb * FBPX - 34;
    await armSwap(arm, anim, { x: CX, grabY, oldG: boatA, newG: boatB, onSwap: () => { S.fb = t2[0]; draw(); } });
    for (let k = 0; k < 5; k++) ripples.emit(CX + (Math.random() - 0.5) * 280, WATER + 2, (Math.random() - 0.5) * 40, 0, 4, 0.9);
    pad.setVisible(true);
  }

  function setEnabled(on) { S.enabled = on; pad.setEnabled(on); }
  function setLocked(on) { S.locked = on; drawTray(); }
  function setAttention(on) { pad.g.classList.toggle("attention", !!on); }

  S.bob = RM ? 0 : 1.2;
  draw();
  drawTray();

  return {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    getSetting: () => S.count,
    hasSetting: () => S.chosen,
    setSetting, run, reset, playTwist, setEnabled, setLocked, setAttention,
    destroy() { anim.tickers.delete(tick); ripples.destroy(); },
  };
}
