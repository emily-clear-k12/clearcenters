// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (3.6B).

export const SERVER_CASE = {
  standard: "3.6B",
  title: "Rice Thinks She Is a Liquid",
  bigQuestion: "Rice pours like water. So why isn't rice a liquid?",
  evidenceBank: [
    "Rice makes a rounded pile but water goes flat on top",
    "Under the magnifier every grain is the same shape as in the bag",
    "One grain of rice on its own still has its own shape",
    "Water fills every corner of the jar and rice does not",
    "A squeezed grain of rice keeps its shape"
  ],
  trapLine: "I pour and I take the shape of the jar, so I'm a liquid.",
  castNames: {
    rice: "Rice",
    water: "Water",
    lens: "The Magnifier",
    jar: "The Jar",
    nico: "Nico"
  },
  distractors: "Thinking anything that pours must be a liquid; looking at a whole pile instead of one piece of it; thinking taking the shape of the container is enough on its own to make something a liquid; missing that a liquid fills every corner and makes a flat surface while a pile of solids does not.",
  mustInclude: [
    "The chat looks at one grain on its own.",
    "It uses the magnifier.",
    "It compares Rice to real water.",
    "It tells Rice pouring isn't the test.",
    "It gives Nico the rule for the column."
  ],
};
