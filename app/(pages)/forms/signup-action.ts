"use client";
import { postSignup } from "@/lib/graphqlClient";

export async function signup(formData: FormData) {
  const firstName = formData.get("firstname")?.toString().trim() ?? "";
  const lastName = formData.get("lastname")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";

  if (!firstName || !lastName || !email) {
    // In real code, return a form state object or use redirect with search params
    throw new Error("All fields are required.");
  }

  try {
    // Do your server work here (DB insert, email, etc.)
    const response = await postSignup(firstName, lastName, email);

    if (!response) {
      return;
    }
  } catch (error) {
    console.error("Signup failed:", error);
    return;
  } finally {

  }

}