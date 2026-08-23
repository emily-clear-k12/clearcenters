// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.8A).

export const SERVER_CASE = {
  standard: "3.8A",
  title: "Nothing Here Is Plugged In",
  bigQuestion: "Nothing on this wall plugs in. So does that mean nothing on this wall has energy?",
  evidenceBank: [
    "The drum can be heard across the room and felt buzzing",
    "The sunny sill is 31°C and the shaded sill is 22°C",
    "The swinging door knocks the cup off, but only while it's moving",
    "The wall clock runs all day on a battery with no plug",
    "None of these things plug into a socket"
  ],
  trapLine: "If it doesn't plug in, it doesn't have energy. I'm not making things up to fill a sheet.",
  castNames: {
    nara: "Nara",
    drum: "The Drum",
    window: "The Window",
    door: "The Swinging Door",
    kit: "Kit"
  },
  distractors: "Thinking energy means electricity from a socket; missing sound, light, thermal and mechanical energy in everyday things; thinking something needs to be switched on to have energy; thinking a battery-powered object does not count because it has no plug.",
  mustInclude: [
    "The chat names at least two kinds of energy.",
    "It uses the window sill numbers.",
    "It says the moving door has energy.",
    "It answers Nara's rule about plugs.",
    "It gives Kit the rule for the sheet."
  ],
};
