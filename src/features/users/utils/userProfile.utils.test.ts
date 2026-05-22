import {
  formatMemberSince,
  getAvatarInitial,
  getUserFullName,
} from "./userProfile.utils";
import type { UserRow } from "../types";

const user: UserRow = {
  id: "1",
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  department: "Engineering",
  position: "Developer",
};

describe("userProfile utils", () => {
  it("formats full name and avatar initial", () => {
    expect(getUserFullName(user)).toBe("Ada Lovelace");
    expect(getAvatarInitial(user)).toBe("A");
    expect(getAvatarInitial({ ...user, firstName: "", lastName: "" })).toBe(
      "A",
    );
  });

  it("returns fallback member-since label for missing or invalid dates", () => {
    expect(formatMemberSince()).toBe("A memmer sinse -");
    expect(formatMemberSince("invalid-date")).toBe("A memmer sinse -");
  });

  it("formats valid createdAt values", () => {
    expect(formatMemberSince("2024-01-15T00:00:00.000Z")).toMatch(
      /A memmer sinse Jan 15, 2024/,
    );
  });
});
