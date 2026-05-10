import { redirect } from "next/navigation";

type LegacyUserPageProps = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function LegacyUserPage({ params }: LegacyUserPageProps) {
  const { userId } = await params;
  redirect(`/users/${userId}/profile`);
}
