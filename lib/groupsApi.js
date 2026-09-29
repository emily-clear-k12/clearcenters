"use client";
// Small groups — Sept 29, 2026. The browser side of /api/teacher/groups.
// Also loads one teacher's gradebook rows, the same way the Gradebook page
// does, so the group pages measure progress from the same book.

import { supabase } from "./supabaseClient";

export async function groupsApi(action, payload = {}) {
  const { data } = await supabase.auth.getSession();
  const accessToken = data?.session?.access_token;
  if (!accessToken) throw new Error("Your session expired. Refresh the page and try again.");
  const res = await fetch("/api/teacher/groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, accessToken, ...payload }),
  });
  let json = {};
  try { json = await res.json(); } catch {}
  if (!res.ok) throw new Error(json.error || "Something went wrong. Try again.");
  return json;
}

// Same rows as app/teacher/gradebook/page.js loads, for every class the
// teacher has. Feed the result to buildGradebook.
export async function loadTeacherBook(teacherId) {
  let classQuery = await supabase.from("classes").select("id, name, subject, grade").eq("teacher_id", teacherId).order("name");
  const { data: classes, error } = classQuery;
  if (error) throw new Error("Couldn't load your classes. Refresh and try again.");
  const classIds = (classes || []).map((c) => c.id);
  if (!classIds.length) return { classes: [], students: [], assignments: [], targets: [], submissions: [], cases: [] };
  const [{ data: students }, { data: assignments }] = await Promise.all([
    supabase.from("students").select("*").in("class_id", classIds),
    supabase.from("assignments").select("id, case_standard, class_id, game_skin, due_date, created_at").in("class_id", classIds),
  ]);
  const assignmentIds = (assignments || []).map((a) => a.id);
  const standards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
  const [targetResult, submissionResult, caseResult] = await Promise.all([
    assignmentIds.length ? supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds) : { data: [] },
    assignmentIds.length ? supabase.from("submissions").select("id, student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested, self_confidence").in("assignment_id", assignmentIds) : { data: [] },
    standards.length ? supabase.from("cases").select("standard, title, engine, subject, learning_target").in("standard", standards) : { data: [] },
  ]);
  let caseRows = caseResult.data;
  if (caseResult.error) {
    const retry = await supabase.from("cases").select("standard, title, engine, subject").in("standard", standards);
    caseRows = retry.data;
  }
  return {
    classes: classes || [],
    students: students || [],
    assignments: assignments || [],
    targets: targetResult.data || [],
    submissions: submissionResult.data || [],
    cases: caseRows || [],
  };
}
