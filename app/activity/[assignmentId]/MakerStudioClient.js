"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../../components/BackToHubButton";
import SamGuide from "../../../components/SamGuide";
import { MAKER_MODES } from "../../../lib/cases/maker-studio/modes";
import MakerDrawPad from "./MakerDrawPad";
import LibraryPicker from "../../../components/maker/LibraryPicker";
import "./maker-studio.css";

const VOICE_CAP_SEC = 90;
const DIAGRAM_CHIPS = ["Part", "Step 1", "Step 2", "Cause", "Effect", "Result"];
const LIVE_MODE_IDS = new Set(MAKER_MODES.filter((m) => m.live).map((m) => m.id));
const DEFAULT_INTERVIEW_QUESTIONS = [
  "What is the main idea?",
  "Why does it matter?",
  "What is one example?",
  "What else should someone know?",
];
const DEFAULT_SORT_ITEMS = ["Item 1", "Item 2", "Item 3", "Item 4"];

const BUDDY_FALLBACK_QUESTIONS = [
  { question: "What is one important idea you explained?", answer: "" },
  { question: "Why does that idea matter for today's topic?", answer: "" },
];
const PAINT_MAX_REGENS = 2;
const WHAT_IF_TWIST_CHIPS = [
  "one thing changed",
  "it happened in the past",
  "it happened far away",
  "we had no tools",
  "everyone helped",
];

function emptyBuddyQuestions(list) {
  const src = Array.isArray(list) && list.length ? list : BUDDY_FALLBACK_QUESTIONS;
  return src.slice(0, 2).map((q) => ({
    question: (q && q.question) || "",
    answer: (q && q.answer) || "",
  }));
}

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

function emptyInterviewRows(n) {
  const count = Math.max(3, Math.min(5, n || 4));
  return Array.from({ length: count }, (_, i) => ({
    question: DEFAULT_INTERVIEW_QUESTIONS[i] || `Question ${i + 1}`,
    answer: "",
  }));
}

function emptySortDraft() {
  return {
    categories: ["Group A", "Group B"],
    items: DEFAULT_SORT_ITEMS.map((label, i) => ({
      id: `item-${i + 1}`,
      label,
      categoryIndex: null,
    })),
  };
}

function newPinId() {
  return `pin-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function isLibraryPath(src) {
  return typeof src === "string" && src.startsWith("/") && !src.startsWith("//");
}

function isPlacedImage(src) {
  return typeof src === "string" && src.length > 0;
}

function panelImage(panel) {
  return panel && panel.imageDataUrl ? panel.imageDataUrl : null;
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
  if (id === "before_after") {
    return !!(
      panelImage(draft.before) ||
      panelImage(draft.after) ||
      (draft.caption || "").trim()
    );
  }
  if (id === "map_it") {
    return !!(
      draft.imageDataUrl ||
      (draft.caption || "").trim() ||
      (draft.pins || []).some((p) => p && (p.label || "").trim())
    );
  }
  if (id === "math_story") {
    return !!(
      (draft.story || "").trim() ||
      (draft.workText || "").trim() ||
      draft.imageDataUrl
    );
  }
  if (id === "interview") {
    return (draft.rows || []).some(
      (r) => r && ((r.answer || "").trim() || (r.question || "").trim())
    );
  }
  if (id === "sort_of_my_own") {
    return (
      (draft.categories || []).some((c) => (c || "").trim()) ||
      (draft.items || []).some(
        (it) => it && ((it.label || "").trim() || it.categoryIndex != null)
      )
    );
  }
  if (id === "teach_the_buddy") {
    return !!(
      (draft.explanation || "").trim() ||
      (draft.questions || []).some(
        (q) => q && ((q.question || "").trim() || (q.answer || "").trim())
      )
    );
  }
  if (id === "paint_what_i_said") {
    return !!( (draft.promptText || "").trim() || draft.imageDataUrl );
  }
  if (id === "what_if") {
    return !!(
      (draft.twist || "").trim() ||
      (draft.ending || "").trim() ||
      (draft.beats || []).some((b) => (b || "").trim())
    );
  }
  if (id === "postcard") {
    return !!(
      (draft.to || "").trim() ||
      (draft.from || "").trim() ||
      (draft.message || "").trim() ||
      draft.imageDataUrl
    );
  }
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
  if (id === "before_after") {
    return !!(panelImage(draft.before) && panelImage(draft.after));
  }
  if (id === "map_it") {
    const pins = draft.pins || [];
    const labeled = pins.filter((p) => p && (p.label || "").trim());
    return !!draft.imageDataUrl && labeled.length >= 2 && labeled.length <= 6;
  }
  if (id === "math_story") {
    return !!(draft.story || "").trim() && !!(
      (draft.workText || "").trim() || draft.imageDataUrl
    );
  }
  if (id === "interview") {
    const rows = draft.rows || [];
    return (
      rows.length >= 3 &&
      rows.length <= 5 &&
      rows.every((r) => r && (r.question || "").trim() && (r.answer || "").trim())
    );
  }
  if (id === "sort_of_my_own") {
    const rawCats = draft.categories || [];
    const namedCount = rawCats.filter((c) => (c || "").trim()).length;
    const items = draft.items || [];
    return (
      namedCount >= 2 &&
      rawCats.length >= 2 &&
      rawCats.length <= 4 &&
      items.length >= 1 &&
      items.every((it) => {
        const idx = Number(it && it.categoryIndex);
        return (
          it &&
          (it.label || "").trim() &&
          Number.isInteger(idx) &&
          idx >= 0 &&
          idx < rawCats.length &&
          !!(rawCats[idx] || "").trim()
        );
      })
    );
  }
  if (id === "teach_the_buddy") {
    const qs = draft.questions || [];
    return (
      !!(draft.explanation || "").trim() &&
      qs.length >= 1 &&
      qs.every((q) => q && (q.question || "").trim() && (q.answer || "").trim())
    );
  }
  if (id === "paint_what_i_said") {
    return !!(draft.promptText || "").trim() && !!draft.imageDataUrl;
  }
  if (id === "what_if") {
    const beats = (draft.beats || []).map((b) => (b || "").trim()).filter(Boolean);
    return (
      !!(draft.twist || "").trim() &&
      beats.length >= 2 &&
      !!(draft.ending || "").trim()
    );
  }
  if (id === "postcard") {
    return (
      !!(draft.to || "").trim() &&
      !!(draft.from || "").trim() &&
      !!(draft.message || "").trim() &&
      !!draft.imageDataUrl
    );
  }
  return false;
}

function buildSlot(id, draft, status) {
  const updatedAt = new Date().toISOString();
  if (id === "write") {
    return { status, text: draft.text || "", updatedAt };
  }
  if (id === "sketch") {
    return {
      status,
      imageDataUrl: draft.imageDataUrl || null,
      canvasSurface: draft.canvasSurface === "light_table" ? "light_table" : "whiteboard",
      updatedAt,
    };
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
  if (id === "before_after") {
    return {
      status,
      before: { imageDataUrl: panelImage(draft.before) },
      after: { imageDataUrl: panelImage(draft.after) },
      caption: draft.caption || "",
      updatedAt,
    };
  }
  if (id === "map_it") {
    return {
      status,
      imageDataUrl: draft.imageDataUrl || null,
      pins: (draft.pins || []).slice(0, 6).map((p) => ({
        id: (p && p.id) || newPinId(),
        x: Math.max(0, Math.min(100, Number(p && p.x) || 50)),
        y: Math.max(0, Math.min(100, Number(p && p.y) || 50)),
        label: (p && p.label) || "",
      })),
      caption: draft.caption || "",
      updatedAt,
    };
  }
  if (id === "math_story") {
    return {
      status,
      story: draft.story || "",
      workText: draft.workText || "",
      imageDataUrl: draft.imageDataUrl || null,
      updatedAt,
    };
  }
  if (id === "interview") {
    return {
      status,
      rows: (draft.rows || []).map((r) => ({
        question: (r && r.question) || "",
        answer: (r && r.answer) || "",
      })),
      updatedAt,
    };
  }
  if (id === "sort_of_my_own") {
    return {
      status,
      categories: (draft.categories || []).map((c) => (typeof c === "string" ? c : "")),
      items: (draft.items || []).map((it, i) => ({
        id: (it && it.id) || `item-${i + 1}`,
        label: (it && it.label) || "",
        categoryIndex:
          it && it.categoryIndex != null && Number.isFinite(Number(it.categoryIndex))
            ? Number(it.categoryIndex)
            : null,
      })),
      updatedAt,
    };
  }
  if (id === "teach_the_buddy") {
    return {
      status,
      explanation: draft.explanation || "",
      questions: (draft.questions || []).map((q) => ({
        question: (q && q.question) || "",
        answer: (q && q.answer) || "",
      })),
      aiUsed: !!draft.aiUsed,
      updatedAt,
    };
  }
  if (id === "paint_what_i_said") {
    return {
      status,
      promptText: draft.promptText || "",
      imageDataUrl: draft.imageDataUrl || null,
      imageSource: draft.imageSource || null,
      regenerateCount: Math.max(0, Number(draft.regenerateCount) || 0),
      updatedAt,
    };
  }
  if (id === "what_if") {
    return {
      status,
      twist: draft.twist || "",
      beats: (draft.beats || []).map((b) => (typeof b === "string" ? b : "")),
      ending: draft.ending || "",
      aiUsed: !!draft.aiUsed,
      updatedAt,
    };
  }
  if (id === "postcard") {
    return {
      status,
      to: draft.to || "",
      from: draft.from || "",
      message: draft.message || "",
      imageDataUrl: draft.imageDataUrl || null,
      imageSource: draft.imageSource || null,
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
  /** null | { kind } with optional index/side for library target */
  const [libraryPicker, setLibraryPicker] = useState(null);
  const [pinPlaceMode, setPinPlaceMode] = useState(false);
  const [sortActiveItem, setSortActiveItem] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiNote, setAiNote] = useState(null);
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
      nextDraft = {
        imageDataUrl: slot.imageDataUrl || null,
        canvasSurface: slot.canvasSurface === "light_table" ? "light_table" : "whiteboard",
      };
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
    } else if (id === "before_after") {
      nextDraft = {
        before: { imageDataUrl: (slot.before && slot.before.imageDataUrl) || null },
        after: { imageDataUrl: (slot.after && slot.after.imageDataUrl) || null },
        caption: slot.caption || "",
      };
    } else if (id === "map_it") {
      nextDraft = {
        imageDataUrl: slot.imageDataUrl || null,
        pins: Array.isArray(slot.pins)
          ? slot.pins.map((p) => ({
              id: (p && p.id) || newPinId(),
              x: Number(p && p.x) || 50,
              y: Number(p && p.y) || 50,
              label: (p && p.label) || "",
            }))
          : [],
        caption: slot.caption || "",
      };
      setPinPlaceMode(false);
    } else if (id === "math_story") {
      nextDraft = {
        story: slot.story || "",
        workText: slot.workText || "",
        imageDataUrl: slot.imageDataUrl || null,
      };
    } else if (id === "interview") {
      const rows =
        Array.isArray(slot.rows) && slot.rows.length >= 3
          ? slot.rows.map((r) => ({
              question: (r && r.question) || "",
              answer: (r && r.answer) || "",
            }))
          : emptyInterviewRows(4);
      nextDraft = { rows };
    } else if (id === "sort_of_my_own") {
      const base = emptySortDraft();
      nextDraft = {
        categories:
          Array.isArray(slot.categories) && slot.categories.length >= 2
            ? slot.categories.map((c) => (typeof c === "string" ? c : ""))
            : base.categories,
        items:
          Array.isArray(slot.items) && slot.items.length
            ? slot.items.map((it, i) => ({
                id: (it && it.id) || `item-${i + 1}`,
                label: (it && it.label) || "",
                categoryIndex:
                  it && it.categoryIndex != null ? Number(it.categoryIndex) : null,
              }))
            : base.items,
      };
      setSortActiveItem(null);
    } else if (id === "teach_the_buddy") {
      nextDraft = {
        explanation: slot.explanation || "",
        questions: emptyBuddyQuestions(slot.questions),
        aiUsed: !!slot.aiUsed,
      };
      setAiNote(null);
    } else if (id === "paint_what_i_said") {
      nextDraft = {
        promptText: slot.promptText || "",
        imageDataUrl: slot.imageDataUrl || null,
        imageSource: slot.imageSource || null,
        regenerateCount: Math.max(0, Number(slot.regenerateCount) || 0),
      };
      setAiNote(null);
    } else if (id === "what_if") {
      nextDraft = {
        twist: slot.twist || "",
        beats: Array.isArray(slot.beats) ? slot.beats.map((b) => String(b || "")) : [],
        ending: slot.ending || "",
        aiUsed: !!slot.aiUsed,
      };
      setAiNote(null);
    } else if (id === "postcard") {
      nextDraft = {
        to: slot.to || "",
        from: slot.from || "",
        message: slot.message || "",
        imageDataUrl: slot.imageDataUrl || null,
        imageSource: slot.imageSource || null,
      };
      setAiNote(null);
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
    if (id === "sketch") return "Draw or pick a picture first, then tap Done.";
    if (id === "diagram") return "Add a picture or drawing first, then tap Done.";
    if (id === "poster") return "Add a title and a picture, then tap Done.";
    if (id === "comic") return "Fill each panel with a drawing or a line, then tap Done.";
    if (id === "voice") return "Record a voice note first, then tap Done.";
    if (id === "before_after") return "Add a picture in Before and After, then tap Done.";
    if (id === "map_it") return "Add a map background and at least 2 labeled pins, then tap Done.";
    if (id === "math_story") return "Write your story and show your work, then tap Done.";
    if (id === "interview") return "Answer every question (3–5), then tap Done.";
    if (id === "sort_of_my_own") return "Name 2–4 categories and sort every item, then tap Done.";
    if (id === "teach_the_buddy")
      return "Write your explanation and answer Buddy's questions, then tap Done.";
    if (id === "paint_what_i_said")
      return "Add a description and a picture, then tap Done.";
    if (id === "what_if")
      return "Add a twist, at least 2 beats, and your ending, then tap Done.";
    if (id === "postcard")
      return "Fill To, From, message, and a front picture, then tap Done.";
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


  async function askBuddy() {
    if (!draft || aiBusy) return;
    const explanation = (draft.explanation || "").trim();
    if (!explanation) {
      setStatus("Write your explanation first, then Ask Buddy.");
      return;
    }
    setAiBusy(true);
    setAiNote(null);
    setStatus("Buddy is thinking of questions…");
    try {
      const res = await fetch("/api/maker-studio/ai/buddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          explanation,
          topic: config.topic || "",
          prompt: config.prompt || "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      const incoming =
        Array.isArray(data.questions) && data.questions.length
          ? data.questions
          : BUDDY_FALLBACK_QUESTIONS;
      const keptAnswers = (draft.questions || []).map((q) => (q && q.answer) || "");
      const nextQs = emptyBuddyQuestions(incoming).map((q, i) => ({
        ...q,
        answer: keptAnswers[i] || "",
      }));
      dirty.current = true;
      setDraft((prev) => ({
        ...(prev || {}),
        questions: nextQs,
        aiUsed: !data.fallback,
      }));
      setAiNote(data.message || (data.fallback ? "Using backup questions." : null));
      setStatus(
        data.fallback
          ? "Buddy is resting — answer these questions instead."
          : "Buddy asked you a couple of questions. Answer them below."
      );
    } catch (_) {
      dirty.current = true;
      setDraft((prev) => ({
        ...(prev || {}),
        questions: emptyBuddyQuestions(BUDDY_FALLBACK_QUESTIONS),
        aiUsed: false,
      }));
      setAiNote("Buddy is resting. Try these questions instead.");
      setStatus("Buddy is resting — answer these questions instead.");
    } finally {
      setAiBusy(false);
    }
  }

  async function generatePaintImage({ regenerate } = {}) {
    if (!draft || aiBusy) return;
    const promptText = (draft.promptText || "").trim();
    if (!promptText) {
      setStatus("Describe the picture first.");
      return;
    }
    const used = Math.max(0, Number(draft.regenerateCount) || 0);
    if (regenerate && used >= PAINT_MAX_REGENS) {
      setStatus("You already used your regenerates. Keep this picture or pick from the library.");
      return;
    }
    setAiBusy(true);
    setAiNote(null);
    setStatus(regenerate ? "Making a new picture…" : "Painting your words…");
    try {
      const res = await fetch("/api/maker-studio/ai/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptText,
          topic: config.topic || "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok && data.imageDataUrl) {
        dirty.current = true;
        setDraft((prev) => ({
          ...(prev || {}),
          imageDataUrl: data.imageDataUrl,
          imageSource: "ai",
          regenerateCount: regenerate ? used + 1 : used,
        }));
        setStatus(
          regenerate
            ? `New picture ready. Regenerates left: ${Math.max(0, PAINT_MAX_REGENS - (used + 1))}.`
            : "Picture ready. You can regenerate a couple of times if you want."
        );
      } else {
        setAiNote(
          data.message ||
            "Picture helper is resting. Pick from the library or draw instead."
        );
        setStatus("Picture helper is resting — use the library or draw.");
      }
    } catch (_) {
      setAiNote("Couldn't make that picture. Pick from the library or draw instead.");
      setStatus("Couldn't make that picture — use the library or draw.");
    } finally {
      setAiBusy(false);
    }
  }

  async function runWhatIfBeats() {
    if (!draft || aiBusy) return;
    const twist = (draft.twist || "").trim();
    if (!twist) {
      setStatus("Add your What if… twist first.");
      return;
    }
    setAiBusy(true);
    setAiNote(null);
    setStatus("Building your story beats…");
    try {
      const res = await fetch("/api/maker-studio/ai/what-if", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twist,
          topic: config.topic || "",
          prompt: config.prompt || "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      const beats =
        Array.isArray(data.beats) && data.beats.length >= 2
          ? data.beats.map((b) => String(b || ""))
          : [
              `First, imagine what happens when ${twist}.`,
              "Next, notice what stays the same and what is different.",
              "Then, think about one new problem or surprise that shows up.",
            ];
      dirty.current = true;
      setDraft((prev) => ({
        ...(prev || {}),
        beats,
        aiUsed: !data.fallback,
      }));
      setAiNote(data.message || null);
      setStatus(
        data.fallback
          ? "AI is resting — edit these beats or write your own."
          : "Here are your beats. Add your ending line below."
      );
    } catch (_) {
      dirty.current = true;
      setDraft((prev) => ({
        ...(prev || {}),
        beats: [
          `First, imagine what happens when ${twist}.`,
          "Next, notice what stays the same and what is different.",
        ],
        aiUsed: false,
      }));
      setAiNote("AI is resting. Write or edit your own beats.");
      setStatus("AI is resting — write your own beats.");
    } finally {
      setAiBusy(false);
    }
  }

  async function generatePostcardImage() {
    if (!draft || aiBusy) return;
    const message = (draft.message || "").trim();
    const desc =
      message ||
      [draft.to, draft.from].filter(Boolean).join(" / ") ||
      (config.topic || "a classroom postcard scene");
    setAiBusy(true);
    setAiNote(null);
    setStatus("Making a postcard picture…");
    try {
      const res = await fetch("/api/maker-studio/ai/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptText: `Postcard front illustration: ${desc}`,
          topic: config.topic || "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok && data.imageDataUrl) {
        dirty.current = true;
        setDraft((prev) => ({
          ...(prev || {}),
          imageDataUrl: data.imageDataUrl,
          imageSource: "ai",
        }));
        setStatus("Postcard front is ready.");
      } else {
        setAiNote(
          data.message ||
            "Picture helper is resting. Pick from the library or draw instead."
        );
        setStatus("Picture helper is resting — use the library or draw.");
      }
    } catch (_) {
      setAiNote("Couldn't make that picture. Pick from the library or draw instead.");
      setStatus("Couldn't make that picture — use the library or draw.");
    } finally {
      setAiBusy(false);
    }
  }

  function placeLibraryImage(item) {
    if (!item || !item.url || !libraryPicker) return;
    dirty.current = true;
    const url = item.url;
    if (libraryPicker.kind === "comic") {
      const idx = libraryPicker.index;
      setDraft((prev) => {
        const panels = ((prev && prev.panels) || []).map((p, i) =>
          i === idx ? { ...p, imageDataUrl: url } : p
        );
        return { ...(prev || {}), panels };
      });
    } else if (libraryPicker.kind === "before" || libraryPicker.kind === "after") {
      const side = libraryPicker.kind;
      setDraft((prev) => ({
        ...(prev || {}),
        [side]: { imageDataUrl: url },
      }));
    } else {
      setDraft((prev) => ({
        ...(prev || {}),
        imageDataUrl: url,
        imageSource:
          activeMode === "paint_what_i_said" || activeMode === "postcard"
            ? "library"
            : (prev && prev.imageSource) || null,
      }));
    }
    setLibraryPicker(null);
    setStatus("Picture placed from the library.");
  }

  function placeMapPin(e) {
    if (!pinPlaceMode || !draft) return;
    const pins = draft.pins || [];
    if (pins.length >= 6) {
      setStatus("You can place up to 6 pins.");
      setPinPlaceMode(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
    const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
    dirty.current = true;
    setDraft((prev) => ({
      ...(prev || {}),
      pins: [
        ...((prev && prev.pins) || []),
        { id: newPinId(), x, y, label: `Place ${pins.length + 1}` },
      ],
    }));
    setPinPlaceMode(false);
    setStatus("Pin placed — edit its label below.");
  }

  const title = (publicCase && publicCase.title) || "Maker Studio";
  const topicLine = config.topic ? config.topic : null;

  if (view === "done" || submitted) {
    return (
      <div className="mk-page" data-mode="done">
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
    const sketchSurface = draft.canvasSurface === "light_table" ? "light_table" : "whiteboard";
    return (
      <div className="mk-page" data-mode={activeMode}>
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

          <div className={`mk-panel mk-write mk-stage mk-stage-${activeMode}`}>
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
              <>
                <div className="mk-surface-toggle" role="group" aria-label="Canvas surface">
                  <span className="mk-quiet">Canvas</span>
                  <button
                    type="button"
                    className={`mk-tool${sketchSurface === "whiteboard" ? " on" : ""}`}
                    disabled={busy}
                    onClick={() => patchDraft({ canvasSurface: "whiteboard" })}
                  >
                    Whiteboard
                  </button>
                  <button
                    type="button"
                    className={`mk-tool${sketchSurface === "light_table" ? " on" : ""}`}
                    disabled={busy}
                    onClick={() => patchDraft({ canvasSurface: "light_table" })}
                  >
                    Light table
                  </button>
                </div>
                <div className="mk-upload-row">
                  <button
                    type="button"
                    className="mk-next"
                    disabled={busy}
                    onClick={() => setLibraryPicker({ kind: "sketch" })}
                  >
                    Pick from library
                  </button>
                  {isPlacedImage(draft.imageDataUrl) ? (
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
                {isLibraryPath(draft.imageDataUrl) ? (
                  <div className="mk-poster-preview">
                    <img src={draft.imageDataUrl} alt="Sketch from library" />
                  </div>
                ) : (
                  <MakerDrawPad
                    initialImage={draft.imageDataUrl}
                    onChange={(url) => patchDraft({ imageDataUrl: url })}
                    disabled={busy}
                    height={300}
                    surface={sketchSurface}
                  />
                )}
              </>
            ) : null}

            {activeMode === "diagram" ? (
              <>
                <div className="mk-upload-row">
                  <button
                    type="button"
                    className="mk-next"
                    disabled={busy}
                    onClick={() => setLibraryPicker({ kind: "diagram" })}
                  >
                    Pick from library
                  </button>
                  {isPlacedImage(draft.imageDataUrl) ? (
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
                {isLibraryPath(draft.imageDataUrl) ? (
                  <div className="mk-poster-preview">
                    <img src={draft.imageDataUrl} alt="Diagram from library" />
                  </div>
                ) : (
                  <MakerDrawPad
                    initialImage={draft.imageDataUrl}
                    onChange={(url) => patchDraft({ imageDataUrl: url })}
                    disabled={busy}
                    height={280}
                    labelChips={DIAGRAM_CHIPS}
                  />
                )}
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
              <div className="mk-broadcast-frame">
                <div className="mk-broadcast-preview">
                  {isPlacedImage(draft.imageDataUrl) ? (
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
                </div>
                <div className="mk-broadcast-controls">
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
                    <label>Picture — pick from library</label>
                    <div className="mk-upload-row">
                      <button
                        type="button"
                        className="mk-next"
                        disabled={busy}
                        onClick={() => setLibraryPicker({ kind: "poster" })}
                      >
                        Pick from library
                      </button>
                      <label className="mk-ghost mk-file-btn">
                        Upload
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
                      {isPlacedImage(draft.imageDataUrl) ? (
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
                </div>
              </div>
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
                      <div className="mk-upload-row">
                        <button
                          type="button"
                          className="mk-tool"
                          disabled={busy}
                          onClick={() => setLibraryPicker({ kind: "comic", index: idx })}
                        >
                          Pick from library
                        </button>
                        {isPlacedImage(panel.imageDataUrl) ? (
                          <button
                            type="button"
                            className="mk-tool"
                            disabled={busy}
                            onClick={() => {
                              const next = (draft.panels || []).map((p, i) =>
                                i === idx ? { ...p, imageDataUrl: null } : p
                              );
                              patchDraft({ panels: next });
                            }}
                          >
                            Clear
                          </button>
                        ) : null}
                      </div>
                      {isLibraryPath(panel.imageDataUrl) ? (
                        <div className="mk-poster-preview">
                          <img src={panel.imageDataUrl} alt={`Panel ${idx + 1}`} />
                        </div>
                      ) : (
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
                      )}
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

            {activeMode === "before_after" ? (
              <>
                <div className="mk-ba-grid">
                  {["before", "after"].map((side) => {
                    const panel = draft[side] || {};
                    const img = panel.imageDataUrl;
                    const title = side === "before" ? "Before" : "After";
                    return (
                      <div key={side} className="mk-ba-panel">
                        <div className="mk-comic-label">{title}</div>
                        <div className="mk-upload-row">
                          <button
                            type="button"
                            className="mk-tool"
                            disabled={busy}
                            onClick={() => setLibraryPicker({ kind: side })}
                          >
                            Pick from library
                          </button>
                          {isPlacedImage(img) ? (
                            <button
                              type="button"
                              className="mk-tool"
                              disabled={busy}
                              onClick={() => patchDraft({ [side]: { imageDataUrl: null } })}
                            >
                              Clear
                            </button>
                          ) : null}
                        </div>
                        {isLibraryPath(img) ? (
                          <div className="mk-poster-preview">
                            <img src={img} alt={title} />
                          </div>
                        ) : (
                          <MakerDrawPad
                            initialImage={img}
                            onChange={(url) => patchDraft({ [side]: { imageDataUrl: url } })}
                            disabled={busy}
                            height={200}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mk-field">
                  <label htmlFor="mk-ba-cap">What changed? (optional)</label>
                  <input
                    id="mk-ba-cap"
                    className="mk-input"
                    value={draft.caption || ""}
                    onChange={(e) => patchDraft({ caption: e.target.value })}
                    placeholder="One line about what changed…"
                    disabled={busy}
                    maxLength={160}
                  />
                </div>
              </>
            ) : null}

            {activeMode === "map_it" ? (
              <>
                <div className="mk-upload-row">
                  <button
                    type="button"
                    className="mk-next"
                    disabled={busy}
                    onClick={() => setLibraryPicker({ kind: "map" })}
                  >
                    Pick map background
                  </button>
                  {isPlacedImage(draft.imageDataUrl) ? (
                    <button
                      type="button"
                      className="mk-ghost"
                      disabled={busy}
                      onClick={() => {
                        patchDraft({ imageDataUrl: null, pins: [] });
                        setPinPlaceMode(false);
                      }}
                    >
                      Clear background
                    </button>
                  ) : null}
                </div>
                {!isPlacedImage(draft.imageDataUrl) ? (
                  <MakerDrawPad
                    initialImage={null}
                    onChange={(url) => patchDraft({ imageDataUrl: url })}
                    disabled={busy}
                    height={260}
                  />
                ) : (
                  <>
                    <div className="mk-upload-row">
                      <button
                        type="button"
                        className={`mk-tool${pinPlaceMode ? " on" : ""}`}
                        disabled={busy || (draft.pins || []).length >= 6}
                        onClick={() => setPinPlaceMode((v) => !v)}
                      >
                        {pinPlaceMode ? "Tap the map…" : "Add pin"}
                      </button>
                      <span className="mk-quiet">
                        {(draft.pins || []).length}/6 pins · tap Add pin, then tap the map
                      </span>
                    </div>
                    <div
                      className={`mk-map-stage${pinPlaceMode ? " is-placing" : ""}`}
                      onClick={placeMapPin}
                      role="presentation"
                    >
                      <img src={draft.imageDataUrl} alt="Map background" />
                      {(draft.pins || []).map((pin, idx) => (
                        <span
                          key={pin.id || idx}
                          className="mk-map-pin"
                          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                          title={pin.label || `Pin ${idx + 1}`}
                        >
                          {idx + 1}
                        </span>
                      ))}
                    </div>
                    <div className="mk-pin-list">
                      {(draft.pins || []).map((pin, idx) => (
                        <div key={pin.id || idx} className="mk-pin-row">
                          <span className="mk-pin-num">{idx + 1}</span>
                          <input
                            className="mk-input"
                            value={pin.label || ""}
                            onChange={(e) => {
                              const next = (draft.pins || []).map((p, i) =>
                                i === idx ? { ...p, label: e.target.value } : p
                              );
                              patchDraft({ pins: next });
                            }}
                            placeholder="Place label…"
                            disabled={busy}
                            maxLength={40}
                          />
                          <button
                            type="button"
                            className="mk-tool"
                            disabled={busy}
                            onClick={() => {
                              patchDraft({
                                pins: (draft.pins || []).filter((_, i) => i !== idx),
                              });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="mk-field">
                  <label htmlFor="mk-map-cap">Caption (optional)</label>
                  <input
                    id="mk-map-cap"
                    className="mk-input"
                    value={draft.caption || ""}
                    onChange={(e) => patchDraft({ caption: e.target.value })}
                    placeholder="How does this map show the idea?"
                    disabled={busy}
                    maxLength={160}
                  />
                </div>
              </>
            ) : null}

            {activeMode === "math_story" ? (
              <>
                <div className="mk-math-bench">
                  <div className="mk-math-bench-col">
                    <div className="mk-field">
                      <label htmlFor="mk-math-story">Your story</label>
                      <textarea
                        id="mk-math-story"
                        value={draft.story || ""}
                        onChange={(e) => patchDraft({ story: e.target.value })}
                        placeholder="Tell the math story in a few sentences…"
                        disabled={busy}
                      />
                    </div>
                  </div>
                  <div className="mk-math-bench-col">
                    <div className="mk-field">
                      <label htmlFor="mk-math-work">Work / equation</label>
                      <textarea
                        id="mk-math-work"
                        className="mk-work-box"
                        value={draft.workText || ""}
                        onChange={(e) => patchDraft({ workText: e.target.value })}
                        placeholder="Show the numbers and steps…"
                        disabled={busy}
                      />
                    </div>
                  </div>
                </div>
                <div className="mk-upload-row">
                  <button
                    type="button"
                    className="mk-tool"
                    disabled={busy}
                    onClick={() => setLibraryPicker({ kind: "math" })}
                  >
                    Optional library picture
                  </button>
                  {isPlacedImage(draft.imageDataUrl) ? (
                    <button
                      type="button"
                      className="mk-tool"
                      disabled={busy}
                      onClick={() => patchDraft({ imageDataUrl: null })}
                    >
                      Clear picture
                    </button>
                  ) : null}
                </div>
                {isLibraryPath(draft.imageDataUrl) ? (
                  <div className="mk-poster-preview">
                    <img src={draft.imageDataUrl} alt="Math story picture" />
                  </div>
                ) : (
                  <MakerDrawPad
                    initialImage={draft.imageDataUrl}
                    onChange={(url) => patchDraft({ imageDataUrl: url })}
                    disabled={busy}
                    height={180}
                  />
                )}
              </>
            ) : null}

            {activeMode === "interview" ? (
              <>
                <div className="mk-comic-count">
                  <span className="mk-quiet">Questions:</span>
                  {[3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`mk-tool${(draft.rows || []).length === n ? " on" : ""}`}
                      disabled={busy}
                      onClick={() => {
                        const cur = draft.rows || [];
                        if (cur.length === n) return;
                        let next;
                        if (cur.length < n) {
                          next = [
                            ...cur,
                            ...emptyInterviewRows(n).slice(cur.length, n),
                          ];
                        } else {
                          next = cur.slice(0, n);
                        }
                        patchDraft({ rows: next });
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="mk-interview-list">
                  {(draft.rows || []).map((row, idx) => (
                    <div key={idx} className="mk-interview-row">
                      <div className="mk-field">
                        <label htmlFor={`mk-iq-${idx}`}>Question {idx + 1}</label>
                        <input
                          id={`mk-iq-${idx}`}
                          className="mk-input"
                          value={row.question || ""}
                          onChange={(e) => {
                            const next = (draft.rows || []).map((r, i) =>
                              i === idx ? { ...r, question: e.target.value } : r
                            );
                            patchDraft({ rows: next });
                          }}
                          placeholder="Question…"
                          disabled={busy}
                          maxLength={160}
                        />
                      </div>
                      <div className="mk-field">
                        <label htmlFor={`mk-ia-${idx}`}>Your answer</label>
                        <textarea
                          id={`mk-ia-${idx}`}
                          value={row.answer || ""}
                          onChange={(e) => {
                            const next = (draft.rows || []).map((r, i) =>
                              i === idx ? { ...r, answer: e.target.value } : r
                            );
                            patchDraft({ rows: next });
                          }}
                          placeholder="Answer in your own words…"
                          disabled={busy}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {activeMode === "sort_of_my_own" ? (
              <>
                <div className="mk-field">
                  <label>Your categories (2–4)</label>
                  <div className="mk-sort-cats">
                    {(draft.categories || []).map((cat, idx) => (
                      <div key={idx} className="mk-sort-cat-row">
                        <input
                          className="mk-input"
                          value={cat || ""}
                          onChange={(e) => {
                            const next = (draft.categories || []).map((c, i) =>
                              i === idx ? e.target.value : c
                            );
                            patchDraft({ categories: next });
                          }}
                          placeholder={`Category ${idx + 1}`}
                          disabled={busy}
                          maxLength={40}
                        />
                        {(draft.categories || []).length > 2 ? (
                          <button
                            type="button"
                            className="mk-tool"
                            disabled={busy}
                            onClick={() => {
                              const nextCats = (draft.categories || []).filter((_, i) => i !== idx);
                              const nextItems = (draft.items || []).map((it) => {
                                if (it.categoryIndex == null) return it;
                                if (Number(it.categoryIndex) === idx) {
                                  return { ...it, categoryIndex: null };
                                }
                                if (Number(it.categoryIndex) > idx) {
                                  return { ...it, categoryIndex: Number(it.categoryIndex) - 1 };
                                }
                                return it;
                              });
                              patchDraft({ categories: nextCats, items: nextItems });
                            }}
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  {(draft.categories || []).length < 4 ? (
                    <button
                      type="button"
                      className="mk-tool"
                      style={{ marginTop: 8 }}
                      disabled={busy}
                      onClick={() =>
                        patchDraft({
                          categories: [
                            ...(draft.categories || []),
                            `Group ${String.fromCharCode(65 + (draft.categories || []).length)}`,
                          ],
                        })
                      }
                    >
                      Add category
                    </button>
                  ) : null}
                </div>

                <div className="mk-field">
                  <label>Items — tap one, then tap a category to sort</label>
                  <div className="mk-sort-items">
                    {(draft.items || []).map((it) => {
                      const assigned =
                        it.categoryIndex != null &&
                        (draft.categories || [])[Number(it.categoryIndex)];
                      const active = sortActiveItem === it.id;
                      return (
                        <button
                          key={it.id}
                          type="button"
                          className={`mk-sort-chip${active ? " is-active" : ""}${
                            assigned ? " is-sorted" : ""
                          }`}
                          disabled={busy}
                          onClick={() => setSortActiveItem(active ? null : it.id)}
                        >
                          <input
                            className="mk-sort-chip-input"
                            value={it.label || ""}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const next = (draft.items || []).map((row) =>
                                row.id === it.id ? { ...row, label: e.target.value } : row
                              );
                              patchDraft({ items: next });
                            }}
                            disabled={busy}
                            maxLength={40}
                          />
                          <span className="mk-quiet">
                            {assigned ? String(assigned) : "Unsorted"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mk-upload-row" style={{ marginTop: 8 }}>
                    <button
                      type="button"
                      className="mk-tool"
                      disabled={busy || (draft.items || []).length >= 12}
                      onClick={() => {
                        const n = (draft.items || []).length + 1;
                        patchDraft({
                          items: [
                            ...(draft.items || []),
                            { id: `item-${Date.now()}`, label: `Item ${n}`, categoryIndex: null },
                          ],
                        });
                      }}
                    >
                      Add item
                    </button>
                  </div>
                </div>

                <div className="mk-sort-targets">
                  {(draft.categories || []).map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="mk-sort-target"
                      disabled={busy || !sortActiveItem}
                      onClick={() => {
                        if (!sortActiveItem) return;
                        const next = (draft.items || []).map((it) =>
                          it.id === sortActiveItem ? { ...it, categoryIndex: idx } : it
                        );
                        patchDraft({ items: next });
                        setSortActiveItem(null);
                      }}
                    >
                      <b>{(cat || "").trim() || `Category ${idx + 1}`}</b>
                      <span className="mk-quiet">
                        {(draft.items || []).filter((it) => Number(it.categoryIndex) === idx).length}{" "}
                        items
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {activeMode === "teach_the_buddy" ? (
              <>
                <div className="mk-field">
                  <label htmlFor="mk-buddy-expl">Teach Buddy — your explanation</label>
                  <textarea
                    id="mk-buddy-expl"
                    value={draft.explanation || ""}
                    onChange={(e) => patchDraft({ explanation: e.target.value })}
                    placeholder="Explain the idea like you are teaching a friend…"
                    disabled={busy || aiBusy}
                  />
                </div>
                <div className="mk-ai-row">
                  <button
                    type="button"
                    className="mk-next"
                    disabled={busy || aiBusy || !(draft.explanation || "").trim()}
                    onClick={askBuddy}
                  >
                    {aiBusy ? "Asking…" : "Ask Buddy"}
                  </button>
                  <span className="mk-quiet">Buddy asks check questions — not a grade.</span>
                </div>
                {aiNote ? <p className="mk-warn">{aiNote}</p> : null}
                <div className="mk-interview-list">
                  {(draft.questions || []).map((row, idx) => (
                    <div key={idx} className="mk-interview-row">
                      <label htmlFor={`mk-buddy-a-${idx}`}>
                        {(row && row.question) || `Question ${idx + 1}`}
                      </label>
                      <textarea
                        id={`mk-buddy-a-${idx}`}
                        value={(row && row.answer) || ""}
                        onChange={(e) => {
                          const next = (draft.questions || []).map((q, i) =>
                            i === idx ? { ...q, answer: e.target.value } : q
                          );
                          patchDraft({ questions: next });
                        }}
                        placeholder="Your answer…"
                        disabled={busy || aiBusy}
                      />
                    </div>
                  ))}
                </div>
                {(draft.questions || []).length === 0 ? (
                  <p className="mk-quiet">Tap Ask Buddy after you write, or answer will unlock with backup questions.</p>
                ) : null}
              </>
            ) : null}

            {activeMode === "paint_what_i_said" ? (
              <>
                <div className="mk-field">
                  <label htmlFor="mk-paint-prompt">Describe the picture</label>
                  <textarea
                    id="mk-paint-prompt"
                    value={draft.promptText || ""}
                    onChange={(e) => patchDraft({ promptText: e.target.value })}
                    placeholder="A few clear words about what you want to see…"
                    disabled={busy || aiBusy}
                  />
                </div>
                <div className="mk-ai-row">
                  {!(draft.imageDataUrl && draft.imageSource === "ai") ? (
                    <button
                      type="button"
                      className="mk-next"
                      disabled={busy || aiBusy || !(draft.promptText || "").trim()}
                      onClick={() => generatePaintImage({ regenerate: false })}
                    >
                      {aiBusy ? "Painting…" : "Paint it"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mk-next"
                      disabled={
                        busy ||
                        aiBusy ||
                        !(draft.promptText || "").trim() ||
                        Math.max(0, Number(draft.regenerateCount) || 0) >= PAINT_MAX_REGENS
                      }
                      onClick={() => generatePaintImage({ regenerate: true })}
                    >
                      {aiBusy ? "Painting…" : "Regenerate"}
                    </button>
                  )}
                  <button
                    type="button"
                    className="mk-tool"
                    disabled={busy || aiBusy}
                    onClick={() => setLibraryPicker({ kind: "paint" })}
                  >
                    Pick from library
                  </button>
                  <span className="mk-regen-note">
                    Regenerates used: {Math.max(0, Number(draft.regenerateCount) || 0)}/{PAINT_MAX_REGENS}
                  </span>
                </div>
                {aiNote ? <p className="mk-warn">{aiNote}</p> : null}
                {isLibraryPath(draft.imageDataUrl) ||
                (typeof draft.imageDataUrl === "string" &&
                  (draft.imageDataUrl.startsWith("data:") ||
                    draft.imageDataUrl.startsWith("http"))) ? (
                  <div className="mk-poster-preview">
                    <img src={draft.imageDataUrl} alt="Painted picture" />
                  </div>
                ) : null}
                <div className="mk-field">
                  <label>Or draw your own</label>
                  <MakerDrawPad
                    initialImage={
                      draft.imageSource === "draw" ? draft.imageDataUrl : null
                    }
                    onChange={(url) =>
                      patchDraft({ imageDataUrl: url, imageSource: "draw" })
                    }
                    disabled={busy || aiBusy}
                    height={220}
                  />
                </div>
                {isPlacedImage(draft.imageDataUrl) ? (
                  <button
                    type="button"
                    className="mk-ghost"
                    disabled={busy || aiBusy}
                    onClick={() =>
                      patchDraft({ imageDataUrl: null, imageSource: null })
                    }
                  >
                    Clear picture
                  </button>
                ) : null}
              </>
            ) : null}

            {activeMode === "what_if" ? (
              <>
                <div className="mk-field">
                  <label htmlFor="mk-whatif-twist">What if…</label>
                  <input
                    id="mk-whatif-twist"
                    className="mk-input"
                    value={draft.twist || ""}
                    onChange={(e) => patchDraft({ twist: e.target.value })}
                    placeholder="…one thing about today's idea changed"
                    disabled={busy || aiBusy}
                    maxLength={200}
                  />
                </div>
                <div className="mk-twist-chips">
                  {WHAT_IF_TWIST_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className="mk-twist-chip"
                      disabled={busy || aiBusy}
                      onClick={() => patchDraft({ twist: chip })}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <div className="mk-ai-row">
                  <button
                    type="button"
                    className="mk-next"
                    disabled={busy || aiBusy || !(draft.twist || "").trim()}
                    onClick={runWhatIfBeats}
                  >
                    {aiBusy ? "Thinking…" : "Get story beats"}
                  </button>
                  <button
                    type="button"
                    className="mk-tool"
                    disabled={busy || aiBusy}
                    onClick={() => {
                      dirty.current = true;
                      setDraft((prev) => ({
                        ...(prev || {}),
                        beats: ["", ""],
                        aiUsed: false,
                      }));
                      setAiNote("Write your own 2–3 beats.");
                      setStatus("Write your own beats below.");
                    }}
                  >
                    I'll write my own
                  </button>
                </div>
                {aiNote ? <p className="mk-warn">{aiNote}</p> : null}
                <div className="mk-beats">
                  {(draft.beats || []).map((beat, idx) => (
                    <div key={idx} className="mk-beat">
                      <label htmlFor={`mk-beat-${idx}`}>Beat {idx + 1}</label>
                      <textarea
                        id={`mk-beat-${idx}`}
                        value={beat || ""}
                        onChange={(e) => {
                          const next = (draft.beats || []).map((b, i) =>
                            i === idx ? e.target.value : b
                          );
                          patchDraft({ beats: next });
                        }}
                        placeholder="What happens in this beat?"
                        disabled={busy || aiBusy}
                      />
                    </div>
                  ))}
                </div>
                {(draft.beats || []).length < 3 ? (
                  <button
                    type="button"
                    className="mk-tool"
                    style={{ marginTop: 8 }}
                    disabled={busy || aiBusy}
                    onClick={() =>
                      patchDraft({ beats: [...(draft.beats || []), ""] })
                    }
                  >
                    Add beat
                  </button>
                ) : null}
                <div className="mk-field">
                  <label htmlFor="mk-whatif-end">Your ending line</label>
                  <input
                    id="mk-whatif-end"
                    className="mk-input"
                    value={draft.ending || ""}
                    onChange={(e) => patchDraft({ ending: e.target.value })}
                    placeholder="How does your What if… end?"
                    disabled={busy || aiBusy}
                    maxLength={200}
                  />
                </div>
              </>
            ) : null}

            {activeMode === "postcard" ? (
              <>
                <div className="mk-field">
                  <label htmlFor="mk-pc-to">To</label>
                  <input
                    id="mk-pc-to"
                    className="mk-input"
                    value={draft.to || ""}
                    onChange={(e) => patchDraft({ to: e.target.value })}
                    placeholder="Who gets this postcard?"
                    disabled={busy || aiBusy}
                    maxLength={80}
                  />
                </div>
                <div className="mk-field">
                  <label htmlFor="mk-pc-from">From</label>
                  <input
                    id="mk-pc-from"
                    className="mk-input"
                    value={draft.from || ""}
                    onChange={(e) => patchDraft({ from: e.target.value })}
                    placeholder="Who is writing?"
                    disabled={busy || aiBusy}
                    maxLength={80}
                  />
                </div>
                <div className="mk-field">
                  <label htmlFor="mk-pc-msg">Message</label>
                  <textarea
                    id="mk-pc-msg"
                    value={draft.message || ""}
                    onChange={(e) => patchDraft({ message: e.target.value })}
                    placeholder="A short message from that time or place…"
                    disabled={busy || aiBusy}
                  />
                </div>
                <div className="mk-ai-row">
                  <button
                    type="button"
                    className="mk-next"
                    disabled={busy || aiBusy}
                    onClick={generatePostcardImage}
                  >
                    {aiBusy ? "Making…" : "AI front picture"}
                  </button>
                  <button
                    type="button"
                    className="mk-tool"
                    disabled={busy || aiBusy}
                    onClick={() => setLibraryPicker({ kind: "postcard" })}
                  >
                    Pick from library
                  </button>
                </div>
                {aiNote ? <p className="mk-warn">{aiNote}</p> : null}
                <div className="mk-postcard-front">
                  {isPlacedImage(draft.imageDataUrl) ? (
                    <img src={draft.imageDataUrl} alt="Postcard front" />
                  ) : (
                    <span className="mk-quiet">Front of postcard</span>
                  )}
                </div>
                <div className="mk-field">
                  <label>Or draw the front</label>
                  <MakerDrawPad
                    initialImage={
                      draft.imageSource === "draw" ? draft.imageDataUrl : null
                    }
                    onChange={(url) =>
                      patchDraft({ imageDataUrl: url, imageSource: "draw" })
                    }
                    disabled={busy || aiBusy}
                    height={200}
                  />
                </div>
                {isPlacedImage(draft.imageDataUrl) ? (
                  <button
                    type="button"
                    className="mk-ghost"
                    disabled={busy || aiBusy}
                    onClick={() =>
                      patchDraft({ imageDataUrl: null, imageSource: null })
                    }
                  >
                    Clear picture
                  </button>
                ) : null}
              </>
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
                  disabled={busy || aiBusy || !modeReadyForDone(activeMode, draft)}
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

          <LibraryPicker
            open={!!libraryPicker}
            title="Pick a picture"
            onClose={() => setLibraryPicker(null)}
            onSelect={placeLibraryImage}
          />
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
    <div className="mk-page" data-mode="home">
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
