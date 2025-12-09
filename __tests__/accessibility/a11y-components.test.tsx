import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import DynamicForm from "@/app/components/_dynamic-form/dynamic-form";
import CheckboxField from "@/app/components/_inputs/CheckboxField";
import SelectField from "@/app/components/_inputs/SelectField";
import PageLayout from "@/app/components/layouts/PageLayout";

expect.extend(toHaveNoViolations);

describe("Accessibility - Components", () => {
  describe("DynamicForm", () => {
    const mockElements = [
      {
        id: "1",
        name: "firstName",
        label: "First Name",
        type: "text",
        position: 0,
        rules: {},
      },
      {
        id: "2",
        name: "email",
        label: "Email Address",
        type: "email",
        position: 1,
        rules: {},
      },
    ];

    const mockOnSubmit = jest.fn();

    it("should have no accessibility violations", async () => {
      const { container } = render(
        <DynamicForm
          title="Test Form"
          fields={mockElements}
          onSubmit={mockOnSubmit}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible form labels", () => {
      const { container } = render(
        <DynamicForm
          title="Test Form"
          fields={mockElements}
          onSubmit={mockOnSubmit}
        />
      );

      const inputs = container.querySelectorAll("input");
      inputs.forEach((input) => {
        const label = container.querySelector(`label[for="${input.id}"]`);
        expect(label).toBeInTheDocument();
      });
    });

    it("should have accessible submit button", () => {
      const { container } = render(
        <DynamicForm
          title="Test Form"
          fields={mockElements}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = container.querySelector('button[type="submit"]');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAccessibleName();
    });
  });

  describe("CheckboxField", () => {
    const mockControl = {
      register: () => ({ name: "testCheckbox" }),
    } as any;

    it("should have no accessibility violations", async () => {
      const { container } = render(
        <CheckboxField
          name="testCheckbox"
          label="Accept Terms"
          control={mockControl}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible checkbox input", () => {
      const { container } = render(
        <CheckboxField
          name="testCheckbox"
          label="Accept Terms"
          control={mockControl}
        />
      );

      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      // MUI Checkbox uses SVG for visual, native input for accessibility
    });
  });

  describe("SelectField", () => {
    const mockControl = {
      register: () => ({ name: "testSelect" }),
      _formValues: { testSelect: "" },
    } as any;

    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    it("should have no accessibility violations", async () => {
      const { container } = render(
        <SelectField
          name="testSelect"
          label="Choose Option"
          options={options}
          control={mockControl}
          defaultValue=""
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible select element", () => {
      const { getByLabelText } = render(
        <SelectField
          name="testSelect"
          label="Choose Option"
          options={options}
          control={mockControl}
          defaultValue=""
        />
      );

      const select = getByLabelText("Choose Option");
      expect(select).toBeInTheDocument();
      // MUI Select uses button role for accessibility
    });
  });

  describe("PageLayout", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <PageLayout>
          <div>Test content</div>
        </PageLayout>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have accessible main landmark", () => {
      const { container } = render(
        <PageLayout>
          <div>Test content</div>
        </PageLayout>
      );

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });

    it("should wrap content properly", () => {
      const { getByText } = render(
        <PageLayout>
          <div>Test content</div>
        </PageLayout>
      );

      expect(getByText("Test content")).toBeInTheDocument();
    });
  });
});
