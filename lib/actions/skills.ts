"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

/**
 * Server action to fetch all skills
 * Cached for 1 hour since skills rarely change
 */
export async function fetchSkills() {
  return unstable_cache(
    async () => {
      try {
        return await prisma.skill.findMany({
          orderBy: { createdAt: "desc" },
        });
      } catch (error) {
        console.error('Error fetching skills:', error);
        throw new Error(`Failed to fetch skills: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    ["skills-list"],
    {
      revalidate: 3600, // 1 hour
      tags: ["skills"],
    }
  )();
}
