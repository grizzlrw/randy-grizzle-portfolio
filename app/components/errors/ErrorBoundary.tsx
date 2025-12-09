"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button, Container, Alert } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Call optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to error reporting service in production
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry, LogRocket, etc.
      // logErrorToService(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
              textAlign: "center",
              gap: 3,
            }}
          >
            <ErrorOutlineIcon
              sx={{ fontSize: 80, color: "error.main" }}
              aria-hidden="true"
            />
            
            <Typography variant="h4" component="h1" gutterBottom>
              Something Went Wrong
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
              We encountered an unexpected error. This has been logged and we&apos;ll look into it.
              You can try refreshing the page or going back to continue browsing.
            </Typography>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Alert severity="error" sx={{ width: "100%", textAlign: "left" }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Development Error Details:
                </Typography>
                <Typography variant="body2" component="pre" sx={{ mt: 1, overflow: "auto" }}>
                  {this.state.error.message}
                </Typography>
                {this.state.error.stack && (
                  <Typography
                    variant="caption"
                    component="pre"
                    sx={{ mt: 1, fontSize: "0.7rem", overflow: "auto" }}
                  >
                    {this.state.error.stack}
                  </Typography>
                )}
              </Alert>
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
              <Button
                variant="outlined"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
