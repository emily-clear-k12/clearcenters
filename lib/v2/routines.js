// CI2.0 weekly routines — sentence chips with tappable blanks.
// Persist per teacher setup in localStorage (see usePlanner).

import { SUBJECTS, DAY_NAMES, DEMO_WEEK } from "./demoWeek";

export const CADENCE_OPTIONS = [
  { key: "every_week", label: "week", sentence: "Every week" },
  { key: "end_of_unit", label: "end of every unit", sentence: "At the end of every unit" },
];

export const WHO_OPTIONS = [
  { key: "all_students", label: "all students" },
  { key: "below_70", label: "students below 70% on the last check" },
  { key: "small_group", label: "a small group" },
];

/** Activities teachers can target from any product. */
export const ACTIVITY_OPTIONS = [
  { key: "skill_builder", label: "Skill Builder Practice", product: "CrystalQuest", kind: "work", minutes: 15, article: "" },
  { key: "clearsheet", label: "ClearSheet", product: "ClearSheets", kind: "work", minutes: 12, article: "a " },
  { key: "crystalquest", label: "CrystalQuest practice", product: "CrystalQuest", kind: "work", minutes: 12, article: "" },
  { key: "classcade", label: "ClassCade Showdown", product: "ClassCade Showdown", kind: "teach", minutes: 20, article: "a " },
  { key: "clearcenters", label: "ClearCenters station", product: "ClearCenters", kind: "work", minutes: 20, article: "a " },
  { key: "clearlessons", label: "ClearLessons reteach", product: "ClearLessons", kind: "teach", minutes: 15, article: "a " },
];

export const DAY_OPTIONS = DAY_NAMES.map((name, i) => ({ key: String(i), day: i, label: name }));

/** Skeleton "Add assignment" product types (This Week + Daily Focus). */
export const ADD_TYPES = [
  { key: "lesson", label: "ClearLessons", product: "ClearLessons", kind: "teach", minutes: 15, title: "New ClearLessons" },
  { key: "sheet", label: "ClearSheets", product: "ClearSheets", kind: "work", minutes: 12, title: "New ClearSheets" },
  { key: "center", label: "ClearCenters", product: "ClearCenters", kind: "work", minutes: 20, title: "New ClearCenters station" },
  { key: "quest", label: "CrystalQuest", product: "CrystalQuest", kind: "work", minutes: 15, title: "New CrystalQuest" },
  { key: "showdown", label: "ClassCade Showdown", product: "ClassCade Showdown", kind: "teach", minutes: 20, title: "New ClassCade Showdown" },
  { key: "check", label: "CrystalChecks", product: "CrystalChecks", kind: "work", minutes: 25, title: "New CrystalChecks" },
];

export const DEMO_ROUTINES = [
  { id: "rtn-math-monday", cadence: "every_week", subject: "math", who: "all_students", activity: "skill_builder", day: 0, enabled: true },
  { id: "rtn-elar-wed", cadence: "every_week", subject: "elar", who: "below_70", activity: "clearsheet", day: 2, enabled: true },
  { id: "rtn-sci-unit", cadence: "end_of_unit", subject: "science", who: "all_students", activity: "classcade", day: null, enabled: true },
  { id: "rtn-social-fri", cadence: "every_week", subject: "social", who: "all_students", activity: "crystalquest", day: 4, enabled: false },
];

export const DEMO_ROUTINE_OFFERS = [
  {
    id: "offer-pattern-math-monday",
    type: "pattern",
    subject: "math",
    text: "You've assigned Fraction practice every Monday for 3 weeks — make it a routine?",
    acceptLabel: "Make it a routine",
    routinePatch: {
      id: "rtn-math-monday",
      cadence: "every_week",
      subject: "math",
      who: "all_students",
      activity: "skill_builder",
      day: 0,
      enabled: true,
    },
  },
  {
    id: "offer-hands-off-math",
    type: "hands_off_bump",
    subject: "math",
    text: "Math weeks went out unchanged — let Math run itself?",
    acceptLabel: "Let Math run itself",
    bumpTo: "run_for_me",
  },
];

export function routinesStorageKey(setupKey) {
  return `ci2.teacher.routines.${setupKey || "self"}`;
}

export function offersStorageKey(setupKey) {
  return `ci2.teacher.routineOffers.${setupKey || "self"}`;
}

export function opt(list, key) {
  return list.find((o) => o.key === key) || list[0];
}

export function subjectOptionsForSetup(subjects) {
  return (subjects || []).map((k) => ({
    key: k,
    label: SUBJECTS[k]?.name || k,
    color: SUBJECTS[k]?.color,
  }));
}

export function filterRoutinesForSetup(routines, subjects) {
  const set = new Set(subjects || []);
  return (routines || []).filter((r) => set.has(r.subject));
}

export function defaultRoutinesForSetup(subjects) {
  return filterRoutinesForSetup(DEMO_ROUTINES, subjects).map((r) => ({ ...r }));
}

export function routineSentenceParts(routine) {
  const cadence = opt(CADENCE_OPTIONS, routine.cadence);
  const who = opt(WHO_OPTIONS, routine.who);
  const act = opt(ACTIVITY_OPTIONS, routine.activity);
  const subName = SUBJECTS[routine.subject]?.name || routine.subject;
  const actPhrase = `${act.article || ""}${act.label}`.trim();

  if (routine.cadence === "end_of_unit") {
    return [
      { text: "At the " },
      { blank: "cadence", text: cadence.label },
      { text: " in " },
      { blank: "subject", text: subName },
      { text: ", schedule " },
      { blank: "activity", text: actPhrase },
      { text: "." },
    ];
  }

  return [
    { text: "Every " },
    { blank: "cadence", text: cadence.label },
    { text: " in " },
    { blank: "subject", text: subName },
    { text: ", give " },
    { blank: "who", text: who.label },
    { text: " " },
    { blank: "activity", text: actPhrase },
    { text: " on " },
    { blank: "day", text: DAY_NAMES[routine.day ?? 0] || "Monday" },
    { text: "." },
  ];
}

export function pickerOptions(blank, subjectsInSetup) {
  if (blank === "cadence") return CADENCE_OPTIONS.map((o) => ({ key: o.key, label: o.sentence || o.label }));
  if (blank === "subject") return subjectOptionsForSetup(subjectsInSetup);
  if (blank === "who") return WHO_OPTIONS.map((o) => ({ key: o.key, label: o.label }));
  if (blank === "activity") return ACTIVITY_OPTIONS.map((o) => ({ key: o.key, label: `${o.article || ""}${o.label}`.trim() }));
  if (blank === "day") return DAY_OPTIONS.map((o) => ({ key: o.key, label: o.label }));
  return [];
}

export function applyBlankChange(routine, blank, value) {
  const next = { ...routine };
  if (blank === "cadence") {
    next.cadence = value;
    if (value === "end_of_unit") next.day = null;
    else if (next.day == null) next.day = 0;
  } else if (blank === "subject") next.subject = value;
  else if (blank === "who") next.who = value;
  else if (blank === "activity") next.activity = value;
  else if (blank === "day") {
    next.day = Number(value);
    if (next.cadence === "end_of_unit") next.cadence = "every_week";
  }
  return next;
}

export function newBlankRoutine(subjects) {
  return {
    id: `rtn-new-${Date.now()}`,
    cadence: "every_week",
    subject: subjects?.[0] || "math",
    who: "all_students",
    activity: "skill_builder",
    day: 0,
    enabled: true,
  };
}

export function whoDisplay(whoKey) {
  if (whoKey === "below_70") return "students below 70%";
  if (whoKey === "small_group") return "small group";
  return "Everyone";
}

/**
 * Enabled weekly routines → pretend week tiles (light touch).
 * Skips no-school days and end-of-unit cadence.
 */
export function activitiesFromRoutines(routines, subjectsInSetup, levelsBySubject) {
  const subjectSet = new Set(subjectsInSetup || []);
  const noSchool = new Set(DEMO_WEEK.noSchoolDays || []);
  const out = [];

  for (const r of routines || []) {
    if (!r.enabled || !subjectSet.has(r.subject)) continue;
    if (r.cadence !== "every_week" || r.day == null) continue;
    if (noSchool.has(r.day)) continue;

    const level = levelsBySubject?.[r.subject] || DEMO_WEEK.handsOffLevel;
    if (level === "i_plan") continue;

    const act = opt(ACTIVITY_OPTIONS, r.activity);
    out.push({
      id: `routine-tile-${r.id}`,
      subject: r.subject,
      day: r.day,
      kind: act.kind,
      title: act.label,
      product: act.product,
      minutes: act.minutes,
      who: whoDisplay(r.who),
      classes: "all",
      standard: "",
      auto: level === "run_for_me",
      routine: true,
      fromRoutine: r.id,
      handsOff: level,
    });
  }
  return out;
}

export function openOffers(dismissedMap, subjects) {
  const set = new Set(subjects || []);
  return DEMO_ROUTINE_OFFERS.filter((o) => set.has(o.subject) && !dismissedMap?.[o.id]);
}
