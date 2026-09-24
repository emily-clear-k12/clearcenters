import { getLabCase } from "./catalog.js";

function sameSet(a, b) {
  const left = Array.isArray(a) ? a : [];
  const right = Array.isArray(b) ? b : [];
  return left.length === right.length && left.every((id) => right.includes(id));
}

function groupName(page, id) {
  if (!id) return "(not sorted)";
  return (page.groups.find((group) => group.id === id) || {}).label || id;
}

function labelName(venn, id) {
  return (venn.labels.find((label) => label.id === id) || {}).text || id;
}

function choiceText(choices, id) {
  if (Array.isArray(id)) return id.map((one) => choiceText(choices, one)).filter(Boolean).join(", ") || "(none)";
  return (choices.find((choice) => choice.id === id) || {}).text || "(none)";
}

export function gradeClassificationPage(caseId, pageIndex, payload) {
  const lab = getLabCase(caseId);
  if (!lab || pageIndex < 0 || pageIndex > 2) return null;
  const body = payload || {};

  if (pageIndex < 2) {
    const page = lab.pages[pageIndex];
    const placed = body.placed || {};
    const items = page.items.map((item) => ({
      id: item.id,
      label: item.label,
      student: groupName(page, placed[item.id]),
      correct: groupName(page, item.group),
      right: placed[item.id] === item.group,
      placed: !!placed[item.id],
    }));
    const correct = items.filter((item) => item.right).length;
    return {
      unfinished: items.some((item) => !item.placed),
      correct,
      total: items.length,
      misses: items.length - correct,
      items,
    };
  }

  const venn = lab.venn;
  const labelAt = body.labelAt || {};
  const itemAt = body.itemAt || {};
  if (!labelAt.left || !labelAt.right || labelAt.left === labelAt.right) {
    return { needsLabels: true };
  }
  const zoneName = (zone) => {
    if (zone === "center") return "Center — both";
    if (zone === "out") return "Outside both";
    if (zone === "left" || zone === "right") return labelName(venn, labelAt[zone]);
    return "(not placed)";
  };
  const correctZone = (sets) => {
    if (!sets.length) return "out";
    if (sets.length === 2) return "center";
    if (labelAt.left === sets[0]) return "left";
    if (labelAt.right === sets[0]) return "right";
    return null;
  };
  const items = venn.items.map((item) => {
    const zone = correctZone(item.sets);
    return {
      id: item.id,
      label: item.label,
      student: zoneName(itemAt[item.id]),
      correct: zone === "center" ? "Center — both" : zone === "out" ? "Outside both" : labelName(venn, item.sets[0]),
      right: !!zone && itemAt[item.id] === zone,
      placed: !!itemAt[item.id],
    };
  });
  const questions = [
    {
      id: "mc",
      prompt: venn.mc.prompt,
      student: choiceText(venn.mc.choices, body.mc),
      correct: choiceText(venn.mc.choices, venn.mc.answer),
      right: body.mc === venn.mc.answer,
    },
    {
      id: "multi",
      prompt: venn.multi.prompt,
      student: choiceText(venn.multi.choices, body.multi || []),
      correct: choiceText(venn.multi.choices, venn.multi.answers),
      right: sameSet(body.multi, venn.multi.answers),
    },
    {
      id: "inline",
      prompt: `${venn.inline.before} ____ ${venn.inline.after}`,
      student: choiceText(venn.inline.choices, body.inline),
      correct: choiceText(venn.inline.choices, venn.inline.answer),
      right: body.inline === venn.inline.answer,
    },
  ];
  const correct = items.filter((item) => item.right).length + questions.filter((question) => question.right).length;
  const total = items.length + questions.length;
  return {
    unfinished: items.some((item) => !item.placed),
    correct,
    total,
    misses: total - correct,
    items,
    questions,
    rules: { left: labelName(venn, labelAt.left), right: labelName(venn, labelAt.right) },
  };
}
