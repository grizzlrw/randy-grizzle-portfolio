import { render, screen, fireEvent } from "@testing-library/react";
import RadioGroupField from "./RadioGroupField";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

test("RadioGroupField renders and handles change", () => {
  let value = "";
  const handleChange = (v: string) => {
    value = v;
  };

  render(
    <RadioGroupField
      id="test-radio"
      name="choice"
      label="Choose one"
      value={value}
      options={options}
      onChange={handleChange}
    />
  );

  const optionA = screen.getByLabelText("Option A");
  fireEvent.click(optionA);

  expect(value).toBe("a");
});
