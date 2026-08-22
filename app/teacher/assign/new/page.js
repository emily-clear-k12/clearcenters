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

const CHALLENGE_TYPES = [
  { key: "group_chat", label: "Group Chat", image: "/teacher/challenges/group_chat.jpg", real: true },
  { key: "comment_section", label: "Comment Section", image: "/teacher/challenges/comment_section.jpg", real: false },
  { key: "video_detective", label: "Short-Form Video Detective", image: "/teacher/challenges/video_detective.jpg", real: false },
  { key: "model_makeover", label: "Model Makeover", image: "/teacher/challenges/model_makeover.jpg", real: false },
  { key: "museum_exhibit", label: "Museum Exhibit Builder", image: "/teacher/challenges/museum_exhibit.jpg", real: false },
  { key: "newsroom", label: "Newsroom", image: "/teacher/challenges/newsroom.jpg", real: false },
  { key: "repair_desk", label: "Repair Desk", image: "/teacher/challenges/repair_desk.jpg", real: false },
  { key: "you_be_the_judge", label: "You Be the Judge", image: "/teacher/challenges/you_be_the_judge.jpg", real: false },
];

function caseImagePath(standard) {
  return `/cases/${standard.replace(".", "-")}.jpg`;
}

function NewAssignmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classId = searchParams.get("classId");

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [targetClass, setTargetClass] = useState(null);
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

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  useEffect(() => {
    if (!classId) return;
    supabase.from("classes").select("*").eq("id", classId).single().then(({ data }) => {
      if (data) {
        setTargetClass(data);
        setBrowseGrade(String(data.grade || "5"));
        setBrowseSubject(data.subject || "Science");
      }
    });
  }, [classId]);

  useEffect(() => {
    supabase.from("cases").select("standard, title, grade, subject").then(({ data }) => setCases(data || []));
  }, []);

  const filteredCases = cases.filter(
    (c) => c.grade === parseInt(browseGrade) && c.subject === browseSubject &&
      (c.title.toLowerCase().includes(caseSearch.toLowerCase()) || c.standard.toLowerCase().includes(caseSearch.toLowerCase()))
  );

  async function handleAssign() {
    if (!selectedCase || !classId) return;
    setAssigning(true);
    setError(null);
    const { error: insertError } = await supabase.from("assignments").insert({ class_id: classId, case_standard: selectedCase.standard, due_date: dueDate || null });
    setAssigning(false);
    if (insertError) { setError("Couldn't assign the case: " + insertError.message); return; }
    setAssignedSuccess(true);
  }

  function assignAnother() {
    setSelectedCase(null);
    setDueDate("");
    setChallengeStep("library");
    setSelectedChallenge(null);
    setAssignedSuccess(false);
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>Loading...</div>;
  }

  if (!classId) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif" }}>
        <TeacherSidebar teacherEmail={teacherEmail} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center" }}>
          <div>
            <p style={{ color: COLORS.textMuted, marginBottom: 12 }}>No class selected. Start from My Classes instead.</p>
            <button onClick={() => router.push("/teacher/assign")} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Go to My Classes</button>
          </div>
        </div>
      </div>
    );
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
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, margin: "0 0 4px 0" }}>New Assignment</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 20 }}>
            Assigning to <strong style={{ color: COLORS.textDark }}>{targetClass?.name || "..."}</strong>
          </p>

          {error && <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}

          {assignedSuccess ? (
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 32, textAlign: "center", boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Assigned!</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13.5, marginBottom: 20 }}>"{selectedCase.title}" is now assigned to {targetClass?.name}.</p>
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
                          <div style={{ padding: "8px 10px", fontSize: 12.5, fontWeight: 700, color: COLORS.textDark }}>{ch.label}</div>
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

              {selectedCase && (
                <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>4. Due date (optional)</div>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <Calendar size={14} style={{ position: "absolute", left: 10, top: 11, color: COLORS.textMuted }} />
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "8px 10px 8px 32px", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                  <button className="gc-btn" onClick={handleAssign} disabled={assigning} style={{ width: "100%", background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                    {assigning ? "Assigning..." : `Assign to ${targetClass?.name || "Class"} →`}
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
