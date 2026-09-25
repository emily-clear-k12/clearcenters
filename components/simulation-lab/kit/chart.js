// Live "Your data" chart. Draws only the SVG plot; the card, title and legend
// are React (SimLabStudio). x axis = the tested variable, y = the outcome.
//   const chart = createChart(hostDiv, { variable, outcome }, anim)
//   chart.add(x, y, round)   drop a dot (pops in unless reduced motion)
//   chart.showLines()        connect each round's dots (after the twist)
import { el } from "./core";

export const ROUND_COLORS = { 1: "#2bb3a3", 2: "#f0932b" };
export const ROUND_COLORS_DARK = { 1: "#1d8c80", 2: "#cf7414" };

export function createChart(host, { variable: V, outcome: O }, anim) {
  const W = 360, H = 188, m = { l: 44, r: 12, t: 10, b: 40 };
  const xmin = V.min - V.step, xmax = V.max + V.step * 0.6;
  const xs = (v) => m.l + ((v - xmin) / (xmax - xmin)) * (W - m.l - m.r);
  const ys = (v) => H - m.b - (v / O.max) * (H - m.t - m.b);
  host.innerHTML = "";
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, class: "chart-svg" }, host);
  const grid = el("g", {}, svg);
  // a "nice" gridline step giving at most ~7 lines (10 → 2, 70 → 10, 900 → 200)
  const yStep = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500].find((s) => O.max / s <= 7) || Math.ceil(O.max / 7);
  for (let y = 0; y <= O.max; y += yStep) {
    el("line", { x1: m.l, x2: W - m.r, y1: ys(y), y2: ys(y), stroke: y === 0 ? "#bdb5dc" : "#ebe7f6", "stroke-width": y === 0 ? 2 : 1 }, grid);
    el("text", { x: m.l - 8, y: ys(y) + 4.5, "text-anchor": "end", class: "axis", text: String(y) }, grid);
  }
  for (let x = V.min; x <= V.max + 1e-9; x += V.step) {
    el("line", { x1: xs(x), x2: xs(x), y1: ys(0), y2: ys(0) + 5, stroke: "#bdb5dc", "stroke-width": 1.5 }, grid);
    el("text", { x: xs(x), y: ys(0) + 19, "text-anchor": "middle", class: "axis", text: `${x}${V.tickSuffix || ""}` }, grid);
  }
  el("text", { x: (m.l + W - m.r) / 2, y: H - 3, "text-anchor": "middle", class: "axis-title", text: `${V.axis} →` }, grid);
  const midY = (m.t + H - m.b) / 2;
  el("text", { x: 12, y: midY, "text-anchor": "middle", class: "axis-title", transform: `rotate(-90 12 ${midY})`, text: `${O.axis} →` }, grid);
  const lines = el("g", {}, svg);
  const dots = el("g", {}, svg);
  const pts = { 1: [], 2: [] };
  let linesOn = false;

  function drawLines() {
    lines.innerHTML = "";
    if (!linesOn) return;
    [1, 2].forEach((r) => {
      const byX = {};
      pts[r].forEach((p) => { byX[p[0]] = p[1]; });
      const xsArr = Object.keys(byX).map(Number).sort((a, b) => a - b);
      if (xsArr.length < 2) return;
      const d = xsArr.map((x, i) => `${i ? "L" : "M"}${xs(x).toFixed(1)} ${ys(byX[x]).toFixed(1)}`).join(" ");
      el("path", { d, fill: "none", stroke: ROUND_COLORS[r], "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0.45, class: "chart-line" }, lines);
    });
  }

  return {
    add(x, y, round, instant) {
      pts[round].push([x, y]);
      drawLines();
      const cx = xs(x), cy = ys(y);
      const g = el("g", {}, dots);
      const quiet = anim.RM || instant;
      if (!quiet) el("circle", { cx, cy, r: 8, fill: "none", stroke: ROUND_COLORS[round], "stroke-width": 3, class: "dot-ring" }, g);
      el("circle", { cx, cy, r: 8.5, fill: ROUND_COLORS[round], stroke: "#fff", "stroke-width": 2.5, class: instant ? "" : anim.RM ? "dot-fade" : "dot-pop" }, g);
    },
    showLines() { linesOn = true; drawLines(); },
  };
}
