import { redirect } from "next/navigation";

export const metadata = { title: "Check-ins · CI2.0" };

/** Legacy path — redirect to user-facing Check-ins URL. */
export default function Page() {
  redirect("/v2/teacher/check-ins");
}
