"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F2F0FA", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <h1 style={{ fontFamily: "'Poppins', sans-serif", color: "#1F2A44" }}>You're in! 🎉</h1>
      <p style={{ color: "#8892A6", marginBottom: 20 }}>Login worked — the real Student Home dashboard gets built here next.</p>
      <button
        onClick={handleLogout}
        style={{ background: "#7B5DFF", color: "#FFFFFF", border: "none", borderRadius: 999, padding: "10px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
      >
        Log Out
      </button>
    </div>
  );
}
