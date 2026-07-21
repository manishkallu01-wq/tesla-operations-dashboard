const factories = ["Fremont", "Austin", "Berlin", "Shanghai"];

const makeTrend = (days = 14, factory = "All") => {
  const selected = factory === "All" ? factories.length : 1;
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - index));
    const wave = Math.sin(index / 2.5) * 130;
    const produced = Math.round((870 * selected) + wave * selected + index * 9);
    const target = 920 * selected;
    return {
      date: date.toISOString().slice(0, 10),
      produced,
      target,
      quality: Number((97.1 + Math.sin(index / 3) * 0.7).toFixed(1)),
      downtime: Number((2.8 + Math.cos(index / 2) * 0.9).toFixed(1)),
    };
  });
};

const comparison = [
  { factory: "Fremont", output: 928, target: 960, quality: 97.8 },
  { factory: "Austin", output: 1044, target: 1020, quality: 98.2 },
  { factory: "Berlin", output: 861, target: 900, quality: 98.6 },
  { factory: "Shanghai", output: 1138, target: 1100, quality: 98.9 },
];

const alerts = [
  { id: 1, severity: "critical", factory: "Fremont", title: "Paint line cycle-time variance", description: "Station P-14 exceeded its cycle-time threshold for three consecutive runs.", time: "8 min ago" },
  { id: 2, severity: "warning", factory: "Austin", title: "Battery module yield below target", description: "Module yield is 1.2 percentage points below the shift target.", time: "24 min ago" },
  { id: 3, severity: "info", factory: "Berlin", title: "Preventive maintenance completed", description: "Robotic cell B-07 returned to service after scheduled maintenance.", time: "42 min ago" },
];

const operations = [
  { id: "LN-401", factory: "Fremont", area: "General Assembly", throughput: 92, quality: 98.4, downtime: 1.7, status: "Healthy" },
  { id: "LN-219", factory: "Austin", area: "Battery Pack", throughput: 86, quality: 96.9, downtime: 3.6, status: "Watch" },
  { id: "LN-118", factory: "Berlin", area: "Body Shop", throughput: 95, quality: 98.8, downtime: 1.1, status: "Healthy" },
  { id: "LN-307", factory: "Shanghai", area: "Paint", throughput: 89, quality: 97.6, downtime: 2.4, status: "Healthy" },
  { id: "LN-414", factory: "Fremont", area: "Paint", throughput: 78, quality: 95.7, downtime: 5.2, status: "Attention" },
  { id: "LN-228", factory: "Austin", area: "General Assembly", throughput: 91, quality: 98.1, downtime: 1.9, status: "Healthy" },
];

export function getMockDashboard(factory = "All", days = 14) {
  const trend = makeTrend(days, factory);
  const totalProduced = trend.reduce((sum, row) => sum + row.produced, 0);
  const totalTarget = trend.reduce((sum, row) => sum + row.target, 0);
  return {
    filters: { factory, days },
    kpis: {
      production: totalProduced,
      attainment: Number(((totalProduced / totalTarget) * 100).toFixed(1)),
      quality: Number((trend.reduce((sum, row) => sum + row.quality, 0) / trend.length).toFixed(1)),
      downtime: Number((trend.reduce((sum, row) => sum + row.downtime, 0) / trend.length).toFixed(1)),
    },
    trend,
    comparison,
    alerts: alerts.filter((item) => factory === "All" || item.factory === factory),
    operations: operations.filter((item) => factory === "All" || item.factory === factory),
    updatedAt: new Date().toISOString(),
  };
}

export { factories };
