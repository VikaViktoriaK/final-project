import cvRefetch from "./cv-refetch";
import { CV_QUERY } from "./cv.query";

describe("cvRefetch", () => {
  it("returns CV query refetch config for the given id", () => {
    expect(cvRefetch("cv-42")).toEqual([
      { query: CV_QUERY, variables: { cvId: "cv-42" } },
    ]);
  });
});
