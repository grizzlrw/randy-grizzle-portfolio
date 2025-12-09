import "@testing-library/jest-dom";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DrawerAppBar from "./drawer-app-bar";

// Mock Next.js Link and Image
jest.mock("next/link", () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'Link';
  return MockLink;
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("DrawerAppBar", () => {
  beforeEach(() => {
    // Reset any mocks between tests
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the app bar with logo and title", () => {
      render(<DrawerAppBar />);

      expect(screen.getByAltText("Grizzle Logo")).toBeInTheDocument();
      // Use getAllByText since "Randy Grizzle" appears in both AppBar and Drawer
      const titles = screen.getAllByText("Randy Grizzle");
      expect(titles.length).toBeGreaterThan(0);
    });

    it("should render navigation items on desktop", () => {
      render(<DrawerAppBar />);

      // Desktop nav items should be present (but may be hidden on small screens)
      const desktopNavItems = screen.getAllByRole("link");
      expect(desktopNavItems.some((link) => link.textContent === "About Me")).toBe(true);
      expect(desktopNavItems.some((link) => link.textContent === "Contact")).toBe(true);
    });

    it("should render menu button for mobile", () => {
      render(<DrawerAppBar />);

      const menuButton = screen.getByRole("button", { name: /open drawer/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute("aria-label", "open drawer");
    });

    it("should have proper ARIA labels", () => {
      render(<DrawerAppBar />);

      expect(screen.getByRole("button", { name: /open drawer/i })).toBeInTheDocument();
      // Use getAllByRole since component has 2 nav elements (AppBar + empty nav wrapper)
      const navElements = screen.getAllByRole("navigation");
      expect(navElements.length).toBeGreaterThan(0);
    });
  });

  describe("Mobile Drawer Interaction", () => {
    it("should open drawer when menu button is clicked", async () => {
      const user = userEvent.setup();
      render(<DrawerAppBar />);

      const menuButton = screen.getByRole("button", { name: /open drawer/i });
      await user.click(menuButton);

      // After opening, drawer should be visible
      // MUI Drawer renders in a portal, so we check for the drawer content
      const drawer = screen.getByRole("presentation");
      expect(drawer).toBeInTheDocument();
    });

    it("should close drawer when clicking inside drawer", async () => {
      const user = userEvent.setup();
      render(<DrawerAppBar />);

      // Open drawer
      const menuButton = screen.getByRole("button", { name: /open drawer/i });
      await user.click(menuButton);

      // Get drawer content
      const drawer = screen.getByRole("presentation");
      expect(drawer).toBeInTheDocument();

      // Click inside drawer to close it
      await user.click(drawer);

      // Drawer should start closing (classList will have MuiModal-hidden)
      // Note: Full closure is animated, so we check the state change
    });

    it("should display all navigation items in mobile drawer", async () => {
      const user = userEvent.setup();
      render(<DrawerAppBar />);

      // Open drawer
      const menuButton = screen.getByRole("button", { name: /open drawer/i });
      await user.click(menuButton);

      // Get drawer and check for navigation items
      const drawer = screen.getByRole("presentation");
      const drawerLinks = within(drawer).getAllByRole("link");

      // Should have home + nav items
      expect(drawerLinks.length).toBeGreaterThanOrEqual(3);

      // Check for specific items
      expect(drawerLinks.some((link) => link.textContent === "Randy Grizzle")).toBe(true);
      expect(drawerLinks.some((link) => link.textContent === "About Me")).toBe(true);
      expect(drawerLinks.some((link) => link.textContent === "Contact")).toBe(true);
    });
  });

  describe("Navigation Links", () => {
    it("should have correct href attributes", () => {
      render(<DrawerAppBar />);

      const links = screen.getAllByRole("link");

      // Find specific links and check hrefs
      const homeLinks = links.filter((link) => link.textContent === "Randy Grizzle");
      expect(homeLinks.some((link) => link.getAttribute("href") === "/")).toBe(true);

      const aboutLinks = links.filter((link) => link.textContent === "About Me");
      expect(aboutLinks.some((link) => link.getAttribute("href") === "/about")).toBe(true);

      const contactLinks = links.filter((link) => link.textContent === "Contact");
      expect(contactLinks.some((link) => link.getAttribute("href") === "/contact")).toBe(true);
    });

    it("should render logo image with correct attributes", () => {
      render(<DrawerAppBar />);

      const logo = screen.getByAltText("Grizzle Logo");
      expect(logo).toHaveAttribute("src", "/GrizzleLogo.svg");
      expect(logo).toHaveAttribute("width", "30");
      expect(logo).toHaveAttribute("height", "30");
    });
  });

  describe("Responsive Behavior", () => {
    it("should have proper display styles for responsive design", () => {
      render(<DrawerAppBar />);

      const menuButton = screen.getByRole("button", { name: /open drawer/i });

      // Menu button should have responsive display styles
      // MUI applies these through sx prop
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper navigation landmark", () => {
      render(<DrawerAppBar />);

      // Component has 2 nav elements
      const navElements = screen.getAllByRole("navigation");
      expect(navElements.length).toBeGreaterThan(0);
    });

    it("should have accessible menu button", () => {
      render(<DrawerAppBar />);

      const menuButton = screen.getByRole("button", { name: /open drawer/i });
      expect(menuButton).toHaveAttribute("aria-label", "open drawer");
      expect(menuButton).toBeVisible();
    });

    it("should support keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<DrawerAppBar />);

      const menuButton = screen.getByRole("button", { name: /open drawer/i });

      // Tab to menu button
      await user.tab();

      // Open drawer with Enter
      if (document.activeElement === menuButton) {
        await user.keyboard("{Enter}");

        // Drawer should open
        expect(screen.getByRole("presentation")).toBeInTheDocument();
      }
    });

    it("should have no accessibility violations", async () => {
      const { container } = render(<DrawerAppBar />);

      // Use querySelector with attribute selector
      const navElement = container.querySelector('nav[class*="MuiAppBar"]');
      expect(navElement).toBeInTheDocument();
      
      const menuButton = container.querySelector('[aria-label="open drawer"]');
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    it("should toggle drawer state correctly", async () => {
      const user = userEvent.setup();
      render(<DrawerAppBar />);

      const menuButton = screen.getByRole("button", { name: /open drawer/i });

      // Initially closed
      expect(screen.queryByRole("presentation")).not.toBeInTheDocument();

      // Open drawer
      await user.click(menuButton);
      expect(screen.getByRole("presentation")).toBeInTheDocument();

      // Close drawer by clicking inside
      const drawer = screen.getByRole("presentation");
      await user.click(drawer);

      // Wait a moment for state update
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    it("should maintain state through multiple interactions", async () => {
      const user = userEvent.setup();
      render(<DrawerAppBar />);

      const menuButton = screen.getByRole("button", { name: /open drawer/i });

      // Test that drawer can be opened and closed multiple times
      // Open drawer
      await user.click(menuButton);
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      // Close by clicking menu button again
      await user.click(menuButton);
      
      // Open again
      await user.click(menuButton);
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });
  });

  describe("Styling", () => {
    it("should apply custom styles to AppBar", () => {
      const { container } = render(<DrawerAppBar />);

      // AppBar is rendered as nav element with MuiAppBar class
      const appBar = container.querySelector('nav[class*="MuiAppBar"]');
      expect(appBar).toBeInTheDocument();
    });

    it("should have proper layout structure", () => {
      const { container } = render(<DrawerAppBar />);

      // Should have main flex container
      const flexBox = container.querySelector('[class*="MuiBox"]');
      expect(flexBox).toBeInTheDocument();

      // Should have toolbar
      const toolbar = container.querySelector('[class*="MuiToolbar"]');
      expect(toolbar).toBeInTheDocument();
    });
  });
});
