"use client";
import { useEffect, useRef } from "react";
import {
  scaleLinear,
  line as d3Line,
  extent,
  max,
  axisBottom,
  axisLeft,
  select,
  format,
  easeCubicInOut,
} from "d3";

export type LineDatum = { x: number; y: number };

export type D3LineChartProps = {
  data: LineDatum[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  ariaLabel?: string;
};

export function D3LineChart({
  data,
  width = 600,
  height = 400,
  xLabel = "X",
  yLabel = "Y",
  ariaLabel,
}: D3LineChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const svg = select(svgRef.current);
    const transitionDuration = 800;

    const xDomain = extent(data, (d) => d.x);
    const yMin = Math.min(...data.map((d) => d.y));
    const yMax = max(data, (d) => d.y);

    if (!xDomain || yMax == null || Number.isNaN(yMin)) return;

    const [xMin, xMax] = xDomain as [number, number];

    const x = scaleLinear().domain([xMin, xMax]).range([60, width - 50]).nice();

    const y = scaleLinear()
      .domain([Math.floor(yMin), Math.ceil(yMax)])
      .range([height - 40, 40])
      .nice();

    const lineGen = d3Line<LineDatum>()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    let gGrid = svg.select<SVGGElement>("g.grid");
    if (gGrid.empty()) {
      gGrid = svg.append("g").attr("class", "grid");
    }

    let gAxes = svg.select<SVGGElement>("g.axes");
    if (gAxes.empty()) {
      gAxes = svg.append("g").attr("class", "axes");
    }

    let gLine = svg.select<SVGGElement>("g.line-layer");
    if (gLine.empty()) {
      gLine = svg.append("g").attr("class", "line-layer");
    }

    let gPoints = svg.select<SVGGElement>("g.points-layer");
    gPoints.selectAll("circle.point").remove();
    if (gPoints.empty()) {
      gPoints = svg.append("g").attr("class", "points-layer");
    }

    let gLabels = svg.select<SVGGElement>("g.labels");
    if (gLabels.empty()) {
      gLabels = svg.append("g").attr("class", "labels");
    }

    const xGrid = gGrid.selectAll<SVGLineElement, number>("line.x-grid").data(y.ticks(10));

    xGrid
      .enter()
      .append("line")
      .attr("class", "x-grid")
      .merge(xGrid)
      .attr("x1", 50)
      .attr("x2", width - 50)
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);

    xGrid.exit().remove();

    const yGrid = gGrid.selectAll<SVGLineElement, number>("line.y-grid").data(x.ticks(6));

    yGrid
      .enter()
      .append("line")
      .attr("class", "y-grid")
      .merge(yGrid)
      .attr("x1", (d) => x(d))
      .attr("x2", (d) => x(d))
      .attr("y1", 40)
      .attr("y2", height - 40)
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);

    yGrid.exit().remove();

    let path = gLine.select<SVGPathElement>("path.line");

    if (path.empty()) {
      path = gLine
        .append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", lineGen(data));
    }

    path
      .transition()
      .duration(transitionDuration)
      .ease(easeCubicInOut)
      .attr("d", lineGen(data));

    const points = gPoints
      .selectAll<SVGCircleElement, LineDatum>("circle.point")
      .data(data, (d: LineDatum) => d.x);

    points
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 0)
      .attr("fill", "steelblue")
      .attr("opacity", 0.9)
      .transition()
      .duration(transitionDuration)
      .ease(easeCubicInOut)
      .attr("r", 3);

    points
      .transition()
      .duration(transitionDuration)
      .ease(easeCubicInOut)
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y));

    points
      .exit()
      .transition()
      .duration(transitionDuration)
      .ease(easeCubicInOut)
      .attr("r", 0)
      .remove();

    const xAxis = axisBottom<number>(x).ticks(6).tickFormat(format("d"));

    const yAxis = axisLeft<number>(y)
      .ticks(10)
      .tickFormat((d) => `${d.toString()}%`);

    let gYAxis = gAxes.select<SVGGElement>("g.y-axis");
    if (gYAxis.empty()) {
      gYAxis = gAxes.append("g").attr("class", "y-axis");
    }

    let gXAxis = gAxes.select<SVGGElement>("g.x-axis");
    if (gXAxis.empty()) {
      gXAxis = gAxes.append("g").attr("class", "x-axis");
    }

    gYAxis
      .attr("transform", "translate(60,0)")
      .transition()
      .duration(transitionDuration)
      .ease(easeCubicInOut)
      .call(yAxis);

    gXAxis
      .attr("transform", `translate(0, ${height - 40})`)
      .transition()
      .duration(transitionDuration)
      .ease(easeCubicInOut)
      .call(xAxis);

    let xLabelNode = gLabels.select<SVGTextElement>("text.x-label");
    if (xLabelNode.empty()) {
      xLabelNode = gLabels
        .append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "middle")
        .attr("font-size", "12px");
    }

    xLabelNode.attr("x", width / 2).attr("y", height - 5).text(xLabel);

    let yLabelNode = gLabels.select<SVGTextElement>("text.y-label");
    if (yLabelNode.empty()) {
      yLabelNode = gLabels
        .append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("transform", "rotate(-90)");
    }

    yLabelNode.attr("x", -height / 2).attr("y", 15).text(yLabel);
  }, [data, height, width, xLabel, yLabel]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      aria-label={ariaLabel}
    />
  );
}
