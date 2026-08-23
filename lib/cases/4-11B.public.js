// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (4.11B).

export const CAST = {
  plug: { name: "Plug", emoji: "🔌", color: "#F59E0B", hint: "Thinks he only powers fun." },
  tower: { name: "The Water Tower", emoji: "🚰", color: "#3B82F6", hint: "No pump, no water pressure." },
  clinic: { name: "The Clinic Fridge", emoji: "🏥", color: "#EF4444", hint: "Six hours warm and it's all gone." },
  grocer: { name: "The Grocery", emoji: "🥫", color: "#22C55E", hint: "Empties in three days without trucks." },
  led: { name: "The LED Bulb", emoji: "💡", color: "#8B5CF6", hint: "Why the drill is survivable now." },
  coun: { name: "Councillor Reyes", emoji: "📝", color: "#0D9488", hint: "Writing the list the town plans from." }
};

export const PUBLIC_CASE = {
  standard: "4.11B",
  title: "Plug Says Nobody Would Miss Him",
  bigQuestion: "If the power went out for 24 hours, what would actually stop — and how far past the lights does the list go?",
  trapLine: "Nobody would miss me much. You'd read a book. It'd be a boring evening and that's the whole of it.",
  evidenceBank: [
    "No electricity means no pump, which means no water pressure",
    "The clinic fridge spoils its whole cabinet after six hours warm",
    "Grocery shelves run down in about 3 days without fuel deliveries",
    "The town cut its energy use by 18% with LEDs and insulation",
    "The same drill was much harder to cover in 2019"
  ],
  coldOpenMessages: [
    { who: "system", text: "A 24-hour power-down drill, one month out. The council needs a list of what genuinely stops." },
    { who: "coun", text: "I'm writing the list tonight. Start me off — what stops?" },
    { who: "plug", text: "Lights. Screens. That's about the size of it, honestly." },
    { who: "tower", text: "And the pumps. The pumps that fill me run on electricity." },
    { who: "coun", text: "Meaning what, exactly, at street level?" },
    { who: "tower", text: "No pressure. No taps, no toilets, no fire hydrants. Anywhere in town." },
    { who: "clinic", text: "I'd like mine on the list too. Vaccines and insulin. Six hours warm and the entire cabinet is spoiled." },
    { who: "grocer", text: "Then think one step further out. My shelves get refilled by trucks that run on fuel. Three days and I'm empty, and I never even lost power myself." },
    { who: "led", text: "Worth adding the good news — the town's usage is down eighteen percent since we went in. The 2019 drill was far harder to cover than this one will be." },
    { who: "plug", text: "See, this all sounds very dramatic to me. Nobody would miss me much. You'd read a book. It'd be a boring evening and that's the whole of it." }
  ],
  selfCheckQuestions: [
    "Did I name something essential that stops, not just something fun?",
    "Did I use a specific number from the evidence?",
    "Did I follow an effect out past the building that lost power?",
    "Did I bring in what the town already does to use less energy?",
    "Did I answer Plug's claim that it would just be a boring evening?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Plug believe?", placeholder: "In your own words, what is Plug's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Plug's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out which single item on the list they would restore first with a limited backup generator, and justify the choice against two others they'd leave off.";
