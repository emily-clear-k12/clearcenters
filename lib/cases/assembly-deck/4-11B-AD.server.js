// SERVER ONLY.
export const SERVER_CASE = {
  standard: "4.11B-AD",
  title: "Two Ways to Power the School",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "Free if you believe is a slogan. The notes say the school needs a real energy source.",
        r1p6: "The notes say the opposite. Lights and computers use electricity every day.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "This is what the electricity is for.",
        r1p3: "This is where it comes from now.",
        r1p4: "This says why the choice matters, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "The notes name a disadvantage. Panels make less power on cloudy days.",
        r2p6: "No note counts jobs. That claim is not in the table.",
      },
      decoyReason: { r2p5: "contradicts", r2p6: "unsupported" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This is the gas-plant fact.",
        r2p3: "This is the solar fact.",
        r2p4: "This names the difference that matters at night, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "A slogan is not evidence. The notes still list trade-offs.",
        r3p6: "The notes say to recycle the fixtures, not dump them.",
      },
      decoyReason: { r3p5: "opinion", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is the conservation fact.",
        r3p3: "This is the disposal fact.",
        r3p4: "This says what recycling does not do, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log says why power is needed, then compares the two sources. Conservation and waste come last.",
  decoyProtest: {
    r1p5: "Belief is a power plant. Very quiet. Very free.",
    r1p6: "If the lights are off in my drawing, the school agrees with me.",
    r2p5: "Perfect is a data point. I felt it strongly.",
    r2p6: "Forty jobs felt like a round number, so I added it.",
    r3p5: "Slogans are renewable. You can chant them forever.",
    r3p6: "A field is a recycling bin if you walk away fast.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You named why the school needs power, the trade-off between gas and sunlight, and what conservation and recycling do. That is an honest energy report.",
      good: "Log accepted. The power story is mostly right. Read the leftovers so a slogan does not sneak in.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the notes, and part of it is a claim the table does not make.",
    },
  },
  trap: {
    roundId: "r2",
    position: 2,
    text: "Solar panels are the right choice because the poster says they are the future.",
    why: "A poster is a slogan. The notes also say panels make less power on cloudy days and cost more at the start.",
  },
  debrief: {
    pinpointAccept: ["r2p2"],
    pinpointWhy: "Right. That sentence says natural gas is nonrenewable.",
    pinpointMiss: "That sentence may be true. It does not say natural gas is nonrenewable.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. Turning lights off conserves energy, and recycling cuts waste. Neither one powers the building by itself.",
      b: "Burning more gas uses more of a nonrenewable resource. That is not conservation.",
      c: "A slogan does not conserve energy or power the lights.",
      d: "Dumping fixtures is the disposal the notes say to avoid.",
    },
  },
  mustInclude: [
    "Says the school needs electricity for lights, computers, or the school day.",
    "Says natural gas is nonrenewable or that burning it pollutes.",
    "Says sunlight is renewable, or names a limit of the panels, or says conservation or recycling still matters.",
  ],
  modelAnswer: "The school needs electricity for lights and computers. Natural gas is nonrenewable, and burning it pollutes, but it works at night. Sunlight is renewable, and the panels make less power on cloudy days. Turning lights off conserves energy, and recycling old fixtures cuts waste, but neither one powers the building alone.",
  aiContext: "Grade 4 science, TEKS 4.11B. Energy resources are critical. Natural gas is nonrenewable and burning it pollutes. Sunlight is renewable; panels cost more up front and make less power on cloudy days. Conservation (lights off) and recycling versus dumping are environmental impacts, and they do not replace a power source. Do not accept slogans or invented job numbers. Do not penalize spelling.",
  whatIf: {
    key: "a",
    walk: ["plant", "wires", "lights"],
    walkLine: "The gas plant feeds the wires. The wires feed the school lights.",
    why: {
      a: "Yes. Shut the plant, with no panels added, and the wires and the lights go dark.",
      b: "The panels are not on this path. They are not what the plant is feeding.",
      c: "Sunlight does not jump into the lights. The school needs a path, and this path is the plant.",
      d: "The lights would go dark. The wires are the same path, so they go dark too.",
    },
  },
  look: {
    key: "line",
    hint: "Follow the arrows. The picture shows a plant, wires, a school, and panels off to the side. It does not show a slogan or a job count.",
    why: "Yes. The plant, the wires, and the school are one path. The panels are separate.",
  },
  repair: {
    pieceId: "r2p6",
    model: "The notes never count new jobs from the panels.",
    why: "Yes. That sentence tells the truth. The notes never showed a job number.",
  },
};
