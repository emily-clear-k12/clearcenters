// SERVER ONLY. Never import from a client component.
// Assembly Deck — 3.10C-AD.

export const SERVER_CASE = {
  standard: "3.10C-AD",
  title: "The Road That Moved",
  rounds: {
    r1: {
      key: { topic: ["r1p1"], details: ["r1p2", "r1p3"], conclusion: ["r1p4"] },
      decoys: {
        r1p5: "Scariest is an opinion. The notes describe a before and an after.",
        r1p6: "The notes say the opposite. The hillside did cover part of the road.",
      },
      decoyReason: { r1p5: "opinion", r1p6: "contradicts" },
      misplacementNotes: {
        r1p1: "This tells the reader what the paragraph is about.",
        r1p2: "This is the before. It is a detail.",
        r1p3: "This is the after. It is a detail.",
        r1p4: "This names the change, so it goes last.",
      },
    },
    r2: {
      key: { topic: ["r2p1"], details: ["r2p2", "r2p3"], conclusion: ["r2p4"] },
      decoys: {
        r2p5: "No note mentions a volcano. That claim has no evidence.",
        r2p6: "The notes say it happened in one night, not in one hundred years.",
      },
      decoyReason: { r2p5: "unsupported", r2p6: "contradicts" },
      misplacementNotes: {
        r2p1: "This tells the reader what the paragraph is about.",
        r2p2: "This is the rain the crew wrote down.",
        r2p3: "This is how little time passed.",
        r2p4: "This names the speed, so it goes last.",
      },
    },
    r3: {
      key: { topic: ["r3p1"], details: ["r3p2", "r3p3"], conclusion: ["r3p4"] },
      decoys: {
        r3p5: "Afraid is an opinion about drivers. The notes are about the hill.",
        r3p6: "The notes say the slow crumbling did not move the road by itself.",
      },
      decoyReason: { r3p5: "opinion", r3p6: "contradicts" },
      misplacementNotes: {
        r3p1: "This tells the reader what the paragraph is about.",
        r3p2: "This is the slow change the crew wrote down.",
        r3p3: "This says what that slow change did not do.",
        r3p4: "This puts the fast change next to the slow one, so it goes last.",
      },
    },
  },
  assemblyKey: { first: "r1", second: "r2", third: "r3" },
  assemblyNote: "The log says what changed, then how fast. The slow crumbling comes last, so it is not confused with the night of the slide.",
  decoyProtest: {
    r1p5: "Scary is a measurement. I measured it with my stomach.",
    r1p6: "If we don't look at Wednesday, nothing happened. Easy.",
    r2p5: "Volcanoes are very on-brand for roads. I checked nowhere.",
    r2p6: "One night, one hundred years. Time is a suggestion.",
    r3p5: "Fear moves soil. I have seen a flinch start a landslide.",
    r3p6: "Slow means fast if you are impatient.",
  },
  requester: {
    name: "Chief Okafor",
    emoji: "🛠️",
    replies: {
      great: "Log accepted. You named the landslide, the one night, and the slow crumbling that did not do it alone. That is a rapid change.",
      good: "Log accepted. The road story is mostly right. Read the leftovers so a scare or a volcano does not sneak in.",
      rough: "Log received. Come find me and we'll read it together. Part of this is the slide, and part of it is a guess.",
    },
  },
  trap: {
    roundId: "r2",
    position: 2,
    text: "The rain was angry, so it decided to punish the road.",
    why: "Angry is a feeling. The notes only show that heavy rain fell and the slide happened in one night.",
  },
  debrief: {
    pinpointAccept: ["r2p1", "r2p4"],
    pinpointWhy: "Right. That sentence says the change was fast.",
    pinpointMiss: "That sentence may be true. It does not say the change was fast.",
    quickCheckKey: "a",
    quickCheckWhy: {
      a: "Yes. The landslide after the heavy rain covered the road in one night.",
      b: "The slow crumbling was real. The notes say it did not move the road by itself.",
      c: "No note mentions a volcano.",
      d: "The notes say the hillside covered part of the road.",
    },
  },
  mustInclude: [
    "Says a landslide, or the hillside, covered part of the road.",
    "Says it was fast, or that it happened in one night, or after heavy rain.",
    "Says the hill had also been crumbling slowly, and that slow change did not move the road by itself.",
  ],
  modelAnswer: "A landslide covered part of the road after a heavy rain. It happened in one night, so it was a rapid change. The hill had been crumbling slowly for years, but that slow change did not move the road by itself.",
  aiContext: "Grade 3 science, TEKS 3.10C. A landslide is a rapid change to Earth's surface. Heavy rain and one night are the evidence of speed. Slow crumbling of the same hill is the contrast, and it did not move the road alone. Do not accept a volcano. Accept simple words. Do not penalize spelling.",
  whatIf: {
    key: "a",
    walk: ["rain", "soil", "road"],
    walkLine: "The heavy rain sent the soil. The soil is what covered the road.",
    why: {
      a: "Yes. Without that heavy rain, the soil does not slide that night, and the road stays clear.",
      b: "The hill is still there. The rain does not erase the hill.",
      c: "The notes say the slow crumbling did not dump the road in one night.",
      d: "The road would stay clear. The sliding soil is the same event, so it stays put too.",
    },
  },
  look: {
    key: "slide",
    hint: "Follow the arrows. The picture shows rain, a hill, sliding soil, and a road. It does not show a feeling, and it does not show a hundred years.",
    why: "Yes. The arrows go from the rain to the hill to the soil on the road.",
  },
  repair: {
    pieceId: "r2p5",
    model: "The notes never say a volcano caused the slide.",
    why: "Yes. That sentence tells the truth. The notes never showed a volcano.",
  },
};
