import {
  extractGraphqlErrorMessage,
  formatMutationError,
  formatProfileSubmitError,
} from "./formatMutationError";

describe("extractGraphqlErrorMessage", () => {
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

  it("returns string extension messages", () => {
    expect(
      extractGraphqlErrorMessage({
        graphQLErrors: [
          {
            message: "Bad Request",
            extensions: { response: { message: "Direct string" } },
          },
        ],
      }),
    ).toBe("Direct string");
  });

  it("returns gql message when extension message is missing", () => {
    expect(
      extractGraphqlErrorMessage({
        graphQLErrors: [{ message: "GraphQL error" }],
      }),
    ).toBe("GraphQL error");
  });

  it("returns top-level message", () => {
    expect(extractGraphqlErrorMessage({ message: "Top level" })).toBe(
      "Top level",
    );
  });

  it("filters empty values from array extension messages", () => {
    expect(
      extractGraphqlErrorMessage({
        graphQLErrors: [
          {
            extensions: {
              response: { message: ["Valid", "", false as unknown as string] },
            },
          },
        ],
      }),
    ).toBe("Valid");
  });

  it("returns Bad Request fallback", () => {
    expect(extractGraphqlErrorMessage({})).toBe("Bad Request");
  });
});

describe("formatMutationError", () => {
  it("maps avatar upload errors to friendly messages", () => {
    expect(
      formatMutationError(new Error("ENAMETOOLONG while saving avatar")),
    ).toBe(
      "We couldn’t save your photo. Please try again in a moment or use a smaller image. If this keeps happening, contact support.",
    );
    expect(formatMutationError('{"errno":-36}')).toBe(
      "We couldn’t save your photo. Please try again in a moment or use a smaller image. If this keeps happening, contact support.",
    );
    expect(formatMutationError('{"errno": -36}')).toBe(
      "We couldn’t save your photo. Please try again in a moment or use a smaller image. If this keeps happening, contact support.",
    );
    expect(
      formatMutationError('{"code":"ENAMETOOLONG","path":"/tmp/avatar"}'),
    ).toBe(
      "We couldn’t save your photo. Please try again in a moment or use a smaller image. If this keeps happening, contact support.",
    );
  });

  it("maps cloudinary configuration errors", () => {
    expect(formatMutationError("Must supply api_key")).toBe(
      "Photo upload isn’t configured correctly on the server (missing or invalid cloud storage keys). Ask your administrator to set real API keys in the API environment, not placeholders like API_KEY.",
    );
    expect(formatMutationError("cloudinary upload failed")).toBe(
      "Photo upload isn’t configured correctly on the server (missing or invalid cloud storage keys). Ask your administrator to set real API keys in the API environment, not placeholders like API_KEY.",
    );
    expect(formatMutationError("Unknown API key")).toBe(
      "Photo upload isn’t configured correctly on the server (missing or invalid cloud storage keys). Ask your administrator to set real API keys in the API environment, not placeholders like API_KEY.",
    );
    expect(
      formatMutationError('{"http_code":401,"API_KEY":"placeholder"}'),
    ).toBe(
      "Photo upload isn’t configured correctly on the server (missing or invalid cloud storage keys). Ask your administrator to set real API keys in the API environment, not placeholders like API_KEY.",
    );
  });

  it("extracts graphQL and network error messages", () => {
    expect(
      formatMutationError({
        graphQLErrors: [{ message: "  Validation failed  " }],
      }),
    ).toBe("Validation failed");
    expect(
      formatMutationError({
        networkError: { result: { errors: [{ message: "Network gql" }] } },
      }),
    ).toBe("Network gql");
  });

  it("handles string and object error shapes", () => {
    expect(formatMutationError("plain string")).toBe("plain string");
    expect(formatMutationError({ code: "ERR" })).toContain("ERR");
    expect(formatMutationError(null)).toBe("null");
    expect(formatMutationError(undefined)).toBe("undefined");
    expect(formatMutationError(42)).toBe("42");
  });

  it("falls back to Error message or generic profile failure", () => {
    expect(formatMutationError(new Error("Network failed"))).toBe(
      "Network failed",
    );
    expect(formatMutationError(new Error("   "))).toBe(
      "Failed to update profile.",
    );
    expect(formatMutationError({ detail: "x".repeat(600) })).toBe(
      "Failed to update profile.",
    );
  });

  it("handles circular object stringify failure", () => {
    const circular: { self?: unknown } = {};
    circular.self = circular;

    expect(formatMutationError(circular)).toBe("[object Object]");
  });

  it("delegates from deprecated formatProfileSubmitError", () => {
    expect(formatProfileSubmitError(new Error("Profile failed"))).toBe(
      "Profile failed",
    );
  });
});
