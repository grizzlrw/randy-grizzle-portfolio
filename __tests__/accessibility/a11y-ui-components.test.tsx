import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SkillCard from "@/app/components/skill-card/skill-card";
import PageSkeleton from "@/app/components/skeletons/PageSkeleton";
import SkillListSkeleton from "@/app/components/skeletons/SkillListSkeleton";

expect.extend(toHaveNoViolations);

describe("Accessibility - UI Components", () => {
  describe("SkillCard", () => {
    const mockSkill = {
      id: "1",
      title: "React",
      description: "A JavaScript library for building user interfaces",
      route: "/skills/react",
      imageUrl: "/images/react.png",
      imageAlt: "React logo",
    };

    it("should have no accessibility violations", async () => {
      const { container } = render(<SkillCard {...mockSkill} />);
      await waitFor(() => expect(container).toBeInTheDocument());
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible image with alt text", async () => {
      const { container } = render(<SkillCard {...mockSkill} />);
      await waitFor(() => expect(container).toBeInTheDocument());
      const img = container.querySelector('[title]');
      
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("title", mockSkill.imageAlt);
    });

    it("should have accessible card structure", async () => {
      const { container } = render(<SkillCard {...mockSkill} />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const heading = container.querySelector("h2, h6, h5");
      
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(mockSkill.title);
    });

    it("should have accessible content description", () => {
      const { getByText } = render(<SkillCard {...mockSkill} />);
      
      expect(getByText(mockSkill.description)).toBeInTheDocument();
    });
  });

  describe("PageSkeleton", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<PageSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible loading indicators", () => {
      const { container } = render(<PageSkeleton />);
      const skeletons = container.querySelectorAll('[class*="Skeleton"]');
      
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("should use semantic structure", () => {
      const { container } = render(<PageSkeleton />);
      const main = container.querySelector("main");
      
      expect(main).toBeInTheDocument();
    });
  });

  describe("SkillListSkeleton", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<SkillListSkeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should render multiple skeleton cards", () => {
      const { container } = render(<SkillListSkeleton />);
      const skeletons = container.querySelectorAll('[class*="Skeleton"]');
      
      expect(skeletons.length).toBeGreaterThan(3); // Should have multiple loading cards
    });
  });

  describe("Interactive Elements", () => {
    it("should have accessible button states", () => {
      const { container } = render(
        <button disabled>Disabled Button</button>
      );

      const button = container.querySelector("button");
      expect(button).toHaveAttribute("disabled");
      expect(button).toBeDisabled();
    });

    it("should have accessible link states", () => {
      const { container } = render(
        <a href="/test" aria-current="page">
          Current Page
        </a>
      );

      const link = container.querySelector("a");
      expect(link).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Color Contrast", () => {
    it("should use sufficient color contrast for text", async () => {
      const { container } = render(
        <div>
          <p style={{ color: "#000", backgroundColor: "#fff" }}>
            High contrast text
          </p>
        </div>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
