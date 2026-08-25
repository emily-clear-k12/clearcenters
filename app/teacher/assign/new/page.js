"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Calendar, ChevronLeft } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import TeacherSidebar from "../../../../components/TeacherSidebar";

const COLORS = {
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

// Roster as of the Aug 2026 challenge-type consolidation: Model Makeover is
// now part of Repair Desk (visual/diagram fix mode), Short-Form Video
// Detective is now part of Fact-Check Desk (video/caption claim format), and
// You Be the Judge + Comment Section Challenge + Bracket Battle combined into
// Comment Court (a placeholder name, pending Emily's final pick). All of
// these still need real content authored before any go live, so they stay
// `real: false` ("Coming Soon") until then. Group Chat and Fact-Check Desk
// (branded "Signal Check" in the UI, engine "fact_check_desk") both have
// real pilot content now, so both are `real: true`.
const CHALLENGE_TYPES = [
  { key: "group_chat", label: "Group Chat", image: "/teacher/challenges/group_chat.jpg", real: true,
    description: "Students role-play as characters, concepts, or parts of a system in a live group chat, using evidence to prove what's really going on." },
  { key: "repair_desk", label: "Repair Desk", image: "/teacher/challenges/repair_desk.jpg", real: false,
    description: "A broken ticket arrives — a flawed diagram, model, or work sample. Students diagnose what's wrong, fix it, and explain the fix to whoever sent it in." },
  { key: "fact_check_desk", label: "Signal Check", image: "/teacher/challenges/fact_check_desk.jpg", real: true,
    description: "Students play a station Cadet, scanning Incoming Transmissions — headlines, data readouts, even recovered footage — for the truth before stamping a verdict: True, Misleading, or False." },
  { key: "museum_exhibit", label: "Museum Exhibit Builder", image: "/teacher/challenges/museum_exhibit.jpg", real: false,
    description: "Students curate a small exhibit from a pile of evidence — choosing the strongest items, rejecting at least one on purpose, and writing placards that explain why." },
  { key: "newsroom", label: "Newsroom", image: "/teacher/challenges/newsroom.jpg", real: false,
    description: "Students gather their own evidence from the scene, then build and produce a report — headline, script, and all — before it airs." },
  { key: "mission_map", label: "Mission Map", image: "/teacher/challenges/mission_map.jpg", real: false,
    description: "Students move through locked checkpoints, collecting clues, rejecting a tempting wrong answer, and building a reasoning chain to unlock the final response." },
  { key: "comment_court", label: "Comment Court", image: "/teacher/challenges/comment_court.jpg", real: false,
    description: "A disputed claim shows up as a messy comment thread. Students sort the noise, weigh the evidence, and either rule on the dispute or run it as a bracket when there's more than two sides." },
  { key: "simulation_lab", label: "Simulation Lab", image: "/teacher/challenges/simulation_lab.jpg", real: false,
    description: "Students adjust real variables with sliders and dials, watch the results happen live, and explain the pattern using data they generated themselves." },
  { key: "classification_lab", label: "Classification Lab", image: "/teacher/challenges/classification_lab.jpg", real: false,
    description: "Items come down a conveyor belt. Students sort them into the correct bins, then justify one deliberately tricky case in writing." },
  { key: "territory_builder", label: "Territory Builder", image: "/teacher/challenges/territory_builder.jpg", real: false,
    description: "Students place things on an actual map — habitats, settlements, resources — and get feedback on whether the placement actually holds up." },
];

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

// A case's `engine` column tells us which challenge type it belongs to.
// Newsroom currently only ships Breaking News mode ("newsroom_bn"), but
// Field Report/Data Desk/Special Report will land as "newsroom_fr" etc.
// later — all of those should still show up under the one Newsroom tile.
function matchesChallenge(caseEngine, challengeKey) {
  if (!challengeKey) return false;
  if (challengeKey === "newsroom") return (caseEngine || "").startsWith("newsroom");
  return (caseEngine || "group_chat") === challengeKey;
}

function NewAssignmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const incomingClassId = searchParams.get("classId");

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [assignClassId, setAssignClassId] = useState(incomingClassId || null);
  const [error, setError] = useState(null);

  const [cases, setCases] = useState([]);
  const [caseSearch, setCaseSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  const [challengeStep, setChallengeStep] = useState("library");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [browseGrade, setBrowseGrade] = useState("5");
  const [browseSubject, setBrowseSubject] = useState("Science");

  const [roster, setRoster] = useState([]);
  const [targetMode, setTargetMode] = useState("whole"); // 'whole' | 'specific'
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  useEffect(() => {
    if (!teacherId) return;
    supabase.from("classes").select("*").eq("teacher_id", teacherId).order("created_at").then(({ data }) => setClasses(data || []));
  }, [teacherId]);

  useEffect(() => {
    if (!assignClassId) { setRoster([]); return; }
    supabase.from("students").select("id, first_name").eq("class_id", assignClassId).order("first_name").then(({ data }) => setRoster(data || []));
    setTargetMode("whole");
    setSelectedStudentIds([]);
  }, [assignClassId]);

  useEffect(() => {
    supabase.from("cases").select("standard, title, grade, subject, engine, learning_target, lesson_summary, misconception_note").then(({ data }) => setCases(data || []));
  }, []);

  const filteredCases = cases.filter(
    (c) => c.grade === parseInt(browseGrade) && c.subject === browseSubject &&
      matchesChallenge(c.engine, selectedChallenge?.key) &&
      (c.title.toLowerCase().includes(caseSearch.toLowerCase()) || c.standard.toLowerCase().includes(caseSearch.toLowerCase()))
  );

  const targetClass = classes.find((c) => c.id === assignClassId);

  function toggleStudentTarget(id) {
    setSelectedStudentIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleAssign() {
    if (!selectedCase || !assignClassId) return;
    if (targetMode === "specific" && selectedStudentIds.length === 0) {
      setError("Pick at least one student, or switch to Whole Class.");
      return;
    }
    setAssigning(true);
    setError(null);
    const { data: newAssignment, error: insertError } = await supabase
      .from("assignments")
      .insert({ class_id: assignClassId, case_standard: selectedCase.standard, due_date: dueDate || null })
      .select()
      .single();
    if (insertError) {
      setAssigning(false);
      setError("Couldn't assign the case: " + insertError.message);
      return;
    }

    if (targetMode === "specific") {
      const rows = selectedStudentIds.map((studentId) => ({ assignment_id: newAssignment.id, student_id: studentId }));
      const { error: targetError } = await supabase.from("assignment_students").insert(rows);
      if (targetError) {
        setAssigning(false);
        setError("Assigned, but couldn't save the student list: " + targetError.message);
        return;
      }
    }

    setAssigning(false);
    setAssignedSuccess(true);
  }

  function assignAnother() {
    setSelectedCase(null);
    setDueDate("");
    setChallengeStep("library");
    setSelectedChallenge(null);
    setAssignedSuccess(false);
    setTargetMode("whole");
    setSelectedStudentIds([]);
  }

  if (loadingAuth) {
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
        <div style={{ width: "100%", maxWidth: 640 }}>
          <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
            <ChevronLeft size={16} /> Back to My Classes
          </button>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, margin: "0 0 4px 0" }}>Challenge Library</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>
            Browse challenge types and cases, then choose which class to assign to.
          </p>

          {error && <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}

          {assignedSuccess ? (
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 32, textAlign: "center", boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Assigned!</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 20 }}>
                "{selectedCase.title}" is now assigned to {targetMode === "specific" ? `${selectedStudentIds.length} student${selectedStudentIds.length === 1 ? "" : "s"} in` : "everyone in"} {targetClass?.name}.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={assignAnother} className="gc-btn" style={{ background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Assign Another</button>
                <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Back to My Classes</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                {challengeStep === "library" && (
                  <>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>1. Choose a Challenge Type</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {CHALLENGE_TYPES.map((ch) => (
                        <button key={ch.key} className="gc-btn" disabled={!ch.real} onClick={() => { setSelectedChallenge(ch); setChallengeStep("gradeSubject"); }} style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${COLORS.border}`, padding: 0, textAlign: "left", opacity: ch.real ? 1 : 0.7, cursor: ch.real ? "pointer" : "default" }}>
                          <div style={{ position: "relative", height: 90 }}>
                            <img src={ch.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: ch.real ? "none" : "grayscale(0.3)" }} />
                            {!ch.real && <span style={{ position: "absolute", top: 6, right: 6, fontSize: 9.5, fontWeight: 700, background: "rgba(255,255,255,.92)", color: COLORS.textMuted, padding: "2px 8px", borderRadius: 999 }}>Coming Soon</span>}
                          </div>
                          <div style={{ padding: "8px 10px 2px 10px", fontSize: 12.5, fontWeight: 700, color: COLORS.textDark }}>{ch.label}</div>
                          {ch.description && <div style={{ padding: "0 10px 10px 10px", fontSize: 10.5, lineHeight: 1.4, color: COLORS.textMuted }}>{ch.description}</div>}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {challengeStep === "gradeSubject" && (
                  <>
                    <button onClick={() => setChallengeStep("library")} className="gc-btn" style={{ background: "none", color: COLORS.violet, fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>← Back to Challenge Types</button>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>2. {selectedChallenge?.label} — choose grade & subject</div>
                    <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 14 }}>You can assign any grade level to any class — pick whichever fits this student or group.</div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                      <select value={browseGrade} onChange={(e) => setBrowseGrade(e.target.value)} style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                        <option value="3">3rd Grade</option><option value="4">4th Grade</option><option value="5">5th Grade</option>
                      </select>
                      <select value={browseSubject} onChange={(e) => setBrowseSubject(e.target.value)} style={{ flex: 1, border: "2px solid #ECEAF5", borderRadius: 10, padding: "10px 12px", fontSize: 14 }}>
                        <option value="Science">Science</option><option value="Social Studies">Social Studies</option><option value="Math">Math</option><option value="ELAR">ELAR</option>
                      </select>
                    </div>
                    <button onClick={() => setChallengeStep("caseList")} className="gc-btn" style={{ width: "100%", background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 14 }}>
                      Browse {browseGrade === "3" ? "3rd" : `${browseGrade}th`} Grade {browseSubject} Cases →
                    </button>
                  </>
                )}

                {challengeStep === "caseList" && (
                  <>
                    <button onClick={() => setChallengeStep("gradeSubject")} className="gc-btn" style={{ background: "none", color: COLORS.violet, fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>← Change Grade/Subject</button>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>3. Choose a case — {browseGrade === "3" ? "3rd" : `${browseGrade}th`} Grade {browseSubject}</div>
                    <div style={{ position: "relative", marginBottom: 12 }}>
                      <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: COLORS.textMuted }} />
                      <input value={caseSearch} onChange={(e) => setCaseSearch(e.target.value)} placeholder="Search by title or standard..." style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }} />
                    </div>
                    <div style={{ display: "grid", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                      {filteredCases.map((c) => {
                        const isSelected = selectedCase && selectedCase.standard === c.standard;
                        return (
                          <button key={c.standard} className="gc-btn" onClick={() => setSelectedCase(c)} style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "left", background: isSelected ? COLORS.violetSoft : COLORS.cream, border: isSelected ? `2px solid ${COLORS.violet}` : "2px solid transparent", borderRadius: 12, padding: "10px 12px" }}>
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
                          No {browseGrade === "3" ? "3rd" : `${browseGrade}th`} Grade {browseSubject} cases yet — check back once they're added!
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {selectedCase && (selectedCase.learning_target || selectedCase.lesson_summary || selectedCase.misconception_note) && (
                <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                      <img src={caseImagePath(selectedCase.standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textDark }}>{selectedCase.title}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted }}>{selectedCase.standard}</div>
                    </div>
                  </div>

                  {selectedCase.learning_target && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, letterSpacing: .4, marginBottom: 5, textTransform: "uppercase" }}>Learning Target</div>
                      <div style={{ background: COLORS.tealSoft, borderRadius: 10, padding: "9px 11px", fontSize: 13, color: COLORS.textDark, lineHeight: 1.5 }}>
                        🎯 {selectedCase.learning_target}
                      </div>
                    </div>
                  )}

                  {selectedCase.lesson_summary && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, letterSpacing: .4, marginBottom: 5, textTransform: "uppercase" }}>Lesson Summary</div>
                      <div style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.5 }}>
                        {selectedCase.lesson_summary}
                      </div>
                    </div>
                  )}

                  {selectedCase.misconception_note && (
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, letterSpacing: .4, marginBottom: 5, textTransform: "uppercase" }}>Watch For</div>
                      <div style={{ background: "#FFF4E5", border: `1px solid ${COLORS.warning || "#FF9F43"}`, borderRadius: 10, padding: "9px 11px", fontSize: 12.5, color: "#7A4A0A", lineHeight: 1.5 }}>
                        ⚠️ {selectedCase.misconception_note}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedCase && (
                <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>4. Which class is this for?</div>
                  {classes.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                      {classes.map((c) => (
                        <button
                          key={c.id}
                          className="gc-btn"
                          onClick={() => setAssignClassId(c.id)}
                          style={{
                            background: assignClassId === c.id ? COLORS.violetSoft : COLORS.cream,
                            border: assignClassId === c.id ? `2px solid ${COLORS.violet}` : "2px solid transparent",
                            borderRadius: 10,
                            padding: "9px 14px",
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: COLORS.textDark,
                          }}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 10 }}>You don't have any classes yet — create one on My Classes first.</p>
                  )}

                  {assignClassId && (
                    <>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>5. Who gets it?</div>
                      <div style={{ display: "inline-flex", background: COLORS.cream, borderRadius: 999, padding: 3, marginBottom: 14, gap: 3 }}>
                        <button className="gc-btn" onClick={() => setTargetMode("whole")} style={{ border: "none", padding: "7px 16px", borderRadius: 999, fontWeight: 700, fontSize: 12.5, background: targetMode === "whole" ? COLORS.violet : "transparent", color: targetMode === "whole" ? COLORS.white : COLORS.textMuted }}>
                          Whole Class
                        </button>
                        <button className="gc-btn" onClick={() => setTargetMode("specific")} style={{ border: "none", padding: "7px 16px", borderRadius: 999, fontWeight: 700, fontSize: 12.5, background: targetMode === "specific" ? COLORS.violet : "transparent", color: targetMode === "specific" ? COLORS.white : COLORS.textMuted }}>
                          Just Some Students
                        </button>
                      </div>

                      {targetMode === "specific" && (
                        <div style={{ display: "grid", gap: 6, maxHeight: 200, overflowY: "auto", marginBottom: 14, background: COLORS.cream, borderRadius: 10, padding: 10 }}>
                          {roster.length > 0 ? roster.map((s) => {
                            const checked = selectedStudentIds.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                className="gc-btn"
                                onClick={() => toggleStudentTarget(s.id)}
                                style={{ display: "flex", alignItems: "center", gap: 8, background: checked ? COLORS.violetSoft : COLORS.white, border: checked ? `1.5px solid ${COLORS.violet}` : `1.5px solid ${COLORS.border}`, borderRadius: 8, padding: "7px 10px", textAlign: "left" }}
                              >
                                <div style={{ width: 16, height: 16, borderRadius: 4, background: checked ? COLORS.violet : COLORS.white, border: `1.5px solid ${checked ? COLORS.violet : COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                                  {checked ? "✓" : ""}
                                </div>
                                <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.textDark }}>{s.first_name}</span>
                              </button>
                            );
                          }) : (
                            <div style={{ fontSize: 12.5, color: COLORS.textMuted, textAlign: "center", padding: 8 }}>No students in this class yet.</div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>6. Due date (optional)</div>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <Calendar size={14} style={{ position: "absolute", left: 10, top: 11, color: COLORS.textMuted }} />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                  <button className="gc-btn" onClick={handleAssign} disabled={assigning || !assignClassId} style={{ width: "100%", background: assignClassId ? COLORS.violet : "#D8D4E8", color: COLORS.white, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                    {assigning
                      ? "Assigning..."
                      : !assignClassId
                      ? "Choose a class first"
                      : targetMode === "specific"
                      ? `Assign to ${selectedStudentIds.length} student${selectedStudentIds.length === 1 ? "" : "s"} →`
                      : `Assign to ${targetClass?.name} →`}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewAssignmentPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#F2F0FA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: "#697386" }}>Loading...</div>}>
      <NewAssignmentContent />
    </Suspense>
  );
}
