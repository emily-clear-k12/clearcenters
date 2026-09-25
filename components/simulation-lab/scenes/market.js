// Market Price Test scene (SS.3.6A-SL). A fruit-cup stand with a hanging price
// tag. The student sets the price (− / +, in cents). On "Open stand!" the
// clock runs one hour: the same crowd of Cadets walks by, and at a lower price
// more of them stop, buy a cup and carry it off; the others keep walking.
// Every buyer drops into the tally board and nudges the pointer along the
// "buyers per hour" gauge.
// Twist: "rain" — clouds roll in, it rains, fewer Cadets are outside (the few
// who are carry umbrellas), so fewer buy at every price (demand falls).
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";
import { walker, iconCounter, stopwatch, priceTag } from "../kit/props";

const TY = 512, X0 = 610, LANE = 478, STAND_X = 220, BUY_X = 300;
const CROWD = { 1: 40, 2: 30 }; // people who walk by in the hour

export const marketScene = {
  id: "market",
  runLabel: "Open stand!",
  resetLabel: "New hour",
  sam: {
    start: "Tap + to set the price of a fruit cup.",
    pumping: "{v} a cup! Change it, or drag the purple flag to predict how many people will buy.",
    needFlag: "Drag the purple flag to how many buyers you think will come in one hour.",
    needSetting: "Set a price first — tap +!",
    ready: "Great prediction! Tap “Open stand!”",
    readyNoFlag: "Ready when you are — tap “Open stand!”",
    running: "The stand is open… count the buyers!",
    full: "That’s the highest price — {max}.",
    empty: "That’s the lowest price — {min}.",
    repeat: "You already tried {v}. Try a different price to find a pattern!",
    next: "Tap New hour, then choose a different price.",
    locked: "Mission Control set the price to {v} — just place your flag!",
    fairTest: "Think about what you changed on the price tag each time.",
    twistPredict: "It’s raining now. At {v}, how many people will buy? Move your flag!",
    twistRun2: "Now pick any price and open the stand in the rain once more.",
    explain: "Use your chart! Tell one price and how many people bought.",
    pastFlag: "{v} more than your flag bought.",
    beforeFlag: "{v} fewer than your flag bought.",
    compareR1: "On a sunny day at that price, {v} bought!",
  },
  create,
};

function smallPerson(g, i) {
  const c = ["#7b6cd9", "#2bb3a3", "#f0932b", "#ef5b6b", "#5cc3e0"][i % 5];
  el("circle", { cx: 0, cy: -5, r: 3.6, fill: "#e0b48a" }, g);
  el("path", { d: "M-5.5 7 Q-6 -1 0 -1 Q6 -1 5.5 7 Z", fill: c }, g);
}
function fruitCup(parent, x, y, s = 1) {
  const g = el("g", { transform: `translate(${x},${y}) scale(${s})` }, parent);
  el("path", { d: "M-9 -12 H9 L6 4 H-6 Z", fill: "#ffffff", stroke: "#d8d0f0", "stroke-width": 1.5 }, g);
  el("circle", { cx: -4, cy: -13, r: 3.5, fill: "#ef4b5f" }, g);
  el("circle", { cx: 2, cy: -14, r: 3.5, fill: "#f0b429" }, g);
  el("circle", { cx: 6, cy: -12, r: 3, fill: "#6cc04a" }, g);
  return g;
}

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, rain: false, t: 0 };
  metalDefs(defs);
  addDefs(defs, "marketDefs", `
    <pattern id="awningStripes" width="36" height="40" patternUnits="userSpaceOnUse"><rect width="18" height="40" fill="#2bb3a3"/><rect x="18" width="18" height="40" fill="#ffffff"/></pattern>
    <linearGradient id="rainSky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3b4a78" stop-opacity=".34"/><stop offset="1" stop-color="#3b4a78" stop-opacity=".08"/></linearGradient>`);
  const st = layers.static;
  const sky = el("rect", { x: 0, y: 0, width: 1366, height: 704, fill: "url(#rainSky)", opacity: 0 }, st);
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 5, minor: 1, fine: 1, unitLabel: "buyers" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "BUYERS" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "PER HOUR →" }, st);

  // the stand
  const sx0 = STAND_X - 110, sx1 = STAND_X + 110;
  el("rect", { x: sx0 + 10, y: 336, width: 8, height: 134, fill: "#b07a3e" }, st);
  el("rect", { x: sx1 - 18, y: 336, width: 8, height: 134, fill: "#b07a3e" }, st);
  walker(st, anim, { x: STAND_X - 40, y: 440, seed: 4, shirt: "#7b6cd9" }); // the seller
  el("rect", { x: sx0, y: 410, width: 220, height: 60, rx: 8, fill: "#e0a96d", stroke: "#b07a3e", "stroke-width": 2 }, st);
  el("rect", { x: sx0 + 18, y: 426, width: 110, height: 26, rx: 6, fill: "#fff7d6" }, st);
  el("text", { x: sx0 + 73, y: 444, "text-anchor": "middle", class: "weight-label", style: "font-size:11px;fill:#8a5a00", text: "FRUIT CUPS" }, st);
  for (let i = 0; i < 4; i++) fruitCup(st, sx0 + 150 + (i % 2) * 24, 408, 0.9);
  el("path", { d: `M${sx0 - 14} 318 H${sx1 + 14} L${sx1 + 4} 346 H${sx0 - 4} Z`, fill: "url(#awningStripes)", stroke: "#1d8c80", "stroke-width": 2 }, st);
  let sc = "";
  for (let x = sx0 - 4; x < sx1 + 4; x += 18) sc += ` M${x} 346 q9 12 18 0`;
  el("path", { d: sc, fill: "#2bb3a3", stroke: "#1d8c80", "stroke-width": 1.5 }, st);
  const tag = priceTag(st, anim, { x: STAND_X + 40, y: 392, w: 92 });
  const clock = stopwatch(st, { x: STAND_X, y: 270, r: 24, color: "#2bb3a3" });
  el("text", { x: STAND_X + 34, y: 262, class: "tile-caption", text: "1 HOUR" }, st);

  // clouds + rain (twist)
  const clouds = el("g", { opacity: 0 }, layers.under);
  [[700, 262, 1], [860, 250, 1.2], [560, 250, 0.8]].forEach(([x, y, s]) => {
    const c = el("g", { transform: `translate(${x},${y}) scale(${s})` }, clouds);
    el("path", { d: "M-50 14 Q-58 -8 -34 -10 Q-26 -32 0 -26 Q20 -40 36 -18 Q60 -18 54 6 Q58 16 44 16 H-40 Q-54 18 -50 14Z", fill: "#dfe3f0", stroke: "#c3c9de", "stroke-width": 2 }, c);
  });
  const rainG = el("g", { opacity: 0 }, layers.over);
  const drops = [];
  for (let i = 0; i < 70; i++) drops.push({ el: el("line", { stroke: "#7fa6d8", "stroke-width": 2, "stroke-linecap": "round", opacity: 0.6 }, rainG), x: Math.random() * 1366, y: 220 + Math.random() * 280, v: 500 + Math.random() * 300 });

  const A = layers.actors;
  const crowdG = el("g", {}, A);
  const board = iconCounter(A, anim, { x: 380, y: 224, cols: 10, rows: 4, cell: 19, draw: smallPerson, title: "BUYERS THIS HOUR" });
  const pad = countPad(A, { x: 483, y: 380, unit: "", width: 210, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 483 + 114, 366, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${Math.round(v)} buyers` });

  const tick = (dt) => {
    if (!S.rain || RM) return;
    for (const d of drops) {
      d.y += d.v * dt; d.x -= d.v * dt * 0.15;
      if (d.y > 500) { d.y = 220 + Math.random() * 30; d.x = Math.random() * 1400; }
      set(d.el, { x1: d.x.toFixed(1), y1: d.y.toFixed(1), x2: (d.x - 3).toFixed(1), y2: (d.y + 14).toFixed(1) });
    }
  };
  anim.tickers.add(tick);

  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: `${v}¢`, unit: "a cup" }),
    offText: "Price",
    onChange: (v) => { tag.set(v == null ? "?" : `${v}¢`); if (v != null) tag.swing(); },
  });

  const active = new Set();
  let runId = 0;
  function spawn(seed) {
    const w = walker(crowdG, anim, { x: 1400, y: LANE - (seed % 3) * 5, scale: 0.95 + (seed % 4) * 0.03, seed, umbrella: S.rain });
    active.add(w);
    return w;
  }
  async function walkBuyer(seed, id, onBuy) {
    const w = spawn(seed);
    await w.walk(BUY_X + (seed % 3) * 6, LANE, 1700);
    if (id !== runId) return;
    fruitCup(w.g, 12, -26, 0.7);
    onBuy();
    await anim.wait(RM ? 0 : 260);
    if (id !== runId) return;
    await w.walk(-60, LANE, 900);
    active.delete(w); w.remove();
  }
  async function walkPasser(seed, id) {
    const w = spawn(seed);
    await w.walk(-60, LANE + 6, 3000 + (seed % 5) * 120);
    if (id !== runId) return;
    active.delete(w); w.remove();
  }
  function clearCrowd() { runId++; active.forEach((w) => w.remove()); active.clear(); }

  async function run(dist) {
    ctl.busy = true;
    pad.setVisible(false);
    clearCrowd();
    const id = runId;
    board.set(0);
    pointer.set(0); pointer.show();
    clock.set(0, "0 min");
    if (RM) { board.set(dist); pointer.set(dist); clock.set(0.9999, "60 min"); await pointer.hide(0); ctl.busy = false; return; }
    const crowd = Math.max(CROWD[S.round] || 40, dist);
    const H = 3200 + dist * 45; // spread of arrivals
    const total = H + 1700 + 300;
    // who buys: spread the buyers evenly through the crowd
    const buys = [];
    for (let i = 0; i < crowd; i++) buys.push(Math.floor(((i + 1) * dist) / crowd) > Math.floor((i * dist) / crowd));
    let count = 0;
    const jobs = [];
    const t0 = performance.now();
    const clockTick = () => { const f = Math.min(1, (performance.now() - t0) / total); clock.set(f, `${Math.round(f * 60)} min`); };
    anim.tickers.add(clockTick);
    for (let i = 0; i < crowd; i++) {
      const at = (i / crowd) * H;
      jobs.push(anim.wait(at).then(() => {
        if (id !== runId) return null;
        if (buys[i]) return walkBuyer(i + 7 * S.round, id, () => { count++; board.bump(); pointer.to(count, 220); });
        walkPasser(i + 3, id);
        return null;
      }));
    }
    await Promise.all(jobs);
    // wait until the last buyer has bought
    while (count < dist && id === runId) await anim.wait(60);
    anim.tickers.delete(clockTick);
    clock.set(0.9999, "60 min");
    board.set(dist);
    pointer.set(dist);
    await anim.wait(250);
    await pointer.hide(300);
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    clearCrowd();
    board.set(0);
    clock.set(0, "");
    ctl.clear();
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    clearCrowd();
    board.set(0);
    const on = (u) => { set(sky, { opacity: u }); set(clouds, { opacity: u, transform: `translate(${(1 - u) * 200},0)` }); set(rainG, { opacity: u }); };
    S.rain = true;
    if (instant) { on(1); return; }
    pad.setVisible(false);
    await tween(RM ? 0 : 1400, on, ease.inOutCubic);
    // a couple of Cadets hurry by under umbrellas
    const w = walker(crowdG, anim, { x: 1400, y: LANE, seed: 5, umbrella: true });
    await w.walk(-60, LANE, RM ? 0 : 1800);
    w.remove();
    pad.setVisible(true);
  }
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    destroy() { clearCrowd(); anim.tickers.delete(tick); },
  });
}
