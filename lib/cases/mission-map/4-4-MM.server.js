// Mission Map — "Ecosystem Balance Path" — SERVER ONLY.
// Never import this from a client component. See 4-4-MM.public.js for the
// TEKS 4.12B alignment.

export const SERVER_CASE = {
  standard: "4.4-MM",
  title: "Ecosystem Balance Path",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Energy in this food web starts with the Sun, which the prairie grass — the producer — uses to make its own food. The rabbit, a consumer, eats the grass, and the hawk, another consumer, eats the rabbit, so energy moves grass to rabbit to hawk. A food-web arrow between the grass and the rabbit means energy is moving from the grass into the rabbit, not the other way around — it points in the direction of what's eaten to what eats it. When dead material from any of these organisms breaks down, decomposers like mushrooms return its nutrients to the soil, cycling the matter back into the system. If the rabbit population drops sharply, the hawk would likely have less food available further along the path, since the hawk depends on rabbits as its main energy source in this food web.",

  mustInclude: [
    "Traces the path from the Sun through the producer (grass) and the consumers (rabbit, hawk) to decomposers, not just naming roles in isolation",
    "Correctly explains what a food-web arrow means (direction of energy flow, from eaten to eater)",
    "Explains the likely effect on the hawk when the rabbit population drops, connecting cause to effect rather than just stating an outcome",
  ],
};
