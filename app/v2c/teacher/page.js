import ConceptPlannerClient from "./ConceptPlannerClient";

export const metadata = { title: "This Week · CI2.0 Concept" };

// Version C of the teacher "This Week" planner. Uses the same foundation as
// Version B (lib/v2/usePlanner.js); only the design is different.
export default function Page() {
  return <ConceptPlannerClient />;
}
