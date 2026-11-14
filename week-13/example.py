import csv
import io

SAMPLE = """id,category
R1,technology
,maintenance
R2, maintenance
"""


def clean_csv(content: str) -> tuple[list[dict[str, str]], int]:
    reader = csv.DictReader(io.StringIO(content))
    if reader.fieldnames is None or not {"id", "category"}.issubset(reader.fieldnames):
        raise ValueError("CSV must include id and category columns")
    clean = []
    rejected = 0
    for row in reader:
        identifier = (row["id"] or "").strip()
        category = (row["category"] or "").strip()
        if not identifier or not category:
            rejected += 1
            continue
        clean.append({"id": identifier, "category": category})
    return clean, rejected


if __name__ == "__main__":
    rows, dropped = clean_csv(SAMPLE)
    print(f"Accepted: {len(rows)}; rejected: {dropped}")
    print(rows)
