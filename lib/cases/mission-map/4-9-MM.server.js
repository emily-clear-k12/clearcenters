// Mission Map — "Civic Decision Map" — SERVER ONLY.
// Never import this from a client component. See 4-9-MM.public.js for the
// TEKS 4.22A alignment.

export const SERVER_CASE = {
  standard: "4.9-MM",
  title: "Civic Decision Map",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The city council should weigh both the business owner's need for more downtown parking and the family's need for a neighborhood park before deciding what to do with the vacant lot. A fair, democratic decision can't be based on just one stakeholder's comment, and it shouldn't be decided by the cost chart alone either, even though the parking lot costs less to build. A reasonable recommendation is a small combined space — for example, a compact park with a few parking spaces along the edge — which is a trade-off that gives up some of the space each side wanted fully, but considers both the business owner's and the family's needs instead of ignoring one of them.",

  mustInclude: [
    "Mentions both stakeholders' needs — the business owner (parking) and the family (a park)",
    "Explains that cost alone shouldn't be the only factor in the decision",
    "States a clear recommendation that includes an explicit trade-off, not just a list of opinions",
  ],
};
