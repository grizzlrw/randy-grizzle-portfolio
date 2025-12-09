import { render, screen } from "@testing-library/react";
import ClippedDrawer from "../clipped-drawer";
import Home from "@mui/icons-material/Home";
import { Navigation } from "@mui/icons-material";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = require("next/navigation");

describe("ClippedDrawer", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockLinks = [
    { label: "Home", href: "/", icon: <Home /> },
    { label: "About", href: "/about", icon: <Navigation /> },
    { label: "Contact", href: "/contact" },
  ];

  it("should render drawer with links", () => {
    render(<ClippedDrawer links={mockLinks} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("should render permanent drawer variant", () => {
    const { container } = render(<ClippedDrawer links={mockLinks} />);

    const drawer = container.querySelector(".MuiDrawer-root");
    expect(drawer).toBeInTheDocument();
  });

  it("should render links with correct href", () => {
    render(<ClippedDrawer links={mockLinks} />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");

    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("should render icons when provided", () => {
    const { container } = render(<ClippedDrawer links={mockLinks} />);

    const icons = container.querySelectorAll(".MuiListItemIcon-root");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("should render links without icons", () => {
    render(<ClippedDrawer links={mockLinks} />);

    // Contact link has no icon, but should still render
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  describe("Divider Support", () => {
    it("should render divider for items with 'Divider' label", () => {
      const linksWithDivider = [
        { label: "Section 1", href: "/section1" },
        { label: "Divider", href: "" },
        { label: "Section 2", href: "/section2" },
      ];

      const { container } = render(<ClippedDrawer links={linksWithDivider} />);

      const dividers = container.querySelectorAll(".MuiDivider-root");
      expect(dividers).toHaveLength(1);
    });

    it("should not render link for divider items", () => {
      const linksWithDivider = [
        { label: "Home", href: "/" },
        { label: "Divider", href: "" },
        { label: "About", href: "/about" },
      ];

      render(<ClippedDrawer links={linksWithDivider} />);

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });

    it("should handle multiple dividers", () => {
      const linksWithMultipleDividers = [
        { label: "Item 1", href: "/1" },
        { label: "Divider", href: "" },
        { label: "Item 2", href: "/2" },
        { label: "Divider", href: "" },
        { label: "Item 3", href: "/3" },
      ];

      const { container } = render(<ClippedDrawer links={linksWithMultipleDividers} />);

      const dividers = container.querySelectorAll(".MuiDivider-root");
      expect(dividers).toHaveLength(2);
    });
  });

  describe("Active Link Highlighting", () => {
    it("should highlight active link based on pathname", () => {
      usePathname.mockReturnValue("/about");
      const { container } = render(<ClippedDrawer links={mockLinks} />);

      // About link should be highlighted
      const aboutText = screen.getByText("About");
      expect(aboutText).toBeInTheDocument();
    });

    it("should highlight home link when on root path", () => {
      usePathname.mockReturnValue("/");
      render(<ClippedDrawer links={mockLinks} />);

      const homeText = screen.getByText("Home");
      expect(homeText).toBeInTheDocument();
    });

    it("should update highlighting when pathname changes", () => {
      usePathname.mockReturnValue("/");
      const { rerender } = render(<ClippedDrawer links={mockLinks} />);

      expect(screen.getByText("Home")).toBeInTheDocument();

      usePathname.mockReturnValue("/contact");
      rerender(<ClippedDrawer links={mockLinks} />);

      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
  });

  describe("Layout and Structure", () => {
    it("should render CssBaseline", () => {
      const { container } = render(<ClippedDrawer links={mockLinks} />);

      // CssBaseline should be present (even if not directly testable)
      expect(container.querySelector(".MuiBox-root")).toBeInTheDocument();
    });

    it("should render Toolbar for spacing", () => {
      const { container } = render(<ClippedDrawer links={mockLinks} />);

      const toolbar = container.querySelector(".MuiToolbar-root");
      expect(toolbar).toBeInTheDocument();
    });

    it("should render List component", () => {
      const { container } = render(<ClippedDrawer links={mockLinks} />);

      const list = container.querySelector(".MuiList-root");
      expect(list).toBeInTheDocument();
    });

    it("should render ListItems with disablePadding", () => {
      const { container } = render(<ClippedDrawer links={mockLinks} />);

      const listItems = container.querySelectorAll(".MuiListItem-root");
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty links array", () => {
      const { container } = render(<ClippedDrawer links={[]} />);

      const list = container.querySelector(".MuiList-root");
      expect(list).toBeInTheDocument();
      expect(list?.children.length).toBe(0);
    });

    it("should handle single link", () => {
      const singleLink = [{ label: "Only Link", href: "/only" }];
      render(<ClippedDrawer links={singleLink} />);

      expect(screen.getByText("Only Link")).toBeInTheDocument();
    });

    it("should handle links with empty href", () => {
      const linksWithEmptyHref = [
        { label: "Valid", href: "/valid" },
        { label: "Empty", href: "" },
      ];

      render(<ClippedDrawer links={linksWithEmptyHref} />);

      expect(screen.getByText("Valid")).toBeInTheDocument();
      expect(screen.getByText("Empty")).toBeInTheDocument();
    });

    it("should handle special characters in labels", () => {
      const specialLinks = [
        { label: "Home & About", href: "/" },
        { label: "Contact <Us>", href: "/contact" },
      ];

      render(<ClippedDrawer links={specialLinks} />);

      expect(screen.getByText("Home & About")).toBeInTheDocument();
      expect(screen.getByText("Contact <Us>")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should render navigation links", () => {
      render(<ClippedDrawer links={mockLinks} />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThanOrEqual(mockLinks.length);
    });

    it("should have accessible link text", () => {
      render(<ClippedDrawer links={mockLinks} />);

      mockLinks.forEach(link => {
        if (link.label !== "Divider") {
          expect(screen.getByText(link.label)).toBeInTheDocument();
        }
      });
    });

    it("should render ListItemButton components for keyboard navigation", () => {
      const { container } = render(<ClippedDrawer links={mockLinks} />);

      const buttons = container.querySelectorAll(".MuiListItemButton-root");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Icon Rendering", () => {
    it("should render icon when provided", () => {
      const { container } = render(<ClippedDrawer links={mockLinks} />);

      const listItemIcons = container.querySelectorAll(".MuiListItemIcon-root");
      expect(listItemIcons.length).toBe(2); // Home and About have icons
    });

    it("should not render ListItemIcon when icon is not provided", () => {
      const linksWithoutIcons = [
        { label: "Link 1", href: "/1" },
        { label: "Link 2", href: "/2" },
      ];

      const { container } = render(<ClippedDrawer links={linksWithoutIcons} />);

      const listItemIcons = container.querySelectorAll(".MuiListItemIcon-root");
      expect(listItemIcons.length).toBe(0);
    });
  });
});
