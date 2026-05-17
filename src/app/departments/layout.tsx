"use client";

import { AppPageLayout } from "@/features/users/components/sidebar/AppPageLayout";

export default function DepartmentsSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppPageLayout>{children}</AppPageLayout>;
}
