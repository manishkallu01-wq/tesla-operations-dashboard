import { Activity, Database, Menu, RefreshCw } from "lucide-react";

export default function Header({ onRefresh, loading, sidebarOpen, onToggleSidebar }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onToggleSidebar} aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}>
        <Menu size={20} />
      </button>
      <div className="topbar-title">
        <div className="eyebrow"><Activity size={14} /> Live operations</div>
        <h1>Tesla Manufacturing Operations Dashboard</h1>
      </div>
      <div className="topbar-actions">
        <div className="system-pill" title="Analytics API status">
          <Database size={16} />
          <span>Analytics Platform</span>
          <span className="status-dot" />
        </div>
        <button className="secondary-button" onClick={onRefresh} disabled={loading}>
          <RefreshCw size={16} className={loading ? "spin" : ""} />
          Refresh
        </button>
      </div>
    </header>
  );
}
