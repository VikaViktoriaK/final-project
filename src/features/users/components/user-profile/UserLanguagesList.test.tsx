import { fireEvent, render, screen } from "@testing-library/react";
import { UserLanguagesList } from "./UserLanguagesList";

describe("UserLanguagesList", () => {
  const languages = [
    { name: "English", proficiency: "C1" },
    { name: "Spanish", proficiency: "Native" },
  ];

  it("renders languages and management actions", () => {
    const onAdd = jest.fn();
    const onStartRemove = jest.fn();
    const onLanguageClick = jest.fn();

    render(
      <UserLanguagesList
        languages={languages}
        canManage
        removeMode={false}
        selectedKeys={new Set()}
        selectedCount={0}
        onLanguageClick={onLanguageClick}
        onAdd={onAdd}
        onStartRemove={onStartRemove}
        onExitRemove={jest.fn()}
        onOpenBulkConfirm={jest.fn()}
      />,
    );

    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /add language/i }));
    fireEvent.click(screen.getByRole("button", { name: /remove languages/i }));
    fireEvent.click(screen.getByRole("button", { name: /english/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onStartRemove).toHaveBeenCalledTimes(1);
    expect(onLanguageClick).toHaveBeenCalledWith(languages[0]);
  });

  it("shows remove-mode buttons and disables delete without selection", () => {
    const onExitRemove = jest.fn();
    const onOpenBulkConfirm = jest.fn();

    render(
      <UserLanguagesList
        languages={languages}
        canManage
        removeMode
        selectedKeys={new Set(["English:C1"])}
        selectedCount={0}
        onLanguageClick={jest.fn()}
        onAdd={jest.fn()}
        onStartRemove={jest.fn()}
        onExitRemove={onExitRemove}
        onOpenBulkConfirm={onOpenBulkConfirm}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onExitRemove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /delete/i })).toBeDisabled();
  });
});
