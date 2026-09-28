"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./broadcast-booth.css";
import SubmitReflection from "../../../components/submit/SubmitReflection";
import { ACTIVITY_CHECKS } from "../../../lib/selfCheckLists";
import {
  CLIP_CAP_SEC,
  MIN_CLIP_SEC,
  BRAINSTORM_MIN_EXPLAIN,
  normalizeBrainstormMap,
  brainstormMeetsMinimum,
} from "../../../lib/cases/broadcast-booth/catalog";

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

function placementKey(beatId, chipId, idx) {
  return `${beatId}::${chipId}::${idx}`;
}

function ChipFace({ chip, removeLabel }) {
  if (chip.imageUrl) {
    return (
      <>
        <img className="bb-chip-img" src={chip.imageUrl} alt="" draggable={false} />
        <span className="bb-chip-caption">{chip.label}{removeLabel || ""}</span>
      </>
    );
  }
  return <>{chip.label}{removeLabel || ""}</>;
}


function speakText(text, onUnavailable) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    if (typeof onUnavailable === "function") onUnavailable();
    return;
  }
  const cleaned = String(text || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(cleaned);
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

/** Compact speaker control — icon-first, optional visible label. */
function SpeakButton({ text, label = "Read aloud", showLabel = true, className = "", onUnavailable }) {
  return (
    <button
      type="button"
      className={"bb-speak" + (showLabel ? "" : " bb-speak-icon-only") + (className ? " " + className : "")}
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        speakText(text, onUnavailable);
      }}
    >
      <span className="bb-speak-glyph" aria-hidden="true">🔊</span>
      {showLabel ? <span className="bb-speak-text">{label}</span> : null}
    </button>
  );
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

  const brainstormMin = (publicCase && publicCase.brainstormMin) || BRAINSTORM_MIN_EXPLAIN;
  const stimulusChips = useMemo(
    () => (publicCase && Array.isArray(publicCase.brainstormChips) ? publicCase.brainstormChips : []),
    [publicCase]
  );
  const beatStems = useMemo(
    () => (publicCase && publicCase.beatStems && typeof publicCase.beatStems === "object" ? publicCase.beatStems : {}),
    [publicCase]
  );
  const allStemChips = useMemo(() => {
    const out = [];
    const seen = new Set();
    for (const b of beatDefs) {
      const stems = Array.isArray(beatStems[b.id]) ? beatStems[b.id] : [];
      for (const s of stems) {
        if (!s || !s.id || seen.has(s.id)) continue;
        seen.add(s.id);
        out.push({ ...s, source: s.source || "stem" });
      }
    }
    return out;
  }, [beatDefs, beatStems]);

  const clipCap = (publicCase && publicCase.clipCapSec) || CLIP_CAP_SEC;
  const minClip = (publicCase && publicCase.minClipSec) || MIN_CLIP_SEC;

  const [view, setView] = useState(() => {
    if (alreadySubmitted) return "done";
    if (existingData && existingData.brainstormReady && existingData.stimulusReady) {
      const defs = beatDefs.length ? beatDefs : [{ id: "hook" }];
      const beats0 = hydrateBeats(existingData, defs);
      const idx = firstOpenBeatIndex(beats0, defs);
      if (idx >= defs.length) return "playback";
      return "beat";
    }
    // Merged plan page: after cover (or immediately if no cover)
    if (existingData && existingData.stimulusReady) return "brainstorm";
    if (publicCase && publicCase.cover) return "cover";
    return "brainstorm";
  });

  const [stimulusReady, setStimulusReady] = useState(() => {
    if (existingData && existingData.stimulusReady) return true;
    // No cover → land on plan with stimulus already available
    if (!(publicCase && publicCase.cover)) return true;
    return false;
  });
  const [brainstormReady, setBrainstormReady] = useState(!!(existingData && existingData.brainstormReady));
  const [brainstormMap, setBrainstormMap] = useState(() =>
    normalizeBrainstormMap(existingData && existingData.brainstormMap, beatDefs)
  );
  /** Pending chip from ideas bank (tap chip → tap tray). */
  const [selectedChip, setSelectedChip] = useState(null);
  const [dragChip, setDragChip] = useState(null);

  const [beats, setBeats] = useState(() => hydrateBeats(existingData, beatDefs));
  const [beatIndex, setBeatIndex] = useState(() => {
    if (!existingData || !existingData.stimulusReady || !existingData.brainstormReady) return 0;
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
  const brainstormMapRef = useRef(brainstormMap);
  const brainstormReadyRef = useRef(brainstormReady);
  const stimulusReadyRef = useRef(stimulusReady);
  const beatsRef = useRef(beats);
  const beatIndexRef = useRef(beatIndex);

  useEffect(() => { brainstormMapRef.current = brainstormMap; }, [brainstormMap]);
  useEffect(() => { brainstormReadyRef.current = brainstormReady; }, [brainstormReady]);
  useEffect(() => { stimulusReadyRef.current = stimulusReady; }, [stimulusReady]);
  useEffect(() => { beatsRef.current = beats; }, [beats]);
  useEffect(() => { beatIndexRef.current = beatIndex; }, [beatIndex]);

  useEffect(() => {
    if (!beatDefs.length) return;
    setBeats((prev) => {
      const next = { ...prev };
      for (const b of beatDefs) {
        if (!next[b.id]) next[b.id] = emptyBeat();
      }
      return next;
    });
    setBrainstormMap((prev) => normalizeBrainstormMap(prev, beatDefs));
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
  const mapMeetsMin = brainstormMeetsMinimum(brainstormMap, publicCase, beatDefs);
  const emptyHint = (brainstormMin && brainstormMin.emptyHint) || BRAINSTORM_MIN_EXPLAIN.emptyHint;
  const activePlanChips = currentBeat && Array.isArray(brainstormMap[currentBeat.id])
    ? brainstormMap[currentBeat.id]
    : [];
  const requiredSet = new Set((brainstormMin && brainstormMin.requiredBeatIds) || []);

  async function persist(kind, overrides) {
    setSaving(true);
    setStatus(kind === "turnin" ? "Submitting..." : "");
    const o = overrides || {};
    try {
      const res = await fetch("/api/broadcast-booth/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          kind,
          stimulusReady: o.stimulusReady !== undefined ? o.stimulusReady : stimulusReadyRef.current,
          brainstormReady: o.brainstormReady !== undefined ? o.brainstormReady : brainstormReadyRef.current,
          brainstormMap: o.brainstormMap !== undefined ? o.brainstormMap : brainstormMapRef.current,
          currentBeatIndex: o.currentBeatIndex !== undefined ? o.currentBeatIndex : beatIndexRef.current,
          beats: o.beats !== undefined ? o.beats : beatsRef.current,
          checklist: o.checklist,
          selfConfidence: o.selfConfidence,
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

  function unavailableSpeak() {
    setStatus("Read aloud is not available on this device.");
  }

  function speakStimulus() {
    const stim = publicCase && publicCase.stimulus;
    const parts = [];
    if (stim && stim.title) parts.push(stim.title);
    if (stim && stim.sceneSetter) parts.push(stim.sceneSetter);
    if (stim && stim.placeStill && stim.placeStill.caption) parts.push(stim.placeStill.caption);
    if (stim && stim.artifactCard) {
      parts.push((stim.artifactCard.title || "Artifact") + ". " + (stim.artifactCard.body || ""));
    }
    if (stim && stim.sharedContext) parts.push(stim.sharedContext);
    if (stim && stim.sideBriefs) {
      const a = stim.sideBriefs.sideA;
      const b = stim.sideBriefs.sideB;
      if (a) parts.push((a.label || "Side A") + ". " + (Array.isArray(a.bullets) ? a.bullets.join(". ") : ""));
      if (b) parts.push((b.label || "Side B") + ". " + (Array.isArray(b.bullets) ? b.bullets.join(". ") : ""));
    }
    if (stim && Array.isArray(stim.bullets)) parts.push(...stim.bullets);
    if (config && config.prompt) parts.push("Your prompt: " + config.prompt);
    speakText(parts.filter(Boolean).join(". "), unavailableSpeak);
  }


  /** Cover → combined plan page (stimulus stays visible while placing). */
  function enterPlan() {
    stimulusReadyRef.current = true;
    setStimulusReady(true);
    setView("brainstorm");
    setStatus("");
    dirty.current = true;
    scheduleSave();
  }

  function addChipToTray(beatId, chip) {
    if (!beatId || !chip || !chip.label || submitted) return;
    setBrainstormMap((prev) => {
      const list = Array.isArray(prev[beatId]) ? prev[beatId] : [];
      if (list.length >= 8) return prev;
      if (list.some((c) => c.id === chip.id)) return prev;
      const nextChip = {
        id: chip.id,
        label: chip.label,
        source: chip.source || "stimulus",
      };
      if (chip.imageUrl) nextChip.imageUrl = chip.imageUrl;
      if (chip.imageId) nextChip.imageId = chip.imageId;
      return {
        ...prev,
        [beatId]: [...list, nextChip],
      };
    });
    brainstormReadyRef.current = false;
    setBrainstormReady(false);
    dirty.current = true;
    scheduleSave();
  }

  function removeChipFromTray(beatId, index) {
    if (submitted) return;
    setBrainstormMap((prev) => {
      const list = Array.isArray(prev[beatId]) ? [...prev[beatId]] : [];
      if (index < 0 || index >= list.length) return prev;
      list.splice(index, 1);
      return { ...prev, [beatId]: list };
    });
    brainstormReadyRef.current = false;
    setBrainstormReady(false);
    dirty.current = true;
    scheduleSave();
  }

  function moveChip(fromBeatId, fromIndex, toBeatId) {
    if (!fromBeatId || !toBeatId || fromBeatId === toBeatId || submitted) return;
    setBrainstormMap((prev) => {
      const fromList = Array.isArray(prev[fromBeatId]) ? [...prev[fromBeatId]] : [];
      if (fromIndex < 0 || fromIndex >= fromList.length) return prev;
      const [chip] = fromList.splice(fromIndex, 1);
      const toList = Array.isArray(prev[toBeatId]) ? [...prev[toBeatId]] : [];
      if (toList.length >= 8) return prev;
      if (toList.some((c) => c.id === chip.id)) {
        return { ...prev, [fromBeatId]: fromList };
      }
      return {
        ...prev,
        [fromBeatId]: fromList,
        [toBeatId]: [...toList, chip],
      };
    });
    brainstormReadyRef.current = false;
    setBrainstormReady(false);
    dirty.current = true;
    scheduleSave();
  }

  function finishBrainstorm() {
    if (!mapMeetsMin) {
      setStatus(emptyHint);
      return;
    }
    if (!stimulusReady) {
      stimulusReadyRef.current = true;
      setStimulusReady(true);
    }
    brainstormReadyRef.current = true;
    brainstormMapRef.current = brainstormMap;
    setBrainstormReady(true);
    setSelectedChip(null);
    setView("beat");
    setBeatIndex(0);
    dirty.current = true;
    scheduleSave();
  }

  async function startRecording() {
    setMicError(null);
    setShortClipWarn(false);
    if (!stimulusReady) {
      setMicError("Finish planning your storyboard before recording.");
      return;
    }
    if (!brainstormReady || !mapMeetsMin) {
      setMicError(emptyHint);
      setView("brainstorm");
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
    if (submitted || !stimulusReady || !brainstormReady) return;
    setBeatIndex(i);
    setView("beat");
    setStatus("");
    setSoftStillWarn(false);
    setShortClipWarn(false);
  }

  const [reflecting, setReflecting] = useState(false);

  async function handleSubmit() {
    if (!allDone) {
      setStatus("Record all " + beatDefs.length + " beats before you submit.");
      return;
    }
    if (!brainstormReady || !mapMeetsMin) {
      setStatus(emptyHint);
      setView("brainstorm");
      return;
    }
    const missing = beatDefs.filter(
      (b) => b.stillRequired && beats[b.id] && beats[b.id].audioDataUrl && !beats[b.id].stillDataUrl
    );
    if (missing.length) {
      setSoftStillWarn(true);
      setStatus("Tip: " + missing.map((m) => m.label).join(" & ") + " usually need a still. You can still submit.");
    }
    setReflecting(true);
  }

  async function finishReflection(reflection) {
    const { ok, data } = await persist("turnin", reflection);
    if (!ok) {
      setStatus((data && (data.message || data.error)) || "Could not submit.");
      return;
    }
    setReflecting(false);
    setSubmitted(true);
    setView("done");
    setStatus("Submitted. Your teacher will listen to your broadcast.");
  }

  function onIdeaChipClick(chip) {
    if (submitted) return;
    if (selectedChip && selectedChip.id === chip.id && selectedChip.source === (chip.source || "stimulus")) {
      setSelectedChip(null);
      setStatus("");
      return;
    }
    setSelectedChip({ ...chip, source: chip.source || "stimulus" });
    setStatus("Now tap a beat tray to place it.");
  }

  function onShelfClick(beatId) {
    if (submitted) return;
    if (!selectedChip) {
      setStatus("Tap a chip in the Ideas bank first, then tap a tray.");
      return;
    }
    addChipToTray(beatId, selectedChip);
    setSelectedChip(null);
    setStatus("");
  }

  function onShelfDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function onShelfDrop(e, beatId) {
    e.preventDefault();
    if (submitted) return;
    try {
      const raw = e.dataTransfer.getData("application/json") || e.dataTransfer.getData("text/plain");
      const payload = JSON.parse(raw);
      if (payload && payload.move && payload.fromBeatId != null) {
        moveChip(payload.fromBeatId, payload.fromIndex, beatId);
      } else if (payload && payload.label) {
        addChipToTray(beatId, payload);
      }
    } catch (_) {
      /* ignore bad drag data */
    }
    setDragChip(null);
    setSelectedChip(null);
    setStatus("");
  }

  function startIdeaDrag(e, chip) {
    const payload = JSON.stringify(chip);
    e.dataTransfer.setData("application/json", payload);
    e.dataTransfer.setData("text/plain", payload);
    setDragChip(chip);
  }

  if (!publicCase || !beatDefs.length) {
    return (
      <div className="bb-root">
        <div className="bb-shell">
          <div className="bb-card bb-empty">
            <h1 className="bb-title">Broadcast case missing</h1>
            <p className="bb-muted bb-inline-speak" style={{ justifyContent: "center" }}>
              <span>This Broadcast Booth case is not loaded yet. Ask your teacher to check the assignment.</span>
              <SpeakButton
                text="This Broadcast Booth case is not loaded yet. Ask your teacher to check the assignment."
                showLabel={false}
                label="Read message"
                onUnavailable={() => {}}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }

  const prompt = (config && config.prompt) || publicCase.prompt || "";
  const stim = publicCase.stimulus;
  const planWide = view === "brainstorm" || view === "beat";

  return (
    <div className="bb-root">
      <div className={"bb-shell" + (planWide ? " bb-shell-wide" : "")}>
        <div className="bb-kicker">{publicCase.kicker || "Broadcast Booth"}</div>
        <h1 className="bb-title">{publicCase.title}</h1>
        <p className="bb-progress">
          {publicCase.segmentLabel || "Explain it live"} · {doneCount}/{beatDefs.length} beats · ~{publicCase.estimatedMinutes || 28} min
        </p>

        {revisionFeedback ? <div className="bb-warn">Teacher note: {revisionFeedback}</div> : null}

        {view === "cover" && publicCase.cover ? (
          <div className="bb-card">
            <div className="bb-cue-row">
              <div className="bb-cue">{publicCase.cover.headline}</div>
              <SpeakButton text={(publicCase.cover.headline || "") + ". " + (publicCase.cover.line || "") + ". No student faces. No video editor. Just your voice and optional stills."} onUnavailable={unavailableSpeak} />
            </div>
            <p className="bb-muted">{publicCase.cover.line}</p>
            <p className="bb-muted" style={{ marginTop: 10 }}>
              No student faces. No video editor. Just your voice and optional stills.
            </p>
            <div className="bb-row" style={{ marginTop: 14 }}>
              <button type="button" className="bb-btn" onClick={enterPlan}>Open field kit</button>
            </div>
          </div>
        ) : null}

        {view === "brainstorm" ? (
          <div className="bb-card bb-plan-card">
            <div className="bb-cue-row">
              <div className="bb-cue">Plan your broadcast · storyboard</div>
              <SpeakButton text="Plan your broadcast storyboard. Field notes stay on the left. Tap a chip, then tap a beat tray — or drag chips onto trays. Tap × to remove. No typing." onUnavailable={unavailableSpeak} />
            </div>
            <p className="bb-muted">
              Field notes stay on the left. Tap a chip, then tap a beat tray — or drag chips onto trays. Tap × to remove. No typing.
            </p>
            {!mapMeetsMin ? (
              <div className="bb-warn bb-warn-with-speak">
                <span>{emptyHint}</span>
                <SpeakButton text={emptyHint} showLabel={false} label="Read empty hint" onUnavailable={unavailableSpeak} />
              </div>
            ) : (
              <div className="bb-muted bb-inline-speak" style={{ marginBottom: 8 }}>
                <span>Looks good — you can start recording when ready.</span>
                <SpeakButton text="Looks good — you can start recording when ready." showLabel={false} label="Read status" onUnavailable={unavailableSpeak} />
              </div>
            )}

            <div className="bb-plan-layout">
              <aside className="bb-plan-stimulus" aria-label="Field notes">
                <div className="bb-plan-col-label bb-label-with-speak">
                  <span>Field notes</span>
                  <SpeakButton showLabel={false} label="Read field notes" onUnavailable={unavailableSpeak} text={
                    ((stim && stim.title) || "Field notes") + ". " +
                    ((stim && stim.sceneSetter) ? stim.sceneSetter + ". " : "") +
                    ((stim && stim.sharedContext) ? stim.sharedContext + ". " : "") +
                    ((stim && Array.isArray(stim.bullets)) ? stim.bullets.join(". ") + ". " : "") +
                    "Your prompt: " + prompt
                  } />
                </div>
                <div className="bb-cue" style={{ fontSize: 15 }}>{(stim && stim.title) || "Field notes"}</div>

                {stim && stim.sceneSetter ? (
                  <div className="bb-scene-setter">
                    <div className="bb-tray-label">You are here</div>
                    <p className="bb-muted bb-inline-speak" style={{ margin: "4px 0 8px" }}>
                      <span>{stim.sceneSetter}</span>
                      <SpeakButton text={stim.sceneSetter} showLabel={false} label="Read scene setter" onUnavailable={unavailableSpeak} />
                    </p>
                  </div>
                ) : null}

                {stim && stim.placeStill && stim.placeStill.imageUrl ? (
                  <figure className="bb-place-still">
                    <img src={stim.placeStill.imageUrl} alt="" />
                    {stim.placeStill.caption ? (
                      <figcaption className="bb-inline-speak">
                        <span>{stim.placeStill.caption}</span>
                        <SpeakButton text={stim.placeStill.caption} showLabel={false} label="Read place caption" onUnavailable={unavailableSpeak} />
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}

                {stim && stim.artifactCard ? (
                  <div className="bb-artifact-card">
                    <div className="bb-tray-label">Artifact</div>
                    <div className="bb-artifact-inner">
                      {stim.artifactCard.imageUrl ? (
                        <img className="bb-artifact-img" src={stim.artifactCard.imageUrl} alt="" />
                      ) : null}
                      <div>
                        <div className="bb-label-with-speak" style={{ fontWeight: 700, fontSize: 13 }}>
                          <span>{stim.artifactCard.title || "Artifact card"}</span>
                          <SpeakButton
                            text={(stim.artifactCard.title || "Artifact") + ". " + (stim.artifactCard.body || "")}
                            showLabel={false}
                            label="Read artifact"
                            onUnavailable={unavailableSpeak}
                          />
                        </div>
                        {stim.artifactCard.body ? (
                          <p className="bb-muted" style={{ margin: "4px 0 0", fontSize: 13 }}>{stim.artifactCard.body}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}

                {stim && stim.sharedContext ? (
                  <div className="bb-shared-context">
                    <div className="bb-tray-label">Shared context</div>
                    <p className="bb-muted bb-inline-speak" style={{ margin: "4px 0 8px" }}>
                      <span>{stim.sharedContext}</span>
                      <SpeakButton text={stim.sharedContext} showLabel={false} label="Read shared context" onUnavailable={unavailableSpeak} />
                    </p>
                  </div>
                ) : null}

                {stim && stim.sideBriefs ? (
                  <div className="bb-side-briefs">
                    {["sideA", "sideB"].map((key) => {
                      const brief = stim.sideBriefs[key];
                      if (!brief) return null;
                      const label = brief.label || (key === "sideA" ? "Side A" : "Side B");
                      const bullets = Array.isArray(brief.bullets) ? brief.bullets : [];
                      return (
                        <div key={key} className="bb-side-brief">
                          <div className="bb-label-with-speak" style={{ fontWeight: 700, fontSize: 13 }}>
                            <span>{label}</span>
                            <SpeakButton
                              text={label + ". " + bullets.join(". ")}
                              showLabel={false}
                              label={"Read " + label}
                              onUnavailable={unavailableSpeak}
                            />
                          </div>
                          {bullets.length ? (
                            <ul className="bb-bullets">
                              {bullets.map((line, i) => (
                                <li key={i} className="bb-bullet-with-speak">
                                  <span>{line}</span>
                                  <SpeakButton text={line} showLabel={false} label={"Read: " + line} onUnavailable={unavailableSpeak} />
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {stim && Array.isArray(stim.bullets) && stim.bullets.length ? (
                  <ul className="bb-bullets">
                    {stim.bullets.map((line, i) => (
                      <li key={i} className="bb-bullet-with-speak">
                        <span>{line}</span>
                        <SpeakButton text={line} showLabel={false} label={"Read: " + line} onUnavailable={unavailableSpeak} />
                      </li>
                    ))}
                  </ul>
                ) : null}

                {!stim || (
                  !stim.sceneSetter &&
                  !stim.placeStill &&
                  !stim.artifactCard &&
                  !stim.sharedContext &&
                  !stim.sideBriefs &&
                  !(Array.isArray(stim.bullets) && stim.bullets.length)
                ) ? (
                  <p className="bb-muted bb-inline-speak">
                    <span>No stimulus on this case.</span>
                    <SpeakButton text="No stimulus on this case." showLabel={false} label="Read empty message" onUnavailable={unavailableSpeak} />
                  </p>
                ) : null}

                <div className="bb-prompt-box">
                  <div className="bb-label-with-speak" style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>
                    <span>Your prompt</span>
                    <SpeakButton text={"Your prompt: " + prompt} showLabel={false} label="Read prompt" onUnavailable={unavailableSpeak} />
                  </div>
                  <p className="bb-muted" style={{ margin: 0 }}>{prompt}</p>
                </div>
                <div className="bb-row" style={{ marginTop: 12 }}>
                  <button type="button" className="bb-btn secondary" onClick={speakStimulus}>Read aloud</button>
                </div>
              </aside>

              <div className="bb-plan-right">
                <div className="bb-ideas-bank" aria-label="Ideas bank">
                  <div className="bb-plan-col-label bb-label-with-speak">
                    <span>Ideas bank</span>
                    <SpeakButton
                      showLabel={false}
                      label="Read ideas bank"
                      onUnavailable={unavailableSpeak}
                      text={
                        "Ideas bank. " +
                        stimulusChips
                          .map((c) => c.label)
                          .concat(allStemChips.map((c) => c.label))
                          .filter(Boolean)
                          .join(". ")
                      }
                    />
                  </div>
                  <div className="bb-tray-label">Picture chips</div>
                  <div className="bb-chip-row">
                    {stimulusChips.map((chip) => {
                      const isSel = selectedChip && selectedChip.id === chip.id && (selectedChip.source || "stimulus") !== "stem";
                      return (
                        <button
                          key={chip.id}
                          type="button"
                          className={
                            "bb-chip" +
                            (chip.imageUrl ? " has-image" : "") +
                            (isSel ? " is-picked" : "")
                          }
                          disabled={submitted}
                          draggable={!submitted}
                          onDragStart={(e) => startIdeaDrag(e, chip)}
                          onClick={() => onIdeaChipClick(chip)}
                        >
                          <ChipFace chip={chip} />
                        </button>
                      );
                    })}
                  </div>
                  {allStemChips.length ? (
                    <>
                      <div className="bb-tray-label" style={{ marginTop: 12 }}>Pick-stems</div>
                      <div className="bb-chip-row">
                        {allStemChips.map((chip) => {
                          const isSel = selectedChip && selectedChip.id === chip.id && selectedChip.source === "stem";
                          return (
                            <button
                              key={chip.id}
                              type="button"
                              className={
                                "bb-chip stem" +
                                (chip.imageUrl ? " has-image" : "") +
                                (isSel ? " is-picked" : "")
                              }
                              disabled={submitted}
                              draggable={!submitted}
                              onDragStart={(e) => startIdeaDrag(e, { ...chip, source: "stem" })}
                              onClick={() => onIdeaChipClick({ ...chip, source: "stem" })}
                            >
                              <ChipFace chip={chip} />
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                  {selectedChip ? (
                    <p className="bb-muted bb-inline-speak" style={{ marginTop: 8 }}>
                      <span>
                        Selected: <strong>{selectedChip.label}</strong> — tap a tray below
                      </span>
                      <SpeakButton text={selectedChip.label} showLabel={false} label={"Read chip: " + selectedChip.label} onUnavailable={unavailableSpeak} />
                      {" · "}
                      <button type="button" className="bb-text-btn" onClick={() => { setSelectedChip(null); setStatus(""); }}>
                        Clear
                      </button>
                    </p>
                  ) : null}
                </div>

                <div className="bb-shelves" aria-label="Storyboard beat trays">
                  {beatDefs.map((b) => {
                    const chips = Array.isArray(brainstormMap[b.id]) ? brainstormMap[b.id] : [];
                    const isReq = requiredSet.has(b.id);
                    const filled = chips.length > 0;
                    const awaiting = !!selectedChip;
                    return (
                      <div
                        key={b.id}
                        role="button"
                        tabIndex={0}
                        className={
                          "bb-shelf" +
                          (filled ? " is-filled" : "") +
                          (isReq ? " is-required" : "") +
                          (awaiting ? " is-awaiting" : "") +
                          (dragChip ? " is-droppable" : "")
                        }
                        onClick={() => onShelfClick(b.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onShelfClick(b.id);
                          }
                        }}
                        onDragOver={onShelfDragOver}
                        onDrop={(e) => onShelfDrop(e, b.id)}
                        aria-label={b.label + " tray"}
                      >
                        <div className="bb-shelf-title bb-label-with-speak">
                          <span>{b.label}{isReq ? " *" : ""}</span>
                          <SpeakButton
                            showLabel={false}
                            label={"Read " + b.label + " tray"}
                            onUnavailable={unavailableSpeak}
                            text={
                              b.label + ". " + (b.cue || "") + ". " +
                              (chips.length
                                ? ("Chips: " + chips.map((c) => c.label).join(", ") + ".")
                                : (awaiting ? "Tap to place." : "Drop or tap here.")) +
                              (isReq && !chips.length ? " This tray needs at least one idea before recording." : "")
                            }
                          />
                        </div>
                        <div className="bb-shelf-chips">
                          {chips.length === 0 ? (
                            <span className="bb-shelf-empty bb-inline-speak">
                              <span>{awaiting ? "Tap to place" : "Drop or tap here"}</span>
                              <SpeakButton
                                text={awaiting ? "Tap to place" : "Drop or tap here"}
                                showLabel={false}
                                label="Read empty tray hint"
                                onUnavailable={unavailableSpeak}
                              />
                            </span>
                          ) : (
                            chips.map((c, idx) => (
                              <span
                                key={placementKey(b.id, c.id, idx)}
                                className={"bb-chip on-map" + (c.imageUrl ? " has-image" : "")}
                                draggable={!submitted}
                                onDragStart={(e) => {
                                  e.stopPropagation();
                                  const payload = JSON.stringify({ move: true, fromBeatId: b.id, fromIndex: idx, ...c });
                                  e.dataTransfer.setData("application/json", payload);
                                  e.dataTransfer.setData("text/plain", payload);
                                  setDragChip(c);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                title={c.label}
                              >
                                <ChipFace chip={c} />
                                {!submitted ? (
                                  <button
                                    type="button"
                                    className="bb-chip-x"
                                    aria-label={"Remove " + c.label}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeChipFromTray(b.id, idx);
                                    }}
                                  >
                                    ×
                                  </button>
                                ) : null}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bb-row" style={{ marginTop: 14 }}>
              <button
                type="button"
                className="bb-btn teal"
                onClick={finishBrainstorm}
                disabled={!mapMeetsMin || submitted}
              >
                Map ready · Start recording
              </button>
            </div>
            {status ? <p className="bb-muted" style={{ marginTop: 10 }}>{status}</p> : null}
            {saving ? <p className="bb-muted">Saving...</p> : null}
          </div>
        ) : null}

        {(view === "beat" || view === "playback") && stimulusReady && brainstormReady ? (
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

        {view === "beat" && currentBeat && brainstormReady ? (
          <div className="bb-record-layout">
            <div className="bb-compact-map" aria-label="Your plan — glance while you record">
              <div className="bb-compact-map-label">Your storyboard · current beat highlighted</div>
              <div className="bb-compact-map-grid">
                {beatDefs.map((b) => {
                  const chips = Array.isArray(brainstormMap[b.id]) ? brainstormMap[b.id] : [];
                  const isCurrent = currentBeat && b.id === currentBeat.id;
                  const isReq = requiredSet.has(b.id);
                  return (
                    <div
                      key={"compact-" + b.id}
                      className={
                        "bb-compact-tray" +
                        (isCurrent ? " is-current" : "") +
                        (chips.length ? " is-filled" : "") +
                        (isReq ? " is-required" : "")
                      }
                    >
                      <div className="bb-compact-tray-title bb-label-with-speak">
                        <span>{b.label}{isReq ? " *" : ""}{isCurrent ? " · recording" : ""}</span>
                        <SpeakButton
                          showLabel={false}
                          label={"Read " + b.label}
                          onUnavailable={unavailableSpeak}
                          text={
                            b.label + (isCurrent ? ", recording now. " : ". ") +
                            (chips.length ? ("Chips: " + chips.map((c) => c.label).join(", ")) : "Empty tray.")
                          }
                        />
                      </div>
                      <div className="bb-compact-tray-chips">
                        {chips.length === 0 ? (
                          <span className="bb-shelf-empty">—</span>
                        ) : (
                          chips.map((c, idx) => (
                            <span
                              key={placementKey("c-" + b.id, c.id, idx)}
                              className={"bb-chip on-map compact" + (c.imageUrl ? " has-image" : "")}
                              title={c.label}
                            >
                              <ChipFace chip={c} />
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          <div className="bb-card">
            <div className="bb-cue-row">
              <div className="bb-cue">Beat {beatIndex + 1}: {currentBeat.label}</div>
              <SpeakButton
                label="Read aloud"
                onUnavailable={unavailableSpeak}
                text={
                  "Beat " + (beatIndex + 1) + ": " + currentBeat.label + ". " + (currentBeat.cue || "") + ". " +
                  (activePlanChips.length
                    ? ("Your plan chips: " + activePlanChips.map((c) => c.label).join(", ") + ".")
                    : "No chips on this beat — you can still record.")
                }
              />
            </div>
            <p className="bb-muted">{currentBeat.cue}</p>

            {activePlanChips.length ? (
              <div className="bb-plan-cue" aria-label="Your plan for this beat">
                <div className="bb-plan-cue-label bb-label-with-speak">
                  <span>Your plan (silent cue)</span>
                  <SpeakButton
                    showLabel={false}
                    label="Read plan chips"
                    onUnavailable={unavailableSpeak}
                    text={"Your plan chips: " + activePlanChips.map((c) => c.label).join(", ")}
                  />
                </div>
                <div className="bb-chip-row">
                  {activePlanChips.map((c, idx) => (
                    <span
                      key={placementKey(currentBeat.id, c.id, idx)}
                      className={"bb-chip on-cue" + (c.imageUrl ? " has-image" : "")}
                    >
                      <ChipFace chip={c} />
                      <SpeakButton
                        text={c.label}
                        showLabel={false}
                        label={"Read chip: " + c.label}
                        className="bb-speak-on-chip"
                        onUnavailable={unavailableSpeak}
                      />
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="bb-muted bb-inline-speak" style={{ marginTop: 6 }}>
                <span>No chips on this beat — you can still record.</span>
                <SpeakButton text="No chips on this beat — you can still record." showLabel={false} label="Read empty beat message" onUnavailable={unavailableSpeak} />
              </p>
            )}

            <p className="bb-muted" style={{ marginTop: 6 }}>Up to {clipCap} seconds. Re-record anytime before you submit.</p>

            {micError ? (
              <div className="bb-err bb-warn-with-speak">
                <span>{micError}</span>
                <SpeakButton text={micError} showLabel={false} label="Read error" onUnavailable={unavailableSpeak} />
              </div>
            ) : null}
            {shortClipWarn ? (
              <div className="bb-warn bb-warn-with-speak">
                <span>That clip was too short or silent. Hold the mic closer and try a longer take.</span>
                <SpeakButton text="That clip was too short or silent. Hold the mic closer and try a longer take." showLabel={false} label="Read warning" onUnavailable={unavailableSpeak} />
              </div>
            ) : null}
            {softStillWarn && currentBeat.stillRequired ? (
              <div className="bb-warn bb-warn-with-speak">
                <span>This beat usually needs a still (photo or drawing). You can add one or continue.</span>
                <SpeakButton text="This beat usually needs a still. You can add one or continue." showLabel={false} label="Read warning" onUnavailable={unavailableSpeak} />
              </div>
            ) : null}

            <div className="bb-row" style={{ marginTop: 12 }}>
              {!recording ? (
                <button
                  type="button"
                  className="bb-btn"
                  onClick={startRecording}
                  disabled={!stimulusReady || !brainstormReady || submitted}
                >
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
              <button
                type="button"
                className="bb-btn secondary"
                onClick={() => { setView("brainstorm"); setStatus(""); }}
                disabled={recording || submitted}
              >
                Edit plan
              </button>
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
          </div>
        ) : null}

        {view === "playback" ? (
          <div className="bb-card">
            <div className="bb-cue-row">
              <div className="bb-cue">Full playback</div>
              <SpeakButton text="Full playback. Listen to your whole broadcast. Re-record any beat, then submit." onUnavailable={unavailableSpeak} />
            </div>
            <p className="bb-muted">Listen to your whole broadcast. Re-record any beat, then submit.</p>
            {beatDefs.map((b, i) => {
              const slot = beats[b.id] || emptyBeat();
              const plan = Array.isArray(brainstormMap[b.id]) ? brainstormMap[b.id] : [];
              return (
                <div key={b.id} style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(140,82,242,.15)" }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    {i + 1}. {b.label}{slot.audioDataUrl ? "" : " — missing"}
                  </div>
                  {plan.length ? (
                    <div className="bb-chip-row" style={{ marginBottom: 6 }}>
                      {plan.map((c, idx) => (
                        <span
                          key={placementKey(b.id, c.id, idx)}
                          className={"bb-chip on-cue" + (c.imageUrl ? " has-image" : "")}
                        >
                          <ChipFace chip={c} />
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {slot.audioDataUrl ? <audio className="bb-audio" controls src={slot.audioDataUrl} /> : null}
                  {slot.stillDataUrl ? <img className="bb-still" src={slot.stillDataUrl} alt="" /> : null}
                  <button type="button" className="bb-btn secondary" style={{ marginTop: 8 }} onClick={() => goToBeat(i)} disabled={submitted}>
                    Re-record
                  </button>
                </div>
              );
            })}
            {reflecting ? (
              <div style={{ marginTop: 16 }}>
                <SubmitReflection questions={ACTIVITY_CHECKS.broadcast_booth} onSubmit={finishReflection} busy={saving} revisionNote={revisionFeedback} />
              </div>
            ) : (
            <div className="bb-row" style={{ marginTop: 16 }}>
              <button type="button" className="bb-btn" onClick={handleSubmit} disabled={!allDone || saving || submitted}>
                Submit broadcast
              </button>
            </div>
            )}
            {status ? <p className="bb-muted" style={{ marginTop: 10 }}>{status}</p> : null}
          </div>
        ) : null}

        {view === "done" ? (
          <div className="bb-card bb-empty">
            <div className="bb-cue-row" style={{ justifyContent: "center" }}>
              <div className="bb-cue">Broadcast submitted</div>
              <SpeakButton text="Broadcast submitted. Nice work. Your teacher will listen to each beat." onUnavailable={unavailableSpeak} />
            </div>
            <p className="bb-muted">Nice work. Your teacher will listen to each beat.</p>
            {beatDefs.map((b) => {
              const slot = beats[b.id];
              if (!slot || !slot.audioDataUrl) return null;
              const plan = Array.isArray(brainstormMap[b.id]) ? brainstormMap[b.id] : [];
              return (
                <div key={b.id} style={{ marginTop: 10, textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{b.label}</div>
                  {plan.length ? (
                    <div className="bb-chip-row" style={{ margin: "4px 0 6px" }}>
                      {plan.map((c, idx) => (
                        <span
                          key={placementKey(b.id, c.id, idx)}
                          className={"bb-chip on-cue" + (c.imageUrl ? " has-image" : "")}
                        >
                          <ChipFace chip={c} />
                        </span>
                      ))}
                    </div>
                  ) : null}
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
