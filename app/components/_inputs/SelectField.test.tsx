import { render, screen, fireEvent } from "@testing-library/react";
import SelectField, { SelectOption } from "./SelectField";

const options: SelectOption[] = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
];

test("SelectField renders label and options and handles change", () => {
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

  fireEvent.mouseDown(screen.getByLabelText("Test Select"));
  fireEvent.click(screen.getByText("One"));

  expect(value).toBe("one");
});
