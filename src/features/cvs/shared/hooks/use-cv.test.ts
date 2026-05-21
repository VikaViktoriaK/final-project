import { renderHook } from "@testing-library/react";
import useCv from "./use-cv";

const mockUseQuery = jest.fn();

jest.mock("@apollo/client/react", () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

describe("useCv", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("skips query when cvId is missing", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: undefined,
    });

    renderHook(() => useCv(undefined));

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ skip: true }),
    );
  });

  it("returns CV data when query succeeds", () => {
    mockUseQuery.mockReturnValue({
      data: { cv: { id: "cv-1", name: "Jane" } },
      loading: false,
      error: undefined,
    });

    const { result } = renderHook(() => useCv("cv-1"));

    expect(result.current.cv).toEqual({ id: "cv-1", name: "Jane" });
    expect(result.current.loading).toBe(false);
  });
});
