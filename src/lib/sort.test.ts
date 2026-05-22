import { sortByLocaleCompare, toggleSortDirection } from "./sort";

describe("sort helpers", () => {
  const items = [{ name: "Charlie" }, { name: "Alpha" }, { name: "Bravo" }];

  it("toggles sort direction", () => {
    expect(toggleSortDirection("asc")).toBe("desc");
    expect(toggleSortDirection("desc")).toBe("asc");
  });

  it("sorts by locale value ascending without mutating the input", () => {
    const sorted = sortByLocaleCompare(items, (item) => item.name, "asc");

    expect(sorted.map((item) => item.name)).toEqual([
      "Alpha",
      "Bravo",
      "Charlie",
    ]);
    expect(items.map((item) => item.name)).toEqual([
      "Charlie",
      "Alpha",
      "Bravo",
    ]);
  });

  it("sorts by locale value descending", () => {
    const sorted = sortByLocaleCompare(items, (item) => item.name, "desc");

    expect(sorted.map((item) => item.name)).toEqual([
      "Charlie",
      "Bravo",
      "Alpha",
    ]);
  });
});
