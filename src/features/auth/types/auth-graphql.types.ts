import type { LoginFormValues } from "../schemas/login.schema";

/** `login` query response shape. */
export type LoginQueryData = {
  login: {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      email: string;
      role: string;
      profile: {
        full_name: string;
        avatar: string | null;
      };
    };
  };
};

export type LoginQueryVariables = {
  auth: LoginFormValues;
};

/** `signup` mutation response shape. */
export type SignupMutationData = {
  signup: {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      email: string;
      role: string;
      profile: {
        full_name: string;
        avatar: string | null;
      };
    };
  };
};

export type SignupMutationVariables = {
  auth: { email: string; password: string };
};
