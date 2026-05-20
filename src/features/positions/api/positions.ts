import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type { PositionRow } from "../types";

export const GET_POSITIONS = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;

export const CREATE_POSITION = gql`
  mutation CreatePosition($position: CreatePositionInput!) {
    createPosition(position: $position) {
      id
      name
    }
  }
`;

export const UPDATE_POSITION = gql`
  mutation UpdatePosition($position: UpdatePositionInput!) {
    updatePosition(position: $position) {
      id
      name
    }
  }
`;

export const DELETE_POSITION = gql`
  mutation DeletePosition($position: DeletePositionInput!) {
    deletePosition(position: $position) {
      affected
    }
  }
`;

type PositionsResponse = {
  positions: { id: string; name: string }[];
};

type CreatePositionVariables = {
  position: { name: string };
};

type UpdatePositionVariables = {
  position: { positionId: string; name: string };
};

type DeletePositionVariables = {
  position: { positionId: string };
};

export function usePositionsQuery() {
  const query = useQuery<PositionsResponse>(GET_POSITIONS);

  const positions: PositionRow[] = (query.data?.positions ?? []).map(
    (item) => ({
      id: item.id,
      name: item.name,
    }),
  );

  return { ...query, positions };
}

export function useCreatePositionMutation() {
  return useMutation<unknown, CreatePositionVariables>(CREATE_POSITION);
}

export function useUpdatePositionMutation() {
  return useMutation<unknown, UpdatePositionVariables>(UPDATE_POSITION);
}

export function useDeletePositionMutation() {
  return useMutation<unknown, DeletePositionVariables>(DELETE_POSITION);
}
