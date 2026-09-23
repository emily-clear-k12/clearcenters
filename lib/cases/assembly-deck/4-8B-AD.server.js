// SERVER ONLY.
export const SERVER_CASE = {
  standard: "4.8B-AD",
  title: "The Cold Lunchbox Job",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "Expensive-looking is an opinion. The notes compare temperatures, not brands.",
        r1p6: "The notes record temperature. They do not describe a magnet test.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "offtopic" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "This is a fact about how the test was kept fair.",
        r1p3: "This is a fact about how long the test ran.",
        r1p4: "This says why the test can be trusted, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "The notes say the opposite. Foam ended at 6°C and metal at 18°C.",
        r2p6: "No note says a magnet stuck to the foam. Conducting heat is not the same as being a magnet.",
      },
      decoyReason: { r2p5: "contradicts", r2p6: "unsupported" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This is the metal result.",
        r2p3: "This is the foam result.",
        r2p4: "This names conductor and insulator, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "Popular is an opinion. The coldest lunch was in the foam box.",
        r3p6: "The notes say metal conducts electrical energy. Foam would stop a current, so it is a poor wire.",
      },
      decoyReason: { r3p5: "opinion", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is the thermal choice.",
        r3p3: "This is the electrical fact about metal.",
        r3p4: "This puts insulator and conductor to work, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log says how the test was run, then what the temperatures showed. The buying choice comes last.",
  decoyProtest: {
    r1p5: "Shine is a scientific property. I measured it with my eyes.",
    r1p6: "Temperature, magnetism, both pull on things. Basically twins.",
    r2p5: "18 is smaller than 6 if you are standing on your head.",
    r2p6: "Foam looked magnetic in the right lighting. The lighting was my idea.",
    r3p5: "Popular materials conduct popularity. That is a force.",
    r3p6: "A wire made of foam would be soft. Soft is a kind of current.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You used the temperatures, named foam as the insulator, and kept metal for the electrical job. That is the difference.",
      good: "Log accepted. The lunch data is mostly right. Read the leftovers so a brand name does not sneak in.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the test, and part of it is a guess about what looks best.",
    },
  },
  trap: {
    roundId: "r2",
    position: 2,
    text: "Metal is the best insulator because people like the way it shines.",
    why: "Like is an opinion. The notes show metal ended warmer, so it conducted heat.",
  },
  debrief: {
    pinpointAccept: ["r2p4", "r3p2"],
    pinpointWhy: "Right. That sentence says foam insulated against the heat.",
    pinpointMiss: "That sentence may be true. It does not say which material insulated against the heat.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. Foam ended at 6°C, the coldest lunch. That is the insulator.",
      b: "Melted ice means heat got in. Metal conducted the heat.",
      c: "A shiny look is not a temperature. The notes do not rank brands.",
      d: "14°C is warmer than 6°C. Cloth did not beat foam.",
    },
  },
  mustInclude: [
    "Says foam kept the lunch colder, or insulated against heat.",
    "Says metal let heat in, or conducted heat.",
    "Says metal conducts electrical energy, or that foam should not be the wire.",
  ],
  modelAnswer: "Foam kept the lunch coldest, at 6°C, so foam insulated against the heat. Metal ended at 18°C, so metal conducted the heat. Metal also conducts electrical energy, so foam would be the wrong material for a wire.",
  aiContext: "Grade 4 science, TEKS 4.8B. Thermal insulator is foam (6°C). Thermal conductor is metal (18°C). Metal conducts electrical energy; foam and plastic do not, so foam is a poor electrical wire. Do not accept brand or shine as evidence. Do not penalize spelling.",
  whatIf: {
    key: "a",
    walk: ["foam", "lunch"],
    walkLine: "The foam is what stands between the heat and the cold lunch.",
    why: {
      a: "Yes. Remove the foam and the lunch loses the material that was slowing the heat.",
      b: "The heat outside does not vanish. The lunch is what loses its protection.",
      c: "The temperatures were not the same. Metal and foam did not act the same.",
      d: "The metal box is still there. The cold lunch is what fails.",
    },
  },
  look: {
    key: "foam",
    hint: "Follow the arrows. The picture shows heat, a metal box, foam, and a lunch that is still cold. It does not rank a brand, and it does not show a magnet.",
    why: "Yes. The foam sits between the heat and the cold lunch.",
  },
  repair: {
    pieceId: "r2p6",
    model: "The notes never say a magnet stuck to the foam.",
    why: "Yes. That sentence tells the truth. The notes never showed a magnet test.",
  },
};
