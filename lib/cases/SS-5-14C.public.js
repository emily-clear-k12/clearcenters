// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.14C, TEKS 5.14C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.14C, for example).

export const CAST = {
  clara: { name: "Clara Wells", emoji: "🗞️", color: "#F59E0B", hint: "Thinks the Constitution made a Bill of Rights unnecessary." },
  concern: { name: "Samuel Hart", emoji: "⚠️", color: "#EF4444", hint: "Owns concerns about government power." },
  rights: { name: "Eliza Reed", emoji: "🛡️", color: "#8B5CF6", hint: "Explains what the amendments protect." },
  amend: { name: "Noah Price", emoji: "✍️", color: "#3B82F6", hint: "Explains why amendments can add protections." },
  editor: { name: "Mrs. Bell", emoji: "📚", color: "#0D9488", hint: "Needs a why-created + why-important explanation." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.14C",
  title: "Why Add Ten More?",
  bigQuestion: "Why was the Bill of Rights added after the Constitution, and why is it still important?",
  trapLine: "The Constitution already created the government, so the Bill of Rights was unnecessary extra paperwork.",
  evidenceBank: [
    "Some Americans worried about a powerful national government",
    "The Bill of Rights is the first ten amendments",
    "The amendments add explicit protections for liberties"
  ],
  coldOpenMessages: [
    { who: "system", text: "A newspaper is preparing an explainer about why ten amendments were added soon after the Constitution." },
    { who: "clara", text: "I do not get it. We already had a Constitution. Why add ten more pieces?" },
    { who: "concern", text: "Because some people worried a stronger national government might threaten individual liberties." },
    { who: "rights", text: "Writing protections into the Constitution changes what government is allowed to do." },
    { who: "amend", text: "And amendments add to the Constitution. They do not throw the whole document away." },
    { who: "clara", text: "So the first Constitution was incomplete?" },
    { who: "editor", text: "Careful. Our article needs to explain why protections were added and why that mattered." }
  ],
  selfCheckQuestions: [
    "Did I explain why some Americans wanted additional protections after the Constitution was written?",
    "Did I identify the Bill of Rights as the first ten amendments to the Constitution?",
    "Did I explain that the Bill of Rights protects individual liberties and limits government power?",
    "Did I explain why adding amendments did not mean replacing the Constitution?",
    "Did I explain why the Bill of Rights remains important?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "Why does Clara think the Bill of Rights was unnecessary?", placeholder: "Record her reasoning..." },
  { key: "concern", label: "What worried some Americans about the new government?", placeholder: "What problem were they trying to prevent?" },
  { key: "response", label: "How did the Bill of Rights respond to that concern?", placeholder: "What did the first ten amendments add or protect?" },
  { key: "difference", label: "How is the Bill of Rights different from the Constitution’s basic framework?", placeholder: "Framework vs. explicit protections..." },
  { key: "importance", label: "Why is the Bill of Rights important?", placeholder: "Explain the lasting relationship between rights and limits on government..." }
];

export const PUSH_ANGLE = "Editorial Box: finish the headline “TEN MORE? YES — BECAUSE…” with a two-sentence explanation of the problem the Bill of Rights addressed and why the solution matters.";
