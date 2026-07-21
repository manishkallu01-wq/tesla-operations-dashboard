import { useCallback, useEffect, useMemo, useState } from "react";
import { Clock3, Factory, ShieldCheck, Target } from "lucide-react";
import AlertsPanel from "./components/AlertsPanel";
import FactoryComparison from "./components/FactoryComparison";
import FilterBar from "./components/FilterBar";
import Header from "./components/Header";
import KpiCard from "./components/KpiCard";
import OperationsTable from "./components/OperationsTable";
import ProductionTrend from "./components/ProductionTrend";
import QualityGauge from "./components/QualityGauge";
import Sidebar from "./components/Sidebar";
import { getMockDashboard } from "./data/mockData";
import { fetchDashboard } from "./services/dashboardApi";
import { formatNumber } from "./utils/metrics";

export default function App() {
  const [factory, setFactory] = useState("All");
  const [days, setDays] = useState(14);
  const [dashboard, setDashboard] = useState(() => getMockDashboard("All", 14));
  const [source, setSource] = useState("demo");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [acknowledged, setAcknowledged] = useState(() => {
    try { return JSON.parse(localStorage.getItem("acknowledged-alerts") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchDashboard(factory, days, controller.signal)
      .then((result) => { setDashboard(result.data); setSource(result.source); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [factory, days, refreshKey]);

  const handleAcknowledge = useCallback((id) => {
    setAcknowledged((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem("acknowledged-alerts", JSON.stringify(next));
      return next;
    });
  }, []);

  const kpis = useMemo(() => [
    { icon: Factory, label: "Vehicles produced", value: formatNumber(dashboard.kpis.production), detail: `${days}-day selected period`, tone: "red" },
    { icon: Target, label: "Target attainment", value: `${dashboard.kpis.attainment}%`, detail: dashboard.kpis.attainment >= 100 ? "At or above plan" : "Against production plan", tone: dashboard.kpis.attainment >= 100 ? "green" : "amber" },
    { icon: ShieldCheck, label: "First-pass quality", value: `${dashboard.kpis.quality}%`, detail: "Average across active lines", tone: dashboard.kpis.quality >= 98 ? "green" : "amber" },
    { icon: Clock3, label: "Average downtime", value: `${dashboard.kpis.downtime}h`, detail: "Per factory per day", tone: dashboard.kpis.downtime <= 2.5 ? "green" : "amber" },
  ], [dashboard, days]);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Header loading={loading} onRefresh={() => setRefreshKey((value) => value + 1)} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((value) => !value)} />
        <main className="content">
          <FilterBar factory={factory} days={days} onFactoryChange={setFactory} onDaysChange={setDays} source={source} updatedAt={dashboard.updatedAt} />
          <section className="kpi-grid" aria-label="Key performance indicators">
            {kpis.map((item) => <KpiCard key={item.label} {...item} />)}
          </section>
          <section className="primary-grid">
            <ProductionTrend data={dashboard.trend} />
            <QualityGauge value={dashboard.kpis.quality} />
          </section>
          <section className="secondary-grid">
            <FactoryComparison data={dashboard.comparison} />
            <AlertsPanel alerts={dashboard.alerts} acknowledged={acknowledged} onAcknowledge={handleAcknowledge} />
          </section>
          <OperationsTable rows={dashboard.operations} search={search} status={status} onSearch={setSearch} onStatus={setStatus} />
        </main>
      </div>
    </div>
  );
}
