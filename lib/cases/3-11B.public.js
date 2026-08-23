// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.
// Converted from Emily's Group Chat Generator export (3.11B).

export const CAST = {
  reese: { name: "Reese", emoji: "🚿", color: "#F59E0B", hint: "Never checks the level." },
  barrel: { name: "The Rain Barrel", emoji: "🛢️", color: "#3B82F6", hint: "Only fills when it rains." },
  chart: { name: "The Lid Marks", emoji: "📉", color: "#8B5CF6", hint: "400 in April. 90 now." },
  bed: { name: "The Sunflower Bed", emoji: "🌻", color: "#22C55E", hint: "Already dry at the edges." },
  hana: { name: "Hana", emoji: "📋", color: "#0D9488", hint: "Sets the rota tomorrow." }
};

export const PUBLIC_CASE = {
  standard: "3.11B",
  title: "The Barrel Was Full in April",
  bigQuestion: "The barrel is down to 90 litres and no rain is coming for three weeks. What happens if nothing changes?",
  trapLine: "It's a barrel, it fills back up. There's loads.",
  evidenceBank: [
    "The barrel was 400 litres in April and is 90 litres now",
    "That is about 60 litres used every week",
    "The barrel only fills when it rains on the roof",
    "There is no rain forecast for three weeks",
    "Class 3B measured out 6 litres a day and their beds are fine"
  ],
  coldOpenMessages: [
    { who: "system", text: "One rain barrel. One school garden. The watering rota for next month gets set tomorrow." },
    { who: "hana", text: "I'm setting the rota tomorrow. Before I do — has anyone actually looked at the barrel?" },
    { who: "reese", text: "It's fine. I fill the can from it every day and it's never been empty." },
    { who: "chart", text: "April, four hundred litres. Today, ninety. That's on the lid, in pen." },
    { who: "reese", text: "It'll fill up again. Barrels do that." },
    { who: "barrel", text: "Only when it rains on the roof. I've no tap. Nothing else goes into me at all." },
    { who: "bed", text: "And I'm dry at the edges already. How many more days is ninety litres?" },
    { who: "reese", text: "Loads of days. It's a barrel, it fills back up. There's loads." }
  ],
  selfCheckQuestions: [
    "Did I use the two numbers from the level chart?",
    "Did I say how the barrel actually refills?",
    "Did I use the forecast?",
    "Did I say what happens if nothing changes?",
    "Did I tell Hana why using less matters here?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Reese believe?", placeholder: "In your own words, what is Reese's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Reese's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" }
];

export const PUSH_ANGLE = "Have them work out how many days the garden could last on 90 litres if everyone switched to Class 3B's six litres a day, and say what they would tell the rota.";
