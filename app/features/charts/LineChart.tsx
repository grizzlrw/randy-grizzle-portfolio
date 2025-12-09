"use client";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

export type ChartDataPoint = { x: number; y: number };

export type LineChartProps = {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  ariaLabel?: string;
};

export function LineChart({
  data,
  width = 600,
  height = 400,
  xLabel = "X",
  yLabel = "Y",
  ariaLabel,
}: LineChartProps) {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
        }}
        role="img"
        aria-label={ariaLabel || "Empty chart"}
      >
        No data available
      </Box>
    );
  }

  // Extract x and y values
  const xData = data.map((d) => d.x);
  const yData = data.map((d) => d.y);

  return (
    <Box
      sx={{ width, height }}
      role="img"
      aria-label={ariaLabel || `Line chart showing ${yLabel} vs ${xLabel}`}
    >
      <MuiLineChart
        width={width}
        height={height}
        series={[
          {
            data: yData,
            label: yLabel,
            curve: "linear",
          },
        ]}
        xAxis={[
          {
            data: xData,
            label: xLabel,
            scaleType: "linear",
          },
        ]}
        margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
      />
    </Box>
  );
}
