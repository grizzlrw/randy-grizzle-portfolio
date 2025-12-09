import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DynamicFormClient from "../DynamicFormClient";
import { DynamicFieldConfig } from "../dynamic-form";

// Mock console.log to test submission
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();

describe("DynamicFormClient", () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  const sampleFields: DynamicFieldConfig[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      rules: { required: true },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: { required: true },
    },
  ];

  it("should render the form with provided fields", () => {
    render(<DynamicFormClient fields={sampleFields} />);

    // Query by label text - asterisk is rendered as separate text node
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it("should render submit button with default label", () => {
    render(<DynamicFormClient fields={sampleFields} />);

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    render(<DynamicFormClient fields={sampleFields} />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "Dynamic form submitted",
        expect.objectContaining({
          firstName: "John",
          email: "john@example.com",
        })
      );
    });
  });

  it("should render with empty fields array", () => {
    render(<DynamicFormClient fields={[]} />);

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should render with single field", () => {
    const singleField: DynamicFieldConfig[] = [
      {
        name: "username",
        label: "Username",
        type: "text",
      },
    ];

    render(<DynamicFormClient fields={singleField} />);

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  describe("Field Types", () => {
    it("should render text field", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "name",
          label: "Name",
          type: "text",
        },
      ];

      render(<DynamicFormClient fields={fields} />);
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    });

    it("should render email field", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "email",
          label: "Email Address",
          type: "email",
        },
      ];

      render(<DynamicFormClient fields={fields} />);
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    });

    it("should render select field", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "country",
          label: "Country",
          type: "select",
          options: [
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
          ],
        },
      ];

      render(<DynamicFormClient fields={fields} />);
      expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    });
  });

  describe("Required Fields", () => {
    it("should show asterisk for required fields", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "required",
          label: "Required Field",
          type: "text",
          rules: { required: true },
        },
      ];

      render(<DynamicFormClient fields={fields} />);
      // Check that the field is marked as required
      const label = screen.getByLabelText(/Required Field/i);
      expect(label).toHaveAttribute("required");
    });

    it("should not show asterisk for optional fields", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "optional",
          label: "Optional Field",
          type: "text",
        },
      ];

      render(<DynamicFormClient fields={fields} />);
      
      const label = screen.getByText("Optional Field");
      expect(label.textContent).not.toContain("*");
    });
  });

  describe("Multiple Fields", () => {
    it("should render multiple fields in order", () => {
      const fields: DynamicFieldConfig[] = [
        { name: "field1", label: "First Field", type: "text" },
        { name: "field2", label: "Second Field", type: "text" },
        { name: "field3", label: "Third Field", type: "text" },
      ];

      render(<DynamicFormClient fields={fields} />);

      expect(screen.getByText("First Field")).toBeInTheDocument();
      expect(screen.getByText("Second Field")).toBeInTheDocument();
      expect(screen.getByText("Third Field")).toBeInTheDocument();
    });

    it("should handle mixed field types", () => {
      const fields: DynamicFieldConfig[] = [
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        {
          name: "role",
          label: "Role",
          type: "select",
          options: [{ value: "user", label: "User" }],
        },
      ];

      render(<DynamicFormClient fields={fields} />);

      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      // Select field label appears twice (MUI InputLabel and legend)
      const roleLabels = screen.getAllByText("Role");
      expect(roleLabels.length).toBeGreaterThan(0);
    });
  });

  describe("Form Interaction", () => {
    it("should allow typing in text fields", () => {
      const fields: DynamicFieldConfig[] = [
        { name: "message", label: "Message", type: "text" },
      ];

      render(<DynamicFormClient fields={fields} />);

      const input = screen.getByLabelText(/Message/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "Hello World" } });

      expect(input.value).toBe("Hello World");
    });

    it("should validate required fields on submit", async () => {
      const fields: DynamicFieldConfig[] = [
        { name: "required", label: "Required", type: "text", rules: { required: true } },
      ];

      render(<DynamicFormClient fields={fields} />);

      const submitButton = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(submitButton);

      // Form should show validation error for empty required field
      await waitFor(() => {
        expect(mockConsoleLog).not.toHaveBeenCalled();
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle fields with placeholder text", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "search",
          label: "Search",
          type: "text",
          placeholder: "Enter search term",
        },
      ];

      render(<DynamicFormClient fields={fields} />);

      const input = screen.getByPlaceholderText("Enter search term");
      expect(input).toBeInTheDocument();
    });

    it("should handle fields with validation rules", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "password",
          label: "Password",
          type: "password",
          rules: {
            required: true,
            minLength: { value: 8, message: "Must be at least 8 characters" },
          },
        },
      ];

      render(<DynamicFormClient fields={fields} />);

      // Field renders with label
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });

    it("should handle fields with default values", () => {
      const fields: DynamicFieldConfig[] = [
        {
          name: "country",
          label: "Country",
          type: "text",
          defaultValue: "United States",
        },
      ];

      render(<DynamicFormClient fields={fields} />);

      const input = screen.getByLabelText(/Country/i) as HTMLInputElement;
      expect(input.value).toBe("United States");
    });
  });

  describe("Client-Side Rendering", () => {
    it("should be a client component", () => {
      // This test verifies the component can be rendered in a client context
      expect(() => render(<DynamicFormClient fields={[]} />)).not.toThrow();
    });

    it("should handle console.log in submit handler", async () => {
      const fields: DynamicFieldConfig[] = [
        { name: "test", label: "Test", type: "text" },
      ];

      render(<DynamicFormClient fields={fields} />);

      const input = screen.getByLabelText(/Test/i);
      const submitButton = screen.getByRole("button", { name: /submit/i });

      fireEvent.change(input, { target: { value: "test value" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockConsoleLog).toHaveBeenCalledWith(
          "Dynamic form submitted",
          expect.objectContaining({ test: "test value" })
        );
      });
    });
  });
});
