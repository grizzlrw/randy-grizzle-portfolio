import { render } from "@testing-library/react";
import SkillListSkeleton from "./SkillListSkeleton";

describe("SkillListSkeleton", () => {
  it("renders without crashing", () => {
    expect(() => {
      render(<SkillListSkeleton />);
    }).not.toThrow();
  });

  it("renders default number of skeleton cards (4)", () => {
    const { container } = render(<SkillListSkeleton />);
    const skeletonCards = container.querySelectorAll("li");
    expect(skeletonCards).toHaveLength(4);
  });

  it("renders custom number of skeleton cards", () => {
    const { container } = render(<SkillListSkeleton length={6} />);
    const skeletonCards = container.querySelectorAll("li");
    expect(skeletonCards).toHaveLength(6);
  });

  it("renders skeleton elements for card structure", () => {
    const { container } = render(<SkillListSkeleton length={1} />);

    // Should have Card component
    const card = container.querySelector(".MuiCard-root");
    expect(card).toBeInTheDocument();

    // Should have CardHeader with skeleton
    const cardHeader = container.querySelector(".MuiCardHeader-root");
    expect(cardHeader).toBeInTheDocument();

    // Should have CardContent
    const cardContent = container.querySelector(".MuiCardContent-root");
    expect(cardContent).toBeInTheDocument();

    // Should have multiple Skeleton components
    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("matches grid layout structure", () => {
    const { container } = render(<SkillListSkeleton length={3} />);

    // Should use Grid container
    const gridContainer = container.querySelector('ul[class*="MuiGrid"]');
    expect(gridContainer).toBeInTheDocument();
  });

  it("renders with semantic HTML (ul/li)", () => {
    const { container } = render(<SkillListSkeleton length={2} />);

    const list = container.querySelector("ul");
    expect(list).toBeInTheDocument();

    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(2);
  });
});
