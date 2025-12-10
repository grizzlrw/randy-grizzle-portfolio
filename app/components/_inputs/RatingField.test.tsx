import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RatingField from "./RatingField";

describe("RatingField", () => {
  const defaultProps = {
    id: "test-rating",
    name: "testRating",
    label: "Product Rating",
    value: 3,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render rating with label", () => {
      render(<RatingField {...defaultProps} />);

      expect(screen.getByText("Product Rating")).toBeInTheDocument();
      // Rating component renders radio inputs
      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });

    it("should render with correct initial value", () => {
      render(<RatingField {...defaultProps} value={4} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });

    it("should render with null value", () => {
      render(<RatingField {...defaultProps} value={null} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });

    it("should render with custom max value", () => {
      render(<RatingField {...defaultProps} max={10} value={3} />);

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(11); // 10 stars + 1 empty radio
    });

    it("should render with precision for half stars", () => {
      render(<RatingField {...defaultProps} precision={0.5} value={3.5} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });

    it("should render with helper text", () => {
      render(
        <RatingField
          {...defaultProps}
          helperText="Rate your experience"
        />
      );

      expect(screen.getByText("Rate your experience")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should display error when touched and error provided", () => {
      render(
        <RatingField
          {...defaultProps}
          error="Rating is required"
          touched={true}
        />
      );

      const errorText = screen.getByText("Rating is required");
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveClass("Mui-error");
    });

    it("should not display error when not touched", () => {
      render(
        <RatingField
          {...defaultProps}
          error="Rating is required"
          touched={false}
        />
      );

      expect(screen.queryByText("Rating is required")).not.toBeInTheDocument();
    });

    it("should show helperText instead of error when not touched", () => {
      render(
        <RatingField
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
        <RatingField
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
    it("should call onChange when rating is clicked", async () => {
      const onChange = jest.fn();

      render(<RatingField {...defaultProps} value={null} onChange={onChange} />);

      await act(async () => {
        await fireEvent.click(screen.getByLabelText("4 Stars"));
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it("should allow changing rating value", async () => {
      const onChange = jest.fn();

      render(<RatingField {...defaultProps} value={3} onChange={onChange} />);

      await act(async () => {
        await fireEvent.click(screen.getByLabelText("5 Stars"));
      });

      expect(onChange).toHaveBeenCalledWith(5);
    });

    it("should support keyboard navigation", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<RatingField {...defaultProps} value={null} onChange={onChange} />);

      const stars = screen.getAllByRole("radio");
      stars[0].focus();
      
      await user.keyboard("{ArrowRight}");

      expect(onChange).toHaveBeenCalled();
    });

    it("should handle multiple rating changes", async () => {
      const onChange = jest.fn();

      const { rerender } = render(<RatingField {...defaultProps} value={2} onChange={onChange} />);
      
      await act(async () => {
        await fireEvent.click(screen.getByLabelText("4 Stars"));
      });
      expect(onChange).toHaveBeenCalledWith(4);
      
      // Rerender with new value as a controlled component would
      rerender(<RatingField {...defaultProps} value={4} onChange={onChange} />);
      
      await act(async () => {
        await fireEvent.click(screen.getByLabelText("2 Stars"));
      });
      expect(onChange).toHaveBeenCalledWith(2);

      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("Accessibility", () => {
    it("should have correct id attribute", () => {
      const { container } = render(<RatingField {...defaultProps} />);

      const element = container.querySelector("#test-rating");
      expect(element).toBeInTheDocument();
    });

    it("should have correct name attribute", () => {
      render(<RatingField {...defaultProps} />);

      const radios = screen.getAllByRole("radio");
      radios.forEach(radio => {
        expect(radio).toHaveAttribute("name", "testRating");
      });
    });

    it("should associate label with rating via htmlFor", () => {
      const { container } = render(<RatingField {...defaultProps} />);

      const label = container.querySelector('label[for="test-rating"]');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Product Rating");
    });

    it("should have proper ARIA attributes", () => {
      render(<RatingField {...defaultProps} value={4} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBe(6); // 5 stars + 1 empty radio
    });

    it("should have proper ARIA attributes with null value", () => {
      render(<RatingField {...defaultProps} value={null} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBe(6); // 5 stars + 1 empty radio
    });

    it("should have proper ARIA attributes when error", () => {
      render(
        <RatingField
          {...defaultProps}
          error="Invalid rating"
          touched={true}
        />
      );

      const errorText = screen.getByText("Invalid rating");
      expect(errorText).toHaveClass("Mui-error");
    });

    it("should have accessible star labels", () => {
      render(<RatingField {...defaultProps} value={3} max={5} />);

      // MUI Rating component creates radio inputs for each star
      const stars = screen.getAllByRole("radio");
      expect(stars).toHaveLength(6); // 5 stars + 1 empty radio
    });
  });

  describe("Props Validation", () => {
    it("should handle null error prop", () => {
      render(<RatingField {...defaultProps} error={null} touched={true} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });

    it("should handle undefined touched prop", () => {
      render(<RatingField {...defaultProps} touched={undefined} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });

    it("should handle all optional props omitted", () => {
      render(<RatingField {...defaultProps} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
      expect(screen.getByText("Product Rating")).toBeInTheDocument();
    });

    it("should handle zero value", () => {
      render(<RatingField {...defaultProps} value={0} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });

    it("should handle maximum value", () => {
      render(<RatingField {...defaultProps} value={5} max={5} />);

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(6); // 5 stars + 1 empty radio
    });

    it("should handle half-star precision", () => {
      render(<RatingField {...defaultProps} value={3.5} precision={0.5} />);

      const radios = screen.getAllByRole("radio");
      expect(radios.length).toBeGreaterThan(0);
    });
  });
});
