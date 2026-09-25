import { NextResponse } from "next/server";
import { getSimulationLabServerCase } from "../../../../lib/cases/simulation-lab/index.server";
import { getSimulationLabPublicCase } from "../../../../lib/cases/simulation-lab/index.public";
import { scoreSubmission } from "../../../../lib/simulationLabScoring";

// DEV-ONLY: scores a Simulation Lab submission body exactly like
// /api/simulation-lab/submit (same shared scoring), but writes nothing and
// skips the AI read. Used by the /simulation-lab/dev harness. 404 on production.
export async function POST(request) {
  if (process.env.VERCEL_ENV === "production") return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await request.json();
  const serverCase = getSimulationLabServerCase(body.caseStandard);
  const publicCase = getSimulationLabPublicCase(body.caseStandard);
  if (!serverCase || !publicCase) return NextResponse.json({ error: "Unknown case" }, { status: 400 });
  const scored = scoreSubmission(serverCase, publicCase, body);
  return NextResponse.json({ success: true, cleanRun: scored.cleanRun, dev: true, scored, selfConfidence: body.selfConfidence || null, finalResponseText: body.finalResponseText });
}
