// Full cases, including answer keys. Import this only from server routes.
// The student bundle uses index.public.js, which has no answer keys.
export const LABS = [
  {
    id: "MA-3.6B-CL",
    subject: "Math",
    grade: "Grade 3",
    title: "Four sides",
    teks: "3.6B",
    pages: [
      {
        rule: "Sort by right angles or one pair of parallel sides.",
        notThis: "A square is still a rectangle.",
        hint: "A diamond turn does not change the right angles.",
        groups: [
          { id: "right", label: "Four right angles" },
          { id: "one", label: "One pair of parallel sides" },
        ],
        items: [
          { id: "door", label: "Door shape", clue: "Looks like a door", group: "right", shape: "rect" },
          { id: "square", label: "Square", clue: "All sides match", group: "right", shape: "square" },
          { id: "diamond", label: "Turned square", clue: "Looks like a diamond", group: "right", shape: "diamond" },
          { id: "book", label: "Book shape", clue: "Looks like a book", group: "right", shape: "rect" },
          { id: "ramp", label: "Ramp shape", clue: "Short side on top", group: "one", shape: "trap" },
          { id: "ramp2", label: "Ramp shape", clue: "Long side on the bottom", group: "one", shape: "trap" },
        ],
      },
      {
        rule: "Sort by right angles or one pair of parallel sides.",
        notThis: "Equal sides do not make right angles.",
        hint: "A leaning shape can have equal sides and no right angles.",
        groups: [
          { id: "right", label: "Four right angles" },
          { id: "one", label: "One pair of parallel sides" },
          { id: "neither", label: "Neither" },
        ],
        items: [
          { id: "book2", label: "Book shape", clue: "Two long sides", group: "right", shape: "rect" },
          { id: "square2", label: "Square", clue: "All sides match", group: "right", shape: "square" },
          { id: "ramp3", label: "Ramp shape", clue: "Looks like a ramp", group: "one", shape: "trap" },
          { id: "rhombus", label: "Leaning diamond", clue: "Equal sides", group: "neither", shape: "rhombus" },
          { id: "para", label: "Leaning box", clue: "Two pairs of long sides", group: "neither", shape: "para" },
          { id: "tri", label: "Triangle", clue: "Three sides", group: "neither", shape: "tri" },
        ],
      },
    ],
    venn: {
      hint: "The center has both rules. A triangle is outside both.",
      labels: [
        { id: "equal", text: "Four equal sides" },
        { id: "right", text: "Four right angles" },
      ],
      items: [
        { id: "square", label: "Square", sets: ["equal", "right"], shape: "square" },
        { id: "diamond", label: "Turned square", sets: ["equal", "right"], shape: "diamond" },
        { id: "rhombus", label: "Leaning diamond", sets: ["equal"], shape: "rhombus" },
        { id: "rect", label: "Book shape", sets: ["right"], shape: "rect" },
        { id: "trap", label: "Ramp shape", sets: [], shape: "trap" },
        { id: "tri", label: "Triangle", sets: [], shape: "tri" },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "angles", text: "Angles and parallel sides" },
          { id: "size", text: "How big the shape is" },
          { id: "color", text: "The color of the shape" },
        ],
        answer: "angles",
      },
      multi: {
        prompt: "Which have four equal sides and four right angles?",
        choices: [
          { id: "square", text: "Square" },
          { id: "diamond", text: "Turned square" },
          { id: "rhombus", text: "Leaning diamond" },
          { id: "rect", text: "Book shape" },
        ],
        answers: ["square", "diamond"],
      },
      inline: {
        before: "A square has four right angles, so it is also a",
        after: ".",
        choices: [
          { id: "rectangle", text: "rectangle" },
          { id: "triangle", text: "triangle" },
          { id: "circle", text: "circle" },
        ],
        answer: "rectangle",
      },
    },
  },
  {
    id: "ELAR-3.3C-CL",
    subject: "ELAR",
    grade: "Grade 3",
    title: "The word part",
    teks: "3.3C",
    pages: [
      {
        rule: "Sort by what the prefix means.",
        notThis: "Do not sort by the topic of the word.",
        hint: "The topic of the word is not the rule on the card.",
        groups: [
          { id: "not", label: "Means not" },
          { id: "before", label: "Means before" },
        ],
        items: [
          { id: "nonfat", label: "nonfat", clue: "A food", group: "not" },
          { id: "disagree", label: "disagree", clue: "A talk", group: "not" },
          { id: "incorrect", label: "incorrect", clue: "A test", group: "not" },
          { id: "preview", label: "preview", clue: "A movie", group: "before" },
          { id: "preheat", label: "preheat", clue: "An oven", group: "before" },
          { id: "preschool", label: "preschool", clue: "A school", group: "before" },
        ],
      },
      {
        rule: "Sort by what the prefix means.",
        notThis: "One word has no prefix.",
        hint: "A word with no prefix does not go in a meaning group.",
        groups: [
          { id: "not", label: "Means not" },
          { id: "before", label: "Means before" },
          { id: "none", label: "No prefix" },
        ],
        items: [
          { id: "nonstop", label: "nonstop", clue: "A trip", group: "not" },
          { id: "dislike", label: "dislike", clue: "A feeling", group: "not" },
          { id: "incomplete", label: "incomplete", clue: "A chore", group: "not" },
          { id: "prepay", label: "prepay", clue: "A store", group: "before" },
          { id: "prefix", label: "prefix", clue: "A word", group: "before" },
          { id: "sunshine", label: "sunshine", clue: "The sky", group: "none" },
        ],
      },
    ],
    venn: {
      hint: "The center has a prefix and a suffix. A plain word stays outside.",
      labels: [
        { id: "prefix", text: "Has a prefix" },
        { id: "suffix", text: "Has a suffix" },
      ],
      items: [
        { id: "nonfat", label: "nonfat", sets: ["prefix"] },
        { id: "preview", label: "preview", sets: ["prefix"] },
        { id: "careful", label: "careful", sets: ["suffix"] },
        { id: "playful", label: "playful", sets: ["suffix"] },
        { id: "disrespectful", label: "disrespectful", sets: ["prefix", "suffix"] },
        { id: "sunshine", label: "sunshine", sets: [] },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "prefix", text: "What the prefix means" },
          { id: "topic", text: "The topic of the word" },
          { id: "letters", text: "How many letters it has" },
        ],
        answer: "prefix",
      },
      multi: {
        prompt: "Which words have a prefix and a suffix?",
        choices: [
          { id: "disrespectful", text: "disrespectful" },
          { id: "previewing", text: "previewing" },
          { id: "preview", text: "preview" },
          { id: "sunshine", text: "sunshine" },
        ],
        answers: ["disrespectful", "previewing"],
      },
      inline: {
        before: "Disagree means",
        after: "agree.",
        choices: [
          { id: "not", text: "not" },
          { id: "before", text: "before" },
          { id: "full", text: "full" },
        ],
        answer: "not",
      },
    },
  },
  {
    id: "SS-3.7A-CL",
    subject: "Social Studies",
    grade: "Grade 3",
    title: "Who makes the rule",
    teks: "3.7A",
    pages: [
      {
        rule: "Sort by who makes the rule.",
        notThis: "Do not sort by what people need.",
        hint: "What people need is not the rule on the card.",
        groups: [
          { id: "city", label: "The city" },
          { id: "state", label: "The state" },
          { id: "country", label: "The country" },
        ],
        items: [
          { id: "street", label: "Fixing the school street", clue: "Need: getting to school", group: "city", image: "/lab/street.jpg" },
          { id: "park", label: "Town park hours", clue: "Need: a place to play", group: "city", image: "/lab/park.jpg" },
          { id: "license", label: "A driver's license", clue: "Need: driving", group: "state", image: "/lab/license.jpg" },
          { id: "highway", label: "A state highway", clue: "Need: traveling", group: "state", image: "/lab/highway.jpg" },
          { id: "army", label: "The United States Army", clue: "Need: safety", group: "country", image: "/lab/army.jpg" },
          { id: "stamp", label: "A U.S. postage stamp", clue: "Need: sending mail", group: "country", image: "/lab/mail.jpg" },
        ],
      },
      {
        rule: "Sort by who makes the rule.",
        notThis: "A family rule is not a government rule.",
        hint: "Home rules are not made by the city, the state, or the country.",
        groups: [
          { id: "city", label: "The city" },
          { id: "state", label: "The state" },
          { id: "country", label: "The country" },
          { id: "neither", label: "Neither" },
        ],
        items: [
          { id: "library", label: "A city library card", clue: "Need: books", group: "city", image: "/lab/library.jpg" },
          { id: "crosswalk", label: "A school crosswalk", clue: "Need: safety", group: "city", image: "/lab/crosswalk.jpg" },
          { id: "statepark", label: "A state park rule", clue: "Need: the outdoors", group: "state", image: "/lab/statepark.jpg" },
          { id: "coins", label: "U.S. coins", clue: "Need: money", group: "country", image: "/lab/coins.jpg" },
          { id: "president", label: "The president's job", clue: "Need: leadership", group: "country", image: "/lab/whitehouse.jpg" },
          { id: "bedtime", label: "Bedtime at home", clue: "Need: rest", group: "neither", image: "/lab/bedtime.jpg" },
        ],
      },
    ],
    venn: {
      hint: "The center is a city rule that also keeps people safe.",
      labels: [
        { id: "city", text: "The city makes it" },
        { id: "safe", text: "It keeps people safe" },
      ],
      items: [
        { id: "park", label: "Town park hours", sets: ["city"] },
        { id: "highway", label: "A state highway", sets: ["safe"] },
        { id: "street", label: "The school street", sets: ["city", "safe"] },
        { id: "crosswalk", label: "A school crosswalk", sets: ["city", "safe"] },
        { id: "bedtime", label: "Bedtime at home", sets: [] },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "who", text: "Who makes the rule" },
          { id: "need", text: "What people need" },
          { id: "age", text: "How old the rule is" },
        ],
        answer: "who",
      },
      multi: {
        prompt: "Which are city rules that keep people safe?",
        choices: [
          { id: "street", text: "The school street" },
          { id: "crosswalk", text: "A school crosswalk" },
          { id: "park", text: "Town park hours" },
          { id: "army", text: "The United States Army" },
        ],
        answers: ["street", "crosswalk"],
      },
      inline: {
        before: "A driver's license is made by the",
        after: ".",
        choices: [
          { id: "state", text: "state" },
          { id: "city", text: "city" },
          { id: "family", text: "family" },
        ],
        answer: "state",
      },
    },
  },
  {
    id: "SCI-4.12B-CL",
    subject: "Science",
    grade: "Grade 4",
    title: "What they eat",
    teks: "4.12B",
    pages: [
      {
        rule: "Sort by what they eat.",
        notThis: "Do not sort by where they live.",
        hint: "Where it lives is not the rule on the card.",
        groups: [
          { id: "meat", label: "Eats animals" },
          { id: "plants", label: "Eats plants" },
        ],
        items: [
          { id: "shark", label: "Shark", clue: "Lives in the ocean", group: "meat", image: "/lab/shark.jpg" },
          { id: "dolphin", label: "Dolphin", clue: "Lives in the ocean", group: "meat", image: "/lab/dolphin.jpg" },
          { id: "manatee", label: "Manatee", clue: "Lives in the ocean", group: "plants", image: "/lab/manatee.jpg" },
          { id: "hawk", label: "Hawk", clue: "Lives in the sky", group: "meat", image: "/lab/hawk.jpg" },
          { id: "rabbit", label: "Rabbit", clue: "Lives in a meadow", group: "plants", image: "/lab/rabbit.jpg" },
          { id: "deer", label: "Deer", clue: "Lives in a forest", group: "plants", image: "/lab/deer.jpg" },
        ],
      },
      {
        rule: "Sort by what they eat.",
        notThis: "One of these does not eat at all.",
        hint: "Looks like a bear is not the rule. Check what it actually eats.",
        groups: [
          { id: "meat", label: "Eats animals" },
          { id: "plants", label: "Eats plants" },
          { id: "neither", label: "Neither" },
        ],
        items: [
          { id: "penguin", label: "Penguin", clue: "Lives in the ocean", group: "meat", image: "/lab/penguin.jpg" },
          { id: "seal", label: "Seal", clue: "Lives in the ocean", group: "meat", image: "/lab/seal.jpg" },
          { id: "sheep", label: "Sheep", clue: "Lives in a meadow", group: "plants", image: "/lab/sheep.jpg" },
          { id: "horse", label: "Horse", clue: "Lives in a field", group: "plants", image: "/lab/horse.jpg" },
          { id: "panda", label: "Panda", clue: "Looks like a bear", group: "plants", image: "/lab/panda.jpg" },
          { id: "oak", label: "Oak tree", clue: "Lives in a forest", group: "neither", image: "/lab/oak.jpg" },
        ],
      },
    ],
    venn: {
      hint: "The center is for both rules. The outside is for neither.",
      labels: [
        { id: "meat", text: "Eats animals" },
        { id: "plants", text: "Eats plants" },
      ],
      items: [
        { id: "shark", label: "Shark", sets: ["meat"], image: "/lab/shark.jpg" },
        { id: "hawk", label: "Hawk", sets: ["meat"], image: "/lab/hawk.jpg" },
        { id: "manatee", label: "Manatee", sets: ["plants"], image: "/lab/manatee.jpg" },
        { id: "panda", label: "Panda", sets: ["plants"], image: "/lab/panda.jpg" },
        { id: "bear", label: "Bear", sets: ["meat", "plants"], image: "/lab/bear.jpg" },
        { id: "oak", label: "Oak tree", sets: [], image: "/lab/oak.jpg" },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "eat", text: "What they eat" },
          { id: "live", text: "Where they live" },
          { id: "size", text: "How big they are" },
        ],
        answer: "eat",
      },
      multi: {
        prompt: "Which ones eat both animals and plants?",
        choices: [
          { id: "bear", text: "Bear" },
          { id: "raccoon", text: "Raccoon" },
          { id: "shark", text: "Shark" },
          { id: "deer", text: "Deer" },
        ],
        answers: ["bear", "raccoon"],
      },
      inline: {
        before: "A manatee lives in the ocean, but it eats",
        after: ".",
        choices: [
          { id: "plants", text: "plants" },
          { id: "animals", text: "animals" },
          { id: "both", text: "both" },
        ],
        answer: "plants",
      },
    },
  },
  {
    id: "ELAR-4.11D-CL",
    subject: "ELAR",
    grade: "Grade 4",
    title: "One sentence or two",
    teks: "4.11D",
    pages: [
      {
        rule: "Sort simple sentences and compound sentences.",
        notThis: "A long sentence can still be simple.",
        hint: "Long is not the same as compound. Look for and, but, or or.",
        groups: [
          { id: "simple", label: "Simple" },
          { id: "compound", label: "Compound" },
        ],
        items: [
          { id: "seal", label: "The seal ate fish.", clue: "Short", group: "simple" },
          { id: "hawk", label: "The hawk dives.", clue: "Short", group: "simple" },
          { id: "oak", label: "The oak tree grew in the forest for many years.", clue: "Long", group: "simple" },
          { id: "panda", label: "The panda sat down, and it ate bamboo.", clue: "Two ideas", group: "compound" },
          { id: "chase", label: "The hawk dives, but the rabbit runs.", clue: "Two ideas", group: "compound" },
          { id: "hint", label: "I can read the card, or I can ask for a hint.", clue: "Two ideas", group: "compound" },
        ],
      },
      {
        rule: "Sort simple sentences and compound sentences.",
        notThis: "A piece of a sentence is not a sentence.",
        hint: "A sentence needs a subject and a verb. A joining word is not enough.",
        groups: [
          { id: "simple", label: "Simple" },
          { id: "compound", label: "Compound" },
          { id: "neither", label: "Neither" },
        ],
        items: [
          { id: "sheep", label: "The sheep ate grass.", clue: "One idea", group: "simple" },
          { id: "horse", label: "The horse ran fast.", clue: "One idea", group: "simple" },
          { id: "pets", label: "The dog barked, and the cat hid.", clue: "Two ideas", group: "compound" },
          { id: "bear", label: "The bear ate berries, but it stayed in the woods.", clue: "Two ideas", group: "compound" },
          { id: "because", label: "Because the rain started", clue: "Not finished", group: "neither" },
          { id: "running", label: "Running across the deck", clue: "Not finished", group: "neither" },
        ],
      },
    ],
    venn: {
      hint: "The center has a subject and a verb, and it also uses and, but, or or.",
      labels: [
        { id: "sv", text: "Has a subject and a verb" },
        { id: "join", text: "Uses and, but, or or" },
      ],
      items: [
        { id: "seal", label: "The seal ate fish.", sets: ["sv"] },
        { id: "piece", label: "and the cat hid", sets: ["join"] },
        { id: "pets", label: "The dog barked, and the cat hid.", sets: ["sv", "join"] },
        { id: "panda", label: "The panda sat, but it ate.", sets: ["sv", "join"] },
        { id: "forest", label: "the forest", sets: [] },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "kind", text: "Simple or compound" },
          { id: "long", text: "How long the sentence is" },
          { id: "topic", text: "The topic of the sentence" },
        ],
        answer: "kind",
      },
      multi: {
        prompt: "Which are compound sentences?",
        choices: [
          { id: "pets", text: "The dog barked, and the cat hid." },
          { id: "panda", text: "The panda sat down, and it ate bamboo." },
          { id: "oak", text: "The oak tree grew in the forest for many years." },
          { id: "because", text: "Because the rain started" },
        ],
        answers: ["pets", "panda"],
      },
      inline: {
        before: "A compound sentence joins two ideas with",
        after: ".",
        choices: [
          { id: "and", text: "and, but, or or" },
          { id: "because", text: "because" },
          { id: "period", text: "only a period" },
        ],
        answer: "and",
      },
    },
  },
  {
    id: "MA-5.4A-CL",
    subject: "Math",
    grade: "Grade 5",
    title: "Prime or composite",
    teks: "5.4A",
    pages: [
      {
        rule: "Sort by prime or composite.",
        notThis: "Do not sort by odd or even.",
        hint: "Odd and even is not the rule on the card.",
        groups: [
          { id: "prime", label: "Prime" },
          { id: "composite", label: "Composite" },
          { id: "neither", label: "Neither" },
        ],
        items: [
          { id: "n2", label: "2", clue: "Even", group: "prime" },
          { id: "n4", label: "4", clue: "Even", group: "composite" },
          { id: "n7", label: "7", clue: "Odd", group: "prime" },
          { id: "n9", label: "9", clue: "Odd", group: "composite" },
          { id: "n11", label: "11", clue: "Odd", group: "prime" },
          { id: "n1", label: "1", clue: "Odd", group: "neither" },
        ],
      },
      {
        rule: "Sort by prime or composite.",
        notThis: "Odd does not mean prime.",
        hint: "15 and 21 are odd, and they are not prime.",
        groups: [
          { id: "prime", label: "Prime" },
          { id: "composite", label: "Composite" },
          { id: "neither", label: "Neither" },
        ],
        items: [
          { id: "n23", label: "23", clue: "Odd", group: "prime" },
          { id: "n8", label: "8", clue: "Even", group: "composite" },
          { id: "n15", label: "15", clue: "Odd", group: "composite" },
          { id: "n21", label: "21", clue: "Odd", group: "composite" },
          { id: "n29", label: "29", clue: "Odd", group: "prime" },
          { id: "n1b", label: "1", clue: "Odd", group: "neither" },
        ],
      },
    ],
    venn: {
      hint: "A number can be odd and prime. Those are not the same rule.",
      labels: [
        { id: "odd", text: "Odd" },
        { id: "prime", text: "Prime" },
      ],
      items: [
        { id: "n9", label: "9", sets: ["odd"] },
        { id: "n2", label: "2", sets: ["prime"] },
        { id: "n7", label: "7", sets: ["odd", "prime"] },
        { id: "n11", label: "11", sets: ["odd", "prime"] },
        { id: "n4", label: "4", sets: [] },
        { id: "n1", label: "1", sets: ["odd"] },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "prime", text: "Prime or composite" },
          { id: "odd", text: "Odd or even" },
          { id: "size", text: "Bigger or smaller" },
        ],
        answer: "prime",
      },
      multi: {
        prompt: "Which numbers are odd and prime?",
        choices: [
          { id: "n7", text: "7" },
          { id: "n11", text: "11" },
          { id: "n9", text: "9" },
          { id: "n2", text: "2" },
        ],
        answers: ["n7", "n11"],
      },
      inline: {
        before: "2 is prime, and it is also",
        after: ".",
        choices: [
          { id: "even", text: "even" },
          { id: "odd", text: "odd" },
          { id: "composite", text: "composite" },
        ],
        answer: "even",
      },
    },
  },
  {
    id: "ELAR-5.11D-CL",
    subject: "ELAR",
    grade: "Grade 5",
    title: "The joining word",
    teks: "5.11D",
    pages: [
      {
        rule: "Sort by simple, compound, or complex.",
        notThis: "A long sentence can still be simple.",
        hint: "And, but, and or join a compound sentence. Because, when, and if build a complex sentence.",
        groups: [
          { id: "simple", label: "Simple" },
          { id: "compound", label: "Compound" },
          { id: "complex", label: "Complex" },
        ],
        items: [
          { id: "shark", label: "The shark hunts in the deep ocean.", clue: "Long", group: "simple" },
          { id: "oak", label: "The oak does not eat.", clue: "Short", group: "simple" },
          { id: "panda", label: "The panda looks like a bear, but it eats plants.", clue: "Uses but", group: "compound" },
          { id: "rabbit", label: "The rabbit ran, and the hawk missed.", clue: "Uses and", group: "compound" },
          { id: "bear", label: "The bear rests because it ate.", clue: "Uses because", group: "complex" },
          { id: "seal", label: "When the seal dives, it hunts fish.", clue: "Uses when", group: "complex" },
        ],
      },
      {
        rule: "Sort by simple, compound, or complex.",
        notThis: "A fragment is not a sentence yet.",
        hint: "If the words cannot stand as a sentence, they do not get a sentence group.",
        groups: [
          { id: "simple", label: "Simple" },
          { id: "compound", label: "Compound" },
          { id: "complex", label: "Complex" },
          { id: "neither", label: "Neither" },
        ],
        items: [
          { id: "salt", label: "Salt dissolves in water.", clue: "One idea", group: "simple" },
          { id: "mix", label: "The trail mix has parts you can see.", clue: "One idea", group: "simple" },
          { id: "sugar", label: "The sugar dissolved, and the water looked clear.", clue: "Uses and", group: "compound" },
          { id: "when", label: "When the parts settle, you can see them.", clue: "Uses when", group: "complex" },
          { id: "frag1", label: "Because the salt dissolved", clue: "Not finished", group: "neither" },
          { id: "frag2", label: "And the water looked clear", clue: "Not finished", group: "neither" },
        ],
      },
    ],
    venn: {
      hint: "The center uses both kinds of joining words. A phrase with no sentence stays outside.",
      labels: [
        { id: "coord", text: "Uses and, but, or or" },
        { id: "sub", text: "Uses because, when, or if" },
      ],
      items: [
        { id: "rabbit", label: "The rabbit ran, and the hawk missed.", sets: ["coord"] },
        { id: "panda", label: "The panda sat, but it ate bamboo.", sets: ["coord"] },
        { id: "seal", label: "When the seal dives, it hunts.", sets: ["sub"] },
        { id: "both", label: "I stayed in because it rained, and I read.", sets: ["coord", "sub"] },
        { id: "ocean", label: "the deep ocean", sets: [] },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "kind", text: "The kind of sentence" },
          { id: "long", text: "How long it is" },
          { id: "topic", text: "The science topic" },
        ],
        answer: "kind",
      },
      multi: {
        prompt: "Which are complex sentences?",
        choices: [
          { id: "seal", text: "When the seal dives, it hunts fish." },
          { id: "bear", text: "The bear rests because it ate." },
          { id: "panda", text: "The panda looks like a bear, but it eats plants." },
          { id: "frag", text: "Because the salt dissolved" },
        ],
        answers: ["seal", "bear"],
      },
      inline: {
        before: "Because, when, and if can build a",
        after: "sentence.",
        choices: [
          { id: "complex", text: "complex" },
          { id: "simple", text: "simple" },
          { id: "fragment", text: "fragment" },
        ],
        answer: "complex",
      },
    },
  },
  {
    id: "SCI-5.6B-CL",
    subject: "Science",
    grade: "Grade 5",
    title: "Mixed or dissolved",
    teks: "5.6B and 5.6C",
    pages: [
      {
        rule: "Sort by parts you can see, or parts that dissolved.",
        notThis: "A clear liquid can still be mixed.",
        hint: "Looking like one liquid is not the rule. Salt can dissolve and still be there.",
        groups: [
          { id: "see", label: "You can see the parts" },
          { id: "dissolved", label: "The parts dissolved" },
        ],
        items: [
          { id: "trail", label: "Trail mix", clue: "Looks like a snack", group: "see", image: "/lab/trail.jpg" },
          { id: "iron", label: "Iron filings and sand", clue: "Looks like dirt", group: "see", image: "/lab/iron.jpg" },
          { id: "sand", label: "Sand and water", clue: "Looks cloudy", group: "see", image: "/lab/sand.jpg" },
          { id: "salad", label: "Salad", clue: "Looks like lunch", group: "see", image: "/lab/salad.jpg" },
          { id: "salt", label: "Salt water", clue: "Looks like plain water", group: "dissolved", image: "/lab/salt.jpg" },
          { id: "sugar", label: "Sugar water", clue: "Looks like plain water", group: "dissolved", image: "/lab/sugar.jpg" },
        ],
      },
      {
        rule: "Sort by parts you can see, or parts that dissolved.",
        notThis: "Clear does not always mean dissolved.",
        hint: "Pure water was never mixed. Oil and water still show two parts.",
        groups: [
          { id: "see", label: "You can see the parts" },
          { id: "dissolved", label: "The parts dissolved" },
          { id: "neither", label: "Not a mixture" },
        ],
        items: [
          { id: "oil", label: "Oil and water", clue: "Two liquids", group: "see", image: "/lab/oil.jpg" },
          { id: "cookie", label: "Chocolate chip cookie", clue: "Chips you can see", group: "see", image: "/lab/cookie.jpg" },
          { id: "salt2", label: "Salt water", clue: "Looks clear", group: "dissolved", image: "/lab/salt.jpg" },
          { id: "mix", label: "Drink mix in water", clue: "Looks like one drink", group: "dissolved", image: "/lab/drink.jpg" },
          { id: "pure", label: "Pure water", clue: "Looks clear", group: "neither", image: "/lab/pure.jpg" },
          { id: "wire", label: "A copper wire", clue: "One metal", group: "neither", image: "/lab/wire.jpg" },
        ],
      },
    ],
    venn: {
      hint: "A solution is still a mixture. Pure water is outside both circles.",
      labels: [
        { id: "mixture", text: "It is a mixture" },
        { id: "solution", text: "It is a solution" },
      ],
      items: [
        { id: "trail", label: "Trail mix", sets: ["mixture"] },
        { id: "iron", label: "Iron filings and sand", sets: ["mixture"] },
        { id: "oil", label: "Oil and water", sets: ["mixture"] },
        { id: "salt", label: "Salt water", sets: ["mixture", "solution"] },
        { id: "sugar", label: "Sugar water", sets: ["mixture", "solution"] },
        { id: "pure", label: "Pure water", sets: [] },
      ],
      mc: {
        prompt: "Which rule did the card use?",
        choices: [
          { id: "mix", text: "How the parts are mixed" },
          { id: "liquid", text: "Whether it is a liquid" },
          { id: "color", text: "The color" },
        ],
        answer: "mix",
      },
      multi: {
        prompt: "Which are both a mixture and a solution?",
        choices: [
          { id: "salt", text: "Salt water" },
          { id: "sugar", text: "Sugar water" },
          { id: "trail", text: "Trail mix" },
          { id: "pure", text: "Pure water" },
        ],
        answers: ["salt", "sugar"],
      },
      inline: {
        before: "Salt water looks like one thing, but it is still a",
        after: ".",
        choices: [
          { id: "mixture", text: "mixture" },
          { id: "rock", text: "rock" },
          { id: "pure", text: "sample of pure water" },
        ],
        answer: "mixture",
      },
    },
  },
  // Sept 24, 2026: Classification Lab cases 9-81 (from ClassificationLab_Cases/). No images yet.
  {
    "id": "SCI-3.7A-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Push, pull, or reach",
    "teks": "3.7A",
    "pages": [
      {
        "rule": "Sort each picture by the kind of force it shows.",
        "notThis": "Ending up touching is not the rule. Could the force still work across a gap?",
        "groups": [
          {
            "id": "contact",
            "label": "Contact force"
          },
          {
            "id": "distance",
            "label": "Force at a distance"
          }
        ],
        "items": [
          {
            "id": "kick",
            "label": "Kick a soccer ball",
            "clue": "The ball flies far away",
            "group": "contact"
          },
          {
            "id": "door",
            "label": "Push a door open",
            "clue": "Just a small, gentle push",
            "group": "contact"
          },
          {
            "id": "wagon",
            "label": "Pull a wagon by its handle",
            "clue": "The wagon rolls across the yard",
            "group": "contact"
          },
          {
            "id": "fridge",
            "label": "A magnet pulls itself onto the fridge door.",
            "clue": "It touches the fridge door",
            "group": "distance"
          },
          {
            "id": "apple",
            "label": "An apple falls from a tree",
            "clue": "It lands on the ground",
            "group": "distance"
          },
          {
            "id": "repel",
            "label": "Two magnets push each other apart",
            "clue": "It is a push",
            "group": "distance"
          }
        ]
      },
      {
        "rule": "Sort by the kind of force. Some pictures do not show a force.",
        "notThis": "Being far away does not make it a force at a distance. Is it really a push or a pull?",
        "groups": [
          {
            "id": "contact",
            "label": "Contact force"
          },
          {
            "id": "distance",
            "label": "Force at a distance"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "rain",
            "label": "A raindrop falls from a cloud",
            "clue": "It splashes on the ground",
            "group": "distance"
          },
          {
            "id": "nail",
            "label": "A magnet pulls a nail through paper",
            "clue": "The paper is in the way",
            "group": "distance"
          },
          {
            "id": "leash",
            "label": "A dog pulls on its leash",
            "clue": "The dog is far ahead",
            "group": "contact"
          },
          {
            "id": "sail",
            "label": "Wind pushes a sailboat",
            "clue": "You cannot see the wind",
            "group": "contact"
          },
          {
            "id": "sunshine",
            "label": "Sunshine warms a sidewalk",
            "clue": "The sun is very far away",
            "group": "neither"
          },
          {
            "id": "nightlight",
            "label": "A night-light glows in a dark room",
            "clue": "Light fills the whole room",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "pull",
          "text": "Is a pull"
        },
        {
          "id": "gap",
          "text": "Works without touching"
        }
      ],
      "items": [
        {
          "id": "leafV",
          "label": "A leaf falls to the ground",
          "sets": [
            "pull",
            "gap"
          ]
        },
        {
          "id": "clipV",
          "label": "A magnet pulls a paper clip closer",
          "sets": [
            "pull",
            "gap"
          ]
        },
        {
          "id": "ropeV",
          "label": "Two kids tug on a rope",
          "sets": [
            "pull"
          ]
        },
        {
          "id": "repelV",
          "label": "Two ring magnets push apart on a stick",
          "sets": [
            "gap"
          ]
        },
        {
          "id": "swingV",
          "label": "Push a friend on a swing",
          "sets": []
        },
        {
          "id": "lampV",
          "label": "A lamp lights up a desk",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A magnet is stuck to the refrigerator door. It is touching the door. What kind of force pulls the magnet to the door?",
        "choices": [
          {
            "id": "yes",
            "text": "A force at a distance, because a magnet's pull works across a gap."
          },
          {
            "id": "trap",
            "text": "A contact force, because the magnet is touching the door."
          },
          {
            "id": "no",
            "text": "It is not a force at all."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all of the pictures that show forces at a distance.",
        "choices": [
          {
            "id": "grav",
            "text": "Gravity pulls a ball down toward the ground."
          },
          {
            "id": "mag",
            "text": "A magnet pulls a metal pin closer."
          },
          {
            "id": "cart",
            "text": "A hand pushes a heavy shopping cart."
          },
          {
            "id": "bat",
            "text": "A baseball bat hits a flying baseball."
          }
        ],
        "answers": [
          "grav",
          "mag"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what kind of force it is"
          },
          {
            "id": "trap",
            "text": "whether things end up touching"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-3.8A-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Kinds of energy",
    "teks": "3.8A",
    "pages": [
      {
        "rule": "Sort by the main energy each one gives off.",
        "notThis": "How you turn it on is not the rule. What comes out of it?",
        "groups": [
          {
            "id": "light",
            "label": "Light energy"
          },
          {
            "id": "sound",
            "label": "Sound energy"
          }
        ],
        "items": [
          {
            "id": "flashlight",
            "label": "Flashlight",
            "clue": "It gets a little warm",
            "group": "light"
          },
          {
            "id": "glowstick",
            "label": "Glow stick",
            "clue": "You bend it to turn it on",
            "group": "light"
          },
          {
            "id": "firefly",
            "label": "Firefly",
            "clue": "It flies all around",
            "group": "light"
          },
          {
            "id": "drum",
            "label": "Drum",
            "clue": "You hit it with sticks",
            "group": "sound"
          },
          {
            "id": "whistle",
            "label": "Whistle",
            "clue": "You blow air into it",
            "group": "sound"
          },
          {
            "id": "chimes",
            "label": "Wind chimes",
            "clue": "The wind moves them",
            "group": "sound"
          }
        ]
      },
      {
        "rule": "Sort by the main energy. Some give off neither.",
        "notThis": "Warm or moving is not light or sound.",
        "groups": [
          {
            "id": "light",
            "label": "Light energy"
          },
          {
            "id": "sound",
            "label": "Sound energy"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "clap",
            "label": "Hands clapping",
            "clue": "Your hands move fast",
            "group": "sound"
          },
          {
            "id": "guitar",
            "label": "Guitar string plucked",
            "clue": "You move it with a finger",
            "group": "sound"
          },
          {
            "id": "nightlt",
            "label": "Night-light",
            "clue": "It plugs into the wall",
            "group": "light"
          },
          {
            "id": "stars",
            "label": "Glow-in-the-dark star stickers",
            "clue": "They are not plugged in",
            "group": "light"
          },
          {
            "id": "heatpad",
            "label": "Heating pad",
            "clue": "It plugs into the wall",
            "group": "neither"
          },
          {
            "id": "kite",
            "label": "Kite in the wind",
            "clue": "It is bright and colorful",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "light",
          "text": "Gives off light"
        },
        {
          "id": "sound",
          "text": "Gives off sound"
        }
      ],
      "items": [
        {
          "id": "fireworksV",
          "label": "Fireworks",
          "sets": [
            "light",
            "sound"
          ]
        },
        {
          "id": "tvV",
          "label": "A TV playing a cartoon",
          "sets": [
            "light",
            "sound"
          ]
        },
        {
          "id": "candleV",
          "label": "Candle flame",
          "sets": [
            "light"
          ]
        },
        {
          "id": "birdV",
          "label": "A bird singing",
          "sets": [
            "sound"
          ]
        },
        {
          "id": "hornV",
          "label": "A bicycle bell rings.",
          "sets": [
            "sound"
          ]
        },
        {
          "id": "bottleV",
          "label": "Hot water bottle",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A flashlight gets a little warm when it is on. What energy does it mainly give off?",
        "choices": [
          {
            "id": "yes",
            "text": "Light energy"
          },
          {
            "id": "trap",
            "text": "Thermal energy, because it feels warm"
          },
          {
            "id": "no",
            "text": "Sound energy"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all that give off sound energy.",
        "choices": [
          {
            "id": "dog",
            "text": "A barking dog"
          },
          {
            "id": "bell",
            "text": "A ringing school bell"
          },
          {
            "id": "glow",
            "text": "A glow stick"
          },
          {
            "id": "pad",
            "text": "A heating pad"
          }
        ],
        "answers": [
          "dog",
          "bell"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the main energy it gives off"
          },
          {
            "id": "trap",
            "text": "how it feels or moves"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-3.10C-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Fast or slow",
    "teks": "3.10C",
    "pages": [
      {
        "rule": "Sort each picture by how quickly the land changes.",
        "notThis": "A bigger change is not always a faster change. Think about the amount of time it takes.",
        "groups": [
          {
            "id": "fast",
            "label": "Fast change"
          },
          {
            "id": "slow",
            "label": "Slow change"
          }
        ],
        "items": [
          {
            "id": "quake",
            "label": "Earthquake",
            "clue": "Only a small crack",
            "group": "fast"
          },
          {
            "id": "volcano",
            "label": "Volcano erupts",
            "clue": "Hot, glowing lava",
            "group": "fast"
          },
          {
            "id": "landslide",
            "label": "Small landslide",
            "clue": "Only a little dirt moves",
            "group": "fast"
          },
          {
            "id": "canyon",
            "label": "River makes a canyon",
            "clue": "It is huge and deep.",
            "group": "slow"
          },
          {
            "id": "windrock",
            "label": "Wind wears down a rock",
            "clue": "It makes a cool shape",
            "group": "slow"
          },
          {
            "id": "cliff",
            "label": "Waves wear away a cliff",
            "clue": "Waves crash every day",
            "group": "slow"
          }
        ]
      },
      {
        "rule": "Sort by how quickly the land changes. Some pictures show no change to the land.",
        "notThis": "Water, wind, and weather are not the rule. The amount of time is what matters.",
        "groups": [
          {
            "id": "fast",
            "label": "Fast change"
          },
          {
            "id": "slow",
            "label": "Slow change"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "flood",
            "label": "Flood",
            "clue": "It is just water",
            "group": "fast"
          },
          {
            "id": "sinkhole",
            "label": "Sinkhole opens",
            "clue": "A round hole in a yard",
            "group": "fast"
          },
          {
            "id": "rockfall",
            "label": "Rock falls off a cliff",
            "clue": "Just one rock",
            "group": "fast"
          },
          {
            "id": "roots",
            "label": "Roots crack a rock",
            "clue": "Plants are soft",
            "group": "slow"
          },
          {
            "id": "dune",
            "label": "Sand dune moves",
            "clue": "Wind blows every day",
            "group": "slow"
          },
          {
            "id": "clouds",
            "label": "Dark clouds roll in",
            "clue": "The sky changes fast",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "fast",
          "text": "Changes land fast"
        },
        {
          "id": "water",
          "text": "Moving water does it"
        }
      ],
      "items": [
        {
          "id": "floodV",
          "label": "Flood washes out a road",
          "sets": [
            "fast",
            "water"
          ]
        },
        {
          "id": "quakeV",
          "label": "Earthquake",
          "sets": [
            "fast"
          ]
        },
        {
          "id": "volcanoV",
          "label": "Volcano erupts",
          "sets": [
            "fast"
          ]
        },
        {
          "id": "canyonV",
          "label": "River carves a canyon",
          "sets": [
            "water"
          ]
        },
        {
          "id": "beachV",
          "label": "Waves slowly smooth rocks into pebbles.",
          "sets": [
            "water"
          ]
        },
        {
          "id": "windV",
          "label": "Wind shapes a rock",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A river carved a huge, deep canyon. It took millions of years to happen. What kind of change is this?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a slow change, because it took a long time."
          },
          {
            "id": "trap",
            "text": "It is a fast change, because the canyon is enormous."
          },
          {
            "id": "no",
            "text": "It is not really a change to the land."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the changes that can happen to the land quickly.",
        "choices": [
          {
            "id": "mud",
            "text": "A mudslide slides down a muddy hill."
          },
          {
            "id": "ice",
            "text": "Ice cracks a rock over many cold winters."
          },
          {
            "id": "erupt",
            "text": "A volcano erupts and pours out hot lava."
          },
          {
            "id": "sand",
            "text": "Wind wears a rock into an arch over thousands of years."
          }
        ],
        "answers": [
          "mud",
          "erupt"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how fast the land changes"
          },
          {
            "id": "trap",
            "text": "how big the change is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-3.11C-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Keep it or remake it",
    "teks": "3.11C",
    "pages": [
      {
        "rule": "Sort by what happens to each object.",
        "notThis": "Looking the same at the end is not the rule. Was it broken down?",
        "groups": [
          {
            "id": "reuse",
            "label": "Reuse"
          },
          {
            "id": "recycle",
            "label": "Recycle"
          }
        ],
        "items": [
          {
            "id": "jarpencil",
            "label": "Keep pencils in an old glass jar",
            "clue": "It was headed for the bin",
            "group": "reuse"
          },
          {
            "id": "coat",
            "label": "Wear your cousin's old coat",
            "clue": "It is new to you",
            "group": "reuse"
          },
          {
            "id": "refill",
            "label": "Refill a water bottle",
            "clue": "It is made of plastic",
            "group": "reuse"
          },
          {
            "id": "glass",
            "label": "Old jars are melted into new jars",
            "clue": "Still a glass jar",
            "group": "recycle"
          },
          {
            "id": "fleece",
            "label": "Plastic bottles become a fleece jacket",
            "clue": "You can wear it",
            "group": "recycle"
          },
          {
            "id": "tires",
            "label": "Old tires are ground into playground mats",
            "clue": "Kids use it every day",
            "group": "recycle"
          }
        ]
      },
      {
        "rule": "Sort by what happens. Some are neither.",
        "notThis": "A new job is not the same as a new material.",
        "groups": [
          {
            "id": "reuse",
            "label": "Reuse"
          },
          {
            "id": "recycle",
            "label": "Recycle"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "rag",
            "label": "Cut an old T-shirt into cleaning rags",
            "clue": "You turn it into something",
            "group": "reuse"
          },
          {
            "id": "shoes",
            "label": "Give outgrown shoes to a friend",
            "clue": "They leave your house",
            "group": "reuse"
          },
          {
            "id": "cardboard",
            "label": "Old boxes are mashed into new boxes",
            "clue": "Still a box",
            "group": "recycle"
          },
          {
            "id": "bench",
            "label": "Milk jugs are melted into a park bench",
            "clue": "It lasts a long time",
            "group": "recycle"
          },
          {
            "id": "water",
            "label": "Turn off the water while you brush",
            "clue": "It saves water",
            "group": "neither"
          },
          {
            "id": "crackers",
            "label": "Buy one big box, not many small bags",
            "clue": "You still get crackers",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "form",
          "text": "Changes its form"
        },
        {
          "id": "keep",
          "text": "Stays out of trash"
        }
      ],
      "items": [
        {
          "id": "jarsV",
          "label": "Melt old jars into new jars",
          "sets": [
            "form",
            "keep"
          ]
        },
        {
          "id": "tiresV",
          "label": "Grind old tires into playground mats",
          "sets": [
            "form",
            "keep"
          ]
        },
        {
          "id": "bottleV",
          "label": "Refill a water bottle",
          "sets": [
            "keep"
          ]
        },
        {
          "id": "coatV",
          "label": "Wear your sister's old coat",
          "sets": [
            "keep"
          ]
        },
        {
          "id": "canV",
          "label": "Crush a can and throw it in the trash",
          "sets": [
            "form"
          ]
        },
        {
          "id": "pizzaV",
          "label": "Throw a pizza box in the trash",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Old glass jars are melted. The glass is made into new jars. Which is it?",
        "choices": [
          {
            "id": "yes",
            "text": "Recycle, because the glass was melted to make something new"
          },
          {
            "id": "trap",
            "text": "Reuse, because it is still a jar"
          },
          {
            "id": "no",
            "text": "Reduce, because it uses less glass"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all that are reuse.",
        "choices": [
          {
            "id": "fill",
            "text": "Refill a water bottle"
          },
          {
            "id": "button",
            "text": "Keep buttons in an old jar"
          },
          {
            "id": "melt",
            "text": "Melt cans to make new cans"
          },
          {
            "id": "lights",
            "text": "Turn off the lights"
          }
        ],
        "answers": [
          "fill",
          "button"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether it is used again or remade"
          },
          {
            "id": "trap",
            "text": "whether it looks the same as before"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-3.12A-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Winter moves",
    "teks": "3.12A",
    "pages": [
      {
        "rule": "Sort by how each animal gets through winter.",
        "notThis": "Being gone all winter is not the rule. Where did it go?",
        "groups": [
          {
            "id": "mig",
            "label": "Migration"
          },
          {
            "id": "hib",
            "label": "Hibernation"
          }
        ],
        "items": [
          {
            "id": "monarch",
            "label": "Monarch butterfly",
            "clue": "Rests in trees all winter",
            "group": "mig"
          },
          {
            "id": "geese",
            "label": "Canada geese",
            "clue": "Gone from the pond all winter",
            "group": "mig"
          },
          {
            "id": "crane",
            "label": "Whooping crane",
            "clue": "The tallest bird in North America",
            "group": "mig"
          },
          {
            "id": "groundhog",
            "label": "Groundhog",
            "clue": "Eats lots of plants in summer",
            "group": "hib"
          },
          {
            "id": "gsquirrel",
            "label": "Ground squirrel",
            "clue": "Runs fast in the summer",
            "group": "hib"
          },
          {
            "id": "bat",
            "label": "Little brown bat",
            "clue": "It can fly",
            "group": "hib"
          }
        ]
      },
      {
        "rule": "Sort by how each one gets through winter.",
        "notThis": "Sleeping a lot is not the same as hibernating.",
        "groups": [
          {
            "id": "mig",
            "label": "Migration"
          },
          {
            "id": "hib",
            "label": "Hibernation"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "humpback",
            "label": "Humpback whale",
            "clue": "Does not eat much all winter",
            "group": "mig"
          },
          {
            "id": "caribou",
            "label": "Caribou",
            "clue": "It walks. It cannot fly.",
            "group": "mig"
          },
          {
            "id": "woodfrog",
            "label": "Wood frog",
            "clue": "Its body freezes almost solid",
            "group": "hib"
          },
          {
            "id": "boxturtle",
            "label": "Box turtle",
            "clue": "Crawls to a safe spot first",
            "group": "hib"
          },
          {
            "id": "maple",
            "label": "Maple tree drops its leaves",
            "clue": "Looks dead all winter",
            "group": "neither"
          },
          {
            "id": "cat",
            "label": "House cat",
            "clue": "Sleeps most of the day",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "mig",
          "text": "Migrates"
        },
        {
          "id": "fly",
          "text": "Can fly"
        }
      ],
      "items": [
        {
          "id": "hummerV",
          "label": "Ruby-throated hummingbird",
          "sets": [
            "mig",
            "fly"
          ]
        },
        {
          "id": "sandhillV",
          "label": "Sandhill crane",
          "sets": [
            "mig",
            "fly"
          ]
        },
        {
          "id": "graywhaleV",
          "label": "Gray whale",
          "sets": [
            "mig"
          ]
        },
        {
          "id": "cardinalV",
          "label": "Northern cardinal",
          "sets": [
            "fly"
          ]
        },
        {
          "id": "groundhogV",
          "label": "Groundhog",
          "sets": []
        },
        {
          "id": "oakV",
          "label": "Oak tree",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Canada geese are gone from the pond all winter. What are they doing?",
        "choices": [
          {
            "id": "yes",
            "text": "Migrating to a warmer place"
          },
          {
            "id": "trap",
            "text": "Hibernating, because no one sees them"
          },
          {
            "id": "no",
            "text": "Dropping their feathers like a tree drops leaves"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all that hibernate.",
        "choices": [
          {
            "id": "hog",
            "text": "Groundhog"
          },
          {
            "id": "bat",
            "text": "Little brown bat"
          },
          {
            "id": "goose",
            "text": "Canada goose"
          },
          {
            "id": "cat",
            "text": "House cat"
          }
        ],
        "answers": [
          "hog",
          "bat"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each one gets through winter"
          },
          {
            "id": "trap",
            "text": "whether you see it in winter"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-3.12B-CL",
    "subject": "Science",
    "grade": "Grade 3",
    "title": "Who makes food?",
    "teks": "3.12B",
    "pages": [
      {
        "rule": "Sort each living thing by how it gets its food.",
        "notThis": "Being green does not mean it makes its own food.",
        "groups": [
          {
            "id": "prod",
            "label": "Producer"
          },
          {
            "id": "cons",
            "label": "Consumer"
          }
        ],
        "items": [
          {
            "id": "grass",
            "label": "Grass",
            "clue": "Cows eat it",
            "group": "prod"
          },
          {
            "id": "kelp",
            "label": "Kelp",
            "clue": "Lives in the ocean with fish",
            "group": "prod"
          },
          {
            "id": "cactus",
            "label": "Cactus",
            "clue": "It has sharp spines.",
            "group": "prod"
          },
          {
            "id": "frog",
            "label": "Green frog",
            "clue": "Green like a lily pad",
            "group": "cons"
          },
          {
            "id": "caterpillar",
            "label": "Green caterpillar",
            "clue": "Green, and lives on leaves",
            "group": "cons"
          },
          {
            "id": "cow",
            "label": "Cow",
            "clue": "Eats green grass all day",
            "group": "cons"
          }
        ]
      },
      {
        "rule": "Sort by how each one gets its food. Some of these are not alive.",
        "notThis": "Looking like a plant does not make something a producer.",
        "groups": [
          {
            "id": "prod",
            "label": "Producer"
          },
          {
            "id": "cons",
            "label": "Consumer"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "algae",
            "label": "Algae in a pond",
            "clue": "Looks like green slime",
            "group": "prod"
          },
          {
            "id": "moss",
            "label": "Moss on a rock",
            "clue": "It is tiny and has no flowers",
            "group": "prod"
          },
          {
            "id": "turtle",
            "label": "Green sea turtle",
            "clue": "Swims near seaweed",
            "group": "cons"
          },
          {
            "id": "anole",
            "label": "Green anole lizard",
            "clue": "Hides on green leaves",
            "group": "cons"
          },
          {
            "id": "sun",
            "label": "The sun",
            "clue": "Plants need it to make food",
            "group": "neither"
          },
          {
            "id": "plastic",
            "label": "Plastic plant",
            "clue": "It has green leaves and a stem",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "make",
          "text": "Makes its own food"
        },
        {
          "id": "water",
          "text": "Lives in water"
        }
      ],
      "items": [
        {
          "id": "lilyV",
          "label": "Water lily",
          "sets": [
            "make",
            "water"
          ]
        },
        {
          "id": "duckweedV",
          "label": "Duckweed",
          "sets": [
            "make",
            "water"
          ]
        },
        {
          "id": "appleV",
          "label": "Apple tree",
          "sets": [
            "make"
          ]
        },
        {
          "id": "catfishV",
          "label": "Catfish",
          "sets": [
            "water"
          ]
        },
        {
          "id": "sharkV",
          "label": "Shark",
          "sets": [
            "water"
          ]
        },
        {
          "id": "rabbitV",
          "label": "Rabbit",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A bright green frog is sitting on a lily pad. Is the frog a producer or a consumer?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a consumer, because it eats insects for food."
          },
          {
            "id": "trap",
            "text": "It is a producer, because it is green like a plant."
          },
          {
            "id": "no",
            "text": "It is neither, because a frog is not a living thing."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all of the living things that are producers.",
        "choices": [
          {
            "id": "seaweed",
            "text": "Seaweed that grows in the ocean."
          },
          {
            "id": "grass",
            "text": "Grass that grows in a field."
          },
          {
            "id": "cat",
            "text": "A green caterpillar on a leaf."
          },
          {
            "id": "rock",
            "text": "A rock sitting in a garden."
          }
        ],
        "answers": [
          "seaweed",
          "grass"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each one gets its food"
          },
          {
            "id": "trap",
            "text": "what color each one is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.3D-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Same, opposite, or sound-alike",
    "teks": "3.3D",
    "pages": [
      {
        "rule": "Sort each pair by what the words mean.",
        "notThis": "Looking alike is not the rule. Think about meaning.",
        "groups": [
          {
            "id": "syn",
            "label": "Synonyms"
          },
          {
            "id": "ant",
            "label": "Antonyms"
          }
        ],
        "items": [
          {
            "id": "big",
            "label": "big / large",
            "clue": "Both are about size",
            "group": "syn"
          },
          {
            "id": "begin",
            "label": "begin / start",
            "clue": "They look nothing alike",
            "group": "syn"
          },
          {
            "id": "sick",
            "label": "sick / ill",
            "clue": "Both are short words",
            "group": "syn"
          },
          {
            "id": "happy",
            "label": "happy / unhappy",
            "clue": "Almost the same letters",
            "group": "ant"
          },
          {
            "id": "day",
            "label": "day / night",
            "clue": "They go together",
            "group": "ant"
          },
          {
            "id": "push",
            "label": "push / pull",
            "clue": "Both can open a door",
            "group": "ant"
          }
        ]
      },
      {
        "rule": "Sort by meaning. Some pairs are neither.",
        "notThis": "Sounding the same is not meaning the same.",
        "groups": [
          {
            "id": "syn",
            "label": "Synonyms"
          },
          {
            "id": "ant",
            "label": "Antonyms"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "glad",
            "label": "glad / happy",
            "clue": "They do not rhyme",
            "group": "syn"
          },
          {
            "id": "shout",
            "label": "shout / yell",
            "clue": "Both are loud",
            "group": "syn"
          },
          {
            "id": "right",
            "label": "right / left",
            "clue": "Right sounds like write",
            "group": "ant"
          },
          {
            "id": "buy",
            "label": "buy / sell",
            "clue": "Buy sounds like by",
            "group": "ant"
          },
          {
            "id": "their",
            "label": "their / there",
            "clue": "They sound exactly alike",
            "group": "neither"
          },
          {
            "id": "sea",
            "label": "sea / see",
            "clue": "You can see the sea",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "syn",
          "text": "Synonyms"
        },
        {
          "id": "one",
          "text": "One syllable each"
        }
      ],
      "items": [
        {
          "id": "bigv",
          "label": "big / large",
          "sets": [
            "syn",
            "one"
          ]
        },
        {
          "id": "beginv",
          "label": "begin / start",
          "sets": [
            "syn"
          ]
        },
        {
          "id": "little",
          "label": "little / small",
          "sets": [
            "syn"
          ]
        },
        {
          "id": "hot",
          "label": "hot / cold",
          "sets": [
            "one"
          ]
        },
        {
          "id": "seav",
          "label": "sea / see",
          "sets": [
            "one"
          ]
        },
        {
          "id": "sad",
          "label": "happy / sad",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Are “flour / flower” synonyms?",
        "choices": [
          {
            "id": "yes",
            "text": "No. They sound the same but mean different things."
          },
          {
            "id": "trap",
            "text": "Yes. They sound exactly the same."
          },
          {
            "id": "no",
            "text": "No. They are antonyms."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the pairs that are antonyms.",
        "choices": [
          {
            "id": "loud",
            "text": "loud / quiet"
          },
          {
            "id": "up",
            "text": "up / down"
          },
          {
            "id": "close",
            "text": "close / shut"
          },
          {
            "id": "hear",
            "text": "hear / here"
          },
          {
            "id": "wet",
            "text": "wet / dry"
          }
        ],
        "answers": [
          "loud",
          "up",
          "wet"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the two words mean"
          },
          {
            "id": "trap",
            "text": "how the two words sound"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.6F-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Mad or sad?",
    "teks": "3.6F",
    "pages": [
      {
        "rule": "Read what the character does and says. Pick the feeling.",
        "notThis": "One clue is not enough. Use every clue.",
        "groups": [
          {
            "id": "mad",
            "label": "Feels mad"
          },
          {
            "id": "sad",
            "label": "Feels sad"
          }
        ],
        "items": [
          {
            "id": "door",
            "label": "Max slammed the door. He stomped up the stairs.",
            "clue": "He wants to be alone",
            "group": "mad"
          },
          {
            "id": "glare",
            "label": "Kim crossed her arms and glared at her brother. She would not speak to him.",
            "clue": "She is very quiet",
            "group": "mad"
          },
          {
            "id": "unfair",
            "label": "Omar's face turned red. He yelled, \"That's not fair!\"",
            "clue": "He is loud",
            "group": "mad"
          },
          {
            "id": "goodbye",
            "label": "Lena hugged her dog goodbye. Tears ran down her face as the car pulled away.",
            "clue": "Her face is wet",
            "group": "sad"
          },
          {
            "id": "lunch",
            "label": "Ava sat alone at lunch. She pushed her food away and stared at the floor.",
            "clue": "She is not hungry",
            "group": "sad"
          },
          {
            "id": "balloon",
            "label": "Ben's balloon floated away. His lip shook as he whispered, \"It was my favorite.\"",
            "clue": "It is just a balloon",
            "group": "sad"
          }
        ]
      },
      {
        "rule": "Read what the character does and says. Some feel something else.",
        "notThis": "Tears do not always mean sad. Look at all the clues.",
        "groups": [
          {
            "id": "mad",
            "label": "Feels mad"
          },
          {
            "id": "sad",
            "label": "Feels sad"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "book",
            "label": "Nico slammed his book shut. He growled, \"This homework is dumb!\"",
            "clue": "He is done reading",
            "group": "mad"
          },
          {
            "id": "markers",
            "label": "Tess found her sister using her markers again. She stomped and shouted, \"Give them back!\"",
            "clue": "Her sister has markers",
            "group": "mad"
          },
          {
            "id": "lost",
            "label": "The team lost the big game. Eli walked off slowly with his head down.",
            "clue": "He does not yell",
            "group": "sad"
          },
          {
            "id": "moved",
            "label": "Rosa's best friend moved away. Rosa sat by the window and cried all afternoon.",
            "clue": "She has tears",
            "group": "sad"
          },
          {
            "id": "baby",
            "label": "Dad cried as he held his new baby. He smiled and said, \"She's perfect.\"",
            "clue": "Tears on his face",
            "group": "neither"
          },
          {
            "id": "stage",
            "label": "Leo's knees shook as he walked on stage. He whispered, \"What if I forget?\"",
            "clue": "His body is shaking",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "upset",
          "text": "Character is upset"
        },
        {
          "id": "named",
          "text": "Feeling word is named"
        }
      ],
      "items": [
        {
          "id": "kaiV",
          "label": "Kai shouted, \"I am so angry!\"",
          "sets": [
            "upset",
            "named"
          ]
        },
        {
          "id": "fishV",
          "label": "Ella felt sad when her fish died.",
          "sets": [
            "upset",
            "named"
          ]
        },
        {
          "id": "batV",
          "label": "Zoe threw her bat down after she struck out.",
          "sets": [
            "upset"
          ]
        },
        {
          "id": "coneV",
          "label": "Lily cried when her ice cream fell on the ground.",
          "sets": [
            "upset"
          ]
        },
        {
          "id": "poemV",
          "label": "Pia felt proud as she read her poem aloud.",
          "sets": [
            "named"
          ]
        },
        {
          "id": "puppyV",
          "label": "Ty jumped up and down when he saw the new puppy.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Grandma cried when Ben won the race. She cheered and clapped. How does she feel?",
        "choices": [
          {
            "id": "yes",
            "text": "Proud and happy"
          },
          {
            "id": "trap",
            "text": "Sad, because she cried"
          },
          {
            "id": "no",
            "text": "Mad at Ben"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the clues that show a character feels mad.",
        "choices": [
          {
            "id": "slam",
            "text": "Slams a door"
          },
          {
            "id": "stomp",
            "text": "Stomps away"
          },
          {
            "id": "floor",
            "text": "Stares at the floor"
          },
          {
            "id": "glare",
            "text": "Crosses arms and glares"
          },
          {
            "id": "smile",
            "text": "Smiles with tears"
          }
        ],
        "answers": [
          "slam",
          "stomp",
          "glare"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the feeling all the clues show"
          },
          {
            "id": "trap",
            "text": "whether the character cries"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.8A-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Theme or topic?",
    "teks": "3.8A",
    "pages": [
      {
        "rule": "Read each idea carefully. Is it a theme or a topic?",
        "notThis": "An important word is not a message. A theme says something about life.",
        "groups": [
          {
            "id": "theme",
            "label": "Theme"
          },
          {
            "id": "topic",
            "label": "Topic"
          }
        ],
        "items": [
          {
            "id": "forgive",
            "label": "Good friends forgive each other when they make mistakes.",
            "clue": "Uses the word friends",
            "group": "theme"
          },
          {
            "id": "work",
            "label": "Hard work pays off.",
            "clue": "Only four words",
            "group": "theme"
          },
          {
            "id": "askhelp",
            "label": "It is okay to ask other people for help.",
            "clue": "No big words in it",
            "group": "theme"
          },
          {
            "id": "friendship",
            "label": "Friendship",
            "clue": "A very important idea",
            "group": "topic"
          },
          {
            "id": "brave",
            "label": "Being brave",
            "clue": "Sounds like a lesson",
            "group": "topic"
          },
          {
            "id": "family",
            "label": "Family",
            "clue": "The story is full of it",
            "group": "topic"
          }
        ]
      },
      {
        "rule": "Read each idea carefully. Some ideas fit neither group.",
        "notThis": "A full sentence is not always a theme. Some sentences just tell what happens.",
        "groups": [
          {
            "id": "theme",
            "label": "Theme"
          },
          {
            "id": "topic",
            "label": "Topic"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "truth",
            "label": "Telling the truth is always the best choice.",
            "clue": "Sounds like a fact",
            "group": "theme"
          },
          {
            "id": "kind",
            "label": "One small act of kindness can change someone's whole day.",
            "clue": "It is about kindness",
            "group": "theme"
          },
          {
            "id": "sharing",
            "label": "Sharing",
            "clue": "Kids share in the story",
            "group": "topic"
          },
          {
            "id": "pets",
            "label": "Pets",
            "clue": "The story has a dog",
            "group": "topic"
          },
          {
            "id": "lunch",
            "label": "Max lost his new lunch box on the way to school.",
            "clue": "A full sentence",
            "group": "neither"
          },
          {
            "id": "bus",
            "label": "Lily and Sam get into a fight on the school bus.",
            "clue": "It is about friendship",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "theme",
          "text": "Theme"
        },
        {
          "id": "friend",
          "text": "Uses the word friend"
        }
      ],
      "items": [
        {
          "id": "truefriend",
          "label": "A true friend sticks by you no matter what happens.",
          "sets": [
            "theme",
            "friend"
          ]
        },
        {
          "id": "hardtimes",
          "label": "A good friend helps you when times are hard.",
          "sets": [
            "theme",
            "friend"
          ]
        },
        {
          "id": "dreams",
          "label": "Never give up on your dreams, even when things get difficult.",
          "sets": [
            "theme"
          ]
        },
        {
          "id": "newfriend",
          "label": "Making a new friend",
          "sets": [
            "friend"
          ]
        },
        {
          "id": "ana",
          "label": "Ana eats lunch with her best friend every day.",
          "sets": [
            "friend"
          ]
        },
        {
          "id": "winter",
          "label": "Winter",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A story is about a boy who takes care of his dog. Which idea is a theme of the story?",
        "choices": [
          {
            "id": "yes",
            "text": "Taking care of a pet takes a lot of hard work."
          },
          {
            "id": "trap",
            "text": "Pets and friendship"
          },
          {
            "id": "no",
            "text": "The boy walks his dog around the block."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the ideas that are topics, not themes.",
        "choices": [
          {
            "id": "honesty",
            "text": "Honesty"
          },
          {
            "id": "growing",
            "text": "Growing up"
          },
          {
            "id": "bekind",
            "text": "Always be kind to other people."
          },
          {
            "id": "teamwork",
            "text": "Teamwork"
          },
          {
            "id": "game",
            "text": "The team wins the big soccer game."
          }
        ],
        "answers": [
          "honesty",
          "growing",
          "teamwork"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the idea is a full message"
          },
          {
            "id": "trap",
            "text": "how important the idea sounds"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.9A-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "What kind of story?",
    "teks": "3.9A",
    "pages": [
      {
        "rule": "Sort by what kind of story it is.",
        "notThis": "Animals do not decide it. Think about the story's job.",
        "groups": [
          {
            "id": "fable",
            "label": "Fable"
          },
          {
            "id": "myth",
            "label": "Myth"
          }
        ],
        "items": [
          {
            "id": "tortoise",
            "label": "The Tortoise and the Hare. A slow tortoise wins a race against a proud hare.",
            "clue": "Has talking animals",
            "group": "fable"
          },
          {
            "id": "crow",
            "label": "A fox tricks a crow into dropping her cheese. The story ends with a lesson.",
            "clue": "Has a sneaky animal",
            "group": "fable"
          },
          {
            "id": "ant",
            "label": "An ant works all summer while a grasshopper plays. In winter, the grasshopper has no food.",
            "clue": "Tells about the seasons",
            "group": "fable"
          },
          {
            "id": "coyote",
            "label": "Long ago, only the Fire Beings had fire, until Coyote stole some. That is why people have fire today.",
            "clue": "The main character is an animal",
            "group": "myth"
          },
          {
            "id": "zeus",
            "label": "The Greeks told how the god Zeus threw lightning bolts. It explained where storms come from.",
            "clue": "A god gets angry",
            "group": "myth"
          },
          {
            "id": "demeter",
            "label": "The goddess Demeter is sad when her daughter leaves. Her sadness makes winter come each year.",
            "clue": "A mom misses her child",
            "group": "myth"
          }
        ]
      },
      {
        "rule": "Sort by what kind of story it is. Some are neither.",
        "notThis": "Gods and animals can show up in both. Ask what the story is for.",
        "groups": [
          {
            "id": "fable",
            "label": "Fable"
          },
          {
            "id": "myth",
            "label": "Myth"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "wolf",
            "label": "A boy keeps lying that a wolf is coming. Soon, no one believes him.",
            "clue": "The main character is a person",
            "group": "fable"
          },
          {
            "id": "hercules",
            "label": "A man begs the god Hercules to free his stuck cart. Hercules tells him to push it himself.",
            "clue": "A god is in it",
            "group": "fable"
          },
          {
            "id": "raven",
            "label": "Long ago, the world was dark. Raven stole the sun and put it in the sky.",
            "clue": "The hero is a bird",
            "group": "myth"
          },
          {
            "id": "thor",
            "label": "The Norse god Thor swings his hammer across the sky. The Norse said this made thunder.",
            "clue": "A strong hero with a hammer",
            "group": "myth"
          },
          {
            "id": "cinderella",
            "label": "Cinderella. A fairy godmother helps a kind girl go to the royal ball.",
            "clue": "Has magic powers",
            "group": "neither"
          },
          {
            "id": "arthur",
            "label": "King Arthur pulls a sword from a stone. People say he was a real king long ago.",
            "clue": "Tells about a hero",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "animal",
          "text": "Has animal characters"
        },
        {
          "id": "lesson",
          "text": "Teaches a lesson"
        }
      ],
      "items": [
        {
          "id": "mouseV",
          "label": "A tiny mouse saves a lion. Even small friends can help.",
          "sets": [
            "animal",
            "lesson"
          ]
        },
        {
          "id": "pebbleV",
          "label": "A thirsty crow drops pebbles in a jar to raise the water. Being clever pays off.",
          "sets": [
            "animal",
            "lesson"
          ]
        },
        {
          "id": "turtleV",
          "label": "The Earth was made on the back of a giant turtle.",
          "sets": [
            "animal"
          ]
        },
        {
          "id": "midasV",
          "label": "King Midas wishes that all he touches turns to gold. He learns that greed is foolish.",
          "sets": [
            "lesson"
          ]
        },
        {
          "id": "swordV",
          "label": "King Arthur pulls a sword from a stone and becomes king.",
          "sets": []
        },
        {
          "id": "stormV",
          "label": "The god Zeus throws lightning bolts to make storms.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A story has a talking eagle. It explains how the sun got into the sky. What kind of story is it?",
        "choices": [
          {
            "id": "yes",
            "text": "A myth. It explains nature."
          },
          {
            "id": "trap",
            "text": "A fable. It has a talking animal."
          },
          {
            "id": "no",
            "text": "A legend about a real hero."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all that are true about fables.",
        "choices": [
          {
            "id": "lesson",
            "text": "They teach a lesson."
          },
          {
            "id": "short",
            "text": "They are often short."
          },
          {
            "id": "people",
            "text": "The characters can be people."
          },
          {
            "id": "must",
            "text": "They must have animals."
          },
          {
            "id": "storms",
            "text": "They explain where storms come from."
          }
        ],
        "answers": [
          "lesson",
          "short",
          "people"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the story is for"
          },
          {
            "id": "trap",
            "text": "which characters are in the story"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.9D-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "How is it built?",
    "teks": "3.9D(iii)",
    "pages": [
      {
        "rule": "Sort each passage by how the whole thing is built.",
        "notThis": "One signal word can trick you. Read the whole passage before you sort.",
        "groups": [
          {
            "id": "ce",
            "label": "Cause and effect"
          },
          {
            "id": "ps",
            "label": "Problem and solution"
          }
        ],
        "items": [
          {
            "id": "creek",
            "label": "It rained very hard all night long. The next morning, the creek flooded the road.",
            "clue": "Sounds like a problem",
            "group": "ce"
          },
          {
            "id": "plant",
            "label": "Maya forgot to water her plant for two weeks. Its leaves turned brown and dry.",
            "clue": "The plant is in trouble",
            "group": "ce"
          },
          {
            "id": "trash",
            "label": "A strong wind blew over the trash can. Trash spilled all over the quiet street.",
            "clue": "It makes a mess",
            "group": "ce"
          },
          {
            "id": "shelf",
            "label": "Ben could not reach his book on the top shelf. He stood on a step stool to get it.",
            "clue": "One thing leads to another",
            "group": "ps"
          },
          {
            "id": "gym",
            "label": "The class could not go outside because it was raining. The teacher set up games in the gym instead.",
            "clue": "Uses the word because",
            "group": "ps"
          },
          {
            "id": "fence",
            "label": "The dog kept escaping through a hole under the fence. Dad fixed it with a row of big rocks.",
            "clue": "Dad does something",
            "group": "ps"
          }
        ]
      },
      {
        "rule": "Sort by how each passage is built. Some passages only describe.",
        "notThis": "Some signal words can fool you. Read the whole passage very carefully.",
        "groups": [
          {
            "id": "ce",
            "label": "Cause and effect"
          },
          {
            "id": "ps",
            "label": "Problem and solution"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "snowman",
            "label": "The warm sun melted the snowman in the yard. By noon, only a carrot and a hat were left.",
            "clue": "Tells what was left",
            "group": "ce"
          },
          {
            "id": "lightning",
            "label": "Lightning hit a tall tree during the storm. The tree split in half and crashed down.",
            "clue": "About a storm",
            "group": "ce"
          },
          {
            "id": "board",
            "label": "Lily could not see the board because she sat in the back. Her teacher moved her seat to the front row.",
            "clue": "Uses the word because",
            "group": "ps"
          },
          {
            "id": "park",
            "label": "The town had no safe place for kids to play. People worked together to build a new park.",
            "clue": "Something new gets built",
            "group": "ps"
          },
          {
            "id": "garden",
            "label": "Our garden is so pretty in the summer. It has red roses, yellow daisies, and tall sunflowers.",
            "clue": "Uses the word so",
            "group": "neither"
          },
          {
            "id": "frogs",
            "label": "Frogs can jump, swim, and climb very well. Some frogs can even glide from tree to tree.",
            "clue": "Tells what frogs can do",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "ce",
          "text": "Cause and effect"
        },
        {
          "id": "bec",
          "text": "Uses the word because"
        }
      ],
      "items": [
        {
          "id": "vaseV",
          "label": "The glass vase fell off the shelf. It broke because it hit the hard floor.",
          "sets": [
            "ce",
            "bec"
          ]
        },
        {
          "id": "coneV2",
          "label": "Sam's ice cream melted quickly because the sun was hot. It dripped down his hand.",
          "sets": [
            "ce",
            "bec"
          ]
        },
        {
          "id": "powerV",
          "label": "A powerful storm knocked down the power lines. All the lights in town went out.",
          "sets": [
            "ce"
          ]
        },
        {
          "id": "busV",
          "label": "Zoe could not ride the bus because it broke down. Her mom drove her to school instead.",
          "sets": [
            "bec"
          ]
        },
        {
          "id": "owlV",
          "label": "Owls have big eyes and soft, fluffy feathers. They usually hunt for food at night.",
          "sets": []
        },
        {
          "id": "roomV",
          "label": "My bedroom has a bed, a desk, and a lamp. The walls are painted light blue.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Nia could not fly her kite because there was no wind. She ran very fast across the field to lift it up. How is this passage built?",
        "choices": [
          {
            "id": "yes",
            "text": "Problem and solution, because Nia finds a way to fix her problem."
          },
          {
            "id": "trap",
            "text": "Cause and effect, because the passage uses the word because."
          },
          {
            "id": "no",
            "text": "It is a list of facts that describe kites."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the signs that a passage is problem and solution.",
        "choices": [
          {
            "id": "trouble",
            "text": "A character has some kind of trouble."
          },
          {
            "id": "fix",
            "text": "Someone finds a way to fix the trouble."
          },
          {
            "id": "because",
            "text": "The word because is somewhere in it."
          },
          {
            "id": "list",
            "text": "It lists what something looks like."
          }
        ],
        "answers": [
          "trouble",
          "fix"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how the whole passage is built"
          },
          {
            "id": "trap",
            "text": "which signal words it uses"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.9E-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Fact or opinion?",
    "teks": "3.9E(ii)",
    "pages": [
      {
        "rule": "Sort each sentence by whether you can prove it.",
        "notThis": "Sounding very sure does not make a sentence a fact.",
        "groups": [
          {
            "id": "fact",
            "label": "Fact"
          },
          {
            "id": "opinion",
            "label": "Opinion"
          }
        ],
        "items": [
          {
            "id": "fourlegs",
            "label": "A dog is an animal with four legs.",
            "clue": "About dogs",
            "group": "fact"
          },
          {
            "id": "capital",
            "label": "Austin is the capital city of Texas.",
            "clue": "Some people love Austin",
            "group": "fact"
          },
          {
            "id": "spinach",
            "label": "Spinach is a leafy green vegetable.",
            "clue": "Many kids hate it",
            "group": "fact"
          },
          {
            "id": "bestpet",
            "label": "Dogs are the very best pets for families.",
            "clue": "It sounds very sure",
            "group": "opinion"
          },
          {
            "id": "beststate",
            "label": "Texas is the best state in the whole country.",
            "clue": "Lots of people agree",
            "group": "opinion"
          },
          {
            "id": "pizza",
            "label": "Pizza is the tastiest food in the world.",
            "clue": "Many kids say so",
            "group": "opinion"
          }
        ]
      },
      {
        "rule": "Sort by whether you can prove it. Some sentences ask something.",
        "notThis": "Strong feelings do not change a fact. Check whether you can prove it.",
        "groups": [
          {
            "id": "fact",
            "label": "Fact"
          },
          {
            "id": "opinion",
            "label": "Opinion"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "freeze",
            "label": "Pure water freezes at 32 degrees Fahrenheit.",
            "clue": "Has a number",
            "group": "fact"
          },
          {
            "id": "snake",
            "label": "Snakes are reptiles with dry, scaly skin.",
            "clue": "Many people are scared of them",
            "group": "fact"
          },
          {
            "id": "read",
            "label": "Everyone should read for 20 minutes every single day.",
            "clue": "Has a number",
            "group": "opinion"
          },
          {
            "id": "summer",
            "label": "Summer vacation is way too short for kids.",
            "clue": "Most kids agree",
            "group": "opinion"
          },
          {
            "id": "whichpet",
            "label": "Which pet is the best one to have?",
            "clue": "Has the word best",
            "group": "neither"
          },
          {
            "id": "spider",
            "label": "How many legs does a spider have?",
            "clue": "It has a real answer",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "fact",
          "text": "Fact"
        },
        {
          "id": "num",
          "text": "Has a number"
        }
      ],
      "items": [
        {
          "id": "weekV",
          "label": "A week has 7 days in it.",
          "sets": [
            "fact",
            "num"
          ]
        },
        {
          "id": "countyV",
          "label": "The state of Texas has 254 counties.",
          "sets": [
            "fact",
            "num"
          ]
        },
        {
          "id": "sunV",
          "label": "The sun is a star at the center of our solar system.",
          "sets": [
            "fact"
          ]
        },
        {
          "id": "beeV",
          "label": "Honeybees make honey and store it in their hives.",
          "sets": [
            "fact"
          ]
        },
        {
          "id": "scoopV",
          "label": "The perfect ice cream cone has exactly 3 scoops.",
          "sets": [
            "num"
          ]
        },
        {
          "id": "catV",
          "label": "Cats are much cuter than dogs.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Jada says, “Dogs are the best pets, and I am sure!” Is that a fact?",
        "choices": [
          {
            "id": "yes",
            "text": "No, it is an opinion, because nobody can prove it is true."
          },
          {
            "id": "trap",
            "text": "Yes, it is a fact, because she sounds very sure."
          },
          {
            "id": "no",
            "text": "No, it is a question, because it asks something."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the sentences that are facts you can prove.",
        "choices": [
          {
            "id": "frog",
            "text": "Frogs belong to a group of animals called amphibians."
          },
          {
            "id": "moon",
            "text": "The moon moves in a path around Earth."
          },
          {
            "id": "math",
            "text": "Math is the hardest subject in school."
          },
          {
            "id": "rain",
            "text": "Rain is the worst kind of weather."
          },
          {
            "id": "state",
            "text": "Texas is a state in the United States."
          }
        ],
        "answers": [
          "frog",
          "moon",
          "state"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether you can prove it"
          },
          {
            "id": "trap",
            "text": "how sure the writer sounds"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.10E-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Who is telling it?",
    "teks": "3.10E",
    "pages": [
      {
        "rule": "Sort each passage by who is telling the story.",
        "notThis": "Words inside quotation marks show a character talking. Check who the narrator is instead.",
        "groups": [
          {
            "id": "first",
            "label": "First person"
          },
          {
            "id": "third",
            "label": "Third person"
          }
        ],
        "items": [
          {
            "id": "busride",
            "label": "I raced to the bus stop this morning. My heavy backpack bounced on my back.",
            "clue": "About a bus ride",
            "group": "first"
          },
          {
            "id": "cake",
            "label": "We baked a birthday cake for Mom yesterday. It came out a little lopsided.",
            "clue": "Mom is in it",
            "group": "first"
          },
          {
            "id": "farm",
            "label": "My grandma lives on a farm in the country. I usually visit her every May.",
            "clue": "All about Grandma",
            "group": "first"
          },
          {
            "id": "hawk",
            "label": "Tom looked up at the cloudy sky. He saw a hawk circling above the trees.",
            "clue": "Tom is the main character",
            "group": "third"
          },
          {
            "id": "key",
            "label": "Rosa yelled, “I found it!” She proudly held up the missing key.",
            "clue": "It has the word I",
            "group": "third"
          },
          {
            "id": "apple",
            "label": "“I am really hungry,” said Ben after soccer practice. He grabbed a shiny red apple.",
            "clue": "Ben says I",
            "group": "third"
          }
        ]
      },
      {
        "rule": "Sort each passage by who tells the story. Some fit neither group.",
        "notThis": "Look carefully at the narrator's words, not only at what characters say.",
        "groups": [
          {
            "id": "first",
            "label": "First person"
          },
          {
            "id": "third",
            "label": "Third person"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "pip",
            "label": "My cat, Pip, hid under my bed for the whole afternoon.",
            "clue": "Pip is the main character",
            "group": "first"
          },
          {
            "id": "askbro",
            "label": "“Can I come to the store?” I asked my older brother.",
            "clue": "Someone is talking",
            "group": "first"
          },
          {
            "id": "pedal",
            "label": "“You can do it!” Dad told Mia at the park. She kept pedaling up the steep hill.",
            "clue": "It has the word you",
            "group": "third"
          },
          {
            "id": "park",
            "label": "The girls raced each other to the park. They played on the swings until dark.",
            "clue": "No names are used",
            "group": "third"
          },
          {
            "id": "door",
            "label": "You slowly open the heavy wooden door. You see a big, dark, empty room.",
            "clue": "It tells a story",
            "group": "neither"
          },
          {
            "id": "hero",
            "label": "You are the hero of this exciting adventure story. Turn the page to find out what happens!",
            "clue": "It is about a hero",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "first",
          "text": "First person"
        },
        {
          "id": "talk",
          "text": "A character is talking"
        }
      ],
      "items": [
        {
          "id": "waitkim",
          "label": "“Wait for me!” I shouted to my friend Kim.",
          "sets": [
            "first",
            "talk"
          ]
        },
        {
          "id": "bedtime",
          "label": "Mom said, “It is time for bed.” I groaned and slowly closed my book.",
          "sets": [
            "first",
            "talk"
          ]
        },
        {
          "id": "puddle",
          "label": "I love rainy days more than sunny ones. I jump in every puddle I see.",
          "sets": [
            "first"
          ]
        },
        {
          "id": "cold",
          "label": "“I am so cold,” said Max on the windy walk home. He zipped up his coat.",
          "sets": [
            "talk"
          ]
        },
        {
          "id": "jen",
          "label": "“Let's go to the pond!” Jen called to her cousins. She ran ahead down the path.",
          "sets": [
            "talk"
          ]
        },
        {
          "id": "dig",
          "label": "The dog dug a deep hole in the backyard. Then it curled up and took a nap.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "“I won the race!” shouted Ava. She proudly held up her blue ribbon. Who is telling this story?",
        "choices": [
          {
            "id": "yes",
            "text": "Third person, because a narrator outside the story tells about Ava."
          },
          {
            "id": "trap",
            "text": "First person, because the passage has the word I in it."
          },
          {
            "id": "no",
            "text": "Second person, because the narrator talks straight to you."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the clues that show a story is told in first person.",
        "choices": [
          {
            "id": "iwe",
            "text": "The narrator uses the words I or we."
          },
          {
            "id": "mine",
            "text": "The narrator uses the words my or me."
          },
          {
            "id": "inside",
            "text": "The narrator is a character in the story."
          },
          {
            "id": "quote",
            "text": "A character says I inside quotation marks."
          },
          {
            "id": "heshe",
            "text": "The narrator uses the words he or she."
          }
        ],
        "answers": [
          "iwe",
          "mine",
          "inside"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "who tells the story"
          },
          {
            "id": "trap",
            "text": "who says the word I"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-3.11D-CL",
    "subject": "ELAR",
    "grade": "Grade 3",
    "title": "Word jobs",
    "teks": "3.11D(iii)",
    "pages": [
      {
        "rule": "Sort each sentence by the job of the CAPITAL word.",
        "notThis": "The same word can do different jobs. Read the whole sentence carefully first.",
        "groups": [
          {
            "id": "noun",
            "label": "Noun"
          },
          {
            "id": "verb",
            "label": "Verb"
          }
        ],
        "items": [
          {
            "id": "walkn",
            "label": "After dinner, our family went for a long WALK.",
            "clue": "Your legs do this",
            "group": "noun"
          },
          {
            "id": "play",
            "label": "The school PLAY had a king and a dragon in it.",
            "clue": "Kids play at recess",
            "group": "noun"
          },
          {
            "id": "hug",
            "label": "Mom gave me a big HUG before school this morning.",
            "clue": "You do it with your arms",
            "group": "noun"
          },
          {
            "id": "walkv",
            "label": "We WALK to school together every morning.",
            "clue": "You can go on one",
            "group": "verb"
          },
          {
            "id": "fly",
            "label": "Many birds FLY south when the weather turns cold.",
            "clue": "A fly is a bug",
            "group": "verb"
          },
          {
            "id": "drink",
            "label": "I DRINK a glass of cold milk with breakfast.",
            "clue": "Milk is a drink",
            "group": "verb"
          }
        ]
      },
      {
        "rule": "Sort each sentence by the word's job. Some words fit neither group.",
        "notThis": "Check the word's job in this sentence, not in other sentences.",
        "groups": [
          {
            "id": "noun",
            "label": "Noun"
          },
          {
            "id": "verb",
            "label": "Verb"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "dream",
            "label": "I had a strange DREAM about talking animals last night.",
            "clue": "You dream when you sleep",
            "group": "noun"
          },
          {
            "id": "brush",
            "label": "A green BRUSH is sitting on the bathroom sink.",
            "clue": "You brush your teeth",
            "group": "noun"
          },
          {
            "id": "water",
            "label": "Please WATER the flowers in the garden before lunch.",
            "clue": "Water is wet",
            "group": "verb"
          },
          {
            "id": "race",
            "label": "The children RACE across the playground to the swings.",
            "clue": "A race has a winner",
            "group": "verb"
          },
          {
            "id": "fast",
            "label": "My older sister runs FAST in every relay race.",
            "clue": "Running is an action",
            "group": "neither"
          },
          {
            "id": "warm",
            "label": "The chicken noodle soup is WARM and delicious.",
            "clue": "You can warm your hands",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "noun",
          "text": "Is a noun"
        },
        {
          "id": "ends",
          "text": "Ends in s"
        }
      ],
      "items": [
        {
          "id": "walksn",
          "label": "Our dog loves its daily WALKS around the neighborhood.",
          "sets": [
            "noun",
            "ends"
          ]
        },
        {
          "id": "dogs",
          "label": "The neighbor's DOGS bark loudly at night.",
          "sets": [
            "noun",
            "ends"
          ]
        },
        {
          "id": "hat",
          "label": "I lost my favorite HAT at the park yesterday.",
          "sets": [
            "noun"
          ]
        },
        {
          "id": "walksv",
          "label": "Dad WALKS the dog after dinner every evening.",
          "sets": [
            "ends"
          ]
        },
        {
          "id": "sings",
          "label": "Mia SINGS along to the radio in the car.",
          "sets": [
            "ends"
          ]
        },
        {
          "id": "sleep",
          "label": "We SLEEP in a tent when we go camping.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "In the sentence “Our dog took a long NAP,” what job does NAP do?",
        "choices": [
          {
            "id": "yes",
            "text": "Noun, because it names the thing that the dog took."
          },
          {
            "id": "trap",
            "text": "Verb, because napping is something that you do."
          },
          {
            "id": "no",
            "text": "Neither, because it tells how the dog did something."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the sentences where the CAPITAL word is a verb.",
        "choices": [
          {
            "id": "drinkv",
            "text": "I DRINK cold water after recess."
          },
          {
            "id": "drinkn",
            "text": "Can I have a DRINK of juice?"
          },
          {
            "id": "playv",
            "text": "We PLAY tag at recess every day."
          },
          {
            "id": "sing",
            "text": "Birds SING loudly at dawn."
          },
          {
            "id": "playn",
            "text": "The class PLAY was really fun."
          }
        ],
        "answers": [
          "drinkv",
          "playv",
          "sing"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the job the word does in the sentence"
          },
          {
            "id": "trap",
            "text": "what the word usually means"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-3.2B-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Hundreds place",
    "teks": "3.2B",
    "pages": [
      {
        "rule": "Sort by the digit in the hundreds place.",
        "notThis": "A big number can have a small hundreds digit.",
        "groups": [
          {
            "id": "high",
            "label": "Hundreds digit 6–9"
          },
          {
            "id": "low",
            "label": "Hundreds digit 0–3"
          }
        ],
        "items": [
          {
            "id": "n2150",
            "label": "2,150",
            "clue": "More than two thousand",
            "group": "low"
          },
          {
            "id": "n700",
            "label": "700",
            "clue": "Less than one thousand",
            "group": "high"
          },
          {
            "id": "n98301",
            "label": "98,301",
            "clue": "Starts with a 9",
            "group": "low"
          },
          {
            "id": "w5800",
            "label": "five thousand, eight hundred",
            "clue": "Written in words",
            "group": "high"
          },
          {
            "id": "x4927",
            "label": "4,000 + 900 + 20 + 7",
            "clue": "The first part is 4,000",
            "group": "high"
          },
          {
            "id": "w61020",
            "label": "sixty-one thousand, twenty",
            "clue": "Has \"sixty\" in it",
            "group": "low"
          }
        ]
      },
      {
        "rule": "Sort by the hundreds digit. Some fit neither group.",
        "notThis": "Do not look at the first digit. Find the hundreds place.",
        "groups": [
          {
            "id": "high",
            "label": "Hundreds digit 6–9"
          },
          {
            "id": "low",
            "label": "Hundreds digit 0–3"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n9450",
            "label": "9,450",
            "clue": "Has a 9 in it",
            "group": "neither"
          },
          {
            "id": "x30508",
            "label": "30,000 + 500 + 8",
            "clue": "A big first part",
            "group": "neither"
          },
          {
            "id": "n1099",
            "label": "1,099",
            "clue": "Lots of 9s",
            "group": "low"
          },
          {
            "id": "w23600",
            "label": "twenty-three thousand, six hundred",
            "clue": "Has \"three\" in it",
            "group": "high"
          },
          {
            "id": "x87290",
            "label": "80,000 + 7,000 + 200 + 90",
            "clue": "Has an 8 and a 9",
            "group": "low"
          },
          {
            "id": "n675",
            "label": "675",
            "clue": "Only three digits",
            "group": "high"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "high",
          "text": "Hundreds digit 6–9"
        },
        {
          "id": "big",
          "text": "Greater than 1,000"
        }
      ],
      "items": [
        {
          "id": "v5800",
          "label": "5,800",
          "sets": [
            "high",
            "big"
          ]
        },
        {
          "id": "d7904",
          "label": "7 thousands, 9 hundreds, 4 ones",
          "sets": [
            "high",
            "big"
          ]
        },
        {
          "id": "v760",
          "label": "760",
          "sets": [
            "high"
          ]
        },
        {
          "id": "w912",
          "label": "nine hundred twelve",
          "sets": [
            "high"
          ]
        },
        {
          "id": "v12050",
          "label": "12,050",
          "sets": [
            "big"
          ]
        },
        {
          "id": "v305",
          "label": "305",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Leo says 2,150 has a bigger hundreds digit than 760. He says so because 2,150 is bigger. Is he right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. 2,150 has only a 1 in the hundreds place."
          },
          {
            "id": "trap",
            "text": "Yes. The bigger number has the bigger digit."
          },
          {
            "id": "no",
            "text": "No. 760 has no hundreds at all."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all that have a 7 in the hundreds place.",
        "choices": [
          {
            "id": "a",
            "text": "4,715"
          },
          {
            "id": "b",
            "text": "seven thousand, forty"
          },
          {
            "id": "c",
            "text": "3,000 + 700 + 2"
          },
          {
            "id": "d",
            "text": "70,000 + 60"
          },
          {
            "id": "e",
            "text": "8 thousands, 7 hundreds, 5 ones"
          }
        ],
        "answers": [
          "a",
          "c",
          "e"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the digit in the hundreds place"
          },
          {
            "id": "trap",
            "text": "how big the whole number is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-3.2A-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Same number, different form",
    "teks": "3.2A",
    "pages": [
      {
        "rule": "Sort each card by the number it is equal to.",
        "notThis": "The same digits can make very different numbers. Check the value of each place carefully.",
        "groups": [
          {
            "id": "a",
            "label": "Equal to 3,405"
          },
          {
            "id": "b",
            "label": "Equal to 3,045"
          }
        ],
        "items": [
          {
            "id": "w3405",
            "label": "three thousand, four hundred five",
            "clue": "Written in words",
            "group": "a"
          },
          {
            "id": "w3045",
            "label": "three thousand, forty-five",
            "clue": "Has a four and a five",
            "group": "b"
          },
          {
            "id": "x3405",
            "label": "3,000 + 400 + 5",
            "clue": "Three parts added",
            "group": "a"
          },
          {
            "id": "x3045",
            "label": "3,000 + 40 + 5",
            "clue": "Three parts added",
            "group": "b"
          },
          {
            "id": "p3405",
            "label": "3 thousands, 4 hundreds, 5 ones",
            "clue": "Has a 3, 4, and 5",
            "group": "a"
          },
          {
            "id": "p3045",
            "label": "3 thousands, 4 tens, 5 ones",
            "clue": "Has a 3, 4, and 5",
            "group": "b"
          }
        ]
      },
      {
        "rule": "Sort each card by its total value. Some are neither.",
        "notThis": "The parts can come in any order. Add up the parts to find the total value.",
        "groups": [
          {
            "id": "a",
            "label": "Equal to 3,405"
          },
          {
            "id": "b",
            "label": "Equal to 3,045"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "h34",
            "label": "34 hundreds, 5 ones",
            "clue": "Has 34 in it",
            "group": "a"
          },
          {
            "id": "mix5",
            "label": "5 + 400 + 3,000",
            "clue": "The ones come first",
            "group": "a"
          },
          {
            "id": "h30",
            "label": "30 hundreds, 4 tens, 5 ones",
            "clue": "Starts with 30",
            "group": "b"
          },
          {
            "id": "two45",
            "label": "3,000 + 45",
            "clue": "Only two parts",
            "group": "b"
          },
          {
            "id": "x3450",
            "label": "3,000 + 400 + 50",
            "clue": "Uses 3, 4, and 5",
            "group": "neither"
          },
          {
            "id": "w3504",
            "label": "three thousand, five hundred four",
            "clue": "Written in words",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "a",
          "text": "Equal to 3,405"
        },
        {
          "id": "words",
          "text": "Written in word form"
        }
      ],
      "items": [
        {
          "id": "vw3405",
          "label": "three thousand, four hundred five",
          "sets": [
            "a",
            "words"
          ]
        },
        {
          "id": "vmix",
          "label": "400 + 3,000 + 5",
          "sets": [
            "a"
          ]
        },
        {
          "id": "v40tens",
          "label": "3 thousands, 40 tens, 5 ones",
          "sets": [
            "a"
          ]
        },
        {
          "id": "vw3045",
          "label": "three thousand, forty-five",
          "sets": [
            "words"
          ]
        },
        {
          "id": "vw3504",
          "label": "three thousand, five hundred four",
          "sets": [
            "words"
          ]
        },
        {
          "id": "v3450",
          "label": "3,450",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Ava writes the number “three thousand, forty-five” as 3,405. Is her answer correct, or did she make a mistake?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because the number has zero hundreds, so it is 3,045."
          },
          {
            "id": "trap",
            "text": "Yes, because the number uses a 3, a 4, and a 5."
          },
          {
            "id": "no",
            "text": "No, because the correct number is 345."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the cards that are equal to 3,045.",
        "choices": [
          {
            "id": "a",
            "text": "3,000 + 40 + 5"
          },
          {
            "id": "b",
            "text": "3 thousands, 4 tens, 5 ones"
          },
          {
            "id": "c",
            "text": "30 hundreds, 45 ones"
          },
          {
            "id": "d",
            "text": "3,000 + 400 + 5"
          },
          {
            "id": "e",
            "text": "three hundred forty-five"
          }
        ],
        "answers": [
          "a",
          "b",
          "c"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the value of each number"
          },
          {
            "id": "trap",
            "text": "which digits the number uses"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-3.4I-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Even, odd, or neither",
    "teks": "3.4I",
    "pages": [
      {
        "rule": "Sort by even or odd. Look at the ones digit.",
        "notThis": "Size does not matter. The other digits do not matter.",
        "groups": [
          {
            "id": "even",
            "label": "Even"
          },
          {
            "id": "odd",
            "label": "Odd"
          }
        ],
        "items": [
          {
            "id": "n30",
            "label": "30",
            "clue": "A round number",
            "group": "even"
          },
          {
            "id": "n1000",
            "label": "1,000",
            "clue": "A really big number",
            "group": "even"
          },
          {
            "id": "n5678",
            "label": "5,678",
            "clue": "Has odd digits 5 and 7",
            "group": "even"
          },
          {
            "id": "n47",
            "label": "47",
            "clue": "Has a 4 in it",
            "group": "odd"
          },
          {
            "id": "n8641",
            "label": "8,641",
            "clue": "Starts with even digits",
            "group": "odd"
          },
          {
            "id": "n99",
            "label": "99",
            "clue": "Almost 100",
            "group": "odd"
          }
        ]
      },
      {
        "rule": "Sort by even or odd. Some are neither.",
        "notThis": "Even and odd are only for whole numbers.",
        "groups": [
          {
            "id": "even",
            "label": "Even"
          },
          {
            "id": "odd",
            "label": "Odd"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n70",
            "label": "70",
            "clue": "Has a 7 in it",
            "group": "even"
          },
          {
            "id": "n100k",
            "label": "100,000",
            "clue": "The biggest number here",
            "group": "even"
          },
          {
            "id": "n2463",
            "label": "2,463",
            "clue": "Mostly even digits",
            "group": "odd"
          },
          {
            "id": "w91",
            "label": "forty-one",
            "clue": "Written in words",
            "group": "odd"
          },
          {
            "id": "half",
            "label": "1/2",
            "clue": "Half of something",
            "group": "neither"
          },
          {
            "id": "tq",
            "label": "3/4",
            "clue": "Has a 4 in it",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "even",
          "text": "Even"
        },
        {
          "id": "big",
          "text": "Greater than 50"
        }
      ],
      "items": [
        {
          "id": "v84",
          "label": "84",
          "sets": [
            "even",
            "big"
          ]
        },
        {
          "id": "v3000",
          "label": "3,000",
          "sets": [
            "even",
            "big"
          ]
        },
        {
          "id": "v20",
          "label": "20",
          "sets": [
            "even"
          ]
        },
        {
          "id": "v51",
          "label": "51",
          "sets": [
            "big"
          ]
        },
        {
          "id": "v9999",
          "label": "9,999",
          "sets": [
            "big"
          ]
        },
        {
          "id": "v37",
          "label": "37",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Sam says 1,001 is even because it is so big. Is he right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. It has a 1 in the ones place, so it is odd."
          },
          {
            "id": "trap",
            "text": "Yes. Big numbers are even."
          },
          {
            "id": "no",
            "text": "No. It is not a whole number."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the ways to tell a whole number is even.",
        "choices": [
          {
            "id": "ones",
            "text": "Its ones digit is 0, 2, 4, 6, or 8."
          },
          {
            "id": "split",
            "text": "It splits into 2 equal groups with none left over."
          },
          {
            "id": "big",
            "text": "It is bigger than 100."
          },
          {
            "id": "first",
            "text": "Its first digit is even."
          }
        ],
        "answers": [
          "ones",
          "split"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the digit in the ones place"
          },
          {
            "id": "trap",
            "text": "how big the number is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-3.5B-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Which operation?",
    "teks": "3.5B",
    "pages": [
      {
        "rule": "Sort by the operation. Do not solve.",
        "notThis": "Key words can trick you. Look carefully for equal groups instead.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          }
        ],
        "items": [
          {
            "id": "spiders",
            "label": "A spider has 8 legs. How many legs do 3 spiders have?",
            "clue": "No \"in all\" anywhere",
            "group": "mult"
          },
          {
            "id": "crayons",
            "label": "Each box holds 6 crayons. How many crayons are in 7 boxes?",
            "clue": "Starts with \"each\"",
            "group": "mult"
          },
          {
            "id": "garden",
            "label": "A garden has 4 rows with 9 plants in each row. How many plants in all?",
            "clue": "Says \"in all\"",
            "group": "mult"
          },
          {
            "id": "grapes",
            "label": "Mom puts 24 grapes in cups, with 4 in each cup. How many cups does she fill?",
            "clue": "Has the word \"each\"",
            "group": "div"
          },
          {
            "id": "teams",
            "label": "30 kids make 5 equal teams. How many kids on each team?",
            "clue": "Says \"in all\"",
            "group": "div"
          },
          {
            "id": "cookies",
            "label": "Ben packs 36 cookies in bags of 4. How many bags does he fill?",
            "clue": "No \"share\" or \"divide\"",
            "group": "div"
          }
        ]
      },
      {
        "rule": "Sort by the operation. Some need adding or subtracting.",
        "notThis": "Words like “in all,” “times,” and “share” do not choose the operation for you.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "juice",
            "label": "Dad buys 5 packs with 6 juice boxes in each pack. How many juice boxes?",
            "clue": "Has the word \"each\"",
            "group": "mult"
          },
          {
            "id": "crackers",
            "label": "Four friends share a bowl, and each eats 5 crackers. How many crackers did they eat?",
            "clue": "Says \"share\"",
            "group": "mult"
          },
          {
            "id": "chairs",
            "label": "48 chairs are set up in 6 equal rows. How many chairs are in each row?",
            "clue": "Chairs in rows, like an array",
            "group": "div"
          },
          {
            "id": "pages",
            "label": "Sara reads 8 pages each day of a 56-page book. How many days will it take?",
            "clue": "Has the word \"each\"",
            "group": "div"
          },
          {
            "id": "jumps",
            "label": "Zoe jumped 20, then 25, then 18 times. How many jumps in all?",
            "clue": "Says \"times\"",
            "group": "neither"
          },
          {
            "id": "tall",
            "label": "Jo is 52 inches tall, and her dad is 70 inches. How much taller is her dad?",
            "clue": "Two numbers, one question",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "mult",
          "text": "Multiply"
        },
        {
          "id": "each",
          "text": "Has \"each\" in it"
        }
      ],
      "items": [
        {
          "id": "vans",
          "label": "7 vans have 5 kids in each van. How many kids in all?",
          "sets": [
            "mult",
            "each"
          ]
        },
        {
          "id": "cats",
          "label": "A cat has 4 legs. How many legs do 6 cats have?",
          "sets": [
            "mult"
          ]
        },
        {
          "id": "pens",
          "label": "Blue pens come in packs of 10. How many pens are in 4 packs?",
          "sets": [
            "mult"
          ]
        },
        {
          "id": "cards",
          "label": "Split 42 cards into 6 equal piles. How many cards are in each pile?",
          "sets": [
            "each"
          ]
        },
        {
          "id": "oranges",
          "label": "Each bag holds 5 oranges. How many bags can 35 oranges fill?",
          "sets": [
            "each"
          ]
        },
        {
          "id": "cents",
          "label": "Ty has 27 cents and finds 50 more. How many cents in all?",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A word problem uses the words “in all.” Do you always multiply to solve it?",
        "choices": [
          {
            "id": "yes",
            "text": "No, you should first look for equal groups in the problem."
          },
          {
            "id": "trap",
            "text": "Yes, because “in all” always means you multiply."
          },
          {
            "id": "no",
            "text": "No, because “in all” always means you divide."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the clues that show a problem has equal groups.",
        "choices": [
          {
            "id": "each",
            "text": "5 kids in each van"
          },
          {
            "id": "rows",
            "text": "48 chairs in 6 equal rows"
          },
          {
            "id": "colors",
            "text": "12 red beads and 7 blue beads"
          },
          {
            "id": "inall",
            "text": "The words \"in all\""
          }
        ],
        "answers": [
          "each",
          "rows"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the operation that solves the problem"
          },
          {
            "id": "trap",
            "text": "the key words in the problem"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-3.7D-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Pour it or weigh it",
    "teks": "3.7D",
    "pages": [
      {
        "rule": "Sort by what you want to find out.",
        "notThis": "Pouring is not the rule. Read what the question asks.",
        "groups": [
          {
            "id": "liq",
            "label": "Liquid volume"
          },
          {
            "id": "wt",
            "label": "Weight"
          }
        ],
        "items": [
          {
            "id": "milk",
            "label": "How much milk is in the big jug?",
            "clue": "The jug is heavy to lift",
            "group": "liq"
          },
          {
            "id": "flour",
            "label": "How heavy is the bag of flour?",
            "clue": "Flour pours out of the bag",
            "group": "wt"
          },
          {
            "id": "tank",
            "label": "How much water fills the fish tank?",
            "clue": "A full tank is heavy",
            "group": "liq"
          },
          {
            "id": "sugar",
            "label": "How heavy is the bag of sugar?",
            "clue": "Sugar pours like water",
            "group": "wt"
          },
          {
            "id": "juice",
            "label": "How much juice fits in the cup?",
            "clue": "A small cup",
            "group": "liq"
          },
          {
            "id": "pack",
            "label": "How heavy is the backpack?",
            "clue": "It holds a water bottle",
            "group": "wt"
          }
        ]
      },
      {
        "rule": "Sort by what you want to find out. Some are neither.",
        "notThis": "Something can hold a liquid and still ask about something else.",
        "groups": [
          {
            "id": "liq",
            "label": "Liquid volume"
          },
          {
            "id": "wt",
            "label": "Weight"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "soup",
            "label": "How much soup is in the pot?",
            "clue": "The pot is heavy",
            "group": "liq"
          },
          {
            "id": "rice",
            "label": "How heavy is the bag of rice?",
            "clue": "Rice pours like water",
            "group": "wt"
          },
          {
            "id": "tub",
            "label": "How much water does the bathtub hold?",
            "clue": "A full tub is very heavy",
            "group": "liq"
          },
          {
            "id": "melon",
            "label": "How heavy is the watermelon?",
            "clue": "It is full of juice",
            "group": "wt"
          },
          {
            "id": "hose",
            "label": "How long is the garden hose?",
            "clue": "Water runs through it",
            "group": "neither"
          },
          {
            "id": "jugtall",
            "label": "How tall is the milk jug?",
            "clue": "It holds milk",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "liq",
          "text": "Liquid volume"
        },
        {
          "id": "food",
          "text": "Food or drink"
        }
      ],
      "items": [
        {
          "id": "milkV",
          "label": "How much milk is in the carton?",
          "sets": [
            "liq",
            "food"
          ]
        },
        {
          "id": "paintV",
          "label": "How much paint is in the can?",
          "sets": [
            "liq"
          ]
        },
        {
          "id": "poolV",
          "label": "How much shampoo is in the bottle?",
          "sets": [
            "liq"
          ]
        },
        {
          "id": "flourV",
          "label": "How heavy is the bag of flour?",
          "sets": [
            "food"
          ]
        },
        {
          "id": "applesV",
          "label": "How heavy is the bag of apples?",
          "sets": [
            "food"
          ]
        },
        {
          "id": "dogV",
          "label": "How heavy is the dog?",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Leo asks how much milk is in a heavy jug. What should he measure?",
        "choices": [
          {
            "id": "yes",
            "text": "Liquid volume"
          },
          {
            "id": "trap",
            "text": "Weight, because the jug is heavy"
          },
          {
            "id": "no",
            "text": "Length"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the questions about weight.",
        "choices": [
          {
            "id": "sugar",
            "text": "How heavy is the bag of sugar?"
          },
          {
            "id": "cereal",
            "text": "How heavy is the box of cereal?"
          },
          {
            "id": "cup",
            "text": "How much juice is in the cup?"
          },
          {
            "id": "tall",
            "text": "How tall is the bottle of water?"
          }
        ],
        "answers": [
          "sugar",
          "cereal"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the question wants to find out"
          },
          {
            "id": "trap",
            "text": "whether the thing can pour"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-3.7B-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Around or inside?",
    "teks": "3.7B",
    "pages": [
      {
        "rule": "Sort by what each job needs.",
        "notThis": "The thing does not decide. The job does. Does it go around, or cover inside?",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          }
        ],
        "items": [
          {
            "id": "fence",
            "label": "Mom puts a fence around the garden.",
            "clue": "It is a garden",
            "group": "per"
          },
          {
            "id": "grass",
            "label": "Dad covers the whole garden with new grass.",
            "clue": "It is a garden",
            "group": "area"
          },
          {
            "id": "ribbon",
            "label": "Kim glues ribbon along the edge of her picture.",
            "clue": "Ribbon is flat",
            "group": "per"
          },
          {
            "id": "rug",
            "label": "Find how much floor the rug covers.",
            "clue": "The rug has fringe on its edges",
            "group": "area"
          },
          {
            "id": "tiles",
            "label": "Lay square tiles over the kitchen floor.",
            "clue": "Each tile has four edges",
            "group": "area"
          },
          {
            "id": "tape",
            "label": "Put tape around the edge of the rug.",
            "clue": "It is a rug",
            "group": "per"
          }
        ]
      },
      {
        "rule": "Sort by what each job needs. Some need neither.",
        "notThis": "Not every job needs perimeter or area. Read what the job asks you to find.",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "border",
            "label": "Staple a border around the bulletin board.",
            "clue": "It is on a wall",
            "group": "per"
          },
          {
            "id": "paper",
            "label": "Cover the whole bulletin board with paper.",
            "clue": "It is on a wall",
            "group": "area"
          },
          {
            "id": "park",
            "label": "Find how far it is around the edge of the park.",
            "clue": "A park is big",
            "group": "per"
          },
          {
            "id": "flowers",
            "label": "Plant flowers to fill the whole flower bed.",
            "clue": "Flowers, not grass",
            "group": "area"
          },
          {
            "id": "soil",
            "label": "Find how heavy the bag of garden soil is.",
            "clue": "It is for the garden",
            "group": "neither"
          },
          {
            "id": "mow",
            "label": "Find how long it takes to mow the yard.",
            "clue": "Mowing covers the whole yard",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "per",
          "text": "Perimeter"
        },
        {
          "id": "garden",
          "text": "A garden job"
        }
      ],
      "items": [
        {
          "id": "fenceV",
          "label": "Put a fence around the garden.",
          "sets": [
            "per",
            "garden"
          ]
        },
        {
          "id": "rocksV",
          "label": "Line the edge of the garden with rocks.",
          "sets": [
            "per",
            "garden"
          ]
        },
        {
          "id": "frameV",
          "label": "Put a frame around a poster.",
          "sets": [
            "per"
          ]
        },
        {
          "id": "laceV",
          "label": "Sew lace around a pillow.",
          "sets": [
            "per"
          ]
        },
        {
          "id": "strawV",
          "label": "Spread straw over the whole garden.",
          "sets": [
            "garden"
          ]
        },
        {
          "id": "clothV",
          "label": "Cover the whole table with a tablecloth.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Ana wants grass on her whole garden. Her garden has a fence. What does she need to know?",
        "choices": [
          {
            "id": "yes",
            "text": "The area of the garden"
          },
          {
            "id": "trap",
            "text": "The perimeter, because the garden has a fence"
          },
          {
            "id": "no",
            "text": "How heavy the garden is"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the jobs that need perimeter.",
        "choices": [
          {
            "id": "yard",
            "text": "Put a fence around a yard"
          },
          {
            "id": "card",
            "text": "Glue lace around the edge of a card"
          },
          {
            "id": "wall",
            "text": "Paint a whole wall"
          },
          {
            "id": "floor",
            "text": "Cover a floor with carpet"
          }
        ],
        "answers": [
          "yard",
          "card"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the job goes around or covers inside"
          },
          {
            "id": "trap",
            "text": "what thing the job is about"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-3.9C-CL",
    "subject": "Math",
    "grade": "Grade 3",
    "title": "Planned or not?",
    "teks": "3.9C",
    "pages": [
      {
        "rule": "Sort each purchase by when the buyer decided to buy.",
        "notThis": "The price does not decide the group. Think about the buyer's plan.",
        "groups": [
          {
            "id": "plan",
            "label": "Planned spending"
          },
          {
            "id": "unplan",
            "label": "Unplanned spending"
          }
        ],
        "items": [
          {
            "id": "glue",
            "label": "Maya wrote glue sticks on her list. Later she bought them at the store.",
            "clue": "They cost very little",
            "group": "plan"
          },
          {
            "id": "robot",
            "label": "Ben noticed a giant toy robot at the mall. He bought it right away.",
            "clue": "It cost a lot of money",
            "group": "unplan"
          },
          {
            "id": "bike",
            "label": "Sam saved his allowance for weeks. Then he bought a new bike.",
            "clue": "It took a long time",
            "group": "plan"
          },
          {
            "id": "candy",
            "label": "Lily saw a candy bar in the checkout line. She bought it right then.",
            "clue": "It was only one dollar",
            "group": "unplan"
          },
          {
            "id": "bread",
            "label": "Dad wrote a shopping list at home. Then he bought milk and bread.",
            "clue": "Just food from the store",
            "group": "plan"
          },
          {
            "id": "shirt",
            "label": "Jen noticed a pretty shirt on sale. She bought it on the spot.",
            "clue": "It was on sale",
            "group": "unplan"
          }
        ]
      },
      {
        "rule": "Sort by when the buyer decided. Some spend no money.",
        "notThis": "Money can move from person to person without anyone buying something.",
        "groups": [
          {
            "id": "plan",
            "label": "Planned spending"
          },
          {
            "id": "unplan",
            "label": "Unplanned spending"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "book",
            "label": "Omar saved eight dollars for the book fair. Then he bought the book he wanted.",
            "clue": "The fair had lots of books",
            "group": "plan"
          },
          {
            "id": "card",
            "label": "Mom's shopping list said birthday card. She bought one at the store.",
            "clue": "A card is cheap",
            "group": "plan"
          },
          {
            "id": "tv",
            "label": "Grandpa noticed a new TV at the store. He bought it that same day.",
            "clue": "A TV costs a lot",
            "group": "unplan"
          },
          {
            "id": "toy",
            "label": "Ava noticed a little toy by the register. She bought it.",
            "clue": "It was a small toy",
            "group": "unplan"
          },
          {
            "id": "bank",
            "label": "Zoe put all of her birthday money into her piggy bank.",
            "clue": "It was a lot of money",
            "group": "neither"
          },
          {
            "id": "rake",
            "label": "Grandma gave Leo five dollars for his birthday.",
            "clue": "He got money",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "plan",
          "text": "Planned"
        },
        {
          "id": "big",
          "text": "Costs more than $10"
        }
      ],
      "items": [
        {
          "id": "bikeV",
          "label": "Sam saved his money for weeks. Then he bought a $90 bike.",
          "sets": [
            "plan",
            "big"
          ]
        },
        {
          "id": "zooV",
          "label": "The family planned ahead for a $30 visit to the zoo.",
          "sets": [
            "plan",
            "big"
          ]
        },
        {
          "id": "glueV",
          "label": "Glue was on Mom's shopping list. She paid $2 for it.",
          "sets": [
            "plan"
          ]
        },
        {
          "id": "robotV",
          "label": "Ben noticed a $40 robot and bought it right away.",
          "sets": [
            "big"
          ]
        },
        {
          "id": "candyV",
          "label": "Lily bought a $1 candy bar while waiting at the checkout.",
          "sets": []
        },
        {
          "id": "stickV",
          "label": "Kai noticed $3 stickers at the register and bought them.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Grandpa noticed a TV at the store and bought it that day. It cost a lot of money. What kind of spending is it?",
        "choices": [
          {
            "id": "yes",
            "text": "Unplanned, because he decided while he was at the store."
          },
          {
            "id": "trap",
            "text": "Planned, because the TV cost a lot of money."
          },
          {
            "id": "no",
            "text": "Saving, because a TV will last a long time."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all of the benefits that come from planned spending.",
        "choices": [
          {
            "id": "need",
            "text": "You have money left over for the things you need."
          },
          {
            "id": "big",
            "text": "You can save up over time for something big."
          },
          {
            "id": "never",
            "text": "You never have to make any choices about money."
          },
          {
            "id": "grab",
            "text": "You get to grab a surprise treat at the register."
          }
        ],
        "answers": [
          "need",
          "big"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "when the buyer decided to buy"
          },
          {
            "id": "trap",
            "text": "how much the thing cost"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-3.3C-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Natural or made by people?",
    "teks": "3.3C",
    "pages": [
      {
        "rule": "Sort each feature by who or what made it.",
        "notThis": "Being green or wet does not make a place natural. Ask who or what really made it.",
        "groups": [
          {
            "id": "nat",
            "label": "Natural feature"
          },
          {
            "id": "human",
            "label": "Human-made feature"
          }
        ],
        "items": [
          {
            "id": "enchanted",
            "label": "Enchanted Rock",
            "clue": "A huge pink rock dome",
            "group": "nat"
          },
          {
            "id": "paloduro",
            "label": "Palo Duro Canyon",
            "clue": "Deep red rock walls",
            "group": "nat"
          },
          {
            "id": "dunes",
            "label": "Sand dunes on Padre Island",
            "clue": "Sand piled into hills",
            "group": "nat"
          },
          {
            "id": "travis",
            "label": "Lake Travis, held back by a dam",
            "clue": "Blue water and green hills",
            "group": "human"
          },
          {
            "id": "citypark",
            "label": "A city park with planted trees",
            "clue": "Grass, trees, and a pond",
            "group": "human"
          },
          {
            "id": "cornfield",
            "label": "A cornfield",
            "clue": "Green plants in the dirt",
            "group": "human"
          }
        ]
      },
      {
        "rule": "Sort each feature by who or what made it. Some are not part of the land.",
        "notThis": "Some things you notice outdoors are not features of the land or water.",
        "groups": [
          {
            "id": "nat",
            "label": "Natural feature"
          },
          {
            "id": "human",
            "label": "Human-made feature"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "rio",
            "label": "The Rio Grande",
            "clue": "It is a border line",
            "group": "nat"
          },
          {
            "id": "hamilton",
            "label": "Hamilton Pool, a rock swimming hole",
            "clue": "People swim there",
            "group": "nat"
          },
          {
            "id": "treefarm",
            "label": "A tree farm",
            "clue": "Full of trees",
            "group": "human"
          },
          {
            "id": "stocktank",
            "label": "A stock tank dug for cows",
            "clue": "Frogs and fish live there",
            "group": "human"
          },
          {
            "id": "rain",
            "label": "A rainstorm",
            "clue": "Water falls on the land",
            "group": "neither"
          },
          {
            "id": "lightning",
            "label": "Lightning",
            "clue": "It can start a fire",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "human",
          "text": "Human-made feature"
        },
        {
          "id": "water",
          "text": "Has water"
        }
      ],
      "items": [
        {
          "id": "canyonlakeV",
          "label": "Canyon Lake, held back by a dam",
          "sets": [
            "human",
            "water"
          ]
        },
        {
          "id": "canalV",
          "label": "A canal that brings water to farms",
          "sets": [
            "human",
            "water"
          ]
        },
        {
          "id": "fallsV",
          "label": "Pedernales Falls",
          "sets": [
            "water"
          ]
        },
        {
          "id": "riverV",
          "label": "The Rio Grande in Santa Elena Canyon",
          "sets": [
            "water"
          ]
        },
        {
          "id": "highwayV",
          "label": "A highway",
          "sets": [
            "human"
          ]
        },
        {
          "id": "peakV",
          "label": "Guadalupe Peak",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Lake Travis looks like it has always been there. Is it a natural feature?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because people built a dam to make the lake."
          },
          {
            "id": "trap",
            "text": "Yes, because it has water, fish, and green hills."
          },
          {
            "id": "no",
            "text": "No, because it is a kind of weather."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all of the features that people made.",
        "choices": [
          {
            "id": "dam",
            "text": "A lake held back by a dam."
          },
          {
            "id": "rows",
            "text": "A tree farm planted in rows."
          },
          {
            "id": "canyon",
            "text": "A canyon cut by a river."
          },
          {
            "id": "storm",
            "text": "A rainstorm over the hills."
          }
        ],
        "answers": [
          "dam",
          "rows"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "who or what made it"
          },
          {
            "id": "trap",
            "text": "how green and wild it looks"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-3.4A-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Which way?",
    "teks": "3.4A",
    "pages": [
      {
        "rule": "Sort each sentence by the kind of direction it uses.",
        "notThis": "Do not stop reading at the first part of the word. Read the whole direction word.",
        "groups": [
          {
            "id": "card",
            "label": "Cardinal direction"
          },
          {
            "id": "inter",
            "label": "Intermediate direction"
          }
        ],
        "items": [
          {
            "id": "park",
            "label": "The park is north of the school.",
            "clue": "Toward the top of most maps",
            "group": "card"
          },
          {
            "id": "pond",
            "label": "The pond is west of the barn.",
            "clue": "Where the sun sets",
            "group": "card"
          },
          {
            "id": "store",
            "label": "The store is south of the bank.",
            "clue": "Toward the bottom of most maps",
            "group": "card"
          },
          {
            "id": "zoo",
            "label": "The zoo is northwest of the city.",
            "clue": "It starts with north",
            "group": "inter"
          },
          {
            "id": "lake",
            "label": "The lake is northeast of the park.",
            "clue": "It starts with north",
            "group": "inter"
          },
          {
            "id": "farm",
            "label": "The farm is southeast of the town.",
            "clue": "It has the word east",
            "group": "inter"
          }
        ]
      },
      {
        "rule": "Sort each sentence by the kind of direction. Some are not map directions.",
        "notThis": "Some words tell about location, but they are not map directions.",
        "groups": [
          {
            "id": "card",
            "label": "Cardinal direction"
          },
          {
            "id": "inter",
            "label": "Intermediate direction"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "busstop",
            "label": "The bus stop is east of the school.",
            "clue": "Where the sun rises",
            "group": "card"
          },
          {
            "id": "river",
            "label": "Walk south to get to the river.",
            "clue": "It is only one word",
            "group": "card"
          },
          {
            "id": "fort",
            "label": "The fort is southwest of the hill.",
            "clue": "It starts with south",
            "group": "inter"
          },
          {
            "id": "trail",
            "label": "The trail bends to the northwest.",
            "clue": "North comes first",
            "group": "inter"
          },
          {
            "id": "swings",
            "label": "The swings are to the left of the slide.",
            "clue": "It tells which way to go",
            "group": "neither"
          },
          {
            "id": "ball",
            "label": "The ball is behind the fence.",
            "clue": "It tells where something is",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "card",
          "text": "Cardinal direction"
        },
        {
          "id": "north",
          "text": "Has \"north\" in it"
        }
      ],
      "items": [
        {
          "id": "campV",
          "label": "The camp is north of the lake.",
          "sets": [
            "card",
            "north"
          ]
        },
        {
          "id": "barnV",
          "label": "The barn is east of the house.",
          "sets": [
            "card"
          ]
        },
        {
          "id": "gymV",
          "label": "The gym is west of the library.",
          "sets": [
            "card"
          ]
        },
        {
          "id": "mallV",
          "label": "The mall is northeast of the airport.",
          "sets": [
            "north"
          ]
        },
        {
          "id": "museumV",
          "label": "The museum is northwest of the river.",
          "sets": [
            "north"
          ]
        },
        {
          "id": "pierV",
          "label": "The pier is southeast of the beach.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Ana says northwest is a cardinal direction, because it has north in it. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because northwest is halfway between north and west."
          },
          {
            "id": "trap",
            "text": "Yes, because it has the word north in it."
          },
          {
            "id": "no",
            "text": "No, because it is not a map direction."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all of the intermediate directions.",
        "choices": [
          {
            "id": "ne",
            "text": "Northeast"
          },
          {
            "id": "sw",
            "text": "Southwest"
          },
          {
            "id": "s",
            "text": "South"
          },
          {
            "id": "l",
            "text": "Left"
          }
        ],
        "answers": [
          "ne",
          "sw"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "main directions and in-between directions"
          },
          {
            "id": "trap",
            "text": "which word the direction starts with"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-3.5A-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Where does the money go?",
    "teks": "3.5A",
    "pages": [
      {
        "rule": "Sort by what happens to the money.",
        "notThis": "Who the money is for is not the rule. Where does it go?",
        "groups": [
          {
            "id": "save",
            "label": "Saving"
          },
          {
            "id": "donate",
            "label": "Donating"
          }
        ],
        "items": [
          {
            "id": "mia",
            "label": "Mia puts $5 in a jar for Mom's gift next month.",
            "clue": "It is for someone else",
            "group": "save"
          },
          {
            "id": "sam",
            "label": "Sam puts his birthday money in the bank.",
            "clue": "It was a gift to him",
            "group": "save"
          },
          {
            "id": "ben",
            "label": "Ben keeps $2 each week for a new bike.",
            "clue": "He wants to buy something",
            "group": "save"
          },
          {
            "id": "leo",
            "label": "Leo gives $3 to the food bank.",
            "clue": "It has the word bank",
            "group": "donate"
          },
          {
            "id": "ava",
            "label": "Ava gives $10 to help an animal shelter.",
            "clue": "She loves animals",
            "group": "donate"
          },
          {
            "id": "class",
            "label": "The class collects coins for kids hurt by a flood.",
            "clue": "They put the coins in a jar",
            "group": "donate"
          }
        ]
      },
      {
        "rule": "Sort by what happens to the money. Some are neither.",
        "notThis": "Money can do more than two things. Read closely.",
        "groups": [
          {
            "id": "save",
            "label": "Saving"
          },
          {
            "id": "donate",
            "label": "Donating"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "kim",
            "label": "Kim keeps $20 in the bank for next summer's camp.",
            "clue": "Camp costs money",
            "group": "save"
          },
          {
            "id": "lily",
            "label": "Grandpa helps Lily open a bank account for college.",
            "clue": "Grandpa gives some money",
            "group": "save"
          },
          {
            "id": "nora",
            "label": "Nora gives $5 to help plant trees in a park.",
            "clue": "The park is for everyone",
            "group": "donate"
          },
          {
            "id": "tom",
            "label": "Tom gives $2 to the school coin drive for a hospital.",
            "clue": "He drops coins in a big jar",
            "group": "donate"
          },
          {
            "id": "jay",
            "label": "Jay buys a snack at the store.",
            "clue": "He uses his own money",
            "group": "neither"
          },
          {
            "id": "zoe",
            "label": "Zoe gets $5 for walking a dog.",
            "clue": "She works hard for it",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "save",
          "text": "Saving"
        },
        {
          "id": "bank",
          "text": "At a bank"
        }
      ],
      "items": [
        {
          "id": "sethV",
          "label": "Seth puts $10 into his bank account.",
          "sets": [
            "save",
            "bank"
          ]
        },
        {
          "id": "ellaV",
          "label": "Ella puts her allowance in the bank for later.",
          "sets": [
            "save",
            "bank"
          ]
        },
        {
          "id": "maxV",
          "label": "Max hides $5 in a sock for a trip.",
          "sets": [
            "save"
          ]
        },
        {
          "id": "jarV",
          "label": "Rosa keeps coins in a jar for a gift.",
          "sets": [
            "save"
          ]
        },
        {
          "id": "dadV",
          "label": "Dad takes money out of the bank to buy shoes.",
          "sets": [
            "bank"
          ]
        },
        {
          "id": "anaV",
          "label": "Ana gives $4 to a food bank.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Mia puts money in a jar. She will buy Mom a gift next month. What is she doing?",
        "choices": [
          {
            "id": "yes",
            "text": "Saving"
          },
          {
            "id": "trap",
            "text": "Donating, because it is for someone else"
          },
          {
            "id": "no",
            "text": "Earning"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all that are donating.",
        "choices": [
          {
            "id": "shelter",
            "text": "Give $5 to an animal shelter"
          },
          {
            "id": "flood",
            "text": "Give coins to help flood victims"
          },
          {
            "id": "piggy",
            "text": "Put $5 in a piggy bank for a gift"
          },
          {
            "id": "toy",
            "text": "Buy a toy at the store"
          }
        ],
        "answers": [
          "shelter",
          "flood"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what happens to the money"
          },
          {
            "id": "trap",
            "text": "who the money is for"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-3.14B-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "Was the author there?",
    "teks": "3.14B",
    "pages": [
      {
        "rule": "Sort by who made each source.",
        "notThis": "Old does not mean primary. Ask: was the maker there?",
        "groups": [
          {
            "id": "prim",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          }
        ],
        "items": [
          {
            "id": "moonphoto",
            "label": "A photo an astronaut took on the Moon in 1969",
            "clue": "It shows the gray Moon",
            "group": "prim"
          },
          {
            "id": "words",
            "label": "Neil Armstrong's words as he stepped onto the Moon",
            "clue": "Only one short sentence",
            "group": "prim"
          },
          {
            "id": "aldrinbook",
            "label": "A book Buzz Aldrin wrote about his trip",
            "clue": "Written years after the trip",
            "group": "prim"
          },
          {
            "id": "kidsbook",
            "label": "A kids' book about the Moon landing, printed in 2019",
            "clue": "Full of true facts",
            "group": "sec"
          },
          {
            "id": "encyc",
            "label": "An encyclopedia page about the landing, printed in 1975",
            "clue": "Very old, with yellow pages",
            "group": "sec"
          },
          {
            "id": "actor",
            "label": "A still from a 2018 movie about the landing",
            "clue": "It is a real photo",
            "group": "sec"
          }
        ]
      },
      {
        "rule": "Sort by who made each source. Some are not about the landing.",
        "notThis": "A photo is primary only if it was taken there.",
        "groups": [
          {
            "id": "prim",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "tv",
            "label": "Live TV video sent from the Moon in 1969",
            "clue": "Blurry and black and white",
            "group": "prim"
          },
          {
            "id": "control",
            "label": "A recording of Mission Control talking to the astronauts",
            "clue": "Recorded on Earth, not the Moon",
            "group": "prim"
          },
          {
            "id": "painting",
            "label": "A painting of the landing, made in 2020",
            "clue": "Bright and full of detail",
            "group": "sec"
          },
          {
            "id": "website",
            "label": "A museum website about the landing",
            "clue": "It has real 1969 photos",
            "group": "sec"
          },
          {
            "id": "baseball",
            "label": "A 1969 photo of a baseball game",
            "clue": "Taken the same year",
            "group": "neither"
          },
          {
            "id": "phases",
            "label": "A science book about the Moon's phases",
            "clue": "All about the Moon",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "prim",
          "text": "Primary source"
        },
        {
          "id": "pic",
          "text": "Has a picture"
        }
      ],
      "items": [
        {
          "id": "footV",
          "label": "A photo of a bootprint, taken on the Moon",
          "sets": [
            "prim",
            "pic"
          ]
        },
        {
          "id": "tvV",
          "label": "Live TV video of the astronauts on the Moon",
          "sets": [
            "prim",
            "pic"
          ]
        },
        {
          "id": "stepV",
          "label": "A sound recording of Neil Armstrong's first words",
          "sets": [
            "prim"
          ]
        },
        {
          "id": "radioV",
          "label": "A sound recording of Mission Control during the landing",
          "sets": [
            "prim"
          ]
        },
        {
          "id": "drawV",
          "label": "A drawing of the landing in a 2019 kids' book",
          "sets": [
            "pic"
          ]
        },
        {
          "id": "textV",
          "label": "A textbook paragraph about the landing, with no pictures",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A book about the landing was printed in 1975. The writer was not there. What is it?",
        "choices": [
          {
            "id": "yes",
            "text": "A secondary source"
          },
          {
            "id": "trap",
            "text": "A primary source, because it is old"
          },
          {
            "id": "no",
            "text": "Not about the landing"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the primary sources about the Moon landing.",
        "choices": [
          {
            "id": "photo",
            "text": "Photos the astronauts took on the Moon"
          },
          {
            "id": "voice",
            "text": "Neil Armstrong's words from the Moon"
          },
          {
            "id": "kid",
            "text": "A 2019 kids' book about the landing"
          },
          {
            "id": "sci",
            "text": "A science book about the Moon's craters"
          }
        ],
        "answers": [
          "photo",
          "voice"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "who made the source"
          },
          {
            "id": "trap",
            "text": "how old the source is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-3.15C-CL",
    "subject": "Social Studies",
    "grade": "Grade 3",
    "title": "How long ago?",
    "teks": "3.15C",
    "pages": [
      {
        "rule": "Sort each one by how many years it lasts.",
        "notThis": "Do not stop reading after the first two digits. Read the whole number carefully.",
        "groups": [
          {
            "id": "dec",
            "label": "A decade"
          },
          {
            "id": "cent",
            "label": "A century"
          }
        ],
        "items": [
          {
            "id": "ten",
            "label": "Ten years",
            "clue": "A small number",
            "group": "dec"
          },
          {
            "id": "s1990",
            "label": "From 1990 to 2000",
            "clue": "It starts with 19",
            "group": "dec"
          },
          {
            "id": "y2010",
            "label": "From 2010 to 2020",
            "clue": "It uses big numbers",
            "group": "dec"
          },
          {
            "id": "hundred",
            "label": "One hundred years",
            "clue": "Just a 1 and two zeros",
            "group": "cent"
          },
          {
            "id": "s1900",
            "label": "From 1900 to 2000",
            "clue": "It starts with 19",
            "group": "cent"
          },
          {
            "id": "s1800",
            "label": "The years 1800 through 1899",
            "clue": "It begins in 1800",
            "group": "cent"
          }
        ]
      },
      {
        "rule": "Sort by how many years it lasts. Some fit neither group.",
        "notThis": "A bigger number does not always mean a longer time.",
        "groups": [
          {
            "id": "dec",
            "label": "A decade"
          },
          {
            "id": "cent",
            "label": "A century"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "s2010",
            "label": "The 2010s",
            "clue": "Not long ago",
            "group": "dec"
          },
          {
            "id": "y1950",
            "label": "From 1950 to 1960",
            "clue": "Long before you were born",
            "group": "dec"
          },
          {
            "id": "y1900",
            "label": "From 1920 to 2020",
            "clue": "It does not end in 00",
            "group": "cent"
          },
          {
            "id": "s1700",
            "label": "The years 1700 through 1799",
            "clue": "Long, long ago",
            "group": "cent"
          },
          {
            "id": "months",
            "label": "Twelve months",
            "clue": "More than ten",
            "group": "neither"
          },
          {
            "id": "y2023",
            "label": "From 2023 to 2024",
            "clue": "It uses big numbers",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "dec",
          "text": "A decade"
        },
        {
          "id": "nine",
          "text": "From 1900 to 1999"
        }
      ],
      "items": [
        {
          "id": "s1990V",
          "label": "The 1990s",
          "sets": [
            "dec",
            "nine"
          ]
        },
        {
          "id": "s1960V",
          "label": "The 1960s",
          "sets": [
            "dec",
            "nine"
          ]
        },
        {
          "id": "s2010V",
          "label": "The 2010s",
          "sets": [
            "dec"
          ]
        },
        {
          "id": "y1969V",
          "label": "The year 1969",
          "sets": [
            "nine"
          ]
        },
        {
          "id": "y1945V",
          "label": "The year 1945",
          "sets": [
            "nine"
          ]
        },
        {
          "id": "s1700V",
          "label": "The years 1700 through 1799",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Maria reads about the years from 1900 to 2000. Is that a decade or a century?",
        "choices": [
          {
            "id": "yes",
            "text": "A century, because it lasts 100 years."
          },
          {
            "id": "trap",
            "text": "A decade, because it looks like 1990 to 2000."
          },
          {
            "id": "no",
            "text": "A single year, because it starts in 1900."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all of the time periods that are a decade.",
        "choices": [
          {
            "id": "d80",
            "text": "The 1980s"
          },
          {
            "id": "d2000",
            "text": "From 2000 to 2010"
          },
          {
            "id": "c1800",
            "text": "The years 1800 through 1899"
          },
          {
            "id": "c100",
            "text": "One hundred years"
          }
        ],
        "answers": [
          "d80",
          "d2000"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how many years it lasts"
          },
          {
            "id": "trap",
            "text": "what number it starts with"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-4.7-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Which force?",
    "teks": "4.7",
    "pages": [
      {
        "rule": "Sort each card by the main force that is at work.",
        "notThis": "Slowing down is not always caused by gravity, so ask what is rubbing together.",
        "groups": [
          {
            "id": "grav",
            "label": "Gravity"
          },
          {
            "id": "fric",
            "label": "Friction"
          }
        ],
        "items": [
          {
            "id": "apple",
            "label": "A ripe apple breaks off its branch and drops straight to the ground.",
            "clue": "It stops when it hits the grass.",
            "group": "grav"
          },
          {
            "id": "rain",
            "label": "Drops of rain fall from the clouds all the way to the ground.",
            "clue": "Clouds are very high up",
            "group": "grav"
          },
          {
            "id": "toss",
            "label": "When a ball is thrown straight up into the air, it comes back down.",
            "clue": "It went up first",
            "group": "grav"
          },
          {
            "id": "grass",
            "label": "A ball rolls across the grass and gradually comes to a stop.",
            "clue": "Nobody stopped it",
            "group": "fric"
          },
          {
            "id": "sled",
            "label": "A sled slides across flat snow and slowly loses speed.",
            "clue": "Snow is slippery",
            "group": "fric"
          },
          {
            "id": "brakes",
            "label": "A rider squeezes the brakes, and the bike comes to a stop.",
            "clue": "You squeeze a lever",
            "group": "fric"
          }
        ]
      },
      {
        "rule": "Sort by the main force at work. Some cards show a different force.",
        "notThis": "Gravity is not the only force that can pull on an object without touching it.",
        "groups": [
          {
            "id": "grav",
            "label": "Gravity"
          },
          {
            "id": "fric",
            "label": "Friction"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "river",
            "label": "A river flows downhill from the mountains, and it eventually reaches the ocean.",
            "clue": "Water is a liquid",
            "group": "grav"
          },
          {
            "id": "book",
            "label": "A book slides off the edge of a desk and lands on the floor.",
            "clue": "It fell by itself",
            "group": "grav"
          },
          {
            "id": "hands",
            "label": "You rub your hands together quickly, and they start to feel warm.",
            "clue": "Your hands stay in place",
            "group": "fric"
          },
          {
            "id": "shoes",
            "label": "A player's sneakers grip the gym floor instead of slipping.",
            "clue": "Rubber soles",
            "group": "fric"
          },
          {
            "id": "clips",
            "label": "A magnet picks up a pile of paper clips from the table.",
            "clue": "It pulls without touching",
            "group": "neither"
          },
          {
            "id": "compass",
            "label": "A compass needle swings around to point north.",
            "clue": "It spins, then stops",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "slow",
          "text": "Slows things down"
        },
        {
          "id": "touch",
          "text": "Needs contact"
        }
      ],
      "items": [
        {
          "id": "brakesV",
          "label": "Bike brakes press against a spinning wheel and slow it down.",
          "sets": [
            "slow",
            "touch"
          ]
        },
        {
          "id": "rugV",
          "label": "A toy car rolls from the smooth floor onto a thick rug and slows down.",
          "sets": [
            "slow",
            "touch"
          ]
        },
        {
          "id": "upV",
          "label": "A ball tossed into the air slows down as it rises.",
          "sets": [
            "slow"
          ]
        },
        {
          "id": "kickV",
          "label": "A player's foot kicks a soccer ball across the field.",
          "sets": [
            "touch"
          ]
        },
        {
          "id": "coconutV",
          "label": "A coconut drops from the top of a tall palm tree.",
          "sets": []
        },
        {
          "id": "magnetV",
          "label": "A magnet pulls a paper clip up off the table.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A sled slides across flat snow, and it gradually slows down and stops. Which force slowed it?",
        "choices": [
          {
            "id": "yes",
            "text": "Friction between the bottom of the sled and the snow."
          },
          {
            "id": "trap",
            "text": "Gravity, because gravity pulls things down toward Earth."
          },
          {
            "id": "no",
            "text": "Magnetism coming from the snow under the sled."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the forces that can act on an object without touching it.",
        "choices": [
          {
            "id": "grav",
            "text": "Gravity"
          },
          {
            "id": "mag",
            "text": "Magnetism"
          },
          {
            "id": "fric",
            "text": "Friction"
          },
          {
            "id": "push",
            "text": "A push from your hand"
          }
        ],
        "answers": [
          "grav",
          "mag"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which force is doing the work"
          },
          {
            "id": "trap",
            "text": "whether the thing slows down"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-4.10A-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Up or down the cycle",
    "teks": "4.10A",
    "pages": [
      {
        "rule": "Sort by how the water changes.",
        "notThis": "Water vapor is invisible. If you can see it, look again.",
        "groups": [
          {
            "id": "evap",
            "label": "Evaporation"
          },
          {
            "id": "cond",
            "label": "Condensation"
          }
        ],
        "items": [
          {
            "id": "puddle",
            "label": "A puddle dries up on a sunny day",
            "clue": "The water seems to vanish",
            "group": "evap"
          },
          {
            "id": "clothes",
            "label": "Wet clothes dry on a clothesline",
            "clue": "The wind is blowing",
            "group": "evap"
          },
          {
            "id": "sidewalk",
            "label": "A wet sidewalk dries after rain",
            "clue": "The Sun came out",
            "group": "evap"
          },
          {
            "id": "dew",
            "label": "Dew forms on grass in the morning",
            "clue": "It looks like it rained",
            "group": "cond"
          },
          {
            "id": "glass",
            "label": "Drops form on a glass of ice water",
            "clue": "The glass looks like it leaks",
            "group": "cond"
          },
          {
            "id": "pot",
            "label": "The white cloud above a boiling pot",
            "clue": "The pot is boiling",
            "group": "cond"
          }
        ]
      },
      {
        "rule": "Sort by how the water changes. Some do not change state.",
        "notThis": "Moving through the cycle is not the same as changing state.",
        "groups": [
          {
            "id": "evap",
            "label": "Evaporation"
          },
          {
            "id": "cond",
            "label": "Condensation"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "salt",
            "label": "Seawater dries and leaves salt behind",
            "clue": "Something is left over",
            "group": "evap"
          },
          {
            "id": "bowl",
            "label": "A dog's water bowl gets lower on a hot day",
            "clue": "The dog stayed inside",
            "group": "evap"
          },
          {
            "id": "mirror",
            "label": "A bathroom mirror fogs up",
            "clue": "Hot shower water",
            "group": "cond"
          },
          {
            "id": "breath",
            "label": "Your breath makes a cloud on a cold day",
            "clue": "It is warm air from inside you",
            "group": "cond"
          },
          {
            "id": "rain",
            "label": "Rain falls from a dark cloud",
            "clue": "Water drops are moving",
            "group": "neither"
          },
          {
            "id": "runoff",
            "label": "Rainwater flows down a street into a lake",
            "clue": "It is on the move",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "sun",
          "text": "Sun is heating it"
        },
        {
          "id": "gas",
          "text": "Liquid turns to gas"
        }
      ],
      "items": [
        {
          "id": "puddleV",
          "label": "A puddle dries in the sunshine",
          "sets": [
            "sun",
            "gas"
          ]
        },
        {
          "id": "towelV",
          "label": "A wet towel dries on a sunny beach",
          "sets": [
            "sun",
            "gas"
          ]
        },
        {
          "id": "snowV",
          "label": "Sunshine melts snow on a roof",
          "sets": [
            "sun"
          ]
        },
        {
          "id": "stoveV",
          "label": "Water boils away in a pot on a stove",
          "sets": [
            "gas"
          ]
        },
        {
          "id": "dryerV",
          "label": "A clothes dryer dries wet socks",
          "sets": [
            "gas"
          ]
        },
        {
          "id": "dewV",
          "label": "Dew forms on a car at night",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Water boils in a pot. You see a white cloud above it. What is the white cloud?",
        "choices": [
          {
            "id": "yes",
            "text": "Tiny drops of liquid water that condensed"
          },
          {
            "id": "trap",
            "text": "Water vapor, which is a gas"
          },
          {
            "id": "no",
            "text": "Smoke from the stove"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all that show condensation.",
        "choices": [
          {
            "id": "dew",
            "text": "Dew on grass"
          },
          {
            "id": "can",
            "text": "Drops on a cold can"
          },
          {
            "id": "puddle",
            "text": "A puddle drying up"
          },
          {
            "id": "mirror",
            "text": "A foggy mirror"
          },
          {
            "id": "rain",
            "text": "Rain falling"
          }
        ],
        "answers": [
          "dew",
          "can",
          "mirror"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether water becomes a gas or liquid drops"
          },
          {
            "id": "trap",
            "text": "whether you can see the water"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-4.10B-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Break, move, drop",
    "teks": "4.10B",
    "pages": [
      {
        "rule": "Sort each card by what is happening to the rock right now.",
        "notThis": "Broken pieces can still be on the move, so ask what is happening to them now.",
        "groups": [
          {
            "id": "wea",
            "label": "Weathering"
          },
          {
            "id": "ero",
            "label": "Erosion"
          }
        ],
        "items": [
          {
            "id": "iceboulder",
            "label": "Water freezes inside a crack, and the ice gradually splits a boulder in two.",
            "clue": "Water did it",
            "group": "wea"
          },
          {
            "id": "treerock",
            "label": "A tree grows in a crack, and its roots slowly force the rock apart.",
            "clue": "Plants are soft",
            "group": "wea"
          },
          {
            "id": "gravestone",
            "label": "Rain falls on an old gravestone for many years and gradually wears it down.",
            "clue": "Rain is moving water",
            "group": "wea"
          },
          {
            "id": "slide",
            "label": "Rainwater washes loose, broken rocks down the side of a steep hill.",
            "clue": "The rocks are already broken",
            "group": "ero"
          },
          {
            "id": "sandblow",
            "label": "A strong wind blows sand across the desert and carries it far away.",
            "clue": "Sand is tiny broken rock",
            "group": "ero"
          },
          {
            "id": "glacier",
            "label": "A huge glacier drags rocks and gravel along as it slides down a valley.",
            "clue": "Ice did it",
            "group": "ero"
          }
        ]
      },
      {
        "rule": "Sort by what is happening to the rock. Some cards show neither change.",
        "notThis": "Water, wind, and ice can each do all three jobs, so the cause is not the rule.",
        "groups": [
          {
            "id": "wea",
            "label": "Weathering"
          },
          {
            "id": "ero",
            "label": "Erosion"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "peak",
            "label": "On a cold mountaintop, freezing ice cracks the rocks into sharp pieces.",
            "clue": "Ice did it",
            "group": "wea"
          },
          {
            "id": "walk",
            "label": "Tree roots grow underneath a sidewalk and gradually crack the concrete.",
            "clue": "Roots grow very slowly",
            "group": "wea"
          },
          {
            "id": "beach",
            "label": "Ocean waves pull sand away from a beach and carry it out to sea.",
            "clue": "Sand is already broken rock",
            "group": "ero"
          },
          {
            "id": "dust",
            "label": "Strong wind lifts loose dust from a dry field and carries it off.",
            "clue": "It is a windy day",
            "group": "ero"
          },
          {
            "id": "delta",
            "label": "A river slows down where it meets the sea, and it drops its mud there.",
            "clue": "Moving water did it",
            "group": "neither"
          },
          {
            "id": "melt",
            "label": "A glacier melts and leaves behind a large pile of rocks and gravel.",
            "clue": "Ice did it",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "move",
          "text": "Carries pieces away"
        },
        {
          "id": "ice",
          "text": "Ice does it"
        }
      ],
      "items": [
        {
          "id": "glacierV",
          "label": "A glacier scrapes up rocks and carries them far down the valley.",
          "sets": [
            "move",
            "ice"
          ]
        },
        {
          "id": "riverV",
          "label": "After a storm, a fast river carries sand and mud downstream.",
          "sets": [
            "move"
          ]
        },
        {
          "id": "windV",
          "label": "Wind blows dry sand grains along the beach to a new spot.",
          "sets": [
            "move"
          ]
        },
        {
          "id": "frostV",
          "label": "High on a mountain, ice splits a rock into several sharp pieces.",
          "sets": [
            "ice"
          ]
        },
        {
          "id": "potholeV",
          "label": "Over many winters, freezing ice cracks the surface of a road.",
          "sets": [
            "ice"
          ]
        },
        {
          "id": "rootsV",
          "label": "Tree roots grow into a boulder and gradually split it apart.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "After a storm, broken rocks slide down to the bottom of a hill. Which slow change is this?",
        "choices": [
          {
            "id": "yes",
            "text": "Erosion, because the broken pieces are being carried to a new place."
          },
          {
            "id": "trap",
            "text": "Weathering, because the rocks are already broken into pieces."
          },
          {
            "id": "no",
            "text": "It is not a change to the surface of Earth at all."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the cards that show erosion, which carries pieces away.",
        "choices": [
          {
            "id": "dust",
            "text": "Wind carries dust off a dry field and far away."
          },
          {
            "id": "waves",
            "text": "Waves carry sand away from the beach and out to sea."
          },
          {
            "id": "crack",
            "text": "Ice splits a rock, but the pieces stay in the same place."
          },
          {
            "id": "mud",
            "text": "A river drops its mud in a spot where it slows down."
          }
        ],
        "answers": [
          "dust",
          "waves"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what happens to the rock pieces"
          },
          {
            "id": "trap",
            "text": "whether the rock looks broken"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-4.10C-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Today or always?",
    "teks": "4.10C",
    "pages": [
      {
        "rule": "Sort by how long a time the statement is about.",
        "notThis": "Rare does not mean climate. Ask: one time, or most years?",
        "groups": [
          {
            "id": "wx",
            "label": "Weather"
          },
          {
            "id": "clim",
            "label": "Climate"
          }
        ],
        "items": [
          {
            "id": "dallas",
            "label": "It snowed in Dallas yesterday.",
            "clue": "Snow is rare in Dallas",
            "group": "wx"
          },
          {
            "id": "austin",
            "label": "A thunderstorm hit Austin this afternoon.",
            "clue": "Storms happen there a lot",
            "group": "wx"
          },
          {
            "id": "tomorrow",
            "label": "Tomorrow will be windy and 75 degrees.",
            "clue": "It has a number",
            "group": "wx"
          },
          {
            "id": "houston",
            "label": "Houston is usually hot and humid in summer.",
            "clue": "Sounds like a forecast",
            "group": "clim"
          },
          {
            "id": "sahara",
            "label": "The Sahara Desert gets very little rain each year.",
            "clue": "Hot and sandy",
            "group": "clim"
          },
          {
            "id": "elpaso",
            "label": "El Paso gets about 9 inches of rain a year, on average.",
            "clue": "It has a number",
            "group": "clim"
          }
        ]
      },
      {
        "rule": "Sort by how long a time it is about. Some are not about the air.",
        "notThis": "A big, famous storm is still one time. Some sentences are not about the air at all.",
        "groups": [
          {
            "id": "wx",
            "label": "Weather"
          },
          {
            "id": "clim",
            "label": "Climate"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "heat",
            "label": "A record heat wave hit Lubbock last week.",
            "clue": "The hottest ever",
            "group": "wx"
          },
          {
            "id": "harvey",
            "label": "Hurricane Harvey flooded Houston in 2017.",
            "clue": "People still talk about it",
            "group": "wx"
          },
          {
            "id": "florida",
            "label": "Florida usually has warm winters.",
            "clue": "Some winters get cold",
            "group": "clim"
          },
          {
            "id": "antarctica",
            "label": "Antarctica is cold all year, every year.",
            "clue": "Some days are sunny",
            "group": "clim"
          },
          {
            "id": "quake",
            "label": "An earthquake shook a town last night.",
            "clue": "It happened fast",
            "group": "neither"
          },
          {
            "id": "tides",
            "label": "The tide goes in and out at Galveston every day.",
            "clue": "It happens every day",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "wx",
          "text": "Weather"
        },
        {
          "id": "tx",
          "text": "About Texas"
        }
      ],
      "items": [
        {
          "id": "iceV",
          "label": "An ice storm hit Fort Worth last night.",
          "sets": [
            "wx",
            "tx"
          ]
        },
        {
          "id": "hailV",
          "label": "Hail fell in Amarillo this afternoon.",
          "sets": [
            "wx",
            "tx"
          ]
        },
        {
          "id": "tokyoV",
          "label": "It is raining in Tokyo right now.",
          "sets": [
            "wx"
          ]
        },
        {
          "id": "coastV",
          "label": "The Texas coast usually has hot, humid summers.",
          "sets": [
            "tx"
          ]
        },
        {
          "id": "bigbendV",
          "label": "Big Bend is dry most of the year.",
          "sets": [
            "tx"
          ]
        },
        {
          "id": "alaskaV",
          "label": "Alaska has long, cold winters every year.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Snow is rare in Dallas. It snowed there yesterday. Is this weather or climate?",
        "choices": [
          {
            "id": "yes",
            "text": "Weather. It is about one day."
          },
          {
            "id": "trap",
            "text": "Climate, because snow there is so rare."
          },
          {
            "id": "no",
            "text": "Neither. Snow is not about the air."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the climate statements.",
        "choices": [
          {
            "id": "phoenix",
            "text": "Phoenix is very hot most summers."
          },
          {
            "id": "fog",
            "text": "It is foggy this morning."
          },
          {
            "id": "seattle",
            "text": "Seattle gets a lot of rain every year."
          },
          {
            "id": "tornado",
            "text": "A tornado touched down last night."
          },
          {
            "id": "mn",
            "text": "Minnesota has cold winters on average."
          }
        ],
        "answers": [
          "phoenix",
          "seattle",
          "mn"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "one time or the usual pattern"
          },
          {
            "id": "trap",
            "text": "how rare or big the event is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-4.11A-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Will it run out?",
    "teks": "4.11A",
    "pages": [
      {
        "rule": "Sort each card by whether nature can replace it in a short time.",
        "notThis": "Coming from living things long ago does not make a fuel renewable today.",
        "groups": [
          {
            "id": "ren",
            "label": "Renewable"
          },
          {
            "id": "non",
            "label": "Nonrenewable"
          }
        ],
        "items": [
          {
            "id": "wind",
            "label": "Wind",
            "clue": "You cannot see it",
            "group": "ren"
          },
          {
            "id": "sun",
            "label": "Sunlight",
            "clue": "It is gone at night",
            "group": "ren"
          },
          {
            "id": "cotton",
            "label": "Cotton plants",
            "clue": "Farmers have to plant them",
            "group": "ren"
          },
          {
            "id": "cattle",
            "label": "Beef cattle",
            "clue": "People raise them on ranches",
            "group": "ren"
          },
          {
            "id": "coal",
            "label": "Coal",
            "clue": "Made from plants long ago",
            "group": "non"
          },
          {
            "id": "oil",
            "label": "Oil",
            "clue": "Made from tiny sea life long ago",
            "group": "non"
          }
        ]
      },
      {
        "rule": "Sort by whether nature can replace it. Some things on these cards are not natural resources.",
        "notThis": "An object made from a natural resource is not a natural resource itself.",
        "groups": [
          {
            "id": "ren",
            "label": "Renewable"
          },
          {
            "id": "non",
            "label": "Nonrenewable"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "river",
            "label": "River water",
            "clue": "It can dry up in a drought",
            "group": "ren"
          },
          {
            "id": "pine",
            "label": "Pine trees",
            "clue": "They take years to grow",
            "group": "ren"
          },
          {
            "id": "gas",
            "label": "Natural gas",
            "clue": "Formed from living things long ago",
            "group": "non"
          },
          {
            "id": "ironore",
            "label": "Iron ore",
            "clue": "It is found in rocks",
            "group": "non"
          },
          {
            "id": "bottle",
            "label": "Plastic bottle",
            "clue": "Made from oil",
            "group": "neither"
          },
          {
            "id": "jar",
            "label": "Glass jar",
            "clue": "Made from sand",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "ren",
          "text": "Renewable"
        },
        {
          "id": "elec",
          "text": "Makes electricity"
        }
      ],
      "items": [
        {
          "id": "riverV",
          "label": "Flowing river water",
          "sets": [
            "ren",
            "elec"
          ]
        },
        {
          "id": "sunV",
          "label": "Sunlight",
          "sets": [
            "ren",
            "elec"
          ]
        },
        {
          "id": "woolV",
          "label": "Wool from sheep",
          "sets": [
            "ren"
          ]
        },
        {
          "id": "coalV",
          "label": "Coal",
          "sets": [
            "elec"
          ]
        },
        {
          "id": "gasV",
          "label": "Natural gas",
          "sets": [
            "elec"
          ]
        },
        {
          "id": "ironV",
          "label": "Iron ore",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Coal formed from plants that lived long ago. Is coal a renewable resource?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because coal takes millions of years to form deep underground."
          },
          {
            "id": "trap",
            "text": "Yes, because it came from plants, and plants grow back quickly."
          },
          {
            "id": "no",
            "text": "Yes, because workers make it in factories every day."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the resources that nature can replace in a short time.",
        "choices": [
          {
            "id": "wind",
            "text": "Wind"
          },
          {
            "id": "sun",
            "text": "Sunlight"
          },
          {
            "id": "oil",
            "text": "Oil"
          },
          {
            "id": "trees",
            "text": "Trees"
          },
          {
            "id": "gas",
            "text": "Natural gas"
          }
        ],
        "answers": [
          "wind",
          "sun",
          "trees"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how fast nature can replace it"
          },
          {
            "id": "trap",
            "text": "whether it came from living things"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-4.13B-CL",
    "subject": "Science",
    "grade": "Grade 4",
    "title": "Born with it?",
    "teks": "4.13B",
    "pages": [
      {
        "rule": "Sort each trait by how the living thing got it.",
        "notThis": "Looking like your family members is not the rule, so ask how the trait appeared.",
        "groups": [
          {
            "id": "inh",
            "label": "Inherited trait"
          },
          {
            "id": "acq",
            "label": "Acquired trait"
          }
        ],
        "items": [
          {
            "id": "eyes",
            "label": "Brown eyes",
            "clue": "Same as her best friend's",
            "group": "inh"
          },
          {
            "id": "tabby",
            "label": "A cat's striped fur",
            "clue": "Some cats have spots",
            "group": "inh"
          },
          {
            "id": "tulip",
            "label": "A tulip's red petals",
            "clue": "It grows in a sunny garden",
            "group": "inh"
          },
          {
            "id": "scar",
            "label": "A girl has a scar on her knee from an accident years ago.",
            "clue": "It has been there for years",
            "group": "acq"
          },
          {
            "id": "dyed",
            "label": "A girl dyes her hair a bright shade of purple.",
            "clue": "Her mom's hair is purple too",
            "group": "acq"
          },
          {
            "id": "muscle",
            "label": "A boy builds big muscles by lifting heavy weights every week.",
            "clue": "His dad is strong too",
            "group": "acq"
          }
        ]
      },
      {
        "rule": "Sort by how the living thing got the trait. Some are not body features.",
        "notThis": "Doing the same thing as your parents is a behavior, not a body feature.",
        "groups": [
          {
            "id": "inh",
            "label": "Inherited trait"
          },
          {
            "id": "acq",
            "label": "Acquired trait"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "ears",
            "label": "A dog's floppy ears",
            "clue": "Some dogs have pointy ears",
            "group": "inh"
          },
          {
            "id": "cactus",
            "label": "A cactus's sharp spines",
            "clue": "It grows in the hot desert",
            "group": "inh"
          },
          {
            "id": "bent",
            "label": "Strong winds gradually bent a tree, so now it leans to one side.",
            "clue": "It grew that way for years",
            "group": "acq"
          },
          {
            "id": "tooth",
            "label": "A boy chipped his front tooth when he fell on the playground.",
            "clue": "You can see it every day",
            "group": "acq"
          },
          {
            "id": "parrot",
            "label": "A pet parrot says \"hello\" whenever someone walks into the room.",
            "clue": "Its owner says it too",
            "group": "neither"
          },
          {
            "id": "bike",
            "label": "A girl knows how to ride a bike without training wheels.",
            "clue": "Her dad rides a bike too",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "inh",
          "text": "Inherited trait"
        },
        {
          "id": "plant",
          "text": "Plant trait"
        }
      ],
      "items": [
        {
          "id": "thornsV",
          "label": "A rose's thorns",
          "sets": [
            "inh",
            "plant"
          ]
        },
        {
          "id": "mapleV",
          "label": "The shape of a maple leaf",
          "sets": [
            "inh",
            "plant"
          ]
        },
        {
          "id": "zebraV",
          "label": "A zebra's stripes",
          "sets": [
            "inh"
          ]
        },
        {
          "id": "curlyV",
          "label": "Naturally curly hair",
          "sets": [
            "inh"
          ]
        },
        {
          "id": "sawV",
          "label": "A tree has a branch that a worker sawed off last spring.",
          "sets": [
            "plant"
          ]
        },
        {
          "id": "dogscarV",
          "label": "A dog got a scar on its nose from a sharp fence.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Sam lifts weights every week and gradually builds big muscles. His dad is strong too. What kind of trait are Sam's muscles?",
        "choices": [
          {
            "id": "yes",
            "text": "Acquired, because he built them during his own life."
          },
          {
            "id": "trap",
            "text": "Inherited, because his dad is strong too."
          },
          {
            "id": "no",
            "text": "Neither, because muscles are not actually a part of the body."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the inherited traits, which are passed down from parents.",
        "choices": [
          {
            "id": "neck",
            "text": "A giraffe's long neck"
          },
          {
            "id": "ears",
            "text": "A rabbit's long ears"
          },
          {
            "id": "scar",
            "text": "A scar from a cut"
          },
          {
            "id": "swim",
            "text": "Knowing how to swim"
          },
          {
            "id": "petals",
            "text": "A sunflower's yellow petals"
          }
        ],
        "answers": [
          "neck",
          "ears",
          "petals"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how the living thing got the trait"
          },
          {
            "id": "trap",
            "text": "whether family members look the same"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-4.3C-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Greek and Latin roots",
    "teks": "4.3C",
    "pages": [
      {
        "rule": "Sort each word by the Greek root it contains.",
        "notThis": "A root can hide in the middle or at the end of a word, so examine every part carefully.",
        "groups": [
          {
            "id": "auto",
            "label": "auto (self)"
          },
          {
            "id": "graph",
            "label": "graph (write)"
          }
        ],
        "items": [
          {
            "id": "automobile",
            "label": "automobile",
            "clue": "Another word for car",
            "group": "auto"
          },
          {
            "id": "automatic",
            "label": "automatic",
            "clue": "Store doors can be this",
            "group": "auto"
          },
          {
            "id": "autopilot",
            "label": "autopilot",
            "clue": "Airplanes use it",
            "group": "auto"
          },
          {
            "id": "paragraph",
            "label": "paragraph",
            "clue": "Starts with p-a-r-a",
            "group": "graph"
          },
          {
            "id": "photograph",
            "label": "photograph",
            "clue": "Starts with photo",
            "group": "graph"
          },
          {
            "id": "biography",
            "label": "biography",
            "clue": "A book about a real life",
            "group": "graph"
          }
        ]
      },
      {
        "rule": "Sort each word by its root. Some words belong in neither group.",
        "notThis": "Beginning with the same letters is not enough, because the meaning of the word part has to match the root.",
        "groups": [
          {
            "id": "auto",
            "label": "auto (self)"
          },
          {
            "id": "graph",
            "label": "graph (write)"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "autocorrect",
            "label": "autocorrect",
            "clue": "Fixes your spelling",
            "group": "auto"
          },
          {
            "id": "geography",
            "label": "geography",
            "clue": "About maps and places",
            "group": "graph"
          },
          {
            "id": "telegraph",
            "label": "telegraph",
            "clue": "An old way to send messages",
            "group": "graph"
          },
          {
            "id": "author",
            "label": "author",
            "clue": "A person who writes",
            "group": "neither"
          },
          {
            "id": "autumn",
            "label": "autumn",
            "clue": "Starts with a-u-t",
            "group": "neither"
          },
          {
            "id": "thermometer",
            "label": "thermometer",
            "clue": "Measures temperature",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "auto",
          "text": "auto (self)"
        },
        {
          "id": "graph",
          "text": "graph (write)"
        }
      ],
      "items": [
        {
          "id": "autographV",
          "label": "autograph",
          "sets": [
            "auto",
            "graph"
          ]
        },
        {
          "id": "autobioV",
          "label": "autobiography",
          "sets": [
            "auto",
            "graph"
          ]
        },
        {
          "id": "autoV",
          "label": "automatically",
          "sets": [
            "auto"
          ]
        },
        {
          "id": "photogV",
          "label": "photographer",
          "sets": [
            "graph"
          ]
        },
        {
          "id": "authorityV",
          "label": "authority",
          "sets": []
        },
        {
          "id": "centimeterV",
          "label": "centimeter",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "The word author begins with the letters a-u-t, and an author is a person who writes. Which root does author contain?",
        "choices": [
          {
            "id": "yes",
            "text": "None of these roots, because it only looks similar to auto."
          },
          {
            "id": "trap",
            "text": "The root auto, because the word begins with a-u-t."
          },
          {
            "id": "no",
            "text": "The root graph, because an author writes stories."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the words that contain the root graph, which means write or draw.",
        "choices": [
          {
            "id": "para",
            "text": "paragraph"
          },
          {
            "id": "auto",
            "text": "autograph"
          },
          {
            "id": "grapes",
            "text": "grapes"
          },
          {
            "id": "geo",
            "text": "geography"
          },
          {
            "id": "gravity",
            "text": "gravity"
          }
        ],
        "answers": [
          "para",
          "auto",
          "geo"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the root and what it means"
          },
          {
            "id": "trap",
            "text": "the first letters of the word"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-4.6F-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Saw it or figured it out?",
    "teks": "4.6F",
    "pages": [
      {
        "rule": "Read this scene. Jada hurried through the front door, and her umbrella dripped on the rug. Thick mud covered both of her boots. Her cheeks were pink, and she rubbed her hands together. She dropped her heavy backpack and yawned twice. A spelling test with a gold star stuck out of her pocket. Sort each statement by how you know it.",
        "notThis": "A statement can sound certain and still be an inference. Search the scene for the exact words before you decide.",
        "groups": [
          {
            "id": "obs",
            "label": "Observation"
          },
          {
            "id": "inf",
            "label": "Inference"
          }
        ],
        "items": [
          {
            "id": "umbrella",
            "label": "Jada's umbrella dripped on the rug.",
            "clue": "Easy to picture",
            "group": "obs"
          },
          {
            "id": "boots",
            "label": "Thick mud covered Jada's boots.",
            "clue": "About her boots",
            "group": "obs"
          },
          {
            "id": "hands",
            "label": "Jada rubbed her hands together.",
            "clue": "Maybe she was cold",
            "group": "obs"
          },
          {
            "id": "rain",
            "label": "It was raining outside.",
            "clue": "Sounds like a sure fact",
            "group": "inf"
          },
          {
            "id": "tired",
            "label": "Jada was tired.",
            "clue": "Said like a fact",
            "group": "inf"
          },
          {
            "id": "test",
            "label": "Jada did well on her spelling test.",
            "clue": "Sounds certain",
            "group": "inf"
          }
        ]
      },
      {
        "rule": "Read this scene. Jada hurried through the front door, and her umbrella dripped on the rug. Thick mud covered both of her boots. Her cheeks were pink, and she rubbed her hands together. She dropped her heavy backpack and yawned twice. A spelling test with a gold star stuck out of her pocket. Sort each statement by how you know it. Some statements have no clue.",
        "notThis": "Some statements sound reasonable, but no detail in the scene supports them. A guess without evidence is not an inference.",
        "groups": [
          {
            "id": "obs",
            "label": "Observation"
          },
          {
            "id": "inf",
            "label": "Inference"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "backpack",
            "label": "Jada dropped her heavy backpack.",
            "clue": "Sounds like a guess",
            "group": "obs"
          },
          {
            "id": "yawn",
            "label": "Jada yawned twice.",
            "clue": "Maybe she was sleepy",
            "group": "obs"
          },
          {
            "id": "cold",
            "label": "The weather outside was cold.",
            "clue": "Said like a sure fact",
            "group": "inf"
          },
          {
            "id": "school",
            "label": "Jada had just come home from school.",
            "clue": "Nobody says where she was",
            "group": "inf"
          },
          {
            "id": "cat",
            "label": "Jada has a pet cat at home.",
            "clue": "Sounds possible",
            "group": "neither"
          },
          {
            "id": "friend",
            "label": "Jada walked home with her best friend.",
            "clue": "Sounds likely",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "inf",
          "text": "Inference"
        },
        {
          "id": "feel",
          "text": "About a feeling"
        }
      ],
      "items": [
        {
          "id": "cryV",
          "label": "The story says Leo's eyes filled with tears as he waved goodbye to Grandma.",
          "sets": [
            "inf",
            "feel"
          ]
        },
        {
          "id": "slamV",
          "label": "The story says Mia slammed her bedroom door. You conclude that she is angry.",
          "sets": [
            "inf",
            "feel"
          ]
        },
        {
          "id": "grassV",
          "label": "The story says the sidewalk is covered with puddles. You conclude that it rained recently.",
          "sets": [
            "inf"
          ]
        },
        {
          "id": "scaredV",
          "label": "The story says, \"Mia was terrified of the dark.\"",
          "sets": [
            "feel"
          ]
        },
        {
          "id": "proudV",
          "label": "The story says, \"Leo felt proud of his science project.\"",
          "sets": [
            "feel"
          ]
        },
        {
          "id": "doorV",
          "label": "The story says, \"The front door was painted bright red.\"",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A story says that Kim's hands shook as she held her test. Tia says, \"Kim was nervous.\" Which choice describes what Tia said?",
        "choices": [
          {
            "id": "yes",
            "text": "It is an inference, because Tia used clues from the story to figure it out."
          },
          {
            "id": "trap",
            "text": "It is an observation, because Tia said it like a definite fact."
          },
          {
            "id": "no",
            "text": "It is only a guess, because the story provides no clue about it."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "A story says, \"Leo's shirt was soaked, and he was laughing. He held a water balloon.\" Choose all the inferences.",
        "choices": [
          {
            "id": "fun",
            "text": "Leo was enjoying himself during the water balloon fight."
          },
          {
            "id": "hit",
            "text": "A water balloon had splashed Leo."
          },
          {
            "id": "held",
            "text": "Leo was holding a water balloon."
          },
          {
            "id": "sis",
            "text": "Leo's older sister threw a balloon at him."
          }
        ],
        "answers": [
          "fun",
          "hit"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how you know each statement"
          },
          {
            "id": "trap",
            "text": "how certain each statement sounds"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-4.9D-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Text structure",
    "teks": "4.9D(iii)",
    "pages": [
      {
        "rule": "Sort each passage by how its ideas are organized.",
        "notThis": "Do not sort by a single joining word. Instead, decide what the whole passage is explaining.",
        "groups": [
          {
            "id": "cc",
            "label": "Compare and contrast"
          },
          {
            "id": "ce",
            "label": "Cause and effect"
          }
        ],
        "items": [
          {
            "id": "frogs",
            "label": "Frogs usually have smooth, moist skin. Toads usually have dry, bumpy skin.",
            "clue": "No but in it",
            "group": "cc"
          },
          {
            "id": "gators",
            "label": "Alligators and crocodiles are both large reptiles. But an alligator has a wider, rounder nose.",
            "clue": "Two reptiles",
            "group": "cc"
          },
          {
            "id": "seasons",
            "label": "Summer days in Texas are long and hot. Winter days are shorter and cooler.",
            "clue": "About the weather",
            "group": "cc"
          },
          {
            "id": "snowmelt",
            "label": "The spring sun melted the snow on the mountain. As a result, the river below rose higher.",
            "clue": "A mountain and a river",
            "group": "ce"
          },
          {
            "id": "power",
            "label": "Heavy ice coated the tree branches overnight. Because of this, many branches snapped and blocked the roads.",
            "clue": "About a storm",
            "group": "ce"
          },
          {
            "id": "plant",
            "label": "Mia watered her plant, but she kept it in a dark closet. Without sunlight, its leaves turned yellow.",
            "clue": "Uses the word but",
            "group": "ce"
          }
        ]
      },
      {
        "rule": "Sort each passage by how its ideas are organized. Some fit neither group.",
        "notThis": "The word \"but\" appears in many kinds of passages, so it cannot decide the structure by itself.",
        "groups": [
          {
            "id": "cc",
            "label": "Compare and contrast"
          },
          {
            "id": "ce",
            "label": "Cause and effect"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "bike",
            "label": "A bike and a scooter both have wheels. A bike has pedals, and a scooter does not.",
            "clue": "Two ways to ride",
            "group": "cc"
          },
          {
            "id": "pets",
            "label": "Cats and dogs can both be loving pets. Most cats enjoy time alone, but most dogs want company.",
            "clue": "About pets",
            "group": "cc"
          },
          {
            "id": "team",
            "label": "The team practiced hard, but their best player got sick. Because she missed the game, the team lost.",
            "clue": "Uses the word but",
            "group": "ce"
          },
          {
            "id": "beaver",
            "label": "Beavers built a sturdy dam across the creek. So the water backed up and formed a new pond.",
            "clue": "About animals",
            "group": "ce"
          },
          {
            "id": "library",
            "label": "Our library had too few books, but the town had an idea. Families donated books, and now every shelf is full.",
            "clue": "Uses the word but",
            "group": "neither"
          },
          {
            "id": "deer",
            "label": "Deer kept eating the lettuce in Grandpa's vegetable garden. He solved the problem by building a tall fence.",
            "clue": "About animals",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cc",
          "text": "Compare and contrast"
        },
        {
          "id": "both",
          "text": "Uses the word \"both\""
        }
      ],
      "items": [
        {
          "id": "beesV",
          "label": "Bees and butterflies both drink nectar from flowers. Only bees make honey.",
          "sets": [
            "cc",
            "both"
          ]
        },
        {
          "id": "owlsV",
          "label": "Owls and hawks are both birds that hunt. Owls hunt at night, and hawks hunt during the day.",
          "sets": [
            "cc",
            "both"
          ]
        },
        {
          "id": "marsV",
          "label": "Mars is a red, dry, and dusty planet. Earth has blue oceans and green forests.",
          "sets": [
            "cc"
          ]
        },
        {
          "id": "lightsV",
          "label": "Both lights flickered and went out during the thunderstorm. Because of this, we used flashlights.",
          "sets": [
            "both"
          ]
        },
        {
          "id": "tiresV",
          "label": "Both tires on my bicycle were completely flat. Dad repaired them with an air pump.",
          "sets": [
            "both"
          ]
        },
        {
          "id": "trashV",
          "label": "Our puppy chewed through his leash. He escaped and chased a squirrel across the park.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Ana says a passage is compare and contrast because it uses the word \"but.\" Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "Not always, because she should check whether it explains how two things are alike or different."
          },
          {
            "id": "trap",
            "text": "Yes, because the word \"but\" always means the passage is compare and contrast."
          },
          {
            "id": "no",
            "text": "No, because the word \"but\" always means the passage is problem and solution."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the signal words that often show cause and effect.",
        "choices": [
          {
            "id": "because",
            "text": "because"
          },
          {
            "id": "result",
            "text": "as a result"
          },
          {
            "id": "so",
            "text": "so"
          },
          {
            "id": "both",
            "text": "both"
          },
          {
            "id": "however",
            "text": "however"
          }
        ],
        "answers": [
          "because",
          "result",
          "so"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how the ideas are organized"
          },
          {
            "id": "trap",
            "text": "which joining words the passage uses"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-4.9B-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Picture words",
    "teks": "4.9B",
    "pages": [
      {
        "rule": "Sort each sentence by the way it compares two different things.",
        "notThis": "The word \"is\" appears in many sentences, so it cannot decide the answer alone. Notice how the two things are compared.",
        "groups": [
          {
            "id": "sim",
            "label": "Simile"
          },
          {
            "id": "met",
            "label": "Metaphor"
          }
        ],
        "items": [
          {
            "id": "lake",
            "label": "The frozen lake in the park is like a shiny mirror.",
            "clue": "Uses the word is",
            "group": "sim"
          },
          {
            "id": "grandpa",
            "label": "My grandfather was as tall as the oak tree in his yard.",
            "clue": "About a person",
            "group": "sim"
          },
          {
            "id": "sings",
            "label": "My sister sings like a songbird every single morning.",
            "clue": "About a sound",
            "group": "sim"
          },
          {
            "id": "zoo",
            "label": "After lunch, our classroom was a noisy, crowded zoo.",
            "clue": "Mentions animals",
            "group": "met"
          },
          {
            "id": "snow",
            "label": "Fresh snow is a soft white blanket covering the entire hill.",
            "clue": "Paints a winter picture",
            "group": "met"
          },
          {
            "id": "tornado",
            "label": "My little brother is a tornado whenever he visits the kitchen.",
            "clue": "Uses the word is",
            "group": "met"
          }
        ]
      },
      {
        "rule": "Sort each sentence by how it compares. Some sentences are neither.",
        "notThis": "The word \"like\" does not always create a simile. First decide whether two different things are really being compared.",
        "groups": [
          {
            "id": "sim",
            "label": "Simile"
          },
          {
            "id": "met",
            "label": "Metaphor"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "cheeks",
            "label": "The baby's cheeks were as red as ripe apples after her nap.",
            "clue": "About a color",
            "group": "sim"
          },
          {
            "id": "wolf",
            "label": "Tom gobbled his spaghetti dinner like a hungry wolf.",
            "clue": "About eating",
            "group": "sim"
          },
          {
            "id": "smile",
            "label": "Grandma's gentle smile is sunshine on a cloudy afternoon.",
            "clue": "A happy picture",
            "group": "met"
          },
          {
            "id": "pizza",
            "label": "I like pizza with extra cheese and a crunchy crust.",
            "clue": "Has the word like",
            "group": "neither"
          },
          {
            "id": "cats",
            "label": "Most cats like to nap in warm, sunny spots near windows.",
            "clue": "Has the word like",
            "group": "neither"
          },
          {
            "id": "wind",
            "label": "The wind whispered secrets through the tall pine trees.",
            "clue": "Paints a picture",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "comp",
          "text": "Compares two things"
        },
        {
          "id": "likeas",
          "text": "Uses \"like\" or \"as\""
        }
      ],
      "items": [
        {
          "id": "moonV",
          "label": "The moon was like a glowing lamp in the dark evening sky.",
          "sets": [
            "comp",
            "likeas"
          ]
        },
        {
          "id": "iceV",
          "label": "His fingers were as cold as ice after winter recess.",
          "sets": [
            "comp",
            "likeas"
          ]
        },
        {
          "id": "coinV",
          "label": "The full moon was a silver coin floating above the city.",
          "sets": [
            "comp"
          ]
        },
        {
          "id": "bootsV",
          "label": "I really like my new red rain boots.",
          "sets": [
            "likeas"
          ]
        },
        {
          "id": "sangV",
          "label": "We sang cheerful songs as we walked home from practice.",
          "sets": [
            "likeas"
          ]
        },
        {
          "id": "catV",
          "label": "Our orange cat sleeps on the living room rug all afternoon.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Which sentence is a simile?",
        "choices": [
          {
            "id": "yes",
            "text": "The clouds were like fluffy cotton balls floating overhead."
          },
          {
            "id": "trap",
            "text": "I like eating cotton candy at the county fair."
          },
          {
            "id": "no",
            "text": "The clouds were fluffy cotton balls floating overhead."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the sentences that are metaphors.",
        "choices": [
          {
            "id": "stars",
            "text": "The stars were sparkling diamonds scattered across the night sky."
          },
          {
            "id": "oven",
            "text": "The playground was an oven on that July afternoon."
          },
          {
            "id": "nurse",
            "text": "My aunt is a nurse at the children's hospital."
          },
          {
            "id": "glass",
            "text": "The ice on the pond was as smooth as glass."
          }
        ],
        "answers": [
          "stars",
          "oven"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how two things are compared"
          },
          {
            "id": "trap",
            "text": "whether the sentence has the word like"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-4.9A-CL",
    "subject": "ELAR",
    "grade": "Grade 4",
    "title": "Tall tale or legend?",
    "teks": "4.9A",
    "pages": [
      {
        "rule": "Sort each story by what kind of story it is.",
        "notThis": "Every story here has a remarkable hero, so a hero cannot decide the answer. Notice how each story is told.",
        "groups": [
          {
            "id": "tall",
            "label": "Tall tale"
          },
          {
            "id": "leg",
            "label": "Legend"
          }
        ],
        "items": [
          {
            "id": "pecos",
            "label": "Pecos Bill was a cowboy who used a live rattlesnake as his rope.",
            "clue": "Set in Texas",
            "group": "tall"
          },
          {
            "id": "paul",
            "label": "Paul Bunyan was a giant lumberjack. His huge footprints filled with rain and became lakes.",
            "clue": "A very strong hero",
            "group": "tall"
          },
          {
            "id": "stork",
            "label": "Baby Paul Bunyan was so enormous that five storks were needed to carry him.",
            "clue": "About a baby",
            "group": "tall"
          },
          {
            "id": "arthur",
            "label": "Long ago, young Arthur pulled a sword from a stone. That proved he should be king of Britain.",
            "clue": "Sounds impossible",
            "group": "leg"
          },
          {
            "id": "robin",
            "label": "Robin Hood lived in Sherwood Forest in England. He took from the rich and gave to the poor.",
            "clue": "A daring hero",
            "group": "leg"
          },
          {
            "id": "apple",
            "label": "Saint George fought a fierce dragon to save a town. People told his story for hundreds of years.",
            "clue": "Sounds impossible.",
            "group": "leg"
          }
        ]
      },
      {
        "rule": "Sort each story by what kind of story it is. Some are neither.",
        "notThis": "An amazing deed is not enough. Ask whether the storyteller stretches the truth on purpose to make you laugh.",
        "groups": [
          {
            "id": "tall",
            "label": "Tall tale"
          },
          {
            "id": "leg",
            "label": "Legend"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "babe",
            "label": "Paul Bunyan had a blue ox named Babe. Babe measured 42 ax handles between the eyes.",
            "clue": "About an animal",
            "group": "tall"
          },
          {
            "id": "tell",
            "label": "William Tell shot an apple off his son's head with a single arrow.",
            "clue": "An amazing shot",
            "group": "leg"
          },
          {
            "id": "mulan",
            "label": "Mulan took her father's place in the army. She fought bravely for twelve years.",
            "clue": "A brave hero",
            "group": "leg"
          },
          {
            "id": "tortoise",
            "label": "A slow tortoise beat a speedy hare in a race. Slow and steady wins the race.",
            "clue": "A hero who wins",
            "group": "neither"
          },
          {
            "id": "mouse",
            "label": "A tiny mouse chewed through a net to free a lion. Little friends can be a big help.",
            "clue": "A tiny hero",
            "group": "neither"
          },
          {
            "id": "crow",
            "label": "A thirsty crow dropped pebbles into a jar until the water rose. Little by little does the trick.",
            "clue": "A clever hero",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "tall",
          "text": "Tall tale"
        },
        {
          "id": "place",
          "text": "Names a real place"
        }
      ],
      "items": [
        {
          "id": "canyonV",
          "label": "Paul Bunyan dragged his giant ax behind him. It carved out the Grand Canyon.",
          "sets": [
            "tall",
            "place"
          ]
        },
        {
          "id": "tornadoV",
          "label": "Pecos Bill rode a wild tornado across Texas like a bucking horse.",
          "sets": [
            "tall",
            "place"
          ]
        },
        {
          "id": "griddleV",
          "label": "Paul Bunyan's pancake pan was gigantic. Cooks skated across it with butter tied to their feet.",
          "sets": [
            "tall"
          ]
        },
        {
          "id": "appleV",
          "label": "William Tell lived in the mountains of Switzerland. He was the best archer in the land.",
          "sets": [
            "place"
          ]
        },
        {
          "id": "robinV",
          "label": "Robin Hood hid from the sheriff in Sherwood Forest.",
          "sets": [
            "place"
          ]
        },
        {
          "id": "antV",
          "label": "An ant worked all summer while a grasshopper played. In winter, only the ant had food.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "In one story, Paul Bunyan's footprints became lakes. What makes this story a tall tale?",
        "choices": [
          {
            "id": "yes",
            "text": "The storyteller exaggerates on purpose to make the story funny."
          },
          {
            "id": "trap",
            "text": "It has a hero who does something amazing and brave."
          },
          {
            "id": "no",
            "text": "It teaches a lesson by using talking animals."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the sentences that are true about legends.",
        "choices": [
          {
            "id": "past",
            "text": "They tell about heroes from long ago."
          },
          {
            "id": "real",
            "text": "Some legends are based on real people."
          },
          {
            "id": "animals",
            "text": "They always include talking animals."
          },
          {
            "id": "funny",
            "text": "They exaggerate just to make readers laugh."
          }
        ],
        "answers": [
          "past",
          "real"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each story is told"
          },
          {
            "id": "trap",
            "text": "whether the story has a hero"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-4.2B-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "What is the digit worth?",
    "teks": "4.2B",
    "pages": [
      {
        "rule": "Sort each number by what its digit 7 is worth, based on its place.",
        "notThis": "Counting digits from the left can mislead you, because numbers have different lengths. The location of the 7 reveals its value instead.",
        "groups": [
          {
            "id": "h",
            "label": "Worth 700"
          },
          {
            "id": "t",
            "label": "Worth 70"
          }
        ],
        "items": [
          {
            "id": "n3742",
            "label": "3,742",
            "clue": "The 7 is the second digit",
            "group": "h"
          },
          {
            "id": "n709",
            "label": "709",
            "clue": "Only three digits",
            "group": "h"
          },
          {
            "id": "x5708",
            "label": "5,000 + 700 + 8",
            "clue": "Written as a sum",
            "group": "h"
          },
          {
            "id": "n1275",
            "label": "1,275",
            "clue": "Four digits",
            "group": "t"
          },
          {
            "id": "n961370",
            "label": "961,370",
            "clue": "A six-digit number",
            "group": "t"
          },
          {
            "id": "n48176",
            "label": "48,176",
            "clue": "The 7 is the fourth digit",
            "group": "t"
          }
        ]
      },
      {
        "rule": "Sort by what the 7 is worth. Some 7s have a different value.",
        "notThis": "Thinking a decimal point makes every digit small is a common error. Find the exact location of the 7 first.",
        "groups": [
          {
            "id": "h",
            "label": "Worth 700"
          },
          {
            "id": "t",
            "label": "Worth 70"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "n2305719",
            "label": "2,305,719",
            "clue": "An enormous number",
            "group": "h"
          },
          {
            "id": "x90705",
            "label": "90,000 + 700 + 5",
            "clue": "Written as a sum",
            "group": "h"
          },
          {
            "id": "d715",
            "label": "71.5",
            "clue": "Has a decimal point",
            "group": "t"
          },
          {
            "id": "x60075",
            "label": "600 + 70 + 5",
            "clue": "Only three parts",
            "group": "t"
          },
          {
            "id": "d473",
            "label": "4.73",
            "clue": "The 7 is the second digit",
            "group": "neither"
          },
          {
            "id": "n7250",
            "label": "7,250",
            "clue": "Four digits",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "h",
          "text": "7 is worth 700"
        },
        {
          "id": "dec",
          "text": "Has a decimal point"
        }
      ],
      "items": [
        {
          "id": "v7452",
          "label": "745.2",
          "sets": [
            "h",
            "dec"
          ]
        },
        {
          "id": "v6781",
          "label": "6,781",
          "sets": [
            "h"
          ]
        },
        {
          "id": "v407",
          "label": "4.07",
          "sets": [
            "dec"
          ]
        },
        {
          "id": "v1706",
          "label": "17.06",
          "sets": [
            "dec"
          ]
        },
        {
          "id": "v58172",
          "label": "58,172",
          "sets": []
        },
        {
          "id": "v70418",
          "label": "70,418",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Kim says the 7 in 71.5 is only worth 7, because numbers with decimals are small. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. The 7 is in the tens place, so its value is 70."
          },
          {
            "id": "trap",
            "text": "Yes. Any number with a decimal point must be a fairly small number."
          },
          {
            "id": "no",
            "text": "No. The 7 in that number is worth 700 instead."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose every number in which the digit 7 has a value of 700.",
        "choices": [
          {
            "id": "a",
            "text": "3,742"
          },
          {
            "id": "b",
            "text": "2,305,719"
          },
          {
            "id": "c",
            "text": "7,250"
          },
          {
            "id": "d",
            "text": "4.73"
          },
          {
            "id": "e",
            "text": "90,000 + 700 + 5"
          }
        ],
        "answers": [
          "a",
          "b",
          "e"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the place the 7 is in"
          },
          {
            "id": "trap",
            "text": "how many digits the number has"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-4.3C-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Hidden halves",
    "teks": "4.3C",
    "pages": [
      {
        "rule": "Sort each fraction by the amount it is equal to.",
        "notThis": "Large numbers do not always make a large fraction. Compare the top and bottom numbers together instead.",
        "groups": [
          {
            "id": "half",
            "label": "Equal to 1/2"
          },
          {
            "id": "whole",
            "label": "Equal to 1 whole"
          }
        ],
        "items": [
          {
            "id": "f2of4",
            "label": "2/4",
            "clue": "Only 2 on top",
            "group": "half"
          },
          {
            "id": "f6of12",
            "label": "6/12",
            "clue": "Twelve slices",
            "group": "half"
          },
          {
            "id": "f5of10",
            "label": "5/10",
            "clue": "The top number is odd",
            "group": "half"
          },
          {
            "id": "f3of3",
            "label": "3/3",
            "clue": "Small numbers",
            "group": "whole"
          },
          {
            "id": "f8of8",
            "label": "8/8",
            "clue": "Only 8 pieces",
            "group": "whole"
          },
          {
            "id": "f10of10",
            "label": "10/10",
            "clue": "Big numbers",
            "group": "whole"
          }
        ]
      },
      {
        "rule": "Sort each fraction by the amount it equals. Some are equal to neither.",
        "notThis": "A fraction that is close to 1/2 is not the same as one that is exactly equal to it.",
        "groups": [
          {
            "id": "half",
            "label": "Equal to 1/2"
          },
          {
            "id": "whole",
            "label": "Equal to 1 whole"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "f50of100",
            "label": "50/100",
            "clue": "Enormous numbers",
            "group": "half"
          },
          {
            "id": "f3of6",
            "label": "3/6",
            "clue": "The top number is odd",
            "group": "half"
          },
          {
            "id": "f4of8",
            "label": "4/8",
            "clue": "Two even numbers",
            "group": "half"
          },
          {
            "id": "f12of12",
            "label": "12/12",
            "clue": "Twelve slices",
            "group": "whole"
          },
          {
            "id": "f5of12",
            "label": "5/12",
            "clue": "Close to half",
            "group": "neither"
          },
          {
            "id": "f3of4",
            "label": "3/4",
            "clue": "Almost a whole",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "half",
          "text": "Equal to 1/2"
        },
        {
          "id": "eighths",
          "text": "Cut into eighths"
        }
      ],
      "items": [
        {
          "id": "v4of8",
          "label": "4/8",
          "sets": [
            "half",
            "eighths"
          ]
        },
        {
          "id": "v1of2",
          "label": "1/2",
          "sets": [
            "half"
          ]
        },
        {
          "id": "v3of6",
          "label": "3/6",
          "sets": [
            "half"
          ]
        },
        {
          "id": "v8of8",
          "label": "8/8",
          "sets": [
            "eighths"
          ]
        },
        {
          "id": "v3of8",
          "label": "3/8",
          "sets": [
            "eighths"
          ]
        },
        {
          "id": "v2of3",
          "label": "2/3",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Mia says 6/12 is greater than 1/2, because 6 and 12 are larger numbers. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. Six is exactly half of 12, so 6/12 and 1/2 are equal."
          },
          {
            "id": "trap",
            "text": "Yes. Larger numbers always make a larger fraction."
          },
          {
            "id": "no",
            "text": "No. 6/12 is actually equal to 1 whole."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the ways to show that 3/6 is equivalent to 1/2.",
        "choices": [
          {
            "id": "half",
            "text": "3 is exactly half of 6."
          },
          {
            "id": "draw",
            "text": "Sketch both fractions using same-size wholes. The shaded parts are the same size."
          },
          {
            "id": "small",
            "text": "3 and 6 are both fairly small numbers."
          },
          {
            "id": "bigger",
            "text": "6 is a larger number than 2."
          }
        ],
        "answers": [
          "half",
          "draw"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what each fraction is equal to"
          },
          {
            "id": "trap",
            "text": "how big the numbers are"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-4.5A-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Which operation?",
    "teks": "4.5A",
    "pages": [
      {
        "rule": "Sort each problem by the operation that solves it. Do not solve it yet.",
        "notThis": "Key words like \"each\" can be misleading. Instead, picture what is actually happening in the problem.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          }
        ],
        "items": [
          {
            "id": "seats",
            "label": "A theater has 32 rows with 45 seats in each row. How many seats?",
            "clue": "Asks how many",
            "group": "mult"
          },
          {
            "id": "pages",
            "label": "Maria reads 125 pages each week. How many pages does she read in 12 weeks?",
            "clue": "Has the word \"each\"",
            "group": "mult"
          },
          {
            "id": "corn",
            "label": "A farmer plants 18 rows of corn with 150 plants in each row. How many plants in all?",
            "clue": "Says \"in all\"",
            "group": "mult"
          },
          {
            "id": "buses",
            "label": "256 students are visiting the museum. How many buses are necessary if each bus holds 40?",
            "clue": "Has the word \"each\"",
            "group": "div"
          },
          {
            "id": "muffins",
            "label": "A baker packs 144 muffins into boxes of 6. How many boxes does she fill?",
            "clue": "Asks how many",
            "group": "div"
          },
          {
            "id": "stickers",
            "label": "Four friends share 1,200 stickers equally. How many stickers does each friend receive?",
            "clue": "A big number of stickers",
            "group": "div"
          }
        ]
      },
      {
        "rule": "Sort each problem by the operation that solves it. Some problems need neither one.",
        "notThis": "Phrases like \"in all\" and \"how many more\" appear in every kind of problem, so they are not reliable clues.",
        "groups": [
          {
            "id": "mult",
            "label": "Multiply"
          },
          {
            "id": "div",
            "label": "Divide"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "cans",
            "label": "A box holds 24 cans of soup. How many cans are in 150 boxes?",
            "clue": "The word \"holds\"",
            "group": "mult"
          },
          {
            "id": "sister",
            "label": "Jon has 245 cards, and his sister has 3 times as many. How many does she have?",
            "clue": "Compares two people",
            "group": "mult"
          },
          {
            "id": "pencils",
            "label": "A store has 3,600 pencils in all, in packs of 12. How many packs are there?",
            "clue": "Says \"in all\"",
            "group": "div"
          },
          {
            "id": "vans",
            "label": "A van holds 8 passengers. How many vans are necessary to carry 124 people to a concert?",
            "clue": "The word \"holds\"",
            "group": "div"
          },
          {
            "id": "brother",
            "label": "Jon has 245 cards, and his brother has 180 more. How many does his brother have?",
            "clue": "Compares two people",
            "group": "neither"
          },
          {
            "id": "books",
            "label": "A library had 1,250 books and donated 375. How many books are remaining?",
            "clue": "Books are shared out",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "div",
          "text": "Needs division"
        },
        {
          "id": "two",
          "text": "Needs two steps"
        }
      ],
      "items": [
        {
          "id": "teamsV",
          "label": "Two classes have 28 and 32 students. How many teams of 6 can they form altogether?",
          "sets": [
            "div",
            "two"
          ]
        },
        {
          "id": "muffinsV",
          "label": "A baker packs 168 muffins into boxes of 6. How many boxes does she fill?",
          "sets": [
            "div"
          ]
        },
        {
          "id": "stickersV",
          "label": "Five classmates share 1,500 stickers equally. How many stickers does each one receive?",
          "sets": [
            "div"
          ]
        },
        {
          "id": "booksV",
          "label": "Sam buys 12 books that cost $15 each. How much change does he get from $200?",
          "sets": [
            "two"
          ]
        },
        {
          "id": "birdsV",
          "label": "A farm has 1,340 chickens and 580 ducks. How many birds live on the farm altogether?",
          "sets": []
        },
        {
          "id": "seatsV",
          "label": "A stadium has 24 rows with 35 seats in each row. How many seats are there?",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "256 students are going on a field trip. Each bus holds 40 students. Which operation tells how many buses are needed?",
        "choices": [
          {
            "id": "yes",
            "text": "Divide, because you need to find how many groups of 40 fit into 256."
          },
          {
            "id": "trap",
            "text": "Multiply, because the problem includes the word \"each.\""
          },
          {
            "id": "no",
            "text": "Add, because the question asks \"how many.\""
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the problems that you would solve by multiplying.",
        "choices": [
          {
            "id": "cans",
            "text": "The number of cans in 150 boxes of 24"
          },
          {
            "id": "pages",
            "text": "The pages read in 12 weeks at 125 pages a week"
          },
          {
            "id": "packs",
            "text": "The number of packages of 12 made from 3,600 pencils"
          },
          {
            "id": "more",
            "text": "The cards Jon's brother has if he has 180 more than Jon"
          }
        ],
        "answers": [
          "cans",
          "pages"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what is happening in the problem"
          },
          {
            "id": "trap",
            "text": "key words like \"each\" and \"in all\""
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-4.5D-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Perimeter or area?",
    "teks": "4.5D",
    "pages": [
      {
        "rule": "Sort each problem by the measurement it needs: perimeter or area.",
        "notThis": "Measurements in feet cannot decide the answer, because perimeter and area problems both use feet. Instead, decide what the question is actually asking you to calculate.",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          }
        ],
        "items": [
          {
            "id": "fence",
            "label": "A garden is 12 feet by 8 feet. How much fence goes around it?",
            "clue": "Plants grow inside it",
            "group": "per"
          },
          {
            "id": "table",
            "label": "A square table is 4 feet on each side. How much trim goes around its edge?",
            "clue": "Has the word \"square\"",
            "group": "per"
          },
          {
            "id": "ribbon",
            "label": "A photo is 10 inches by 8 inches. How much ribbon is needed to go around its edge?",
            "clue": "Hangs on a big wall",
            "group": "per"
          },
          {
            "id": "ground",
            "label": "A garden is 12 feet by 8 feet. How much ground is inside the garden?",
            "clue": "Same size garden",
            "group": "area"
          },
          {
            "id": "rug",
            "label": "A rectangular rug is 9 feet long and 6 feet wide. How much floor does it cover?",
            "clue": "Sides measured in feet",
            "group": "area"
          },
          {
            "id": "tiles",
            "label": "A classroom floor is 30 feet by 25 feet. How many 1-foot square tiles are necessary to cover it?",
            "clue": "Each tile is 1 foot long",
            "group": "area"
          }
        ]
      },
      {
        "rule": "Sort each problem by the measurement it needs. Some problems need neither measurement.",
        "notThis": "A word like fence or cover can be misleading, because it may describe something other than the measurement. Carefully decide what the question is actually asking.",
        "groups": [
          {
            "id": "per",
            "label": "Perimeter"
          },
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "lap",
            "label": "A soccer field is 100 yards by 60 yards. How far is one lap around it?",
            "clue": "A huge field",
            "group": "per"
          },
          {
            "id": "lace",
            "label": "A tablecloth is 6 feet by 4 feet. How much lace is needed along all its edges?",
            "clue": "A cloth covers the table",
            "group": "per"
          },
          {
            "id": "paint",
            "label": "A bedroom wall is 10 feet tall and 14 feet wide. How much of the wall will the paint cover?",
            "clue": "Tall and wide",
            "group": "area"
          },
          {
            "id": "grass",
            "label": "A fence surrounds a yard that is 20 feet by 15 feet. How much grass is inside the fence?",
            "clue": "Has a fence",
            "group": "area"
          },
          {
            "id": "shelf",
            "label": "A wooden bookshelf is 6 feet tall and 3 feet wide. How many pounds of books can it hold?",
            "clue": "Sides in feet",
            "group": "neither"
          },
          {
            "id": "pool",
            "label": "A swimming pool is 25 meters long and 10 meters wide. What is the water temperature today?",
            "clue": "Two side lengths",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "per",
          "text": "Needs perimeter"
        },
        {
          "id": "area",
          "text": "Needs area"
        }
      ],
      "items": [
        {
          "id": "wallV",
          "label": "Ben will paint a wall that is 10 feet by 8 feet. Then he will put trim around its edge.",
          "sets": [
            "per",
            "area"
          ]
        },
        {
          "id": "parkV",
          "label": "A park is 50 yards by 40 yards. Workers will plant grass on it and build a fence around it.",
          "sets": [
            "per",
            "area"
          ]
        },
        {
          "id": "sandV",
          "label": "A sandbox is 6 feet by 5 feet. How much lumber is necessary to go around its sides?",
          "sets": [
            "per"
          ]
        },
        {
          "id": "patioV",
          "label": "A patio is 12 feet by 10 feet. How much ground will the bricks cover?",
          "sets": [
            "area"
          ]
        },
        {
          "id": "matV",
          "label": "A gymnastics mat is 7 feet by 5 feet. How much of the gym floor does it cover?",
          "sets": [
            "area"
          ]
        },
        {
          "id": "classV",
          "label": "A classroom is 30 feet by 25 feet. How many students are attending the class this year?",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A rectangular rug is 9 feet by 6 feet. Kai wants to know how much of the floor it covers. What does he need to calculate?",
        "choices": [
          {
            "id": "yes",
            "text": "Area, because he wants to know the amount of surface that the rug covers."
          },
          {
            "id": "trap",
            "text": "Perimeter, because the sides of the rug are measured in feet."
          },
          {
            "id": "no",
            "text": "Neither, because a rug is not exactly a rectangle."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the situations that require calculating the perimeter.",
        "choices": [
          {
            "id": "fence",
            "text": "Putting a fence around a garden"
          },
          {
            "id": "lace",
            "text": "Sewing lace along a tablecloth's edges"
          },
          {
            "id": "tile",
            "text": "Covering a floor with tiles"
          },
          {
            "id": "paint",
            "text": "Covering a wall with paint"
          },
          {
            "id": "lap",
            "text": "Running one lap around a field"
          }
        ],
        "answers": [
          "fence",
          "lace",
          "lap"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the distance around or the space inside"
          },
          {
            "id": "trap",
            "text": "the units in the problem"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-4.6C-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Which triangle?",
    "teks": "4.6C",
    "pages": [
      {
        "rule": "Sort each triangle by its kind. Look carefully at all three angles.",
        "notThis": "A tiny angle does not decide the type, because every triangle has at least two acute angles. Check the widest angle instead.",
        "groups": [
          {
            "id": "right",
            "label": "Right triangle"
          },
          {
            "id": "obtuse",
            "label": "Obtuse triangle"
          }
        ],
        "items": [
          {
            "id": "t905040",
            "label": "Angles: 90°, 50°, 40°",
            "clue": "Two acute angles",
            "group": "right"
          },
          {
            "id": "t108090",
            "label": "Angles: 10°, 80°, 90°",
            "clue": "Has a tiny 10° angle",
            "group": "right"
          },
          {
            "id": "t459045",
            "label": "Angles: 45°, 90°, 45°",
            "clue": "Two angles match",
            "group": "right"
          },
          {
            "id": "t1203030",
            "label": "Angles: 120°, 30°, 30°",
            "clue": "Two angles match",
            "group": "obtuse"
          },
          {
            "id": "t2025135",
            "label": "Angles: 20°, 25°, 135°",
            "clue": "Starts with small angles",
            "group": "obtuse"
          },
          {
            "id": "t359550",
            "label": "Angles: 35°, 95°, 50°",
            "clue": "95° is close to 90°",
            "group": "obtuse"
          }
        ]
      },
      {
        "rule": "Sort each triangle by its kind. Some triangles are neither type.",
        "notThis": "Check whether any angle is exactly 90° or more than 90°.",
        "groups": [
          {
            "id": "right",
            "label": "Right triangle"
          },
          {
            "id": "obtuse",
            "label": "Obtuse triangle"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "t304090",
            "label": "Angles: 30°, 60°, 90°",
            "clue": "Starts with small angles",
            "group": "right"
          },
          {
            "id": "t58590",
            "label": "Angles: 5°, 85°, 90°",
            "clue": "Has a tiny 5° angle",
            "group": "right"
          },
          {
            "id": "t914544",
            "label": "Angles: 91°, 45°, 44°",
            "clue": "91° is almost 90°",
            "group": "obtuse"
          },
          {
            "id": "t1515015",
            "label": "Angles: 15°, 150°, 15°",
            "clue": "Two tiny angles",
            "group": "obtuse"
          },
          {
            "id": "t894645",
            "label": "Angles: 89°, 46°, 45°",
            "clue": "89° is almost 90°",
            "group": "neither"
          },
          {
            "id": "t606060",
            "label": "Angles: 60°, 60°, 60°",
            "clue": "All three angles match",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "hasright",
          "text": "Has a right angle"
        },
        {
          "id": "twoeq",
          "text": "Has two equal angles"
        }
      ],
      "items": [
        {
          "id": "vt904545",
          "label": "Angles: 90°, 45°, 45°",
          "sets": [
            "hasright",
            "twoeq"
          ]
        },
        {
          "id": "vt306090",
          "label": "Angles: 30°, 90°, 60°",
          "sets": [
            "hasright"
          ]
        },
        {
          "id": "vt1203030",
          "label": "Angles: 120°, 30°, 30°",
          "sets": [
            "twoeq"
          ]
        },
        {
          "id": "vt707040",
          "label": "Angles: 70°, 40°, 70°",
          "sets": [
            "twoeq"
          ]
        },
        {
          "id": "vt1005030",
          "label": "Angles: 100°, 50°, 30°",
          "sets": []
        },
        {
          "id": "vt806040",
          "label": "Angles: 80°, 60°, 40°",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A triangle has angles of 10°, 80°, and 90°. Ava says it is acute, because 10° is so small. Is she right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. It has an exact 90° angle, so it is a right triangle."
          },
          {
            "id": "trap",
            "text": "Yes. One tiny angle makes the whole triangle acute."
          },
          {
            "id": "no",
            "text": "No. It is obtuse, because 80° is a fairly wide angle."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the triangles that have one obtuse angle.",
        "choices": [
          {
            "id": "a",
            "text": "Angles: 91°, 45°, 44°"
          },
          {
            "id": "b",
            "text": "Angles: 15°, 150°, 15°"
          },
          {
            "id": "c",
            "text": "Angles: 89°, 46°, 45°"
          },
          {
            "id": "d",
            "text": "Angles: 90°, 50°, 40°"
          }
        ],
        "answers": [
          "a",
          "b"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the largest angle in each triangle"
          },
          {
            "id": "trap",
            "text": "the smallest angle in each triangle"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-4.8A-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Which system?",
    "teks": "4.8A",
    "pages": [
      {
        "rule": "Sort each unit by the measurement system it belongs to.",
        "notThis": "Two units can measure the same thing and still belong to different systems, so check the system instead.",
        "groups": [
          {
            "id": "met",
            "label": "Metric unit"
          },
          {
            "id": "cust",
            "label": "Customary unit"
          }
        ],
        "items": [
          {
            "id": "liter",
            "label": "Liter",
            "clue": "Measures liquid",
            "group": "met"
          },
          {
            "id": "meter",
            "label": "Meter",
            "clue": "Measures length",
            "group": "met"
          },
          {
            "id": "gram",
            "label": "Gram",
            "clue": "About as heavy as a paperclip",
            "group": "met"
          },
          {
            "id": "quart",
            "label": "Quart",
            "clue": "Measures liquid",
            "group": "cust"
          },
          {
            "id": "yard",
            "label": "Yard",
            "clue": "About as long as a meter",
            "group": "cust"
          },
          {
            "id": "pound",
            "label": "Pound",
            "clue": "Measures weight",
            "group": "cust"
          }
        ]
      },
      {
        "rule": "Sort each unit by its measurement system. Some units belong to neither system.",
        "notThis": "What a unit measures is not the rule. The system it comes from is what matters.",
        "groups": [
          {
            "id": "met",
            "label": "Metric unit"
          },
          {
            "id": "cust",
            "label": "Customary unit"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "km",
            "label": "Kilometer",
            "clue": "Used for long road trips",
            "group": "met"
          },
          {
            "id": "ml",
            "label": "Milliliter",
            "clue": "Used for a medicine dose",
            "group": "met"
          },
          {
            "id": "mile",
            "label": "Mile",
            "clue": "Used for long road trips",
            "group": "cust"
          },
          {
            "id": "ounce",
            "label": "Ounce",
            "clue": "Weighs very little",
            "group": "cust"
          },
          {
            "id": "minute",
            "label": "Minute",
            "clue": "Very short",
            "group": "neither"
          },
          {
            "id": "hour",
            "label": "Hour",
            "clue": "Used every day",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "met",
          "text": "Metric unit"
        },
        {
          "id": "mass",
          "text": "Measures mass or weight"
        }
      ],
      "items": [
        {
          "id": "kgV",
          "label": "Kilogram",
          "sets": [
            "met",
            "mass"
          ]
        },
        {
          "id": "mgV",
          "label": "Milligram",
          "sets": [
            "met",
            "mass"
          ]
        },
        {
          "id": "cmV",
          "label": "Centimeter",
          "sets": [
            "met"
          ]
        },
        {
          "id": "lbV",
          "label": "Pound",
          "sets": [
            "mass"
          ]
        },
        {
          "id": "galV",
          "label": "Gallon",
          "sets": []
        },
        {
          "id": "ftV",
          "label": "Foot",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A liter and a quart both measure liquid. Do they belong to the same system?",
        "choices": [
          {
            "id": "yes",
            "text": "No. A liter is a metric unit, but a quart is a customary unit."
          },
          {
            "id": "trap",
            "text": "Yes. They both measure liquid, so they must match."
          },
          {
            "id": "no",
            "text": "No. A liter is customary, and a quart is metric."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose every unit that belongs to the metric system.",
        "choices": [
          {
            "id": "km",
            "text": "Kilometer"
          },
          {
            "id": "ml",
            "text": "Milliliter"
          },
          {
            "id": "mi",
            "text": "Mile"
          },
          {
            "id": "lb",
            "text": "Pound"
          },
          {
            "id": "g",
            "text": "Gram"
          }
        ],
        "answers": [
          "km",
          "ml",
          "g"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which system a unit is from"
          },
          {
            "id": "trap",
            "text": "what a unit measures"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-4.10A-CL",
    "subject": "Math",
    "grade": "Grade 4",
    "title": "Fixed or changing bill?",
    "teks": "4.10A",
    "pages": [
      {
        "rule": "Sort each expense by whether its amount stays the same or changes.",
        "notThis": "A bill that arrives every month is not always fixed, because its amount can still change. Look closely at the amount instead.",
        "groups": [
          {
            "id": "fixed",
            "label": "Fixed expense"
          },
          {
            "id": "var",
            "label": "Variable expense"
          }
        ],
        "items": [
          {
            "id": "rent",
            "label": "The family pays their landlord the same $900 rent every single month.",
            "clue": "A very big bill",
            "group": "fixed"
          },
          {
            "id": "phone",
            "label": "Dad's phone plan charges exactly $40 each month, all year long.",
            "clue": "A small bill",
            "group": "fixed"
          },
          {
            "id": "carpay",
            "label": "The car payment is always $250, and it is due every month.",
            "clue": "For the car",
            "group": "fixed"
          },
          {
            "id": "elec",
            "label": "The electric bill was $85 in May, but it climbed to $140 in July.",
            "clue": "Comes every month",
            "group": "var"
          },
          {
            "id": "water",
            "label": "The water bill was $38 in March and $61 in August, when the lawn needed water.",
            "clue": "Comes every month",
            "group": "var"
          },
          {
            "id": "gas",
            "label": "Filling the car with gas cost $30 one week and $55 the next week.",
            "clue": "For the car",
            "group": "var"
          }
        ]
      },
      {
        "rule": "Sort each item by whether its amount stays the same or changes. Some items are not expenses.",
        "notThis": "An expense is money you pay out. Money that you earn or receive is income instead, so it is not an expense.",
        "groups": [
          {
            "id": "fixed",
            "label": "Fixed expense"
          },
          {
            "id": "var",
            "label": "Variable expense"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "insure",
            "label": "Car insurance costs the household exactly $120 every month.",
            "clue": "For the car, like gas",
            "group": "fixed"
          },
          {
            "id": "swim",
            "label": "Swim lessons at the neighborhood pool cost a steady $60 each month.",
            "clue": "Just for fun",
            "group": "fixed"
          },
          {
            "id": "grocery",
            "label": "Groceries cost $95 one week and $130 the next, depending on what the family needs.",
            "clue": "Food you need",
            "group": "var"
          },
          {
            "id": "eatout",
            "label": "Eating at restaurants cost $20 one week and $45 the following week.",
            "clue": "Once a week",
            "group": "var"
          },
          {
            "id": "paycheck",
            "label": "Mom receives a paycheck of $1,200 from her job every two weeks.",
            "clue": "Same amount each time",
            "group": "neither"
          },
          {
            "id": "lemon",
            "label": "Maya earned $18 on Saturday by selling lemonade to her neighbors.",
            "clue": "Changes every weekend",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "fixed",
          "text": "Fixed expense"
        },
        {
          "id": "month",
          "text": "Paid every month"
        }
      ],
      "items": [
        {
          "id": "rentV",
          "label": "Their apartment rent is $900, and the amount never changes from month to month.",
          "sets": [
            "fixed",
            "month"
          ]
        },
        {
          "id": "phoneV",
          "label": "A phone plan costs exactly $40, and the bill arrives monthly.",
          "sets": [
            "fixed",
            "month"
          ]
        },
        {
          "id": "zooV",
          "label": "A family zoo pass costs $120, and they purchase it once a year.",
          "sets": [
            "fixed"
          ]
        },
        {
          "id": "elecV",
          "label": "The electric bill arrives monthly, but the amount is different each time.",
          "sets": [
            "month"
          ]
        },
        {
          "id": "repairV",
          "label": "A car repair cost $300 when the engine suddenly broke down.",
          "sets": []
        },
        {
          "id": "giftV",
          "label": "The family spends more on birthday gifts in some years and less in others.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "The electric bill arrives every month. Sam says that makes it a fixed expense. Is he right?",
        "choices": [
          {
            "id": "yes",
            "text": "No. The amount changes from month to month, so it is a variable expense."
          },
          {
            "id": "trap",
            "text": "Yes. It arrives every month, so it must be a fixed expense."
          },
          {
            "id": "no",
            "text": "No. A bill is not an expense, so it belongs in neither group."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose every expense that is fixed, because its amount stays the same.",
        "choices": [
          {
            "id": "rent",
            "text": "The family pays their landlord the same $900 rent every single month."
          },
          {
            "id": "phone",
            "text": "Dad's phone plan charges exactly $40 each month, all year long."
          },
          {
            "id": "water",
            "text": "The water bill was $38 in March and $61 in August, when the lawn needed water."
          },
          {
            "id": "pay",
            "text": "Mom receives a paycheck of $1,200 from her job every two weeks."
          }
        ],
        "answers": [
          "rent",
          "phone"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the amount stays the same"
          },
          {
            "id": "trap",
            "text": "how often the bill comes"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-4.4B-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Which industry?",
    "teks": "4.4B",
    "pages": [
      {
        "rule": "Sort each event by the Texas industry it belongs to.",
        "notThis": "Cattle and trains were connected, so ask which industry the event is mainly about.",
        "groups": [
          {
            "id": "cat",
            "label": "Cattle industry"
          },
          {
            "id": "rr",
            "label": "Railroad industry"
          }
        ],
        "items": [
          {
            "id": "chisholm",
            "label": "Cowboys drive longhorn cattle north on the Chisholm Trail.",
            "clue": "It ended at a railroad town",
            "group": "cat"
          },
          {
            "id": "king",
            "label": "In 1853, Richard King starts a South Texas ranch that grows huge.",
            "clue": "He once ran steamboats",
            "group": "cat"
          },
          {
            "id": "chuck",
            "label": "Charles Goodnight is credited with inventing the chuck wagon for trail drives.",
            "clue": "It rolls on wheels",
            "group": "cat"
          },
          {
            "id": "track",
            "label": "Workers lay hundreds of miles of new track across Texas.",
            "clue": "Hard work in the hot sun",
            "group": "rr"
          },
          {
            "id": "trip",
            "label": "Passengers ride from Houston to Dallas in one day instead of many.",
            "clue": "A much faster trip",
            "group": "rr"
          },
          {
            "id": "town",
            "label": "A town grows near the new tracks, while a town the tracks skip shrinks.",
            "clue": "People move closer",
            "group": "rr"
          }
        ]
      },
      {
        "rule": "Sort by industry again, but some events belong to neither industry.",
        "notThis": "Ask which industry each event is mainly about.",
        "groups": [
          {
            "id": "cat",
            "label": "Cattle industry"
          },
          {
            "id": "rr",
            "label": "Railroad industry"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "lizzie",
            "label": "Lizzie Johnson rides the Chisholm Trail with her own herd in 1879.",
            "clue": "She taught school first",
            "group": "cat"
          },
          {
            "id": "ja",
            "label": "Charles Goodnight starts the JA Ranch in Palo Duro Canyon.",
            "clue": "Far up in the Panhandle",
            "group": "cat"
          },
          {
            "id": "cotton",
            "label": "Trains begin carrying Texas cotton to faraway ports and cities.",
            "clue": "Cotton is a crop",
            "group": "rr"
          },
          {
            "id": "station",
            "label": "Towns compete to get a railroad station so they can grow.",
            "clue": "Towns wanted more people",
            "group": "rr"
          },
          {
            "id": "spindle",
            "label": "Oil gushes out of the Spindletop well near Beaumont in 1901.",
            "clue": "A huge event in Texas",
            "group": "neither"
          },
          {
            "id": "pipe",
            "label": "Pipelines carry oil from Texas fields to refineries on the coast.",
            "clue": "Moves goods across Texas",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cat",
          "text": "Cattle industry"
        },
        {
          "id": "rr",
          "text": "Railroad industry"
        }
      ],
      "items": [
        {
          "id": "ship",
          "label": "Ranchers load cattle into railroad cars to send them to northern markets.",
          "sets": [
            "cat",
            "rr"
          ]
        },
        {
          "id": "yards",
          "label": "Cattle pens are built right beside the railroad tracks in Fort Worth.",
          "sets": [
            "cat",
            "rr"
          ]
        },
        {
          "id": "brand",
          "label": "Lizzie Johnson registers her own cattle brand in Texas.",
          "sets": [
            "cat"
          ]
        },
        {
          "id": "kingV",
          "label": "Richard King's ranch grows to cover hundreds of thousands of acres.",
          "sets": [
            "cat"
          ]
        },
        {
          "id": "elpaso",
          "label": "Rail lines join San Antonio and El Paso in 1883.",
          "sets": [
            "rr"
          ]
        },
        {
          "id": "higgins",
          "label": "Pattillo Higgins predicts that oil lies under a hill near Beaumont.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Cowboys drove cattle up the Chisholm Trail to a railroad town in Kansas. Which industry is the trail drive part of?",
        "choices": [
          {
            "id": "yes",
            "text": "The cattle industry, because the drive moved herds of cattle."
          },
          {
            "id": "trap",
            "text": "The railroad industry, because the trail ended at the tracks."
          },
          {
            "id": "no",
            "text": "The oil industry, because the trail began in Texas."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the ways that railroads changed life in Texas.",
        "choices": [
          {
            "id": "towns",
            "text": "Towns near the tracks often grew larger."
          },
          {
            "id": "fast",
            "text": "People and goods could travel much faster."
          },
          {
            "id": "ship",
            "text": "Ranchers could ship cattle to markets by train."
          },
          {
            "id": "oil",
            "text": "Oil gushed from the ground at Spindletop."
          }
        ],
        "answers": [
          "towns",
          "fast",
          "ship"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what each event is mainly about"
          },
          {
            "id": "trap",
            "text": "whether trains are involved"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-4.6A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Far from the beach",
    "teks": "4.6A",
    "pages": [
      {
        "rule": "Sort each place by the region of Texas where it is found.",
        "notThis": "A region is huge, so one photo cannot show everything about the whole region.",
        "groups": [
          {
            "id": "cp",
            "label": "Coastal Plains"
          },
          {
            "id": "mb",
            "label": "Mountains and Basins"
          }
        ],
        "items": [
          {
            "id": "galveston",
            "label": "Galveston Island",
            "clue": "Sandy beach",
            "group": "cp"
          },
          {
            "id": "piney",
            "label": "Piney Woods",
            "clue": "Tall pine forest, far from the beach",
            "group": "cp"
          },
          {
            "id": "houston",
            "label": "Houston",
            "clue": "Big city",
            "group": "cp"
          },
          {
            "id": "guadalupe",
            "label": "Guadalupe Mountains",
            "clue": "Highest point in Texas",
            "group": "mb"
          },
          {
            "id": "saltflat",
            "label": "Salt flats in far West Texas",
            "clue": "Flat and low",
            "group": "mb"
          },
          {
            "id": "elpaso",
            "label": "El Paso",
            "clue": "Big city",
            "group": "mb"
          }
        ]
      },
      {
        "rule": "Sort by the region each place is in. Some places are in neither region.",
        "notThis": "One photo cannot show a whole region. Find where the place is on a Texas map.",
        "groups": [
          {
            "id": "cp",
            "label": "Coastal Plains"
          },
          {
            "id": "mb",
            "label": "Mountains and Basins"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "dallas",
            "label": "Dallas",
            "clue": "Hundreds of miles from the coast",
            "group": "cp"
          },
          {
            "id": "corpus",
            "label": "Corpus Christi",
            "clue": "Port city",
            "group": "cp"
          },
          {
            "id": "davis",
            "label": "Davis Mountains",
            "clue": "Cool, green hills",
            "group": "mb"
          },
          {
            "id": "bigbend",
            "label": "Big Bend National Park",
            "clue": "Next to the Rio Grande",
            "group": "mb"
          },
          {
            "id": "paloduro",
            "label": "Palo Duro Canyon",
            "clue": "Tall red cliffs",
            "group": "neither"
          },
          {
            "id": "ftworth",
            "label": "Fort Worth",
            "clue": "Right next to Dallas",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cp",
          "text": "Coastal Plains"
        },
        {
          "id": "rio",
          "text": "On the Rio Grande"
        }
      ],
      "items": [
        {
          "id": "brownsville",
          "label": "Brownsville",
          "sets": [
            "cp",
            "rio"
          ]
        },
        {
          "id": "laredo",
          "label": "Laredo",
          "sets": [
            "cp",
            "rio"
          ]
        },
        {
          "id": "beaumont",
          "label": "Beaumont",
          "sets": [
            "cp"
          ]
        },
        {
          "id": "elpasoV",
          "label": "El Paso",
          "sets": [
            "rio"
          ]
        },
        {
          "id": "lubbock",
          "label": "Lubbock",
          "sets": []
        },
        {
          "id": "abilene",
          "label": "Abilene",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Dallas is hundreds of miles from the beach. Why is it still part of the Coastal Plains?",
        "choices": [
          {
            "id": "yes",
            "text": "The Coastal Plains region stretches far inland, well beyond the coast."
          },
          {
            "id": "trap",
            "text": "Because it is a big city, just like Houston."
          },
          {
            "id": "no",
            "text": "Because it sits right on the banks of the Rio Grande."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the statements that are true about the Mountains and Basins region.",
        "choices": [
          {
            "id": "west",
            "text": "It is located in far West Texas."
          },
          {
            "id": "high",
            "text": "It includes the highest point in Texas."
          },
          {
            "id": "beach",
            "text": "It has sandy beaches along the ocean."
          },
          {
            "id": "allmtn",
            "text": "Every place in the region is a mountain."
          }
        ],
        "answers": [
          "west",
          "high"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "where each place is"
          },
          {
            "id": "trap",
            "text": "what each place looks like"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-4.10A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Price up or down?",
    "teks": "4.10A",
    "pages": [
      {
        "rule": "Sort each event by what will likely happen to the price.",
        "notThis": "Ask what changed: how much sellers have, or how much buyers want. How a place looks is not the rule.",
        "groups": [
          {
            "id": "up",
            "label": "Price likely goes up"
          },
          {
            "id": "down",
            "label": "Price likely goes down"
          }
        ],
        "items": [
          {
            "id": "freeze",
            "label": "A hard freeze destroys much of the Texas grapefruit crop.",
            "clue": "Cold weather hits the farms",
            "group": "up"
          },
          {
            "id": "fans",
            "label": "A heat wave makes many more families want to buy fans.",
            "clue": "Stores already sell fans",
            "group": "up"
          },
          {
            "id": "toyhit",
            "label": "Many families want a new toy, but stores have only a few.",
            "clue": "Shelves are nearly empty",
            "group": "up"
          },
          {
            "id": "pizza",
            "label": "Three new pizza shops open on the same busy street.",
            "clue": "The street gets more crowded",
            "group": "down"
          },
          {
            "id": "melons",
            "label": "Farmers grow the biggest watermelon crop in years.",
            "clue": "Great news for the farmers",
            "group": "down"
          },
          {
            "id": "toyold",
            "label": "A popular toy goes out of style, and few kids want it.",
            "clue": "It used to sell out",
            "group": "down"
          }
        ]
      },
      {
        "rule": "Sort by the likely price change, but some events will not change the price.",
        "notThis": "Some events do not change how much sellers have or how much buyers want, so the price likely stays the same.",
        "groups": [
          {
            "id": "up",
            "label": "Price likely goes up"
          },
          {
            "id": "down",
            "label": "Price likely goes down"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "peach",
            "label": "Many new farmers start growing and selling peaches in the Hill Country.",
            "clue": "More people join the business",
            "group": "down"
          },
          {
            "id": "wrap",
            "label": "After the holidays, very few people want to buy wrapping paper.",
            "clue": "Stores have plenty left",
            "group": "down"
          },
          {
            "id": "gas",
            "label": "A hurricane shuts down Texas refineries, so less gasoline gets made.",
            "clue": "Drivers still need gas",
            "group": "up"
          },
          {
            "id": "game",
            "label": "A new board game becomes a hit, and everyone wants one.",
            "clue": "It is only a game",
            "group": "up"
          },
          {
            "id": "tags",
            "label": "A store changes the color of its price tags.",
            "clue": "Price tags are about price",
            "group": "neither"
          },
          {
            "id": "steady",
            "label": "The number of buyers and the amount for sale stay the same as last month.",
            "clue": "The store is still open",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "up",
          "text": "Price likely goes up"
        },
        {
          "id": "sup",
          "text": "Supply changes"
        }
      ],
      "items": [
        {
          "id": "peanut",
          "label": "A drought dries up many Texas peanut fields.",
          "sets": [
            "up",
            "sup"
          ]
        },
        {
          "id": "sneaker",
          "label": "A fire closes the only factory that makes a popular sneaker.",
          "sets": [
            "up",
            "sup"
          ]
        },
        {
          "id": "heater",
          "label": "A cold snap makes many more people want to buy heaters.",
          "sets": [
            "up"
          ]
        },
        {
          "id": "pecan",
          "label": "Farmers harvest the biggest pecan crop in many years.",
          "sets": [
            "sup"
          ]
        },
        {
          "id": "trucks",
          "label": "Five new ice cream trucks start driving through the neighborhood.",
          "sets": [
            "sup"
          ]
        },
        {
          "id": "costume",
          "label": "After Halloween, very few people want to buy costumes.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Five new taco trucks start parking on the same block. What will likely happen to the price of tacos?",
        "choices": [
          {
            "id": "yes",
            "text": "It will likely go down, because there are more sellers."
          },
          {
            "id": "trap",
            "text": "It will likely go up, because the block gets busier."
          },
          {
            "id": "no",
            "text": "It will stay the same, because tacos always cost the same."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the events that would likely make the price of bikes go up.",
        "choices": [
          {
            "id": "want",
            "text": "Many more people decide that they want bikes."
          },
          {
            "id": "storm",
            "text": "A storm damages a factory that makes bikes."
          },
          {
            "id": "shops",
            "text": "Several new bike shops open in town."
          },
          {
            "id": "fewer",
            "text": "Fewer people want to ride bikes this year."
          }
        ],
        "answers": [
          "want",
          "storm"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how supply and demand change"
          },
          {
            "id": "trap",
            "text": "how busy the stores look"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-4.13B-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Which Texas branch?",
    "teks": "4.13B",
    "pages": [
      {
        "rule": "Sort each job by the branch of Texas government that does it.",
        "notThis": "Many jobs involve a law, so look closely at who is actually doing the work.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "exe",
            "label": "Executive"
          }
        ],
        "items": [
          {
            "id": "senate",
            "label": "State senators vote on a bill about school safety.",
            "clue": "Voters elect senators",
            "group": "leg"
          },
          {
            "id": "housebill",
            "label": "A member of the Texas House files a new bill.",
            "clue": "It is only an idea so far",
            "group": "leg"
          },
          {
            "id": "bothpass",
            "label": "The Texas House and Senate both pass the same bill.",
            "clue": "Next it goes to the governor",
            "group": "leg"
          },
          {
            "id": "sign",
            "label": "The governor signs a bill, and it becomes a law.",
            "clue": "A new law starts here",
            "group": "exe"
          },
          {
            "id": "veto",
            "label": "The governor vetoes a bill that lawmakers passed.",
            "clue": "Decides whether a bill survives",
            "group": "exe"
          },
          {
            "id": "special",
            "label": "The governor calls lawmakers back to Austin for a special session.",
            "clue": "Lawmakers will meet again",
            "group": "exe"
          }
        ]
      },
      {
        "rule": "Sort by branch again, but some jobs belong to neither of these branches.",
        "notThis": "A job can involve laws or lawmakers and still belong to a different branch of government.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "exe",
            "label": "Executive"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "budget",
            "label": "The Legislature passes the state budget for the next two years.",
            "clue": "It is about money",
            "group": "leg"
          },
          {
            "id": "override",
            "label": "Lawmakers vote again and override the governor's veto.",
            "clue": "The governor said no",
            "group": "leg"
          },
          {
            "id": "lineitem",
            "label": "The governor crosses out one spending item in the budget bill.",
            "clue": "It changes the budget",
            "group": "exe"
          },
          {
            "id": "appoint",
            "label": "The governor appoints the Texas secretary of state.",
            "clue": "The Senate must agree",
            "group": "exe"
          },
          {
            "id": "court",
            "label": "The Texas Supreme Court decides a case about how a law should work.",
            "clue": "It is about a law",
            "group": "neither"
          },
          {
            "id": "judge",
            "label": "A judge decides whether a law follows the Texas Constitution.",
            "clue": "Checks a law",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "leg",
          "text": "Legislative branch"
        },
        {
          "id": "bud",
          "text": "Works on the budget"
        }
      ],
      "items": [
        {
          "id": "housebud",
          "label": "The Texas House votes on the state budget.",
          "sets": [
            "leg",
            "bud"
          ]
        },
        {
          "id": "fishlaw",
          "label": "Lawmakers pass a new law about fishing in Texas lakes.",
          "sets": [
            "leg"
          ]
        },
        {
          "id": "comptroller",
          "label": "The comptroller, an executive official, estimates how much tax money Texas will collect.",
          "sets": [
            "bud"
          ]
        },
        {
          "id": "lineitemV",
          "label": "The governor uses a line-item veto on the budget bill.",
          "sets": [
            "bud"
          ]
        },
        {
          "id": "specialV",
          "label": "The governor calls a special session about school safety.",
          "sets": []
        },
        {
          "id": "trial",
          "label": "A judge listens to both sides in a Texas court case.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "The governor signs a bill, and it becomes a law. Which branch did the signing?",
        "choices": [
          {
            "id": "yes",
            "text": "The executive branch, because the governor leads that branch."
          },
          {
            "id": "trap",
            "text": "The legislative branch, because signing the bill created a new law."
          },
          {
            "id": "no",
            "text": "The judicial branch, because every bill is about a law."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the jobs that belong to the legislative branch of Texas.",
        "choices": [
          {
            "id": "write",
            "text": "Writing and passing new bills."
          },
          {
            "id": "override",
            "text": "Voting to override a governor's veto."
          },
          {
            "id": "veto",
            "text": "Vetoing a bill that lawmakers passed."
          },
          {
            "id": "court",
            "text": "Deciding what a law means in a court case."
          }
        ],
        "answers": [
          "write",
          "override"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which branch does the job"
          },
          {
            "id": "trap",
            "text": "whether the job involves a law"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-4.14A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Texas or the U.S.?",
    "teks": "4.14A",
    "pages": [
      {
        "rule": "Sort each symbol by the place that it stands for.",
        "notThis": "Colors, animals, and history can be shared, so ask which place the symbol stands for.",
        "groups": [
          {
            "id": "tx",
            "label": "Texas symbol"
          },
          {
            "id": "us",
            "label": "U.S. symbol"
          }
        ],
        "items": [
          {
            "id": "lonestar",
            "label": "Lone Star flag",
            "clue": "Red, white, and blue",
            "group": "tx"
          },
          {
            "id": "bluebonnet",
            "label": "Bluebonnet",
            "clue": "Grows along many highways",
            "group": "tx"
          },
          {
            "id": "alamo",
            "label": "The Alamo",
            "clue": "Visitors come from everywhere",
            "group": "tx"
          },
          {
            "id": "eagle",
            "label": "Bald eagle",
            "clue": "Also lives in Texas",
            "group": "us"
          },
          {
            "id": "usflag",
            "label": "Flag of the United States",
            "clue": "Flies above the Texas Capitol",
            "group": "us"
          },
          {
            "id": "liberty",
            "label": "Statue of Liberty",
            "clue": "Holds a torch high",
            "group": "us"
          }
        ]
      },
      {
        "rule": "Sort by what each symbol stands for, but some stand for neither.",
        "notThis": "Some symbols stand for a place that is not Texas and not the United States. Ask which place.",
        "groups": [
          {
            "id": "tx",
            "label": "Texas symbol"
          },
          {
            "id": "us",
            "label": "U.S. symbol"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "mocking",
            "label": "Mockingbird",
            "clue": "Lives in many states",
            "group": "tx"
          },
          {
            "id": "sanjac",
            "label": "San Jacinto Monument",
            "clue": "Taller than the Washington Monument",
            "group": "tx"
          },
          {
            "id": "bell",
            "label": "Liberty Bell",
            "clue": "Has a famous crack",
            "group": "us"
          },
          {
            "id": "uscap",
            "label": "U.S. Capitol in Washington, D.C.",
            "clue": "Lawmakers meet inside",
            "group": "us"
          },
          {
            "id": "canada",
            "label": "Canada's maple leaf flag",
            "clue": "Red and white",
            "group": "neither"
          },
          {
            "id": "bigben",
            "label": "Big Ben's clock tower",
            "clue": "A famous tall tower",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "tx",
          "text": "Texas symbol"
        },
        {
          "id": "flew",
          "text": "Flew over Texas"
        }
      ],
      "items": [
        {
          "id": "lonestarV",
          "label": "Lone Star flag",
          "sets": [
            "tx",
            "flew"
          ]
        },
        {
          "id": "usflagV",
          "label": "Flag of the United States",
          "sets": [
            "flew"
          ]
        },
        {
          "id": "pecan",
          "label": "Pecan tree",
          "sets": [
            "tx"
          ]
        },
        {
          "id": "txcap",
          "label": "Texas State Capitol",
          "sets": [
            "tx"
          ]
        },
        {
          "id": "canadaV",
          "label": "Canada's maple leaf flag",
          "sets": []
        },
        {
          "id": "statueV",
          "label": "Statue of Liberty",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "The Lone Star flag is red, white, and blue, just like the flag of the United States. What does it stand for?",
        "choices": [
          {
            "id": "yes",
            "text": "It stands for Texas, because it is the official state flag."
          },
          {
            "id": "trap",
            "text": "It stands for the United States, because it shares the same colors."
          },
          {
            "id": "no",
            "text": "It stands for a different country, because it has only one star."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the symbols and landmarks that represent Texas.",
        "choices": [
          {
            "id": "bonnet",
            "text": "The bluebonnet"
          },
          {
            "id": "mock",
            "text": "The mockingbird"
          },
          {
            "id": "alamo",
            "text": "The Alamo in San Antonio"
          },
          {
            "id": "eagle",
            "text": "The bald eagle"
          },
          {
            "id": "bell",
            "text": "The Liberty Bell"
          }
        ],
        "answers": [
          "bonnet",
          "mock",
          "alamo"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which place a symbol stands for"
          },
          {
            "id": "trap",
            "text": "what colors or animals it shows"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-4.19A-CL",
    "subject": "Social Studies",
    "grade": "Grade 4",
    "title": "Alamo sources",
    "teks": "4.19A",
    "pages": [
      {
        "rule": "Sort each source by whether its maker was there or took part.",
        "notThis": "An old or exciting source is not automatically primary, because its maker still needs to have been there.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          }
        ],
        "items": [
          {
            "id": "travis",
            "label": "William B. Travis's letter from the Alamo, February 24, 1836",
            "clue": "Asks for help",
            "group": "pri"
          },
          {
            "id": "houston",
            "label": "Sam Houston's official report on the Battle of San Jacinto, April 1836",
            "clue": "Sent to the Texas president",
            "group": "pri"
          },
          {
            "id": "santa",
            "label": "Santa Anna's memoir about the war, written decades later",
            "clue": "Written long after 1836",
            "group": "pri"
          },
          {
            "id": "onder",
            "label": "Robert Onderdonk's painting The Fall of the Alamo, about 1903",
            "clue": "More than 100 years old",
            "group": "sec"
          },
          {
            "id": "dawn",
            "label": "Henry McArdle's painting Dawn at the Alamo, finished in 1905",
            "clue": "Full of battle action",
            "group": "sec"
          },
          {
            "id": "textbook",
            "label": "A Texas history textbook printed a few years ago",
            "clue": "Full of facts and dates",
            "group": "sec"
          }
        ]
      },
      {
        "rule": "Sort each source again, but some are not about the Texas Revolution.",
        "notThis": "Some sources are about a different part of Texas history. Check the event first, then the maker.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "decl",
            "label": "The Texas Declaration of Independence, signed March 2, 1836",
            "clue": "Written at Washington-on-the-Brazos",
            "group": "pri"
          },
          {
            "id": "dickinson",
            "label": "Susanna Dickinson's account of surviving the Alamo, told years later",
            "clue": "Told long after the battle",
            "group": "pri"
          },
          {
            "id": "sjpaint",
            "label": "Henry McArdle's painting The Battle of San Jacinto, finished in 1895",
            "clue": "Painted in the 1800s",
            "group": "sec"
          },
          {
            "id": "museum",
            "label": "A sign beside a display in the Alamo museum today",
            "clue": "Found at the real Alamo",
            "group": "sec"
          },
          {
            "id": "spindle",
            "label": "A 1901 photo of the Spindletop oil gusher",
            "clue": "An old Texas photo",
            "group": "neither"
          },
          {
            "id": "dust",
            "label": "A 1930s photo of a dust storm in the Texas Panhandle",
            "clue": "The photographer was there",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "pri",
          "text": "Primary source"
        },
        {
          "id": "alamo",
          "text": "About the Alamo"
        }
      ],
      "items": [
        {
          "id": "travisV",
          "label": "William B. Travis's letter from the Alamo, February 24, 1836",
          "sets": [
            "pri",
            "alamo"
          ]
        },
        {
          "id": "dickV",
          "label": "Susanna Dickinson's account of surviving the Alamo",
          "sets": [
            "pri",
            "alamo"
          ]
        },
        {
          "id": "declV",
          "label": "The Texas Declaration of Independence, March 2, 1836",
          "sets": [
            "pri"
          ]
        },
        {
          "id": "houstonV",
          "label": "Sam Houston's official report on the Battle of San Jacinto",
          "sets": [
            "pri"
          ]
        },
        {
          "id": "onderV",
          "label": "Robert Onderdonk's painting The Fall of the Alamo, about 1903",
          "sets": [
            "alamo"
          ]
        },
        {
          "id": "sjV",
          "label": "Henry McArdle's painting The Battle of San Jacinto, 1895",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Santa Anna wrote about the war many years after it ended. What kind of source is his writing?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a primary source, because he took part in the war."
          },
          {
            "id": "trap",
            "text": "It is a secondary source, because he wrote it long after the war."
          },
          {
            "id": "no",
            "text": "It is not a source, because he fought on the Mexican side."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the sources that are primary sources about the Texas Revolution.",
        "choices": [
          {
            "id": "letter",
            "text": "A letter Travis wrote during the siege of the Alamo."
          },
          {
            "id": "report",
            "text": "A report Sam Houston wrote right after San Jacinto."
          },
          {
            "id": "paint",
            "text": "A painting of the Alamo that was made in 1903."
          },
          {
            "id": "sign",
            "text": "A museum sign that was written in modern times."
          }
        ],
        "answers": [
          "letter",
          "report"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the maker was there"
          },
          {
            "id": "trap",
            "text": "how old the source is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-5.6A-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Properties that matter",
    "teks": "5.6A",
    "pages": [
      {
        "rule": "Sort each material by whether electricity can flow through it.",
        "notThis": "A magnet test does not tell you if electricity can flow, and a shiny look does not always mean metal.",
        "groups": [
          {
            "id": "cond",
            "label": "Conducts electricity"
          },
          {
            "id": "ins",
            "label": "Insulates electricity"
          }
        ],
        "items": [
          {
            "id": "copper",
            "label": "A coil of bare copper wire hangs on a hook.",
            "clue": "A magnet will not pick it up",
            "group": "cond"
          },
          {
            "id": "can",
            "label": "An aluminum soda can",
            "clue": "Magnets slide right off it",
            "group": "cond"
          },
          {
            "id": "graphite",
            "label": "The gray graphite core of a pencil",
            "clue": "It is not a metal",
            "group": "cond"
          },
          {
            "id": "rubber",
            "label": "A rubber band holds a stack of cards together.",
            "clue": "It stretches and bends",
            "group": "ins"
          },
          {
            "id": "plasticspoon",
            "label": "A shiny silver plastic spoon",
            "clue": "It looks like metal",
            "group": "ins"
          },
          {
            "id": "stick",
            "label": "A dry wooden craft stick lies on a desk.",
            "clue": "It came from a tree",
            "group": "ins"
          }
        ]
      },
      {
        "rule": "Sort by whether electricity can flow through it. Some items are not materials.",
        "notThis": "Conducting and insulating are properties of matter, so a thing that is only energy fits neither group.",
        "groups": [
          {
            "id": "cond",
            "label": "Conducts electricity"
          },
          {
            "id": "ins",
            "label": "Insulates electricity"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "saltwater",
            "label": "A cup of salt water",
            "clue": "It is not a metal",
            "group": "cond"
          },
          {
            "id": "gold",
            "label": "A gold ring rests on a small dish.",
            "clue": "A magnet cannot lift it",
            "group": "cond"
          },
          {
            "id": "glass",
            "label": "An empty glass jar sits on a shelf.",
            "clue": "It is hard and smooth",
            "group": "ins"
          },
          {
            "id": "coating",
            "label": "The plastic coating on a lamp cord",
            "clue": "It wraps around metal wire",
            "group": "ins"
          },
          {
            "id": "sunbeam",
            "label": "A beam of sunlight through a window",
            "clue": "It carries energy",
            "group": "neither"
          },
          {
            "id": "sound",
            "label": "The sound that travels from a ringing bell",
            "clue": "The bell is made of metal",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cond",
          "text": "Conducts electricity"
        },
        {
          "id": "mag",
          "text": "Magnetic"
        }
      ],
      "items": [
        {
          "id": "nailV",
          "label": "An iron nail",
          "sets": [
            "cond",
            "mag"
          ]
        },
        {
          "id": "clipV",
          "label": "A bare steel paper clip",
          "sets": [
            "cond",
            "mag"
          ]
        },
        {
          "id": "copperV",
          "label": "A copper pipe",
          "sets": [
            "cond"
          ]
        },
        {
          "id": "foilV",
          "label": "A sheet of aluminum foil",
          "sets": [
            "cond"
          ]
        },
        {
          "id": "fridgeV",
          "label": "A flexible rubber fridge magnet",
          "sets": [
            "mag"
          ]
        },
        {
          "id": "marbleV",
          "label": "A glass marble",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A magnet does not pull on a strip of aluminum foil. Which statement is true?",
        "choices": [
          {
            "id": "yes",
            "text": "The foil still conducts electricity, because many metals are not magnetic."
          },
          {
            "id": "trap",
            "text": "The foil must be an insulator, because magnets attract all metals."
          },
          {
            "id": "no",
            "text": "The foil must be a gas, because it is so thin."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the materials that conduct electricity.",
        "choices": [
          {
            "id": "wire",
            "text": "A copper wire"
          },
          {
            "id": "lead",
            "text": "The graphite in a pencil"
          },
          {
            "id": "band",
            "text": "A rubber band"
          },
          {
            "id": "mar",
            "text": "A glass marble"
          },
          {
            "id": "ring",
            "text": "A gold ring"
          }
        ],
        "answers": [
          "wire",
          "lead",
          "ring"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether electricity can flow through it"
          },
          {
            "id": "trap",
            "text": "whether a magnet pulls on it"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-5.8C-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Where does the light go?",
    "teks": "5.8C",
    "pages": [
      {
        "rule": "Sort by the main thing that happens to the light.",
        "notThis": "Shiny is not the rule. Light can also bend as it passes through clear glass or water.",
        "groups": [
          {
            "id": "refl",
            "label": "Reflected"
          },
          {
            "id": "refr",
            "label": "Refracted"
          }
        ],
        "items": [
          {
            "id": "mirror",
            "label": "You see your face in a bathroom mirror while brushing your teeth.",
            "clue": "Flat, smooth glass",
            "group": "refl"
          },
          {
            "id": "moon",
            "label": "The full moon brightly illuminates a dark field at night.",
            "clue": "It seems to glow on its own",
            "group": "refl"
          },
          {
            "id": "lake",
            "label": "The trees on the shore appear upside down on a calm lake.",
            "clue": "The water is clear",
            "group": "refl"
          },
          {
            "id": "straw",
            "label": "A straw in a glass of water looks broken right at the waterline.",
            "clue": "The water surface is shiny",
            "group": "refr"
          },
          {
            "id": "lens",
            "label": "A magnifying lens makes the tiny print on a coin appear much larger.",
            "clue": "Its glass is polished and shiny",
            "group": "refr"
          },
          {
            "id": "glasses",
            "label": "A student's eyeglasses help her read the board from the back row.",
            "clue": "The lenses shine under bright lights",
            "group": "refr"
          }
        ]
      },
      {
        "rule": "Sort by the main thing that happens to the light. Some light is neither.",
        "notThis": "A picture that looks stretched or bent is not always refraction, so decide whether the light bounced back or passed through.",
        "groups": [
          {
            "id": "refl",
            "label": "Reflected"
          },
          {
            "id": "refr",
            "label": "Refracted"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "spoon",
            "label": "The back of a shiny metal spoon shows a stretched picture of your face.",
            "clue": "The picture looks bent",
            "group": "refl"
          },
          {
            "id": "reflector",
            "label": "A bike reflector glows red when car headlights shine on it at night.",
            "clue": "It looks like it lights up",
            "group": "refl"
          },
          {
            "id": "coin",
            "label": "A coin at the bottom of a pool appears closer than it actually is.",
            "clue": "The pool water sparkles",
            "group": "refr"
          },
          {
            "id": "prism",
            "label": "A glass prism spreads a beam of sunlight into a band of colors.",
            "clue": "Its glass edges shine",
            "group": "refr"
          },
          {
            "id": "shirt",
            "label": "A black T-shirt gets hot after an hour in the afternoon sun.",
            "clue": "Sunlight hits it all afternoon",
            "group": "neither"
          },
          {
            "id": "solar",
            "label": "A dark solar panel collects sunlight to produce electricity for a house.",
            "clue": "Its glass top is shiny",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "refl",
          "text": "Light is reflected"
        },
        {
          "id": "refr",
          "text": "Light is refracted"
        }
      ],
      "items": [
        {
          "id": "rainbowV",
          "label": "Sunlight passes into raindrops, bounces off the back of each drop, and comes out as a rainbow.",
          "sets": [
            "refl",
            "refr"
          ]
        },
        {
          "id": "dentistV",
          "label": "A dentist's small mirror shows the back of a patient's tooth.",
          "sets": [
            "refl"
          ]
        },
        {
          "id": "signV",
          "label": "A highway sign shines brightly in a car's headlights at night.",
          "sets": [
            "refl"
          ]
        },
        {
          "id": "marbleV",
          "label": "A clear glass marble makes the picture behind it look upside down.",
          "sets": [
            "refr"
          ]
        },
        {
          "id": "fishV",
          "label": "A goldfish in a round bowl appears larger than its actual size.",
          "sets": [
            "refr"
          ]
        },
        {
          "id": "roadV",
          "label": "A dark asphalt road gets hot on a summer afternoon.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "When you look down into a clear pond, the bottom appears closer than its actual depth. What is mainly happening to the light?",
        "choices": [
          {
            "id": "yes",
            "text": "It is refracted, because it bends as it passes from the water into the air."
          },
          {
            "id": "trap",
            "text": "It is reflected, because the surface of the pond is shiny."
          },
          {
            "id": "no",
            "text": "It is absorbed, because the mud at the bottom takes in all of it."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the examples where light is mainly reflected.",
        "choices": [
          {
            "id": "peri",
            "text": "A sailor uses a periscope with mirrors to see above the water."
          },
          {
            "id": "glare",
            "text": "Sunlight shines off a still pond so brightly that it hurts your eyes."
          },
          {
            "id": "focus",
            "text": "A glass lens bends sunlight onto one small, bright spot."
          },
          {
            "id": "seat",
            "text": "A black car seat gets hot while the car is parked in the sun."
          }
        ],
        "answers": [
          "peri",
          "glare"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what happens to the light"
          },
          {
            "id": "trap",
            "text": "how shiny the object looks"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-5.8A-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Where does the energy end up?",
    "teks": "5.8A",
    "pages": [
      {
        "rule": "Sort each device by the useful energy it is built to produce.",
        "notThis": "Most devices also give off a little sound or heat, so a hum or warm feeling is not the device's main job.",
        "groups": [
          {
            "id": "light",
            "label": "Ends as light"
          },
          {
            "id": "motion",
            "label": "Ends as motion"
          }
        ],
        "items": [
          {
            "id": "flash",
            "label": "A flashlight changes the chemical energy in its batteries into a bright beam.",
            "clue": "It clicks when you switch it",
            "group": "light"
          },
          {
            "id": "desklamp",
            "label": "A desk lamp shines on a notebook while a student does homework.",
            "clue": "The bulb feels warm",
            "group": "light"
          },
          {
            "id": "string",
            "label": "A string of holiday lights glows along the edge of a roof.",
            "clue": "It uses electricity from the house",
            "group": "light"
          },
          {
            "id": "fan",
            "label": "A ceiling fan turns slowly above a living room on a hot day.",
            "clue": "It makes a soft humming sound",
            "group": "motion"
          },
          {
            "id": "toothbrush",
            "label": "An electric toothbrush wiggles its bristles back and forth.",
            "clue": "It buzzes loudly",
            "group": "motion"
          },
          {
            "id": "blender",
            "label": "A blender spins its blades to mix a fruit smoothie.",
            "clue": "It is very noisy",
            "group": "motion"
          }
        ]
      },
      {
        "rule": "Sort each device by the useful energy it is built to produce. Some produce neither.",
        "notThis": "A device that glows or moves a little part is not always built for light or motion, so identify its particular job.",
        "groups": [
          {
            "id": "light",
            "label": "Ends as light"
          },
          {
            "id": "motion",
            "label": "Ends as motion"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "projector",
            "label": "A projector shines a movie onto a big classroom screen.",
            "clue": "Its fan blows warm air",
            "group": "light"
          },
          {
            "id": "exit",
            "label": "An exit sign glows above a doorway all night long.",
            "clue": "It never switches off",
            "group": "light"
          },
          {
            "id": "washer",
            "label": "A washing machine spins its drum to wash a load of clothes.",
            "clue": "It thumps loudly",
            "group": "motion"
          },
          {
            "id": "elevator",
            "label": "An elevator carries people from the first floor to the fifth.",
            "clue": "A bell dings at each floor",
            "group": "motion"
          },
          {
            "id": "toaster",
            "label": "A toaster browns two slices of bread for breakfast.",
            "clue": "Its wires glow bright orange",
            "group": "neither"
          },
          {
            "id": "speaker",
            "label": "A speaker plays music loudly at a backyard party.",
            "clue": "Its cone shakes back and forth",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "elec",
          "text": "Uses electricity"
        },
        {
          "id": "light",
          "text": "Ends as light"
        }
      ],
      "items": [
        {
          "id": "flashV",
          "label": "A flashlight lights a trail during a camping trip.",
          "sets": [
            "elec",
            "light"
          ]
        },
        {
          "id": "streetV",
          "label": "A streetlight glows above a sidewalk at night.",
          "sets": [
            "elec",
            "light"
          ]
        },
        {
          "id": "candleV",
          "label": "A candle",
          "sets": [
            "light"
          ]
        },
        {
          "id": "glowV",
          "label": "A glow stick",
          "sets": [
            "light"
          ]
        },
        {
          "id": "fanV",
          "label": "An electric fan",
          "sets": [
            "elec"
          ]
        },
        {
          "id": "windupV",
          "label": "A wind-up toy car",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A toaster's wires glow bright orange while it works. What useful energy is the toaster built to produce?",
        "choices": [
          {
            "id": "yes",
            "text": "Thermal energy, because its job is to heat and brown the bread."
          },
          {
            "id": "trap",
            "text": "Light energy, because its wires glow brightly while it works."
          },
          {
            "id": "no",
            "text": "Motion energy, because the bread moves up and down."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the devices that are mainly built to change electrical energy into motion.",
        "choices": [
          {
            "id": "cfan",
            "text": "A ceiling fan that moves air around a room."
          },
          {
            "id": "sharp",
            "text": "An electric pencil sharpener that spins to sharpen a pencil."
          },
          {
            "id": "lamp",
            "text": "A reading lamp that shines on a book."
          },
          {
            "id": "bell",
            "text": "A doorbell that rings when someone presses the button."
          }
        ],
        "answers": [
          "cfan",
          "sharp"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the job each device is built to do"
          },
          {
            "id": "trap",
            "text": "what you notice first when it runs"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-5.10C-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "What built this landform?",
    "teks": "5.10C",
    "pages": [
      {
        "rule": "Sort by what shaped each landform over a very long time.",
        "notThis": "The weather around a landform today does not tell you what formed it, so think about which force could carve or pile up that shape.",
        "groups": [
          {
            "id": "wind",
            "label": "Wind"
          },
          {
            "id": "water",
            "label": "Water"
          }
        ],
        "items": [
          {
            "id": "grand",
            "label": "The Grand Canyon cuts more than a mile deep into Arizona rock.",
            "clue": "The land around it is desert",
            "group": "water"
          },
          {
            "id": "paloduro",
            "label": "Palo Duro Canyon stretches across the Texas Panhandle with tall red cliffs.",
            "clue": "Strong winds blow there often",
            "group": "water"
          },
          {
            "id": "delta",
            "label": "The Mississippi River delta spreads into the Gulf of Mexico like a bird's foot.",
            "clue": "Shaped like a bird's foot",
            "group": "water"
          },
          {
            "id": "whitesands",
            "label": "The White Sands dunes in New Mexico are made of bright white grains.",
            "clue": "Near a dried-up lake bed",
            "group": "wind"
          },
          {
            "id": "padre",
            "label": "Tall sand dunes line the beach on Padre Island in Texas.",
            "clue": "Right next to the ocean",
            "group": "wind"
          },
          {
            "id": "greatsand",
            "label": "Great Sand Dunes in Colorado holds the tallest dunes in North America.",
            "clue": "A creek flows along its edge",
            "group": "wind"
          }
        ]
      },
      {
        "rule": "Sort by what shaped each landform. Some were formed by something else.",
        "notThis": "A landform that holds water today was not necessarily carved by flowing water, so think about what moved across it long ago.",
        "groups": [
          {
            "id": "wind",
            "label": "Wind"
          },
          {
            "id": "water",
            "label": "Water"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "santaelena",
            "label": "Santa Elena Canyon has cliffs about 1,500 feet tall in Big Bend National Park.",
            "clue": "Found in the dry Chihuahuan Desert",
            "group": "water"
          },
          {
            "id": "horseshoe",
            "label": "Horseshoe Bend is a deep curve in the red rock of northern Arizona.",
            "clue": "Red desert rock all around",
            "group": "water"
          },
          {
            "id": "monahans",
            "label": "The Monahans Sandhills rise from the flat land of West Texas.",
            "clue": "Short oak bushes grow there",
            "group": "wind"
          },
          {
            "id": "indiana",
            "label": "Sand dunes rise along the shore of Lake Michigan in Indiana.",
            "clue": "Next to a huge lake",
            "group": "wind"
          },
          {
            "id": "yosemite",
            "label": "Yosemite Valley in California has a wide, U-shaped floor between granite cliffs.",
            "clue": "A river runs through it",
            "group": "neither"
          },
          {
            "id": "greatlakes",
            "label": "The giant basins that hold the Great Lakes were scooped out long ago.",
            "clue": "Now filled with fresh water",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "drop",
          "text": "Built by dropped material"
        },
        {
          "id": "water",
          "text": "Flowing water made it"
        }
      ],
      "items": [
        {
          "id": "nileV",
          "label": "The Nile River delta fans out where Egypt meets the Mediterranean Sea.",
          "sets": [
            "drop",
            "water"
          ]
        },
        {
          "id": "beachV",
          "label": "A sandy beach builds up as waves carry sand onto the shore.",
          "sets": [
            "drop",
            "water"
          ]
        },
        {
          "id": "deathV",
          "label": "Sand dunes pile up on the floor of Death Valley.",
          "sets": [
            "drop"
          ]
        },
        {
          "id": "moraineV",
          "label": "A long ridge of rocks is left behind where a glacier melted.",
          "sets": [
            "drop"
          ]
        },
        {
          "id": "gunnisonV",
          "label": "The Black Canyon of the Gunnison has steep, dark walls in Colorado.",
          "sets": [
            "water"
          ]
        },
        {
          "id": "glacierV",
          "label": "A U-shaped valley curves between the peaks of Glacier National Park.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A deep, winding canyon cuts through a dry desert where rain is rare and strong winds blow. What most likely carved it?",
        "choices": [
          {
            "id": "yes",
            "text": "A river that slowly wore away the rock over millions of years."
          },
          {
            "id": "trap",
            "text": "Strong desert winds, because the land around it is dry and windy."
          },
          {
            "id": "no",
            "text": "Sand dunes that slid across the desert floor."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the landforms that flowing liquid water helped form.",
        "choices": [
          {
            "id": "delta",
            "text": "A delta that forms where a river flows into the sea."
          },
          {
            "id": "canyon",
            "text": "A canyon with a river winding along its bottom."
          },
          {
            "id": "dune",
            "text": "A sand dune in the middle of a windy desert."
          },
          {
            "id": "uvalley",
            "text": "A U-shaped valley that a glacier scraped out."
          }
        ],
        "answers": [
          "delta",
          "canyon"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what force shaped the landform"
          },
          {
            "id": "trap",
            "text": "what the land around it is like today"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-5.12A-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "What is it interacting with?",
    "teks": "5.12A",
    "pages": [
      {
        "rule": "Sort by the kind of factor the organism is interacting with.",
        "notThis": "Something that is dead, dry, or still is not automatically abiotic, because once-living things count as biotic.",
        "groups": [
          {
            "id": "bio",
            "label": "With a biotic factor"
          },
          {
            "id": "abio",
            "label": "With an abiotic factor"
          }
        ],
        "items": [
          {
            "id": "mushroom",
            "label": "Mushrooms grow on a fallen log and gradually break it down.",
            "clue": "The log stopped growing years ago",
            "group": "bio"
          },
          {
            "id": "millipede",
            "label": "A millipede munches on dry, brown leaves on the forest floor.",
            "clue": "The leaves are dead and crunchy",
            "group": "bio"
          },
          {
            "id": "bee",
            "label": "A honeybee sips nectar from a flower in a meadow.",
            "clue": "The flower cannot move",
            "group": "bio"
          },
          {
            "id": "lizard",
            "label": "A lizard lies on a sunny rock to warm its body.",
            "clue": "The rock stays perfectly still",
            "group": "abio"
          },
          {
            "id": "cactus",
            "label": "A cactus soaks up rainwater quickly through its shallow roots.",
            "clue": "Water keeps every organism alive",
            "group": "abio"
          },
          {
            "id": "seedling",
            "label": "A bean seedling bends toward the sunlight coming through a window.",
            "clue": "It grows in a classroom",
            "group": "abio"
          }
        ]
      },
      {
        "rule": "Sort by the kind of factor the organism is interacting with. Some involve no organism.",
        "notThis": "Every interaction on this card needs a living organism, so an event with nothing alive in it does not fit either group.",
        "groups": [
          {
            "id": "bio",
            "label": "With a biotic factor"
          },
          {
            "id": "abio",
            "label": "With an abiotic factor"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "beetle",
            "label": "A beetle lays its eggs inside a rotting tree stump.",
            "clue": "The stump has been dead for years",
            "group": "bio"
          },
          {
            "id": "owl",
            "label": "A barn owl swoops down and catches a mouse in a field.",
            "clue": "It hunts in the dark",
            "group": "bio"
          },
          {
            "id": "fox",
            "label": "An arctic fox grows a thick white coat as the days get shorter and colder each fall.",
            "clue": "Winter returns every year",
            "group": "abio"
          },
          {
            "id": "bird",
            "label": "A sparrow drinks from a puddle after a spring storm.",
            "clue": "The puddle has leaves floating in it",
            "group": "abio"
          },
          {
            "id": "sand",
            "label": "Wind blows loose sand into a tall dune in the desert.",
            "clue": "Moving air is powerful",
            "group": "neither"
          },
          {
            "id": "ice",
            "label": "Water freezes inside a crack and splits a boulder on a cold night.",
            "clue": "Water is needed for life",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "bio",
          "text": "Biotic factor"
        },
        {
          "id": "need",
          "text": "Frog needs it"
        }
      ],
      "items": [
        {
          "id": "insectsV",
          "label": "The insects a pond frog catches to eat",
          "sets": [
            "bio",
            "need"
          ]
        },
        {
          "id": "heronV",
          "label": "A heron that hunts for frogs",
          "sets": [
            "bio"
          ]
        },
        {
          "id": "turtleV",
          "label": "A snapping turtle that lives in the same pond",
          "sets": [
            "bio"
          ]
        },
        {
          "id": "waterV",
          "label": "The pond water",
          "sets": [
            "need"
          ]
        },
        {
          "id": "oxygenV",
          "label": "Oxygen in the air above the pond",
          "sets": [
            "need"
          ]
        },
        {
          "id": "bottleV",
          "label": "A metal can at the bottom of the pond",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A woodpecker drills into a dead tree to find insects hiding inside. What kind of factor is the dead tree?",
        "choices": [
          {
            "id": "yes",
            "text": "Biotic, because the tree was once living."
          },
          {
            "id": "trap",
            "text": "Abiotic, because the tree is no longer alive."
          },
          {
            "id": "no",
            "text": "Abiotic, because a tree is a kind of soil."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the abiotic factors that a desert lizard interacts with.",
        "choices": [
          {
            "id": "sun",
            "text": "The sunlight that warms its body each morning"
          },
          {
            "id": "sandx",
            "text": "The hot sand it runs across"
          },
          {
            "id": "cricket",
            "text": "The crickets it catches and eats"
          },
          {
            "id": "hawk",
            "text": "The hawk that hunts it from above"
          }
        ],
        "answers": [
          "sun",
          "sandx"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the factor is living or once living"
          },
          {
            "id": "trap",
            "text": "whether the factor is moving"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SCI-5.13B-CL",
    "subject": "Science",
    "grade": "Grade 5",
    "title": "Born knowing it?",
    "teks": "5.13B",
    "pages": [
      {
        "rule": "Sort each behavior by whether the animal was born knowing it.",
        "notThis": "A complicated behavior is not always learned, and a behavior every member of a group performs is not always an instinct.",
        "groups": [
          {
            "id": "inst",
            "label": "Instinct"
          },
          {
            "id": "lrn",
            "label": "Learned behavior"
          }
        ],
        "items": [
          {
            "id": "hatchling",
            "label": "Sea turtle hatchlings crawl straight toward the ocean right after they hatch.",
            "clue": "They hatch on a dark beach",
            "group": "inst"
          },
          {
            "id": "web",
            "label": "A young garden spider spins a detailed, circular web the first time it tries.",
            "clue": "The pattern is very complex",
            "group": "inst"
          },
          {
            "id": "monarch",
            "label": "Monarch butterflies fly thousands of miles to Mexico for the winter.",
            "clue": "The trip is very long",
            "group": "inst"
          },
          {
            "id": "orca",
            "label": "A pod of orcas works together as a team to hunt seals.",
            "clue": "Every member seems to know its part",
            "group": "lrn"
          },
          {
            "id": "chimp",
            "label": "A chimp pokes a thin stick into a nest of termites and pulls them out to eat.",
            "clue": "Its whole group does it",
            "group": "lrn"
          },
          {
            "id": "sparrow",
            "label": "A young white-crowned sparrow sings the same local song as the adults nearby.",
            "clue": "Every sparrow in the area sounds alike",
            "group": "lrn"
          }
        ]
      },
      {
        "rule": "Sort by whether the animal was born knowing it. Some are not behaviors.",
        "notThis": "A body part that helps an animal survive is not a behavior, even when it is used during a behavior.",
        "groups": [
          {
            "id": "inst",
            "label": "Instinct"
          },
          {
            "id": "lrn",
            "label": "Learned behavior"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "joey",
            "label": "A newborn kangaroo crawls into its mother's pouch on its own.",
            "clue": "It is as small as a jellybean",
            "group": "inst"
          },
          {
            "id": "foal",
            "label": "A newborn foal stands up and finds its mother's milk within hours.",
            "clue": "No one shows it how.",
            "group": "inst"
          },
          {
            "id": "dog",
            "label": "A dog sits as soon as its owner says, \"Sit.\"",
            "clue": "It happens without a pause",
            "group": "lrn"
          },
          {
            "id": "horse",
            "label": "A horse comes running when it hears its feed bucket rattle.",
            "clue": "It happens every single time",
            "group": "lrn"
          },
          {
            "id": "webbed",
            "label": "A duck's wide, webbed feet",
            "clue": "They help it paddle quickly",
            "group": "neither"
          },
          {
            "id": "shell",
            "label": "A box turtle's hard, domed shell",
            "clue": "It protects the turtle from predators",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "inst",
          "text": "Instinct"
        },
        {
          "id": "food",
          "text": "Helps it find food"
        }
      ],
      "items": [
        {
          "id": "robinV",
          "label": "A newly hatched robin opens its mouth wide when a parent lands on the nest.",
          "sets": [
            "inst",
            "food"
          ]
        },
        {
          "id": "puppyV",
          "label": "A newborn puppy crawls to its mother to nurse.",
          "sets": [
            "inst",
            "food"
          ]
        },
        {
          "id": "fawnV",
          "label": "A newborn deer lies perfectly still in tall grass when danger is near.",
          "sets": [
            "inst"
          ]
        },
        {
          "id": "turtleV",
          "label": "A sea turtle hatchling heads for the waves at night.",
          "sets": [
            "inst"
          ]
        },
        {
          "id": "chimpV",
          "label": "A chimp cracks nuts open with a stone, the way older chimps in its group do.",
          "sets": [
            "food"
          ]
        },
        {
          "id": "parrotV",
          "label": "A parrot says its owner's name to get attention.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Young orcas hunt in packs the same way the adults in their pod do. Which kind of behavior is this?",
        "choices": [
          {
            "id": "yes",
            "text": "A learned behavior, because young orcas pick it up from older orcas."
          },
          {
            "id": "trap",
            "text": "An instinct, because the whole pod hunts in exactly the same way."
          },
          {
            "id": "no",
            "text": "A body structure, because orcas have strong tails."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the behaviors that are instincts.",
        "choices": [
          {
            "id": "turtle",
            "text": "Sea turtle hatchlings crawl toward the ocean."
          },
          {
            "id": "spider",
            "text": "A spider spins its first web without any help."
          },
          {
            "id": "roll",
            "text": "A dog rolls over whenever it hears the word for a treat."
          },
          {
            "id": "stick",
            "text": "A chimp fishes for termites with a stick."
          }
        ],
        "answers": [
          "turtle",
          "spider"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the animal was born knowing the behavior"
          },
          {
            "id": "trap",
            "text": "how complicated the behavior looks"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-5.3C-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Greek and Latin roots",
    "teks": "5.3C",
    "pages": [
      {
        "rule": "Sort each word by the Greek root it contains. Ignore the subject the word seems to belong to.",
        "notThis": "A root keeps its meaning inside a science word or a math word, so the topic of a word can easily mislead you.",
        "groups": [
          {
            "id": "geo",
            "label": "Root geo (earth)"
          },
          {
            "id": "photo",
            "label": "Root photo (light)"
          }
        ],
        "items": [
          {
            "id": "geometry",
            "label": "geometry",
            "clue": "A kind of math class",
            "group": "geo"
          },
          {
            "id": "geode",
            "label": "geode",
            "clue": "A plain rock with crystals inside",
            "group": "geo"
          },
          {
            "id": "geology",
            "label": "geology",
            "clue": "Scientists study rocks",
            "group": "geo"
          },
          {
            "id": "photograph",
            "label": "photograph",
            "clue": "Taken with a camera",
            "group": "photo"
          },
          {
            "id": "photocopy",
            "label": "photocopy",
            "clue": "Made by an office machine",
            "group": "photo"
          },
          {
            "id": "photosyn",
            "label": "photosynthesis",
            "clue": "How plants make their food",
            "group": "photo"
          }
        ]
      },
      {
        "rule": "Sort each word by its Greek root. Some words have neither root.",
        "notThis": "Matching letters are not enough, because a real root must also carry its meaning into the word.",
        "groups": [
          {
            "id": "geo",
            "label": "Root geo (earth)"
          },
          {
            "id": "photo",
            "label": "Root photo (light)"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "geothermal",
            "label": "geothermal",
            "clue": "Heats some homes and pools",
            "group": "geo"
          },
          {
            "id": "geographer",
            "label": "geographer",
            "clue": "Has graph in it too",
            "group": "geo"
          },
          {
            "id": "telephoto",
            "label": "telephoto",
            "clue": "Starts with tele",
            "group": "photo"
          },
          {
            "id": "surgeon",
            "label": "surgeon",
            "clue": "Has g, e, o in a row",
            "group": "neither"
          },
          {
            "id": "dungeon",
            "label": "dungeon",
            "clue": "Built deep underground",
            "group": "neither"
          },
          {
            "id": "biology",
            "label": "biology",
            "clue": "Ends in -logy, like geology",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "geo",
          "text": "Root geo (earth)"
        },
        {
          "id": "graph",
          "text": "Root graph (write)"
        }
      ],
      "items": [
        {
          "id": "geographyV",
          "label": "geography",
          "sets": [
            "geo",
            "graph"
          ]
        },
        {
          "id": "geologistV",
          "label": "geologist",
          "sets": [
            "geo"
          ]
        },
        {
          "id": "autographV",
          "label": "autograph",
          "sets": [
            "graph"
          ]
        },
        {
          "id": "photographerV",
          "label": "photographer",
          "sets": [
            "graph"
          ]
        },
        {
          "id": "pigeonV",
          "label": "pigeon",
          "sets": []
        },
        {
          "id": "telephoneV",
          "label": "telephone",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Ava notices the letters g, e, o in the middle of the word pigeon. She decides that pigeon must be a geo word. Is she correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because those letters do not carry the meaning earth in that particular word."
          },
          {
            "id": "trap",
            "text": "Yes, because every word containing those three letters has the root geo."
          },
          {
            "id": "no",
            "text": "No, because the root geo can only appear at the very end of a word."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the words that contain a Greek root meaning light.",
        "choices": [
          {
            "id": "cell",
            "text": "photocell"
          },
          {
            "id": "phone",
            "text": "telephone"
          },
          {
            "id": "syn",
            "text": "photosynthesis"
          },
          {
            "id": "tele",
            "text": "telephoto"
          },
          {
            "id": "phon",
            "text": "phonics"
          }
        ],
        "answers": [
          "cell",
          "syn",
          "tele"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the root inside each word"
          },
          {
            "id": "trap",
            "text": "the letters or topic of each word"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-5.3D-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Say it again",
    "teks": "5.3D",
    "pages": [
      {
        "rule": "Sort each saying by its type. Pay close attention to what the words actually mean.",
        "notThis": "Sounding like advice does not make a saying an adage, because a joke can be written as advice too.",
        "groups": [
          {
            "id": "adage",
            "label": "Adage"
          },
          {
            "id": "pun",
            "label": "Pun"
          }
        ],
        "items": [
          {
            "id": "eggs",
            "label": "Don't put all your eggs in one basket.",
            "clue": "Sounds like a silly joke",
            "group": "adage"
          },
          {
            "id": "bird",
            "label": "The early bird catches the worm.",
            "clue": "About a bird and a worm",
            "group": "adage"
          },
          {
            "id": "practice",
            "label": "Practice makes perfect.",
            "clue": "Short and simple",
            "group": "adage"
          },
          {
            "id": "atom",
            "label": "Never trust an atom, because atoms make up everything.",
            "clue": "Sounds like advice",
            "group": "pun"
          },
          {
            "id": "scarecrow",
            "label": "The scarecrow won an award because he was outstanding in his field.",
            "clue": "Sounds like a real award",
            "group": "pun"
          },
          {
            "id": "bicycle",
            "label": "A bicycle can't stand on its own because it is two-tired.",
            "clue": "Gives a reason",
            "group": "pun"
          }
        ]
      },
      {
        "rule": "Sort each saying by its type. Some are ordinary statements that fit neither.",
        "notThis": "Useful advice is not automatically an adage, since an ordinary sentence can give advice in plain words.",
        "groups": [
          {
            "id": "adage",
            "label": "Adage"
          },
          {
            "id": "pun",
            "label": "Pun"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "leap",
            "label": "Look before you leap.",
            "clue": "Only four words",
            "group": "adage"
          },
          {
            "id": "actions",
            "label": "Actions speak louder than words.",
            "clue": "Mentions speaking",
            "group": "adage"
          },
          {
            "id": "mountain",
            "label": "Don't play hide-and-seek with a mountain, because it always peaks.",
            "clue": "Sounds like advice",
            "group": "pun"
          },
          {
            "id": "beard",
            "label": "I didn't like my new beard at first, but then it grew on me.",
            "clue": "About a real beard",
            "group": "pun"
          },
          {
            "id": "helmet",
            "label": "Always wear a helmet when you ride your bike.",
            "clue": "Gives good advice",
            "group": "neither"
          },
          {
            "id": "train",
            "label": "The early train leaves the station at six o'clock.",
            "clue": "Sounds a lot like an adage",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "adage",
          "text": "Adage"
        },
        {
          "id": "instr",
          "text": "Gives an instruction"
        }
      ],
      "items": [
        {
          "id": "chickens",
          "label": "Don't count your chickens before they hatch.",
          "sets": [
            "adage",
            "instr"
          ]
        },
        {
          "id": "cover",
          "label": "Don't judge a book by its cover.",
          "sets": [
            "adage",
            "instr"
          ]
        },
        {
          "id": "heads",
          "label": "Two heads are better than one.",
          "sets": [
            "adage"
          ]
        },
        {
          "id": "stairs",
          "label": "Don't trust stairs, because they're always up to something.",
          "sets": [
            "instr"
          ]
        },
        {
          "id": "teeth",
          "label": "Brush your teeth before you go to bed.",
          "sets": [
            "instr"
          ]
        },
        {
          "id": "mathbook",
          "label": "The math book looked sad because it had too many problems.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Jada reads, \"Don't write with a broken pencil, because it's pointless.\" She insists it must be an adage because it offers advice. Is she correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because it plays on two different meanings of pointless, which makes it a pun."
          },
          {
            "id": "trap",
            "text": "Yes, because any saying that gives advice is an adage."
          },
          {
            "id": "no",
            "text": "No, because it is a plain, literal fact with only one meaning."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the sayings that are familiar, well-known adages.",
        "choices": [
          {
            "id": "late",
            "text": "Better late than never."
          },
          {
            "id": "will",
            "text": "Where there's a will, there's a way."
          },
          {
            "id": "skeleton",
            "text": "The skeleton stayed home because he had no body to go with."
          },
          {
            "id": "honest",
            "text": "Honesty is the best policy."
          },
          {
            "id": "bus",
            "text": "The school bus arrives at noon."
          }
        ],
        "answers": [
          "late",
          "will",
          "honest"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what kind of saying each one is"
          },
          {
            "id": "trap",
            "text": "whether each saying gives advice"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-5.6F-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Trait or feeling?",
    "teks": "5.6F",
    "pages": [
      {
        "rule": "Sort each sentence by what the evidence shows about the character.",
        "notThis": "A strong emotion word does not make something a trait, so ask whether it lasts or happens only once.",
        "groups": [
          {
            "id": "trait",
            "label": "Character trait"
          },
          {
            "id": "feel",
            "label": "Feeling right now"
          }
        ],
        "items": [
          {
            "id": "maya",
            "label": "Maya always shares her lunch with anyone who forgets to bring one.",
            "clue": "Happens at lunchtime",
            "group": "trait"
          },
          {
            "id": "leo",
            "label": "Every week, Leo checks his homework twice before turning it in.",
            "clue": "About homework",
            "group": "trait"
          },
          {
            "id": "ben",
            "label": "Ben is a cheerful boy who greets everyone with a smile each morning.",
            "clue": "Cheerful sounds like a feeling",
            "group": "trait"
          },
          {
            "id": "omar",
            "label": "Right before the spelling bee, Omar's hands shook with nerves.",
            "clue": "Nervous is a strong word",
            "group": "feel"
          },
          {
            "id": "ana",
            "label": "When the puppy licked her face, Ana burst out laughing with delight.",
            "clue": "Ana is laughing",
            "group": "feel"
          },
          {
            "id": "jake",
            "label": "Jake was furious when his little brother broke his model plane.",
            "clue": "Furious is a big word",
            "group": "feel"
          }
        ]
      },
      {
        "rule": "Sort each sentence by what the evidence shows. Some show neither.",
        "notThis": "A detail that stays the same is not always a trait, because a trait describes how a character behaves.",
        "groups": [
          {
            "id": "trait",
            "label": "Character trait"
          },
          {
            "id": "feel",
            "label": "Feeling right now"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "priya",
            "label": "Priya never gives up, and she practices piano daily until each song is perfect.",
            "clue": "About music practice",
            "group": "trait"
          },
          {
            "id": "joe",
            "label": "Grandpa Joe is usually grumpy, and he complains about nearly everything.",
            "clue": "Grumpy sounds like a feeling",
            "group": "trait"
          },
          {
            "id": "lena",
            "label": "Lena felt proud for a moment when the coach called her name.",
            "clue": "About a sports team",
            "group": "feel"
          },
          {
            "id": "carlos",
            "label": "During the storm last night, Carlos felt scared of the booming thunder.",
            "clue": "Scared is a strong word",
            "group": "feel"
          },
          {
            "id": "diaz",
            "label": "Ms. Diaz has curly red hair and wears round glasses.",
            "clue": "Tells about the character",
            "group": "neither"
          },
          {
            "id": "tomas",
            "label": "Tomás is the tallest student in the fifth grade.",
            "clue": "It never changes",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "trait",
          "text": "Character trait"
        },
        {
          "id": "act",
          "text": "Shown by an action"
        }
      ],
      "items": [
        {
          "id": "kai",
          "label": "Kai picks up litter on the playground at every recess.",
          "sets": [
            "trait",
            "act"
          ]
        },
        {
          "id": "rita",
          "label": "Aunt Rita bakes cookies for every new neighbor on her street.",
          "sets": [
            "trait",
            "act"
          ]
        },
        {
          "id": "mia",
          "label": "Everyone agrees that Mia is a patient and gentle person.",
          "sets": [
            "trait"
          ]
        },
        {
          "id": "nia",
          "label": "After losing the game, Nia slammed her locker door.",
          "sets": [
            "act"
          ]
        },
        {
          "id": "sam",
          "label": "Sam felt lonely on his first day at the new school.",
          "sets": []
        },
        {
          "id": "eli",
          "label": "Eli has a small scar on his chin.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Read this sentence: \"Before the big test, Hana felt so nervous that her stomach hurt.\" What does this evidence reveal about Hana?",
        "choices": [
          {
            "id": "yes",
            "text": "A feeling Hana experiences during one particular moment"
          },
          {
            "id": "trap",
            "text": "A character trait, because nervous is a strong word describing Hana"
          },
          {
            "id": "no",
            "text": "A physical description of how Hana looks"
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the sentences that reveal a character trait.",
        "choices": [
          {
            "id": "theo",
            "text": "Theo always keeps his promises to his friends."
          },
          {
            "id": "zara",
            "text": "Zara helps her elderly neighbor carry groceries every Saturday."
          },
          {
            "id": "max",
            "text": "Max felt sleepy during the long car ride."
          },
          {
            "id": "ava",
            "text": "Ava has long black braids."
          },
          {
            "id": "owen",
            "text": "Owen is usually the first to volunteer when the class needs help."
          }
        ],
        "answers": [
          "theo",
          "zara",
          "owen"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether a quality lasts or passes quickly"
          },
          {
            "id": "trap",
            "text": "how strong the emotion word is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-5.9A-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Genre check",
    "teks": "5.9A",
    "pages": [
      {
        "rule": "Sort each story by its genre. Consider its purpose and its characters carefully.",
        "notThis": "Magic appears in many kinds of stories, so it cannot tell you the genre by itself.",
        "groups": [
          {
            "id": "myth",
            "label": "Myth"
          },
          {
            "id": "legend",
            "label": "Legend"
          }
        ],
        "items": [
          {
            "id": "persephone",
            "label": "Persephone must spend part of each year underground with Hades. While she is gone, her mother's sadness brings winter.",
            "clue": "Takes place long ago",
            "group": "myth"
          },
          {
            "id": "thor",
            "label": "Thor, the Norse god of thunder, swings his mighty hammer across the sky. Each swing makes the thunder that people hear.",
            "clue": "Thor is a strong hero",
            "group": "myth"
          },
          {
            "id": "arachne",
            "label": "Arachne boasts that she weaves better than the goddess Athena. As punishment, Athena turns her into the first spider.",
            "clue": "Arachne is a human",
            "group": "myth"
          },
          {
            "id": "arthur",
            "label": "Young Arthur pulls a sword from a stone that no one else can move. This proves that he is the true king of Britain.",
            "clue": "A magical sword",
            "group": "legend"
          },
          {
            "id": "robin",
            "label": "Robin Hood lives in Sherwood Forest with his band of outlaws. He takes from the rich to help the poor.",
            "clue": "Set in a real forest",
            "group": "legend"
          },
          {
            "id": "tell",
            "label": "William Tell is forced to shoot an apple off his son's head. His arrow splits the apple, and he later frees his people.",
            "clue": "Uses amazing skill",
            "group": "legend"
          }
        ]
      },
      {
        "rule": "Sort each story by its genre. Some stories belong to a different genre.",
        "notThis": "A story that explains something in nature is not automatically a myth.",
        "groups": [
          {
            "id": "myth",
            "label": "Myth"
          },
          {
            "id": "legend",
            "label": "Legend"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "prometheus",
            "label": "Prometheus steals fire from the gods and gives it to people. Zeus punishes him for sharing this gift.",
            "clue": "A hero helps people",
            "group": "myth"
          },
          {
            "id": "ra",
            "label": "Ra, the Egyptian sun god, sails a boat across the sky each day. His journey is why the sun rises and sets.",
            "clue": "Includes a boat trip",
            "group": "myth"
          },
          {
            "id": "piper",
            "label": "The Pied Piper plays a magical tune that leads all the rats out of town. When the town refuses to pay, he leads the children away.",
            "clue": "Includes magic",
            "group": "legend"
          },
          {
            "id": "mulan",
            "label": "Mulan disguises herself as a soldier to take her father's place in the army. She fights bravely for years before returning home.",
            "clue": "A brave hero",
            "group": "legend"
          },
          {
            "id": "bunyan",
            "label": "Paul Bunyan drags his heavy axe behind him as he walks. The deep scratch becomes the Grand Canyon.",
            "clue": "Explains how a canyon formed",
            "group": "neither"
          },
          {
            "id": "pecos",
            "label": "Pecos Bill lassoes a tornado and rides it across Texas like a bucking horse. Finally, the tornado gives up and rains itself out.",
            "clue": "A hero from long ago",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "god",
          "text": "A god appears"
        },
        {
          "id": "nature",
          "text": "Explains nature"
        }
      ],
      "items": [
        {
          "id": "poseidon",
          "label": "Poseidon, god of the sea, strikes the ground with his trident. The ancient Greeks said this is why earthquakes happen.",
          "sets": [
            "god",
            "nature"
          ]
        },
        {
          "id": "echo",
          "label": "The goddess Hera curses a nymph named Echo, so she can only repeat what others say. That is why echoes repeat our words.",
          "sets": [
            "god",
            "nature"
          ]
        },
        {
          "id": "perseus",
          "label": "The goddess Athena gives the hero Perseus a shiny shield. With its help, he defeats the monster Medusa.",
          "sets": [
            "god"
          ]
        },
        {
          "id": "chipmunk",
          "label": "A bear scratches a chipmunk's back as it escapes. Ever since, chipmunks have had stripes.",
          "sets": [
            "nature"
          ]
        },
        {
          "id": "lakes",
          "label": "Paul Bunyan's giant footprints fill up with rain. They become the thousands of lakes in Minnesota.",
          "sets": [
            "nature"
          ]
        },
        {
          "id": "arrow",
          "label": "Robin Hood enters an archery contest in disguise. He wins the golden arrow right under the sheriff's nose.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "In a story, the wizard Merlin uses magic to help young Arthur become a great king. Which genre is this story most likely?",
        "choices": [
          {
            "id": "yes",
            "text": "A legend, because it tells about a famous hero from long ago."
          },
          {
            "id": "trap",
            "text": "A myth, because the story includes powerful magic."
          },
          {
            "id": "no",
            "text": "A tall tale, because the hero does funny, impossible things."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the details that suggest a story is a myth.",
        "choices": [
          {
            "id": "weaver",
            "text": "A goddess punishes a proud weaver."
          },
          {
            "id": "seasons",
            "text": "The story explains why the seasons change."
          },
          {
            "id": "cowboy",
            "text": "A cowboy rides a tornado for fun."
          },
          {
            "id": "archer",
            "text": "A brave archer hides in a forest."
          },
          {
            "id": "hammer",
            "text": "A god's hammer causes the thunder."
          }
        ],
        "answers": [
          "weaver",
          "seasons",
          "hammer"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "each story's purpose and characters"
          },
          {
            "id": "trap",
            "text": "whether each story has magic"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-5.9B-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Which sound device?",
    "teks": "5.9B",
    "pages": [
      {
        "rule": "Sort each line by the sound device it uses. Listen to the words themselves.",
        "notThis": "A line about a noisy animal does not automatically contain onomatopoeia, so check whether any word imitates a sound.",
        "groups": [
          {
            "id": "allit",
            "label": "Alliteration"
          },
          {
            "id": "onom",
            "label": "Onomatopoeia"
          }
        ],
        "items": [
          {
            "id": "swans",
            "label": "Seven silly swans sailed south for the summer.",
            "clue": "Paints a picture of birds",
            "group": "allit"
          },
          {
            "id": "lions",
            "label": "Loud lions lounged lazily in the late light.",
            "clue": "About a loud animal",
            "group": "allit"
          },
          {
            "id": "geese",
            "label": "Great gray geese glided over the glassy pond.",
            "clue": "A calm, quiet scene",
            "group": "allit"
          },
          {
            "id": "door",
            "label": "The old door creaked open in the dark.",
            "clue": "Paints a spooky picture",
            "group": "onom"
          },
          {
            "id": "leaves",
            "label": "Dry leaves crunched under our boots on the trail.",
            "clue": "About a fall hike",
            "group": "onom"
          },
          {
            "id": "splash",
            "label": "Splash! A frog leaped into the cold water.",
            "clue": "Starts with one word",
            "group": "onom"
          }
        ]
      },
      {
        "rule": "Sort each line by the sound device it uses. Some lines use neither.",
        "notThis": "Describing a sound is different from imitating one, and comparing two things is a separate device altogether.",
        "groups": [
          {
            "id": "allit",
            "label": "Alliteration"
          },
          {
            "id": "onom",
            "label": "Onomatopoeia"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "pigs",
            "label": "Pink pigs played in the puddle all afternoon.",
            "clue": "Fun to say out loud",
            "group": "allit"
          },
          {
            "id": "divers",
            "label": "Daring divers dove deep into the dark sea.",
            "clue": "Paints an ocean picture",
            "group": "allit"
          },
          {
            "id": "wasp",
            "label": "The angry wasp buzzed near my ear.",
            "clue": "About an insect",
            "group": "onom"
          },
          {
            "id": "clock",
            "label": "The clock ticked softly all night.",
            "clue": "A quiet, calm picture",
            "group": "onom"
          },
          {
            "id": "band",
            "label": "His voice was as loud as a marching band.",
            "clue": "About a loud noise",
            "group": "neither"
          },
          {
            "id": "sheep",
            "label": "The clouds drifted like sheep across the sky.",
            "clue": "Paints a picture of animals",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "allit",
          "text": "Alliteration"
        },
        {
          "id": "onom",
          "text": "Onomatopoeia"
        }
      ],
      "items": [
        {
          "id": "bees",
          "label": "Buzzing bees bumbled by the bright blossoms.",
          "sets": [
            "allit",
            "onom"
          ]
        },
        {
          "id": "snake",
          "label": "The snake slid silently, softly hissing.",
          "sets": [
            "allit",
            "onom"
          ]
        },
        {
          "id": "moose",
          "label": "Mighty moose marched through the misty meadow.",
          "sets": [
            "allit"
          ]
        },
        {
          "id": "fire",
          "label": "The fire crackled late into the night.",
          "sets": [
            "onom"
          ]
        },
        {
          "id": "moon",
          "label": "The moon was like a silver coin.",
          "sets": []
        },
        {
          "id": "lake",
          "label": "The lake shone under the morning light.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Ben reads the line \"The noisy neighbors never napped.\" He says it uses onomatopoeia because it describes noise. Is he correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No, because no word imitates a sound, although the repeated n sound makes it alliteration."
          },
          {
            "id": "trap",
            "text": "Yes, because any line that describes a loud noise uses onomatopoeia."
          },
          {
            "id": "no",
            "text": "No, because the line compares two things using the word like."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the words that are examples of onomatopoeia.",
        "choices": [
          {
            "id": "sizzle",
            "text": "sizzle"
          },
          {
            "id": "thud",
            "text": "thud"
          },
          {
            "id": "gentle",
            "text": "gentle"
          },
          {
            "id": "silver",
            "text": "silver"
          },
          {
            "id": "splat",
            "text": "splat"
          }
        ],
        "answers": [
          "sizzle",
          "thud",
          "splat"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the sound device each line uses"
          },
          {
            "id": "trap",
            "text": "what each line is about"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "ELAR-5.9D-CL",
    "subject": "ELAR",
    "grade": "Grade 5",
    "title": "Text structure",
    "teks": "5.9D(iii)",
    "pages": [
      {
        "rule": "Sort each passage by how the writer organizes the ideas.",
        "notThis": "Signal words can mislead you, because the word first sometimes means earliest and sometimes means most important.",
        "groups": [
          {
            "id": "logic",
            "label": "Logical order"
          },
          {
            "id": "imp",
            "label": "Order of importance"
          }
        ],
        "items": [
          {
            "id": "seeds",
            "label": "First, soak the bean seeds in water overnight. Then plant each one an inch deep in moist soil.",
            "clue": "Uses the word first",
            "group": "logic"
          },
          {
            "id": "texas",
            "label": "In 1836, Texas declared its independence from Mexico. Nine years later, Texas joined the United States.",
            "clue": "About Texas history",
            "group": "logic"
          },
          {
            "id": "frogs",
            "label": "Most frogs begin life as tiny eggs in a pond. Next, the eggs gradually hatch into tadpoles with tails.",
            "clue": "Uses the word most",
            "group": "logic"
          },
          {
            "id": "fire",
            "label": "First and most important, a firefighter must stay calm. Strength and speed matter too, but much less.",
            "clue": "Uses the word first",
            "group": "imp"
          },
          {
            "id": "goggles",
            "label": "The most important rule in a science lab is to wear safety goggles. Keeping neat notes is helpful, but less essential.",
            "clue": "A list of lab rules",
            "group": "imp"
          },
          {
            "id": "captain",
            "label": "Above all, a good team captain listens to every player. Being a fast runner is only a small bonus.",
            "clue": "About a sports team",
            "group": "imp"
          }
        ]
      },
      {
        "rule": "Sort each passage by how the writer organizes the ideas. Some fit neither pattern.",
        "notThis": "A passage about two different things is not automatically organized by time, steps, or rank.",
        "groups": [
          {
            "id": "logic",
            "label": "Logical order"
          },
          {
            "id": "imp",
            "label": "Order of importance"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "fold",
            "label": "It is important to follow these directions carefully. Fold the paper in half, and then fold down each corner.",
            "clue": "Uses the word important",
            "group": "logic"
          },
          {
            "id": "ice",
            "label": "Heat causes the ice cube to melt into water. Then the water slowly evaporates into the air.",
            "clue": "About states of matter",
            "group": "logic"
          },
          {
            "id": "lifeguard",
            "label": "A lifeguard's first duty, above everything else, is keeping swimmers safe. Cleaning the pool deck matters far less.",
            "clue": "Uses the word first",
            "group": "imp"
          },
          {
            "id": "water",
            "label": "Saving water lowers your family's water bill a little. Even more important, it protects the river that the whole town drinks from.",
            "clue": "Saves the biggest idea for last",
            "group": "imp"
          },
          {
            "id": "toads",
            "label": "Frogs have smooth, wet skin, while toads have bumpy, dry skin. However, both lay their eggs in water.",
            "clue": "About two animals",
            "group": "neither"
          },
          {
            "id": "gators",
            "label": "Sharks and dolphins both swim in the ocean. However, a shark is a fish, while a dolphin is a mammal that breathes air.",
            "clue": "Two sea animals",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "logic",
          "text": "Logical order"
        },
        {
          "id": "first",
          "text": "Uses the word first"
        }
      ],
      "items": [
        {
          "id": "chrysalis",
          "label": "First, the caterpillar sheds its skin and becomes a hard chrysalis. Weeks later, a butterfly climbs out.",
          "sets": [
            "logic",
            "first"
          ]
        },
        {
          "id": "sprout",
          "label": "The seed sends roots down into the soil. Next, a green shoot pushes up toward the sunlight.",
          "sets": [
            "logic"
          ]
        },
        {
          "id": "helmet",
          "label": "First and most important, always wear a helmet. Bright clothing helps a little too.",
          "sets": [
            "first"
          ]
        },
        {
          "id": "friend",
          "label": "For a good friend, honesty comes first. Being funny is nice, but it matters much less.",
          "sets": [
            "first"
          ]
        },
        {
          "id": "bike",
          "label": "A bicycle has two wheels, while a tricycle has three. However, both are powered by pedals.",
          "sets": []
        },
        {
          "id": "sleep",
          "label": "The main reason to sleep well is to stay healthy. A smaller reason is to avoid feeling grumpy.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A passage says, \"First, and above all, a pilot must keep the plane safe. Serving snacks matters much less.\" Which pattern does the writer use?",
        "choices": [
          {
            "id": "yes",
            "text": "Order of importance, because the ideas are ranked by how much they matter."
          },
          {
            "id": "trap",
            "text": "Logical order, because the passage begins with the word first."
          },
          {
            "id": "no",
            "text": "Compare and contrast, because it describes two different jobs."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the signal words that often point to order of importance.",
        "choices": [
          {
            "id": "most",
            "text": "most important"
          },
          {
            "id": "above",
            "text": "above all"
          },
          {
            "id": "smaller",
            "text": "a smaller reason"
          },
          {
            "id": "however",
            "text": "however"
          },
          {
            "id": "next",
            "text": "next"
          }
        ],
        "answers": [
          "most",
          "above",
          "smaller"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "the reason the ideas are in that order"
          },
          {
            "id": "trap",
            "text": "whether the word first appears"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-5.4H-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "Flat, around, or inside?",
    "teks": "5.4H",
    "pages": [
      {
        "rule": "Classify each job according to what it actually measures.",
        "notThis": "The object in the job does not decide the answer. Instead, ask whether you are covering a flat surface or filling a space.",
        "groups": [
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "vol",
            "label": "Volume"
          }
        ],
        "items": [
          {
            "id": "lid",
            "label": "Maya needs colorful paper to cover the lid of a shoebox.",
            "clue": "It is a box",
            "group": "area"
          },
          {
            "id": "carpet",
            "label": "A family purchases carpet to cover the entire floor of a bedroom.",
            "clue": "The room is a big space",
            "group": "area"
          },
          {
            "id": "paint",
            "label": "The custodian buys paint for one wall of a fifth-grade classroom.",
            "clue": "Walls go around the room",
            "group": "area"
          },
          {
            "id": "cubes",
            "label": "A student packs unit cubes into a shoebox until it is completely full.",
            "clue": "Cubes are small",
            "group": "vol"
          },
          {
            "id": "sandbox",
            "label": "A parent orders enough sand to fill a new sandbox in the backyard.",
            "clue": "The sand is flat on top",
            "group": "vol"
          },
          {
            "id": "tank",
            "label": "Diego pours water into a rectangular fish tank until it is full.",
            "clue": "It has flat glass sides",
            "group": "vol"
          }
        ]
      },
      {
        "rule": "Classify each job according to what it measures. Some jobs measure neither.",
        "notThis": "Going around the outside edge is not the same as covering the surface, because only the border is being measured.",
        "groups": [
          {
            "id": "area",
            "label": "Area"
          },
          {
            "id": "vol",
            "label": "Volume"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "sod",
            "label": "A gardener orders enough grass to cover an entire backyard.",
            "clue": "The yard has a fence",
            "group": "area"
          },
          {
            "id": "board",
            "label": "A teacher needs colorful paper to cover a classroom bulletin board.",
            "clue": "The board has a border",
            "group": "area"
          },
          {
            "id": "trim",
            "label": "A teacher staples border trim around the edges of a bulletin board.",
            "clue": "The board is flat",
            "group": "neither"
          },
          {
            "id": "pen",
            "label": "A farmer builds a fence around the outside of a rectangular dog pen.",
            "clue": "The dog runs inside it",
            "group": "neither"
          },
          {
            "id": "bed",
            "label": "A family purchases soil to fill a raised garden bed for vegetables.",
            "clue": "Plants grow on top",
            "group": "vol"
          },
          {
            "id": "pool",
            "label": "The city pumps water into a swimming pool until it is completely full.",
            "clue": "The pool has a flat bottom",
            "group": "vol"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "vol",
          "text": "Volume"
        },
        {
          "id": "box",
          "text": "Measures a box"
        }
      ],
      "items": [
        {
          "id": "vcrate",
          "label": "A student packs cubes into a toy box until it is completely full.",
          "sets": [
            "vol",
            "box"
          ]
        },
        {
          "id": "vaquarium",
          "label": "A worker fills a large aquarium with water before adding the fish.",
          "sets": [
            "vol"
          ]
        },
        {
          "id": "vlid",
          "label": "A student glues colorful paper to cover the lid of a box.",
          "sets": [
            "box"
          ]
        },
        {
          "id": "vtape",
          "label": "A student places tape around the edges of a box lid.",
          "sets": [
            "box"
          ]
        },
        {
          "id": "vgarden",
          "label": "A family builds a fence around the outside of a vegetable garden.",
          "sets": []
        },
        {
          "id": "vfloor",
          "label": "A worker installs square tiles to cover an entire kitchen floor.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Jade covers the top of a gift box with wrapping paper. Which measurement does she need to know?",
        "choices": [
          {
            "id": "yes",
            "text": "She needs the area of the top, because she is covering a flat surface."
          },
          {
            "id": "trap",
            "text": "She needs the volume, because the object is a box."
          },
          {
            "id": "no",
            "text": "She needs the perimeter of the top, because it has edges."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the jobs that require you to know the volume.",
        "choices": [
          {
            "id": "tub",
            "text": "Filling a bathtub with water before a bath"
          },
          {
            "id": "crate",
            "text": "Packing unit cubes into a wooden crate"
          },
          {
            "id": "door",
            "text": "Painting the front of a bedroom door"
          },
          {
            "id": "yard",
            "text": "Putting a fence around a rectangular yard"
          }
        ],
        "answers": [
          "tub",
          "crate"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what each job measures"
          },
          {
            "id": "trap",
            "text": "what object is in each job"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-5.4D-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "Add or multiply the pattern?",
    "teks": "5.4D",
    "pages": [
      {
        "rule": "Compare each x with its own y. Classify each table by the rule that turns x into y.",
        "notThis": "Reading only down the y column can be misleading, because a steady jump appears in both kinds of patterns. Compare each input with its own output instead.",
        "groups": [
          {
            "id": "add",
            "label": "Additive pattern"
          },
          {
            "id": "mult",
            "label": "Multiplicative pattern"
          }
        ],
        "items": [
          {
            "id": "a1",
            "label": "x: 1, 2, 3 → y: 4, 5, 6",
            "clue": "Goes up by 1",
            "group": "add"
          },
          {
            "id": "a2",
            "label": "x: 2, 4, 6 → y: 7, 9, 11",
            "clue": "Goes up by 2",
            "group": "add"
          },
          {
            "id": "a3",
            "label": "x: 5, 6, 7 → y: 10, 11, 12",
            "clue": "5 to 10 is doubling",
            "group": "add"
          },
          {
            "id": "m1",
            "label": "x: 1, 2, 3 → y: 3, 6, 9",
            "clue": "Goes up by 3 each time",
            "group": "mult"
          },
          {
            "id": "m2",
            "label": "x: 2, 4, 6 → y: 4, 8, 12",
            "clue": "2 + 2 = 4",
            "group": "mult"
          },
          {
            "id": "m3",
            "label": "x: 1, 2, 3 → y: 5, 10, 15",
            "clue": "Goes up by 5",
            "group": "mult"
          }
        ]
      },
      {
        "rule": "Compare each x with its own y. Some tables follow neither kind of rule consistently.",
        "notThis": "Growing by the same step does not make a pattern additive, because multiplicative tables also grow steadily. Check whether one rule links every x to its y.",
        "groups": [
          {
            "id": "add",
            "label": "Additive pattern"
          },
          {
            "id": "mult",
            "label": "Multiplicative pattern"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "m4",
            "label": "x: 1, 2, 3 → y: 2, 4, 6",
            "clue": "Goes up by 2",
            "group": "mult"
          },
          {
            "id": "n1",
            "label": "x: 1, 2, 3 → y: 2, 4, 8",
            "clue": "Also starts with 2, 4",
            "group": "neither"
          },
          {
            "id": "a4",
            "label": "x: 3, 4, 5 → y: 6, 7, 8",
            "clue": "3 to 6 is doubling",
            "group": "add"
          },
          {
            "id": "m5",
            "label": "Points on a graph: (2, 6), (3, 9), (4, 12)",
            "clue": "Goes up by 3",
            "group": "mult"
          },
          {
            "id": "n2",
            "label": "x: 1, 2, 3 → y: 3, 5, 7",
            "clue": "Goes up by 2 each time",
            "group": "neither"
          },
          {
            "id": "a5",
            "label": "Points on a graph: (1, 7), (2, 8), (3, 9)",
            "clue": "Starts at 7",
            "group": "add"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "add",
          "text": "Additive pattern"
        },
        {
          "id": "step2",
          "text": "y grows by 2"
        }
      ],
      "items": [
        {
          "id": "vb1",
          "label": "x: 2, 4, 6 → y: 5, 7, 9",
          "sets": [
            "add",
            "step2"
          ]
        },
        {
          "id": "va1",
          "label": "x: 1, 2, 3 → y: 6, 7, 8",
          "sets": [
            "add"
          ]
        },
        {
          "id": "vs1",
          "label": "x: 1, 2, 3 → y: 2, 4, 6",
          "sets": [
            "step2"
          ]
        },
        {
          "id": "vs2",
          "label": "x: 1, 2, 3 → y: 3, 5, 7",
          "sets": [
            "step2"
          ]
        },
        {
          "id": "vn1",
          "label": "x: 1, 2, 3 → y: 4, 8, 12",
          "sets": []
        },
        {
          "id": "vb2",
          "label": "x: 1, 3, 5 → y: 11, 13, 15",
          "sets": [
            "add",
            "step2"
          ]
        }
      ],
      "mc": {
        "prompt": "Leo examines the table x: 1, 2, 3 → y: 3, 6, 9. He says it is additive because each y increases by 3. Is he correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No. Each x multiplied by 3 equals its y, so the pattern is multiplicative."
          },
          {
            "id": "trap",
            "text": "Yes. Adding 3 at every step down the column makes it additive."
          },
          {
            "id": "no",
            "text": "No. The table follows neither kind of rule consistently."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the tables that show a multiplicative relationship between x and y.",
        "choices": [
          {
            "id": "t7",
            "text": "x: 1, 2, 3 → y: 7, 14, 21"
          },
          {
            "id": "p7",
            "text": "x: 1, 2, 3 → y: 8, 9, 10"
          },
          {
            "id": "t5",
            "text": "x: 2, 4, 6 → y: 10, 20, 30"
          },
          {
            "id": "sq",
            "text": "x: 1, 2, 3 → y: 1, 4, 9"
          }
        ],
        "answers": [
          "t7",
          "t5"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how each x turns into its y"
          },
          {
            "id": "trap",
            "text": "how the y numbers grow"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-5.8A-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "On the axis?",
    "teks": "5.8A",
    "pages": [
      {
        "rule": "Classify each ordered pair according to the axis where its point is located.",
        "notThis": "Two ordered pairs can use exactly the same numbers, although their points are located in different places. When the coordinates are swapped, the point moves to the opposite axis.",
        "groups": [
          {
            "id": "xax",
            "label": "On the x-axis"
          },
          {
            "id": "yax",
            "label": "On the y-axis"
          }
        ],
        "items": [
          {
            "id": "x5",
            "label": "(5, 0)",
            "clue": "Has a 5 and a 0",
            "group": "xax"
          },
          {
            "id": "y5",
            "label": "(0, 5)",
            "clue": "Also has a 5 and a 0",
            "group": "yax"
          },
          {
            "id": "x8",
            "label": "(8, 0)",
            "clue": "The biggest number here",
            "group": "xax"
          },
          {
            "id": "y2",
            "label": "(0, 2)",
            "clue": "Only 2 steps from the origin",
            "group": "yax"
          },
          {
            "id": "x1",
            "label": "(1, 0)",
            "clue": "Just 1 step from the origin",
            "group": "xax"
          },
          {
            "id": "y10",
            "label": "(0, 10)",
            "clue": "Two digits in one number",
            "group": "yax"
          }
        ]
      },
      {
        "rule": "Classify each ordered pair by its axis. Some points are located on neither axis.",
        "notThis": "A point that sits slightly above or beside an axis is not on it. Check whether one of its coordinates is actually zero.",
        "groups": [
          {
            "id": "xax",
            "label": "On the x-axis"
          },
          {
            "id": "yax",
            "label": "On the y-axis"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "x9",
            "label": "(9, 0)",
            "clue": "Has a zero",
            "group": "xax"
          },
          {
            "id": "y4",
            "label": "(0, 4)",
            "clue": "Has a zero",
            "group": "yax"
          },
          {
            "id": "y1",
            "label": "(0, 1)",
            "clue": "Very close to the origin",
            "group": "yax"
          },
          {
            "id": "n41",
            "label": "(4, 1)",
            "clue": "Almost touches the x-axis",
            "group": "neither"
          },
          {
            "id": "n16",
            "label": "(1, 6)",
            "clue": "Almost touches the y-axis",
            "group": "neither"
          },
          {
            "id": "n33",
            "label": "(3, 3)",
            "clue": "Both numbers match",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "xax",
          "text": "On the x-axis"
        },
        {
          "id": "yax",
          "text": "On the y-axis"
        }
      ],
      "items": [
        {
          "id": "vo",
          "label": "(0, 0)",
          "sets": [
            "xax",
            "yax"
          ]
        },
        {
          "id": "vx3",
          "label": "(3, 0)",
          "sets": [
            "xax"
          ]
        },
        {
          "id": "vx7",
          "label": "(7, 0)",
          "sets": [
            "xax"
          ]
        },
        {
          "id": "vy3",
          "label": "(0, 3)",
          "sets": [
            "yax"
          ]
        },
        {
          "id": "vn11",
          "label": "(1, 1)",
          "sets": []
        },
        {
          "id": "vn52",
          "label": "(5, 2)",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Ava says the point (0, 5) is on the x-axis because the zero comes first. Is she correct?",
        "choices": [
          {
            "id": "yes",
            "text": "No. Its x-coordinate is zero, so the point is located on the y-axis."
          },
          {
            "id": "trap",
            "text": "Yes. A zero in the first position always places a point on the horizontal axis."
          },
          {
            "id": "no",
            "text": "No. The point is not located on either axis."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the statements that are true about the point (0, 0).",
        "choices": [
          {
            "id": "origin",
            "text": "This special point is called the origin."
          },
          {
            "id": "both",
            "text": "It is located on both axes at the same time."
          },
          {
            "id": "cross",
            "text": "It is the location where the horizontal and vertical axes intersect."
          },
          {
            "id": "none",
            "text": "It is not located on either of the two axes."
          }
        ],
        "answers": [
          "origin",
          "both",
          "cross"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which axis each point sits on"
          },
          {
            "id": "trap",
            "text": "which numbers each point uses"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-5.10C-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "How will you pay?",
    "teks": "5.10C",
    "pages": [
      {
        "rule": "Classify each payment according to where the money actually comes from.",
        "notThis": "A plastic card or a phone can work either way, so it cannot tell you the answer. Instead, ask whose money is really paying for the purchase.",
        "groups": [
          {
            "id": "own",
            "label": "Uses your own money"
          },
          {
            "id": "borrow",
            "label": "Uses borrowed money"
          }
        ],
        "items": [
          {
            "id": "debit",
            "label": "At the grocery store, a customer pays for her food with a debit card.",
            "clue": "Looks just like a credit card",
            "group": "own"
          },
          {
            "id": "check",
            "label": "A father writes a paper check to pay the monthly water bill.",
            "clue": "Paper, not a card",
            "group": "own"
          },
          {
            "id": "online",
            "label": "A family pays the electric bill online directly from their checking account.",
            "clue": "Done on a computer",
            "group": "own"
          },
          {
            "id": "shoes2",
            "label": "A teenager purchases a new pair of sneakers with a credit card.",
            "clue": "The card has your name",
            "group": "borrow"
          },
          {
            "id": "tap",
            "label": "A shopper taps a phone that has a credit card saved in its digital wallet.",
            "clue": "No card comes out",
            "group": "borrow"
          },
          {
            "id": "gas",
            "label": "A driver pays for gasoline at the station by using a credit card.",
            "clue": "Paid for right away",
            "group": "borrow"
          }
        ]
      },
      {
        "rule": "Classify each situation according to where the money comes from. Some are not payments.",
        "notThis": "Money moving between bank accounts is not always paying for something. A payment happens only when someone purchases an item or pays a bill.",
        "groups": [
          {
            "id": "own",
            "label": "Uses your own money"
          },
          {
            "id": "borrow",
            "label": "Uses borrowed money"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "app",
            "label": "You pay for a pizza delivery with a phone app linked to your bank account.",
            "clue": "Uses a phone app",
            "group": "own"
          },
          {
            "id": "movie",
            "label": "At the movie theater, a customer swipes a debit card to purchase tickets.",
            "clue": "Swiped like a credit card",
            "group": "own"
          },
          {
            "id": "gameonline",
            "label": "A student's mother orders a video game online with a credit card.",
            "clue": "It is an electronic payment",
            "group": "borrow"
          },
          {
            "id": "later",
            "label": "A family takes a bicycle home today and agrees to pay the store back later.",
            "clue": "You ride it today",
            "group": "borrow"
          },
          {
            "id": "deposit",
            "label": "A worker deposits a paycheck into her bank account on Friday afternoon.",
            "clue": "Uses the bank",
            "group": "neither"
          },
          {
            "id": "savings",
            "label": "A student moves $20 from a checking account into a separate savings account.",
            "clue": "Money leaves your checking account",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "borrow",
          "text": "Uses borrowed money"
        },
        {
          "id": "card",
          "text": "Uses a card"
        }
      ],
      "items": [
        {
          "id": "vdinner",
          "label": "A family pays for dinner at a restaurant with a credit card.",
          "sets": [
            "borrow",
            "card"
          ]
        },
        {
          "id": "vcouch",
          "label": "A customer takes a couch home and agrees to pay the store back later.",
          "sets": [
            "borrow"
          ]
        },
        {
          "id": "vgroc",
          "label": "A shopper pays for groceries at the register with a debit card.",
          "sets": [
            "card"
          ]
        },
        {
          "id": "vorder",
          "label": "A student's father orders a book online with a debit card.",
          "sets": [
            "card"
          ]
        },
        {
          "id": "vcheck",
          "label": "A parent writes a paper check to pay for piano lessons.",
          "sets": []
        },
        {
          "id": "vcash",
          "label": "A shopper pays with cash that she carries in her wallet.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "Sam's card looks just like his mother's credit card, but it is actually a debit card. Whose money does his card use?",
        "choices": [
          {
            "id": "yes",
            "text": "It uses Sam's own money, which comes from his bank account."
          },
          {
            "id": "trap",
            "text": "It uses borrowed money, because it resembles a credit card."
          },
          {
            "id": "no",
            "text": "It uses no money at all, because it is only a plastic card."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the statements that describe a disadvantage of paying with a credit card.",
        "choices": [
          {
            "id": "interest",
            "text": "You may owe extra money, called interest, if you do not pay the whole bill on time."
          },
          {
            "id": "overspend",
            "text": "It is easy to spend more money than you actually have in the bank."
          },
          {
            "id": "safe",
            "text": "It is usually safer to carry a card than a large amount of cash."
          },
          {
            "id": "now",
            "text": "The money is removed from your bank account immediately after you pay."
          }
        ],
        "answers": [
          "interest",
          "overspend"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whose money pays"
          },
          {
            "id": "trap",
            "text": "what the payment looks like"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "MA-5.10A-CL",
    "subject": "Math",
    "grade": "Grade 5",
    "title": "What kind of tax?",
    "teks": "5.10A",
    "pages": [
      {
        "rule": "Classify each tax according to what it is paid on. Decide whether it comes from a purchase or from property.",
        "notThis": "Buying something and owning property are different situations, so ask what the tax is actually paid on. The price or size of an item does not determine the kind of tax.",
        "groups": [
          {
            "id": "sales",
            "label": "Sales tax"
          },
          {
            "id": "prop",
            "label": "Property tax"
          }
        ],
        "items": [
          {
            "id": "car",
            "label": "When a family purchases a new car, the dealer adds a tax to the total price.",
            "clue": "A car is property",
            "group": "sales"
          },
          {
            "id": "bike",
            "label": "A cashier adds a tax to the price when you purchase a new bicycle.",
            "clue": "You own the bike after",
            "group": "sales"
          },
          {
            "id": "game",
            "label": "The store adds a small tax to the price of a video game at the register.",
            "clue": "Only a few dollars",
            "group": "sales"
          },
          {
            "id": "house",
            "label": "Every year, a family pays a tax to the county on the house that they own.",
            "clue": "A house costs a lot",
            "group": "prop"
          },
          {
            "id": "store",
            "label": "A store owner pays a tax to the county each year on the building that she owns.",
            "clue": "The store sells things",
            "group": "prop"
          },
          {
            "id": "farm",
            "label": "A farmer pays a tax to the county every year on the farm land he owns.",
            "clue": "The farmer sells crops",
            "group": "prop"
          }
        ]
      },
      {
        "rule": "Classify each tax according to what it is paid on. Some taxes are a different kind.",
        "notThis": "A job or a business in the situation does not decide the kind of tax. Instead, look carefully at what the money is being collected on.",
        "groups": [
          {
            "id": "sales",
            "label": "Sales tax"
          },
          {
            "id": "prop",
            "label": "Property tax"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "couch",
            "label": "A family purchases a new couch, and the furniture store adds a tax to the price.",
            "clue": "It stays in the house",
            "group": "sales"
          },
          {
            "id": "shoes",
            "label": "A cashier at the department store adds a tax when you purchase a pair of sneakers.",
            "clue": "You own the shoes after",
            "group": "sales"
          },
          {
            "id": "lot",
            "label": "Each year, a family pays a tax on an empty lot that they own in the city.",
            "clue": "Nothing is built there",
            "group": "prop"
          },
          {
            "id": "office",
            "label": "A company pays a tax each year on the office building that it owns.",
            "clue": "The company earns money",
            "group": "prop"
          },
          {
            "id": "carpay",
            "label": "A car salesperson pays a tax on the wages she earns during the year.",
            "clue": "The worker sells cars",
            "group": "neither"
          },
          {
            "id": "social",
            "label": "Money for Social Security is withheld from a worker's paycheck.",
            "clue": "Paid when a worker gets paid",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "prop",
          "text": "Property tax"
        },
        {
          "id": "biz",
          "text": "Paid by a business"
        }
      ],
      "items": [
        {
          "id": "vbakery",
          "label": "A bakery pays a tax each year on the building that it owns.",
          "sets": [
            "prop",
            "biz"
          ]
        },
        {
          "id": "vhome",
          "label": "A family pays a tax each year to the county on the home that they own.",
          "sets": [
            "prop"
          ]
        },
        {
          "id": "vland",
          "label": "Each year, a family pays a tax on land that they own outside of town.",
          "sets": [
            "prop"
          ]
        },
        {
          "id": "vprofit",
          "label": "A company pays a tax on the money that it earned this year.",
          "sets": [
            "biz"
          ]
        },
        {
          "id": "vnurse",
          "label": "A nurse pays a tax on the salary that she earns at the hospital.",
          "sets": []
        },
        {
          "id": "vteen",
          "label": "A tax is withheld automatically from a teenager's paycheck at a summer job.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "The Garcias purchase a new car from a dealer. Which kind of tax is added to the total price of the vehicle?",
        "choices": [
          {
            "id": "yes",
            "text": "Sales tax is added, because the family is making a purchase."
          },
          {
            "id": "trap",
            "text": "Property tax is added, because a car is valuable property."
          },
          {
            "id": "no",
            "text": "Payroll tax is added, because both parents have jobs."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the statements that are true about property tax.",
        "choices": [
          {
            "id": "land",
            "text": "It is paid on land and buildings that people or businesses own."
          },
          {
            "id": "year",
            "text": "Property owners usually pay it annually, which means once each year."
          },
          {
            "id": "store",
            "text": "The cashier adds it at the store when you purchase something."
          },
          {
            "id": "check",
            "text": "It is withheld automatically from every paycheck a worker receives."
          }
        ],
        "answers": [
          "land",
          "year"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "what the tax is paid on"
          },
          {
            "id": "trap",
            "text": "how big or costly the thing is"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-5.2A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Cause or result?",
    "teks": "5.2A",
    "pages": [
      {
        "rule": "Sort each event: did it lead to the Revolution, or come from it?",
        "notThis": "A law, a fight or a treaty can land in either group. Ask whether the event came before the war or because of it.",
        "groups": [
          {
            "id": "cause",
            "label": "Cause of the Revolution"
          },
          {
            "id": "result",
            "label": "Result of the Revolution"
          }
        ],
        "items": [
          {
            "id": "stamp",
            "label": "In 1765, Parliament passed the Stamp Act, which taxed newspapers and other printed papers.",
            "clue": "A law written on paper",
            "group": "cause"
          },
          {
            "id": "massacre",
            "label": "In 1770, British soldiers fired into a crowd in Boston and killed five colonists.",
            "clue": "Soldiers fired guns",
            "group": "cause"
          },
          {
            "id": "teaparty",
            "label": "In 1773, colonists dumped chests of British tea into Boston Harbor.",
            "clue": "Colonists broke the law",
            "group": "cause"
          },
          {
            "id": "treaty",
            "label": "In 1783, Britain signed the Treaty of Paris and recognized American independence.",
            "clue": "Signed by British leaders",
            "group": "result"
          },
          {
            "id": "constitution",
            "label": "Americans wrote the Constitution to set up their own national government.",
            "clue": "A plan written on paper",
            "group": "result"
          },
          {
            "id": "free",
            "label": "The thirteen colonies became a free and independent nation.",
            "clue": "Americans celebrated",
            "group": "result"
          }
        ]
      },
      {
        "rule": "Sort each event: cause or result. Some events belong to neither group.",
        "notThis": "Fighting Britain or gaining land does not automatically connect an event to the Revolution.",
        "groups": [
          {
            "id": "cause",
            "label": "Cause of the Revolution"
          },
          {
            "id": "result",
            "label": "Result of the Revolution"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "taxrep",
            "label": "Colonists complained that they had to pay British taxes but had no vote in Parliament.",
            "clue": "An idea, not an event",
            "group": "cause"
          },
          {
            "id": "intolerable",
            "label": "In 1774, Parliament closed Boston Harbor to punish the colonists for the Tea Party.",
            "clue": "It came after the Tea Party",
            "group": "cause"
          },
          {
            "id": "land",
            "label": "The new United States gained land stretching west to the Mississippi River.",
            "clue": "A new border was drawn",
            "group": "result"
          },
          {
            "id": "parliament",
            "label": "Americans no longer had to obey laws passed by the British Parliament.",
            "clue": "About laws",
            "group": "result"
          },
          {
            "id": "war1812",
            "label": "In 1812, the United States went to war against Britain again.",
            "clue": "Americans fought Britain",
            "group": "neither"
          },
          {
            "id": "louisiana",
            "label": "In 1803, the United States bought the Louisiana Territory from France.",
            "clue": "The country gained land",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "cause",
          "text": "Cause of the Revolution"
        },
        {
          "id": "tax",
          "text": "About taxes"
        }
      ],
      "items": [
        {
          "id": "stampV",
          "label": "In 1765, the Stamp Act taxed newspapers, playing cards and legal papers.",
          "sets": [
            "cause",
            "tax"
          ]
        },
        {
          "id": "townV",
          "label": "In 1767, the Townshend Acts taxed glass, paint, paper and tea.",
          "sets": [
            "cause",
            "tax"
          ]
        },
        {
          "id": "massacreV",
          "label": "In 1770, British soldiers fired into a crowd in Boston.",
          "sets": [
            "cause"
          ]
        },
        {
          "id": "articlesV",
          "label": "Under its first plan of government, the new Congress could not tax the people directly.",
          "sets": [
            "tax"
          ]
        },
        {
          "id": "treatyV",
          "label": "In 1783, the Treaty of Paris officially ended the war.",
          "sets": []
        },
        {
          "id": "louisianaV",
          "label": "In 1803, the United States bought the Louisiana Territory.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "In 1774, Parliament closed Boston Harbor to punish the colonists for the Tea Party. Why is this a cause of the Revolution?",
        "choices": [
          {
            "id": "yes",
            "text": "It made colonists angrier and pushed them closer to war with Britain."
          },
          {
            "id": "trap",
            "text": "It is really a result, because it happened after the Tea Party."
          },
          {
            "id": "no",
            "text": "It is not connected to the Revolution in any way."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the results of the American Revolution.",
        "choices": [
          {
            "id": "indep",
            "text": "Britain agreed that the United States was a free nation."
          },
          {
            "id": "west",
            "text": "The United States gained land reaching west to the Mississippi River."
          },
          {
            "id": "gov",
            "text": "Americans created their own national government."
          },
          {
            "id": "stamp",
            "text": "Parliament passed the Stamp Act to tax the colonies."
          },
          {
            "id": "buy",
            "text": "The United States bought the Louisiana Territory from France."
          }
        ],
        "answers": [
          "indep",
          "west",
          "gov"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether an event led to the Revolution or came from it"
          },
          {
            "id": "trap",
            "text": "whether the event was a law, a fight or a treaty"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-5.7A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "City, country, or in between?",
    "teks": "5.7A",
    "pages": [
      {
        "rule": "Sort each place by its settlement pattern: how people live there.",
        "notThis": "A single detail can fool you, so look at the whole scene. Think about how close together people live.",
        "groups": [
          {
            "id": "rur",
            "label": "Rural"
          },
          {
            "id": "urb",
            "label": "Urban"
          }
        ],
        "items": [
          {
            "id": "ranch",
            "label": "Cattle graze on a ranch, and the nearest neighbor lives two miles away.",
            "clue": "A busy highway runs past",
            "group": "rur"
          },
          {
            "id": "smalltown",
            "label": "A small town of 600 people is surrounded by cotton fields.",
            "clue": "Has a main street with shops",
            "group": "rur"
          },
          {
            "id": "drive",
            "label": "A family drives forty minutes to reach the nearest grocery store.",
            "clue": "They own a pickup truck",
            "group": "rur"
          },
          {
            "id": "towers",
            "label": "Apartment towers and office buildings stand close together downtown.",
            "clue": "Has a quiet park",
            "group": "urb"
          },
          {
            "id": "subway",
            "label": "Thousands of people ride a subway train to work each morning.",
            "clue": "Trains run underground.",
            "group": "urb"
          },
          {
            "id": "garden",
            "label": "Neighbors grow vegetables in a community garden between tall buildings.",
            "clue": "People are farming",
            "group": "urb"
          }
        ]
      },
      {
        "rule": "Sort each place by its settlement pattern. Some places fit neither group.",
        "notThis": "Busy roads and big stores appear in many kinds of places, so they do not decide the pattern.",
        "groups": [
          {
            "id": "rur",
            "label": "Rural"
          },
          {
            "id": "urb",
            "label": "Urban"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "wheat",
            "label": "A family grows wheat on hundreds of acres of land.",
            "clue": "Near a large highway",
            "group": "rur"
          },
          {
            "id": "forest",
            "label": "A few cabins are scattered through a thick pine forest.",
            "clue": "Visitors come every weekend",
            "group": "rur"
          },
          {
            "id": "rush",
            "label": "Buses, taxis and crowds fill the streets of downtown at rush hour.",
            "clue": "Lots of traffic",
            "group": "urb"
          },
          {
            "id": "blocks",
            "label": "Restaurants, offices and apartments share the same crowded city block.",
            "clue": "Very few yards",
            "group": "urb"
          },
          {
            "id": "mall",
            "label": "A large mall sits beside neighborhoods of houses just outside a city.",
            "clue": "Traffic jams on weekends",
            "group": "neither"
          },
          {
            "id": "commute",
            "label": "New neighborhoods grow outside a city, and many parents drive into the city for work.",
            "clue": "Busy roads every morning",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "urb",
          "text": "Urban area"
        },
        {
          "id": "traffic",
          "text": "Lots of traffic"
        }
      ],
      "items": [
        {
          "id": "jamV",
          "label": "Taxis and buses crowd a downtown street during rush hour.",
          "sets": [
            "urb",
            "traffic"
          ]
        },
        {
          "id": "bridgeV",
          "label": "Cars crawl across a bridge into the center of a big city.",
          "sets": [
            "urb",
            "traffic"
          ]
        },
        {
          "id": "parkV",
          "label": "Families picnic on the quiet grass of a park in the middle of a city.",
          "sets": [
            "urb"
          ]
        },
        {
          "id": "mallV",
          "label": "Cars back up for blocks outside a shopping mall in a suburb.",
          "sets": [
            "traffic"
          ]
        },
        {
          "id": "ranchV",
          "label": "Cows rest beside a quiet dirt road on a ranch.",
          "sets": []
        },
        {
          "id": "bikeV",
          "label": "Children ride bikes along a quiet street in a suburb.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A suburb has a crowded highway, a huge mall and heavy traffic. Which statement explains why it is not an urban area?",
        "choices": [
          {
            "id": "yes",
            "text": "It is a community of neighborhoods outside a city, not the crowded city itself."
          },
          {
            "id": "trap",
            "text": "It really is urban, because heavy traffic always means a city."
          },
          {
            "id": "no",
            "text": "It is rural, because many houses there have yards and trees."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the details that describe a rural area.",
        "choices": [
          {
            "id": "far",
            "text": "Homes are spread far apart from each other."
          },
          {
            "id": "farm",
            "text": "Much of the land is used for farms or ranches."
          },
          {
            "id": "few",
            "text": "Fewer people live there than in a city."
          },
          {
            "id": "tall",
            "text": "Tall buildings stand close together on every block."
          },
          {
            "id": "train",
            "text": "Most people ride a subway to their jobs."
          }
        ],
        "answers": [
          "far",
          "farm",
          "few"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "how closely people live together"
          },
          {
            "id": "trap",
            "text": "how much traffic a place has"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-5.15C-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Whose job is it?",
    "teks": "5.15C",
    "pages": [
      {
        "rule": "Classify each job according to which level of government has the power to do it.",
        "notThis": "An important job does not automatically belong to the national government. Likewise, a job close to home does not automatically belong to the state.",
        "groups": [
          {
            "id": "nat",
            "label": "National government"
          },
          {
            "id": "state",
            "label": "State government"
          }
        ],
        "items": [
          {
            "id": "money",
            "label": "New paper dollars are printed for people to spend all across the country.",
            "clue": "Used in every store",
            "group": "nat"
          },
          {
            "id": "war",
            "label": "The country declares war after a serious attack by another nation.",
            "clue": "A very serious choice",
            "group": "nat"
          },
          {
            "id": "mail",
            "label": "Letters and packages are delivered to the homes on your street six days a week.",
            "clue": "It comes to your street",
            "group": "nat"
          },
          {
            "id": "license",
            "label": "A sixteen-year-old passes a driving test and receives a driver's license.",
            "clue": "Good for driving in any state",
            "group": "state"
          },
          {
            "id": "hunt",
            "label": "A family receives a license to hunt and fish at a lake near their home.",
            "clue": "For lakes and forests",
            "group": "state"
          },
          {
            "id": "speed",
            "label": "A speed limit of 70 miles per hour is set for the highways.",
            "clue": "Even on interstate highways",
            "group": "state"
          }
        ]
      },
      {
        "rule": "Classify each job by which government has the power. Some powers belong to neither.",
        "notThis": "A job near your home might belong to a city government instead. A city is not the same as the state government.",
        "groups": [
          {
            "id": "nat",
            "label": "National government"
          },
          {
            "id": "state",
            "label": "State government"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "treaty",
            "label": "The country signs a treaty, which is a formal written agreement, with another nation.",
            "clue": "Leaders sign them",
            "group": "nat"
          },
          {
            "id": "newstate",
            "label": "A territory is allowed to join the country as a brand-new state.",
            "clue": "It changes the map of states",
            "group": "nat"
          },
          {
            "id": "elect",
            "label": "An election is held so that voters can choose a new governor.",
            "clue": "Voters choose a leader",
            "group": "state"
          },
          {
            "id": "teach",
            "label": "A college graduate receives a license to teach in the public schools.",
            "clue": "Every state has teachers",
            "group": "state"
          },
          {
            "id": "police",
            "label": "New police officers are hired to keep a city's neighborhoods safe.",
            "clue": "Keeps people safe",
            "group": "neither"
          },
          {
            "id": "trash",
            "label": "Leaders decide which day of the week trash is collected in a city.",
            "clue": "Every house gets it",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "nat",
          "text": "National can do it"
        },
        {
          "id": "state",
          "text": "State can do it"
        }
      ],
      "items": [
        {
          "id": "tax",
          "label": "Taxes are collected from people and businesses to pay for public services.",
          "sets": [
            "nat",
            "state"
          ]
        },
        {
          "id": "roads",
          "label": "New roads and bridges are built so that people can travel safely.",
          "sets": [
            "nat",
            "state"
          ]
        },
        {
          "id": "cash",
          "label": "Coins and paper dollars are produced for the whole nation to use.",
          "sets": [
            "nat"
          ]
        },
        {
          "id": "post",
          "label": "Post offices are operated in towns and cities across the nation.",
          "sets": [
            "nat"
          ]
        },
        {
          "id": "citygov",
          "label": "A new city government is set up after a small town grows larger.",
          "sets": [
            "state"
          ]
        },
        {
          "id": "parks",
          "label": "A city decides which hours its public park will be open to visitors.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A mail carrier walks down your street every day. Which level of government is responsible for the mail?",
        "choices": [
          {
            "id": "yes",
            "text": "The national government is responsible for delivering the mail."
          },
          {
            "id": "trap",
            "text": "The state government runs it, because the mail arrives close to home."
          },
          {
            "id": "no",
            "text": "No government is responsible for delivering the mail."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the powers that the national and state governments share with each other.",
        "choices": [
          {
            "id": "borrow",
            "text": "Borrow money to pay for public projects"
          },
          {
            "id": "laws",
            "text": "Make laws and enforce them"
          },
          {
            "id": "print",
            "text": "Print paper money"
          },
          {
            "id": "drive",
            "text": "Give driver's licenses to new drivers"
          }
        ],
        "answers": [
          "borrow",
          "laws"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which government has the power"
          },
          {
            "id": "trap",
            "text": "how important the job seems"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-5.15A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Which U.S. branch?",
    "teks": "5.15A",
    "pages": [
      {
        "rule": "Sort each action by the branch of government that carries it out.",
        "notThis": "Many actions involve a law, but only one branch actually writes and passes laws. Think about the job, not the topic.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "jud",
            "label": "Judicial"
          }
        ],
        "items": [
          {
            "id": "bill",
            "label": "The House and the Senate both vote to pass a new bill.",
            "clue": "Members argue for weeks",
            "group": "leg"
          },
          {
            "id": "budget",
            "label": "Congress decides how much tax money to spend on highways.",
            "clue": "About money and roads",
            "group": "leg"
          },
          {
            "id": "treaty",
            "label": "The Senate votes to approve a treaty with another country.",
            "clue": "About other nations",
            "group": "leg"
          },
          {
            "id": "strike",
            "label": "The Supreme Court decides that a law goes against the Constitution.",
            "clue": "That law no longer counts",
            "group": "jud"
          },
          {
            "id": "meaning",
            "label": "The Supreme Court explains what a confusing law really means.",
            "clue": "It changes how people follow a law",
            "group": "jud"
          },
          {
            "id": "trial",
            "label": "A federal judge oversees a trial about a national law.",
            "clue": "Deals with a national law",
            "group": "jud"
          }
        ]
      },
      {
        "rule": "Sort each action by branch. Some actions belong to neither group.",
        "notThis": "Some actions belong to a branch that is not one of these two, so ask who is doing the job.",
        "groups": [
          {
            "id": "leg",
            "label": "Legislative"
          },
          {
            "id": "jud",
            "label": "Judicial"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "war",
            "label": "Congress votes to declare war on another country.",
            "clue": "Soldiers will go to fight",
            "group": "leg"
          },
          {
            "id": "confirm",
            "label": "The Senate votes to approve a new Supreme Court justice.",
            "clue": "About a Supreme Court judge",
            "group": "leg"
          },
          {
            "id": "state",
            "label": "The Supreme Court rules that a state law breaks the Constitution.",
            "clue": "A law stops counting",
            "group": "jud"
          },
          {
            "id": "appeal",
            "label": "A federal appeals court reviews whether an earlier trial was fair.",
            "clue": "Lawyers argue in a courtroom",
            "group": "jud"
          },
          {
            "id": "sign",
            "label": "The President signs a bill, and it officially becomes a law.",
            "clue": "A new law begins",
            "group": "neither"
          },
          {
            "id": "nominate",
            "label": "The President chooses a person to serve on the Supreme Court.",
            "clue": "Picks a Supreme Court judge",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "jud",
          "text": "Judicial branch"
        },
        {
          "id": "sc",
          "text": "About the Supreme Court"
        }
      ],
      "items": [
        {
          "id": "scCase",
          "label": "The nine Supreme Court justices hear a case about free speech.",
          "sets": [
            "jud",
            "sc"
          ]
        },
        {
          "id": "scRule",
          "label": "The Supreme Court decides whether a law follows the Constitution.",
          "sets": [
            "jud",
            "sc"
          ]
        },
        {
          "id": "district",
          "label": "A federal district judge leads a trial with a jury.",
          "sets": [
            "jud"
          ]
        },
        {
          "id": "nomV",
          "label": "The President nominates a person to be a Supreme Court justice.",
          "sets": [
            "sc"
          ]
        },
        {
          "id": "confV",
          "label": "The Senate holds a vote on a Supreme Court nominee.",
          "sets": [
            "sc"
          ]
        },
        {
          "id": "budgetV",
          "label": "Congress passes a budget for the national parks.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "The Supreme Court decided that a law went against the Constitution, so the law could no longer be used. Which statement explains this action correctly?",
        "choices": [
          {
            "id": "yes",
            "text": "It was the judicial branch, because that branch decides what laws mean."
          },
          {
            "id": "trap",
            "text": "It was the legislative branch, because the action changed a law."
          },
          {
            "id": "no",
            "text": "It was the executive branch, because that branch carries out laws."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the actions that are jobs of the legislative branch.",
        "choices": [
          {
            "id": "pass",
            "text": "Congress passes bills that can become laws."
          },
          {
            "id": "war",
            "text": "Congress has the power to declare war."
          },
          {
            "id": "treaty",
            "text": "The Senate approves treaties with other nations."
          },
          {
            "id": "sign",
            "text": "The President signs bills into law."
          },
          {
            "id": "court",
            "text": "The Supreme Court decides what a law means."
          }
        ],
        "answers": [
          "pass",
          "war",
          "treaty"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which branch has that job"
          },
          {
            "id": "trap",
            "text": "whether the action involves a law"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-5.19A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "What does the Bill of Rights protect?",
    "teks": "5.19A",
    "pages": [
      {
        "rule": "Sort each action by the amendment that protects it.",
        "notThis": "Speaking up in some way does not automatically mean the First Amendment. Read the freedoms it actually lists.",
        "groups": [
          {
            "id": "first",
            "label": "In the First Amendment"
          },
          {
            "id": "other",
            "label": "Amendments 2 through 10"
          }
        ],
        "items": [
          {
            "id": "worship",
            "label": "A family worships at the mosque they choose to attend.",
            "clue": "A quiet, private choice",
            "group": "first"
          },
          {
            "id": "paper",
            "label": "A newspaper prints a story that criticizes the governor.",
            "clue": "The governor is upset",
            "group": "first"
          },
          {
            "id": "rally",
            "label": "Hundreds of people gather peacefully in a park to protest a decision.",
            "clue": "Nobody gives a speech",
            "group": "first"
          },
          {
            "id": "silent",
            "label": "A person accused of a crime refuses to answer questions that could prove guilt.",
            "clue": "Chooses not to speak",
            "group": "other"
          },
          {
            "id": "lawyer",
            "label": "A person accused of a crime has a lawyer to help at trial.",
            "clue": "Someone speaks up for them",
            "group": "other"
          },
          {
            "id": "warrant",
            "label": "Police get a warrant from a judge before searching a family's home.",
            "clue": "About privacy at home",
            "group": "other"
          }
        ]
      },
      {
        "rule": "Sort each action by the amendment that protects it. Some are protected elsewhere.",
        "notThis": "A right can feel important and still come from an amendment that was added much later.",
        "groups": [
          {
            "id": "first",
            "label": "In the First Amendment"
          },
          {
            "id": "other",
            "label": "Amendments 2 through 10"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "petition",
            "label": "Students send a signed petition asking Congress to change a law.",
            "clue": "They write, not speak",
            "group": "first"
          },
          {
            "id": "speech",
            "label": "A citizen gives a speech that criticizes the President.",
            "clue": "Some people disagree loudly",
            "group": "first"
          },
          {
            "id": "jury",
            "label": "A jury of ordinary citizens decides whether an accused person is guilty.",
            "clue": "Citizens get a voice",
            "group": "other"
          },
          {
            "id": "soldiers",
            "label": "A family refuses to let soldiers live in their home during peacetime.",
            "clue": "About a family's home",
            "group": "other"
          },
          {
            "id": "vote18",
            "label": "An 18-year-old citizen votes in an election for the first time.",
            "clue": "A basic right of citizens",
            "group": "neither"
          },
          {
            "id": "women",
            "label": "A woman casts a vote for President.",
            "clue": "Lets citizens speak up",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "first",
          "text": "In the First Amendment"
        },
        {
          "id": "speak",
          "text": "About speaking or writing"
        }
      ],
      "items": [
        {
          "id": "speechV",
          "label": "A citizen stands up and gives a speech against a new tax.",
          "sets": [
            "first",
            "speak"
          ]
        },
        {
          "id": "pressV",
          "label": "A newspaper publishes an article about a mistake by the government.",
          "sets": [
            "first",
            "speak"
          ]
        },
        {
          "id": "religionV",
          "label": "A family chooses which religion to follow, or to follow none.",
          "sets": [
            "first"
          ]
        },
        {
          "id": "lawyerV",
          "label": "A lawyer speaks in court for a person accused of a crime.",
          "sets": [
            "speak"
          ]
        },
        {
          "id": "soldiersV",
          "label": "A family refuses to let soldiers move into their home in peacetime.",
          "sets": []
        },
        {
          "id": "vote18V",
          "label": "An 18-year-old citizen votes in a national election.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "An 18-year-old votes for the first time. Where is the right to vote at age 18 protected?",
        "choices": [
          {
            "id": "yes",
            "text": "In an amendment added long after the Bill of Rights was written."
          },
          {
            "id": "trap",
            "text": "In the First Amendment, because voting lets people speak up."
          },
          {
            "id": "no",
            "text": "In the Second Amendment, which is about keeping and bearing arms."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the rights that the First Amendment protects.",
        "choices": [
          {
            "id": "religion",
            "text": "Freedom of religion"
          },
          {
            "id": "press",
            "text": "Freedom of the press"
          },
          {
            "id": "petition",
            "text": "The right to petition the government"
          },
          {
            "id": "jury",
            "text": "The right to a trial by jury"
          },
          {
            "id": "vote",
            "text": "The right to vote at age 18"
          }
        ],
        "answers": [
          "religion",
          "press",
          "petition"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "which amendment protects each right"
          },
          {
            "id": "trap",
            "text": "which rights feel most important"
          }
        ],
        "answer": "right"
      }
    }
  },
  {
    "id": "SS-5.23A-CL",
    "subject": "Social Studies",
    "grade": "Grade 5",
    "title": "Revolution sources",
    "teks": "5.23A",
    "pages": [
      {
        "rule": "Sort each source about the American Revolution: primary or secondary.",
        "notThis": "A source that looks old or official is not automatically primary. Ask whether the maker was actually there.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          }
        ],
        "items": [
          {
            "id": "decl",
            "label": "The Declaration of Independence, which the Continental Congress approved in 1776.",
            "clue": "Printed in modern books",
            "group": "pri"
          },
          {
            "id": "revere",
            "label": "Paul Revere's engraving of the Boston Massacre, published in Boston in 1770.",
            "clue": "A picture, not writing",
            "group": "pri"
          },
          {
            "id": "abigail",
            "label": "Abigail Adams's 1776 letter asking her husband to \"remember the ladies.\"",
            "clue": "Written to her own husband",
            "group": "pri"
          },
          {
            "id": "textbook",
            "label": "A school textbook chapter about the Revolution, published in 2019.",
            "clue": "Quotes the Declaration word for word",
            "group": "sec"
          },
          {
            "id": "audio",
            "label": "A museum audio tour about the Revolution, recorded in 2021.",
            "clue": "Played beside objects from 1776",
            "group": "sec"
          },
          {
            "id": "movie",
            "label": "A movie about George Washington's army, filmed in 2015.",
            "clue": "Uses real names and places",
            "group": "sec"
          }
        ]
      },
      {
        "rule": "Sort each source: primary or secondary. Some sources are about a different event.",
        "notThis": "Every source here comes from someone, but not every source is about the American Revolution.",
        "groups": [
          {
            "id": "pri",
            "label": "Primary source"
          },
          {
            "id": "sec",
            "label": "Secondary source"
          },
          {
            "id": "neither",
            "label": "Neither"
          }
        ],
        "items": [
          {
            "id": "diary",
            "label": "An army doctor's diary, written at Valley Forge during the winter of 1777.",
            "clue": "Messy, personal handwriting",
            "group": "pri"
          },
          {
            "id": "paine",
            "label": "Thomas Paine's pamphlet Common Sense, which urged colonists toward independence in 1776.",
            "clue": "Written to change minds",
            "group": "pri"
          },
          {
            "id": "website",
            "label": "A historian's website about the Battle of Yorktown, written in 2020.",
            "clue": "Written by an expert",
            "group": "sec"
          },
          {
            "id": "kidsbook",
            "label": "A children's book about Paul Revere's ride, published in 2010.",
            "clue": "Full of true facts",
            "group": "sec"
          },
          {
            "id": "civilwar",
            "label": "A soldier's letter to his family, written during the Civil War in 1863.",
            "clue": "Written by a soldier who fought",
            "group": "neither"
          },
          {
            "id": "moon",
            "label": "A newspaper story about the first moon landing, printed in 1969.",
            "clue": "Printed the very next day",
            "group": "neither"
          }
        ]
      }
    ],
    "venn": {
      "labels": [
        {
          "id": "pri",
          "text": "Primary source"
        },
        {
          "id": "words",
          "text": "Mostly written words"
        }
      ],
      "items": [
        {
          "id": "declV",
          "label": "The Declaration of Independence, approved in 1776.",
          "sets": [
            "pri",
            "words"
          ]
        },
        {
          "id": "abigailV",
          "label": "A letter Abigail Adams wrote to John Adams in 1776.",
          "sets": [
            "pri",
            "words"
          ]
        },
        {
          "id": "revereV",
          "label": "Paul Revere's engraving of the Boston Massacre, made in 1770.",
          "sets": [
            "pri"
          ]
        },
        {
          "id": "historyV",
          "label": "A historian's book about the Revolution, published in 2005.",
          "sets": [
            "words"
          ]
        },
        {
          "id": "statueV",
          "label": "A statue of Paul Revere on horseback, set up in Boston in 1940.",
          "sets": []
        },
        {
          "id": "movieV",
          "label": "A movie about the Revolution, filmed in 2015.",
          "sets": []
        }
      ],
      "mc": {
        "prompt": "A historian who is alive today writes a book about the Boston Tea Party, and the book quotes real letters from 1773. What kind of source is the book?",
        "choices": [
          {
            "id": "yes",
            "text": "A secondary source, because the historian was not there."
          },
          {
            "id": "trap",
            "text": "A primary source, because it quotes real letters from 1773."
          },
          {
            "id": "no",
            "text": "It is not a source, because it is a book."
          }
        ],
        "answer": "yes"
      },
      "multi": {
        "prompt": "Choose all the primary sources about the American Revolution.",
        "choices": [
          {
            "id": "letter",
            "text": "A letter Abigail Adams wrote to John Adams in 1776"
          },
          {
            "id": "decl",
            "text": "The Declaration of Independence"
          },
          {
            "id": "paine",
            "text": "Thomas Paine's pamphlet Common Sense, published in 1776"
          },
          {
            "id": "tour",
            "text": "A museum audio tour recorded in 2021"
          },
          {
            "id": "text",
            "text": "A textbook chapter written in 2019"
          }
        ],
        "answers": [
          "letter",
          "decl",
          "paine"
        ]
      },
      "inline": {
        "before": "The card was about",
        "after": ".",
        "choices": [
          {
            "id": "right",
            "text": "whether the maker was there or took part"
          },
          {
            "id": "trap",
            "text": "how old or official the source looks"
          }
        ],
        "answer": "right"
      }
    }
  }
];


export function getLabCase(id) {
  return LABS.find((lab) => lab.id === id) || null;
}
