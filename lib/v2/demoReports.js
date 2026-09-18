// CI2.0 · Reports by standard stub — glance-first bars/chips (not a spreadsheet).
// Demo standards only. Soft labels — no fake precision. Live spark = Check-ins waiting.

export const REPORTS_HREF = "/v2/teacher/reports";

/**
 * Demo standards for the Reports stub.
 * classPct = rough “clear / ready” class share (demo — display as soft ~%).
 * needsCheckIn = soft demo hint only (not a live kid count).
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
  },
];

/** Soften demo % so it never reads like a gradebook export. */
export function softClassPctLabel(pct) {
  const n = Math.round(Number(pct) || 0);
  if (n <= 0) return "~0% · demo";
  return `~${n}% · demo`;
}

/** Soften per-standard needs (demo hint — not a live kid count). */
export function softNeedsLabel(needsCheckIn) {
  const n = Number(needsCheckIn) || 0;
  if (n <= 0) return "Demo · looking clear";
  if (n === 1) return "Demo · may need a look";
  return "Demo · a few may need a look";
}

export function getReportsStub() {
  const rows = DEMO_STANDARD_REPORTS;
  const needing = rows.filter((r) => r.needsCheckIn > 0).length;
  const avg =
    rows.length === 0
      ? 0
      : Math.round(rows.reduce((s, r) => s + r.classPct, 0) / rows.length);
  return {
    title: "Reports · by standard",
    samLine: "Glance first — soft class ready cues and who may need a Check-in.",
    honesty: "Demo data · not live yet",
    rows,
    summary: {
      standards: rows.length,
      avgClassPct: avg,
      standardsNeedingCheckIn: needing,
    },
    checkInsHref: "/v2/teacher/check-ins",
    dayHref: "/v2/teacher/day?d=2",
  };
}

export default getReportsStub;
