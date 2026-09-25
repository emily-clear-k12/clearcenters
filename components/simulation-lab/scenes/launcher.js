// Rubber Band Launch scene (3.8A-SL). A slingshot-style launcher on a stand.
// The student sets how far the rubber band is pulled back (cm); the band and
// pod pull back and the STORED ENERGY bar fills (elastic energy). On
// "Launch!" the band snaps forward and the pod flies (mechanical energy of
// motion) in an arc, landing on a cm ruler.
// Twist: "heavyPod" — the robot arm swaps the pod for a heavier steel pod.
import { el, set, lerp, ease } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad, armSwap, armSwapInstant } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";

const TY = 512, X0 = 330, FORK = { x: 206, y: 404 }, POD_R = 16;

export const launcherScene = {
  id: "launcher",
  runLabel: "Launch!",
  resetLabel: "Reload",
  sam: {
    start: "Tap + to pull the rubber band back.",
    pumping: "Pulled back {v}! Change it, or drag the purple flag to predict where the pod lands.",
    needFlag: "Drag the purple flag to where you think the pod will land.",
    needSetting: "Pull the band back first — tap +!",
    ready: "Great prediction! Tap “Launch!”",
    readyNoFlag: "Ready when you are — tap “Launch!”",
    running: "Launch!",
    full: "That’s as far as the band stretches — {max}.",
    empty: "That’s the smallest pull — {min}.",
    repeat: "You already tried {v}. Try a different stretch to find a pattern!",
    next: "Tap Reload, then choose a different stretch.",
    locked: "Mission Control set this test to {v} — just place your flag!",
    fairTest: "Think about what you changed on the rubber band each time.",
    twistPredict: "This pod is heavier. Pulled back {v}, where will it land? Move your flag!",
    twistRun2: "Now pick any stretch and launch the heavy pod once more.",
    explain: "Use your chart! Tell one stretch and how far the pod flew. Name the kind of energy.",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const V = cfg.variable, MAX = cfg.outcome.max, PX = 930 / MAX;
  const S = { round: 1, pull: 0, pod: { x: FORK.x, y: FORK.y }, flying: false };
  metalDefs(defs);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 10, minor: 5, fine: 1, unitLabel: "cm" });
  el("text", { x: X0 - 12, y: TY + 62, class: "tile-caption", text: "LANDING RULER" }, st);
  // stand + fork
  el("rect", { x: FORK.x - 8, y: FORK.y + 20, width: 16, height: TY - 8 - FORK.y - 20, fill: "#7b6cd9" }, st);
  el("rect", { x: FORK.x - 40, y: TY - 14, width: 80, height: 10, rx: 5, fill: "#5a4bb8" }, st);
  el("path", { d: `M${FORK.x} ${FORK.y + 24} Q${FORK.x - 4} ${FORK.y - 10} ${FORK.x - 24} ${FORK.y - 62} M${FORK.x} ${FORK.y + 24} Q${FORK.x + 6} ${FORK.y - 10} ${FORK.x + 24} ${FORK.y - 70}`, stroke: "#5a4bb8", "stroke-width": 15, "stroke-linecap": "round", fill: "none" }, st);
  const tipA = { x: FORK.x - 24, y: FORK.y - 62 }, tipB = { x: FORK.x + 24, y: FORK.y - 70 };
  // cm scale under the band so the stretch is readable
  for (let c = 0; c <= 18; c += 2) {
    const x = FORK.x - c * 5 * 0.92;
    el("line", { x1: x, x2: x, y1: FORK.y + 38, y2: FORK.y + (c % 6 === 0 ? 48 : 44), stroke: "#8f86b8", "stroke-width": 1.5 }, st);
  }
  el("text", { x: FORK.x - 50, y: FORK.y + 62, "text-anchor": "middle", class: "tile-caption", text: "STRETCH" }, st);
  // stored-energy bar
  const EB = { x: 60, y: 300, h: 150 };
  el("rect", { x: EB.x, y: EB.y, width: 26, height: EB.h, rx: 13, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 2 }, st);
  const eFill = el("rect", { x: EB.x + 4, width: 18, rx: 9, fill: "#f0932b" }, st);
  el("text", { x: EB.x + 13, y: EB.y - 24, "text-anchor": "middle", class: "tile-caption", text: "STORED" }, st);
  el("text", { x: EB.x + 13, y: EB.y - 10, "text-anchor": "middle", class: "tile-caption", text: "ENERGY" }, st);

  const A = layers.actors;
  const bandBack = el("path", { fill: "none", stroke: "#c97a2b", "stroke-width": 6, "stroke-linecap": "round" }, A);
  const podA = el("g", {}, A), podB = el("g", { opacity: 0 }, A);
  function pod(parent, heavy) {
    const g = el("g", {}, parent);
    el("ellipse", { rx: POD_R + 5, ry: POD_R, fill: heavy ? "url(#slxSteel)" : "#5cc3e0", stroke: heavy ? "#5f6a80" : "#2b8fb3", "stroke-width": 2 }, g);
    el("circle", { cx: 5, cy: -3, r: 4, fill: "#ffffff", opacity: 0.7 }, g);
    if (heavy) el("text", { x: -2, y: 4, "text-anchor": "middle", class: "weight-label", style: "font-size:8px", text: "HEAVY" }, g);
    return g;
  }
  const podInA = pod(podA, false), podInB = pod(podB, true);
  const bandFront = el("path", { fill: "none", stroke: "#e39a4c", "stroke-width": 6, "stroke-linecap": "round" }, A);
  const trail = particles(A, anim, { fill: "#ffffff", stroke: "#d4cbef", strokeWidth: 1, grow: 4, alpha: 0.7, dragX: 0.2, dragY: 0.2, lift: 0 });
  const dust = particles(A, anim, { stroke: "#d4cbef", strokeWidth: 1.2, grow: 10, alpha: 0.7, dragX: 0.1, dragY: 1, lift: 0 });
  const pad = countPad(A, { x: 300, y: 262, unit: "", width: 230, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 300 + 124, 248, 16);
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const rest = { x: (tipA.x + tipB.x) / 2 + 2, y: (tipA.y + tipB.y) / 2 + 6 };
  function draw() {
    const back = S.pull * 5;
    const px = S.flying ? S.pod.x : rest.x - back * 0.92, py = S.flying ? S.pod.y : rest.y + back * 0.42;
    const holdX = S.flying ? rest.x : px - POD_R, holdY = S.flying ? rest.y : py;
    set(bandBack, { d: `M${tipA.x} ${tipA.y} L${holdX} ${holdY}` });
    set(bandFront, { d: `M${tipB.x} ${tipB.y} L${holdX} ${holdY}` });
    [podInA, podInB].forEach((p) => set(p, { transform: `translate(${px.toFixed(1)},${py.toFixed(1)}) rotate(${S.flying ? S.spin || 0 : -20})` }));
    const e = (S.pull / V.max) * (EB.h - 8);
    set(eFill, { y: EB.y + EB.h - 4 - e, height: Math.max(0, e) });
  }
  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: `${v} cm`, unit: "pull" }),
    offText: "Pull",
    onChange: (v) => { const target = v || 0; const from = S.pull; if (RM) { S.pull = target; draw(); return; } tween(160, (u) => { S.pull = lerp(from, target, u); draw(); }, ease.outCubic); },
  });

  async function run(dist) {
    ctl.busy = true;
    pad.setVisible(false);
    const from = S.pull;
    // snap forward
    await tween(RM ? 0 : 110, (u) => { S.pull = lerp(from, 0, u); draw(); }, ease.inCubic);
    S.flying = true;
    const sx = rest.x + 10, sy = rest.y, ex = X0 + dist * PX, ey = TY - POD_R - 2;
    const H = 60 + dist * 1.6;
    const T = RM ? 0 : 700 + dist * 12;
    await tween(T, (u) => {
      S.pod.x = lerp(sx, ex, u);
      S.pod.y = lerp(sy, ey, u) - Math.sin(u * Math.PI) * H;
      S.spin = u * 360;
      draw();
      if (!RM && Math.random() < 0.4) trail.emit(S.pod.x - 10, S.pod.y, -10, 0, 2.5, 0.4);
    }, ease.linear);
    if (!RM) for (let i = 0; i < 6; i++) dust.emit(ex, TY - 4, (Math.random() - 0.5) * 60, -20, 3, 0.6);
    await tween(RM ? 0 : 200, (u, raw) => { S.pod.y = ey - Math.sin(raw * Math.PI) * 8; draw(); }, ease.linear);
    S.pod.y = ey; draw();
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    const g = S.round === 2 ? podB : podA;
    await tween(RM ? 0 : 200, (u) => set(g, { opacity: 1 - u }));
    S.flying = false; S.pull = 0; S.spin = 0; draw();
    await tween(RM ? 0 : 260, (u) => set(g, { opacity: u }), ease.outCubic);
    ctl.clear();
    pad.setVisible(true);
    ctl.busy = false;
    api.onSetting(0);
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    S.flying = false; S.pull = 0; draw();
    if (instant) { armSwapInstant({ oldG: podA, newG: podB }); return; }
    pad.setVisible(false);
    await armSwap(arm, anim, { x: rest.x, grabY: rest.y - 34, oldG: podA, newG: podB });
    pad.setVisible(true);
  }
  draw();
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 112, pinChipY: 54, pinHead: true,
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    destroy() { trail.destroy(); dust.destroy(); },
  });
}
