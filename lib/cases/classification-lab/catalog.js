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
];


export function getLabCase(id) {
  return LABS.find((lab) => lab.id === id) || null;
}
