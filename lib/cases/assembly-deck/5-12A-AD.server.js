// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.12A-AD",
  "title": "The Pond Tank",
  "rounds": {
    "r1": {
      "key": {
        "topic": [
          "r1p1"
        ],
        "details": [
          "r1p2",
          "r1p3"
        ],
        "conclusion": [
          "r1p4"
        ]
      },
      "decoys": {
        "r1p5": "The notes list gravel as abiotic. Sitting in the tank does not make it alive.",
        "r1p6": "The notes say sunlight is not alive. Moving and changing does not make something a living thing."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This defines biotic factors, so it opens the paragraph.",
        "r1p2": "This names the fish as biotic, a fact from the notes.",
        "r1p3": "This names the other living things, a fact from the notes.",
        "r1p4": "This sums up the living part of the tank, so it closes."
      }
    },
    "r2": {
      "key": {
        "topic": [
          "r2p1"
        ],
        "details": [
          "r2p2",
          "r2p3"
        ],
        "conclusion": [
          "r2p4"
        ]
      },
      "decoys": {
        "r2p5": "The notes say water is not alive, even though fish use it.",
        "r2p6": "The notes say the fish needs both kinds of factors, so the nonliving ones cannot be removed."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This defines abiotic factors, so it opens the paragraph.",
        "r2p2": "This names sunlight as abiotic, a fact from the notes.",
        "r2p3": "This names more abiotic factors, a fact from the notes.",
        "r2p4": "This connects the nonliving factors to the fish, so it closes."
      }
    },
    "r3": {
      "key": {
        "topic": [
          "r3p1"
        ],
        "details": [
          "r3p2",
          "r3p3"
        ],
        "conclusion": [
          "r3p4"
        ]
      },
      "decoys": {
        "r3p5": "The notes say the fish needs water. Removing it would not help the fish thrive.",
        "r3p6": "The notes never mention gravel brands or rank what matters most."
      },
      "decoyReason": {
        "r3p5": "contradicts",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This states how the fish survives, so it opens.",
        "r3p2": "This is the biotic side of the fish's survival.",
        "r3p3": "This is the abiotic side of the fish's survival.",
        "r3p4": "This makes the big point about ecosystems, so it closes."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The report sorts the biotic factors first, then the abiotic factors. How the fish survives with both comes last.",
  "decoyProtest": {
    "r1p5": "It lives in the habitat, so it must be alive! ...Rocks don't count? Really?",
    "r1p6": "It moves! It changes! It warms things up! ...That's not the same as being alive?",
    "r2p5": "Fish touch the water all day, so some of that life must rub off!",
    "r2p6": "Living things are the interesting part! Who needs boring old water?",
    "r3p5": "Fish are tough! They'd love the extra space! ...Wait, where would they swim?",
    "r3p6": "Fancy gravel is how the best tanks get built! It says so on the bag!"
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Report accepted. The fish depends on biotic factors and on abiotic factors such as sunlight, water, and temperature.",
      "good": "Report accepted. The sort is mostly right. Reread the leftovers so nonliving things are not called alive.",
      "rough": "I have your report. Come read it with me. Part of it sorts the factors correctly, and part of it mixes up living and nonliving."
    }
  },
  "trap": {
    "roundId": "r1",
    "position": 2,
    "text": "Sunlight is biotic because the plant needs it to grow.",
    "why": "Needing sunlight does not make sunlight alive. Sunlight is abiotic, and the plant is biotic."
  },
  "debrief": {
    "pinpointAccept": [
      "r2p2"
    ],
    "pinpointWhy": "Right. That sentence says sunlight is abiotic because it is not alive.",
    "pinpointMiss": "That sentence may belong, but it does not say sunlight is abiotic.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Sunlight is nonliving, so it is abiotic.",
      "b": "The fish is a living organism, so it is biotic.",
      "c": "The snail is a living organism, so it is biotic.",
      "d": "The plant is a living organism, so it is biotic."
    }
  },
  "mustInclude": [
    "Calls the fish, plant, or snail biotic.",
    "Calls sunlight, water, temperature, or gravel abiotic.",
    "Says the fish needs both kinds of factors."
  ],
  "modelAnswer": "The fish, the plant, and the snail are biotic because they are alive. Sunlight, water, temperature, and gravel are abiotic because they are not alive. The fish needs both kinds. It takes in oxygen that the plant releases, and it also needs water to live in and a steady temperature.",
  "aiContext": "Grade 5 Science, TEKS 5.12A. Biotic: fish, plant, snail. Abiotic: sunlight, water, temperature, gravel. Notes: the plant uses sunlight and releases oxygen that the fish takes in; the snail eats algae and helps keep the water clean; the fish needs water at a steady temperature. A healthy ecosystem includes both kinds, and the fish needs both. Do not accept gravel or sunlight as biotic, water as biotic because fish swim in it, a tank of only living things, removing water as helpful, or gravel brand. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "abiotic",
      "survive"
    ],
    "walkLine": "The fish's survival depends on the nonliving factors, so removing them makes it fail.",
    "why": {
      "a": "Yes. Without abiotic factors, the fish cannot survive.",
      "b": "The fish is still a living organism, so it is still biotic.",
      "c": "The notes say the fish needs abiotic factors too.",
      "d": "Removing abiotic factors does not make sunlight alive."
    }
  },
  "look": {
    "key": "both",
    "hint": "Look for a fish, a plant, water, sunlight, and gravel.",
    "why": "Yes. Living and nonliving factors are both in the picture."
  },
  "repair": {
    "pieceId": "r1p6",
    "model": "The notes never say sunlight is alive. They list it as abiotic.",
    "why": "Yes. Sunlight is abiotic."
  }
};
