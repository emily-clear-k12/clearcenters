// Maker Studio — Wave 1 catalog (prompt + mode grid; Write/Sketch/Diagram/Poster/Comic/Voice live).
import { MAKER_MODES, sanitizeEnabledModes } from "./modes.js";
import { MAKER_PROMPT_CARDS, promptCardsForCase } from "./menus.js";

const QUICK = {
  id: "MS.QUICK-WRITE",
  standard: "MS.QUICK-WRITE",
  engine: "maker_studio",
  grade: 3,
  subject: "Science",
  teks: null,
  kicker: "Maker Studio · Quick Maker",
  title: "Quick Maker",
  estimatedMinutes: 12,
  topic: "Your topic",
  prompt:
    "Write about today's idea in your own words. What do you understand, and what makes you think that?",
  enabledModes: ["write"],
  finishN: 1,
  everydayCount: 0,
  challengeCount: 0,
  journalOnRelease: true,
  samOpen: "Read the prompt, pick a make mode, and make your piece. You've got this.",
  writeInstructions:
    "Write a clear answer. Use your own words. When it feels finished, tap Done.",
};

const CASES = {
  [QUICK.standard]: QUICK,
};

export function listMakerStudioCases() {
  return Object.values(CASES);
}

export function getMakerStudioCase(standard) {
  return CASES[standard] || null;
}

export function defaultMakerConfig(caseRow) {
  const base = caseRow || QUICK;
  const enabledModes = sanitizeEnabledModes(base.enabledModes);
  return {
    prompt: base.prompt,
    topic: base.topic || "",
    enabledModes,
    // Finish requirement = every enabled mode. Teachers never set Finish N.
    finishN: enabledModes.length,
    everydayCount: 0,
    challengeCount: 0,
    journalOnRelease: base.journalOnRelease !== false,
  };
}

/** Merge case defaults with a teacher assignment config. */
export function resolveMakerConfig(standard, assignmentConfig) {
  const caseRow = getMakerStudioCase(standard) || QUICK;
  const defaults = defaultMakerConfig(caseRow);
  const cfg = assignmentConfig && typeof assignmentConfig === "object" ? assignmentConfig : {};
  const enabledModes = sanitizeEnabledModes(
    Array.isArray(cfg.enabledModes) && cfg.enabledModes.length
      ? cfg.enabledModes
      : defaults.enabledModes
  );
  // Always: student submits when every enabled mode is Done.
  const finishN = enabledModes.length;
  return {
    prompt: String(cfg.prompt || defaults.prompt || "").trim() || defaults.prompt,
    topic: String(cfg.topic != null ? cfg.topic : defaults.topic || "").trim(),
    enabledModes,
    finishN,
    everydayCount: 0,
    challengeCount: 0,
    journalOnRelease:
      cfg.journalOnRelease === undefined
        ? defaults.journalOnRelease
        : !!cfg.journalOnRelease,
  };
}

export function publicMakerStudioCase(standard) {
  const c = getMakerStudioCase(standard);
  if (!c) return null;
  const config = defaultMakerConfig(c);
  const prompts = promptCardsForCase(standard);
  return {
    standard: c.standard,
    engine: "maker_studio",
    grade: c.grade,
    subject: c.subject,
    kicker: c.kicker,
    title: c.title,
    estimatedMinutes: c.estimatedMinutes,
    samOpen: c.samOpen,
    writeInstructions: c.writeInstructions,
    modes: MAKER_MODES.map((m) => ({
      id: m.id,
      label: m.label,
      blurb: m.blurb,
      icon: m.icon,
      available: !!m.live,
      instructions: m.instructions || null,
      doneHint: m.doneHint || null,
    })),
    config,
    prompts: prompts.map((p) => ({
      id: p.id,
      title: p.title,
      label: p.label || p.title,
      prompt: p.prompt,
    })),
  };
}

export { MAKER_PROMPT_CARDS, MAKER_MODES, promptCardsForCase };
