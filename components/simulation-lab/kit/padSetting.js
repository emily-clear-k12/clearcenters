// The shared "choose a setting with the − / + pad" behaviour most gauge-style
// scenes use: stepping, S.A.M.'s full/empty/locked lines, Mission Control's
// lock during the Round 2 prediction, and the animated setSetting() the
// engine calls. The scene draws; this keeps the rules identical everywhere.
//
//   const ctl = padSetting({ anim, cfg, api, pad, lock, show, offText, onChange })
//   ctl.value / ctl.chosen, ctl.step(d), ctl.setSetting(v, animate), ctl.clear()
//   ctl.setEnabled(on), ctl.setLocked(on), ctl.setAttention(on), ctl.busy = true|false
import { set } from "./core";

export function padSetting({ anim, cfg, api, pad, lock, show, offText = "—", startAt, onChange, stepMs = 140 }) {
  const V = cfg.variable;
  const st = { value: null, chosen: false, enabled: true, locked: false, busy: false };
  const fmt = show || ((v) => ({ text: String(v), unit: V.unitWord || "" }));
  function paint() {
    if (st.value == null) pad.set(offText, { unitText: "", atMin: true });
    else { const f = fmt(st.value); pad.set(f.text, { unitText: f.unit, atMin: st.value <= V.min, atMax: st.value >= V.max }); }
    if (lock) set(lock, { opacity: st.locked ? 1 : 0 });
    if (onChange) onChange(st.value);
  }
  async function step(d) {
    if (!st.enabled || st.busy) return;
    if (st.locked) { api.say(cfg.sam.locked(st.value)); return; }
    const ok = await api.beginAdjust();
    if (!ok) return;
    let next;
    if (st.value == null) { if (d < 0) { api.say(cfg.sam.start()); return; } next = startAt != null ? startAt : V.min; }
    else next = Math.max(V.min, Math.min(V.max, Math.round((st.value + d * V.step) * 1000) / 1000));
    if (next === st.value) { api.say(d > 0 ? cfg.sam.full(V.max) : cfg.sam.empty(V.min)); return; }
    st.value = next; st.chosen = true;
    paint();
    api.onSetting(st.value);
  }
  async function setSetting(v, animate) {
    st.chosen = true;
    if (!animate || anim.RM) { st.value = v; paint(); api.onSetting(v); return; }
    if (st.value == null) { st.value = startAt != null ? startAt : V.min; paint(); api.onSetting(st.value); await anim.wait(stepMs); }
    let guard = 0;
    while (st.value !== v && guard++ < 60) {
      st.value = Math.round((st.value + (st.value < v ? V.step : -V.step)) * 1000) / 1000;
      paint(); api.onSetting(st.value); await anim.wait(stepMs);
    }
  }
  return {
    get value() { return st.value; },
    get chosen() { return st.chosen && st.value != null; },
    get busy() { return st.busy; },
    set busy(b) { st.busy = b; },
    step, setSetting, paint,
    clear() { st.value = null; st.chosen = false; paint(); },
    setEnabled(on) { st.enabled = on; pad.setEnabled(on); },
    setLocked(on) { st.locked = on; paint(); },
    setAttention(on) { pad.g.classList.toggle("attention", !!on); },
  };
}

// Pad-scene boilerplate the engine needs, built from a padSetting.
export function padSceneApi(ctl, extra) {
  return {
    getSetting: () => ctl.value,
    hasSetting: () => ctl.chosen,
    setSetting: ctl.setSetting,
    setEnabled: (on) => ctl.setEnabled(on),
    setLocked: (on) => ctl.setLocked(on),
    setAttention: (on) => ctl.setAttention(on),
    ...extra,
  };
}
