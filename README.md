# EV Manufacturing Operations Intelligence Dashboard

> Full-stack operations analytics application for monitoring synthetic EV manufacturing performance across factories, production lines, quality, downtime, alerts, and target attainment.

> **Portfolio disclaimer:** All operational data is synthetic and independently created for demonstration. This is **not an official Tesla product or internal Tesla system**.

## Why This Project

This project demonstrates how a Data/Analytics Engineer can turn operational data into a reliable decision-support interface. It combines a React frontend, Flask REST API, structured operational metrics, filtering, alert workflows, and exportable line-level data.

## Architecture

```text
Synthetic Factory Operations Data
              │
              ▼
        Flask REST API
        ├── /api/health
        └── /api/dashboard
              │
              ▼
        React Analytics UI
        ├── KPI monitoring
        ├── production trends
        ├── factory comparison
        ├── quality monitoring
        ├── operational alerts
        └── line-level search/export
              │
              ▼
       Business Decisions
```

## Key Capabilities

- Production output vs. target attainment
- First-pass quality monitoring
- Average downtime analysis
- Factory-level performance comparison
- Operational alert prioritization and acknowledgement
- Searchable line-level operational table
- Status filtering across Healthy / Watch / Attention states
- CSV export for downstream analysis
- API health endpoint
- Frontend fallback for API unavailability
- Responsive React UI with reusable components
- Unit tests and production build workflow

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite |
| Visualization | Recharts |
| UI | Lucide React, CSS |
| Backend | Python, Flask |
| API | REST / JSON |
| Testing | Vitest |
| Development | npm, Vite |
| Data | Synthetic operational dataset |

## Operational Data Model

The API exposes four primary analytical areas:

| Dataset | Purpose |
|---|---|
| Daily production series | Output, target, quality, downtime, energy by factory/date |
| Factory comparison | Current production and quality performance by factory |
| Alerts | Operational events with severity, factory, description, and time |
| Operations | Line-level throughput, quality, downtime, and status |

## API

### Health Check

```http
GET /api/health
```

Returns a lightweight service-health response.

### Dashboard Data

```http
GET /api/dashboard?factory=All&days=14
```

Supported filters:

- `factory`: `All`, `Fremont`, `Austin`, `Berlin`, or `Shanghai`
- `days`: selected historical window

The response contains filters, KPIs, trend data, factory comparison data, alerts, operations, and an update timestamp.

## Project Structure

```text
tesla-operations-dashboard/
├── src/
│   ├── components/          # Reusable dashboard components
│   ├── data/                # Demo/fallback dataset
│   ├── services/            # REST API integration
│   ├── utils/               # Metrics, filtering, and CSV helpers
│   └── App.jsx              # Application composition
├── server/
│   ├── app.py               # Flask REST API and synthetic data layer
│   └── requirements.txt     # Backend dependencies
├── tests/                   # Frontend/unit tests
├── package.json
├── vite.config.js
└── README.md
```

## Run Locally

### Frontend + API

```bash
npm install

python3 -m venv .venv
source .venv/bin/activate
pip install -r server/requirements.txt

npm run dev:all
```

Open the frontend at `http://localhost:5173`.

The Flask API runs at `http://127.0.0.1:5000`.

### Frontend Only

The application can run with the local demo dataset when the API is unavailable:

```bash
npm install
npm run dev
```

## Test & Production Build

```bash
npm test
npm run build
npm run preview
```

## Engineering Decisions

### API fallback

The frontend does not fail completely when the backend is unavailable. The API service falls back to deterministic local data, making the UI usable for demonstrations and development.

### Deterministic synthetic data

The backend uses seeded random variation rather than uncontrolled randomness, which keeps the demo reproducible while still producing realistic operational movement.

### Separation of concerns

The application separates UI components, API access, data generation, and metric utilities so each layer can evolve independently.

### Operational state

Alert acknowledgement is persisted in browser storage, allowing an operator's workflow state to survive page refreshes during a session.

## Portfolio Talking Points

- Designed a full-stack operational analytics workflow rather than a static dashboard.
- Implemented REST-based data serving with explicit filtering parameters.
- Built reusable React components for KPIs, charts, alerts, filters, and line-level operations.
- Added data-export capability for downstream operational analysis.
- Added graceful API failure handling and a health endpoint.
- Added automated tests and a production build pipeline.

## Production Extensions

A production deployment could replace the synthetic source with a streaming or batch data platform and add:

- Kafka or cloud event ingestion
- Object storage / data lake layer
- Spark or SQL transformation jobs
- Warehouse dimensional modeling
- Airflow orchestration
- Data-quality testing and observability
- Authentication and role-based access
- Prometheus/Grafana monitoring
- CI/CD and containerized deployment

## Interview Summary

**Built a full-stack EV manufacturing operations dashboard using React and Flask, exposing production, target attainment, quality, downtime, alerts, and line-level metrics through a filtered REST API with resilient frontend fallback, automated tests, and CSV-based operational reporting.**
