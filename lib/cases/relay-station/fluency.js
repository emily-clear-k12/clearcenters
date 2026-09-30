// ClearKeys Fluency levels 21-40 (Sept 29, 2026).
// Opens after the Foundations Track is complete. The Foundations Track teaches
// where every key is; Fluency builds speed and stamina. Every key is allowed.
//
// Passing a Fluency level needs BOTH the accuracy goal and the speed goal
// (Fluency is about speed). Teacher supports lower both, same as the track.
// Stars: 1 = finished, 2 = accuracy goal, 3 = accuracy + speed goal (= passed).
// Progress lives in relay_station_progress.fluency (add_clearkeys_fluency.sql).
//
// Text rules: plain ASCII only. "\n" = Enter.

export const FLUENCY_ACCURACY = 95;

export const FLUENCY_UNITS = [
  { id: "pairs", name: "Letter Pairs", levels: [21, 22, 23, 24, 25] },
  { id: "rhythm", name: "Sentence Rhythm", levels: [26, 27, 28, 29, 30] },
  { id: "content", name: "Content Speed", levels: [31, 32, 33, 34, 35] },
  { id: "stamina", name: "Stamina", levels: [36, 37, 38, 39, 40] },
];

function wpmFor(n) {
  if (n <= 25) return 10;
  if (n <= 30) return 13;
  if (n <= 35) return 16;
  return 20;
}

const RAW = [
  // ----- LETTER PAIRS -----
  { n: 21, title: "Common Pairs: th, he, in, er", intro: "The letters t-h, h-e, i-n and e-r show up in English more than any other pairs. Train your fingers to roll through them.",
    text: "the then there these\nhe her here help\nin into inside thin\ner her never water\nthe thin winter herd\nthere is her pen in the water" },
  { n: 22, title: "Common Pairs: an, re, on, at", intro: "Four more pairs you type all day long. Keep your eyes on the screen and let your fingers find them.",
    text: "an and ant hand\nre red ready free\non one only long\nat that late cat\nan ant ran on a red mat\nready or not, here they are at last" },
  { n: 23, title: "The Top 25 Words", intro: "These are the words people type most. Once they are automatic, everything gets faster.",
    text: "the of and a to in is you that it\nhe was for on are as with his they\nI at be this have from\nyou and I are in the class\nit is time for us to type" },
  { n: 24, title: "The Next 25 Words", intro: "More of the most common words. Try to type each word as one smooth motion, not letter by letter.",
    text: "or one had by word but not what all were\nwe when your can said there use an each which\nshe do how their if\nwhat did she say when we were there\nwe can each use one word" },
  { n: 25, title: "Pair Speed Check", intro: "A quick check on everything in this unit. Keep a steady rhythm, like a drum beat.",
    text: "They were in the water when the winter storm came.\nShe said there is one more thing to do at the station.\nWe can all help, and then we can go home." },

  // ----- SENTENCE RHYTHM -----
  { n: 26, title: "Capital, Period, Space", intro: "Every sentence has the same rhythm: capital letter, words, period, space. Make that pattern feel automatic.",
    text: "The ship is fast. The crew is ready. The stars are bright.\nWe check the map. We set the course. We start the engine.\nIris waves. Gus beeps. Captain Ruth smiles." },
  { n: 27, title: "Commas in Lists", intro: "Lists need commas. Reach for the comma with your right middle finger and come right back.",
    text: "Pack a map, a light, a jacket, and a snack.\nThe planets are red, blue, green, and gold.\nWe saw comets, moons, stars, and one very surprised robot." },
  { n: 28, title: "Questions and Apostrophes", intro: "Question marks and apostrophes both use your right pinky. Hold Shift with your left pinky for the question mark.",
    text: "Where's the relay beam? It's almost ready.\nWhat's that sound? That's just Gus humming.\nCan't you hear it? I can't hear a thing. Isn't it quiet?" },
  { n: 29, title: "Numbers in Sentences", intro: "Numbers live on the top row. Reach up, type the number, and drop right back to home base.",
    text: "The Kestrel has 3 sails and 12 windows.\nWe traveled 250 miles in 4 hours.\nThere are 8 planets, 5 dwarf planets, and more than 200 moons." },
  { n: 30, title: "Rhythm Check", intro: "Capitals, periods, commas, questions, and numbers, all at once. Keep your speed steady from start to finish.",
    text: "Captain Ruth checked the list twice. Were there 4 fuel tanks, or 5?\nGus counted 5, but Iris counted 4. Who was right?\nIt turns out Gus had counted his own head. It's shiny, round, and full of fuel." },

  // ----- CONTENT SPEED -----
  { n: 31, title: "Science Speed", intro: "Real science sentences. Type the words the way a scientist would say them: clearly and steadily.",
    text: "Matter can be a solid, a liquid, or a gas.\nWater freezes into ice at 32 degrees Fahrenheit.\nA magnet pulls on iron but not on wood or plastic.\nPlants use sunlight, water, and air to make food." },
  { n: 32, title: "Social Studies Speed", intro: "Texas and United States facts. Watch your capital letters on names and places.",
    text: "Texas has four natural regions.\nAustin is the capital of Texas, and Washington, D.C., is the capital of the United States.\nThe three branches of government are the legislative, executive, and judicial branches." },
  { n: 33, title: "Math Speed", intro: "Math words and numbers together. Numbers are part of your rhythm now, not a pause.",
    text: "A rectangle has 4 sides and 4 right angles.\nIf 6 students each have 3 pencils, there are 18 pencils in all.\nThe fraction 1/2 is equal to 2/4 and 3/6.\nRound 47 to the nearest ten to get 50." },
  { n: 34, title: "Reading Words", intro: "Words you use when you talk about books. Long words are just short chunks put together.",
    text: "The main character wants to find her way home.\nThe setting is a space station far from Earth.\nThe problem gets worse before it gets better.\nThe author uses details to help the reader picture each scene." },
  { n: 35, title: "Content Check", intro: "One sentence from every subject. Switch topics without slowing down.",
    text: "Energy from the Sun warms the land and water.\nThe Alamo is in San Antonio, Texas.\nThere are 60 minutes in 1 hour and 24 hours in 1 day.\nA good summary tells the most important ideas in order." },

  // ----- STAMINA -----
  { n: 36, title: "Dialogue", intro: "Quotation marks use Shift and the apostrophe key. Put them around the exact words a character says.",
    text: "\"Is everyone ready?\" asked Captain Ruth.\n\"Ready!\" said Iris.\n\"Ready,\" said Gus, \"but only if we can stop for snacks.\"\n\"You don't eat snacks,\" Iris reminded him.\n\"I like to look at them,\" said Gus." },
  { n: 37, title: "Speed Burst", intro: "Short, fast sentences. Push your speed a little higher than feels comfortable, but keep your accuracy.",
    text: "Go. Type. Breathe. Keep going.\nFast hands. Calm mind. Eyes up.\nThe beam is on. The ship is near. The crew is safe.\nOne more line. One more word. Done." },
  { n: 38, title: "Story Paragraph", intro: "A full paragraph from the Kestrel's trip home. Stay steady all the way to the last word.",
    text: "On the way home, the Kestrel passed a ring of blue ice. Iris pressed her nose against the window and counted the frozen chunks as they spun by. Captain Ruth let Gus steer for five whole minutes. He only bumped into one small moon, and he said sorry to it twice." },
  { n: 39, title: "Endurance Paragraph", intro: "A longer paragraph. If your fingers get tired, slow down a little instead of stopping.",
    text: "A relay station helps ships talk across huge distances. When a ship sends a message, the station catches it and sends it along to the next station. Each station makes the signal a little stronger. Without relay stations, messages from far away would fade into static long before anyone could read them. That is why every relay cadet needs fast, careful hands." },
  { n: 40, title: "Fluency Final Check", intro: "The last level. Everything you have practiced: capitals, punctuation, numbers, and steady speed.",
    text: "Cadet, this is your final fluency check. You started with only seven keys and a broken signal. Now you can type every letter, number, and mark on the keyboard.\nHere is what you have done: 40 levels, 24 story chapters, and more words than Gus could ever count. Captain Ruth says you are ready for anything. Iris says you are faster than she is. Gus says, \"Please teach me.\"\nCongratulations, Cadet. The station is proud of you." },
];

export const FLUENCY_LEVELS = RAW.map((l) => ({
  ...l,
  unit: FLUENCY_UNITS.find((u) => u.levels.includes(l.n)).id,
  goals: { accuracy: FLUENCY_ACCURACY, wpm: wpmFor(l.n) },
}));

export const FLUENCY_FIRST = 21;
export const FLUENCY_LAST = 40;

export function getFluencyLevel(n) {
  return FLUENCY_LEVELS.find((l) => l.n === Number(n)) || null;
}

// fluency = relay_station_progress.fluency ({ current, results }).
export function normalizeFluency(f) {
  const current = Number(f && f.current) || FLUENCY_FIRST;
  return { current: Math.min(Math.max(current, FLUENCY_FIRST), FLUENCY_LAST + 1), results: (f && f.results) || {} };
}

export function fluencyPassedCount(f) {
  const { results } = normalizeFluency(f);
  return Object.values(results).filter((r) => r && r.passed).length;
}
