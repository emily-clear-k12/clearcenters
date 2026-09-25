import { getMakerStudioCase, REASONS } from "./catalog.js";

function card(exhibit, id) {
  return exhibit.cards.find((item) => item.id === id) || null;
}

function uniqueIds(list) {
  const seen = new Set();
  const out = [];
  (list || []).forEach((id) => {
    if (!id || seen.has(id)) return;
    seen.add(id);
    out.push(id);
  });
  return out;
}

/**
 * Rule-check the wall + reject bin for Prove It (and plain spot walls).
 * Returns bounce reasons for wrong picks (attempt 1/2), and a wallLevel.
 */
export function gradeMakerWall(standard, body) {
  const exhibit = getMakerStudioCase(standard);
  if (!exhibit) return null;

  const need = exhibit.wallSize || 4;
  const wall = uniqueIds(body.wall).slice(0, need);
  while (wall.length < need) wall.push(null);

  const filled = wall.filter(Boolean);
  const bounce = []; // { id, why }
  let trapCount = 0;
  let weakCount = 0;
  let mythOnWall = false;
  const strongIds = exhibit.cards.filter((c) => c.role === "strong").map((c) => c.id);

  filled.forEach((id) => {
    const item = card(exhibit, id);
    if (!item) {
      bounce.push({ id, why: "That card is not in this storage room." });
      return;
    }
    if (item.role === "myth" || item.role === "place" || item.role === "topic") {
      trapCount += 1;
      if (item.role === "myth") mythOnWall = true;
      bounce.push({ id, why: item.why || "This piece does not belong on the wall." });
      return;
    }
    if (item.role === "weak") {
      weakCount += 1;
      bounce.push({ id, why: item.why || "True, but it does not prove the point as well." });
    }
  });

  const leftover = body.bin ? card(exhibit, body.bin) : null;
  const reasonOk =
    !!leftover &&
    leftover.role !== "strong" &&
    body.reason === leftover.reason;
  const rejectOk =
    !!leftover &&
    (leftover.role === "myth" ||
      leftover.role === "place" ||
      leftover.role === "topic" ||
      leftover.role === "weak") &&
    body.reason === leftover.reason;

  // Best reject answers: myth/place/topic with matching reason; weak→point also ok.
  let rejectNote = "";
  if (!leftover) rejectNote = "Put one card in Not in this exhibit.";
  else if (leftover.role === "strong") rejectNote = "That strong piece could stay on the wall. Pick a weaker or tricky card.";
  else if (body.reason !== leftover.reason) {
    const right = (REASONS.find((r) => r.id === leftover.reason) || {}).label || leftover.reason;
    rejectNote = `Close — try a different reason. Hint: ${right}.`;
  } else {
    rejectNote = "Nice reject.";
  }

  const mythBuster = leftover && leftover.id === exhibit.mythId && body.reason === "myth";

  let wallLevel = 2;
  let wallNote = "Strong pieces on the wall, and the reject fits.";
  if (mythOnWall || trapCount >= 2) {
    wallLevel = 0;
    wallNote = mythOnWall
      ? "The myth is on the wall. This cannot be a 2."
      : "Two or more trap pieces are on the wall. This cannot be a 2.";
  } else if (trapCount === 1 || weakCount > 0 || !rejectOk) {
    wallLevel = 1;
    wallNote =
      trapCount === 1
        ? "One trap is still on the wall."
        : weakCount > 0
          ? "A weaker piece beat a stronger one."
          : "The reject reason does not fit.";
  }

  const strongest = strongIds.slice(0, need);

  return {
    exhibit,
    wall,
    filled,
    bounce,
    trapCount,
    weakCount,
    mythOnWall,
    leftover,
    reasonOk,
    rejectOk,
    rejectNote,
    mythBuster,
    wallLevel,
    wallNote,
    strongest,
    reasons: REASONS,
  };
}

/**
 * Suggested Level 0/1/2 from wall + writing length (Wave-1; AI reader later).
 */
export function suggestMakerLevel(wallGrade, body) {
  if (!wallGrade) return 0;
  const placards = body.placards || {};
  const plaque = String(body.plaque || "").trim();
  const placardText = Object.values(placards)
    .map((p) => (typeof p === "string" ? p : `${p?.animal || ""} ${p?.part || ""} ${p?.because || ""} ${p?.text || ""}`))
    .join(" ")
    .trim();
  const wrote = plaque.length >= 40 && placardText.length >= 30;

  if (wallGrade.wallLevel === 2 && wrote) return 2;
  if (wallGrade.wallLevel === 0 && !wrote) return 0;
  if (wallGrade.wallLevel >= 1 || wrote) return 1;
  return 0;
}

export function makerExhibitText(standard, body, graded) {
  const exhibit = graded.exhibit;
  const name = (id) => (card(exhibit, id) || {}).title || "empty";
  const reasonLabel = (id) => ((REASONS.find((r) => r.id === id) || {}).label) || id || "no reason";
  const placards = body.placards || {};
  const lines = (graded.wall || []).map((id, i) => {
    const p = placards[id] || {};
    const placard =
      typeof p === "string"
        ? p
        : p.text ||
          `The ${p.animal || "___"} has ${p.part || "___"}. This helps it live in the desert because ${p.because || "___"}.`;
    return `Spot ${i + 1}: ${id ? name(id) : "empty"}${id ? ` — ${placard}` : ""}`;
  });
  return [
    `Exhibit: ${body.exhibitTitle || exhibit.title}`,
    `Hall: ${body.hallId || "—"} · color ${body.wallColor || "—"}`,
    `Driving question: ${exhibit.drivingQuestion}`,
    `Plaque: ${body.plaque || "(blank)"}`,
    ...lines,
    `Reject: ${graded.leftover ? name(graded.leftover.id) : "none"} · ${reasonLabel(body.reason)}`,
    `Wall level: ${graded.wallLevel}. ${graded.wallNote}`,
    `Myth buster: ${graded.mythBuster ? "yes" : "no"}`,
    `Check attempts: ${body.checkAttempts || 0}`,
    `Confidence: ${body.confidence || "—"}`,
    `Suggested level: ${graded.level}`,
  ].join("\n");
}

export function gradeMakerStudio(standard, body) {
  const wallGrade = gradeMakerWall(standard, body);
  if (!wallGrade) return null;
  const level = suggestMakerLevel(wallGrade, body);
  return { ...wallGrade, level };
}
