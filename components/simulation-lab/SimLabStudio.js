"use client";

// Simulation Lab — scene-based student experience (the shell).
//
// Used for any Simulation Lab case whose PUBLIC case file has a `scene`
// block naming a registered scene (see sceneIds.js / scenes/index.js and
// README.md). Every other case keeps the original console client.
//
// Flow: Mission Brief -> Test (3 runs) -> Pattern -> Fair test -> Twist
// (animated condition change, one given-setting prediction + 1 free run)
// -> Explain (write with tap-to-insert starters, then self-check +
// "How sure are you?") -> submitted.
//
// Layout: a fixed 1366x768 canvas scaled to fit the window (letterboxed),
// so the drawn scenes line up identically on a 1366x768 Chromebook, a
// 1024x768 iPad or a big classroom display.
//
// Answer keys never reach the browser: choice checks go through
// POST /api/simulation-lab/check and final scoring through
// POST /api/simulation-lab/submit (both server-side).

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SamIcon from "../SamIcon";
import DistressCallBadge from "../DistressCallBadge";
import { getScene } from "./scenes";
import { buildSceneConfig } from "./config";
import { createEngine } from "./engine";
import { ICONS } from "./icons";
import "./simulation-lab.css";

const STEPS = ["Test", "Pattern", "Fair test", "Twist", "Explain"];
const REQUIRED_CHECKS = 3;
const CONFIDENCE = [
  { id: "shaky", emoji: "😕", label: "Not sure" },
  { id: "solid", emoji: "🙂", label: "Pretty sure" },
  { id: "strong", emoji: "😄", label: "Very sure" },
];
const DEFAULT_SKINS = [null, undefined, "", "cosmic"];

function Svg({ markup, className }) {
  // Static icon markup from ./icons.js only (never user content).
  return <span className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup || "" }} />;
}

function SamBot({ samSkin, label }) {
  if (!DEFAULT_SKINS.includes(samSkin)) {
    return (
      <div className="sam-bot" aria-hidden="true">
        <SamIcon skinKey={samSkin} size={70} alt={label} />
      </div>
    );
  }
  return (
    <div className="sam-bot" aria-hidden="true">
      <svg viewBox="0 0 80 84">
        <ellipse cx="40" cy="80" rx="20" ry="3.5" fill="#2a2440" opacity=".12" />
        <line x1="40" y1="12" x2="40" y2="4" stroke="#7b6cd9" strokeWidth="3" strokeLinecap="round" />
        <circle className="sam-bulb" cx="40" cy="5" r="4.5" fill="#f0932b" />
        <rect x="5" y="26" width="9" height="16" rx="4.5" fill="#2bb3a3" />
        <rect x="66" y="26" width="9" height="16" rx="4.5" fill="#2bb3a3" />
        <rect x="11" y="11" width="58" height="46" rx="19" fill="#fff" stroke="#d8d0f0" strokeWidth="2" />
        <rect x="18" y="19" width="44" height="28" rx="13" fill="#2a2440" />
        <g className="sam-eyes">
          <ellipse cx="31" cy="31" rx="4.5" ry="5.5" fill="#5ff0dc" />
          <ellipse cx="49" cy="31" rx="4.5" ry="5.5" fill="#5ff0dc" />
        </g>
        <path d="M34 39.5 q6 4 12 0" stroke="#5ff0dc" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <rect x="23" y="59" width="34" height="18" rx="9" fill="#fff" stroke="#d8d0f0" strokeWidth="2" />
        <circle cx="40" cy="68" r="4" fill="#2bb3a3" />
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <defs>
          <linearGradient id="slxLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2bb3a3" />
            <stop offset="1" stopColor="#7b6cd9" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#slxLogoGrad)" />
        <path d="M16 9h8M17.5 9v8l-6.5 11.5a2.4 2.4 0 0 0 2.1 3.5h13.8a2.4 2.4 0 0 0 2.1-3.5L22.5 17V9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="26" r="2" fill="#fff" />
        <circle cx="23" cy="23.5" r="1.4" fill="#fff" />
      </svg>
    </span>
  );
}

function Stepper({ step }) {
  const items = [];
  STEPS.forEach((s, i) => {
    if (i) items.push(<li key={"b" + i} className="bar" aria-hidden="true" />);
    const cls = i < step ? "done" : i === step ? "current" : "";
    items.push(
      <li key={s} className={cls} aria-current={i === step ? "step" : undefined}>
        <span className="dot">{i < step ? <Svg markup={ICONS.check} /> : i + 1}</span>
        <span className="lbl">{s}</span>
      </li>
    );
  });
  return <ol className="stepper" aria-label="Progress">{items}</ol>;
}

/* ---------- choice question (pattern / fair test) ---------- */
function ChoiceBody({ q, kicker, layout, record, checking, nextLabel, onPick, onNext }) {
  const solved = !!(record && record.solved);
  const tried = (record && record.attempts) || [];
  return (
    <>
      <div className="sheet-kicker">{kicker}</div>
      <h2 className="sheet-prompt">{q.prompt}</h2>
      <div className={"choices " + layout}>
        {q.choices.map((c) => {
          const isRight = solved && record.correctId === c.id;
          const cls = "choice" + (isRight ? " right" : "") + (!isRight && tried.includes(c.id) ? " tried" : "") + (record && record.shake === c.id ? " wrong" : "");
          return (
            <button key={c.id} type="button" className={cls} data-id={c.id} disabled={checking} onClick={() => onPick(c.id)}>
              <Svg className="ci" markup={ICONS[c.icon]} />
              <span className="ct">{c.text}</span>
              <Svg className="badge" markup={ICONS.check} />
            </button>
          );
        })}
      </div>
      <div className={"feedback" + (solved ? " yes" : record && record.feedback ? " hint" : "")} aria-live="polite">
        {solved ? (
          <>
            <Svg className="fb-ic" markup={ICONS.check} />
            <span className="fb-t">{record.feedback}</span>
            <button type="button" className="btn-primary" onClick={onNext}>
              {nextLabel} <span aria-hidden="true">→</span>
            </button>
          </>
        ) : record && record.feedback ? (
          <span className="fb-t">{record.feedback}</span>
        ) : (
          <span className="fb-t fb-idle">Tap the answer you think is right.</span>
        )}
      </div>
    </>
  );
}

/* ---------- explain (write, then self-check + confidence + send) ---------- */
function ExplainBody({ cfg, text, setText, checklist, toggleCheck, confidence, setConfidence, page, setPage, submit, onSend, onConfirm, onCancel }) {
  const taRef = useRef(null);
  const [used, setUsed] = useState({});
  const checked = checklist.filter(Boolean).length;
  if (page === 1) {
    return (
      <>
        <div className="sheet-kicker">Final step · {cfg.generalize.title}</div>
        <h2 className="sheet-prompt small">{cfg.generalize.prompt}</h2>
        <div className="stems-label">Tap a sentence starter to use it:</div>
        <div className="stems">
          {cfg.generalize.stems.map((s, i) => (
            <button
              key={i}
              type="button"
              className={"stem" + (used[i] ? " used" : "")}
              onClick={() => {
                setText((prev) => (prev ? prev.trimEnd() + " " : "") + s);
                setUsed((u) => ({ ...u, [i]: true }));
                if (taRef.current) taRef.current.focus();
              }}
            >
              {s.split("___").map((part, j, arr) => (
                <React.Fragment key={j}>
                  {part}
                  {j < arr.length - 1 && <b>___</b>}
                </React.Fragment>
              ))}
            </button>
          ))}
        </div>
        <textarea ref={taRef} className="answer" placeholder="Type your explanation here…" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
        <div className="gen-foot">
          <span className="gen-note">Your teacher reads this. Replace every ___ with your own words and numbers.</span>
          <button type="button" className="btn-primary next-page" disabled={!text.trim()} onClick={() => setPage(2)}>
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </>
    );
  }
  const ready = checked >= REQUIRED_CHECKS && !!confidence && !!text.trim();
  return (
    <>
      <div className="sheet-kicker">Final step · Check your work</div>
      <h2 className="sheet-prompt small">Tap every sentence that is true about what you wrote.</h2>
      <div className={"count-note" + (checked >= REQUIRED_CHECKS ? " ok" : "")}>
        {checked >= REQUIRED_CHECKS ? `✓ ${checked} checked` : `Check at least ${REQUIRED_CHECKS} (${checked} so far)`}
      </div>
      <div className="checks">
        {cfg.selfCheck.map((q, i) => (
          <button key={i} type="button" className={"check" + (checklist[i] ? " on" : "")} aria-pressed={!!checklist[i]} onClick={() => toggleCheck(i)}>
            <span className="box"><Svg markup={ICONS.check} /></span>
            <span>{q}</span>
          </button>
        ))}
      </div>
      <div className="sure-row">
        <span className="sure-label">How sure are you?</span>
        <div className="sure" role="group" aria-label="How sure are you?">
          {CONFIDENCE.map((c) => (
            <button key={c.id} type="button" aria-pressed={confidence === c.id} data-conf={c.id} onClick={() => setConfidence(c.id)}>
              <span className="em">{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="gen-foot">
        {submit.state === "confirm" ? (
          <>
            <span className="confirm-q">Send it to your teacher? You can’t change it after this.</span>
            <span className="foot-right">
              <button type="button" className="btn-ghost" onClick={onCancel}>Not yet</button>
              <button type="button" className="btn-primary confirm-send" onClick={onConfirm}>Send <span aria-hidden="true">→</span></button>
            </span>
          </>
        ) : (
          <>
            <span className={submit.error ? "err" : "gen-note"}>{submit.error || "Your teacher is always the scorer of record."}</span>
            <span className="foot-right">
              <button type="button" className="btn-ghost" onClick={() => setPage(1)}>← Back</button>
              <button type="button" className="btn-primary finish" disabled={!ready || submit.state === "sending"} onClick={onSend}>
                {submit.state === "sending" ? "Sending…" : "Finish mission"} <span aria-hidden="true">→</span>
              </button>
            </span>
          </>
        )}
      </div>
    </>
  );
}

/* ---------- helpers ---------- */
function readLocal(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function runsFromTrialLog(trialLog, varId) {
  const out = [];
  if (!trialLog) return out;
  [["roundOne", 1], ["roundTwo", 2]].forEach(([k, round]) => {
    (trialLog[k] || []).forEach((t) => {
      const setting = Number(t[varId]);
      if (!Number.isFinite(setting)) return;
      out.push({ round, setting, pred: t.prediction == null ? null : Number(t.prediction) });
    });
  });
  return out;
}

function toTrialLogs(runs, varId) {
  const make = (round, key) =>
    runs
      .filter((r) => r.round === round)
      .map((r, i) => ({
        id: `${key}-t${i + 1}`,
        [varId]: r.setting,
        prediction: r.pred,
        actual: r.dist,
        gap: r.pred == null ? null : Math.round(Math.abs(r.dist - r.pred) * 10) / 10,
      }));
  return { roundOne: make(1, "roundOne"), roundTwo: make(2, "roundTwo") };
}

function resumeMode(runs, answers, cfg) {
  const r1 = runs.filter((r) => r.round === 1).length;
  const r2 = runs.filter((r) => r.round === 2).length;
  const pId = cfg.pattern.id, fId = cfg.fairTest.id;
  if (r1 < cfg.round1.runs) return { mode: "test", step: 0 };
  if (!(answers[pId] && answers[pId].solved)) return { mode: "questions", step: 1, sheet: "pattern" };
  if (!(answers[fId] && answers[fId].solved)) return { mode: "questions", step: 2, sheet: "fair" };
  if (r2 < cfg.round2.runs) return { mode: "twist", step: 3 };
  return { mode: "explain", step: 4, sheet: "explain" };
}

/* ======================================================================== */
// The saved draft lives in localStorage, which the server can't see, so the
// studio mounts only on the client (after the first effect) — otherwise a
// resumed draft would render differently from the server HTML (hydration
// mismatch). Until then a plain backdrop shows.
function loadInitial({ assignmentId, studentId, existingSubmission, alreadySubmitted, revisionRequested }) {
  const storageKey = `cc_simlab2_${assignmentId}_${studentId || "anon"}`;
  if (alreadySubmitted) return { submitted: true, fromLog: true, answers: {}, entered: true };
  const local = readLocal(storageKey);
  if (local && local.v === 2) return local;
  const sld = existingSubmission && existingSubmission.simulation_lab_data;
  if (sld && sld.v === 2 && sld.draft && !revisionRequested) return sld;
  return { v: 2, entered: false, runs: [], answers: {}, text: "", checklist: [], confidence: null };
}

export default function SimLabStudio(props) {
  const [initial, setInitial] = useState(null);
  useEffect(() => { setInitial(loadInitial(props)); /* once, on mount */ }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!initial) return <div className="slx slx-viewport" aria-busy="true" />;
  return <Studio {...props} initial={initial} />;
}

function Studio({
  initial: loaded,
  assignmentId,
  studentId,
  caseStandard,
  publicCase,
  existingSubmission,
  alreadySubmitted,
  revisionRequested,
  revisionFeedback,
  samSkin,
  samNickname,
}) {
  const router = useRouter();
  const samLabel = samNickname || "S.A.M.";
  const sceneModule = getScene(publicCase.scene.id);
  const cfg = useMemo(() => buildSceneConfig(publicCase, sceneModule), [publicCase, sceneModule]);
  const storageKey = `cc_simlab2_${assignmentId}_${studentId || "anon"}`;
  // Draft: localStorage first (this device), then a server draft saved with
  // "Save" (another device). Ignored once the mission is submitted.
  const initial = useMemo(() => {
    if (!loaded.fromLog) return loaded;
    const sld = (existingSubmission && existingSubmission.simulation_lab_data) || {};
    return { ...loaded, runs: runsFromTrialLog(sld.trialLog, cfg.variable.id) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(!!initial.entered);
  const [step, setStep] = useState(0);
  const [hud, setHud] = useState({ round: 1, phase: "setup", landed: false, canRun: false, showHud: false, runsDone: 0, runsNeeded: cfg.round1.runs, runNumber: 1 });
  const [sam, setSam] = useState({ text: "", n: 0 });
  const [runs, setRuns] = useState(initial.runs || []);
  const [answers, setAnswers] = useState(initial.answers || {});
  const [text, setText] = useState(initial.text || "");
  const [checklist, setChecklist] = useState(initial.checklist && initial.checklist.length ? initial.checklist : new Array(cfg.selfCheck.length).fill(false));
  const [confidence, setConfidence] = useState(initial.confidence || null);
  const [sheet, setSheet] = useState(null); // "pattern" | "fair" | "explain" | null
  const [sheetView, setSheetView] = useState(null); // last shown (kept while closing)
  const [explainPage, setExplainPage] = useState(1);
  const [checking, setChecking] = useState(false);
  const [banner, setBanner] = useState(null);
  const [chartR2, setChartR2] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [submit, setSubmit] = useState({ state: initial.submitted ? "done" : "idle", error: null, cleanRun: false });
  const [saveState, setSaveState] = useState("idle");
  const [rm, setRm] = useState(false);

  const svgRef = useRef(null);
  const chartRef = useRef(null);
  const engineRef = useRef(null);

  /* ----- fit the 1366x768 canvas to the window ----- */
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1366, window.innerHeight / 768));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const saveProgress = useCallback(
    (fields) =>
      fetch("/api/submission/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, ...fields }),
      })
        .then((r) => r.ok)
        .catch(() => false),
    [assignmentId]
  );

  const say = useCallback((t) => setSam((s) => (s.text === t ? s : { text: t, n: s.n + 1 })), []);

  function openSheet(name) {
    setSheet(name);
    setSheetView(name);
  }
  function closeSheet() {
    setSheet(null);
  }

  /* ----- the stage engine (imperative SVG), created once fonts are in ----- */
  useEffect(() => {
    let cancelled = false;
    const qs = new URLSearchParams(window.location.search);
    const reduce = qs.get("rm") === "1" || (qs.get("rm") !== "0" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setRm(reduce);
    const fonts = document.fonts
      ? Promise.race([
          Promise.all(["600 16px SlxFredoka", "500 16px SlxFredoka", "700 16px SlxNunito", "800 16px SlxNunito", "900 16px SlxNunito"].map((f) => document.fonts.load(f))),
          new Promise((r) => setTimeout(r, 2500)),
        ]).catch(() => {})
      : Promise.resolve();
    fonts.then(() => {
      if (cancelled || !svgRef.current) return;
      const ui = {
        say,
        update: (s) => setHud(s),
        onRun: (run) => setRuns((prev) => [...prev, { round: run.round, setting: run.setting, dist: run.dist, pred: run.pred }]),
        onRound1Done: () => {
          setStep(1);
          setSpotlight(true);
          openSheet("pattern");
        },
        onRound2Done: () => {
          setStep(4);
          setSpotlight(true);
          setExplainPage(1);
          openSheet("explain");
          say(cfg.sam.explain());
          saveProgress({ phase: "finalUnlock" });
        },
        banner: (b) => setBanner(b),
        chartLines: () => setChartR2(true),
      };
      const eng = createEngine({ svg: svgRef.current, chartHost: chartRef.current, cfg, sceneModule, rm: reduce, ui });
      engineRef.current = eng;
      if (typeof window !== "undefined") window.__slxEngine = eng;

      // resume
      const savedRuns = (initial.runs || []).map((r) => ({ ...r, dist: (r.round === 1 ? cfg.round1.table : cfg.round2.table)[r.setting] }));
      if (initial.submitted) {
        eng.init({ runs: savedRuns, mode: savedRuns.some((r) => r.round === 2) ? "done" : "questions" });
        setStep(5);
        setBanner({ kicker: "Mission complete", title: "Transmission received, Cadet.", text: "Your lab report is in. Your teacher is always the scorer of record.", tone: "teal", home: true });
        say("You already finished this mission. Nice work!");
      } else {
        const r = resumeMode(savedRuns, initial.answers || {}, cfg);
        eng.init({ runs: savedRuns, mode: r.mode });
        setStep(r.step);
        if (r.sheet) {
          if (r.sheet === "pattern" || r.sheet === "explain") setSpotlight(true);
          if (r.sheet === "fair") say(cfg.sam.fairTest());
          if (r.sheet === "explain") say(cfg.sam.explain());
          openSheet(r.sheet);
        }
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
      if (engineRef.current) engineRef.current.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----- local draft ----- */
  useEffect(() => {
    if (submit.state === "done") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ v: 2, entered, runs: runs.map(({ round, setting, pred }) => ({ round, setting, pred })), answers, text, checklist, confidence }));
    } catch (e) {
      /* storage full / private mode — the server save still works */
    }
  }, [storageKey, entered, runs, answers, text, checklist, confidence, submit.state]);

  function draftPayload() {
    return { v: 2, draft: true, entered: true, runs: runs.map(({ round, setting, pred }) => ({ round, setting, pred })), answers, text, checklist, confidence };
  }

  async function manualSave() {
    setSaveState("saving");
    const ok = await saveProgress({ simulation_lab_data: draftPayload(), ...(confidence ? { self_confidence: confidence } : {}) });
    setSaveState(ok ? "saved" : "error");
    if (ok) setTimeout(() => setSaveState("idle"), 2000);
  }

  function enterLab() {
    setEntered(true);
    saveProgress({ phase: "lab" });
  }

  /* ----- choice questions ----- */
  async function pick(cp, choiceId) {
    const rec = answers[cp.id] || { attempts: [] };
    if (rec.solved || checking) return;
    setChecking(true);
    let res = null;
    try {
      const r = await fetch("/api/simulation-lab/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, caseStandard, checkpointId: cp.id, choiceId }),
      });
      if (r.ok) res = await r.json();
    } catch (e) {
      res = null;
    }
    setChecking(false);
    if (!res) {
      setAnswers((a) => ({ ...a, [cp.id]: { ...rec, feedback: "Hmm, I couldn’t check that just now. Tap your answer again." } }));
      return;
    }
    const attempts = rec.attempts.includes(choiceId) ? rec.attempts : [...rec.attempts, choiceId];
    if (res.correct) {
      setAnswers((a) => ({ ...a, [cp.id]: { attempts, solved: true, correctId: choiceId, feedback: res.feedback || "Yes!" } }));
    } else {
      setAnswers((a) => ({ ...a, [cp.id]: { attempts, solved: false, feedback: res.feedback || "Look again at your chart.", shake: null } }));
      requestAnimationFrame(() => setAnswers((a) => ({ ...a, [cp.id]: { ...a[cp.id], shake: choiceId } })));
    }
  }

  function toFair() {
    setStep(2);
    setSpotlight(false);
    say(cfg.sam.fairTest());
    openSheet("fair");
  }
  function toTwist() {
    closeSheet();
    setStep(3);
    setSpotlight(false);
    if (engineRef.current) engineRef.current.startTwist();
  }

  /* ----- submit ----- */
  async function send() {
    setSubmit({ state: "sending", error: null, cleanRun: false });
    const varId = cfg.variable.id;
    const trialLogs = toTrialLogs(runs, varId);
    const r2first = runs.find((r) => r.round === 2);
    const checkpointResults = [cfg.pattern, cfg.fairTest].map((cp) => {
      const rec = answers[cp.id] || { attempts: [] };
      return { id: cp.id, type: cp.type, submittedChoiceId: rec.attempts[0] || null, attemptChoiceIds: rec.attempts };
    });
    try {
      const res = await fetch("/api/simulation-lab/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          roundTrialLogs: trialLogs,
          checkpointResults,
          // Scene cases have no separate data-table step: the Round 2
          // given-setting prediction plays that role (the server re-derives
          // this from roundTrialLogs rather than trusting it).
          dataTableResults: r2first && r2first.pred != null ? [{ settingValue: r2first.setting, submittedValue: r2first.pred, source: "twistPrediction" }] : [],
          finalResponseText: text,
          checklist,
          selfConfidence: confidence,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = await res.json().catch(() => ({}));
      try { localStorage.removeItem(storageKey); } catch (e) { /* ignore */ }
      setSubmit({ state: "done", error: null, cleanRun: !!data.cleanRun });
      closeSheet();
      setSpotlight(false);
      setStep(5);
      if (engineRef.current) {
        engineRef.current.setDone();
        engineRef.current.celebrate();
      }
      say("Mission complete! You found a pattern AND tested it when conditions changed.");
      setBanner({
        kicker: "Mission complete",
        title: "Great science, Cadet!",
        text: `${runs.length} runs · 2 rounds · 1 pattern that held up. Your lab report is on its way to your teacher.`,
        tone: "teal",
        home: true,
        clean: !!data.cleanRun,
      });
    } catch (e) {
      setSubmit({ state: "idle", error: "Couldn’t send just now — nothing is lost. Check your connection and try again.", cleanRun: false });
    }
  }

  /* ----- render ----- */
  const round2 = hud.round === 2;
  const kicker = round2 ? `${cfg.title} · Round 2 · ${cfg.round2.label}` : `${cfg.title} · Round 1`;
  const question = round2 ? cfg.round2.question : cfg.question;
  const sheetOpen = !!sheet;
  const view = sheetView;
  const q = view === "pattern" ? cfg.pattern : view === "fair" ? cfg.fairTest : null;
  const runBtnDisabled = !(hud.canRun || hud.landed);

  return (
    <div className={"slx slx-viewport" + (rm ? " rm" : "")}>
      <div className="slx-app" style={{ transform: `scale(${scale})` }} data-case={cfg.standard}>
        <header className="topbar">
          <div className="brand">
            <Logo />
            <span className="brand-txt">
              <b>ClearCenters</b>
              <small>Simulation Lab</small>
            </span>
          </div>
          <Stepper step={step} />
          <div className="top-actions">
            {submit.state !== "done" && entered && (
              <button type="button" className={"pill" + (saveState === "saved" ? " saved" : "")} onClick={manualSave} disabled={saveState === "saving"}>
                {saveState === "saving" ? "Saving…" : saveState === "saved" ? "✓ Saved" : saveState === "error" ? "Try again" : "Save"}
              </button>
            )}
            <button type="button" className="pill" onClick={() => router.push("/home")}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" /></svg>
              Home
            </button>
          </div>
        </header>

        <main className={"stage" + (sheetOpen ? " asking" : "")}>
          <svg ref={svgRef} className="slx-scene" viewBox="0 0 1366 704" aria-label={`${cfg.title} experiment`} />

          <section className="task card">
            <div className="kicker">{kicker}</div>
            <h1>{question}</h1>
          </section>

          <div className={"sam" + (sam.n ? " talk" : "")} key={"sam" + sam.n}>
            <SamBot samSkin={samSkin} label={samLabel} />
            <div className="sam-bubble" aria-live="polite">
              <span className="sam-name">{samLabel.toUpperCase()}</span>
              <span>{sam.text}</span>
            </div>
          </div>

          <section className={"chart card" + (chartR2 ? " has-r2" : "") + (spotlight ? " spotlight" : "")} aria-label="Your data chart">
            <div className="chart-head">
              <div className="chart-title">Your data</div>
              <div className="legend">
                <span className="lg r1"><i />Round 1</span>
                <span className="lg r2"><i />Round 2 · {cfg.round2.label}</span>
              </div>
            </div>
            <div ref={chartRef} />
          </section>

          <div className={"hud" + (hud.showHud && entered && ready ? "" : " hidden")}>
            <div className="run-info">
              <span className="ri-l">{round2 ? "Twist run" : "Run"} {hud.runNumber} of {hud.runsNeeded}</span>
              <span className="ri-dots">
                {Array.from({ length: hud.runsNeeded }, (_, i) => (
                  <i key={i} className={i < hud.runsDone ? "on r" + hud.round : ""} />
                ))}
              </span>
            </div>
            <button type="button" className={"run-btn" + (hud.landed ? " reset" : "") + (hud.canRun ? " ready" : "")} aria-disabled={String(runBtnDisabled)} onClick={() => engineRef.current && engineRef.current.runButton()}>
              <span className="ic" aria-hidden="true">
                <svg className="ic-go" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
                <svg className="ic-reset" viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4.5 4v4.5H9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="lbl">{hud.landed ? cfg.resetLabel : cfg.runLabel}</span>
            </button>
          </div>

          <div className="dim" />
          <section className={"sheet card" + (view === "explain" ? " tall" : "") + (sheetOpen ? " open" : "") + (q && answers[q.id] && answers[q.id].solved ? " solved" : "")} aria-live="polite">
            {q && (
              <ChoiceBody
                q={q}
                kicker={view === "pattern" ? "Checkpoint · Find the pattern" : "Checkpoint · Fair test"}
                layout={q.choices.length === 4 ? "four" : "three"}
                record={answers[q.id]}
                checking={checking}
                nextLabel={view === "pattern" ? "Next" : "On to Round 2"}
                onPick={(id) => pick(q, id)}
                onNext={view === "pattern" ? toFair : toTwist}
              />
            )}
            {view === "explain" && (
              <ExplainBody
                cfg={cfg}
                text={text}
                setText={setText}
                checklist={checklist}
                toggleCheck={(i) => setChecklist((c) => c.map((v, j) => (j === i ? !v : v)))}
                confidence={confidence}
                setConfidence={setConfidence}
                page={explainPage}
                setPage={setExplainPage}
                submit={submit}
                onSend={() => setSubmit((s) => ({ ...s, state: "confirm", error: null }))}
                onCancel={() => setSubmit((s) => ({ ...s, state: "idle" }))}
                onConfirm={send}
              />
            )}
          </section>

          <div className={"banner card" + (banner ? " show" : "") + (banner && banner.home ? " interactive" : "")} role="status">
            {banner && (
              <>
                <div className={"bn-stripe" + (banner.tone === "teal" ? " teal" : "")} />
                <div className="bn-kicker" style={banner.tone === "teal" ? { color: "var(--teal-d)" } : undefined}>{banner.kicker}</div>
                <div className="bn-title">{banner.title}</div>
                <div className="bn-text">{banner.text}</div>
                {banner.clean && <div className="bn-clean">🌟 Clean run — every checkpoint right on the first try!</div>}
                {banner.home && (
                  <div className="bn-actions">
                    <button type="button" className="btn-primary" onClick={() => router.push("/home")}>
                      Back to Home <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {!entered && (
            <div className="brief-wrap">
              <section className="brief card" aria-label="Mission brief">
                <div className="kicker">Mission Brief · Grade {cfg.grade}</div>
                <h2>{cfg.title}</h2>
                {revisionRequested && (
                  <div className="revision">
                    <b>Your teacher asked you to take another pass.</b>
                    {revisionFeedback}
                  </div>
                )}
                <p>{cfg.framing}</p>
                <div className="q-box">
                  <b>The question</b>
                  <span>{cfg.question}</span>
                </div>
                <div className="brief-foot">
                  <button type="button" className="btn-primary enter-lab" onClick={enterLab}>
                    Enter the Lab <span aria-hidden="true">→</span>
                  </button>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
      <DistressCallBadge assignmentId={assignmentId} />
    </div>
  );
}
