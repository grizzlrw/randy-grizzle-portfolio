import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutocompleteField, { type AutocompleteOption } from "./AutocompleteField";

describe("AutocompleteField", () => {
  const mockOptions: AutocompleteOption[] = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  const defaultProps = {
    id: "test-autocomplete",
    name: "testAutocomplete",
    label: "Select Framework",
    value: null,
    options: mockOptions,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render autocomplete with label", () => {
      render(<AutocompleteField {...defaultProps} />);

      expect(screen.getByText("Select Framework")).toBeInTheDocument();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should render with initial value", () => {
      render(
        <AutocompleteField
          {...defaultProps}
          value={{ value: "react", label: "React" }}
        />
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("React");
    });

    it("should render with placeholder", () => {
      render(
        <AutocompleteField
          {...defaultProps}
          placeholder="Choose a framework..."
        />
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("placeholder", "Choose a framework...");
    });

    it("should render with helper text", () => {
      render(
        <AutocompleteField
          {...defaultProps}
          helperText="Select your preferred framework"
        />
      );

      expect(screen.getByText("Select your preferred framework")).toBeInTheDocument();
    });

    it("should render empty state correctly", () => {
      render(<AutocompleteField {...defaultProps} value={null} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("");
    });
  });

  describe("Error Handling", () => {
    it("should display error when touched and error provided", () => {
      render(
        <AutocompleteField
          {...defaultProps}
          error="Selection is required"
          touched={true}
        />
      );

      const errorText = screen.getAllByText("Selection is required");
      expect(errorText.length).toBeGreaterThan(0);
      expect(errorText[0]).toHaveClass("Mui-error");
    });

    it("should not display error when not touched", () => {
      render(
        <AutocompleteField
          {...defaultProps}
          error="Selection is required"
          touched={false}
        />
      );

      expect(screen.queryByText("Selection is required")).not.toBeInTheDocument();
    });

    it("should show helperText instead of error when not touched", () => {
      render(
        <AutocompleteField
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
        <AutocompleteField
          {...defaultProps}
          helperText="Helper text"
          error="Error text"
          touched={true}
        />
      );

      const errorTexts = screen.getAllByText("Error text");
      expect(errorTexts.length).toBeGreaterThan(0);
      expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onChange when option is selected", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<AutocompleteField {...defaultProps} onChange={onChange} />);

      const input = screen.getByRole("combobox");
      await user.click(input);

      const listbox = screen.getByRole("listbox");
      const options = within(listbox).getAllByRole("option");
      
      await user.click(options[0]);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(mockOptions[0]);
    });

    it("should filter options based on input", async () => {
      const user = userEvent.setup();

      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "Rea");

      const listbox = screen.getByRole("listbox");
      const options = within(listbox).getAllByRole("option");
      
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent("React");
    });

    it("should allow clearing selection", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <AutocompleteField
          {...defaultProps}
          value={{ value: "react", label: "React" }}
          onChange={onChange}
        />
      );

      const clearButton = screen.getByTitle(/clear/i);
      await user.click(clearButton);

      expect(onChange).toHaveBeenCalledWith(null);
    });

    it("should handle keyboard navigation", async () => {
      const user = userEvent.setup();

      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.click(input);
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(screen.getByRole("combobox")).toHaveValue("React");
    });

    it("should support typing to search", async () => {
      const user = userEvent.setup();

      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "Angular");

      const listbox = screen.getByRole("listbox");
      expect(within(listbox).getByText("Angular")).toBeInTheDocument();
    });

    it("should handle no results found", async () => {
      const user = userEvent.setup();

      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.type(input, "Nonexistent");

      expect(await screen.findByText("No options")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have correct id attribute", () => {
      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("id", "test-autocomplete");
    });

    it("should have correct name attribute", () => {
      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("name", "testAutocomplete");
    });

    it("should associate label with input via htmlFor", () => {
      const { container } = render(<AutocompleteField {...defaultProps} />);

      const label = container.querySelector('label[for="test-autocomplete"]');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Select Framework");
    });

    it("should have proper ARIA attributes", async () => {
      const user = userEvent.setup();

      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      
      await user.click(input);
      
      expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("should announce selected option to screen readers", async () => {
      const user = userEvent.setup();

      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.click(input);

      const listbox = screen.getByRole("listbox");
      const options = within(listbox).getAllByRole("option");
      
      await user.click(options[1]);

      expect(screen.getByRole("combobox")).toHaveValue("Vue");
    });

    it("should have accessible popup button", () => {
      render(<AutocompleteField {...defaultProps} />);

      const toggleButton = screen.getByTitle(/open/i);
      expect(toggleButton).toHaveAttribute("aria-label", "Open");
    });
  });

  describe("Props Validation", () => {
    it("should handle null error prop", () => {
      render(<AutocompleteField {...defaultProps} error={null} touched={true} />);

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should handle undefined touched prop", () => {
      render(<AutocompleteField {...defaultProps} touched={undefined} />);

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should handle all optional props omitted", () => {
      render(<AutocompleteField {...defaultProps} />);

      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("Select Framework")).toBeInTheDocument();
    });

    it("should handle empty options array", () => {
      render(<AutocompleteField {...defaultProps} options={[]} />);

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("should handle numeric values", () => {
      const numericOptions: AutocompleteOption<number>[] = [
        { value: 1, label: "One" },
        { value: 2, label: "Two" },
        { value: 3, label: "Three" },
      ];

      render(
        <AutocompleteField
          {...defaultProps}
          options={numericOptions}
          value={{ value: 2, label: "Two" }}
        />
      );

      expect(screen.getByRole("combobox")).toHaveValue("Two");
    });
  });

  describe("Option Rendering", () => {
    it("should display all options when opened", async () => {
      const user = userEvent.setup();

      render(<AutocompleteField {...defaultProps} />);

      const input = screen.getByRole("combobox");
      await user.click(input);

      const listbox = screen.getByRole("listbox");
      const options = within(listbox).getAllByRole("option");
      
      expect(options).toHaveLength(4);
      expect(options[0]).toHaveTextContent("React");
      expect(options[1]).toHaveTextContent("Vue");
      expect(options[2]).toHaveTextContent("Angular");
      expect(options[3]).toHaveTextContent("Svelte");
    });

    it("should highlight selected option", async () => {
      const user = userEvent.setup();

      render(
        <AutocompleteField
          {...defaultProps}
          value={{ value: "vue", label: "Vue" }}
        />
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      const listbox = screen.getByRole("listbox");
      const selectedOption = within(listbox).getByRole("option", { name: "Vue" });
      
      expect(selectedOption).toBeInTheDocument();
    });
  });
});
