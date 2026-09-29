// Broadcast Booth wave 6 — Grade 4 Science, part 3 of the Science queue:
// SCI.4.10C-BB (weather vs climate), SCI.4.11B-BB (energy in modern life),
// SCI.4.11C-BB (rocks that store resources), SCI.4.12A-BB (producers make food).
// Registered from catalog.js. Each picture file is used by only one caption.
//
// ART_READY: the pictures are requested in image-prompts/broadcast-booth/wave6.md.
// While this is false, chips show their words only. Once every file in that
// request is saved under public/maker/broadcast/, set it to true.

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

// 4.10C — weather is today; climate is the long-term pattern. El Paso and
// Houston, 1991–2020 averages. Not the seasons data desk (4.9A).
export const CLIMATE = {
  id: "SCI.4.10C-BB",
  standard: "SCI.4.10C-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.10C",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: A rainy week in the desert?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Weather and climate",
  prompt: "You are live on Field Radio. It rained in El Paso all week, and someone says El Paso must be a rainy place now. Explain the difference between weather and climate, and use the data to set the record straight.",
  cover: {
    headline: "Field Radio — Weather Desk",
    line: "Weather is this week. Climate is the pattern over many years.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Weather desk notes",
    readAloud: true,
    bullets: [
      "Weather is what the air is like at one time and place: today's rain, wind, and temperature.",
      "Climate is the usual weather of a place over many years, often 30 years or more.",
      "This week, storms dropped rain on El Paso four days in a row.",
      "Over 30 years, El Paso has averaged only about 9 inches of rain a year. It has a dry, desert climate.",
      "Houston has averaged more than 50 inches of rain a year. It has a wet climate.",
      "One rainy week changes the weather. It does not change the climate.",
    ],
  },
  brainstormChips: [
    chip("cl_storm", "storm clouds over El Paso this week", "bb-clim-storm"),
    chip("cl_desert", "El Paso's desert plants need little rain", "bb-clim-desert"),
    chip("cl_average", "about 9 inches of rain a year in El Paso", "bb-clim-average"),
    chip("cl_houston", "Houston gets more than 50 inches a year", "bb-clim-houston"),
    chip("cl_forecast", "today's forecast is weather", "bb-clim-forecast"),
  ],
  beatStems: {
    hook: [
      stem("cl_h1", "Four rainy days in the desert. Is El Paso a rainy place now?"),
      stem("cl_h2", "Not so fast. This week is not the whole story."),
    ],
    big_idea: [
      stem("cl_b1", "Weather is what the air is like right now."),
      stem("cl_b2", "Climate is the usual weather over many years."),
    ],
    show_me: [
      stem("cl_s1", "It rained all week, but El Paso averages only about 9 inches a year."),
      stem("cl_s2", "Houston averages more than 50 inches, so its climate is wet."),
    ],
    sign_off: [
      stem("cl_o1", "Weather Desk, signing off."),
      stem("cl_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain the difference between weather and climate and use data to tell them apart.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.10C. A rainy week in El Paso is weather; about 9 inches of rain a year over 30 years is its dry climate. Houston's wetter climate is the comparison. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "One unusual week does not change a climate. Weather changes day to day; climate is an average over many years. Rainfall numbers are 1991–2020 averages.",
};

// 4.11B — energy runs modern life, and conservation, disposal, and recycling
// affect the environment. A power outage and the week after. Not the
// use-less-or-recycle debate (5.11).
export const OUTAGE = {
  id: "SCI.4.11B-BB",
  standard: "SCI.4.11B-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.11B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: A day without power",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Energy in modern life, and caring for resources",
  prompt: "You are live from a neighborhood where a storm knocked out the power for a day. Report where you are, what stopped working, and what families are doing now to save energy and handle waste the right way. Then sign off.",
  cover: {
    headline: "Field Radio — Neighborhood Desk",
    line: "When the power goes out, you find out how much you need it.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Neighborhood kit",
    readAloud: true,
    sceneSetter: "You are here on a street where a storm knocked down a power line. The power was out for a whole day.",
    placeStill: still("bb-out-street", "The neighborhood street — you are here"),
    artifactCard: {
      title: "Neighbor's note",
      body: "No lights, no fridge, no fan, no way to charge a phone. Even the gas station pumps stopped, because they run on electricity.",
      imageUrl: art("bb-out-note"),
    },
    bullets: [
      "Energy resources like coal, natural gas, wind, and sunlight make the electricity homes use.",
      "Conservation means using less, like turning off lights and fans when you leave a room.",
      "Recycling an aluminum can takes much less energy than making a new can from scratch.",
      "Old batteries should go to a drop-off center, not the trash, so their chemicals don't leak into the ground.",
    ],
  },
  brainstormChips: [
    chip("out_fridge", "the fridge stopped and the food got warm", "bb-out-fridge"),
    chip("out_pump", "the gas pumps stopped too", "bb-out-pump"),
    chip("out_lights", "turning off lights saves energy", "bb-out-lights"),
    chip("out_cans", "recycled cans save energy", "bb-out-cans"),
    chip("out_battery", "old batteries go to a drop-off, not the trash", "bb-out-battery"),
  ],
  beatStems: {
    where: [
      stem("out_w1", "Reporting from a street that was dark for a whole day."),
      stem("out_w2", "A storm knocked down a power line here."),
    ],
    what_noticed: [
      stem("out_n1", "Without electricity, the fridge, the lights, and even the gas pumps stopped."),
      stem("out_n2", "Now families are turning things off when they leave a room."),
    ],
    why_matters: [
      stem("out_y1", "Modern life runs on energy resources."),
      stem("out_y2", "Saving energy, recycling, and throwing things away the right way protect the land, water, and air."),
    ],
    sign_off: [
      stem("out_o1", "Neighborhood Desk, signing off."),
      stem("out_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-out-street", "The street"),
    what_noticed: still("bb-out-fridge", "The dark fridge"),
  }),
  samOpen: "Read the neighborhood kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can explain why energy resources matter in daily life and how conservation, recycling, and proper disposal help the environment.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.11B. From a street after a day-long power outage, students report what stopped working without energy and how saving energy, recycling cans, and dropping off batteries help the environment. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Electricity has to be made from an energy resource; it doesn't just come from the wall. Recycling and conservation are different: one reuses materials, the other uses less.",
};

// 4.11C — the properties of rock that let it store resources. The Edwards
// Aquifer's limestone. Not the canyon (4.10B).
export const AQUIFER = {
  id: "SCI.4.11C-BB",
  standard: "SCI.4.11C-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.11C",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Water hiding in the rock?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Rocks that store water, oil, and gas",
  prompt: "You are live on Field Radio. Much of San Antonio's water comes from under the ground, stored inside rock. Explain which properties let some rocks hold water, oil, or natural gas, and why other rocks can't.",
  cover: {
    headline: "Field Radio — Underground Desk",
    line: "Some rock is full of holes. That is where the water waits.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Underground notes",
    readAloud: true,
    bullets: [
      "The Edwards Aquifer is a huge layer of limestone under south-central Texas. Much of San Antonio's water comes from it.",
      "Its limestone is full of tiny holes, cracks, and even caves. Water fills those spaces.",
      "Sandstone has tiny spaces between its grains. It can hold water, oil, or natural gas.",
      "Granite has almost no spaces. Water runs off it instead of soaking in.",
      "A rock with spaces that connect lets water flow through it, so wells can pump it out.",
    ],
  },
  brainstormChips: [
    chip("aq_limestone", "limestone full of holes and cracks", "bb-aq-limestone"),
    chip("aq_sandstone", "sandstone has spaces between its grains", "bb-aq-sandstone"),
    chip("aq_granite", "water runs right off granite", "bb-aq-granite"),
    chip("aq_well", "a well pumps water up from the rock", "bb-aq-well"),
    chip("aq_sponge", "rock with spaces soaks up water like a sponge", "bb-aq-sponge"),
  ],
  beatStems: {
    hook: [
      stem("aq_h1", "Some of the water in your sink was hiding inside a rock."),
      stem("aq_h2", "How can solid rock hold water?"),
    ],
    big_idea: [
      stem("aq_b1", "Rocks with lots of spaces can store water, oil, and natural gas."),
      stem("aq_b2", "The spaces have to connect so the water can move through."),
    ],
    show_me: [
      stem("aq_s1", "The Edwards Aquifer's limestone is full of holes and cracks."),
      stem("aq_s2", "Granite has almost no spaces, so water runs off it."),
    ],
    sign_off: [
      stem("aq_o1", "Underground Desk, signing off."),
      stem("aq_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can identify the properties of rocks, such as spaces and cracks that connect, that let them store water, oil, and natural gas.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.11C. Using the Edwards Aquifer's limestone, sandstone, and granite, students explain how holes, cracks, and connected spaces let some rocks store water, oil, and natural gas. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An aquifer is not an underground lake; the water fills spaces inside rock. Hard rock like granite can't hold much because it has almost no spaces.",
};

// 4.12A — producers make their own food from sunlight, water, and carbon
// dioxide. A pecan tree. Not a food web (4.12B) and not plant structures (4.13A).
export const PRODUCERS = {
  id: "SCI.4.12A-BB",
  standard: "SCI.4.12A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.12A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Where does a tree get its food?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "How producers make food",
  prompt: "You are live on Field Radio. A pecan tree never eats a bite, but it grows huge. Explain how a producer makes its own food, and how that connects plants and animals.",
  cover: {
    headline: "Field Radio — Plant Desk",
    line: "Sunlight, water, and air. That's the whole recipe.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Plant desk notes",
    readAloud: true,
    bullets: [
      "The pecan tree is the state tree of Texas.",
      "Plants are producers. Most producers make their own food.",
      "Leaves take in carbon dioxide, a gas in the air.",
      "Roots take in water from the soil.",
      "Leaves use energy from sunlight to turn the water and carbon dioxide into sugar, their food.",
      "Leaves give off oxygen. Animals breathe in oxygen and breathe out carbon dioxide, which plants use again.",
    ],
  },
  brainstormChips: [
    chip("pr_sun", "sunlight shines on the pecan leaves", "bb-prod-sun"),
    chip("pr_roots", "roots take in water", "bb-prod-roots"),
    chip("pr_air", "leaves take in carbon dioxide from the air", "bb-prod-air"),
    chip("pr_sugar", "the leaves make sugar for food", "bb-prod-sugar"),
    chip("pr_breathe", "animals breathe out the gas plants use", "bb-prod-breathe"),
  ],
  beatStems: {
    hook: [
      stem("pr_h1", "This pecan tree never eats a bite, but it keeps growing."),
      stem("pr_h2", "So where does its food come from?"),
    ],
    big_idea: [
      stem("pr_b1", "Producers make their own food."),
      stem("pr_b2", "They use sunlight, water, and carbon dioxide."),
    ],
    show_me: [
      stem("pr_s1", "Roots bring in water, leaves take in carbon dioxide, and sunlight powers it all."),
      stem("pr_s2", "Leaves give off oxygen, and animals give back carbon dioxide. Matter cycles."),
    ],
    sign_off: [
      stem("pr_o1", "Plant Desk, signing off."),
      stem("pr_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain how most producers make their own food using sunlight, water, and carbon dioxide, and how matter cycles between plants and animals.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.12A. Using a pecan tree, students explain how leaves use sunlight, water, and carbon dioxide to make sugar, and how oxygen and carbon dioxide cycle between plants and animals. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Plants do not get their food from the soil; soil gives water and nutrients, but the plant makes its food. The mass of a tree comes mostly from carbon dioxide in the air.",
};

export const WAVE6_CASES = [CLIMATE, OUTAGE, AQUIFER, PRODUCERS];
