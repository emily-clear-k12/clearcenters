"use client";

import { useState } from "react";

export default function TestAI() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function testCall() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Say hello in exactly five words." }],
          max_tokens: 50,
        }),
      });
      const data = await res.json();
      setResult(res.ok ? data.text : "Error: " + data.error);
    } catch (err) {
      setResult("Error: couldn't reach the server.");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1>AI Connection Test</h1>
        <button onClick={testCall} disabled={loading} style={{ padding: "10px 20px", fontSize: 16, cursor: "pointer" }}>
          {loading ? "Testing..." : "Test the AI Connection"}
        </button>
        {result && (
          <p style={{ marginTop: 20, padding: 16, background: "#f0f0f0", borderRadius: 8, maxWidth: 400 }}>
            {result}
          </p>
        )}
      </div>
    </div>
  );
}
