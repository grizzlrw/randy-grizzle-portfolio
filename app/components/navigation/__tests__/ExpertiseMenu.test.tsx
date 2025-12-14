import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import ExpertiseMenu from "../ExpertiseMenu";

expect.extend(toHaveNoViolations);

// Mock Next.js Link
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'Link';
  return MockLink;
});

describe("ExpertiseMenu", () => {
  const mockSkills = [
    {
      id: "1",
      title: "Dynamic Forms",
      description: "Flexible form generation from database schemas",
      route: "/forms",
    },
    {
      id: "2",
      title: "Accessibility",
      description: "WCAG 2.1 AA compliant interfaces",
      route: "/accessibility",
    },
    {
      id: "3",
      title: "Data Visualization",
      description: "Interactive charts and dashboards",
      route: "/data-visualization",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render Expertise button", () => {
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Expertise");
    });

    it("should render dropdown arrow icon", () => {
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      const icon = button.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should not show menu initially", () => {
      render(<ExpertiseMenu skills={mockSkills} />);

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("Menu Interaction", () => {
    it("should open menu when button is clicked", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("should display all skills in menu", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Dynamic Forms")).toBeInTheDocument();
        expect(screen.getByText("Accessibility")).toBeInTheDocument();
        expect(screen.getByText("Data Visualization")).toBeInTheDocument();
      });
    });

    it("should display skill descriptions", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Flexible form generation from database schemas")).toBeInTheDocument();
        expect(screen.getByText("WCAG 2.1 AA compliant interfaces")).toBeInTheDocument();
      });
    });

    it("should render skills as clickable links", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      const skillLink = screen.getByRole("link", { name: /dynamic forms/i });
      expect(skillLink).toBeInTheDocument();
      expect(skillLink).toHaveAttribute("href", "/forms");
    });

    it("should have correct href for skill links", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        const formsLink = screen.getByRole("link", { name: /dynamic forms/i });
        const a11yLink = screen.getByRole("link", { name: /accessibility/i });
        const dataVizLink = screen.getByRole("link", { name: /data visualization/i });
        
        expect(formsLink).toHaveAttribute("href", "/forms");
        expect(a11yLink).toHaveAttribute("href", "/accessibility");
        expect(dataVizLink).toHaveAttribute("href", "/data-visualization");
      });
    });
  });

  describe("Empty State", () => {
    it("should show empty message when no skills provided", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={[]} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("No expertise areas available")).toBeInTheDocument();
      });
    });

    it("should disable menu item in empty state", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={[]} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        const emptyItem = screen.getByText("No expertise areas available").closest('[role="menuitem"]');
        expect(emptyItem).toHaveAttribute("aria-disabled", "true");
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("should open menu with Enter key", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      button.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("should open menu with Space key", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      button.focus();
      await user.keyboard(" ");

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });
    });

    it("should display skills as links in the menu", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
      });

      // Skills should be rendered as links
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<ExpertiseMenu skills={mockSkills} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations with open menu", async () => {
      const user = userEvent.setup();
      const { container } = render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(async () => {
        expect(screen.getByRole("menu")).toBeInTheDocument();
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    it("should have correct ARIA attributes", () => {
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      expect(button).toHaveAttribute("aria-haspopup", "true");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should update aria-expanded when menu opens", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      expect(button).toHaveAttribute("aria-expanded", "false");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should have labelledby on menu", async () => {
      const user = userEvent.setup();
      render(<ExpertiseMenu skills={mockSkills} />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      await user.click(button);

      await waitFor(() => {
        const menu = screen.getByRole("menu");
        expect(menu).toHaveAttribute("aria-labelledby", "expertise-button");
      });
    });
  });

  describe("Custom Props", () => {
    it("should accept custom button color", () => {
      render(<ExpertiseMenu skills={mockSkills} buttonColor="#ff0000" />);

      const button = screen.getByRole("button", { name: /expertise menu/i });
      expect(button).toBeInTheDocument();
    });

    it("should accept custom aria label", () => {
      render(<ExpertiseMenu skills={mockSkills} ariaLabel="Skills navigation" />);

      const button = screen.getByRole("button", { name: /skills navigation/i });
      expect(button).toBeInTheDocument();
    });
  });


});
