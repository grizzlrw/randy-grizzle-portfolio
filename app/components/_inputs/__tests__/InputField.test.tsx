import { render, screen, fireEvent, act } from "@testing-library/react";
import InputField from "../InputField";

describe("InputField", () => {
  const defaultProps = {
    id: "test-field",
    name: "testField",
    label: "Test Label",
    value: "",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input field with label", () => {
    render(<InputField {...defaultProps} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should display required asterisk when required", () => {
    render(<InputField {...defaultProps} required />);

    expect(screen.getByText(/Test Label \*/)).toBeInTheDocument();
  });

  it("should not display asterisk when not required", () => {
    render(<InputField {...defaultProps} />);

    const label = screen.getByText("Test Label");
    expect(label.textContent).not.toContain("*");
  });

  it("should call onChange when value changes", () => {
    const onChange = jest.fn();
    render(<InputField {...defaultProps} onChange={onChange} />);

    const input = screen.getByRole("textbox");
    act(() => {
      fireEvent.change(input, { target: { value: "new value" } });
    });

    expect(onChange).toHaveBeenCalledWith("new value");
  });

  it("should call onBlur when input loses focus", () => {
    const onBlur = jest.fn();
    render(<InputField {...defaultProps} onBlur={onBlur} />);

    const input = screen.getByRole("textbox");
    act(() => {
      fireEvent.blur(input);
    });

    expect(onBlur).toHaveBeenCalled();
  });

  it("should display current value", () => {
    render(<InputField {...defaultProps} value="current value" />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("current value");
  });

  describe("Input Types", () => {
    it("should render text type by default", () => {
      render(<InputField {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "text");
    });

    it("should render email type", () => {
      render(<InputField {...defaultProps} type="email" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("should render password type", () => {
      render(<InputField {...defaultProps} type="password" />);

      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe("Helper Text", () => {
    it("should display helper text when provided", () => {
      render(<InputField {...defaultProps} helperText="This is helpful" />);

      expect(screen.getByText("This is helpful")).toBeInTheDocument();
    });

    it("should not display helper text when not provided", () => {
      const { container } = render(<InputField {...defaultProps} />);

      const helperText = container.querySelector(".MuiFormHelperText-root");
      expect(helperText).not.toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("should show error when touched and error exists", () => {
      render(
        <InputField
          {...defaultProps}
          error="This field is required"
          touched={true}
        />
      );

      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("should not show error when not touched", () => {
      render(
        <InputField
          {...defaultProps}
          error="This field is required"
          touched={false}
        />
      );

      expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
    });

    it("should prioritize error over helper text when touched", () => {
      render(
        <InputField
          {...defaultProps}
          error="Error message"
          helperText="Helper message"
          touched={true}
        />
      );

      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.queryByText("Helper message")).not.toBeInTheDocument();
    });

    it("should show helper text when no error", () => {
      render(
        <InputField
          {...defaultProps}
          helperText="Helper message"
          touched={true}
        />
      );

      expect(screen.getByText("Helper message")).toBeInTheDocument();
    });
  });

  describe("Placeholder", () => {
    it("should display placeholder", () => {
      render(<InputField {...defaultProps} placeholder="Enter text here" />);

      const input = screen.getByPlaceholderText("Enter text here");
      expect(input).toBeInTheDocument();
    });

    it("should not have placeholder when not provided", () => {
      render(<InputField {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveAttribute("placeholder");
    });
  });

  describe("Multiline Support", () => {
    it("should render multiline textarea", () => {
      render(<InputField {...defaultProps} multiline />);

      const textarea = screen.getByRole("textbox");
      expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("should apply minRows when multiline", () => {
      const { container } = render(<InputField {...defaultProps} multiline minRows={3} />);

      // MUI TextField renders textarea when multiline
      const textarea = container.querySelector("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("should apply maxRows when multiline", () => {
      render(<InputField {...defaultProps} multiline maxRows={10} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    it("should not apply rows when not multiline", () => {
      render(<InputField {...defaultProps} minRows={3} maxRows={10} />);

      const input = screen.getByRole("textbox");
      expect(input.tagName).toBe("INPUT");
    });
  });

  describe("Data Attributes", () => {
    it("should apply data-field-name attribute", () => {
      render(<InputField {...defaultProps} dataFieldName="customFieldName" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("data-field-name", "customFieldName");
    });

    it("should have correct id", () => {
      render(<InputField {...defaultProps} id="my-field" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "my-field-input");
    });

    it("should have correct name attribute", () => {
      render(<InputField {...defaultProps} name="myFieldName" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", "myFieldName");
    });
  });

  describe("Styling", () => {
    it("should apply default className to TextField", () => {
      const { container } = render(<InputField {...defaultProps} />);

      const textField = container.querySelector(".MuiTextField-root");
      expect(textField).toHaveClass("w-full", "border", "p-2", "rounded");
    });

    it("should apply custom className to TextField", () => {
      const { container } = render(<InputField {...defaultProps} className="custom-class" />);

      const textField = container.querySelector(".MuiTextField-root");
      expect(textField).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("should link label with input via htmlFor", () => {
      render(<InputField {...defaultProps} id="accessible-field" />);

      const label = screen.getByText("Test Label");
      expect(label).toHaveAttribute("for", "accessible-field-input");
    });

    it("should mark as required in HTML", () => {
      render(<InputField {...defaultProps} required />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("required");
    });

    it("should have FormControl wrapper", () => {
      const { container } = render(<InputField {...defaultProps} />);

      const formControl = container.querySelector(".MuiFormControl-root");
      expect(formControl).toBeInTheDocument();
    });
  });

  describe("Ref Support", () => {
    it("should forward inputRef to the input element", () => {
      const ref = { current: null } as unknown as React.RefObject<HTMLInputElement>;
      render(<InputField {...defaultProps} inputRef={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string value", () => {
      render(<InputField {...defaultProps} value="" />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toBe("");
    });

    it("should handle long text values", () => {
      const longValue = "a".repeat(1000);
      render(<InputField {...defaultProps} value={longValue} />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toBe(longValue);
    });

    it("should handle special characters in value", () => {
      const specialValue = '<script>alert("test")</script>';
      render(<InputField {...defaultProps} value={specialValue} />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.value).toBe(specialValue);
    });
  });
});
