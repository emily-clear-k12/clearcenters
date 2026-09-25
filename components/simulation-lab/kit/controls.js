// Reusable controls for scenes whose setting is a count or a dial value
// and whose outcome is read off a gauge strip.
//
//   countPad(parent, opts)        white pill: [−]  12 batteries  [+]
//   livePointer(parent, anim, o)  pointer + readout that rides a gauge strip
//                                 while the experiment runs
//   armSwap(arm, anim, o)         the Mission Control arm lifts one object out
//                                 and lowers a new one in (most twists)
import { el, set, lerp, ease } from "./core";

export function countPad(parent, { x, y, unit = "", width = 220, onStep }) {
  const g = el("g", { class: "count-bubble slx-pad", transform: `translate(${x},${y})` }, parent);
  el("rect", { x: -width / 2, y: -26, width, height: 52, rx: 26, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 1.5, filter: "url(#softShadow)" }, g);
  const minus = el("g", { class: "minus-btn pad-btn" }, g);
  el("circle", { cx: -width / 2 + 26, cy: 0, r: 19, fill: "#f1eefa", stroke: "#d8d0f0" }, minus);
  el("rect", { x: -width / 2 + 18, y: -2, width: 16, height: 4, rx: 2, fill: "#5b5378" }, minus);
  el("circle", { cx: -width / 2 + 26, cy: 0, r: 28, fill: "transparent", class: "hit" }, minus);
  const plus = el("g", { class: "minus-btn pad-btn plus" }, g);
  el("circle", { cx: width / 2 - 26, cy: 0, r: 19, fill: "#2bb3a3" }, plus);
  el("rect", { x: width / 2 - 34, y: -2, width: 16, height: 4, rx: 2, fill: "#fff" }, plus);
  el("rect", { x: width / 2 - 28, y: -8, width: 4, height: 16, rx: 2, fill: "#fff" }, plus);
  el("circle", { cx: width / 2 - 26, cy: 0, r: 28, fill: "transparent", class: "hit" }, plus);
  const num = el("text", { x: 0, y: 9, class: "count-num", "text-anchor": "middle", text: "0" }, g);
  const un = el("text", { x: 0, y: 7, class: "count-unit", text: unit }, g);
  const st = { enabled: true, min: false, max: false };
  const press = (d) => (e) => { e.preventDefault(); e.stopPropagation(); if (st.enabled && onStep) onStep(d); };
  minus.addEventListener("pointerdown", press(-1));
  plus.addEventListener("pointerdown", press(1));
  function paint() {
    minus.style.opacity = st.enabled && !st.min ? 1 : 0.35;
    plus.style.opacity = st.enabled && !st.max ? 1 : 0.35;
  }
  return {
    g,
    set(value, { atMin = false, atMax = false, unitText } = {}) {
      num.textContent = String(value);
      if (unitText != null) un.textContent = unitText;
      const w = num.getComputedTextLength ? num.getComputedTextLength() : 20;
      const uw = un.getComputedTextLength ? un.getComputedTextLength() : 60;
      const total = w + 6 + uw;
      set(num, { x: -total / 2 + w / 2 });
      set(un, { x: -total / 2 + w + 6 });
      st.min = atMin; st.max = atMax;
      paint();
    },
    setEnabled(on) { st.enabled = on; g.style.pointerEvents = on ? "" : "none"; paint(); },
    setVisible(on) { g.style.opacity = on ? 1 : 0; g.style.pointerEvents = on && st.enabled ? "" : "none"; },
  };
}

// A pointer that slides along a gauge strip (trackX) with a live readout.
export function livePointer(parent, anim, { trackX, TY, color = "#7b6cd9", fmt = (v) => String(v) }) {
  const g = el("g", { class: "live-pointer", opacity: 0 }, parent);
  el("rect", { x: -2, y: TY - 30, width: 4, height: 74, rx: 2, fill: color, opacity: 0.85 }, g);
  el("path", { d: `M-10 ${TY - 34} L10 ${TY - 34} L0 ${TY - 20} Z`, fill: color, stroke: "#fff", "stroke-width": 2, "stroke-linejoin": "round" }, g);
  const chipG = el("g", {}, g);
  const r = el("rect", { y: TY - 72, height: 30, rx: 15, fill: "#ffffff", stroke: color, "stroke-width": 2 }, chipG);
  const t = el("text", { x: 0, y: TY - 51.5, "text-anchor": "middle", class: "chip-text", fill: color, text: "" }, chipG);
  let cur = 0;
  function put(v) {
    cur = v;
    set(g, { transform: `translate(${trackX(v).toFixed(1)},0)` });
    t.textContent = fmt(v);
    const w = Math.max(44, (t.getComputedTextLength ? t.getComputedTextLength() : 30) + 22);
    set(r, { x: -w / 2, width: w });
  }
  return {
    get value() { return cur; },
    set: put,
    show() { set(g, { opacity: 1 }); },
    hide(ms = 250) { return anim.tween(anim.RM ? 0 : ms, (u) => set(g, { opacity: 1 - u })); },
    to(v, ms, easing = ease.outCubic, onStep) {
      const from = cur;
      return anim.tween(anim.RM ? 0 : ms, (u) => { put(lerp(from, v, u)); if (onStep) onStep(cur, u); }, easing).then(() => put(v));
    },
  };
}

// The arm comes down, lifts `oldG` out, then lowers `newG` into its place.
// Both groups should be wrappers with no transform of their own. `grabY` is
// the head height when gripping; the objects move with the head.
export async function armSwap(arm, anim, { x, grabY, oldG, newG, topY = -140, onSwap }) {
  const hold = (grp, y) => set(grp, { transform: `translate(0,${(y - grabY).toFixed(1)})` });
  arm.show(x);
  arm.open();
  if (newG) { set(newG, { opacity: 0 }); hold(newG, topY); }
  await arm.move(topY, grabY, 900, ease.outCubic);
  arm.close();
  await anim.wait(anim.RM ? 0 : 160);
  if (oldG) await anim.tween(anim.RM ? 0 : 750, (u) => { const y = lerp(grabY, topY, u); arm.draw(y); hold(oldG, y); }, ease.inOutCubic);
  if (oldG) set(oldG, { opacity: 0 });
  if (onSwap) onSwap();
  if (newG) {
    set(newG, { opacity: 1 });
    await anim.tween(anim.RM ? 0 : 850, (u) => { const y = lerp(topY, grabY, u); arm.draw(y); hold(newG, y); }, ease.outCubic);
    hold(newG, grabY);
    set(newG, { transform: "" });
  }
  arm.open();
  await anim.wait(anim.RM ? 0 : 140);
  await arm.move(grabY, topY, 650, ease.inOutCubic);
  arm.hide();
  arm.close();
  if (oldG) set(oldG, { transform: "" });
}

// Instant version for resume: just show the Round 2 object.
export function armSwapInstant({ oldG, newG }) {
  if (oldG) set(oldG, { opacity: 0, transform: "" });
  if (newG) set(newG, { opacity: 1, transform: "" });
}
