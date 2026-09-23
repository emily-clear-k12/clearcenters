// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.8C-AD",
  "title": "The Bent Straw",
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
        "r1p5": "The notes say the opposite. The beam traveled in a straight line across the table.",
        "r1p6": "Magic is not an explanation. The notes trace what the light did."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "opinion"
      },
      "misplacementNotes": {
        "r1p1": "This tells the reader what the paragraph is about.",
        "r1p2": "This says the beam crossed the table straight.",
        "r1p3": "This says the air did not bend it.",
        "r1p4": "This sets up the later changes, so it goes last."
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
        "r2p5": "The notes say the opposite. The mirror bounced the beam to the wall.",
        "r2p6": "The notes say the straw was not broken. It only looked bent."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This tells the reader what the paragraph is about.",
        "r2p2": "This is reflection.",
        "r2p3": "This is refraction.",
        "r2p4": "This is absorption, so it can close the list."
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
        "r3p5": "The notes never say the straw bends because water is heavy. Light changed direction.",
        "r3p6": "The black card shows absorption. The bent look came from the water."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "offtopic"
      },
      "misplacementNotes": {
        "r3p1": "This tells the reader what the paragraph is about.",
        "r3p2": "This says where the straw looked bent.",
        "r3p3": "This says the straw itself was straight.",
        "r3p4": "This names refraction as the cause, so it goes last."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The log starts with the straight beam, then names reflection, refraction, and absorption. The straw explanation comes last.",
  "decoyProtest": {
    "r1p5": "Straight is boring. I upgraded the beam to a curl.",
    "r1p6": "Magic is a variable. I controlled it by saying please.",
    "r2p5": "Bounce and swallow are neighbors. I picked the hungrier one.",
    "r2p6": "It looked broken, so it was broken. Eyes are rulers.",
    "r3p5": "Heavy water pulls on straws. I did not weigh it.",
    "r3p6": "The card was black. Black is a kind of bend."
  },
  "requester": {
    "name": "Chief Okafor",
    "emoji": "🛠️",
    "replies": {
      "great": "Log accepted. Straight path, reflection, refraction, and absorption are all in the right places. The straw was never broken.",
      "good": "Log accepted. The light tests are mostly right. Read the leftovers so a broken straw does not sneak in.",
      "rough": "Log received. Come find me and we'll read it together. Part of this is the light, and part of it is a guess."
    }
  },
  "trap": {
    "roundId": "r3",
    "position": 2,
    "text": "The straw really broke, and the water had nothing to do with the look.",
    "why": "The straw was straight when it came out of the water. Refraction changed the light, not the straw."
  },
  "debrief": {
    "pinpointAccept": [
      "r3p4"
    ],
    "pinpointWhy": "Right. That sentence says refraction changed the light, not the straw.",
    "pinpointMiss": "That sentence may be true. It does not say refraction changed the light instead of the straw.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. Light changed direction at the water. That is refraction, so the straw looked bent.",
      "b": "The straw was not broken. It was straight out of the water.",
      "c": "The beam traveled in a straight line across the table.",
      "d": "The black card absorbed light. It did not bend the straw."
    }
  },
  "mustInclude": [
    "Says the mirror reflected the light, or bounced it.",
    "Says the water refracted the light, so the straw looked bent but was not broken.",
    "Says the black card absorbed the light, or the wall behind it stayed dark."
  ],
  "modelAnswer": "The mirror reflected the beam and bounced it to the wall. At the water, the light refracted, so the straw looked bent even though it was not broken. The black card absorbed the light, and the wall behind it stayed dark.",
  "aiContext": "Grade 5 science, TEKS 5.8C. Light travels in a straight line until it meets something. A mirror reflects it. Water refracts it, so a straw looks bent at the water line but is not broken. A black card absorbs it and the surface behind stays dark. Do not accept magic, a snapped straw, or a beam that curls in open air. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "water",
      "bent"
    ],
    "walkLine": "The water is what makes the straw look bent.",
    "why": {
      "a": "Yes. Take the water away and the bent look has nothing to cause it.",
      "b": "The flashlight is still there. It is before the water.",
      "c": "The bent look came from the water. In the air, the straw was straight.",
      "d": "The straight beam is before the water. It does not depend on the glass."
    }
  },
  "look": {
    "key": "bend",
    "hint": "Follow the arrows. The picture shows a flashlight, a straight beam, and a straw that looks bent at the water. The straw is not in two pieces.",
    "why": "Yes. The beam is straight, and the straw looks bent where it meets the water."
  },
  "repair": {
    "pieceId": "r2p6",
    "model": "The notes never say the straw snapped.",
    "why": "Yes. The straw only looked bent. It was not broken."
  }
};
