// CI2.0 · Reports — glance MAP + standard/assignment reports (not a spreadsheet).
// Soft story language + named demo clusters. Live spark = Check-ins waiting only.

export const REPORTS_HREF = "/v2/teacher/reports";

/** Quiet honesty — show once, not on every chip. */
export const REPORTS_HONESTY = "Sample class · not live yet";

export function REPORTS_STANDARD_HREF(code) {
  const c = String(code || "").trim();
  if (!c) return REPORTS_HREF;
  return `${REPORTS_HREF}/standard/${encodeURIComponent(c)}`;
}

export function REPORTS_ASSIGNMENT_HREF(id) {
  const a = String(id || "").trim();
  if (!a) return REPORTS_HREF;
  return `${REPORTS_HREF}/assignment/${encodeURIComponent(a)}`;
}

/**
 * Demo standards for the Reports stub.
 * classPct = rough clear/ready share (display as words, not % · demo).
 * needsCheckIn = soft hint only. softCluster = sandbox kid first names.
 */
export const DEMO_STANDARD_REPORTS = [
  {
    id: "rep-4.3C",
    code: "4.3C",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    plain: "Equivalent fractions — same amount with a clear model.",
    classPct: 78,
    needsCheckIn: 2,
    tone: "ready",
    softCluster: ["Kai", "Jordan"],
    clusterHint: "models still swap parts",
  },
  {
    id: "rep-4.3D",
    code: "4.3D",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    plain: "Compare fractions — which is bigger, with a reason.",
    classPct: 62,
    needsCheckIn: 3,
    tone: "needsYou",
    softCluster: ["Kai", "Riley", "Diego"],
    clusterHint: "reasons thin when models don’t match",
  },
  {
    id: "rep-4.3G",
    code: "4.3G",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    plain: "Fractions on a number line — mark and explain.",
    classPct: 71,
    needsCheckIn: 1,
    tone: "ready",
    softCluster: ["Maya"],
    clusterHint: "skipped the explain step once",
  },
  {
    id: "rep-4.9A",
    code: "4.9A",
    subject: "elar",
    subjectName: "ELAR",
    subjectColor: "#E8876A",
    plain: "Author’s purpose — persuade, inform, or entertain.",
    classPct: 84,
    needsCheckIn: 0,
    tone: "ready",
    softCluster: [],
    clusterHint: null,
  },
  {
    id: "rep-5.6B",
    code: "5.6B",
    subject: "science",
    subjectName: "Science",
    subjectColor: "#3CB8A0",
    plain: "Mixtures vs solutions — claim + one evidence note.",
    classPct: 55,
    needsCheckIn: 3,
    tone: "needsYou",
    softCluster: ["Sofia", "Noah", "Diego"],
    clusterHint: "claims without evidence · terms mixed",
  },
];

/**
 * Demo assignments linked to standards (contributing work for drill-ins).
 * Soft bands + named clusters — not a gradebook stack of counts.
 */
export const DEMO_ASSIGNMENTS = [
  {
    id: "asg-mixtures-exit",
    title: "Mixtures exit ticket",
    subject: "science",
    subjectName: "Science",
    subjectColor: "#3CB8A0",
    standardCodes: ["5.6B"],
    when: "Yesterday",
    softSummary:
      "Most of the class could sort the samples, but a few wrote claims with no evidence note — and several swapped mixture and solution.",
    calmNext:
      "Pull Sofia, Noah, and Diego for a quick claim + one evidence note, then a short Daily Focus reteach on the terms.",
    bands: [
      {
        key: "clear",
        label: "Looking clear",
        count: 12,
        tone: "ready",
        names: ["Leo", "Ava", "Emma", "Priya", "Owen", "Jordan"],
      },
      {
        key: "almost",
        label: "Almost there",
        count: 8,
        tone: "ready",
        names: ["Maya", "Zoe", "Kai"],
      },
      {
        key: "needsLook",
        label: "May need a look",
        count: 5,
        tone: "needsYou",
        names: ["Sofia", "Noah", "Diego", "Riley"],
      },
    ],
  },
  {
    id: "asg-compare-frac",
    title: "Compare fractions mini-task",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    standardCodes: ["4.3D", "4.3C"],
    when: "2 days ago",
    softSummary:
      "When the models matched, reasons were solid. When they didn’t, Kai, Riley, and Diego went quiet or guessed.",
    calmNext:
      "Pair share with matching models first, then Check-ins for Kai · Riley · Diego if they’re still stuck.",
    bands: [
      {
        key: "clear",
        label: "Looking clear",
        count: 10,
        tone: "ready",
        names: ["Leo", "Priya", "Jordan", "Ava"],
      },
      {
        key: "almost",
        label: "Almost there",
        count: 9,
        tone: "ready",
        names: ["Maya", "Emma", "Owen"],
      },
      {
        key: "needsLook",
        label: "May need a look",
        count: 6,
        tone: "needsYou",
        names: ["Kai", "Riley", "Diego"],
      },
    ],
  },
  {
    id: "asg-number-line",
    title: "Number line marks",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    standardCodes: ["4.3G", "4.3C"],
    when: "This week",
    softSummary:
      "Most marks landed close. A few skipped the explain step — Maya’s line was right but the sentence never showed up.",
    calmNext: "Daily Focus: mark + say why in one sentence. Keep Maya on your quiet radar.",
    bands: [
      {
        key: "clear",
        label: "Looking clear",
        count: 14,
        tone: "ready",
        names: ["Leo", "Jordan", "Priya", "Ava"],
      },
      {
        key: "almost",
        label: "Almost there",
        count: 7,
        tone: "ready",
        names: ["Kai", "Zoe"],
      },
      {
        key: "needsLook",
        label: "May need a look",
        count: 4,
        tone: "needsYou",
        names: ["Maya", "Riley"],
      },
    ],
  },
  {
    id: "asg-authors-purpose",
    title: "Author’s purpose warm-up",
    subject: "elar",
    subjectName: "ELAR",
    subjectColor: "#E8876A",
    standardCodes: ["4.9A"],
    when: "This week",
    softSummary:
      "Class looks steady on persuade / inform / entertain. Keep the one-evidence-sentence habit — Zoe mixed one ad.",
    calmNext:
      "Stay on Daily Focus pace — optional Check-ins only if someone flags.",
    bands: [
      {
        key: "clear",
        label: "Looking clear",
        count: 18,
        tone: "ready",
        names: ["Ava", "Leo", "Owen", "Emma"],
      },
      {
        key: "almost",
        label: "Almost there",
        count: 5,
        tone: "ready",
        names: ["Zoe"],
      },
      {
        key: "needsLook",
        label: "May need a look",
        count: 2,
        tone: "needsYou",
        names: [],
      },
    ],
  },
  {
    id: "asg-equiv-models",
    title: "Equivalent models check",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    standardCodes: ["4.3C"],
    when: "Last week",
    softSummary:
      "Models were mostly clear. Kai and Jordan swapped parts on one pair — worth a soft look if 4.3C stays soft.",
    calmNext:
      "Quick visual reteach in Daily Focus if the softest rows linger.",
    bands: [
      {
        key: "clear",
        label: "Looking clear",
        count: 16,
        tone: "ready",
        names: ["Leo", "Priya", "Maya", "Ava"],
      },
      {
        key: "almost",
        label: "Almost there",
        count: 6,
        tone: "ready",
        names: ["Owen"],
      },
      {
        key: "needsLook",
        label: "May need a look",
        count: 3,
        tone: "needsYou",
        names: ["Kai", "Jordan"],
      },
    ],
  },
];

/** Soft class readiness as words — not “~55% · demo”. */
export function softClassPctLabel(pct) {
  const n = Math.round(Number(pct) || 0);
  if (n >= 78) return "Mostly clear";
  if (n >= 65) return "Mixed";
  return "Needs a look";
}

/** Soft needs hint — no “Demo ·” prefix on every row. */
export function softNeedsLabel(needsCheckIn) {
  const n = Number(needsCheckIn) || 0;
  if (n <= 0) return "Looking clear";
  if (n === 1) return "May need a look";
  return "A few may need a look";
}

/** Soft row = needsYou tone (actionable next step — not a live kid list). */
export function isSoftStandardRow(row) {
  if (!row) return false;
  return row.tone === "needsYou";
}

/** Format a soft name list for UI (Kai · Riley · Diego). */
export function formatSoftNames(names, limit = 4) {
  const list = (Array.isArray(names) ? names : []).filter(Boolean);
  if (!list.length) return null;
  const shown = list.slice(0, Math.max(1, limit));
  const extra = list.length - shown.length;
  const joined = shown.join(" · ");
  return extra > 0 ? `${joined} · +${extra}` : joined;
}

/**
 * Softest demo standard: lowest classPct, with needsYou preferred on ties.
 */
export function pickSoftestStandard(rows = DEMO_STANDARD_REPORTS) {
  if (!rows.length) return null;
  return [...rows].sort((a, b) => {
    const pctDiff = (Number(a.classPct) || 0) - (Number(b.classPct) || 0);
    if (pctDiff !== 0) return pctDiff;
    const aNeeds = a.tone === "needsYou" ? 0 : 1;
    const bNeeds = b.tone === "needsYou" ? 0 : 1;
    return aNeeds - bNeeds;
  })[0];
}

/** Soft band total for an assignment (demo counts only). */
export function softBandTotal(bands) {
  if (!Array.isArray(bands) || !bands.length) return 0;
  return bands.reduce((s, b) => s + (Number(b.count) || 0), 0);
}

/**
 * Assignment glance line — relative story, optional quiet who.
 * Prefer “Mostly clear · a few may need a look” over Demo · ~n.
 */
export function softAssignmentGlanceLine(asg) {
  if (!asg) return "Assignment";
  const needs = (asg.bands || []).find(
    (b) => b.key === "needsLook" || b.tone === "needsYou"
  );
  const n = needs ? Number(needs.count) || 0 : 0;
  const who = formatSoftNames(needs?.names || [], 3);
  if (n <= 0) return "Mostly clear";
  if (n <= 2) {
    return who ? `Mostly clear · watch ${who}` : "Mostly clear · a couple may need a look";
  }
  return who
    ? `Mixed · a few may need a look (${who})`
    : "Mixed · a few may need a look";
}

/** Relative band story for assignment detail (replaces gradebook stacks). */
export function softBandStoryLine(asg) {
  if (!asg) return "Soft look";
  const needs = (asg.bands || []).find(
    (b) => b.key === "needsLook" || b.tone === "needsYou"
  );
  const n = needs ? Number(needs.count) || 0 : 0;
  if (n <= 0) return "Mostly clear across the class";
  if (n <= 2) return "Mostly clear · a couple may need a look";
  return "Mostly clear · a few may need a look";
}

export function findStandardByCode(code, rows = DEMO_STANDARD_REPORTS) {
  const needle = String(code || "").trim().toUpperCase();
  if (!needle) return null;
  return rows.find((r) => String(r.code || "").toUpperCase() === needle) || null;
}

export function findAssignmentById(id, list = DEMO_ASSIGNMENTS) {
  const needle = String(id || "").trim();
  if (!needle) return null;
  return list.find((a) => a.id === needle) || null;
}

/** Assignments that contributed data for a TEKS code (demo). */
export function getContributingAssignments(code, list = DEMO_ASSIGNMENTS) {
  const needle = String(code || "").trim().toUpperCase();
  if (!needle) return [];
  return list.filter((a) =>
    (a.standardCodes || []).some((c) => String(c).toUpperCase() === needle)
  );
}

/** Recent assignments for the glance MAP (demo order). */
export function getRecentAssignments(list = DEMO_ASSIGNMENTS, limit = 4) {
  return list.slice(0, Math.max(0, limit));
}

/** Build SAM story paragraph for a standard (+ optional lead assignment). */
export function buildSamStory(standard, leadAssignment = null) {
  if (!standard) return "Class story isn’t ready yet.";
  const who = formatSoftNames(standard.softCluster, 3);
  const hint = standard.clusterHint || softNeedsLabel(standard.needsCheckIn);
  const readiness = softClassPctLabel(standard.classPct);
  const lookBit =
    readiness === "Needs a look"
      ? "Class needs a look."
      : readiness === "Mixed"
        ? "Class looks mixed."
        : "Class looks mostly clear.";
  const workBit = leadAssignment
    ? ` The ${leadAssignment.title.toLowerCase()}${leadAssignment.when ? ` (${leadAssignment.when.toLowerCase()})` : ""} is the clearest evidence.`
    : "";
  if (standard.tone === "needsYou" && who) {
    return `Softest right now is TEKS ${standard.code} (${standard.subjectName}) — ${standard.plain} ${lookBit} Watch ${who} (${hint}).${workBit}`;
  }
  if (who) {
    return `TEKS ${standard.code} (${standard.subjectName}) — ${standard.plain} ${lookBit} Soft radar on ${who}.${workBit}`;
  }
  return `TEKS ${standard.code} (${standard.subjectName}) — ${standard.plain} ${lookBit}${workBit}`;
}

/**
 * Glance story trail: softest standards + their evidence assignment interleaved
 * so standards and assignments read as one narrative (not two bolted lists).
 */
export function getGlanceStoryTrail(rows = DEMO_STANDARD_REPORTS, assignments = DEMO_ASSIGNMENTS) {
  const ordered = [...rows].sort((a, b) => {
    const softA = a.tone === "needsYou" ? 0 : 1;
    const softB = b.tone === "needsYou" ? 0 : 1;
    if (softA !== softB) return softA - softB;
    return (Number(a.classPct) || 0) - (Number(b.classPct) || 0);
  });
  return ordered.map((standard) => {
    const evidence = getContributingAssignments(standard.code, assignments)[0] || null;
    return {
      kind: "standard",
      standard,
      evidence,
      readiness: softClassPctLabel(standard.classPct),
      needsHint: softNeedsLabel(standard.needsCheckIn),
      whoLine: formatSoftNames(standard.softCluster, 3),
      href: REPORTS_STANDARD_HREF(standard.code),
      evidenceHref: evidence ? REPORTS_ASSIGNMENT_HREF(evidence.id) : null,
      evidenceLine: evidence ? softAssignmentGlanceLine(evidence) : null,
    };
  });
}

/**
 * Standard drill-in: SAM story → who → evidence trail → calm next.
 */
export function getStandardDetail(code) {
  const standard = findStandardByCode(code);
  if (!standard) return null;
  const contributing = getContributingAssignments(standard.code);
  const lead = contributing[0] || null;
  const softHint = softNeedsLabel(standard.needsCheckIn);
  const whoLine = formatSoftNames(standard.softCluster, 4);
  const samStory = buildSamStory(standard, lead);
  const calmNext =
    standard.tone === "needsYou"
      ? whoLine
        ? `Calm next · Check-ins for ${whoLine} on ${standard.code}, then a short Daily Focus reteach.`
        : `Calm next · Check-ins for anyone still stuck on ${standard.code}, then a short Daily Focus reteach.`
      : `Calm next · Keep Daily Focus pace on ${standard.code}; Check-ins only if someone flags.`;
  return {
    standard,
    contributing,
    softHint,
    whoLine,
    clusterHint: standard.clusterHint,
    samStory,
    calmNext,
    honesty: REPORTS_HONESTY,
    classPctLabel: softClassPctLabel(standard.classPct),
    checkInsHref: "/v2/teacher/check-ins",
    dayHref: "/v2/teacher/day?d=2",
    reportsHref: REPORTS_HREF,
  };
}

/**
 * Assignment drill-in: what happened → soft clusters (who) → skill trail → calm next.
 */
export function getAssignmentDetail(id) {
  const assignment = findAssignmentById(id);
  if (!assignment) return null;
  const standards = (assignment.standardCodes || [])
    .map((c) => findStandardByCode(c))
    .filter(Boolean);
  const total = softBandTotal(assignment.bands);
  const needsBand = (assignment.bands || []).find(
    (b) => b.key === "needsLook" || b.tone === "needsYou"
  );
  const softCluster = {
    names: needsBand?.names || [],
    whoLine: formatSoftNames(needsBand?.names || [], 4),
    label: softBandStoryLine(assignment),
  };
  return {
    assignment,
    standards,
    total,
    softCluster,
    bandStory: softBandStoryLine(assignment),
    honesty: REPORTS_HONESTY,
    glanceLine: softAssignmentGlanceLine(assignment),
    checkInsHref: "/v2/teacher/check-ins",
    dayHref: "/v2/teacher/day?d=2",
    reportsHref: REPORTS_HREF,
  };
}

export function getReportsStub() {
  const rows = DEMO_STANDARD_REPORTS;
  const recentAssignments = getRecentAssignments(DEMO_ASSIGNMENTS, 4);
  const storyTrail = getGlanceStoryTrail(rows, DEMO_ASSIGNMENTS);
  const needing = rows.filter((r) => r.needsCheckIn > 0).length;
  const avg =
    rows.length === 0
      ? 0
      : Math.round(rows.reduce((s, r) => s + r.classPct, 0) / rows.length);
  const softest = pickSoftestStandard(rows);
  const softHint = softest ? softNeedsLabel(softest.needsCheckIn) : null;
  const leadAsg = softest
    ? getContributingAssignments(softest.code)[0] || null
    : null;
  const samStory = softest
    ? buildSamStory(softest, leadAsg)
    : "Class story isn’t ready yet — Check-ins when someone needs you.";
  const samLine = softest
    ? `Softest · ${softest.code} (${softest.subjectName}) — ${softHint}${
        softest.softCluster?.length
          ? ` · ${formatSoftNames(softest.softCluster, 3)}`
          : ""
      }.`
    : "Soft look by standard — Check-ins when someone needs you.";
  const softestWho = softest ? formatSoftNames(softest.softCluster, 3) : null;
  return {
    title: "Class story",
    samLine,
    samStory,
    softest,
    softestWho,
    softestHref: softest ? REPORTS_STANDARD_HREF(softest.code) : REPORTS_HREF,
    recentAssignments,
    storyTrail,
    softestNextMoveLabel: softest
      ? `Open ${softest.code} report`
      : "Open Reports",
    softestReteachLabel: softest
      ? `Plan a quick reteach · ${softest.code}`
      : "Plan a quick reteach",
    honesty: REPORTS_HONESTY,
    rows,
    summary: {
      standards: rows.length,
      avgClassPct: avg,
      avgReadiness: softClassPctLabel(avg),
      standardsNeedingCheckIn: needing,
    },
    checkInsHref: "/v2/teacher/check-ins",
    dayHref: "/v2/teacher/day?d=2",
  };
}

export default getReportsStub;
