// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.8B",
  title: "The Holiday Light String Mystery",
  bigQuestion: "Why won't the whole string of holiday lights turn on, even though the outlet clearly has power?",
  evidenceBank: [
    "Outlet tested with a different working lamp \u2014 power confirmed fine",
    "Cord tested separately \u2014 no breaks or shorts found",
    "Bulb-by-bulb tester run down the string: every bulb passes except Bulb 14",
    "Once Bulb 14 is replaced, the entire string lights up"
  ],
  trapLine: "The lights won't turn on? Must be me \u2014 I'm always the one blamed first.",
  castNames: {
    ollie: "Ollie the Outlet",
    bo: "Bo the Bulb",
    cora: "Cora the Cord",
    testy: "Testy the Tester",
    grandma: "Grandma Jo"
  },
  distractors: "Thinking any closed loop works regardless of whether every connection point actually touches; assuming a switch failure and a bulb failure look/act the same.",
  mustInclude: [
    "States the complete-path requirement for a functioning circuit",
    "Uses the outlet-test and cord-test evidence to rule those out",
    "Identifies Bulb 14 as the actual broken link using the tester evidence",
    "Rejects the \"blame the obvious first suspect\" instinct",
    "Explains why fixing the one bulb restores the whole circuit"
  ],
};
