import { useEffect, useState } from "react";
import { HealthCheckResponse } from "@axiom/types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export default function App() {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(setHealth)
      .catch(() => setError(true));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>AΞIOM∞</h1>
      <p>Switch modes, not apps.</p>
      <hr />
      <h2>API status</h2>
      {error && (
        <p style={{ color: "crimson" }}>
          Could not reach API. Is services/api running on port 4000?
        </p>
      )}
      {!error && !health && <p>Loading...</p>}
      {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
    </main>
  );
}
