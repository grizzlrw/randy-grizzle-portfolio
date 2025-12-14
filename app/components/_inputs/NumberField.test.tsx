import { render, screen, fireEvent, act } from "@testing-library/react";
import NumberField from "./NumberField";

test("NumberField parses numeric input", () => {
  let value: number | "" = "";
  const handleChange = (v: number | "") => {
    value = v;
  };

  render(
    <NumberField
      id="age"
      name="age"
      label="Age"
      value={value}
      onChange={handleChange}
    />
  );

  const input = screen.getByLabelText("Age") as HTMLInputElement;
  act(() => {
    fireEvent.change(input, { target: { value: "42" } });
  });
  expect(value).toBe(42);
});
