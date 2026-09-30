"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RelayStationClient from "../../../activity/[assignmentId]/RelayStationClient";

// Bright story page (same look as the ClearKeys door) + the dark typing
// screen for the transmission. Sept 29, 2026.
const C = { ink: "#241b50", muted: "#6b5f8a", violet: "#7B5DFF", violet2: "#9B7DFF", teal: "#00C2C7" };
const glass = { background: "rgba(255,255,255,0.84)", border: "1px solid rgba(255,255,255,0.95)", borderRadius: 24, boxShadow: "0 10px 30px rgba(60,40,140,.18)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" };
const pill = (bg) => ({ display: "inline-flex", alignItems: "center", gap: 6, background: bg, color: "#fff", borderRadius: 999, padding: "12px 22px", fontWeight: 800, textDecoration: "none", fontSize: 16, border: 0, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 16px rgba(123,93,255,.3)" });
const tag = { position: "fixed", zIndex: 50, color: "#fff", background: "rgba(13,27,42,.8)", padding: "8px 14px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontFamily: "'Inter', sans-serif" };

export default function StoryChapterClient({ typing, chapter, next, lesson, student, rs }) {
  const [speaking, setSpeaking] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  useEffect(() => { setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window); return () => { try { window.speechSynthesis.cancel(); } catch (e) { /* ok */ } }; }, []);

  function readAloud() {
    try {
      const synth = window.speechSynthesis;
      if (speaking) { synth.cancel(); setSpeaking(false); return; }
      const u = new SpeechSynthesisUtterance(chapter.narration.join(" "));
      u.rate = 0.95;
      u.onend = () => setSpeaking(false);
      synth.cancel();
      synth.speak(u);
      setSpeaking(true);
    } catch (e) { setSpeaking(false); }
  }

  if (typing) {
    return (
      <>
        <Link href={`/keys/story/${chapter.n}`} style={{ ...tag, top: 14, left: 14 }}>← Chapter {chapter.n}</Link>
        {next && <Link href={`/keys/story/${next.n}`} style={{ ...tag, top: 14, right: 14 }}>Next: Chapter {next.n} →</Link>}
        <RelayStationClient
          assignmentId={null}
          lesson={lesson}
          accommodations={rs.accommodations}
          samSkin={student.samSkin}
          samNickname={student.samNickname}
          keyboardSkin={rs.keyboardSkin}
          currentLevel={rs.currentLevel}
        />
      </>
    );
  }

  return (
    <main style={{ minHeight: "100vh", color: C.ink, fontFamily: "'Inter', sans-serif", padding: "20px 16px 60px", background: "linear-gradient(180deg, #E9E4FB 0%, #F2F0FA 45%, #F7F5FD 100%)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
      <div style={{ width: "min(820px, 100%)", margin: "0 auto", display: "grid", gap: 18 }}>
        <header style={{ ...glass, borderRadius: 999, padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/keys#story" style={{ color: C.violet, textDecoration: "none", fontWeight: 800 }}>← Story</Link>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800 }}>The Hush</span>
          <span style={{ color: C.muted, fontWeight: 700, fontSize: 14 }}>Chapter {chapter.n} of 24</span>
        </header>

        <section style={{ position: "relative", borderRadius: 28, overflow: "hidden", minHeight: 200, display: "flex", alignItems: "flex-end", padding: 18, backgroundColor: "#dcd6f5", backgroundImage: "url(/relay/keys_room.jpg)", backgroundSize: "cover", backgroundPosition: "center 35%", boxShadow: "0 12px 34px rgba(60,40,140,.22)" }}>
          <div style={{ ...glass, padding: "14px 18px" }}>
            <div style={{ color: C.muted, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>{chapter.act ? `${chapter.act} · ` : ""}Chapter {chapter.n}</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 28 }}>{chapter.title}</h1>
          </div>
        </section>

        <section style={{ ...glass, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ color: C.muted, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>S.A.M. reports</div>
            {canSpeak && (
              <button type="button" onClick={readAloud} style={{ border: "1px solid #d9d0f5", background: "#fff", color: C.ink, borderRadius: 999, padding: "6px 14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                {speaking ? "Stop reading" : "🔊 Read to me"}
              </button>
            )}
          </div>
          {chapter.narration.map((p, i) => (
            <p key={i} style={{ fontSize: 19, lineHeight: 1.6, margin: "0 0 12px" }}>{p}</p>
          ))}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
            <Link href={`/keys/story/${chapter.n}?type=1`} style={pill(`linear-gradient(135deg, ${C.violet}, ${C.violet2})`)}>Decode the transmission →</Link>
            {next && <Link href={`/keys/story/${next.n}`} style={{ color: C.violet, fontWeight: 800, textDecoration: "none" }}>Skip to Chapter {next.n}</Link>}
          </div>
        </section>
      </div>
    </main>
  );
}
