// Safe to import from client components. Contains nothing that gives away
// the answer — evidence bank and cold open script are meant to be seen by
// students anyway. The scoring rubric and distractors live in the SEPARATE
// .server.js file and must never be imported here.

export const CAST = {
  marvo: { name: "Marvo the Magician", emoji: "\ud83c\udfa9", color: "#7B5DFF", hint: "Insists it's real magic, no science involved." },
  mira: { name: "Mira the Mirror", emoji: "\ud83e\ude9e", color: "#4DD6FF", hint: "Demonstrates reflection." },
  glass: { name: "Glass the Panel", emoji: "\ud83e\ude9f", color: "#00C2C7", hint: "Demonstrates refraction." },
  velvet: { name: "Velvet the Backdrop", emoji: "\u2b1b", color: "#1F2A44", hint: "Demonstrates absorption." },
  ruby: { name: "Ruby the Assistant", emoji: "\u2728", color: "#FFC44D", hint: "Wants the trick explained honestly for her kids' class." }
};

export const PUBLIC_CASE = {
  standard: "5.8C",
  title: "The Vanishing Trick",
  bigQuestion: "How does a magician make something \"vanish\" with mirrors, glass, and black velvet \u2014 no real magic required?",
  trapLine: "It's real magic \u2014 no science involved, I promise.",
  evidenceBank: [
    "Mirror test: light ray bounces off at a matching angle (reflection), redirecting the view away from the hidden object",
    "Glass panel test: light bends at the exact point it crosses into the glass (refraction), hiding a compartment behind it",
    "Black velvet test: no light bounces back off the fabric \u2014 it's absorbed, not reflected",
    "With the lights and angles changed, the \"vanished\" object is visible again in the same spot"
  ],
  coldOpenMessages: [
    { who: "system", text: "Ruby is prepping to teach a kids' magic class and wants Marvo's trick explained for real." },
    { who: "ruby", text: "Marvo, before I teach this to kids \u2014 how does the vanish actually work?" },
    { who: "marvo", text: "It's real magic \u2014 no science involved, I promise." },
    { who: "ruby", text: "Come on. Let's actually look at the setup piece by piece." },
    { who: "mira", text: "I'm just bouncing the light back at the same angle it hit me. Redirects the whole view." },
    { who: "glass", text: "And I bend the light right where it enters me \u2014 that's what hides the little compartment." },
    { who: "velvet", text: "I don't bounce anything back at all. I just soak it up." },
    { who: "marvo", text: "It's real magic \u2014 no science involved, I promise." }
  ],
  selfCheckQuestions: [
    "Did I name all three things light can do \u2014 reflect, refract, and absorb?",
    "Did I connect the mirror to the right one of those?",
    "Did I connect the glass to the right one of those?",
    "Did I connect the black velvet to the right one of those?",
    "Did I explain what light does until it hits a surface?"
  ],
};

export const ORGANIZER_FIELDS = [
  { key: "misconception", label: "What does Marvo believe?", placeholder: "In your own words, what is Marvo's claim?" },
  { key: "evidence", label: "What evidence have you seen so far?", placeholder: "List anything the characters have shown you..." },
  { key: "analysis", label: "Does the evidence support Marvo's claim? Why or why not?", placeholder: "Explain your thinking..." },
  { key: "unclear", label: "What's still unclear to you?", placeholder: "What do you still want to ask about?" },
];

export const PUSH_ANGLE = "Students design their own simple \"vanishing\" setup using a mirror and predict what a viewer would and wouldn't be able to see, based on angles.";
