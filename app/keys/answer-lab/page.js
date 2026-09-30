import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AnswerLabClient from "./AnswerLabClient";

// ClearKeys Answer Lab (Sept 29, 2026): editing drills + timed short answers.
export default function AnswerLabPage() {
  if (!cookies().get("cc_student_id")?.value) redirect("/login");
  return <AnswerLabClient />;
}
