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

  // Badges moved here from Home as part of the Crystal Vault merge (Aug 27,
  // 2026) — this page now covers both spending crystal points AND seeing
  // the badge tiers they unlock. Badge tiers are teacher-editable (see
  // /teacher/badges), so they live in the database rather than being
  // hardcoded here.
  const { data: badgeTiers } = await supabaseAdmin
    .from("badge_tiers")
    .select("*")
    .order("sort_order");

  return (
    <GearLockerClient
      student={student}
      shopItems={shopItems || []}
      inventory={inventory || []}
      badgeTiers={badgeTiers || []}
    />
  );
}
