"use client";

import { usePathname } from "next/navigation";
import { CV_TABS } from "../constants/cv-tabs";

function useCvShellNavigation(cvId: string) {
  const pathname = usePathname() ?? "";

  const activeSegment =
    CV_TABS.find((tab) => pathname.includes(`/cvs/${cvId}/${tab.segment}`))
      ?.segment ?? "details";

  const activeTabLabel =
    CV_TABS.find((tab) => tab.segment === activeSegment)?.label ?? "Details";

  const showSectionInBreadcrumb = activeSegment !== "details";

  return {
    activeSegment,
    activeTabLabel,
    showSectionInBreadcrumb,
  };
}

export default useCvShellNavigation;
