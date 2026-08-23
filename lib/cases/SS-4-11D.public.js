// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (SS.4.11D, TEKS 4.11D).
// Stored with an "SS." prefix so this code can never collide with a Science
// case using the same bare TEKS number.

export const CAST = {
  max: { name: "Max Talk-Only", emoji: "☎️", color: "#F59E0B", hint: undefined },
  trans: { name: "Tara Transportation", emoji: "🚚", color: "#3B82F6", hint: undefined },
  comm: { name: "Cody Communication", emoji: "📡", color: "#22C55E", hint: undefined },
  biz: { name: "Bree Business", emoji: "🏪", color: "#8B5CF6", hint: undefined },
  synth: { name: "Nico Network", emoji: "🔗", color: "#0D9488", hint: undefined }
};

export const PUBLIC_CASE = {
  standard: "SS.4.11D",
  title: "The Message That Changed the Market",
  bigQuestion: "How have transportation and communication developments influenced economic activity in Texas?",
  trapLine: "Transportation changes the economy, but communication mostly just helps people talk.",
  evidenceBank: [
    "Railroads, highways, ports, and air travel can move people and goods faster.",
    "Telephones, radio, internet, and other systems can move information faster.",
    "Faster movement of goods or information can help businesses reach markets, coordinate work, and respond to customers."
  ],
  coldOpenMessages: [
    { who: "system", text: "A student compares railroads with telephones and says transportation affects business, but communication does not change the economy very much." },
    { who: "max", text: "A railroad moves products. A phone just lets people talk. Those are not the same kind of economic effect." },
    { who: "trans", text: "Transportation changes how quickly and cheaply goods can reach buyers." },
    { who: "comm", text: "Information can be just as important as a truck when businesses need orders, prices, or instructions." },
    { who: "biz", text: "Businesses use both movement and information to serve customers." },
    { who: "synth", text: "Both systems connect people and markets, but they move different things." }
  ],
  selfCheckQuestions: [
    "Did I explain how transportation can affect economic activity?",
    "Did I explain how communication can affect economic activity?",
    "Did I compare what transportation moves with what communication moves?",
    "Did I explain at least one business effect of faster information?",
    "Did I explain why communication can influence the economy even when it does not move physical goods?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "trans", label: "How can transportation change economic activity?", placeholder: "Explain movement of goods/people..." },
  { key: "comm", label: "How can communication change economic activity?", placeholder: "Explain movement of information..." },
  { key: "compare", label: "How are the two effects similar?", placeholder: "Both connect..." },
  { key: "difference", label: "How are the effects different?", placeholder: "Goods/people vs information..." },
  { key: "claim", label: "Why is 'communication only helps people talk' too simple?", placeholder: "Use business evidence..." }
];

export const PUSH_ANGLE = "Market Network: trace one Texas product from producer to customer and include both a transportation step and a communication step.";
