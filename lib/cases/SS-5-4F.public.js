// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.5.4F, TEKS 5.4F).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number (Science and Social Studies both
// have their own 5.4F, for example).

export const CAST = {
  tyler: { name: "Tyler Moore", emoji: "🎟️", color: "#F59E0B", hint: "Turns one group’s opportunity into everybody’s story." },
  mei: { name: "Mei Chen", emoji: "⛏️", color: "#EF4444", hint: "Knows the work and hardships of Chinese railroad laborers." },
  sean: { name: "Sean O’Donnell", emoji: "🔨", color: "#3B82F6", hint: "Sees both job opportunity and hard labor for Irish immigrants." },
  naya: { name: "Naya Red Cloud", emoji: "🦬", color: "#22C55E", hint: "Shows what “opening the West” looked like from existing homelands." },
  carla: { name: "Carla Vega", emoji: "🌾", color: "#8B5CF6", hint: "Knows why some newcomers saw real opportunity." },
  wright: { name: "Dr. Samuel Wright", emoji: "🏛️", color: "#0D9488", hint: "Needs a headline that works for more than one perspective." }
};

export const PUBLIC_CASE = {
  standard: "SS.5.4F",
  title: "Opportunity for Who?",
  bigQuestion: "Did westward settlement and the Transcontinental Railroad create the same kind of opportunity for everyone, or did different American Indian and immigrant groups face different challenges, opportunities, and roles?",
  trapLine: "The railroad and frontier were opportunities for everyone. More land, more jobs, more travel — everybody benefited in basically the same way.",
  evidenceBank: [
    "Immigrant labor helped build the Transcontinental Railroad",
    "Westward settlement created new opportunities for some settlers",
    "Railroads and settlement also created major challenges for American Indian nations"
  ],
  coldOpenMessages: [
    { who: "system", text: "The Western History Museum is choosing the opening headline for its frontier and railroad gallery." },
    { who: "tyler", text: "I’ve got it: THE WEST OPENS — OPPORTUNITY FOR EVERYONE!" },
    { who: "carla", text: "Some settlers really did see new chances for land, work, and business." },
    { who: "sean", text: "And railroad jobs were opportunities for some immigrants — but the work could be brutal." },
    { who: "mei", text: "Chinese workers helped build some of the hardest stretches and still faced discrimination." },
    { who: "naya", text: "And “opened” sounds different when the railroad crosses land that was already someone’s homeland." },
    { who: "tyler", text: "I’m not saying nobody had problems. I’m saying the big story was opportunity." },
    { who: "wright", text: "Then our headline should survive every source, not just the most comfortable one." }
  ],
  selfCheckQuestions: [
    "Did I identify at least one immigrant group and explain a contribution or opportunity connected to railroad building?",
    "Did I explain at least one challenge immigrant workers faced?",
    "Did I explain a major challenge railroads or settlement created for a specific American Indian perspective or group?",
    "Did I acknowledge that some settlers or newcomers experienced real opportunities?",
    "Did I make clear that westward expansion did not affect every group in the same way?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "claim", label: "What is Tyler claiming about westward expansion?", placeholder: "State the “opportunity for everyone” claim..." },
  { key: "immigrant", label: "What challenges, opportunities, or contributions do immigrant workers show?", placeholder: "Record evidence from Mei and Sean..." },
  { key: "american_indian", label: "How did railroads and settlement affect American Indian nations?", placeholder: "Record Naya’s perspective and evidence..." },
  { key: "settlers", label: "What opportunities did some settlers and western communities experience?", placeholder: "Record Carla’s evidence..." },
  { key: "synthesis", label: "What claim fits all of the perspectives?", placeholder: "Explain why the experience was not the same for everyone..." }
];

export const PUSH_ANGLE = "Headline Test: rewrite “THE WEST OPENS — OPPORTUNITY FOR EVERYONE!” so it can fit all three perspectives, then add three short exhibit captions — one immigrant, one American Indian, one settler — showing a different challenge, opportunity, or contribution.";
