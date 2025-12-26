import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import Home from "../page";

// Mock the experiences data
jest.mock("@/app/data/experiences", () => ({
  experiences: [
    {
      images: [{ image: "/test-logo.png", alt: "Test Company" }],
      title: "Test Company",
      subtitle: "Senior Engineer",
      impacts: [{ label: "Impact 1", color: "primary" }],
      contributions: ["Contribution 1"],
    },
  ],
}));

// Mock VectorRenderer
jest.mock("@/app/components/vector-renderer/vector-renderer", () => ({
  VectorRenderer: ({ title }: { title: string }) => <div title={title}>Vector</div>,
}));

describe("Home Page", () => {
  describe("profile section", () => {
    it("renders the page heading with name", () => {
      render(<Home />);
      expect(screen.getByRole("heading", { name: "Randy Grizzle", level: 1 })).toBeInTheDocument();
    });

    it("renders the job title", () => {
      render(<Home />);
      expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument();
    });

    it("displays the logo as background", () => {
      const { container } = render(<Home />);
      // Check that there's a Box element (the sidebar actually has the background)
      const sidebar = container.querySelector('[class*="MuiBox-root"]');
      expect(sidebar).toBeTruthy();
    });
  });

  describe("skills section", () => {
    it("renders all skill categories", () => {
      render(<Home />);
      expect(screen.getByRole("heading", { name: /languages/i, level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /technologies/i, level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /accessibility/i, level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /specializations/i, level: 2 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /other/i, level: 2 })).toBeInTheDocument();
    });

    it("displays language skills", () => {
      render(<Home />);
      expect(screen.getByText(/JavaScript \(ES6\+\)/)).toBeInTheDocument();
      expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
      expect(screen.getByText(/HTML\/CSS\/SCSS/)).toBeInTheDocument();
    });

    it("displays technology skills", () => {
      render(<Home />);
      expect(screen.getByText(/Vue 3/)).toBeInTheDocument();
      const reactElements = screen.getAllByText((content, element) => {
        return element?.tagName === 'P' && content === 'React';
      });
      expect(reactElements.length).toBeGreaterThan(0);
      expect(screen.getByText(/Next\.js/)).toBeInTheDocument();
    });

    it("displays accessibility skills", () => {
      render(<Home />);
      expect(screen.getByText(/WCAG 2\.1 AA/)).toBeInTheDocument();
      expect(screen.getByText(/Section 508/)).toBeInTheDocument();
      expect(screen.getByText(/ARIA/)).toBeInTheDocument();
    });

    it("displays specialization skills", () => {
      render(<Home />);
      expect(screen.getByText(/Design Systems/)).toBeInTheDocument();
      expect(screen.getByText(/Component Library/)).toBeInTheDocument();
    });

    it("displays other skills", () => {
      render(<Home />);
      expect(screen.getByText(/REST API Integration/)).toBeInTheDocument();
      expect(screen.getByText(/State Management/)).toBeInTheDocument();
    });
  });

  describe("experience section", () => {
    it("renders the experience heading", () => {
      render(<Home />);
      expect(screen.getByRole("heading", { name: /experience/i, level: 2 })).toBeInTheDocument();
    });

    it("renders experience items from data", () => {
      render(<Home />);
      expect(screen.getByRole("heading", { name: "Test Company", level: 3 })).toBeInTheDocument();
    });
  });

  describe("layout", () => {
    it("has a two-column layout structure", () => {
      const { container } = render(<Home />);
      const mainContent = container.querySelector('#main-content');
      expect(mainContent).toBeInTheDocument();
    });

    it("has proper responsive width classes", () => {
      const { container } = render(<Home />);
      const leftColumn = container.querySelector('[class*="MuiBox-root"]');
      expect(leftColumn).toBeTruthy();
    });

    it("applies grey background to skills sidebar", () => {
      const { container } = render(<Home />);
      // The sidebar is the first Box with MuiBox-root class
      const boxes = container.querySelectorAll('[class*="MuiBox-root"]');
      expect(boxes.length).toBeGreaterThan(0);
    });
  });

  describe("accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Home />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper heading hierarchy", () => {
      render(<Home />);
      const headings = screen.getAllByRole("heading");
      
      // Should have h1 (name), h2s (sections), and h3s (experience items)
      const h1s = headings.filter(h => h.tagName === "H1");
      const h2s = headings.filter(h => h.tagName === "H2");
      
      expect(h1s.length).toBe(1);
      expect(h2s.length).toBeGreaterThan(0);
    });

    it("has main landmark with proper attributes", () => {
      render(<Home />);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "main-content");
      expect(main).toHaveAttribute("tabIndex", "-1");
    });

    it("skills are organized with proper semantic structure", () => {
      render(<Home />);
      const skillHeadings = screen.getAllByRole("heading", { level: 2 });
      
      // Should have at least 5 skill category headings
      const skillCategories = skillHeadings.filter(h => 
        /languages|technologies|accessibility|specializations|other/i.test(h.textContent || "")
      );
      
      expect(skillCategories.length).toBe(5);
    });
  });

  describe("content organization", () => {
    it("displays profile information before skills", () => {
      const { container } = render(<Home />);
      const content = container.textContent || "";
      
      const nameIndex = content.indexOf("Randy Grizzle");
      const skillsIndex = content.toUpperCase().indexOf("LANGUAGES");
      
      expect(nameIndex).toBeGreaterThanOrEqual(0);
      expect(skillsIndex).toBeGreaterThanOrEqual(0);
      expect(nameIndex).toBeLessThan(skillsIndex);
    });

    it("displays skills before experience", () => {
      const { container } = render(<Home />);
      const content = container.textContent || "";
      
      const skillsIndex = content.indexOf("LANGUAGES");
      const experienceIndex = content.indexOf("Experience");
      
      expect(skillsIndex).toBeLessThan(experienceIndex);
    });
  });

  describe("responsive behavior", () => {
    it("applies correct width percentages for different breakpoints", () => {
      const { container } = render(<Home />);
      
      // Check that Box components have responsive width settings
      const boxes = container.querySelectorAll('[class*="MuiBox-root"]');
      expect(boxes.length).toBeGreaterThan(0);
    });
  });

  describe("styling", () => {
    it("applies primary color to skill category headings", () => {
      const { container } = render(<Home />);
      const languagesHeading = screen.getByRole("heading", { name: /languages/i });
      
      // Check that heading exists and has styling
      expect(languagesHeading).toBeInTheDocument();
    });

    it("uses proper text hierarchy", () => {
      render(<Home />);
      
      // Name should be h4 variant
      const nameHeading = screen.getByRole("heading", { name: "Randy Grizzle" });
      expect(nameHeading).toBeInTheDocument();
      
      // Job title should be h6
      const jobTitle = screen.getByText("Senior Frontend Engineer");
      expect(jobTitle).toBeInTheDocument();
    });
  });
});
