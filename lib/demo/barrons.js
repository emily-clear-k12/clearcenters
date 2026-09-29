// A finished example class for the demo. Nothing here is a real student.
//
// Sept 28, 2026 — rebuilt with 18 students and four weeks of work so the
// gradebook, reports and small groups have real differences to show.
// Every student has a profile (strong, improving, one weak standard,
// missing work, needs help…) and the marks come from that profile, so the
// same student looks the same way in every view. The marks are fixed, not
// random: every visit shows the same class.
//
// Every activity here is a real case in the app, so a student can open it.

export const DEMO_TEACHER_ID = "demo-teacher-barrons";

// Order matters: Maya stays at index 4, so her id is still class-elar-4.
// skill: how often they get it (0–1). trend: change per week.
// weak / strong: standard codes (or their first part, like "4.3") that are
// harder or easier for this student. missing: how often work is not turned in.
export const DEMO_STUDENTS = [
  { name: "Ava Brooks", skill: 0.9, trend: 0, blurb: "Strong in every subject" },
  { name: "Eli Nguyen", skill: 0.72, trend: 0, weak: ["4.3"], blurb: "Solid, but fractions are hard" },
  { name: "Jonah Blake", skill: 0.7, trend: 0, strong: ["4.10", "4.9", "4.8"], weak: ["4.6F", "4.7D"], blurb: "Loves science, struggles with inferences" },
  { name: "Luis Ortiz", skill: 0.38, trend: 0.14, blurb: "Improving every week" },
  { name: "Maya Chen", skill: 0.84, trend: 0, blurb: "On track, a few things to review" },
  { name: "Noah Patel", skill: 0.62, trend: 0, missing: 0.4, blurb: "Understands it, but work goes missing" },
  { name: "Priya Shah", skill: 0.95, trend: 0, blurb: "Ready for a challenge" },
  { name: "Sofia Reyes", skill: 0.28, trend: 0.02, missing: 0.1, blurb: "Needs help in most things" },
  { name: "Aiden Park", skill: 0.78, trend: -0.13, blurb: "Slipping the last two weeks" },
  { name: "Camila Torres", skill: 0.74, trend: 0, blurb: "Steady" },
  { name: "Diego Ramos", skill: 0.52, trend: 0, blurb: "Almost there on most things" },
  { name: "Emma Walsh", skill: 0.8, trend: 0, weak: ["4.4", "4.5"], blurb: "Strong reader, multiplication is shaky" },
  { name: "Grace Kim", skill: 0.76, trend: 0, weak: ["4.9"], blurb: "Moon and seasons are confusing" },
  { name: "Isaiah Moore", skill: 0.34, trend: 0.12, blurb: "Starting to catch on" },
  { name: "Layla Hassan", skill: 0.86, trend: 0, strong: ["4.8", "4.9"], blurb: "Strong, especially in science" },
  { name: "Mateo Silva", skill: 0.56, trend: 0, missing: 0.22, blurb: "In the middle, some missing work" },
  { name: "Olivia Grant", skill: 0.9, trend: 0, weak: ["4.12C"], blurb: "Strong, writing opinions is newer" },
  { name: "Ryan Cole", skill: 0.3, trend: 0, blurb: "Needs help, especially with reading" },
];

// Students the demo door lets you sign in as. Different stories on purpose.
export const DEMO_STUDENT_LOGINS = [
  { index: 4, label: "On track" },
  { index: 3, label: "Improving" },
  { index: 7, label: "Needs help" },
];

// week: 0 is this week, 1 last week… day: 0 Monday … 4 Friday.
const PLAN = {
  "class-sci": [
    ["4.10A-AD", "The Puddle's Trip", "assembly_deck", 3, 1],
    ["SCI.4.10A-XP", "The Water Cycle Loop", "expedition_station", 3, 3],
    ["4.10B-AD", "The Bend in Sandy Creek", "assembly_deck", 2, 1],
    ["SCI.4.10B-XP", "The Canyon Makers", "expedition_station", 2, 3],
    ["4.9B-AD", "Twenty-Eight Nights", "assembly_deck", 1, 1],
    ["SCI.4.9B-XP", "The Moon Watch", "expedition_station", 1, 3],
    ["4.8C-AD", "The Closed Path", "assembly_deck", 0, 1],
    ["SCI.4.8C-XP", "The Power Grid", "expedition_station", 0, 3],
  ],
  "class-math": [
    ["MA.4.3A-XP", "The Pollen Scoops", "expedition_station", 3, 1],
    ["MA.4.3C-XP", "The Lava Lock", "expedition_station", 3, 3],
    ["MA.4.3E-XP", "The Frozen Relay", "expedition_station", 2, 1],
    ["MA.4.3F-XP", "The Close Enough Check", "expedition_station", 2, 3],
    ["MA.4.4D-XP", "The Cargo Bays", "expedition_station", 1, 1],
    ["MA.4.4H-AD", "What the Remainder Means", "assembly_deck", 1, 3],
    ["MA.4.5B-AD", "The Sticker Machine", "assembly_deck", 0, 1],
    ["MA.4.5D-XP", "The Garden Plots", "expedition_station", 0, 3],
  ],
  "class-elar": [
    ["ELA.4.6F-XP", "The Dark Canopy", "expedition_station", 3, 1],
    ["ELA.4.6G-XP", "The Summit Summary", "expedition_station", 3, 3],
    ["ELA.4.7D-AD", "The Article and the Rumor", "assembly_deck", 2, 1],
    ["ELA.4.8A-XP", "The Tall Tale Trail", "expedition_station", 2, 3],
    ["ELA.4.8B-XP", "The Rival Pilots", "expedition_station", 1, 1],
    ["ELA.4.9E-XP", "The Outpost Debate", "expedition_station", 1, 3],
    ["ELA.4.12C-AD", "Later Recess", "assembly_deck", 0, 1],
    ["ELA.4.10E-XP", "Two Sides of the Storm", "expedition_station", 0, 3],
  ],
};

const SUBJECT = { "class-sci": "Science", "class-math": "Math", "class-elar": "ELAR" };

function iso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function mondayOf(weeksAgo) {
  const monday = new Date();
  monday.setHours(12, 0, 0, 0);
  const day = monday.getDay();
  monday.setDate(monday.getDate() + (day === 0 ? -6 : 1 - day) - weeksAgo * 7);
  return monday;
}

function dayDate(weeksAgo, day) {
  const date = mondayOf(weeksAgo);
  date.setDate(date.getDate() + day);
  return iso(date);
}

function todayIndex() {
  const day = new Date().getDay();
  return day === 0 || day === 6 ? 5 : day - 1; // weekends count as after Friday
}

// A fixed number between 0 and 1 for any text, so marks never change between visits.
function noise(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function codeOf(standard) {
  const match = String(standard).match(/(\d+\.\d+[A-Z]?)/);
  return match ? match[1] : "";
}

// "4.3" covers 4.3A, 4.3E… but not 4.30. A full code matches only itself.
function hits(list, code) {
  return (list || []).some((item) => code === item || (code.startsWith(item) && !/\d/.test(code.charAt(item.length))));
}

function skillFor(profile, code, weeksAgo) {
  let skill = profile.skill + (profile.trend || 0) * (3 - weeksAgo);
  if (hits(profile.weak, code)) skill -= 0.42;
  if (hits(profile.strong, code)) skill += 0.18;
  return Math.max(0.05, Math.min(0.98, skill));
}

// What happened to one student's work on one assignment.
// Returns null (not turned in), "review", "back" or 0 / 1 / 2.
function outcome(profile, classId, standard, weeksAgo, day) {
  const key = `${profile.name}|${classId}|${standard}`;
  const code = codeOf(standard);
  const now = todayIndex();
  const thisWeek = weeksAgo === 0;
  const notDueYet = thisWeek && day >= now;
  if (notDueYet) {
    // Due later this week: some are done early and waiting for review.
    return noise(`${key}|early`) < profile.skill * 0.5 ? "review" : null;
  }
  if (noise(`${key}|missing`) < (profile.missing || 0.02)) return null;
  // Pulled toward the middle so a student mostly looks like their profile.
  const roll = 0.5 + (noise(`${key}|mark`) - 0.5) * 0.75;
  const skill = skillFor(profile, code, weeksAgo);
  if (thisWeek && noise(`${key}|wait`) < 0.45) return "review";
  if (weeksAgo === 1 && noise(`${key}|wait`) < 0.08) return "review";
  if (noise(`${key}|back`) < 0.04 && skill < 0.6) return "back";
  if (roll < skill - 0.12) return 2;
  if (roll < skill + 0.22) return 1;
  return 0;
}

const TARGETS = {
  "4.10A-AD": "I can describe how water moves through the water cycle.",
  "SCI.4.10A-XP": "I can describe how water moves through the water cycle.",
  "4.10B-AD": "I can explain how weathering, erosion and deposition slowly change land.",
  "SCI.4.10B-XP": "I can explain how weathering, erosion and deposition slowly change land.",
  "4.9B-AD": "I can describe the pattern of the Moon’s phases.",
  "SCI.4.9B-XP": "I can describe the pattern of the Moon’s phases.",
  "4.8C-AD": "I can show how electricity flows in a closed circuit.",
  "SCI.4.8C-XP": "I can show how electricity flows in a closed circuit.",
  "MA.4.3A-XP": "I can show a fraction as a sum of unit fractions.",
  "MA.4.3C-XP": "I can tell if two fractions are equivalent.",
  "MA.4.3E-XP": "I can add and subtract fractions with the same denominator.",
  "MA.4.3F-XP": "I can check if a fraction answer makes sense.",
  "MA.4.4D-XP": "I can multiply up to a 4-digit number by a 1-digit number.",
  "MA.4.4H-AD": "I can solve division problems and explain the remainder.",
  "MA.4.5B-AD": "I can use an input-output table to find a rule.",
  "MA.4.5D-XP": "I can solve perimeter and area problems.",
  "ELA.4.6F-XP": "I can make inferences and back them up with evidence.",
  "ELA.4.6G-XP": "I can find the key ideas in a text.",
  "ELA.4.7D-AD": "I can summarize a text in my own words.",
  "ELA.4.8A-XP": "I can find the theme of a story.",
  "ELA.4.8B-XP": "I can explain how characters change.",
  "ELA.4.9E-XP": "I can tell what makes a text argumentative.",
  "ELA.4.12C-AD": "I can write an opinion with reasons.",
  "ELA.4.10E-XP": "I can explain a story’s point of view.",
};

function caseRow(standard, title, engine, subject) {
  return { standard, title, engine, subject, grade: 4, learning_target: TARGETS[standard] || title, status: "ready" };
}

const CONFIDENCE = ["shaky", "solid", "strong"];

export function createBarronsData() {
  const mon = dayDate(0, 0);
  const teacher = {
    id: DEMO_TEACHER_ID,
    name: "Mrs. Barrons",
    school: "ClearCenters Demo",
    email: "mrs.barrons@clearcenters.demo",
    equipped_sam_skin: "cosmic",
  };

  const classes = [
    { id: "class-elar", teacher_id: teacher.id, name: "Barrons ELAR", class_code: "READ-4401", grade: 4, subject: "ELAR", gradebook_scale: "percent", gradebook_got: 100, gradebook_almost: 75, gradebook_notyet: 50, planet_key: null, created_at: `${dayDate(4, 0)}T08:00:00` },
    { id: "class-sci", teacher_id: teacher.id, name: "Barrons Science", class_code: "LAB-4402", grade: 4, subject: "Science", gradebook_scale: "points", gradebook_got: 2, gradebook_almost: 1, gradebook_notyet: 0, planet_key: null, created_at: `${dayDate(4, 0)}T08:05:00` },
    { id: "class-math", teacher_id: teacher.id, name: "Barrons Math", class_code: "NUM-4403", grade: 4, subject: "Math", gradebook_scale: "four", gradebook_got: 4, gradebook_almost: 2, gradebook_notyet: 1, planet_key: null, created_at: `${dayDate(4, 0)}T08:10:00` },
  ];

  const students = classes.flatMap((cls) => DEMO_STUDENTS.map((profile, index) => ({
    id: `${cls.id}-${index}`,
    class_id: cls.id,
    first_name: profile.name,
    pin: String(2401 + index),
    active: true,
    crystal_points: Math.round(20 + profile.skill * 180),
    streak_days: Math.round(profile.skill * 5),
    home_background: null,
    equipped_sam_skin: "cosmic",
    sam_nickname: null,
    teacher_unlocked_sam_skins: ["cosmic"],
    equipped_world_trail: null,
    created_at: `${dayDate(4, 0)}T09:00:00`,
  })));

  const cases = [];
  const assignments = [];
  Object.entries(PLAN).forEach(([classId, rows]) => {
    rows.forEach(([standard, title, engine, weeksAgo, day], index) => {
      if (!cases.some((c) => c.standard === standard)) cases.push(caseRow(standard, title, engine, SUBJECT[classId]));
      assignments.push({
        id: `asg-${classId.replace("class-", "")}-${index + 1}`,
        class_id: classId,
        case_standard: standard,
        due_date: dayDate(weeksAgo, day),
        game_skin: null,
        created_at: `${dayDate(weeksAgo, 0)}T07:${String(30 + index).padStart(2, "0")}:00`,
        distress_call: null,
        _weeksAgo: weeksAgo,
        _day: day,
      });
    });
  });

  // One practice game, to show that practice stays out of the gradebook.
  cases.push({ standard: "4.FR.Energy", title: "Energy words", engine: "frequency_rush", subject: "Science", grade: 4, learning_target: "Know this unit's energy words by heart.", status: "ready" });
  assignments.push({ id: "asg-sci-practice", class_id: "class-sci", case_standard: "4.FR.Energy", due_date: null, game_skin: "frequency_rush", created_at: `${mon}T07:00:00`, distress_call: null, _weeksAgo: 0, _day: 0 });

  const submissions = [];
  assignments.forEach((assignment) => {
    if (assignment.game_skin) return;
    DEMO_STUDENTS.forEach((profile, index) => {
      const student = `${assignment.class_id}-${index}`;
      const mark = outcome(profile, assignment.class_id, assignment.case_standard, assignment._weeksAgo, assignment._day);
      if (mark === null) return;
      const waiting = mark === "review";
      const returned = mark === "back";
      const submittedDay = Math.max(0, assignment._day - (noise(`${student}|${assignment.id}|early`) < 0.5 ? 1 : 0));
      const conf = CONFIDENCE[Math.min(2, Math.floor(noise(`${student}|${assignment.id}|conf`) * 2 + profile.skill * 1.4))];
      submissions.push({
        id: `sub-${assignment.id}-${student}`,
        student_id: student,
        assignment_id: assignment.id,
        submitted_at: `${dayDate(assignment._weeksAgo, submittedDay)}T14:10:00`,
        teacher_grade: waiting ? null : returned ? 1 : mark,
        released: !waiting && !returned,
        revision_requested: returned,
        revision_requested_at: returned ? `${assignment.due_date}T16:00:00` : null,
        self_confidence: conf,
        response_text: `${profile.name.split(" ")[0]} turned this in.`,
      });
    });
  });
  assignments.forEach((a) => { delete a._weeksAgo; delete a._day; });

  const hints = [
    { id: "hint-1", student_id: "class-elar-4", assignment_id: "asg-elar-2" },
    { id: "hint-2", student_id: "class-sci-7", assignment_id: "asg-sci-6" },
    { id: "hint-3", student_id: "class-math-1", assignment_id: "asg-math-3" },
    { id: "hint-4", student_id: "class-math-3", assignment_id: "asg-math-4" },
  ];

  const badge_tiers = [
    { id: "tier-1", name: "Starter", sort_order: 1, threshold: 0 },
    { id: "tier-2", name: "Steady", sort_order: 2, threshold: 50 },
    { id: "tier-3", name: "Bright", sort_order: 3, threshold: 150 },
  ];

  const sam_shoutouts = [
    { id: "shout-maya", student_id: "class-elar-4", message: "Your main idea was clear. Nice work this week.", created_at: `${dayDate(1, 2)}T16:30:00`, seen_at: null },
    { id: "shout-luis", student_id: "class-elar-3", message: "Look how far you have come in three weeks!", created_at: `${dayDate(1, 4)}T16:30:00`, seen_at: null },
  ];

  return {
    teachers: [teacher],
    classes,
    students,
    cases,
    assignments,
    submissions,
    hint_requests: hints,
    assignment_students: [],
    badge_tiers,
    sam_shoutouts,
    student_planet_visits: [],
    planets: [],
  };
}

export function demoStudentName(id) {
  const match = String(id || "").match(/-(\d+)$/);
  const profile = match ? DEMO_STUDENTS[Number(match[1])] : null;
  return profile ? profile.name : "";
}
