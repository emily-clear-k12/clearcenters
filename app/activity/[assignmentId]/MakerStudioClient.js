"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../../components/BackToHubButton";
import SamGuide from "../../../components/SamGuide";
import { MAKER_MODES } from "../../../lib/cases/maker-studio/modes";
import "./maker-studio.css";

function modeStatus(modes, id) {
  const slot = (modes && modes[id]) || null;
  if (!slot) return "empty";
  return slot.status || "empty";
}

function countDone(modes, enabled) {
  return (enabled || []).filter((id) => modeStatus(modes, id) === "done").length;
}

export default function MakerStudioClient({
  assignmentId,
  publicCase,
  config: configProp,
  existingData,
  alreadySubmitted,
  revisionFeedback,
  samSkin,
  samNickname,
}) {
  const router = useRouter();
  const config = configProp || (publicCase && publicCase.config) || {
    prompt: "Write about today's idea.",
    topic: "",
    enabledModes: ["write"],
    finishN: 1,
    journalOnRelease: true,
  };
  const modesMeta = (publicCase && publicCase.modes && publicCase.modes.length)
    ? publicCase.modes
    : MAKER_MODES.map((m) => ({
        id: m.id,
        label: m.label,
        blurb: m.blurb,
        icon: m.icon,
        available: !!m.live,
        instructions: m.instructions || null,
        doneHint: m.doneHint || null,
      }));
  const enabled = config.enabledModes || ["write"];
  const finishN = Math.max(1, Number(config.finishN) || 1);
  // Quieter studio: show only modes the teacher assigned — do not render the rest as disabled.
  const visibleModes = modesMeta.filter((m) => enabled.includes(m.id));

  const saved = existingData && existingData.version === 2 ? existingData : { version: 2, modes: {} };
  const [view, setView] = useState(alreadySubmitted ? "done" : "main");
  const [modes, setModes] = useState(() => saved.modes || {});
  const [writeText, setWriteText] = useState(() => ((saved.modes || {}).write || {}).text || "");
  const [status, setStatus] = useState("Pick Write to start your piece.");
  const [busy, setBusy] = useState(false);
  const [saveState, setSaveState] = useState("saved");
  const [submitted, setSubmitted] = useState(!!alreadySubmitted);
  const autosaveTimer = useRef(null);
  const writeDirty = useRef(false);

  const doneCount = useMemo(() => countDone(modes, enabled), [modes, enabled]);
  const canSubmit = doneCount >= finishN && !submitted;

  const send = useCallback(
    async (kind, extra = {}) => {
      setBusy(true);
      try {
        const response = await fetch("/api/maker-studio/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignmentId,
            kind,
            modes,
            writeText,
            ...extra,
          }),
        });
        return await response.json().catch(() => ({}));
      } finally {
        setBusy(false);
      }
    },
    [assignmentId, modes, writeText]
  );

  // Autosave while on Write page
  useEffect(() => {
    if (view !== "write" || submitted) return undefined;
    if (!writeDirty.current) return undefined;
    setSaveState("saving");
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      const nextModes = {
        ...modes,
        write: {
          status: writeText.trim() ? "in_progress" : "empty",
          text: writeText,
          updatedAt: new Date().toISOString(),
        },
      };
      setModes(nextModes);
      const data = await fetch("/api/maker-studio/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          kind: "save",
          modes: nextModes,
          writeText,
        }),
      }).then((r) => r.json().catch(() => ({})));
      if (data && data.ok) {
        writeDirty.current = false;
        setSaveState("saved");
      } else {
        setSaveState("error");
      }
    }, 900);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [writeText, view, submitted, assignmentId, modes]);

  function openMode(id) {
    if (submitted) return;
    const meta = modesMeta.find((m) => m.id === id);
    const isEnabled = enabled.includes(id);
    const isLive = meta && meta.available;
    if (!isEnabled || !isLive) return;
    if (id === "write") {
      setWriteText(((modes.write || {}).text) || "");
      writeDirty.current = false;
      setSaveState("saved");
      setView("write");
      setStatus("Write your answer. It saves as you go.");
    }
  }

  async function markWriteDone() {
    if (!writeText.trim()) {
      setStatus("Write something first, then tap Done.");
      return;
    }
    const nextModes = {
      ...modes,
      write: {
        status: "done",
        text: writeText,
        updatedAt: new Date().toISOString(),
      },
    };
    setModes(nextModes);
    writeDirty.current = false;
    const data = await send("save", { modes: nextModes, writeText });
    if (data && data.ok === false) {
      setStatus(data.message || "Could not save. Try again.");
      return;
    }
    setView("main");
    setStatus("Write is done. Head back when you are ready to submit.");
  }

  async function saveWriteDraft() {
    const nextModes = {
      ...modes,
      write: {
        status: writeText.trim() ? "in_progress" : "empty",
        text: writeText,
        updatedAt: new Date().toISOString(),
      },
    };
    setModes(nextModes);
    writeDirty.current = false;
    await send("save", { modes: nextModes, writeText });
    setView("main");
    setStatus(writeText.trim() ? "Saved. You can finish Write anytime." : "Back to your studio.");
  }

  async function submitAll() {
    if (!canSubmit) {
      setStatus(`Finish ${finishN} mode${finishN === 1 ? "" : "s"} before you submit.`);
      return;
    }
    const data = await send("turnin");
    if (data && data.need) {
      setStatus(data.message || "Finish a few more pieces first.");
      return;
    }
    if (data && data.error) {
      setStatus(data.error);
      return;
    }
    setSubmitted(true);
    setView("done");
    setStatus("Submitted. Your teacher will read your work.");
  }

  const title = (publicCase && publicCase.title) || "Maker Studio";
  const topicLine = config.topic ? config.topic : null;

  if (view === "done" || submitted) {
    return (
      <div className="mk-page">
        <BackToHubButton />
        <div className="mk-shell">
          <div className="mk-top">
            <div>
              <p className="mk-kicker">Maker Studio</p>
              <h1>{title}</h1>
            </div>
            <span className="mk-progress">
              {doneCount}/{finishN} done
            </span>
          </div>
          <div className="mk-panel mk-done-banner">
            <h2>Nice work — it is in.</h2>
            <p className="mk-quiet">Your teacher will look at your pieces. This is not scored by a robot.</p>
            {revisionFeedback ? (
              <p className="mk-quiet" style={{ marginTop: 12 }}>
                Teacher note: {revisionFeedback}
              </p>
            ) : null}
            <div style={{ marginTop: 18 }}>
              <button type="button" className="mk-next" onClick={() => router.push("/home")}>
                Back to hub
              </button>
            </div>
          </div>
          <SamGuide
            skinKey={samSkin}
            alt={samNickname || "S.A.M."}
            size={96}
            anchors={{ home: { right: 16, bottom: 16 } }}
            line={"Your teacher gets your pieces next. Proud of you."}
            state={submitted || view === "done" ? "celebrating" : "helping"}
          />
        </div>
      </div>
    );
  }

  if (view === "write") {
    const writeMeta = modesMeta.find((m) => m.id === "write") || {};
    return (
      <div className="mk-page">
        <BackToHubButton />
        <div className="mk-shell">
          <div className="mk-top">
            <div>
              <p className="mk-kicker">Write</p>
              <h1>Make your piece</h1>
            </div>
            <button type="button" className="mk-ghost" onClick={saveWriteDraft} disabled={busy}>
              Back to studio
            </button>
          </div>

          <div className="mk-card">
            <h2>Your prompt</h2>
            <p>{config.prompt}</p>
          </div>

          <div className="mk-panel mk-write">
            <h2>Write</h2>
            <p className="mk-quiet">{writeMeta.instructions || "Write your answer in your own words."}</p>
            <div className="mk-field">
              <label htmlFor="mk-write-box">Your writing</label>
              <textarea
                id="mk-write-box"
                value={writeText}
                onChange={(e) => {
                  writeDirty.current = true;
                  setWriteText(e.target.value);
                }}
                placeholder="Start writing here…"
                disabled={busy}
              />
            </div>
            <div className="mk-save-row">
              <span className={`mk-pill${saveState === "error" ? " warn" : ""}`}>
                {saveState === "saving" ? "Saving…" : saveState === "error" ? "Save failed — keep typing" : "Saved"}
              </span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button type="button" className="mk-ghost" onClick={saveWriteDraft} disabled={busy}>
                  Save & back
                </button>
                <button type="button" className="mk-next" onClick={markWriteDone} disabled={busy || !writeText.trim()}>
                  Done
                </button>
              </div>
            </div>
            <p className="mk-quiet" style={{ marginTop: 10 }}>
              {writeMeta.doneHint || "Tap Done when this piece feels finished."}
            </p>
          </div>

          <p className="mk-quiet">{status}</p>
          <SamGuide
            skinKey={samSkin}
            alt={samNickname || "S.A.M."}
            size={96}
            anchors={{ home: { right: 16, bottom: 16 } }}
            line={"Write it like you would tell a friend. Clear beats fancy."}
            state={submitted || view === "done" ? "celebrating" : "helping"}
          />
        </div>
      </div>
    );
  }

  // Main studio page
  return (
    <div className="mk-page">
      <BackToHubButton />
      <div className="mk-shell">
        <div className="mk-top">
          <div>
            <p className="mk-kicker">{(publicCase && publicCase.kicker) || "Maker Studio"}</p>
            <h1>{title}</h1>
            {topicLine ? <p className="mk-quiet" style={{ marginTop: 4 }}>{topicLine}</p> : null}
          </div>
          <span className="mk-progress">
            {doneCount}/{finishN} done
          </span>
        </div>

        {revisionFeedback ? (
          <div className="mk-card" style={{ borderLeftColor: "#f97316" }}>
            <h2>Teacher sent this back</h2>
            <p>{revisionFeedback}</p>
          </div>
        ) : null}

        <div className="mk-card">
          <h2>Your job</h2>
          <p>{config.prompt}</p>
          <p className="mk-quiet" style={{ marginTop: 10 }}>
            Finish {finishN} mode{finishN === 1 ? "" : "s"}, then tap Submit. Your teacher reads your work.
          </p>
        </div>

        <div className="mk-panel">
          <h2>Make modes</h2>
          <p className="mk-quiet">
            {visibleModes.length === 1 && visibleModes[0].id === "write"
              ? "Tap Write to begin."
              : "Tap a mode to begin."}
          </p>
          <div className="mk-grid" role="list">
            {visibleModes.map((m) => {
              const isLive = !!m.available;
              const st = modeStatus(modes, m.id);
              const className = [
                "mk-mode",
                st === "done" ? "is-done" : "",
                st === "in_progress" ? "is-progress" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  key={m.id}
                  type="button"
                  className={className}
                  disabled={!isLive || submitted}
                  onClick={() => openMode(m.id)}
                  aria-label={m.label}
                >
                  <span className="mk-mode-icon" aria-hidden>
                    {m.icon || "•"}
                  </span>
                  <b>{m.label}</b>
                  <span>{m.blurb}</span>
                  {st === "done" ? <span className="mk-mode-status">Done</span> : null}
                  {st === "in_progress" ? <span className="mk-mode-status">Started</span> : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mk-foot">
          <p className="mk-quiet" style={{ margin: 0 }}>
            {status}
          </p>
          <button type="button" className="mk-check" disabled={!canSubmit || busy} onClick={submitAll}>
            Submit
          </button>
        </div>

        <SamGuide
            skinKey={samSkin}
            alt={samNickname || "S.A.M."}
            size={96}
            anchors={{ home: { right: 16, bottom: 16 } }}
            line={(publicCase && publicCase.samOpen) || "Tap Write. Make your piece. Submit when the counter says you are ready."}
            state={submitted || view === "done" ? "celebrating" : "helping"}
          />
      </div>
    </div>
  );
}
