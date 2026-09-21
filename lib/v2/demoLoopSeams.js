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
  findStandardByCode,
  skillGlanceLabel,
} from "./demoReports";
import {
  kidGradingHref,
  DEMO_GRADING_SUBMISSIONS,
  loadConfirmedIds,
  loadLiveInbox,
} from "./demoGrading";
import {
  studentMyDayHref,
  softStoryMyDayHref,
} from "./demoStudentDay";
export {
  REPORTS_HREF,
  REPORTS_HONESTY,
  softClassPctLabel,
  softNeedsLabel,
  formatSoftNames,
  studentMyDayHref,
  softStoryMyDayHref,
};

export const CHECK_INS_HREF = "/v2/teacher/check-ins";
export const DAY_HREF = "/v2/teacher/day?d=2";
/** Family note for the class-story cluster (5.6B · Sofia), not a leftover Kai default. */
export const FAMILY_NOTE_STORY_ID = "wnm-sofia";

function familyNoteHref(id, opts = {}) {
  const base = `/v2/teacher/family/${encodeURIComponent(id)}`;
  const params = new URLSearchParams();
  const period =
    opts.periodId && String(opts.periodId) !== "all"
      ? String(opts.periodId).trim()
      : "";
  if (period) params.set("period", period);
  if (opts.subject) params.set("subject", String(opts.subject).trim());
  if (opts.topic) params.set("topic", String(opts.topic).trim());
  if (opts.standard) params.set("standard", String(opts.standard).trim());
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

/** Soft-story care door — same compose for Focus / Check-ins / Reports. */
export function familyNoteSoftStoryHref(opts = {}) {
  const code = String(opts.standard || opts.code || "5.6B").trim() || "5.6B";
  return familyNoteHref(`soft-${code}`, {
    periodId: opts.periodId,
    subject: opts.subject,
    topic: opts.topic,
    standard: code,
  });
}

/** Preserve Sofia single-kid door from Reports era (c9eccbb). */
export function familyNoteStoryHref(opts = {}) {
  return familyNoteHref(FAMILY_NOTE_STORY_ID, {
    periodId: opts.periodId,
    subject: opts.subject || "science",
    topic: opts.topic,
  });
}

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

/** Soft cluster → [{ name, href, myDayHref, wnmId, checkInsHref }] for report name links. */
export function softClusterDoors(names, opts = {}) {
  const list = Array.isArray(names) ? names.filter(Boolean) : [];
  return list.map((name) => ({
    name,
    href: kidDoorHref(name, opts),
    myDayHref: studentMyDayHref({
      student: name,
      standard: opts.standard,
    }),
    wnmId: wnmIdForFirstName(name),
    checkInsHref: checkInsHref({
      periodId: opts.periodId,
      standard: opts.standard,
      student: name,
    }),
  }));
}

/** Soft-story student door — calm My Day with kid + TEKS (default 5.6B · Sofia). */
export function softStoryStudentDoorHref(opts = {}) {
  return softStoryMyDayHref({
    standard: opts.standard || opts.code || "5.6B",
    student: opts.student || opts.studentFirst,
    names: opts.names,
  });
}

/**
 * Softest class-story row (+ who + readiness words).
 * Shared so Focus watch / Check-ins band / Reports speak one cast.
 */

/* ─── Loop remember (demo/localStorage only) ─────────────────────────
 * Remembers what the teacher just did on the softest loop so Focus,
 * Check-ins, and Reports don't repeat the identical first-visit pitch.
 * Shape per standard: { standard, satAt?, reteachAt?, evidenceAt?, evidenceSource?, clearerNames?, kidOpened?, names?, source? }
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

/**
 * Quiet care move — teacher sent (demo) a Family note from the soft story.
 * Loop can acknowledge without shouting; does not resolve the soft story alone.
 */
export function rememberFamilyCare(code, opts = {}) {
  const names = Array.isArray(opts.names) ? opts.names.filter(Boolean) : undefined;
  return upsertRemember(code, {
    careAt: new Date().toISOString(),
    source: opts.source || "family-note",
    ...(opts.whoLine ? { whoLine: String(opts.whoLine) } : {}),
    ...(names && names.length ? { names } : {}),
  });
}

export function hasFamilyCare(code) {
  const e = getRememberEntry(code);
  return Boolean(e && e.careAt);
}


export function hasSatWith(code) {
  const e = getRememberEntry(code);
  return Boolean(e && (e.satAt || e.reteachAt));
}

export function hasReteachOnToday(code) {
  const e = getRememberEntry(code);
  return Boolean(e && e.reteachAt);
}

/**
 * Soft-cluster kids who already have a confirmed grade on this standard
 * (demo inbox + live submits). Confirm = work finished / of record — no
 * new ritual; reads the grading action she already does.
 */
export function clearerNamesFromGrades(code) {
  const key = normalizeStandardCode(code);
  const std = findStandardByCode(key);
  const cluster = Array.isArray(std?.softCluster) ? std.softCluster.filter(Boolean) : [];
  if (!key || !cluster.length || typeof window === "undefined") return [];
  let confirmed;
  try {
    confirmed = new Set(loadConfirmedIds());
  } catch {
    return [];
  }
  if (!confirmed.size) return [];
  let live = [];
  try {
    live = loadLiveInbox();
  } catch {
    live = [];
  }
  const rows = [...DEMO_GRADING_SUBMISSIONS, ...(Array.isArray(live) ? live : [])];
  const clearer = [];
  for (const name of cluster) {
    const want = String(name).trim().toLowerCase();
    const hit = rows.find(
      (s) =>
        s &&
        confirmed.has(s.id) &&
        normalizeStandardCode(s.standard) === key &&
        String(s.studentFirst || "").trim().toLowerCase() === want
    );
    if (hit) clearer.push(name);
  }
  return clearer;
}

/** True when every soft-cluster kid has confirmed work on this standard. */
export function evidenceMeetsResolve(code) {
  const std = findStandardByCode(code);
  const cluster = Array.isArray(std?.softCluster) ? std.softCluster.filter(Boolean) : [];
  if (!cluster.length) return false;
  return clearerNamesFromGrades(code).length >= cluster.length;
}

export function hasEvidenceResolve(code) {
  const e = getRememberEntry(code);
  if (e && e.evidenceAt) return true;
  return evidenceMeetsResolve(code);
}

/**
 * Soft story resolve — teacher move OR class evidence.
 * Move: reteachAt OR satAt (unchanged).
 * Evidence: soft-cluster kids' grades confirmed on this standard
 * (automatic from grading inbox — home quietly stops nagging).
 */
export function isStandardResolved(code) {
  const e = getRememberEntry(code);
  if (e && (e.reteachAt || e.satAt || e.evidenceAt)) return true;
  return evidenceMeetsResolve(code);
}

/**
 * Why it landed — for friend-voice copy only (not shown as chrome).
 * Prefer teacher-move voice when both happened.
 */
export function resolveKind(code) {
  const e = getRememberEntry(code);
  if (e?.reteachAt) return "reteach";
  if (e?.satAt) return "sit";
  if (e?.evidenceAt || evidenceMeetsResolve(code)) return "evidence";
  return null;
}

/**
 * After teacher confirms a grade — if that kid is in the soft cluster for
 * the submission's standard, note clearer names; when the whole cluster is
 * on the books, stamp evidenceAt so Focus / Check-ins / Reports cool quietly.
 */
export function noteEvidenceFromGradeConfirm(item) {
  if (!item || typeof window === "undefined") return null;
  const code = normalizeStandardCode(item.standard);
  if (!code) return null;
  const std = findStandardByCode(code);
  const cluster = Array.isArray(std?.softCluster) ? std.softCluster.filter(Boolean) : [];
  if (!cluster.length) return null;
  const kid = String(item.studentFirst || "").trim();
  if (!kid) return null;
  const inCluster = cluster.some((n) => String(n).toLowerCase() === kid.toLowerCase());
  if (!inCluster) return null;

  const clearer = clearerNamesFromGrades(code);
  const patch = {
    evidenceSource: "grades",
    names: cluster,
    clearerNames: clearer,
  };
  if (clearer.length >= cluster.length) {
    patch.evidenceAt = new Date().toISOString();
  }
  return upsertRemember(code, patch);
}

/**
 * Softest among still-open standards (skips resolved).
 * If every row is resolved, returns raw softest so drill-in still works.
 */
export function pickSoftestOpen(rows = DEMO_STANDARD_REPORTS) {
  const list = Array.isArray(rows) ? rows.filter(Boolean) : [];
  if (!list.length) return null;
  const open = list.filter((r) => !isStandardResolved(r.code));
  return pickSoftestStandard(open.length ? open : list);
}

/** Check-ins banner after ?standard= arrive — quiet win once resolved. */
export function checkInsStandardBanner(standardFocus) {
  const code = String(standardFocus || "").trim();
  if (!code) return null;
  if (isStandardResolved(code)) {
    if (resolveKind(code) === "evidence") {
      const who =
        formatSoftNames(clearerNamesFromGrades(code), 3) ||
        formatSoftNames(findStandardByCode(code)?.softCluster, 3);
      return {
        text: who ? `${who} look clearer on this skill` : `You're covered on this skill`,
        soft: true,
        title: "Landed — still findable below if you need it",
      };
    }
    return {
      text: `You're covered on this skill`,
      soft: true,
      title: "Landed — still findable below if you need it",
    };
  }
  return {
    text: `Here for this skill`,
    soft: false,
    title: "You opened Check-ins for this skill",
  };
}

/** Whether soft-cluster outline should stay strong (false once resolved). */
export function checkInsClusterHighlightActive(standardFocus) {
  const code = String(standardFocus || "").trim();
  if (!code) return false;
  return !isStandardResolved(code);
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
  let label = when ? `${origin} · ${when}` : origin;
  // Quiet win breath when every from-Reports block is a resolved standard.
  const reportBlocks = list.filter((b) => b && (b.fromReports || b.source === "reports"));
  if (
    reportBlocks.length &&
    reportBlocks.every((b) => b.standard && isStandardResolved(b.standard))
  ) {
    label = `${label} · COVERED`;
  }
  return label;
}

export function focusBlockProvenanceLine(block) {
  if (block && (block.fromReports || block.source === "reports")) {
    if (block.standard && isStandardResolved(block.standard)) {
      return "on Today · you're covered";
    }
    return "from Class story · same kids still on your radar";
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
  const evidenceLive = evidenceMeetsResolve(standard.code);
  if (!mem && !evidenceLive) return base;
  const who =
    formatSoftNames(standard.softCluster, 3) ||
    (mem && Array.isArray(mem.names) && mem.names.length ? mem.names.join(" · ") : null) ||
    "those kids";
  // Resolved quiet win — calmer than remember mid-state; softest urgency cooled elsewhere.
  if (mem?.reteachAt) {
    return `You already moved — reteach is on Today. ${who} are on Focus. Open Today when you’re ready to teach it.`;
  }
  if (mem?.satAt) {
    const kid = mem.kidOpened ? ` · opened ${mem.kidOpened}` : "";
    return `You already moved${kid} — ${who} are on Focus. No need to re-hear the first pitch; open the report if you want depth.`;
  }
  if (mem?.careAt) {
    return `Family note already went out for ${who}. Open Check-ins or Today if you want to sit or reteach next.`;
  }
  if (mem?.evidenceAt || evidenceLive) {
    const clearerWho =
      formatSoftNames(
        mem && Array.isArray(mem.clearerNames) && mem.clearerNames.length
          ? mem.clearerNames
          : clearerNamesFromGrades(standard.code),
        3
      ) || who;
    return `${clearerWho} look clearer — the class evidence moved. Open the report if you want depth.`;
  }
  return base;
}

export function getLoopSoftest(rows = DEMO_STANDARD_REPORTS) {
  const list = Array.isArray(rows) ? rows.filter(Boolean) : [];
  const rawSoftest = pickSoftestStandard(list);
  if (!rawSoftest) return null;

  const open = list.filter((r) => !isStandardResolved(r.code));
  const advanced =
    Boolean(rawSoftest && isStandardResolved(rawSoftest.code) && open.length > 0);
  // Prefer next open softest for “needs you”; if all resolved, keep raw (cooled).
  const softest = advanced ? pickSoftestStandard(open) : rawSoftest;
  if (!softest) return null;

  const cooled = !advanced && isStandardResolved(softest.code);
  const whoLine = formatSoftNames(softest.softCluster, 3);
  const readiness = cooled ? "You're covered" : softClassPctLabel(softest.classPct);
  const landedKindEarly =
    advanced || cooled
      ? resolveKind(rawSoftest.code)
      : null;
  const needsHint = cooled
    ? landedKindEarly === "evidence"
      ? "class looks clearer"
      : "already on Focus or sat"
    : softNeedsLabel(softest.needsCheckIn);
  const lead = getContributingAssignments(softest.code)[0] || null;
  const landedCode = advanced || cooled ? rawSoftest.code : null;
  const landedWho =
    landedCode && rawSoftest
      ? formatSoftNames(rawSoftest.softCluster, 3)
      : null;

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
    // Story for the *needs-you* softest (next open). Drill-in pages still call
    // rememberAwareSamStory on the specific standard for the landed beat.
    samStory: rememberAwareSamStory(softest, lead),
    urgency: advanced ? "advanced" : cooled ? "cooled" : "open",
    landedCode,
    landedWho,
    rawSoftest: rawSoftest || null,
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
  const { softest, whoLine, readiness, clusterHint, href, urgency, landedCode, landedWho } = loop;
  const skill = skillGlanceLabel(softest);
  const hint = clusterHint || softNeedsLabel(softest.needsCheckIn).toLowerCase();
  let watch;
  const landedKind = landedCode ? resolveKind(landedCode) : null;
  if (urgency === "advanced" && landedCode) {
    if (landedKind === "evidence") {
      const clearerBit = landedWho
        ? `${landedWho} look clearer`
        : `That skill looks clearer`;
      watch = whoLine
        ? `${clearerBit}. Now watch ${skill} · ${whoLine}. Next: Check-ins, or open the report.`
        : `${clearerBit}. Next soft spot: ${skill}.`;
    } else {
      const landedWhoBit = landedWho ? ` — ${landedWho} are on Focus` : "";
      watch = whoLine
        ? `You already moved${landedWhoBit}. Now watch ${skill} · ${whoLine}. Next: Check-ins, or open the report.`
        : `You already moved${landedWhoBit}. Next soft spot: ${skill}.`;
    }
  } else if (urgency === "cooled") {
    // All-clear morning — quiet breath, do not re-pitch the soft cluster.
    watch = getAllClearMorningLine({ className: room === "the room" ? undefined : room });
  } else if (whoLine && readiness === "Needs a look") {
    watch = `Needs a look · ${whoLine} on ${skill} (${hint}). Next: Check-ins, or open the report.`;
  } else if (whoLine && readiness === "Mixed") {
    watch = `Mixed · watch ${whoLine} on ${skill}. Next: Check-ins if still stuck, or open the report.`;
  } else if (whoLine) {
    watch = `Mostly clear · keep an eye on ${whoLine} (${skill}). Next: keep Today’s pace.`;
  } else {
    watch = `${readiness} on ${skill} — ${softest.plain} Next: Check-ins only if someone flags.`;
  }
  const allClear = urgency === "cooled";
  return {
    watch,
    readiness: allClear ? "You're covered" : readiness,
    // Soft who lives in the watch line when open; suppress chip when all-clear.
    whoLine: allClear ? null : whoLine,
    softestCode: softest.code,
    softestHref: allClear ? REPORTS_HREF : href,
    checkInsHref: checkInsHrefForStandard(softest.code),
    reportsHref: REPORTS_HREF,
    landedCode: landedCode || null,
    allClear,
    urgency,
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
  const { softest, readiness, urgency, landedCode, landedWho } = loop;
  // All-clear: keep WIN as yesterday breath (fallback); WATCH carries covered line.
  if (urgency === "cooled") {
    return typeof fallbackWin === "function" ? fallbackWin(className) : fallbackWin || `${room} is moving.`;
  }
  // Softest advanced: quiet win naming the landed story (next soft lives in WATCH).
  if (urgency === "advanced" && landedCode) {
    const whoBit = landedWho ? ` · ${landedWho}` : "";
    if (hasReteachOnToday(landedCode)) {
      return `${room} — reteach is on Today${whoBit} · you're covered.`;
    }
    if (resolveKind(landedCode) === "evidence") {
      return landedWho
        ? `${room} — ${landedWho} look clearer · you're covered.`
        : `${room} — that skill looks clearer · you're covered.`;
    }
    return `${room} — you already moved${whoBit} · you're covered.`;
  }
  // Win = the clearer sibling skill when softest needs a look; else celebrate softest readiness.
  if (readiness === "Needs a look" || readiness === "Mixed") {
    const clearer = DEMO_STANDARD_REPORTS.find(
      (r) =>
        r.subject === softest.subject &&
        r.code !== softest.code &&
        softClassPctLabel(r.classPct) === "Mostly clear"
    );
    if (clearer) {
      return `${room} looks mostly clear on ${skillGlanceLabel(clearer)} — ${clearer.plain.replace(/\.$/, "")}.`;
    }
    return `${room} is moving — ${skillGlanceLabel(softest)} still needs a look, and the rest looks calmer.`;
  }
  return `${room} looks mostly clear on ${skillGlanceLabel(softest)} — ${softest.plain.replace(/\.$/, "")}.`;
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
  const { softest, whoLine, readiness, href, needsHint, urgency, landedCode, landedWho } = loop;
  const whoBit = whoLine ? ` · ${whoLine}` : "";
  let line;
  const landedKind = landedCode ? resolveKind(landedCode) : null;
  if (urgency === "advanced" && landedCode) {
    if (landedKind === "evidence") {
      const clearerBit = landedWho
        ? `${landedWho} look clearer on ${landedCode}`
        : `${landedCode} looks clearer`;
      line = `${clearerBit}. Now watch ${softest.code}${whoBit}.`;
    } else {
      const landedWhoBit = landedWho ? ` · ${landedWho} on Focus` : "";
      line = `You already moved on ${landedCode}${landedWhoBit}. Now watch ${softest.code}${whoBit}.`;
    }
  } else if (urgency === "cooled") {
    if (landedKind === "evidence") {
      line = landedWho
        ? `${landedWho} look clearer on ${softest.code}. Soft cluster still findable if you drill in.`
        : `You're clear on ${softest.code}${whoBit}. Soft cluster still findable if you drill in.`;
    } else {
      line = `You're clear on ${softest.code}${whoBit}. Soft cluster still findable if you drill in.`;
    }
  } else {
    line = `${readiness}${whoBit} on ${softest.code} — ${needsHint.toLowerCase()}.`;
  }
  const allClear = urgency === "cooled";
  return {
    title: allClear ? "Class story · clear" : "Class story · needs a look",
    line: allClear ? getAllClearSurfaceLine("check-ins") : line,
    whoLine: allClear ? null : whoLine,
    readiness: allClear ? "You're covered" : readiness,
    code: softest.code,
    subjectName: softest.subjectName,
    href: allClear ? REPORTS_HREF : href,
    reportsHref: REPORTS_HREF,
    honesty: REPORTS_HONESTY,
    landedCode: landedCode || null,
    allClear,
    urgency,
  };
}


/* ─── All-clear morning — soft stories landed, nothing open soft ─
 * Shared voice so Focus / Check-ins / Reports stay one calm breath.
 * Amber still only when live Check-ins waiting > 0.
 */

/** True when every soft standard is resolved (cooled) — no open soft urgency. */
export function isLoopAllClear(rows = DEMO_STANDARD_REPORTS) {
  const loop = getLoopSoftest(rows);
  if (!loop) return true;
  return loop.urgency === "cooled";
}

/** Focus morning watch line when soft stories have landed. */
export function getAllClearMorningLine({ className } = {}) {
  const room = className || "Your class";
  return `${room} · covered for now. Soft stories landed — keep Today's pace.`;
}

/**
 * Calm surface line when nothing soft needs a look.
 * surface: "check-ins" | "reports" | "loop"
 */
export function getAllClearSurfaceLine(surface = "loop") {
  if (surface === "check-ins") {
    return "Clear for now — nothing soft nagging. Soft cluster still findable on Reports.";
  }
  if (surface === "reports") {
    return "Class story is clear for now — soft urgency cooled. Soft cluster still findable if you drill in.";
  }
  return "Covered for now — soft stories landed.";
}

/** Quiet Reports / rail peek when all-clear (no who re-pitch). */
export function getAllClearRailPeek() {
  return "Covered · clear for now";
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

/* ─── Grading voice — same soft story as Focus / Check-ins / Reports ─
 * Quiet band + soft-cluster float so confirm feels like the loop, not
 * a bolted-on inbox. No new settings / badge walls.
 */

/**
 * Which standard Grading should lead with.
 * Prefer ?standard= when present; else the loop softest (needs-you).
 */
export function resolveGradingStoryCode(searchStandard) {
  const fromQuery = normalizeStandardCode(searchStandard);
  if (fromQuery && findStandardByCode(fromQuery)) return fromQuery;
  const loop = getLoopSoftest();
  if (!loop?.softest?.code) return null;
  return normalizeStandardCode(loop.softest.code);
}

/**
 * Slim story band for the grading inbox — who + skill in loop voice.
 * Open: "Sofia · Noah · Diego · TEKS 5.6B — confirm when you've looked"
 * Cooled (evidence): friend clearer voice. No queue chrome shout.
 */
export function getGradingStoryBand(opts = {}) {
  const code = resolveGradingStoryCode(opts.standard);
  if (!code) return null;
  const std = findStandardByCode(code);
  if (!std) return null;
  const whoLine = formatSoftNames(std.softCluster, 3);
  const resolved = isStandardResolved(code);
  const kind = resolveKind(code);
  const readiness = resolved ? "You're covered" : softClassPctLabel(std.classPct);
  let line;
  if (resolved && kind === "evidence") {
    const clearer =
      formatSoftNames(clearerNamesFromGrades(code), 3) || whoLine;
    line = clearer
      ? `${clearer} look clearer on TEKS ${code} — soft story cooled`
      : `TEKS ${code} looks clearer — soft story cooled`;
  } else if (resolved) {
    line = whoLine
      ? `You're clear on TEKS ${code} · ${whoLine} still findable`
      : `You're clear on TEKS ${code}`;
  } else if (whoLine) {
    line = `${whoLine} · TEKS ${code} — confirm when you've looked`;
  } else {
    line = `TEKS ${code} — confirm when you've looked`;
  }
  return {
    title: resolved ? "Class story · covered" : "Class story",
    line,
    whoLine: resolved ? null : whoLine,
    readiness,
    code,
    soft: resolved,
    cluster: Array.isArray(std.softCluster) ? std.softCluster.filter(Boolean) : [],
    href: REPORTS_STANDARD_HREF(code),
    checkInsHref: checkInsHrefForStandard(code),
  };
}

/**
 * Float soft-cluster kids' pending confirms for this standard to the top
 * (Reports cast order), then leave the rest in their existing order.
 */
export function floatSoftClusterPending(pending, code) {
  const key = normalizeStandardCode(code);
  const std = findStandardByCode(key);
  const cluster = Array.isArray(std?.softCluster)
    ? std.softCluster.map((n) => String(n).trim().toLowerCase()).filter(Boolean)
    : [];
  const list = Array.isArray(pending) ? pending.slice() : [];
  if (!key || !cluster.length || !list.length) return list;
  const soft = [];
  const rest = [];
  for (const s of list) {
    const name = String(s?.studentFirst || "").trim().toLowerCase();
    const match =
      normalizeStandardCode(s?.standard) === key && cluster.includes(name);
    (match ? soft : rest).push(s);
  }
  soft.sort((a, b) => {
    const ia = cluster.indexOf(String(a.studentFirst || "").trim().toLowerCase());
    const ib = cluster.indexOf(String(b.studentFirst || "").trim().toLowerCase());
    return ia - ib;
  });
  return [...soft, ...rest];
}

/**
 * One-line why on the kid grading door when opened from soft cluster / report.
 * Same readiness words as the loop — no % / Demo chrome.
 */
export function kidDoorWhyLine(code, studentFirst) {
  const key = normalizeStandardCode(code);
  const std = findStandardByCode(key);
  if (!std) return null;
  const who = formatSoftNames(std.softCluster, 3);
  const kid = String(studentFirst || "").trim();
  if (isStandardResolved(key)) {
    if (resolveKind(key) === "evidence") {
      return kid
        ? `${kid} · looks clearer with the class on this skill`
        : `Looks clearer on TEKS ${key}`;
    }
    return kid
      ? `${kid} · TEKS ${key} soft story already landed`
      : `TEKS ${key} soft story already landed`;
  }
  const readiness = softClassPctLabel(std.classPct);
  const bit =
    readiness === "Needs a look" || readiness === "Mixed" ? readiness : "Soft cluster";
  if (kid && who) return `${kid} · ${bit} on TEKS ${key} · ${who}`;
  if (kid) return `${kid} · ${bit} on TEKS ${key}`;
  return `${bit} on TEKS ${key}`;
}
