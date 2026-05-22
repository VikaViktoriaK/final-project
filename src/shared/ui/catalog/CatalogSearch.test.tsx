import { fireEvent, render, screen } from "@testing-library/react";
import { PreferencesProvider } from "@/lib/preferences/PreferencesProvider";
import { CatalogSearch } from "./CatalogSearch";

describe("CatalogSearch", () => {
  it("renders search input and forwards changes", () => {
    const onChange = jest.fn();

    render(
      <PreferencesProvider>
        <CatalogSearch value="react" onChange={onChange} />
      </PreferencesProvider>,
    );

    const input = screen.getByPlaceholderText("Search");
    expect(input).toHaveValue("react");

    fireEvent.change(input, { target: { value: "node" } });
    expect(onChange).toHaveBeenCalledWith("node");
  });
});
