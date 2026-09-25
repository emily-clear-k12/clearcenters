// Simulation Lab scene kit — core helpers shared by the engine, the parts and
// every scene: SVG element builders, easing, and a per-stage animator.
//
// The animator is created once per stage (see stage.js) so that tearing a
// stage down (unmount, case change) cancels every running tween and ticker
// in one call. Nothing here is React; scenes draw straight into SVG for
// frame-accurate animation, and React only owns the surrounding cards.

export const NS = "http://www.w3.org/2000/svg";

export function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  if (attrs) {
    for (const k in attrs) {
      if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
  }
  if (parent) parent.appendChild(e);
  return e;
}

export function set(e, attrs) {
  for (const k in attrs) {
    if (k === "text") e.textContent = attrs[k];
    else e.setAttribute(k, attrs[k]);
  }
  return e;
}

// Adds <defs> markup once per stage (keyed by the first id in the snippet).
export function addDefs(defs, id, markup) {
  if (defs.querySelector("#" + id)) return;
  defs.insertAdjacentHTML("beforeend", markup);
}

export const ease = {
  linear: (t) => t,
  inQuad: (t) => t * t,
  outQuad: (t) => 1 - (1 - t) * (1 - t),
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const fmtNum = (v) => (Math.round(v * 10) / 10).toString();

export function svgPoint(svg, clientX, clientY) {
  const p = svg.createSVGPoint();
  p.x = clientX;
  p.y = clientY;
  return p.matrixTransform(svg.getScreenCTM().inverse());
}

// createAnimator(rm) -> { RM, tween, wait, tickers, cancelAll, destroy }
//   tween(ms, fn(easedU, rawU, dtSeconds), easing) -> Promise (rAF driven)
//   wait(ms) -> Promise
//   tickers: Set of fn(dt, now) called every frame (followers, particles)
export function createAnimator(rm) {
  let gen = 0;
  let alive = true;
  let raf = null;
  let last = null;
  const tickers = new Set();

  function loop(now) {
    if (!alive) return;
    const dt = last === null ? 0 : Math.min(0.05, (now - last) / 1000);
    last = now;
    tickers.forEach((fn) => fn(dt, now));
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  function tween(ms, fn, easing) {
    const e = easing || ease.inOutCubic;
    const g = gen;
    return new Promise((resolve) => {
      if (ms <= 0 || !alive) {
        if (alive) fn(1, 1, 0);
        resolve();
        return;
      }
      let start = null, prev = null;
      function frame(now) {
        if (g !== gen || !alive) { resolve(); return; }
        if (start === null) { start = now; prev = now; }
        const raw = Math.min(1, (now - start) / ms);
        fn(e(raw), raw, (now - prev) / 1000);
        prev = now;
        if (raw < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  return {
    RM: !!rm,
    tween,
    wait,
    tickers,
    cancelAll() { gen++; },
    destroy() {
      alive = false;
      gen++;
      if (raf) cancelAnimationFrame(raf);
      tickers.clear();
    },
  };
}
