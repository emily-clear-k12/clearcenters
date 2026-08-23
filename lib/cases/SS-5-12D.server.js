// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.12D, TEKS 5.12D).

export const SERVER_CASE = {
  standard: "SS.5.12D",
  title: "The 500-Order Disaster",
  bigQuestion: "How can mass production, specialization, and division of labor help an economy grow?",
  evidenceBank: [
    "The order is for 500 identical lunch boxes",
    "Workers lose time switching tools and tasks",
    "The old method works better for small custom orders"
  ],
  trapLine: "The fastest way to make 500 products is for every worker to build each product from start to finish.",
  castNames: {
    tori: "Tori Lane",
    dev: "Dev Patel",
    lena: "Lena Ortiz",
    malik: "Malik Brooks",
    mina: "Ms. Mina Cho"
  },
  distractors: "Using specialization and division of labor as synonyms; saying mass production means workers simply work faster; assuming one method is best for every product; listing terms without explaining their relationships; claiming efficiency has no tradeoffs.",
  mustInclude: [
    "Explains specialization as workers focusing on particular tasks or strengths.",
    "Explains division of labor as separating and coordinating production tasks.",
    "Connects specialization and division of labor to mass production.",
    "Connects increased efficiency or output to economic growth.",
    "Rejects one-method-for-everything thinking and acknowledges a tradeoff."
  ],
};
