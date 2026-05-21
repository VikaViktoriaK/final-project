import { getAuthUser } from "../../../auth/lib/auth-storage";
import { isAdmin } from "../../../auth/utils/permissions";
import { mockCv } from "../../test-utils/fixtures";
import { canCreateCv, canManageCv } from "./cv-permissions";

jest.mock("../../../auth/lib/auth-storage", () => ({
  getAuthUser: jest.fn(),
}));

jest.mock("../../../auth/utils/permissions", () => ({
  isAdmin: jest.fn(),
}));

const getAuthUserMock = jest.mocked(getAuthUser);
const isAdminMock = jest.mocked(isAdmin);

describe("cv-permissions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("canCreateCv", () => {
    it("returns false when user is not authenticated", () => {
      getAuthUserMock.mockReturnValue(null);
      expect(canCreateCv()).toBe(false);
    });

    it("returns true when user is authenticated", () => {
      getAuthUserMock.mockReturnValue({
        id: "user-1",
        email: "dev@example.com",
        role: "Employee",
      });
      expect(canCreateCv()).toBe(true);
    });
  });

  describe("canManageCv", () => {
    it("returns false when user is not authenticated", () => {
      getAuthUserMock.mockReturnValue(null);
      expect(canManageCv(mockCv)).toBe(false);
    });

    it("returns true for admin", () => {
      getAuthUserMock.mockReturnValue({
        id: "admin-1",
        email: "admin@example.com",
        role: "Admin",
      });
      isAdminMock.mockReturnValue(true);

      expect(canManageCv(mockCv)).toBe(true);
    });

    it("returns true when user owns the CV", () => {
      getAuthUserMock.mockReturnValue({
        id: "user-1",
        email: "dev@example.com",
        role: "Employee",
      });
      isAdminMock.mockReturnValue(false);

      expect(canManageCv(mockCv)).toBe(true);
    });

    it("returns false when user does not own the CV", () => {
      getAuthUserMock.mockReturnValue({
        id: "other-user",
        email: "other@example.com",
        role: "Employee",
      });
      isAdminMock.mockReturnValue(false);

      expect(canManageCv(mockCv)).toBe(false);
    });
  });
});
