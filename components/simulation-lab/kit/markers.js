// Shared measuring UI that sits on top of any scene's track:
//   createFlag     the draggable purple prediction flag
//   createMarkers  landing pin + value chip, then faded "ghost" markers for
//                  earlier runs with a non-overlapping label row
//   createGap      the bracket between the flag and where the run landed
// All three only need the scene's geometry (`geom`): { TY, trackX(v),
// unitPx, flagH, pinChipY, pinHead, markerTop, landingBlockW }.
import { el, set, lerp, clamp, ease, svgPoint } from "./core";
import { chip } from "./parts";
import { ROUND_COLORS, ROUND_COLORS_DARK } from "./chart";

/* ---------------- prediction flag ---------------- */
export function createFlag({ svg, layer, geom, outcome: O, anim, unitTxt, onGrab, onPlaced }) {
  const TY = geom.TY, FH = geom.flagH || 120;
  const flag = el("g", { class: "flag" }, layer);
  el("ellipse", { cx: 0, cy: 2, rx: 12, ry: 4, fill: "#2a2440", opacity: 0.15 }, flag);
  el("rect", { x: -2.5, y: -FH, width: 5, height: FH + 2, rx: 2.5, fill: "#4a3f8f" }, flag);
  el("circle", { cx: 0, cy: -FH - 2, r: 5, fill: "#4a3f8f" }, flag);
  const pennant = el("g", {}, flag);
  const pennPath = el("path", { fill: "#7b6cd9" }, pennant);
  const pennText = el("text", { class: "flag-text", "text-anchor": "middle", text: "?" }, pennant);
  el("rect", { x: -1.5, y: 44, width: 3, height: 12, fill: "#7b6cd9" }, flag);
  const knob = el("g", { transform: "translate(0,80)" }, flag);
  el("circle", { r: 36, class: "flag-pulse" }, knob);
  el("circle", { r: 26, fill: "#fff", stroke: "#7b6cd9", "stroke-width": 5, filter: "url(#softShadow)" }, knob);
  el("path", { d: "M-5 -7 L-12 0 L-5 7 M5 -7 L12 0 L5 7", fill: "none", stroke: "#7b6cd9", "stroke-width": 3.5, "stroke-linecap": "round", "stroke-linejoin": "round" }, knob);
  const hint = el("g", { class: "drag-hint", transform: "translate(44,80)" }, flag);
  el("path", { d: "M0 -8 L8 0 L0 8", fill: "none", stroke: "#7b6cd9", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, hint);
  el("path", { d: "M14 -8 L22 0 L14 8", fill: "none", stroke: "#7b6cd9", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.5 }, hint);
  const flagHit = el("rect", { x: -44, y: -120, width: 124, height: 236, fill: "transparent", class: "hit" }, flag);
  const rulerHit = el("rect", { x: geom.trackX(0) - 20, y: TY - 4, width: geom.trackX(O.max) - geom.trackX(0) + 40, height: 52, fill: "transparent", class: "hit" }, layer);
  layer.insertBefore(rulerHit, flag);

  const st = { value: 0, placed: false, x: geom.trackX(0), target: geom.trackX(0), dragging: false };
  function pennantShape(t) {
    const flip = st.x > geom.trackX(O.max) - 70 ? -1 : 1;
    const w = 84, y0 = -FH, hgt = 36, a = Math.sin(t * 3) * 3;
    set(pennPath, { d: `M0 ${y0} C${flip * w * 0.35} ${y0 - 6 + a} ${flip * w * 0.65} ${y0 + 6 - a} ${flip * w} ${y0 + a * 0.5} L${flip * w} ${y0 + hgt + a * 0.5} C${flip * w * 0.65} ${y0 + hgt + 6 - a} ${flip * w * 0.35} ${y0 + hgt - 6 + a} 0 ${y0 + hgt} Z` });
    set(pennText, { x: (flip * w) / 2, y: y0 + hgt / 2 + 6 });
  }
  const tick = (dt, now) => {
    st.x += (st.target - st.x) * Math.min(1, dt * (st.dragging ? 30 : 10));
    set(flag, { transform: `translate(${st.x.toFixed(1)},${TY})` });
    pennantShape(anim.RM ? 0 : now / 1000);
  };
  anim.tickers.add(tick);

  function setFlag(v, placed) {
    st.value = v;
    st.placed = placed;
    st.target = geom.trackX(v);
    pennText.textContent = placed ? unitTxt(v) : "?";
    flag.classList.toggle("placed", placed);
  }
  function fromPointer(e) {
    const p = svgPoint(svg, e.clientX, e.clientY);
    const raw = (p.x - geom.trackX(0)) / geom.unitPx;
    return clamp(Math.round(raw / O.snap) * O.snap, O.snap, O.max);
  }
  async function down(e) {
    e.preventDefault();
    const src = e.currentTarget, tgt = e.target;
    const ok = await onGrab();
    if (!ok) return;
    try { tgt.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
    st.dragging = true;
    flag.classList.add("dragging");
    const was = st.placed;
    if (src === rulerHit) setFlag(fromPointer(e), true);
    if (!was && st.placed) onPlaced();
    const move = (ev) => {
      if (!st.dragging) return;
      const w2 = st.placed;
      setFlag(fromPointer(ev), true);
      if (!w2) onPlaced();
    };
    const up = () => {
      st.dragging = false;
      flag.classList.remove("dragging");
      tgt.removeEventListener("pointermove", move);
      tgt.removeEventListener("pointerup", up);
      tgt.removeEventListener("pointercancel", up);
      if (st.placed) onPlaced();
    };
    tgt.addEventListener("pointermove", move);
    tgt.addEventListener("pointerup", up);
    tgt.addEventListener("pointercancel", up);
  }
  flagHit.addEventListener("pointerdown", down);
  rulerHit.addEventListener("pointerdown", down);

  return {
    el: flag,
    get value() { return st.value; },
    get placed() { return st.placed; },
    set: setFlag,
    setAttention(on) { flag.classList.toggle("attention", !!on); },
    setVisible(on) {
      flag.style.opacity = on ? 1 : 0;
      flag.style.pointerEvents = on ? "" : "none";
      rulerHit.style.pointerEvents = on ? "" : "none";
    },
    destroy() { anim.tickers.delete(tick); },
  };
}

/* ---------------- landing pin + ghosts ---------------- */
export function createMarkers({ over, under, geom, anim, ghostLabel, unitTxt, maxValue }) {
  const TY = geom.TY;
  const LBL_Y = TY - 46, LBL_H = 30, LBL_GAP = 8;
  const st = { landing: null, ghosts: [] };

  function showLanding(run) {
    const x = geom.trackX(run.dist), col = ROUND_COLORS[run.round];
    const g = el("g", { class: "landing" + (anim.RM ? " fade-in" : " drop-in") }, over);
    if (geom.markerTop) el("line", { x1: x, x2: x, y1: geom.markerTop, y2: TY - 32, stroke: col, "stroke-width": 2.5, "stroke-dasharray": "4 6", "stroke-linecap": "round", class: "drop-line" }, g);
    el("path", { d: `M${x - 8} ${TY - 12} L${x} ${TY + 2} L${x + 8} ${TY - 12} Z`, fill: col, stroke: "#fff", "stroke-width": 2, "stroke-linejoin": "round" }, g);
    if (geom.pinHead !== false) el("circle", { cx: x, cy: TY - 20, r: 11, fill: col, stroke: "#fff", "stroke-width": 3 }, g);
    else el("rect", { x: x - 2, y: TY, width: 4, height: 44, rx: 2, fill: col }, g);
    const c = chip(g, x, TY - (geom.pinChipY || 54), unitTxt(run.dist), col, "#fff", "val-chip");
    st.landing = { g, run, x, chipW: c._w };
    layout(true);
  }

  // Ghost labels share one band just above the track. A 1-D solver spreads
  // them sideways so no two overlap and none sits under the fresh landing
  // chip (or a parked object, via geom.landingBlockW); a leader line ties a
  // nudged label back to its pin.
  function landingObstacle() {
    const L = st.landing;
    if (!L) return null;
    const chipY = TY - (geom.pinChipY || 54);
    const bandHit = Math.abs(chipY - LBL_Y) < LBL_H;
    const w = Math.max(bandHit ? L.chipW : 0, geom.landingBlockW || 0);
    return w ? { pos: L.x, w, fixed: true } : null;
  }
  function solve() {
    const lo = Math.max(12, geom.trackX(0) - 40), hi = Math.min(1354, geom.trackX(maxValue) + 40);
    const items = st.ghosts.map((o) => ({ o, pos: o.x, w: o.w, fixed: false }));
    const ob = landingObstacle();
    if (ob) items.push(ob);
    for (let it = 0; it < 400; it++) {
      items.sort((a, b) => a.pos - b.pos || (a.fixed ? -1 : 1));
      let moved = false;
      for (let i = 0; i < items.length - 1; i++) {
        const a = items[i], b = items[i + 1];
        const need = (a.w + b.w) / 2 + LBL_GAP, ov = need - (b.pos - a.pos);
        if (ov <= 0.01) continue;
        moved = true;
        if (a.fixed) b.pos += ov;
        else if (b.fixed) a.pos -= ov;
        else { a.pos -= ov / 2; b.pos += ov / 2; }
      }
      items.forEach((m) => { if (!m.fixed) m.pos = clamp(m.pos, lo + m.w / 2, hi - m.w / 2); });
      if (!moved) break;
    }
    return items.filter((m) => m.o);
  }
  function place(o, pos) {
    o.pos = pos;
    set(o.lab, { transform: `translate(${(pos - o.x).toFixed(1)},0)` });
    const off = Math.abs(pos - o.x) > 3;
    set(o.lead, { x1: o.x, y1: TY - 21, x2: pos, y2: LBL_Y + LBL_H / 2 - 1, opacity: off ? 0.75 : 0 });
  }
  function layout(animate) {
    const res = solve();
    const from = res.map((m) => (m.o.pos == null ? m.o.x : m.o.pos));
    if (!animate || anim.RM) { res.forEach((m) => place(m.o, m.pos)); return; }
    anim.tween(300, (u) => res.forEach((m, i) => place(m.o, lerp(from[i], m.pos, u))), ease.outCubic);
  }
  function addGhost(run, animate) {
    const x = geom.trackX(run.dist);
    const g = el("g", { class: "ghost r" + run.round }, under);
    under.insertBefore(g, under.firstChild);
    const lead = el("line", { stroke: ROUND_COLORS[run.round], "stroke-width": 2, "stroke-linecap": "round", opacity: 0 }, g);
    el("path", { d: `M${x - 6} ${TY - 9} L${x} ${TY + 1} L${x + 6} ${TY - 9} Z`, fill: ROUND_COLORS[run.round] }, g);
    el("circle", { cx: x, cy: TY - 15, r: 7, fill: ROUND_COLORS[run.round], stroke: "#fff", "stroke-width": 2 }, g);
    const lab = el("g", {}, g);
    const c = chip(lab, x, LBL_Y, ghostLabel(run.setting), "#ffffff", ROUND_COLORS_DARK[run.round], "ghost-chip");
    const o = { x, w: c._w, el: g, lab, lead, pos: null };
    st.ghosts.push(o);
    place(o, x);
    layout(animate);
  }
  function ghostify() {
    const L = st.landing;
    if (!L) return;
    L.g.remove();
    st.landing = null;
    addGhost(L.run, true);
  }
  return { showLanding, ghostify, addGhost, get landing() { return st.landing; } };
}

/* ---------------- gap bracket ---------------- */
export function createGap({ over, under, geom, anim, unitTxt, onBullseye }) {
  const TY = geom.TY, FH = geom.flagH || 120;
  const band = el("rect", { y: TY + 1, height: 42, rx: 4, fill: "#7b6cd9", opacity: 0 }, under);
  let g = null;
  async function show(pred, dist) {
    const fx = geom.trackX(pred), lx = geom.trackX(dist), y = TY - FH - 22;
    g = el("g", { class: "gap" }, over);
    const diff = Math.round((dist - pred) * 10) / 10;
    if (Math.abs(diff) < 0.01) {
      chip(g, lx, y - 12, "★ Bullseye! Right on your flag", "#2bb3a3", "#fff", "gap-chip pop-in");
      if (onBullseye) onBullseye(lx, TY - 60);
      return diff;
    }
    set(band, { x: Math.min(fx, lx), width: Math.abs(lx - fx), opacity: 0 });
    const line = el("line", { x1: fx, x2: fx, y1: y, y2: y, stroke: "#7b6cd9", "stroke-width": 3, "stroke-linecap": "round" }, g);
    el("line", { x1: fx, x2: fx, y1: y - 8, y2: y + 8, stroke: "#7b6cd9", "stroke-width": 3, "stroke-linecap": "round" }, g);
    const endTick = el("line", { x1: lx, x2: lx, y1: y - 8, y2: y + 8, stroke: "#7b6cd9", "stroke-width": 3, "stroke-linecap": "round", opacity: 0 }, g);
    el("line", { x1: fx, x2: fx, y1: y + 8, y2: TY - FH - 4, stroke: "#7b6cd9", "stroke-width": 1.5, "stroke-dasharray": "3 4", opacity: 0.6 }, g);
    el("line", { x1: lx, x2: lx, y1: y + 8, y2: TY - (geom.pinChipY || 54) - 18, stroke: "#7b6cd9", "stroke-width": 1.5, "stroke-dasharray": "3 4", opacity: 0.6 }, g);
    const gg = g;
    await anim.tween(anim.RM ? 0 : 420, (u) => { set(line, { x2: lerp(fx, lx, u) }); set(band, { opacity: 0.16 * u }); }, ease.outCubic);
    set(endTick, { opacity: 1 });
    // Scenes whose track is a gauge (grams, RPM...) say "too low / too high".
    const words = geom.gapWords || { under: "short", over: "too far" };
    const txt = diff > 0 ? `Your flag was ${unitTxt(diff)} ${words.under}` : `Your flag was ${unitTxt(-diff)} ${words.over}`;
    const cx = (fx + lx) / 2;
    const c = chip(gg, cx, y - 26, txt, "#ffffff", "#5a4bb8", "gap-chip pop-in");
    const half = c._w / 2;
    const nx = clamp(cx, 20 + half, 1346 - half);
    if (nx !== cx) c.setAttribute("transform", `translate(${nx - cx},0)`);
    return diff;
  }
  function clear() {
    if (g) { g.remove(); g = null; }
    set(band, { opacity: 0 });
  }
  return { show, clear };
}
