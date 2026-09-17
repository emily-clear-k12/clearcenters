import { redirect } from "next/navigation";

// Retired layout option: the day-by-day planner at /v2/teacher was chosen.
export default function Page() {
  redirect("/v2/teacher");
}
