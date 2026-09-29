// Broadcast Booth wave 9 — Grade 3 Science, part 2 of the Science queue:
// SCI.3.7B-BB (pushes and pulls on the playground), SCI.3.8A-BB (energy at
// the fair), SCI.3.8B-BB (speed and mechanical energy), SCI.3.9A-BB (Sun,
// Earth, and Moon orbits). Registered from catalog.js. Each picture file is
// used by only one caption. Grade 3 reading level: short sentences.
//
// ART_READY: the pictures are requested in image-prompts/broadcast-booth/wave9.md.
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

// 3.7B — an investigation of how pushes and pulls change position and
// motion: swings, balls, wagons. Not forces at a distance (3.7A).
export const PLAYGROUND = {
  id: "SCI.3.7B-BB",
  standard: "SCI.3.7B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.7B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Push it, pull it, watch it move",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Pushes and pulls change motion",
  prompt: "You are live from the playground during a class investigation. Report where you are, what happened when the class pushed and pulled a swing, a ball, and a wagon, and why pushes and pulls matter. Then sign off.",
  cover: {
    headline: "Field Radio — Playground Desk",
    line: "A push or a pull can start it, stop it, or turn it.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Playground investigation",
    readAloud: true,
    sceneSetter: "You are here on the school playground. The class is testing how pushes and pulls change the way things move.",
    placeStill: still("bb-play-yard", "The playground — you are here"),
    artifactCard: {
      title: "Our plan",
      body: "Push or pull each object. Watch where it goes and how fast. Write down what happens each time.",
      imageUrl: art("bb-play-plan"),
    },
    bullets: [
      "A small push made the swing go a little. A bigger push made it go higher.",
      "A soft kick rolled the ball a short way. A hard kick sent it far.",
      "A kick from the side made the rolling ball change direction.",
      "Pulling the wagon handle made the wagon move toward the puller.",
      "Grabbing the swing made it stop.",
    ],
  },
  brainstormChips: [
    chip("pg_swing", "a bigger push sends the swing higher", "bb-play-swing"),
    chip("pg_kick", "a hard kick sends the ball farther", "bb-play-kick"),
    chip("pg_turn", "a side kick changes the ball's direction", "bb-play-turn"),
    chip("pg_wagon", "a pull brings the wagon closer", "bb-play-wagon"),
    chip("pg_stop", "grabbing the swing makes it stop", "bb-play-stop"),
  ],
  beatStems: {
    where: [
      stem("pg_w1", "Reporting from the school playground."),
      stem("pg_w2", "Our class is testing pushes and pulls today."),
    ],
    what_noticed: [
      stem("pg_n1", "A bigger push sent the swing higher."),
      stem("pg_n2", "A kick from the side made the ball change direction."),
      stem("pg_n3", "Pulling the wagon made it come toward us."),
    ],
    why_matters: [
      stem("pg_y1", "Pushes and pulls can start, stop, or turn a moving object."),
      stem("pg_y2", "A stronger push or pull makes a bigger change."),
    ],
    sign_off: [
      stem("pg_o1", "Playground Desk, signing off."),
      stem("pg_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-play-yard", "The playground"),
    what_noticed: still("bb-play-swing", "The swing test"),
  }),
  samOpen: "Read the kit. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can explain how pushes and pulls change an object's position and motion, using what I saw in an investigation.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.7B. From a playground investigation, students report how pushes and pulls started, stopped, sped up, and turned a swing, a ball, and a wagon. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Things do not start, stop, or turn by themselves; a push or a pull makes the change. A bigger push or pull makes a bigger change.",
};

// 3.8A — everyday energy at a county fair: light, sound, thermal, mechanical.
// Not speed and energy (3.8B).
export const FAIR_ENERGY = {
  id: "SCI.3.8A-BB",
  standard: "SCI.3.8A-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.8A",
  kicker: "Broadcast Booth · Correspondent",
  title: "Field Radio: Energy hunt at the county fair",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Everyday examples of energy",
  prompt: "You are live from the county fair on an energy hunt. Report where you are, one example each of light, sound, thermal, and mechanical energy, and why energy matters. Then sign off.",
  cover: {
    headline: "Field Radio — Fair Desk",
    line: "Four kinds of energy. Find them all.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Fair hunt card",
    readAloud: true,
    sceneSetter: "You are here at the county fair at sunset. Rides are spinning, music is playing, and food is cooking.",
    placeStill: still("bb-fair-midway", "The county fair — you are here"),
    artifactCard: {
      title: "Hunt card",
      body: "Light energy lets us see. Sound energy lets us hear. Thermal energy is heat. Mechanical energy is the energy of moving things.",
      imageUrl: art("bb-fair-card"),
    },
    bullets: [
      "The Ferris wheel lights glow in the dark. That is light energy.",
      "The band's drums and guitar fill the air. That is sound energy.",
      "The popcorn machine is hot. That is thermal energy.",
      "The Ferris wheel turns around and around. That is mechanical energy.",
    ],
  },
  brainstormChips: [
    chip("fe_lights", "the Ferris wheel lights glow", "bb-fair-lights"),
    chip("fe_band", "the band's music fills the air", "bb-fair-band"),
    chip("fe_popcorn", "the popcorn machine gives off heat", "bb-fair-popcorn"),
    chip("fe_wheel", "the Ferris wheel spins around", "bb-fair-wheel"),
  ],
  beatStems: {
    where: [
      stem("fe_w1", "Reporting from the county fair at sunset."),
      stem("fe_w2", "The rides are spinning and the music is loud."),
    ],
    what_noticed: [
      stem("fe_n1", "I see light energy from the glowing Ferris wheel."),
      stem("fe_n2", "I hear sound energy from the band."),
      stem("fe_n3", "The popcorn machine has thermal energy, and the wheel has mechanical energy."),
    ],
    why_matters: [
      stem("fe_y1", "Energy is all around us every day."),
      stem("fe_y2", "Light, sound, heat, and motion are all kinds of energy."),
    ],
    sign_off: [
      stem("fe_o1", "Fair Desk, signing off."),
      stem("fe_o2", "Back to you."),
    ],
  },
  overlayStills: stills({
    where: still("bb-fair-midway", "The fair"),
    what_noticed: still("bb-fair-lights", "The glowing lights"),
  }),
  samOpen: "Read the hunt card. Put a chip on What I noticed and Why it matters, then record.",
  learning_target: "I can identify everyday examples of light, sound, thermal, and mechanical energy.",
  lesson_summary: "Grade 3 Correspondent broadcast. TEKS 3.8A. On an energy hunt at a county fair, students report examples of light (ride lights), sound (a band), thermal (a popcorn machine), and mechanical (a spinning Ferris wheel) energy. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "Energy is not only electricity. One thing can show more than one kind of energy: the Ferris wheel has light and mechanical energy.",
};

// 3.8B — an investigation: a faster object has more mechanical energy. Gym
// bowling with plastic pins. Not everyday energy (3.8A).
export const BOWLING = {
  id: "SCI.3.8B-BB",
  standard: "SCI.3.8B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.8B",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Why does a faster ball knock down more pins?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Speed and mechanical energy",
  prompt: "You are live on Field Radio from gym class. The class rolled the same ball slow, then fast, at plastic pins. Explain what they found about speed and energy.",
  cover: {
    headline: "Field Radio — Gym Desk",
    line: "Same ball. Same pins. Only the speed changed.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Gym bowling test",
    readAloud: true,
    bullets: [
      "The class set up ten plastic pins in the gym.",
      "They used the same ball and started from the same line every time.",
      "Only the speed changed.",
      "Slow roll: 3 pins fell. Medium roll: 6 pins fell. Fast roll: 9 pins fell.",
      "Mechanical energy is the energy of a moving object.",
      "A faster ball has more mechanical energy, so it can knock down more pins.",
    ],
  },
  brainstormChips: [
    chip("bw_pins", "ten plastic pins set up in the gym", "bb-bowl-pins"),
    chip("bw_line", "every roll starts from the same line", "bb-bowl-line"),
    chip("bw_slow", "a slow roll knocks down 3 pins", "bb-bowl-slow"),
    chip("bw_fast", "a fast roll knocks down 9 pins", "bb-bowl-fast"),
    chip("bw_chart", "the class records each roll", "bb-bowl-chart"),
  ],
  beatStems: {
    hook: [
      stem("bw_h1", "Same ball, same pins. So why did one roll knock down so many more?"),
      stem("bw_h2", "The only thing that changed was the speed."),
    ],
    big_idea: [
      stem("bw_b1", "A moving object has mechanical energy."),
      stem("bw_b2", "The faster it moves, the more energy it has."),
    ],
    show_me: [
      stem("bw_s1", "The slow roll knocked down 3 pins. The fast roll knocked down 9."),
      stem("bw_s2", "We kept the ball and the line the same, so it was a fair test."),
    ],
    sign_off: [
      stem("bw_o1", "Gym Desk, signing off."),
      stem("bw_o2", "Back to you."),
    ],
  },
  samOpen: "Read the test. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can use an investigation to show that a faster object has more mechanical energy.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.8B. In a gym bowling investigation, students explain why the same ball rolled faster knocks down more pins: more speed means more mechanical energy. Only the speed changed. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "A heavier ball is not the point here; the ball stayed the same. Changing only one thing (the speed) is what makes the test fair.",
};

// 3.9A — models of the Sun, Earth, and Moon orbits. Not phases (4.9B), not
// day and night (5.9).
export const ORBITS = {
  id: "SCI.3.9A-BB",
  standard: "SCI.3.9A-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.9A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Field Radio: Who goes around whom?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Orbits of the Sun, Earth, and Moon",
  prompt: "You are live on Field Radio. The class built a people model of the Sun, Earth, and Moon on the playground. Explain what goes around what, and about how long each trip takes.",
  cover: {
    headline: "Field Radio — Space Desk",
    line: "Three students. One big model. Who is moving?",
  },
  stimulus: {
    gradeBand: "G3",
    title: "The people model",
    readAloud: true,
    bullets: [
      "Maria stands still in the middle. She is the Sun.",
      "Jamal walks in a big circle around Maria. He is Earth.",
      "Lily walks in a small circle around Jamal while he moves. She is the Moon.",
      "An orbit is the path one object takes around another.",
      "Earth orbits the Sun about once a year.",
      "The Moon orbits Earth about once a month.",
    ],
  },
  brainstormChips: [
    chip("or_sun", "the Sun stays in the middle", "bb-orbit-sun"),
    chip("or_earth", "Earth walks a big circle around the Sun", "bb-orbit-earth"),
    chip("or_moon", "the Moon circles Earth as Earth moves", "bb-orbit-moon"),
    chip("or_year", "one trip around the Sun takes about a year", "bb-orbit-year"),
    chip("or_month", "one trip around Earth takes about a month", "bb-orbit-month"),
  ],
  beatStems: {
    hook: [
      stem("or_h1", "Who goes around whom?"),
      stem("or_h2", "We made a model with three students to find out."),
    ],
    big_idea: [
      stem("or_b1", "Earth orbits the Sun. The Moon orbits Earth."),
      stem("or_b2", "An orbit is the path one object takes around another."),
    ],
    show_me: [
      stem("or_s1", "Earth takes about a year to go around the Sun."),
      stem("or_s2", "The Moon takes about a month to go around Earth."),
    ],
    sign_off: [
      stem("or_o1", "Space Desk, signing off."),
      stem("or_o2", "Back to you."),
    ],
  },
  samOpen: "Read about the model. Put a chip on Big idea and Show me, then record.",
  learning_target: "I can use a model to explain that the Moon orbits Earth and Earth orbits the Sun.",
  lesson_summary: "Grade 3 Explain broadcast. TEKS 3.9A. Using a people model on the playground, students explain that Earth orbits the Sun about once a year and the Moon orbits Earth about once a month. Teacher listens. Not AI-graded. About 25–30 minutes.",
  misconception_note: "The Sun does not go around Earth, even though it seems to move across the sky. This is about orbits, not the Moon's phases or day and night.",
};

export const WAVE9_CASES = [PLAYGROUND, FAIR_ENERGY, BOWLING, ORBITS];
