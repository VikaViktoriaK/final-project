import { useParams } from "next/navigation";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useUserQuery } from "@/features/users/api/getUser";
import { formatMemberSince } from "@/features/users/utils/userProfile.utils";

export function useUserProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId ?? "";
  const { user, loading, error, refetch } = useUserQuery(userId);
  const { userId: currentUserId, role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const breadcrumbName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  const memberSinceText = formatMemberSince(user?.createdAt);
  const canEditProfile = Boolean(
    user && (isAdmin || currentUserId === user.id),
  );

  return {
    user,
    loading,
    error,
    refetch,
    breadcrumbName,
    memberSinceText,
    canEditProfile,
  };
}
