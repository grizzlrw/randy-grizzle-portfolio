"use server";

import { Suspense } from "react";
import { Box, Typography, Stack, Divider, Paper } from "@mui/material";
import SkillList from "@/app/components/skill-card/skill-list";
import { LineChart } from "@/app/features/charts/LineChart";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
import SkillListSkeleton from "@/app/components/skeletons/SkillListSkeleton";

export default async function ModularityPage() {
  return (
    <PageLayout
      title="Modularity &amp; Reuse"
      subtitle="This site is built as a set of small, composable pieces: cards, forms, charts, and layout primitives that can be rearranged into new pages without special wiring. This page pulls in a few of those components side by side to illustrate how they can be reused."
    >

        <Stack spacing={6}>
          <Box>
            <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
              Skill cards in a different context
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
              The same <code>SkillCard</code> components used on the home page are
              rendered here via <code>SkillList</code>, without any extra
              configuration. They don&apos;t know where they live; they just receive
              props and render.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Suspense fallback={<SkillListSkeleton length={3} />}>
                <SkillList length={3} />
              </Suspense>
            </Paper>
          </Box>

          <Divider />

          <Box>
            <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
              Swappable chart component
            </Typography>
            <Typography component="p" sx={{ mb: 2 }}>
              The line chart used on the data visualization page is a reusable
              component. Here it is rendered with a small, static dataset to
              show how the same primitive can power both a live API-backed view
              and a lightweight embedded example.
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, overflow: "auto" }}>
              <LineChart
                data={[
                  { x: 2018, y: 20 },
                  { x: 2019, y: 35 },
                  { x: 2020, y: 30 },
                  { x: 2021, y: 45 },
                  { x: 2022, y: 55 },
                ]}
                width={520}
                height={320}
                xLabel="Year"
                yLabel="Example metric"
                ariaLabel="Example line chart showing how a shared component can be embedded in multiple contexts"
              />
            </Paper>
          </Box>
        </Stack>
    </PageLayout>
  );
}
