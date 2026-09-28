"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./broadcast-booth.css";
import SubmitReflection from "../../../components/submit/SubmitReflection";
import { ACTIVITY_CHECKS } from "../../../lib/selfCheckLists";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ImagePlus, Mic, Plus, Square, Volume2, X } from "lucide-react";
import { StudioHeader, BroadcastPlayer, RecordingMeter, clock } from "./BroadcastStudioUI";
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
      <Volume2 size={16} aria-hidden="true" />
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
  previewMode = false,
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
  const [micPending, setMicPending] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [turningIn, setTurningIn] = useState(false);
  const [reflecting, setReflecting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const saveQueue = useRef(Promise.resolve());
  const mounted = useRef(true);
  const recordingLock = useRef(false);
  const submittingLock = useRef(false);
  const allowLeave = useRef(false);
  const busy = recording || micPending || processing || turningIn || leaving;
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
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      window.speechSynthesis?.cancel();
      if (recordTimer.current) clearInterval(recordTimer.current);
      if (mediaStream.current) mediaStream.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    function warnBeforeLeaving(event) {
      if (!allowLeave.current && (dirty.current || saving || busy)) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [saving, busy]);

  async function leaveStudio(event) {
    event.preventDefault();
    if (busy) return;
    if (submitted || previewMode) { allowLeave.current = true; window.location.assign("/missions"); return; }
    setLeaving(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const { ok } = await persist("save");
    setLeaving(false);
    if (ok) { dirty.current = false; allowLeave.current = true; window.location.assign("/missions"); }
  }

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

  function persist(kind, overrides) {
    const o = overrides || {};
    const payload = {
      assignmentId, kind,
      stimulusReady: o.stimulusReady ?? stimulusReadyRef.current,
      brainstormReady: o.brainstormReady ?? brainstormReadyRef.current,
      brainstormMap: o.brainstormMap ?? brainstormMapRef.current,
      currentBeatIndex: o.currentBeatIndex ?? beatIndexRef.current,
      beats: o.beats ?? beatsRef.current,
      checklist: o.checklist,
      selfConfidence: o.selfConfidence,
    };
    // Queue snapshots so an older autosave cannot overwrite a newer save or turn-in.
    const request = saveQueue.current.then(async () => {
      if (mounted.current) setSaving(true);
      let result;
      if (previewMode) {
        result = { ok: true, data: {} }; // Preview never writes student data.
      } else {
        try {
          const res = await fetch("/api/broadcast-booth/submit", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          result = { ok: res.ok, data: await res.json().catch(() => ({})) };
        } catch (_) { result = { ok: false, data: { error: "Network error. Try again." } }; }
      }
      if (mounted.current) {
        setSaving(false);
        setSaveError(result.ok ? "" : "Your latest changes could not be saved. Keep this page open and try again.");
      }
      return result;
    });
    saveQueue.current = request.catch(() => {});
    return request;
  }

  function scheduleSave() {
    dirty.current = true;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (!dirty.current || submitted) return;
      dirty.current = false;
      if (!submittingLock.current) persist("save");
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
    if (recordingLock.current || submitted || busy) return;
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
    recordingLock.current = true;
    setMicPending(true);
    window.speechSynthesis?.cancel();
    document.querySelectorAll("audio[data-broadcast-player]").forEach((audio) => audio.pause());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) { stream.getTracks().forEach((t) => t.stop()); return; }
      setMicPending(false);
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
        recordingLock.current = false;
        if (!mounted.current) return;
        setProcessing(true);
        const blob = new Blob(recordChunks.current, { type: rec.mimeType || "audio/webm" });
        const durationSec = Math.min(
          clipCap,
          Math.max(0, Math.round((Date.now() - recordStartedAt.current) / 1000))
        );
        if (durationSec < minClip || blob.size < 800) {
          setShortClipWarn(true);
          setProcessing(false);
          if (mediaStream.current) {
            mediaStream.current.getTracks().forEach((t) => t.stop());
            mediaStream.current = null;
          }
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (!mounted.current) return;
          setProcessing(false);
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
        reader.onerror = () => { if (mounted.current) { setProcessing(false); setMicError("This recording could not be saved. Please try again."); } };
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
      recordingLock.current = false;
      setMicPending(false);
      mediaStream.current?.getTracks().forEach((t) => t.stop());
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
    setProcessing(true);
    if (mediaRec.current && mediaRec.current.state !== "inactive") {
      try { mediaRec.current.stop(); } catch (_) { /* ignore */ }
    }
  }

  function onStillUpload(file) {
    if (!file || !currentBeat || busy) return;
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
    if (!currentBeat || busy) return;
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
    if (submitted || busy || !stimulusReady || !brainstormReady) return;
    setBeatIndex(i);
    setView("beat");
    setStatus("");
    setSoftStillWarn(false);
    setShortClipWarn(false);
  }

  async function handleSubmit() {
    if (submittingLock.current || submitted || busy) return;
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
    if (submittingLock.current || submitted || busy || !allDone || !mapMeetsMin) return;
    submittingLock.current = true;
    setTurningIn(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    dirty.current = false;
    const { ok, data } = await persist("turnin", reflection);
    setTurningIn(false);
    if (!ok) {
      submittingLock.current = false;
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
  const step = view === "beat" ? 1 : (view === "playback" || view === "done") ? 2 : 0;
  const topicImage = stim?.placeStill?.imageUrl || null;
  const fieldNotes = (<div className="bb-field-content">
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
  </div>);

  const topicSummary = (
    <div className="bb-topic-summary">
      <div className="bb-eyebrow">Your topic</div>
      <h2>{publicCase.title}</h2>
      {topicImage ? <img className="bb-topic-image" src={topicImage} alt={stim.placeStill.caption || "Activity scene"} /> : null}
      <p className="bb-muted">{prompt}</p>
    </div>
  );

  // Show each picture once in the planning options, keeping every distinct label
  // and the original image on the chip when it is placed in a storyboard tray.
  const planningPictures = new Set([stim.placeStill?.imageUrl, stim.artifactCard?.imageUrl].filter(Boolean));
  function renderIdea(chip) {
    const showPicture = chip.imageUrl && !planningPictures.has(chip.imageUrl);
    if (showPicture) planningPictures.add(chip.imageUrl);
    const face = showPicture ? chip : { ...chip, imageUrl: undefined };
    const picked = selectedChip?.id === chip.id && (selectedChip.source || "stimulus") === (chip.source || "stimulus");
    return <button key={chip.id} type="button" className={"bb-chip" + (showPicture ? " has-image" : "") + (picked ? " is-picked" : "")}
      aria-pressed={picked} draggable={!submitted} disabled={submitted}
      onDragStart={(e) => startIdeaDrag(e, chip)} onDragEnd={() => setDragChip(null)} onClick={() => onIdeaChipClick(chip)}>
      <ChipFace chip={face} />
    </button>;
  }

  return (
    <div className="bb-root">
      <div className="bb-shell">
        <StudioHeader onLeave={leaveStudio} step={step} recording={recording} busy={busy} submitted={submitted}
          onStep={(i) => { window.speechSynthesis?.cancel(); if (i === 0) setView("brainstorm"); else if (i === 1) goToBeat(beatIndex); }} />
        {revisionFeedback ? <div className="bb-warn"><strong>Teacher note:</strong> {revisionFeedback}</div> : null}
        {saveError ? <div className="bb-err" role="alert">{saveError} <button className="bb-text-btn" disabled={saving || busy} onClick={() => persist("save")}>Try saving again</button></div> : null}

        {view === "cover" && publicCase.cover ? (
          <section className="bb-cover bb-panel">
            <div className="bb-cover-icon"><Mic size={44} /></div>
            <div className="bb-eyebrow">{publicCase.segmentLabel} · {beatDefs.length} segments</div>
            <h2>{publicCase.cover.headline}</h2>
            <p>{publicCase.cover.line}</p>
            <p className="bb-muted">Plan your ideas. Record your voice. Share your broadcast.</p>
            <div className="bb-row"><button className="bb-btn teal" onClick={enterPlan}>Enter the studio <ArrowRight size={19} /></button>
              <SpeakButton text={publicCase.cover.headline + ". " + publicCase.cover.line} onUnavailable={unavailableSpeak} /></div>
          </section>
        ) : null}

        {view === "brainstorm" ? (
          <div className="bb-plan-layout">
            <aside className="bb-panel bb-plan-stimulus" aria-label="Topic and idea bank">
              <div className="bb-eyebrow">Your topic · {publicCase.segmentLabel}</div>
              <h2>{publicCase.title}</h2>
              <details className="bb-field-notes" open><summary>Field notes <span>Read, then plan</span></summary>{fieldNotes}</details>
              <div className="bb-ideas-bank">
                <div className="bb-label-with-speak"><h3 className="bb-eyebrow">Idea bank</h3><SpeakButton text={stimulusChips.map((c) => c.label).join(". ")} showLabel={false} label="Read idea bank" onUnavailable={unavailableSpeak} /></div>
                <p className="bb-muted">Choose an idea, then tap a tray. You can also drag it.</p>
                <div className="bb-bank-grid">{stimulusChips.map(renderIdea)}</div>
                {allStemChips.length ? <details className="bb-starters"><summary>Sentence starters</summary>
                  {beatDefs.map((b) => <div className="bb-starter-group" key={b.id}><h4>{b.label}</h4><div className="bb-chip-row">{(beatStems[b.id] || []).map((c) => renderIdea({ ...c, source: "stem" }))}</div></div>)}
                </details> : null}
              </div>
            </aside>
            <section className="bb-plan-right" aria-label="Your storyboard">
              <div className="bb-plan-heading"><div><h2>Your storyboard</h2><p className="bb-muted">Give each part of your broadcast a place.</p></div>
                <span className="bb-count">{beatDefs.length} segments</span></div>
              {selectedChip ? <div className="bb-selection" role="status"><span><strong>{selectedChip.label}</strong> selected. Choose a tray.</span><button className="bb-icon-btn" onClick={() => { setSelectedChip(null); setStatus(""); }} aria-label="Cancel selected idea"><X size={18} /></button></div> : null}
              <div className="bb-shelves">
                {beatDefs.map((b, i) => {
                  const chips = brainstormMap[b.id] || [];
                  const required = requiredSet.has(b.id);
                  return <section key={b.id} className={"bb-shelf" + (selectedChip || dragChip ? " is-awaiting" : "")}
                    aria-label={b.label + " tray"} onClick={(e) => { if (selectedChip && !e.target.closest("button")) onShelfClick(b.id); }} onDragOver={onShelfDragOver} onDrop={(e) => onShelfDrop(e, b.id)}>
                    <div className="bb-shelf-heading"><span className="bb-number">{i + 1}</span><div><h3>{b.label}</h3><p>{b.cue}</p></div>
                      <SpeakButton text={b.label + ". " + b.cue} showLabel={false} label={"Read " + b.label + " tray"} onUnavailable={unavailableSpeak} />
                      {required && chips.length < (brainstormMin.minPerBeat || 1) ? <span className="bb-required">Needs an idea</span> : null}</div>
                    <div className="bb-shelf-chips">
                      {chips.map((c, idx) => <div key={placementKey(b.id, c.id, idx)} className={"bb-chip on-map" + (c.imageUrl ? " has-image" : "")}
                        draggable={!submitted} onDragEnd={() => setDragChip(null)} onDragStart={(e) => {
                          const payload = JSON.stringify({ ...c, move: true, fromBeatId: b.id, fromIndex: idx });
                          e.dataTransfer.setData("application/json", payload); e.dataTransfer.setData("text/plain", payload); setDragChip(c);
                        }}><ChipFace chip={c} /><button className="bb-chip-x" aria-label={"Remove " + c.label + " from " + b.label} onClick={() => removeChipFromTray(b.id, idx)}><X size={16} /></button></div>)}
                      {chips.length < 8 ? <button className="bb-drop" onClick={() => onShelfClick(b.id)} aria-label={"Add selected idea to " + b.label}>
                        <Plus size={23} /><span>{selectedChip ? "Place idea here" : "Add an idea"}</span></button> : <span className="bb-muted">Tray full · remove an idea to add another</span>}
                    </div>
                  </section>;
                })}
              </div>
              <div className="bb-plan-footer"><p className="bb-muted">{mapMeetsMin ? "Your plan is ready. Bring it to life!" : emptyHint}</p>
                <button className="bb-btn teal" onClick={finishBrainstorm} disabled={!mapMeetsMin || submitted}>Ready to record <ArrowRight size={20} /></button></div>
            </section>
          </div>
        ) : null}

        {(view === "beat" || view === "playback" || view === "done") ? (
          <div className="bb-work-layout">
            <aside className="bb-panel bb-broadcast-sidebar">
              <h2>Your broadcast</h2>
              {view === "beat" ? <><nav className="bb-segment-nav" aria-label="Broadcast segments">{beatDefs.map((b, i) => (
                <button key={b.id} className={i === beatIndex ? "is-current" : ""} disabled={busy || submitted} aria-current={i === beatIndex ? "step" : undefined} onClick={() => goToBeat(i)}>
                  <span className="bb-mini-number">{i + 1}</span><span>{b.label}</span>{beats[b.id]?.status === "done" && beats[b.id]?.audioDataUrl ? <Check size={19} /> : null}
                </button>))}</nav><button className="bb-btn secondary bb-edit-plan" disabled={busy} onClick={() => setView("brainstorm")}>Edit plan</button></> : null}
              {topicSummary}
              <div className="bb-completion"><CheckCircle2 size={21} /> {doneCount} of {beatDefs.length} segments recorded</div>
              {view !== "beat" ? <p className="bb-muted">{submitted ? "Your teacher can listen to your broadcast." : "Listen to each part. You can record any part again."}</p> : null}
            </aside>

            {view === "beat" && currentBeat ? (
              <section className="bb-panel bb-record-panel">
                <div className="bb-record-heading"><span className="bb-number">{beatIndex + 1}</span><div><h2>{currentBeat.label}</h2><p className="bb-muted">{currentBeat.cue}</p></div>
                  {!busy ? <SpeakButton text={currentBeat.label + ". " + currentBeat.cue} showLabel={false} label="Read recording prompt" onUnavailable={unavailableSpeak} /> : null}</div>
                <div className="bb-plan-cue"><div className="bb-label-with-speak"><h3>Your planning cues</h3>
                  {!busy && activePlanChips.length ? <SpeakButton text={activePlanChips.map((c) => c.label).join(". ")} showLabel={false} label="Read planning cues" onUnavailable={unavailableSpeak} /> : null}</div>
                  {activePlanChips.length ? <div className="bb-cue-grid">{activePlanChips.map((c, i) => <div key={placementKey(currentBeat.id, c.id, i)} className={"bb-chip on-cue" + (c.imageUrl ? " has-image" : "")}><ChipFace chip={c} /></div>)}</div> : <p className="bb-muted">No ideas in this tray. You can still record, or return to your plan.</p>}
                </div>
                <div className="bb-recorder">
                  <div className={"bb-record-state" + (recording ? " is-recording" : "")}><span aria-hidden="true" />{recording ? "Recording" : micPending ? "Waiting for microphone…" : processing ? "Preparing your recording…" : currentSlot.audioDataUrl ? "Listen to your take" : "Ready when you are"}</div>
                  {recording ? <div className="bb-timer">{clock(recordSec)}<small> / {clock(clipCap)}</small></div> : null}
                  <RecordingMeter stream={mediaStream.current} active={recording} />
                  {currentSlot.audioDataUrl && !recording ? <BroadcastPlayer key={currentSlot.audioDataUrl} src={currentSlot.audioDataUrl} duration={currentSlot.durationSec} label={currentBeat.label} disabled={busy} /> : null}
                  <div className="bb-record-controls">{recording ? <button className="bb-btn danger" onClick={stopRecording}><Square size={21} fill="currentColor" /> Stop recording</button> :
                    <button className="bb-btn" disabled={busy || submitted} onClick={startRecording}><Mic size={21} />{currentSlot.audioDataUrl ? "Record again" : "Start recording"}</button>}
                    <label className={"bb-btn secondary bb-upload" + (busy ? " is-disabled" : "")}><ImagePlus size={20} />{currentSlot.stillDataUrl ? "Change photo or drawing" : "Add a photo or drawing"}<input type="file" accept="image/*" aria-label="Add a photo or drawing" disabled={busy || submitted} onChange={(e) => { onStillUpload(e.target.files?.[0]); e.target.value = ""; }} /></label></div>
                  <p className="bb-muted">Up to {clipCap} seconds. You can listen and record again.</p>
                  {currentBeat.stillRequired && !currentSlot.stillDataUrl ? <p className="bb-muted">A photo or drawing is suggested for this segment.</p> : null}
                  {currentSlot.stillDataUrl ? <img className="bb-still" src={currentSlot.stillDataUrl} alt="Your segment illustration" /> : null}
                </div>
                {micError ? <div className="bb-err" role="alert">{micError}</div> : null}
                {shortClipWarn ? <div className="bb-warn" role="alert">That clip was too short. Record for at least {minClip} seconds and check that your microphone is working.</div> : null}
                <div className="bb-record-footer"><button className="bb-text-btn" disabled={busy || beatIndex === 0} onClick={() => goToBeat(beatIndex - 1)}><ArrowLeft size={16} /> Previous</button>
                  <button className="bb-btn teal" disabled={!currentSlot.audioDataUrl || busy || submitted} onClick={markBeatDone}>{beatIndex === beatDefs.length - 1 ? "Save segment · Review" : "Save segment · Next"}<ArrowRight size={18} /></button></div>
              </section>
            ) : null}

            {(view === "playback" || view === "done") ? (
              <section className="bb-panel bb-review-panel">
                {submitted ? <div className="bb-success-heading"><CheckCircle2 size={40} /><div><h2>Broadcast submitted!</h2><p className="bb-muted">Your voice. Your ideas. Ready for your teacher.</p></div></div> : <><h2>Listen before you send</h2><p className="bb-muted">Make sure your ideas are clear and complete.</p></>}
                <div className="bb-review-list">{beatDefs.map((b, i) => {
                  const slot = beats[b.id] || emptyBeat();
                  const plan = brainstormMap[b.id] || [];
                  const still = slot.stillDataUrl || plan.find((c) => c.imageUrl)?.imageUrl;
                  return <article className="bb-review-card" key={b.id}>
                    {still ? <img className="bb-review-image" src={still} alt={slot.stillDataUrl ? "Your segment illustration" : "Planning cue"} /> : <div className="bb-review-placeholder"><Mic size={32} /></div>}
                    <div className="bb-review-audio"><h3><span className="bb-mini-number">{i + 1}</span>{b.label}</h3>
                      {slot.audioDataUrl ? <BroadcastPlayer src={slot.audioDataUrl} duration={slot.durationSec} label={b.label} /> : <p className="bb-muted">This segment still needs a recording.</p>}
                      {plan.length ? <details className="bb-review-cues"><summary>Planning cues</summary><div className="bb-chip-row">{plan.map((c, index) => <span className="bb-cue-label" key={placementKey(b.id,c.id,index)}>{c.label}</span>)}</div></details> : null}
                    </div>
                    {!submitted ? <button className="bb-btn secondary bb-rerecord" disabled={busy} onClick={() => goToBeat(i)}><Mic size={18} />{slot.audioDataUrl ? "Record again" : "Record"}</button> : null}
                  </article>;
                })}</div>
                {reflecting && !submitted ? <SubmitReflection questions={ACTIVITY_CHECKS.broadcast_booth} onSubmit={finishReflection} busy={turningIn || saving} disabled={!allDone || busy} revisionNote={revisionFeedback} /> : null}
                <div className="bb-review-footer">{submitted ? <a href="/missions" className="bb-btn teal">Back to My Missions <ArrowRight size={18} /></a> : <>
                  <button className="bb-btn secondary" disabled={busy} onClick={() => goToBeat(beatIndex)}><ArrowLeft size={17} />Back to recording</button>
                  <button className="bb-btn teal" disabled={!allDone || busy || saving || reflecting} onClick={handleSubmit}>{turningIn ? "Submitting…" : "Submit broadcast"}<ArrowRight size={19} /></button></>}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
        <div className="bb-status" role="status" aria-live="polite">{saving ? (previewMode ? "Preview · no student data saved" : "Saving your work…") : status}</div>
      </div>
    </div>
  );
}
