"use client";

import { Alert, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";

type FeedbackSeverity = "success" | "error";

type FeedbackState = {
  message: string;
  severity: FeedbackSeverity;
};

function useActionFeedback() {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const showSuccess = useCallback((message: string) => {
    setFeedback({ message, severity: "success" });
  }, []);

  const showError = useCallback((message: string) => {
    setFeedback({ message, severity: "error" });
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  const FeedbackSnackbar = (
    <Snackbar
      open={Boolean(feedback)}
      autoHideDuration={4000}
      onClose={clearFeedback}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={clearFeedback}
        severity={feedback?.severity ?? "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {feedback?.message}
      </Alert>
    </Snackbar>
  );

  return { showSuccess, showError, FeedbackSnackbar };
}

export default useActionFeedback;
