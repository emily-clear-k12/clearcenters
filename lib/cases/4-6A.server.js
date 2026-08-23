// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.6A).

export const SERVER_CASE = {
  standard: "4.6A",
  title: "The Pen Pal Package",
  bigQuestion: "If two objects are both blue and both medium, what could you write down that would tell them apart?",
  evidenceBank: [
    "The padlock is 210 g and the sponge is 8 g",
    "They're the same size but nowhere near the same mass",
    "The padlock sinks and the sponge floats",
    "Both objects are blue and both are medium",
    "Colour and size can't tell two objects apart on their own"
  ],
  trapLine: "Blue and medium IS a description. If she'd been paying attention she'd have known exactly what I meant.",
  castNames: {
    sketch: "Sketch",
    lock: "The Padlock",
    sponge: "The Sponge",
    scale: "The Kitchen Scale",
    bowl: "The Water Bowl",
    penpal: "Bex-across-the-country"
  },
  distractors: "Assuming colour, size, or general appearance identifies an object; treating 'heavier' and 'bigger' as the same property; thinking only unusual objects have measurable properties, when every object has mass, a physical state, and a sink-or-float behaviour that can be tested.",
  mustInclude: [
    "The chat uses the two masses.",
    "It uses the sink-or-float test.",
    "It tells Sketch why his card failed.",
    "It names a property you can measure or test.",
    "It lands the rule about identifying matter."
  ],
};
