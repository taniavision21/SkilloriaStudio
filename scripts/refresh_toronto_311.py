import csv
import io
import json
import urllib.request
import zipfile
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


PACKAGE_API = (
    "https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/"
    "package_show?id=311-service-requests-customer-initiated"
)
DATASET_PAGE = "https://open.toronto.ca/dataset/311-service-requests-customer-initiated/"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "public" / "data" / "toronto-311.json"
COMPLETED_STATUSES = {"completed", "closed"}
ACTIVE_STATUSES = {"initiated", "new", "in progress"}
CANCELED_STATUSES = {"canceled", "cancelled"}


def fetch_json(url: str) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": "SkilloriaToronto311Dashboard/1.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.load(response)


def download_bytes(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "SkilloriaToronto311Dashboard/1.0"})
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def increment(group: dict, key: str, completed: bool) -> None:
    item = group[key]
    item["requests"] += 1
    if completed:
        item["completed"] += 1


def main() -> None:
    year = datetime.now().year
    catalogue = fetch_json(PACKAGE_API)
    if not catalogue.get("success"):
        raise RuntimeError("Toronto Open Data did not return dataset metadata.")

    resource_name = f"311 Service Requests {year}"
    resource = next(
        (
            item
            for item in catalogue["result"]["resources"]
            if item.get("format", "").upper() == "ZIP"
            and item.get("name", "").strip().casefold() == resource_name.casefold()
        ),
        None,
    )
    if resource is None:
        raise RuntimeError(f"Could not find the current-year dataset resource: {resource_name}.")

    archive_data = download_bytes(resource["url"])
    with zipfile.ZipFile(io.BytesIO(archive_data)) as archive:
        csv_name = next((name for name in archive.namelist() if name.lower().endswith(".csv")), None)
        if csv_name is None:
            raise RuntimeError("The downloaded ZIP archive contains no CSV file.")

        monthly = defaultdict(lambda: {"requests": 0, "completed": 0})
        wards = defaultdict(lambda: {"requests": 0, "completed": 0})
        request_types = defaultdict(lambda: {"requests": 0, "completed": 0})
        divisions = defaultdict(lambda: {"requests": 0, "completed": 0})
        statuses = Counter()
        total_requests = 0
        missing_creation_dates = 0

        with archive.open(csv_name) as raw_csv:
            text_stream = io.TextIOWrapper(raw_csv, encoding="cp1252", newline="")
            reader = csv.DictReader(text_stream)
            required_columns = {"Creation Date", "Status", "Ward", "Service Request Type", "Division"}
            missing_columns = required_columns.difference(reader.fieldnames or [])
            if missing_columns:
                raise RuntimeError(f"Dataset is missing required columns: {', '.join(sorted(missing_columns))}.")

            for row in reader:
                total_requests += 1
                status = (row.get("Status") or "Unknown").strip() or "Unknown"
                status_key = status.casefold()
                is_completed = status_key in COMPLETED_STATUSES
                statuses[status] += 1

                creation_date = (row.get("Creation Date") or "").strip()
                try:
                    created = datetime.fromisoformat(creation_date)
                    month = created.strftime("%Y-%m")
                    monthly[month]["requests"] += 1
                    if is_completed:
                        monthly[month]["completed"] += 1
                except ValueError:
                    missing_creation_dates += 1

                increment(wards, (row.get("Ward") or "Unknown").strip() or "Unknown", is_completed)
                increment(
                    request_types,
                    (row.get("Service Request Type") or "Unknown").strip() or "Unknown",
                    is_completed,
                )
                increment(divisions, (row.get("Division") or "Unknown").strip() or "Unknown", is_completed)

    completed_requests = sum(statuses[status] for status in statuses if status.casefold() in COMPLETED_STATUSES)
    active_requests = sum(statuses[status] for status in statuses if status.casefold() in ACTIVE_STATUSES)
    canceled_requests = sum(statuses[status] for status in statuses if status.casefold() in CANCELED_STATUSES)

    def ranked(group: dict, limit: int) -> list[dict]:
        return [
            {
                "name": name,
                "requests": values["requests"],
                "completed": values["completed"],
                "completedShare": round(values["completed"] / values["requests"], 4),
            }
            for name, values in sorted(group.items(), key=lambda pair: (-pair[1]["requests"], pair[0]))[:limit]
        ]

    report = {
        "source": {
            "title": "311 Service Requests - Customer Initiated",
            "datasetUrl": DATASET_PAGE,
            "resourceName": resource_name,
            "resourceUpdatedAt": resource.get("last_modified"),
            "year": year,
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "scopeNote": "This dataset covers customer-initiated requests captured by participating City divisions; it does not represent all 311 contacts.",
            "resolutionNote": "The published file has no completion timestamp, so request resolution time cannot be calculated.",
        },
        "metrics": {
            "totalRequests": total_requests,
            "completedRequests": completed_requests,
            "completedShare": round(completed_requests / total_requests, 4) if total_requests else 0,
            "activeRequests": active_requests,
            "canceledRequests": canceled_requests,
            "missingCreationDates": missing_creation_dates,
        },
        "statuses": [
            {"name": status, "requests": count}
            for status, count in sorted(statuses.items(), key=lambda pair: (-pair[1], pair[0]))
        ],
        "monthly": [{"month": month, **monthly[month]} for month in sorted(monthly)],
        "wards": ranked(wards, 25),
        "requestTypes": ranked(request_types, 12),
        "divisions": ranked(divisions, 12),
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = OUTPUT_PATH.with_suffix(".json.tmp")
    temporary_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    temporary_path.replace(OUTPUT_PATH)
    print(f"Wrote {total_requests:,} requests for {year} to {OUTPUT_PATH}")
    if missing_creation_dates:
        print(f"Skipped monthly aggregation for {missing_creation_dates:,} rows with invalid creation dates.")


if __name__ == "__main__":
    main()