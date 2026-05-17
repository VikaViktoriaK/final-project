import { gql } from "@apollo/client";

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($auth: ResetPasswordInput!) {
    resetPassword(auth: $auth)
  }
`;
