import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Switches which already-owned item is showing in its slot (e.g. the
// student owns two rugs and wants to swap which one is on the floor).
// No points change here — equip_item() just re-flags equipped=true/false
// within that item's slot for this student.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { itemId } = await request.json();
  if (!itemId) {
    return NextResponse.json({ error: "Missing itemId." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.rpc("equip_item", {
    p_student_id: studentId,
    p_item_id: itemId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
