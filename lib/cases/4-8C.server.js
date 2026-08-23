// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.8C).

export const SERVER_CASE = {
  standard: "4.8C",
  title: "The Warming Glove Demo",
  bigQuestion: "The glove works. So why does it go completely cold when the second wire — the one nobody mentions — is disconnected?",
  evidenceBank: [
    "Disconnecting the second wire makes the glove go completely cold",
    "The glove has two wires, not one",
    "The switch is on the return side and it still turns the glove off",
    "The coil gets warm but the wires stay cool",
    "Electrical energy needs a closed path all the way round"
  ],
  trapLine: "The electricity leaves the battery, goes into the coil, and gets used up making heat. You only really need the one wire.",
  castNames: {
    pilar: "Pilar",
    coil: "The Coil",
    wireout: "Wire Out",
    wireback: "Wire Back",
    switch: "The Switch",
    judge: "Judge Amara"
  },
  distractors: "Thinking electrical energy is consumed on a one-way trip and never returns to the source; treating the return wire as structural or redundant; thinking a switch generates or supplies energy rather than opening and closing the path; assuming a device that works must be understood, so the explanation does not need checking.",
  mustInclude: [
    "The chat names the closed path.",
    "It uses the disconnected-wire test.",
    "It answers 'the electricity gets used up'.",
    "It names what the electrical energy becomes.",
    "It explains what the switch actually does."
  ],
};
