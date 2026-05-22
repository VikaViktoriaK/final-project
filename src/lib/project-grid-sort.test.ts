import {
  getProjectGridSortValue,
  sortProjectGridRows,
} from "./project-grid-sort";

describe("project grid sort", () => {
  const items = [
    {
      name: "Zulu",
      domain: "HR",
      start_date: "2024-01-01",
      end_date: "2024-12-31",
    },
    {
      name: "Alpha",
      domain: "Finance",
      start_date: "2023-01-01",
      end_date: null,
    },
  ];

  it("reads sort values by field", () => {
    expect(getProjectGridSortValue(items[0], "domain")).toBe("HR");
    expect(getProjectGridSortValue(items[1], "endDate")).toBe("");
    expect(getProjectGridSortValue(items[0], "startDate")).toBe("2024-01-01");
    expect(getProjectGridSortValue(items[0], "name")).toBe("Zulu");
  });

  it("sorts rows by selected field and direction", () => {
    expect(
      sortProjectGridRows(items, "name", "asc").map((item) => item.name),
    ).toEqual(["Alpha", "Zulu"]);
    expect(
      sortProjectGridRows(items, "startDate", "desc").map(
        (item) => item.start_date,
      ),
    ).toEqual(["2024-01-01", "2023-01-01"]);
  });
});
