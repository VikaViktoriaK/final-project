import CvShell from "@/features/cvs/components/shell/CvShell";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ cvId: string }>;
};

async function CvLayout({ children, params }: LayoutProps) {
  const { cvId } = await params;
  return <CvShell cvId={cvId}>{children}</CvShell>;
}

export default CvLayout;
