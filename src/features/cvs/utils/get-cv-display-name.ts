import type { Cv } from "../types";

function getCvDisplayName(cv: Cv): string {
  const emailPrefix = cv.user?.email?.split("@")[0];
  if (!emailPrefix) {
    return "Candidate";
  }
  return emailPrefix.replace(/\./g, " ");
}

export default getCvDisplayName;
