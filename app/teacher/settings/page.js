"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../lib/teacherTheme";
import { SAM_SKINS, FALLBACK_ICON, DEFAULT_SAM_SKIN } from "../../../lib/samSkins";
import { CLASS_PLANETS, planetForClass } from "../../../lib/classPlanets";

// Sept 13 — moved to the console-interior look, S.A.M.'s own teal family
// (this page already had a partial S.A.M. tie-in via the skin picker below,
// so it inherits S.A.M.'s Overview landmark color rather than getting its
// own). No dedicated background art exists yet, so it falls back to the
// plain canvas wash. TeacherSidebar + TeacherPageBanner swapped for
// TeacherHUD; flat opaque-white cards became panelStyle glass cards;
// decorative violet (S.A.M. skin picker selection, class rename Save
// button, planet-picker selection ring) became teal ACCENT. No query or
// save logic changed.
//
// Left alone, on purpose: each planet button's own radial-gradient fill —
// that's the individual planet's real color (same hue used on the Overview
// scene), not page decoration, so it stays whatever that planet's hue is
// regardless of this page's teal accent.
const ACCENT = PAGE_ACCENTS["/teacher/settings"];
const BG = PAGE_BACKGROUNDS["/teacher/settings"];

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
  const [planetStatus, setPlanetStatus] = useState({}); // classId -> "saving" | "saved" | "error"

  const [samSkin, setSamSkin] = useState(DEFAULT_SAM_SKIN);
  const [samSkinStatus, setSamSkinStatus] = useState(null); // "saving" | "saved" | "error"

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
    supabase.auth.getUser().then(async ({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setTeacherId(data.user.id);
      loadClasses(data.user.id);

      // Best-effort — the Overview dashboard's S.A.M. landmark reads this
      // same column (app/teacher/page.js). If it's missing, the picker
      // below just sits on Cosmic rather than blocking the page.
      const { data: teacherRow } = await supabase
        .from("teachers")
        .select("equipped_sam_skin")
        .eq("id", data.user.id)
        .maybeSingle();
      if (teacherRow?.equipped_sam_skin) setSamSkin(teacherRow.equipped_sam_skin);

      setLoadingAuth(false);
    });
  }, [router, loadClasses]);

  async function saveSamSkin(skinKey) {
    if (skinKey === samSkin) return;
    const previous = samSkin;
    setSamSkin(skinKey); // optimistic — feels instant, matches the class-rename pattern below on failure
    setSamSkinStatus("saving");

    const { data, error } = await supabase
      .from("teachers")
      .update({ equipped_sam_skin: skinKey })
      .eq("id", teacherId)
      .select();

    if (error || !data || data.length === 0) {
      if (error) console.error("S.A.M. skin save failed:", error);
      else console.error("S.A.M. skin save matched 0 rows — likely blocked by Row Level Security on 'teachers'.");
      setSamSkin(previous);
      setSamSkinStatus("error");
      return;
    }
    setSamSkinStatus("saved");
    setTimeout(() => setSamSkinStatus(null), 2000);
  }

  async function savePlanet(cls, planetKey) {
    setPlanetStatus((s) => ({ ...s, [cls.id]: "saving" }));
    const { data, error } = await supabase
      .from("classes")
      .update({ planet_key: planetKey })
      .eq("id", cls.id)
      .eq("teacher_id", teacherId)
      .select();

    if (error || !data || data.length === 0) {
      if (error) console.error("Planet save failed:", error);
      else console.error("Planet save matched 0 rows — likely blocked by Row Level Security on 'classes'.");
      setPlanetStatus((s) => ({ ...s, [cls.id]: "error" }));
      return;
    }
    setClasses((list) => list.map((c) => (c.id === cls.id ? { ...c, planet_key: planetKey } : c)));
    setPlanetStatus((s) => ({ ...s, [cls.id]: "saved" }));
    setTimeout(() => setPlanetStatus((s) => ({ ...s, [cls.id]: undefined })), 2000);
  }

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
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.canvas,
        backgroundImage: BG ? `linear-gradient(180deg, rgba(243,239,252,.55) 0%, rgba(243,239,252,.82) 100%), url(${BG})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>

      <TeacherHUD title="Class Settings" subtitle="S.A.M. — your console's own companion" accent={ACCENT} teacherEmail={teacherEmail} />

      <main style={{ padding: "28px 36px 40px", maxWidth: 780, margin: "0 auto" }}>
        <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 20px 0" }}>
          Rename any of your classes below, or change its planet on the Overview dashboard. Roster management and other class-level preferences are coming soon.
        </p>

        {/* Your S.A.M. — which skin shows on the Overview dashboard's
            console (app/teacher/page.js). Unlike the student-facing skin
            system, nothing here is locked behind crystal points — any of
            the 4 is free to pick. */}
        <div style={{ ...panelStyle(ACCENT, { padding: "18px 20px", marginBottom: 20 }) }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Your S.A.M.</div>
          <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 12px 0", lineHeight: 1.5 }}>
            Which S.A.M. shows on your Overview dashboard. (Cosmic has a custom pose made for that screen — the others show their regular icon art for now.)
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, maxWidth: 420 }}>
            {SAM_SKINS.map((skin) => (
              <button
                key={skin.key}
                type="button"
                onClick={() => saveSamSkin(skin.key)}
                style={{
                  padding: "10px 4px", borderRadius: 10, cursor: "pointer", textAlign: "center",
                  border: samSkin === skin.key ? `2px solid ${ACCENT}` : `1.5px solid ${COLORS.border}`,
                  background: samSkin === skin.key ? `${ACCENT}1E` : "rgba(255,255,255,.6)",
                }}
              >
                <img src={skin.image} alt="" style={{ width: 36, height: 36, objectFit: "contain", marginBottom: 4 }} onError={(e) => { e.currentTarget.src = FALLBACK_ICON; }} />
                <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textDark }}>{skin.name}</div>
              </button>
            ))}
          </div>
          {samSkinStatus === "saved" && (
            <div style={{ marginTop: 10, fontSize: 12.5, color: COLORS.success, background: `${COLORS.success}1E`, display: "inline-block", padding: "4px 10px", borderRadius: 999 }}>Saved</div>
          )}
          {samSkinStatus === "error" && (
            <div style={{ marginTop: 10, fontSize: 12.5, color: COLORS.danger, background: `${COLORS.danger}1A`, display: "inline-block", padding: "4px 10px", borderRadius: 999 }}>Couldn't save — try again.</div>
          )}
        </div>

        {loadingClasses ? (
          <div style={{ color: COLORS.textMuted, fontSize: 14 }}>Loading your classes...</div>
        ) : classes.length === 0 ? (
          <div style={{ ...panelStyle(ACCENT, { padding: 32, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }) }}>
            You don't have any classes yet — create one from My Classes.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {classes.map((cls, index) => {
              const status = rowStatus[cls.id];
              const changed = drafts[cls.id] !== undefined && drafts[cls.id].trim() !== "" && drafts[cls.id].trim() !== cls.name;
              const activePlanet = planetForClass(cls, index);
              const pStatus = planetStatus[cls.id];
              return (
                <div key={cls.id} style={{ ...panelStyle(ACCENT, { padding: "18px 20px" }) }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                    {cls.grade && GRADE_LABEL[cls.grade] ? `${GRADE_LABEL[cls.grade]} · ` : ""}{cls.subject || ""}{cls.class_code ? ` · Code ${cls.class_code}` : ""}
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      type="text"
                      value={nameFor(cls)}
                      onChange={(e) => setDrafts((d) => ({ ...d, [cls.id]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") saveName(cls); }}
                      style={{ flex: "1 1 220px", border: `1.5px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 13px", fontSize: 15, fontFamily: "inherit", color: COLORS.textDark, background: "rgba(255,255,255,.7)" }}
                    />
                    <button
                      onClick={() => saveName(cls)}
                      disabled={!changed || status === "saving"}
                      style={{
                        background: changed ? ACCENT : `${ACCENT}22`,
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
                    <div style={{ marginTop: 8, fontSize: 12.5, color: COLORS.success, background: `${COLORS.success}1E`, display: "inline-block", padding: "4px 10px", borderRadius: 999 }}>
                      Saved
                    </div>
                  )}
                  {status === "error" && (
                    <div style={{ marginTop: 8, fontSize: 12.5, color: COLORS.danger, background: `${COLORS.danger}1A`, display: "inline-block", padding: "4px 10px", borderRadius: 999 }}>
                      Couldn't save — try again.
                    </div>
                  )}

                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.textMuted, marginBottom: 8 }}>Planet on Overview</div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      {CLASS_PLANETS.map((planet) => (
                        <button
                          key={planet.key}
                          type="button"
                          onClick={() => savePlanet(cls, planet.key)}
                          title={planet.name}
                          aria-label={planet.name}
                          style={{
                            width: 34, height: 34, borderRadius: "50%", cursor: "pointer", padding: 0,
                            border: activePlanet.key === planet.key ? `2px solid ${ACCENT}` : "2px solid transparent",
                            background: `radial-gradient(circle at 35% 30%, ${planet.hue.glow}, ${planet.hue.core} 70%)`,
                            boxShadow: activePlanet.key === planet.key ? `0 0 0 2px ${COLORS.white}, 0 0 0 4px ${ACCENT}` : "none",
                          }}
                        />
                      ))}
                      {pStatus === "saved" && (
                        <span style={{ fontSize: 12.5, color: COLORS.success, background: `${COLORS.success}1E`, padding: "4px 10px", borderRadius: 999 }}>Saved</span>
                      )}
                      {pStatus === "error" && (
                        <span style={{ fontSize: 12.5, color: COLORS.danger, background: `${COLORS.danger}1A`, padding: "4px 10px", borderRadius: 999 }}>Couldn't save — try again.</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
