import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { UserRow } from "../types";

export const GET_USERS = gql`
  query Users {
    users {
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

type GetUsersResponse = {
  users: Array<{
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
  }>;
};

export function useUsersQuery() {
  const query = useQuery<GetUsersResponse>(GET_USERS);

  const users: UserRow[] =
    query.data?.users?.map((u) => ({
      id: u.id,
      firstName: (u.profile?.first_name ?? "").trim(),
      lastName: (u.profile?.last_name ?? "").trim(),
      email: u.email,
      createdAt: u.created_at ?? undefined,
      departmentId: u.department?.id ?? undefined,
      role: u.role ?? "",
      department: u.department_name ?? "",
      positionId: u.position?.id ?? undefined,
      position: u.position_name ?? "",
      avatarUrl: u.profile?.avatar ?? undefined,
    })) ?? [];

  return { ...query, users };
}
