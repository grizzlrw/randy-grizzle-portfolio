import { render, screen } from "@testing-library/react";
import { LineChart, ChartDataPoint } from "../LineChart";

interface MockSeries {
  label?: string;
  data?: unknown[];
}

interface MockAxis {
  label?: string;
}

interface MockLineChartProps {
  width?: number;
  height?: number;
  series?: MockSeries[];
  xAxis?: MockAxis[];
}

// Mock MUI X Charts
jest.mock("@mui/x-charts/LineChart", () => ({
  LineChart: ({ width, height, series, xAxis }: MockLineChartProps) => (
    <svg
      data-testid="mui-line-chart"
      width={width}
      height={height}
      role="img"
      aria-label="Mocked MUI Line Chart"
    >
      <g data-testid="chart-series" data-series-count={series?.length || 0}>
        {series?.map((s, i) => (
          <g key={i} data-testid={`series-${i}`} data-label={s.label}>
            <path data-testid={`line-${i}`} data-points={s.data?.length || 0} />
          </g>
        ))}
      </g>
      <g data-testid="chart-axes" data-axes-count={xAxis?.length || 0}>
        {xAxis?.map((axis, i) => (
          <g key={i} data-testid={`x-axis-${i}`} data-label={axis.label}>
            <line />
          </g>
        ))}
      </g>
    </svg>
  ),
}));

describe("LineChart", () => {
  const sampleData: ChartDataPoint[] = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 15 },
    { x: 4, y: 25 },
    { x: 5, y: 30 },
  ];

  describe("Basic Rendering", () => {
    it("should render the chart with data", () => {
      render(<LineChart data={sampleData} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should render with default dimensions", () => {
      render(<LineChart data={sampleData} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toHaveAttribute("width", "600");
      expect(chart).toHaveAttribute("height", "400");
    });

    it("should handle empty data array", () => {
      render(<LineChart data={[]} />);

      expect(screen.getByText("No data available")).toBeInTheDocument();
      expect(screen.queryByTestId("mui-line-chart")).not.toBeInTheDocument();
    });

    it("should render series with correct data", () => {
      render(<LineChart data={sampleData} />);

      const series = screen.getByTestId("series-0");
      expect(series).toBeInTheDocument();
      
      const line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "5");
    });
  });

  describe("Customization", () => {
    it("should apply custom width and height", () => {
      render(<LineChart data={sampleData} width={800} height={600} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toHaveAttribute("width", "800");
      expect(chart).toHaveAttribute("height", "600");
    });

    it("should use custom axis labels", () => {
      render(
        <LineChart
          data={sampleData}
          xLabel="Custom X"
          yLabel="Custom Y"
        />
      );

      const ySeriesLabel = screen.getByTestId("series-0");
      expect(ySeriesLabel).toHaveAttribute("data-label", "Custom Y");

      const xAxisLabel = screen.getByTestId("x-axis-0");
      expect(xAxisLabel).toHaveAttribute("data-label", "Custom X");
    });

    it("should use default axis labels", () => {
      render(<LineChart data={sampleData} />);

      const ySeriesLabel = screen.getByTestId("series-0");
      expect(ySeriesLabel).toHaveAttribute("data-label", "Y");

      const xAxisLabel = screen.getByTestId("x-axis-0");
      expect(xAxisLabel).toHaveAttribute("data-label", "X");
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label with custom text", () => {
      render(
        <LineChart
          data={sampleData}
          ariaLabel="Custom chart description"
        />
      );

      const container = screen.getByRole("img", {
        name: "Custom chart description",
      });
      expect(container).toBeInTheDocument();
    });

    it("should have default aria-label", () => {
      render(<LineChart data={sampleData} />);

      const container = screen.getByRole("img", {
        name: "Line chart showing Y vs X",
      });
      expect(container).toBeInTheDocument();
    });

    it("should have aria-label for empty chart", () => {
      render(<LineChart data={[]} ariaLabel="Empty data chart" />);

      const container = screen.getByRole("img", {
        name: "Empty data chart",
      });
      expect(container).toBeInTheDocument();
    });
  });

  describe("Data Handling", () => {
    it("should handle single data point", () => {
      const singlePoint: ChartDataPoint[] = [{ x: 5, y: 10 }];
      render(<LineChart data={singlePoint} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toBeInTheDocument();

      const line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "1");
    });

    it("should handle two data points", () => {
      const twoPoints: ChartDataPoint[] = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
      ];
      render(<LineChart data={twoPoints} />);

      const line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "2");
    });

    it("should handle large datasets", () => {
      const largeData: ChartDataPoint[] = Array.from({ length: 100 }, (_, i) => ({
        x: i,
        y: Math.sin(i / 10) * 50 + 50,
      }));

      render(<LineChart data={largeData} />);

      const line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "100");
    });

    it("should handle negative values", () => {
      const negativeData: ChartDataPoint[] = [
        { x: 1, y: -10 },
        { x: 2, y: -5 },
        { x: 3, y: 0 },
        { x: 4, y: 5 },
        { x: 5, y: 10 },
      ];

      render(<LineChart data={negativeData} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should handle zero values", () => {
      const zeroData: ChartDataPoint[] = [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ];

      render(<LineChart data={zeroData} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle small dimensions", () => {
      render(<LineChart data={sampleData} width={200} height={150} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toHaveAttribute("width", "200");
      expect(chart).toHaveAttribute("height", "150");
    });

    it("should handle large dimensions", () => {
      render(<LineChart data={sampleData} width={1200} height={800} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toHaveAttribute("width", "1200");
      expect(chart).toHaveAttribute("height", "800");
    });
  });

  describe("Re-rendering", () => {
    it("should update when data changes", () => {
      const { rerender } = render(<LineChart data={sampleData} />);

      let line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "5");

      const newData: ChartDataPoint[] = [
        { x: 1, y: 5 },
        { x: 2, y: 15 },
        { x: 3, y: 25 },
      ];

      rerender(<LineChart data={newData} />);

      line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "3");
    });

    it("should update dimensions on re-render", () => {
      const { rerender } = render(
        <LineChart data={sampleData} width={600} height={400} />
      );

      let chart = screen.getByTestId("mui-line-chart");
      expect(chart).toHaveAttribute("width", "600");

      rerender(<LineChart data={sampleData} width={800} height={600} />);

      chart = screen.getByTestId("mui-line-chart");
      expect(chart).toHaveAttribute("width", "800");
      expect(chart).toHaveAttribute("height", "600");
    });
  });
});
