import escapeHtml from "./escape-html";

describe("escapeHtml", () => {
  it("escapes unsafe HTML characters", () => {
    expect(escapeHtml(`<a title="x&y">'text'</a>`)).toBe(
      "&lt;a title=&quot;x&amp;y&quot;&gt;&#39;text&#39;&lt;/a&gt;",
    );
  });
});
