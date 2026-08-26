// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed reasoning.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.13B, inherited vs.
// acquired physical traits.

export const SERVER_CASE = {
  standard: "4.13B-SC",
  title: "Will the Puppies Get the Same Scar?",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes all the puppies were born with smooth, unmarked ears.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Notes fur color and ear shape did pass from the mother to every puppy.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States the puppies will not be born with the ear notch.",
        "Explains that a scar is an acquired trait, not an inherited one.",
      ],
    },
  },
};
