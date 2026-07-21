export default function KpiCard({ icon: Icon, label, value, detail, tone = "neutral" }) {
  return (
    <article className={`kpi-card ${tone}`}>
      <div className="kpi-icon"><Icon size={20} /></div>
      <div>
        <span className="kpi-label">{label}</span>
        <strong className="kpi-value">{value}</strong>
        <span className="kpi-detail">{detail}</span>
      </div>
    </article>
  );
}
