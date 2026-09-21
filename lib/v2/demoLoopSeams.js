// CI2.0 · Whole-loop seams — same story + who across Daily Focus, Check-ins, Reports.
// Soft labels + soft clusters live in demoReports; this module bridges Focus / Check-ins.

import {
  REPORTS_HREF,
  REPORTS_HONESTY,
  REPORTS_STANDARD_HREF,
  softClassPctLabel,
  softNeedsLabel,
  formatSoftNames,
  pickSoftestStandard,
  DEMO_STANDARD_REPORTS,
  getContributingAssignments,
  buildSamStory,
} from "./demoReports";
import { kidGradingHref } from "./demoGrading";

export { REPORTS_HREF, REPORTS_HONESTY, softClassPctLabel, softNeedsLabel, formatSoftNames };

export const CHECK_INS_HREF = "/v2/teacher/check-ins";
export const DAY_HREF = "/v2/teacher/day?d=2";
/** Family note for the class-story cluster (5.6B · Sofia), not a leftover Kai default. */
export const FAMILY_NOTE_STORY_ID = "wnm-sofia";

/** First-name → Check-ins card id (wnm-*). */
export const KID_FIRST_TO_WNM = {
  sofia: "wnm-sofia",
  noah: "wnm-noah",
  diego: "wnm-diego",
  kai: "wnm-kai",
  riley: "wnm-riley",
};

export function wnmIdForFirstName(firstName) {
  const key = String(firstName || "").trim().toLowerCase();
  return KID_FIRST_TO_WNM[key] || null;
}

/**
 * Check-ins deep link — period + standard + student.
 * CheckInsClient reads all three: room sync, cluster highlight, kid focus.
 */
export function checkInsHref(opts = {}) {
  const params = new URLSearchParams();
  const period =
    opts.periodId && String(opts.periodId) !== "all"
      ? String(opts.periodId).trim()
      : "";
  if (period) params.set("period", period);
  const standard = opts.standard ? String(opts.standard).trim() : "";
  if (standard) params.set("standard", standard);
  const student = String(opts.student || opts.studentFirst || "").trim();
  if (student) params.set("student", student);
  const q = params.toString();
  return q ? `${CHECK_INS_HREF}?${q}` : CHECK_INS_HREF;
}

export function checkInsHrefForPeriod(periodId) {
  return checkInsHref({ periodId });
}

export function checkInsHrefForStandard(code, opts = {}) {
  return checkInsHref({
    periodId: opts.periodId,
    standard: code,
    student: opts.student || opts.studentFirst,
  });
}

/**
 * Primary kid door — existing kid grading page.
 * Quiet ?from=standard&code= so the kid page can offer a soft way back.
 * Pass via: "checkins" for Check-ins ?student=&standard= instead.
 */
export function kidDoorHref(firstName, opts = {}) {
  const name = String(firstName || "").trim();
  if (!name) return CHECK_INS_HREF;
  if (opts.via === "checkins") {
    return checkInsHref({
      periodId: opts.periodId,
      standard: opts.standard,
      student: name,
    });
  }
  const base = kidGradingHref({ studentFirst: name });
  const params = new URLSearchParams();
  if (opts.standard) {
    params.set("from", "standard");
    params.set("code", String(opts.standard).trim());
  }
  if (opts.periodId && String(opts.periodId) !== "all") {
    params.set("period", String(opts.periodId).trim());
  }
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

/** Soft cluster → [{ name, href, wnmId, checkInsHref }] for report name links. */
export function softClusterDoors(names, opts = {}) {
  const list = Array.isArray(names) ? names.filter(Boolean) : [];
  return list.map((name) => ({
    name,
    href: kidDoorHref(name, opts),
    wnmId: wnmIdForFirstName(name),
    checkInsHref: checkInsHref({
      periodId: opts.periodId,
      standard: opts.standard,
      student: name,
    }),
  }));
}

/**
 * Softest class-story row (+ who + readiness words).
 * Shared so Focus watch / Check-ins band / Reports speak one cast.
 */

/* ─── Loop remember (demo/localStorage only) ─────────────────────────
 * Remembers what the teacher just did on the softest loop so Focus,
 * Check-ins, and Reports don't repeat the identical first-visit pitch.
 * Shape per standard: { standard, satAt?, reteachAt?, kidOpened?, names?, source? }
 */
export const LOOP_REMEMBER_KEY = "ci2.loop.remember";

export function normalizeStandardCode(code) {
  return String(code || "").trim().toUpperCase();
}

export function loadLoopRemember() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LOOP_REMEMBER_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveLoopRemember(map) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOOP_REMEMBER_KEY, JSON.stringify(map || {}));
    try {
      window.dispatchEvent(new CustomEvent("ci2-loop-remember-updated"));
    } catch {
      /* ignore */
    }
  } catch {
    /* ignore quota */
  }
}

export function getRememberEntry(code) {
  const key = normalizeStandardCode(code);
  if (!key) return null;
  const map = loadLoopRemember();
  const hit = map[key];
  return hit && typeof hit === "object" ? hit : null;
}

function upsertRemember(code, patch) {
  const key = normalizeStandardCode(code);
  if (!key || typeof window === "undefined") return null;
  const map = loadLoopRemember();
  const prev = map[key] && typeof map[key] === "object" ? map[key] : {};
  const next = {
    ...prev,
    ...patch,
    standard: key,
    updatedAt: new Date().toISOString(),
  };
  map[key] = next;
  saveLoopRemember(map);
  return next;
}

/** Reports → Put reteach on today. */
export function rememberReteachFromReports(code, opts = {}) {
  const names = Array.isArray(opts.names) ? opts.names.filter(Boolean) : undefined;
  return upsertRemember(code, {
    reteachAt: new Date().toISOString(),
    source: "reports",
    ...(names && names.length ? { names } : {}),
  });
}

/**
 * Teacher sat with the soft cluster — opened a kid from it, or completed /
 * dismissed a Check-in for someone in it.
 */
export function rememberSitWithCluster(code, opts = {}) {
  const patch = {
    satAt: new Date().toISOString(),
  };
  if (opts.kidOpened) patch.kidOpened = String(opts.kidOpened).trim();
  if (opts.source) patch.source = String(opts.source);
  if (Array.isArray(opts.names) && opts.names.length) patch.names = opts.names.filter(Boolean);
  return upsertRemember(code, patch);
}

export function hasSatWith(code) {
  const e = getRememberEntry(code);
  return Boolean(e && (e.satAt || e.reteachAt));
}

export function hasReteachOnToday(code) {
  const e = getRememberEntry(code);
  return Boolean(e && e.reteachAt);
}

/** Check-ins banner after ?standard= arrive — softens once sat/reteach. */
export function checkInsStandardBanner(standardFocus) {
  const code = String(standardFocus || "").trim();
  if (!code) return null;
  const mem = getRememberEntry(code);
  if (mem && (mem.satAt || mem.reteachAt)) {
    return {
      text: `You looked at · TEKS ${code}`,
      soft: true,
      title: "You already sat with this soft cluster — still findable below",
    };
  }
  return {
    text: `Because of · TEKS ${code}`,
    soft: false,
    title: "You are here because of this skill",
  };
}

/** Whether soft-cluster outline should stay strong (false after sit). */
export function checkInsClusterHighlightActive(standardFocus) {
  const code = String(standardFocus || "").trim();
  if (!code) return false;
  return !hasSatWith(code);
}

/** Daily Focus section label — Reports provenance when block came from reteach. */
export function focusBlocksSectionLabel(blocks, dayIndex, { todayDay = 2, tomorrowDay = 3 } = {}) {
  const list = Array.isArray(blocks) ? blocks : [];
  const fromReports = list.some((b) => b && (b.fromReports || b.source === "reports"));
  const fromCheckIns = list.some((b) => b && !(b.fromReports || b.source === "reports"));
  const when =
    Number(dayIndex) === Number(todayDay)
      ? "TODAY"
      : Number(dayIndex) === Number(tomorrowDay)
        ? "TOMORROW"
        : null;
  let origin;
  if (fromReports && fromCheckIns) origin = "FROM REPORTS + CHECK-INS";
  else if (fromReports) origin = "FROM REPORTS";
  else origin = "FROM CHECK-INS";
  return when ? `${origin} · ${when}` : origin;
}

export function focusBlockProvenanceLine(block) {
  if (block && (block.fromReports || block.source === "reports")) {
    return "from Reports · continuous with the soft cluster";
  }
  return "stub from Check-ins";
}

/**
 * SAM story that remembers reteach / sit — calm voice, no Demo shout.
 * Falls back to buildSamStory on first visit.
 */
export function rememberAwareSamStory(standard, leadAssignment = null) {
  const base = buildSamStory(standard, leadAssignment);
  if (!standard?.code) return base;
  const mem = getRememberEntry(standard.code);
  if (!mem) return base;
  const who =
    formatSoftNames(standard.softCluster, 3) ||
    (Array.isArray(mem.names) && mem.names.length ? mem.names.join(" · ") : null) ||
    "that soft cluster";
  if (mem.reteachAt) {
    return `You already put TEKS ${standard.code} reteach on today — ${who} are on Daily Focus. Softest pitch moved; open Focus when you’re ready to teach it.`;
  }
  if (mem.satAt) {
    const kid = mem.kidOpened ? ` (opened ${mem.kidOpened})` : "";
    return `You already sat with TEKS ${standard.code}${kid} — ${who}. Soft cluster still findable on Check-ins if you want another pass; no need to re-hear the first softest pitch.`;
  }
  return base;
}

export function getLoopSoftest(rows = DEMO_STANDARD_REPORTS) {
  const softest = pickSoftestStandard(rows);
  if (!softest) return null;
  const whoLine = formatSoftNames(softest.softCluster, 3);
  const readiness = softClassPctLabel(softest.classPct);
  const needsHint = softNeedsLabel(softest.needsCheckIn);
  const lead = getContributingAssignments(softest.code)[0] || null;
  return {
    softest,
    whoLine,
    readiness,
    needsHint,
    clusterHint: softest.clusterHint || null,
    href: REPORTS_STANDARD_HREF(softest.code),
    reportsHref: REPORTS_HREF,
    checkInsHref: checkInsHrefForStandard(softest.code),
    dayHref: DAY_HREF,
    leadAssignment: lead,
    samStory: rememberAwareSamStory(softest, lead),
  };
}

/** Softest row for a subject when Focus is filtered (else overall softest). */
export function getLoopSoftestForSubject(subject, rows = DEMO_STANDARD_REPORTS) {
  const sub = String(subject || "").trim().toLowerCase();
  if (!sub || sub === "all") return getLoopSoftest(rows);
  const pool = rows.filter((r) => String(r.subject || "").toLowerCase() === sub);
  return getLoopSoftest(pool.length ? pool : rows);
}

/**
 * Daily Focus SAM watch line — story words + soft who + natural next door.
 * Replaces count/% chrome ("4 kids", "20 of 24").
 */
export function buildFocusWatchSeam({ subject, className } = {}) {
  const loop = getLoopSoftestForSubject(subject);
  const room = className || "the room";
  if (!loop) {
    return {
      watch: `A few in ${room} may need a look — calm not-yet. Next step: Check-ins when someone flags.`,
      readiness: null,
      whoLine: null,
      softestHref: REPORTS_HREF,
      checkInsHref: CHECK_INS_HREF,
    };
  }
  const { softest, whoLine, readiness, clusterHint, href } = loop;
  const skill = `TEKS ${softest.code}`;
  const hint = clusterHint || softNeedsLabel(softest.needsCheckIn).toLowerCase();
  const mem = getRememberEntry(softest.code);
  let watch;
  if (mem && mem.reteachAt) {
    watch = whoLine
      ? `Reteach for ${skill} is already on today — ${whoLine}. Next: teach it on Daily Focus, or peek the ${softest.code} report.`
      : `Reteach for ${skill} is already on today. Next: teach it on Daily Focus.`;
  } else if (mem && mem.satAt) {
    watch = whoLine
      ? `You already looked at ${whoLine} on ${skill}. Next: keep Focus pace, or reopen Check-ins if someone still flags.`
      : `You already sat with ${skill}. Next: keep Focus pace.`;
  } else if (whoLine && readiness === "Needs a look") {
    watch = `Needs a look · ${whoLine} on ${skill} (${hint}). Next: Check-ins, or open the ${softest.code} report.`;
  } else if (whoLine && readiness === "Mixed") {
    watch = `Mixed · watch ${whoLine} on ${skill}. Next: Check-ins if still stuck, or softest report.`;
  } else if (whoLine) {
    watch = `Mostly clear · soft radar on ${whoLine} (${skill}). Next: keep Daily Focus pace.`;
  } else {
    watch = `${readiness} on ${skill} — ${softest.plain} Next: Check-ins only if someone flags.`;
  }
  return {
    watch,
    readiness,
    whoLine,
    softestCode: softest.code,
    softestHref: href,
    checkInsHref: checkInsHrefForStandard(softest.code),
    reportsHref: REPORTS_HREF,
  };
}

/**
 * Daily Focus SAM win line — story readiness, not "20 of 24".
 */
export function buildFocusWinSeam({ subject, className, fallbackWin } = {}) {
  const loop = getLoopSoftestForSubject(subject);
  const room = className || "Your class";
  if (!loop) {
    return typeof fallbackWin === "function" ? fallbackWin(className) : fallbackWin || `${room} is moving.`;
  }
  const { softest, readiness } = loop;
  // Win = the clearer sibling skill when softest needs a look; else celebrate softest readiness.
  if (readiness === "Needs a look" || readiness === "Mixed") {
    const clearer = DEMO_STANDARD_REPORTS.find(
      (r) =>
        r.subject === softest.subject &&
        r.code !== softest.code &&
        softClassPctLabel(r.classPct) === "Mostly clear"
    );
    if (clearer) {
      return `${room} looks mostly clear on ${clearer.code} — ${clearer.plain.replace(/\.$/, "")}.`;
    }
    return `${room} is moving — softest spot is ${softest.code}, and the rest looks calmer.`;
  }
  return `${room} looks mostly clear on ${softest.code} — ${softest.plain.replace(/\.$/, "")}.`;
}

/**
 * Check-ins header band — same soft cluster / period lens as Reports.
 * Not a second cast of characters.
 */
export function getCheckInsStoryBand() {
  const loop = getLoopSoftest();
  if (!loop) {
    return {
      title: "Class story",
      line: "Open Reports when you want the soft look by skill.",
      whoLine: null,
      readiness: null,
      href: REPORTS_HREF,
      honesty: REPORTS_HONESTY,
    };
  }
  const { softest, whoLine, readiness, href, needsHint } = loop;
  const whoBit = whoLine ? ` · ${whoLine}` : "";
  const mem = getRememberEntry(softest.code);
  let line;
  if (mem && mem.reteachAt) {
    line = `Reteach for ${softest.code} is on Daily Focus today${whoBit}. Same who — pitch already moved.`;
  } else if (mem && mem.satAt) {
    line = `You already sat with ${softest.code}${whoBit}. Soft cluster still here if you want another pass.`;
  } else {
    line = `${readiness}${whoBit} on ${softest.code} (${softest.subjectName}) — ${needsHint.toLowerCase()}. Same who as Reports.`;
  }
  return {
    title: "Class story · soft cluster",
    line,
    whoLine,
    readiness,
    code: softest.code,
    subjectName: softest.subjectName,
    href,
    reportsHref: REPORTS_HREF,
    honesty: REPORTS_HONESTY,
  };
}

/** Quiet once-ish honesty for Focus / Check-ins (not every chip). */
export function getLoopHonesty() {
  return REPORTS_HONESTY;
}

/**
 * Light Reports CTA copy so Check-ins secondary matches Focus voice.
 */
export function checkInsCtaLabel(waitingCount) {
  const n = Number(waitingCount) || 0;
  if (n > 0) return `Check-ins · ${n} waiting`;
  return "Check-ins · clear right now";
}

export default getLoopSoftest;
