"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReadAloudButton from "./ReadAloudButton";
import { clearDeviceDrafts } from "../lib/deviceDraft";

const pill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  border: "none",
  borderRadius: 999,
  padding: "8px 14px",
  fontWeight: 700,
  fontSize: 13,
  cursor: "pointer",
  fontFamily: "Inter, sans-serif",
};

export default function BackToHubButton({ readText }) {
  const router = useRouter();

  async function logout() {
    clearDeviceDrafts();
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="cc-student-bar" style={{ position: "fixed", top: 12, left: 12, zIndex: 60, display: "flex", gap: 8, flexWrap: "wrap", maxWidth: "calc(100% - 24px)" }}>
      <button type="button" className="gc-btn" onClick={() => router.push("/home")} style={{ ...pill, background: "rgba(255,255,255,.92)", color: "#1F2A44" }}>Home</button>
      {readText ? <ReadAloudButton text={readText} /> : null}
      <button type="button" className="gc-btn" onClick={logout} style={{ ...pill, background: "rgba(20,16,50,.62)", color: "#fff" }}>Log out</button>
    </div>
  );
}
