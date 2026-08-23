// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.1C, TEKS 4.1C).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  nico: { name: "Nico Map Label", emoji: "🗺️", color: "#F59E0B", hint: undefined },
  gulf: { name: "Gulf Region File", emoji: "🌊", color: "#3B82F6", hint: undefined },
  plains: { name: "Plains Region File", emoji: "🌾", color: "#22C55E", hint: undefined },
  se: { name: "Southeastern Region File", emoji: "🌳", color: "#8B5CF6", hint: undefined },
  link: { name: "Rae Region Link", emoji: "🔗", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.1C",
  title: "Where You Live Changes What You Need",
  bigQuestion: "How did different cultural regions of Texas shape the ways American Indian groups lived?",
  trapLine: "The cultural regions are just map labels. They did not really affect how people lived.",
  evidenceBank: [
    "Coastal resources such as fish and shellfish were available near the Gulf.",
    "Wide grasslands supported large herds of buffalo.",
    "Woodlands and fertile land supported farming and village life."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student is making a Texas map and says the Gulf, Plains, Puebloan, and Southeastern regions are only names on a map." },
    { who: "nico", text: "A region is just a place name. Why would it change how people lived?" },
    { who: "gulf", text: "Near the Gulf, people could use coastal foods and waterways." },
    { who: "plains", text: "On the Plains, buffalo and open grasslands shaped daily life." },
    { who: "se", text: "Fertile land and forests can support very different choices than open grasslands." },
    { who: "link", text: "The key is not the label. It is what the land and resources made possible." }
  ],
  selfCheckQuestions: [
    "Did I correctly describe at least three cultural regions?",
    "Did I connect a landform, climate, plant, animal, or resource to how people lived?",
    "Did I explain at least one difference between regions?",
    "Did I avoid treating a cultural region as only a map label?",
    "Did I explain the geography → resources → way of life relationship?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "region", label: "What region is each clue describing?", placeholder: "Name the region..." },
  { key: "resource", label: "What important resource or land feature is there?", placeholder: "Use the clue..." },
  { key: "life", label: "How could that resource affect daily life?", placeholder: "Explain the effect..." },
  { key: "compare", label: "How are two regions different?", placeholder: "Compare region + way of life..." },
  { key: "claim", label: "Does Nico’s claim hold up?", placeholder: "Explain why or why not..." }
];

export const PUSH_ANGLE = "Map Caption Repair: replace 'just a region name' with a caption that explains why the region mattered.";
