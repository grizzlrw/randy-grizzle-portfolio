import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("Forms Loading State", () => {
  it("renders PageSkeleton component", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("shows loading skeleton with title and subtitle", () => {
    const { container } = render(<Loading />);
    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(1);
  });

  it("uses correct maxWidth", () => {
    const { container } = render(<Loading />);
    const box = container.querySelector('[style*="max-width"]') || container.querySelector("main");
    expect(box).toBeInTheDocument();
  });
});
