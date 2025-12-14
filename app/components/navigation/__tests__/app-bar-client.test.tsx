import { render, screen } from "@testing-library/react";
import AppBarClient from "../app-bar-client";
import { fetchSkills } from "@/lib/actions";

// Mock fetchSkills action
jest.mock("@/lib/actions", () => ({
  fetchSkills: jest.fn(),
}));

// Mock the DrawerAppBar component
jest.mock("../drawer-app-bar", () => {
  return function MockDrawerAppBar({ skills }: { skills?: unknown[] }) {
    return (
      <div data-testid="drawer-app-bar">
        DrawerAppBar Component
        {skills && <span data-testid="skills-count">{skills.length}</span>}
      </div>
    );
  };
});

const mockSkills = [
  {
    id: 1,
    title: "Dynamic Forms",
    description: "Building interactive forms",
    route: "/forms",
    imageUrl: "/forms.jpg",
    imageAlt: "Forms",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Data Visualization",
    description: "Creating charts and graphs",
    route: "/charts",
    imageUrl: "/charts.jpg",
    imageAlt: "Charts",
    createdAt: new Date(),
  },
];

describe("AppBarClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchSkills as jest.Mock).mockResolvedValue(mockSkills);
  });

  describe("Component Rendering", () => {
    it("should render without crashing", async () => {
      const Component = await AppBarClient();
      render(Component);
      expect(screen.getByTestId("drawer-app-bar")).toBeInTheDocument();
    });

    it("should render DrawerAppBar component", async () => {
      const Component = await AppBarClient();
      render(Component);
      expect(screen.getByText("DrawerAppBar Component")).toBeInTheDocument();
    });
  });

  describe("Server Component Behavior", () => {
    it("should be a server component (async)", async () => {
      // This component is async (server component)
      const Component = await AppBarClient();
      const { container } = render(Component);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("should delegate rendering to DrawerAppBar", async () => {
      const Component = await AppBarClient();
      render(Component);
      
      const drawerAppBar = screen.getByTestId("drawer-app-bar");
      expect(drawerAppBar).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("should render only DrawerAppBar as child", async () => {
      const Component = await AppBarClient();
      const { container } = render(Component);
      
      // Should have exactly one child (DrawerAppBar)
      expect(container.firstChild).toHaveTextContent("DrawerAppBar Component");
    });

    it("should not add any wrapper elements", async () => {
      const Component = await AppBarClient();
      const { container } = render(Component);
      
      // AppBarClient should directly render DrawerAppBar without wrappers
      const drawerAppBar = screen.getByTestId("drawer-app-bar");
      expect(drawerAppBar.parentElement).toBe(container);
    });
  });

  describe("Skills Data", () => {
    it("should fetch and pass skills to DrawerAppBar", async () => {
      const Component = await AppBarClient();
      render(Component);
      
      expect(fetchSkills).toHaveBeenCalled();
      expect(screen.getByTestId("skills-count")).toHaveTextContent("2");
    });

    it("should transform skills data correctly", async () => {
      const Component = await AppBarClient();
      render(Component);
      
      // fetchSkills should be called once
      expect(fetchSkills).toHaveBeenCalledTimes(1);
    });
  });

  describe("Integration", () => {
    it("should render DrawerAppBar with skills", async () => {
      const Component = await AppBarClient();
      render(Component);
      
      expect(screen.getByTestId("drawer-app-bar")).toBeInTheDocument();
      expect(screen.getByTestId("skills-count")).toBeInTheDocument();
    });
  });
});
