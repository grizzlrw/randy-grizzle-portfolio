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
        // During build time, database might not be available
        // Return empty array instead of throwing to allow build to succeed
        if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
          return [];
        }
        // In development or when database should be available, return empty array
        // This allows the app to function without crashing
        return [];
      }
    },
    ["skills-list"],
    {
      revalidate: 3600, // 1 hour
      tags: ["skills"],
    }
  )();
}
