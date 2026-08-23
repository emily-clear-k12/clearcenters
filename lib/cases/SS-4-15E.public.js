// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.15E, TEKS 4.15E).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  milo: { name: "Milo Governor-for-Everything", emoji: "📬", color: "#F59E0B", hint: undefined },
  local: { name: "Lena Local Office", emoji: "🏙️", color: "#3B82F6", hint: undefined },
  state: { name: "Sam State Office", emoji: "⭐", color: "#22C55E", hint: undefined },
  type: { name: "Tara Elected-or-Appointed", emoji: "🧑‍💼", color: "#8B5CF6", hint: undefined },
  route: { name: "Riley Routing Desk", emoji: "🔎", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.15E",
  title: "Dear... Who in Texas?",
  bigQuestion: "How do you decide which state or local government leader to contact about a problem?",
  trapLine: "If you have a government problem, sending it to the governor is always the safest choice.",
  evidenceBank: [
    "A broken city park light is usually handled by local government.",
    "A concern about a statewide law belongs at the state level.",
    "Some leaders are elected, while others are appointed to specific jobs."
  ],
  coldOpenMessages: [
    { who: "system", text: "Three students are writing letters about three different problems. One wants to send every letter to the governor because 'the governor is in charge of Texas.'" },
    { who: "milo", text: "If it’s a government issue in Texas, why not just send it to the governor?" },
    { who: "local", text: "A city problem usually belongs with a local office or leader." },
    { who: "state", text: "A statewide issue may need a state official or agency." },
    { who: "type", text: "The right contact may be elected or appointed depending on the job." },
    { who: "route", text: "Start with the problem, then ask which level and office is responsible." }
  ],
  selfCheckQuestions: [
    "Did I identify whether the issue is local or state?",
    "Did I choose a leader or office that matches the issue?",
    "Did I explain that some leaders are elected and others are appointed?",
    "Did I explain why the selected contact is responsible for the problem?",
    "Did I explain why the governor is not automatically the correct contact for every issue?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "problem", label: "What kind of problem is it?", placeholder: "City/local or statewide?" },
  { key: "level", label: "Which level of government is responsible?", placeholder: "Local or state..." },
  { key: "leader", label: "What type of leader or office should be contacted?", placeholder: "Elected/appointed/agency..." },
  { key: "reason", label: "Why is that contact the best match?", placeholder: "Connect responsibility to issue..." },
  { key: "claim", label: "Why is 'send everything to the governor' ineffective?", placeholder: "Use the routing rule..." }
];

export const PUSH_ANGLE = "Routing Challenge: match four fictional problems to the best state or local contact.";
