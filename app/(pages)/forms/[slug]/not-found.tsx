import { Box, Button, Typography, Alert } from "@mui/material";

/**
 * Not found page for dynamic form routes.
 * Shown when a form slug doesn't exist in the database.
 */
export default function NotFound() {
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
        <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
          Form Not Found
        </Typography>

        <Alert severity="info" sx={{ mb: 3, textAlign: "left" }}>
          <Typography variant="body1">
            The form you&apos;re looking for doesn&apos;t exist or may have been removed.
          </Typography>
        </Alert>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            href="/forms"
          >
            Browse available forms
          </Button>
          <Button
            variant="outlined"
            href="/"
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
