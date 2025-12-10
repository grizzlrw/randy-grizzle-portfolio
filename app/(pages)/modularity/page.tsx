"use client";

import { Box, Typography, Stack, Paper, Chip, Divider, Alert, AlertTitle } from "@mui/material";
import { Code, FilterNone, Extension, AccountTree } from "@mui/icons-material";
import { LineChart } from "@/app/features/charts/LineChart";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
import { useState } from "react";

export default function ModularityPage() {
  const [chartView, setChartView] = useState<'chart' | 'table'>('chart');

  return (
    <PageLayout title="Modularity & Reusability" maxWidth={1100}>
        <Typography component="p" sx={{ mb: 2 }}>
          Good software isn&apos;t built from scratch every time—it&apos;s assembled from well-designed, 
          reusable pieces. This page demonstrates the modular architecture behind this portfolio, where 
          components are built once and composed flexibly across different contexts.
        </Typography>

        <Typography component="p" sx={{ mb: 4 }}>
          The same LineChart component powering the Data Visualization page works here with different 
          data. The same toggle controls, table accessibility, and ARIA patterns—all built into a single, 
          reusable module.
        </Typography>

        <Stack spacing={6}>
          {/* Live Component Reuse Example */}
          <Box component="section">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5">
                Component Reuse in Action
              </Typography>
              <Chip label="Same Component" size="small" color="primary" />
            </Stack>

            <Paper 
              variant="outlined" 
              sx={{ 
                p: 3, 
                mb: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                Software Development Trends (Hypothetical Data)
              </Typography>

              <Typography component="p" variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                This chart uses the exact same LineChart component as the Data Visualization page, 
                with zero modifications. Same table accessibility, same toggle controls, same keyboard navigation.
              </Typography>

              <LineChart
                data={[
                  { x: 2018, y: 35 },
                  { x: 2019, y: 42 },
                  { x: 2020, y: 65 },
                  { x: 2021, y: 71 },
                  { x: 2022, y: 78 },
                  { x: 2023, y: 82 },
                  { x: 2024, y: 88 },
                ]}
                height={400}
                xLabel="Year"
                yLabel="Adoption Rate (%)"
                title="Component-Based Architecture Adoption"
                ariaLabel="Line chart showing component-based architecture adoption from 2018 to 2024"
                xAxisValueFormatter={(value: number) => value.toString()}
                yAxisValueFormatter={(value: number) => value.toString() + '%'}
                view={chartView}
                onViewChange={setChartView}
              />
            </Paper>

            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Zero Configuration Required</AlertTitle>
              This chart component was dropped in with 8 props. No custom wiring, no page-specific 
              overrides, no accessibility retrofitting. It just works.
            </Alert>
          </Box>

          <Divider />

          {/* Modularity Principles Section */}
          <Box component="section">
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Modular Architecture Principles
            </Typography>

            <Typography component="p" sx={{ mb: 3 }}>
              Here&apos;s how I approach building reusable components that scale across projects:
            </Typography>

            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ color: "primary.main", mt: 0.5 }}>
                    <Extension />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Single Responsibility
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Each component does one thing well. LineChart doesn&apos;t fetch data or manage forms—it 
                      renders charts. SkillCard doesn&apos;t know about routing—it displays skills. This makes 
                      them predictable and easy to test.
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ color: "primary.main", mt: 0.5 }}>
                    <Code />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Props Over Configuration
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Components accept props for customization rather than requiring global config files or 
                      environment variables. This makes them portable—copy a component to a new project and 
                      it works immediately with different data.
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ color: "primary.main", mt: 0.5 }}>
                    <FilterNone />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Composition Over Inheritance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Instead of building specialized variants (LineChartWithTable, LineChartWithAPI), I build 
                      flexible primitives that compose. LineChart handles rendering and accessibility. Parent 
                      components handle data fetching. Pages orchestrate everything.
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ color: "primary.main", mt: 0.5 }}>
                    <AccountTree />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Sensible Defaults, Full Control
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Components work out of the box with minimal props (height=500, showTable=true) but expose 
                      every customization point needed (formatters, colors, callbacks). You only configure what 
                      differs from the default.
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          <Divider />

          {/* Real-World Impact Section */}
          <Box component="section">
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Why This Matters
            </Typography>

            <Typography component="p" sx={{ mb: 2 }}>
              In real projects, modularity isn&apos;t just about clean code—it&apos;s about velocity and 
              maintainability. Here&apos;s what I&apos;ve seen this approach enable:
            </Typography>

            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 3, bgcolor: "background.default" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Build Features Faster
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  When building a new dashboard page, I don&apos;t write new chart code—I compose existing 
                  components with different data sources. A page that might take days becomes a few hours of work.
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, bgcolor: "background.default" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Fix Bugs Once
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  When I added the accessible table to LineChart, every page using that component automatically 
                  got the improvement. No need to hunt through 10 different chart implementations and update them all.
                </Typography>
              </Paper>

              <Paper variant="outlined" sx={{ p: 3, bgcolor: "background.default" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Onboard Teams Quickly
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  New developers can learn a handful of reusable components and immediately be productive. 
                  They don&apos;t need to understand the entire codebase—just the primitives and how to compose them.
                </Typography>
              </Paper>
            </Stack>
          </Box>
        </Stack>
    </PageLayout>
  );
}
