import importlib.util
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]


def load_week(week: int):
    path = ROOT / f"week-{week:02d}" / "example.py"
    spec = importlib.util.spec_from_file_location(f"week_{week}", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class DataExampleTests(unittest.TestCase):
    def test_summary_and_bad_data(self):
        week = load_week(12)
        self.assertEqual(week.summarize_csv(week.SAMPLE), {"count": 3, "median_minutes": 12})
        with self.assertRaises(ValueError):
            week.summarize_csv("minutes\n-1\n")
        with self.assertRaises(ValueError):
            week.summarize_csv("minutes\n")

    def test_cleaning_reports_rejected_rows(self):
        week = load_week(13)
        rows, rejected = week.clean_csv(week.SAMPLE)
        self.assertEqual(rejected, 1)
        self.assertEqual(rows[1], {"id": "R2", "category": "maintenance"})

    def test_integrated_request_invariant_and_counts(self):
        week = load_week(14)
        request = week.ServiceRequest("R1", "technology")
        with self.assertRaises(ValueError):
            request.close(" ")
        self.assertFalse(request.is_closed)
        request.close("fixed")
        self.assertTrue(request.is_closed)
        self.assertEqual(week.category_counts([request]), {"technology": 1})
        with self.assertRaises(ValueError):
            request.close("again")


if __name__ == "__main__":
    unittest.main()
