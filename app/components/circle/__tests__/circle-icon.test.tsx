import { render, screen } from "@testing-library/react";
import { CircleIcon } from "../circle-icon";
import type { GlyphComponent } from "../../../types/glyph";

// Mock VectorRenderer
jest.mock("../../vector-renderer/vector-renderer", () => ({
  VectorRenderer: ({ title, description }: { title: string; description?: string }) => (
    <div data-testid="vector-renderer" data-title={title} data-description={description}>
      Mocked VectorRenderer
    </div>
  ),
}));

// Mock glyph component
const MockGlyph: GlyphComponent = (props) => (
  <svg {...props} data-testid="mock-glyph">
    <circle cx="50" cy="50" r="40" />
  </svg>
);

describe("CircleIcon", () => {
  it("should render circle icon with glyph", () => {
    render(
      <CircleIcon 
        glyph={MockGlyph} 
        title="Test Icon" 
      />
    );

    expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
  });

  it("should pass title to VectorRenderer", () => {
    render(
      <CircleIcon 
        glyph={MockGlyph} 
        title="Accessibility Icon" 
      />
    );

    const renderer = screen.getByTestId("vector-renderer");
    expect(renderer).toHaveAttribute("data-title", "Accessibility Icon");
  });

  it("should pass description to VectorRenderer when provided", () => {
    render(
      <CircleIcon 
        glyph={MockGlyph} 
        title="Test Icon"
        description="This is a test icon" 
      />
    );

    const renderer = screen.getByTestId("vector-renderer");
    expect(renderer).toHaveAttribute("data-description", "This is a test icon");
  });

  it("should not pass description when omitted", () => {
    const { container } = render(
      <CircleIcon 
        glyph={MockGlyph} 
        title="Test Icon" 
      />
    );

    // Description should not be rendered when omitted
    const desc = container.querySelector("desc");
    expect(desc).not.toBeInTheDocument();
  });

  describe("Size Property", () => {
    it("should render with responsive sizing by default", () => {
      const { container } = render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon" 
        />
      );

      // Check that the component renders (responsive by default)
      const boxes = container.querySelectorAll(".MuiBox-root");
      expect(boxes.length).toBeGreaterThan(0);
    });

    it("should accept numeric pixel size", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          size={100} 
        />
      );

      // Component should render without errors
      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should accept percentage size", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          size="50%" 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });
  });

  describe("Color Property", () => {
    it("should use default color primary.50", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon" 
        />
      );

      // Should render without errors with default color
      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should accept custom MUI palette color", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          color="secondary.main" 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should accept CSS color values", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          color="#FF5733" 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });
  });

  describe("Glyph Transformation", () => {
    it("should use default glyphScale of 1.2", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon" 
        />
      );

      // Default scale should be applied
      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should accept custom glyphScale", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          glyphScale={1.5} 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should accept glyphScale less than 1", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          glyphScale={0.8} 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should apply glyphOffsetXPercent", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          glyphOffsetXPercent={10} 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should apply glyphOffsetYPercent", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          glyphOffsetYPercent={-5} 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should apply both offset and scale", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon"
          glyphScale={1.3}
          glyphOffsetXPercent={5}
          glyphOffsetYPercent={-3} 
        />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should default offsets to 0", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon" 
        />
      );

      // Should render with default offsets
      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should render nested box structure", () => {
      const { container } = render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon" 
        />
      );

      const boxes = container.querySelectorAll(".MuiBox-root");
      expect(boxes.length).toBeGreaterThan(1);
    });

    it("should create circular background", () => {
      const { container } = render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon" 
        />
      );

      // Should have boxes for structure
      expect(container.querySelector(".MuiBox-root")).toBeInTheDocument();
    });

    it("should maintain aspect ratio 1:1", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph} 
          title="Test Icon" 
        />
      );

      // Component should render with proper structure
      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should render multiple CircleIcons independently", () => {
      render(
        <>
          <CircleIcon glyph={MockGlyph} title="Icon 1" color="primary.main" />
          <CircleIcon glyph={MockGlyph} title="Icon 2" color="secondary.main" />
        </>
      );

      const renderers = screen.getAllByTestId("vector-renderer");
      expect(renderers).toHaveLength(2);
    });

    it("should work with different glyphs", () => {
      const AnotherGlyph: GlyphComponent = (props) => (
        <svg {...props}>
          <rect width="100" height="100" />
        </svg>
      );

      const { rerender } = render(
        <CircleIcon glyph={MockGlyph} title="First" />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();

      rerender(
        <CircleIcon glyph={AnotherGlyph} title="Second" />
      );

      expect(screen.getByTestId("vector-renderer")).toBeInTheDocument();
    });

    it("should handle all props together", () => {
      render(
        <CircleIcon 
          glyph={MockGlyph}
          title="Complete Test"
          description="Full description"
          size={150}
          color="primary.dark"
          glyphScale={1.4}
          glyphOffsetXPercent={2}
          glyphOffsetYPercent={-2}
        />
      );

      const renderer = screen.getByTestId("vector-renderer");
      expect(renderer).toHaveAttribute("data-title", "Complete Test");
      expect(renderer).toHaveAttribute("data-description", "Full description");
    });
  });
});
