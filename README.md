# EV Operations Intelligence Dashboard

A responsive full-stack analytics application built for a Tesla Applications Engineering interview portfolio. It converts complex synthetic factory data into a clear operational view for business and engineering users.

> **Important:** All data is synthetic. This is an independent interview demonstration and is not an official Tesla product.

## What it demonstrates

- React component architecture and reusable UI components
- Responsive, accessible layouts for desktop, tablet, and mobile
- Interactive filtering by factory and time range
- Recharts visualizations for production, target attainment, and factory comparison
- Flask REST API with a frontend fallback when the API is unavailable
- Search, status filtering, alert acknowledgement, localStorage persistence, and CSV export
- Unit tests for filtering, formatting, and export helpers
- Ownership from development to a production build

## Run the complete application

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install the Flask API dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r server/requirements.txt
```

### 3. Start React and Flask together

```bash
npm run dev:all
```

Open: `http://localhost:5173`

The Flask API runs at `http://127.0.0.1:5000`.

## Fastest frontend-only run

The dashboard automatically falls back to local synthetic data if Flask is unavailable.

```bash
npm install
npm run dev
```

## Test and production build

```bash
npm test
npm run build
npm run preview
```

## Interview explanation

> I built a responsive operations analytics dashboard in React to turn complex factory data into a digestible interface. The application consumes a Flask REST API, supports factory and date filters, visualizes production and quality metrics, surfaces operational alerts, and provides searchable line-level details with CSV export. I focused on reusable components, accessibility, responsive design, API reliability through graceful fallback behavior, and owning the solution from development through a tested production build.

## Suggested 90-second walkthrough

1. Start with the four KPIs and explain how they summarize production, plan attainment, first-pass quality, and downtime.
2. Change the factory and time-range filters to show interactive state and API requests.
3. Explain the output-versus-target and factory-comparison charts.
4. Acknowledge an alert and mention localStorage persistence.
5. Search the operations table, filter by status, and export the result to CSV.
6. Mention that the React client falls back to local data when the Flask API is unavailable.

## Architecture

```text
React UI
  ├── reusable dashboard components
  ├── filter/search state
  ├── Recharts visualizations
  └── API service with graceful fallback
          │
          ▼
Flask REST API
  ├── /api/health
  └── /api/dashboard?factory=All&days=14
          │
          ▼
Synthetic operational dataset
```
