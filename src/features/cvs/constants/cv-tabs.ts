const CV_TABS = [
  { label: "Details", segment: "details" },
  { label: "Skills", segment: "skills" },
  { label: "Projects", segment: "projects" },
  { label: "Preview", segment: "preview" },
] as const;

type CvTabSegment = (typeof CV_TABS)[number]["segment"];

export { CV_TABS };
export type { CvTabSegment };
