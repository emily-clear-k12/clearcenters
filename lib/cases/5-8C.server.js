// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.8C",
  title: "The Vanishing Trick",
  bigQuestion: "How does a magician make something \"vanish\" with mirrors, glass, and black velvet \u2014 no real magic required?",
  evidenceBank: [
    "Mirror test: light ray bounces off at a matching angle (reflection), redirecting the view away from the hidden object",
    "Glass panel test: light bends at the exact point it crosses into the glass (refraction), hiding a compartment behind it",
    "Black velvet test: no light bounces back off the fabric \u2014 it's absorbed, not reflected",
    "With the lights and angles changed, the \"vanished\" object is visible again in the same spot"
  ],
  trapLine: "It's real magic \u2014 no science involved, I promise.",
  castNames: {
    marvo: "Marvo the Magician",
    mira: "Mira the Mirror",
    glass: "Glass the Panel",
    velvet: "Velvet the Backdrop",
    ruby: "Ruby the Assistant"
  },
  distractors: "Confusing absorption with reflection (thinking a dark surface \"bounces\" light dimly rather than absorbing it); thinking refraction only happens with water, not any change in material.",
  mustInclude: [
    "Names all three light behaviors: reflect, refract, absorb",
    "Connects the mirror evidence to reflection",
    "Connects the glass evidence to refraction",
    "Connects the black velvet evidence to absorption",
    "States light travels straight until it interacts with a surface"
  ],
};
