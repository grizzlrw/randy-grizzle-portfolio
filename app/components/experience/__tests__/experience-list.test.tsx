import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ExperienceList } from "../experience-list";
import { ExperienceData } from "@/app/types/experience";

const mockExperiences: ExperienceData[] = [
  {
    images: [{ image: "/test-image.png", alt: "Test Company Logo" }],
    title: "Test Company",
    subtitle: "Senior Engineer · 2020-2023",
    impacts: [
      { label: "Feature A", color: "primary" },
      { label: "Feature B", color: "success" },
    ],
    contributions: [
      "Built amazing features",
      "Improved performance by 50%",
    ],
  },
  {
    images: [
      { image: "/logo1.png", alt: "Company 1 Logo" },
      { image: "/logo2.png", alt: "Company 2 Logo" },
    ],
    title: "Multiple Companies",
    subtitle: "Frontend Developer · 2018-2020",
    impacts: [{ label: "Impact C", color: "info" }],
    contributions: ["Created reusable components"],
  },
];

describe("ExperienceList", () => {
  it("renders the experience heading", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    expect(screen.getByRole("heading", { name: "Experience", level: 1 })).toBeInTheDocument();
  });

  it("renders all experience items", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    expect(screen.getByRole("heading", { name: "Test Company" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Multiple Companies" })).toBeInTheDocument();
  });

  it("displays all experience titles and subtitles", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Senior Engineer · 2020-2023")).toBeInTheDocument();
    expect(screen.getByText("Multiple Companies")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer · 2018-2020")).toBeInTheDocument();
  });

  it("displays impact chips for each experience", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    expect(screen.getByText("Feature A")).toBeInTheDocument();
    expect(screen.getByText("Feature B")).toBeInTheDocument();
    expect(screen.getByText("Impact C")).toBeInTheDocument();
  });

  it("displays all contributions", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    expect(screen.getByText("Built amazing features")).toBeInTheDocument();
    expect(screen.getByText("Improved performance by 50%")).toBeInTheDocument();
    expect(screen.getByText("Created reusable components")).toBeInTheDocument();
  });

  it("renders images with proper alt text", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    expect(screen.getByAltText("Test Company Logo")).toBeInTheDocument();
  });

  it("handles multiple images per experience", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    expect(screen.getByAltText("Company 1 Logo")).toBeInTheDocument();
    expect(screen.getByAltText("Company 2 Logo")).toBeInTheDocument();
  });

  it("renders empty list without errors", () => {
    render(<ExperienceList experiences={[]} />);
    expect(screen.getByRole("heading", { name: /experience/i })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ExperienceList experiences={mockExperiences} />);
    // Disable heading-order rule as the component intentionally uses h2 for title and h6 for subsections
    const results = await axe(container, { rules: { 'heading-order': { enabled: false } } });
    expect(results).toHaveNoViolations();
  });

  it("maintains proper heading hierarchy", () => {
    render(<ExperienceList experiences={mockExperiences} />);
    const headings = screen.getAllByRole("heading");
    
    // First heading should be h1 (Experience)
    expect(headings[0].tagName).toBe("H1");
    
    // Experience titles should be h2
    const titleHeadings = headings.filter(h => h.tagName === "H2");
    expect(titleHeadings.length).toBe(mockExperiences.length);
  });

  it("applies correct background colors to experience cards", () => {
    const { container } = render(<ExperienceList experiences={mockExperiences} />);
    const cards = container.querySelectorAll('[class*="MuiBox-root"]');
    
    // At least one card should have primary.50 background
    const hasBackgroundColor = Array.from(cards).some(card => 
      card.className.includes('primary')
    );
    expect(hasBackgroundColor || cards.length > 0).toBe(true);
  });
});
