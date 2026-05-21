import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";
import isAuthFailure from "./is-auth-failure";

jest.mock("@apollo/client/errors", () => ({
  CombinedGraphQLErrors: { is: jest.fn() },
  ServerError: { is: jest.fn() },
}));

const graphQlIsMock = jest.mocked(CombinedGraphQLErrors.is);
const serverIsMock = jest.mocked(ServerError.is);

describe("isAuthFailure", () => {
  beforeEach(() => {
    graphQlIsMock.mockReturnValue(false);
    serverIsMock.mockReturnValue(false);
  });

  it("returns true for GraphQL unauthorized errors", () => {
    graphQlIsMock.mockReturnValue(true);

    expect(
      isAuthFailure({
        errors: [
          { message: "Unauthorized", extensions: { code: "UNAUTHENTICATED" } },
        ],
      }),
    ).toBe(true);
  });

  it("returns true for HTTP 401 server errors", () => {
    serverIsMock.mockReturnValue(true);

    expect(isAuthFailure({ statusCode: 401 })).toBe(true);
  });

  it("returns false for unrelated errors", () => {
    expect(isAuthFailure(new Error("network"))).toBe(false);
  });
});
