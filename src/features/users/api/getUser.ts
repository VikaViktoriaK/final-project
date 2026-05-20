import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { UserRow } from "../types";

export const GET_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      created_at
      role
      department {
        id
      }
      department_name
      position {
        id
      }
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

type GetUserResponse = {
  user: {
    id: string;
    email: string;
    created_at?: string | null;
    role?: string | null;
    department?: {
      id: string;
    } | null;
    department_name?: string | null;
    position?: {
      id: string;
    } | null;
    position_name?: string | null;
    profile?: {
      first_name?: string | null;
      last_name?: string | null;
      avatar?: string | null;
    } | null;
  } | null;
};

export function useUserQuery(userId: string) {
  const query = useQuery<GetUserResponse>(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  const rawUser = query.data?.user;
  const user: UserRow | null = rawUser
    ? {
        id: rawUser.id,
        firstName: (rawUser.profile?.first_name ?? "").trim(),
        lastName: (rawUser.profile?.last_name ?? "").trim(),
        email: rawUser.email,
        createdAt: rawUser.created_at ?? undefined,
        departmentId: rawUser.department?.id ?? undefined,
        role: rawUser.role ?? "",
        department: rawUser.department_name ?? "",
        positionId: rawUser.position?.id ?? undefined,
        position: rawUser.position_name ?? "",
        avatarUrl: rawUser.profile?.avatar ?? undefined,
      }
    : null;

  return { ...query, user };
}
