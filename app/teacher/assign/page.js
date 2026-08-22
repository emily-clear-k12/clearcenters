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

export default function TeacherAssignPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);

  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [newClassName, setNewClassName] = useState("");
  const [creatingClass, setCreatingClass] = useState(false);

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
    const { data } = await supabase.from("classes").select("*").eq("teacher_id", teacherId).order("created_at");
    setClasses(data || []);
    if (data && data.length > 0 && !selectedClassId) {
      setSelectedClassId(data[0].id);
    }
  }, [teacherId, selectedClassId]);

  useEffect(() => {
    if (teacherId) loadClasses();
  }, [teacherId, loadClasses]);

  useEffect(() => {
    supabase
      .from("cases")
      .select("standard, title")
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
      .insert({ teacher_id: teacherId, name: newClassName.trim(), class_code: code })
      .select()
      .single();
    setCreatingClass(false);
    if (insertError) {
      setError("Couldn't create the class: " + insertError.message);
      return;
    }
    setNewClassName("");
    setClasses([...classes, data]);
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
  }

  function copyClassCode(code) {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  }

  const filteredCases = cases.filter(
    (c) => c.title.toLowerCase().includes(caseSearch.toLowerCase()) || c.standard.toLowerCase().includes(caseSearch.toLowerCase())
  );
  const selectedClass = classes.find((c) => c.id === selectedClassId);

  if (loadingAuth) {
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
        <div style={{ marginRight: "auto" }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.white, fontWeight: 700, fontSize: 17 }}>
            {selectedClass ? selectedClass.name : "ClearCenters HQ · Teacher"}
          </div>
          {selectedClass && (
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6 }}>
              {roster.length} students · Class Code: <strong style={{ color: COLORS.white }}>{selectedClass.class_code}</strong>
              <button onClick={() => copyClassCode(selectedClass.class_code)} className="gc-btn" style={{ background: "none", padding: 2, color: "rgba(255,255,255,.7)" }}>
                {copiedCode ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          )}
        </div>
        {classes.length > 1 && (
          <select value={selectedClassId || ""} onChange={(e) => setSelectedClassId(e.target.value)} style={{ borderRadius: 8, padding: "6px 10px", fontSize: 13, marginRight: 10 }}>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
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

          {classes.length === 0 ? (
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 24, maxWidth: 460, margin: "40px auto", textAlign: "center" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Create your first class</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 16 }}>This generates a real class code your students will use to log in.</p>
              <form onSubmit={handleCreateClass}>
                <input
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. 5th Grade Science"
                  style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14, boxSizing: "border-box", marginBottom: 12 }}
                />
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
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{c.standard} · Group Chat</div>
                          </div>
                        </button>
                      );
                    })}
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
