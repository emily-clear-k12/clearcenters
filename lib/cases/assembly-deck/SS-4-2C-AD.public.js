// Safe to import from client components.
// Assembly Deck — SS.4.2C-AD. TEKS 4.2C — when, where, and why the Spanish established settlements and Catholic missions in Texas.

export const PUBLIC_CASE = {
  "standard": "SS.4.2C-AD",
  "mode": "paragraph",
  "grade": 4,
  "subject": "Social Studies",
  "title": "Why Here?",
  "estimatedMinutes": 20,
  "brief": [
    "In 1718 the Spanish chose a site near the San Antonio River. Explain why that spot, not a prettier story.",
    "A mission was a church settlement. A presidio was a fort.",
    "The land was not empty, and the Spanish had their own reasons."
  ],
  "source": {
    "title": "SITE NOTES",
    "lines": [
      "In 1718 the Spanish built a mission and a presidio by the San Antonio River.",
      "The river supplied water for people, crops, and animals.",
      "Coahuiltecan groups already lived and camped near that river.",
      "The Spanish wanted those groups to move into the mission.",
      "They also wanted to spread the Catholic faith and hold the claim to the land.",
      "The site sat on the route between the Rio Grande and East Texas."
    ]
  },
  "rounds": [
    {
      "id": "r1",
      "label": "What the site offered",
      "goal": "Build the paragraph about what the river made possible.",
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
          "hint": "The year and the river, and what the water was for",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "Why a dry site would fail",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r1p2",
          "text": "In 1718 they built by the San Antonio River."
        },
        {
          "id": "r1p5",
          "text": "The mission was built far from any river."
        },
        {
          "id": "r1p1",
          "text": "The Spanish needed a site with water."
        },
        {
          "id": "r1p6",
          "text": "They picked the prettiest view, and water did not matter."
        },
        {
          "id": "r1p3",
          "text": "The river could water people, crops, and animals."
        },
        {
          "id": "r1p4",
          "text": "A dry site, far from a river, was a weak choice."
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
      "label": "Who was already there",
      "goal": "Build the paragraph about the people already living there.",
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
          "hint": "Who lived there, and what the Spanish planned",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the notes do not say",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r2p2",
          "text": "Coahuiltecan groups already lived near the river."
        },
        {
          "id": "r2p5",
          "text": "No one lived in Texas until the Spanish arrived."
        },
        {
          "id": "r2p1",
          "text": "The land beside the river was not empty."
        },
        {
          "id": "r2p6",
          "text": "Everyone was glad and fully free at the mission."
        },
        {
          "id": "r2p3",
          "text": "The Spanish wanted those groups to move into the mission."
        },
        {
          "id": "r2p4",
          "text": "The notes do not say that everyone agreed."
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
      "label": "Why this site",
      "goal": "Build the paragraph that puts the reasons together.",
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
          "hint": "Faith and land, and the route the site sat on",
          "accepts": 2
        },
        {
          "id": "conclusion",
          "label": "Conclusion",
          "hint": "What the choice required",
          "accepts": 1
        }
      ],
      "pieces": [
        {
          "id": "r3p2",
          "text": "The Spanish wanted to spread the Catholic faith and hold the land."
        },
        {
          "id": "r3p5",
          "text": "They came only to help, with no plan of their own."
        },
        {
          "id": "r3p1",
          "text": "Water and the people nearby are why this site was chosen."
        },
        {
          "id": "r3p6",
          "text": "This 1718 mission was built in East Texas, not by the river."
        },
        {
          "id": "r3p3",
          "text": "The site also sat on the route toward East Texas."
        },
        {
          "id": "r3p4",
          "text": "A mission with no water, or on empty land, missed the plan."
        }
      ],
      "rejectPrompt": "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      "reasonOptions": [
        "opinion",
        "contradicts",
        "unsupported",
        "offtopic"
      ]
    }
  ],
  "assembly": {
    "prompt": "Three parts, one explanation. What order should a reader hear them in?",
    "hint": "A reader needs the river, then who was already there, before the full reason.",
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
      "prompt": "One sentence says Coahuiltecan groups already lived near the river. Tap it.",
      "hint": "Look in the part about who was already there."
    },
    "quickCheck": {
      "prompt": "Why did the Spanish choose this site in 1718?",
      "choices": [
        {
          "id": "a",
          "text": "It had river water, people already lived nearby, and it sat on the route east"
        },
        {
          "id": "b",
          "text": "The land was empty and far from any river"
        },
        {
          "id": "c",
          "text": "They came only to help, with no plan"
        },
        {
          "id": "d",
          "text": "Everyone was glad and fully free"
        }
      ]
    }
  },
  "explain": {
    "prompt": "When and where was this mission built, and why did the Spanish choose that spot?",
    "starters": [
      "In 1718",
      "The river",
      "Coahuiltecan groups",
      "The Spanish wanted"
    ],
    "checks": [
      "I said 1718 or the San Antonio River.",
      "I said the river supplied water.",
      "I said people already lived there.",
      "I gave a Spanish reason, such as faith or holding the land.",
      "I did not say the land was empty."
    ],
    "criteria": [
      "Say the mission was built in 1718 by the San Antonio River.",
      "Say the river provided water, or that Coahuiltecan groups already lived there.",
      "Give a Spanish reason: Catholic faith, holding the land, or the route toward East Texas."
    ]
  },
  "chain": {
    "title": "Mission line",
    "sourceId": "river",
    "cutId": "people",
    "cutDark": [
      "mission"
    ],
    "stayOn": [
      "river"
    ],
    "cutting": "Taking the people out of the choice…",
    "cutDone": "No one already living there. The reason for the mission goes dark.",
    "liveLine": "The line is live. Mark what fails if the land was empty.",
    "fillLine": "The mission line fills in as each part locks.",
    "links": [
      {
        "id": "river",
        "label": "The river",
        "mark": "🏞️",
        "on": "r1"
      },
      {
        "id": "people",
        "label": "People there",
        "mark": "🏘️",
        "on": "r2"
      },
      {
        "id": "mission",
        "label": "The mission",
        "mark": "⛪",
        "on": "r3"
      }
    ]
  },
  "whatIf": {
    "prompt": "The line is live. Pretend no one already lived there. What fails?",
    "hint": "Mark what goes dark. Then take the people away.",
    "switch": "Empty the land",
    "choices": [
      {
        "id": "a",
        "text": "The reason for building the mission",
        "marks": [
          "mission"
        ]
      },
      {
        "id": "b",
        "text": "The river disappears",
        "marks": [
          "river"
        ]
      },
      {
        "id": "c",
        "text": "Nothing. Empty land was the goal.",
        "nobody": true
      },
      {
        "id": "d",
        "text": "The mission gets bigger",
        "marks": [
          "mission"
        ]
      }
    ]
  },
  "look": {
    "prompt": "Look at the mission line. Which sentence matches the picture?",
    "image": "/student/mission_line.jpg",
    "choices": [
      {
        "id": "site",
        "text": "A river, a village already beside it, then a church and a fort."
      },
      {
        "id": "empty",
        "text": "Empty land, with no river and no village."
      },
      {
        "id": "ship",
        "text": "A ship landing on a beach, far from any river."
      }
    ]
  },
  "repair": {
    "roundId": "r2",
    "pieceId": "r2p5",
    "prompt": "Look at the mission line. Which sentence matches the picture?"
  },
  "board": null
};
