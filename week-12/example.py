import csv
import io
from statistics import median

SAMPLE = """category,minutes
technology,12
maintenance,8
technology,20
"""


def summarize_csv(content: str) -> dict[str, int | float]:
    reader = csv.DictReader(io.StringIO(content))
    if reader.fieldnames is None or "minutes" not in reader.fieldnames:
        raise ValueError("CSV must include a minutes column")
    values = []
    for row in reader:
        try:
            value = int(row["minutes"])
        except (TypeError, ValueError) as exc:
            raise ValueError("Each row needs integer minutes") from exc
        if value < 0:
            raise ValueError("Minutes cannot be negative")
        values.append(value)
    if not values:
        raise ValueError("At least one row is required")
    return {"count": len(values), "median_minutes": median(values)}


if __name__ == "__main__":
    print(summarize_csv(SAMPLE))
