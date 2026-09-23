// SERVER ONLY. Never import from a client component.
// Assembly Deck — 3.12B-AD.

export const SERVER_CASE = {
  standard: "3.12B-AD",
  title: "The Pond That Went Quiet",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "This is an opinion about herons. The notes never rank the animals.",
        r1p6: "The notes say the opposite. The plants make food from sunlight.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "The crew wrote this down. It is a detail.",
        r1p3: "The crew wrote this down. It is a detail.",
        r1p4: "This is what the details add up to, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "No note mentions a bear. That claim has no evidence.",
        r2p6: "A food web is a different lesson. These notes follow one chain.",
      },
      decoyReason: { r2p5: "unsupported", r2p6: "offtopic" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This is one link the crew observed.",
        r2p3: "This is the next link the crew observed.",
        r2p4: "This names the whole path, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "Mean is an opinion. The notes never say the heron caused this.",
        r3p6: "These notes show one missing link changing two other parts of the chain.",
      },
      decoyReason: { r3p5: "opinion", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is a change the crew counted.",
        r3p3: "This is a change the crew counted.",
        r3p4: "This says what to figure out next, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log says where the energy starts, then who eats whom. Only then can it say what a missing link does.",
  decoyProtest: {
    r1p5: "Best is a science word! I looked it up in my heart.",
    r1p6: "No sun? Then the plants are just... decorative. I'll allow it.",
    r2p5: "Bears are always relevant. Especially at night. Especially in ponds.",
    r2p6: "Web, chain, same picture if you squint. I was squinting.",
    r3p5: "Mean birds ruin ecosystems. I feel this very strongly.",
    r3p6: "Many paths! So nothing matters! That's the hopeful reading.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You started with the plants, followed the chain, and showed what broke when the minnows left. That is the report I needed.",
      good: "Log accepted. The chain is mostly right. Read the leftovers once more so a guess does not sneak into the next pond report.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the chain, and part of it is a guess about who to blame.",
    },
  },
  trap: {
    roundId: "r2",
    position: 2,
    text: "The heron eats the minnows because it feels hungry and mean.",
    why: "Hungry and mean is a feeling. The notes only show that herons eat minnows.",
  },
  debrief: {
    pinpointAccept: ["r1p1", "r1p3"],
    pinpointWhy: "Right. The plants make food from sunlight. That is where this chain's energy starts.",
    pinpointMiss: "That sentence is true. But it does not say the energy starts with the plants. Read the first paragraph again.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. The plants make food from sunlight, and the animals eat from there.",
      b: "The heron is at the end of this chain. It does not start the energy.",
      c: "Minnows eat the algae. They do not make the food.",
      d: "The notes never say the mud is making food.",
    },
  },
  mustInclude: [
    "Says the plants, or the algae, make food from sunlight.",
    "Names at least one link: minnows eat algae, or herons eat minnows.",
    "Says something that changed when the minnows were gone, such as the herons leaving or the algae growing thicker.",
  ],
  modelAnswer: "The plants make food from sunlight, so the energy starts there. Minnows eat the algae, and herons eat the minnows. When the minnows disappeared, the herons left and the algae grew thicker.",
  aiContext: "Grade 3 science, TEKS 3.12B. Target idea: energy in this food chain starts with plants using sunlight, then moves to minnows and herons, and a missing link changes the parts on both sides. Accept simple words. Do not require the phrase food chain if the student describes the path. Do not penalize spelling.",
};
