// One scale for every teacher page. Words, never a percent.
// 2 Got it · 1 Almost · 0 Not yet. Same three colors everywhere.
// Maker Studio and Broadcast Booth keep their own words and use these colors.

export const LEVELS = {
  0: { word: "Not yet", student: "Keep Practicing", maker: "Still working", color: "#d64545" },
  1: { word: "Almost", student: "Getting There", maker: "On track", color: "#c8960a" },
  2: { word: "Got it", student: "Nailed It", maker: "Strong", color: "#1f8a4d" },
};

export function levelWord(grade, engine) {
  const row = LEVELS[Number(grade)];
  if (!row) return "—";
  if (engine === "maker_studio" || engine === "broadcast_booth") return row.maker;
  return row.word;
}

export function studentLevelWord(grade) {
  const row = LEVELS[Number(grade)];
  return row ? row.student : "—";
}

export function levelColor(grade) {
  return (LEVELS[Number(grade)] || LEVELS[0]).color;
}

export function countLevels(grades) {
  const counts = { 0: 0, 1: 0, 2: 0 };
  (grades || []).forEach((grade) => {
    const n = Number(grade);
    if (counts[n] != null) counts[n] += 1;
  });
  return counts;
}

export function countLine(grades) {
  const counts = countLevels(grades);
  const total = counts[0] + counts[1] + counts[2];
  if (!total) return "No grades yet";
  return `${counts[2]} got it · ${counts[1]} almost · ${counts[0]} not yet`;
}
