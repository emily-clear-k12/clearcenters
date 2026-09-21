// Works out a case's grade from its standard code, so the AI characters and
// the scorer talk to (and grade) the student at the right grade level.
// Every Group Chat code starts with the grade, after an optional subject
// prefix: "4.8A" (Science), "SS.4.10A", "MA.3.3H", "ELA.5.10D".
// Added Sept 21, 2026 — both prompts used to say "5th grade" for every case.

const AGES = { 3: "8-9", 4: "9-10", 5: "10-11" };

export function gradeFromStandard(standard) {
  const m = String(standard || "").replace(/^[A-Za-z]+\./, "").match(/^(\d+)\./);
  const grade = m ? parseInt(m[1], 10) : 5;
  return AGES[grade] ? grade : 5;
}

export function gradeWords(standard) {
  const g = gradeFromStandard(standard);
  const ordinal = { 3: "3rd", 4: "4th", 5: "5th" }[g];
  return { grade: g, label: `${ordinal} grade`, ages: AGES[g] };
}
