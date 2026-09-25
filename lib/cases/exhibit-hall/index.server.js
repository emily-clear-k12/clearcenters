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

function gradePortrait(exhibit, body) {
  const wall = Array.isArray(body.wall) ? body.wall.slice(0, exhibit.spots.length) : [];
  while (wall.length < exhibit.spots.length) wall.push(null);
  const seen = new Set();
  let misses = 0;
  let myth = false;
  wall.forEach((id) => {
    if (!id || seen.has(id)) {
      misses += 1;
      return;
    }
    seen.add(id);
    const item = card(exhibit, id);
    if (!item || item.job !== "ring") misses += 1;
    if (id === exhibit.mythId) myth = true;
  });
  const leftover = body.bin ? card(exhibit, body.bin) : null;
  const binOk = !!leftover && leftover.job === "none" && body.reason === leftover.reason;
  let wallLevel = 2;
  let wallNote = "Every piece around the portrait is true and important, and the leftover does not belong.";
  if (myth || misses >= 2) {
    wallLevel = 0;
    wallNote = myth ? "The myth is on the wall. This cannot be a 2." : "Two or more pieces do not belong around this portrait. This cannot be a 2.";
  } else if (misses === 1 || !binOk) {
    wallLevel = 1;
    wallNote = misses === 1 ? "One piece does not belong around this portrait." : "The leftover does not fit the reason.";
  }
  return { misses, myth, wallLevel, wallNote, leftover, wall, binOk };
}

function gradeKinds(exhibit, body) {
  const count = exhibit.spots.length;
  const wall = Array.isArray(body.wall) ? body.wall.slice(0, count) : [];
  while (wall.length < count) wall.push(null);
  const edgeIndex = exhibit.spots.findIndex((spot) => spot.id === "edge");
  const seen = new Set();
  let misses = 0;
  let myth = false;
  wall.forEach((id, index) => {
    if (!id || seen.has(id)) {
      misses += 1;
      return;
    }
    seen.add(id);
    const item = card(exhibit, id);
    const want = index === edgeIndex ? "edge" : "kind";
    if (!item || item.job !== want) misses += 1;
    if (id === exhibit.mythId) myth = true;
  });
  const leftover = body.bin ? card(exhibit, body.bin) : null;
  const binOk = !!leftover && leftover.job === "none" && body.reason === leftover.reason;
  let wallLevel = 2;
  let wallNote = "Every clear example belongs, the tricky one is in its spot, and the leftover does not belong.";
  if (myth || misses >= 2) {
    wallLevel = 0;
    wallNote = myth ? "The myth is on the wall. This cannot be a 2." : "Two or more pieces are in the wrong kind of spot. This cannot be a 2.";
  } else if (misses === 1 || !binOk) {
    wallLevel = 1;
    wallNote = misses === 1 ? "One piece is in the wrong kind of spot." : "The leftover does not fit the reason.";
  }
  return { misses, myth, wallLevel, wallNote, leftover, wall, binOk };
}

export function gradeExhibit(standard, body) {
  const exhibit = getExhibitCase(standard);
  if (!exhibit) return null;
  const split = exhibit.layout === "split" ? gradeSplit(exhibit, body) : null;
  const portrait = exhibit.layout === "portrait" ? gradePortrait(exhibit, body) : null;
  const kinds = exhibit.layout === "kinds" ? gradeKinds(exhibit, body) : null;
  const line = exhibit.layout === "line";
  const count = exhibit.spots.length;
  let wall = [];
  if (!split && !portrait && !kinds) {
    wall = Array.isArray(body.wall) ? body.wall.slice(0, count) : [];
    while (wall.length < count) wall.push(null);
  }
  if (portrait) wall = portrait.wall;
  if (kinds) wall = kinds.wall;
  const misses = kinds ? kinds.misses : portrait ? portrait.misses : split ? split.misses : wall.filter((id, index) => !id || card(exhibit, id)?.job !== exhibit.spots[index].id).length;
  const myth = kinds ? kinds.myth : portrait ? portrait.myth : split ? split.myth : wall.includes(exhibit.mythId);
  const leftover = kinds ? kinds.leftover : portrait ? portrait.leftover : split ? split.leftover : (body.bin ? card(exhibit, body.bin) : null);
  const binOk = kinds ? kinds.binOk : portrait ? portrait.binOk : !!leftover && leftover.job === "none" && body.reason === leftover.reason;
  let wallLevel = 2;
  let wallNote = line ? "Every step is in order, and the leftover does not belong." : "Every spot matches, and the leftover does not belong.";
  if (kinds) {
    wallLevel = kinds.wallLevel;
    wallNote = kinds.wallNote;
  } else if (portrait) {
    wallLevel = portrait.wallLevel;
    wallNote = portrait.wallNote;
  } else if (split) {
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
