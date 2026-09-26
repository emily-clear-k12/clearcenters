// Student-safe Expedition Station cases. No answer keys.
import { QUESTS } from "./catalog.js";

function publicTask(task) {
  if (!task || task.locked) {
    return {
      id: task.id,
      act: task.act,
      title: task.title,
      machine: task.machine,
      challenge: !!task.challenge,
      locked: true,
    };
  }
  const pub = {
    id: task.id,
    act: task.act,
    level: task.level,
    title: task.title,
    machine: task.machine,
    icon: task.icon,
    speaker: task.speaker,
    line: task.line,
    nova: task.nova || null,
    question: task.question,
    hint: task.hint,
    meter: task.meter,
    discovery: task.discovery || null,
    challenge: !!task.challenge,
    locked: false,
  };
  if (task.reasons) pub.reasons = task.reasons;
  // ELAR and science task configs (Sept 26). None of these hold answers.
  if (task.passage) pub.passage = task.passage;
  if (task.choices) pub.choices = task.choices;
  if (task.items) pub.items = task.items;
  if (task.edit) pub.edit = task.edit;
  if (task.unit) pub.unit = task.unit;
  if (task.minWords) pub.minWords = task.minWords;
  if (task.parts) pub.parts = task.parts;
  if (task.data) pub.data = task.data;
  if (task.teacherScored) pub.teacherScored = true;
  if (task.stepPrompts) pub.stepPrompts = task.stepPrompts;
  if (task.stepButtons) pub.stepButtons = task.stepButtons;
  if (task.missingPrompt) pub.missingPrompt = task.missingPrompt;
  if (task.pourLabel) pub.pourLabel = task.pourLabel;
  if (task.writtenPrompt) pub.writtenPrompt = task.writtenPrompt;
  if (task.fill) {
    pub.fill = { ...task.fill };
    pub.fill = task.fill;
  }
  if (task.tune) pub.tune = task.tune;
  if (task.travel) pub.travel = task.travel;
  if (task.repair) pub.repair = task.repair;
  if (task.sort) pub.sort = task.sort;
  if (task.numberless) {
    const { questions, reveal, ask, denom, pours } = task.numberless;
    pub.numberless = { questions, reveal, ask, denom, pours };
  }
  if (task.answer && task.answer.kind === "scoops") {
    pub.scoops = {
      start: task.answer.start,
      target: task.answer.target,
      scoopSizes: task.answer.scoopSizes,
      waysNeeded: task.answer.waysNeeded,
      denom: task.fill.denom,
    };
  }
  return pub;
}

function publicQuest(quest) {
  const tasks = {};
  Object.keys(quest.tasks).forEach((key) => {
    tasks[key] = publicTask(quest.tasks[key]);
  });
  return {
    id: quest.id,
    standard: quest.standard,
    engine: quest.engine,
    title: quest.title,
    planet: quest.planet,
    outpost: quest.outpost,
    grade: quest.grade,
    subject: quest.subject,
    teks: quest.teks,
    passages: quest.passages || null,
    supportingTeks: quest.supportingTeks || [],
    meterLabels: quest.meterLabels || null,
    skillsChip: quest.skillsChip,
    iCan: quest.iCan,
    blurb: quest.blurb,
    mission: quest.mission,
    length: quest.length,
    crew: quest.crew,
    channel: quest.channel,
    playableActs: quest.playableActs,
    meterStart: quest.meterStart,
    journalMax: quest.journalMax,
    opening: quest.opening,
    acts: quest.acts,
    tasks,
  };
}

const PUBLIC = {};
Object.keys(QUESTS).forEach((key) => {
  PUBLIC[key] = publicQuest(QUESTS[key]);
});

export function getExpeditionStationPublicCase(standard) {
  return PUBLIC[standard] || null;
}
