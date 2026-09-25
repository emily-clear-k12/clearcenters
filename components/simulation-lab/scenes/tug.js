// Tug Balance Test scene (5.7A-SL). Two winches pull the same toy cart with
// ropes: the left winch always pulls 10 N, the student sets how many newtons
// MORE the right winch pulls. On "Pull!" both winches reel in; equal pulls
// (0 N difference) just hold the cart still — balanced forces. Any difference
// is an unbalanced force: the cart lurches right, the ropes let go and it
// coasts along a meter track. A net-force arrow shows the difference.
// Twist: "heavyCart" — the robot arm lowers a heavy cargo block into the cart.
import { el, set, lerp, ease } from "../kit/core";
import { ground, meterTrack, robotArm, particles, lockBadge, metalDefs } from "../kit/parts";
import { countPad, armSwap, armSwapInstant } from "../kit/controls";
import { padSetting, padSceneApi } from "../kit/padSetting";
import { toyCart, winch } from "../kit/props";

const TY = 512, X0 = 330, LANE = TY - 8;
const LEFT_N = 10, CART_HALF = 54, WLX = 92, WRX = 1300;

export const tugScene = {
  id: "tug",
  runLabel: "Pull!",
  resetLabel: "Reset cart",
  sam: {
    start: "Tap + to make the right winch pull harder than the left one.",
    pumping: "The right side pulls {v} more! Change it, or drag the purple flag to predict where the cart stops.",
    needFlag: "Drag the purple flag to where you think the cart will stop.",
    needSetting: "Set the force difference first — tap +!",
    ready: "Great prediction! Tap “Pull!”",
    readyNoFlag: "Ready when you are — tap “Pull!”",
    running: "Both winches are pulling…",
    full: "That’s the biggest difference — {max}.",
    empty: "0 N difference — both sides pull the same.",
    repeat: "You already tried {v}. Try a different force difference to find a pattern!",
    next: "Tap Reset cart, then choose a different force difference.",
    locked: "Mission Control set this test to {v} — just place your flag!",
    fairTest: "Think about what you changed on the winches each time.",
    twistPredict: "The cart is carrying heavy cargo now. With {v} more on the right, where will it stop? Move your flag!",
    twistRun2: "Now pick any force difference and try the heavy cart once more.",
    explain: "Use your chart! Tell one force difference and how far the cart rolled.",
    pastFlag: "The cart rolled {v} past your flag.",
    beforeFlag: "The cart stopped {v} before your flag.",
    compareR1: "In Round 1, the empty cart rolled {v}!",
  },
  create,
};

function create(stage, cfg, api) {
  const { defs, layers, anim } = stage;
  const { tween, RM } = anim;
  const MAX = cfg.outcome.max, PX = 900 / MAX;
  const S = { round: 1, x: 0, wheel: 0 };
  metalDefs(defs);
  const st = layers.static;
  ground(st, defs, TY);
  meterTrack(st, defs, { x0: X0, px: PX, TY, max: MAX, major: 2, minor: 1, fine: 0.5, unitLabel: "m" });
  el("text", { x: X0 - 12, y: TY + 56, class: "tile-caption", text: "START" }, st);

  const A = layers.actors;
  const wl = winch(A, { x: WLX, y: LANE + 4, color: "#2bb3a3" });
  const wr = winch(A, { x: WRX, y: LANE + 4, color: "#7b6cd9" });
  el("text", { x: WLX, y: TY + 40, "text-anchor": "middle", class: "tile-caption", text: "LEFT WINCH" }, st);
  el("text", { x: WRX, y: TY + 40, "text-anchor": "middle", class: "tile-caption", text: "RIGHT" }, st);
  const ropeL = el("path", { fill: "none", stroke: "#b07a3e", "stroke-width": 3.5, "stroke-linecap": "round" }, A);
  const ropeR = el("path", { fill: "none", stroke: "#b07a3e", "stroke-width": 3.5, "stroke-linecap": "round" }, A);
  const cartG = el("g", {}, A);
  const cart = toyCart(cartG, defs, { scale: 1.25 });
  // cargo (twist) lives inside the cart so it rides along
  const cargo = el("g", { opacity: 0 }, cart.inner);
  el("rect", { x: -26, y: -80, width: 52, height: 42, rx: 6, fill: "url(#slxSteel)", stroke: "#6f7890", "stroke-width": 2 }, cargo);
  el("text", { x: 0, y: -53, "text-anchor": "middle", class: "weight-label", fill: "#fff", style: "font-size:12px", text: "HEAVY" }, cargo);
  const dust = particles(A, anim, { stroke: "#d4cbef", strokeWidth: 1.2, grow: 10, alpha: 0.7, dragX: 0.1, dragY: 1, lift: 0 });
  // net-force arrow above the cart
  const arrowG = el("g", { opacity: 0 }, layers.over);
  const arrowP = el("path", { fill: "#ef5b6b", stroke: "#fff", "stroke-width": 2, "stroke-linejoin": "round" }, arrowG);
  const arrowT = el("text", { "text-anchor": "middle", class: "chip-text", fill: "#c23b4b", text: "" }, arrowG);

  const pad = countPad(A, { x: 270, y: 262, unit: "", width: 300, onStep: (d) => ctl.step(d) });
  const lock = lockBadge(A, 270 + 160, 248, 16);
  const padCap = el("text", { x: 270, y: 222, "text-anchor": "middle", class: "tile-caption", text: "RIGHT WINCH PULLS MORE BY" }, A);
  const padShow = (on) => { pad.setVisible(on); set(padCap, { opacity: on ? 1 : 0 }); };
  const arm = robotArm(A, defs, anim, { clawLength: 34, cargoY: 8 });

  const cx = () => X0 - CART_HALF + S.x * PX; // cart centre (front bumper = distance)
  const RY = LANE - 32;
  function draw(slackL = 0, slackR = 0) {
    set(cartG, { transform: `translate(${cx().toFixed(1)},${LANE})` });
    cart.wheels(S.wheel);
    const xl = cx() - CART_HALF, xr = cx() + CART_HALF;
    const midL = (WLX + 14 + xl) / 2, midR = (xr + WRX - 14) / 2;
    set(ropeL, { d: `M${WLX + 10} ${LANE - 34} Q${midL} ${RY + slackL * 30} ${xl} ${RY}` });
    set(ropeR, { d: `M${xr} ${RY} Q${midR} ${RY + slackR * 30} ${WRX - 10} ${LANE - 34}` });
  }
  function showArrow(d) {
    const len = d === 0 ? 0 : 28 + d * 14, y = LANE - 104, x = cx();
    if (d === 0) { set(arrowP, { d: "" }); set(arrowT, { x, y: y + 5, text: "Balanced: 0 N" }); arrowT.textContent = "Balanced: 0 N"; }
    else {
      set(arrowP, { d: `M${x - len / 2} ${y - 5} H${x + len / 2 - 12} V${y - 12} L${x + len / 2 + 6} ${y} L${x + len / 2 - 12} ${y + 12} V${y + 5} H${x - len / 2} Z` });
      set(arrowT, { x, y: y - 20 }); arrowT.textContent = `Unbalanced: ${d} N →`;
    }
  }
  const ctl = padSetting({
    anim, cfg, api, pad, lock,
    show: (v) => ({ text: String(v), unit: "N more" }),
    offText: "Set",
    onChange: (v) => {
      wl.set(`${LEFT_N} N`);
      wr.set(v == null ? "? N" : `${LEFT_N + v} N`);
      if (v != null) { showArrow(v); set(arrowG, { opacity: 1 }); } else set(arrowG, { opacity: 0 });
    },
  });

  async function run(dist) {
    ctl.busy = true;
    padShow(false);
    const d = ctl.value || 0;
    // both winches reel in: ropes go tight
    await tween(RM ? 0 : 500, (u) => { draw(0.6 * (1 - u), 0.6 * (1 - u)); wl.spin(-u * 90); wr.spin(u * 90); });
    if (d === 0) {
      // balanced: the cart strains but stays put
      await tween(RM ? 0 : 900, (u, raw) => { set(cartG, { transform: `translate(${(cx() + Math.sin(raw * Math.PI * 10) * 1.5).toFixed(1)},${LANE})` }); });
      draw();
    } else {
      // unbalanced: lurch toward the stronger pull, ropes let go, cart coasts
      const lurch = Math.min(dist, 0.6);
      await tween(RM ? 0 : 350, (u) => { S.x = lurch * u; S.wheel = (S.x * PX) / 11 * 57.3; draw(); showArrow(d); }, ease.inCubic);
      set(arrowG, { opacity: 0.6 });
      const x0 = S.x;
      const T = RM ? 0 : 900 + dist * 70;
      await tween(T, (u) => {
        S.x = lerp(x0, dist, u); S.wheel = (S.x * PX) / 11 * 57.3;
        draw(Math.min(1, u * 3), Math.min(1, u * 3));
        if (!RM && u < 0.85 && Math.random() < 0.25) dust.emit(cx() - 30, LANE - 2, -20, -8, 3, 0.5);
      }, ease.outCubic);
      S.x = dist; draw(1, 1);
    }
    set(arrowG, { opacity: 0 });
    ctl.busy = false;
  }
  async function reset() {
    ctl.busy = true;
    const from = S.x;
    await tween(RM ? 0 : 200, (u) => set(cartG, { opacity: 1 - u }));
    S.x = 0; S.wheel = 0; draw(0.6, 0.6);
    await tween(RM ? 0 : 260, (u) => set(cartG, { opacity: u }), ease.outCubic);
    ctl.clear();
    padShow(true);
    ctl.busy = false;
    api.onSetting(0);
    return from;
  }
  async function playTwist({ instant } = {}) {
    S.round = 2;
    if (instant) { armSwapInstant({ oldG: null, newG: cargo }); return; }
    padShow(false);
    await armSwap(arm, anim, { x: cx(), grabY: LANE - 112, oldG: null, newG: cargo });
    if (!RM) await tween(260, (u, raw) => set(cartG, { transform: `translate(${cx().toFixed(1)},${(LANE + Math.sin(raw * Math.PI) * 5).toFixed(1)})` }), ease.linear);
    draw(0.6, 0.6);
    padShow(true);
  }
  draw(0.6, 0.6);
  ctl.paint();
  return padSceneApi(ctl, {
    TY, unitPx: PX, markerTop: null, flagH: 150, pinChipY: 100, pinHead: false, landingBlockW: 96,
    trackX: (v) => X0 + v * PX,
    run, reset, playTwist,
    destroy() { dust.destroy(); },
  });
}
