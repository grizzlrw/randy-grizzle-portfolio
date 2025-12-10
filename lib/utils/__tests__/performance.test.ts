import { PerformanceMonitor, performanceMonitor, checkPerformanceBudget } from "../performance";

describe("PerformanceMonitor", () => {
  let monitor: PerformanceMonitor;

  beforeEach(() => {
    monitor = new PerformanceMonitor();
  });

  afterEach(() => {
    monitor.clear();
  });

  describe("Basic Timing", () => {
    it("should measure operation duration", () => {
      monitor.start("test-operation");
      const duration = monitor.end("test-operation");

      expect(duration).not.toBeNull();
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it("should return null when ending unmeasured operation", () => {
      const duration = monitor.end("non-existent");

      expect(duration).toBeNull();
    });

    it("should store metrics", () => {
      monitor.start("test-1");
      monitor.end("test-1");

      const metric = monitor.getMetric("test-1");
      expect(metric).toBeDefined();
      expect(metric).toBeGreaterThanOrEqual(0);
    });

    it("should handle multiple measurements", () => {
      monitor.start("op-1");
      monitor.start("op-2");
      monitor.end("op-1");
      monitor.end("op-2");

      expect(monitor.getMetric("op-1")).toBeDefined();
      expect(monitor.getMetric("op-2")).toBeDefined();
    });
  });

  describe("Async Measurement", () => {
    it("should measure async function execution", async () => {
      const asyncFn = async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return "result";
      };

      const result = await monitor.measure("async-test", asyncFn);

      expect(result).toBe("result");
      expect(monitor.getMetric("async-test")).toBeGreaterThanOrEqual(10);
    });

    it("should handle async function errors", async () => {
      const errorFn = async () => {
        throw new Error("Test error");
      };

      await expect(monitor.measure("error-test", errorFn)).rejects.toThrow("Test error");

      // Should still record the metric
      expect(monitor.getMetric("error-test")).toBeDefined();
    });

    it("should measure sync function execution", async () => {
      const syncFn = () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      };

      const result = await monitor.measure("sync-test", syncFn);

      expect(result).toBe(499500);
      expect(monitor.getMetric("sync-test")).toBeDefined();
    });
  });

  describe("Metrics Retrieval", () => {
    it("should get all metrics", () => {
      monitor.start("test-1");
      monitor.end("test-1");
      monitor.start("test-2");
      monitor.end("test-2");

      const metrics = monitor.getAllMetrics();

      expect(metrics).toHaveLength(2);
      expect(metrics[0]).toHaveProperty("name");
      expect(metrics[0]).toHaveProperty("value");
      expect(metrics[0]).toHaveProperty("timestamp");
    });

    it("should generate performance report", () => {
      monitor.start("op-1");
      monitor.end("op-1");
      monitor.start("op-2");
      monitor.end("op-2");

      const report = monitor.getReport();

      expect(report.metrics).toHaveLength(2);
      expect(report.summary.totalDuration).toBeGreaterThanOrEqual(0);
      expect(report.summary.averageDuration).toBeGreaterThanOrEqual(0);
      expect(report.summary.minDuration).toBeGreaterThanOrEqual(0);
      expect(report.summary.maxDuration).toBeGreaterThanOrEqual(0);
    });

    it("should handle empty report", () => {
      const report = monitor.getReport();

      expect(report.metrics).toHaveLength(0);
      expect(report.summary.totalDuration).toBe(0);
      expect(report.summary.averageDuration).toBe(0);
      expect(report.summary.minDuration).toBe(0);
      expect(report.summary.maxDuration).toBe(0);
    });
  });

  describe("Clear Functionality", () => {
    it("should clear all metrics", () => {
      monitor.start("test");
      monitor.end("test");

      expect(monitor.getMetric("test")).toBeDefined();

      monitor.clear();

      expect(monitor.getMetric("test")).toBeUndefined();
      expect(monitor.getAllMetrics()).toHaveLength(0);
    });

    it("should clear pending measurements", () => {
      monitor.start("pending");
      monitor.clear();

      const duration = monitor.end("pending");
      expect(duration).toBeNull();
    });
  });

  describe("Web Vitals", () => {
    it("should mark vital metrics", () => {
      monitor.markVital("LCP", 2500, { rating: "good" });

      const metric = monitor.getMetric("LCP");
      expect(metric).toBe(2500);
    });

    it("should handle multiple vital metrics", () => {
      monitor.markVital("FCP", 1800);
      monitor.markVital("LCP", 2500);
      monitor.markVital("CLS", 0.1);

      expect(monitor.getMetric("FCP")).toBe(1800);
      expect(monitor.getMetric("LCP")).toBe(2500);
      expect(monitor.getMetric("CLS")).toBe(0.1);
    });
  });
});

describe("Performance Budget", () => {
  it("should pass when within budget", () => {
    const result = checkPerformanceBudget("API Call", 150, 200);
    expect(result).toBe(true);
  });

  it("should fail when exceeding budget", () => {
    const result = checkPerformanceBudget("API Call", 250, 200);
    expect(result).toBe(false);
  });

  it("should pass when exactly at budget", () => {
    const result = checkPerformanceBudget("API Call", 200, 200);
    expect(result).toBe(true);
  });
});

describe("Global Performance Monitor", () => {
  beforeEach(() => {
    performanceMonitor.clear();
  });

  it("should use global instance", () => {
    performanceMonitor.start("global-test");
    const duration = performanceMonitor.end("global-test");

    expect(duration).not.toBeNull();
    expect(performanceMonitor.getMetric("global-test")).toBeDefined();
  });

  it("should persist across calls", () => {
    performanceMonitor.start("test-1");
    performanceMonitor.end("test-1");

    expect(performanceMonitor.getMetric("test-1")).toBeDefined();

    performanceMonitor.start("test-2");
    performanceMonitor.end("test-2");

    // Both metrics should exist
    expect(performanceMonitor.getMetric("test-1")).toBeDefined();
    expect(performanceMonitor.getMetric("test-2")).toBeDefined();
  });
});
