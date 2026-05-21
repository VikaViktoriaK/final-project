import { filterCvs, sortCvs } from "./cv-list";
import { mockCv } from "../../test-utils/fixtures";

const secondCv = {
  ...mockCv,
  id: "cv-2",
  name: "Alice Analyst",
  education: "MBA",
  user: { id: "user-2", email: "alice@example.com" },
};

const cvs = [mockCv, secondCv];

describe("cv-list utils", () => {
  describe("filterCvs", () => {
    it("returns all valid CVs when search is empty", () => {
      expect(filterCvs(cvs, "")).toHaveLength(2);
    });

    it("filters by name, education, employee email, and description", () => {
      expect(filterCvs(cvs, "alice")).toEqual([secondCv]);
      expect(filterCvs(cvs, "mba")).toEqual([secondCv]);
      expect(filterCvs(cvs, "dev@example")).toEqual([mockCv]);
    });

    it("drops entries without id or name", () => {
      const invalid = [{ ...mockCv, id: "", name: "Ghost" }] as typeof cvs;
      expect(filterCvs(invalid, "")).toHaveLength(0);
    });
  });

  describe("sortCvs", () => {
    it("sorts by name ascending", () => {
      const sorted = sortCvs(cvs, "name", "asc");
      expect(sorted.map((cv) => cv.name)).toEqual([
        "Alice Analyst",
        "Jane Developer",
      ]);
    });

    it("sorts by employee descending", () => {
      const sorted = sortCvs(cvs, "employee", "desc");
      expect(sorted[0]?.user?.email).toBe("dev@example.com");
    });
  });
});
