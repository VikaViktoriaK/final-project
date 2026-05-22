import { renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";
import useCvShellNavigation from "./use-cv-shell-navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const usePathnameMock = jest.mocked(usePathname);

describe("useCvShellNavigation", () => {
  it("detects active skills tab", () => {
    usePathnameMock.mockReturnValue("/cvs/cv-1/skills");

    const { result } = renderHook(() => useCvShellNavigation("cv-1"));

    expect(result.current).toEqual({
      activeSegment: "skills",
      activeTabLabel: "Skills",
      showSectionInBreadcrumb: true,
    });
  });

  it("defaults to details tab for unknown path", () => {
    usePathnameMock.mockReturnValue("/cvs/cv-1");

    const { result } = renderHook(() => useCvShellNavigation("cv-1"));

    expect(result.current.activeSegment).toBe("details");
    expect(result.current.showSectionInBreadcrumb).toBe(false);
  });

  it("handles null pathname", () => {
    usePathnameMock.mockReturnValue(null);

    const { result } = renderHook(() => useCvShellNavigation("cv-1"));

    expect(result.current.activeSegment).toBe("details");
  });
});
