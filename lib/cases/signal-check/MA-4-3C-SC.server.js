// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.4.3C-SC. TEKS 4.3C — determine if two given fractions are equivalent using a variety of methods.

export const SERVER_CASE = {
  standard: "MA.4.3C-SC",
  title: "The Two Fish Tanks",
  stemMode: "dropdown-open",
  statements: {
    A: {
      correctVerdict: "False",
      mustInclude: [
        "States 6/8 and 3/4 are equivalent.",
        "Uses the fraction strips or a model.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Shows 3 × 2 = 6 and 4 × 2 = 8.",
        "Concludes 3/4 = 6/8.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees the fractions are equivalent.",
        "Explains the tanks are different sizes, so the amounts differ.",
      ],
    },
  },
};
