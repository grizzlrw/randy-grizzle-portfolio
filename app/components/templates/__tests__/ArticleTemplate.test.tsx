import { render, screen } from "@testing-library/react";
import ArticleTemplate from "../ArticleTemplate";

describe("ArticleTemplate", () => {
  it("should render the title", () => {
    render(
      <ArticleTemplate title="Test Article">
        <p>Content</p>
      </ArticleTemplate>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Test Article");
  });

  it("should render children content", () => {
    render(
      <ArticleTemplate title="Test">
        <p>Test content paragraph</p>
      </ArticleTemplate>
    );

    expect(screen.getByText("Test content paragraph")).toBeInTheDocument();
  });

  it("should render article semantic element", () => {
    const { container } = render(
      <ArticleTemplate title="Test">
        <p>Content</p>
      </ArticleTemplate>
    );

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("should render header semantic element", () => {
    const { container } = render(
      <ArticleTemplate title="Test">
        <p>Content</p>
      </ArticleTemplate>
    );

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
  });

  it("should render main semantic element", () => {
    const { container } = render(
      <ArticleTemplate title="Test">
        <p>Content</p>
      </ArticleTemplate>
    );

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });

  describe("Content Rendering", () => {
    it("should render multiple children", () => {
      render(
        <ArticleTemplate title="Test">
          <p>First paragraph</p>
          <p>Second paragraph</p>
          <div>Third element</div>
        </ArticleTemplate>
      );

      expect(screen.getByText("First paragraph")).toBeInTheDocument();
      expect(screen.getByText("Second paragraph")).toBeInTheDocument();
      expect(screen.getByText("Third element")).toBeInTheDocument();
    });

    it("should render complex nested content", () => {
      render(
        <ArticleTemplate title="Test">
          <section>
            <h2>Section Title</h2>
            <p>Section content</p>
          </section>
        </ArticleTemplate>
      );

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Section Title"
      );
      expect(screen.getByText("Section content")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(<ArticleTemplate title="Empty Article">{null}</ArticleTemplate>);

      expect(
        screen.getByRole("heading", { level: 1 })
      ).toHaveTextContent("Empty Article");
    });
  });

  describe("Title Variations", () => {
    it("should render short title", () => {
      render(
        <ArticleTemplate title="Hi">
          <p>Content</p>
        </ArticleTemplate>
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hi");
    });

    it("should render long title", () => {
      const longTitle = "This is a very long article title that should still render correctly";
      render(
        <ArticleTemplate title={longTitle}>
          <p>Content</p>
        </ArticleTemplate>
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(longTitle);
    });

    it("should render title with special characters", () => {
      render(
        <ArticleTemplate title="Test & Article: 'Special' Characters">
          <p>Content</p>
        </ArticleTemplate>
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Test & Article: 'Special' Characters"
      );
    });
  });

  describe("Styling and Layout", () => {
    it("should apply flex layout to main container", () => {
      const { container } = render(
        <ArticleTemplate title="Test">
          <p>Content</p>
        </ArticleTemplate>
      );

      const outerDiv = container.querySelector(".flex.min-h-screen");
      expect(outerDiv).toBeInTheDocument();
    });

    it("should include dark mode classes", () => {
      const { container } = render(
        <ArticleTemplate title="Test">
          <p>Content</p>
        </ArticleTemplate>
      );

      const outerDiv = container.querySelector(".dark\\:bg-black");
      expect(outerDiv).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      const { container } = render(
        <ArticleTemplate title="Main Title">
          <h2>Subtitle</h2>
          <p>Content</p>
        </ArticleTemplate>
      );

      const h1 = container.querySelector("h1");
      const h2 = container.querySelector("h2");
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });

    it("should use Typography component for title", () => {
      render(
        <ArticleTemplate title="Test">
          <p>Content</p>
        </ArticleTemplate>
      );

      // Typography renders as h1 with variant h2 styling
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should work with MDX-style content", () => {
      render(
        <ArticleTemplate title="MDX Article">
          <>
            <h2>Introduction</h2>
            <p>This is an introduction.</p>
            <h2>Main Content</h2>
            <p>This is the main content.</p>
          </>
        </ArticleTemplate>
      );

      expect(screen.getByText("Introduction")).toBeInTheDocument();
      expect(screen.getByText("This is an introduction.")).toBeInTheDocument();
      expect(screen.getByText("Main Content")).toBeInTheDocument();
      expect(screen.getByText("This is the main content.")).toBeInTheDocument();
    });
  });
});
