import { render, screen } from "@testing-library/react";

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

// Mock MUI X Charts before any imports
jest.mock("@mui/x-charts/LineChart", () => ({
  LineChart: ({ width, height, series, xAxis }: MockLineChartProps) => (
    <svg
      data-testid="mui-line-chart"
      width={width}
      height={height}
      role="img"
      aria-label="Mocked MUI Line Chart"
    >
      <g data-testid="chart-series">
        {series?.map((s, i) => (
          <g key={i} data-testid={`series-${i}`} data-label={s.label}>
            <path data-testid={`line-${i}`} data-points={s.data?.length || 0} />
          </g>
        ))}
      </g>
      <g data-testid="chart-axes">
        {xAxis?.map((axis, i) => (
          <g key={i} data-testid={`x-axis-${i}`} data-label={axis.label} />
        ))}
      </g>
    </svg>
  ),
}));

jest.mock("@mui/x-charts/ChartsTooltip", () => ({
  ChartsTooltip: () => null,
}));

// Import after mocks
import { LineChart, ChartDataPoint } from "../LineChart";

describe("LineChart", () => {
  const sampleData: ChartDataPoint[] = [
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 15 },
    { x: 4, y: 25 },
    { x: 5, y: 30 },
  ];

  describe("Rendering", () => {
    it("should render with data", () => {
      render(<LineChart data={sampleData} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should render with custom dimensions", () => {
      render(<LineChart data={sampleData} width={800} height={600} />);

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toBeInTheDocument();
    });

    it("should render empty state when no data", () => {
      render(<LineChart data={[]} />);

      expect(screen.getByText("No data available")).toBeInTheDocument();
      expect(screen.queryByTestId("mui-line-chart")).not.toBeInTheDocument();
    });
  });

  describe("Axis Labels", () => {
    it("should use default labels", () => {
      render(<LineChart data={sampleData} />);

      expect(screen.getByTestId("series-0")).toHaveAttribute("data-label", "Y");
      expect(screen.getByTestId("x-axis-0")).toHaveAttribute("data-label", "X");
    });

    it("should use custom labels", () => {
      render(
        <LineChart data={sampleData} xLabel="Year" yLabel="Revenue ($)" />
      );

      expect(screen.getByTestId("series-0")).toHaveAttribute("data-label", "Revenue ($)");
      expect(screen.getByTestId("x-axis-0")).toHaveAttribute("data-label", "Year");
    });
  });

  describe("Accessibility", () => {
    it("should have default aria-label", () => {
      render(<LineChart data={sampleData} />);

      const container = screen.getByRole("img", { name: "Line chart showing Y over X" });
      expect(container).toBeInTheDocument();
    });

    it("should use custom aria-label", () => {
      render(
        <LineChart data={sampleData} ariaLabel="Revenue trend over time" />
      );

      const container = screen.getByRole("img", { name: "Revenue trend over time" });
      expect(container).toBeInTheDocument();
    });

    it("should have aria-label for empty state", () => {
      render(<LineChart data={[]} ariaLabel="Empty chart" />);

      const container = screen.getByRole("img", { name: "Empty chart" });
      expect(container).toBeInTheDocument();
    });
  });

  describe("Data Handling", () => {
    it("should render single data point", () => {
      render(<LineChart data={[{ x: 1, y: 10 }]} />);

      const line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "1");
    });

    it("should render multiple data points", () => {
      render(<LineChart data={sampleData} />);

      const line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "5");
    });

    it("should handle negative values", () => {
      const negativeData: ChartDataPoint[] = [
        { x: 1, y: -10 },
        { x: 2, y: 5 },
      ];

      render(<LineChart data={negativeData} />);
      
      expect(screen.getByTestId("mui-line-chart")).toBeInTheDocument();
    });

    it("should handle large datasets", () => {
      const largeData: ChartDataPoint[] = Array.from({ length: 100 }, (_, i) => ({
        x: i,
        y: Math.sin(i / 10) * 50,
      }));

      render(<LineChart data={largeData} />);

      const line = screen.getByTestId("line-0");
      expect(line).toHaveAttribute("data-points", "100");
    });
  });

  describe("Updates", () => {
    it("should update when data changes", () => {
      const { rerender } = render(<LineChart data={sampleData} />);

      expect(screen.getByTestId("line-0")).toHaveAttribute("data-points", "5");

      const newData: ChartDataPoint[] = [
        { x: 1, y: 5 },
        { x: 2, y: 15 },
      ];
      rerender(<LineChart data={newData} />);

      expect(screen.getByTestId("line-0")).toHaveAttribute("data-points", "2");
    });

    it("should update dimensions", () => {
      const { rerender } = render(
        <LineChart data={sampleData} width={600} height={400} />
      );

      const chart = screen.getByTestId("mui-line-chart");
      expect(chart).toBeInTheDocument();

      rerender(<LineChart data={sampleData} width={800} height={600} />);

      expect(screen.getByTestId("mui-line-chart")).toBeInTheDocument();
    });
  });
});
