// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.4B, TEKS 4.4B).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  ben: { name: "Ben Lots-of-Cows", emoji: "🐄", color: "#F59E0B", hint: undefined },
  market: { name: "Maya Market File", emoji: "💵", color: "#3B82F6", hint: undefined },
  trail: { name: "Troy Trail File", emoji: "🐎", color: "#22C55E", hint: undefined },
  ranch: { name: "Rosa Ranch File", emoji: "🤠", color: "#8B5CF6", hint: undefined },
  impact: { name: "Ivy Impact File", emoji: "📈", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.4B",
  title: "The Cattle Trail Boom",
  bigQuestion: "Why did the cattle industry grow in Texas, and how did it change the state?",
  trapLine: "The cattle industry grew mostly because Texas had a lot of cows.",
  evidenceBank: [
    "Demand for beef grew in other parts of the United States.",
    "Cattle drives and later railroads helped move cattle to distant markets.",
    "Ranchers such as Charles Goodnight, Richard King, and Lizzie Johnson helped develop ranching businesses."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is making a cattle-industry poster and writes, 'Texas had lots of cattle, so the industry became important.' The team must decide whether that explains enough." },
    { who: "ben", text: "Texas had lots of cattle. Isn’t that basically why the industry grew?" },
    { who: "market", text: "Cattle only become a strong business if buyers want them." },
    { who: "trail", text: "Getting cattle to buyers was a major part of the business." },
    { who: "ranch", text: "Ranchers helped turn cattle raising into an organized industry." },
    { who: "impact", text: "Growth matters because it changes jobs, businesses, and places—not just herd size." }
  ],
  selfCheckQuestions: [
    "Did I explain why demand for beef helped the cattle industry grow?",
    "Did I explain how cattle trails or railroads connected cattle to markets?",
    "Did I use evidence about at least one important Texas rancher?",
    "Did I explain at least one impact of the cattle industry on Texas?",
    "Did I explain why having many cattle alone does not fully explain industry growth?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Ben claiming?", placeholder: "State the 'lots of cattle' idea..." },
  { key: "market", label: "How did demand help the industry grow?", placeholder: "Explain why buyers mattered..." },
  { key: "transport", label: "How did transportation help?", placeholder: "Use trails or railroads..." },
  { key: "people", label: "How did ranchers contribute?", placeholder: "Use one leader as evidence..." },
  { key: "impact", label: "How did cattle change Texas?", placeholder: "Explain an effect..." }
];

export const PUSH_ANGLE = "Industry Chain: create a four-link cause/effect chain showing how the cattle business grew.";
