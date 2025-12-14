"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

/**
 * Server action to fetch all notes
 * Cached for 5 minutes to balance freshness with performance
 */
export async function fetchNotes() {
  return unstable_cache(
    async () => {
      try {
        return await prisma.note.findMany({
          orderBy: { createdAt: "desc" },
        });
      } catch (error) {
        console.error('Error fetching notes:', error);
        throw new Error(`Failed to fetch notes: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    ["notes-list"],
    {
      revalidate: 300, // 5 minutes
      tags: ["notes"],
    }
  )();
}
