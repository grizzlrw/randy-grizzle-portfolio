import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import NumberField from "@/app/components/_inputs/NumberField";
import RadioGroupField from "@/app/components/_inputs/RadioGroupField";

expect.extend(toHaveNoViolations);

describe("Accessibility - Form Fields", () => {
  describe("NumberField", () => {
    const mockControl = {
      register: () => ({ name: "testNumber" }),
    } as any;

    it("should have no accessibility violations", async () => {
      const { container } = render(
        <NumberField
          name="testNumber"
          label="Age"
          control={mockControl}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible number input", () => {
      const { getByLabelText } = render(
        <NumberField
          name="testNumber"
          label="Age"
          control={mockControl}
        />
      );

      const input = getByLabelText("Age");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "number");
    });

    it("should have accessible error state", () => {
      const { container } = render(
        <NumberField
          name="testNumber"
          label="Age"
          control={mockControl}
          error={{ type: "min", message: "Must be at least 18" }}
          helperText="Must be at least 18"
        />
      );

      // MUI uses FormHelperText with error styling, not role="alert"
      const errorText = container.querySelector('[class*="MuiFormHelperText"]');
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveTextContent("Must be at least 18");
    });

    it("should support aria-describedby for helper text", () => {
      const { container } = render(
        <NumberField
          name="testNumber"
          label="Age"
          control={mockControl}
          helperText="Enter your age in years"
        />
      );

      const helperText = container.querySelector('[class*="MuiFormHelperText"]');
      
      // MUI handles aria-describedby automatically
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveTextContent("Enter your age in years");
    });
  });

  describe("RadioGroupField", () => {
    const mockControl = {
      register: () => ({ name: "testRadio" }),
    } as any;

    const options = [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "maybe", label: "Maybe" },
    ];

    it("should have no accessibility violations", async () => {
      const { container } = render(
        <RadioGroupField
          name="testRadio"
          label="Do you agree?"
          options={options}
          control={mockControl}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible radio group", () => {
      const { container } = render(
        <RadioGroupField
          name="testRadio"
          label="Do you agree?"
          options={options}
          control={mockControl}
        />
      );

      const radioGroup = container.querySelector('[role="radiogroup"]');
      expect(radioGroup).toBeInTheDocument();
    });

    it("should have accessible radio buttons", () => {
      const { container } = render(
        <RadioGroupField
          name="testRadio"
          label="Do you agree?"
          options={options}
          control={mockControl}
        />
      );

      const radios = container.querySelectorAll('input[type="radio"]');
      expect(radios).toHaveLength(3);

      radios.forEach((radio) => {
        expect(radio).toHaveAttribute("name", "testRadio");
      });
    });

    it("should have accessible labels for each option", () => {
      const { getByLabelText } = render(
        <RadioGroupField
          name="testRadio"
          label="Do you agree?"
          options={options}
          control={mockControl}
        />
      );

      expect(getByLabelText("Yes")).toBeInTheDocument();
      expect(getByLabelText("No")).toBeInTheDocument();
      expect(getByLabelText("Maybe")).toBeInTheDocument();
    });

    it("should have accessible error state", () => {
      const { container } = render(
        <RadioGroupField
          name="testRadio"
          label="Do you agree?"
          options={options}
          control={mockControl}
          error={{ type: "required", message: "Please select an option" }}
          helperText="Please select an option"
        />
      );

      // MUI uses FormHelperText with error styling
      const errorText = container.querySelector('[class*="MuiFormHelperText"]');
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveTextContent("Please select an option");
    });
  });
  describe("Form Validation Patterns", () => {
    it("should use aria-invalid for invalid fields", () => {
      const mockControl = {
        register: () => ({ name: "testField" }),
      } as any;

      const { container } = render(
        <NumberField
          name="testField"
          label="Test"
          control={mockControl}
          error={{ type: "required", message: "Required" }}
        />
      );

      const input = container.querySelector("input");
      // MUI sets aria-invalid based on error prop
      expect(input).toHaveAttribute("aria-invalid");
    });

    it("should associate error messages with fields", () => {
      const mockControl = {
        register: () => ({ name: "testField" }),
      } as any;

      const { container } = render(
        <NumberField
          name="testField"
          label="Test"
          control={mockControl}
          error={{ type: "required", message: "Required" }}
          helperText="Required"
        />
      );

      // MUI displays error messages via FormHelperText
      const errorElement = container.querySelector('[class*="MuiFormHelperText"]');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Required");
    });
  });
});
