// Safe to import from client components.
// Assembly Deck — SS.4.4B-AD. TEKS 4.4B — growth and impact of the Texas cattle industry, including Goodnight, King, and Lizzie Johnson.

export const PUBLIC_CASE = {
  "standard": "SS.4.4B-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Social Studies",
  "title": "The Price of a Longhorn",
  "estimatedMinutes": 20,
  "brief": [
    "After the Civil War, a longhorn was worth about $4 in Texas and about $40 at a Kansas railhead.",
    "The drives were an answer to that price gap. They were work, not a movie.",
    "Railroads in Texas and barbed wire brought most of the long drives to an end."
  ],
  "source": {
    "title": "CATTLE NOTES",
    "lines": [
      "After the Civil War, a longhorn sold for about $4 in Texas.",
      "At a Kansas railhead, the same animal brought about $40.",
      "Herds walked trails north for weeks to reach that higher price.",
      "Charles Goodnight helped open a cattle trail. Richard King built the King Ranch. Lizzie Johnson owned herds and sent them up the trail.",
      "By the late 1880s, railroads reached more of Texas, and barbed wire closed the open range.",
      "The long walk north was no longer the best way to reach a buyer."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "Why the prices differed",
      "goal": "Build the paragraph that explains the price gap.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "The Texas price, and the railhead price",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why the gap mattered",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "In Texas, a longhorn sold for about $4."
        },
        {
          "id": "r1p5",
          "text": "A longhorn sold for the same price in Texas and in Kansas."
        },
        {
          "id": "r1p1",
          "text": "The price of a longhorn depended on where it was."
        },
        {
          "id": "r1p6",
          "text": "Cowboys drove cattle for the adventure, not the money."
        },
        {
          "id": "r1p3",
          "text": "At a Kansas railhead, it brought about $40."
        },
        {
          "id": "r1p4",
          "text": "That gap is why a dangerous drive could pay."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "opinion",
        "unsupported",
        "offtopic"
      ]
    },
    {
      "id": "r2",
      "label": "How the drives worked",
      "goal": "Build the paragraph about the drives and who took part.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "Where the herds walked, and three people in the business",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What kind of work it was",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Herds followed trails north to a railroad town."
        },
        {
          "id": "r2p5",
          "text": "The herds walked south, away from the railroad."
        },
        {
          "id": "r2p1",
          "text": "The drives were a long walk toward the higher price."
        },
        {
          "id": "r2p6",
          "text": "Lizzie Johnson could not have owned cattle."
        },
        {
          "id": "r2p3",
          "text": "Charles Goodnight, Richard King, and Lizzie Johnson took part."
        },
        {
          "id": "r2p4",
          "text": "The trip could take weeks, and it was a job, not a show."
        }
      ],
      "rejectPrompt": "Two sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "offtopic"
      ]
    },
    {
      "id": "r3",
      "label": "What ended them",
      "goal": "Build the paragraph about why most long drives ended.",
      "slots": [
        {
          "id": "topic",
          "label": "Topic sentence",
          "hint": "What is this part about?",
          "accepts": 1
        },
        {
          "id": "details",
          "label": "Details from the notes",
          "hint": "The railroad in Texas, and barbed wire",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What that meant for the long walk",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "Railroads reached more of Texas, so cattle could ship from home."
        },
        {
          "id": "r3p5",
          "text": "Barbed wire made the long drives longer and more common."
        },
        {
          "id": "r3p1",
          "text": "Most long drives ended by the late 1880s."
        },
        {
          "id": "r3p6",
          "text": "The drives ended because the $4 price and the $40 price traded places."
        },
        {
          "id": "r3p3",
          "text": "Barbed wire closed the open range the herds had crossed."
        },
        {
          "id": "r3p4",
          "text": "The long walk was no longer the best way to a buyer."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "contradicts",
        "unsupported",
        "opinion",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one explanation. What order should a reader hear them in?",
    "hint": "A reader needs the price gap, then the drives, before the ending makes sense.",
    "slots": [
      {
        "id": "first",
        "label": "Opens the piece"
      },
      {
        "id": "second",
        "label": "Middle"
      },
      {
        "id": "third",
        "label": "Closes the piece"
      }
    ]
  },
  "debrief": {
    "pinpoint": {
      "prompt": "One sentence says a longhorn brought about $40 at a Kansas railhead. Tap it.",
      "hint": "Look in the part about the prices."
    },
    "quickCheck": {
      "prompt": "Why did ranchers drive cattle north?",
      "choices": [
        {
          "id": "a",
          "text": "A longhorn was worth much more at a Kansas railhead than in Texas"
        },
        {
          "id": "b",
          "text": "The price was the same in both places"
        },
        {
          "id": "c",
          "text": "They drove south, away from the railroad"
        },
        {
          "id": "d",
          "text": "Barbed wire made the drives more common"
        }
      ]
    }
  },
  "explain": {
    "prompt": "Why were cattle driven north, who is one person who took part, and what ended most of the long drives?",
    "starters": [
      "In Texas a longhorn",
      "At the railhead",
      "Goodnight, King, or Johnson",
      "The drives ended when"
    ],
    "checks": [
      "I said the Texas price was much lower than the railhead price.",
      "I said the herds walked north to a railroad.",
      "I named Goodnight, King, or Lizzie Johnson.",
      "I said railroads in Texas or barbed wire ended most drives.",
      "I did not say it was only for adventure."
    ],
    "criteria": [
      "Use the price gap, about $4 in Texas and about $40 at the railhead.",
      "Say herds walked north to a railroad town.",
      "Name one of Charles Goodnight, Richard King, or Lizzie Johnson, and say railroads or barbed wire ended most long drives."
    ]
  },
  "chain": {
    "title": "Cattle line",
    "sourceId": "cheap",
    "cutId": "drive",
    "cutDark": [
      "high"
    ],
    "stayOn": [
      "cheap"
    ],
    "cutting": "Stopping the drive…",
    "cutDone": "No trail north. The high price cannot be collected.",
    "liveLine": "The line is live. Mark what fails if the herd never leaves Texas.",
    "fillLine": "The cattle line fills in as each part locks.",
    "links": [
      {
        "id": "cheap",
        "label": "About $4",
        "mark": "🪙",
        "on": "r1"
      },
      {
        "id": "drive",
        "label": "The drive",
        "mark": "🐂",
        "on": "r2"
      },
      {
        "id": "high",
        "label": "About $40",
        "mark": "🚂",
        "on": "r1"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. The herd never walks north. What fails?",
    "hint": "Mark what goes dark. Then stop the drive.",
    "switch": "Stop the drive",
    "choices": [
      {
        "id": "a",
        "text": "Collecting the higher price",
        "marks": [
          "high"
        ]
      },
      {
        "id": "b",
        "text": "The low Texas price disappears",
        "marks": [
          "cheap"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. The prices were the same.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The Texas price rises to $40 without a trip",
        "marks": [
          "cheap"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the cattle line. Which sentence matches the picture?",
    "image": "/student/cattle_line.jpg",
    "choices": [
      {
        "id": "gap",
        "text": "Cattle beside a small coin, a trail, then a train beside a bigger coin."
      },
      {
        "id": "same",
        "text": "The two coins are the same size, and there is no trail."
      },
      {
        "id": "south",
        "text": "The herd walks away from the tracks, and the big coin is gone."
      }
    ]
  },
  "repair": {
    "roundId": "r1",
    "pieceId": "r1p5",
    "prompt": "Look at the cattle line. Which sentence matches the picture?"
  },
  "board": null
};
