import { BarChart3, Factory, Gauge, ShieldCheck, X } from "lucide-react";

const navItems = [
  { icon: BarChart3, label: "Overview", active: true },
  { icon: Factory, label: "Production" },
  { icon: Gauge, label: "Quality" },
  { icon: ShieldCheck, label: "Reliability" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">EV</div>
          <div>
            <strong>Operations</strong>
            <span>Intelligence</span>
          </div>
          <button className="icon-button close-sidebar" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <nav aria-label="Primary navigation">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button key={label} className={`nav-item ${active ? "active" : ""}`} type="button">
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="demo-label">Synthetic Manufacturing Data</div>
          <p>Synthetic operational data. No proprietary information.</p>
        </div>
      </aside>
    </>
  );
}
