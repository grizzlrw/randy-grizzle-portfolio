"use client";
import { Typography, FormControl, InputLabel, MenuItem, Select, Box, Stack, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { LineChart } from "../../features/charts/LineChart";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";
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
                <Stack spacing={6}>
                    {/* Live Chart Section */}
                    <Box component="section">  
                        <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
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

                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                            Data source: World Bank Open Data API
                        </Typography>
                    </Box>
                </Stack>
        </PageLayout>
    );
}