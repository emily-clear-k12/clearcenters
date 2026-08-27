"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
  confirm: "#0A7C6C",
  confirmBg: "#E6F6F3",
  errorText: "#B23A3A",
  errorBg: "#FBEAEA",
};

const GRADE_LABEL = { 3: "3rd Grade", 4: "4th Grade", 5: "5th Grade" };

export default function ClassSettingsPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);

  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [drafts, setDrafts] = useState({}); // classId -> in-progress name
  const [rowStatus, setRowStatus] = useState({}); // classId -> "saving" | "saved" | "error"

  const loadClasses = useCallback(async (id) => {
    setLoadingClasses(true);
    const { data } = await supabase
      .from("classes")
      .select("*")
      .eq("teacher_id", id)
      .order("name");
    setClasses(data || []);
    setLoadingClasses(false);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setTeacherId(data.user.id);
      setLoadingAuth(false);
      loadClasses(data.user.id);
    });
  }, [router, loadClasses]);

  function nameFor(cls) {
    return drafts[cls.id] !== undefined ? drafts[cls.id] : cls.name;
  }

  async function saveName(cls) {
    const newName = (drafts[cls.id] || "").trim();
    if (!newName || newName === cls.name) return;

    setRowStatus((s) => ({ ...s, [cls.id]: "saving" }));
    // .select() here isn't just to get the row back — it's what lets us tell
    // "actually saved" apart from "matched zero rows and silently did nothing,"
    // which is exactly what happens if Row Level Security blocks the write
    // without throwing an error.
    const { data, error } = await supabase
      .from("classes")
      .update({ name: newName })
      .eq("id", cls.id)
      .eq("teacher_id", teacherId)
      .select();

    if (error || !data || data.length === 0) {
      if (error) console.error("Class rename failed:", error);
      else console.error("Class rename matched 0 rows — likely blocked by Row Level Security on 'classes'.");
      setRowStatus((s) => ({ ...s, [cls.id]: "error" }));
      return;
    }
    setClasses((list) => list.map((c) => (c.id === cls.id ? { ...c, name: newName } : c)));
    setDrafts((d) => { const next = { ...d }; delete next[cls.id]; return next; });
    setRowStatus((s) => ({ ...s, [cls.id]: "saved" }));
    setTimeout(() => setRowStatus((s) => ({ ...s, [cls.id]: undefined })), 2000);
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <TeacherSidebar teacherEmail={teacherEmail} />
      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 780, margin: "0 auto" }}>
        <TeacherPageBanner>
          <div style={{ maxWidth: "62%" }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 6px 0" }}>Class Settings</h1>
            <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
              Rename any of your classes below. Roster management and other class-level preferences are coming soon.
            </p>
          </div>
        </TeacherPageBanner>

        {loadingClasses ? (
          <div style={{ color: COLORS.textMuted, fontSize: 14 }}>Loading your classes...</div>
        ) : classes.length === 0 ? (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 32, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>
            You don't have any classes yet — create one from My Classes.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {classes.map((cls) => {
              const status = rowStatus[cls.id];
              const changed = drafts[cls.id] !== undefined && drafts[cls.id].trim() !== "" && drafts[cls.id].trim() !== cls.name;
              return (
                <div key={cls.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 8px rgba(13,27,42,.04)" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                    {cls.grade && GRADE_LABEL[cls.grade] ? `${GRADE_LABEL[cls.grade]} · ` : ""}{cls.subject || ""}{cls.class_code ? ` · Code ${cls.class_code}` : ""}
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      type="text"
                      value={nameFor(cls)}
                      onChange={(e) => setDrafts((d) => ({ ...d, [cls.id]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") saveName(cls); }}
                      style={{ flex: "1 1 220px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 13px", fontSize: 15, fontFamily: "inherit", color: COLORS.textDark }}
                    />
                    <button
                      onClick={() => saveName(cls)}
                      disabled={!changed || status === "saving"}
                      style={{
                        background: changed ? COLORS.violet : COLORS.violetSoft,
                        color: changed ? COLORS.white : COLORS.textMuted,
                        border: "none",
                        borderRadius: 10,
                        padding: "10px 20px",
                        fontWeight: 700,
                        fontSize: 13.5,
                        cursor: changed ? "pointer" : "default",
                      }}
                    >
                      {status === "saving" ? "Saving..." : "Save"}
                    </button>
                  </div>
                  {status === "saved" && (
                    <div style={{ marginTop: 8, fontSize: 12.5, color: COLORS.confirm, background: COLORS.confirmBg, display: "inline-block", padding: "4px 10px", borderRadius: 999 }}>
                      Saved
                    </div>
                  )}
                  {status === "error" && (
                    <div style={{ marginTop: 8, fontSize: 12.5, color: COLORS.errorText, background: COLORS.errorBg, display: "inline-block", padding: "4px 10px", borderRadius: 999 }}>
                      Couldn't save — try again.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
