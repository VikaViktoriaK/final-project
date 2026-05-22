import { normalizeCatalogItem } from "./skillCatalog.utils";

describe("normalizeCatalogItem", () => {
  it("normalizes category id and falls back to other", () => {
    expect(
      normalizeCatalogItem({
        id: "1",
        name: "React",
        category: { id: " frontend ", name: "Frontend" },
      }),
    ).toEqual({
      id: "1",
      name: "React",
      categoryId: "frontend",
    });

    expect(
      normalizeCatalogItem({
        id: "2",
        name: "Unknown",
        category: null,
      }),
    ).toEqual({
      id: "2",
      name: "Unknown",
      categoryId: "other",
    });
  });
});
