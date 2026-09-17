import ThisWeekClient from "./ThisWeekClient";

export const metadata = { title: "This Week · CI2.0" };

// CI2.0 teacher "This Week" — the 10-minute Monday screen.
// Prototype with pretend data (lib/v2/demoWeek.js) so the look and flow can
// be approved before it is connected to real unit plans and results.
export default function Page() {
  return <ThisWeekClient />;
}
