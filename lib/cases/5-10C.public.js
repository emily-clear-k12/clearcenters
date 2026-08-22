// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  chuck: { name: "Chuck the Camp Counselor", emoji: "\ud83c\udfd5\ufe0f", color: "#F2A93B", hint: "Tells a spooky \"overnight\" origin story." },
  rio: { name: "Rio the River", emoji: "\ud83c\udfde\ufe0f", color: "#4DD6FF", hint: "Has been carving quietly for ages." },
  gale: { name: "Gale the Wind", emoji: "\ud83c\udf2c\ufe0f", color: "#00C2C7", hint: "Piles up dunes bit by bit." },
  gus: { name: "Glacier Gus", emoji: "\ud83e\uddca", color: "#8B5CF6", hint: "Reshapes land slowly as he moves." },
  dee: { name: "Ranger Dee", emoji: "\ud83c\udf32", color: "#22C55E", hint: "Wants the real story for tomorrow's nature talk." }
};

export const PUBLIC_CASE = {
  standard: "5.10C",
  title: "The Campfire Legend",
  bigQuestion: "Did the canyon really form in one \"terrifying night,\" like the campfire story says?",
  trapLine: "One big shake and \u2014 crack \u2014 it appeared overnight. Had to be something sudden and dramatic!",
  evidenceBank: [
    "River flow rate and canyon depth correlate with erosion recorded over long time spans",
    "Sand dunes nearby are observed shifting gradually with the prevailing wind direction",
    "Delta sediment deposits are measured building up at a river mouth over years",
    "No evidence of a sudden event (like an earthquake) found at the canyon site"
  ],
  coldOpenMessages: [
    { who: "system", text: "Chuck tells his famous scary campfire story about how the canyon appeared." },
    { who: "chuck", text: "One big shake and \u2014 crack \u2014 it appeared overnight. Had to be something sudden and dramatic!" },
    { who: "dee", text: "I've got a nature talk tomorrow. I need the real version of this, Chuck." },
    { who: "rio", text: "I've actually been carving through here for a very, very long time. Quietly." },
    { who: "gale", text: "And I've been piling up those dunes over there bit by bit, same deal." },
    { who: "dee", text: "Any actual evidence of a sudden earthquake or event at the site?" },
    { who: "gus", text: "None that I've seen \u2014 and I've been reshaping this land a long time too." },
    { who: "chuck", text: "One big shake and \u2014 crack \u2014 it appeared overnight. Had to be something sudden and dramatic!" }
  ],
  selfCheckQuestions: [
    "Did I match each landform to the force that actually shapes it?",
    "Did I use evidence to check whether a sudden event really happened?",
    "Did I explain how the process actually works over time?",
    "Did I name at least two landforms and their shaping force?",
    "Did I say whether Chuck's \"overnight\" claim is really true?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Chuck believe?", placeholder: "In your own words, what is Chuck's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Chuck's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students pick a new landform (a delta at a river mouth) and build a data-based case for how it slowly formed over time.";
