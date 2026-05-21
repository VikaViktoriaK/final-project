import formatDisplayDate from "./format-display-date";

describe("formatDisplayDate", () => {
  it("returns fallback label for empty values", () => {
    expect(formatDisplayDate(null)).toBe("Till now");
    expect(formatDisplayDate(undefined)).toBe("Till now");
    expect(formatDisplayDate("")).toBe("Till now");
  });

  it("formats valid ISO dates in en-GB format", () => {
    expect(formatDisplayDate("2024-06-15T12:00:00.000Z")).toBe("15/06/2024");
  });

  it("returns original value when date parsing fails", () => {
    expect(formatDisplayDate("not-a-date")).toBe("not-a-date");
  });
});
