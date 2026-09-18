// CI2.0 sandbox pretend data for This Week.
// Locked subject colors: Math cyan, ELAR magenta, Science green, Social Studies amber.
export const SUBJECTS = {
  math: { key: "math", name: "Math", color: "#00A8D4", unit: "Fractions" },
  elar: { key: "elar", name: "ELAR", color: "#C2185B", unit: "Author's Purpose" },
  science: { key: "science", name: "Science", color: "#2FA36B", unit: "Matter & Energy" },
  social: { key: "social", name: "Social Studies", color: "#D4940A", unit: "Texas Regions" },
};

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const DATES = ["Oct 6", "Oct 7", "Oct 8", "Oct 9", "Oct 10"];

export const KINDS = {
  teach: { label: "Teach together", short: "Teach" },
  work: { label: "Student work", short: "Work" },
  small: { label: "Small group", short: "Group" },
};

export const DEMO_TEACHER = { name: "Ms. Rivera" };
export const DEMO_WEEK = {
  label: "Oct 6-10",
  handsOffLevel: "plan_for_me",
  gradingCount: 12,
  // Demo calendar note for Sunday preview (not a real district calendar).
  noSchoolDays: [0], // Monday — routines paused in outbound preview
  noSchoolLabel: "No school Monday — routines paused",
};

// Ask once: self-contained vs departmentalized (1–2 subjects, multiple periods).
// Period rooms carry students + ready hint for the room-card UI.
export const TEACHER_SETUPS = {
  self: {
    label: "Self-contained · all subjects · 1 class",
    subjects: ["math", "elar", "science", "social"],
    classes: [{ key: "A", name: "Room 12", students: 24 }],
  },
  math: {
    label: "Math only · 3 periods",
    subjects: ["math"],
    classes: [
      { key: "A", name: "Period 1", students: 22 },
      { key: "B", name: "Period 2", students: 24 },
      { key: "C", name: "Period 3", students: 26 },
    ],
  },
  mathsci: {
    label: "Math + Science · 3 periods",
    subjects: ["math", "science"],
    classes: [
      { key: "A", name: "Period 1", students: 22 },
      { key: "B", name: "Period 2", students: 24 },
      { key: "C", name: "Period 3", students: 26 },
    ],
  },
  elarss: {
    label: "ELAR + SS · 2 periods",
    subjects: ["elar", "social"],
    classes: [
      { key: "A", name: "Period 1", students: 23 },
      { key: "B", name: "Period 2", students: 25 },
    ],
  },
  scisoc: {
    label: "Science + Social Studies · 3 periods",
    subjects: ["science", "social"],
    classes: [
      { key: "A", name: "Period 1", students: 22 },
      { key: "B", name: "Period 2", students: 24 },
      { key: "C", name: "Period 3", students: 26 },
    ],
  },
};

let n = 0;
const a = (subject, day, kind, title, product, minutes, who, classes = "all", standard = "", extra = {}) => ({
  id: `act-${++n}`,
  subject,
  day,
  kind,
  title,
  product,
  minutes,
  who,
  classes,
  standard,
  ...extra,
});

export const DEMO_ACTIVITIES = [
  // Math — shared across periods ("all") plus a few period-specific so departmentalized feels alive
  a("math", 0, "teach", "Comparing fractions", "ClearLessons", 15, "Everyone", "all", "4.3D"),
  a("math", 0, "work", "Fraction practice", "CrystalQuest", 20, "Everyone", "all", "4.3D", { routine: true }),
  a("math", 0, "small", "Fraction models", "ClearSheets", 10, "6 students", ["B"], "4.3A"),
  a("math", 0, "work", "Warm-up: period 1 exit tickets", "ClearSheets", 8, "Everyone", ["A"], "4.3D"),
  a("math", 1, "teach", "Fractions on a number line", "ClearLessons", 15, "Everyone", "all", "4.3G"),
  a("math", 1, "work", "Fraction strips", "ClearSheets", 20, "Everyone", "all", "4.3G"),
  a("math", 1, "small", "Number line check-in", "ClearSheets", 10, "4 students", ["C"], "4.3G"),
  a("math", 2, "teach", "Equivalent fractions", "ClearLessons", 15, "Everyone", "all", "4.3C"),
  a("math", 2, "work", "Analyze: The Pizza Problem", "ClearCenters", 25, "Everyone", "all", "4.3C"),
  a("math", 2, "work", "Period 2 challenge board", "ClearCenters", 15, "Everyone", ["B"], "4.3C"),
  a("math", 3, "work", "Equivalent fractions practice", "CrystalQuest", 20, "Everyone", "all", "4.3C"),
  a("math", 3, "small", "Numerator / denominator clinic", "ClearSheets", 10, "5 students", ["A"], "4.3A"),
  a("math", 4, "teach", "Fractions review game", "ClassCade Showdown", 20, "Everyone", "all", "4.3"),
  a("math", 4, "work", "Friday quick check", "CrystalQuest", 12, "Everyone", ["C"], "4.3"),

  // ELAR
  a("elar", 0, "teach", "Persuade, inform, entertain", "ClearLessons", 20, "Everyone", "all", "4.9A"),
  a("elar", 0, "work", "Author's purpose sort", "ClearSheets", 15, "Everyone", "all", "4.9A"),
  a("elar", 0, "work", "Period 1 reading log", "ClearSheets", 10, "Everyone", ["A"], "4.9A"),
  a("elar", 1, "work", "Read & Respond: The Great Garden", "ClearCenters", 25, "Everyone", "all", "4.10A"),
  a("elar", 1, "teach", "Purpose in ads", "ClearLessons", 15, "Everyone", ["B"], "4.9A"),
  a("elar", 2, "small", "Author's purpose reteach", "ClearSheets", 10, "5 students", ["A"], "4.9A"),
  a("elar", 2, "work", "Purpose match stations", "ClearCenters", 20, "Everyone", "all", "4.9A"),
  a("elar", 3, "teach", "Finding text evidence", "ClearLessons", 20, "Everyone", "all", "4.6C"),
  a("elar", 3, "work", "Evidence hunt", "ClearSheets", 20, "Everyone", "all", "4.6C"),
  a("elar", 4, "work", "Reading quick check", "CrystalQuest", 15, "Everyone", "all", "4.9A"),

  // Science
  a("science", 0, "teach", "Density", "ClearLessons", 20, "Everyone", "all", "5.6A"),
  a("science", 0, "work", "Density prediction sheet", "ClearSheets", 12, "Everyone", ["A"], "5.6A"),
  a("science", 1, "work", "Investigate: Sink or Float", "ClearCenters", 30, "Everyone", "all", "5.6A"),
  a("science", 1, "small", "Sink or float lab group", "ClearSheets", 12, "6 students", ["B"], "5.6A"),
  a("science", 2, "teach", "Mixtures & solutions", "ClearLessons", 20, "Everyone", "all", "5.6B"),
  a("science", 2, "work", "Lab notebook check", "ClearSheets", 10, "Everyone", ["C"], "5.6B"),
  a("science", 3, "work", "Mixture sort", "ClearSheets", 15, "Everyone", "all", "5.6B"),
  a("science", 4, "teach", "Matter review game", "ClassCade Showdown", 20, "Everyone", "all", "5.6"),

  // Social Studies
  a("social", 0, "work", "Region vocab warm-up", "ClearSheets", 10, "Everyone", ["A"], "4.7B"),
  a("social", 1, "teach", "The Gulf Coast", "ClearLessons", 20, "Everyone", "all", "4.7B"),
  a("social", 1, "work", "Coast map sketch", "ClearSheets", 15, "Everyone", ["B"], "4.7B"),
  a("social", 2, "work", "Examine: Map Detectives", "ClearCenters", 25, "Everyone", "all", "4.7B"),
  a("social", 3, "teach", "Coastal Plains review", "ClearLessons", 15, "Everyone", "all", "4.7B"),
  a("social", 3, "small", "Map skills group", "ClearSheets", 10, "4 students", ["C"], "4.7B"),
  a("social", 4, "work", "CrystalCheck: Texas Regions", "CrystalChecks", 30, "Everyone", "all", "4.7"),
];

/**
 * Extra auto-assign tiles injected when hands-off is "Run it for me".
 * Kept separate so dial changes feel tangible without mutating the base demo set.
 */
export const DEMO_AUTO_ROUTINES = [
  {
    id: "auto-math-warmup",
    subject: "math",
    day: 1,
    kind: "work",
    title: "Tuesday fraction warm-up",
    product: "CrystalQuest",
    minutes: 8,
    who: "Everyone",
    classes: "all",
    standard: "4.3D",
    auto: true,
    routine: true,
  },
  {
    id: "auto-math-exit",
    subject: "math",
    day: 2,
    kind: "work",
    title: "Exit ticket: equivalents",
    product: "ClearSheets",
    minutes: 5,
    who: "Everyone",
    classes: "all",
    standard: "4.3C",
    auto: true,
    routine: true,
  },
  {
    id: "auto-math-thu",
    subject: "math",
    day: 3,
    kind: "work",
    title: "Spiral review (routine)",
    product: "CrystalQuest",
    minutes: 10,
    who: "Everyone",
    classes: "all",
    standard: "4.3",
    auto: true,
    routine: true,
  },
  {
    id: "auto-elar-journal",
    subject: "elar",
    day: 1,
    kind: "work",
    title: "Reading journal (routine)",
    product: "ClearSheets",
    minutes: 10,
    who: "Everyone",
    classes: "all",
    standard: "4.9A",
    auto: true,
    routine: true,
  },
  {
    id: "auto-science-warmup",
    subject: "science",
    day: 3,
    kind: "work",
    title: "Matter warm-up (routine)",
    product: "CrystalQuest",
    minutes: 8,
    who: "Everyone",
    classes: "all",
    standard: "5.6",
    auto: true,
    routine: true,
  },
  {
    id: "auto-social-map",
    subject: "social",
    day: 4,
    kind: "work",
    title: "Map skills flash (routine)",
    product: "ClearSheets",
    minutes: 8,
    who: "Everyone",
    classes: "all",
    standard: "4.7B",
    auto: true,
    routine: true,
  },
];

// Calm SAM language: positive + "not yet" — never scary.
export const DEMO_SUGGESTIONS = [
  {
    id: "sug-math-equiv",
    subject: "math",
    day: 2,
    classKey: "B",
    text: (cls) => `4 students${cls ? " in " + cls : ""} are not yet solid on equivalent fractions.`,
    action: "Add reteach",
    actionHref: null,
    adds: { subject: "math", day: 2, kind: "small", title: "Equivalent fractions reteach", product: "ClearSheets", minutes: 10, who: "4 students", standard: "4.3C" },
    boldness: 2,
  },
  {
    id: "sug-science-reteach",
    subject: "science",
    day: 2,
    classKey: "A",
    text: (cls) => `3 students${cls ? " in " + cls : ""} aren't there yet on density (5.6A).`,
    action: "Add reteach",
    adds: { subject: "science", day: 2, kind: "small", title: "Density reteach", product: "ClearSheets", minutes: 10, who: "3 students", standard: "5.6A" },
    boldness: 1,
  },
  {
    id: "sug-math-group",
    subject: "math",
    day: 3,
    classKey: "C",
    text: (cls) => `5 students${cls ? " in " + cls : ""} are still mixing up numerators and denominators.`,
    action: "Add small group",
    adds: { subject: "math", day: 3, kind: "small", title: "Numerator & denominator check-in", product: "ClearSheets", minutes: 10, who: "5 students", standard: "4.3A" },
    boldness: 2,
  },
  {
    id: "sug-math-routine",
    subject: "math",
    day: 0,
    classKey: null,
    text: () => "You've assigned Fraction practice every Monday for 3 weeks. Make it a weekly routine?",
    action: "Make it a routine",
    routineFor: "act-2",
    boldness: 1,
  },
  {
    id: "sug-elar-purpose",
    subject: "elar",
    day: 2,
    classKey: "A",
    text: (cls) => `5 students${cls ? " in " + cls : ""} could use another pass on author's purpose.`,
    action: "Add reteach",
    adds: { subject: "elar", day: 2, kind: "small", title: "Author's purpose reteach", product: "ClearSheets", minutes: 10, who: "5 students", standard: "4.9A" },
    boldness: 1,
  },
  {
    id: "sug-math-build",
    subject: "math",
    day: 4,
    classKey: null,
    text: () => "Friday still looks light — want a quick crystal check warm-up?",
    action: "Add warm-up",
    adds: { subject: "math", day: 4, kind: "work", title: "Friday warm-up (suggested)", product: "CrystalQuest", minutes: 8, who: "Everyone", standard: "4.3" },
    boldness: 3,
  },
];

export const PRODUCT_INFO = {
  ClearLessons: { tag: "Lesson", about: "A teacher-led lesson with slides, ready to project from Today." },
  ClearSheets: { tag: "Sheet", about: "A practice sheet students can do digitally or on paper." },
  ClearCenters: { tag: "Center", about: "A thinking station: Practice, Prove and Push challenges." },
  CrystalQuest: { tag: "Quest", about: "Individually paced practice that adjusts to each student." },
  "ClassCade Showdown": { tag: "Showdown", about: "A whole-class review game, projected from Today." },
  CrystalChecks: { tag: "CrystalCheck", about: "The end-of-unit assessment. Always completed at school." },
};

export const HANDS_OFF_LEVELS = [
  {
    key: "i_plan",
    title: "I'll plan it",
    short: "I'll plan",
    body: "The site suggests; you build the week yourself.",
    dialHint: "Lean week · bold suggestions",
  },
  {
    key: "plan_for_me",
    title: "Plan it for me, I'll publish",
    short: "Plan for me",
    body: "Suggested week ready; you review + Publish. Default for most.",
    dialHint: "Full suggested week · you publish",
  },
  {
    key: "run_for_me",
    title: "Run it for me",
    short: "Run it",
    body: "Routines assign automatically. Sunday preview lets you change anything first.",
    dialHint: "Auto routines · fuller week",
  },
];

/** Unit label for a setup (first subject, or joined when multi). */
export function setupUnitLabel(setup) {
  if (!setup?.subjects?.length) return "";
  if (setup.subjects.length === 1) return SUBJECTS[setup.subjects[0]]?.unit || "";
  return setup.subjects.map((k) => SUBJECTS[k]?.unit).filter(Boolean).join(" · ");
}

/**
 * Demo week fullness by hands-off level (per subject).
 * - i_plan: teach + flagged routines only (lean; she builds)
 * - plan_for_me: base demo activities (suggested week)
 * - run_for_me: base + auto routine tiles
 */
export function applyHandsOffFullness(activities, levelsBySubject, subjectsInSetup) {
  const subjectSet = new Set(subjectsInSetup || []);
  const base = (activities || []).filter((x) => subjectSet.has(x.subject));
  const out = [];

  for (const act of base) {
    const level = levelsBySubject?.[act.subject] || DEMO_WEEK.handsOffLevel;
    if (level === "i_plan") {
      // Lean: keep teach + explicit routines; drop most work/small so dial feels empty-ish.
      if (act.kind === "teach" || act.routine) out.push({ ...act, handsOff: level });
    } else {
      out.push({ ...act, handsOff: level, auto: act.auto || (level === "run_for_me" && act.routine) });
    }
  }

  // Inject auto routines only for subjects on Run it.
  for (const auto of DEMO_AUTO_ROUTINES) {
    if (!subjectSet.has(auto.subject)) continue;
    const level = levelsBySubject?.[auto.subject] || DEMO_WEEK.handsOffLevel;
    if (level === "run_for_me") out.push({ ...auto, handsOff: level });
  }

  return out;
}

/** Suggestion boldness: i_plan shows more / stronger; run_for_me fewer soft nudges. */
export function filterSuggestionsForLevels(suggestions, levelsBySubject, subjectsInSetup) {
  const subjectSet = new Set(subjectsInSetup || []);
  return (suggestions || []).filter((s) => {
    if (!subjectSet.has(s.subject)) return false;
    const level = levelsBySubject?.[s.subject] || DEMO_WEEK.handsOffLevel;
    const b = s.boldness ?? 1;
    if (level === "i_plan") return true; // all suggestions — she builds from them
    if (level === "plan_for_me") return b <= 2;
    return b <= 1; // run_for_me: quiet — auto handles most
  });
}

export function handsOffLevelMeta(key) {
  return HANDS_OFF_LEVELS.find((l) => l.key === key) || HANDS_OFF_LEVELS[1];
}
