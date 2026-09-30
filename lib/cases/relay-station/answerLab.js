// ClearKeys Answer Lab (Sept 29, 2026): the typing skills a typed test
// answer needs that copy-typing never teaches. Two parts:
//   EDIT_DRILLS  - fix a line using the editing keys; checked automatically
//   SHORT_ANSWERS - read a short passage, type a response against a timer
// Practice only: nothing is saved or graded.

export const EDIT_DRILLS = [
  { id: "arrows", skill: "Arrow keys", title: "Move without the mouse",
    how: "Click at the END of the line. Use the Left Arrow key to move back to the mistake, fix it, and leave the rest alone.",
    start: "The Sun is a star at the cneter of our solar system.",
    target: "The Sun is a star at the center of our solar system." },
  { id: "backspace", skill: "Backspace", title: "Erase to the left",
    how: "Backspace erases the letter to the LEFT of the cursor. Put the cursor right after the extra word and backspace it away.",
    start: "Plants need need water and sunlight to grow.",
    target: "Plants need water and sunlight to grow." },
  { id: "delete", skill: "Delete", title: "Erase to the right",
    how: "Delete erases the letter to the RIGHT of the cursor. Put the cursor right before the extra letters and press Delete. (On a Chromebook, press Alt + Backspace.)",
    start: "Magnets pulll on iron and steel.",
    target: "Magnets pull on iron and steel." },
  { id: "homeend", skill: "Home and End", title: "Jump to the start or end",
    how: "Home jumps to the start of the line and End jumps to the end. Capitalize the first word and add a period at the end. (On a Chromebook or Mac, use Ctrl or Cmd with the Left and Right Arrows.)",
    start: "austin is the capital of Texas",
    target: "Austin is the capital of Texas." },
  { id: "select", skill: "Shift + Arrow", title: "Select, then type over it",
    how: "Hold Shift and press the Arrow keys to select a word. Then just type. The new word replaces what you selected.",
    start: "The storm was very big.",
    target: "The storm was very powerful." },
  { id: "word", skill: "Select a whole word", title: "Grab a word at once",
    how: "Double-click a word to select all of it, or hold Ctrl (Option on a Mac) + Shift and press an Arrow key. Replace the word.",
    start: "The rover moved slowly across the crater.",
    target: "The rover moved carefully across the crater." },
  { id: "cutpaste", skill: "Cut and paste", title: "Move a sentence",
    how: "Select the sentence that should come first. Cut it with Ctrl + X (Cmd + X on a Mac). Move the cursor to the start and paste with Ctrl + V. Fix the spaces.",
    start: "Then the water fell as rain. First the Sun heated the water.",
    target: "First the Sun heated the water. Then the water fell as rain." },
  { id: "copypaste", skill: "Copy and paste", title: "Reuse a word from the text",
    how: "Select the science word in the first sentence. Copy it with Ctrl + C. Click on the blank line and paste it with Ctrl + V, replacing the blank.",
    start: "Condensation is when water vapor cools into drops. _____ makes clouds form.",
    target: "Condensation is when water vapor cools into drops. Condensation makes clouds form." },
  { id: "undo", skill: "Undo", title: "Bring it back",
    how: "Select the whole line with Ctrl + A and press Backspace. Oops! Now press Ctrl + Z (Cmd + Z on a Mac) to undo and bring it back.",
    start: "Undo can save your work when you make a mistake.",
    target: "Undo can save your work when you make a mistake.",
    mustEmptyFirst: true },
  { id: "enter", skill: "Enter for a new paragraph", title: "Split into two paragraphs",
    how: "Put the cursor right before the word Second. Delete the space and press Enter to start a new paragraph.",
    start: "First, the caterpillar hatches from an egg. Second, it wraps itself in a chrysalis.",
    target: "First, the caterpillar hatches from an egg.\nSecond, it wraps itself in a chrysalis." },
  { id: "fixall", skill: "Put it together", title: "Fix three mistakes",
    how: "There are three mistakes: a capital letter, a misspelled word, and a missing period. Use any editing keys you like.",
    start: "the Alamo is in San Antonio, Texsa",
    target: "The Alamo is in San Antonio, Texas." },
  { id: "final", skill: "Final edit", title: "Edit a whole answer",
    how: "This answer has four mistakes. Find and fix all of them, then check.",
    start: "A food chain shows how energy moves. The energy starts with the the sun. a plant uses sunlight to make food. A rabbit eats the plant",
    target: "A food chain shows how energy moves. The energy starts with the Sun. A plant uses sunlight to make food. A rabbit eats the plant." },
];

export const SHORT_ANSWERS = [
  { id: "matter", subject: "Science", title: "Ice in the Sun",
    passage: "Mia left an ice cube on a plate in the sun. After ten minutes, the ice cube was smaller and there was water on the plate. After an hour, the plate was dry.",
    question: "What happened to the ice cube and the water? Use details from the passage to explain.",
    minWords: 25 },
  { id: "regions", subject: "Social Studies", title: "Life on the Coast",
    passage: "The Coastal Plains region of Texas is flat and close to the Gulf of Mexico. Many people there work in fishing, shipping, and oil. Big ports, like the Port of Houston, send goods all over the world.",
    question: "How does being near the Gulf of Mexico affect the jobs people have? Use two details from the passage.",
    minWords: 30 },
  { id: "character", subject: "ELAR", title: "Gus in the Dark",
    passage: "When the lights went out, Gus hid under his blanket. But when Iris needed a wrench, Gus crawled out, found it in the dark, and handed it to her. \"I was only a little scared,\" he beeped.",
    question: "What does Gus do that shows he is brave? Explain using details from the passage.",
    minWords: 30 },
  { id: "math", subject: "Math", title: "The Bake Sale",
    passage: "The class sold 48 cookies at the bake sale. Each cookie cost 2 dollars. The class wants to buy a class plant that costs 75 dollars.",
    question: "Did the class make enough money to buy the plant? Show your thinking in words and numbers.",
    minWords: 25 },
  { id: "energy", subject: "Science", title: "The Solar Oven",
    passage: "Jay built a box oven with a black bottom and foil flaps. He set it in the sun. The foil reflected sunlight into the box, and the black bottom absorbed the light and got hot. His marshmallow melted in 20 minutes.",
    question: "How did the foil and the black bottom help the oven work? Use details from the passage.",
    minWords: 35 },
  { id: "opinion", subject: "ELAR", title: "Your Opinion",
    passage: "Some schools let students choose a club every Friday afternoon. Clubs can include art, coding, gardening, or sports. Other schools use that time for extra practice in reading and math.",
    question: "Should our school have club time on Fridays? State your opinion and give two reasons.",
    minWords: 40 },
];

// Normalize for checking: exact characters, but ignore trailing spaces on a
// line and a trailing newline, and treat \r\n as \n.
export function sameText(a, b) {
  const norm = (s) => String(s || "").replace(/\r\n/g, "\n").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").replace(/\n+$/, "");
  return norm(a) === norm(b);
}
