// Mission Map — "Solve the Derby Track Mystery" — SERVER ONLY.
// Never import this from a client component. See 5-1-MM.public.js for the
// TEKS 5.7A/5.7B alignment and scope notes.

export const SERVER_CASE = {
  standard: "5.1-MM",
  title: "Solve the Derby Track Mystery",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Team Comet kept winning because of an unequal force, not luck or a rigged ramp. The track judge measured both ramps and found they start at the same height and angle every time, which rules out a tilted track. The real difference is friction: Comet's smooth plastic wheels spin more freely than Blaze's rough cardboard wheels, which drag against the axle. That's an unequal force working against Blaze's car, slowing its motion and cutting its distance. The push-start trial and the balloon rocket trials both back this up — in every case, more force (a push, more air) meant more distance traveled. To settle the argument fairly, the teams should swap only the wheels between the two cars and keep the ramp height, angle, and everything else exactly the same — that's the only way to test the wheels by themselves, instead of changing more than one thing at once.",

  mustInclude: [
    "Explains that an unequal force (friction from the wheels, not the ramp) is the real cause of the different patterns of motion — not luck, paint color, or a rigged ramp",
    "Uses specific evidence from the case (the wheel comparison, the ramp-height data, the push-start trial, and/or the balloon rocket trials) to support the explanation, not just a general claim",
    "Describes a genuinely fair test: changing only the wheels and keeping every other part of the setup the same — and explains why changing more than one thing at once (like wheels + weight) wouldn't prove anything",
  ],
};
