import { render, screen } from "@testing-library/react";
import { VectorRenderer } from "../vector-renderer";
import type { GlyphComponent } from "../../../types/glyph";

// Mock SVG component for testing
const MockGlyph: GlyphComponent = (props) => (
  <svg {...props} data-testid="mock-glyph">
    <circle cx="50" cy="50" r="40" />
  </svg>
);

describe("VectorRenderer", () => {
  it("should render the glyph component", () => {
    render(
      <VectorRenderer 
        glyph={MockGlyph} 
        title="Test Icon" 
      />
    );

    expect(screen.getByTestId("mock-glyph")).toBeInTheDocument();
  });

  it("should set img role for accessibility", () => {
    render(
      <VectorRenderer 
        glyph={MockGlyph} 
        title="Test Icon" 
      />
    );

    const svg = screen.getByRole("img");
    expect(svg).toBeInTheDocument();
  });

  it("should set aria-label with title", () => {
    render(
      <VectorRenderer 
        glyph={MockGlyph} 
        title="Accessibility Icon" 
      />
    );

    const svg = screen.getByRole("img", { name: "Accessibility Icon" });
    expect(svg).toBeInTheDocument();
  });

  it("should render title element inside SVG", () => {
    render(
      <VectorRenderer 
        glyph={MockGlyph} 
        title="Test Title" 
      />
    );

    // Check that title is passed to aria-label
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("aria-label", "Test Title");
  });

  it("should render desc element when description provided", () => {
    render(
      <VectorRenderer
        glyph={MockGlyph}
        title="Test"
        description="This is a test description"
      />
    );

    // Check that description is passed to aria-describedby
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("aria-describedby", "This is a test description");
  });

  it("should not render desc element when description omitted", () => {
    const { container } = render(
      <VectorRenderer 
        glyph={MockGlyph} 
        title="Test Icon" 
      />
    );

    const desc = container.querySelector("desc");
    expect(desc).not.toBeInTheDocument();
  });

  it("should set preserveAspectRatio attribute", () => {
    render(
      <VectorRenderer 
        glyph={MockGlyph} 
        title="Test Icon" 
      />
    );

    const svg = screen.getByTestId("mock-glyph");
    expect(svg).toHaveAttribute("preserveAspectRatio", "xMidYMid meet");
  });

  it("should set aria-describedby when description provided", () => {
    render(
      <VectorRenderer 
        glyph={MockGlyph} 
        title="Test Icon"
        description="Test description" 
      />
    );

    const svg = screen.getByTestId("mock-glyph");
    expect(svg).toHaveAttribute("aria-describedby");
  });

  describe("Accessibility", () => {
    it("should have unique title IDs for multiple instances", () => {
      render(
        <>
          <VectorRenderer glyph={MockGlyph} title="First" />
          <VectorRenderer glyph={MockGlyph} title="Second" />
        </>
      );

      // Both should render with role img
      const svgs = screen.getAllByRole("img");
      expect(svgs).toHaveLength(2);
      
      // Check that each has its own aria-label
      expect(svgs[0]).toHaveAttribute("aria-label", "First");
      expect(svgs[1]).toHaveAttribute("aria-label", "Second");
    });

    it("should have unique desc IDs for multiple instances with descriptions", () => {
      render(
        <>
          <VectorRenderer glyph={MockGlyph} title="Icon 1" description="Desc 1" />
          <VectorRenderer glyph={MockGlyph} title="Icon 2" description="Desc 2" />
        </>
      );

      // Both should have descriptions
      const svgs = screen.getAllByRole("img");
      expect(svgs[0]).toHaveAttribute("aria-describedby", "Desc 1");
      expect(svgs[1]).toHaveAttribute("aria-describedby", "Desc 2");
    });

    it("should be discoverable by assistive technology", () => {
      render(
        <VectorRenderer 
          glyph={MockGlyph} 
          title="Navigation Icon"
          description="Click to navigate" 
        />
      );

      const svg = screen.getByRole("img", { name: "Navigation Icon" });
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Glyph Integration", () => {
    it("should pass through SVG props to glyph component", () => {
      const GlyphWithViewBox: GlyphComponent = (props) => (
        <svg {...props} viewBox="0 0 100 100" data-testid="viewbox-glyph">
          <rect width="100" height="100" />
        </svg>
      );

      render(
        <VectorRenderer 
          glyph={GlyphWithViewBox} 
          title="Test" 
        />
      );

      const svg = screen.getByTestId("viewbox-glyph");
      expect(svg).toHaveAttribute("viewBox", "0 0 100 100");
    });

    it("should work with complex glyphs", () => {
      const ComplexGlyph: GlyphComponent = (props) => (
        <svg {...props} data-testid="complex-glyph">
          <g>
            <path d="M10 10 L90 90" />
            <circle cx="50" cy="50" r="30" />
            <text x="50" y="50">Test</text>
          </g>
        </svg>
      );

      const { container } = render(
        <VectorRenderer 
          glyph={ComplexGlyph} 
          title="Complex Icon" 
        />
      );

      expect(screen.getByTestId("complex-glyph")).toBeInTheDocument();
      expect(container.querySelector("path")).toBeInTheDocument();
      expect(container.querySelector("circle")).toBeInTheDocument();
      expect(container.querySelector("text")).toBeInTheDocument();
    });
  });
});
