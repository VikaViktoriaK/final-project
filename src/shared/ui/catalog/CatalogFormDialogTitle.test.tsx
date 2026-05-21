import { fireEvent, render, screen } from "@testing-library/react";
import { CatalogFormDialogTitle } from "./CatalogFormDialogTitle";

describe("CatalogFormDialogTitle", () => {
  it("renders title and calls close handler", () => {
    const onClose = jest.fn();

    render(
      <CatalogFormDialogTitle title="Create department" onClose={onClose} />,
    );

    expect(screen.getByText("Create department")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
