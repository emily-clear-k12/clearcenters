"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./broadcast-booth.css";
import { CLIP_CAP_SEC, MIN_CLIP_SEC } from "../../../lib/cases/broadcast-booth/catalog";

function emptyBeat() {
  return {
    status: "empty",
    audioDataUrl: null,
    mimeType: null,
    durationSec: 0,
    stillDataUrl: null,
    transcript: "",
    updatedAt: null,
  };
}

function hydrateBeats(existing, beatDefs) {
  const prior = (existing && existing.beats) || {};
  const out = {};
  for (const b of beatDefs) {
    const slot = prior[b.id];
    out[b.id] = slot && typeof slot === "object" ? { ...emptyBeat(), ...slot } : emptyBeat();
  }
  return out;
}

function firstOpenBeatIndex(beats, beatDefs) {
  for (let i = 0; i < beatDefs.length; i++) {
    const s = beats[beatDefs[i].id];
    if (!s || s.status !== "done" || !s.audioDataUrl) return i;
  }
  return beatDefs.length;
}

export default function BroadcastBoothClient({
  assignmentId,
  publicCase,
  config,
  existingData,
  alreadySubmitted,
  revisionFeedback,
}) {
  const beatDefs = useMemo(() => {
    const list = (publicCase && publicCase.beats) || [];
    return list.length ? list : [];
  }, [publicCase]);

  const clipCap = (publicCase && publicCase.clipCapSec) || CLIP_CAP_SEC;
  const minClip = (publicCase && publicCase.minClipSec) || MIN_CLIP_SEC;

  const [view, setView] = useState(() => {
    if (alreadySubmitted) return "done";
    if (existingData && existingData.stimulusReady) {
      const defs = beatDefs.length ? beatDefs : [{ id: "hook" }];
      const beats0 = hydrateBeats(existingData, defs);
      const idx = firstOpenBeatIndex(beats0, defs);
      if (idx >= defs.length) return "playback";
      return "beat";
    }
    if (publicCase && publicCase.cover) return "cover";
    return "stimulus";
  });

  const [stimulusReady, setStimulusReady] = useState(!!(existingData && existingData.stimulusReady));
  const [beats, setBeats] = useState(() => hydrateBeats(existingData, beatDefs));
  const [beatIndex, setBeatIndex] = useState(() => {
    if (!existingData || !existingData.stimulusReady) return 0;
    const hydrated = hydrateBeats(existingData, beatDefs);
    const last = beatDefs.length > 0 ? beatDefs.length - 1 : 0;
    return Math.min(
      last,
      Math.max(0, Number(existingData.currentBeatIndex) || firstOpenBeatIndex(hydrated, beatDefs))
    );
  });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(!!alreadySubmitted);
  const [micError, setMicError] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordSec, setRecordSec] = useState(0);
  const [shortClipWarn, setShortClipWarn] = useState(false);
  const [softStillWarn, setSoftStillWarn] = useState(false);

  const mediaStream = useRef(null);
  const mediaRec = useRef(null);
  const recordChunks = useRef([]);
  const recordStartedAt = useRef(0);
  const recordTimer = useRef(null);
  const dirty = useRef(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    if (!beatDefs.length) return;
    setBeats((prev) => {
      const next = { ...prev };
      for (const b of beatDefs) {
        if (!next[b.id]) next[b.id] = emptyBeat();
      }
      return next;
    });
  }, [beatDefs]);

  useEffect(() => {
    return () => {
      if (recordTimer.current) clearInterval(recordTimer.current);
      if (mediaStream.current) mediaStream.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const currentBeat = beatDefs[beatIndex] || null;
  const currentSlot = currentBeat ? beats[currentBeat.id] || emptyBeat() : emptyBeat();
  const doneCount = beatDefs.filter((b) => beats[b.id] && beats[b.id].status === "done" && beats[b.id].audioDataUrl).length;
  const allDone = beatDefs.length > 0 && doneCount >= beatDefs.length;

  async function persist(kind) {
    setSaving(true);
    setStatus(kind === "turnin" ? "Submitting..." : "");
    try {
      const res = await fetch("/api/broadcast-booth/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          kind,
          stimulusReady,
          currentBeatIndex: beatIndex,
          beats,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setSaving(false);
      return { ok: res.ok, data };
    } catch (err) {
      setSaving(false);
      return { ok: false, data: { error: "Network error. Try again." } };
    }
  }

  function scheduleSave() {
    dirty.current = true;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (!dirty.current || submitted) return;
      dirty.current = false;
      persist("save");
    }, 900);
  }


  function speakStimulus() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setStatus("Read aloud is not available on this device.");
      return;
    }
    const stim = publicCase && publicCase.stimulus;
    const parts = [];
    if (stim && stim.title) parts.push(stim.title);
    if (stim && Array.isArray(stim.bullets)) parts.push(...stim.bullets);
    if (config && config.prompt) parts.push("Your prompt: " + config.prompt);
    const text = parts.join(". ");
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  function markReady() {
    setStimulusReady(true);
    setView("beat");
    setBeatIndex(0);
    dirty.current = true;
    scheduleSave();
  }

  async function startRecording() {
    setMicError(null);
    setShortClipWarn(false);
    if (!stimulusReady) {
      setMicError("Finish the field notes and tap I'm ready before recording.");
      return;
    }
    if (typeof window === "undefined" || !navigator.mediaDevices || !window.MediaRecorder) {
      setMicError("This device cannot record audio in the browser.");
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
      rec.onstop = () => {
        const blob = new Blob(recordChunks.current, { type: rec.mimeType || "audio/webm" });
        const durationSec = Math.min(
          clipCap,
          Math.max(0, Math.round((Date.now() - recordStartedAt.current) / 1000))
        );
        if (durationSec < minClip || blob.size < 800) {
          setShortClipWarn(true);
          if (mediaStream.current) {
            mediaStream.current.getTracks().forEach((t) => t.stop());
            mediaStream.current = null;
          }
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = typeof reader.result === "string" ? reader.result : null;
          if (!currentBeat) return;
          setBeats((prev) => ({
            ...prev,
            [currentBeat.id]: {
              ...(prev[currentBeat.id] || emptyBeat()),
              status: "in_progress",
              audioDataUrl: dataUrl,
              mimeType: blob.type || rec.mimeType || "audio/webm",
              durationSec,
              transcript: (prev[currentBeat.id] && prev[currentBeat.id].transcript) || "",
              updatedAt: new Date().toISOString(),
            },
          }));
          scheduleSave();
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
        if (elapsed >= clipCap) stopRecording();
      }, 250);
    } catch (err) {
      setMicError("Microphone access was denied or unavailable. Allow the mic, then try again.");
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
      try { mediaRec.current.stop(); } catch (_) { /* ignore */ }
    }
  }

  function onStillUpload(file) {
    if (!file || !currentBeat) return;
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
        setBeats((prev) => ({
          ...prev,
          [currentBeat.id]: {
            ...(prev[currentBeat.id] || emptyBeat()),
            stillDataUrl: reader.result,
            updatedAt: new Date().toISOString(),
          },
        }));
        setSoftStillWarn(false);
        scheduleSave();
      }
    };
    reader.readAsDataURL(file);
  }

  function markBeatDone() {
    if (!currentBeat) return;
    const slot = beats[currentBeat.id];
    if (!slot || !slot.audioDataUrl) {
      setStatus("Record a clip for this beat first.");
      return;
    }
    if (currentBeat.stillRequired && !slot.stillDataUrl) setSoftStillWarn(true);
    setBeats((prev) => ({
      ...prev,
      [currentBeat.id]: {
        ...(prev[currentBeat.id] || emptyBeat()),
        status: "done",
        updatedAt: new Date().toISOString(),
      },
    }));
    dirty.current = true;
    const next = beatIndex + 1;
    if (next >= beatDefs.length) setView("playback");
    else setBeatIndex(next);
    scheduleSave();
  }

  function goToBeat(i) {
    if (submitted || !stimulusReady) return;
    setBeatIndex(i);
    setView("beat");
    setStatus("");
    setSoftStillWarn(false);
    setShortClipWarn(false);
  }

  async function handleSubmit() {
    if (!allDone) {
      setStatus("Record all " + beatDefs.length + " beats before you submit.");
      return;
    }
    const missing = beatDefs.filter(
      (b) => b.stillRequired && beats[b.id] && beats[b.id].audioDataUrl && !beats[b.id].stillDataUrl
    );
    if (missing.length) {
      setSoftStillWarn(true);
      setStatus("Tip: " + missing.map((m) => m.label).join(" & ") + " usually need a still. You can still submit.");
    }
    const { ok, data } = await persist("turnin");
    if (!ok) {
      setStatus((data && (data.message || data.error)) || "Could not submit.");
      return;
    }
    setSubmitted(true);
    setView("done");
    setStatus("Submitted. Your teacher will listen to your broadcast.");
  }


  if (!publicCase || !beatDefs.length) {
    return (
      <div className="bb-root">
        <div className="bb-shell">
          <div className="bb-card bb-empty">
            <h1 className="bb-title">Broadcast case missing</h1>
            <p className="bb-muted">This Broadcast Booth case is not loaded yet. Ask your teacher to check the assignment.</p>
          </div>
        </div>
      </div>
    );
  }

  const prompt = (config && config.prompt) || publicCase.prompt || "";
  const stim = publicCase.stimulus;

  return (
    <div className="bb-root">
      <div className="bb-shell">
        <div className="bb-kicker">{publicCase.kicker || "Broadcast Booth"}</div>
        <h1 className="bb-title">{publicCase.title}</h1>
        <p className="bb-progress">
          {publicCase.segmentLabel || "Explain it live"} · {doneCount}/{beatDefs.length} beats · ~{publicCase.estimatedMinutes || 28} min
        </p>

        {revisionFeedback ? <div className="bb-warn">Teacher note: {revisionFeedback}</div> : null}

        {view === "cover" && publicCase.cover ? (
          <div className="bb-card">
            <div className="bb-cue">{publicCase.cover.headline}</div>
            <p className="bb-muted">{publicCase.cover.line}</p>
            <p className="bb-muted" style={{ marginTop: 10 }}>
              No student faces. No video editor. Just your voice and optional stills.
            </p>
            <div className="bb-row" style={{ marginTop: 14 }}>
              <button type="button" className="bb-btn" onClick={() => setView("stimulus")}>Open field kit</button>
            </div>
          </div>
        ) : null}

        {view === "stimulus" ? (
          <div className="bb-card">
            <div className="bb-cue">{(stim && stim.title) || "Field notes"}</div>
            <p className="bb-muted">Read these notes (or tap Read aloud). Recorder stays locked until you are ready.</p>
            {stim && Array.isArray(stim.bullets) ? (
              <ul className="bb-bullets">
                {stim.bullets.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="bb-muted">No stimulus bullets on this case.</p>
            )}
            <div className="bb-card" style={{ marginTop: 12, background: "#F3EFFC" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Your prompt</div>
              <p className="bb-muted" style={{ margin: 0 }}>{prompt}</p>
            </div>
            <div className="bb-row" style={{ marginTop: 14 }}>
              <button type="button" className="bb-btn secondary" onClick={speakStimulus}>Read aloud</button>
              <button type="button" className="bb-btn teal" onClick={markReady}>I&apos;m ready</button>
            </div>
            {!stimulusReady ? (
              <p className="bb-muted" style={{ marginTop: 10 }}>Recorder is locked until you tap I&apos;m ready.</p>
            ) : null}
          </div>
        ) : null}

        {(view === "beat" || view === "playback") && stimulusReady ? (
          <div className="bb-beat-rail" role="list">
            {beatDefs.map((b, i) => {
              const slot = beats[b.id];
              const done = slot && slot.status === "done" && slot.audioDataUrl;
              const active = view === "beat" && i === beatIndex;
              return (
                <button
                  key={b.id}
                  type="button"
                  role="listitem"
                  className={"bb-beat-chip" + (done ? " is-done" : "") + (active ? " is-active" : "")}
                  onClick={() => goToBeat(i)}
                  disabled={submitted}
                >
                  {i + 1}. {b.label}{done ? " ✓" : ""}
                </button>
              );
            })}
          </div>
        ) : null}

        {view === "beat" && currentBeat ? (
          <div className="bb-card">
            <div className="bb-cue">Beat {beatIndex + 1}: {currentBeat.label}</div>
            <p className="bb-muted">{currentBeat.cue}</p>
            <p className="bb-muted" style={{ marginTop: 6 }}>Up to {clipCap} seconds. Re-record anytime before you submit.</p>

            {micError ? <div className="bb-err">{micError}</div> : null}
            {shortClipWarn ? (
              <div className="bb-warn">That clip was too short or silent. Hold the mic closer and try a longer take.</div>
            ) : null}
            {softStillWarn && currentBeat.stillRequired ? (
              <div className="bb-warn">This beat usually needs a still (photo or drawing). You can add one or continue.</div>
            ) : null}

            <div className="bb-row" style={{ marginTop: 12 }}>
              {!recording ? (
                <button type="button" className="bb-btn" onClick={startRecording} disabled={!stimulusReady || submitted}>
                  {currentSlot.audioDataUrl ? "Record again" : "Record"}
                </button>
              ) : (
                <button type="button" className="bb-btn danger" onClick={stopRecording}>
                  Stop · {recordSec}s / {clipCap}s
                </button>
              )}
              <label className="bb-btn secondary" style={{ cursor: "pointer" }}>
                {currentSlot.stillDataUrl ? "Change still" : (currentBeat.stillRequired ? "Add still" : "Optional still")}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  disabled={submitted}
                  onChange={(e) => onStillUpload(e.target.files && e.target.files[0])}
                />
              </label>
            </div>

            {currentSlot.audioDataUrl ? <audio className="bb-audio" controls src={currentSlot.audioDataUrl} /> : null}
            {currentSlot.stillDataUrl ? <img className="bb-still" src={currentSlot.stillDataUrl} alt="Beat still" /> : null}

            <div className="bb-row" style={{ marginTop: 14 }}>
              <button
                type="button"
                className="bb-btn gold"
                onClick={markBeatDone}
                disabled={!currentSlot.audioDataUrl || recording || submitted}
              >
                {beatIndex >= beatDefs.length - 1 ? "Save beat · Review all" : "Save beat · Next"}
              </button>
              {beatIndex > 0 ? (
                <button type="button" className="bb-btn secondary" onClick={() => goToBeat(beatIndex - 1)} disabled={recording}>
                  Back
                </button>
              ) : null}
            </div>
            {status ? <p className="bb-muted" style={{ marginTop: 10 }}>{status}</p> : null}
            {saving ? <p className="bb-muted">Saving...</p> : null}
          </div>
        ) : null}

        {view === "playback" ? (
          <div className="bb-card">
            <div className="bb-cue">Full playback</div>
            <p className="bb-muted">Listen to your whole broadcast. Re-record any beat, then submit.</p>
            {beatDefs.map((b, i) => {
              const slot = beats[b.id] || emptyBeat();
              return (
                <div key={b.id} style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(140,82,242,.15)" }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    {i + 1}. {b.label}{slot.audioDataUrl ? "" : " — missing"}
                  </div>
                  {slot.audioDataUrl ? <audio className="bb-audio" controls src={slot.audioDataUrl} /> : null}
                  {slot.stillDataUrl ? <img className="bb-still" src={slot.stillDataUrl} alt="" /> : null}
                  <button type="button" className="bb-btn secondary" style={{ marginTop: 8 }} onClick={() => goToBeat(i)} disabled={submitted}>
                    Re-record
                  </button>
                </div>
              );
            })}
            <div className="bb-row" style={{ marginTop: 16 }}>
              <button type="button" className="bb-btn" onClick={handleSubmit} disabled={!allDone || saving || submitted}>
                Submit broadcast
              </button>
            </div>
            {status ? <p className="bb-muted" style={{ marginTop: 10 }}>{status}</p> : null}
          </div>
        ) : null}

        {view === "done" ? (
          <div className="bb-card bb-empty">
            <div className="bb-cue">Broadcast submitted</div>
            <p className="bb-muted">Nice work. Your teacher will listen to each beat.</p>
            {beatDefs.map((b) => {
              const slot = beats[b.id];
              if (!slot || !slot.audioDataUrl) return null;
              return (
                <div key={b.id} style={{ marginTop: 10, textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{b.label}</div>
                  <audio className="bb-audio" controls src={slot.audioDataUrl} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
