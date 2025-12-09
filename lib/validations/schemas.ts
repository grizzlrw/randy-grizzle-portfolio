import { z } from "zod";

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Signup form validation schema
 */
export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Helper function to validate form data and return typed errors
 */
export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((err) => {
    const path = err.path.join(".");
    if (path) {
      errors[path] = err.message;
    }
  });

  return { success: false, errors };
}

/**
 * Create a dynamic Zod schema from field configurations
 * Useful for validating dynamic forms at runtime
 */
export function createDynamicSchema(fields: Array<{
  name: string;
  type: string;
  rules?: Record<string, unknown>;
}>): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    // Base schema based on type
    switch (field.type) {
      case "email":
        fieldSchema = z.string().email("Invalid email address");
        break;
      case "number":
      case "slider":
      case "rating":
        fieldSchema = z.number();
        break;
      case "checkbox":
      case "switch":
        fieldSchema = z.boolean();
        break;
      default:
        fieldSchema = z.string();
    }

    // Apply validation rules
    if (field.rules) {
      if (field.rules.required) {
        const message = typeof field.rules.required === "string" 
          ? field.rules.required 
          : `${field.name} is required`;
        
        if (fieldSchema instanceof z.ZodString) {
          fieldSchema = fieldSchema.min(1, message);
        } else if (fieldSchema instanceof z.ZodNumber) {
          fieldSchema = fieldSchema.min(0, message);
        }
      }

      if (field.rules.minLength && typeof field.rules.minLength === "object") {
        const rule = field.rules.minLength as { value: number; message?: string };
        if (fieldSchema instanceof z.ZodString) {
          fieldSchema = fieldSchema.min(rule.value, rule.message);
        }
      }

      if (field.rules.maxLength && typeof field.rules.maxLength === "object") {
        const rule = field.rules.maxLength as { value: number; message?: string };
        if (fieldSchema instanceof z.ZodString) {
          fieldSchema = fieldSchema.max(rule.value, rule.message);
        }
      }

      if (field.rules.min && typeof field.rules.min === "object") {
        const rule = field.rules.min as { value: number; message?: string };
        if (fieldSchema instanceof z.ZodNumber) {
          fieldSchema = fieldSchema.min(rule.value, rule.message);
        }
      }

      if (field.rules.max && typeof field.rules.max === "object") {
        const rule = field.rules.max as { value: number; message?: string };
        if (fieldSchema instanceof z.ZodNumber) {
          fieldSchema = fieldSchema.max(rule.value, rule.message);
        }
      }
    }

    shape[field.name] = fieldSchema;
  });

  return z.object(shape);
}
