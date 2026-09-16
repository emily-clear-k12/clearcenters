// Mission Map — "Rescue the Pollination Path" — SERVER ONLY.
// Never import this from a client component. Revised Aug 30 (v2) to match
// the deepened 6-checkpoint public case and the 3-part Final Unlock
// requirement (see 3-1-MM.public.js for what changed and why).
//
// REVISED Aug 31 (v6) to match the public case's real-TEKS retheme (pollen/
// flower-anatomy content dropped, re-anchored to TEKS 3.12B Food Chains &
// Ecosystem Changes). That revision changed only modelAnswer and
// mustInclude, to grade the new food-chain explanation instead of the old
// pollination-mechanics one.
//
// Sept 16, 2026 — correctChoiceId values here are no longer all "a". Every
// Mission Map case used to author its correct answer first, in all 138
// multiple-choice checkpoints across the library, which was safe only
// because MissionMapClient.js shuffles the options per student before
// showing them. Anything that ever rendered these options in their
// authored order — a paper packet, a preview, an export — would have had
// "always pick the first one" as a complete answer key. The correct answer
// is now authored in a varied position per checkpoint, so the content is
// no longer one render away from giving itself away. The options and the
// correct answer itself are unchanged; only their order is.

export const SERVER_CASE = {
  standard: "3.1-MM",
  title: "Rescue the Pollination Path",

  checkpoints: [
    { id: "cp1", correctChoiceId: "c" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", correctChoiceId: "d" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "d" },
    { id: "cp6", correctChoiceId: "b" },
  ],

  modelAnswer:
    "This garden's food chain starts with the Sun. The Sun gives energy to the flowers, which are producers. Bees are consumers — they eat nectar from the flowers, the way the trail camera caught a bee feeding on a flower. When fewer bees visit, fewer flowers make seeds, which is what Volunteer A's note showed and Volunteer B's didn't. That has effects further down the chain too: a sparrow eats the seeds from these flowers, so fewer seeds could mean less food for the sparrow. The caged-marigold test proves bees really do matter here — the cage with no bees made zero seed pods, while the cage bees could reach made several. So the neighbor's claim that bees don't matter for this garden doesn't hold up.",

  mustInclude: [
    "Explains that energy in this food chain starts with the Sun, moves to the flowers (producers), and then to the bees (consumers) — not just 'the bee visits the flower'",
    "Explains at least one effect further down the chain when bees decline (e.g., fewer seeds could mean less food for the sparrow)",
    "Uses the caged-marigold evidence (Cage A = no bees = zero pods; Cage B = bees allowed = several pods) to explain why the 'bees don't matter' claim is wrong",
  ],
};
