// SERVER ONLY.
export const SERVER_CASE = {
  "standard": "5.9-AD",
  "title": "Shadows Move",
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
        "r1p5": "A day-night rotation is about 24 hours, not one year.",
        "r1p6": "The notes explain night by rotation, not by the Sun going out."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the spin.",
        "r1p2": "This is the time.",
        "r1p3": "This is day and night.",
        "r1p4": "This is the conclusion."
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
        "r2p5": "The notes say Earth rotated. The Sun did not orbit the flagpole.",
        "r2p6": "The notes say the shadow changed from long to short."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This opens the paragraph.",
        "r2p2": "This is morning.",
        "r2p3": "This is noon.",
        "r2p4": "This is the conclusion."
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
        "r3p5": "The notes do not say the flagpole changes size.",
        "r3p6": "The notes explain the shadows by Earth's rotation, not the Moon."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This names the explanation.",
        "r3p2": "This is day and night.",
        "r3p3": "This is the shadows.",
        "r3p4": "This is the Sun's apparent motion."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The piece gives the rotation, then the shadows. The single explanation comes last.",
  "decoyProtest": {
    "r1p5": "A year is the spin I remember.",
    "r1p6": "The Sun looks gone at night.",
    "r2p5": "The Sun crosses the sky, so it must be orbiting us.",
    "r2p6": "A steady shadow would be tidier.",
    "r3p5": "Poles can look taller at noon.",
    "r3p6": "The Moon is mysterious enough."
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Log accepted. Earth's about-24-hour rotation explains day, night, and the changing shadows.",
      "good": "Log accepted. The spin is mostly right. Read the leftovers so the Sun is not sent around the flagpole.",
      "rough": "I have the work. Come read it with me. Part of this is Earth's rotation, and part of it moves the Sun instead."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "The Sun traveled around the playground, and that is why the shadows moved.",
    "why": "The Sun appeared to move because Earth rotated. The notes do not say the Sun orbited the flagpole."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says one rotation takes about 24 hours.",
    "pinpointMiss": "That sentence may belong. It does not say the rotation takes about 24 hours.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. The shadow changed because Earth rotated.",
      "b": "The Sun did not orbit the flagpole.",
      "c": "The flagpole did not grow.",
      "d": "Night is caused by rotation, not the Sun going out."
    }
  },
  "mustInclude": [
    "Says Earth rotates about once every 24 hours.",
    "Connects that rotation to day and night.",
    "Explains the changing shadows by Earth's rotation, not by the Sun orbiting the flagpole."
  ],
  "modelAnswer": "Earth rotates about once every 24 hours. That causes day and night. The morning shadow was long and the noon shadow was short because Earth rotated. The Sun only appeared to move.",
  "aiContext": "Grade 5 Science, TEKS 5.9. Earth rotates on its axis about once every 24 hours. That causes day and night, the apparent motion of the Sun, and changes in shadow position and length. Morning shadow long, noon shadow short. Do not accept a yearly rotation as the cause of night, the Sun going out, the Sun orbiting the flagpole, unchanging shadows, a growing flagpole, or the Moon pulling shadows. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "spin",
      "shadow"
    ],
    "walkLine": "The shadow changes because Earth rotates.",
    "why": {
      "a": "Yes. Without the rotation, the changing shadows fail.",
      "b": "The axis is still there.",
      "c": "The Sun does not orbit the flagpole.",
      "d": "Stopping the spin does not make the Sun go out."
    }
  },
  "look": {
    "key": "change",
    "hint": "Three views: long shadow, short shadow, long shadow on the other side.",
    "why": "Yes. The shadow changes through the day."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say the Sun orbited the flagpole.",
    "why": "Yes. Earth was rotating."
  }
};
