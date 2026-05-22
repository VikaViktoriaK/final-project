import { mockCv, mockCvWithProjects } from "../../test-utils/fixtures";
import { groupSkillsByCategory } from "@/utils/skills";
import buildCvPreviewHtml from "./build-cv-preview-html";

describe("buildCvPreviewHtml", () => {
  it("builds HTML document with escaped CV content", () => {
    const cv = {
      ...mockCvWithProjects,
      name: '<script>alert("x")</script>',
      description: "Built & shipped features",
    };
    const grouped = groupSkillsByCategory(cv.skills, []);
    const html = buildCvPreviewHtml(cv, grouped);

    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    expect(html).toContain("Built &amp; shipped features");
    expect(html).toContain("Alpha Portal");
    expect(html).toContain("Professional skills");
    expect(html).toContain("Projects");
  });

  it("omits hero subtitle when CV has no project roles", () => {
    const html = buildCvPreviewHtml(mockCv, []);

    expect(html).not.toContain('class="hero-subtitle"');
  });
});
