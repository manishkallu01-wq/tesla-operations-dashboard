import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function QualityGauge({ value }) {
  const data = [{ value }, { value: Math.max(0, 100 - value) }];
  return (
    <section className="panel quality-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Quality</span>
          <h2>First-pass yield</h2>
        </div>
      </div>
      <div className="gauge-wrap">
        <ResponsiveContainer width="100%" height={210}>
          <PieChart>
            <Pie data={data} dataKey="value" startAngle={210} endAngle={-30} innerRadius={72} outerRadius={94} paddingAngle={0} stroke="none">
              <Cell fill="#e82127" />
              <Cell fill="#2b3038" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="gauge-label"><strong>{value}%</strong><span>network average</span></div>
      </div>
      <div className="quality-legend">
        <div><span>Goal</span><strong>≥ 98.0%</strong></div>
        <div><span>Trend</span><strong className={value >= 98 ? "positive" : "warning-text"}>{value >= 98 ? "On target" : "Monitor"}</strong></div>
      </div>
    </section>
  );
}
