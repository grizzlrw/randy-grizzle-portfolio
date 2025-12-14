import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SliderField from "./SliderField";

describe("SliderField", () => {
  const defaultProps = {
    id: "test-slider",
    name: "testSlider",
    label: "Volume",
    value: 50,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render slider with label", () => {
      render(<SliderField {...defaultProps} />);

      expect(screen.getByText("Volume")).toBeInTheDocument();
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("should render with correct initial value", () => {
      render(<SliderField {...defaultProps} value={75} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "75");
    });

    it("should render with min and max values", () => {
      render(<SliderField {...defaultProps} min={0} max={100} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
    });

    it("should render with step value", () => {
      render(<SliderField {...defaultProps} step={5} />);

      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("should render with helper text", () => {
      render(
        <SliderField
          {...defaultProps}
          helperText="Adjust volume level"
        />
      );

      expect(screen.getByText("Adjust volume level")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should display error when touched and error provided", () => {
      render(
        <SliderField
          {...defaultProps}
          error="Value must be between 0 and 100"
          touched={true}
        />
      );

      const errorText = screen.getByText("Value must be between 0 and 100");
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveClass("Mui-error");
    });

    it("should not display error when not touched", () => {
      render(
        <SliderField
          {...defaultProps}
          error="Value must be between 0 and 100"
          touched={false}
        />
      );

      expect(screen.queryByText("Value must be between 0 and 100")).not.toBeInTheDocument();
    });

    it("should show helperText instead of error when not touched", () => {
      render(
        <SliderField
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
        <SliderField
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
    it("should call onChange when slider value changes", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SliderField {...defaultProps} onChange={onChange} />);

      const slider = screen.getByRole("slider");
      
      // Simulate keyboard interaction to change value
      act(() => {
        slider.focus();
      });
      await user.keyboard("{ArrowRight}");

      expect(onChange).toHaveBeenCalled();
    });

    it("should support keyboard navigation - ArrowUp", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SliderField {...defaultProps} onChange={onChange} />);

      const slider = screen.getByRole("slider");
      act(() => {
        slider.focus();
      });
      await user.keyboard("{ArrowUp}");

      expect(onChange).toHaveBeenCalled();
    });

    it("should support keyboard navigation - ArrowDown", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SliderField {...defaultProps} onChange={onChange} />);

      const slider = screen.getByRole("slider");
      act(() => {
        slider.focus();
      });
      await user.keyboard("{ArrowDown}");

      expect(onChange).toHaveBeenCalled();
    });

    it("should support Home key to go to minimum", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SliderField {...defaultProps} min={0} max={100} onChange={onChange} />);

      const slider = screen.getByRole("slider");
      act(() => {
        slider.focus();
      });
      await user.keyboard("{Home}");

      expect(onChange).toHaveBeenCalled();
    });

    it("should support End key to go to maximum", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<SliderField {...defaultProps} min={0} max={100} onChange={onChange} />);

      const slider = screen.getByRole("slider");
      act(() => {
        slider.focus();
      });
      await user.keyboard("{End}");

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have correct id attribute", () => {
      const { container } = render(<SliderField {...defaultProps} />);

      const element = container.querySelector("#test-slider");
      expect(element).toBeInTheDocument();
    });

    it("should have correct name attribute", () => {
      render(<SliderField {...defaultProps} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("name", "testSlider");
    });

    it("should associate label with slider via htmlFor", () => {
      const { container } = render(<SliderField {...defaultProps} />);

      const label = container.querySelector('label[for="test-slider"]');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Volume");
    });

    it("should have proper ARIA attributes", () => {
      render(<SliderField {...defaultProps} value={50} min={0} max={100} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "50");
      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
    });

    it("should have proper ARIA attributes when error", () => {
      render(
        <SliderField
          {...defaultProps}
          error="Invalid value"
          touched={true}
        />
      );

      const errorText = screen.getByText("Invalid value");
      expect(errorText).toHaveClass("Mui-error");
    });
  });

  describe("Props Validation", () => {
    it("should handle null error prop", () => {
      render(<SliderField {...defaultProps} error={null} touched={true} />);

      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("should handle undefined touched prop", () => {
      render(<SliderField {...defaultProps} touched={undefined} />);

      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("should handle all optional props omitted", () => {
      render(<SliderField {...defaultProps} />);

      expect(screen.getByRole("slider")).toBeInTheDocument();
      expect(screen.getByText("Volume")).toBeInTheDocument();
    });

    it("should handle zero value", () => {
      render(<SliderField {...defaultProps} value={0} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "0");
    });

    it("should handle maximum value", () => {
      render(<SliderField {...defaultProps} value={100} max={100} />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "100");
    });
  });
});
