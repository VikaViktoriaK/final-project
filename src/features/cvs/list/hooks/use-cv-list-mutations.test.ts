import { act, renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "../../../auth/lib/auth-storage";
import { runMutation } from "../../../../lib/mutation-result";
import {
  useCreateCvMutation,
  useDeleteCvMutation,
} from "./use-cv-list-mutations";

const mockCreateCvMutation = jest.fn();
const mockDeleteCvMutation = jest.fn();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("../../../auth/lib/auth-storage", () => ({
  getAuthUser: jest.fn(),
}));

jest.mock("../../../../lib/mutation-result", () => ({
  runMutation: jest.fn((fn: () => Promise<unknown>) => fn()),
}));

const { useMutation } = jest.requireMock("@apollo/client/react") as {
  useMutation: jest.Mock;
};
const getAuthUserMock = jest.mocked(getAuthUser);
const runMutationMock = jest.mocked(runMutation);

describe("use-cv-list-mutations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuthUserMock.mockReturnValue({
      id: "user-1",
      email: "dev@example.com",
      role: "Employee",
    });
  });

  describe("useCreateCvMutation", () => {
    beforeEach(() => {
      useMutation.mockReturnValueOnce([
        mockCreateCvMutation,
        { loading: false },
      ]);
    });

    it("creates CV with authenticated user id", async () => {
      mockCreateCvMutation.mockResolvedValue({
        data: { createCv: { id: "cv-new", name: "New CV" } },
      });

      const { result } = renderHook(() => useCreateCvMutation());

      await act(async () => {
        await result.current.createCv({
          name: "New CV",
          education: "BS Computer Science",
          description: "Experienced developer profile description.",
        });
      });

      expect(mockCreateCvMutation).toHaveBeenCalledWith({
        variables: {
          cv: {
            name: "New CV",
            education: "BS Computer Science",
            description: "Experienced developer profile description.",
            userId: "user-1",
          },
        },
      });
    });
  });

  describe("useDeleteCvMutation", () => {
    beforeEach(() => {
      useMutation.mockReturnValueOnce([
        mockDeleteCvMutation,
        { loading: false },
      ]);
    });

    it("deletes CV and redirects to list", async () => {
      mockDeleteCvMutation.mockResolvedValue({
        data: { deleteCv: { affected: 1 } },
      });

      const { result } = renderHook(() => useDeleteCvMutation());

      await act(async () => {
        await result.current.deleteCv("cv-1");
      });

      expect(mockDeleteCvMutation).toHaveBeenCalledWith({
        variables: { cv: { cvId: "cv-1" } },
      });
      expect(mockPush).toHaveBeenCalledWith("/cvs");
    });

    it("throws when delete affected count is zero", async () => {
      mockDeleteCvMutation.mockResolvedValue({
        data: { deleteCv: { affected: 0 } },
      });

      const { result } = renderHook(() => useDeleteCvMutation());

      await expect(
        act(async () => {
          await result.current.deleteCv("cv-1");
        }),
      ).rejects.toThrow("CV was not deleted");
    });
  });
});
