// Maker Studio Wave 0 — teacher-reviewed artifacts (NOT AI-graded).
import { getMakerStudioCase, resolveMakerConfig } from "./catalog.js";
import { modeById } from "./modes.js";

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
      text: typeof slot.text === "string" ? slot.text : "",
      updatedAt: slot.updatedAt || null,
    };
  });
  const doneCount = pieces.filter((p) => p.status === "done").length;
  return { pieces, doneCount, finishN: (config && config.finishN) || 1 };
}

export function makerAttemptText(data, config) {
  const { pieces } = summarizeMakerPieces(data, config);
  if (!pieces.length) return "(no pieces yet)";
  return pieces
    .map((p) => {
      const body = (p.text || "").trim() || "(empty)";
      return `[${p.label} · ${p.status}]\n${body}`;
    })
    .join("\n\n");
}

export function getMakerStudioCaseOrNull(standard) {
  return getMakerStudioCase(standard);
}

export { resolveMakerConfig };
