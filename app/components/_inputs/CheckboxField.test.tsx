import { render, screen, fireEvent, act } from "@testing-library/react";
import CheckboxField from "./CheckboxField";

test("CheckboxField toggles checked state", () => {
  let checked = false;
  const handleChange = (v: boolean) => {
    checked = v;
  };

  render(
    <CheckboxField
      id="test-checkbox"
      name="agree"
      label="Agree"
      checked={checked}
      onChange={handleChange}
    />
  );

  const checkbox = screen.getByLabelText("Agree") as HTMLInputElement;
  expect(checkbox.checked).toBe(false);

  act(() => {
    fireEvent.click(checkbox);
  });
  expect(checked).toBe(true);
});
