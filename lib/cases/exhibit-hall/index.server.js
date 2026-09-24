import { getExhibitCase } from "./catalog.js";

function card(exhibit, id) {
  return exhibit.cards.find((item) => item.id === id);
}

export function gradeExhibit(standard, body) {
  const exhibit = getExhibitCase(standard);
  if (!exhibit) return null;
  const wall = Array.isArray(body.wall) ? body.wall.slice(0, 4) : [null, null, null, null];
  while (wall.length < 4) wall.push(null);
  const misses = wall.filter((id, index) => !id || card(exhibit, id)?.job !== exhibit.spots[index].id).length;
  const myth = wall.includes(exhibit.mythId);
  const leftover = body.bin ? card(exhibit, body.bin) : null;
  const binOk = !!leftover && leftover.job === "none" && body.reason === leftover.reason;
  let wallLevel = 2;
  let wallNote = "Every spot matches, and the leftover does not belong.";
  if (myth || misses >= 2) {
    wallLevel = 0;
    wallNote = myth ? "The myth is on the wall. This cannot be a 2." : "Two or more spots do not match. This cannot be a 2.";
  } else if (misses === 1 || !binOk) {
    wallLevel = 1;
    wallNote = misses === 1 ? "One spot does not match." : "The leftover does not fit the reason.";
  }

  const ms = Array.isArray(body.sandPicks) ? body.sandPicks : [];
  let questions = 0;
  if (body.heatPick === exhibit.mcAnswer) questions += 1;
  if ([...ms].sort().join("|") === [...exhibit.msAnswers].sort().join("|")) questions += 1;
  if (body.daysFalse === exhibit.tfIsFalse) questions += 1;
  if (body.notePick === exhibit.icAnswer) questions += 1;

  let level = 0;
  const writing = String(body.plaque || "") + Object.values(body.lines || {}).map((line) => `${line?.what || ""} ${line?.why || ""}`).join(" ");
  const wrote = writing.trim().length > 20;
  if (wallLevel === 2 && wrote && questions >= 1) level = 2;
  else if (wallLevel > 0 || wrote || questions > 0) level = 1;

  return { exhibit, wall, wallLevel, wallNote, myth, misses, questions, level, leftover };
}
