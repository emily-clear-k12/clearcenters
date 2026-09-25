import { getExhibitCase } from "./catalog.js";

function card(exhibit, id) {
  return exhibit.cards.find((item) => item.id === id);
}

function gradeSplit(exhibit, body) {
  const groups = body.groups || { left: [], right: [], both: [] };
  const zones = ["left", "right", "both"];
  let misses = 0;
  let myth = false;
  const seen = new Set();
  zones.forEach((zone) => {
    (groups[zone] || []).forEach((id) => {
      seen.add(id);
      const item = card(exhibit, id);
      if (!item || item.job !== zone) misses += 1;
      if (id === exhibit.mythId) myth = true;
    });
  });
  exhibit.cards.forEach((item) => {
    if (item.job !== "none" && !seen.has(item.id)) misses += 1;
  });
  const leftover = body.bin ? card(exhibit, body.bin) : null;
  const binOk = !!leftover && leftover.job === "none" && body.reason === leftover.reason;
  let wallLevel = 2;
  let wallNote = "Each piece is on the right side, and the leftover does not belong.";
  if (myth || misses >= 2) {
    wallLevel = 0;
    wallNote = myth ? "The myth is on the wall. This cannot be a 2." : "Two or more pieces are on the wrong side. This cannot be a 2.";
  } else if (misses === 1 || !binOk) {
    wallLevel = 1;
    wallNote = misses === 1 ? "One piece is on the wrong side." : "The leftover does not fit the reason.";
  }
  return { misses, myth, wallLevel, wallNote, leftover, groups };
}

export function gradeExhibit(standard, body) {
  const exhibit = getExhibitCase(standard);
  if (!exhibit) return null;
  const split = exhibit.layout === "split" ? gradeSplit(exhibit, body) : null;
  const line = exhibit.layout === "line";
  const count = exhibit.spots.length;
  let wall = [];
  if (!split) {
    wall = Array.isArray(body.wall) ? body.wall.slice(0, count) : [];
    while (wall.length < count) wall.push(null);
  }
  const misses = split ? split.misses : wall.filter((id, index) => !id || card(exhibit, id)?.job !== exhibit.spots[index].id).length;
  const myth = split ? split.myth : wall.includes(exhibit.mythId);
  const leftover = split ? split.leftover : (body.bin ? card(exhibit, body.bin) : null);
  const binOk = !!leftover && leftover.job === "none" && body.reason === leftover.reason;
  let wallLevel = 2;
  let wallNote = line ? "Every step is in order, and the leftover does not belong." : "Every spot matches, and the leftover does not belong.";
  if (split) {
    wallLevel = split.wallLevel;
    wallNote = split.wallNote;
  } else if (myth || misses >= 2) {
    wallLevel = 0;
    wallNote = myth ? "The myth is on the wall. This cannot be a 2." : line ? "Two or more steps are out of order. This cannot be a 2." : "Two or more spots do not match. This cannot be a 2.";
  } else if (misses === 1 || !binOk) {
    wallLevel = 1;
    wallNote = misses === 1 ? (line ? "One step is out of order." : "One spot does not match.") : "The leftover does not fit the reason.";
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
