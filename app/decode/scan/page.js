import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readProgress } from "../../../lib/cleardecodeServer";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import ScanClient from "../../../components/cleardecode/ScanClient";

export const dynamic = "force-dynamic";

export default async function ScanPage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const { row } = await readProgress(studentId);
  if (!row || !(row.scan && row.scan.pending)) redirect("/decode");
  const { data: student } = await supabaseAdmin.from("students").select("equipped_sam_skin").eq("id", studentId).maybeSingle();
  return <ScanClient initialTested={row.scan.tested || {}} skin={(student && student.equipped_sam_skin) || null} />;
}
