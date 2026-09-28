// Motion Path Test scene (3.7B-SL). A push machine shoves a supply crate
// across numbered floor tiles. The student sets the push strength (1–9, shown
// on the machine's power bars); on "Push!" the plunger winds back and slams
// the crate, which slides and stops. Tiles light up to count the distance.
// Twist: "carpet" — the robot arm unrolls carpet over the tiles (more
// friction), so every push slides the crate a shorter way.
import { el, set, lerp, ease } from "../kit/core";
import { ground, floorTiles, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";
import { crate as drawCrate } from "../kit/props";
import { tileCarpet } from "../kit/carpet";

const TY = 512, X0 = 250, TILES = 18, PX = 57, CW = 74, CH = 58;
const MACH = { x: 118, y: TY - 8 };

export const crateScene = {
  id: "crate",
  runLabel: "Push!",
  resetLabel: "Reset crate",
  sam: {
    start: "Tap + to choose how hard the machine pushes.",
    pumping: "Push strength {v}! Change it, or drag the purple flag to predict where the crate stops.",
    needFlag: "Drag the purple flag to where you think the crate will stop.",
    needSetting: "Choose a push strength first — tap +!",
    ready: "Great prediction! Tap “Push!”",
    readyNoFlag: "Ready when you are — tap “Push!”",
    running: "Push!",
    full: "That’s the strongest push — {max}.",
    empty: "That’s the gentlest push — {min}.",
    repeat: "You already tried push {v}. Try a different push to find a pattern!",
    next: "Tap Reset crate, then choose a different push.",
    locked: "Mission Control set this test to push {v} — just place your flag!",
    fairTest: "Think about what you changed on the push machine each time.",
    twistPredict: "The floor is carpet now. With push {v}, where will the crate stop? Move your flag!",
    twistRun2: "Now pick any push and try the carpet once more.",
    explain: "Use your chart! Tell one push strength and how many tiles the crate slid.",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const S = { round: 1, x: 0, rod: 0 };
  metalDefs(defs);
  const st = layers.static;
  ground(st, defs, TY);
  const tiles = floorTiles(st, anim, { x0: X0, px: PX, TY, count: TILES, padLeft: 30, caption: "floor tiles" });
  const A = layers.actors;
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });
  const carpet = tileCarpet({ defs, tiles, x0: X0, px: PX, TY, count: TILES, anim, arm, idSuffix: "Crate" });

  // push machine: housing, power bars, plunger rod + pad
  const m = el("g", { transform: `translate(${MACH.x},${MACH.y})` }, st);
  el("rect", { x: -70, y: -92, width: 110, height: 92, rx: 14, fill: "#7b6cd9" }, m);
  el("rect", { x: -60, y: -82, width: 60, height: 72, rx: 8, fill: "#5a4bb8" }, m);
  const bars = [];
  for (let i = 0; i < 9; i++) bars.push(el("rect", { x: -54, y: -18 - i * 7.2, width: 48, height: 5, rx: 2, fill: "#ffffff", opacity: 0.18 }, m));
  el("text", { x: 20, y: -70, "text-anchor": "middle", class: "weight-label", text: "PUSH" }, m);
  el("rect", { x: -78, y: -4, width: 126, height: 10, rx: 5, fill: "#4a4166" }, m);
  const rodG = el("g", {}, A);
  const rod = el("rect", { y: -48, height: 12, rx: 6, fill: "url(#slxChrome)", stroke: "#a39dbd" }, rodG);
  const plate = el("rect", { y: -66, width: 12, height: 48, rx: 5, fill: "#f0932b" }, rodG);
  const spring = el("path", { fill: "none", stroke: "#5b5378", "stroke-width": 3 }, rodG);

  const crateG = el("g", {}, A);
  drawCrate(crateG, { x: -CW, y: -CH, w: CW, h: CH, label: "SUPPLY" });
  const dust = particles(A, anim, { stroke: "#d4cbef", strokeWidth: 1.2, grow: 10, alpha: 0.7, dragX: 0.1, dragY: 1, lift: 0 });

  const pad = countPad(A, { x: 250, y: 300, unit: "", width: 230, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 250 + 124, 286, 16);

  const baseX = MACH.x + 40; // machine front
  function draw() {
    const cx = X0 + S.x * PX; // crate front edge
    set(crateG, { transform: `translate(${cx.toFixed(1)},${TY - 2})` });
    const plateX = Math.max(baseX + 4, Math.min(cx - CW - 12, X0 - CW - 12 - S.rod));
    const y = TY - 2;
    set(rod, { x: baseX - 4, width: Math.max(0, plateX - baseX + 6), y: y - 34 });
    set(plate, { x: plateX, y: y - 52 });
    let d = `M${baseX} ${y - 28}`;
    const n = 7, len = plateX - baseX;
    for (let i = 1; i <= n; i++) d += ` L${(baseX + (len * (i - 0.5)) / n).toFixed(1)} ${y - 28 + (i % 2 ? -8 : 8)}`;
    d += ` L${plateX} ${y - 28}`;
    set(spring, { d });
  }
  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: `Push ${v}`, unit: "" }),
    offText: "Push",
    onChange: (v) => bars.forEach((b, i) => set(b, { opacity: v != null && i < v ? 1 : 0.18, fill: v != null && i < v ? (i < 3 ? "#9ff1e6" : i < 6 ? "#ffd25e" : "#ff9f7a") : "#ffffff" })),
  });

  async function run(dist) {
    ctl.busy = true;
    pad.setVisible(false);
    const v = ctl.value || 1;
    // wind back (farther for a stronger push), then slam forward
    await tween(RM ? 0 : 350 + v * 30, (u) => { S.rod = u * (6 + v * 5); draw(); }, ease.inOutCubic);
    await tween(RM ? 0 : 120, (u) => { S.rod = (1 - u) * (6 + v * 5); draw(); }, ease.inCubic);
    const T = RM ? 0 : 700 + dist * 110;
    await tween(T, (u) => {
      S.x = dist * u; draw();
      if (!RM && u < 0.9 && Math.random() < 0.3) dust.emit(X0 + S.x * PX - CW, TY - 4, -24, -10, 3, 0.5);
    }, ease.outCubic);
    S.x = dist; draw();
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    const from = S.x;
    await tween(RM ? 0 : 200, (u) => set(crateG, { opacity: 1 - u }));
    S.x = 0; S.rod = 0; draw();
    await tween(RM ? 0 : 260, (u) => set(crateG, { opacity: u }), ease.outCubic);
    ctl.clear();
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
    return from;
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { carpet.play({ instant: true }); return; }
    pad.setVisible(false);
    await carpet.play({ startX: X0 + 30 });
    pad.setVisible(true);
  }
  draw();
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 72, pinHead: true, landingBlockW: 80,
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    showCount: (dist, round) => tiles.countUp(dist, round === 2 ? "#f0932b" : "#2bb3a3"),
    clearCount: () => tiles.clear(),
    destroy() { dust.destroy(); },
  });
}
