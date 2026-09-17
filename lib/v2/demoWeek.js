// CI2.0 sandbox — pretend data for the teacher "This Week" prototype.
// Nothing here touches the database. Once the look and flow are approved,
// this file is replaced by real data from the unit plan, routines and
// student results (see the CI2.0 Build Plan, Phase 1).

export const SUBJECT_COLORS = {
  math: "#3D84F5",
  elar: "#D65DE0",
  science: "#14B8C4",
  social: "#8C52F2",
};

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const DEMO_TEACHER = { name: "Ms. Rivera", firstName: "Ms. Rivera" };

export const DEMO_WEEK = {
  label: "Oct 6–10",
  handsOffLevel: "plan_for_me", // "i_plan" | "plan_for_me" | "run_for_me"
};

// Each item: day (0–4), lane ("whole" | "student"), title, product, who.
export const DEMO_SUBJECTS = [
  {
    key: "math",
    name: "Math",
    unit: "Unit 3 · Fractions",
    unitWeek: "Week 2 of 3",
    status: "ready",
    items: [
      { day: 0, lane: "whole", title: "Lesson 4: Comparing fractions", product: "ClearLessons" },
      { day: 0, lane: "student", title: "Skill Builder Practice", product: "CrystalQuest", who: "All students" },
      { day: 2, lane: "whole", title: "Lesson 5: Equivalent fractions", product: "ClearLessons" },
      { day: 2, lane: "student", title: "Fraction strips", product: "ClearSheets", who: "All students" },
      { day: 3, lane: "student", title: "Analyze: The Pizza Problem", product: "ClearCenters", who: "All students" },
      { day: 4, lane: "whole", title: "Fractions review", product: "ClassCade Showdown" },
    ],
    routineOffer: "You've assigned Skill Builder Practice every Monday for 3 weeks. Want me to do that automatically?",
  },
  {
    key: "elar",
    name: "ELAR",
    unit: "Unit 2 · Author's Purpose",
    unitWeek: "Week 1 of 2",
    status: "ready",
    items: [
      { day: 0, lane: "whole", title: "Lesson 2: Persuade, inform, entertain", product: "ClearLessons" },
      { day: 1, lane: "student", title: "Read & Respond: The Great Garden", product: "ClearCenters", who: "All students" },
      { day: 2, lane: "student", title: "Author's purpose sort", product: "ClearSheets", who: "6 students" },
      { day: 3, lane: "whole", title: "Lesson 3: Text evidence", product: "ClearLessons" },
    ],
  },
  {
    key: "science",
    name: "Science",
    unit: "Unit 4 · Matter & Energy",
    unitWeek: "Week 2 of 3",
    status: "needs_you",
    items: [
      { day: 0, lane: "whole", title: "Lesson 6: Density", product: "ClearLessons" },
      { day: 1, lane: "student", title: "Investigate: Sink or Float", product: "ClearCenters", who: "All students" },
      { day: 3, lane: "whole", title: "Lesson 7: Mixtures & solutions", product: "ClearLessons" },
      { day: 4, lane: "whole", title: "Matter review", product: "ClassCade Showdown" },
    ],
    need: {
      text: "3 students aren't there yet on 5.6A (density).",
      action: "Add reteach",
      adds: { day: 2, lane: "student", title: "Reteach: Density ClearSheet", product: "ClearSheets", who: "3 students" },
    },
  },
  {
    key: "social",
    name: "Social Studies",
    unit: "Unit 3 · Texas Regions",
    unitWeek: "Week 3 of 3",
    status: "ready",
    items: [
      { day: 1, lane: "whole", title: "Lesson 5: The Gulf Coast", product: "ClearLessons" },
      { day: 2, lane: "student", title: "Examine: Map Detectives", product: "ClearCenters", who: "All students" },
      { day: 4, lane: "student", title: "CrystalCheck: Texas Regions", product: "CrystalChecks", who: "All students" },
    ],
  },
];

// Everything else that needs the teacher this week (never more than 3 total
// on screen, counting subject needs).
export const DEMO_OTHER_NEEDS = [
  { key: "grading", text: "12 submissions are ready for your review.", action: "Open grading" },
  { key: "testing", text: "State testing week starts Oct 20. Routines will pause that week.", action: "See calendar" },
];

export const HANDS_OFF_LEVELS = [
  {
    key: "i_plan",
    title: "I'll plan it",
    body: "The site suggests activities, and you build the week yourself.",
  },
  {
    key: "plan_for_me",
    title: "Plan it for me, I'll publish",
    body: "Your week is built from your unit plan and routines. You review it and click Publish.",
  },
  {
    key: "run_for_me",
    title: "Run it for me",
    body: "Your routines assign automatically. You get a Sunday preview and can change anything first.",
  },
];
