// Mission Map — "Past and Present Doorway" — SERVER ONLY.
// Never import this from a client component. See 3-7-MM.public.js for the
// TEKS 3.1A alignment.

export const SERVER_CASE = {
  standard: "3.7-MM",
  title: "Past and Present Doorway",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", type: "showdown", correctSide: "B" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Main Street changed a lot from the past to the present. In the past, people traveled by horse-drawn wagon on a dirt road, but today people travel by car on a paved road with traffic lights. An empty lot from long ago is now the site of the town's public library, built because the community grew and needed more services. Not everything changed, though — the old brick church looks almost the same in both photographs. That doesn't mean nothing else changed; it just means some features of a community can stay the same while others, like roads, vehicles, and buildings, change a lot over time.",

  mustInclude: [
    "Describes at least two specific changes using case-file evidence (travel method/road surface, and/or the empty lot becoming a library)",
    "Names what stayed the same (the church) using case-file evidence",
    "Explains that one unchanged feature doesn't mean the whole community stayed the same",
  ],
};
