// SERVER ONLY.
export const SERVER_CASE = {
  standard: "4.12B-AD",
  title: "When the Owls Left",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "Serious-looking is an opinion. The notes name jobs, not favorites.",
        r1p6: "The notes say the opposite. The grass makes the food. The mice eat it.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "This names the producer.",
        r1p3: "This names the consumers.",
        r1p4: "This names the decomposers and the matter, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "Useless is an opinion. The counts show the web changed when the owls left.",
        r2p6: "The notes run the other way. Energy starts with the Sun and the grass, not the owls.",
      },
      decoyReason: { r2p5: "opinion", r2p6: "contradicts" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This is the consumer that left.",
        r2p3: "This is the count that rose.",
        r2p4: "This says what happened to the energy, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "The notes never say the Sun went out. The owls left. The Sun did not.",
        r3p6: "A forest on another planet is a different ecosystem. These notes are about this meadow.",
      },
      decoyReason: { r3p5: "unsupported", r3p6: "offtopic" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is what the mice are doing.",
        r3p3: "This is what is happening to the grass.",
        r3p4: "This says what the web still depends on, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log names the web, then the shift. The new counts come last.",
  decoyProtest: {
    r1p5: "A serious face is a producer. I can see the food in the glare.",
    r1p6: "Mice are green on the inside. Probably.",
    r2p5: "Useless animals improve webs by leaving. That is my favorite science.",
    r2p6: "Arrows are reversible if you want the owl to be in charge.",
    r3p5: "Owls and sunlight have a close professional relationship. I assumed.",
    r3p6: "All meadows share a group chat with other planets.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You named the producer, the consumers, and the decomposer, then showed what the owl leaving did to the counts. That is the web.",
      good: "Log accepted. The meadow story is mostly right. Read the leftovers so a favorite animal does not sneak in.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the web, and part of it is a guess about who matters.",
    },
  },
  trap: {
    roundId: "r2",
    position: 2,
    text: "The owls left because they were tired of being the least important animal.",
    why: "Least important is an opinion. The notes only show that the owls left and the mouse count rose.",
  },
  debrief: {
    pinpointAccept: ["r1p2"],
    pinpointWhy: "Right. The grass makes food from sunlight. That is the producer.",
    pinpointMiss: "That sentence may be true. It does not say what the producer does.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. The grass makes food from sunlight. That is the producer.",
      b: "The owl is a consumer. It eats mice. It does not make the food.",
      c: "A bigger count does not make the mouse a producer. Mice eat the grass.",
      d: "Mushrooms are the decomposers. They break matter down. They do not make the food.",
    },
  },
  mustInclude: [
    "Says the grass, or the producer, makes food from sunlight.",
    "Says mice eat grass and owls eat mice, or names those consumers.",
    "Says that after the owls left, the mice increased, the grass was eaten down, or both.",
  ],
  modelAnswer: "Energy starts with sunlight. The grass makes food, mice eat the grass, and owls eat the mice. Mushrooms break down what dies. When the owls left, the mice increased and the grass was eaten shorter.",
  aiContext: "Grade 4 science, TEKS 4.12B. Food web roles: Sun, producer (grass), consumers (mice, owls), decomposer (mushrooms). Energy flows sun to grass to mice to owls. Matter is cycled by decomposers. When owls leave, mice increase and grass is eaten down. Do not accept a reversed arrow or a favorite-animal opinion. Do not penalize spelling.",
  whatIf: {
    key: "a",
    walk: ["grass", "mice", "owls"],
    walkLine: "The grass makes the food. Mice eat it. Owls eat the mice.",
    why: {
      a: "Yes. Cut the grass and the mice lose their food. Then the owls do too.",
      b: "The owls would lose food. The mice lose it first, because they eat the grass.",
      c: "The Sun does not feed the animals directly. The producer does.",
      d: "The mice would go. The owls eat the mice, so they go too.",
    },
  },
  look: {
    key: "web",
    hint: "Follow the arrows. The picture goes from the Sun to the grass to the mouse to the owl. It does not run backward, and it does not pick a favorite.",
    why: "Yes. The arrows follow the energy from the Sun to the owl.",
  },
  repair: {
    pieceId: "r2p6",
    model: "The notes never say the arrows start at the owl.",
    why: "Yes. That sentence tells the truth. Energy does not start at the owl.",
  },
};
