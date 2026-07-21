import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function shortDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ProductionTrend({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Production</span>
          <h2>Output vs. target</h2>
        </div>
        <span className="panel-note">Daily vehicle units</span>
      </div>
      <div className="chart-wrapper" role="img" aria-label="Area chart comparing daily production output with target">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="productionFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e82127" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#e82127" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2b3038" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={shortDate} stroke="#8f98a8" tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis stroke="#8f98a8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#14171c", border: "1px solid #303640", borderRadius: 10 }} labelFormatter={shortDate} />
            <Legend wrapperStyle={{ color: "#b7bec9" }} />
            <Area type="monotone" dataKey="target" name="Target" stroke="#7b8494" fill="transparent" strokeDasharray="6 5" strokeWidth={2} />
            <Area type="monotone" dataKey="produced" name="Produced" stroke="#e82127" fill="url(#productionFill)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
