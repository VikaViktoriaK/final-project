import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type LanguagesPageProps = {
  params: Promise<{
    userId: string;
  }>;
};

export default async function UserLanguagesRoute({
  params,
}: LanguagesPageProps) {
  const { userId } = await params;

  return (
    <Box sx={{ py: 4 }}>
      <Typography color="text.secondary">
        Languages page for user {userId} — coming soon.
      </Typography>
    </Box>
  );
}
