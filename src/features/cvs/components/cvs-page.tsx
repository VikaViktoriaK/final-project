"use client";

import { Button, Stack } from "@mui/material";
import { useState } from "react";
import useCvs from "../hooks/use-cvs";
import CvsTable from "./cvs-table";
import CreateCvDialog from "./create-cv-dialog";

function CvsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data, loading, error } = useCvs();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const cvs = data?.cvs ?? [];

  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        onClick={() => setIsCreateOpen(true)}
        sx={{ alignSelf: "flex-start" }}
      >
        Create CV
      </Button>

      {!cvs.length ? <div>No CVs found</div> : <CvsTable cvs={cvs} />}

      <CreateCvDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </Stack>
  );
}

export default CvsPage;
