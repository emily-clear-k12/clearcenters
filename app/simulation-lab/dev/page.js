import { notFound } from "next/navigation";
import { getSimulationLabPublicCase } from "../../../lib/cases/simulation-lab/index.public";
import DevHarness from "./DevHarness";

// DEV-ONLY harness for the scene-based Simulation Lab: renders the real
// student component for any case with mock props and no login, so the flow
// can be tested on a local dev server or a Vercel PREVIEW deploy. Saving is
// faked and "submit" is scored by /api/simulation-lab/dev-score (same
// scoring code as the real route, but nothing is written to the database
// and no AI call is made). 404s on production.
//   /simulation-lab/dev?case=3.8B-SL      (optional &rm=1 for reduced motion)
export const dynamic = "force-dynamic";

const STANDARDS = ["3.6A-SL", "3.6C-SL", "3.7A-SL", "3.7B-SL", "3.8A-SL", "3.8B-SL", "4.6B-SL", "4.7-SL", "4.8B-SL", "4.8C-SL", "4.9A-SL", "5.6C-SL", "5.7A-SL", "5.7B-SL", "5.8B-SL", "5.9-SL", "SS.3.6A-SL", "SS.4.7A-SL", "SS.5.11B-SL", "MA.5.8C-SL"];

export default function SimLabDevPage({ searchParams }) {
  if (process.env.VERCEL_ENV === "production") notFound();
  const standard = (searchParams && searchParams.case) || null;
  const publicCase = standard ? getSimulationLabPublicCase(standard) : null;
  if (!publicCase) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: 32 }}>
        <h1>Simulation Lab dev harness</h1>
        <p>Not a student page. Pick a case (progress is kept in this browser; add &amp;fresh=1 to start over):</p>
        <ul>
          {STANDARDS.map((s) => (
            <li key={s} style={{ margin: "8px 0" }}>
              <a href={`/simulation-lab/dev?case=${s}&fresh=1`}>{s} — {(getSimulationLabPublicCase(s) || {}).title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <DevHarness standard={standard} publicCase={publicCase} submitted={searchParams.submitted === "1"} skin={searchParams.skin || null} />;
}
