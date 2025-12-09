"use client";
import { Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { LineChart } from "../../features/charts/LineChart";
import PageLayout from "@/app/components/layouts/single-column/PageLayout";

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

    useEffect(() => {
        // Fetch indicator data whenever the selected country changes
        async function loadData() {
            const res = await fetch(`https://api.worldbank.org/v2/country/${country}/indicator/EG.FEC.RNEW.ZS?format=json`);
            const [, raw] = (await res.json()) as [unknown, RenewableEnergyDataPoint[]];

            if (raw && raw.length > 0) {
                // Use API metadata to keep the heading/description in sync
                setTitle(raw[0].indicator.value);
                setSubtitle(`${raw[0].country.value} Renewable energy (% of total final energy consumption)`);
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
        }

        loadData();
    }, [country]);

        // D3 rendering is delegated to reusable chart components

    return (
        <PageLayout title="Data Visualization" maxWidth={960}>
                <Typography component="p" sx={{ mb: 4 }}>
                    This page demonstrates a data visualization using D3.js to render a line chart
                    showing renewable energy consumption over time for different countries and regions.
                    Select a region from the dropdown to see the data update with smooth transitions.
                </Typography>

                <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
                    {title}
                </Typography>

                <Typography component="p" variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                    {subtitle}
                </Typography>

                <FormControl size="small" sx={{ mb: 3, minWidth: 200 }}>
                    <InputLabel id="country-select-label">Region</InputLabel>
                    <Select
                        labelId="country-select-label"
                        label="Region"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <MenuItem value="USA">United States</MenuItem>
                        <MenuItem value="GBR">United Kingdom</MenuItem>
                        <MenuItem value="WLD">World</MenuItem>
                    </Select>
                </FormControl>

                <LineChart
                    data={data}
                    width={600}
                    height={400}
                    xLabel="Year"
                    yLabel="Renewable Energy Consumption (%)"
                    ariaLabel={`Line chart showing ${title} over time for ${subtitle}`}
                />
        </PageLayout>
    );
}