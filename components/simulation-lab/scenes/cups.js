// Stacking Cups scene (MA.5.8C-SL, Math). The student chooses how many cups
// to stack. On "Stack!" the cups hop one at a time from the cup sleeve onto
// the stack; every cup adds the same rim height, so the height climbs by the
// same step each time (shown by a "+2 cm" pop and the pointer on the cm gauge).
// Each run is written into an input-output table board (via logRun), and the
// chart plots the (cups, height) number pairs.
// Twist: "tallCups" — the robot arm swaps the sleeve for taller cups with a
// taller rim, so the first cup AND the constant step change.
import { el, set, lerp, ease } from "../kit/core";
import { ground, meterTrack, robotArm, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer, armSwap, armSwapInstant } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";

const TY = 512, X0 = 610, BASE = 506, PXC = 6.4;
const RULER_X = 108, STACK_X = 190, SLEEVE = { x: 292, y: 500 };
const TABLE = { x: 360, y: 300, w: 212, row: 25 };
const CUPS = {
  1: { h: 8, step: 2, fill: "#5cc3e0", rim: "#2b8fb3", label: "8 cm CUPS" },
  2: { h: 12, step: 3, fill: "#f7b267", rim: "#d9822b", label: "TALL CUPS" },
};

export const cupsScene = {
  id: "cups",
  runLabel: "Stack!",
  resetLabel: "Clear stack",
  sam: {
    start: "Tap + to choose how many cups to stack.",
    pumping: "{v}! Change it, or drag the purple flag to predict how tall the stack will be.",
    needFlag: "Drag the purple flag to how tall you think the stack will be.",
    needSetting: "Choose how many cups first — tap +!",
    ready: "Great prediction! Tap “Stack!”",
    readyNoFlag: "Ready when you are — tap “Stack!”",
    running: "Stacking… watch how much each cup adds!",
    full: "That’s all the cups we have — {max}.",
    empty: "You need at least {min}.",
    repeat: "You already stacked {v}. Try a different number to find the pattern!",
    next: "Tap Clear stack, then choose a different number of cups.",
    locked: "Mission Control set this test to {v} — just place your flag!",
    fairTest: "Think about what you changed with the + button each time.",
    twistPredict: "These cups are taller. With {v}, how tall will the stack be? Move your flag!",
    twistRun2: "Now pick any number of tall cups and stack them once more.",
    explain: "Use your table and graph! Tell the first height, how much each cup adds, and a rule.",
    pastFlag: "The stack was {v} taller than your flag.",
    beforeFlag: "The stack was {v} shorter than your flag.",
    compareR1: "In Round 1, the short cups made {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, n: 0 };
  metalDefs(defs);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 5, minor: 1, fine: 1, unitLabel: "cm" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "STACK" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "HEIGHT →" }, st);
  // table top the stack stands on
  el("rect", { x: 60, y: BASE, width: 280, height: 10, rx: 5, fill: "#d8d0f0" }, st);
  // vertical cm ruler beside the stack
  const rTop = BASE - MAX * PXC;
  el("rect", { x: RULER_X - 14, y: rTop - 8, width: 28, height: BASE - rTop + 8, rx: 6, fill: "#fff7d6", stroke: "#e8c872", "stroke-width": 1.5 }, st);
  for (let c = 0; c <= MAX; c++) {
    const y = BASE - c * PXC, big = c % 5 === 0;
    el("line", { x1: RULER_X + 14, x2: RULER_X + 14 - (big ? 12 : 6), y1: y, y2: y, stroke: "#b08a2e", "stroke-width": big ? 2 : 1 }, st);
    if (big && c % 10 === 0) el("text", { x: RULER_X - 3, y: y + 4, "text-anchor": "middle", class: "weight-label", style: "font-size:10px", text: String(c) }, st);
  }
  el("text", { x: RULER_X, y: rTop - 14, "text-anchor": "middle", class: "tile-caption", text: "cm" }, st);

  const A = layers.actors;
  const stackG = el("g", {}, A); // newer (higher) cups are inserted BEHIND older ones: nested look
  const flyer = el("g", {}, A);
  const topLine = el("g", { opacity: 0 }, A);
  const topLn = el("line", { x1: RULER_X + 14, x2: STACK_X + 40, stroke: "#7b6cd9", "stroke-width": 2, "stroke-dasharray": "4 4" }, topLine);
  const pops = el("g", {}, layers.over);

  function cupShape(parent, round, bottomY) {
    const c = CUPS[round], h = c.h * PXC, wT = 58, wB = 40;
    const g = el("g", { transform: `translate(${STACK_X},${bottomY})` }, parent);
    el("path", { d: `M${-wB / 2} 0 L${-wT / 2} ${-h} H${wT / 2} L${wB / 2} 0 Z`, fill: c.fill, stroke: c.rim, "stroke-width": 1.5 }, g);
    el("rect", { x: -wT / 2 - 3, y: -h - 2, width: wT + 6, height: c.step * PXC * 0.6, rx: 3, fill: c.rim }, g);
    el("path", { d: `M${-wT / 2 + 8} ${-h + 10} L${-wB / 2 + 6} -6`, stroke: "#ffffff", "stroke-width": 3, opacity: 0.45, "stroke-linecap": "round" }, g);
    return g;
  }
  // cup sleeves (swap wrappers)
  const slA = el("g", {}, A), slB = el("g", { opacity: 0 }, A);
  function sleeve(parent, round) {
    const c = CUPS[round];
    const g = el("g", {}, parent);
    for (let i = 3; i >= 0; i--) {
      const cg = el("g", { transform: `translate(${SLEEVE.x},${SLEEVE.y - i * c.step * PXC * 0.8})` }, g);
      const h = c.h * PXC * 0.8;
      el("path", { d: `M-16 0 L-23 ${-h} H23 L16 0 Z`, fill: c.fill, stroke: c.rim, "stroke-width": 1.5 }, cg);
      el("rect", { x: -25, y: -h - 2, width: 50, height: 4, rx: 2, fill: c.rim }, cg);
    }
    el("text", { x: SLEEVE.x, y: SLEEVE.y + 26, "text-anchor": "middle", class: "tile-caption", text: c.label }, g);
    return g;
  }
  sleeve(slA, 1); sleeve(slB, 2);
  el("text", { x: STACK_X, y: BASE + 26, "text-anchor": "middle", class: "tile-caption", text: "STACK" }, st);

  // input-output table board
  const tb = el("g", {}, A);
  const TW = TABLE.w, R = TABLE.row;
  el("rect", { x: TABLE.x, y: TABLE.y, width: TW, height: R * 6 + 40, rx: 14, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 1.5, filter: "url(#softShadow)" }, tb);
  el("text", { x: TABLE.x + 12, y: TABLE.y + 20, class: "tile-caption", text: "INPUT-OUTPUT TABLE" }, tb);
  const hy = TABLE.y + 30;
  el("rect", { x: TABLE.x + 8, y: hy, width: TW - 16, height: R, rx: 6, fill: "#f1eefa" }, tb);
  el("text", { x: TABLE.x + TW * 0.3, y: hy + 17, "text-anchor": "middle", class: "chip-text", fill: "#5b5378", text: "Cups (in)" }, tb);
  el("text", { x: TABLE.x + TW * 0.72, y: hy + 17, "text-anchor": "middle", class: "chip-text", fill: "#5b5378", text: "Height (out)" }, tb);
  el("line", { x1: TABLE.x + TW * 0.5, x2: TABLE.x + TW * 0.5, y1: hy + 2, y2: hy + R * 6 - 2, stroke: "#e4def6", "stroke-width": 1.5 }, tb);
  const rowsG = el("g", {}, tb);
  const logged = [];
  function drawRows() {
    while (rowsG.firstChild) rowsG.firstChild.remove();
    const show = logged.slice(-5);
    show.forEach((r, i) => {
      const y = hy + R * (i + 1);
      const col = r.round === 2 ? "#cf7414" : "#1d8c80";
      el("text", { x: TABLE.x + TW * 0.3, y: y + 17, "text-anchor": "middle", class: "chip-text", fill: col, text: String(r.setting) }, rowsG);
      el("text", { x: TABLE.x + TW * 0.72, y: y + 17, "text-anchor": "middle", class: "chip-text", fill: col, text: `${r.dist} cm` }, rowsG);
    });
  }

  const pad = countPad(A, { x: 466, y: 256, unit: "", width: 230, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 466 + 124, 242, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${Math.round(v)} cm` });
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const heightOf = (k, round) => (k <= 0 ? 0 : CUPS[round].h + (k - 1) * CUPS[round].step);
  function clearStack() { while (stackG.firstChild) stackG.firstChild.remove(); S.n = 0; set(topLine, { opacity: 0 }); }
  function markTop(hcm) {
    const y = BASE - hcm * PXC;
    set(topLn, { y1: y, y2: y });
    set(topLine, { opacity: hcm > 0 ? 1 : 0 });
  }
  function pop(text, y) {
    const t = el("text", { x: RULER_X + 70 + 40, y, class: "chip-text", fill: "#7b6cd9", text }, pops);
    if (RM) { setTimeout(() => t.remove(), 600); return; }
    tween(700, (u) => set(t, { y: y - 16 * u, opacity: 1 - u * u }), ease.outCubic).then(() => t.remove());
  }

  const ctl = padSetting({ anim, cfg, api, pad, lock, show: (v) => ({ text: String(v), unit: v === 1 ? "cup" : "cups" }), offText: "0" });

  async function run(dist, roundArg) {
    ctl.busy = true;
    pad.setVisible(false);
    const round = roundArg || S.round, n = ctl.value || 1;
    clearStack();
    pointer.set(0); pointer.show();
    const hop = RM ? 0 : Math.max(170, 520 - n * 30);
    for (let k = 1; k <= n; k++) {
      // cup k's bottom sits (h - step) above cup k-1's bottom, so its rim is `step` higher
      const by = k === 1 ? BASE : BASE - (heightOf(k, round) - CUPS[round].h) * PXC;
      const c = cupShape(flyer, round, 0);
      const sx = SLEEVE.x, sy = SLEEVE.y - 60;
      await tween(hop, (u) => set(c, { transform: `translate(${lerp(sx, STACK_X, u).toFixed(1)},${(lerp(sy, by, u) - Math.sin(u * Math.PI) * 70).toFixed(1)})` }), ease.inOutCubic);
      set(c, { transform: `translate(${STACK_X},${by})` });
      stackG.insertBefore(c, stackG.firstChild);
      S.n = k;
      const hcm = heightOf(k, round);
      markTop(hcm);
      pop(k === 1 ? `${CUPS[round].h} cm` : `+${CUPS[round].step} cm`, BASE - hcm * PXC + 4);
      await pointer.to(hcm, RM ? 0 : Math.max(120, hop * 0.5), ease.outCubic);
    }
    pointer.set(dist);
    await anim.wait(RM ? 0 : 250);
    await pointer.hide(300);
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    const kids = [...stackG.childNodes];
    await tween(RM ? 0 : 300, (u) => kids.forEach((k) => set(k, { opacity: 1 - u })));
    clearStack();
    ctl.clear();
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    clearStack();
    if (instant) { armSwapInstant({ oldG: slA, newG: slB }); return; }
    pad.setVisible(false);
    await armSwap(arm, anim, { x: SLEEVE.x, grabY: SLEEVE.y - 90, oldG: slA, newG: slB });
    pad.setVisible(true);
  }
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    logRun(run) { logged.push(run); drawRows(); },
    destroy() {},
  });
}
