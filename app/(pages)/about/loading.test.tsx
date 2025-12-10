import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("About Loading State", () => {
  it("renders PageSkeleton component", () => {
    const { container } = render(<Loading />);
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("shows loading skeleton for title", () => {
    const { container } = render(<Loading />);
    const skeletons = container.querySelectorAll(".MuiSkeleton-root");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("matches PageLayout structure", () => {
    const { container } = render(<Loading />);
    const section = container.querySelector("section") || container.querySelector('[class*="MuiBox"]');
    expect(section || container.querySelector("main")).toBeInTheDocument();
  });
});
