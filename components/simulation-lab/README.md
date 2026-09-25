# Simulation Lab — animated scene design (canonical)

This is **the only Simulation Lab layout**. Every live case renders through
`SimLabStudio` with an animated scene. The old form-style `SimulationLabClient`
layout was removed on purpose and must not come back
(`ClearCenters_STATE.md` §9 rule 22). A new case gets a new scene. It never gets
a fallback screen.

## How the pieces fit

```
app/activity/[assignmentId]/SimulationLabClient.js   thin wrapper → <SimLabStudio/>
components/simulation-lab/
  SimLabStudio.js    React shell: brief, stepper, S.A.M., chart, HUD, sheets,
                     explain, self-check, confidence (rule 21), submit, drafts
  engine.js          the flow (3 runs → pattern → fair test → twist → 2 runs →
                     explain), the same for every case. Scenes never change it.
  config.js          public case file + scene module → one config object
  sceneIds.js        plain list of scene ids (server-safe, no drawing code)
  scenes/index.js    id → scene module registry (browser only)
  scenes/*.js        one file per experiment (balloon, ramp, boat, ice, …)
  kit/               reusable drawing parts (see below)
  icons.js           icons used on choice cards
  simulation-lab.css all styles, scoped under .slx
```

Grading is identical for every case: `lib/simulationLabScoring.js`, which
`/api/simulation-lab/submit` and the checkpoint check route use. Answer keys and
feedback live **only** in the `.server.js` case files. Nothing in
`components/simulation-lab` may import a `.server.js` file.

## Adding a new case/scene (checklist)

1. **Case files** (`lib/cases/simulation-lab/<code>.public.js` + `.server.js`),
   authored to the rigor rubric and TEKS-checked first (rules 11, 14).
2. **Public `scene` block**:
   ```js
   scene: {
     id: "boat",                 // must be in SCENE_IDS
     r1Runs: 3, r2Runs: 2,
     predictSetting: 20,         // R2 prediction uses the tested R1 setting nearest this
     snap: 1, unit: "cm",        // flag snap + outcome unit on the track
     unitOne: "cm",              // optional singular unit
     outcomeAxis: "Space (cm)", variableAxis: "Washers",
     tickSuffix: "", unitWord: "washers", ghostFormat: "{v} washers", // optional
     checkpointIds: ["cp1", "fair"],
     choiceIcons: { cp1: { increase: "up", decrease: "down", same: "flat" } },
     twist: { type: "widerBoat", banner: "Conditions change!",
              question: "This boat is wider. Does your pattern still hold?" },
     sam: { /* optional per-case overrides of the scene's S.A.M. lines */ },
   }
   ```
   Also add a `fair` checkpoint (`type: "mc"`, `sceneOnly: true`, 4 choices with
   `icon`s) after `cp1`.
3. **Server file**: add `{ id: "fair", type: "mc", correctChoiceId, sceneOnly: true }`
   to the checkpoints, plus `feedback: { cp1: {...}, fair: {...} }`, one line per
   choice id.
4. **Scene module** `scenes/<id>.js`, exporting
   `{ id, runLabel, resetLabel, sam, samByTwist?, create }`.
5. **Register it** in BOTH `sceneIds.js` (`SCENE_IDS`) and `scenes/index.js`.
6. **Test** with the dev harness (below): the full flow, reduced motion, a small
   viewport, and real pointer input on the control. Then take screenshots.
7. **SQL**: a new case code needs its `cases` row like any engine (rule 16: say
   whether it was *run*, not just delivered). A new scene for an existing case
   needs no SQL.

## The scene contract

`create(stage, cfg, api)` draws into `stage` and returns:

| field | meaning |
|---|---|
| `TY` | y of the outcome track (ruler/gauge baseline) |
| `unitPx` | pixels per outcome unit |
| `trackX(v)` | outcome value → x on the track |
| `markerTop`, `flagH`, `pinChipY`, `pinHead` | where the flag, markers and chips sit |
| `landingBlockW?`, `gapWords? {under, over}` | landing block width; gap words ("short"/"too far" by default, "too low"/"too high" for gauges) |
| `getSetting()`, `hasSetting()`, `setSetting(v, animate)` | the student's chosen setting |
| `run(dist, round)` | async: animate a run that ends at outcome `dist` (from the public lookup table) |
| `reset()` | back to the start for the next run |
| `playTwist({ instant })` | async: show the condition change (instant on resume) |
| `setEnabled(b)`, `setLocked(b)`, `setAttention(b)` | control state; locked = Mission Control fixed the setting |
| `showCount?()`, `clearCount?()` | optional count-up readouts |
| `destroy()` | remove tickers and listeners |

`stage` = `{ svg, defs, layers: { static, under, actors, over }, anim: { tween, wait, tickers, RM } }`.
`api` = `{ onSetting(v), beginAdjust(), say(text) }`. Call `onSetting` whenever the
setting changes and `beginAdjust` when the student starts touching a control.

**S.A.M. lines** (`sam` in the scene, overridable per case): `start, pumping,
needFlag, needSetting, ready, readyNoFlag, running, repeat, next,
twistPredict, twistRun2`, which the engine uses, plus the scene's own lines
(for example `full`, `empty`, `locked`, `fairTest`, `explain`). The optional
`toPattern` and `twistDone` have defaults. `pastFlag`, `beforeFlag` and
`compareR1` get `{v}` = the formatted gap. `{v}`, `{min}`
and `{max}` are filled in.

**Rules for scenes**
- The prototype look: flat shapes, soft shadows, the kit palette, S.A.M. talking.
  Reuse kit parts before drawing new ones.
- The outcome is always read off a track in real units (ruler, cm/g/°C gauge),
  so the flag, gap and markers work the same way everywhere.
- Every motion goes through `anim.tween` or `anim.tickers` so reduced motion
  (`RM`) works.
- Controls need real pointer input and a large tap target (Chromebook/iPad).

## Kit

- `kit/core.js`: `el`, `set`, `addDefs`, `svgPoint`, `lerp`, `ease`, `fmtNum`, `createAnimator`
- `kit/stage.js`: `createStage`
- `kit/parts.js`: `ground`, `meterTrack` (major/minor/fine ticks), `floorTiles`,
  `metalDefs`, `robotArm`, `particles`, `chip`, `confetti`, `lockBadge`
- `kit/controls.js`: `countPad` (− value + pad), `livePointer` (gauge needle
  that follows a value), `armSwap` / `armSwapInstant` (the robot arm swaps an
  object for the twist)
- `kit/markers.js`: flag, run markers, gap bracket
- `kit/chart.js`: the live chart
- `scenes/circuitKit.js`: battery holder + wires + switch + current dots (bulb, motor)

## Dev harness (not reachable in production)

`/simulation-lab/dev?case=3.8B-SL&fresh=1` renders the real student component
with mock props and a fetch shim, and scores submits with the real scoring.
Options: `&rm=1` (reduced motion), `&submitted=1`, `&skin=<id>`. The page and
`/api/simulation-lab/dev-score` return 404 when `NODE_ENV=production`.
