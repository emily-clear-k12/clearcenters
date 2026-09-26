// Maker Studio — Wave 0 catalog (prompt + mode grid; Write live).
import { MAKER_MODES, sanitizeEnabledModes } from "./modes.js";
import { MAKER_MENUS } from "./menus.js";

const QUICK = {
  id: "MS.QUICK-WRITE",
  standard: "MS.QUICK-WRITE",
  engine: "maker_studio",
  grade: 3,
  subject: "Science",
  teks: null,
  kicker: "Maker Studio · Quick Maker",
  title: "Quick Maker (Write)",
  estimatedMinutes: 12,
  topic: "Your topic",
  prompt:
    "Write about today's idea in your own words. What do you understand, and what makes you think that?",
  enabledModes: ["write"],
  finishN: 1,
  everydayCount: 1,
  challengeCount: 0,
  journalOnRelease: true,
  samOpen: "Read the prompt, tap Write, and make your piece. You've got this.",
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
  return {
    prompt: base.prompt,
    topic: base.topic || "",
    enabledModes: sanitizeEnabledModes(base.enabledModes),
    finishN: Math.max(1, Number(base.finishN) || 1),
    everydayCount:
      base.everydayCount === null || base.everydayCount === undefined
        ? null
        : Number(base.everydayCount),
    challengeCount:
      base.challengeCount === null || base.challengeCount === undefined
        ? null
        : Number(base.challengeCount),
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
  const finishN = Math.max(
    1,
    Math.min(
      enabledModes.length,
      Number(cfg.finishN != null ? cfg.finishN : defaults.finishN) || 1
    )
  );
  return {
    prompt: String(cfg.prompt || defaults.prompt || "").trim() || defaults.prompt,
    topic: String(cfg.topic != null ? cfg.topic : defaults.topic || "").trim(),
    enabledModes,
    finishN,
    everydayCount:
      cfg.everydayCount === "" || cfg.everydayCount == null
        ? defaults.everydayCount
        : Number(cfg.everydayCount),
    challengeCount:
      cfg.challengeCount === "" || cfg.challengeCount == null
        ? defaults.challengeCount
        : Number(cfg.challengeCount),
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
      // Student-visible "this mode exists"; live flag is also gated by enabledModes.
      available: !!m.live,
      instructions: m.instructions || null,
      doneHint: m.doneHint || null,
    })),
    config,
    menus: MAKER_MENUS.map((m) => ({
      id: m.id,
      title: m.title,
      blurb: m.blurb,
    })),
  };
}

export { MAKER_MENUS, MAKER_MODES };
