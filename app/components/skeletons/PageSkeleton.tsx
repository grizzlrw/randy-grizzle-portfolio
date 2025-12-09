import { Box, Skeleton, Stack } from "@mui/material";

type PageSkeletonProps = {
  hasTitle?: boolean;
  hasSubtitle?: boolean;
  maxWidth?: number;
};

/**
 * Generic page loading skeleton.
 * Matches PageLayout structure with title and content blocks.
 */
export default function PageSkeleton({
  hasTitle = true,
  hasSubtitle = false,
  maxWidth = 1200,
}: PageSkeletonProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 8,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth,
          mx: "auto",
          py: 4,
          px: 2,
        }}
      >
        {hasTitle && (
          <Box sx={{ mb: hasSubtitle ? 1 : 4 }}>
            <Skeleton variant="text" width="40%" height={48} sx={{ mb: hasSubtitle ? 1 : 0 }} />
            {hasSubtitle && (
              <Skeleton variant="text" width="70%" height={24} sx={{ mt: 1, mb: 3 }} />
            )}
          </Box>
        )}

        <Stack spacing={3}>
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 1 }} />
        </Stack>
      </Box>
    </Box>
  );
}
