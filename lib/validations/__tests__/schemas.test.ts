import { contactSchema, signupSchema, validateFormData, createDynamicSchema } from "../schemas";

describe("contactSchema", () => {
  it("validates valid contact data", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello world",
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "john@example.com",
      message: "Hello",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required");
    }
  });

  it("validates email format", () => {
    const result = contactSchema.safeParse({
      name: "John",
      email: "invalid-email",
      message: "Hello",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email address");
    }
  });

  it("enforces max length constraints", () => {
    const result = contactSchema.safeParse({
      name: "John",
      email: "john@example.com",
      message: "a".repeat(1001),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("1000");
    }
  });
});

describe("signupSchema", () => {
  it("validates valid signup data", () => {
    const result = signupSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
  });
});

describe("validateFormData", () => {
  it("returns success with data when valid", () => {
    const result = validateFormData(contactSchema, {
      name: "John",
      email: "john@example.com",
      message: "Hello",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("John");
    }
  });

  it("returns errors object when invalid", () => {
    const result = validateFormData(contactSchema, {
      name: "",
      email: "invalid",
      message: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeDefined();
      expect(result.errors.email).toBeDefined();
      expect(result.errors.message).toBeDefined();
    }
  });
});

describe("createDynamicSchema", () => {
  it("creates schema for text fields", () => {
    const schema = createDynamicSchema([
      {
        name: "username",
        type: "text",
        rules: {
          required: "Username is required",
          minLength: { value: 3, message: "Min 3 chars" },
        },
      },
    ]);

    const validResult = schema.safeParse({ username: "john" });
    expect(validResult.success).toBe(true);

    const invalidResult = schema.safeParse({ username: "ab" });
    expect(invalidResult.success).toBe(false);
  });

  it("creates schema for number fields", () => {
    const schema = createDynamicSchema([
      {
        name: "age",
        type: "number",
        rules: {
          min: { value: 18, message: "Must be 18+" },
          max: { value: 100, message: "Must be under 100" },
        },
      },
    ]);

    const validResult = schema.safeParse({ age: 25 });
    expect(validResult.success).toBe(true);

    const invalidResult = schema.safeParse({ age: 15 });
    expect(invalidResult.success).toBe(false);
  });

  it("creates schema for email fields", () => {
    const schema = createDynamicSchema([
      {
        name: "email",
        type: "email",
        rules: { required: true },
      },
    ]);

    const validResult = schema.safeParse({ email: "test@example.com" });
    expect(validResult.success).toBe(true);

    const invalidResult = schema.safeParse({ email: "not-an-email" });
    expect(invalidResult.success).toBe(false);
  });

  it("creates schema for boolean fields", () => {
    const schema = createDynamicSchema([
      {
        name: "agree",
        type: "checkbox",
      },
    ]);

    const result = schema.safeParse({ agree: true });
    expect(result.success).toBe(true);
  });

  it("handles multiple fields", () => {
    const schema = createDynamicSchema([
      { name: "name", type: "text", rules: { required: true } },
      { name: "email", type: "email", rules: { required: true } },
      { name: "age", type: "number" },
    ]);

    const validResult = schema.safeParse({
      name: "John",
      email: "john@example.com",
      age: 30,
    });
    expect(validResult.success).toBe(true);

    const invalidResult = schema.safeParse({
      name: "",
      email: "invalid",
      age: 30,
    });
    expect(invalidResult.success).toBe(false);
  });
});
