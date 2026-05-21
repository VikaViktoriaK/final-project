import { fireEvent, render, screen } from "@testing-library/react";
import { CatalogSearch } from "./CatalogSearch";

describe("CatalogSearch", () => {
  it("renders search input and forwards changes", () => {
    const onChange = jest.fn();

    render(<CatalogSearch value="react" onChange={onChange} />);

    const input = screen.getByPlaceholderText("Search");
    expect(input).toHaveValue("react");

    fireEvent.change(input, { target: { value: "node" } });
    expect(onChange).toHaveBeenCalledWith("node");
  });
});
