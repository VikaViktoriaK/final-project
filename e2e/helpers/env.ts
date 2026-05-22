export type E2eConfig = {
  isConfigured: boolean;
  email: string;
  password: string;
  cvName: string | null;
  skillName: string | null;
};

export function getE2eConfig(): E2eConfig {
  const email = process.env.E2E_USER_EMAIL ?? "";
  const password = process.env.E2E_USER_PASSWORD ?? "";

  return {
    isConfigured: Boolean(email && password),
    email,
    password,
    cvName: process.env.E2E_CV_NAME ?? null,
    skillName: process.env.E2E_SKILL_NAME ?? null,
  };
}
