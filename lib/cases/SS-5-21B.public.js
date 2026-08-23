// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.21B, TEKS 5.21B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.21B, for example).

export const CAST = {
  cole: { name: "Cole Curator", emoji: "🇺🇸", color: "#F59E0B", hint: "Thinks one 'main' culture created American identity." },
  maya: { name: "Maya Music Archive", emoji: "🎵", color: "#8B5CF6", hint: "Owns African American cultural contributions." },
  luis: { name: "Luis Community Map", emoji: "🗺️", color: "#22C55E", hint: "Owns Mexican American and Latino contributions." },
  anna: { name: "Anna Heritage File", emoji: "📚", color: "#3B82F6", hint: "Owns immigrant and religious-community contributions." },
  river: { name: "River First Peoples File", emoji: "🪶", color: "#0D9488", hint: "Owns American Indian contributions and continuity." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.21B",
  title: "Who Gets to Be “American”?",
  bigQuestion: "How have contributions from many racial, ethnic, and religious groups helped shape U.S. national identity?",
  trapLine: "We should choose the one culture that really created American identity. The rest can be side exhibits.",
  evidenceBank: [
    "The museum must show how several groups contributed to U.S. national identity.",
    "Sources show contributions in music, language, work, food, science, civic life, arts, and community institutions.",
    "No single person or group can stand for every member of a racial, ethnic, or religious community."
  ],
  coldOpenMessages: [
    { who: "system", text: "The museum’s new exhibit is called 'Who Gets to Be American?' Cole wants one central culture in the middle and everyone else in side cases." },
    { who: "cole", text: "For the exhibit, we should pick the one culture that really created American identity and put the others in side cases." },
    { who: "maya", text: "African American artists, writers, leaders, and communities have shaped music, literature, civic life, and ideas about freedom." },
    { who: "luis", text: "Mexican American and other Latino communities have influenced work, language, food, military service, and civic life across the country." },
    { who: "anna", text: "Immigrant and religious communities built businesses, schools, charities, arts organizations, and civic institutions." },
    { who: "river", text: "American Indian nations have contributed knowledge, crops, place names, arts, and living traditions—and they are not just part of the past." }
  ],
  selfCheckQuestions: [
    "Did I use evidence about contributions from at least three different groups?",
    "Did I describe specific contributions instead of using vague phrases like “they helped America”?",
    "Did I explain how those contributions became part of U.S. national life or identity?",
    "Did I avoid treating any racial, ethnic, or religious group as if every member shared one experience?",
    "Did I explain why U.S. national identity is shaped by contributions from many groups rather than one single culture?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Cole claiming about national identity?", placeholder: "State the oversimplified claim..." },
  { key: "group1", label: "What contribution does one group’s evidence show?", placeholder: "Name the contribution and source..." },
  { key: "group2", label: "What contribution does another group’s evidence show?", placeholder: "Use a different group..." },
  { key: "connection", label: "How did these contributions become part of U.S. national life?", placeholder: "Explain the connection..." },
  { key: "summary", label: "What stronger conclusion can you make about national identity?", placeholder: "Synthesize, don't just list..." }
];

export const PUSH_ANGLE = "Curator Rewrite: replace the exhibit’s one-culture introduction with a stronger 3-sentence opening built from multiple contributions.";
