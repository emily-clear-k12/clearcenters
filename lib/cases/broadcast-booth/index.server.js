// Broadcast Booth — teacher-reviewed voice product (NOT AI-graded).
import { getBroadcastBoothCase, labeledBeats, SAFETY_KEYWORDS } from "./catalog.js";

export function emptyBeatSlot() {
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

export function broadcastAttemptText(data, caseRow) {
  if (!data || typeof data !== "object") return "";
  const beats = labeledBeats(caseRow || {}, data.config || {});
  const slots = data.beats && typeof data.beats === "object" ? data.beats : {};
  const lines = [];
  for (const b of beats) {
    const slot = slots[b.id] || {};
    const t = typeof slot.transcript === "string" ? slot.transcript.trim() : "";
    const sec = Number(slot.durationSec) || 0;
    if (t) lines.push(`${b.label}: ${t}`);
    else if (slot.audioDataUrl) lines.push(`${b.label}: (audio · ${Math.round(sec)}s)`);
  }
  return lines.join("\n");
}

export function scanSafetyText(text) {
  const raw = String(text || "").toLowerCase();
  if (!raw.trim()) return { flagged: false, hits: [] };
  const hits = SAFETY_KEYWORDS.filter((k) => raw.includes(k));
  return { flagged: hits.length > 0, hits };
}

export function summarizeBroadcast(data, caseRow) {
  const beats = labeledBeats(caseRow || {}, (data && data.config) || {});
  const slots = (data && data.beats) || {};
  let done = 0;
  const missingStills = [];
  for (const b of beats) {
    const slot = slots[b.id];
    if (slot && slot.audioDataUrl && slot.status === "done") done += 1;
    if (b.stillRequired && slot && slot.audioDataUrl && !slot.stillDataUrl) {
      missingStills.push(b.id);
    }
  }
  return {
    doneCount: done,
    total: beats.length,
    complete: done >= beats.length,
    missingStills,
    stimulusReady: !!(data && data.stimulusReady),
  };
}

export { getBroadcastBoothCase };
