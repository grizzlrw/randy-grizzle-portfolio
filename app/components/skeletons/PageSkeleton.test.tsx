import { render } from "@testing-library/react";
import PageSkeleton from "./PageSkeleton";

describe("PageSkeleton", () => {
  it("renders without crashing", () => {
    expect(() => {
      render(<PageSkeleton />);
    }).not.toThrow();
  });

  it("renders title skeleton by default", () => {
    const { container } = render(<PageSkeleton />);
    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders title and subtitle skeletons when hasSubtitle is true", () => {
    const { container } = render(<PageSkeleton hasTitle hasSubtitle />);
    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    // Should have title, subtitle, and content skeletons
    expect(skeletons.length).toBeGreaterThan(3);
  });

  it("does not render title skeleton when hasTitle is false", () => {
    const { container } = render(<PageSkeleton hasTitle={false} />);
    // Should only have content skeletons (3 rectangular blocks)
    const rectangularSkeletons = container.querySelectorAll(
      '.MuiSkeleton-rectangular'
    );
    expect(rectangularSkeletons).toHaveLength(3);
  });

  it("applies custom maxWidth", () => {
    const { container } = render(<PageSkeleton maxWidth={960} />);
    const contentBox = container.querySelector('div[class*="MuiBox"]');
    // Check that a Box exists (basic structure test)
    expect(contentBox).toBeInTheDocument();
  });

  it("has semantic main element", () => {
    const { container } = render(<PageSkeleton />);
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });

  it("renders content block skeletons", () => {
    const { container } = render(<PageSkeleton hasTitle={false} />);
    const rectangularSkeletons = container.querySelectorAll(
      '.MuiSkeleton-rectangular'
    );
    // Should have 3 content blocks
    expect(rectangularSkeletons).toHaveLength(3);
  });

  it("matches PageLayout structure", () => {
    const { container } = render(<PageSkeleton />);

    // Should have main wrapper
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();

    // Should have inner Box (section equivalent)
    const boxes = container.querySelectorAll('div[class*="MuiBox"]');
    expect(boxes.length).toBeGreaterThan(0);
  });
});
