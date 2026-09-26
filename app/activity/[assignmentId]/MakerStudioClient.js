"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../../components/BackToHubButton";
import SamGuide from "../../../components/SamGuide";
import { MAKER_MODES } from "../../../lib/cases/maker-studio/modes";
import MakerDrawPad from "./MakerDrawPad";
import "./maker-studio.css";

const VOICE_CAP_SEC = 90;
const DIAGRAM_CHIPS = ["Part", "Step 1", "Step 2", "Cause", "Effect", "Result"];
const LIVE_MODE_IDS = new Set(["write", "sketch", "diagram", "poster", "comic", "voice"]);

function modeStatus(modes, id) {
  const slot = (modes && modes[id]) || null;
  if (!slot) return "empty";
  return slot.status || "empty";
}

function countDone(modes, enabled) {
  return (enabled || []).filter((id) => modeStatus(modes, id) === "done").length;
}

function emptyComicPanels(n) {
  return Array.from({ length: n }, () => ({ imageDataUrl: null, text: "" }));
}

function modeHasContent(id, draft) {
  if (!draft) return false;
  if (id === "write") return !!(draft.text || "").trim();
  if (id === "sketch") return !!draft.imageDataUrl;
  if (id === "diagram") return !!(draft.imageDataUrl || (draft.caption || "").trim());
  if (id === "poster") {
    return !!(
      (draft.title || "").trim() ||
      (draft.caption || "").trim() ||
      draft.imageDataUrl
    );
  }
  if (id === "comic") {
    return (draft.panels || []).some(
      (p) => p && (p.imageDataUrl || (p.text || "").trim())
    );
  }
  if (id === "voice") return !!draft.audioDataUrl;
  return false;
}

function modeReadyForDone(id, draft) {
  if (id === "write") return !!(draft.text || "").trim();
  if (id === "sketch") return !!draft.imageDataUrl;
  if (id === "diagram") return !!draft.imageDataUrl;
  if (id === "poster") {
    return !!(draft.title || "").trim() && !!draft.imageDataUrl;
  }
  if (id === "comic") {
    const panels = draft.panels || [];
    return (
      panels.length >= 2 &&
      panels.every((p) => p && (p.imageDataUrl || (p.text || "").trim()))
    );
  }
  if (id === "voice") return !!draft.audioDataUrl;
  return false;
}

function buildSlot(id, draft, status) {
  const updatedAt = new Date().toISOString();
  if (id === "write") {
    return { status, text: draft.text || "", updatedAt };
  }
  if (id === "sketch") {
    return { status, imageDataUrl: draft.imageDataUrl || null, updatedAt };
  }
  if (id === "diagram") {
    return {
      status,
      imageDataUrl: draft.imageDataUrl || null,
      caption: draft.caption || "",
      updatedAt,
    };
  }
  if (id === "poster") {
    return {
      status,
      title: draft.title || "",
      caption: draft.caption || "",
      imageDataUrl: draft.imageDataUrl || null,
      updatedAt,
    };
  }
  if (id === "comic") {
    return {
      status,
      panels: (draft.panels || []).map((p) => ({
        imageDataUrl: (p && p.imageDataUrl) || null,
        text: (p && p.text) || "",
      })),
      panelCount: (draft.panels || []).length,
      updatedAt,
    };
  }
  if (id === "voice") {
    return {
      status,
      audioDataUrl: draft.audioDataUrl || null,
      mimeType: draft.mimeType || null,
      durationSec: draft.durationSec || 0,
      updatedAt,
    };
  }
  return { status, updatedAt };
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
  // Submit when every enabled mode is Done. finishN mirrors enabled.length (no teacher Finish N).
  const finishN = Math.max(1, enabled.length || Number(config.finishN) || 1);
  // Only assigned ∩ live modes — never show broken unbuilt buttons.
  const visibleModes = modesMeta.filter(
    (m) => enabled.includes(m.id) && (m.available || LIVE_MODE_IDS.has(m.id))
  );

  const saved = existingData && existingData.version === 2 ? existingData : { version: 2, modes: {} };
  const [view, setView] = useState(alreadySubmitted ? "done" : "main");
  const [modes, setModes] = useState(() => saved.modes || {});
  const [draft, setDraft] = useState(null);
  const [activeMode, setActiveMode] = useState(null);
  const [status, setStatus] = useState("Pick a mode to start your piece.");
  const [busy, setBusy] = useState(false);
  const [saveState, setSaveState] = useState("saved");
  const [submitted, setSubmitted] = useState(!!alreadySubmitted);
  const [voiceError, setVoiceError] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordSec, setRecordSec] = useState(0);
  const autosaveTimer = useRef(null);
  const dirty = useRef(false);
  const mediaRec = useRef(null);
  const mediaStream = useRef(null);
  const recordTimer = useRef(null);
  const recordChunks = useRef([]);
  const recordStartedAt = useRef(0);

  const doneCount = useMemo(() => countDone(modes, enabled), [modes, enabled]);
  const canSubmit = doneCount >= finishN && !submitted;

  const persist = useCallback(
    async (kind, nextModes) => {
      setBusy(true);
      try {
        const response = await fetch("/api/maker-studio/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignmentId,
            kind,
            modes: nextModes,
          }),
        });
        return await response.json().catch(() => ({}));
      } finally {
        setBusy(false);
      }
    },
    [assignmentId]
  );

  // Autosave while editing a mode
  useEffect(() => {
    if (!activeMode || view !== "mode" || submitted || !draft) return undefined;
    if (!dirty.current) return undefined;
    setSaveState("saving");
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      const statusNext = modeHasContent(activeMode, draft) ? "in_progress" : "empty";
      const nextModes = {
        ...modes,
        [activeMode]: buildSlot(activeMode, draft, statusNext),
      };
      setModes(nextModes);
      const data = await fetch("/api/maker-studio/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, kind: "save", modes: nextModes }),
      }).then((r) => r.json().catch(() => ({})));
      if (data && data.ok) {
        dirty.current = false;
        setSaveState("saved");
      } else {
        setSaveState("error");
      }
    }, 1000);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [draft, activeMode, view, submitted, assignmentId, modes]);

  useEffect(() => {
    return () => {
      stopRecordingCleanup();
    };
  }, []);

  function stopRecordingCleanup() {
    if (recordTimer.current) {
      clearInterval(recordTimer.current);
      recordTimer.current = null;
    }
    if (mediaRec.current && mediaRec.current.state !== "inactive") {
      try {
        mediaRec.current.stop();
      } catch (_) {
        /* ignore */
      }
    }
    mediaRec.current = null;
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((t) => t.stop());
      mediaStream.current = null;
    }
  }

  function openMode(id) {
    if (submitted) return;
    const meta = modesMeta.find((m) => m.id === id);
    const isEnabled = enabled.includes(id);
    const isLive = (meta && meta.available) || LIVE_MODE_IDS.has(id);
    if (!isEnabled || !isLive) return;
    const slot = modes[id] || {};
    let nextDraft;
    if (id === "write") {
      nextDraft = { text: slot.text || "" };
    } else if (id === "sketch") {
      nextDraft = { imageDataUrl: slot.imageDataUrl || null };
    } else if (id === "diagram") {
      nextDraft = {
        imageDataUrl: slot.imageDataUrl || null,
        caption: slot.caption || "",
      };
    } else if (id === "poster") {
      nextDraft = {
        title: slot.title || "",
        caption: slot.caption || "",
        imageDataUrl: slot.imageDataUrl || null,
      };
    } else if (id === "comic") {
      const panels =
        Array.isArray(slot.panels) && slot.panels.length >= 2
          ? slot.panels.map((p) => ({
              imageDataUrl: (p && p.imageDataUrl) || null,
              text: (p && p.text) || "",
            }))
          : emptyComicPanels(3);
      nextDraft = { panels };
    } else if (id === "voice") {
      nextDraft = {
        audioDataUrl: slot.audioDataUrl || null,
        mimeType: slot.mimeType || null,
        durationSec: slot.durationSec || 0,
      };
      setVoiceError(null);
      setRecording(false);
      setRecordSec(0);
    } else {
      return;
    }
    setDraft(nextDraft);
    setActiveMode(id);
    dirty.current = false;
    setSaveState("saved");
    setView("mode");
    setStatus(`${(meta && meta.label) || id}: make your piece. It saves as you go.`);
  }

  function patchDraft(patch) {
    dirty.current = true;
    setDraft((prev) => ({ ...(prev || {}), ...patch }));
  }

  async function saveModeDraft(andBack) {
    if (!activeMode || !draft) return;
    const statusNext = modeHasContent(activeMode, draft) ? "in_progress" : "empty";
    const nextModes = {
      ...modes,
      [activeMode]: buildSlot(activeMode, draft, statusNext),
    };
    setModes(nextModes);
    dirty.current = false;
    await persist("save", nextModes);
    if (andBack) {
      setView("main");
      setActiveMode(null);
      setDraft(null);
      setStatus(
        modeHasContent(activeMode, draft)
          ? "Saved. You can finish anytime."
          : "Back to your studio."
      );
    }
  }

  async function markModeDone() {
    if (!activeMode || !draft) return;
    if (!modeReadyForDone(activeMode, draft)) {
      setStatus(doneBlockMessage(activeMode));
      return;
    }
    stopRecordingCleanup();
    setRecording(false);
    const nextModes = {
      ...modes,
      [activeMode]: buildSlot(activeMode, draft, "done"),
    };
    setModes(nextModes);
    dirty.current = false;
    const data = await persist("save", nextModes);
    if (data && data.ok === false) {
      setStatus(data.message || "Could not save. Try again.");
      return;
    }
    const label =
      (modesMeta.find((m) => m.id === activeMode) || {}).label || activeMode;
    setView("main");
    setActiveMode(null);
    setDraft(null);
    setStatus(`${label} is done. Head back when you are ready to submit.`);
  }

  function doneBlockMessage(id) {
    if (id === "write") return "Write something first, then tap Done.";
    if (id === "sketch") return "Draw something first, then tap Done.";
    if (id === "diagram") return "Draw your diagram first, then tap Done.";
    if (id === "poster") return "Add a title and a picture, then tap Done.";
    if (id === "comic") return "Fill each panel with a drawing or a line, then tap Done.";
    if (id === "voice") return "Record a voice note first, then tap Done.";
    return "Finish this piece, then tap Done.";
  }

  async function submitAll() {
    if (!canSubmit) {
      setStatus(`Finish every mode before you submit. You have ${doneCount}/${finishN} done.`);
      return;
    }
    const data = await persist("turnin", modes);
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

  async function startRecording() {
    setVoiceError(null);
    if (typeof window === "undefined" || !navigator.mediaDevices || !window.MediaRecorder) {
      setVoiceError("This device cannot record audio in the browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : MediaRecorder.isTypeSupported("audio/mp4")
            ? "audio/mp4"
            : "";
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      mediaRec.current = rec;
      recordChunks.current = [];
      recordStartedAt.current = Date.now();
      rec.ondataavailable = (ev) => {
        if (ev.data && ev.data.size) recordChunks.current.push(ev.data);
      };
      rec.onstop = async () => {
        const blob = new Blob(recordChunks.current, { type: rec.mimeType || "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = typeof reader.result === "string" ? reader.result : null;
          const durationSec = Math.min(
            VOICE_CAP_SEC,
            Math.max(1, Math.round((Date.now() - recordStartedAt.current) / 1000))
          );
          dirty.current = true;
          setDraft((prev) => ({
            ...(prev || {}),
            audioDataUrl: dataUrl,
            mimeType: blob.type || rec.mimeType || "audio/webm",
            durationSec,
          }));
        };
        reader.readAsDataURL(blob);
        if (mediaStream.current) {
          mediaStream.current.getTracks().forEach((t) => t.stop());
          mediaStream.current = null;
        }
      };
      rec.start(250);
      setRecording(true);
      setRecordSec(0);
      if (recordTimer.current) clearInterval(recordTimer.current);
      recordTimer.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - recordStartedAt.current) / 1000);
        setRecordSec(elapsed);
        if (elapsed >= VOICE_CAP_SEC) {
          stopRecording();
        }
      }, 250);
    } catch (err) {
      setVoiceError(
        "Microphone access was denied or unavailable. Allow the mic, or try another device."
      );
      setRecording(false);
    }
  }

  function stopRecording() {
    if (recordTimer.current) {
      clearInterval(recordTimer.current);
      recordTimer.current = null;
    }
    setRecording(false);
    if (mediaRec.current && mediaRec.current.state !== "inactive") {
      try {
        mediaRec.current.stop();
      } catch (_) {
        /* ignore */
      }
    }
  }

  function onPosterUpload(file) {
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      setStatus("Please choose an image file.");
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      setStatus("That image is a bit big — try one under about 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        dirty.current = true;
        setDraft((prev) => ({ ...(prev || {}), imageDataUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
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

  if (view === "mode" && activeMode && draft) {
    const meta = modesMeta.find((m) => m.id === activeMode) || {};
    return (
      <div className="mk-page">
        <BackToHubButton />
        <div className="mk-shell">
          <div className="mk-top">
            <div>
              <p className="mk-kicker">{meta.label || activeMode}</p>
              <h1>Make your piece</h1>
            </div>
            <button type="button" className="mk-ghost" onClick={() => saveModeDraft(true)} disabled={busy}>
              Back to studio
            </button>
          </div>

          <div className="mk-card">
            <h2>Your prompt</h2>
            <p>{config.prompt}</p>
          </div>

          <div className="mk-panel mk-write">
            <h2>{meta.label || activeMode}</h2>
            <p className="mk-quiet">{meta.instructions || "Make your piece."}</p>

            {activeMode === "write" ? (
              <div className="mk-field">
                <label htmlFor="mk-write-box">Your writing</label>
                <textarea
                  id="mk-write-box"
                  value={draft.text || ""}
                  onChange={(e) => patchDraft({ text: e.target.value })}
                  placeholder="Start writing here…"
                  disabled={busy}
                />
              </div>
            ) : null}

            {activeMode === "sketch" ? (
              <MakerDrawPad
                initialImage={draft.imageDataUrl}
                onChange={(url) => patchDraft({ imageDataUrl: url })}
                disabled={busy}
                height={300}
              />
            ) : null}

            {activeMode === "diagram" ? (
              <>
                <MakerDrawPad
                  initialImage={draft.imageDataUrl}
                  onChange={(url) => patchDraft({ imageDataUrl: url })}
                  disabled={busy}
                  height={280}
                  labelChips={DIAGRAM_CHIPS}
                />
                <div className="mk-field">
                  <label htmlFor="mk-diagram-cap">Caption (optional)</label>
                  <input
                    id="mk-diagram-cap"
                    className="mk-input"
                    value={draft.caption || ""}
                    onChange={(e) => patchDraft({ caption: e.target.value })}
                    placeholder="One sentence: how it works…"
                    disabled={busy}
                    maxLength={200}
                  />
                </div>
              </>
            ) : null}

            {activeMode === "poster" ? (
              <>
                <div className="mk-field">
                  <label htmlFor="mk-poster-title">Title</label>
                  <input
                    id="mk-poster-title"
                    className="mk-input"
                    value={draft.title || ""}
                    onChange={(e) => patchDraft({ title: e.target.value })}
                    placeholder="Big headline…"
                    disabled={busy}
                    maxLength={80}
                  />
                </div>
                <div className="mk-field">
                  <label htmlFor="mk-poster-cap">Caption</label>
                  <input
                    id="mk-poster-cap"
                    className="mk-input"
                    value={draft.caption || ""}
                    onChange={(e) => patchDraft({ caption: e.target.value })}
                    placeholder="One short line about the idea…"
                    disabled={busy}
                    maxLength={160}
                  />
                </div>
                <div className="mk-field">
                  <label>Picture — draw or upload</label>
                  <div className="mk-upload-row">
                    <label className="mk-ghost mk-file-btn">
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        disabled={busy}
                        onChange={(e) => {
                          const f = e.target.files && e.target.files[0];
                          onPosterUpload(f);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    {draft.imageDataUrl ? (
                      <button
                        type="button"
                        className="mk-ghost"
                        disabled={busy}
                        onClick={() => patchDraft({ imageDataUrl: null })}
                      >
                        Clear picture
                      </button>
                    ) : null}
                  </div>
                </div>
                {draft.imageDataUrl ? (
                  <div className="mk-poster-preview">
                    <img src={draft.imageDataUrl} alt="Poster artwork" />
                  </div>
                ) : (
                  <MakerDrawPad
                    initialImage={null}
                    onChange={(url) => patchDraft({ imageDataUrl: url })}
                    disabled={busy}
                    height={260}
                  />
                )}
              </>
            ) : null}

            {activeMode === "comic" ? (
              <>
                <div className="mk-comic-count">
                  <span className="mk-quiet">Panels:</span>
                  {[2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`mk-tool${(draft.panels || []).length === n ? " on" : ""}`}
                      disabled={busy}
                      onClick={() => {
                        const cur = draft.panels || [];
                        let next;
                        if (cur.length === n) return;
                        if (cur.length < n) {
                          next = [...cur, ...emptyComicPanels(n - cur.length)];
                        } else {
                          next = cur.slice(0, n);
                        }
                        patchDraft({ panels: next });
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="mk-comic-grid">
                  {(draft.panels || []).map((panel, idx) => (
                    <div key={idx} className="mk-comic-panel">
                      <div className="mk-comic-label">Panel {idx + 1}</div>
                      <MakerDrawPad
                        initialImage={panel.imageDataUrl}
                        onChange={(url) => {
                          const next = (draft.panels || []).map((p, i) =>
                            i === idx ? { ...p, imageDataUrl: url } : p
                          );
                          patchDraft({ panels: next });
                        }}
                        disabled={busy}
                        height={160}
                      />
                      <input
                        className="mk-input"
                        value={panel.text || ""}
                        onChange={(e) => {
                          const next = (draft.panels || []).map((p, i) =>
                            i === idx ? { ...p, text: e.target.value } : p
                          );
                          patchDraft({ panels: next });
                        }}
                        placeholder="Speech / thought…"
                        disabled={busy}
                        maxLength={120}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {activeMode === "voice" ? (
              <div className="mk-voice">
                <div className="mk-voice-row">
                  {!recording ? (
                    <button type="button" className="mk-next" disabled={busy} onClick={startRecording}>
                      {draft.audioDataUrl ? "Record again" : "Record"}
                    </button>
                  ) : (
                    <button type="button" className="mk-next" disabled={busy} onClick={stopRecording}>
                      Stop
                    </button>
                  )}
                  <span className="mk-pill">
                    {recording
                      ? `Recording… ${recordSec}s / ${VOICE_CAP_SEC}s`
                      : draft.audioDataUrl
                        ? `Saved · ~${Math.round(draft.durationSec || 0)}s`
                        : `Up to ${VOICE_CAP_SEC} seconds`}
                  </span>
                </div>
                {voiceError ? <p className="mk-warn">{voiceError}</p> : null}
                {draft.audioDataUrl ? (
                  <audio className="mk-audio" controls src={draft.audioDataUrl} />
                ) : (
                  <p className="mk-quiet">Tap Record, say your idea, then Stop. Replay to check it.</p>
                )}
              </div>
            ) : null}

            <div className="mk-save-row">
              <span className={`mk-pill${saveState === "error" ? " warn" : ""}`}>
                {saveState === "saving" ? "Saving…" : saveState === "error" ? "Save failed — keep going" : "Saved"}
              </span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button type="button" className="mk-ghost" onClick={() => saveModeDraft(true)} disabled={busy}>
                  Save & back
                </button>
                <button
                  type="button"
                  className="mk-next"
                  onClick={markModeDone}
                  disabled={busy || !modeReadyForDone(activeMode, draft)}
                >
                  Done
                </button>
              </div>
            </div>
            <p className="mk-quiet" style={{ marginTop: 10 }}>
              {meta.doneHint || "Tap Done when this piece feels finished."}
            </p>
          </div>

          <p className="mk-quiet">{status}</p>
          <SamGuide
            skinKey={samSkin}
            alt={samNickname || "S.A.M."}
            size={96}
            anchors={{ home: { right: 16, bottom: 16 } }}
            line={"Make it clear. You can save and come back anytime."}
            state="helping"
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
            Finish every mode below, then tap Submit. Your teacher reads your work.
          </p>
        </div>

        <div className="mk-panel">
          <h2>Make modes</h2>
          <p className="mk-quiet">
            {visibleModes.length === 1
              ? `Tap ${visibleModes[0].label} to begin.`
              : "Tap a mode to begin."}
          </p>
          <div className="mk-grid" role="list">
            {visibleModes.map((m) => {
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
                  disabled={submitted}
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
          line={(publicCase && publicCase.samOpen) || "Pick a mode. Make your piece. Submit when the counter says you are ready."}
          state="helping"
        />
      </div>
    </div>
  );
}
