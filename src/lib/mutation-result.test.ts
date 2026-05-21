import { runMutation } from "./mutation-result";

describe("runMutation", () => {
  it("returns ok result with action data", async () => {
    await expect(runMutation(async () => "saved")).resolves.toEqual({
      ok: true,
      data: "saved",
    });
  });

  it("returns error message from thrown Error", async () => {
    await expect(
      runMutation(async () => {
        throw new Error("Backend failed");
      }),
    ).resolves.toEqual({ ok: false, message: "Backend failed" });
  });

  it("returns fallback message for unknown errors", async () => {
    await expect(
      runMutation(async () => {
        throw "not an error";
      }, "Fallback failure"),
    ).resolves.toEqual({ ok: false, message: "Fallback failure" });
  });
});
