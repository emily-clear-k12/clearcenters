// Mission Map — "Erosion Bridge Mission" — SERVER ONLY.
// Never import this from a client component. See 4-3-MM.public.js for the
// TEKS 4.10B alignment.

export const SERVER_CASE = {
  standard: "4.3-MM",
  title: "Erosion Bridge Mission",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "A" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The land at Miller's Creek bridge has been slowly reshaped by weathering, erosion, and deposition. Weathering cracked a rock near the bank as water froze and expanded inside it. Erosion is carrying sediment away in the muddy, fast-moving water on the outside of the creek's bend. That sediment is then deposited as a new sandbar on the inside of the bend, which has grown about eight inches since spring. The bridge's fresh coat of paint wasn't real evidence of land change at all — it explained why the bridge looked different, but it had nothing to do with the actual sediment measurements showing the sandbar's real growth.",

  mustInclude: [
    "Names at least two of the three processes (weathering, erosion, deposition) with specific evidence from the case (the cracked rock, the muddy water, or the sandbar)",
    "Connects erosion (outside of the bend) and deposition (inside of the bend) as two sides of the same process where relevant, not treating them as unrelated",
    "Explains why the bridge's paint job wasn't real evidence of land change, distinguishing it from the sandbar's actual measurement",
  ],
};
