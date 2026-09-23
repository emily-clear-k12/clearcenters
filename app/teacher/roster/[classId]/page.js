"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Printer, ChevronLeft, Copy, Check, Plus, UserX, UserCheck, ArrowRightLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../../../lib/supabaseClient";
import Link from 'next/link';
import {BridgePage,PageHeading,ClassTabs} from '../../../../components/teacher/BridgeUI';
import {subjectStyle} from '../../../../lib/teacherBridge';
import TeacherHUD from "../../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../../lib/teacherTheme";

// Sept 14 — Roster Management. Used to be a print-only page (class code +
// QR + a plain name/PIN table). Feature 2 of the teacher-efficiency build
// (see Teacher_SiteWide_Redesign_Plan.md): add students in bulk, remove one
// without losing their grade history, and transfer a student between
// classes — all from one place instead of nowhere at all (Class Settings
// has said "Roster management... coming soon" since the redesign shipped).
//
// The original printable roster is kept exactly as it was, as a
// `.print-only` block that only renders when actually printing — the
// on-screen page below it is the new management console, hidden when
// printing via `.no-print`, same trick the old page already used for its
// own header buttons.
const ACCENT = "#7541cf";
const BG = PAGE_BACKGROUNDS["/teacher/roster"];

const GRADE_LABEL = { 3: "3rd Grade", 4: "4th Grade", 5: "5th Grade" };

function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default function ClassRosterPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [classInfo, setClassInfo] = useState(null);
  const [otherClasses, setOtherClasses] = useState([]);
  const [roster, setRoster] = useState([]);
  const [activeColumnMissing, setActiveColumnMissing] = useState(false);
  const [joinUrl, setJoinUrl] = useState("");
  const [error, setError] = useState(null);

  const [bulkNames, setBulkNames] = useState("");
  const [search,setSearch]=useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);
  const [justAdded, setJustAdded] = useState([]);
  const [copiedPins, setCopiedPins] = useState(false);

  const [busyStudentId, setBusyStudentId] = useState(null);
  const [transferChoice, setTransferChoice] = useState({}); // studentId -> targetClassId
  const [rowError, setRowError] = useState({}); // studentId -> message

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRoster = useCallback(async (tId) => {
    setLoading(true);
    setError(null);

    const { data: cls, error: classError } = await supabase
      .from("classes")
      .select("*")
      .eq("id", classId)
      .eq("teacher_id", tId)
      .maybeSingle();

    if (classError || !cls) {
      setError("Couldn't load this class — it may not exist, or you may not have access to it.");
      setLoading(false);
      return;
    }
    setClassInfo(cls);

    const { data: others } = await supabase
      .from("classes")
      .select("id, name")
      .eq("teacher_id", tId)
      .neq("id", classId)
      .order("name");
    setOtherClasses(others || []);

    // Same "SQL delivered != SQL run" hardening as Overview's classes
    // query — `active` is a new column, so fall back gracefully (treating
    // everyone as active) if the migration hasn't landed yet, rather than
    // showing an empty roster or a hard error.
    let { data: students, error: studentsError } = await supabase
      .from("students")
      .select("id, first_name, pin, active")
      .eq("class_id", classId)
      .order("first_name");

    if (studentsError) {
      console.error("Failed to load roster with 'active' — falling back without it. Run the migration in Teacher_SiteWide_Redesign_Plan.md if this persists:", studentsError);
      const fallback = await supabase.from("students").select("id, first_name, pin").eq("class_id", classId).order("first_name");
      students = (fallback.data || []).map((s) => ({ ...s, active: true }));
      setActiveColumnMissing(true);
      if (fallback.error) {
        console.error("Fallback roster load also failed:", fallback.error);
        setError("Couldn't load this class's roster — try refreshing.");
      }
    } else {
      // Older rows inserted before the migration may have `active: null`
      // rather than `true` — treat anything but an explicit `false` as active.
      students = (students || []).map((s) => ({ ...s, active: s.active !== false }));
    }
    setRoster(students || []);

    if (typeof window !== "undefined") {
      setJoinUrl(`${window.location.origin}/join/${encodeURIComponent(cls.class_code)}`);
    }

    setLoading(false);
  }, [classId]);

  useEffect(() => {
    if (!loadingAuth && teacherId) loadRoster(teacherId);
  }, [loadingAuth, teacherId, loadRoster]);

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token || null;
  }

  async function handleBulkAdd(e) {
    e.preventDefault();
    const names = bulkNames.split(/\r?\n|,/).map((n) => n.trim()).filter(Boolean);
    if (names.length === 0) return;

    setAdding(true);
    setAddError(null);
    setJustAdded([]);

    const accessToken = await getAccessToken();
    if (!accessToken) {
      setAdding(false);
      setAddError("Your session expired — refresh the page and try again.");
      return;
    }

    try {
      const res = await fetch("/api/teacher/roster/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, names, accessToken }),
      });
      const result = await res.json();
      setAdding(false);
      if (!res.ok) {
        setAddError(result.error || "Couldn't add students.");
        return;
      }
      setBulkNames("");
      setJustAdded(result.students || []);
      loadRoster(teacherId);
    } catch (err) {
      setAdding(false);
      setAddError("Couldn't add students — check your connection and try again.");
    }
  }

  function copyJustAddedPins() {
    const text = justAdded.map((s) => `${s.first_name}\t${s.pin}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedPins(true);
    setTimeout(() => setCopiedPins(false), 1500);
  }

  async function handleDeactivate(student) {
    if (!window.confirm(`Remove ${student.first_name} from this class? They won't be able to log in, but their grades and history are kept — you can restore them anytime.`)) return;
    await runStudentAction(student.id, "deactivate");
  }

  async function handleReactivate(student) {
    await runStudentAction(student.id, "reactivate");
  }

  async function handleTransfer(student) {
    const targetClassId = transferChoice[student.id];
    if (!targetClassId) return;
    const targetName = otherClasses.find((c) => c.id === targetClassId)?.name || "that class";
    if (!window.confirm(`Move ${student.first_name} to ${targetName}? Their grades and history move with them.`)) return;
    await runStudentAction(student.id, "transfer", targetClassId);
  }

  async function runStudentAction(studentId, action, targetClassId) {
    setBusyStudentId(studentId);
    setRowError((r) => ({ ...r, [studentId]: null }));

    const accessToken = await getAccessToken();
    if (!accessToken) {
      setBusyStudentId(null);
      setRowError((r) => ({ ...r, [studentId]: "Your session expired — refresh the page and try again." }));
      return;
    }

    try {
      const res = await fetch("/api/teacher/roster/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, action, targetClassId, accessToken }),
      });
      const result = await res.json();
      setBusyStudentId(null);
      if (!res.ok) {
        setRowError((r) => ({ ...r, [studentId]: result.error || "Couldn't save that change." }));
        return;
      }
      loadRoster(teacherId);
    } catch (err) {
      setBusyStudentId(null);
      setRowError((r) => ({ ...r, [studentId]: "Couldn't save that change — check your connection and try again." }));
    }
  }

  function copyClassCode() {
    navigator.clipboard.writeText(classInfo.class_code);
  }

  if (loadingAuth || loading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (error || !classInfo) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: 20, textAlign: "center" }}>
        <div>
          <p style={{ color: COLORS.textDark }}>{error}</p>
          <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Back to My Classes</button>
        </div>
      </div>
    );
  }

  const activeRoster = roster.filter((s) => s.active);
  const removedRoster = roster.filter((s) => !s.active);

  return <><style>{`.print-only{display:none}@media print{.no-print{display:none!important}.print-only{display:block!important}.roster-print-page{box-shadow:none!important;margin:0!important;max-width:none!important}}`}</style><div className="no-print"><BridgePage teacherEmail={teacherEmail}>
  <PageHeading title="Your class, connected" subtitle="Manage students and classroom access."><ClassTabs classes={[classInfo,...otherClasses]} value={classId} onChange={id=>router.push(`/teacher/roster/${id}`)}/></PageHeading>
  <section className="cc-panel cc-frame cc-row cc-between" style={{...subjectStyle(classInfo.subject),marginBottom:20}}><div><h2>{classInfo.name}</h2><p className="cc-muted">{classInfo.grade?`Grade ${classInfo.grade} · `:''}{classInfo.subject} · {activeRoster.length} students</p></div><div><div className="cc-eyebrow">CLASS JOIN CODE</div><strong style={{fontSize:28,letterSpacing:2}}>{classInfo.class_code}</strong></div><button className="cc-btn secondary" onClick={copyClassCode}>Copy code</button><button className="cc-btn" onClick={()=>window.print()}>Print roster & sign-in cards</button>{joinUrl&&<QRCodeSVG value={joinUrl} size={64}/>}</section>
  {error&&<div className="cc-error" role="alert">{error}</div>}
  {activeColumnMissing&&<p className="cc-muted">Student removal is currently unavailable. Adding and transferring students are available.</p>}
  <div className="cc-roster-layout"><section className="cc-panel"><div className="cc-toolbar"><h2>Students</h2><input className="cc-input cc-search" aria-label="Find a student" placeholder="Find a student" value={search} onChange={e=>setSearch(e.target.value)}/></div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: COLORS.textDark }}>Roster ({activeRoster.length})</div>
              <div style={{ display: "grid", gap: 2 }}>
                {activeRoster.filter(s=>s.first_name.toLowerCase().includes(search.toLowerCase())).map((s) => (
                  <RosterRow
                    key={s.id}
                    student={s}
                    accent={ACCENT}
                    otherClasses={otherClasses}
                    transferTarget={transferChoice[s.id] || ""}
                    onTransferTargetChange={(val) => setTransferChoice((t) => ({ ...t, [s.id]: val }))}
                    onTransfer={() => handleTransfer(s)}
                    onDeactivate={() => handleDeactivate(s)}
                    busy={busyStudentId === s.id}
                    rowError={rowError[s.id]}
                  />
                ))}
                {activeRoster.length === 0 && (
                  <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "16px 0" }}>No active students — add your first one above.</div>
                )}
              </div>

              {removedRoster.length > 0 && (
                <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Removed ({removedRoster.length})</div>
                  <div style={{ display: "grid", gap: 2 }}>
                    {removedRoster.map((s) => (
                      <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", opacity: 0.6 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${COLORS.textMuted}22`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.textMuted, fontSize: 12, flexShrink: 0 }}>{s.first_name[0]}</div>
                        <div style={{ flex: 1, fontSize: 13, color: COLORS.textDark }}>{s.first_name}</div>
                        <button
                          onClick={() => handleReactivate(s)}
                          disabled={busyStudentId === s.id}
                          className="gc-btn"
                          style={{ background: `${COLORS.success}22`, border: "none", borderRadius: 8, padding: "5px 10px", color: COLORS.success, fontWeight: 700, fontSize: 11.5, display: "flex", alignItems: "center", gap: 5 }}
                        >
                          <UserCheck size={13} /> Restore
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
  </section><aside className="cc-stack"><section className="cc-panel">
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: COLORS.textDark }}>Add Students</div>
              <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: "0 0 10px 0" }}>
                Paste a list of first names — one per line (or comma-separated). A random 4-digit PIN is generated for each.
              </p>
              <form onSubmit={handleBulkAdd}>
                <textarea
                  value={bulkNames}
                  onChange={(e) => setBulkNames(e.target.value)}
                  placeholder={"Ava\nBen\nCleo"}
                  rows={4}
                  className="gc-input"
                  style={{ width: "100%", background: "rgba(255,255,255,.7)", color: COLORS.textDark, border: `1.5px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 13.5, fontFamily: "inherit", boxSizing: "border-box", resize: "vertical" }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                  <button type="submit" disabled={adding || !bulkNames.trim()} className="gc-btn" style={{ background: ACCENT, color: COLORS.white, borderRadius: 10, padding: "9px 18px", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    <Plus size={15} /> {adding ? "Adding..." : "Add Students"}
                  </button>
                  {addError && <span style={{ color: COLORS.danger, fontSize: 12.5 }}>{addError}</span>}
                </div>
              </form>

              {justAdded.length > 0 && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.success }}>Added {justAdded.length} student{justAdded.length === 1 ? "" : "s"} — here are their PINs:</div>
                    <button onClick={copyJustAddedPins} className="gc-btn" style={{ background: `${COLORS.success}22`, border: "none", borderRadius: 8, padding: "4px 10px", color: COLORS.success, fontWeight: 700, fontSize: 11.5, display: "flex", alignItems: "center", gap: 4 }}>
                      {copiedPins ? <Check size={12} /> : <Copy size={12} />} {copiedPins ? "Copied" : "Copy All"}
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 6 }}>
                    {justAdded.map((s) => (
                      <div key={s.id} style={{ background: `${COLORS.success}14`, borderRadius: 8, padding: "6px 10px", fontSize: 12.5 }}>
                        <strong>{s.first_name}</strong> — <span style={{ fontFamily: "monospace" }}>{s.pin}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
  </section><section className="cc-panel"><h2>Crystals & rewards</h2><p className="cc-muted">Celebrate effort and unlock rewards for your students.</p><Link className="cc-btn" href="/teacher/badges">Manage rewards</Link></section><section className="cc-panel"><h3>Classroom settings</h3><p className="cc-muted">Manage your classes and their assignments.</p><Link className="cc-link" href={`/teacher/assign?classId=${classId}`}>Open class settings →</Link></section></aside></div>
  </BridgePage></div>
      <div className="print-only">
        <div className="roster-print-page" style={{ maxWidth: 800, margin: "32px auto", background: COLORS.white, borderRadius: 16, padding: "40px 48px", color: COLORS.textDark }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 28, paddingBottom: 24, borderBottom: `2px solid ${COLORS.border}` }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, letterSpacing: 0.5, marginBottom: 4 }}>CLEARCENTERS HQ · CLASS ROSTER</div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 6px 0" }}>{classInfo.name}</h1>
              <div style={{ fontSize: 13.5, color: COLORS.textMuted }}>
                {classInfo.grade && GRADE_LABEL[classInfo.grade] ? `${GRADE_LABEL[classInfo.grade]} · ` : ""}{classInfo.subject || ""}
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Class Code</div>
                <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "monospace", letterSpacing: 1, color: COLORS.textDark }}>{classInfo.class_code}</div>
              </div>
            </div>
            {joinUrl && (
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ padding: 10, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
                  <QRCodeSVG value={joinUrl} size={128} />
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6, maxWidth: 148 }}>Scan to go straight to the login page with the code filled in</div>
              </div>
            )}
          </div>

          <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 14 }}>
            {activeRoster.length} student{activeRoster.length === 1 ? "" : "s"} — students log in with the class code above (or the QR code), their first name, and their PIN below.
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, padding: "8px 10px", borderBottom: `2px solid ${COLORS.border}` }}>Name</th>
                <th style={{ textAlign: "left", fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, padding: "8px 10px", borderBottom: `2px solid ${COLORS.border}` }}>PIN</th>
              </tr>
            </thead>
            <tbody>
              {activeRoster.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontSize: 14, fontWeight: 600, padding: "10px 10px", borderBottom: `1px solid ${COLORS.border}` }}>{s.first_name}</td>
                  <td style={{ fontSize: 14, fontFamily: "monospace", letterSpacing: 1, padding: "10px 10px", borderBottom: `1px solid ${COLORS.border}` }}>{s.pin}</td>
                </tr>
              ))}
              {activeRoster.length === 0 && (
                <tr>
                  <td colSpan={2} style={{ padding: "20px 10px", textAlign: "center", color: COLORS.textMuted, fontSize: 13 }}>No students in this class yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
 </>;
}

function RosterRow({ student, accent, otherClasses, transferTarget, onTransferTargetChange, onTransfer, onDeactivate, busy, rowError }) {
  return (
    <div data-student-row={student.id} style={{ display: "flex", flexDirection: "column", gap: 6, padding: "10px 4px", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${COLORS.violet}22`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 13, flexShrink: 0 }}>{student.first_name[0]}</div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textDark }}>{student.first_name}</div>
          <div style={{ fontSize: 10.5, color: COLORS.textMuted, fontFamily: "monospace" }}>PIN: {student.pin}</div>
        </div>

        <Link className="cc-link" style={{fontSize:12}} href={`/teacher/students/${student.id}`}>View profile</Link>
        {otherClasses.length > 0 && (
          <>
            <select
              value={transferTarget}
              onChange={(e) => onTransferTargetChange(e.target.value)}
              style={{ border: `1.5px solid ${COLORS.border}`, borderRadius: 8, padding: "5px 8px", fontSize: 11.5, color: COLORS.textDark, background: "rgba(255,255,255,.7)" }}
            >
              <option value="">Move to...</option>
              {otherClasses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button
              onClick={onTransfer}
              disabled={busy || !transferTarget}
              className="gc-btn"
              style={{ background: `${accent}22`, border: "none", borderRadius: 8, padding: "5px 10px", color: accent, fontWeight: 700, fontSize: 11.5, display: "flex", alignItems: "center", gap: 5 }}
            >
              <ArrowRightLeft size={12} /> Move
            </button>
          </>
        )}

        <button
          onClick={onDeactivate}
          disabled={busy}
          className="gc-btn"
          style={{ background: `${COLORS.danger}18`, border: "none", borderRadius: 8, padding: "5px 10px", color: COLORS.danger, fontWeight: 700, fontSize: 11.5, display: "flex", alignItems: "center", gap: 5 }}
        >
          <UserX size={12} /> Remove
        </button>
      </div>
      {rowError && <div style={{ fontSize: 11.5, color: COLORS.danger }}>{rowError}</div>}
    </div>
  );
}
