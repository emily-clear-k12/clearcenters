// Simulation Lab stage engine: the Test / Twist run loop shared by every
// scene. It owns the SVG stage (scene + flag + markers + gap + chart) and
// reports to the React shell through `ui` callbacks; React owns the cards,
// question sheets, stepper and saving.
//
//   const eng = createEngine({ svg, chartHost, cfg, sceneModule, rm, ui })
//   eng.init({ runs, mode })   mode: "test" | "questions" | "twist" | "explain" | "done"
//   eng.runButton()            the big HUD button (run, or reset for the next run)
//   eng.startTwist()           after the fair-test question
//   eng.celebrate()            confetti
//   eng.destroy()
//
// ui: { say(text), update(snapshot), onRun(run), onRound1Done(), onRound2Done(),
//       banner(obj|null), chartLines() }
import { createStage } from "./kit/stage";
import { createChart } from "./kit/chart";
import { createFlag, createMarkers, createGap } from "./kit/markers";
import { confetti } from "./kit/parts";

export function createEngine({ svg, chartHost, cfg, sceneModule, rm, ui }) {
  const stage = createStage(svg, { rm });
  const { anim, layers } = stage;
  const { wait, RM } = anim;
  const V = cfg.variable, O = cfg.outcome;
  const unitTxt = cfg.unitTxt;

  const state = { round: 1, phase: "setup", runs: [], flagRequired: true, quiet: false, destroyed: false };

  function say(text) { if (!state.destroyed && text) ui.say(text); }

  const api = {
    onSetting(v) {
      if (state.quiet) return;
      const repeat = state.round === 1 && state.runs.some((r) => r.round === 1 && r.setting === v);
      if (v < V.min) say(cfg.sam.start());
      else if (repeat) say(cfg.sam.repeat(v));
      else if (state.flagRequired && !flag.placed) say(cfg.sam.pumping(v));
      else say(state.flagRequired ? cfg.sam.ready() : cfg.sam.readyNoFlag());
      updateUI();
    },
    async beginAdjust() {
      if (state.phase === "landed") { await resetForNext({ keepFlag: false }); return true; }
      return state.phase === "setup";
    },
    say,
  };
  const scene = sceneModule.create(stage, cfg, api);
  const geom = scene;

  const flag = createFlag({
    svg, layer: layers.under, geom, outcome: O, anim, unitTxt,
    async onGrab() {
      if (!state.flagRequired) return false;
      if (state.phase === "landed") await resetForNext({ keepFlag: true });
      return state.phase === "setup";
    },
    onPlaced() {
      if (!scene.hasSetting()) say(cfg.sam.needSetting()); else say(cfg.sam.ready());
      updateUI();
    },
  });
  const gap = createGap({ over: layers.over, under: layers.under, geom, anim, unitTxt, onBullseye: (x, y) => confetti(layers.over, anim, x, y) });
  const markers = createMarkers({ over: layers.over, under: layers.under, geom, anim, ghostLabel: V.ghost, unitTxt, maxValue: O.max });
  const chart = createChart(chartHost, cfg, anim);

  const roundRuns = (r) => state.runs.filter((x) => x.round === r).length;
  const canRun = () => state.phase === "setup" && scene.hasSetting() && (!state.flagRequired || flag.placed);

  function updateUI() {
    if (state.destroyed) return;
    const landed = state.phase === "landed";
    const needed = state.round === 1 ? cfg.round1.runs : cfg.round2.runs;
    const done = roundRuns(state.round);
    const moreRuns = done < needed;
    const showHud = state.phase === "setup" || state.phase === "running" || state.phase === "resetting" || (landed && moreRuns);
    const setupish = state.phase === "setup";
    scene.setAttention(setupish && !scene.hasSetting());
    flag.setAttention(setupish && scene.hasSetting() && state.flagRequired && !flag.placed);
    flag.setVisible(state.flagRequired);
    ui.update({
      round: state.round,
      phase: state.phase,
      landed,
      canRun: canRun(),
      showHud,
      runsDone: done,
      runsNeeded: needed,
      runNumber: Math.min(done + (landed ? 0 : 1), needed),
    });
  }

  function valueFor(round, v) {
    const table = round === 1 ? cfg.round1.table : cfg.round2.table;
    return table[v];
  }

  async function runButton() {
    if (state.phase === "landed") { await resetForNext({ keepFlag: false }); return; }
    if (state.phase !== "setup") return;
    if (!scene.hasSetting()) { say(cfg.sam.needSetting()); scene.setAttention(true); return; }
    if (state.flagRequired && !flag.placed) { say(cfg.sam.needFlag()); flag.setAttention(true); return; }
    const v = scene.getSetting();
    const dist = valueFor(state.round, v);
    if (dist == null) return;
    state.phase = "running";
    updateUI();
    scene.setEnabled(false);
    say(cfg.sam.running());
    await scene.run(dist, state.round);
    if (state.destroyed) return;
    const run = { round: state.round, setting: v, dist, pred: state.flagRequired ? flag.value : null };
    state.runs.push(run);
    markers.showLanding(run);
    chart.add(v, dist, run.round);
    if (scene.showCount) scene.showCount(dist, run.round);
    ui.onRun(run);
    let diff = null;
    if (run.pred != null) diff = await gap.show(run.pred, dist);
    if (state.destroyed) return;
    state.phase = "landed";
    scene.setEnabled(true);
    const n = roundRuns(state.round);
    let msg = "";
    if (diff != null) msg = Math.abs(diff) < 0.01 ? "Bullseye! You predicted it exactly. " : diff > 0 ? `It went ${unitTxt(diff)} past your flag. ` : `It stopped ${unitTxt(-diff)} before your flag. `;
    if (state.round === 1) {
      if (n >= cfg.round1.runs) {
        say(cfg.sam.toPattern());
        state.phase = "wait";
        updateUI();
        await wait(RM ? 600 : 1900);
        if (state.destroyed) return;
        state.phase = "question";
        updateUI();
        ui.onRound1Done();
        return;
      }
      say(msg + cfg.sam.next());
    } else if (n === 1 && cfg.round2.runs > 1) {
      const r1 = state.runs.find((r) => r.round === 1 && r.setting === v);
      say(msg + (r1 ? `In Round 1 the same setting went ${unitTxt(r1.dist)}!` : ""));
      state.flagRequired = false;
      scene.setLocked(false);
    } else if (n >= cfg.round2.runs) {
      say(cfg.sam.twistDone());
      state.phase = "wait";
      updateUI();
      await wait(RM ? 800 : 2600);
      if (state.destroyed) return;
      state.phase = "question";
      updateUI();
      ui.onRound2Done();
      return;
    }
    updateUI();
  }

  async function resetForNext({ keepFlag }) {
    state.phase = "resetting";
    if (scene.clearCount) scene.clearCount();
    markers.ghostify();
    gap.clear();
    if (!keepFlag) flag.set(0, false);
    updateUI();
    await scene.reset();
    if (state.destroyed) return;
    state.phase = "setup";
    if (state.round === 2 && !state.flagRequired) say(cfg.sam.twistRun2());
    else say(scene.hasSetting() ? (flag.placed ? cfg.sam.ready() : cfg.sam.needFlag()) : cfg.sam.start());
    updateUI();
  }

  function predictTarget() {
    const tested = state.runs.filter((r) => r.round === 1).map((r) => r.setting);
    const target = cfg.round2.predictSetting;
    return tested.length ? tested.slice().sort((a, b) => Math.abs(a - target) - Math.abs(b - target))[0] : target;
  }

  async function startTwist() {
    state.round = 2;
    state.phase = "twist";
    state.flagRequired = true;
    if (scene.clearCount) scene.clearCount();
    markers.ghostify();
    gap.clear();
    flag.set(0, false);
    updateUI();
    state.quiet = true;
    scene.setEnabled(false);
    await scene.reset();
    if (state.destroyed) return;
    ui.banner({ kicker: "Round 2", title: cfg.round2.banner, text: cfg.round2.description, tone: "orange" });
    say(cfg.round2.description);
    await wait(RM ? 300 : 700);
    await scene.playTwist({});
    if (state.destroyed) return;
    chart.showLines();
    ui.chartLines();
    await wait(RM ? 1200 : 1600);
    if (state.destroyed) return;
    ui.banner(null);
    const ps = predictTarget();
    await scene.setSetting(ps, true);
    state.quiet = false;
    scene.setLocked(true);
    scene.setEnabled(true);
    state.phase = "setup";
    say(cfg.sam.twistPredict(ps));
    updateUI();
  }

  // Rebuild the stage from saved runs (resume after a reload / device swap).
  async function init({ runs = [], mode = "test" } = {}) {
    flag.set(0, false);
    runs.forEach((r) => {
      const run = { round: r.round, setting: r.setting, dist: valueFor(r.round, r.setting), pred: r.pred == null ? null : r.pred };
      if (run.dist == null) return;
      state.runs.push(run);
      markers.addGhost(run, false);
      chart.add(run.setting, run.dist, run.round, true);
    });
    const r2 = roundRuns(2);
    if (mode === "test") {
      say(cfg.sam.start());
      updateUI();
      return;
    }
    if (mode === "questions") {
      state.phase = "question";
      updateUI();
      return;
    }
    // twist / explain / done: the Round 2 condition is already in place
    state.round = 2;
    await scene.playTwist({ instant: true });
    chart.showLines();
    ui.chartLines();
    if (mode === "twist") {
      if (r2 === 0) {
        const ps = predictTarget();
        state.quiet = true;
        await scene.setSetting(ps, false);
        state.quiet = false;
        scene.setLocked(true);
        state.flagRequired = true;
        say(cfg.sam.twistPredict(ps));
      } else {
        state.flagRequired = false;
        say(cfg.sam.twistRun2());
      }
      state.phase = "setup";
      updateUI();
      return;
    }
    state.flagRequired = false;
    state.phase = mode === "done" ? "done" : "question";
    scene.setEnabled(false);
    updateUI();
  }

  const self = {
    state,
    scene,
    cfg,
    init,
    runButton,
    startTwist,
    say,
    celebrate(x = 683, y = 300) { confetti(layers.over, anim, x, y); },
    setDone() { state.phase = "done"; updateUI(); },
    destroy() {
      state.destroyed = true;
      flag.destroy();
      scene.destroy();
      stage.destroy();
    },
  };
  return self;
}
