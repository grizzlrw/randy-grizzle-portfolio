"use server";

import type { SignupMutation, SignupMutationVariables } from "@/generated/graphql";
import { signupSchema } from "@/lib/validations/schemas";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:3000/api/graphql";

/**
 * Server action to handle user signup
 * Validates input using Zod schema and submits to GraphQL API
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

  const mutation = `
    mutation Signup($input: SignupInput!) {
      signup(input: $input) {
        ok
        message
      }
    }
  `;

  const variables: SignupMutationVariables = {
    input: { firstName, lastName, email },
  };

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!res.ok) {
      return { ok: false, message: "Network error while signing up." };
    }

    const json = (await res.json()) as { data?: SignupMutation; errors?: unknown };
    const data = json.data?.signup;

    if (!data) {
      return { ok: false, message: "Unexpected error while signing up." };
    }

    return { ok: data.ok, message: data.message ?? null };
  } catch (error) {
    console.error("Signup error:", error);
    return { ok: false, message: "An error occurred during signup." };
  }
}
