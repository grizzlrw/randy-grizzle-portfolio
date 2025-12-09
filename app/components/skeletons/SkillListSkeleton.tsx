import { Box, Card, CardContent, CardHeader, Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

type SkillListSkeletonProps = {
  length?: number;
};

/**
 * Loading skeleton for SkillList component.
 * Matches the layout structure of actual SkillCard components.
 */
export default function SkillListSkeleton({ length = 4 }: SkillListSkeletonProps) {
  return (
    <Box sx={{ width: "100%", py: 2, gap: 4 }}>
      <Grid
        component="ul"
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 6, md: 6, lg: 12 }}
        sx={{ alignItems: "stretch" }}
      >
        {Array.from({ length }).map((_, index) => (
          <Grid
            component="li"
            key={index}
            size={{ xs: 2, sm: 3, md: 3 }}
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Card
              sx={{
                textAlign: "left",
                boxShadow: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card Media Skeleton */}
              <Skeleton
                variant="rectangular"
                sx={{
                  height: "10rem",
                  clipPath: "polygon(0 0, 100% 0, 100% 92%, 0% 100%)",
                }}
              />

              {/* Card Header Skeleton */}
              <CardHeader
                title={<Skeleton variant="text" width="70%" />}
                sx={{ pb: 1 }}
              />

              {/* Card Content Skeleton */}
              <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Stack spacing={0.5}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="60%" />
                </Stack>
              </CardContent>

              {/* Card Actions Skeleton */}
              <Box sx={{ px: 2, pb: 2 }}>
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
