import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

const icons = { critical: AlertCircle, warning: TriangleAlert, info: Info };

export default function AlertsPanel({ alerts, acknowledged, onAcknowledge }) {
  return (
    <section className="panel alerts-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">Exceptions</span>
          <h2>Operational alerts</h2>
        </div>
        <span className="alert-count">{alerts.length}</span>
      </div>
      <div className="alert-list">
        {alerts.length === 0 && <div className="empty-state"><CheckCircle2 size={28} /><p>No active alerts for this factory.</p></div>}
        {alerts.map((alert) => {
          const Icon = icons[alert.severity];
          const isAcknowledged = acknowledged.includes(alert.id);
          return (
            <article className={`alert-row ${alert.severity} ${isAcknowledged ? "acknowledged" : ""}`} key={alert.id}>
              <Icon size={20} />
              <div className="alert-copy">
                <div className="alert-title-row"><strong>{alert.title}</strong><span>{alert.time}</span></div>
                <p>{alert.description}</p>
                <div className="alert-meta"><span>{alert.factory}</span><button onClick={() => onAcknowledge(alert.id)}>{isAcknowledged ? "Acknowledged" : "Acknowledge"}</button></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
