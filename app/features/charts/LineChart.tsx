"use client";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { ShowChart, TableChart } from "@mui/icons-material";
import { ReactNode, useState } from "react";

export type ChartDataPoint = { x: number; y: number };

export type LineChartProps = {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  xAxisHeight?: number;
  yAxisWidth?: number;
  title?: string;
  ariaLabel?: string;
  xAxisValueFormatter?: (value: number) => string;
  yAxisValueFormatter?: (value: number) => string;
  showTooltip?: boolean;
  hideMarks?: boolean;
  view?: 'chart' | 'table';
  onViewChange?: (view: 'chart' | 'table') => void;
  children?: ReactNode;
};

export function LineChart({
  data,
  width,
  height = 500,
  xLabel = "X",
  yLabel = "Y",
  xAxisHeight = 60,
  yAxisWidth = 80,
  title,
  ariaLabel,
  xAxisValueFormatter = (value: number) => value.toString(),
  yAxisValueFormatter = (value: number) => value.toString(),
  showTooltip = true,
  hideMarks = false,
  view: controlledView,
  onViewChange,
  children,
}: LineChartProps) {
  const [internalView, setInternalView] = useState<'chart' | 'table'>('chart');
  
  // Use controlled view if provided, otherwise use internal state
  const view = controlledView ?? internalView;
  const setView = onViewChange ?? setInternalView;

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'chart' | 'table' | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          width: width || "100%",
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
        role="img"
        aria-label={ariaLabel || "Empty chart"}
      >
        No data available
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component={"h3"} variant="h6">
          {title || `${yLabel} over ${xLabel}`}
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="chart" aria-label="show chart">
            <ShowChart sx={{ mr: 0.5 }} fontSize="small" />
            Chart
          </ToggleButton>
          <ToggleButton value="table" aria-label="show table">
            <TableChart sx={{ mr: 0.5 }} fontSize="small" />
            Table
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{ 
          width: width || "100%",
          display: view === 'chart' ? 'block' : 'none',
        }}
        role="img"
        aria-label={ariaLabel || `Line chart showing ${title || yLabel} over ${xLabel}`}
      >
        <MuiLineChart
          title={title}
          xAxis={[{ 
            dataKey: 'x',
            label: xLabel,
            valueFormatter: xAxisValueFormatter,
            height: xAxisHeight,
            scaleType: 'point'
          }]}
          yAxis={[{ 
            dataKey: 'y',
            label: yLabel,
            width: yAxisWidth,
            valueFormatter: yAxisValueFormatter,
          }]}
          series={[
            {
              data: data.map(point => point.y),
              label: title || yLabel,
              showMark: !hideMarks,
            },
          ]}
          dataset={data}
          height={height}
          width={width}
        >
          {showTooltip && <ChartsTooltip trigger="axis" />}
          {children}
        </MuiLineChart>
      </Box>

      <TableContainer 
        component={Paper} 
        variant="outlined" 
        sx={view === 'table' ? {} : { 
          position: 'absolute',
          left: -10000,
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >

        <Table aria-label={`Data table for ${title || yLabel}`}>
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="col">{xLabel.replace(/[()]/g, '')}</TableCell>
              <TableCell component="th" scope="col" align="right">{yLabel.replace(/[()]/g, '')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((point, index) => (
              <TableRow key={index} hover={view === 'table'}>
                <TableCell component="th" scope="row">
                  {xAxisValueFormatter(point.x)}
                </TableCell>
                <TableCell align="right">
                  {yAxisValueFormatter(point.y)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
