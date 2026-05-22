import type { Page, Response } from "@playwright/test";

function isGraphqlResponse(response: Response, operationName: string): boolean {
  const request = response.request();
  if (request.method() !== "POST") {
    return false;
  }

  const postData = request.postData() ?? "";
  return (
    postData.includes(`"operationName":"${operationName}"`) ||
    postData.includes(operationName)
  );
}

export async function waitForGraphQLOperation(
  page: Page,
  operationName: string,
  action: () => Promise<void>,
): Promise<Response> {
  const responsePromise = page.waitForResponse((response) =>
    isGraphqlResponse(response, operationName),
  );

  await action();
  const response = await responsePromise;
  await response.finished().catch(() => undefined);

  return response;
}
