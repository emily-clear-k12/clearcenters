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
        "r1p5": "The notes say one rotation takes about 24 hours, not a whole year.",
        "r1p6": "The notes explain night by rotation. The Sun never stops shining; our side of Earth just faces away from it."
      },
      "decoyReason": {
        "r1p5": "contradicts",
        "r1p6": "contradicts"
      },
      "misplacementNotes": {
        "r1p1": "This names the rotation the whole paragraph explains, so it opens.",
        "r1p2": "This gives the time one rotation takes, a fact from the notes.",
        "r1p3": "This explains how the rotation makes day and night, a fact from the notes.",
        "r1p4": "This connects the rotation to what we see every day, so it closes."
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
        "r2p5": "The notes say Earth was rotating. The Sun only appeared to move; it did not orbit the flagpole.",
        "r2p6": "The notes say the shadow was long in the morning and short at noon, so it did change."
      },
      "decoyReason": {
        "r2p5": "contradicts",
        "r2p6": "contradicts"
      },
      "misplacementNotes": {
        "r2p1": "This says the shadow changed as Earth rotated, so it opens the paragraph.",
        "r2p2": "This is the morning observation from the notes.",
        "r2p3": "This is the noon observation from the notes.",
        "r2p4": "This explains what was really causing the change, so it closes."
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
        "r3p5": "The notes never say the flagpole changes height. They explain the shadows with Earth's rotation.",
        "r3p6": "The notes never mention the Moon. They explain the shadows with Earth's rotation."
      },
      "decoyReason": {
        "r3p5": "unsupported",
        "r3p6": "unsupported"
      },
      "misplacementNotes": {
        "r3p1": "This names the one cause behind everything, so it opens.",
        "r3p2": "This connects day and night to the rotation.",
        "r3p3": "This connects the shadows to the rotation.",
        "r3p4": "This explains the Sun's apparent motion, the last idea a reader needs."
      }
    }
  },
  "assemblyKey": {
    "first": "r1",
    "second": "r2",
    "third": "r3"
  },
  "assemblyNote": "The report explains the rotation first and then the shadows. The paragraph that connects them to one cause comes last.",
  "decoyProtest": {
    "r1p5": "A year is a rotation, right? ...Oh. That's an orbit. Wrong spin.",
    "r1p6": "The Sun is gone at night! Where else would it be? ...Shining on the other side? Hm.",
    "r2p5": "The Sun crosses the whole sky, so it MUST be circling our flagpole!",
    "r2p6": "A shadow that never changes would be so much tidier. Nobody checked, right?",
    "r3p5": "Flagpoles get taller at noon! Probably! ...The notes never measured it.",
    "r3p6": "The Moon is mysterious! Mysterious things pull shadows! ...Is that in the notes?"
  },
  "requester": {
    "name": "Ms. Alvarez",
    "emoji": "🔬",
    "replies": {
      "great": "Report accepted. You showed that Earth's rotation, about once every 24 hours, explains day, night, and the changing shadows.",
      "good": "Report accepted. The rotation is mostly right. Reread the leftovers so the Sun is not sent orbiting the flagpole.",
      "rough": "I have your report. Come read it with me. Part of it explains Earth's rotation, and part of it moves the Sun instead."
    }
  },
  "trap": {
    "roundId": "r2",
    "position": 2,
    "text": "The Sun traveled around the playground all day, and that is why the shadows moved.",
    "why": "The Sun only appeared to move because Earth rotated. The notes never say the Sun traveled around the playground."
  },
  "debrief": {
    "pinpointAccept": [
      "r1p2"
    ],
    "pinpointWhy": "Right. That sentence says one rotation takes about 24 hours, the length of one day and one night.",
    "pinpointMiss": "That sentence may belong, but it does not say how long one rotation takes.",
    "quickCheckKey": "a",
    "quickCheckWhy": {
      "a": "Yes. As Earth rotated, the Sun appeared higher in the sky, so the shadow got shorter.",
      "b": "The Sun did not orbit the flagpole. It only appeared to move because Earth rotated.",
      "c": "The notes never say the flagpole changed height. The Sun's position changed.",
      "d": "The Sun never stops shining. Day and night come from Earth's rotation."
    }
  },
  "mustInclude": [
    "Says Earth rotates about once every 24 hours.",
    "Connects that rotation to day and night.",
    "Explains the changing shadows by Earth's rotation, not by the Sun orbiting the flagpole."
  ],
  "modelAnswer": "Earth rotates on its axis about once every 24 hours. Because of that, the side facing the Sun has day while the side facing away has night. The flagpole's shadow was long in the morning, when the Sun was low, and short at noon, when the Sun was high. The Sun only appeared to move across the sky, because Earth was the one rotating.",
  "aiContext": "Grade 5 Science, TEKS 5.9. Earth rotates on its axis about once every 24 hours. That causes day and night, the apparent motion of the Sun across the sky, and changes in shadow length and direction. Notes: 9 a.m. shadow long, pointing west; noon shadow short; 3 p.m. shadow long, pointing east. Do not accept a yearly rotation as the cause of night, the Sun stopping or going out, the Sun orbiting the flagpole, unchanging shadows, a flagpole that changes height, or the Moon pulling shadows. Do not penalize spelling.",
  "whatIf": {
    "key": "a",
    "walk": [
      "spin",
      "shadow"
    ],
    "walkLine": "The shadows change because Earth rotates, so stopping the rotation stops the change.",
    "why": {
      "a": "Yes. Without the rotation, the changing shadows fail.",
      "b": "The axis would still be there. It is the rotation that stops.",
      "c": "The Sun does not orbit the flagpole. It only appeared to move because Earth rotated.",
      "d": "Stopping the rotation does not make the Sun stop shining."
    }
  },
  "look": {
    "key": "change",
    "hint": "Three views: a long shadow, a short shadow, then a long shadow pointing the other way.",
    "why": "Yes. The shadow changes length and direction through the day."
  },
  "repair": {
    "pieceId": "r2p5",
    "model": "The notes never say the Sun orbited the flagpole. They say Earth was rotating.",
    "why": "Yes. The Sun only appeared to move because Earth was rotating."
  }
};
