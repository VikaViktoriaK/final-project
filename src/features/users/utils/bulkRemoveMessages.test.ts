import { bulkRemoveMessage } from "./bulkRemoveMessages";

describe("bulkRemoveMessage", () => {
  it("returns singular message for one selected item", () => {
    expect(
      bulkRemoveMessage(
        1,
        "Remove language?",
        (count) => `Remove ${count} languages?`,
      ),
    ).toBe("Remove language?");
  });

  it("returns plural message for multiple selected items", () => {
    expect(
      bulkRemoveMessage(
        3,
        "Remove language?",
        (count) => `Remove ${count} languages?`,
      ),
    ).toBe("Remove 3 languages?");
  });
});
