import { render, screen } from "@testing-library/react";
import PageLayout from "./PageLayout";
import "@testing-library/jest-dom";

describe("PageLayout", () => {
  it("renders children correctly", () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with default props", () => {
    const { container } = render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <PageLayout title="Test Page Title">
        <div>Content</div>
      </PageLayout>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Test Page Title");
  });

  it("renders subtitle when provided with title", () => {
    render(
      <PageLayout title="Test Title" subtitle="Test subtitle text">
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle text")).toBeInTheDocument();
  });

  it("does not render title heading when title prop is not provided", () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    const headings = screen.queryAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(0);
  });

  it("uses custom component prop", () => {
    const { container } = render(
      <PageLayout component="article">
        <div>Content</div>
      </PageLayout>
    );

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("applies custom maxWidth", () => {
    const { container } = render(
      <PageLayout maxWidth={960}>
        <div>Content</div>
      </PageLayout>
    );

    const section = container.querySelector("section");
    expect(section).toHaveStyle({ maxWidth: "960px" });
  });

  it("has proper semantic structure", () => {
    const { container } = render(
      <PageLayout title="Test">
        <p>Paragraph content</p>
      </PageLayout>
    );

    // Should have main > section > h1 + content
    const main = container.querySelector("main");
    const section = main?.querySelector("section");
    const heading = section?.querySelector("h1");

    expect(main).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  it("renders without crashing when no props are provided", () => {
    expect(() => {
      render(
        <PageLayout>
          <div />
        </PageLayout>
      );
    }).not.toThrow();
  });

  describe("accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(
        <PageLayout title="Main Title">
          <h2>Subsection</h2>
        </PageLayout>
      );

      const h1 = screen.getByRole("heading", { level: 1 });
      const h2 = screen.getByRole("heading", { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });

    it("uses semantic HTML main element by default", () => {
      const { container } = render(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );

      expect(container.querySelector("main")).toBeInTheDocument();
    });

    it("section has proper role when rendered", () => {
      const { container } = render(
        <PageLayout title="Test">
          <div>Content</div>
        </PageLayout>
      );

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });
  });
});
