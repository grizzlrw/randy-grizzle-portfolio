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
    // Log the error to an error reporting service
    console.error("Page error:", error);
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
          Something went wrong
        </Typography>

        <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {error.message || "An unexpected error occurred while loading this page."}
          </Typography>
          {error.digest && (
            <Typography variant="caption" color="text.secondary">
              Error ID: {error.digest}
            </Typography>
          )}
        </Alert>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={reset}
          >
            Try again
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
