import { contactSchema, signupSchema, createDynamicSchema } from "../schemas";

describe("Validation Schemas", () => {
  describe("contactSchema", () => {
    it("should validate correct contact data", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, this is a test message",
      };

      const result = contactSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("should reject empty name", () => {
      const invalidData = {
        name: "",
        email: "john@example.com",
        message: "Test",
      };

      const result = contactSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("required");
      }
    });

    it("should reject invalid email format", () => {
      const invalidData = {
        name: "John",
        email: "not-an-email",
        message: "Test",
      };

      const result = contactSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("email");
      }
    });

    it("should reject name longer than 100 characters", () => {
      const invalidData = {
        name: "a".repeat(101),
        email: "john@example.com",
        message: "Test",
      };

      const result = contactSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("less than 100");
      }
    });

    it("should reject message longer than 1000 characters", () => {
      const invalidData = {
        name: "John",
        email: "john@example.com",
        message: "a".repeat(1001),
      };

      const result = contactSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("signupSchema", () => {
    it("should validate correct signup data", () => {
      const validData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };

      const result = signupSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject missing firstName", () => {
      const invalidData = {
        firstName: "",
        lastName: "Doe",
        email: "john@example.com",
      };

      const result = signupSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject missing lastName", () => {
      const invalidData = {
        firstName: "John",
        lastName: "",
        email: "john@example.com",
      };

      const result = signupSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject names longer than 50 characters", () => {
      const invalidData = {
        firstName: "a".repeat(51),
        lastName: "Doe",
        email: "john@example.com",
      };

      const result = signupSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe("createDynamicSchema", () => {
    it("should create schema for email field", () => {
      const fields = [
        { name: "email", type: "email", rules: { required: true } },
      ];

      const schema = createDynamicSchema(fields);
      const result = schema.safeParse({ email: "test@example.com" });

      expect(result.success).toBe(true);
    });

    it("should create schema for text field", () => {
      const fields = [
        { name: "username", type: "text", rules: { required: true } },
      ];

      const schema = createDynamicSchema(fields);
      const result = schema.safeParse({ username: "johndoe" });

      expect(result.success).toBe(true);
    });

    it("should create schema for number field", () => {
      const fields = [
        { name: "age", type: "number", rules: {} },
      ];

      const schema = createDynamicSchema(fields);
      const result = schema.safeParse({ age: 25 });

      expect(result.success).toBe(true);
    });

    it("should handle optional fields", () => {
      const fields = [
        { name: "nickname", type: "text", rules: {} }, // No rules means optional
      ];

      const schema = createDynamicSchema(fields);
      const result = schema.safeParse({ nickname: "test" });

      expect(result.success).toBe(true);
    });

    it("should validate min length rule", () => {
      const fields = [
        { name: "password", type: "text", rules: { minLength: { value: 8 } } },
      ];

      const schema = createDynamicSchema(fields);
      const resultInvalid = schema.safeParse({ password: "short" });
      const resultValid = schema.safeParse({ password: "longenough" });

      expect(resultInvalid.success).toBe(false);
      expect(resultValid.success).toBe(true);
    });

    it("should validate max length rule", () => {
      const fields = [
        { name: "code", type: "text", rules: { maxLength: { value: 5 } } },
      ];

      const schema = createDynamicSchema(fields);
      const resultInvalid = schema.safeParse({ code: "toolong" });
      const resultValid = schema.safeParse({ code: "ok" });

      expect(resultInvalid.success).toBe(false);
      expect(resultValid.success).toBe(true);
    });

    it("should handle multiple fields", () => {
      const fields = [
        { name: "email", type: "email", rules: {} },
        { name: "name", type: "text", rules: {} },
        { name: "age", type: "number", rules: {} },
      ];

      const schema = createDynamicSchema(fields);
      const result = schema.safeParse({
        email: "test@example.com",
        name: "John",
        age: 30,
      });

      expect(result.success).toBe(true);
    });
  });
});
