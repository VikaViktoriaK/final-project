import {
  USER_PROFILE_AVATAR_SIZE_ERROR,
  USER_PROFILE_AVATAR_TYPE_ERROR,
} from "@/features/users/constants/userProfile.constants";
import {
  isAvatarImageFile,
  readAvatarFile,
  validateAvatarFile,
} from "./avatarFile";

describe("avatarFile utils", () => {
  it("accepts supported mime types and common image extensions", () => {
    expect(
      isAvatarImageFile(new File(["x"], "photo.png", { type: "image/png" })),
    ).toBe(true);
    expect(isAvatarImageFile(new File(["x"], "photo.jpg", { type: "" }))).toBe(
      true,
    );
    expect(
      isAvatarImageFile(new File(["x"], "photo.webp", { type: "image/webp" })),
    ).toBe(false);
  });

  it("validates avatar type and size", () => {
    const invalidType = new File(["x"], "photo.webp", { type: "image/webp" });
    const tooLarge = new File([new ArrayBuffer(600 * 1024)], "photo.png", {
      type: "image/png",
    });
    const valid = new File(["x"], "photo.png", { type: "image/png" });

    expect(validateAvatarFile(invalidType)).toBe(
      USER_PROFILE_AVATAR_TYPE_ERROR,
    );
    expect(validateAvatarFile(tooLarge)).toBe(USER_PROFILE_AVATAR_SIZE_ERROR);
    expect(validateAvatarFile(valid)).toBeNull();
  });

  it("reads avatar file as data url payload", () => {
    class MockFileReader {
      result: string | ArrayBuffer | null = "data:image/png;base64,aGVsbG8=";
      onload: (() => void) | null = null;

      readAsDataURL() {
        this.onload?.();
      }
    }

    const OriginalFileReader = global.FileReader;
    global.FileReader = MockFileReader as unknown as typeof FileReader;

    const onSuccess = jest.fn();
    const file = new File(["hello"], "photo.png", { type: "image/png" });

    readAvatarFile(file, onSuccess);

    expect(onSuccess).toHaveBeenCalledWith({
      previewUrl: "data:image/png;base64,aGVsbG8=",
      base64: "data:image/png;base64,aGVsbG8=",
      size: file.size,
      type: "image/png",
    });

    global.FileReader = OriginalFileReader;
  });
});
