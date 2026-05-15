import CvDetailsPage from "@/features/cvs/components/cv-details-page";

type PageProps = {
  params: Promise<{ cvId: string }>;
};

async function Page({ params }: PageProps) {
  const { cvId } = await params;
  return <CvDetailsPage cvId={cvId} />;
}

export default Page;
