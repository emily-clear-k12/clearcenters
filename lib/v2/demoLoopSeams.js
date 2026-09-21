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

export { REPORTS_HREF, REPORTS_HONESTY, softClassPctLabel, softNeedsLabel, formatSoftNames };

export const CHECK_INS_HREF = "/v2/teacher/check-ins";
export const DAY_HREF = "/v2/teacher/day?d=2";
/** Family note for the class-story cluster (5.6B · Sofia), not a leftover Kai default. */
export const FAMILY_NOTE_STORY_ID = "wnm-sofia";

export function checkInsHrefForPeriod(periodId) {
  const pid = periodId && periodId !== "all" ? String(periodId) : "";
  return pid ? `${CHECK_INS_HREF}?period=${encodeURIComponent(pid)}` : CHECK_INS_HREF;
}

/**
 * Softest class-story row (+ who + readiness words).
 * Shared so Focus watch / Check-ins band / Reports speak one cast.
 */
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
    checkInsHref: CHECK_INS_HREF,
    dayHref: DAY_HREF,
    leadAssignment: lead,
    samStory: buildSamStory(softest, lead),
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
  let watch;
  if (whoLine && readiness === "Needs a look") {
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
    checkInsHref: CHECK_INS_HREF,
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
  return {
    title: "Class story · soft cluster",
    line: `${readiness}${whoBit} on ${softest.code} (${softest.subjectName}) — ${needsHint.toLowerCase()}. Same who as Reports.`,
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
