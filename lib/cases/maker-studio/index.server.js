// Maker Studio Wave 1 â€” teacher-reviewed artifacts (NOT AI-graded).
import { getMakerStudioCase, resolveMakerConfig } from "./catalog.js";
import { modeById } from "./modes.js";

function slotPreview(id, slot) {
  if (!slot || typeof slot !== "object") return "";
  if (id === "write") return typeof slot.text === "string" ? slot.text : "";
  if (id === "sketch") return slot.imageDataUrl ? "(sketch drawing)" : "";
  if (id === "diagram") {
    const cap = typeof slot.caption === "string" ? slot.caption.trim() : "";
    if (cap) return cap;
    return slot.imageDataUrl ? "(diagram drawing)" : "";
  }
  if (id === "poster") {
    const title = typeof slot.title === "string" ? slot.title.trim() : "";
    const caption = typeof slot.caption === "string" ? slot.caption.trim() : "";
    const bits = [title, caption].filter(Boolean);
    if (bits.length) return bits.join(" â€” ");
    return slot.imageDataUrl ? "(poster image)" : "";
  }
  if (id === "comic") {
    const panels = Array.isArray(slot.panels) ? slot.panels : [];
    const lines = panels
      .map((p, i) => {
        const t = p && typeof p.text === "string" ? p.text.trim() : "";
        return t ? `Panel ${i + 1}: ${t}` : null;
      })
      .filter(Boolean);
    if (lines.length) return lines.join("\n");
    return panels.some((p) => p && p.imageDataUrl) ? "(comic panels)" : "";
  }
  if (id === "voice") {
    if (slot.audioDataUrl) {
      const sec = Number(slot.durationSec);
      return Number.isFinite(sec) && sec > 0
        ? `(voice note Â· ${Math.round(sec)}s)`
        : "(voice note)";
    }
    return "";
  }
  return typeof slot.text === "string" ? slot.text : "";
}

export function summarizeMakerPieces(data, config) {
  const modes = (data && data.modes) || {};
  const enabled = (config && config.enabledModes) || ["write"];
  const pieces = enabled.map((id) => {
    const slot = modes[id] || {};
    const meta = modeById(id);
    return {
      id,
      label: (meta && meta.label) || id,
      status: slot.status || "empty",
      text: slotPreview(id, slot),
      imageDataUrl: typeof slot.imageDataUrl === "string" ? slot.imageDataUrl : null,
      audioDataUrl: typeof slot.audioDataUrl === "string" ? slot.audioDataUrl : null,
      title: typeof slot.title === "string" ? slot.title : "",
      caption: typeof slot.caption === "string" ? slot.caption : "",
      panels: Array.isArray(slot.panels) ? slot.panels : null,
      durationSec: slot.durationSec != null ? Number(slot.durationSec) : null,
      updatedAt: slot.updatedAt || null,
      raw: slot,
    };
  });
  const doneCount = pieces.filter((p) => p.status === "done").length;
  // Submit when every enabled mode is Done (finishN mirrors enabledModes.length).
  return { pieces, doneCount, finishN: Math.max(1, enabled.length || 1) };
}

export function makerAttemptText(data, config) {
  const { pieces } = summarizeMakerPieces(data, config);
  if (!pieces.length) return "(no pieces yet)";
  return pieces
    .map((p) => {
      const body = (p.text || "").trim() || "(empty)";
      return `[${p.label} Â· ${p.status}]\n${body}`;
    })
    .join("\n\n");
}

export function getMakerStudioCaseOrNull(standard) {
  return getMakerStudioCase(standard);
}

export { resolveMakerConfig };
