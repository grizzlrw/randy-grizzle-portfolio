/**
 * Performance Monitoring Utilities
 * 
 * Provides tools for measuring and reporting performance metrics
 * in both development and production environments.
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface PerformanceReport {
  metrics: PerformanceMetric[];
  summary: {
    totalDuration: number;
    averageDuration: number;
    minDuration: number;
    maxDuration: number;
  };
}

/**
 * Performance measurement class
 * Tracks timing metrics for operations
 */
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  private startTimes: Map<string, number> = new Map();

  /**
   * Start measuring a named operation
   */
  start(name: string): void {
    this.startTimes.set(name, performance.now());
  }

  /**
   * End measuring and record the duration
   */
  end(name: string, metadata?: Record<string, any>): number | null {
    const startTime = this.startTimes.get(name);
    if (!startTime) {
      console.warn(`Performance measurement '${name}' was ended without being started`);
      return null;
    }

    const duration = performance.now() - startTime;
    this.metrics.set(name, duration);
    this.startTimes.delete(name);

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`, metadata || "");
    }

    return duration;
  }

  /**
   * Measure a function execution time
   */
  async measure<T>(
    name: string,
    fn: () => T | Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    this.start(name);
    try {
      const result = await fn();
      this.end(name, metadata);
      return result;
    } catch (error) {
      this.end(name, { ...metadata, error: true });
      throw error;
    }
  }

  /**
   * Get a specific metric
   */
  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.entries()).map(([name, value]) => ({
      name,
      value,
      timestamp: Date.now(),
    }));
  }

  /**
   * Generate performance report
   */
  getReport(): PerformanceReport {
    const metrics = this.getAllMetrics();
    const values = metrics.map((m) => m.value);

    return {
      metrics,
      summary: {
        totalDuration: values.reduce((sum, val) => sum + val, 0),
        averageDuration: values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0,
        minDuration: values.length > 0 ? Math.min(...values) : 0,
        maxDuration: values.length > 0 ? Math.max(...values) : 0,
      },
    };
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics.clear();
    this.startTimes.clear();
  }

  /**
   * Mark a Web Vitals metric
   */
  markVital(name: string, value: number, metadata?: Record<string, any>): void {
    this.metrics.set(name, value);

    if (process.env.NODE_ENV === "development") {
      console.log(`📊 ${name}: ${value.toFixed(2)}`, metadata || "");
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === "production") {
      // Example: sendToAnalytics({ name, value, ...metadata });
    }
  }
}

/**
 * Global performance monitor instance
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Decorator for measuring class methods
 */
export function measurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const name = `${target.constructor.name}.${propertyKey}`;
    performanceMonitor.start(name);
    try {
      const result = await originalMethod.apply(this, args);
      performanceMonitor.end(name);
      return result;
    } catch (error) {
      performanceMonitor.end(name, { error: true });
      throw error;
    }
  };

  return descriptor;
}

/**
 * Web Vitals reporting
 */
export function reportWebVitals(metric: any): void {
  performanceMonitor.markVital(metric.name, metric.value, {
    id: metric.id,
    rating: metric.rating,
  });
}

/**
 * Measure component render time
 */
export function measureRender(componentName: string, startMark?: string, endMark?: string): void {
  if (typeof window === "undefined" || !window.performance) return;

  try {
    const start = startMark || `${componentName}-start`;
    const end = endMark || `${componentName}-end`;

    performance.mark(end);
    performance.measure(componentName, start, end);

    const measure = performance.getEntriesByName(componentName)[0];
    if (measure) {
      performanceMonitor.markVital(`render:${componentName}`, measure.duration);
    }

    // Cleanup
    performance.clearMarks(start);
    performance.clearMarks(end);
    performance.clearMeasures(componentName);
  } catch (error) {
    console.error("Error measuring render:", error);
  }
}

/**
 * Log performance budget violations
 */
export function checkPerformanceBudget(
  metricName: string,
  actualValue: number,
  budgetValue: number
): boolean {
  if (actualValue > budgetValue) {
    const violation = ((actualValue - budgetValue) / budgetValue * 100).toFixed(1);
    console.warn(
      `⚠️ Performance budget exceeded for ${metricName}:\n` +
      `  Actual: ${actualValue.toFixed(2)}ms\n` +
      `  Budget: ${budgetValue}ms\n` +
      `  Violation: +${violation}%`
    );
    return false;
  }
  return true;
}

/**
 * Create a performance mark for measuring
 */
export function markPerformance(name: string): void {
  if (typeof window !== "undefined" && window.performance) {
    performance.mark(name);
  }
}
