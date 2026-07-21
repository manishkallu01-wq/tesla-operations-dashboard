import { describe, expect, it } from "vitest";
import { filterOperations, formatNumber, toCsv } from "./metrics";

const rows = [
  { id: "LN-1", factory: "Austin", area: "Battery", throughput: 90, quality: 98, downtime: 2, status: "Healthy" },
  { id: "LN-2", factory: "Fremont", area: "Paint", throughput: 75, quality: 95, downtime: 5, status: "Attention" },
];

describe("metrics helpers", () => {
  it("filters by search and status", () => {
    expect(filterOperations(rows, "paint", "Attention")).toHaveLength(1);
  });

  it("formats large values", () => {
    expect(formatNumber(12000)).toBe("12,000");
  });

  it("creates a CSV with headers", () => {
    expect(toCsv(rows)).toContain('"Line","Factory"');
  });
});
