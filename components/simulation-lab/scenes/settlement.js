// Settlement Distance Test scene (SS.4.7A-SL). A top-down map of 1800s Texas
// land with a river on the left and mile lines stretching away from it. The
// student picks how many miles from the river the new town site is (the pin
// hops to that mile line). On "Open the land!" covered wagons roll in from the
// river crossing; every family that chooses the site builds a little house,
// drops into the family tally and nudges the pointer on the families gauge.
// Twist: "rocky" — a new survey shows rocks, thicker the farther you go from
// the river, so fewer families settle far out (the drop gets steeper).
import { el, set, lerp, ease, addDefs } from "../kit/core";
import { ground, meterTrack, lockBadge, metalDefs } from "../kit/parts";
import { countPad, livePointer } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";
import { iconCounter } from "../kit/props";

const TY = 512, X0 = 610;
const MAP = { x: 40, y: 206, w: 540, h: 250 };
const RIVER_X = 92, MILE0 = 118, MILE_PX = 48;
const CROSS = { x: RIVER_X + 18, y: 420 }; // wagons come over the ford here

export const settlementScene = {
  id: "settlement",
  runLabel: "Open the land!",
  resetLabel: "New site",
  sam: {
    start: "Tap + to choose how far from the river the new town site is.",
    pumping: "A site {v} from the river! Change it, or drag the purple flag to predict how many families settle.",
    needFlag: "Drag the purple flag to how many families you think will settle there.",
    needSetting: "Choose a site first — tap +!",
    ready: "Great prediction! Tap “Open the land!”",
    readyNoFlag: "Ready when you are — tap “Open the land!”",
    running: "Wagons are rolling in…",
    full: "That’s the farthest site on the map — {max}.",
    empty: "That’s right next to the river — {min}.",
    repeat: "You already tried {v}. Try a different distance to find a pattern!",
    next: "Tap New site, then choose a different distance.",
    locked: "Mission Control picked the site {v} out — just place your flag!",
    fairTest: "Think about what you changed on the map each time.",
    twistPredict: "The land farther out is rocky. At {v} from the river, how many families will settle? Move your flag!",
    twistRun2: "Now pick any site and open the rocky land once more.",
    explain: "Use your chart! Tell one distance and how many families settled — and why the river matters.",
    pastFlag: "{v} more than your flag settled.",
    beforeFlag: "{v} fewer than your flag settled.",
    compareR1: "Before the rocky survey, {v} settled at that distance!",
  },
  create,
};

function house(g, i) {
  const c = ["#ef5b6b", "#7b6cd9", "#f0932b", "#2bb3a3"][i % 4];
  el("rect", { x: -5, y: -3, width: 10, height: 8, fill: "#e0a96d", stroke: "#b07a3e", "stroke-width": 1 }, g);
  el("path", { d: "M-7 -2 L0 -8 L7 -2 Z", fill: c }, g);
}

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max, PX = 660 / MAX;
  const S = { round: 1, rocky: false, t: 0 };
  metalDefs(defs);
  addDefs(defs, "settleDefs", `
    <linearGradient id="landGrad" x1="0" x2="1"><stop offset="0" stop-color="#bfe6a4"/><stop offset=".55" stop-color="#d8e8a0"/><stop offset="1" stop-color="#ecdcaa"/></linearGradient>
    <clipPath id="mapClip"><rect x="${MAP.x}" y="${MAP.y}" width="${MAP.w}" height="${MAP.h}" rx="18"/></clipPath>`);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 5, minor: 1, fine: 1, unitLabel: "families" });
  el("text", { x: X0 - 44, y: TY + 18, class: "tile-caption", "text-anchor": "end", text: "FAMILIES" }, st);
  el("text", { x: X0 - 44, y: TY + 36, class: "tile-caption", "text-anchor": "end", text: "SETTLED →" }, st);

  // the map
  el("rect", { x: MAP.x - 6, y: MAP.y - 6, width: MAP.w + 12, height: MAP.h + 12, rx: 22, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 1.5, filter: "url(#softShadow)" }, st);
  const map = el("g", { "clip-path": "url(#mapClip)" }, st);
  el("rect", { x: MAP.x, y: MAP.y, width: MAP.w, height: MAP.h, fill: "url(#landGrad)" }, map);
  // river
  let d = `M${RIVER_X} ${MAP.y - 10}`;
  for (let y = MAP.y; y <= MAP.y + MAP.h + 20; y += 25) d += ` Q${RIVER_X + (Math.floor(y / 25) % 2 ? 16 : -16)} ${y + 12} ${RIVER_X} ${y + 25}`;
  el("path", { d: d + ` H${MAP.x - 10} V${MAP.y - 10} Z`, fill: "#7cc6ec" }, map);
  el("path", { d, fill: "none", stroke: "#5ab0de", "stroke-width": 6 }, map);
  // trees near the river (fertile land)
  for (let i = 0; i < 9; i++) {
    const tx = RIVER_X + 22 + ((i * 17) % 40), ty = MAP.y + 20 + ((i * 53) % (MAP.h - 40));
    el("circle", { cx: tx, cy: ty, r: 7, fill: "#6cc04a", opacity: 0.8 }, map);
  }
  // mile lines + labels
  for (let m = 1; m <= V.max; m++) {
    const x = MILE0 + m * MILE_PX;
    el("line", { x1: x, x2: x, y1: MAP.y + 24, y2: MAP.y + MAP.h - 6, stroke: "#8a7a50", "stroke-width": 1.2, "stroke-dasharray": "4 6", opacity: 0.55 }, map);
    el("text", { x, y: MAP.y + 18, "text-anchor": "middle", class: "weight-label", style: "font-size:10px;fill:#6b5a2e", text: `${m} mi` }, map);
  }
  el("text", { x: RIVER_X, y: MAP.y + MAP.h - 10, "text-anchor": "middle", class: "weight-label", style: "font-size:10px;fill:#1f5f86", text: "RIVER" }, map);
  // trail from the ford across the map
  el("path", { d: `M${CROSS.x} ${CROSS.y} H${MAP.x + MAP.w}`, stroke: "#c9a96a", "stroke-width": 8, "stroke-linecap": "round", opacity: 0.55 }, map);
  // rocks (twist): thicker far from the river
  const rocks = el("g", { opacity: 0 }, map);
  for (let i = 0; i < 90; i++) {
    const f = Math.pow((i % 30) / 30, 0.6);
    const rx = MILE0 + 30 + f * (MAP.w - 100) + ((i * 37) % 30), ry = MAP.y + 30 + ((i * 71) % (MAP.h - 50));
    if (((i * 97) % 100) / 100 < 0.15 + f * 0.85) el("ellipse", { cx: rx, cy: ry, rx: 3 + f * 4, ry: 2.5 + f * 3, fill: "#9a9486", stroke: "#7a7466", "stroke-width": 1 }, rocks);
  }
  const A = layers.actors;
  const houses = el("g", { "clip-path": "url(#mapClip)" }, A);
  const wagons = el("g", {}, A);
  const pin = el("g", { opacity: 0 }, A);
  el("path", { d: "M0 0 C-12 -16 -12 -30 0 -32 C12 -30 12 -16 0 0Z", fill: "#ef5b6b", stroke: "#fff", "stroke-width": 2 }, pin);
  el("circle", { cx: 0, cy: -21, r: 5, fill: "#fff" }, pin);
  const siteY = MAP.y + 110;

  const board = iconCounter(A, anim, { x: 626, y: 262, cols: 20, rows: 2, cell: 17, draw: house, title: "FAMILIES WHO SETTLED" });
  const pad = countPad(A, { x: 310, y: 164, unit: "", width: 260, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 310 + 138, 150, 16);
  const pointer = livePointer(layers.over, anim, { trackX: (v) => X0 + v * PX, TY, color: "#7b6cd9", fmt: (v) => `${Math.round(v)} ${Math.round(v) === 1 ? "family" : "families"}` });

  const mileX = (m) => MILE0 + m * MILE_PX;
  function placePin(v, animate) {
    if (v == null) { set(pin, { opacity: 0 }); return; }
    const to = mileX(v);
    set(pin, { opacity: 1 });
    if (!animate || RM) { set(pin, { transform: `translate(${to},${siteY})` }); S.pinX = to; return; }
    const from = S.pinX == null ? to : S.pinX;
    S.pinX = to;
    tween(260, (u, raw) => set(pin, { transform: `translate(${lerp(from, to, u).toFixed(1)},${(siteY - Math.sin(raw * Math.PI) * 16).toFixed(1)})` }), ease.outCubic);
  }
  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: String(v), unit: v === 1 ? "mile from river" : "miles from river" }),
    offText: "Site",
    onChange: (v) => placePin(v, true),
  });

  function wagon(parent) {
    const g = el("g", {}, parent);
    el("rect", { x: -12, y: -6, width: 24, height: 8, rx: 2, fill: "#b07a3e" }, g);
    el("path", { d: "M-11 -6 Q-11 -18 0 -18 Q11 -18 11 -6 Z", fill: "#fbf6e6", stroke: "#cbbf9a", "stroke-width": 1 }, g);
    el("circle", { cx: -7, cy: 3, r: 3.5, fill: "#4a4166" }, g);
    el("circle", { cx: 7, cy: 3, r: 3.5, fill: "#4a4166" }, g);
    el("rect", { x: 13, y: -5, width: 8, height: 5, rx: 2, fill: "#8a5a3c" }, g);
    return g;
  }
  let runId = 0;
  function slot(i, x) {
    const col = i % 6, row = Math.floor(i / 6);
    return { x: x - 30 + col * 12 + (row % 2) * 6, y: siteY + 14 + row * 11 - 60 + 52 };
  }
  async function run(dist) {
    ctl.busy = true;
    pad.setVisible(false);
    const id = ++runId;
    while (houses.firstChild) houses.firstChild.remove();
    board.set(0);
    pointer.set(0); pointer.show();
    const v = ctl.value || 1, x = mileX(v);
    if (RM || dist === 0) {
      for (let i = 0; i < dist; i++) { const s = slot(i, x); house(el("g", { transform: `translate(${s.x},${s.y})` }, houses), i); }
      board.set(dist); pointer.set(dist); await pointer.hide(0); ctl.busy = false; return;
    }
    const H = 2600 + dist * 55, travel = 500 + v * 110;
    let count = 0;
    const jobs = [];
    for (let i = 0; i < dist; i++) {
      jobs.push(anim.wait((i / dist) * H).then(async () => {
        if (id !== runId) return;
        const w = wagon(wagons);
        const s = slot(i, x);
        await tween(travel, (u) => {
          const px = lerp(CROSS.x - 30, s.x, u), py = u < 0.7 ? CROSS.y : lerp(CROSS.y, s.y, (u - 0.7) / 0.3);
          set(w, { transform: `translate(${px.toFixed(1)},${(py - Math.abs(Math.sin(u * 30)) * 1.2).toFixed(1)})` });
        }, ease.linear);
        w.remove();
        if (id !== runId) return;
        const h = el("g", { transform: `translate(${s.x},${s.y}) scale(0.2)` }, houses);
        house(h, i);
        tween(220, (u) => set(h, { transform: `translate(${s.x},${s.y}) scale(${(0.2 + 0.8 * ease.outBack(u)).toFixed(3)})` }), ease.linear);
        count++;
        board.bump();
        pointer.to(count, 200);
      }));
    }
    await Promise.all(jobs);
    board.set(dist); pointer.set(dist);
    await anim.wait(250);
    await pointer.hide(300);
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    runId++;
    while (wagons.firstChild) wagons.firstChild.remove();
    const kids = [...houses.childNodes];
    await tween(RM ? 0 : 300, (u) => kids.forEach((k) => set(k, { opacity: 1 - u })));
    kids.forEach((k) => k.remove());
    board.set(0);
    S.pinX = null;
    ctl.clear();
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    while (houses.firstChild) houses.firstChild.remove();
    board.set(0);
    if (instant) { set(rocks, { opacity: 1 }); return; }
    pad.setVisible(false);
    // a survey sweep reveals the rocks from the river outward
    const cp = el("clipPath", { id: "rockSweep" }, defs);
    const r = el("rect", { x: MAP.x, y: MAP.y, width: 0, height: MAP.h }, cp);
    set(rocks, { opacity: 1, "clip-path": "url(#rockSweep)" });
    await tween(RM ? 0 : 1600, (u) => set(r, { width: MAP.w * u }), ease.inOutCubic);
    rocks.removeAttribute("clip-path");
    cp.remove();
    pad.setVisible(true);
  }
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    gapWords: { under: "too low", over: "too high" },
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    destroy() { runId++; },
  });
}
