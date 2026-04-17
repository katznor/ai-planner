"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const generatePlan = async () => {
    const res = await fetch("/api/plan", {
      method: "POST",
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResult(data.text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Travel Planner</h1>

      <textarea
        rows={4}
        cols={50}
        placeholder="Plan my trip to Tokyo"
        onChange={(e) => setInput(e.target.value)}
      />

      <br /><br />

      <button onClick={generatePlan}>Generate Plan</button>

      <pre>{result}</pre>
    </div>
  );
}