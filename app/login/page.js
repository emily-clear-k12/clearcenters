"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Lock, Hash } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const COLORS = {
  violet: "#7B5DFF",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [classCode, setClassCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleTeacherSignIn(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push("/teacher");
  }

  async function handleStudentSignIn(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/student-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode, firstName, pin }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }
      router.push("/home");
    } catch (err) {
      setLoading(false);
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "min(680px, 100%)", background: COLORS.white, borderRadius: 26, boxShadow: "0 24px 60px rgba(0,0,0,.15)", padding: "44px 44px 36px" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 34, color: COLORS.textDark, margin: "0 0 8px 0" }}>Welcome to HQ</h1>
        <p style={{ color: COLORS.textMuted, fontSize: 15, lineHeight: 1.5, margin: "0 0 24px 0" }}>Your mission hub for learning, evidence, and adventure.</p>

        <div style={{ display: "inline-flex", background: COLORS.cream, borderRadius: 999, padding: 4, marginBottom: 26, gap: 4 }}>
          <button onClick={() => { setRole("student"); setError(null); }} style={{ border: "none", padding: "8px 18px", borderRadius: 999, fontWeight: 700, fontSize: 13.5, cursor: "pointer", background: role === "student" ? COLORS.violet : "transparent", color: role === "student" ? COLORS.white : COLORS.textMuted }}>
            I'm a Student
          </button>
          <button onClick={() => { setRole("teacher"); setError(null); }} style={{ border: "none", padding: "8px 18px", borderRadius: 999, fontWeight: 700, fontSize: 13.5, cursor: "pointer", background: role === "teacher" ? COLORS.violet : "transparent", color: role === "teacher" ? COLORS.white : COLORS.textMuted }}>
            I'm a Teacher
          </button>
        </div>

        {error && (
          <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        {role === "teacher" ? (
          <form onSubmit={handleTeacherSignIn}>
            <label style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, display: "block", marginBottom: 6 }}>Email</label>
            <div style={{ position: "relative", marginBottom: 18 }}>
              <User size={17} style={{ position: "absolute", left: 13, top: 13, color: COLORS.textMuted }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 12, padding: "11px 12px 11px 38px", fontSize: 14.5, boxSizing: "border-box" }}
              />
            </div>

            <label style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative", marginBottom: 22 }}>
              <Lock size={17} style={{ position: "absolute", left: 13, top: 13, color: COLORS.textMuted }} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 12, padding: "11px 38px 11px 38px", fontSize: 14.5, boxSizing: "border-box" }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: 10, background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted }}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 12, padding: "13px 20px", fontWeight: 700, fontSize: 15.5, cursor: "pointer" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleStudentSignIn}>
            <label style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, display: "block", marginBottom: 6 }}>Class Code</label>
            <div style={{ position: "relative", marginBottom: 18 }}>
              <Hash size={17} style={{ position: "absolute", left: 13, top: 13, color: COLORS.textMuted }} />
              <input
                required
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                placeholder="e.g. 5GSC-28X7"
                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 12, padding: "11px 12px 11px 38px", fontSize: 14.5, boxSizing: "border-box", letterSpacing: 1 }}
              />
            </div>

            <label style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, display: "block", marginBottom: 6 }}>First Name</label>
            <div style={{ position: "relative", marginBottom: 18 }}>
              <User size={17} style={{ position: "absolute", left: 13, top: 13, color: COLORS.textMuted }} />
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Maya"
                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 12, padding: "11px 12px 11px 38px", fontSize: 14.5, boxSizing: "border-box" }}
              />
            </div>

            <label style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, display: "block", marginBottom: 6 }}>4-Digit PIN</label>
            <div style={{ position: "relative", marginBottom: 22 }}>
              <Lock size={17} style={{ position: "absolute", left: 13, top: 13, color: COLORS.textMuted }} />
              <input
                required
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                placeholder="••••"
                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 12, padding: "11px 12px 11px 38px", fontSize: 18, letterSpacing: 6, boxSizing: "border-box" }}
              />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 12, padding: "13px 20px", fontWeight: 700, fontSize: 15.5, cursor: "pointer" }}>
              {loading ? "Checking..." : "Start My Mission →"}
            </button>
            <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textMuted, marginTop: 14 }}>Don't know your Class Code or PIN? Ask your teacher!</p>
          </form>
        )}
      </div>
    </div>
  );
}
