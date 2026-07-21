import { CalendarDays, MapPin } from "lucide-react";
import { factories } from "../data/mockData";

export default function FilterBar({ factory, days, onFactoryChange, onDaysChange, source, updatedAt }) {
  return (
    <section className="filter-bar" aria-label="Dashboard filters">
      <div className="filter-group">
        <label htmlFor="factory"><MapPin size={16} /> Factory</label>
        <select id="factory" value={factory} onChange={(event) => onFactoryChange(event.target.value)}>
          <option value="All">All factories</option>
          {factories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="range"><CalendarDays size={16} /> Time range</label>
        <select id="range" value={days} onChange={(event) => onDaysChange(Number(event.target.value))}>
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
        </select>
      </div>
      <div className="data-source">
        <span className={`source-badge ${source}`}>{source === "live" ? "Flask API" : "Demo fallback"}</span>
        <span>Updated {new Date(updatedAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span>
      </div>
    </section>
  );
}
