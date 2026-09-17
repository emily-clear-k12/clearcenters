import Link from "next/link";

// CI2.0 home in the sandbox. A starting point: each card becomes a real
// CI2.0 page as the build plan moves forward.
const AREAS = [
  { href: "/v2/teacher", title: "Teacher · This Week", note: "The 10-minute Monday" },
  { href: "/v2/student", title: "Student · My Day", note: "Now / Next / Later" },
];

export default function CI2Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#F7F5FF", padding: "40px 16px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", color: "#2E2459", marginBottom: 4 }}>Crystal Instruction 2.0</h1>
        <p style={{ color: "#5C5480", marginTop: 0 }}>Sandbox preview. Pages appear here as they are built.</p>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: 24 }}>
          {AREAS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              style={{ display: "block", padding: 20, borderRadius: 16, background: "#fff", border: "1px solid #E3DEFA", textDecoration: "none", color: "#2E2459" }}
            >
              <div style={{ fontWeight: 700, fontSize: 18 }}>{a.title}</div>
              <div style={{ color: "#5C5480", marginTop: 6 }}>{a.note}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
