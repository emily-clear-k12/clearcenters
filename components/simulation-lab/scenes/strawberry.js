// Supply & Price Test scene (SS.5.11B-SL). A farm stand at the Saturday
// market. The student chooses how many strawberry crates the farm brings
// (supply); the crates stack up on the stand. On "Open market!" the same
// group of shoppers walks up, and the price board rolls down from its
// opening price until it settles: with more crates for the same shoppers,
// the price has to drop to sell them all. The settled price is read off a
// credits gauge.
// Twist: "festival" — festival week: bunting goes up and many more shoppers
// come (higher demand), so the price settles higher for every supply.
import { el, set, lerp, ease } from "../kit/core";
import { ground, meterTrack, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";
import { walker, crate as drawCrate } from "../kit/props";

const TY = 512, X0 = 610, LANE = 478;
const STAND = { x: 80, w: 260, top: 400 };
const CW = 40, CH = 26;
const SHOPPERS = { 1: 7, 2: 13 };

export const strawberryScene = {
  id: "strawberry",
  runLabel: "Open market!",
  resetLabel: "Next Saturday",
  sam: {
    start: "Tap + to choose how many crates of strawberries the farm brings.",
    pumping: "{v}! Change it, or drag the purple flag to predict the price per crate.",
    needFlag: "Drag the purple flag to the price you think a crate will sell for.",
    needSetting: "Choose how many crates first — tap +!",
    ready: "Great prediction! Tap “Open market!”",
    readyNoFlag: "Ready when you are — tap “Open market!”",
    running: "Shoppers are arriving… watch the price board.",
    full: "That’s every crate the farm has — {max}.",
    empty: "That’s the fewest crates — {min}.",
    repeat: "You already tried {v}. Try a different number of crates to find a pattern!",
    next: "Tap Next Saturday, then choose a different number of crates.",
    locked: "Mission Control set the supply to {v} — just place your flag!",
    fairTest: "Think about what you changed at the farm stand each time.",
    twistPredict: "It’s festival week — lots more shoppers! With {v}, what will the price be? Move your flag!",
    twistRun2: "Now pick any number of crates and open the festival market once more.",
    explain: "Use your chart! Tell one supply and the price — and what happened when demand went up.",
    pastFlag: "The price was {v} higher than your flag.",
    beforeFlag: "The price was {v} lower than your flag.",
    compareR1: "On a normal Saturday it was {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, shown: 0 };
  metalDefs(defs);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 10, minor: 5, fine: 1, unitLabel: "credits" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "PRICE PER" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "CRATE →" }, st);
  // stand: table + canopy
  const sx = STAND.x, sw = STAND.w;
  el("rect", { x: sx + 8, y: 300, width: 7, height: 170, fill: "#b07a3e" }, st);
  el("rect", { x: sx + sw - 15, y: 300, width: 7, height: 170, fill: "#b07a3e" }, st);
  el("path", { d: `M${sx - 12} 286 H${sx + sw + 12} L${sx + sw} 306 H${sx} Z`, fill: "#ef5b6b", stroke: "#c23b4b", "stroke-width": 2 }, st);
  el("text", { x: sx + sw / 2, y: 301, "text-anchor": "middle", class: "weight-label", style: "font-size:11px", text: "SUNNY FARM STRAWBERRIES" }, st);
  el("rect", { x: sx, y: STAND.top + 44, width: sw, height: 26, rx: 6, fill: "#e0a96d", stroke: "#b07a3e", "stroke-width": 2 }, st);
  // bunting (twist)
  const bunting = el("g", { opacity: 0 }, st);
  el("path", { d: `M${sx - 12} 256 Q${sx + sw / 2} 280 ${sx + sw + 12} 256`, fill: "none", stroke: "#8f86b8", "stroke-width": 2 }, bunting);
  for (let i = 0; i < 12; i++) {
    const t = (i + 0.5) / 12, bx = lerp(sx - 12, sx + sw + 12, t), by = 256 + Math.sin(t * Math.PI) * 12;
    el("path", { d: `M${bx - 8} ${by} L${bx + 8} ${by} L${bx} ${by + 14} Z`, fill: ["#f0b429", "#2bb3a3", "#7b6cd9", "#ef5b6b"][i % 4] }, bunting);
  }
  const fest = el("g", { opacity: 0 }, st);
  el("rect", { x: sx + 30, y: 206, width: sw - 60, height: 30, rx: 15, fill: "#7b6cd9" }, fest);
  el("text", { x: sx + sw / 2, y: 226, "text-anchor": "middle", class: "chip-text", fill: "#fff", text: "FESTIVAL WEEK!" }, fest);

  const A = layers.actors;
  // crates stack on the table: 6 columns × 3 rows = 18
  const crateG = el("g", {}, A);
  const crates = [];
  for (let i = 0; i < V.max; i++) {
    const col = i % 6, row = Math.floor(i / 6);
    const g = el("g", { opacity: 0 }, crateG);
    drawCrate(g, { x: sx + 6 + col * (CW + 1.5), y: STAND.top + 44 - CH - row * (CH - 2), w: CW, h: CH, berries: true });
    crates.push(g);
  }
  // price board
  const PB = { x: 380, y: 322 };
  el("rect", { x: PB.x, y: PB.y, width: 196, height: 96, rx: 14, fill: "#2f4a3a", stroke: "#b07a3e", "stroke-width": 5, filter: "url(#softShadow)" }, A);
  el("text", { x: PB.x + 98, y: PB.y + 26, "text-anchor": "middle", class: "tile-caption", style: "fill:#d8f0dd", text: "PRICE PER CRATE" }, A);
  const priceT = el("text", { x: PB.x + 98, y: PB.y + 70, "text-anchor": "middle", class: "count-num", style: "font-size:34px;fill:#ffffff", text: "—" }, A);
  const soldChip = el("text", { x: PB.x + 98, y: PB.y + 90, "text-anchor": "middle", class: "tile-caption", style: "fill:#9ff1b8", text: "" }, A);
  el("rect", { x: PB.x + 90, y: PB.y + 96, width: 16, height: 60, fill: "#b07a3e" }, st);
  const crowd = el("g", {}, A);

  const pad = countPad(A, { x: 220, y: 220, unit: "", width: 240, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 220 + 128, 206, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#ef5b6b", fmt: (v) => `${Math.round(v)} credits` });

  function showCrates(n, animate) {
    crates.forEach((c, i) => {
      const on = i < n, was = +c.getAttribute("opacity") > 0.5;
      if (on === was) return;
      if (!animate || RM) { set(c, { opacity: on ? 1 : 0, transform: "" }); return; }
      if (on) tween(260, (u) => set(c, { opacity: u, transform: `translate(0,${((1 - ease.outBack(u)) * -30).toFixed(1)})` }), ease.linear);
      else set(c, { opacity: 0 });
    });
  }
  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: String(v), unit: "crates" }),
    offText: "Crates",
    onChange: (v) => showCrates(v || 0, true),
  });

  let runId = 0;
  const people = new Set();
  function clearCrowd() { runId++; people.forEach((w) => w.remove()); people.clear(); }
  async function run(dist) {
    ctl.busy = true;
    pad.setVisible(false);
    clearCrowd();
    const id = runId;
    pointer.show();
    const n = SHOPPERS[S.round] || 7;
    const start = MAX; // board opens at the top price
    pointer.set(start);
    priceT.textContent = `${start}`;
    soldChip.textContent = "";
    if (!RM) {
      const arrivals = [];
      for (let i = 0; i < n; i++) {
        const w = walker(crowd, anim, { x: 1400 + i * 40, y: LANE - (i % 3) * 5, seed: i + S.round * 5, scale: 0.95 });
        people.add(w);
        arrivals.push(anim.wait(i * 160).then(() => (id === runId ? w.walk(sx + sw + 30 + i * 26, LANE - (i % 3) * 5, 1500) : null)).then(() => w.face(-1)));
      }
      await Promise.all(arrivals);
    }
    if (id !== runId) return;
    // the price rolls down until the crates would all sell
    await pointer.to(dist, RM ? 0 : 1200 + (start - dist) * 30, ease.outCubic, (v) => { priceT.textContent = `${Math.round(v)}`; });
    priceT.textContent = `${dist}`;
    // shoppers each carry off a crate
    if (!RM) {
      const list = [...people];
      const take = Math.min(list.length, ctl.value || 0);
      for (let i = 0; i < take; i++) {
        const w = list[i];
        const c = crates[(ctl.value || 1) - 1 - i];
        if (c) set(c, { opacity: 0 });
        drawCrate(w.g, { x: -12, y: -40, w: 24, h: 16, berries: true });
        w.walk(-80, LANE, 1400 + i * 60);
        await anim.wait(90);
      }
      // every crate sells at the settled price
      const left = crates.filter((c) => +c.getAttribute("opacity") > 0.5);
      await tween(400, (u) => left.forEach((c) => set(c, { opacity: 1 - u })));
      soldChip.textContent = "All sold!";
    }
    await anim.wait(RM ? 0 : 300);
    await pointer.hide(300);
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    clearCrowd();
    priceT.textContent = "—";
    soldChip.textContent = "";
    ctl.clear();
    showCrates(0, false);
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    clearCrowd();
    if (instant) { set(bunting, { opacity: 1 }); set(fest, { opacity: 1 }); return; }
    pad.setVisible(false);
    await tween(RM ? 0 : 700, (u) => { set(bunting, { opacity: u, transform: `translate(0,${(1 - u) * -20})` }); set(fest, { opacity: u }); }, ease.outCubic);
    // a festival crowd strolls through
    const ws = [];
    for (let i = 0; i < 6; i++) ws.push(walker(crowd, anim, { x: 1400 + i * 50, y: LANE - (i % 3) * 5, seed: i + 11 }));
    await Promise.all(ws.map((w, i) => anim.wait(i * 120).then(() => w.walk(-60, LANE, RM ? 0 : 2200))));
    ws.forEach((w) => w.remove());
    pad.setVisible(true);
  }
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    destroy() { clearCrowd(); },
  });
}
