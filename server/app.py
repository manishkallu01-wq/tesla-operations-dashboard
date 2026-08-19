from __future__ import annotations

from datetime import date, timedelta
import math
import random
from typing import Any

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

FACTORIES = ["Fremont", "Austin", "Berlin", "Shanghai"]


def seeded_noise(seed: int, minimum: float, maximum: float) -> float:
    rng = random.Random(seed)
    return rng.uniform(minimum, maximum)


def build_daily_series(days: int = 30) -> list[dict[str, Any]]:
    today = date.today()
    rows: list[dict[str, Any]] = []
    for offset in range(days - 1, -1, -1):
        current = today - timedelta(days=offset)
        for factory_index, factory in enumerate(FACTORIES):
            wave = math.sin((days - offset + factory_index) / 3.2)
            produced = round(760 + factory_index * 105 + wave * 65 + seeded_noise(offset * 17 + factory_index, -35, 35))
            target = 840 + factory_index * 100
            quality = round(96.8 + factory_index * 0.35 + seeded_noise(offset * 31 + factory_index, -0.9, 0.8), 1)
            downtime = round(max(0.4, 4.5 - factory_index * 0.45 + seeded_noise(offset * 41 + factory_index, -1.3, 1.4)), 1)
            rows.append(
                {
                    "date": current.isoformat(),
                    "factory": factory,
                    "produced": produced,
                    "target": target,
                    "quality": quality,
                    "downtime": downtime,
                    "energy": round(12.5 + factory_index * 1.2 + seeded_noise(offset * 53 + factory_index, -1.1, 1.0), 1),
                }
            )
    return rows


DAILY_SERIES = build_daily_series()
ALERTS = [
    {
        "id": 1,
        "severity": "critical",
        "factory": "Fremont",
        "title": "Paint line cycle-time variance",
        "description": "Station P-14 exceeded its cycle-time threshold for three consecutive runs.",
        "time": "8 min ago",
    },
    {
        "id": 2,
        "severity": "warning",
        "factory": "Austin",
        "title": "Battery module yield below target",
        "description": "Module yield is 1.2 percentage points below the shift target.",
        "time": "24 min ago",
    },
    {
        "id": 3,
        "severity": "info",
        "factory": "Berlin",
        "title": "Preventive maintenance completed",
        "description": "Robotic cell B-07 returned to service after scheduled maintenance.",
        "time": "42 min ago",
    },
]
OPERATIONS = [
    {"id": "LN-401", "factory": "Fremont", "area": "General Assembly", "throughput": 92, "quality": 98.4, "downtime": 1.7, "status": "Healthy"},
    {"id": "LN-219", "factory": "Austin", "area": "Battery Pack", "throughput": 86, "quality": 96.9, "downtime": 3.6, "status": "Watch"},
    {"id": "LN-118", "factory": "Berlin", "area": "Body Shop", "throughput": 95, "quality": 98.8, "downtime": 1.1, "status": "Healthy"},
    {"id": "LN-307", "factory": "Shanghai", "area": "Paint", "throughput": 89, "quality": 97.6, "downtime": 2.4, "status": "Healthy"},
    {"id": "LN-414", "factory": "Fremont", "area": "Paint", "throughput": 78, "quality": 95.7, "downtime": 5.2, "status": "Attention"},
    {"id": "LN-228", "factory": "Austin", "area": "General Assembly", "throughput": 91, "quality": 98.1, "downtime": 1.9, "status": "Healthy"},
]


def parse_dashboard_filters(factory: str, days_value: str) -> tuple[str, int]:
    if factory not in {"All", *FACTORIES}:
        raise ValueError("Unknown factory")
    try:
        days = int(days_value)
    except ValueError as exc:
        raise ValueError("days must be an integer") from exc
    if not 1 <= days <= 90:
        raise ValueError("days must be between 1 and 90")
    return factory, days


def filtered_daily(factory: str, days: int) -> list[dict[str, Any]]:
    cutoff = date.today() - timedelta(days=max(days - 1, 0))
    return [
        row
        for row in DAILY_SERIES
        if date.fromisoformat(row["date"]) >= cutoff and (factory == "All" or row["factory"] == factory)
    ]


def aggregate_by_date(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[str, dict[str, float]] = {}
    counts: dict[str, int] = {}
    for row in rows:
        day = row["date"]
        grouped.setdefault(day, {"produced": 0, "target": 0, "quality": 0, "downtime": 0})
        counts[day] = counts.get(day, 0) + 1
        grouped[day]["produced"] += row["produced"]
        grouped[day]["target"] += row["target"]
        grouped[day]["quality"] += row["quality"]
        grouped[day]["downtime"] += row["downtime"]
    result = []
    for day in sorted(grouped):
        count = counts[day]
        result.append(
            {
                "date": day,
                "produced": round(grouped[day]["produced"]),
                "target": round(grouped[day]["target"]),
                "quality": round(grouped[day]["quality"] / count, 1),
                "downtime": round(grouped[day]["downtime"] / count, 1),
            }
        )
    return result


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.get("/api/dashboard")
def dashboard():
    try:
        factory, days = parse_dashboard_filters(
            request.args.get("factory", "All"),
            request.args.get("days", "14"),
        )
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    rows = filtered_daily(factory, days)
    trend = aggregate_by_date(rows)

    total_produced = sum(item["produced"] for item in trend)
    total_target = sum(item["target"] for item in trend)
    average_quality = round(sum(item["quality"] for item in trend) / max(len(trend), 1), 1)
    average_downtime = round(sum(item["downtime"] for item in trend) / max(len(trend), 1), 1)

    latest_by_factory = [row for row in DAILY_SERIES if row["date"] == date.today().isoformat()]
    comparison = [
        {
            "factory": row["factory"],
            "output": row["produced"],
            "target": row["target"],
            "quality": row["quality"],
        }
        for row in latest_by_factory
    ]

    return jsonify(
        {
            "filters": {"factory": factory, "days": days},
            "kpis": {
                "production": total_produced,
                "attainment": round((total_produced / total_target) * 100, 1) if total_target else 0,
                "quality": average_quality,
                "downtime": average_downtime,
            },
            "trend": trend,
            "comparison": comparison,
            "alerts": [item for item in ALERTS if factory == "All" or item["factory"] == factory],
            "operations": [item for item in OPERATIONS if factory == "All" or item["factory"] == factory],
            "updatedAt": date.today().isoformat(),
        }
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
