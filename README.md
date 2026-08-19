# EV Manufacturing Operations Intelligence Dashboard

A production-style operations analytics dashboard for monitoring vehicle output, production targets, first-pass quality, downtime, factory performance, and operational exceptions across an EV manufacturing network.

> **reference project:** shows data-product thinking, operational KPI design, dashboard engineering, reliability/fallback behavior, and analytics-oriented UX. The displayed manufacturing data is synthetic and does not represent proprietary Tesla data.

## Dashboard Preview

<img width="2047" height="1122" alt="tesla-operations-dashboard" src="https://github.com/user-attachments/assets/4fde717c-2586-4c65-bd03-3c160138ae18" />

## Project Objective

Manufacturing teams need a single operational view that turns production and quality signals into actionable information. This project models that experience as an operations intelligence dashboard focused on:

- Production output versus plan
- Target attainment and throughput trends
- First-pass yield and quality monitoring
- Downtime and reliability indicators
- Factory/line comparison
- Operational alerts and exceptions
- Time-range and factory-level filtering

## Product Architecture

```text
Operational Data
      │
      ├── Production / target metrics
      ├── Quality / first-pass yield
      ├── Downtime / reliability
      └── Exception signals
              │
              ▼
      Analytics / Data Layer
              │
              ▼
      KPI + Aggregation Logic
              │
              ▼
      Operations Dashboard
              │
              ├── Executive KPIs
              ├── Trend analysis
              ├── Factory comparison
              └── Alerts / exceptions
```

The design separates operational metrics from their presentation so that the dashboard can evolve from synthetic data into a live manufacturing data product.

## Core Analytics

| Area | Operational question | Example KPI |
|---|---|---|
| Production | Are factories meeting plan? | Vehicles produced / target attainment |
| Quality | Are units passing inspection the first time? | First-pass yield |
| Reliability | Where is capacity being lost? | Average downtime |
| Factory performance | Which sites or lines need attention? | Output, quality, downtime |
| Exceptions | What requires operator attention? | Alert count / severity |

### KPI design

- **Vehicles produced** — total production volume for the selected period.
- **Target attainment** — actual output relative to the production plan.
- **First-pass quality** — share of units passing without rework or repeat inspection.
- **Average downtime** — average lost operating time per factory per day.
- **Output vs. target** — trend view for identifying sustained production gaps.

## Operations Workflow

1. Select a factory scope.
2. Select the operating time window.
3. Review network-level KPIs.
4. Compare actual production with target.
5. Check first-pass quality and reliability signals.
6. Investigate factory-level differences.
7. Prioritize operational exceptions requiring action.

## Engineering Focus

This project is intentionally positioned as a **Data Engineer + Analytics Engineering** reference project rather than only a visual UI exercise.

### Data engineering concepts represented

- Metric-oriented data modeling
- Aggregation and KPI computation
- Separation of data, business logic, and presentation
- Time-window filtering
- Operational exception handling
- Deterministic fallback behavior for unavailable live data
- Clear distinction between synthetic and production data

### Reliability considerations

The dashboard is designed to remain useful when a live analytics source is unavailable by exposing a clearly labeled fallback state rather than silently presenting synthetic data as live production information.

## Quality & Validation

Recommended validation for extending the project to production includes:

- Schema validation for incoming operational events
- Null and range checks for manufacturing KPIs
- Duplicate-event detection
- Freshness and completeness monitoring
- Unit tests for KPI calculations
- Integration tests for analytics/API boundaries
- Dashboard smoke tests for critical user flows

## Production Architecture Roadmap

A production deployment could evolve toward:

```text
Factory / MES / IoT Events
          │
          ▼
   Kafka / Event Streaming
          │
          ▼
 Spark / Stream Processing
          │
          ├── Quality + validation
          ├── Aggregations
          └── Operational alerts
          │
          ▼
 Data Lake / Warehouse
          │
          ▼
 Semantic KPI Layer / API
          │
          ▼
 Operations Dashboard
```

Potential production components include Kafka, Spark, an object-store data lake, Snowflake/BigQuery, dbt, Airflow, and containerized deployment depending on scale and organizational requirements.

## Business Value

The dashboard is designed to help manufacturing stakeholders:

- Detect production-plan gaps earlier.
- Identify quality deterioration before it becomes a larger rework problem.
- Compare factory performance using consistent KPIs.
- Surface downtime and operational exceptions in one place.
- Reduce the time required to move from raw operational signals to an actionable view.

## Technology Positioning

**Data Engineering:** ETL/ELT, KPI aggregation, data validation, operational analytics

**Streaming / Processing:** Kafka and Spark are natural production extensions for the modeled architecture

**Analytics:** Manufacturing KPIs, time-series trends, exception monitoring, comparative analysis

**Application:** Interactive operations dashboard with filtering and responsive visualization

**DevOps:** Containerized and CI/CD-oriented deployment can be added for productionization

## Future Enhancements

- Connect to a real event-streaming source.
- Add line-level drill-down and shift-level analysis.
- Introduce anomaly detection for production and quality metrics.
- Add alert thresholds and notification workflows.
- Persist historical KPI snapshots for trend analysis.
- Add role-based access for operators, plant managers, and executives.
- Add automated data-quality monitoring and observability.
- Deploy the dashboard with a cloud-hosted API and warehouse-backed semantic layer.

## Data & Disclaimer

This repository is a demonstration. **The manufacturing data shown in the dashboard is synthetic/demo data and is not Tesla proprietary information.** Tesla branding is used only to establish the EV-manufacturing context of the demonstration.

## About

**Manish Reddy Kallu** — Data Engineer focused on building reliable data pipelines, distributed processing workflows, analytics platforms, and operational data products.

- GitHub: [manishkallu01-wq](https://github.com/manishkallu01-wq)
- LinkedIn: [Manish Reddy Kallu](https://www.linkedin.com/)

## Contact

For collaboration, feedback, or opportunities, connect through GitHub or LinkedIn.

---

**Project focus:** Data Engineering · Analytics Engineering · Manufacturing Intelligence · Operational Analytics · Data Products

## Reproducibility contract

This is a portfolio operations simulator, not a connection to Tesla production systems. The repository is complete when both application layers install cleanly, frontend tests pass, the Flask API responds, and the dashboard renders the documented mock-data experience.

```bash
npm ci
npm test -- --run
python -m venv .venv
source .venv/bin/activate
pip install -r server/requirements.txt
python scripts/validate_project.py
```

| Layer | Responsibility | Verification |
|---|---|---|
| React/Vite | Operations UI and interaction model | Vitest + production build |
| Metrics utilities | Deterministic KPI calculations | Unit tests |
| Flask | Local dashboard API | Syntax/import smoke checks |
| Mock dataset | Stable demonstration data | Required-field validation |

## Decision methodology

The dashboard organizes operations around a simple loop: detect a KPI deviation, locate the affected factory or line, compare trend and target, review severity-ranked alerts, and identify the next operational action. Production use would require authenticated APIs, governed metric definitions, freshness SLAs, lineage, role-based access, alert ownership, and audit logs.
