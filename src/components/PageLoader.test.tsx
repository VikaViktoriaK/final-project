import { render, screen } from "@testing-library/react";
import { PageLoader } from "./PageLoader";

describe("PageLoader", () => {
  it("renders accessible loading status", () => {
    render(<PageLoader />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });
});
