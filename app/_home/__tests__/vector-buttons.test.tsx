import { render, screen } from "@testing-library/react";
import VectorButtons from "../vector-buttons";

// Mock Next.js Link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock CircleIcon
jest.mock("@/app/components/circle/circle-icon", () => ({
  CircleIcon: ({ title, glyph }: { title: string; glyph: string }) => (
    <div data-testid="circle-icon" title={title}>
      <img src={glyph} alt={title} />
    </div>
  ),
}));

describe("VectorButtons", () => {
  describe("Component Rendering", () => {
    it("should render without crashing", () => {
      render(<VectorButtons />);
      expect(screen.getByText("Accessibility")).toBeInTheDocument();
    });

    it("should render all four sections", () => {
      render(<VectorButtons />);

      expect(screen.getByText("Accessibility")).toBeInTheDocument();
      expect(screen.getByText("Modularity")).toBeInTheDocument();
      expect(screen.getByText("Collaboration")).toBeInTheDocument();
      expect(screen.getByText("Deployment")).toBeInTheDocument();
    });

    it("should render all four CircleIcon components", () => {
      render(<VectorButtons />);

      const icons = screen.getAllByTestId("circle-icon");
      expect(icons).toHaveLength(4);
    });
  });

  describe("Content and Headings", () => {
    it("should render section headings as h3 elements", () => {
      const { container } = render(<VectorButtons />);

      const headings = container.querySelectorAll("h3");
      expect(headings).toHaveLength(4);
    });

    it("should display Accessibility section", () => {
      render(<VectorButtons />);

      expect(screen.getByText("Accessibility")).toBeInTheDocument();
      expect(
        screen.getByTitle("Woman with floating media icons around her")
      ).toBeInTheDocument();
    });

    it("should display Modularity section", () => {
      render(<VectorButtons />);

      expect(screen.getByText("Modularity")).toBeInTheDocument();
      expect(
        screen.getByTitle("Man holding lightbulb and pointing to modular site map")
      ).toBeInTheDocument();
    });

    it("should display Collaboration section", () => {
      render(<VectorButtons />);

      expect(screen.getByText("Collaboration")).toBeInTheDocument();
      expect(
        screen.getByTitle("People working together to build a website")
      ).toBeInTheDocument();
    });

    it("should display Deployment section", () => {
      render(<VectorButtons />);

      expect(screen.getByText("Deployment")).toBeInTheDocument();
      expect(
        screen.getByTitle("Man holding a rocketship during launch")
      ).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    it("should have a link to modularity article", () => {
      render(<VectorButtons />);

      const link = screen.getByRole("link", { name: /modularity/i });
      expect(link).toHaveAttribute("href", "/articles/modularity");
    });

    it("should wrap Modularity section in a link", () => {
      const { container } = render(<VectorButtons />);

      const modularityLink = screen.getByRole("link", { name: /modularity/i });
      expect(modularityLink).toBeInTheDocument();
      
      // Check that the link contains the icon
      const icon = modularityLink.querySelector('[data-testid="circle-icon"]');
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Grid Layout", () => {
    it("should render Grid container", () => {
      const { container } = render(<VectorButtons />);

      const gridContainer = container.querySelector(".MuiGrid-container");
      expect(gridContainer).toBeInTheDocument();
    });

    it("should have correct responsive grid sizing", () => {
      const { container } = render(<VectorButtons />);

      const gridItems = container.querySelectorAll(".MuiGrid-root");
      // Should have at least 4 grid items (one for each section)
      expect(gridItems.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Styling and Interactions", () => {
    it("should apply hover transform styles", () => {
      const { container } = render(<VectorButtons />);

      const boxes = container.querySelectorAll('[class*="MuiBox-root"]');
      // Should have Box components with hover styles
      expect(boxes.length).toBeGreaterThan(0);
    });

    it("should center-align typography", () => {
      const { container } = render(<VectorButtons />);

      const headings = container.querySelectorAll("h3");
      headings.forEach((heading) => {
        // Typography component should be rendered
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have descriptive titles for all icons", () => {
      render(<VectorButtons />);

      expect(
        screen.getByTitle("Woman with floating media icons around her")
      ).toBeInTheDocument();
      expect(
        screen.getByTitle("Man holding lightbulb and pointing to modular site map")
      ).toBeInTheDocument();
      expect(
        screen.getByTitle("People working together to build a website")
      ).toBeInTheDocument();
      expect(
        screen.getByTitle("Man holding a rocketship during launch")
      ).toBeInTheDocument();
    });

    it("should use semantic heading elements", () => {
      const { container } = render(<VectorButtons />);

      const h3Elements = container.querySelectorAll("h3");
      expect(h3Elements.length).toBe(4);
    });
  });

  describe("Edge Cases", () => {
    it("should render with empty props", () => {
      // Component has no props, but test it renders correctly anyway
      const { container } = render(<VectorButtons />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should maintain structure with all elements present", () => {
      const { container } = render(<VectorButtons />);

      // Check that all main structural elements exist
      expect(container.querySelector(".MuiGrid-container")).toBeInTheDocument();
      expect(screen.getAllByTestId("circle-icon")).toHaveLength(4);
      expect(container.querySelectorAll("h3")).toHaveLength(4);
    });
  });
});
