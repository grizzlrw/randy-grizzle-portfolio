import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";
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

describe("Modularity Page - Accessibility", () => {
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

    it("should have valid ARIA attributes", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const results = await axe(container, {
        runOnly: {
          type: 'tag',
          values: ['cat.aria']
        }
      });
      
      expect(results).toHaveNoViolations();
    });
  });

  describe("Semantic HTML Structure", () => {
    it("should have proper heading hierarchy", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const h1 = container.querySelector("h1");
      const h2s = container.querySelectorAll("h2");
      const h3s = container.querySelectorAll("h3");

      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent(/Modularity & Reusability/i);
      expect(h2s.length).toBeGreaterThan(0);
      expect(h3s.length).toBeGreaterThan(0);
    });

    it("should have semantic landmarks", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });

    it("should use section elements for major content areas", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe("Keyboard Navigation", () => {
    it("should have accessible navigation cards with proper keyboard support", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const links = container.querySelectorAll("a[href]");
      expect(links.length).toBeGreaterThan(0);
      
      // Navigation cards should be focusable
      const navigationLinks = Array.from(links).filter(link => 
        link.getAttribute("href")?.startsWith("/") ?? false
      );
      expect(navigationLinks.length).toBeGreaterThan(0);
      
      navigationLinks.forEach((link) => {
        expect(link).toHaveAttribute("href");
        expect(link).not.toHaveAttribute("tabindex", "-1");
      });
    });

    it("should allow keyboard interaction with form fields", async () => {
      const user = userEvent.setup();
      render(<ModularityPage />);
      
      const emailInput = screen.getByLabelText(/Email Address/i);
      expect(emailInput).toBeInTheDocument();
      
      // Focus the input directly to test it's focusable
      emailInput.focus();
      expect(document.activeElement).toBe(emailInput);
    });

    it("should have logical tab order", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])'
      );
      
      expect(focusableElements.length).toBeGreaterThan(0);
      
      focusableElements.forEach((element) => {
        const tabindex = element.getAttribute("tabindex");
        if (tabindex !== null) {
          expect(parseInt(tabindex)).toBeGreaterThanOrEqual(-1);
        }
      });
    });
  });

  describe("Form Field Accessibility", () => {
    it("should have properly labeled form fields", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const inputs = container.querySelectorAll("input");
      
      inputs.forEach((input) => {
        const id = input.getAttribute("id");
        if (id) {
          const label = container.querySelector(`label[for="${id}"]`);
          expect(label).toBeInTheDocument();
        }
      });
    });

    it("should have accessible helper text", async () => {
      render(<ModularityPage />);
      
      const emailInput = screen.getByLabelText(/Email Address/i);
      const helperId = emailInput.getAttribute("aria-describedby");
      
      if (helperId) {
        const helperText = document.getElementById(helperId);
        expect(helperText).toBeInTheDocument();
      }
    });

    it("should support multiline text input accessibility", async () => {
      render(<ModularityPage />);
      
      const messageInput = screen.getByLabelText(/Your Message/i);
      expect(messageInput).toBeInTheDocument();
      expect(messageInput.tagName).toBe("TEXTAREA");
    });
  });

  describe("Interactive Elements", () => {
    it("should have accessible navigation cards", async () => {
      render(<ModularityPage />);
      
      // Check for navigation card titles using role
      const headings = screen.getAllByRole("heading", { level: 3 });
      const headingTexts = headings.map(h => h.textContent);
      
      expect(headingTexts).toContain("About Me");
      expect(headingTexts).toContain("Contact Me");
      expect(headingTexts).toContain("Forms Dashboard");
    });

    it("should have descriptive link text", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const links = container.querySelectorAll("a");
      
      links.forEach((link) => {
        const ariaLabel = link.getAttribute("aria-label");
        const textContent = link.textContent?.trim();
        
        // Link should have either aria-label or meaningful text content
        expect(ariaLabel || textContent).toBeTruthy();
        
        // Avoid generic link text
        if (textContent) {
          expect(textContent.toLowerCase()).not.toBe("click here");
          expect(textContent.toLowerCase()).not.toBe("read more");
          expect(textContent.toLowerCase()).not.toBe("link");
        }
      });
    });
  });

  describe("Content Structure", () => {
    it("should render all major sections", async () => {
      render(<ModularityPage />);
      
      // Use getByRole to target section headings specifically
      expect(screen.getByRole("heading", { name: /Clickable Navigation Cards/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /^Form Fields$/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Building for Composition/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Props Over Configuration Files/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Sensible Defaults/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Built-in Accessibility Testing/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /Real Impact/i })).toBeInTheDocument();
    });

    it("should have accessible code examples", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const codeBlocks = container.querySelectorAll("pre");
      expect(codeBlocks.length).toBeGreaterThan(0);
      
      // Code blocks should be readable
      codeBlocks.forEach((block) => {
        expect(block.textContent).toBeTruthy();
      });
    });
  });

  describe("Best Practices", () => {
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

    it("should have proper name-role-value patterns", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const results = await axe(container, {
        runOnly: {
          type: 'tag',
          values: ['cat.name-role-value']
        }
      });
      
      expect(results).toHaveNoViolations();
    });

    it("should not have any critical or serious violations", async () => {
      const { container } = render(<ModularityPage />);
      await waitFor(() => expect(container).toBeInTheDocument());
      
      const results = await axe(container);
      
      const criticalViolations = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );
      
      expect(criticalViolations).toHaveLength(0);
    });
  });

  describe("Dynamic Content", () => {
    it("should handle interactive form field state changes accessibly", async () => {
      const user = userEvent.setup();
      render(<ModularityPage />);
      
      const firstNameInput = screen.getByLabelText(/First Name/i);
      
      await user.type(firstNameInput, "Test");
      expect(firstNameInput).toHaveValue("Test");
    });

    it("should maintain accessibility during user interactions", async () => {
      const user = userEvent.setup();
      const { container } = render(<ModularityPage />);
      
      const firstNameInput = screen.getByLabelText(/First Name/i);
      await user.type(firstNameInput, "Accessibility");
      
      await waitFor(async () => {
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
