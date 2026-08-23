// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.15A, TEKS 5.15A).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.15A, for example).

export const CAST = {
  ava: { name: "Ava Brooks", emoji: "🎤", color: "#F59E0B", hint: "Assumes the president does every major government job." },
  leg: { name: "Lena Legislative", emoji: "🏛️", color: "#3B82F6", hint: "Owns the lawmaking function." },
  exec: { name: "Evan Executive", emoji: "🦅", color: "#EF4444", hint: "Owns the law-carrying-out function." },
  jud: { name: "Jordan Judicial", emoji: "⚖️", color: "#8B5CF6", hint: "Owns the law-interpreting function." },
  guide: { name: "Mr. Torres", emoji: "🗂️", color: "#0D9488", hint: "Needs all three functions clearly separated." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.15A",
  title: "Everybody Wants the Gavel",
  bigQuestion: "What is the basic job of each branch of the federal government, and why can no one branch simply do all three jobs?",
  trapLine: "The president is the leader, so the executive branch basically makes the laws and decides what they mean too.",
  evidenceBank: [
    "Congress belongs to the legislative branch",
    "The president leads the executive branch",
    "Federal courts belong to the judicial branch"
  ],
  coldOpenMessages: [
    { who: "system", text: "At a Government Job Fair, three branch booths are explaining what they do." },
    { who: "ava", text: "This is easy. The president is the leader, so the executive branch is basically the branch that makes the laws." },
    { who: "leg", text: "Congress would like a word." },
    { who: "exec", text: "I carry out laws. That is not the same job as writing them." },
    { who: "jud", text: "And interpreting laws belongs to courts, not the president." },
    { who: "ava", text: "But if the president leads the country, why would the other branches have those big jobs?" },
    { who: "guide", text: "Because “leader” and “does every government function” are not the same thing. Map the jobs carefully." }
  ],
  selfCheckQuestions: [
    "Did I identify Congress with the legislative branch and explain that it makes laws?",
    "Did I identify the president/executive branch and explain that it carries out or enforces laws?",
    "Did I identify the courts/judicial branch and explain that they interpret laws?",
    "Did I clearly distinguish making, carrying out, and interpreting laws?",
    "Did I avoid saying that the president or any one branch performs all three basic functions?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What job does Ava think the president/executive branch does?", placeholder: "Record the mixed-up claim..." },
  { key: "leg", label: "What is the legislative branch’s basic function?", placeholder: "Branch, institution, job..." },
  { key: "exec", label: "What is the executive branch’s basic function?", placeholder: "Branch, leader, job..." },
  { key: "jud", label: "What is the judicial branch’s basic function?", placeholder: "Branch, institution, job..." },
  { key: "compare", label: "How do the three functions differ?", placeholder: "Explain why making, carrying out, and interpreting laws are not the same job..." }
];

export const PUSH_ANGLE = "Job Badge Repair: create three one-line badges — Legislative = __, Executive = __, Judicial = __ — then add one sentence explaining why Ava’s “president does it all” badge is wrong.";
