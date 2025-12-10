"use server";

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/schemas";
import { Prisma } from "@prisma/client";

/**
 * Server action to handle user signup
 * Validates input using Zod schema and directly creates database record
 */
export async function postSignup(
  firstName: string,
  lastName: string,
  email: string
): Promise<{ ok: boolean; message: string | null }> {
  // Validate inputs with Zod
  const validation = signupSchema.safeParse({ firstName, lastName, email });
  
  if (!validation.success) {
    // Zod validation errors are in validation.error.issues array
    const firstError = validation.error.issues?.[0];
    return { ok: false, message: firstError?.message ?? "Validation failed" };
  }

  try {
    const created = await prisma.signup.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });

    return {
      ok: true,
      message: `Signup successful. Created: ${created.firstName} ${created.lastName}`,
    };
  } catch (err) {
    const e = err as Prisma.PrismaClientKnownRequestError;

    // Unique constraint violation
    if (e.code === "P2002") {
      return {
        ok: false,
        message: "This email is already registered.",
      };
    }

    // Fallback for other errors
    console.error("Signup error:", err);
    return {
      ok: false,
      message: "An unexpected error occurred during signup.",
    };
  }
}
