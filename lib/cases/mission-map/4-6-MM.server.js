// Mission Map — "Region Evidence Trail" — SERVER ONLY.
// Never import this from a client component. See 4-6-MM.public.js for the
// TEKS 4.6A alignment.

export const SERVER_CASE = {
  standard: "4.6-MM",
  title: "Region Evidence Trail",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "This trail stop's evidence points to a flat, dry plains region of Texas, like the Great Plains or North Central Plains. The landform evidence showed flat, open land with very few trees, and the climate evidence showed low rainfall and hot, dry summers. Together, that matches the large cattle ranches described in the economic activity evidence — ranching needs exactly this kind of flat, dry grazing land. One photo of the ranching alone wasn't enough evidence to identify the region, because a photo of cattle doesn't show WHY ranching happens there; it took the landform and climate clues together with the economic activity to actually prove which region this is.",

  mustInclude: [
    "Uses at least two types of evidence (landform, climate, and/or economic activity) from the case file",
    "Connects the geography (flat, dry land) to why ranching is the region's economic activity",
    "Explains why a single clue (like one photo) isn't enough evidence to identify a region",
  ],
};
