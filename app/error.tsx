"use client";

import { useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import Link from "next/link";

/**
 * Global Error Component for Next.js
 * Catches errors in the root layout and pages
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              textAlign: "center",
              gap: 3,
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 80, color: "error.main" }}
              aria-hidden="true"
            />
            
            <Typography variant="h3" component="h1" gutterBottom>
              Oops! Something Went Wrong
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
              We&apos;re sorry, but we encountered an unexpected error. 
              Please try refreshing the page or return to the home page.
            </Typography>

            {process.env.NODE_ENV === "development" && (
              <Box
                sx={{
                  width: "100%",
                  mt: 2,
                  p: 2,
                  bgcolor: "error.light",
                  color: "error.contrastText",
                  borderRadius: 1,
                  textAlign: "left",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  Development Error:
                </Typography>
                <Typography variant="body2" component="pre" sx={{ mt: 1 }}>
                  {error.message}
                </Typography>
                {error.digest && (
                  <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                    Error Digest: {error.digest}
                  </Typography>
                )}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={reset}
              >
                Try Again
              </Button>
              <Button
                component={Link}
                href="/"
                variant="outlined"
                startIcon={<HomeIcon />}
              >
                Go Home
              </Button>
            </Box>
          </Box>
        </Container>
      </body>
    </html>
  );
}
