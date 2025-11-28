import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DynamicForm, { DynamicFieldConfig } from "./dynamic-form";

const fields: DynamicFieldConfig[] = [
  {
    name: "firstName",
    type: "text",
    label: "First name",
    rules: { required: "First name is required" },
  },
  {
    name: "role",
    type: "text",
    label: "Role",
    rules: { required: "Role is required" },
  },
];

describe("DynamicForm", () => {
  test("renders fields from config and submits values", async () => {
    const handleSubmit = jest.fn<void, [Record<string, unknown>]>();

    render(
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Save"
      />
    );

    // Text input should render
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toBeInTheDocument();

    // Second text input should render
    const roleInput = screen.getByLabelText(/role/i);
    expect(roleInput).toBeInTheDocument();

    // Fill in values
    fireEvent.change(firstNameInput, { target: { value: "Alice" } });
    fireEvent.change(roleInput, { target: { value: "senior" } });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    const submittedValues = handleSubmit.mock.calls[0][0];
    expect(submittedValues).toMatchObject({
      firstName: "Alice",
      role: "senior",
    });
  });
});
