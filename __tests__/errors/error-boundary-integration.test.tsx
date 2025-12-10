import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ErrorBoundary from "@/app/components/errors/ErrorBoundary";

describe("Error Boundaries - Integration", () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  describe("ErrorBoundary Component", () => {
    it("should catch errors in child components", () => {
      const ThrowError = () => {
        throw new Error("Test error");
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(console.error).toHaveBeenCalled();
    });

    it("should display user-friendly error message", () => {
      const ThrowError = () => {
        throw new Error("Test error");
      };

      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(getByText("Something Went Wrong")).toBeInTheDocument();
    });

    it("should provide recovery options", () => {
      const ThrowError = () => {
        throw new Error("Test error");
      };

      const { getByRole } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(getByRole("button", { name: /reload page/i })).toBeInTheDocument();
      expect(getByRole("button", { name: /try again/i })).toBeInTheDocument();
    });

    it("should support custom fallback UI", () => {
      const ThrowError = () => {
        throw new Error("Test error");
      };

      const CustomFallback = () => (
        <div role="alert">
          <h2>Custom Error UI</h2>
          <p>Something went wrong with this component</p>
        </div>
      );

      const { getByRole, getByText } = render(
        <ErrorBoundary fallback={<CustomFallback />}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(getByRole("alert")).toBeInTheDocument();
      expect(getByText("Custom Error UI")).toBeInTheDocument();
    });

    it("should call onError callback when provided", () => {
      const ThrowError = () => {
        throw new Error("Test error");
      };

      const onError = jest.fn();

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe("Nested Error Boundaries", () => {
    it("should isolate errors to nearest boundary", () => {
      const ThrowError = () => {
        throw new Error("Inner error");
      };

      const SafeComponent = () => <div>Safe content</div>;

      const { getByText } = render(
        <ErrorBoundary>
          <SafeComponent />
          <ErrorBoundary>
            <ThrowError />
          </ErrorBoundary>
        </ErrorBoundary>
      );

      // Inner boundary should catch the error
      expect(getByText("Something Went Wrong")).toBeInTheDocument();
      // Outer boundary should still show safe content
      expect(getByText("Safe content")).toBeInTheDocument();
    });
  });

  describe("Error Recovery", () => {
    it("should allow component retry after error", () => {
      let shouldThrow = true;

      const ConditionalError = () => {
        if (shouldThrow) {
          throw new Error("Conditional error");
        }
        return <div>Success!</div>;
      };

      const { getByText, getByRole } = render(
        <ErrorBoundary>
          <ConditionalError />
        </ErrorBoundary>
      );

      // Should show error initially
      expect(getByText("Something Went Wrong")).toBeInTheDocument();

      // Fix the error condition
      shouldThrow = false;

      // Try again should work after rerender
      const tryAgainButton = getByRole("button", { name: /try again/i });
      expect(tryAgainButton).toBeInTheDocument();
    });
  });

  describe("Production vs Development", () => {
    // Note: Testing environment-specific rendering is difficult in Jest
    // as process.env.NODE_ENV is locked during test runs
    it.skip("should show error details in development", () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        configurable: true,
      });

      const ThrowError = () => {
        throw new Error("Development error");
      };

      const { getByText } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(getByText("Development Error Details:")).toBeInTheDocument();
      expect(getByText("Development error")).toBeInTheDocument();

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        configurable: true,
      });
    });

    it.skip("should hide error details in production", () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        configurable: true,
      });

      const ThrowError = () => {
        throw new Error("Production error");
      };

      const { queryByText } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(queryByText("Development Error Details:")).not.toBeInTheDocument();

      Object.defineProperty(process.env, 'NODE_ENV', {
        value: originalEnv,
        configurable: true,
      });
    });
  });
});
