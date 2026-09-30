import { supabaseAdmin } from "./supabaseAdmin";

// SERVER ONLY. Reads a student's Fluency progress on its own, so pages keep
// working even before add_clearkeys_fluency.sql has been run (the column
// just reads as empty).
export async function readFluency(studentId) {
  try {
    const { data, error } = await supabaseAdmin.from("relay_station_progress").select("fluency").eq("student_id", studentId).maybeSingle();
    if (error) return { fluency: null, ready: false };
    return { fluency: (data && data.fluency) || null, ready: true };
  } catch (e) {
    return { fluency: null, ready: false };
  }
}
