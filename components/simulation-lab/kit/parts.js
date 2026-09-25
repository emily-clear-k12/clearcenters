// Reusable scene parts. Each part draws itself into an SVG group and returns
// a small handle. Scenes compose these and only draw what is unique to them
// (a balloon + pump, a ramp + cart, a plant pot, a market stand...).
//
//   ground(parent, defs, TY)            soft glow + perspective lab floor slab
//   meterTrack(parent, defs, opts)      a ruler in real units (meters, cm...)
//   floorTiles(parent, anim, opts)      numbered tiles with count-up highlight
//                                       and a `surface` layer (carpet, ice...)
//   robotArm(parent, defs, anim, opts)  the Mission Control arm used by twists
//   particles(parent, anim, opts)       puffs / dust / sparkles
//   chip(parent, x, y, text, fill, color, cls)  rounded label pill
//   confetti(parent, anim, x, y)        celebration burst
//   lockBadge(parent, cx, cy, r)        small padlock (setting locked)
import { el, set, addDefs } from "./core";

export function ground(parent, defs, TY) {
  addDefs(defs, "slxFloorGlow", `
    <radialGradient id="slxFloorGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".85"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="slxPlatGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".92"/><stop offset=".55" stop-color="#f6f3fd" stop-opacity=".7"/><stop offset="1" stop-color="#efeafb" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="slxPlatEdge" x1="0" x2="1">
      <stop offset="0" stop-color="#2bb3a3" stop-opacity="0"/><stop offset=".15" stop-color="#2bb3a3" stop-opacity=".55"/><stop offset=".85" stop-color="#7b6cd9" stop-opacity=".55"/><stop offset="1" stop-color="#7b6cd9" stop-opacity="0"/>
    </linearGradient>`);
  el("ellipse", { cx: 700, cy: 540, rx: 760, ry: 120, fill: "url(#slxFloorGlow)" }, parent);
  const top = TY - 44;
  el("path", { d: `M60 ${top} H1306 Q1346 ${top} 1356 ${top + 30} L1366 704 H0 L10 ${top + 30} Q20 ${top} 60 ${top} Z`, fill: "url(#slxPlatGrad)" }, parent);
  el("path", { d: `M40 ${top + 1} H1326`, stroke: "url(#slxPlatEdge)", "stroke-width": 3, "stroke-linecap": "round" }, parent);
  el("path", { d: `M40 ${top + 5} H1326`, stroke: "#ffffff", "stroke-width": 2, opacity: 0.9 }, parent);
}

// A measuring track laid on the floor: labelled ticks every `major` units
// (default 1), minor ticks every `minor`, fine ticks every `fine` (0 = none).
// x = x0 + value * px. The last label carries the unit ("10 m", "70 g").
export function meterTrack(parent, defs, { x0, px, TY, max, major = 1, minor = 0.5, fine = 0.1, unitLabel = "m" }) {
  addDefs(defs, "slxRulerFace", `
    <linearGradient id="slxRulerFace" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f1eefa"/>
    </linearGradient>`);
  const g = el("g", { class: "ruler" }, parent);
  const RL = x0 - 26, RR = x0 + max * px + 26;
  el("rect", { x: RL, y: TY + 6, width: RR - RL, height: 44, rx: 14, fill: "#2a2440", opacity: 0.08 }, g);
  el("rect", { x: RL, y: TY, width: RR - RL, height: 44, rx: 14, fill: "url(#slxRulerFace)", stroke: "#d8d0f0", "stroke-width": 1.5 }, g);
  el("rect", { x: RL + 10, y: TY + 40, width: RR - RL - 20, height: 3, rx: 1.5, fill: "#2bb3a3", opacity: 0.45 }, g);
  const near = (a, b) => Math.abs(a / b - Math.round(a / b)) < 1e-6;
  const steps = Math.round(max / minor);
  for (let i = 0; i <= steps; i++) {
    const m = i * minor, x = x0 + m * px, isMajor = near(m, major);
    el("rect", { x: x - (isMajor ? 1.5 : 1), y: TY, width: isMajor ? 3 : 2, height: isMajor ? 15 : 8, rx: 1, fill: isMajor ? "#5b5378" : "#aaa2c8" }, g);
    if (isMajor) {
      const n = Math.round(m * 100) / 100;
      el("text", { x, y: TY + 34, class: "ruler-num", "text-anchor": "middle", text: Math.abs(n - max) < 1e-6 ? `${max} ${unitLabel}` : String(n) }, g);
    }
  }
  if (fine) {
    const n = Math.round(max / fine);
    for (let i = 0; i < n; i++) {
      const m = i * fine;
      if (near(m, minor)) continue;
      el("rect", { x: x0 + m * px - 0.5, y: TY, width: 1, height: 5, fill: "#cfc8e6" }, g);
    }
  }
  return g;
}

// Numbered floor tiles (1..count) starting at x0. `surface` is an empty layer
// ABOVE the tiles but BELOW the count highlight, for twist coverings such as
// carpet. countUp(dist, color) lights tiles one by one; clear() resets.
export function floorTiles(parent, anim, { x0, px, TY, count, padLeft = 30, caption = "floor tiles" }) {
  el("rect", { x: padLeft, y: TY + 6, width: x0 + count * px + 26 - padLeft, height: 44, rx: 14, fill: "#2a2440", opacity: 0.08 }, parent);
  el("rect", { x: padLeft, y: TY, width: x0 - padLeft + 14, height: 44, rx: 14, fill: "#e9e4f6", stroke: "#d8d0f0", "stroke-width": 1.5 }, parent);
  for (let i = 0; i < count; i++) {
    const x = x0 + i * px;
    el("rect", { x: x + 1, y: TY, width: px - 2, height: 44, rx: i === count - 1 ? 12 : 4, fill: i % 2 ? "#f3f0fb" : "#ffffff", stroke: "#d8d0f0", "stroke-width": 1.2 }, parent);
    el("text", { x: x + px / 2, y: TY + 29, class: "ruler-num tile-num", "text-anchor": "middle", text: String(i + 1) }, parent);
  }
  const surface = el("g", { class: "tile-surface" }, parent);
  const countG = el("g", {}, parent);
  const tiles = [];
  for (let i = 0; i < count; i++) {
    const x = x0 + i * px;
    const g = el("g", { opacity: 0 }, countG);
    const r = el("rect", { x: x + 1, y: TY, width: px - 2, height: 44, rx: i === count - 1 ? 12 : 4 }, g);
    el("text", { x: x + px / 2, y: TY + 29, class: "ruler-num tile-num count", "text-anchor": "middle", text: String(i + 1) }, g);
    tiles.push({ g, r });
  }
  el("rect", { x: x0 - 1.5, y: TY, width: 3, height: 44, fill: "#2bb3a3" }, parent);
  if (caption) el("text", { x: x0 + count * px, y: TY + 70, class: "tile-caption", "text-anchor": "end", text: caption }, parent);

  let countGen = 0;
  return {
    surface,
    tileX: (i) => x0 + i * px,
    async countUp(dist, color) {
      const gen = ++countGen;
      for (let i = 0; i < Math.min(count, Math.floor(dist)); i++) {
        if (gen !== countGen) return;
        const t = tiles[i];
        set(t.r, { fill: color, "fill-opacity": 0.22, stroke: color, "stroke-width": 1.5 });
        t.g.style.transition = anim.RM ? "" : "opacity .18s";
        t.g.setAttribute("opacity", 1);
        if (!anim.RM) await anim.wait(70);
      }
    },
    clear() {
      countGen++;
      tiles.forEach((t) => t.g.setAttribute("opacity", 0));
    },
  };
}

// Mission Control's robot arm. Draw the payload into `arm.cargo`.
//   arm.show(x) / arm.hide()   place at x (rod hangs from above the stage)
//   arm.draw(y)                head at y
//   arm.move(fromY, toY, ms, easing) -> Promise
//   arm.open() / arm.close()   claws
// Shared metal gradients: url(#slxChrome) (polished rod) and url(#slxSteel).
export function metalDefs(defs) {
  addDefs(defs, "slxChrome", `
    <linearGradient id="slxChrome" x1="0" x2="1">
      <stop offset="0" stop-color="#b9b4cf"/><stop offset=".4" stop-color="#f4f2fb"/><stop offset="1" stop-color="#a39dbd"/>
    </linearGradient>
    <linearGradient id="slxSteel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b4bccb"/><stop offset=".5" stop-color="#8691a6"/><stop offset="1" stop-color="#5f6a80"/>
    </linearGradient>`);
}

export function robotArm(parent, defs, anim, { clawLength = 26, cargoY = 8 } = {}) {
  metalDefs(defs);
  const g = el("g", { opacity: 0 }, parent);
  const rod = el("rect", { x: -7, y: -40, width: 14, rx: 4, fill: "url(#slxChrome)", stroke: "#a39dbd" }, g);
  const head = el("g", {}, g);
  el("rect", { x: -26, y: -18, width: 52, height: 22, rx: 8, fill: "#7b6cd9" }, head);
  el("circle", { cx: 0, cy: -7, r: 4, fill: "#9ff1e6" }, head);
  const long = clawLength > 26;
  const clawL = el("path", { d: long ? "M-18 4 q-12 16 2 30" : "M-18 4 q-10 14 2 26", fill: "none", stroke: "#5b5378", "stroke-width": 6, "stroke-linecap": "round" }, head);
  const clawR = el("path", { d: long ? "M18 4 q12 16 -2 30" : "M18 4 q10 14 -2 26", fill: "none", stroke: "#5b5378", "stroke-width": 6, "stroke-linecap": "round" }, head);
  const cargo = el("g", { transform: `translate(0,${cargoY})` }, head);
  const api = {
    g, head, cargo,
    show(x) { set(g, { opacity: 1, transform: `translate(${x},0)` }); },
    hide() { set(g, { opacity: 0 }); },
    draw(y) {
      set(rod, { height: Math.max(0, y + 40 - 14) });
      set(head, { transform: `translate(0,${y})` });
    },
    move(fromY, toY, ms, easing) {
      return anim.tween(anim.RM ? 0 : ms, (u) => api.draw(fromY + (toY - fromY) * u), easing);
    },
    open() { set(clawL, { transform: "rotate(18 -18 4)" }); set(clawR, { transform: "rotate(-18 18 4)" }); },
    close() { set(clawL, { transform: "" }); set(clawR, { transform: "" }); },
  };
  return api;
}

// Lightweight particle system on the stage ticker.
// opts: { fill, stroke, strokeWidth, grow, alpha, dragX, dragY, lift }
export function particles(parent, anim, opts = {}) {
  const o = { fill: "#ffffff", stroke: "#cfc6ee", strokeWidth: 1.5, grow: 14, alpha: 0.85, dragX: 0.08, dragY: 0.2, lift: 6, ...opts };
  const list = [];
  function tick(dt) {
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      p.life += dt;
      const u = p.life / p.max;
      if (u >= 1) { p.c.remove(); list.splice(i, 1); continue; }
      p.vx *= Math.pow(o.dragX, dt);
      p.vy *= Math.pow(o.dragY, dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt - o.lift * dt;
      set(p.c, { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: (p.r0 + u * o.grow).toFixed(1), opacity: (o.alpha * (1 - u)).toFixed(2) });
    }
  }
  anim.tickers.add(tick);
  return {
    emit(x, y, vx, vy, r0 = 3, max = 0.6) {
      const c = el("circle", { cx: x, cy: y, r: r0, fill: o.fill, stroke: o.stroke, "stroke-width": o.strokeWidth }, parent);
      list.push({ c, x, y, vx, vy, r0, life: 0, max });
    },
    destroy() { anim.tickers.delete(tick); },
  };
}

export function chip(parent, x, y, text, fill, color, cls) {
  const g = el("g", { class: cls || "" }, parent);
  const t = el("text", { x, y: y + 6, "text-anchor": "middle", class: "chip-text", fill: color, text }, g);
  const w = Math.max(40, t.getComputedTextLength() + 24);
  const r = el("rect", { x: x - w / 2, y: y - 15, width: w, height: 30, rx: 15, fill, filter: "url(#softShadow)" }, g);
  g.insertBefore(r, t);
  g._w = w;
  return g;
}

export function confetti(parent, anim, x, y, count = 18) {
  if (anim.RM) return;
  const g = el("g", {}, parent);
  const cols = ["#2bb3a3", "#f0932b", "#7b6cd9", "#ff7a95"];
  const ps = [];
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2, s = 120 + Math.random() * 160;
    ps.push({ c: el("rect", { width: 8, height: 5, rx: 2, fill: cols[i % 4] }, g), vx: Math.cos(a) * s, vy: Math.sin(a) * s - 120, x, y, r: Math.random() * 360 });
  }
  anim.tween(1100, (e, u, dt) => {
    ps.forEach((p) => {
      p.vy += 500 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += 400 * dt;
      set(p.c, { transform: `translate(${p.x},${p.y}) rotate(${p.r})`, opacity: 1 - u });
    });
  }, (t) => t).then(() => g.remove());
}

export function lockBadge(parent, cx, cy, r = 16) {
  const g = el("g", { opacity: 0 }, parent);
  const k = r / 16;
  el("circle", { cx, cy, r, fill: "#5b5378", stroke: "#fff", "stroke-width": 3 * k }, g);
  el("rect", { x: cx - 7 * k, y: cy - 1 * k, width: 14 * k, height: 10 * k, rx: 2 * k, fill: "#fff" }, g);
  el("path", { d: `M${cx - 4 * k} ${cy - 1 * k} v${-3 * k} a${4 * k} ${4 * k} 0 0 1 ${8 * k} 0 v${3 * k}`, fill: "none", stroke: "#fff", "stroke-width": 2.2 * k }, g);
  return g;
}
