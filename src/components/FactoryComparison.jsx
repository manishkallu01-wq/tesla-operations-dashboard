import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function FactoryComparison({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Network view</span>
          <h2>Factory comparison</h2>
        </div>
        <span className="panel-note">Current shift</span>
      </div>
      <div className="chart-wrapper" role="img" aria-label="Bar chart comparing output and target by factory">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#2b3038" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="factory" stroke="#8f98a8" tickLine={false} axisLine={false} />
            <YAxis stroke="#8f98a8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#14171c", border: "1px solid #303640", borderRadius: 10 }} />
            <Legend wrapperStyle={{ color: "#b7bec9" }} />
            <Bar dataKey="target" name="Target" fill="#4a5260" radius={[5, 5, 0, 0]} />
            <Bar dataKey="output" name="Output" fill="#e82127" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
