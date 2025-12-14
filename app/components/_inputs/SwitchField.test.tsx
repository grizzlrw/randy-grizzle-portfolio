import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SwitchField from "./SwitchField";

describe("SwitchField", () => {
  const defaultProps = {
    id: "test-switch",
    name: "testSwitch",
    label: "Enable Feature",
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render switch with label", () => {
      render(<SwitchField {...defaultProps} />);

      expect(screen.getByRole("switch")).toBeInTheDocument();
      expect(screen.getByText("Enable Feature")).toBeInTheDocument();
    });

    it("should render checked switch", () => {
      render(<SwitchField {...defaultProps} checked={true} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeChecked();
    });

    it("should render unchecked switch", () => {
      render(<SwitchField {...defaultProps} checked={false} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).not.toBeChecked();
    });

    it("should render with helper text", () => {
      render(
        <SwitchField
          {...defaultProps}
          helperText="This enables advanced features"
        />
      );

      expect(screen.getByText("This enables advanced features")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should display error when touched and error provided", () => {
      render(
        <SwitchField
          {...defaultProps}
          error="This field is required"
          touched={true}
        />
      );

      const errorText = screen.getByText("This field is required");
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveClass("Mui-error");
    });

    it("should not display error when not touched", () => {
      render(
        <SwitchField
          {...defaultProps}
          error="This field is required"
          touched={false}
        />
      );

      expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
    });

    it("should show helperText instead of error when not touched", () => {
      render(
        <SwitchField
          {...defaultProps}
          helperText="Helper text"
          error="Error text"
          touched={false}
        />
      );

      expect(screen.getByText("Helper text")).toBeInTheDocument();
      expect(screen.queryByText("Error text")).not.toBeInTheDocument();
    });

    it("should prioritize error over helperText when touched", () => {
      render(
        <SwitchField
          {...defaultProps}
          helperText="Helper text"
          error="Error text"
          touched={true}
        />
      );

      expect(screen.getByText("Error text")).toBeInTheDocument();
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onChange with true when toggled on", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SwitchField {...defaultProps} checked={false} onChange={onChange} />);

      const switchElement = screen.getByRole("switch");
      await user.click(switchElement);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it("should call onChange with false when toggled off", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SwitchField {...defaultProps} checked={true} onChange={onChange} />);

      const switchElement = screen.getByRole("switch");
      await user.click(switchElement);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it("should handle multiple toggle interactions", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      const { rerender } = render(<SwitchField {...defaultProps} checked={false} onChange={onChange} />);

      const switchElement = screen.getByRole("switch");
      
      await user.click(switchElement);
      expect(onChange).toHaveBeenCalledWith(true);

      rerender(<SwitchField {...defaultProps} checked={true} onChange={onChange} />);
      await user.click(switchElement);
      expect(onChange).toHaveBeenCalledWith(false);

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it("should support keyboard interaction", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SwitchField {...defaultProps} checked={false} onChange={onChange} />);

      const switchElement = screen.getByRole("switch");
      act(() => {
        switchElement.focus();
      });
      
      await user.keyboard(" ");

      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Accessibility", () => {
    it("should have correct id attribute", () => {
      render(<SwitchField {...defaultProps} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("id", "test-switch");
    });

    it("should have correct name attribute", () => {
      render(<SwitchField {...defaultProps} />);

      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("name", "testSwitch");
    });

    it("should associate label with switch", () => {
      render(<SwitchField {...defaultProps} />);

      const label = screen.getByText("Enable Feature");
      expect(label).toBeInTheDocument();
    });

    it("should have proper ARIA attributes when error", () => {
      render(
        <SwitchField
          {...defaultProps}
          error="This field is required"
          touched={true}
        />
      );

      const errorText = screen.getByText("This field is required");
      expect(errorText).toHaveClass("Mui-error");
    });
  });

  describe("Props Validation", () => {
    it("should handle null error prop", () => {
      render(<SwitchField {...defaultProps} error={null} touched={true} />);

      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("should handle undefined touched prop", () => {
      render(<SwitchField {...defaultProps} touched={undefined} />);

      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("should handle all optional props omitted", () => {
      render(<SwitchField {...defaultProps} />);

      expect(screen.getByRole("switch")).toBeInTheDocument();
      expect(screen.getByText("Enable Feature")).toBeInTheDocument();
    });
  });
});
