import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import HomeHero from "./home-hero";

test("HomeHero renders name heading", () => {
  render(<HomeHero />);
  expect(screen.getByRole("heading", { name: /randy grizzle/i })).toBeInTheDocument();
});

test("HomeHero has no accessibility violations", async () => {
  const { container } = render(<HomeHero />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});