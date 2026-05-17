import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type { DepartmentRow } from "../types";

export const GET_DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($department: CreateDepartmentInput!) {
    createDepartment(department: $department) {
      id
      name
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($department: UpdateDepartmentInput!) {
    updateDepartment(department: $department) {
      id
      name
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($department: DeleteDepartmentInput!) {
    deleteDepartment(department: $department)
  }
`;

type DepartmentsResponse = {
  departments: { id: string; name: string }[];
};

type CreateDepartmentVariables = {
  department: { name: string };
};

type UpdateDepartmentVariables = {
  department: { id: string; name: string };
};

type DeleteDepartmentVariables = {
  department: { id: string };
};

export function useDepartmentsQuery() {
  const query = useQuery<DepartmentsResponse>(GET_DEPARTMENTS);

  const departments: DepartmentRow[] = (query.data?.departments ?? []).map(
    (item) => ({
      id: item.id,
      name: item.name,
    }),
  );

  return { ...query, departments };
}

export function useCreateDepartmentMutation() {
  return useMutation<unknown, CreateDepartmentVariables>(CREATE_DEPARTMENT);
}

export function useUpdateDepartmentMutation() {
  return useMutation<unknown, UpdateDepartmentVariables>(UPDATE_DEPARTMENT);
}

export function useDeleteDepartmentMutation() {
  return useMutation<unknown, DeleteDepartmentVariables>(DELETE_DEPARTMENT);
}
