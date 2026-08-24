"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, User, Lock, Mail, School, KeyRound } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const COLORS = {
  violet: "#7B5DFF",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

function Field({ label, icon, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {React.createElement(icon, { size: 17, style: { position: "absolute", left: 13, top: 13, color: COLORS.textMuted } })}
        {children}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  border: "2px solid #ECEAF5",
  borderRadius: 12,
  padding: "11px 12px 11px 38px",
  fontSize: 14.5,
  boxSizing: "border-box",
};

export default function TeacherSignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/teacher-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, school, email, password, teamCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      // Account created — sign them straight in.
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (signInError) {
        router.push("/login");
        return;
      }
      router.push("/teacher");
    } catch (err) {
      setLoading(false);
      setError("Couldn't reach the server. Check your connection and try again.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "min(680px, 100%)", background: COLORS.white, borderRadius: 26, boxShadow: "0 24px 60px rgba(0,0,0,.15)", padding: "44px 44px 36px" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 34, color: COLORS.textDark, margin: "0 0 8px 0" }}>
          Create Your Teacher Account
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 15, lineHeight: 1.5, margin: "0 0 26px 0" }}>
          Ask whoever invited you for the team code, then set up your account below.
        </p>

        {error && (
          <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Field label="Your Name" icon={User}>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ms. Clark" style={inputStyle} />
          </Field>

          <Field label="School (optional)" icon={School}>
            <input value={school} onChange={(e) => setSchool(e.target.value)} placeholder="Lincoln Elementary" style={inputStyle} />
          </Field>

          <Field label="Email" icon={Mail}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </Field>

          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={17} style={{ position: "absolute", left: 13, top: 13, color: COLORS.textMuted }} />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                style={{ ...inputStyle, padding: "11px 38px 11px 38px" }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: 10, background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted }}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <Field label="Team Code" icon={KeyRound}>
            <input required value={teamCode} onChange={(e) => setTeamCode(e.target.value)} placeholder="Ask your admin" style={inputStyle} />
          </Field>

          <button type="submit" disabled={loading} style={{ width: "100%", background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 12, padding: "13px 20px", fontWeight: 700, fontSize: 15.5, cursor: "pointer", marginTop: 4 }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textMuted, marginTop: 16 }}>
            Already have an account? <Link href="/login" style={{ color: COLORS.violet, fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
