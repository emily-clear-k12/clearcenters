// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.5.9C-SC. TEKS 5.9C — solve one- and two-step problems using data from a frequency table, dot plot, bar graph, stem-and-leaf plot, or scatterplot.

export const SERVER_CASE = {
  standard: "MA.5.9C-SC",
  title: "Under a Minute",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Counts 8 dots below 60 seconds.",
        "Uses that each dot is one student.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "States only 8 students ran under a minute.",
        "Explains that 60 seconds exactly is not under a minute.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees the general trend goes that way.",
        "Names the students who don't fit the pattern.",
      ],
    },
  },
};
