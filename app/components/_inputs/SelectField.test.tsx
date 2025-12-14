import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import SelectField, { SelectOption } from "./SelectField";

const options: SelectOption[] = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
];

test("SelectField renders label and options and handles change", async () => {
  let value = "";
  const handleChange = (v: string) => {
    value = v;
  };

  render(
    <SelectField
      id="test-select"
      name="test"
      label="Test Select"
      value={value}
      options={options}
      onChange={handleChange}
      placeholder="Choose"
    />
  );

  expect(screen.getByLabelText("Test Select")).toBeInTheDocument();

  // Open the dropdown
  act(() => {
    fireEvent.mouseDown(screen.getByLabelText("Test Select"));
  });

  // Wait for the option to appear, then click it
  await waitFor(() => {
    expect(screen.getByText("One")).toBeInTheDocument();
  });

  act(() => {
    fireEvent.click(screen.getByText("One"));
  });

  expect(value).toBe("one");
});
