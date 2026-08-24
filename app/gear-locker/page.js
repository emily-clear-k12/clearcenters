import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import GearLockerClient from "./GearLockerClient";

export default async function GearLockerPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const { data: shopItems } = await supabaseAdmin
    .from("shop_items")
    .select("id, name, slot_key, price, image_url")
    .order("slot_key")
    .order("price");

  const { data: inventory } = await supabaseAdmin
    .from("student_inventory")
    .select("item_id, equipped")
    .eq("student_id", studentId);

  return (
    <GearLockerClient
      student={student}
      shopItems={shopItems || []}
      inventory={inventory || []}
    />
  );
}
