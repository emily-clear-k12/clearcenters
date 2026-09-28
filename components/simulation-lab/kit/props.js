// Reusable props for the Sept 25 2026 scenes (and any future scene):
//   person(parent, opts)            a little flat-style person (feet at 0,0)
//   walker(parent, anim, opts)      a person who can walk from A to B (legs swing)
//   iconCounter(parent, anim, opts) a grid of faint slots that fill one by one
//                                   (buyers, families, crates …)
//   stopwatch(parent, opts)         dial + digital readout (seconds / minutes / an hour)
//   priceTag(parent, opts)          hanging price sign that can swing
//   crate(parent, opts)             wooden crate (optionally full of strawberries)
import { el, set, lerp, ease } from "./core";

const SKINS = ["#f2c9a0", "#d9a273", "#a8744c", "#7a4f32", "#f7d7b5"];
const SHIRTS = ["#7b6cd9", "#2bb3a3", "#f0932b", "#ef5b6b", "#5cc3e0", "#f0b429", "#8a6fe0"];

export function person(parent, { x = 0, y = 0, scale = 1, seed = 0, shirt, skin, umbrella = false } = {}) {
  const g = el("g", { transform: `translate(${x},${y}) scale(${scale})` }, parent);
  const sh = shirt || SHIRTS[seed % SHIRTS.length];
  const sk = skin || SKINS[(seed * 3 + 1) % SKINS.length];
  el("ellipse", { cx: 0, cy: 0, rx: 11, ry: 3, fill: "#2a2440", opacity: 0.14 }, g);
  const legL = el("rect", { x: -6, y: -16, width: 5, height: 16, rx: 2.5, fill: "#4a4166" }, g);
  const legR = el("rect", { x: 1, y: -16, width: 5, height: 16, rx: 2.5, fill: "#4a4166" }, g);
  el("path", { d: "M-9 -14 Q-10 -32 0 -33 Q10 -32 9 -14Z", fill: sh }, g);
  el("circle", { cx: 0, cy: -40, r: 8, fill: sk }, g);
  el("path", { d: "M-8 -42 Q-7 -50 0 -50 Q8 -50 8 -42 Q4 -46 -8 -42Z", fill: seed % 2 ? "#2a2440" : "#6b4a2e" }, g);
  let umb = null;
  if (umbrella) {
    umb = el("g", {}, g);
    el("rect", { x: 8, y: -62, width: 2, height: 36, fill: "#5b5378" }, umb);
    el("path", { d: "M-10 -60 Q9 -84 28 -60 Q23 -64 18 -60 Q14 -64 9 -60 Q4 -64 0 -60 Q-5 -64 -10 -60Z", fill: SHIRTS[(seed + 3) % SHIRTS.length] }, umb);
  }
  return { g, legL, legR, umb };
}

// A walker keeps its own x/y; walk() swings the legs while it moves.
export function walker(parent, anim, opts = {}) {
  const p = person(parent, opts);
  const st = { x: opts.x || 0, y: opts.y || 0, s: opts.scale || 1, flip: 1 };
  const place = () => set(p.g, { transform: `translate(${st.x.toFixed(1)},${st.y.toFixed(1)}) scale(${(st.s * st.flip).toFixed(3)},${st.s})` });
  place();
  return {
    g: p.g,
    get x() { return st.x; },
    place(x, y) { st.x = x; st.y = y; place(); },
    face(dir) { st.flip = dir < 0 ? -1 : 1; place(); },
    walk(x, y, ms) {
      const x0 = st.x, y0 = st.y;
      st.flip = x < x0 ? -1 : 1;
      return anim.tween(anim.RM ? 0 : ms, (u, raw) => {
        st.x = lerp(x0, x, raw); st.y = lerp(y0, y, raw) - Math.abs(Math.sin(raw * ms / 90)) * 2;
        const sw = Math.sin(raw * ms / 90) * 4;
        set(p.legL, { transform: `translate(${sw},0)` });
        set(p.legR, { transform: `translate(${-sw},0)` });
        place();
      }, ease.linear).then(() => { st.y = y; set(p.legL, { transform: "" }); set(p.legR, { transform: "" }); place(); });
    },
    fade(ms = 250) { return anim.tween(anim.RM ? 0 : ms, (u) => set(p.g, { opacity: 1 - u })).then(() => p.g.remove()); },
    remove() { p.g.remove(); },
  };
}

// Grid of faint slots (cols × rows) that fill one by one.
// draw(g, i) draws ONE icon centred at 0,0 into g.
export function iconCounter(parent, anim, { x, y, cols, rows, cell = 22, draw, title }) {
  const g = el("g", { transform: `translate(${x},${y})` }, parent);
  const W = cols * cell + 16, H = rows * cell + (title ? 34 : 16);
  el("rect", { x: 0, y: 0, width: W, height: H, rx: 14, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 1.5, filter: "url(#softShadow)" }, g);
  if (title) el("text", { x: 12, y: 21, class: "tile-caption", text: title }, g);
  const oy = title ? 26 : 8;
  const slots = [];
  for (let i = 0; i < cols * rows; i++) {
    const cx = 8 + (i % cols) * cell + cell / 2, cy = oy + Math.floor(i / cols) * cell + cell / 2;
    const ghost = el("g", { transform: `translate(${cx},${cy})`, opacity: 0.13 }, g);
    draw(ghost, i);
    const on = el("g", { transform: `translate(${cx},${cy})`, opacity: 0 }, g);
    draw(on, i);
    slots.push(on);
  }
  const numT = el("text", { x: W - 12, y: 21, "text-anchor": "end", class: "chip-text", fill: "#5b5378", text: "" }, g);
  let n = 0;
  function paint(k) {
    slots.forEach((s, i) => set(s, { opacity: i < k ? 1 : 0 }));
    if (title) numT.textContent = k ? String(k) : "";
  }
  return {
    g, W, H,
    slotXY(i) { return { x: x + 8 + (i % cols) * cell + cell / 2, y: y + oy + Math.floor(i / cols) * cell + cell / 2 }; },
    get value() { return n; },
    set(k) { n = Math.max(0, Math.min(slots.length, Math.round(k))); paint(n); },
    bump() {
      if (n >= slots.length) return;
      const s = slots[n]; n += 1; paint(n);
      if (!anim.RM) anim.tween(220, (u) => set(s, { transform: s.getAttribute("transform").replace(/ scale\([^)]*\)/, "") + ` scale(${(0.4 + 0.6 * ease.outBack(u)).toFixed(3)})` }), ease.linear);
    },
  };
}

// Dial + digital readout. set(frac 0..1, text)
export function stopwatch(parent, { x, y, r = 34, color = "#7b6cd9", label = "" } = {}) {
  const g = el("g", { transform: `translate(${x},${y})` }, parent);
  el("rect", { x: -7, y: -r - 12, width: 14, height: 8, rx: 3, fill: "#5b5378" }, g);
  el("circle", { r: r + 5, fill: "#ffffff", stroke: "#e4def6", "stroke-width": 2, filter: "url(#softShadow)" }, g);
  el("circle", { r, fill: "#faf9fe", stroke: color, "stroke-width": 3 }, g);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    el("line", { x1: Math.sin(a) * (r - 4), y1: -Math.cos(a) * (r - 4), x2: Math.sin(a) * (r - (i % 3 ? 8 : 11)), y2: -Math.cos(a) * (r - (i % 3 ? 8 : 11)), stroke: "#bdb5dc", "stroke-width": i % 3 ? 1.5 : 2.5, "stroke-linecap": "round" }, g);
  }
  const sweep = el("path", { fill: color, opacity: 0.16 }, g);
  const hand = el("line", { x1: 0, y1: 0, x2: 0, y2: -(r - 7), stroke: "#2a2440", "stroke-width": 3, "stroke-linecap": "round" }, g);
  el("circle", { r: 4, fill: "#2a2440" }, g);
  const chipR = el("rect", { y: r + 10, height: 26, rx: 13, fill: color }, g);
  const txt = el("text", { x: 0, y: r + 28, "text-anchor": "middle", class: "chip-text", fill: "#fff", text: "" }, g);
  if (label) el("text", { x: 0, y: -r - 18, "text-anchor": "middle", class: "tile-caption", text: label }, g);
  function setv(frac, text) {
    const a = Math.max(0, Math.min(0.9999, frac)) * Math.PI * 2;
    set(hand, { transform: `rotate(${(a * 180) / Math.PI})` });
    const ex = Math.sin(a) * (r - 2), ey = -Math.cos(a) * (r - 2);
    set(sweep, { d: frac > 0 ? `M0 0 L0 ${-(r - 2)} A${r - 2} ${r - 2} 0 ${a > Math.PI ? 1 : 0} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}Z` : "M0 0" });
    txt.textContent = text || "";
    const w = Math.max(50, (txt.getComputedTextLength ? txt.getComputedTextLength() : 30) + 22);
    set(chipR, { x: -w / 2, width: w, opacity: text ? 1 : 0 });
  }
  setv(0, "");
  return { g, set: setv };
}

// A hanging price sign. set(text); swing() wobbles it.
export function priceTag(parent, anim, { x, y, w = 96, color = "#f0b429" } = {}) {
  const g = el("g", { transform: `translate(${x},${y})` }, parent);
  const sw = el("g", {}, g);
  el("path", { d: `M-18 -26 L0 -40 L18 -26`, fill: "none", stroke: "#8f86b8", "stroke-width": 2 }, sw);
  el("circle", { cx: 0, cy: -40, r: 3, fill: "#8f86b8" }, sw);
  el("rect", { x: -w / 2, y: -26, width: w, height: 44, rx: 10, fill: "#fff7d6", stroke: color, "stroke-width": 3, filter: "url(#softShadow)" }, sw);
  const t = el("text", { x: 0, y: 6, "text-anchor": "middle", class: "count-num", style: "font-size:24px", fill: "#8a5a00", text: "" }, sw);
  return {
    g,
    set(text) { t.textContent = text; },
    swing() { if (anim.RM) return Promise.resolve(); return anim.tween(700, (u, raw) => set(sw, { transform: `rotate(${(Math.sin(raw * Math.PI * 4) * 8 * (1 - raw)).toFixed(2)} 0 -40)` }), ease.linear); },
  };
}

// Wooden crate, top-left at x,y. berries: draw strawberries peeking out.
export function crate(parent, { x = 0, y = 0, w = 64, h = 40, berries = false, label = "" } = {}) {
  const g = el("g", { transform: `translate(${x},${y})` }, parent);
  if (berries) for (let i = 0; i < 5; i++) {
    const bx = 8 + i * ((w - 16) / 4), by = 2 + (i % 2) * 3;
    el("path", { d: `M${bx} ${by + 9} C${bx - 7} ${by + 3} ${bx - 6} ${by - 5} ${bx} ${by - 5} C${bx + 6} ${by - 5} ${bx + 7} ${by + 3} ${bx} ${by + 9}Z`, fill: "#ef4b5f" }, g);
    el("path", { d: `M${bx - 4} ${by - 5} L${bx} ${by - 3} L${bx + 4} ${by - 5} L${bx} ${by - 8}Z`, fill: "#6cc04a" }, g);
  }
  el("rect", { x: 0, y: 4, width: w, height: h - 4, rx: 4, fill: "#e0a96d", stroke: "#b07a3e", "stroke-width": 2 }, g);
  el("path", { d: `M0 ${4 + (h - 4) / 2} H${w} M8 4 V${h} M${w - 8} 4 V${h}`, stroke: "#b07a3e", "stroke-width": 2 }, g);
  if (label) el("text", { x: w / 2, y: h / 2 + 8, "text-anchor": "middle", class: "weight-label", style: "font-size:10px", text: label }, g);
  return g;
}

// Glass lab beaker (dissolving scenes). Draw order: labBeaker() → contents →
// b.front() so the glass sits in front of what's inside.
// b.water(lineY, t, amp, fill) redraws a wavy water surface.
export function labBeaker(parent, { x, top, bot, w, defs }) {
  if (defs && !defs.querySelector("#labGlass")) {
    const lg = el("linearGradient", { id: "labGlass", x1: 0, x2: 1 }, defs);
    [[0, 0.7], [0.15, 0.15], [0.85, 0.1], [1, 0.6]].forEach(([o, a]) => el("stop", { offset: o, "stop-color": "#ffffff", "stop-opacity": a }, lg));
  }
  const water = el("path", { opacity: 0.8 }, parent);
  const L = x - w / 2, R = x + w / 2;
  return {
    water(lineY, t = 0, amp = 2, fill = "rgb(170,225,245)") {
      let d = `M${L + 2} ${bot - 4} V${lineY}`;
      for (let xx = L + 2; xx <= R - 2; xx += 10) d += ` L${xx} ${(lineY + Math.sin(xx / 18 + t * 3) * amp).toFixed(1)}`;
      d += ` V${bot - 4} Z`;
      set(water, { d, fill });
    },
    front() {
      el("path", { d: `M${L} ${top - 20} V${bot - 10} Q${L} ${bot} ${L + 10} ${bot} H${R - 10} Q${R} ${bot} ${R} ${bot - 10} V${top - 20}`, fill: "url(#labGlass)", stroke: "#bfb6e0", "stroke-width": 3 }, parent);
      for (let i = 1; i <= 3; i++) el("rect", { x: L + 6, y: bot - i * 28, width: i % 2 ? 16 : 10, height: 2, fill: "#bfb6e0" }, parent);
    },
  };
}

// Toy cart (same look as the ramp scene's cart), wheels on y = 0.
// c.wheels(deg) spins them; c.inner is where cargo can be added.
export function toyCart(parent, defs, { scale = 1, color = "#f0b429", edge = "#d98b12" } = {}) {
  if (defs && !defs.querySelector("#propCartBody")) {
    const lg = el("linearGradient", { id: "propCartBody", x1: 0, x2: 0, y1: 0, y2: 1 }, defs);
    el("stop", { offset: 0, "stop-color": "#ffd25e" }, lg);
    el("stop", { offset: 1, "stop-color": color }, lg);
  }
  const g = el("g", {}, parent);
  const inner = el("g", { transform: `scale(${scale})` }, g);
  el("ellipse", { cx: 0, cy: 1, rx: 40, ry: 5, fill: "#2a2440", opacity: 0.12 }, inner);
  el("path", { d: "M-40 -40 H40 Q44 -40 43 -34 L39 -18 Q38 -14 33 -14 H-33 Q-38 -14 -39 -18 L-43 -34 Q-44 -40 -40 -40 Z", fill: "url(#propCartBody)", stroke: edge, "stroke-width": 1.5 }, inner);
  el("rect", { x: -34, y: -35, width: 68, height: 4, rx: 2, fill: "#ffffff", opacity: 0.5 }, inner);
  el("rect", { x: -36, y: -25, width: 72, height: 5, rx: 2.5, fill: "#7b6cd9", opacity: 0.85 }, inner);
  const sps = [];
  for (const wx of [-24, 24]) {
    const w = el("g", { transform: `translate(${wx},-11)` }, inner);
    el("circle", { r: 11, fill: "#2a2440" }, w);
    el("circle", { r: 6.5, fill: "#e9e4f6" }, w);
    const sp = el("g", {}, w);
    el("rect", { x: -1.3, y: -6.5, width: 2.6, height: 13, rx: 1.3, fill: "#7b6cd9" }, sp);
    el("rect", { x: -6.5, y: -1.3, width: 13, height: 2.6, rx: 1.3, fill: "#7b6cd9" }, sp);
    el("circle", { r: 2, fill: "#2a2440" }, w);
    sps.push(sp);
  }
  return { g, inner, wheels(deg) { sps.forEach((s) => set(s, { transform: `rotate(${deg.toFixed(1)})` })); } };
}

// A little winch post with a spring-scale readout (tug-of-war scenes).
export function winch(parent, { x, y, flip = false, color = "#7b6cd9" }) {
  const g = el("g", { transform: `translate(${x},${y})` }, parent);
  el("rect", { x: -14, y: -86, width: 28, height: 86, rx: 6, fill: "#5b5378" }, g);
  el("rect", { x: -22, y: -6, width: 44, height: 10, rx: 4, fill: "#4a4166" }, g);
  const drum = el("g", { transform: "translate(0,-34)" }, g);
  el("circle", { r: 15, fill: "#b4bccb", stroke: "#8691a6", "stroke-width": 2 }, drum);
  el("rect", { x: -2, y: -15, width: 4, height: 30, fill: "#8691a6" }, drum);
  const chipR = el("rect", { x: -34, y: -122, width: 68, height: 28, rx: 14, fill: color }, g);
  const t = el("text", { x: 0, y: -102, "text-anchor": "middle", class: "chip-text", fill: "#fff", text: "" }, g);
  return {
    g,
    set(text) { t.textContent = text; set(chipR, { opacity: text ? 1 : 0 }); },
    spin(deg) { set(drum, { transform: `translate(0,-34) rotate(${deg.toFixed(1)})` }); },
  };
}
