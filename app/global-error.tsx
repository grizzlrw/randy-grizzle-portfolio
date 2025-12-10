"use client";

import { Box, Button, Typography, Alert } from "@mui/material";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            px: 2,
            bgcolor: "background.default",
          }}
        >
          <Box sx={{ maxWidth: 600, textAlign: "center" }}>
            <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
              Oops! Something went wrong
            </Typography>

            <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {error.message || "A critical error occurred. Please try refreshing the page."}
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
                size="large"
              >
                Try again
              </Button>
              <Button
                variant="outlined"
                href="/"
                size="large"
              >
                Go home
              </Button>
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
