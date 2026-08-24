import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Buys one Gear Locker item for the logged-in student. All of the actual
// rules (enough points? already owned? swap out whatever else was equipped
// in that slot?) live in the purchase_item() Postgres function so this stays
// a thin, safe wrapper — see the Supabase migration for the function body.
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

  const { data, error } = await supabaseAdmin.rpc("purchase_item", {
    p_student_id: studentId,
    p_item_id: itemId,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // purchase_item() returns a single row like { success, message }.
  const result = Array.isArray(data) ? data[0] : data;
  if (!result || !result.success) {
    return NextResponse.json({ error: result?.message || "Couldn't complete purchase." }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
