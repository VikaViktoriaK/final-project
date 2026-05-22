import { mockCv } from "./fixtures";
import type { Cv } from "../shared/types";

export function createMockCvContextValue(
  overrides: Partial<{
    cvId: string;
    cv: Cv | null;
    loading: boolean;
    error: Error | undefined;
    canEdit: boolean;
  }> = {},
) {
  return {
    cvId: "cv-1",
    cv: mockCv,
    loading: false,
    error: undefined,
    canEdit: true,
    ...overrides,
  };
}
