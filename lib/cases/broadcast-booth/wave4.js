// Broadcast Booth wave 4 — Grade 4 Science, part 1 of the Science queue:
// SCI.4.9B-BB (Moon pattern), SCI.4.6A-BB (properties), SCI.4.6B-BB
// (mixtures and solutions), SCI.4.6C-BB (matter is conserved).
// Registered from catalog.js. Each picture file is used by only one caption.
//
// ART_READY: the pictures are requested in image-prompts/broadcast-booth/wave4.md.
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

// 4.9B — the Moon's pattern, from a month of observations. Not day and night
// (5.9), and not the Sun–Earth–Moon orbits (3.9A).
export const MOON = {
  id: "SCI.4.9B-BB",
  standard: "SCI.4.9B-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.9B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Can you predict the Moon?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "The Moon's pattern of change",
  prompt: "You are live on Field Radio. Use Kiara's Moon journal to explain the pattern the Moon's shape follows, and predict what it will look like next. This is not why we have day and night.",
  cover: {
    headline: "Field Radio — Night Sky Desk",
    line: "The Moon's shape changes in a pattern. Patterns let you predict.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Kiara's Moon journal",
    readAloud: true,
    bullets: [
      "Day 1: No Moon at all. This is called a new moon.",
      "Day 4: A thin curved sliver, called a crescent.",
      "Day 8: Half of the Moon looks lit.",
      "Day 15: The whole Moon looks bright and round. This is a full moon.",
      "Day 22: Half of the Moon looks lit again, but it is the other half.",
      "Day 30: No Moon again. The pattern starts over.",
      "The whole pattern takes about 29 and a half days.",
    ],
  },
  brainstormChips: [
    chip("moon_new", "a new moon: no Moon in the sky", "bb-moon-new"),
    chip("moon_crescent", "a thin crescent a few days later", "bb-moon-crescent"),
    chip("moon_half", "about a week later, half looks lit", "bb-moon-half"),
    chip("moon_full", "about two weeks in, a full moon", "bb-moon-full"),
    chip("moon_journal", "the journal repeats in about a month", "bb-moon-journal"),
  ],
  beatStems: {
    hook: [
      stem("moon_h1", "The Moon did not disappear. It is following a pattern."),
      stem("moon_h2", "What if you could predict the Moon a week ahead?"),
    ],
    big_idea: [
      stem("moon_b1", "The Moon's shape changes in the same order every time."),
      stem("moon_b2", "The pattern repeats about every 29 and a half days."),
    ],
    show_me: [
      stem("moon_s1", "New moon, crescent, half, then full, and back again."),
      stem("moon_s2", "Tonight is half lit, so in about a week I predict a full moon."),
    ],
    sign_off: [
      stem("moon_o1", "Night Sky Desk, signing off."),
      stem("moon_o2", "Back to you."),
    ],
  },
  samOpen: "Read the journal. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can use data to describe the pattern of the Moon's changing shape and predict what it will look like next.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.9B. Students use a month of Moon observations to describe the order of the shapes and predict the next one. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The Moon does not change size or disappear; how much of the lit side we see changes in a set order. This is not day and night, and Earth's shadow does not make the phases.",
};

// 4.6A — sorting matter by observable properties. Keep the objects different
// from Grade 3's testing broadcast (3.6A).
export const PROPERTIES = {
  id: "SCI.4.6A-BB",
  standard: "SCI.4.6A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.6A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: How would you sort the mystery tray?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Classifying matter by its properties",
  prompt: "You are live on Field Radio. The science closet sent a mystery tray. Explain how you can sort matter by what you observe: temperature, mass, magnetism, sinking or floating, and solid, liquid, or gas. Use objects from the tray.",
  cover: {
    headline: "Field Radio — Lab Desk",
    line: "Every object has properties you can observe and test.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "The mystery tray",
    readAloud: true,
    bullets: [
      "A steel paper clip sticks to a magnet. A wooden block does not.",
      "The wooden block floats in water. A glass marble sinks.",
      "An ice cube feels cold. A thermometer on it reads below the room's temperature.",
      "On a balance, the marble has more mass than a cotton ball of the same size.",
      "The ice cube is a solid, the water in the cup is a liquid, and the air in a balloon is a gas.",
      "A property is something you can observe or measure about an object.",
    ],
  },
  brainstormChips: [
    chip("prop_magnet", "a paper clip sticks to the magnet", "bb-prop-magnet"),
    chip("prop_float", "the wooden block floats", "bb-prop-float"),
    chip("prop_sink", "the marble sinks", "bb-prop-sink"),
    chip("prop_temp", "the thermometer shows the ice is cold", "bb-prop-temp"),
    chip("prop_mass", "the balance shows which has more mass", "bb-prop-mass"),
    chip("prop_states", "a solid, a liquid, and a gas on one tray", "bb-prop-states"),
  ],
  beatStems: {
    hook: [
      stem("prop_h1", "One tray, and every object is a clue."),
      stem("prop_h2", "How would you sort a tray of mystery objects?"),
    ],
    big_idea: [
      stem("prop_b1", "We can sort matter by properties we observe or measure."),
      stem("prop_b2", "Magnetism, mass, temperature, and sinking or floating are all properties."),
    ],
    show_me: [
      stem("prop_s1", "The paper clip is magnetic. The wooden block is not."),
      stem("prop_s2", "The block floats and the marble sinks, so they go in different groups."),
    ],
    sign_off: [
      stem("prop_o1", "Lab Desk, signing off."),
      stem("prop_o2", "Back to you."),
    ],
  },
  samOpen: "Read the tray notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can classify and describe matter using properties I can observe or measure, such as mass, magnetism, temperature, sinking or floating, and state.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.6A. Students sort objects on a mystery tray by temperature, mass, magnetism, sinking or floating, and state of matter. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Not every metal is magnetic, and heavy things do not always sink. Mass is how much matter an object has, not how big it looks.",
};

// 4.6B — mixtures and solutions in a kitchen. Solid-in-liquid and
// liquid-in-liquid solutions, plus mixtures you can pick apart.
export const MIXTURES = {
  id: "SCI.4.6B-BB",
  standard: "SCI.4.6B-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.6B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Mixture or solution?",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Mixtures and solutions",
  prompt: "You are live from the school's test kitchen. Report where you are, which mixtures you can still pick apart, which ones became solutions, and why the difference matters. Then sign off.",
  cover: {
    headline: "Field Radio — Kitchen Desk",
    line: "Every solution is a mixture. Not every mixture is a solution.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Test kitchen kit",
    readAloud: true,
    sceneSetter: "You are here in the school's test kitchen. The counter has bowls, cups, spoons, and a big pitcher of water.",
    placeStill: still("bb-mix-kitchen", "The test kitchen — you are here"),
    artifactCard: {
      title: "Recipe card",
      body: "A mixture is two or more things put together. In a solution, one thing spreads out evenly in another, and you cannot see the separate pieces anymore.",
      imageUrl: art("bb-mix-card"),
    },
    bullets: [
      "Trail mix is a mixture. You can still pick out the raisins and the nuts.",
      "Stir salt into water. The salt seems to disappear. That is a solution of a solid in a liquid.",
      "Let a spoonful of that salt water dry in a dish. Salt is left behind, so it was there all along.",
      "Add a drop of food coloring to water. The color spreads evenly. That is a solution of a liquid in a liquid.",
      "Pour oil into water. The oil floats on top in a layer. It is a mixture, but not a solution.",
    ],
  },
  brainstormChips: [
    chip("mix_trail", "you can pick the raisins out of trail mix", "bb-mix-trail"),
    chip("mix_salt", "salt seems to disappear in the water", "bb-mix-salt"),
    chip("mix_color", "food coloring spreads evenly in water", "bb-mix-color"),
    chip("mix_oil", "oil floats on top of the water", "bb-mix-oil"),
    chip("mix_dry", "the water dried up and left salt behind", "bb-mix-dry"),
  ],
  beatStems: {
    where: [
      stem("mix_w1", "Reporting from the school's test kitchen."),
      stem("mix_w2", "The counter is covered in bowls and cups."),
    ],
    what_noticed: [
      stem("mix_n1", "In the trail mix, I can still see every piece."),
      stem("mix_n2", "The salt and the food coloring spread out evenly. Those are solutions."),
      stem("mix_n3", "The oil stayed in its own layer on top of the water."),
    ],
    why_matters: [
      stem("mix_y1", "A solution is a mixture where you can't see the pieces anymore."),
      stem("mix_y2", "The salt did not vanish. It is still in the water."),
    ],
    sign_off: [
      stem("mix_o1", "Kitchen Desk, signing off."),
      stem("mix_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-mix-kitchen", "The test kitchen"),
    what_noticed: still("bb-mix-color", "Color spreading in water"),
  }),
  samOpen: "Read the kitchen kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can compare mixtures and tell which ones are solutions, including a solid in a liquid and a liquid in a liquid.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.6B. From a test kitchen, students compare trail mix, salt water, colored water, and oil and water, and explain which are solutions. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Dissolved salt is not gone; it is spread evenly through the water. Oil and water is a mixture but not a solution. Every solution is a mixture.",
};

// 4.6C — matter is conserved when mixtures form. Soil and water, and oil and
// water, weighed before and after on the same scale.
export const CONSERVED = {
  id: "SCI.4.6C-BB",
  standard: "SCI.4.6C-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.6C",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Where did the water go?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Matter is conserved in mixtures",
  prompt: "You are live on Field Radio. Mateo poured water into a cup of soil, and the water seemed to vanish. Use the scale readings to explain what happened to the matter. Then use the oil and water test to show it again.",
  cover: {
    headline: "Field Radio — Lab Desk",
    line: "Weigh it before. Weigh it after. Nothing is lost.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Mateo's scale readings",
    readAloud: true,
    bullets: [
      "Dry soil: 200 grams.",
      "Water: 100 grams.",
      "Mateo pours the water into the soil. The water soaks in and seems to disappear.",
      "Soil and water together: 300 grams.",
      "Oil: 50 grams. Water: 100 grams. Oil and water together: 150 grams, even though the oil floats in its own layer.",
      "The cups are weighed right away, so no water has time to dry up.",
    ],
  },
  brainstormChips: [
    chip("con_soil", "the dry soil weighs 200 grams", "bb-con-soil"),
    chip("con_water", "the water weighs 100 grams", "bb-con-water"),
    chip("con_mud", "soil and water together weigh 300 grams", "bb-con-mud"),
    chip("con_oil", "oil and water together weigh 150 grams", "bb-con-oil"),
    chip("con_soak", "the water soaked in but did not vanish", "bb-con-soak"),
  ],
  beatStems: {
    hook: [
      stem("con_h1", "The water soaked into the soil and seemed to vanish."),
      stem("con_h2", "So where did the water go?"),
    ],
    big_idea: [
      stem("con_b1", "When we make a mixture, no matter is lost or gained."),
      stem("con_b2", "The mass of the mixture equals the mass of its parts."),
    ],
    show_me: [
      stem("con_s1", "200 grams of soil plus 100 grams of water makes 300 grams."),
      stem("con_s2", "50 grams of oil plus 100 grams of water makes 150 grams."),
    ],
    sign_off: [
      stem("con_o1", "Lab Desk, signing off."),
      stem("con_o2", "Back to you."),
    ],
  },
  samOpen: "Read the scale readings. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can show that matter is conserved when a mixture forms, because the mass of the mixture equals the mass of its parts.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.6C. Students use scale readings for soil and water, and oil and water, to show the mass before and after mixing is the same. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Water that soaks into soil is not gone; the total mass stays the same. If a mixture sits out, some water can evaporate, so it is weighed right away.",
};

export const WAVE4_CASES = [MOON, PROPERTIES, MIXTURES, CONSERVED];
