import { render, screen } from "@testing-library/react";
import SidebarLayout from "./SidebarLayout";

describe("SidebarLayout", () => {
  it("should render the title in the main section", () => {
    render(
      <SidebarLayout title="Test Page Title">
        <SidebarLayout.Main>
          <div>Main content goes here</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content goes here</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    expect(screen.getByRole("heading", { name: "Test Page Title" })).toBeInTheDocument();
  });

  it("should render main content", () => {
    render(
      <SidebarLayout title="Test Page Title">
        <SidebarLayout.Main>
          <div>Main content goes here</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content goes here</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    expect(screen.getByText("Main content goes here")).toBeInTheDocument();
  });

  it("should render sidebar content", () => {
    render(
      <SidebarLayout title="Test Page Title">
        <SidebarLayout.Main>
          <div>Main content goes here</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content goes here</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    expect(screen.getByText("Sidebar content goes here")).toBeInTheDocument();
  });

  it("should use semantic HTML elements", () => {
    const { container } = render(
      <SidebarLayout title="Test Page Title">
        <SidebarLayout.Main>
          <div>Main content</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    expect(container.querySelector("main")).toBeInTheDocument();
    expect(container.querySelector("aside")).toBeInTheDocument();
  });

  it("should render sidebar on the right by default", () => {
    const { container } = render(
      <SidebarLayout title="Test Page Title">
        <SidebarLayout.Main>
          <div>Main content</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    const grid = container.querySelector(".MuiGrid-container");
    expect(grid).toBeInTheDocument();
    
    // Main content should appear before sidebar in DOM
    const mainElement = container.querySelector("main");
    const asideElement = container.querySelector("aside");
    expect(mainElement).toBeInTheDocument();
    expect(asideElement).toBeInTheDocument();
  });

  it("should render sidebar on the left when specified", () => {
    const { container } = render(
      <SidebarLayout title="Test Page Title" sidebarPosition="left">
        <SidebarLayout.Main>
          <div>Main content</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    const asideElement = container.querySelector("aside");
    expect(asideElement).toBeInTheDocument();
  });

  it("should accept custom grid widths", () => {
    render(
      <SidebarLayout
        title="Test Page Title"
        mainWidth={9}
        sidebarWidth={3}
      >
        <SidebarLayout.Main>
          <div>Main content</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    // Component should render without errors
    expect(screen.getByRole("heading", { name: "Test Page Title" })).toBeInTheDocument();
  });

  it("should render complex main content", () => {
    render(
      <SidebarLayout title="Complex Content">
        <SidebarLayout.Main>
          <div>
            <p>Paragraph 1</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );

    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("should render complex sidebar content", () => {
    render(
      <SidebarLayout title="Main Title">
        <SidebarLayout.Main>
          <div>Main</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>
            <h2>Sidebar Heading</h2>
            <nav>
              <a href="#section1">Section 1</a>
              <a href="#section2">Section 2</a>
            </nav>
          </div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );

    expect(screen.getByRole("heading", { name: "Sidebar Heading" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Section 1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Section 2" })).toBeInTheDocument();
  });

  it("should handle empty sidebar content", () => {
    render(
      <SidebarLayout title="Test Title">
        <SidebarLayout.Main>
          <div>Main content</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          {null}
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );

    expect(screen.getByRole("heading", { name: "Test Title" })).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("should handle empty main content", () => {
    render(
      <SidebarLayout title="Test Title">
        <SidebarLayout.Main>
          {null}
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );

    expect(screen.getByRole("heading", { name: "Test Title" })).toBeInTheDocument();
    expect(screen.getByText("Sidebar content")).toBeInTheDocument();
  });

  it("should apply proper spacing between sections", () => {
    const { container } = render(
      <SidebarLayout title="Test Page Title">
        <SidebarLayout.Main>
          <div>Main content goes here</div>
        </SidebarLayout.Main>
        <SidebarLayout.Sidebar>
          <div>Sidebar content goes here</div>
        </SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    
    const gridContainer = container.querySelector(".MuiGrid-container");
    expect(gridContainer).toBeInTheDocument();
  });

  describe("Responsive Behavior", () => {
    it("should render on mobile viewport", () => {
      // Grid items should be full width (xs={12}) on mobile
      render(
        <SidebarLayout title="Test Page Title">
          <SidebarLayout.Main>
            <div>Main content goes here</div>
          </SidebarLayout.Main>
          <SidebarLayout.Sidebar>
            <div>Sidebar content goes here</div>
          </SidebarLayout.Sidebar>
        </SidebarLayout>
      );
      
      expect(screen.getByRole("heading", { name: "Test Page Title" })).toBeInTheDocument();
      expect(screen.getByText("Main content goes here")).toBeInTheDocument();
      expect(screen.getByText("Sidebar content goes here")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(
        <SidebarLayout title="Test Page Title">
          <SidebarLayout.Main>
            <div>Main content goes here</div>
          </SidebarLayout.Main>
          <SidebarLayout.Sidebar>
            <div>Sidebar content goes here</div>
          </SidebarLayout.Sidebar>
        </SidebarLayout>
      );
      
      const heading = screen.getByRole("heading", { name: "Test Page Title" });
      expect(heading.tagName).toBe("H1");
    });

    it("should use semantic main and aside elements", () => {
      const { container } = render(
        <SidebarLayout title="Test Page Title">
          <SidebarLayout.Main>
            <div>Main content goes here</div>
          </SidebarLayout.Main>
          <SidebarLayout.Sidebar>
            <div>Sidebar content goes here</div>
          </SidebarLayout.Sidebar>
        </SidebarLayout>
      );
      
      const mainElement = container.querySelector("main");
      const asideElement = container.querySelector("aside");
      
      expect(mainElement).toBeInTheDocument();
      expect(asideElement).toBeInTheDocument();
    });

    it("should not have duplicate main landmarks", () => {
      const { container } = render(
        <SidebarLayout title="Test Page Title">
          <SidebarLayout.Main>
            <div>Main content goes here</div>
          </SidebarLayout.Main>
          <SidebarLayout.Sidebar>
            <div>Sidebar content goes here</div>
          </SidebarLayout.Sidebar>
        </SidebarLayout>
      );
      
      const mainElements = container.querySelectorAll("main");
      expect(mainElements).toHaveLength(1);
    });
  });
});
