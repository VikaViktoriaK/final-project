type MutationResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; message: string };

function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

async function runMutation<T>(
  action: () => Promise<T>,
  fallbackMessage = "Something went wrong",
): Promise<MutationResult<T>> {
  try {
    const data = await action();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: getErrorMessage(error, fallbackMessage) };
  }
}

export type { MutationResult };
export { runMutation };
