import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      affected
    }
  }
`;

type DeleteUserVariables = {
  userId: string;
};

export function useDeleteUserMutation() {
  return useMutation<unknown, DeleteUserVariables>(DELETE_USER);
}
