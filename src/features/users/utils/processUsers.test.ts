import { getUserSearchText, processUsers } from "./processUsers";
import type { UserRow } from "../types";

const users: UserRow[] = [
  {
    id: "2",
    firstName: "Grace",
    lastName: "Hopper",
    email: "grace@example.com",
    department: "Engineering",
    position: "Developer",
  },
  {
    id: "1",
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    department: "",
    position: "Lead",
  },
];

describe("processUsers", () => {
  it("builds searchable user text", () => {
    expect(getUserSearchText(users[0])).toBe("Grace Hopper grace@example.com");
  });

  it("filters users by query", () => {
    expect(
      processUsers(users, "ada", "firstName", "asc").map((user) => user.id),
    ).toEqual(["1"]);
  });

  it("sorts ascending and pushes empty values to the end", () => {
    expect(
      processUsers(users, "", "department", "asc").map((user) => user.id),
    ).toEqual(["2", "1"]);
  });

  it("sorts descending by selected field", () => {
    expect(
      processUsers(users, "", "firstName", "desc").map(
        (user) => user.firstName,
      ),
    ).toEqual(["Grace", "Ada"]);
  });

  it("sorts descending and keeps empty values at the end", () => {
    expect(
      processUsers(users, "", "department", "desc").map((user) => user.id),
    ).toEqual(["2", "1"]);
  });

  it("returns all users when query is empty", () => {
    expect(processUsers(users, "", "firstName", "asc")).toHaveLength(2);
  });
});
