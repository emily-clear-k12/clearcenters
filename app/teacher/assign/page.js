"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Calendar, Copy, Check } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";

const COLORS = {
  navy: "#16243F",
  deepNavy: "#1B2D4D",
  slate: "#2A3E63",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
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
  return `/cases/${standard.replace(".", "-")}.jpg`;
}

export default function TeacherAssignPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);

  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classCounts, setClassCounts] = useState({});
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [newClassName, setNewClassName] = useState("");
  const [newClassGrade, setNewClassGrade] = useState("5");
  const [newClassSubject, setNewClassSubject] = useState("Science");
  const [creatingClass, setCreatingClass] = useState(false);
  const [showNewClassForm, setShowNewClassForm] = useState(false);

  const [cases, setCases] = useState([]);
  const [caseSearch, setCaseSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [assignments, setAssignments] = useState([]);

  const [roster, setRoster] = useState([]);
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
      const { data: allStudents } = await supabase
        .from("students")
        .select("class_id")
        .in("class_id", list.map((c) => c.id));
      const counts = {};
      (allStudents || []).forEach((s) => {
        counts[s.class_id] = (counts[s.class_id] || 0) + 1;
      });
      setClassCounts(counts);
    }

    setSelectedClassId((prev) => prev || (list.length > 0 ? list[0].id : null));
    setLoadingClasses(false);
  }, [teacherId]);

  useEffect(() => {
    if (teacherId) loadClasses();
  }, [teacherId, loadClasses]);

  useEffect(() => {
    supabase
      .from("cases")
      .select("standard, title, grade, subject")
      .then(({ data }) => setCases(data || []));
  }, []);

  const loadClassDetails = useCallback(async () => {
    if (!selectedClassId) {
      setRoster([]);
      setAssignments([]);
      return;
    }
    const { data: students } = await supabase.from("students").select("*").eq("class_id", selectedClassId).order("first_name");
    setRoster(students || []);

    const { data: assigned } = await supabase
      .from("assignments")
      .select("id, due_date, case_standard, cases(title)")
      .eq("class_id", selectedClassId)
      .order("created_at", { ascending: false });
    setAssignments(assigned || []);
  }, [selectedClassId]);

  useEffect(() => {
    loadClassDetails();
  }, [selectedClassId, loadClassDetails]);

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
    if (insertError) {
      setError("Couldn't create the class: " + insertError.message);
      return;
    }
    setNewClassName("");
    setShowNewClassForm(false);
    setClasses((prev) => [...prev, data]);
    setSelectedClassId(data.id);
  }

  async function handleAssign() {
    if (!selectedCase || !selectedClassId) return;
    setAssigning(true);
    setError(null);
    const { error: insertError } = await supabase.from("assignments").insert({
      class_id: selectedClassId,
      case_standard: selectedCase.standard,
      due_date: dueDate || null,
    });
    setAssigning(false);
    if (insertError) {
      setError("Couldn't assign the case: " + insertError.message);
      return;
    }
    setSelectedCase(null);
    setDueDate("");
    loadClassDetails();
  }

  async function handleAddStudent(e) {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClassId) return;
    setAddingStudent(true);
    setError(null);
    const pin = generatePin();
    const { error: insertError } = await supabase.from("students").insert({
      class_id: selectedClassId,
      first_name: newStudentName.trim(),
      pin,
    });
    setAddingStudent(false);
    if (insertError) {
      setError("Couldn't add student: " + insertError.message);
      return;
    }
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
  const filteredCases = cases.filter(
    (c) =>
      (!selectedClass || (c.grade === selectedClass.grade && c.subject === selectedClass.subject)) &&
      (c.title.toLowerCase().includes(caseSearch.toLowerCase()) || c.standard.toLowerCase().includes(caseSearch.toLowerCase()))
  );

  if (loadingAuth || loadingClasses) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.deepNavy} 100%)`, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <div style={{ background: COLORS.slate, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.white, fontWeight: 700, fontSize: 17, marginRight: "auto" }}>
          ClearCenters HQ · Teacher
        </div>
        <button onClick={() => router.push("/teacher")} className="gc-btn" style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5, marginRight: 8 }}>
          Dashboard
        </button>
        <button onClick={() => router.push("/teacher/grade")} className="gc-btn" style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5, marginRight: 8 }}>
          Review Submissions
        </button>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.push("/login"); }}
          className="gc-btn"
          style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5 }}
        >
          Log Out
        </button>
      </div>

      <div style={{ padding: "20px 20px 40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1080 }}>
          {error && (
            <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", letterSpacing: 0.5, marginBottom: 10 }}>MY CLASSES</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {classes.map((c) => {
                const isSelected = c.id === selectedClassId;
                return (
                  <button
                    key={c.id}
                    className="gc-btn"
                    onClick={() => setSelectedClassId(c.id)}
                    style={{
                      background: isSelected ? COLORS.white : "rgba(255,255,255,.08)",
                      border: isSelected ? `2px solid ${COLORS.violet}` : "2px solid transparent",
                      borderRadius: 14,
                      padding: "12px 18px",
                      textAlign: "left",
                      minWidth: 180,
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 14, color: isSelected ? COLORS.textDark : COLORS.white, marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 11.5, color: isSelected ? COLORS.textMuted : "rgba(255,255,255,.6)" }}>
                      {c.grade ? `${c.grade === 3 ? "3rd" : c.grade + "th"} Grade ${c.subject} · ` : ""}{classCounts[c.id] || 0} students · {c.class_code}
                    </div>
                  </button>
                );
              })}
              <button
                className="gc-btn"
                onClick={() => setShowNewClassForm(!showNewClassForm)}
                style={{ background: "rgba(255,255,255,.08)", border: "2px dashed rgba(255,255,255,.3)", borderRadius: 14, padding: "12px 18px", color: COLORS.white, fontWeight: 700, fontSize: 13, minWidth: 140, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              >
                <Plus size={15} /> New Class
              </button>
            </div>

            {showNewClassForm && (
              <form onSubmit={handleCreateClass} style={{ display: "flex", gap: 8, marginTop: 12, maxWidth: 560, flexWrap: "wrap" }}>
                <input
                  autoFocus
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. 5th Grade Science, Period 3"
                  style={{ flex: 1, minWidth: 180, border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box" }}
                />
                <select value={newClassGrade} onChange={(e) => setNewClassGrade(e.target.value)} style={{ border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                  <option value="3">3rd Grade</option>
                  <option value="4">4th Grade</option>
                  <option value="5">5th Grade</option>
                </select>
                <select value={newClassSubject} onChange={(e) => setNewClassSubject(e.target.value)} style={{ border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Math">Math</option>
                  <option value="ELAR">ELAR</option>
                </select>
                <button type="submit" disabled={creatingClass} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 10, padding: "0 18px", fontWeight: 700, fontSize: 13.5 }}>
                  {creatingClass ? "Creating..." : "Create"}
                </button>
              </form>
            )}
          </div>

          {selectedClass && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: "rgba(255,255,255,.75)", fontSize: 13 }}>
              Class Code for <strong style={{ color: COLORS.white }}>{selectedClass.name}</strong>: <strong style={{ color: COLORS.white }}>{selectedClass.class_code}</strong>
              <button onClick={() => copyClassCode(selectedClass.class_code)} className="gc-btn" style={{ background: "rgba(255,255,255,.1)", border: "none", borderRadius: 8, padding: "4px 8px", color: "rgba(255,255,255,.9)", display: "flex", alignItems: "center", gap: 4 }}>
                {copiedCode ? <Check size={13} /> : <Copy size={13} />} {copiedCode ? "Copied" : "Copy"}
              </button>
            </div>
          )}

          {classes.length === 0 ? (
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 24, maxWidth: 460, margin: "20px auto", textAlign: "center" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Create your first class</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 16 }}>This generates a real class code your students will use to log in.</p>
              <form onSubmit={handleCreateClass}>
                <input
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. 5th Grade Science"
                  style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", marginBottom: 10 }}
                />
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <select value={newClassGrade} onChange={(e) => setNewClassGrade(e.target.value)} style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                    <option value="3">3rd Grade</option>
                    <option value="4">4th Grade</option>
                    <option value="5">5th Grade</option>
                  </select>
                  <select value={newClassSubject} onChange={(e) => setNewClassSubject(e.target.value)} style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                    <option value="Science">Science</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Math">Math</option>
                    <option value="ELAR">ELAR</option>
                  </select>
                </div>
                <button type="submit" disabled={creatingClass} className="gc-btn" style={{ width: "100%", background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                  {creatingClass ? "Creating..." : "Create Class"}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>1. Choose a case</div>
                  <div style={{ position: "relative", marginBottom: 12 }}>
                    <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: COLORS.textMuted }} />
                    <input
                      value={caseSearch}
                      onChange={(e) => setCaseSearch(e.target.value)}
                      placeholder="Search by title or standard..."
                      style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ display: "grid", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                    {filteredCases.map((c) => {
                      const isSelected = selectedCase && selectedCase.standard === c.standard;
                      return (
                        <button
                          key={c.standard}
                          className="gc-btn"
                          onClick={() => setSelectedCase(c)}
                          style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left", background: isSelected ? COLORS.violetSoft : COLORS.cream, border: isSelected ? `2px solid ${COLORS.violet}` : "2px solid transparent", borderRadius: 12, padding: "10px 12px" }}
                        >
                          <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                            <img src={caseImagePath(c.standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{c.standard} · {c.grade}th Grade {c.subject}</div>
                          </div>
                        </button>
                      );
                    })}
                    {filteredCases.length === 0 && (
                      <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: 16 }}>
                        No {selectedClass ? `${selectedClass.grade}th Grade ${selectedClass.subject}` : ""} cases yet — check back once they're added!
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>2. Due date (optional)</div>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <Calendar size={14} style={{ position: "absolute", left: 10, top: 11, color: COLORS.textMuted }} />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                  <button className="gc-btn" onClick={handleAssign} disabled={!selectedCase || assigning} style={{ width: "100%", background: selectedCase ? COLORS.violet : "#D8D4E8", color: COLORS.white, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                    {assigning ? "Assigning..." : "Assign Case →"}
                  </button>
                </div>

                {assignments.length > 0 && (
                  <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Assigned so far</div>
                    <div style={{ display: "grid", gap: 6 }}>
                      {assignments.map((a) => (
                        <div key={a.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "6px 0", borderBottom: "1px solid #F3F1FA" }}>
                          <span>{a.cases?.title || a.case_standard}</span>
                          <span style={{ color: COLORS.textMuted }}>{a.due_date ? `Due ${a.due_date}` : "No due date"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Add a Student</div>
                  <form onSubmit={handleAddStudent} style={{ display: "flex", gap: 8 }}>
                    <input
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      placeholder="First name"
                      style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px", fontSize: 13, boxSizing: "border-box" }}
                    />
                    <button type="submit" disabled={addingStudent} className="gc-btn" style={{ background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 10, padding: "0 14px", fontWeight: 700, fontSize: 12.5, display: "flex", alignItems: "center", gap: 4 }}>
                      <Plus size={14} /> Add
                    </button>
                  </form>
                  <p style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8 }}>A random 4-digit PIN is generated automatically for each student.</p>
                </div>

                <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)", flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>Class Roster ({roster.length})</div>
                  <div style={{ display: "grid", gap: 6, maxHeight: 380, overflowY: "auto" }}>
                    {roster.map((s) => (
                      <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: COLORS.cream, borderRadius: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{s.first_name}</span>
                        <span style={{ fontSize: 12.5, color: COLORS.textMuted, fontFamily: "monospace" }}>PIN: {s.pin}</span>
                      </div>
                    ))}
                    {roster.length === 0 && <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: 12 }}>No students yet — add your first one above.</div>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
