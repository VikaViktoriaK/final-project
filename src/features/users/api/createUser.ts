import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      email
      role
      department_name
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

type CreateUserVariables = {
  user: {
    auth: {
      email: string;
      password: string;
    };
    profile: {
      first_name?: string;
      last_name?: string;
    };
    cvsIds: string[];
    role: string;
    departmentId?: string;
    positionId?: string;
  };
};

export function useCreateUserMutation() {
  return useMutation<unknown, CreateUserVariables>(CREATE_USER);
}
