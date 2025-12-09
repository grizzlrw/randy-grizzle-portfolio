"use client";

import { Box, Button, Typography, Alert } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Form error:", error);
  }, [error]);

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 600, textAlign: "center" }}>
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Unable to load form
        </Typography>

        <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {error.message || "The form could not be loaded. It may not exist or there may be a configuration issue."}
          </Typography>
          {error.digest && (
            <Typography variant="caption" color="text.secondary">
              Error ID: {error.digest}
            </Typography>
          )}
        </Alert>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            onClick={reset}
          >
            Try again
          </Button>
          <Button
            variant="outlined"
            href="/forms"
          >
            Back to forms
          </Button>
          <Button
            variant="outlined"
            href="/"
          >
            Go home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
