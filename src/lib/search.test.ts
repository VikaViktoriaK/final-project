import {
  compareLocaleStrings,
  filterAndSortByField,
  normalizeSearchText,
} from "./search";

describe("search helpers", () => {
  const items = [
    { name: "Zulu" },
    { name: "alpha" },
    { name: "Beta" },
    { name: "Alpine" },
  ];

  it("normalizes search text", () => {
    expect(normalizeSearchText("  HeLLo  ")).toBe("hello");
  });

  it("compares strings case-insensitively", () => {
    expect(compareLocaleStrings("alpha", "Beta")).toBeLessThan(0);
    expect(compareLocaleStrings("Zulu", "beta")).toBeGreaterThan(0);
  });

  it("filters and sorts matching items ascending", () => {
    expect(
      filterAndSortByField(items, "al", "asc", (item) => item.name),
    ).toEqual([{ name: "alpha" }, { name: "Alpine" }]);
  });

  it("sorts all items descending when query is empty", () => {
    expect(
      filterAndSortByField(items, "", "desc", (item) => item.name),
    ).toEqual([
      { name: "Zulu" },
      { name: "Beta" },
      { name: "Alpine" },
      { name: "alpha" },
    ]);
  });
});
