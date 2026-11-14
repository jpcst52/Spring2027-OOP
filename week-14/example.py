from collections import Counter, deque


class ServiceRequest:
    def __init__(self, identifier: str, category: str) -> None:
        if not identifier.strip() or not category.strip():
            raise ValueError("An identifier and category are required")
        self.identifier = identifier.strip()
        self.category = category.strip()
        self._resolution: str | None = None

    @property
    def is_closed(self) -> bool:
        return self._resolution is not None

    def close(self, resolution: str) -> None:
        if self.is_closed:
            raise ValueError("Request is already closed")
        if not resolution.strip():
            raise ValueError("A resolution is required")
        self._resolution = resolution.strip()


def category_counts(requests: list[ServiceRequest]) -> dict[str, int]:
    return dict(Counter(request.category for request in requests))


if __name__ == "__main__":
    waiting = deque([
        ServiceRequest("R1", "technology"),
        ServiceRequest("R2", "maintenance"),
    ])
    first = waiting.popleft()
    first.close("Replaced toner")
    print("First completed:", first.identifier, first.is_closed)
    print("Remaining categories:", category_counts(list(waiting)))
