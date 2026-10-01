import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readProgress } from "../../../lib/clearcodeServer";
import ScanClient from "../../../components/clearcode/ScanClient";

export const dynamic = "force-dynamic";

export default async function ScanPage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const { row } = await readProgress(studentId);
  if (!row || !(row.scan && row.scan.pending)) redirect("/code");
  return <ScanClient initialTested={row.scan.tested || {}} />;
}
