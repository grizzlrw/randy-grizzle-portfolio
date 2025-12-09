"use server";

import { revalidateTag } from "next/cache";

/**
 * Utility functions for cache revalidation
 * Use these when data changes to ensure fresh content
 */

/**
 * Revalidate all notes data
 * Call this after creating, updating, or deleting notes
 */
export async function revalidateNotes() {
  revalidateTag("notes", "default");
}

/**
 * Revalidate all skills data
 * Call this after creating, updating, or deleting skills
 */
export async function revalidateSkills() {
  revalidateTag("skills", "default");
}

/**
 * Revalidate all forms data
 */
export async function revalidateForms() {
  revalidateTag("forms", "default");
}

/**
 * Revalidate a specific form by slug
 * @param slug - The form slug to revalidate
 */
export async function revalidateForm(slug: string) {
  revalidateTag(`form-${slug}`, "default");
}

/**
 * Revalidate all cached data
 * Use sparingly - only when you need to clear everything
 */
export async function revalidateAll() {
  revalidateTag("notes", "default");
  revalidateTag("skills", "default");
  revalidateTag("forms", "default");
}
