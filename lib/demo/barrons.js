// A finished example class for the demo. Nothing here is a real student.

export const DEMO_TEACHER_ID = "demo-teacher-barrons";

const NAMES = ["Ava Brooks", "Eli Nguyen", "Jonah Blake", "Luis Ortiz", "Maya Chen", "Noah Patel", "Priya Shah", "Sofia Reyes"];

function iso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function thisWeek() {
  const monday = new Date();
  monday.setHours(12, 0, 0, 0);
  const day = monday.getDay();
  monday.setDate(monday.getDate() + (day === 0 ? -6 : 1 - day));
  return [0, 1, 2, 3, 4].map((offset) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + offset);
    return iso(date);
  });
}

function caseRow(standard, title, engine, subject, learning_target) {
  return { standard, title, engine, subject, grade: 4, learning_target, status: "ready" };
}

export function createBarronsData() {
  const [mon, tue, wed, thu, fri] = thisWeek();
  const teacher = {
    id: DEMO_TEACHER_ID,
    name: "Mrs. Barrons",
    school: "ClearCenters Demo",
    email: "mrs.barrons@clearcenters.demo",
    equipped_sam_skin: "cosmic",
  };

  const classes = [
    { id: "class-elar", teacher_id: teacher.id, name: "Barrons ELAR", class_code: "READ-4401", grade: 4, subject: "ELAR", gradebook_scale: "percent", gradebook_got: 100, gradebook_almost: 75, gradebook_notyet: 50, planet_key: null, created_at: `${mon}T08:00:00` },
    { id: "class-sci", teacher_id: teacher.id, name: "Barrons Science", class_code: "LAB-4402", grade: 4, subject: "Science", gradebook_scale: "points", gradebook_got: 2, gradebook_almost: 1, gradebook_notyet: 0, planet_key: null, created_at: `${mon}T08:05:00` },
    { id: "class-math", teacher_id: teacher.id, name: "Barrons Math", class_code: "NUM-4403", grade: 4, subject: "Math", gradebook_scale: "four", gradebook_got: 4, gradebook_almost: 2, gradebook_notyet: 1, planet_key: null, created_at: `${mon}T08:10:00` },
  ];

  const students = classes.flatMap((cls) => NAMES.map((name, index) => ({
    id: `${cls.id}-${index}`,
    class_id: cls.id,
    first_name: name,
    pin: String(2401 + index),
    active: true,
    crystal_points: 40 + index * 15,
    streak_days: index % 4,
    home_background: null,
    equipped_sam_skin: "cosmic",
    sam_nickname: null,
    teacher_unlocked_sam_skins: ["cosmic"],
    equipped_world_trail: null,
    created_at: `${mon}T09:00:00`,
  })));

  const cases = [
    caseRow("ELA.4.3A", "Monday word practice", "frequency_rush", "ELAR", "Read this week's words until they are automatic."),
    caseRow("ELA.4.6G", "What is the main idea?", "group_chat", "ELAR", "Name the main idea and two details that support it."),
    caseRow("ELA.4.9D", "Ask the museum", "assembly_deck", "ELAR", "Write a short letter that asks for facts before a trip."),
    caseRow("ELA.4.9E", "Two sides of the story", "exhibit_hall", "ELAR", "Show both sides, then say which one you agree with."),
    caseRow("ELA.4.12B", "Make the class poster", "maker_studio", "ELAR", "Make a poster that teaches the main idea to another class."),
    caseRow("SCI.4.10A", "Where does the water go?", "expedition_station", "Science", "Trace water through the cycle and explain one change."),
    caseRow("SCI.4.10B", "Classify the changes", "classification_lab", "Science", "Sort changes into physical and chemical."),
    caseRow("SCI.4.8C", "Defend the power grid", "signal_defense", "Science", "Answer as a class to keep the grid online."),
    caseRow("MA.4.3D", "Fractions on the line", "expedition_station", "Math", "Place fractions on a number line and explain the space between them."),
    caseRow("MA.4.4A", "Add the larger numbers", "mission_map", "Math", "Add and subtract whole numbers and show the steps."),
    caseRow("MA.4.5D", "The garden plots", "maker_studio", "Math", "Show the area of each plot and how you found it."),
  ];

  const plan = [
    ["asg-elar-mon", "class-elar", "ELA.4.3A", mon, "frequency_rush"],
    ["asg-elar-tue", "class-elar", "ELA.4.6G", tue, null],
    ["asg-elar-wed", "class-elar", "ELA.4.9D", wed, null],
    ["asg-elar-thu", "class-elar", "ELA.4.9E", thu, null],
    ["asg-elar-fri", "class-elar", "ELA.4.12B", fri, null],
    ["asg-sci-mon", "class-sci", "SCI.4.10A", mon, null],
    ["asg-sci-wed", "class-sci", "SCI.4.10B", wed, null],
    ["asg-sci-fri", "class-sci", "SCI.4.8C", fri, "signal_defense"],
    ["asg-math-tue", "class-math", "MA.4.3D", tue, null],
    ["asg-math-thu", "class-math", "MA.4.4A", thu, null],
    ["asg-math-fri", "class-math", "MA.4.5D", fri, null],
  ];

  const assignments = plan.map(([id, class_id, case_standard, due_date, game_skin], index) => ({
    id,
    class_id,
    case_standard,
    due_date,
    game_skin,
    created_at: `${mon}T10:${String(index).padStart(2, "0")}:00`,
    distress_call: null,
  }));

  // Grades by first name for the graded assignments. Missing means not turned in.
  // 2 Got it, 1 Almost, 0 Not yet, "review" turned in and waiting, "back" sent back.
  const marks = {
    "asg-elar-tue": { "Ava Brooks": 2, "Eli Nguyen": 1, "Jonah Blake": 2, "Luis Ortiz": 1, "Maya Chen": 2, "Noah Patel": "review", "Priya Shah": 2, "Sofia Reyes": 0 },
    "asg-elar-wed": { "Ava Brooks": 2, "Eli Nguyen": 2, "Jonah Blake": 1, "Luis Ortiz": 2, "Maya Chen": 2, "Noah Patel": 1, "Priya Shah": 2, "Sofia Reyes": "back" },
    "asg-elar-thu": { "Ava Brooks": 1, "Eli Nguyen": 2, "Jonah Blake": 2, "Luis Ortiz": "review", "Maya Chen": 2, "Noah Patel": 1, "Priya Shah": 2, "Sofia Reyes": 1 },
    "asg-sci-mon": { "Ava Brooks": 2, "Eli Nguyen": 1, "Jonah Blake": 2, "Luis Ortiz": 2, "Maya Chen": 2, "Noah Patel": 1, "Priya Shah": 2, "Sofia Reyes": 1 },
    "asg-sci-wed": { "Ava Brooks": 2, "Eli Nguyen": 0, "Jonah Blake": 1, "Luis Ortiz": 2, "Maya Chen": 2, "Noah Patel": 1, "Priya Shah": "review", "Sofia Reyes": 1 },
    "asg-math-tue": { "Ava Brooks": 2, "Eli Nguyen": 1, "Jonah Blake": 2, "Luis Ortiz": 1, "Maya Chen": 2, "Noah Patel": 2, "Priya Shah": 2, "Sofia Reyes": 1 },
    "asg-math-thu": { "Ava Brooks": 1, "Eli Nguyen": 1, "Jonah Blake": 2, "Luis Ortiz": 2, "Maya Chen": "review", "Noah Patel": 1, "Priya Shah": 2, "Sofia Reyes": 0 },
  };

  const submissions = [];
  const hints = [];
  Object.entries(marks).forEach(([assignmentId, byName]) => {
    const assignment = assignments.find((item) => item.id === assignmentId);
    Object.entries(byName).forEach(([name, mark]) => {
      const student = students.find((item) => item.class_id === assignment.class_id && item.first_name === name);
      const waiting = mark === "review";
      const returned = mark === "back";
      submissions.push({
        id: `sub-${assignmentId}-${student.id}`,
        student_id: student.id,
        assignment_id: assignmentId,
        submitted_at: `${assignment.due_date}T14:10:00`,
        teacher_grade: waiting || returned ? (returned ? 1 : null) : mark,
        released: !waiting && !returned,
        revision_requested: returned,
        revision_requested_at: returned ? `${assignment.due_date}T16:00:00` : null,
        self_confidence: mark === 2 ? "very" : "somewhat",
        response_text: `${name} turned this in for ${assignment.case_standard}.`,
      });
    });
  });

  hints.push(
    { id: "hint-1", student_id: "class-elar-4", assignment_id: "asg-elar-tue" },
    { id: "hint-2", student_id: "class-elar-4", assignment_id: "asg-elar-wed" },
    { id: "hint-3", student_id: "class-sci-1", assignment_id: "asg-sci-wed" },
  );

  const badge_tiers = [
    { id: "tier-1", name: "Starter", sort_order: 1, threshold: 0 },
    { id: "tier-2", name: "Steady", sort_order: 2, threshold: 50 },
    { id: "tier-3", name: "Bright", sort_order: 3, threshold: 150 },
  ];

  const sam_shoutouts = [
    { id: "shout-maya", student_id: "class-elar-4", message: "Your main idea was clear. Nice work on Tuesday.", created_at: `${tue}T16:30:00`, seen_at: null },
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
