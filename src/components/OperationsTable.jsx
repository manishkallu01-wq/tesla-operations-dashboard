import { Download, Search } from "lucide-react";
import { filterOperations, statusClass, toCsv } from "../utils/metrics";

export default function OperationsTable({ rows, search, status, onSearch, onStatus }) {
  const filtered = filterOperations(rows, search, status);

  function downloadCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "operations-lines.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="panel table-panel">
      <div className="panel-heading table-heading">
        <div>
          <span className="panel-kicker">Line-level view</span>
          <h2>Operations health</h2>
        </div>
        <div className="table-actions">
          <label className="search-box"><Search size={16} /><span className="sr-only">Search lines</span><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search line, factory, area…" /></label>
          <select aria-label="Filter by status" value={status} onChange={(event) => onStatus(event.target.value)}>
            <option>All</option><option>Healthy</option><option>Watch</option><option>Attention</option>
          </select>
          <button className="secondary-button" onClick={downloadCsv}><Download size={16} /> Export</button>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Line</th><th>Factory</th><th>Area</th><th>Throughput</th><th>Quality</th><th>Downtime</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.id}</strong></td><td>{row.factory}</td><td>{row.area}</td>
                <td><div className="progress-cell"><div className="progress-track"><span style={{ width: `${row.throughput}%` }} /></div><span>{row.throughput}%</span></div></td>
                <td>{row.quality}%</td><td>{row.downtime}h</td><td><span className={`status-chip ${statusClass(row.status)}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty-table">No operations match the selected filters.</div>}
      </div>
    </section>
  );
}
