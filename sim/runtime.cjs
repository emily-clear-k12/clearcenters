// A very small React-shaped runtime, enough to drive a ClearCenters client
// component the way a student does: render, find a button by its text, click
// it, wait for the fetch it fires, re-render. There is no npm install in this
// environment and no DOM — this exists so a whole activity can be walked
// end to end before it reaches a classroom.
//
// It implements useState, useEffect, useMemo, useCallback, useContext,
// createContext and Fragment. It does NOT implement concurrent rendering,
// keys-based reconciliation beyond position, refs, or portals. Hook state is
// held per component position in the tree, so a component that moves position
// loses its state — the same rule React has, which is why the real client
// passes `key` on the phase components.

const ts = require("/opt/node22/lib/node_modules/typescript");
const fs = require("fs");
const path = require("path");

// ---- module loading: transpile JSX/ESM on require -------------------------
function installLoader(alias) {
  const compile = (module, filename) => {
    let src = fs.readFileSync(filename, "utf8");
    src = src.replace(/^\s*["']use client["'];?\s*$/m, "");
    for (const [from, to] of Object.entries(alias || {})) {
      src = src.split(`"${from}"`).join(`"${to}"`).split(`'${from}'`).join(`'${to}'`);
    }
    const out = ts.transpileModule(src, {
      compilerOptions: { module: 1, target: 7, jsx: 2, esModuleInterop: true, allowJs: true },
      fileName: filename + "x",
    }).outputText;
    module._compile(out, filename);
  };
  require.extensions[".js"] = compile;
  require.extensions[".jsx"] = compile;
}

// ---- elements -------------------------------------------------------------
const FRAGMENT = Symbol("Fragment");
function createElement(type, props, ...children) {
  const p = { ...(props || {}) };
  if (children.length) p.children = children.length === 1 ? children[0] : children;
  return { $$: true, type, props: p, key: p.key != null ? String(p.key) : null };
}
function createContext(defaultValue) {
  const ctx = { _default: defaultValue, _value: defaultValue };
  ctx.Provider = function Provider(props) { return props.children; };
  ctx.Provider._ctx = ctx;
  return ctx;
}

// ---- the renderer ---------------------------------------------------------
class Runtime {
  constructor() {
    this.states = new Map();   // path -> { hooks: [], cursor }
    this.effects = [];
    this.pending = 0;
    this.renderCount = 0;
    this.current = null;
    this.onError = null;
  }

  useState(initial) {
    const f = this.current;
    const i = f.cursor++;
    if (!(i in f.hooks)) f.hooks[i] = { v: typeof initial === "function" ? initial() : initial };
    const slot = f.hooks[i];
    const set = (next) => {
      const v = typeof next === "function" ? next(slot.v) : next;
      if (Object.is(v, slot.v)) return;
      slot.v = v;
      this.dirty = true;
    };
    return [slot.v, set];
  }
  useRefSlot(deps) {
    const f = this.current;
    const i = f.cursor++;
    const prev = f.hooks[i];
    const changed = !prev || !prev.deps || !deps || deps.length !== prev.deps.length || deps.some((d, n) => !Object.is(d, prev.deps[n]));
    return { i, prev, changed, set: (val) => { f.hooks[i] = { deps, val }; } };
  }
  useMemo(fn, deps) {
    const s = this.useRefSlot(deps);
    if (s.changed) { const val = fn(); s.set(val); return val; }
    return s.prev.val;
  }
  useCallback(fn, deps) { return this.useMemo(() => fn, deps); }
  useEffect(fn, deps) {
    const s = this.useRefSlot(deps);
    if (s.changed) { s.set(undefined); this.effects.push(fn); }
  }
  useContext(ctx) { return ctx._value; }

  render(element, path = "0") {
    if (element == null || element === false || element === true) return null;
    if (typeof element === "string" || typeof element === "number") return { text: String(element) };
    if (Array.isArray(element)) return { tag: "#frag", props: {}, children: element.map((c, i) => this.render(c, `${path}.${i}`)).filter(Boolean) };
    if (!element.$$) return null;

    const { type, props } = element;
    const id = `${path}:${element.key != null ? element.key : ""}`;

    if (typeof type === "function") {
      // a context provider: set the value for the subtree, then restore
      if (type._ctx) {
        const ctx = type._ctx;
        const prev = ctx._value;
        ctx._value = props.value;
        const out = this.render(props.children, `${id}#p`);
        ctx._value = prev;
        return out;
      }
      const key = id + "|" + (type.name || "anon");
      let f = this.states.get(key);
      if (!f) { f = { hooks: [], cursor: 0 }; this.states.set(key, f); }
      f.cursor = 0;
      const prevFiber = this.current;
      this.current = f;
      let out;
      try {
        out = type(props);
      } catch (e) {
        this.current = prevFiber;
        if (this.onError) this.onError(type.name, e);
        throw e;
      }
      this.current = prevFiber;
      return this.render(out, key);
    }

    if (type === FRAGMENT) return { tag: "#frag", props: {}, children: this.childList(props.children, id) };
    return { tag: String(type), props, children: this.childList(props.children, id) };
  }

  childList(children, path) {
    if (children == null) return [];
    const arr = Array.isArray(children) ? children : [children];
    const out = [];
    arr.forEach((c, i) => {
      if (Array.isArray(c)) c.forEach((cc, j) => { const n = this.render(cc, `${path}.${i}.${j}`); if (n) out.push(n); });
      else { const n = this.render(c, `${path}.${i}`); if (n) out.push(n); }
    });
    return out;
  }

  mount(element) {
    this.root = element;
    return this.flush();
  }

  flush() {
    let guard = 0;
    do {
      this.dirty = false;
      this.effects = [];
      this.renderCount++;
      this.tree = this.render(this.root);
      const fx = this.effects;
      this.effects = [];
      fx.forEach((fn) => { const c = fn(); if (typeof c === "function") { /* cleanup ignored */ } });
      guard++;
      if (guard > 40) throw new Error("render loop did not settle after 40 passes");
    } while (this.dirty);
    return this.tree;
  }
}

// ---- querying the rendered tree ------------------------------------------
function walk(node, fn, depth = 0) {
  if (!node) return;
  fn(node, depth);
  (node.children || []).forEach((c) => walk(c, fn, depth + 1));
}
function textOf(node) {
  let s = "";
  walk(node, (n) => { if (n.text) s += n.text; });
  return s.replace(/\s+/g, " ").trim();
}
function findAll(tree, pred) {
  const hits = [];
  walk(tree, (n) => { if (pred(n)) hits.push(n); });
  return hits;
}
function buttons(tree) {
  return findAll(tree, (n) => n.tag === "button");
}
function screenText(tree) {
  const lines = [];
  walk(tree, (n) => { if (n.text && n.text.trim()) lines.push(n.text.trim()); });
  return lines.join(" | ");
}

module.exports = { installLoader, createElement, createContext, FRAGMENT, Runtime, walk, textOf, findAll, buttons, screenText };
