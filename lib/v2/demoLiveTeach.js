// CI2.0 · Live teach shell — present-mode skeleton (not a slide deck builder).
// Big objective · beat 1/2/3 · next/back · assign practice stub.

import { getLessonPlanStub, LESSON_PLAN_HREF } from "./demoLessonPlan";
import { PROJECT_HREF } from "./demoProject";

export const LIVE_TEACH_HREF = (id) =>
  `/v2/teacher/live-teach/${encodeURIComponent(id)}`;

/**
 * Present-mode model from a teach activity id (reuses lesson-plan spine).
 */
export function getLiveTeachStub(id) {
  const plan = getLessonPlanStub(id);
  if (!plan) return null;
  const beats = (plan.spine || []).map((b, i) => ({
    index: i + 1,
    title: b.beat,
    detail: b.detail,
  }));
  while (beats.length < 3) {
    beats.push({
      index: beats.length + 1,
      title: `Beat ${beats.length + 1}`,
      detail: "Calm teach beat stub.",
    });
  }
  return {
    id: plan.id,
    title: plan.title,
    subject: plan.subject,
    subjectName: plan.subjectName,
    subjectColor: plan.subjectColor,
    objective: plan.objective,
    teksChip: plan.teksChip,
    dayLabel: plan.dayLabel,
    minutes: plan.minutes,
    beats: beats.slice(0, 3),
    assignPracticeLabel: "Assign practice (stub)",
    assignPracticeHint: "Would queue a short practice for My Day — skeleton only.",
    samLine: "Teach live · glance-first present mode — not a slide deck.",
    lessonPlanHref: LESSON_PLAN_HREF(plan.id),
    projectHref: plan.projectHref || PROJECT_HREF(plan.id),
    backHref: plan.backHref,
  };
}

export default getLiveTeachStub;
