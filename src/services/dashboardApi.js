import { getMockDashboard } from "../data/mockData";

export async function fetchDashboard(factory, days, signal) {
  try {
    const params = new URLSearchParams({ factory, days: String(days) });
    const response = await fetch(`/api/dashboard?${params}`, { signal });
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    return { data: await response.json(), source: "live" };
  } catch (error) {
    if (error.name === "AbortError") throw error;
    return { data: getMockDashboard(factory, days), source: "demo" };
  }
}
