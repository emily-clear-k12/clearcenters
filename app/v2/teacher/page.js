import Link from "next/link";

// Placeholder — this becomes the real CI2.0 page in Phase 1 of the build plan.
export default function Page() {
  return (
    <main style={{ minHeight: "100vh", background: "#F7F5FF", padding: "40px 16px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", color: "#2E2459" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Teacher · This Week</h1>
        <p style={{ color: "#5C5480" }}>Coming soon in the CI2.0 sandbox.</p>
        <Link href="/v2" style={{ color: "#7C5CFF" }}>Back to CI2.0 home</Link>
      </div>
    </main>
  );
}
