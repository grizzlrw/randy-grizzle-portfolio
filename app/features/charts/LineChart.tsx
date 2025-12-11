"use client";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, ToggleButtonGroup, ToggleButton, useTheme, useMediaQuery } from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Use controlled view if provided, otherwise use internal state
  const view = controlledView ?? internalView;
  const setView = onViewChange ?? setInternalView;

  // Responsive dimensions
  const responsiveHeight = isMobile ? 350 : isTablet ? 450 : height;
  const responsiveYAxisWidth = isMobile ? 45 : isTablet ? 60 : yAxisWidth;
  const responsiveXAxisHeight = isMobile ? 80 : xAxisHeight; // More room for rotated labels

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
          height: responsiveHeight,
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Typography component={"h3"} variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'medium' }}>
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
            <ShowChart sx={{ mr: isMobile ? 0 : 0.5 }} fontSize="small" />
            {!isMobile && "Chart"}
          </ToggleButton>
          <ToggleButton value="table" aria-label="show table">
            <TableChart sx={{ mr: isMobile ? 0 : 0.5 }} fontSize="small" />
            {!isMobile && "Table"}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{ 
          width: "100%",
          display: view === 'chart' ? 'block' : 'none',
          overflowX: 'auto',
          overflowY: 'visible',
          px: isMobile ? 0 : 2,
          py: isMobile ? 1 : 2,
        }}
        role="img"
        aria-label={ariaLabel || `Line chart showing ${title || yLabel} over ${xLabel}`}
      >
        <MuiLineChart
          title={title}
          xAxis={[{ 
            dataKey: 'x',
            label: isMobile ? undefined : xLabel, // Hide label on mobile to save space
            valueFormatter: xAxisValueFormatter,
            height: responsiveXAxisHeight,
            scaleType: 'point',
            tickLabelStyle: {
              fontSize: isMobile ? 11 : 12,
              angle: isMobile ? -45 : 0,
              textAnchor: isMobile ? 'end' : 'middle',
            },
            tickMaxStep: isMobile ? 2 : undefined, // Show fewer ticks on mobile
          }]}
          yAxis={[{ 
            dataKey: 'y',
            label: isMobile ? undefined : yLabel, // Hide label on mobile
            width: responsiveYAxisWidth,
            valueFormatter: yAxisValueFormatter,
            tickLabelStyle: {
              fontSize: isMobile ? 11 : 12,
            },
          }]}
          series={[
            {
              data: data.map(point => point.y),
              label: title || yLabel,
              showMark: isMobile ? data.length <= 50 : !hideMarks, // Only show marks if not too many points
              curve: 'linear',
              color: theme.palette.primary.main,
            },
          ]}
          dataset={data}
          height={responsiveHeight}
          margin={{ 
            left: 5,
            right: isMobile ? 15 : 30, 
            top: isMobile ? 20 : 30, 
            bottom: isMobile ? 10 : 20,
          }}
          // sx={{
          //   '& .MuiLineElement-root': {
          //     strokeWidth: isMobile ? 2.5 : 2,
          //   },
          //   '& .MuiMarkElement-root': {
          //     scale: isMobile ? '1' : '1.2',
          //     strokeWidth: 2,
          //   },
          //   '& .MuiChartsAxis-tickLabel': {
          //     fill: theme.palette.text.secondary,
          //   },
          //   '& .MuiChartsAxis-line': {
          //     stroke: theme.palette.divider,
          //   },
          //   '& .MuiChartsAxis-tick': {
          //     stroke: theme.palette.divider,
          //   },
          //   '& .MuiChartsGrid-line': {
          //     stroke: theme.palette.divider,
          //     strokeDasharray: '4 4',
          //   },
          // }}
          slotProps={{
            legend: { 
              hidden: isMobile, // Hide legend on mobile
            }
          }}
        >
          {showTooltip && <ChartsTooltip trigger="axis" />}
          {children}
        </MuiLineChart>
      </Box>

      <TableContainer 
        component={Paper} 
        variant="outlined" 
        sx={view === 'table' ? {
          maxHeight: isMobile ? 400 : 500,
        } : { 
          position: 'absolute',
          left: -10000,
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >

        <Table aria-label={`Data table for ${title || yLabel}`} size={isMobile ? "small" : "medium"}>
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
