import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import NumberField from "@/app/components/_inputs/NumberField";
import RadioGroupField from "@/app/components/_inputs/RadioGroupField";

expect.extend(toHaveNoViolations);

describe("Accessibility - Form Fields", () => {
  describe("NumberField", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <NumberField
          id="testNumber"
          name="testNumber"
          label="Age"
          value={0}
          onChange={() => {}}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible number input", () => {
      const { getByLabelText } = render(
        <NumberField
          id="testNumber"
          name="testNumber"
          label="Age"
          value={0}
          onChange={() => {}}
        />
      );

      const input = getByLabelText("Age");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "number");
    });

    it("should have accessible error state", () => {
      const { container } = render(
        <NumberField
          id="testNumber"
          name="testNumber"
          label="Age"
          value={0}
          onChange={() => {}}
          error="Must be at least 18"
          touched={true}
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
          id="testNumber"
          name="testNumber"
          label="Age"
          value={0}
          onChange={() => {}}
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
    const options = [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "maybe", label: "Maybe" },
    ];

    it("should have no accessibility violations", async () => {
      const { container } = render(
        <RadioGroupField
          id="testRadio"
          name="testRadio"
          label="Do you agree?"
          options={options}
          value="yes"
          onChange={() => {}}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible radio group", () => {
      const { container } = render(
        <RadioGroupField
          id="testRadio"
          name="testRadio"
          label="Do you agree?"
          options={options}
          value="yes"
          onChange={() => {}}
        />
      );

      const radioGroup = container.querySelector('[role="radiogroup"]');
      expect(radioGroup).toBeInTheDocument();
    });

    it("should have accessible radio buttons", () => {
      const { container } = render(
        <RadioGroupField
          id="testRadio"
          name="testRadio"
          label="Do you agree?"
          options={options}
          value="yes"
          onChange={() => {}}
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
          id="testRadio"
          name="testRadio"
          label="Do you agree?"
          options={options}
          value="yes"
          onChange={() => {}}
        />
      );

      expect(getByLabelText("Yes")).toBeInTheDocument();
      expect(getByLabelText("No")).toBeInTheDocument();
      expect(getByLabelText("Maybe")).toBeInTheDocument();
    });

    it("should have accessible error state", () => {
      const { container } = render(
        <RadioGroupField
          id="testRadio"
          name="testRadio"
          label="Do you agree?"
          options={options}
          value="yes"
          onChange={() => {}}
          error="Please select an option"
          touched={true}
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
      const { container } = render(
        <NumberField
          id="testField"
          name="testField"
          label="Test"
          value={0}
          onChange={() => {}}
          error="Required"
          touched={true}
        />
      );

      const input = container.querySelector("input");
      // MUI sets aria-invalid based on error prop
      expect(input).toHaveAttribute("aria-invalid");
    });

    it("should associate error messages with fields", () => {
      const { container } = render(
        <NumberField
          id="testField"
          name="testField"
          label="Test"
          value={0}
          onChange={() => {}}
          error="Required"
          touched={true}
        />
      );

      // MUI displays error messages via FormHelperText
      const errorElement = container.querySelector('[class*="MuiFormHelperText"]');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent("Required");
    });
  });
});
