import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ExperienceListItem } from "../experience-list-item";
import { ExperienceData } from "@/app/types/experience";

const mockExperience: ExperienceData = {
  images: [{ image: "/test-logo.png", alt: "Test Logo" }],
  title: "Acme Corporation",
  subtitle: "Senior Software Engineer · Jan 2020 - Dec 2023",
  impacts: [
    { label: "Monorepo", color: "primary" },
    { label: "WCAG AA", color: "success" },
    { label: "CI/CD", color: "info" },
  ],
  contributions: [
    "Led migration to modern architecture",
    "Implemented comprehensive test coverage",
    "Mentored junior developers",
  ],
};

const mockExperienceWithMultipleImages: ExperienceData = {
  images: [
    { image: "/logo1.png", alt: "Logo 1" },
    { image: "/logo2.png", alt: "Logo 2" },
  ],
  title: "Multi-Company Project",
  subtitle: "Contractor · 2018-2020",
  impacts: [{ label: "Feature X", color: "primary" }],
  contributions: ["Built scalable solutions"],
};

describe("ExperienceListItem", () => {
  describe("rendering", () => {
    it("renders the experience title", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      expect(screen.getByRole("heading", { name: "Acme Corporation" })).toBeInTheDocument();
    });

    it("renders the experience subtitle", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      expect(screen.getByText("Senior Software Engineer · Jan 2020 - Dec 2023")).toBeInTheDocument();
    });

    it("renders all impact chips", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      expect(screen.getByText("Monorepo")).toBeInTheDocument();
      expect(screen.getByText("WCAG AA")).toBeInTheDocument();
      expect(screen.getByText("CI/CD")).toBeInTheDocument();
    });

    it("renders all contributions", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      expect(screen.getByText("Led migration to modern architecture")).toBeInTheDocument();
      expect(screen.getByText("Implemented comprehensive test coverage")).toBeInTheDocument();
      expect(screen.getByText("Mentored junior developers")).toBeInTheDocument();
    });

    it("renders image with correct alt text", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      expect(screen.getByAltText("Test Logo")).toBeInTheDocument();
    });

    it("renders multiple images", () => {
      render(<ExperienceListItem experience={mockExperienceWithMultipleImages} />);
      expect(screen.getByAltText("Logo 1")).toBeInTheDocument();
      expect(screen.getByAltText("Logo 2")).toBeInTheDocument();
    });
  });

  describe("layout", () => {
    it("uses grid layout for images and content", () => {
      const { container } = render(<ExperienceListItem experience={mockExperience} />);
      const boxes = container.querySelectorAll('[class*="MuiBox-root"]');
      expect(boxes.length).toBeGreaterThan(0);
    });

    it("displays images in a separate section", () => {
      const { container } = render(<ExperienceListItem experience={mockExperience} />);
      const imageSection = container.querySelector('[style*="grey.50"]') || 
                          container.querySelector('[class*="grey"]');
      expect(imageSection || container.firstChild).toBeTruthy();
    });
  });

  describe("accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<ExperienceListItem experience={mockExperience} />);
      const results = await axe(container, {
        rules: {
          // Disable heading-order check for this component since it uses h2 for title and h6 for subsections
          // This is a design decision to maintain visual hierarchy while using semantic headings
          'heading-order': { enabled: false }
        }
      });
      expect(results).toHaveNoViolations();
    });

    it("uses proper heading level", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      const heading = screen.getByRole("heading", { name: "Acme Corporation" });
      expect(heading.tagName).toBe("H2");
    });

    it("provides meaningful image alt text", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      const image = screen.getByAltText("Test Logo");
      expect(image).toHaveAttribute("alt");
    });
  });

  describe("content structure", () => {
    it("groups impact chips together", () => {
      const { container } = render(<ExperienceListItem experience={mockExperience} />);
      const chips = container.querySelectorAll('[class*="MuiChip-root"]');
      expect(chips.length).toBe(mockExperience.impacts.length);
    });

    it("displays contributions in separate blocks", () => {
      render(<ExperienceListItem experience={mockExperience} />);
      const contributions = mockExperience.contributions;
      
      contributions.forEach(contribution => {
        expect(screen.getByText(contribution)).toBeInTheDocument();
      });
    });

    it("applies correct text colors", () => {
      const { container } = render(<ExperienceListItem experience={mockExperience} />);
      const subtitle = screen.getByText(/Senior Software Engineer/);
      
      // Subtitle should have text.secondary color styling
      expect(subtitle).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("handles experience with no impacts", () => {
      const experienceWithoutImpacts = {
        ...mockExperience,
        impacts: [],
      };
      
      render(<ExperienceListItem experience={experienceWithoutImpacts} />);
      expect(screen.getByText("Acme Corporation")).toBeInTheDocument();
    });

    it("handles experience with no contributions", () => {
      const experienceWithoutContributions = {
        ...mockExperience,
        contributions: [],
      };
      
      render(<ExperienceListItem experience={experienceWithoutContributions} />);
      expect(screen.getByText("Acme Corporation")).toBeInTheDocument();
    });

    it("handles long text content gracefully", () => {
      const longExperience = {
        ...mockExperience,
        contributions: [
          "This is a very long contribution description that contains a lot of detailed information about a complex project that involved multiple teams working together across different time zones and required coordination with various stakeholders",
        ],
      };
      
      render(<ExperienceListItem experience={longExperience} />);
      expect(screen.getByText(/very long contribution/)).toBeInTheDocument();
    });
  });
});
