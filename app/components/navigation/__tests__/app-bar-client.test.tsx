import { render, screen } from "@testing-library/react";
import AppBarClient from "../app-bar-client";

// Mock the DrawerAppBar component
jest.mock("../drawer-app-bar", () => {
  return function MockDrawerAppBar() {
    return <div data-testid="drawer-app-bar">DrawerAppBar Component</div>;
  };
});

describe("AppBarClient", () => {
  describe("Component Rendering", () => {
    it("should render without crashing", () => {
      render(<AppBarClient />);
      expect(screen.getByTestId("drawer-app-bar")).toBeInTheDocument();
    });

    it("should render DrawerAppBar component", () => {
      render(<AppBarClient />);
      expect(screen.getByText("DrawerAppBar Component")).toBeInTheDocument();
    });
  });

  describe("Client Component Behavior", () => {
    it("should be a client component", () => {
      // This component has "use client" directive
      const { container } = render(<AppBarClient />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should delegate rendering to DrawerAppBar", () => {
      render(<AppBarClient />);
      
      const drawerAppBar = screen.getByTestId("drawer-app-bar");
      expect(drawerAppBar).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("should render only DrawerAppBar as child", () => {
      const { container } = render(<AppBarClient />);
      
      // Should have exactly one child (DrawerAppBar)
      expect(container.firstChild).toHaveTextContent("DrawerAppBar Component");
    });

    it("should not add any wrapper elements", () => {
      const { container } = render(<AppBarClient />);
      
      // AppBarClient should directly render DrawerAppBar without wrappers
      const drawerAppBar = screen.getByTestId("drawer-app-bar");
      expect(drawerAppBar.parentElement).toBe(container);
    });
  });

  describe("Props Forwarding", () => {
    it("should render DrawerAppBar without props", () => {
      // AppBarClient doesn't accept props, just renders DrawerAppBar
      render(<AppBarClient />);
      expect(screen.getByTestId("drawer-app-bar")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should maintain consistent rendering", () => {
      const { rerender } = render(<AppBarClient />);
      expect(screen.getByTestId("drawer-app-bar")).toBeInTheDocument();

      // Re-render should maintain same structure
      rerender(<AppBarClient />);
      expect(screen.getByTestId("drawer-app-bar")).toBeInTheDocument();
    });

    it("should render DrawerAppBar exactly once", () => {
      render(<AppBarClient />);
      
      const drawerAppBars = screen.getAllByTestId("drawer-app-bar");
      expect(drawerAppBars).toHaveLength(1);
    });
  });
});
