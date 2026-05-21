import {
  extractGraphqlErrorMessage,
  formatMutationError,
} from "./formatMutationError";

describe("formatMutationError", () => {
  it("extracts nested GraphQL response messages", () => {
    expect(
      extractGraphqlErrorMessage({
        graphQLErrors: [
          {
            message: "Bad Request Exception",
            extensions: { response: { message: ["Email already exists"] } },
          },
        ],
      }),
    ).toBe("Email already exists");
  });

  it("maps avatar upload errors to friendly messages", () => {
    expect(
      formatMutationError(new Error("ENAMETOOLONG while saving avatar")),
    ).toBe(
      "We couldn’t save your photo. Please try again in a moment or use a smaller image. If this keeps happening, contact support.",
    );
  });

  it("falls back to Error message or generic profile failure", () => {
    expect(formatMutationError(new Error("Network failed"))).toBe(
      "Network failed",
    );
    expect(formatMutationError({ detail: "x".repeat(600) })).toBe(
      "Failed to update profile.",
    );
  });
});
