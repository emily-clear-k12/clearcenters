import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSimulationLabServerCase } from "../../../../lib/cases/simulation-lab/index.server";
import { getSimulationLabPublicCase } from "../../../../lib/cases/simulation-lab/index.public";
import { isCorrect, sceneCheckpointIds } from "../../../../lib/simulationLabScoring";

// Instant feedback for the scene-based Simulation Lab's choice questions
// (pattern + fair test). Answers ONE choice at a time with right/not-yet and
// the matching feedback line, so the answer key itself never ships to the
// browser. Nothing is saved here — the first attempt is what the submit
// route scores (the client sends it with the submission).
export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  // The dev-only harness (app/simulation-lab/dev) runs without a student
  // login on local / preview builds; production always requires one.
  if (!studentId && process.env.VERCEL_ENV === "production") {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  let body = {};
  try { body = await request.json(); } catch (e) { body = {}; }
  const { caseStandard, checkpointId, choiceId } = body;
  const publicCase = getSimulationLabPublicCase(caseStandard);
  const serverCase = getSimulationLabServerCase(caseStandard);
  if (!publicCase || !serverCase || !sceneCheckpointIds(publicCase).includes(checkpointId)) {
    return NextResponse.json({ error: "Unknown checkpoint." }, { status: 400 });
  }
  const cp = serverCase.checkpoints.find((c) => c.id === checkpointId);
  if (!cp || (cp.type !== "mc" && cp.type !== "dropdown")) {
    return NextResponse.json({ error: "Unknown checkpoint." }, { status: 400 });
  }
  const pub = (publicCase.checkpoints || []).find((c) => c.id === checkpointId);
  if (!pub || !(pub.choices || []).some((c) => c.id === choiceId)) {
    return NextResponse.json({ error: "Unknown choice." }, { status: 400 });
  }
  const correct = isCorrect(cp, { submittedChoiceId: choiceId });
  const fb = (serverCase.feedback && serverCase.feedback[checkpointId]) || {};
  return NextResponse.json({
    correct,
    feedback: correct ? fb.yes || "Yes! That’s it." : fb.hint || "Not quite — look at your chart again and try another.",
  });
}
