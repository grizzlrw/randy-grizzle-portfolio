"use client";
import { Typography, FormControl, InputLabel, MenuItem, Select, Box, Paper, Stack, Chip, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { LineChart } from "../../features/charts/LineChart";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
import { TrendingUp, Speed, Accessibility, Code } from "@mui/icons-material";
import { LiveMessage } from "@/app/features/aria-live";

// Shape of each data row returned from the World Bank API
// (simplified from the full response for the fields we care about).
type RenewableEnergyDataPoint = {
    indicator: {
        id: string;
        value: string;
    },
    country: {
        id: string;
        value: string;
    },
    countryiso3code: string;
    date: string;
    value: number | null;
    unit: string;
    obs_status: string;
    decimal: number;
}


export default function DataVisualizationPage() {
    // Parsed time-series points used by D3 (x = year, y = value)
    const [data, setData] = useState<Array<{ x: number; y: number }>>([]);
    // Currently selected country/region (World Bank ISO3 code)
    const [country, setCountry] = useState<string>("USA");
    // Title and subtitle driven by API metadata for a polished UX
    const [title, setTitle] = useState<string>("Renewable energy consumption (% of total final energy consumption)");
    const [subtitle, setSubtitle] = useState<string>("United States • Renewable energy (% of total final energy consumption)");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [announcement, setAnnouncement] = useState<string>("");
    const [chartView, setChartView] = useState<'chart' | 'table'>('chart');

    useEffect(() => {
        // Fetch indicator data whenever the selected country changes
        async function loadData() {
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.worldbank.org/v2/country/${country}/indicator/EG.FEC.RNEW.ZS?format=json`);
                const [, raw] = (await res.json()) as [unknown, RenewableEnergyDataPoint[]];

                if (raw && raw.length > 0) {
                    // Use API metadata to keep the heading/description in sync
                    setTitle(raw[0].indicator.value);
                    setSubtitle(`${raw[0].country.value} • Renewable energy (% of total final energy consumption)`);
                }

                // Filter out null values, coerce years to numbers, then sort chronologically
                const parsedData = raw
                    .filter((d: RenewableEnergyDataPoint) => d.value !== null)
                    .map((d: RenewableEnergyDataPoint) => ({
                        x: +d.date,
                        y: d.value as number,
                    }))
                    .sort((a: { x: number }, b: { x: number }) => a.x - b.x);

                setData(parsedData);
                setAnnouncement(`Chart updated: ${parsedData.length} data points displayed for ${raw[0].country.value}.`);
            } catch (error) {
                console.error("Error fetching data:", error);
                setAnnouncement("Error loading chart data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [country]);

    return (
        <PageLayout title="Data Visualization" maxWidth={1100}>
                <Typography component="p" sx={{ mb: 2 }}>
                    Data visualization isn&apos;t just about making charts—it&apos;s about making complex information 
                    accessible, understandable, and actionable. This page demonstrates how I approach data visualization: 
                    clean integration with live APIs, smooth transitions between states, responsive design, and 
                    accessibility-first implementation.
                </Typography>

                <Typography component="p" sx={{ mb: 4 }}>
                    The chart below pulls real-time data from the World Bank API, processes it client-side, 
                    and renders it using MUI X Charts with proper ARIA labels and keyboard navigation support.
                </Typography>

                <Stack spacing={6}>
                    {/* Live Chart Section */}
                    <Box component="section">
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Typography component="h2" variant="h5">
                                Live API-Driven Chart
                            </Typography>
                            <Chip label="Interactive" size="small" color="primary" />
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
                                {title}
                            </Typography>

                            <Typography component="p" variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                                {subtitle}
                            </Typography>

                            <FormControl size="small" sx={{ mb: 3, minWidth: 240 }}>
                                <InputLabel id="country-select-label">Select Region</InputLabel>
                                <Select
                                    labelId="country-select-label"
                                    id="country-select"
                                    label="Select Region"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    aria-describedby="country-select-helper"
                                >
                                    <MenuItem value="USA">United States</MenuItem>
                                    <MenuItem value="GBR">United Kingdom</MenuItem>
                                    <MenuItem value="CAN">Canada</MenuItem>
                                    <MenuItem value="DEU">Germany</MenuItem>
                                    <MenuItem value="FRA">France</MenuItem>
                                    <MenuItem value="JPN">Japan</MenuItem>
                                    <MenuItem value="CHN">China</MenuItem>
                                    <MenuItem value="IND">India</MenuItem>
                                    <MenuItem value="BRA">Brazil</MenuItem>
                                    <MenuItem value="AUS">Australia</MenuItem>
                                    <MenuItem value="WLD">World Average</MenuItem>
                                </Select>
                            </FormControl>

                            {isLoading ? (
                                <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: 1 }} />
                            ) : (
                                <>
                                    <LiveMessage message={announcement} aria-live="polite" />
                                    <LineChart
                                        key="renewable-energy-chart"
                                        data={data}
                                        title={title}
                                        xLabel="Year"
                                        yLabel="Renewable Energy (%)"
                                        ariaLabel={`Line chart showing ${title} for ${subtitle}`}
                                        xAxisValueFormatter={(value: number) => value.toString()}
                                        yAxisValueFormatter={(value: number) => value.toString() + '%'}
                                        height={500}
                                        view={chartView}
                                        onViewChange={setChartView}
                                    />
                                </>
                            )}
                        </Paper>

                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                            Data source: World Bank Open Data API • Updates automatically when you change regions
                        </Typography>
                    </Box>

                    {/* Technical Implementation Section */}
                    <Box component="section">
                        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
                            Technical Implementation
                        </Typography>

                        <Typography component="p" sx={{ mb: 3 }}>
                            This visualization demonstrates several engineering practices that I bring to data-driven applications:
                        </Typography>

                        <Stack spacing={2}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Box sx={{ color: "primary.main", mt: 0.5 }}>
                                        <Speed />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            Real-Time Data Integration
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            The chart fetches live data from the World Bank API using React hooks (useEffect, useState). 
                                            When the user selects a different region, a new API call is triggered, the data is processed 
                                            client-side, and the chart updates smoothly. Loading states provide feedback during transitions.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Box sx={{ color: "primary.main", mt: 0.5 }}>
                                        <TrendingUp />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            Responsive & Adaptive Design
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            The chart adapts to different viewport sizes and theme preferences. MUI X Charts handles 
                                            the rendering with SVG, ensuring crisp display on high-DPI screens. The layout reflows 
                                            naturally on mobile devices while maintaining readability.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Box sx={{ color: "primary.main", mt: 0.5 }}>
                                        <Accessibility />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            Accessible by Default
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Charts include descriptive aria-label attributes and role=&quot;img&quot; for screen reader context. 
                                            All data is accessible via a semantic HTML table (always present in the DOM) that users can 
                                            toggle into view. The table uses proper th elements with scope attributes for clear row/column 
                                            relationships. Interactive controls (dropdown, toggle buttons) are fully keyboard accessible 
                                            with proper ARIA attributes. Dynamic updates are announced via ARIA live regions.
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
                                            Reusable Component Architecture
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            The LineChart component is abstracted into a reusable module that accepts data, dimensions, 
                                            and labels as props. This same component powers visualizations across multiple pages without 
                                            duplication. It handles edge cases like empty data gracefully and provides sensible defaults.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Box>

                    {/* Approach Section */}
                    {/* <Box component="section">
                        <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
                            My Approach to Data Visualization
                        </Typography>

                        <Typography component="p" sx={{ mb: 2 }}>
                            I&apos;ve worked on applications where data visualization wasn&apos;t decorative—it was essential 
                            to helping users make decisions. In public health applications, I built dashboards that helped 
                            clinicians identify trends, compare populations, and access evidence quickly.
                        </Typography>

                        <Typography component="p" sx={{ mb: 3 }}>
                            Here&apos;s what I focus on when building data visualizations:
                        </Typography>

                        <List>
                            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
                                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                    <Box 
                                        sx={{ 
                                            width: 8, 
                                            height: 8, 
                                            borderRadius: "50%", 
                                            bgcolor: "primary.main" 
                                        }} 
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Clarity over complexity"
                                    secondary="The best visualization is the one that answers the user's question immediately. I avoid chart junk and focus on making the data story obvious."
                                />
                            </ListItem>
                            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
                                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                    <Box 
                                        sx={{ 
                                            width: 8, 
                                            height: 8, 
                                            borderRadius: "50%", 
                                            bgcolor: "primary.main" 
                                        }} 
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Thoughtful interaction design"
                                    secondary="Tooltips, zoom, filtering, and comparisons should feel intuitive. Interactive elements need proper affordances and feedback so users know what they can do."
                                />
                            </ListItem>
                            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
                                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                    <Box 
                                        sx={{ 
                                            width: 8, 
                                            height: 8, 
                                            borderRadius: "50%", 
                                            bgcolor: "primary.main" 
                                        }} 
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Performance matters"
                                    secondary="Visualizations should render quickly and handle large datasets gracefully. I've optimized charts to work with thousands of data points without janky animations or frozen UIs."
                                />
                            </ListItem>
                            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
                                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                    <Box 
                                        sx={{ 
                                            width: 8, 
                                            height: 8, 
                                            borderRadius: "50%", 
                                            bgcolor: "primary.main" 
                                        }} 
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Accessibility is non-negotiable"
                                    secondary="Charts aren't just visual. Every visualization needs text alternatives, keyboard navigation, sufficient color contrast, and compatibility with assistive technology."
                                />
                            </ListItem>
                            <ListItem sx={{ alignItems: "flex-start", pl: 0 }}>
                                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                    <Box 
                                        sx={{ 
                                            width: 8, 
                                            height: 8, 
                                            borderRadius: "50%", 
                                            bgcolor: "primary.main" 
                                        }} 
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Reliable data handling"
                                    secondary="API failures, incomplete data, and edge cases happen. I build visualizations that handle errors gracefully, show loading states, and never leave the user confused."
                                />
                            </ListItem>
                        </List>
                    </Box> */}
                </Stack>
        </PageLayout>
    );
}