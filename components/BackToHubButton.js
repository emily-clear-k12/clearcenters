"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReadAloudButton from "./ReadAloudButton";
import { clearDeviceDrafts } from "../lib/deviceDraft";

const LINKS = [
  ["Missions", "/missions"],
  ["Progress", "/progress"],
  ["Star Chart", "/star-chart"],
  ["Badges", "/badges"],
  ["Gear Locker", "/gear-locker"],
];

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    function close(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  async function logout() {
    clearDeviceDrafts();
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="cc-student-bar" onClick={(event) => event.stopPropagation()} style={{ position: "fixed", top: 12, left: 12, zIndex: 60, display: "flex", gap: 8, flexWrap: "wrap", maxWidth: "calc(100% - 24px)" }}>
      <button type="button" className="gc-btn" onClick={() => router.push("/home")} style={{ ...pill, background: "rgba(255,255,255,.92)", color: "#1F2A44" }}>Home</button>
      <button type="button" className="gc-btn" aria-expanded={open} onClick={() => setOpen((value) => !value)} style={{ ...pill, background: "rgba(20,16,50,.62)", color: "#fff" }}>Menu</button>
      {readText ? <ReadAloudButton text={readText} /> : null}
      {open && (
        <div style={{ position: "absolute", top: 46, left: 0, minWidth: 190, background: "#fff", borderRadius: 16, padding: 8, boxShadow: "0 16px 40px rgba(20,16,50,.25)" }}>
          {LINKS.map(([label, href]) => (
            <button key={href} type="button" onClick={() => router.push(href)} style={{ display: "block", width: "100%", textAlign: "left", border: 0, background: "transparent", padding: "10px 12px", borderRadius: 10, fontWeight: 700, color: "#1F2A44", cursor: "pointer" }}>{label}</button>
          ))}
          <button type="button" onClick={logout} style={{ display: "block", width: "100%", textAlign: "left", border: 0, background: "transparent", padding: "10px 12px", borderRadius: 10, fontWeight: 700, color: "#7a3050", cursor: "pointer" }}>Log out</button>
        </div>
      )}
    </div>
  );
}
