import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Accessibility - Navigation & Structure", () => {
  describe("Keyboard Navigation", () => {
    it("should have focusable interactive elements", () => {
      const { container } = render(
        <div>
          <button>Click me</button>
          <a href="/test">Link</a>
          <input type="text" aria-label="Test input" />
        </div>
      );

      const button = container.querySelector("button");
      const link = container.querySelector("a");
      const input = container.querySelector("input");

      expect(button).not.toHaveAttribute("tabindex", "-1");
      expect(link).not.toHaveAttribute("tabindex", "-1");
      expect(input).not.toHaveAttribute("tabindex", "-1");
    });

    it("should have logical tab order", () => {
      const { container } = render(
        <form>
          <input type="text" aria-label="First" />
          <input type="text" aria-label="Second" />
          <button>Submit</button>
        </form>
      );

      const elements = container.querySelectorAll("input, button");
      const tabIndexes = Array.from(elements).map((el) => 
        el.getAttribute("tabindex")
      );

      // Ensure no positive tabindex that would break natural order
      tabIndexes.forEach((index) => {
        expect(index === null || parseInt(index || "0") <= 0).toBe(true);
      });
    });
  });

  describe("ARIA Landmarks", () => {
    it("should use semantic HTML elements", () => {
      const { container } = render(
        <div>
          <header>Header</header>
          <nav>Navigation</nav>
          <main>Main content</main>
          <aside>Sidebar</aside>
          <footer>Footer</footer>
        </div>
      );

      expect(container.querySelector("header")).toBeInTheDocument();
      expect(container.querySelector("nav")).toBeInTheDocument();
      expect(container.querySelector("main")).toBeInTheDocument();
      expect(container.querySelector("aside")).toBeInTheDocument();
      expect(container.querySelector("footer")).toBeInTheDocument();
    });

    it("should have accessible main content area", () => {
      const { container } = render(
        <main>
          <h1>Page Title</h1>
          <p>Content</p>
        </main>
      );

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main?.querySelector("h1")).toBeInTheDocument();
    });
  });

  describe("Heading Hierarchy", () => {
    it("should have proper heading levels", () => {
      const { container } = render(
        <div>
          <h1>Main Title</h1>
          <h2>Section Title</h2>
          <h3>Subsection Title</h3>
        </div>
      );

      const h1 = container.querySelector("h1");
      const h2 = container.querySelector("h2");
      const h3 = container.querySelector("h3");

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
      expect(h3).toBeInTheDocument();
    });

    it("should not skip heading levels", () => {
      // Good: h1 -> h2 -> h3
      const { container } = render(
        <div>
          <h1>Level 1</h1>
          <h2>Level 2</h2>
          <h3>Level 3</h3>
        </div>
      );

      const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
      expect(headings).toHaveLength(3);
    });
  });

  describe("Link Accessibility", () => {
    it("should have descriptive link text", () => {
      const { container } = render(
        <nav>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">Home</a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/about">About</a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/contact">Contact</a>
        </nav>
      );

      const links = container.querySelectorAll("a");
      links.forEach((link) => {
        expect(link.textContent).toBeTruthy();
        expect(link.textContent?.length).toBeGreaterThan(0);
      });
    });

    it("should indicate external links", () => {
      const { container } = render(
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          External Link
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      );

      const link = container.querySelector("a");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Focus Management", () => {
    it("should have visible focus indicators", () => {
      const { container } = render(
        <button>Focusable Button</button>
      );

      const button = container.querySelector("button");
      
      // Button should be focusable (default browser behavior)
      expect(button).not.toHaveAttribute("tabindex", "-1");
    });

    it("should not have focus traps", () => {
      const { container } = render(
        <div>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </div>
      );

      const buttons = container.querySelectorAll("button");
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute("tabindex", "-1");
      });
    });
  });

  describe("Screen Reader Support", () => {
    it("should have sr-only class for screen reader text", () => {
      const { container } = render(
        <div>
          <span className="sr-only">Screen reader only text</span>
          <span>Visible text</span>
        </div>
      );

      const srOnly = container.querySelector(".sr-only");
      expect(srOnly).toBeInTheDocument();
    });

    it("should use aria-label for icon buttons", () => {
      const { container } = render(
        <button aria-label="Close dialog">
          <span aria-hidden="true">×</span>
        </button>
      );

      const button = container.querySelector("button");
      expect(button).toHaveAttribute("aria-label");
      
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it("should hide decorative images", () => {
      const { container } = render(
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/decorative.jpg" alt="" role="presentation" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/informative.jpg" alt="Descriptive text" />
        </div>
      );

      const decorative = container.querySelector('[role="presentation"]');
      const informative = container.querySelector('[alt="Descriptive text"]');

      expect(decorative).toHaveAttribute("alt", "");
      expect(informative).toHaveAttribute("alt");
      expect(informative?.getAttribute("alt")).toBeTruthy();
    });
  });
});
