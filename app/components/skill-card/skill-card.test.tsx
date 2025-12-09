import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import SkillCard from "./skill-card";
import { act } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

test("SkillCard renders name heading", async () => {
    await act(() => {
        render(
            <SkillCard
            id="skill-1"
            title="Accessibility"
            description="Some description"
            route="/accessibility"
            />
        );
    })
  
  expect(screen.getByRole("heading", { name: /accessibility/i })).toBeInTheDocument();
});

test("SkillCard has no accessibility violations", async () => {
  const { container } = render(
    <SkillCard
      id="skill-1"
      title="Accessibility"
      description="Some description"
      route="/accessibility"
    />
  );

  const results = await axe(container, {
    runOnly: {
    type: 'tag',
    values: ['wcag2a',
             'wcag2aa',
             'wcag21a',
             'wcag21aa',
             'best-practice',
             'cat.aria',
             'cat.keyboard',
             'cat.name-role-value',
             'cat.color',
            ] // Run only WCAG 2.0 Level A and WCAG 2.1 Level A rules
    },
  });
  expect(results).toHaveNoViolations();
});