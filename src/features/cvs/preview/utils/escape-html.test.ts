import escapeHtml from "./escape-html";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml(`<script>"alert('x')"</script>`)).toBe(
      "&lt;script&gt;&quot;alert(&#39;x&#39;)&quot;&lt;/script&gt;",
    );
  });

  it("returns plain text unchanged", () => {
    expect(escapeHtml("Hello CV")).toBe("Hello CV");
  });
});
