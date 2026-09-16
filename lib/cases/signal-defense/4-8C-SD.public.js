// Signal Defense — 4.8C, Electrical Energy in a Closed Path (Grade 4
// Science). Grade 4 expansion, Sept 16, 2026.
//
// TEKS 4.8C verbatim (TEA adopted grade 4 science TEKS): "demonstrate and
// describe how electrical energy travels in a closed path that can produce
// light and thermal energy"
//
// Verbs: DEMONSTRATE and DESCRIBE. Two things the wording pins down and that
// the questions have to carry:
//
//   CLOSED PATH. The standard is about the path, not about parts lists. So
//   the open/closed distinction runs through the whole bank — what breaks a
//   path, what completes one, what a switch is doing.
//
//   LIGHT AND THERMAL ENERGY. The standard names both outputs. A bank that
//   only lit bulbs would miss half of it, so heat-producing items (a
//   toaster, a warm bulb) are in on purpose.
//
// Boundary with 4.8B: that standard identifies conductors and insulators.
// This one is about the circuit path and what it produces. Overlap is
// deliberate but the framing here stays on the path.

export const PUBLIC_CASE = {
  standard: "4.8C-SD",
  title: "Signal Defense: Electrical Energy in a Closed Path",
  questions: [
    {
      "id": "4.8C-1",
      "type": "multiple_choice",
      "title": "A bulb lights when a circuit is connected all the way around. What is that complete loop called?",
      "prompt": "Choose the best answer.",
      "choices": [
        "An open circuit",
        "A broken path",
        "A closed circuit",
        "An insulator"
      ],
      "correct": "A closed circuit"
    },
    {
      "id": "4.8C-2",
      "type": "multiple_choice",
      "title": "A student removes one wire from a working circuit and the bulb goes out. Why?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The battery ran out instantly",
        "The bulb burned out",
        "The wire was an insulator",
        "The path is now open, so energy cannot travel around"
      ],
      "correct": "The path is now open, so energy cannot travel around"
    },
    {
      "id": "4.8C-3",
      "type": "multiple_choice",
      "title": "What does a switch do in a circuit?",
      "prompt": "Choose the best answer.",
      "choices": [
        "It opens or closes the path",
        "It stores electrical energy",
        "It turns the wire into an insulator",
        "It makes the battery stronger"
      ],
      "correct": "It opens or closes the path"
    },
    {
      "id": "4.8C-4",
      "type": "multiple_choice",
      "title": "A toaster's wires glow and get hot. Which energy is the electrical energy being changed into?",
      "prompt": "Choose the best answer.",
      "choices": [
        "Only sound energy",
        "Light and thermal energy",
        "Only motion",
        "No energy at all"
      ],
      "correct": "Light and thermal energy"
    },
    {
      "id": "4.8C-5",
      "type": "multiple_choice",
      "title": "Which set of parts would make a bulb light?",
      "prompt": "Choose the best answer.",
      "choices": [
        "A battery and a bulb with no wires",
        "Wires and a bulb with no battery",
        "A battery, wires, and a bulb all connected in a loop",
        "A battery, wires, and a bulb with one wire loose"
      ],
      "correct": "A battery, wires, and a bulb all connected in a loop"
    },
    {
      "id": "4.8C-6",
      "type": "multiple_choice",
      "title": "A bulb that has been on a while feels warm. What does that show?",
      "prompt": "Choose the best answer.",
      "choices": [
        "The circuit is broken",
        "The bulb is about to stop working",
        "The battery is leaking heat",
        "Electrical energy also becomes thermal energy"
      ],
      "correct": "Electrical energy also becomes thermal energy"
    },
    {
      "id": "4.8C-7",
      "type": "true_false",
      "title": "Electrical energy needs a complete path to travel around a circuit.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.8C-8",
      "type": "true_false",
      "title": "An open circuit will still light a bulb.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.8C-9",
      "type": "true_false",
      "title": "A circuit can produce both light and thermal energy at the same time.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.8C-10",
      "type": "true_false",
      "title": "Turning a switch off closes the path in a circuit.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.8C-11",
      "type": "true_false",
      "title": "A battery is the source of electrical energy in a simple circuit.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.8C-12",
      "type": "true_false",
      "title": "Putting a plastic ruler into a gap in a circuit will complete the path.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "False",
      "review": ""
    },
    {
      "id": "4.8C-13",
      "type": "true_false",
      "title": "A loose wire anywhere in the loop can stop the whole circuit from working.",
      "prompt": "True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": "True",
      "review": ""
    },
    {
      "id": "4.8C-14",
      "type": "multi_select",
      "title": "Which parts are needed to build a simple circuit that lights a bulb?",
      "prompt": "Select all that apply.",
      "choices": [
        "A battery",
        "Wires",
        "A bulb",
        "A magnet",
        "A complete path with no gaps",
        "A wooden block"
      ],
      "correct": [
        "A battery",
        "Wires",
        "A bulb",
        "A complete path with no gaps"
      ]
    },
    {
      "id": "4.8C-15",
      "type": "multi_select",
      "title": "Which of these would break a closed circuit?",
      "prompt": "Select all that apply.",
      "choices": [
        "Unclipping a wire from the battery",
        "Flipping the switch to off",
        "Putting a plastic straw in the path",
        "Tightening every connection",
        "Cutting one of the wires",
        "Adding a fresh battery"
      ],
      "correct": [
        "Unclipping a wire from the battery",
        "Flipping the switch to off",
        "Putting a plastic straw in the path",
        "Cutting one of the wires"
      ]
    },
    {
      "id": "4.8C-16",
      "type": "multi_select",
      "title": "Which household items change electrical energy into thermal energy?",
      "prompt": "Select all that apply.",
      "choices": [
        "A toaster",
        "A hair dryer",
        "A space heater",
        "A wall clock",
        "An electric kettle",
        "A doorbell"
      ],
      "correct": [
        "A toaster",
        "A hair dryer",
        "A space heater",
        "An electric kettle"
      ]
    },
    {
      "id": "4.8C-17",
      "type": "multi_select",
      "title": "A student's bulb will not light. Which would be worth checking?",
      "prompt": "Select all that apply.",
      "choices": [
        "Whether every wire is firmly connected",
        "Whether the switch is turned on",
        "Whether the battery still has charge",
        "What color the wires are",
        "Whether the bulb is screwed in",
        "How heavy the battery feels"
      ],
      "correct": [
        "Whether every wire is firmly connected",
        "Whether the switch is turned on",
        "Whether the battery still has charge",
        "Whether the bulb is screwed in"
      ]
    },
    {
      "id": "4.8C-18",
      "type": "multi_select",
      "title": "Which statements about a closed circuit are correct?",
      "prompt": "Select all that apply.",
      "choices": [
        "Energy travels all the way around the loop",
        "There are no gaps in the path",
        "It can produce light",
        "It can produce thermal energy",
        "A gap anywhere is fine",
        "It works without a source of energy"
      ],
      "correct": [
        "Energy travels all the way around the loop",
        "There are no gaps in the path",
        "It can produce light",
        "It can produce thermal energy"
      ]
    },
    {
      "id": "4.8C-19",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "When the path is ",
        ", electrical energy travels around the loop and the bulb ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "closed",
            "open"
          ],
          "correct": "closed"
        },
        {
          "choices": [
            "stays dark",
            "lights"
          ],
          "correct": "lights"
        }
      ]
    },
    {
      "id": "4.8C-20",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A switch turned off leaves a ",
        " in the path, which makes the circuit ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "gap",
            "loop"
          ],
          "correct": "gap"
        },
        {
          "choices": [
            "closed",
            "open"
          ],
          "correct": "open"
        }
      ]
    },
    {
      "id": "4.8C-21",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "A lit bulb shows electrical energy becoming ",
        ", and the warmth you feel from it shows it also becoming ",
        " energy."
      ],
      "blanks": [
        {
          "choices": [
            "light",
            "sound"
          ],
          "correct": "light"
        },
        {
          "choices": [
            "motion",
            "thermal"
          ],
          "correct": "thermal"
        }
      ]
    },
    {
      "id": "4.8C-22",
      "type": "inline_choice",
      "title": "Complete the sentence.",
      "prompt": "",
      "parts": [
        "Placing a metal paperclip across a gap ",
        " the circuit, but a plastic one ",
        "."
      ],
      "blanks": [
        {
          "choices": [
            "completes",
            "breaks"
          ],
          "correct": "completes"
        },
        {
          "choices": [
            "does too",
            "does not"
          ],
          "correct": "does not"
        }
      ]
    },
    {
      "id": "4.8C-23",
      "type": "ordering",
      "title": "Put these steps in order for building a circuit that lights a bulb:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Connect the other wire from the bulb back to the battery",
        "Watch the bulb light up",
        "Gather a battery, two wires, and a bulb",
        "Connect one wire from the battery to the bulb"
      ],
      "correct": [
        "Gather a battery, two wires, and a bulb",
        "Connect one wire from the battery to the bulb",
        "Connect the other wire from the bulb back to the battery",
        "Watch the bulb light up"
      ]
    },
    {
      "id": "4.8C-24",
      "type": "ordering",
      "title": "Put these events in order when a switch is flipped on:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Electrical energy travels around the loop",
        "The switch closes the gap in the path",
        "The bulb gives off light and warmth",
        "The switch is flipped on"
      ],
      "correct": [
        "The switch is flipped on",
        "The switch closes the gap in the path",
        "Electrical energy travels around the loop",
        "The bulb gives off light and warmth"
      ]
    },
    {
      "id": "4.8C-25",
      "type": "ordering",
      "title": "Put these steps in order for finding why a bulb will not light:",
      "prompt": "Put the steps in order from first to last.",
      "choices": [
        "Fix the gap you found",
        "Check that the switch is on and every wire is connected",
        "Notice that the bulb stays dark",
        "Watch the bulb light once the path is complete"
      ],
      "correct": [
        "Notice that the bulb stays dark",
        "Check that the switch is on and every wire is connected",
        "Fix the gap you found",
        "Watch the bulb light once the path is complete"
      ]
    }
  ],
};
