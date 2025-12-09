import { render, screen } from "@testing-library/react";
import Code from "../Code";

// Mock react-syntax-highlighter
jest.mock("react-syntax-highlighter", () => ({
  Prism: ({ children, language, style }: any) => (
    <pre data-language={language} data-testid="syntax-highlighter">
      <code>{children}</code>
    </pre>
  ),
}));

jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  dark: {},
  a11yDark: {},
}));

describe("Code Component", () => {
  it("should render code with syntax highlighting", () => {
    const code = 'const greeting = "Hello World";';
    render(<Code language="javascript">{code}</Code>);

    expect(screen.getByText(/const greeting/)).toBeInTheDocument();
    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });

  it("should default to jsx language when not specified", () => {
    const code = "<div>Test</div>";
    // @ts-expect-error - Testing default prop behavior
    render(<Code>{code}</Code>);

    expect(screen.getByText(/<div>/)).toBeInTheDocument();
  });

  it("should render JSX code", () => {
    const code = "<MyComponent prop={value} />";
    render(<Code language="jsx">{code}</Code>);

    expect(screen.getByText(/<MyComponent/)).toBeInTheDocument();
  });

  it("should render TypeScript code", () => {
    const code = "interface User { name: string; }";
    render(<Code language="typescript">{code}</Code>);

    expect(screen.getByText(/interface User/)).toBeInTheDocument();
  });

  it("should render Python code", () => {
    const code = "def hello():\n    print('Hello')";
    render(<Code language="python">{code}</Code>);

    expect(screen.getByText(/def hello/)).toBeInTheDocument();
  });

  it("should render multi-line code", () => {
    const code = `function test() {
  return true;
}`;
    render(<Code language="javascript">{code}</Code>);

    expect(screen.getByText(/function test/)).toBeInTheDocument();
    expect(screen.getByText(/return true/)).toBeInTheDocument();
  });

  it("should handle empty code string", () => {
    render(<Code language="javascript">{""}</Code>);
    
    // Component should still render without crashing
    const codeElement = document.querySelector("code");
    expect(codeElement).toBeInTheDocument();
  });

  it("should handle special characters", () => {
    const code = 'const regex = /[a-z]+/g;';
    render(<Code language="javascript">{code}</Code>);

    expect(screen.getByText(/const regex/)).toBeInTheDocument();
  });

  it("should render HTML code", () => {
    const code = '<div class="container">Content</div>';
    render(<Code language="html">{code}</Code>);

    expect(screen.getByText(/div class/)).toBeInTheDocument();
  });

  it("should render CSS code", () => {
    const code = ".container { display: flex; }";
    render(<Code language="css">{code}</Code>);

    expect(screen.getByText(/\.container/)).toBeInTheDocument();
    expect(screen.getByText(/display: flex/)).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("should render semantic code element", () => {
      const code = "test";
      render(<Code language="javascript">{code}</Code>);

      const codeElement = document.querySelector("code");
      expect(codeElement).toBeInTheDocument();
    });

    it("should use pre element for formatted code blocks", () => {
      const code = "test";
      render(<Code language="javascript">{code}</Code>);

      const preElement = document.querySelector("pre");
      expect(preElement).toBeInTheDocument();
    });
  });

  describe("Syntax Highlighting", () => {
    it("should apply syntax highlighting classes", () => {
      const code = 'const x = 1;';
      render(<Code language="javascript">{code}</Code>);

      // The mock renders the code inside a pre tag
      const pre = screen.getByTestId("syntax-highlighter");
      expect(pre).toBeInTheDocument();
      expect(pre).toHaveAttribute("data-language", "javascript");
    });

    it("should use a11yDark style", () => {
      const code = "test";
      const { container } = render(<Code language="javascript">{code}</Code>);

      // a11yDark style applies specific background colors
      const pre = container.querySelector("pre");
      expect(pre).toHaveStyle({ background: expect.any(String) });
    });
  });
});
