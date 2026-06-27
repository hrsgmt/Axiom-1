import { HealthCheckResponse } from "@axiom/types";

async function getApiHealth(): Promise<HealthCheckResponse | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/health`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const health = await getApiHealth();

  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>AΞIOM∞</h1>
      <p>Switch modes, not apps.</p>
      <hr />
      <h2>API status</h2>
      {health ? (
        <pre>{JSON.stringify(health, null, 2)}</pre>
      ) : (
        <p style={{ color: "crimson" }}>
          Could not reach API. Is services/api running on port 4000?
        </p>
      )}
    </main>
  );
}
