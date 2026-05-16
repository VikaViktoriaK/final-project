"use client";

import { AppPageLayout } from "@/features/users/components/sidebar/AppPageLayout";

export default function UsersSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppPageLayout>{children}</AppPageLayout>;
}
