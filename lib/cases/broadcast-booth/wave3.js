// Broadcast Booth third wave — the rest of the second-wave plan rows:
// SCI.4.10B-BB (canyon), SCI.5.11-BB (use less or recycle), ELA.5.9D-BB
// (central idea). Registered from catalog.js.
// Each picture file is used by only one caption.
//
// ART_READY: these pictures are requested in
// image-prompts/broadcast-booth/wave3.md and are not made yet. While this is
// false, chips show their words only (no broken images). Once every file in
// that request is saved under public/maker/broadcast/, set it to true.

const ART_READY = false;

function art(image) {
  return ART_READY ? `/maker/broadcast/${image}.png` : undefined;
}

function chip(id, label, image) {
  const imageUrl = art(image);
  return imageUrl
    ? { id, label, source: "stimulus", imageId: image, imageUrl }
    : { id, label, source: "stimulus" };
}

function still(image, caption) {
  const imageUrl = art(image);
  return imageUrl ? { imageUrl, caption } : undefined;
}

function stem(id, label) {
  return { id, label, source: "stem" };
}

function stills(map) {
  const out = {};
  Object.entries(map).forEach(([beat, value]) => { if (value) out[beat] = value; });
  return Object.keys(out).length ? out : undefined;
}

// Grade 4 Science 4.10B — the only "land changes slowly" story. Not the water
// cycle (4.10A) and not landform names (5.10C).
export const CANYON = {
  id: "SCI.4.10B-BB",
  standard: "SCI.4.10B-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.10B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: How did the canyon get so deep?",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Weathering, erosion, and deposition",
  prompt: "You are live from the rim of Palo Duro Canyon. Report where you are, what water, wind, and ice are doing to the rock, and why slow changes like these matter. Then sign off. This is not the water cycle.",
  cover: {
    headline: "Field Radio — Canyon Desk",
    line: "Break it. Move it. Drop it. Slowly.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Canyon field kit",
    readAloud: true,
    sceneSetter: "You are here on the rim of Palo Duro Canyon in the Texas Panhandle. The canyon is about 800 feet deep. A small river winds along the bottom.",
    placeStill: still("bb-canyon-rim", "Palo Duro Canyon rim — you are here"),
    artifactCard: {
      title: "Field card",
      body: "Weathering breaks rock into smaller pieces. Erosion carries the pieces away. Deposition drops them in a new place. Water, wind, and ice do all three, very slowly.",
      imageUrl: art("bb-canyon-card"),
    },
    bullets: [
      "At night, water in a crack can freeze. Ice takes up more space than water, so it pushes the crack wider.",
      "Wind throws sand against the rock walls and wears them down, grain by grain.",
      "The river carries sand and bits of rock downstream.",
      "Where the river slows at a bend, it drops sand. The sand piles up into a sandbar.",
      "A river has been cutting this canyon for about a million years. You cannot watch it grow in a day.",
    ],
  },
  brainstormChips: [
    chip("can_ice", "ice in a crack pushes the rock apart", "bb-canyon-ice"),
    chip("can_wind", "wind throws sand at the rock wall", "bb-canyon-wind"),
    chip("can_river", "the river carries sand and rock away", "bb-canyon-river"),
    chip("can_sandbar", "the river drops sand at the bend", "bb-canyon-sandbar"),
    chip("can_rock", "a chunk broke off the canyon wall", "bb-canyon-rockfall"),
  ],
  beatStems: {
    where: [
      stem("can_w1", "Reporting from the rim of Palo Duro Canyon."),
      stem("can_w2", "The river is about 800 feet below me."),
    ],
    what_noticed: [
      stem("can_n1", "Ice and wind break the rock. That is weathering."),
      stem("can_n2", "The river carries the pieces away. That is erosion."),
      stem("can_n3", "At the bend, the river drops sand. That is deposition."),
    ],
    why_matters: [
      stem("can_y1", "Tiny changes add up to a huge canyon over a long time."),
      stem("can_y2", "The land we stand on is still changing, just slowly."),
    ],
    sign_off: [
      stem("can_o1", "Canyon Desk, signing off."),
      stem("can_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-canyon-rim", "The canyon rim"),
    what_noticed: still("bb-canyon-river", "The river at the bottom"),
  }),
  samOpen: "Read the field kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can describe how weathering, erosion, and deposition from water, wind, and ice slowly change Earth's surface.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.10B. From the rim of Palo Duro Canyon, students report how water, wind, and ice break rock, carry it away, and drop it somewhere new. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Weathering and erosion are not the same thing: weathering breaks rock, erosion moves it. These changes are slow; a flash flood is a fast change. This is not the water cycle.",
};

// Grade 5 Science 5.11 — a fair debate between two solutions. Not the
// wind-and-gas debate (4.11A).
export const USE_LESS = {
  id: "SCI.5.11-BB",
  standard: "SCI.5.11-BB",
  engine: "broadcast_booth",
  grade: 5,
  subject: "Science",
  teks: "SCI.5.11",
  kicker: "Broadcast Booth · Debate",
  title: "Field Radio: Use less, or recycle more?",
  estimatedMinutes: 28,
  segmentType: "debate",
  topic: "Solutions that protect natural resources",
  sideALabel: "Use less",
  sideBLabel: "Recycle more",
  prompt: "Live debate: The student council can pay for one project this year. Should it help the school use less paper and plastic, or recycle more of it? Give both sides a fair case, then say what you think now. This is not the wind-and-gas debate.",
  cover: {
    headline: "Field Radio — Earth Desk",
    line: "Two real solutions. One project this year.",
  },
  stimulus: {
    gradeBand: "G5",
    title: "Student council notes",
    readAloud: true,
    sharedContext: "Our school throws away a lot of paper and plastic water bottles every week. Paper is made from trees. Most plastic is made from oil or natural gas. Whatever we throw away ends up in a landfill. The student council has enough money for one project.",
    sideBriefs: {
      sideA: {
        label: "Use less",
        bullets: [
          "Using less, called conservation, means fewer trees are cut and less oil is used in the first place.",
          "One refill station can replace thousands of plastic bottles.",
          "Printing on both sides of the paper uses about half as many sheets.",
          "It only works if people change their habits, like bringing a bottle from home.",
        ],
      },
      sideB: {
        label: "Recycle more",
        bullets: [
          "Recycling turns used paper and plastic into new products, so less goes to the landfill.",
          "A bin in every classroom is easy to start, and most students already know how to use one.",
          "Recycling still uses trucks, water, and energy.",
          "Greasy or mixed-up items cannot be recycled, and some plastics are not accepted.",
        ],
      },
    },
  },
  brainstormChips: [
    chip("ul_refill", "one refill station replaces many bottles", "bb-less-refill"),
    chip("ul_print", "printing on both sides saves paper", "bb-less-print"),
    chip("ul_habit", "it only works if people bring a bottle", "bb-less-habit"),
    chip("ul_bins", "a bin in every room is easy to use", "bb-recycle-bins"),
    chip("ul_newpaper", "used paper can become new paper", "bb-recycle-newpaper"),
    chip("ul_truck", "recycling still uses trucks and energy", "bb-recycle-truck"),
    chip("ul_greasy", "a greasy pizza box cannot be recycled", "bb-recycle-greasy"),
  ],
  beatStems: {
    side_a: [
      stem("ul_a1", "Using less stops the waste before it starts."),
      stem("ul_a2", "Fewer bottles means less oil is used to make them."),
    ],
    side_b: [
      stem("ul_b1", "Recycling gives used paper and plastic a second life."),
      stem("ul_b2", "It keeps trash out of the landfill, but it still uses energy."),
    ],
    what_i_think: [
      stem("ul_t1", "After hearing both sides, I think…"),
      stem("ul_t2", "The best plan might start with one and add the other later."),
    ],
    sign_off: [
      stem("ul_o1", "Earth Desk, signing off."),
      stem("ul_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    side_a: still("bb-less-refill", "Use less"),
    side_b: still("bb-recycle-bins", "Recycle more"),
  }),
  samOpen: "Read both briefs. Put at least one chip on each side, then record.",
  learning_target: "I can explain how conservation and recycling each reduce the harm from using natural resources, and compare the two fairly.",
  lesson_summary: "Grade 5 Debate broadcast. TEKS 5.11. Students weigh two solutions for the school's paper and plastic waste: use less (conservation) or recycle more. Both sides have real benefits and real limits. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Recycling is not free or perfect: it uses energy, and dirty or mixed items can't be recycled. Using less and recycling are different solutions. Neither side is the only right answer.",
};

// Grade 5 ELAR 5.9D(i) — central idea with supporting evidence in an
// informational text. Not the theme of the trumpet play (5.8A), and not the
// glacier text Expedition Station uses for 5.9D.
export const CENTRAL_IDEA = {
  id: "ELA.5.9D-BB",
  standard: "ELA.5.9D-BB",
  engine: "broadcast_booth",
  grade: 5,
  subject: "ELAR",
  teks: "ELA.5.9D",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: What is the article mostly about?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Central idea with supporting evidence",
  prompt: "You are live on Field Radio. Read the article \"Where Did the Horned Lizards Go?\" Explain its central idea and give two pieces of evidence that support it. An interesting fact is not always the central idea.",
  cover: {
    headline: "Field Radio — Reading Desk",
    line: "What is the whole article mostly about? Prove it with evidence.",
  },
  stimulus: {
    gradeBand: "G5",
    title: "Where Did the Horned Lizards Go?",
    readAloud: true,
    bullets: [
      "The Texas horned lizard is the state reptile of Texas. It was once easy to find across much of the state. Today, in many places, it is hard to find at all.",
      "Its main food is the harvester ant. Fire ants and bug spray have wiped out many harvester ant colonies. With less food, fewer lizards survive.",
      "The lizard also needs open, sandy ground where it can hide and lay eggs. Roads, lawns, and buildings now cover much of that land.",
      "Years ago, many people caught horned lizards to keep as pets. Now Texas law protects them, and it is against the law to take one from the wild.",
      "Some zoos raise baby horned lizards and release them on protected land, hoping to bring them back.",
    ],
  },
  brainstormChips: [
    chip("ci_ants", "harvester ants are its main food", "bb-ci-ants"),
    chip("ci_spray", "fire ants and bug spray wiped out ant colonies", "bb-ci-spray"),
    chip("ci_land", "roads and buildings cover its sandy ground", "bb-ci-land"),
    chip("ci_law", "a Texas law now protects the lizard", "bb-ci-law"),
    chip("ci_zoo", "zoos raise babies and release them", "bb-ci-zoo"),
  ],
  beatStems: {
    hook: [
      stem("ci_h1", "The Texas horned lizard used to be easy to find. Not anymore."),
      stem("ci_h2", "It is the state reptile, but that is not what the article is mostly about."),
    ],
    big_idea: [
      stem("ci_b1", "The central idea is what the whole article is mostly about."),
      stem("ci_b2", "Horned lizards became rare because the food and land they need disappeared."),
    ],
    show_me: [
      stem("ci_s1", "Evidence: fire ants and bug spray wiped out the ants it eats."),
      stem("ci_s2", "Evidence: roads and buildings covered its sandy ground."),
    ],
    sign_off: [
      stem("ci_o1", "Reading Desk, signing off."),
      stem("ci_o2", "Back to you."),
    ],
  },
  samOpen: "Read the article. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can identify the central idea of an informational text and support it with evidence from the text.",
  lesson_summary: "Grade 5 Explain broadcast. TEKS 5.9D(i): the central idea with supporting evidence. Students read a short article about why Texas horned lizards became rare, name the central idea, and back it up with two details. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An interesting detail (it is the state reptile) is not the central idea. The central idea is what most of the details support. This is an informational text, so students name a central idea, not a theme.",
};

export const WAVE3_CASES = [CANYON, USE_LESS, CENTRAL_IDEA];
