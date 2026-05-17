"use client";

import { AppPageLayout } from "@/features/users/components/sidebar/AppPageLayout";

export default function PositionsSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppPageLayout>{children}</AppPageLayout>;
}
