import MissionPlannerClient from "./MissionPlannerClient";

export const metadata = { title: "This Week · CI2.0 Concept" };

// Version C of the teacher "This Week" planner: mission map + SAM-led
// planning. Same foundation as Version B (lib/v2/usePlanner.js).
export default function Page() {
  return <MissionPlannerClient />;
}
