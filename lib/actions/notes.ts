"use server";

import { prisma } from "@/lib/prisma";

/**
 * Server action to fetch all notes
 * Directly queries the database instead of going through GraphQL HTTP endpoint
 */
export async function fetchNotes() {
  try {
    return await prisma.note.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error(`Failed to fetch notes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
