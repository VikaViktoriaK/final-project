import { act, renderHook } from "@testing-library/react";
import useUpdateCvMutation from "./use-update-cv-mutation";

const mockUpdateCvMutation = jest.fn();

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("../../../../lib/mutation-result", () => ({
  runMutation: jest.fn((fn: () => Promise<unknown>) => fn()),
}));

const { useMutation } = jest.requireMock("@apollo/client/react") as {
  useMutation: jest.Mock;
};

describe("useUpdateCvMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMutation.mockReturnValue([mockUpdateCvMutation, { loading: false }]);
  });

  it("updates CV with trimmed fields", async () => {
    mockUpdateCvMutation.mockResolvedValue({
      data: {
        updateCv: { id: "cv-1", name: "Updated Name" },
      },
    });

    const { result } = renderHook(() => useUpdateCvMutation("cv-1"));

    await act(async () => {
      await result.current.updateCv({
        name: "  Updated Name  ",
        education: "  MS CS  ",
        description: "  New description text here.  ",
      });
    });

    expect(mockUpdateCvMutation).toHaveBeenCalledWith({
      variables: {
        cv: {
          cvId: "cv-1",
          name: "Updated Name",
          education: "MS CS",
          description: "New description text here.",
        },
      },
    });
  });

  it("throws when update returns no CV", async () => {
    mockUpdateCvMutation.mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useUpdateCvMutation("cv-1"));

    await expect(
      act(async () => {
        await result.current.updateCv({
          name: "Name",
          education: "Education",
          description: "Description long enough for validation.",
        });
      }),
    ).rejects.toThrow("CV was not updated");
  });
});
