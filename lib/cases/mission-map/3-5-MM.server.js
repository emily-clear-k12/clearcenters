// Mission Map — "Community Helper Route" — SERVER ONLY.
// Never import this from a client component. See 3-5-MM.public.js for the
// TEKS 3.7C alignment.

export const SERVER_CASE = {
  standard: "3.5-MM",
  title: "Community Helper Route",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", type: "showdown", correctSide: "A" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The traffic light at Stop 1 needed the local (city) government because it's a city street and the city's public works department maintains it. The pothole at Stop 2 also needed the local city street crew, not the state highway department, because Oak Lane is a neighborhood street inside town limits, not the state highway. The national park at Stop 3 needed the national government because national parks are cared for by the national government so people from every state can visit. Asking the wrong level of government matters because each level provides different services — the state highway department can't fix a city street, and a city crew can't run a national park, so asking the wrong one just wastes time without solving the problem.",

  mustInclude: [
    "Matches at least three stops to the correct government level (local for the traffic light and/or pothole, state for the driver's license, national for the national park)",
    "Explains why the pothole was the city crew's job and not the state highway department's, using the street-vs-highway distinction",
    "Explains why asking the wrong level of government doesn't solve the problem, not just that levels are 'different'",
  ],
};
