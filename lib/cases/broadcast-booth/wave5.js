// Broadcast Booth wave 5 — Grade 4 Science, part 2 of the Science queue:
// SCI.4.7-BB (friction), SCI.4.8A-BB (energy on the move), SCI.4.8B-BB
// (conductors and insulators), SCI.4.9A-BB (seasons data).
// Registered from catalog.js. Each picture file is used by only one caption.
//
// ART_READY: the pictures are requested in image-prompts/broadcast-booth/wave5.md.
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

// 4.7 — patterns of force from an investigation: friction on different
// surfaces. Not a ramp (Simulation Lab) and not balanced forces (5.7A).
export const FRICTION = {
  id: "SCI.4.7-BB",
  standard: "SCI.4.7-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.7",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Why do socks slide and sneakers stop?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Patterns of friction",
  prompt: "You are live on Field Radio. Ms. Reyes's class slid the same sneaker across three surfaces with the same push. Explain the pattern in their data and what force caused it.",
  cover: {
    headline: "Field Radio — Gym Desk",
    line: "Same shoe. Same push. Three different floors.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "The sliding shoe test",
    readAloud: true,
    bullets: [
      "The class gave one sneaker the same push each time and measured how far it slid.",
      "Smooth gym floor: 3 meters.",
      "Rubber mat: 1 meter.",
      "Carpet: 40 centimeters.",
      "Friction is a force between two surfaces that are touching. It pushes against the motion.",
      "Rougher surfaces make more friction, so the shoe stops sooner.",
      "A sock slides farther than a sneaker on the gym floor, because the sock's cloth is smoother than rubber.",
    ],
  },
  brainstormChips: [
    chip("fric_gym", "on the smooth gym floor, the shoe slid 3 meters", "bb-fric-gym"),
    chip("fric_mat", "on the rubber mat, it slid 1 meter", "bb-fric-mat"),
    chip("fric_carpet", "on the carpet, it stopped after 40 centimeters", "bb-fric-carpet"),
    chip("fric_sock", "a sock slides farther than a sneaker", "bb-fric-sock"),
    chip("fric_push", "every slide got the same push", "bb-fric-push"),
  ],
  beatStems: {
    hook: [
      stem("fric_h1", "Why can you slide in socks but not in sneakers?"),
      stem("fric_h2", "Same shoe, same push, but it stopped in three different places."),
    ],
    big_idea: [
      stem("fric_b1", "Friction is a force between surfaces that touch."),
      stem("fric_b2", "The rougher the surface, the more friction, and the sooner it stops."),
    ],
    show_me: [
      stem("fric_s1", "The shoe slid 3 meters on the gym floor but only 40 centimeters on carpet."),
      stem("fric_s2", "The push stayed the same, so the surface made the difference."),
    ],
    sign_off: [
      stem("fric_o1", "Gym Desk, signing off."),
      stem("fric_o2", "Back to you."),
    ],
  },
  samOpen: "Read the test results. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can use data from an investigation to describe a pattern of friction between different surfaces.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.7. Students use a class investigation (the same push on three surfaces) to describe the pattern that rougher surfaces make more friction. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Objects don't just 'run out' of motion; friction is a force that slows them. Only the surface changed, which is what makes it a fair test.",
};

// 4.8A — energy moving by an object in motion, by waves in water, and by
// sound, at a lake. Not the circuit (4.8C) and not a ramp.
export const ENERGY_MOVES = {
  id: "SCI.4.8A-BB",
  standard: "SCI.4.8A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.8A",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: How does energy travel at the lake?",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Energy transfer by motion, waves, and sound",
  prompt: "You are live from a fishing dock on a Texas lake. Report where you are, three ways you noticed energy moving from one place to another, and why that matters. Then sign off.",
  cover: {
    headline: "Field Radio — Lake Desk",
    line: "Energy moves. Watch it jump from one thing to the next.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Lake dock kit",
    readAloud: true,
    sceneSetter: "You are here on a wooden fishing dock at a Texas lake. A boat just went by, and families are playing on the shore.",
    placeStill: still("bb-lake-dock", "The fishing dock — you are here"),
    artifactCard: {
      title: "Field card",
      body: "Energy can move from one place to another. A moving object can pass energy to what it hits. Waves carry energy across water. Sound carries energy through the air.",
      imageUrl: art("bb-lake-card"),
    },
    bullets: [
      "A rolling soccer ball hits a stack of plastic cups on the shore, and the cups fall.",
      "A passing boat makes waves. When the waves reach the dock, the floating toy boat bobs up and down.",
      "A drum on the shore makes a sound you can hear across the water.",
      "Put your hand on the drum, and you can feel it shaking. Sound comes from vibrations.",
    ],
  },
  brainstormChips: [
    chip("em_ball", "a rolling ball knocks over the cups", "bb-lake-ball"),
    chip("em_wave", "waves from the boat reach the dock", "bb-lake-wave"),
    chip("em_toy", "the toy boat bobs when the waves arrive", "bb-lake-toy"),
    chip("em_drum", "the drum's sound carries across the water", "bb-lake-drum"),
    chip("em_hand", "a hand on the drum feels it shaking", "bb-lake-hand"),
  ],
  beatStems: {
    where: [
      stem("em_w1", "Reporting from a fishing dock on a Texas lake."),
      stem("em_w2", "A boat just went by, and the water is moving."),
    ],
    what_noticed: [
      stem("em_n1", "The rolling ball passed its energy to the cups."),
      stem("em_n2", "The waves carried energy all the way to the dock."),
      stem("em_n3", "The drum's sound carried energy across the water."),
    ],
    why_matters: [
      stem("em_y1", "Energy does not stay in one place. It moves to other things."),
      stem("em_y2", "Motion, waves, and sound are three ways energy travels."),
    ],
    sign_off: [
      stem("em_o1", "Lake Desk, signing off."),
      stem("em_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-lake-dock", "The dock"),
    what_noticed: still("bb-lake-wave", "Waves from the boat"),
  }),
  samOpen: "Read the dock kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can identify how energy is transferred by objects in motion, by waves in water, and by sound.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.8A. From a lake dock, students report energy moving from a rolling ball to cups, from a boat's waves to the dock, and from a drum through the air. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A wave moves energy, not the water itself, across the lake; the toy boat bobs in place. Sound is energy traveling as vibrations, not something you can see.",
};

// 4.8B — conductors and insulators of heat and electricity, in a kitchen and
// on a lamp cord. Not the circuit broadcast (4.8C).
export const CONDUCTORS = {
  id: "SCI.4.8B-BB",
  standard: "SCI.4.8B-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.8B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Why is the pot hot but the handle cool?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Conductors and insulators",
  prompt: "You are live on Field Radio. Explain which materials let heat or electricity pass through easily, which ones block it, and how people use both to stay safe.",
  cover: {
    headline: "Field Radio — Safety Desk",
    line: "Some materials let energy through. Some block it. We need both.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Conductor or insulator?",
    readAloud: true,
    bullets: [
      "A conductor lets heat or electricity pass through it easily. Most metals are good conductors.",
      "An insulator slows or blocks heat or electricity. Wood, plastic, rubber, and cloth are insulators.",
      "A metal pot heats up fast on the stove because metal conducts heat.",
      "Its wooden or plastic handle stays cool enough to hold.",
      "An oven mitt is an insulator. It keeps the heat from reaching your hand.",
      "A lamp cord has copper wire inside to carry electricity, and a plastic coat outside to keep it from reaching you.",
    ],
  },
  brainstormChips: [
    chip("cd_pot", "the metal pot heats up fast", "bb-cond-pot"),
    chip("cd_handle", "the plastic handle stays cool", "bb-cond-handle"),
    chip("cd_mitt", "an oven mitt blocks the heat", "bb-cond-mitt"),
    chip("cd_copper", "copper wire carries electricity", "bb-cond-copper"),
    chip("cd_coat", "the plastic coat keeps electricity in the wire", "bb-cond-coat"),
  ],
  beatStems: {
    hook: [
      stem("cd_h1", "The pot is too hot to touch, but the handle is not. Why?"),
      stem("cd_h2", "Some materials are energy highways. Some are roadblocks."),
    ],
    big_idea: [
      stem("cd_b1", "Conductors let heat or electricity pass through easily."),
      stem("cd_b2", "Insulators slow it down or block it."),
    ],
    show_me: [
      stem("cd_s1", "The metal pot is a conductor. The plastic handle is an insulator."),
      stem("cd_s2", "Copper wire carries electricity, and its plastic coat keeps us safe."),
    ],
    sign_off: [
      stem("cd_o1", "Safety Desk, signing off."),
      stem("cd_o2", "Back to you."),
    ],
  },
  samOpen: "Read the notes. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can identify conductors and insulators of heat and electricity and explain how each is used.",
  lesson_summary: "Grade 4 Explain broadcast. TEKS 4.8B. Students use a pot, its handle, an oven mitt, and a lamp cord to explain which materials conduct heat or electricity and which insulate. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "An insulator doesn't make things cold; it slows heat moving through it. A material can conduct heat and electricity (most metals) or insulate both (plastic, rubber). Never test electricity at an outlet.",
};

// 4.9A — seasons from data: daylight and temperature across a year in
// Austin. Patterns and prediction, not the cause (tilt is later grades).
export const SEASONS = {
  id: "SCI.4.9A-BB",
  standard: "SCI.4.9A-BB",
  engine: "broadcast_booth",
  grade: 4,
  subject: "Science",
  teks: "SCI.4.9A",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: What will next month bring?",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Patterns of change in the seasons",
  prompt: "You are live from the school weather station in Austin. Report where you are, the pattern you see in a year of daylight and temperature data, and why that pattern lets you make a prediction. Then sign off.",
  cover: {
    headline: "Field Radio — Seasons Desk",
    line: "A year of data. One pattern. One prediction.",
  },
  stimulus: {
    gradeBand: "G4",
    title: "Weather station kit",
    readAloud: true,
    sceneSetter: "You are here at the school weather station in Austin, Texas. The class has kept a year of data on a big chart by the door.",
    placeStill: still("bb-season-station", "School weather station — you are here"),
    artifactCard: {
      title: "The class chart",
      body: "Late December has the shortest days, about 10 hours of daylight. Late June has the longest days, about 14 hours. Average high temperatures go from about 62 degrees in January to about 96 degrees in July and August.",
      imageUrl: art("bb-season-chart"),
    },
    bullets: [
      "From January to June, the days get a little longer each week.",
      "From July to December, the days get a little shorter each week.",
      "The months with longer days are usually the hotter months.",
      "The same pattern happened last year, and the year before.",
      "Imagine it is late September. Days and nights are close to the same length.",
    ],
  },
  brainstormChips: [
    chip("se_short", "December has the shortest days", "bb-season-short"),
    chip("se_long", "June has the longest days", "bb-season-long"),
    chip("se_hot", "July and August are the hottest months", "bb-season-hot"),
    chip("se_cool", "January is the coolest month", "bb-season-cool"),
    chip("se_repeat", "the pattern repeats every year", "bb-season-repeat"),
  ],
  beatStems: {
    where: [
      stem("se_w1", "Reporting from the school weather station in Austin."),
      stem("se_w2", "The class has a whole year of data on the chart."),
    ],
    what_noticed: [
      stem("se_n1", "The days get longer until June, then shorter until December."),
      stem("se_n2", "The longer the days, the hotter it usually gets."),
    ],
    why_matters: [
      stem("se_y1", "Because the pattern repeats, we can predict what comes next."),
      stem("se_y2", "In late September, I predict the days will keep getting shorter and cooler."),
    ],
    sign_off: [
      stem("se_o1", "Seasons Desk, signing off."),
      stem("se_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-season-station", "The weather station"),
    what_noticed: still("bb-season-chart", "The class chart"),
  }),
  samOpen: "Read the station kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can use daylight and temperature data to describe the pattern of the seasons and predict what will change next.",
  lesson_summary: "Grade 4 Correspondent broadcast. TEKS 4.9A. From a school weather station in Austin, students use a year of daylight and temperature data to describe the seasonal pattern and predict the next change. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Seasons are not caused by Earth getting closer to the Sun. This broadcast is about the pattern and predicting from it, not the cause. Daily weather can break the pattern for a day; the seasonal pattern still holds.",
};

export const WAVE5_CASES = [FRICTION, ENERGY_MOVES, CONDUCTORS, SEASONS];
