// Broadcast Booth wave 10 — Grade 3 Science, part 3 of the Science queue:
// SCI.3.9B-BB (order of the planets), SCI.3.10A-BB (weather in two places),
// SCI.3.10B-BB (how soil forms), SCI.3.10C-BB (rapid changes to the land).
// Registered from catalog.js. Each picture file is used by only one caption.
// Grade 3 reading level: short sentences.
//
// ART_READY: the pictures are requested in image-prompts/broadcast-booth/wave10.md.
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

// 3.9B — the order of the planets from the Sun, on a hallway planet walk.
// Not orbits (3.9A).
export const PLANET_WALK = {
  id: "SCI.3.9B-BB",
  standard: "SCI.3.9B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.9B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: The planet walk",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "The order of the planets",
  prompt: "You are live on Field Radio from the school hallway planet walk. Explain the order of the eight planets, starting from the Sun. Share a trick for remembering it.",
  cover: {
    headline: "Field Radio — Space Desk",
    line: "Start at the Sun. Walk past all eight planets.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Planet walk signs",
    readAloud: true,
    bullets: [
      "The Sun is at the start of the hallway.",
      "The order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
      "Mercury is closest to the Sun. Neptune is farthest away.",
      "Earth is the third planet from the Sun.",
      "The first four planets are small and rocky. The last four are giant planets.",
      "A memory trick: My Very Excellent Mother Just Served Us Nachos.",
    ],
  },
  brainstormChips: [
    chip("pw_sun", "the Sun at the start of the hall", "bb-walk-sun"),
    chip("pw_mercury", "Mercury is closest to the Sun", "bb-walk-mercury"),
    chip("pw_earth", "Earth is third from the Sun", "bb-walk-earth"),
    chip("pw_jupiter", "Jupiter is the fifth planet and the biggest", "bb-walk-jupiter"),
    chip("pw_neptune", "Neptune is farthest away", "bb-walk-neptune"),
    chip("pw_trick", "My Very Excellent Mother Just Served Us Nachos", "bb-walk-trick"),
  ],
  beatStems: {
    hook: [
      stem("pw_h1", "Eight planets, one long hallway. Walk with me!"),
      stem("pw_h2", "Can you name the planets in order?"),
    ],
    big_idea: [
      stem("pw_b1", "The planets go around the Sun in the same order."),
      stem("pw_b2", "Mercury is closest. Neptune is farthest."),
    ],
    show_me: [
      stem("pw_s1", "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."),
      stem("pw_s2", "My Very Excellent Mother Just Served Us Nachos helps me remember."),
    ],
    sign_off: [
      stem("pw_o1", "Space Desk, signing off."),
      stem("pw_o2", "Back to you."),
    ],
  },
  samOpen: "Read the signs. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can name the planets in order from the Sun.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.9B. On a hallway planet walk, students explain the order of the eight planets from the Sun and a memory trick for it. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Pluto is a dwarf planet, so it is not one of the eight planets. Earth is the third planet, not the first. The Sun is a star, not a planet.",
};

// 3.10A — compare weather in two places at the same time: Amarillo and
// Houston on one winter morning. Not weather vs climate (4.10C).
export const TWO_CITIES = {
  id: "SCI.3.10A-BB",
  standard: "SCI.3.10A-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.10A",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Same day, two cities",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Comparing weather in two places",
  prompt: "You are live from the Field Radio weather desk. Report where you are, how the weather in Amarillo and Houston is different this morning, and why comparing places matters. Then sign off.",
  cover: {
    headline: "Field Radio — Weather Desk",
    line: "Same morning. Two Texas cities. Very different weather.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Weather desk kit",
    readAloud: true,
    sceneSetter: "You are here at the Field Radio weather desk. A big Texas map is on the wall. It is 8 o'clock on one winter morning.",
    placeStill: still("bb-city-desk", "The weather desk — you are here"),
    artifactCard: {
      title: "Morning report",
      body: "Amarillo: 38 degrees, wind from the north, light snow. Houston: 64 degrees, wind from the south, rain showers.",
      imageUrl: art("bb-city-card"),
    },
    bullets: [
      "Amarillo is in the Texas Panhandle, far to the north.",
      "Houston is near the Gulf coast, far to the south.",
      "Air temperature tells how warm or cold the air is.",
      "Wind direction tells where the wind is coming from.",
      "Precipitation is water falling from the sky, like rain or snow.",
    ],
  },
  brainstormChips: [
    chip("tc_snow", "light snow falls in Amarillo", "bb-city-snow"),
    chip("tc_rain", "rain showers fall in Houston", "bb-city-rain"),
    chip("tc_cold", "38 degrees in Amarillo", "bb-city-cold"),
    chip("tc_warm", "64 degrees in Houston", "bb-city-warm"),
    chip("tc_wind", "a wind sock shows where the wind comes from", "bb-city-wind"),
  ],
  beatStems: {
    where: [
      stem("tc_w1", "Reporting from the Field Radio weather desk."),
      stem("tc_w2", "It is 8 o'clock on a winter morning."),
    ],
    what_noticed: [
      stem("tc_n1", "Amarillo is 38 degrees with light snow."),
      stem("tc_n2", "Houston is 64 degrees with rain showers."),
      stem("tc_n3", "Amarillo's wind comes from the north. Houston's comes from the south."),
    ],
    why_matters: [
      stem("tc_y1", "Weather can be very different in two places at the same time."),
      stem("tc_y2", "Checking temperature, wind, and precipitation helps people get ready."),
    ],
    sign_off: [
      stem("tc_o1", "Weather Desk, signing off."),
      stem("tc_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-city-desk", "The weather desk"),
    what_noticed: still("bb-city-snow", "Snow in Amarillo"),
  }),
  samOpen: "Read the kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can compare the weather in two places at the same time using air temperature, wind direction, and precipitation.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.10A. From a weather desk, students compare one winter morning in Amarillo (38 degrees, north wind, light snow) and Houston (64 degrees, south wind, rain showers). Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Wind direction is where the wind comes from, not where it is going. The whole state does not have the same weather at the same time. The readings are a sample morning, not a forecast.",
};

// 3.10B — soil forms from weathered rock and decomposed plants and animals.
// A soil jar investigation. Not the canyon (4.10B).
export const SOIL_JAR = {
  id: "SCI.3.10B-BB",
  standard: "SCI.3.10B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.10B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: What is soil made of?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "How soil forms",
  prompt: "You are live on Field Radio. The class shook garden soil in a jar of water and let it settle. Explain what soil is made of and where each part came from.",
  cover: {
    headline: "Field Radio — Garden Desk",
    line: "Shake the jar. Wait. Read the layers.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Soil jar test",
    readAloud: true,
    bullets: [
      "The class put garden soil in a jar of water, closed the lid, and shook it.",
      "The next day, the soil had settled into layers.",
      "Sand sank to the bottom. Sand grains are big pieces of broken rock.",
      "Clay settled on top. Clay is made of very tiny pieces of rock.",
      "Bits of dead leaves floated. Rotting plants and animals add rich material to soil.",
      "Rock breaks into small pieces over a long time. That is called weathering.",
    ],
  },
  brainstormChips: [
    chip("sj_jar", "shake soil and water in a jar", "bb-soil-jar"),
    chip("sj_sand", "sand sinks to the bottom", "bb-soil-sand"),
    chip("sj_clay", "tiny clay pieces settle on top", "bb-soil-clay"),
    chip("sj_leaves", "rotting leaves float to the top", "bb-soil-leaves"),
    chip("sj_rock", "rock slowly breaks into small pieces", "bb-soil-rock"),
  ],
  beatStems: {
    hook: [
      stem("sj_h1", "Is soil just dirt? Let's shake it and see."),
      stem("sj_h2", "One jar of soil made three layers."),
    ],
    big_idea: [
      stem("sj_b1", "Soil forms from weathered rock and rotting plants and animals."),
      stem("sj_b2", "Sand and clay are both made of broken rock."),
    ],
    show_me: [
      stem("sj_s1", "Sand sank to the bottom. Clay settled on top."),
      stem("sj_s2", "The floating leaves show that rotting plants are in soil too."),
    ],
    sign_off: [
      stem("sj_o1", "Garden Desk, signing off."),
      stem("sj_o2", "Back to you."),
    ],
  },
  samOpen: "Read the test. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can explain that soils like sand and clay form from weathered rock and from rotting plant and animal remains.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.10B. Using a soil jar test, students explain that sand and clay come from weathered rock and that rotting leaves and animal remains are part of soil too. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Soil is not just dirt; it is made of broken rock and material from once-living things. Sand and clay are different sizes of rock pieces. Soil forms very slowly.",
};

// 3.10C — rapid changes to Earth's surface: a landslide, with earthquakes and
// volcanoes. Slow changes are the canyon (4.10B).
export const LANDSLIDE = {
  id: "SCI.3.10C-BB",
  standard: "SCI.3.10C-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.10C",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: The road that disappeared",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Rapid changes to Earth's surface",
  prompt: "You are live from a mountain road closed by a landslide. Report where you are, what changed and how fast it happened, and compare it to earthquakes and volcanoes. Then sign off.",
  cover: {
    headline: "Field Radio — Breaking News Desk",
    line: "Some changes to the land take a million years. Some take a minute.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Breaking news kit",
    readAloud: true,
    sceneSetter: "You are here on a mountain road after two days of heavy rain. A pile of mud and rocks covers the road. Nobody was hurt.",
    placeStill: still("bb-slide-road", "The closed road — you are here"),
    artifactCard: {
      title: "Class model",
      body: "The class piled wet sand on a tilted tray and added more water. In seconds, the sand slid down all at once. That is a model of a landslide.",
      imageUrl: art("bb-slide-model"),
    },
    bullets: [
      "In a landslide, rocks and soil slide down a hill very fast.",
      "Heavy rain made the hillside wet and heavy, so it slid.",
      "An earthquake shakes the ground in just seconds and can crack roads.",
      "A volcano can erupt and cover land with lava or ash in hours or days.",
      "These are rapid changes. They happen fast, not over a long time.",
    ],
  },
  brainstormChips: [
    chip("ls_mud", "mud and rocks cover the road", "bb-slide-mud"),
    chip("ls_hill", "the hillside is missing a big chunk", "bb-slide-hill"),
    chip("ls_tray", "wet sand slides down the class model", "bb-slide-tray"),
    chip("ls_quake", "an earthquake cracks a road in seconds", "bb-slide-quake"),
    chip("ls_lava", "lava from a volcano covers the land", "bb-slide-lava"),
  ],
  beatStems: {
    where: [
      stem("ls_w1", "Reporting from a mountain road closed by a landslide."),
      stem("ls_w2", "It rained hard for two days here."),
    ],
    what_noticed: [
      stem("ls_n1", "Mud and rocks slid down and covered the road."),
      stem("ls_n2", "In our class model, the wet sand slid in just seconds."),
    ],
    why_matters: [
      stem("ls_y1", "Landslides, earthquakes, and volcanoes change the land fast."),
      stem("ls_y2", "Knowing about rapid changes helps people stay safe."),
    ],
    sign_off: [
      stem("ls_o1", "Breaking News Desk, signing off."),
      stem("ls_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-slide-road", "The closed road"),
    what_noticed: still("bb-slide-tray", "The class model"),
  }),
  samOpen: "Read the kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can use a model to describe rapid changes to Earth's surface, such as landslides, earthquakes, and volcanic eruptions.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.10C. From a mountain road covered by a landslide, and a class sand-tray model, students describe how landslides, earthquakes, and volcanoes change the land quickly. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Not all changes to the land are slow; landslides and earthquakes happen in seconds or minutes. This is the fast-change broadcast; the canyon is the slow-change one.",
};

export const WAVE10_CASES = [PLANET_WALK, TWO_CITIES, SOIL_JAR, LANDSLIDE];
