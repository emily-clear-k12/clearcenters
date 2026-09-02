// Mission Map — "Map Key Quest" — SERVER ONLY.
// Never import this from a client component. See 3-6-MM.public.js for the
// TEKS 3.4C alignment.

export const SERVER_CASE = {
  standard: "3.6-MM",
  title: "Map Key Quest",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "sequence", correctOrder: ["title", "key", "compass", "route"] },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The best route from the school to the park is to head South from the school, then go a short distance East, using the compass rose to know that South is toward the bottom of the map and East is to the right. The map key showed that the building symbol at the bottom-left is the school and the tree symbol is the park, which is how the route could be found in the first place. The statue near the edge of the map wasn't part of the actual route because it doesn't even appear in the map key, and it isn't along the straight path between the school and the park — looking important or shiny isn't a real reason to include a stop on a route.",

  mustInclude: [
    "Uses at least one compass direction (South and/or East) correctly, based on the compass rose",
    "References the map key to identify the school and park symbols",
    "Explains that the statue wasn't part of the route because it isn't in the map key and isn't on the path, not just because it 'looked wrong'",
  ],
};
