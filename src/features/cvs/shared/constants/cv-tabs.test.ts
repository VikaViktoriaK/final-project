import { CV_TABS } from "./cv-tabs";

describe("CV_TABS", () => {
  it("defines all CV shell segments", () => {
    expect(CV_TABS.map((tab) => tab.segment)).toEqual([
      "details",
      "skills",
      "projects",
      "preview",
    ]);
  });
});
