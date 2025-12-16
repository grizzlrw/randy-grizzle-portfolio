import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ModularityPage from "./page";

expect.extend(toHaveNoViolations);

// Mock Next.js Link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'Link';
  return MockLink;
});

describe("Modularity Page - Accessibility & Content", () => {
  describe("WCAG 2.1 AA Compliance", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const results = await axe(container, {
        runOnly: {
          type: 'tag',
          values: [
            'wcag2a',
            'wcag2aa',
            'wcag21a',
            'wcag21aa',
            'best-practice',
            'cat.aria',
            'cat.keyboard',
            'cat.name-role-value',
            'cat.color',
            'cat.semantics',
            'cat.structure',
          ]
        }
      });
      
      expect(results).toHaveNoViolations();
    });

    it("should have proper color contrast", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const results = await axe(container, {
        runOnly: {
          type: 'tag',
          values: ['cat.color']
        }
      });
      
      expect(results).toHaveNoViolations();
    });

    it("should pass best practice checks", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const results = await axe(container, {
        runOnly: {
          type: 'tag',
          values: ['best-practice']
        }
      });
      
      expect(results).toHaveNoViolations();
    });
  });

  describe("Semantic HTML Structure", () => {
    it("should have a single h1 heading", () => {
      render(<ModularityPage />);
      const h1Elements = screen.getAllByRole("heading", { level: 1 });
      expect(h1Elements).toHaveLength(1);
      expect(h1Elements[0]).toHaveTextContent("Building Modular Component Systems");
    });

    it("should have proper h2 section headings", () => {
      render(<ModularityPage />);
      const h2Elements = screen.getAllByRole("heading", { level: 2 });
      
      expect(h2Elements.length).toBeGreaterThanOrEqual(5);
      expect(screen.getByRole("heading", { name: /single responsibility principle/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /composition over configuration/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /props as explicit dependencies/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /defaults and flexibility/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /practical impact/i })).toBeInTheDocument();
    });

    it("should use semantic section elements", () => {
      const { container } = render(<ModularityPage />);
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("Navigation Cards", () => {
    it("should render three navigation cards", () => {
      render(<ModularityPage />);
      const links = screen.getAllByRole("link").filter(link => 
        link.getAttribute("href")?.match(/^\/(about|contact|forms)$/)
      );
      expect(links.length).toBe(3);
    });

    it("should have navigation cards with proper h3 headings", () => {
      render(<ModularityPage />);
      const h3Elements = screen.getAllByRole("heading", { level: 3 });
      
      const cardHeadings = h3Elements.filter(h3 => 
        h3.textContent?.match(/About Me|Contact|Forms Dashboard/)
      );
      expect(cardHeadings.length).toBe(3);
    });

    it("should have navigation cards with accessible content", () => {
      render(<ModularityPage />);
      expect(screen.getByRole("heading", { name: /About Me/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /^Contact$/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Forms Dashboard/i })).toBeInTheDocument();
    });
  });

  describe("Code Examples", () => {
    it("should display composition examples", () => {
      const { container } = render(<ModularityPage />);
      const bodyTexts = container.querySelectorAll(".MuiTypography-body2");
      const texts = Array.from(bodyTexts).map(el => el.textContent);
      
      expect(texts.some(text => text?.includes("Home Page"))).toBe(true);
      expect(texts.some(text => text?.includes("Forms Dashboard"))).toBe(true);
      expect(texts.some(text => text?.includes("Contact Form"))).toBe(true);
    });

    it("should display component composition patterns", () => {
      render(<ModularityPage />);
      expect(screen.getByText(/PageLayout \+ Grid \+ SkillCard/i)).toBeInTheDocument();
      expect(screen.getByText(/PageLayout \+ Stack \+ NavigationCard/i)).toBeInTheDocument();
      expect(screen.getByText(/PageLayout \+ Stack \+ TextField \+ Button/i)).toBeInTheDocument();
    });

    it("should show code examples for props", () => {
      const { container } = render(<ModularityPage />);
      const codeBlocks = container.querySelectorAll("pre");
      expect(codeBlocks.length).toBeGreaterThanOrEqual(2);
      
      const hasNavigationCardExample = Array.from(codeBlocks).some(block => 
        block.textContent?.includes("NavigationCard")
      );
      expect(hasNavigationCardExample).toBe(true);
    });
  });

  describe("Content Structure", () => {
    it("should have introductory paragraph", () => {
      render(<ModularityPage />);
      expect(screen.getByText(/Modular design is about building systems/i)).toBeInTheDocument();
    });

    it("should explain single responsibility principle", () => {
      render(<ModularityPage />);
      expect(screen.getByText(/Each component should have one clear job/i)).toBeInTheDocument();
    });

    it("should explain composition", () => {
      render(<ModularityPage />);
      expect(screen.getByText(/Rather than building specialized components/i)).toBeInTheDocument();
    });

    it("should explain props as dependencies", () => {
      render(<ModularityPage />);
      expect(screen.getByText(/Components should receive everything they need through props/i)).toBeInTheDocument();
    });

    it("should explain defaults and flexibility", () => {
      render(<ModularityPage />);
      expect(screen.getByText(/Components should work with minimal configuration/i)).toBeInTheDocument();
    });

    it("should describe practical impact", () => {
      render(<ModularityPage />);
      expect(screen.getByText(/Faster iteration/i)).toBeInTheDocument();
      expect(screen.getByText(/Easier maintenance/i)).toBeInTheDocument();
      expect(screen.getByText(/Consistent user experience/i)).toBeInTheDocument();
      expect(screen.getByText(/Reduced cognitive load/i)).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("should have keyboard accessible navigation cards", () => {
      render(<ModularityPage />);
      const links = screen.getAllByRole("link").filter(link => 
        link.getAttribute("href")?.match(/^\/(about|contact|forms)$/)
      );
      
      links.forEach(link => {
        expect(link).toHaveAttribute("href");
      });
    });

    it("should maintain logical tab order", () => {
      render(<ModularityPage />);
      const interactiveElements = screen.getAllByRole("link");
      expect(interactiveElements.length).toBeGreaterThan(0);
    });
  });

  describe("Visual Presentation", () => {
    it("should use Paper components for code examples", () => {
      const { container } = render(<ModularityPage />);
      const papers = container.querySelectorAll(".MuiPaper-root");
      expect(papers.length).toBeGreaterThanOrEqual(5);
    });

    it("should use proper typography variants", () => {
      const { container } = render(<ModularityPage />);
      const bodyText = container.querySelectorAll("p");
      expect(bodyText.length).toBeGreaterThan(5);
    });
  });

  describe("Performance", () => {
    it("should render without errors", () => {
      const { container } = render(<ModularityPage />);
      expect(container).toBeInTheDocument();
    });

    it("should render all main sections", () => {
      const { container } = render(<ModularityPage />);
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(5);
    });
  });
});
