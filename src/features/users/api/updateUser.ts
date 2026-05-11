import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
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

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
      avatar
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export const GET_USER_EDIT_OPTIONS = gql`
  query UserEditOptions {
    departments {
      id
      name
    }
    positions {
      id
      name
    }
  }
`;

export type UpdateUserVariables = {
  user: {
    userId: string;
    role?: string;
    departmentId?: string;
    positionId?: string;
  };
};

export type UpdateProfileVariables = {
  profile: {
    userId: string;
    first_name?: string;
    last_name?: string;
  };
};

export type UploadAvatarVariables = {
  avatar: {
    userId: string;
    base64: string;
    size: number;
    type: string;
  };
};

export function useUpdateUserMutation() {
  return useMutation<unknown, UpdateUserVariables>(UPDATE_USER);
}

export function useUpdateProfileMutation() {
  return useMutation<unknown, UpdateProfileVariables>(UPDATE_PROFILE);
}

export function useUploadAvatarMutation() {
  return useMutation<unknown, UploadAvatarVariables>(UPLOAD_AVATAR);
}

type OptionItem = { id: string; name: string };

type EditOptionsResponse = {
  departments: OptionItem[];
  positions: OptionItem[];
};

export function useUserEditOptionsQuery() {
  return useQuery<EditOptionsResponse>(GET_USER_EDIT_OPTIONS);
}
