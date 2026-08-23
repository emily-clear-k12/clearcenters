"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Copy, Check, Printer } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  warning: "#FF9F43",
  success: "#22C55E",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

function generateClassCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += letters[Math.floor(Math.random() * letters.length)];
  code += "-";
  for (let i = 0; i < 4; i++) code += digits[Math.floor(Math.random() * digits.length)];
  return code;
}

function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

export default function MyClassesPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");

  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classCounts, setClassCounts] = useState({});
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [newClassName, setNewClassName] = useState("");
  const [newClassGrade, setNewClassGrade] = useState("5");
  const [newClassSubject, setNewClassSubject] = useState("Science");
  const [creatingClass, setCreatingClass] = useState(false);
  const [showNewClassForm, setShowNewClassForm] = useState(false);

  const [roster, setRoster] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [studentStatus, setStudentStatus] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [newStudentName, setNewStudentName] = useState("");
  const [addingStudent, setAddingStudent] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  const loadClasses = useCallback(async () => {
    if (!teacherId) return;
    setLoadingClasses(true);
    const { data } = await supabase.from("classes").select("*").eq("teacher_id", teacherId).order("created_at");
    const list = data || [];
    setClasses(list);

    if (list.length > 0) {
      const { data: allStudents } = await supabase.from("students").select("class_id").in("class_id", list.map((c) => c.id));
      const counts = {};
      (allStudents || []).forEach((s) => { counts[s.class_id] = (counts[s.class_id] || 0) + 1; });
      setClassCounts(counts);
    }

    setSelectedClassId((prev) => prev || (list.length > 0 ? list[0].id : null));
    setLoadingClasses(false);
  }, [teacherId]);

  useEffect(() => { if (teacherId) loadClasses(); }, [teacherId, loadClasses]);

  const loadClassDetails = useCallback(async () => {
    if (!selectedClassId) {
      setRoster([]);
      setAssignments([]);
      setStudentStatus({});
      return;
    }
    setLoadingStatus(true);

    const { data: students } = await supabase.from("students").select("*").eq("class_id", selectedClassId).order("first_name");
    const rosterList = students || [];
    setRoster(rosterList);

    const { data: assigned } = await supabase
      .from("assignments")
      .select("id, due_date, case_standard, created_at, cases(title)")
      .eq("class_id", selectedClassId)
      .order("created_at", { ascending: false });
    const assignmentList = assigned || [];

    const assignmentIds = assignmentList.map((a) => a.id);
    let submissions = [];
    let targetRows = [];
    if (assignmentIds.length > 0) {
      const { data: subs } = await supabase.from("submissions").select("student_id, assignment_id, submitted_at, teacher_grade").in("assignment_id", assignmentIds);
      submissions = subs || [];
      const { data: targets } = await supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds);
      targetRows = targets || [];
    }

    // Map each assignment to the set of students it actually applies to —
    // every student in the roster if whole-class, or just the targeted
    // ones if this assignment was narrowed down.
    const targetsByAssignment = {};
    targetRows.forEach((t) => {
      if (!targetsByAssignment[t.assignment_id]) targetsByAssignment[t.assignment_id] = new Set();
      targetsByAssignment[t.assignment_id].add(t.student_id);
    });
    function applicableStudentIds(assignmentId) {
      const targetSet = targetsByAssignment[assignmentId];
      if (!targetSet || targetSet.size === 0) return rosterList.map((s) => s.id); // whole class
      return [...targetSet];
    }

    // Per-assignment completion count, for display alongside each assignment
    const assignmentsWithCompletion = assignmentList.map((a) => {
      const applicable = applicableStudentIds(a.id);
      const forA = submissions.filter((s) => s.assignment_id === a.id && applicable.includes(s.student_id));
      const isTargeted = !!(targetsByAssignment[a.id] && targetsByAssignment[a.id].size > 0);
      return { ...a, submittedCount: forA.filter((s) => s.submitted_at).length, rosterSize: applicable.length, isTargeted };
    });
    setAssignments(assignmentsWithCompletion);

    // Per-student status — only count assignments that actually apply to
    // this specific student (whole-class ones, or ones they were targeted for).
    const status = {};
    rosterList.forEach((st) => {
      const applicableAssignments = assignmentList.filter((a) => applicableStudentIds(a.id).includes(st.id));
      const theirs = submissions.filter((s) => s.student_id === st.id);
      const startedAssignmentIds = new Set(theirs.map((s) => s.assignment_id));
      const needsReview = theirs.filter((s) => s.submitted_at && (s.teacher_grade === null || s.teacher_grade === undefined)).length;
      const submitted = theirs.filter((s) => s.submitted_at).length;
      const notStarted = applicableAssignments.filter((a) => !startedAssignmentIds.has(a.id)).length;
      status[st.id] = { needsReview, submitted, notStarted, total: applicableAssignments.length };
    });
    setStudentStatus(status);
    setLoadingStatus(false);
  }, [selectedClassId]);

  useEffect(() => { loadClassDetails(); }, [selectedClassId, loadClassDetails]);

  async function handleCreateClass(e) {
    e.preventDefault();
    if (!newClassName.trim()) return;
    setCreatingClass(true);
    setError(null);
    const code = generateClassCode();
    const { data, error: insertError } = await supabase
      .from("classes")
      .insert({ teacher_id: teacherId, name: newClassName.trim(), class_code: code, grade: parseInt(newClassGrade), subject: newClassSubject })
      .select()
      .single();
    setCreatingClass(false);
    if (insertError) { setError("Couldn't create the class: " + insertError.message); return; }
    setNewClassName("");
    setShowNewClassForm(false);
    setClasses((prev) => [...prev, data]);
    setSelectedClassId(data.id);
  }

  async function handleAddStudent(e) {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClassId) return;
    setAddingStudent(true);
    setError(null);
    const pin = generatePin();
    const { error: insertError } = await supabase.from("students").insert({ class_id: selectedClassId, first_name: newStudentName.trim(), pin });
    setAddingStudent(false);
    if (insertError) { setError("Couldn't add student: " + insertError.message); return; }
    setNewStudentName("");
    loadClassDetails();
    loadClasses();
  }

  function copyClassCode(code) {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  }

  const selectedClass = classes.find((c) => c.id === selectedClassId);
  const classNeedsReview = Object.values(studentStatus).reduce((sum, s) => sum + s.needsReview, 0);
  const classNotStarted = Object.values(studentStatus).reduce((sum, s) => sum + s.notStarted, 0);

  if (loadingAuth || loadingClasses) {
    return <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <TeacherSidebar teacherEmail={teacherEmail} />

      <div style={{ flex: 1, padding: "32px 36px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1080 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: 0, color: COLORS.textDark }}>My Classes</h1>
            {selectedClassId && (
              <button onClick={() => router.push(`/teacher/assign/new?classId=${selectedClassId}`)} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Plus size={16} /> New Assignment
              </button>
            )}
          </div>

          {error && <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}

          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 10 }}>MY CLASSES</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {classes.map((c) => {
                const isSelected = c.id === selectedClassId;
                return (
                  <button
                    key={c.id}
                    className="gc-btn"
                    onClick={() => setSelectedClassId(c.id)}
                    style={{ background: COLORS.white, border: isSelected ? `2px solid ${COLORS.violet}` : `1px solid ${COLORS.border}`, boxShadow: isSelected ? "0 4px 16px rgba(123,93,255,.15)" : "0 2px 8px rgba(13,27,42,.05)", borderRadius: 14, padding: "12px 18px", textAlign: "left", minWidth: 180 }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>
                      {c.grade ? `${c.grade === 3 ? "3rd" : c.grade + "th"} Grade ${c.subject} · ` : ""}{classCounts[c.id] || 0} students · {c.class_code}
                    </div>
                  </button>
                );
              })}
              <button className="gc-btn" onClick={() => setShowNewClassForm(!showNewClassForm)} style={{ background: COLORS.white, border: `2px dashed ${COLORS.border}`, borderRadius: 14, padding: "12px 18px", color: COLORS.violet, fontWeight: 700, fontSize: 13, minWidth: 140, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Plus size={15} /> New Class
              </button>
            </div>

            {showNewClassForm && (
              <form onSubmit={handleCreateClass} style={{ display: "flex", gap: 8, marginTop: 12, maxWidth: 560, flexWrap: "wrap" }}>
                <input autoFocus value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="e.g. 5th Grade Science, Period 3" style={{ flex: 1, minWidth: 180, border: `2px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box" }} />
                <select value={newClassGrade} onChange={(e) => setNewClassGrade(e.target.value)} style={{ border: `2px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                  <option value="3">3rd Grade</option><option value="4">4th Grade</option><option value="5">5th Grade</option>
                </select>
                <select value={newClassSubject} onChange={(e) => setNewClassSubject(e.target.value)} style={{ border: `2px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                  <option value="Science">Science</option><option value="Social Studies">Social Studies</option><option value="Math">Math</option><option value="ELAR">ELAR</option>
                </select>
                <button type="submit" disabled={creatingClass} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 10, padding: "0 18px", fontWeight: 700, fontSize: 13.5 }}>{creatingClass ? "Creating..." : "Create"}</button>
              </form>
            )}
          </div>

          {selectedClass && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: COLORS.textMuted, fontSize: 13 }}>
              Class Code for <strong style={{ color: COLORS.textDark }}>{selectedClass.name}</strong>: <strong style={{ color: COLORS.violet }}>{selectedClass.class_code}</strong>
              <button onClick={() => copyClassCode(selectedClass.class_code)} className="gc-btn" style={{ background: COLORS.violetSoft, border: "none", borderRadius: 8, padding: "4px 8px", color: COLORS.violet, display: "flex", alignItems: "center", gap: 4 }}>
                {copiedCode ? <Check size={13} /> : <Copy size={13} />} {copiedCode ? "Copied" : "Copy"}
              </button>
              <button onClick={() => router.push(`/teacher/assign/display?classId=${selectedClass.id}`)} className="gc-btn" style={{ background: COLORS.violet, border: "none", borderRadius: 8, padding: "4px 10px", color: COLORS.white, fontWeight: 700 }}>
                Present to Class
              </button>
              <button onClick={() => window.open(`/teacher/roster/${selectedClass.id}`, "_blank")} className="gc-btn" style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "4px 10px", color: COLORS.textDark, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                <Printer size={13} /> Print Roster
              </button>
            </div>
          )}

          {classes.length === 0 ? (
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 24, maxWidth: 460, margin: "20px auto", textAlign: "center" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Create your first class</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 16 }}>This generates a real class code your students will use to log in.</p>
              <form onSubmit={handleCreateClass}>
                <input value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="e.g. 5th Grade Science" style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <select value={newClassGrade} onChange={(e) => setNewClassGrade(e.target.value)} style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                    <option value="3">3rd Grade</option><option value="4">4th Grade</option><option value="5">5th Grade</option>
                  </select>
                  <select value={newClassSubject} onChange={(e) => setNewClassSubject(e.target.value)} style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                    <option value="Science">Science</option><option value="Social Studies">Social Studies</option><option value="Math">Math</option><option value="ELAR">ELAR</option>
                  </select>
                </div>
                <button type="submit" disabled={creatingClass} className="gc-btn" style={{ width: "100%", background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>{creatingClass ? "Creating..." : "Create Class"}</button>
              </form>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: classNeedsReview > 0 ? "#FFF4E5" : COLORS.white, border: `1px solid ${classNeedsReview > 0 ? COLORS.warning : COLORS.border}`, borderRadius: 14, padding: 16, textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: classNeedsReview > 0 ? "#B8860B" : COLORS.textDark }}>{classNeedsReview}</div>
                    <div style={{ fontSize: 11.5, color: COLORS.textMuted, fontWeight: 600 }}>Need Review</div>
                  </div>
                  <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 16, textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{classNotStarted}</div>
                    <div style={{ fontSize: 11.5, color: COLORS.textMuted, fontWeight: 600 }}>Not Yet Started</div>
                  </div>
                </div>

                <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Assigned Cases</div>
                  {assignments.length > 0 ? (
                    <div style={{ display: "grid", gap: 6 }}>
                      {assignments.map((a) => (
                        <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}` }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                            <img src={caseImagePath(a.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 600 }}>{a.cases?.title || a.case_standard}</div>
                            <div style={{ fontSize: 10.5, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                              {a.due_date ? `Due ${a.due_date}` : "No due date"}
                              <span style={{ fontWeight: 700, color: a.isTargeted ? COLORS.violet : COLORS.teal }}>
                                · {a.isTargeted ? `${a.rosterSize} student${a.rosterSize === 1 ? "" : "s"}` : "Whole Class"}
                              </span>
                            </div>
                          </div>
                          <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 700 }}>{a.submittedCount} / {a.rosterSize}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "12px 0" }}>Nothing assigned to this class yet.</div>
                  )}
                </div>

                <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Add a Student</div>
                  <form onSubmit={handleAddStudent} style={{ display: "flex", gap: 8 }}>
                    <input value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="First name" style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px", fontSize: 13, boxSizing: "border-box" }} />
                    <button type="submit" disabled={addingStudent} className="gc-btn" style={{ background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 10, padding: "0 14px", fontWeight: 700, fontSize: 12.5, display: "flex", alignItems: "center", gap: 4 }}>
                      <Plus size={14} /> Add
                    </button>
                  </form>
                  <p style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8 }}>A random 4-digit PIN is generated automatically for each student.</p>
                </div>
              </div>

              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Class Roster ({roster.length}) — Status</div>
                <div style={{ display: "grid", gap: 4, maxHeight: 520, overflowY: "auto" }}>
                  {roster.map((s) => {
                    const status = studentStatus[s.id] || { needsReview: 0, submitted: 0, notStarted: 0, total: 0 };
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => router.push(`/teacher/students/${s.id}`)}
                        className="gc-btn"
                        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", background: "none", border: "none", borderBottom: `1px solid ${COLORS.border}`, width: "100%", textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit" }}
                      >
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 13, flexShrink: 0 }}>{s.first_name[0]}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{s.first_name}</div>
                          <div style={{ fontSize: 10.5, color: COLORS.textMuted, fontFamily: "monospace" }}>PIN: {s.pin}</div>
                        </div>
                        {loadingStatus ? (
                          <span style={{ fontSize: 11, color: COLORS.textMuted }}>...</span>
                        ) : status.needsReview > 0 ? (
                          <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "#FFF4E5", color: "#B8860B" }}>{status.needsReview} to review</span>
                        ) : status.notStarted > 0 ? (
                          <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: COLORS.cream, color: COLORS.textMuted }}>{status.notStarted} not started</span>
                        ) : status.total > 0 ? (
                          <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: COLORS.tealSoft, color: COLORS.teal }}>All caught up</span>
                        ) : (
                          <span style={{ fontSize: 10.5, color: COLORS.textMuted }}>No assignments yet</span>
                        )}
                      </button>
                    );
                  })}
                  {roster.length === 0 && <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: 12 }}>No students yet — add your first one on the left.</div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
